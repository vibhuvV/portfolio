---
title: "HTML Can Do That"
description: "We often reach for complex JavaScript solutions for UI patterns that modern browsers handle natively."
datetime: "2026-08-20"
---

We often reach for complex JavaScript solutions for UI patterns that modern browsers handle natively.

As frontend engineers, we tend to suffer from a collective amnesia regarding the platform. When we need a dropdown, a modal, or a typeahead, our muscle memory triggers a `npm install` or a reflex to build a custom React hook. We assume the DOM is too primitive, that accessibility is something we must bolt on manually, and that state management requires a library.

But the web platform has evolved. HTML5 is old news, and the Living HTML standard has added primitives that handle focus management, keyboard interaction, and accessibility semantics better than our homegrown implementations usually do. Using the browser's native features isn't just about saving lines of code; it's about reliability and performance.

## The Native Modal

The most egregious example of over-engineering is the modal dialog. I have seen massive components dedicated to rendering a simple overlay. These components handle `z-index` wars, scroll locking, and focus trapping—the requirement that keyboard focus stays inside the modal while it's open.

We don't need to write that logic anymore. The `<dialog>` element handles focus trapping, the `Escape` key, and the backdrop backdrop natively. It integrates with the accessibility tree automatically, announcing itself as a modal to screen readers without a single `aria-role` attribute.

Here is how you implement a fully accessible, focus-trapped modal in React using the native element:

```tsx
import { useEffect, useRef } from 'react';

export const NativeModal = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} onCancel={onClose}>
      <form method="dialog">
        {children}
        <div style={{ marginTop: '1rem' }}>
          <button value="cancel">Cancel</button>
          <button value="confirm">Confirm</button>
        </div>
      </form>
    </dialog>
  );
};
```

Using `method="dialog"` on a form inside the dialog allows the buttons to automatically close the modal and return a value to the `dialog` element. The browser manages the focus return to the trigger element when the modal closes. This is less code than importing `headlessui` or `radix-ui`, and it ships zero bytes of JavaScript to the client for the logic itself.

## The Popover API

For years, building a dropdown menu or a tooltip required complex event listeners. We had to detect clicks outside the component ("click-outside"), handle positioning, and manage `z-index` stacking contexts. If we missed an edge case, the menu would stay open forever or get stuck behind another element.

The Popover API is now widely supported and solves this exact problem. An element with the `popover` attribute is hidden by default and removed from the accessibility tree until it is shown. The browser provides "light dismiss," meaning clicking outside the popover automatically closes it. No `useClickOutside` hook required.

Couple this with the `popovertarget` attribute, and you get a fully functional dropdown without writing a single line of JavaScript logic:

```html
<style>
  popover {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  button[popovertarget]:hover {
    background-color: #f0f0f0;
  }
</style>

<button popovertarget="my-popover">Toggle Options</button>

<div id="my-popover" popover="auto">
  <p>These are your options.</p>
  <button>Action A</button>
  <button>Action B</button>
</div>
```

This works instantly. The browser calculates the position, handles the `aria-expanded` state on the button, and ensures that hitting `Escape` closes the popover. In a React context, you can drive the `popover` attribute via state if you need programmatic control, but for many use cases, declarative HTML is sufficient.

## Accessible Autocomplete

When we need an autocomplete or typeahead field, we often reach for heavy libraries like `react-select`. These libraries are fantastic, but they ship a lot of JavaScript to replicate behavior that the `<datalist>` element provides for free.

The `<datalist>` element links to an input and provides a set of suggestions. Unlike a `<select>`, it allows the user to type a custom value that isn't in the list. It renders a native dropdown with filtering logic built into the browser.

```tsx
export const AutocompleteInput = () => {
  const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

  return (
    <div>
      <label htmlFor="fruit-select">Select a fruit:</label>
      <input 
        id="fruit-select" 
        list="fruit-options" 
        placeholder="Type to filter..." 
      />
      <datalist id="fruit-options">
        {options.map((fruit) => (
          <option key={fruit} value={fruit} />
        ))}
      </datalist>
    </div>
  );
};
```

This provides a consistent, accessible experience across devices. On mobile, it triggers the native selection UI. It requires no state management for filtering, no logic to handle keyboard navigation, and no custom rendering. It is arguably the most robust way to implement this specific pattern.

## Conclusion

I am not suggesting we abandon our component libraries or stop writing React. Complex design systems and custom interactions still require JavaScript. However, we should check our assumptions. Before installing a dependency or writing a custom hook, ask yourself: "Can HTML do that?"

Leveraging the platform reduces our bundle size, minimizes the surface area for bugs, and guarantees better accessibility. It is a senior engineer's responsibility to know the tools available in the browser, not just the tools available in the registry. Native HTML is often the most performant, accessible, and maintainable solution.