import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/iconography',
  section: 'foundations',
  kind: 'doc',
  title: 'Iconography & Restraint',
  summary: 'Fewer icons, always labelled, one stroke weight. Let type and punctuation do the work.',
  readingMinutes: 5,
  tabs: {
    overview: `## The Lucide problem

Open ten new web apps built this year. Count the icons. There is a sparkle next to "AI." A little house next to "Home." A gear beside "Settings," a bell beside "Notifications," a chart beside "Analytics." A rocket somewhere. Every button, every menu item, every card header gets a tiny line drawing from the same free library.

Nothing is wrong with Lucide. It is a well-made icon set. The problem is that it became the default, and defaults are invisible. When every app uses the same thirty icons in the same places at the same size, the result is a kind of visual elevator music. It tells the reader that nobody made a decision here. Kyle's poster puts it bluntly: AI writes backend code "like a lightsaber through butter" and still turns out UI that "looks like slop." Icon confetti is one of the biggest tells.

## What icons are for

A designer has very few real shapes: rectangles and circles, mostly. Everything else is decoration: colour, typography, iconography, graphics. Decoration earns its place by doing a job. An icon has three legitimate jobs:

1. **Recognition at a glance** for actions people repeat constantly: search, close, menu, back.
2. **Saving space** where a label genuinely won't fit, like a toolbar in a dense editor.
3. **Reinforcing state** alongside colour: a check for success, an exclamation for an error.

If an icon isn't doing one of those, delete it. "Settings" is perfectly clear as a word. The gear adds nothing except visual noise.

::demo:icon-restraint::

## One icon per control, maximum

Never put two icons on one button. No "sparkle + arrow." No leading icon and trailing chevron and badge. A control has one idea. If you need more than one glyph to explain it, the control is doing too much.

## Always labelled

Icons are not a language. The floppy disk means "save" only to people who remember floppy disks. A heart might mean like, favourite, save, or health. Studies of icon recognition keep finding the same thing: outside a small core set, people guess wrong.

So every icon gets a label. Visible text is best. When space is truly tight, like an icon-only toolbar button, the label goes in \`aria-label\` and a tooltip, and the icon must be one of the universal few (close, search, menu, more).

## One stroke, three sizes

When you do use icons, make them look like they belong to one family:

- **Stroke weight: 1.5px.** Not 1, not 2. Mixing weights is the fastest way to make a screen look assembled from parts.
- **Sizes: 16, 20, 24.** 16 next to small text, 20 next to body text, 24 for standalone controls. All on the 4/8 grid.
- **Colour: currentColor.** Icons inherit the text colour around them, so they stay in sync in every room and in high-contrast mode.

## Prefer punctuation and type

Accent's products are named after punctuation marks for a reason. Before reaching for an icon, ask whether a glyph already exists in the font.

- An arrow → reads cleanly and matches your text weight.
- A middle dot · separates metadata better than a tiny circle icon.
- An em dash, an ellipsis, a section mark §, a check ✓. All typographic, all free, all automatically the right weight and colour.
- A bold word or a number often beats any picture.

Type is the most underused tool in interface design. It is already loaded, already accessible, already the right colour. Use it.

## The Accent rule

Icons do a job or they go. One per control. Always labelled. 1.5 stroke, 16/20/24 sizes, currentColor. When in doubt, use a word or a glyph.

> **Why:** When every noun has a tiny decorative icon beside it, none of them mean anything. Saving icons for actions and status makes the interface calmer and easier to scan.

::demo:icon-glyph-vs-icon::`,
    guidelines: `## Live Do & Don't comparisons

::demo:icon-do-label::

::demo:icon-do-restraint::

## Do
- Pair every icon with a visible label, or an aria-label for icon-only buttons.
- Use 1.5px stroke icons at 16, 20 or 24px.
- Colour icons with currentColor.
- Use typographic glyphs (→ · ✓ …) where they read clearly.
- Reserve icon-only buttons for close, search, menu and more.

## Don't
- Don't put an icon on every nav item or card header by default.
- Don't put two icons on one control.
- Don't mix stroke weights or icon families on the same screen.
- Don't use sparkles to mean "AI."
- Don't use icons as the only signal of state.

## When to use an icon
- Repeated actions in dense toolbars.
- Status reinforcement next to coloured text.

## When not to
- Marketing pages, headings, form labels, menu items with clear words.`,
    specs: `## Stroke weight and button icon redlines

::demo:icon-stroke-sizes::

::demo:icon-redline-button::

| Size tier | Box dimensions | Stroke width | Optical offset | Typical host |
|---|---|---|---|---|
| Compact | \`16×16px\` | \`1.5px\` | \`0px\` | Buttons, badges, inline metadata |
| Standard | \`20×20px\` | \`1.5px\` | \`-0.5px\` baseline | Top nav triggers, inputs, alerts |
| Display | \`24×24px\` | \`1.5px\` | \`0px\` | Empty state headers, mobile sheet close |

## Tokens
- \`--icon-sm: 16px\` (with 13–14px text)
- \`--icon-md: 20px\` (with 16–18px text)
- \`--icon-lg: 24px\` (standalone controls)
- \`--icon-stroke: 1.5\`
- Icon-to-label gap: 8px (4px at 16px size)

## Anatomy
- Glyph centred in a square box matching its size.
- Interactive wrapper at least 44×44px, even when the glyph is 20px.

## Snippet
\`\`\`tsx
import { X } from 'lucide-react';

export function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-current"
    >
      <X size={20} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}
\`\`\``,
    accessibility: `## Accessible names for icon controls

::demo:icon-ax-names::

## Requirements
- WCAG 1.1.1 (Non-text Content): decorative icons get \`aria-hidden="true"\`; meaningful icon-only controls need an accessible name.
- WCAG 2.5.3 (Label in Name): if a button shows text, its accessible name must contain that text.
- WCAG 1.4.11 (Non-text Contrast): meaningful icons need 3:1 against their background.
- WCAG 2.5.8 (Target Size): the clickable area is at least 44×44px in Accent, regardless of glyph size.

## Screen readers
- Never let an SVG announce as "image" or read its file name. Hide it and label the button.
- Tooltips supplement, never replace, the accessible name.

## High contrast
- Use currentColor so icons follow forced-colors mode.`,
  },
  rules: [
    {
      id: 'icon.one-per-control',
      statement: 'Use at most one icon per button, link or menu item.',
      why: 'A control has one idea; extra glyphs are noise.',
    },
    {
      id: 'icon.labelled',
      statement: 'Every icon must have a visible text label or, for icon-only buttons, an aria-label.',
      why: 'Outside a tiny core set, people guess icon meanings wrong.',
    },
    {
      id: 'icon.stroke-1-5',
      statement: 'Icons use strokeWidth 1.5 only.',
      why: 'Mixed stroke weights make a screen look assembled from parts.',
      violationPattern: 'strokeWidth=\\{?["\']?(1|2|2\\.5|3)["\']?\\}?',
    },
    {
      id: 'icon.sizes',
      statement: 'Icons are 16, 20 or 24px.',
      why: 'Sizes on the 4/8 grid align with type and spacing.',
      violationPattern: 'size=\\{(10|12|14|18|22|28)\\}',
    },
    {
      id: 'icon.no-sparkles',
      statement: 'Do not use sparkle icons to represent AI features.',
      why: 'It is the single most generic tell of template UI.',
      violationPattern: '\\bSparkles?\\b',
    },
  ],
};
