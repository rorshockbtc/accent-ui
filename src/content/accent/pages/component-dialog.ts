import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/dialog',
  section: 'components',
  title: 'Dialog & Sheet',
  summary: 'Interrupting the page responsibly: native <dialog>, focus trapping, Escape dismissal, and mobile bottom sheets.',
  readingMinutes: 6,
  tabs: {
    overview: `## Every modal is an interruption—earn it

A modal dialog dims the entire page, hijacks keyboard focus, and blocks the person from reading or scrolling until they answer. Used well—for confirming an irreversible deletion or completing a focused two-field action—it prevents mistakes. Used lazily—for marketing popups, long multi-step forms, or content that belongs inline on the page—it frustrates everyone.

Accént uses four overlay patterns, ordered from least to most disruptive:

1. **Inline expansion** — Reveals extra detail right inside the page flow. Zero focus trap, zero interruption.
2. **Popover** — A small non-modal card anchored to a trigger button for quick filters or formatting options.
3. **Sheet (Drawer)** — Slides in from the bottom edge on mobile (\`< 768px\`) or the right edge on desktop for navigation tables of contents and secondary inspectors.
4. **Modal Dialog (\`<dialog>\`)** — Centres a high-consequence decision over a 40% ink scrim, traps \`Tab\` focus inside, closes on \`Escape\`, and returns focus to the exact trigger button when closed.

> **Why:** Native HTML \`<dialog>\` with \`showModal()\` handles top-layer stacking, background inertness, and \`Escape\` key dismissal in the browser engine without 30KB of fragile portal JavaScript.

::demo:dialog-native::

## Choosing the right container

::demo:dialog-chooser::

## Mobile bottom sheet and scrollable body

On phones, a centred modal sits out of thumb reach. Anchoring the sheet to the bottom edge keeps the close button and actions under the thumb, while pinning the header and footer when body copy scrolls.

::demo:dialog-sheet-mobile::

::demo:dialog-long-content::

## Anatomy and button order

Every modal dialog in Accént follows a strict three-part vertical rhythm on the 8-point grid:

1. **Header:** A concise title set in Fraunces (\`20px / 28px\`) that states the decision or task (*Delete pipe\\sandbox?*), paired with an optional top-right \`44×44px\` close button (\`aria-label="Close dialog"\`).
2. **Body:** One or two short paragraphs in \`14px–16px\` UI sans explaining the consequence, or at most three form fields. If the content can grow taller than a phone screen, set \`max-h-[70vh] overflow-y-auto\` on the body while keeping the header and footer pinned.
3. **Footer:** Right-aligned action buttons separated by \`8px\` (\`gap-2\`), with the safe **Cancel** button on the left (\`variant="outline"\`) and the committing **Primary** or **Destructive** button on the right.

Never open a second modal dialog on top of an already-open modal dialog. If a task requires multiple steps, step through views inside the single dialog frame or move the workflow onto its own dedicated page.`,
    guidelines: `## Name the exact action in destructive confirmations

Never pair a scary question with **OK / Cancel**. Repeat the verb and noun on the action button (*Delete pipe*, *Revoke key*) so the person knows exactly what clicking red will do.

::demo:dialog-do-confirm::

## Keep routine edits inline instead of opening a modal

If an action is reversible and fits on a single line—like renaming a draft or toggling a filter—let the person do it inline without dimming the screen.

::demo:dialog-do-inline::`,
    specs: `## Dialog anatomy and measurement redline

::demo:dialog-redline-anatomy::

| Part | Measurement | Token / Class | Notes |
|---|---|---|---|
| Scrim | Full viewport | \`bg-[#111827]/40 backdrop-blur-[2px]\` | Clicking scrim dismisses non-destructive dialogs |
| Width (sm / md / lg) | \`400px\` / \`512px\` / \`640px\` | \`max-w-md\` / \`max-w-lg\` / \`max-w-xl\` | Multiples of 8px; \`calc(100vw - 32px)\` on mobile |
| Padding | \`24px\` | \`p-6\` | \`3 × 8px\` on header, body, and footer |
| Corner radius | \`12px\` (or \`16px\` top on mobile sheet) | \`rounded-xl\` | 1px solid border for forced-colors visibility |
| Footer button gap | \`8px\` | \`gap-2 justify-end\` | Cancel (outline) on left, Primary/Destructive on right |

\`\`\`tsx
<dialog
  ref={dialogRef}
  aria-labelledby="delete-title"
  aria-describedby="delete-desc"
  className="w-full max-w-md rounded-xl border border-[#111827]/20 bg-[#FAF8F5] p-6 text-[#111827] shadow-2xl backdrop:bg-[#111827]/40"
>
  <h2 id="delete-title" className="font-serif text-xl font-semibold">Delete pipe\\sandbox?</h2>
  <p id="delete-desc" className="mt-2 text-sm leading-6 text-[#4B5563]">
    This permanently removes 14 curated notes. This action cannot be undone.
  </p>
  <div className="mt-6 flex justify-end gap-2">
    <Button variant="outline" onClick={() => dialogRef.current?.close()}>Cancel</Button>
    <Button variant="destructive" onClick={handleConfirm}>Delete pipe</Button>
  </div>
</dialog>
\`\`\``,
    accessibility: `## Focus lifecycle: enter, trap, escape, and return

Every modal dialog or mobile sheet must pass this four-step keyboard lifecycle:

1. **Initial focus:** Moves to the first interactive control inside the dialog (for destructive confirmations, focus the safe *Cancel* button first).
2. **Focus trap:** \`Tab\` and \`Shift+Tab\` cycle only through controls inside the dialog; background links cannot be reached.
3. **Escape key:** Pressing \`Escape\` closes the dialog immediately.
4. **Focus restoration:** Closing the dialog returns focus to the exact button that opened it.

::demo:dialog-ax-focus::`,
  },
  rules: [
    {
      id: 'dialog.focus-return',
      statement: 'When a modal dialog or mobile sheet closes, restore keyboard focus to the trigger element that opened it.',
      why: 'Dropping focus back to <body> forces keyboard and screen-reader users to tab from the top of the page.',
    },
    {
      id: 'dialog.escape-dismiss',
      statement: 'Every modal dialog and sheet must close when the user presses Escape.',
      why: 'Universal keyboard exit required by WCAG 2.1.2 (No Keyboard Trap).',
    },
    {
      id: 'dialog.specific-confirm-verb',
      statement: 'Destructive confirmation dialogs must label the confirm button with the specific verb and noun ("Delete pipe"), never "OK" or "Yes".',
      why: 'Prevents accidental data loss from habitual clicking.',
    },
    {
      id: 'dialog.mobile-bottom-sheet',
      statement: 'On viewports under 768px, render navigation drawers and action sheets anchored to the bottom of the screen.',
      why: 'Keeps primary controls within natural one-handed thumb reach.',
    },
  ],
};
