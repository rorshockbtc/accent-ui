import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/tooltip',
  section: 'components',
  title: 'Tooltip',
  summary: 'Short text labels for icon-only toolbar buttons—and why essential instructions must never hide inside a hover tooltip.',
  readingMinutes: 5,
  tabs: {
    overview: `## If the user needs to read it, print it on the page

Tooltips have a fatal flaw: **phones and tablets do not have a hover state**. Anything you hide inside a tooltip is invisible to half your readers, invisible to voice-control users, and invisible until someone goes hunting with a mouse cursor.

In Accént, a tooltip has only **one valid job**: naming a compact icon-only toolbar button (such as *Copy W3C token JSON (⌘C)*) when repeating text labels on every icon in a dense editor bar would clutter the tool. Even then, the button itself carries an identical accessible name so screen-reader and voice users never depend on the visual popup.

> **Why:** If you feel tempted to put a \`?\` icon next to a form label and hide the explanation in a tooltip, just print the explanation as a 13px helper line right under the label. Everyone reads it faster and nothing breaks on touchscreens.

::demo:tip-interactive::

## When to use a Tooltip vs. Helper text vs. Popover

Before adding a tooltip, run through this three-question checklist:

1. **Would the user fail or make a mistake without this text?** If yes—such as password requirements, billing renewal dates, or file size limits—print it directly on the page as permanent \`13px\` helper text. Never hide it in a tooltip.
2. **Does the popup contain a link, button, or form control?** If yes, use a click-triggered **Popover** (` + '`aria-expanded`' + `). A tooltip disappears the moment focus leaves the trigger, so a keyboard user can never tab into a link inside a tooltip.
3. **Is the trigger an icon-only button in a compact toolbar?** That is the sweet spot for a tooltip: it reveals the button's name and keyboard shortcut (*Bold (⌘B)*, *Copy token JSON*) after a brief ` + '`250ms`' + ` hover delay or immediately on ` + '`focus-visible`' + `.`,
    guidelines: `## Print essential instructions inline; never hide them in a tooltip

Password rules, pricing notes, and field formats belong in visible helper text under the label, not behind a mystery question-mark icon.

::demo:tip-do-visible::

## Keep tooltips under 60 characters with zero interactive links

A tooltip is a label, not a dialog. Never put links, buttons, or multi-sentence paragraphs inside a tooltip; if it needs a button, use a click-triggered Popover.

::demo:tip-do-concise::`,
    specs: `## Tooltip redline, timing, and tokens

::demo:tip-redline::

| Property | Value | Token / Class | Notes |
|---|---|---|---|
| Background / Ink | \`#111827\` / \`#FAF8F5\` | High-contrast inverse | \`14.8:1\` contrast ratio |
| Font size | \`12px–13px\` | \`text-xs\` | Single line preferred, \`max-w-[240px]\` |
| Padding & offset | \`6px 10px\`, \`8px\` gap | \`px-2.5 py-1 mb-2\` | Sits on the 4/8px grid |
| Open delay | \`250ms\` on hover, \`0ms\` on keyboard focus | Prevents flicker when sweeping the mouse across a toolbar |
| Dismissal | \`Escape\` key, blur, or pointer leave | WCAG 1.4.13 compliant |

\`\`\`tsx
<div className="relative inline-block">
  <button
    type="button"
    aria-describedby="copy-tip"
    className="grid h-11 w-11 place-items-center rounded-md border border-[#111827]/20"
  >
    <Copy className="h-4 w-4" aria-hidden />
    <span className="sr-only">Copy token JSON</span>
  </button>
  <span
    id="copy-tip"
    role="tooltip"
    className="rounded bg-[#111827] px-2.5 py-1 text-xs text-[#FAF8F5]"
  >
    Copy token JSON (⌘C)
  </span>
</div>
\`\`\``,
    accessibility: `## WCAG 1.4.13: Dismissible, Hoverable, Persistent

Whenever additional content appears on hover or keyboard focus, WCAG 1.4.13 requires three behaviours:

1. **Dismissible:** Pressing \`Escape\` closes the tooltip without moving keyboard focus away from the button.
2. **Hoverable:** A user with 400% screen magnification can move their mouse pointer from the trigger onto the tooltip bubble itself without the tooltip vanishing.
3. **Persistent:** The tooltip stays visible as long as the trigger retains focus or hover.

::demo:tip-ax-escape::`,
  },
  rules: [
    {
      id: 'tooltip.never-essential-info',
      statement: 'Never hide required form instructions, pricing caveats, or error explanations inside a hover tooltip; print them inline.',
      why: 'Touch devices have no hover state.',
    },
    {
      id: 'tooltip.no-interactive-children',
      statement: 'Never place links, buttons, or inputs inside a role="tooltip" element; use a click-triggered popover or dialog instead.',
      why: 'Tooltips close on blur/pointer-leave and cannot hold tab stops safely.',
    },
    {
      id: 'tooltip.escape-dismissible',
      statement: 'Every tooltip must close when the user presses Escape while keeping focus on the trigger button (WCAG 1.4.13).',
      why: 'Lets screen-magnifier users uncover obscured content behind the tooltip.',
    },
    {
      id: 'tooltip.trigger-on-focus-and-hover',
      statement: 'Show tooltips on both keyboard focus and pointer hover, linked via aria-describedby.',
      why: 'Keyboard-only users must receive the same shortcut hints as mouse users.',
    },
  ],
};
