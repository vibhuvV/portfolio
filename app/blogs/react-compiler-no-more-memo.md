---
title: "I removed every useMemo from my app and the React Compiler didn't flinch"
description: "After a year of the React Compiler in production, memoization went from daily discipline to dead code. What the compiler actually does, where it still needs me, and why my code got simpler."
datetime: "2026-07-15"
---

**Somewhere between React 18 and 19 I internalized a rule: if a value crosses a render, wrap it. useMemo, useCallback, memo — three spells recited per component. Last year I deleted almost all of them. The app got faster. Here's what changed.**

The React Compiler stopped being a research demo and became the boring default it always wanted to be. If you haven't looked recently: it's a build-time step that analyzes your components and automatically inserts the memoization you used to hand-write. Same mental model as React, less ceremony.

## The three spells, retired

A before/after from a project I migrated:

```tsx
function ReportDashboard({ reports, filters }) {
  const visible = useMemo(
    () => applyFilters(reports, filters),
    [reports, filters]
  );

  const exportCsv = useCallback(() => {
    download(toCsv(visible));
  }, [visible]);

  return <ReportTable data={visible} onExport={exportCsv} />;
}
```

```tsx
function ReportDashboard({ reports, filters }) {
  const visible = applyFilters(reports, filters);

  const exportCsv = () => {
    download(toCsv(visible));
  };

  return <ReportTable data={visible} onExport={exportCsv} />;
}
```

Same behavior, same skip-redundant-re-renders guarantees, no dependency arrays. The dependency array was always a comment you wrote for the computer in a language neither party spoke fluently. Every `useMemo` bug I've ever shipped was a stale or missing dep; the compiler doesn't forget entries because it doesn't write them by hand — it derives them from what the code actually reads.

The `memo()` HOC on `ReportTable` went too. The compiler memoizes components it compiles; wrapping them by hand is now redundant glue.

## What it actually does (and why that matters)

The compiler doesn't cache blindly. It proves your components follow the Rules of React — no mutations of props or state during render, no reading mutable values the framework can't track — and only then applies memoization. Where it can't prove safety, it skips and leaves your code exactly as written.

That proof step is the part everyone underrates. It's a free, opinionated senior reviewer wired into your build:

```ts
// The compiler flags this and refuses to optimize the component:
function Badge({ count }) {
  count.label = count.label.toUpperCase(); // mutating props mid-render
  return <span>{count.label}</span>;
}
```

On my migration, the compiler's "cannot prove safety" list was almost a code-review checklist of things I'd let slide for years: a ref mutation during render here, a module-level cache written in a component there. Fixing the escapes didn't just unlock optimization — it fixed two genuine re-render bugs nobody had filed because they were "just how the page felt sometimes."

## Where I still memoize by hand

Honest inventory of what survived:

- **Escaped hot paths.** One virtualized list processes 40k rows through a layout-heavy transform; the hand-tuned `useMemo` stays because I measured it and it's the difference between 8ms and 22ms per interaction. The compiler optimizes broadly, not heroically.
- **Values passed to non-React code.** When an imperative library needs a stable identity (map instances, animation handles), `useMemo` as an identity guarantee is still the right tool — that's not memoization, it's a lifetime contract.
- **Deliberate referential stability across module boundaries** where an external consumer measures identity. Rare, and usually a smell anyway.

That's under ten call sites in an app that used to have a couple hundred.

## Migrating without drama

The path that worked for me, in order:

1. **Run the compiler's linter first.** `npx react-compiler-lint` (or the ESLint plugin) reports every Rules-of-React violation across the codebase with zero behavior change. Fix these regardless of whether you adopt the compiler — they're latent bugs.
2. **Opt in per-build with the escape hatch ready.** You can compile a directory, a route, or everything; components that fail the proof are silently skipped, so adoption can be gradual and nothing gets slower.
3. **Delete memoization opportunistically, not ceremonially.** I didn't stage a "remove all useMemo" commit. Each file I touched for other reasons got cleaned, tests run, moved on. The dead spells disappeared over a month of normal work.
4. **Profile before and after.** DevTools Profiler, flamegraph, the whole ritual. My result: interaction latency down modestly everywhere, one page dramatically (its dependency arrays had been lying), bundle slightly smaller. Your mileage will vary — the point is to know.

## The part I didn't expect

I thought the win would be performance. The actual win is that my components now say what they mean. That dashboard function up top? The first version is about *memoization strategy*. The second is about *filters and exports*. The intent-to-code ratio improved, onboarding questions about "why is this memoized but that isn't" evaporated, and code review stopped being a dependency-array spelling bee.

Rules of Hooks was React teaching us to write UI like it manages data. The compiler is React trusting us to stop managing its job. After a year, going back to hand-memoized code feels like returning to `componentDidUpdate` — possible, occasionally necessary, mostly a sign the tooling owes you an update.
