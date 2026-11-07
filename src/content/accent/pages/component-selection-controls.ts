import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/selection-controls',
  section: 'components',
  title: 'Checkbox, Radio & Switch',
  summary: 'Binary and single-choice controls: how to pick between a checkbox, a radio group, and a toggle switch, with 44px label hit areas.',
  readingMinutes: 6,
  tabs: {
    overview: `## Three controls, three distinct contracts

Checkboxes, radio buttons, and toggle switches often get swapped around as if they were stylistic variations of the same thing. They are not. Each one makes a different promise to the person using it:

- **Checkbox** — Picks **zero, one, or many** independent items from a list, or opts into a single condition (*I agree to the creator terms*). Inside a form, changes wait until you press the submit button.
- **Radio group** — Picks **exactly one** option from 2 to 5 mutually exclusive choices. Picking one automatically deselects the others.
- **Switch (Toggle)** — Flips a single live system setting **On or Off immediately**, like a wall light switch (*Dark theme*, *Public pipe visibility*), without needing a Save button.

> **Why:** If flipping a switch requires clicking a "Save changes" button at the bottom of the page, the metaphor breaks. Use a checkbox whenever a form submission step is required.

::demo:sc-matrix::

## Indeterminate parent checkboxes

When a parent checkbox controls a group of sub-items and only some of them are checked, set \`indeterminate = true\` and \`aria-checked="mixed"\` so the parent shows a horizontal dash instead of a misleading check or blank square.

::demo:sc-indeterminate::

## Layout, alignment, and label writing

Stack checkboxes and radio buttons **vertically**, one option per row. Horizontal rows of radios make it hard to tell which label belongs to which circle—especially when screen magnification is active—and wrap awkwardly on 390px phone screens. The only exception is a compact 2- or 3-option segmented pill where each label sits inside its own bordered button.

Write every label as a **positive, unambiguous statement**:

- Say *"Send weekly digest every Sunday"* instead of *"Do not disable weekly email notifications."* Double negatives around an unchecked box force the reader to do boolean algebra just to unsubscribe.
- Keep the first word of every option in a radio group parallel: *Local 7B model*, *Cloud frontier model*, *Hybrid fallback*.
- When an option needs a second line of explanation, set the main label in \`14px\` weight \`500\` and the helper description below it in \`13px\` muted ink (\`#4B5563\`), keeping the checkbox or radio circle top-aligned with the first line of text.`,
    guidelines: `## Match the control to the cardinality and timing

Never use checkboxes for mutually exclusive choices, and never use a toggle switch inside a batch-submitted form.

::demo:sc-do-group-type::

## Make the entire label row clickable

Nobody should have to aim a mouse cursor or thumb at a tiny 16×16px square. Wrap the input and label text together in a \`<label>\` with at least \`44px\` vertical height.

::demo:sc-do-label-hit::`,
    specs: `## Anatomy, sizes, and token table

::demo:sc-redline::

| Control | Drawn box / track | Hit target height | Corner radius | Checked indicator | HTML / ARIA |
|---|---|---|---|---|---|
| Checkbox | \`18×18px\` | \`≥ 44px\` full row | \`4px\` | Check glyph (or \`—\` mixed) | \`<input type="checkbox">\` |
| Radio | \`18×18px\` | \`≥ 44px\` full row | \`999px\` circle | \`8×8px\` inner dot | \`<input type="radio">\` in \`<fieldset>\` |
| Switch | \`40×24px\` track, \`18×18px\` thumb | \`≥ 44px\` full row | \`999px\` pill | Thumb translates \`16px\` + On/Off text | \`role="switch" aria-checked\` |

\`\`\`tsx
<fieldset className="space-y-1">
  <legend className="text-sm font-semibold mb-2">Inference privacy</legend>
  <label className="flex min-h-[44px] items-center gap-3 cursor-pointer">
    <input type="radio" name="privacy" defaultChecked className="h-4 w-4 accent-[#111827]" />
    <span className="text-sm">Local 7B model only (never leaves this Mac)</span>
  </label>
  <label className="flex min-h-[44px] items-center gap-3 cursor-pointer">
    <input type="radio" name="privacy" className="h-4 w-4 accent-[#111827]" />
    <span className="text-sm">Cloud frontier model (faster synthesis)</span>
  </label>
</fieldset>
\`\`\``,
    accessibility: `## Fieldsets, legends, and keyboard semantics

- **Group labels:** Always wrap related checkboxes or radios inside a \`<fieldset>\` with a visible \`<legend>\`. Without a legend, a screen reader landing on a radio button only hears *"Yes, radio button, 1 of 2"* without hearing the question being asked.
- **Keyboard keys:** \`Space\` toggles a checkbox or switch; \`ArrowUp\` / \`ArrowDown\` moves selection and focus through a radio group.

::demo:sc-ax-keymap::

::demo:sc-ax-sr::`,
  },
  rules: [
    {
      id: 'selection.label-hit-44',
      statement: 'Wrap every checkbox, radio, and switch with its text inside a <label> whose hit height is at least 44px.',
      why: 'An 18px box alone fails mobile touch target requirements.',
    },
    {
      id: 'selection.fieldset-legend',
      statement: 'Group related radios or checkboxes inside a <fieldset> with a <legend> naming the question.',
      why: 'Screen readers announce the legend before the first option in the group.',
    },
    {
      id: 'selection.switch-immediate-only',
      statement: 'Use a toggle switch (role="switch") only for settings that take effect immediately without a Submit button.',
      why: 'Switches mimic physical power switches; batch forms should use checkboxes.',
    },
    {
      id: 'selection.indeterminate-mixed',
      statement: 'Set aria-checked="mixed" on parent select-all checkboxes when only a subset of children are checked.',
      why: 'Communicates partial selection accurately to both sighted and screen-reader users.',
    },
  ],
};
