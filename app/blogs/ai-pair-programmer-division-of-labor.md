---
title: "Two years of AI pair programmers: the division of labor that actually works"
description: "An honest accounting of where coding agents earn their keep on a senior frontend codebase, where they quietly burn your time, and the review habits that keep them from shipping vibes instead of software."
datetime: "2026-08-12"
---

**Every few weeks someone asks me whether AI coding assistants are worth it for experienced developers, and my honest answer takes ten minutes. Short version: for the right tasks they're a superpower, for the wrong ones they're a liability with great confidence, and the skill that's changed my career lately isn't prompting — it's triage.**

I've now used the current crop of coding agents daily on real production code — React, TypeScript, a component library with opinions, and enough legacy to keep me humble. This is my current division of labor, with the receipts.

## Where they're genuinely great

**Scaffolding with known shape.** A new route with loading states and meta exports, a test file following our existing patterns, another variant of a component that already exists. The agent has read the whole codebase, which is the part critics keep missing — this isn't autocomplete from a blank slate, it's autocomplete with our conventions in context:

```tsx
// "Add a DateRangeFilter following the same API as SelectFilter"
// — the generated file arrived with:
//    • our cn() utility, not a template's classnames
//    • controlled + uncontrolled props matching the sibling components
//    • aria wiring copied from the pattern that already passed review
```

I typed none of that. I reviewed all of it. The ratio matters.

**Migration gruntwork.** Renames across 200 files, prop reshuffles, turning every `componentWillReceiveProps` fossil into hooks, upgrading a config format. Tedious, mechanical, high-volume — exactly where humans make copy-paste errors and machines don't. A recent icon-library swap touched 340 files; the agent did it in an afternoon, and my job was verifying the diff stats matched expectations.

**The explanation layer.** Paste a gnarly regex, a webpack error, or a dependency's undocumented behavior and get a confident first draft of an answer that you then *verify*. It has largely replaced my "read the source of a stranger's library at 1am" ritual with "read the source after the agent tells me where to look."

**Test case generation from behavior.** Describe the edge cases I already know matter — empty state, rapid re-click, unmount mid-flight — and get a skeleton asserting them. My value is knowing which cases matter; its value is writing them all down without fatigue.

## Where they quietly burn your time

**Anything where "plausible" differs from "correct."** The failure mode isn't stupid code — it's code that *looks* exactly right. I watched an agent implement a debounce hook with a bug so polite it only manifested on rapid tab-switching. It passed every test the agent also wrote for itself, because the tests shared the same wrong assumption. Self-generated tests grading self-generated homework is not a review process.

**Novel architecture.** Ask for a state-management approach for a canvas app with undo and collaboration, and you'll receive the most statistically common answer, confidently styled as the best one. The interesting problems are interesting precisely because the field hasn't converged, and the model is a smoothed average of the field. I design; it implements.

**Anything requiring taste.** Accessibility nuances, API ergonomics, naming, what a good error message sounds like. A model optimizing for plausibility produces the mean of every mediocre choice it has seen. Every time I've accepted a default UI "it suggested" without squinting at it, a designer has squinted at it later, painfully.

**Estimation and scoping.** Agents don't know that this "simple" change will collide with the migration someone started last sprint. Only the humans holding the map know that.

## The review habits that keep it honest

The trap isn't using agents; it's letting review decay into skimming generated diffs at generated speed. My rules after learning several of these the hard way:

1. **Read every line of anything the agent wrote that touches state, effects, or error handling.** That's where plausible-but-wrong lives.
2. **Never accept tests written by the same agent that wrote the code without writing at least one case yourself** — ideally the one you think it might have misunderstood.
3. **Ask "what did you assume?" before "what did you build?"** The assumptions are where the review time pays off.
4. **Small tasks, tight loops.** A 400-line generated diff gets skimmed; a 60-line one gets read. Keep them small enough to actually read.
5. **Beware the ambient typing tax.** If you spend 40 minutes prompting, correcting, re-prompting, and fixing, a 25-minute manual implementation was faster. Track your *total* time honestly — this one took me months to see because each individual interaction felt fast.

## What actually changed about my job

Two years in, the honest summary: my output went up meaningfully on mechanical work, my error rate on that work went down, and the *center* of the job moved further up the stack. More time on API design, accessibility, performance budgets, and mentoring; less on boilerplate and migrations. The skill gap that's widening isn't "who can prompt" — it's who can review, triage, and take responsibility for code they didn't write line by line.

Because that's the last thing I'll say about these tools, and it's the one that matters: the agent never has to ship this. No user, interviewer, or pager duty knows which lines the machine wrote. The commits have my name on them. That fact alone imposes the discipline — delegate the typing, never the judgment.
