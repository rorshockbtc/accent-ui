import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/toast',
  section: 'components',
  title: 'Toast & Alert',
  summary: 'Telling people what just happened: polite status toasts, undo actions, persistent inline alerts, and why errors never auto-dismiss.',
  readingMinutes: 6,
  tabs: {
    overview: `## Ephemeral confirmation vs. persistent warning

Not every feedback message deserves the same container. A background save needs a quiet nod that stays out of the way; a failed payment or broken form field needs a message that stays put until the person fixes it.

Accént separates feedback into two components:

- **Toast (\`role="status"\`, \`aria-live="polite"\`)** — A small floating card at the bottom-right corner confirming a completed action (*Link copied*, *Draft saved*, *Note archived — Undo*). Auto-dismisses after 5 seconds, pauses when hovered or focused, and stacks at most 3 deep.
- **Inline Alert (\`role="alert"\`)** — A banner placed directly inside the page or form where a problem occurred. **Never auto-dismisses.**

> **Why:** Auto-dismissing an error message after 4 seconds is hostile design: by the time a low-vision reader or screen-reader user navigates to the toast to read what went wrong, it has already vanished.

::demo:toast-live-regions::

## Prefer Undo over a confirmation modal for reversible actions

When someone archives a story or removes an item from a list, do not interrupt them with an *"Are you sure?"* modal. Perform the action immediately and show a 6-second toast with an **Undo** button.

::demo:toast-undo::

## Choosing between Toast, Inline Alert, and Dialog

::demo:toast-choose::

::demo:toast-stacking::

## Timing, motion, and stacking discipline

A toast should enter quietly and leave without startling the reader:

- **Entrance & exit:** Slide up \`8px\` and fade in over \`200ms\` using \`cubic-bezier(0.16, 1, 0.3, 1)\`. Under \`prefers-reduced-motion: reduce\`, skip the slide translation and fade opacity only.
- **Duration:** Keep standard confirmation toasts on screen for \`5,000ms\` (5 seconds), and extend to \`6,000ms\` whenever an interactive button like **Undo** is included.
- **Pause on interaction:** The moment the mouse cursor enters the toast viewport or keyboard focus lands inside a toast, freeze the countdown timer so the toast cannot vanish mid-click.
- **Maximum stack of 3:** If a bulk action triggers ten events in a row, collapse them into a single summary toast (*10 notes archived — Undo*) rather than building a skyscraper of ten separate cards up the right side of the screen.`,
    guidelines: `## Never auto-dismiss errors; keep them inline

Use transient toasts only for successes and neutral confirmations. Errors belong inline next to the control that failed, and stay visible until resolved.

::demo:toast-do-persist-errors::

## Dock toasts in a quiet corner, never over navigation or inputs

Place the toast viewport at \`bottom-4 right-4\` (or \`bottom-4 inset-x-4\` on mobile) so it never covers the primary header or the form button the person is trying to click.

::demo:toast-do-position::`,
    specs: `## Toast redline, timing, and token table

::demo:toast-redline::

| Variant | ARIA role | Left accent border | Icon | Auto-dismiss | Max width |
|---|---|---|---|---|---|
| Success | \`role="status"\` (\`polite\`) | \`4px solid #166534\` | \`Check\` | \`5000ms\` (pauses on hover/focus) | \`360px\` |
| Neutral / Undo | \`role="status"\` (\`polite\`) | \`4px solid #111827\` | \`Info\` | \`6000ms\` when action button present | \`360px\` |
| Error (Inline Alert) | \`role="alert"\` (\`assertive\`) | \`4px solid #9F1239\` | \`AlertTriangle\` | **Never** (persists until fixed/dismissed) | \`100%\` of form/column |

\`\`\`tsx
// Polite status toast with pause-on-hover/focus and 44px dismiss target
<div role="status" aria-live="polite" className="flex min-h-[48px] max-w-[360px] items-center gap-3 rounded-md border border-[#111827]/15 border-l-4 border-l-[#166534] bg-white pl-3 pr-1 py-1 shadow-md">
  <Check className="h-5 w-5 text-[#166534] shrink-0" aria-hidden />
  <span className="flex-1 text-sm">Saved to pipe\\website-design</span>
  <button type="button" aria-label="Dismiss notification" className="grid h-11 w-11 place-items-center">
    <X className="h-4 w-4" aria-hidden />
  </button>
</div>
\`\`\``,
    accessibility: `## Pre-mounted live regions and timer pauses

- **Pre-mount the \`aria-live\` container:** Screen readers only announce changes inside an \`aria-live\` region that was already in the DOM before the text was injected. Keep a single empty \`<div aria-live="polite" />\` mounted at all times.
- **Pause timer on hover and keyboard focus:** Required by WCAG 2.2.1 (Timing Adjustable) so readers have as long as they need to read or click **Undo**.

::demo:toast-ax-announce::`,
  },
  rules: [
    {
      id: 'toast.never-autodismiss-errors',
      statement: 'Never auto-dismiss error messages on a timer; render errors as persistent inline alerts or require explicit dismissal.',
      why: 'Users need time to read what failed and how to fix it (WCAG 2.2.1).',
    },
    {
      id: 'toast.pause-on-hover-focus',
      statement: 'Pause the auto-dismiss timer whenever a toast is hovered with the pointer or receives keyboard focus.',
      why: 'Prevents the toast from disappearing while someone is reading it or tabbing to its Undo button.',
    },
    {
      id: 'toast.max-stack-three',
      statement: 'Cap simultaneous visible toasts at 3; queue or collapse older notifications.',
      why: 'A tall tower of toasts blocks page content and overwhelms screen-reader live regions.',
    },
    {
      id: 'toast.icon-and-text-prefix',
      statement: 'Pair every toast border colour with a matching icon and screen-reader status prefix ("Saved:", "Error:").',
      why: 'Never rely on green or red border colour alone to convey outcome.',
    },
  ],
};
