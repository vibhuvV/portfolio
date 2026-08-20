---
title: "I added native page transitions to my site and deleted zero JavaScript"
description: "The View Transitions API finally clicked for me when I wired it into this very site — React Router's viewTransition prop, twelve lines of CSS, and the end of routing-animation libraries."
datetime: "2026-06-24"
---

**Every few years I delete a dependency from my projects and feel the platform catch up to the ecosystem. This time it was page transitions: one prop in React Router, a dozen lines of CSS, and the entire genre of transition libraries became unnecessary.**

This site you're reading is my playground, so when I wanted gentler navigation between the home page and blog posts, I decided to do it the boring 2026 way: the browser's own View Transitions API, through React Router's built-in support. No Framer Motion, no react-transition-group, no FLIP math.

## What the browser actually does

I assumed for a long time that view transitions were some clever DOM-diffing trick. They're not, and knowing the mechanic changed how I reason about them:

1. The browser screenshots the current page.
2. Your DOM update runs — normally invisible to the user.
3. It screenshots the new state.
4. Both snapshots become pseudo-elements (`::view-transition-old` and `::view-transition-new`) that animate on the compositor.

Screenshot-based means you get a working crossfade over *any* change for free, and it also explains the quirks: live video and canvas content freeze during the transition, and anything mid-animation gets caught in the photo. Keep transitions short and this never matters.

## The manual version, for context

Vanilla JS looks like this:

```ts
document.startViewTransition(async () => {
  await updateTheDOMSomehow();
});
```

The callback is where your framework mutates the page. In React Router, "update the DOM" means "complete a navigation" — and a navigation isn't a single synchronous call. This is precisely the plumbing the framework does for you.

## The React Router version

Every `Link` and `NavLink` takes a `viewTransition` prop. That's the whole integration:

```tsx
<nav>
  <NavLink to="/" end viewTransition>
    Home
  </NavLink>
  <NavLink to="/blogs" viewTransition>
    Blogs
  </NavLink>
</nav>

<Link to="/blogs/modern-css-2026" viewTransition>
  Read more
</Link>
```

React Router wraps its state update in `startViewTransition`, waits for the navigation to settle inside the callback (the hard part), and degrades to a normal navigation where the API is missing. I didn't write a line of the tricky code, which is my favorite kind of feature.

## The CSS that makes it feel intentional

The default crossfade is fine and forgettable. Two small tweaks made it feel designed on this site: the old page leaves slightly faster than the new one arrives, and the whole thing is gated behind `prefers-reduced-motion`, because motion is a preference, not a decoration:

```css
@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root) {
    animation: 200ms cubic-bezier(0.4, 0, 0.2, 1) both fade-out;
  }

  ::view-transition-new(root) {
    animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both fade-in;
  }

  @keyframes fade-out {
    to { opacity: 0; }
  }

  @keyframes fade-in {
    from { opacity: 0; }
  }
}
```

The asymmetry — quick exit, slower entrance — reads as "content arriving" instead of a fade-to-black between scenes.

## The party trick: shared element transitions

Give an element the same `view-transition-name` on both pages and the browser morphs it between them:

```css
.blog-card__title {
  view-transition-name: blog-title;
}

.blog-post__title {
  view-transition-name: blog-title;
}
```

A card heading glides from the list into its place as the article header. No measuring, no getBoundingClientRect comparison — the browser has both snapshots, it interpolates. This is the effect that used to justify entire animation libraries.

One warning from an afternoon I won't get back: **the name must be unique on the page at transition time.** I named every card in a list the same thing and the transition silently no-op'd. If a list needs this, set the name dynamically on click, right before navigating, and clear it after.

## The MPA plot twist

My favorite part of this story: the same API now works across *full page loads*. If this were a plain server-rendered site with no framework at all, one line of CSS buys every same-origin navigation a crossfade:

```css
@view-transition {
  navigation: auto;
}
```

No JavaScript. None. A one-line `<style>` in a WordPress theme gets what we used to need a SPA for.

## Was it worth it?

Total cost to this site: one prop on a few links and a CSS block. Total dependencies added: zero. Bundle impact: effectively none, since the browser ships the feature.

The pattern I keep noticing: scroll-driven animations, `@starting-style`, `:has()`, now this — the platform is absorbing the ecosystem's greatest hits one by one. My resolution is to check for a platform primitive before I reach for a package. Lately, it's usually there.
