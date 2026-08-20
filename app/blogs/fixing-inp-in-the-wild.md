---
title: "The 900ms button: a field guide to actually fixing INP"
description: "Lab scores were green, real users were not. A walkthrough of hunting a slow Interaction to Next Paint in the wild — what the traces showed, what I got wrong first, and the fixes that moved the metric."
datetime: "2026-08-05"
---

**Our lab numbers were pristine. Lighthouse 99, LCP well under budget, silky demo machine. Then the field data arrived and one interaction metric was embarrassing: clicking a filter on a mid-tier laptop took the page 900ms to respond. Here's the debugging session, including the two things I tried that didn't work.**

Interaction to Next Paint is the metric that ended LCP's reign as the one everybody watches — it measures the gap between a tap and the next painted frame, pulled from real users via the RUM field. You can't game it with a faster hero image. It's the "does the site actually feel responsive" number, and it failed in the field while every synthetic check passed.

## What I got wrong first

**Wrong turn one: assumed it was the click handler.** The handler called a state update that recomputed a filtered list — a few thousand rows, some date math. Microbenchmark said 12ms. Fine. I rewrote it anyway (memoized selector, the works). Field INP moved a rounding error. The expensive part wasn't my code.

**Wrong turn two: blamed the list render.** Virtualization, windowing, keys — the full sermon. Also negligible. I was optimizing what I could see in the React profiler while ignoring what the trace was literally showing me.

The lesson I keep relearning: **read the trace before theorizing.** What the Chrome performance trace actually showed for the slow interactions:

1. `input delay` — ~380ms of the interaction spent before my handler even ran, while a long task from an earlier `fetch` resolution churned through component updates.
2. `processing duration` — ~90ms of handler + render, the part I'd been polishing.
3. `presentation delay` — ~400ms waiting for the next paint, stuck behind *another* long task queued by a mutation observer kicking off layout thrash.

Two-thirds of the "slow button" was nothing near the button.

## Fix one: stop the fetch waterfall from landing on clicks

Data arrived, a chain of three state updates each triggered their own reconciliation pass, and they landed asynchronously — sometimes exactly when a user clicked. Classic long task, invisible in dev where the data is instant and the machine is fast.

The fix was boring scheduling, not clever code. Collapse the cascade into a single state transition (`useSyncExternalStore` over a small store, one notification), and move the post-processing into a transition so React can interrupt it:

```tsx
const [filter, setFilter] = useState(defaults);

function onFilterChange(next: Filter) {
  startTransition(() => {
    setFilter(next); // heavy re-render becomes interruptible
  });
}
```

Input delay on the *next* interaction dropped because there was no longer a 300ms wall of uninterruptible work for a click to queue behind.

## Fix two: give the browser room to paint

The presentation delay turned out to be a ResizeObserver loop — a collapsed section animating height triggered observer → layout → observer → layout, the browser never finding a stable frame to paint the click result until it gave up.

If you haven't met this one: an observer callback writes layout, invalidating layout, refiring the observer. The trace signature is a `Forced reflow` followed by its twins. Three ways out, in the order I applied them:

- Batch observer writes (`queueMicrotask` or collect-then-apply) so each layout pass is intentional.
- Batch DOM reads and writes separately — never read (`offsetHeight`) in a loop that also writes.
- Replace the height animation with `transform`/`opacity` where possible, because compositor properties don't force layout at all.

## Fix three: yield the long tail

The remaining offenders were initial-mount work: chart initialization, table formatting, all landing in one 150ms task right when early users interact most. The pattern that tames this — split the task and let input through:

```ts
async function yieldToMain() {
  if ("scheduler" in window && "yield" in scheduler) {
    return scheduler.yield();
  }
  return new Promise((resolve) => setTimeout(resolve, 0));
}

async function initializeCharts(widgets: Widget[]) {
  for (const widget of widgets) {
    mountWidget(widget);
    await yieldToMain(); // clicks jump the queue between chunks
  }
}
```

`scheduler.yield()` keeps priority ordering (a plain `setTimeout` lets unrelated tasks barge in ahead of your continuation — fine here, wrong elsewhere). The mount sequence got 40% slower in wall-clock time and *every* interaction during it got faster. Users don't experience your total milliseconds; they experience their own.

## The instrumentation I ship now

Field data found this; labs never would have. The minimum viable setup I add to every project now:

```ts
import { onINP } from "web-vitals/attribution";

onINP((metric) => {
  const entry = metric.attribution?.eventEntry;
  sendToRum({
    value: metric.value,
    target: metric.attribution?.interactionTarget,
    // which third of the interaction ate the time:
    delay: entry?.processingStart - entry.startTime,
    processing: (entry?.duration ?? 0) > 0
      ? entry.duration - (entry?.processingStart - entry.startTime)
      : 0,
    slowPart: longestPhaseOf(entry), // custom: input/processing/presentation
  });
});
```

The `attribution` field is the whole point — it names the element and the phase. My 900ms button showed up as `target: button[data-filter="region"], phase: presentation`, and the presentation phase is precisely where I would never have looked.

## The scorecard

- INP (p75, field): ~900ms → 140ms over three weeks of incremental fixes
- Nothing in the lab ever caught it; two "obvious" optimizations were placebo
- The biggest wins were scheduling and layout discipline, not faster functions

The uncomfortable summary: we became very good at measuring our own code and somewhat bad at noticing everyone else's. INP is a field metric about real devices on real networks hitting real task queues, and the fixes that move it are rarely the ones a profiler puts in front of you. Read the trace. All of it.
