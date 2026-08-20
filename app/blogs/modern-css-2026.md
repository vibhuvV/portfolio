---
title: "The CSS I stopped needing JavaScript for"
description: ":has(), container queries, and native nesting deleted real code from my components — not demo code, the kind with state and props. Notes from untangling a React component library with 2026 baseline CSS."
datetime: "2026-05-12"
---

**For most of my career, CSS upgrades meant better ergonomics for the same capabilities. Then :has() and container queries shipped, and I started deleting React state, responsive props, and wrapper components — actual logic, gone, replaced by declarative CSS. These are the receipts.**

I maintain UI components for a living — design-system work at my day job plus the usual side projects. Somewhere in the last year I noticed my commits stopped being "add feature" and became "delete workaround." Three platform features are responsible for most of it.

## `:has()`: the DOM already knows

The pattern I kept re-implementing in React: *state that mirrors the DOM*. "Disable submit when a field is invalid" meant validity state, a parent subscriber, and a prop. "Style the card differently when it has media" meant a `hasMedia` prop threaded from data to markup.

`:has()` lets CSS read what the DOM already knows:

```css
/* The form knows if any field is invalid — no state sync */
form:has(input:invalid) button[type="submit"] {
  opacity: 0.5;
  pointer-events: none;
}

/* The card knows whether it contains media */
.card:has(img) {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 1rem;
}

/* A label reacts to its checked sibling — the checkbox hack, retired */
label:has(+ input:checked) {
  color: var(--accent);
}
```

That submit-button example deleted a `useFormValidity` hook from a codebase. That hook had tests. The tests had bugs.

Performance footnote, since someone always asks: browsers optimized `:has()` hard, but it recalculates on DOM mutation, so I avoid writing one selector that can match thousands of nodes on every keystroke. In practice, scoping it to a form or a card keeps it a non-issue.

## Container queries: components stop knowing where they live

The question "how wide is the viewport?" was always wrong for components. A card in a sidebar and the same card in a page hero are different layouts at identical viewport widths — which is how component libraries ended up with APIs like `<Card variant="horizontal" size="sm">` and a breakpoint table in the docs.

Container queries let the component ask the only question it should:

```css
.card-wrapper {
  container-type: inline-size;
}

/* Two columns when there's room — room meaning the container, not the screen */
@container (min-width: 28rem) {
  .card {
    grid-template-columns: 1fr 2fr;
    align-items: start;
  }
}
```

When I converted a card component over, the responsive variant props fell away and so did the "which breakpoints does this support?" documentation section. The component works in slots I never designed for, because it adapts to its actual constraints instead of guessing them from the window.

The sleeper hit is container-relative units. Fluid type that scales with the component, not the page:

```css
.card__title {
  font-size: clamp(1.1rem, 5cqw, 1.75rem);
}
```

A title that's proportionally right in both a dense grid and a full-width feature slot, with one declaration.

## Native nesting: the build step leaves the chat

Nesting going baseline mattered to me for a boring reason: the components I write stopped needing a preprocessing step to be maintainable. Scoping, `&` composition, pseudo-selectors — it's the Sass ergonomics without the Sass:

```css
.post {
  max-width: 65ch;
  line-height: 1.7;

  & h2 {
    margin-block: 2.5rem 1rem;
    font-size: 1.5rem;
  }

  & > p + p {
    margin-top: 1rem;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
}
```

The migration trap, if you're coming from Sass: bare element selectors inside a block (`h2 { }` with no `&`) are invalid in native CSS. Everything needs the `&` or a combinator. My first conversion attempt failed on exactly that, twenty times, and the error messages were not helpful about it.

## Two one-liners I consider free wins

Worth mentioning because they're zero-risk and I add them to everything now:

```css
/* Headlines stop breaking raggedly — deletes a class of design-review comments */
h1,
h2 {
  text-wrap: balance;
}

/* Multi-line truncation without the clamp hack du jour */
.clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

`text-wrap: balance` specifically ended a recurring argument with a designer about "weird headline wrapping" that no `max-width` ever fully solved.

## The order I'd adopt in

If you're sitting on a component library with a decade of workarounds, don't start a rewrite:

1. **Nesting and `text-wrap: balance` in all new code today.** No risk, immediate ergonomics.
2. **Container queries the next time you touch a responsive component.** That's where the API surface shrinks — variant props become unnecessary.
3. **`:has()` whenever you're about to add state that duplicates the DOM.** The moment before writing `setIsValid` is the moment to ask whether the browser already tracks the thing you're tracking.

All of this is baseline-everywhere now, which means no PostCSS plugins, no polyfills-as-a-service, no runtime. The uncomfortable version of this conclusion: a meaningful chunk of what CSS-in-JS and prop-driven component APIs existed to solve was temporary. The durable work is the same as it ever was — component APIs, accessibility, and constraints that hold up under pressure.

I'm keeping the deletions.
