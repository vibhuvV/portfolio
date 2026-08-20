---
title: "HTML Can Do That"
description: "Stop reinventing the wheel with complex JavaScript. Native browser elements handle modals, accordions, and validation better than your React components."
datetime: "2026-08-20"
---

**We spend thousands of lines of JavaScript reinventing native browser behaviors that have been stable, accessible, and performant for years.**

As frontend engineers, we have a bias toward abstraction. We see a UI pattern—a modal, an accordion, a date picker—and our first instinct is to reach for a library or build a custom React component. We convince ourselves that we need total control over the DOM to ensure a consistent experience. In reality, this "consistency" often comes at the cost of bundle size, accessibility, and our own sanity.

The HTML spec has evolved. While we were busy arguing over state management libraries, the platform added primitives that solve our most common problems. You don't need a 15kb dependency to manage a dialog's focus trap or a complex reducer to toggle a dropdown.

## The Imperative Dialog

I still see codebases where a modal is a `div` with a fixed position, a `z-index` war, and a heap of event listeners handling `Escape` keys and clicking outside the box. This is fragile. If you forget to handle the `return` focus, keyboard users are stranded.

The `<dialog>` element solves this. It handles the top-layer rendering (so it sits above everything else), focus management, and the Escape key automatically. The API is imperative, which feels weird in React, but a simple ref wrapper bridges the gap.

```tsx
import { useRef, useEffect } from 'react';

export function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} onCancel={onClose}>
      <form method="dialog">
        {children}
        <button value="cancel">Close</button>
      </form>
    </dialog>
  );
}
```

Notice the `method="dialog"` on the form. That's a native feature: any button inside a dialog form with a value will close the modal and pass that value to the `close()` event. No manual state dispatching required.

## The Native Accordion

Before `details` and `summary` gained widespread styling support, we built accordions with max-height transitions and JavaScript state. It was a mess of calculating scroll heights. Now, the browser handles the expansion logic, the semantics (it announces itself as an expandable section to screen readers), and the keyboard interaction.

The only valid reason to avoid this used to be the inability to animate the opening smoothly. We can now animate from `height: 0` to `height: auto` using CSS grid. This is a pattern I wish I had adopted years ago.

```css
details > summary {
  list-style: none;
  cursor: pointer;
}
details > summary::-webkit-details-marker {
  display: none;
}

details > div {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-out;
}

details[open] > div {
  grid-template-rows: 1fr;
}

details > div > div {
  overflow: hidden;
}
```

```tsx
export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details>
      <summary>{title}</summary>
      <div>
        <div>{children}</div>
      </div>
    </details>
  );
}
```

This requires zero JavaScript state. It is resilient to hydration mismatches because the open/closed state is owned entirely by the DOM.

## Constraint Validation

We love our validation libraries. We wrap our forms in heavy contexts and define schemas that look like backend models. For 90% of forms, the browser's built-in Constraint Validation API is sufficient. It supports patterns, minimums, maximums, and required fields, and it provides localized error messages out of the box.

Instead of checking `value.length` in a `useEffect`, rely on the browser.

```tsx
export function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    // This checks all inputs and triggers browser UI bubbles if invalid
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
      return;
    }
    
    // Submit data logic here
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Email:</label>
      <input 
        id="email" 
        type="email" 
        required 
        pattern="[^@]+@[^@]+\.[^@]+" 
        placeholder="you@example.com"
      />
      <button type="submit">Subscribe</button>
    </form>
  );
}
```

I used `noValidate` on the form tag. This prevents the browser from interrupting the submission *before* my handler runs, giving me control over *when* to show the errors via `reportValidity()`. This gives me the native behavior—correct ARIA attributes, keyboard navigation, and error bubbles—without the visual inconsistency of browser defaults popping up at random times.

## Default to the Platform

We need to stop treating the browser as a rendering target for our JavaScript frameworks and start treating it as a UI framework itself. Every line of native HTML you use is a line of JavaScript you don't have to write, test, or bundle.

Next time you reach for a component library, check the spec first. You might find that HTML can already do that.