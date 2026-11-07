import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/shape',
  section: 'foundations',
  kind: 'doc',
  title: 'Shape, Radius & Elevation',
  summary: 'Card anatomy from Albers, an asymmetric corner, a five-step radius scale, and borders before shadows.',
  readingMinutes: 5,
  tabs: {
    overview: `## A designer has few shapes

Strip any interface down and you find rectangles and circles. That's it. Buttons, cards, inputs, modals, avatars: rectangles with corners of different roundness, and the occasional circle. Everything else, as Kyle's poster says, is decoration. Colour, type, icons, images.

That sounds limiting. It is actually freeing. If shapes are this basic, then the small choices about them, how round the corners are, whether a box has a border or a shadow, how boxes nest, carry a lot of character. Get them consistent and the interface feels built by one hand. Get them random and it feels like a jumble sale.

## Card anatomy

The card is the workhorse of modern interfaces, so Accent defines it precisely. Borrowing from Albers, every card has four parts:

- **Surface.** The rectangle itself: its colour, size and corners. The surface is in relief. It holds things up without asking to be looked at.
- **Art.** The image, crest, chart or large number that makes the card recognisable at a glance. This is in focus.
- **Interaction.** What you can do: the whole card as a link, a button, a menu. One primary interaction per card.
- **Anchor.** The text that names it: a title, perhaps a line of metadata. The anchor is how people refer to the card out loud ("the one that says Spring Menu").

If you can't point to all four, the card is probably either a paragraph pretending to be a card or a page crammed into one.

::demo:card-anatomy::

## The asymmetric corner

Accent's signature shape is a card with corners of **0, 12, 0, 12**: top-left square, top-right rounded, bottom-right square, bottom-left rounded. In CSS order, that is \`border-radius: 0 12px 0 12px\`.

Why? Because a fully rounded card is the default of every template on earth, and a fully square card reads as stark. The asymmetric corner is a small inflection, like an accent mark on a letter. It signals "this was designed" without shouting. It also gives the card a direction, a gentle diagonal movement from top-left to bottom-right that matches how people read.

Use it on cards and feature panels. Don't use it on buttons or inputs, where an unexpected shape makes people hesitate.

## The radius scale

For everything else, five steps:

- **0** for full-bleed images, tables, and things that touch the screen edge.
- **4** for badges, chips and small tags.
- **8** for buttons and inputs.
- **12** for cards, modals and panels.
- **999** for pills and circles: avatars, toggles, round icon buttons.

Larger elements get larger radii. A 4px radius on a big modal looks pinched; a 12px radius on a small badge turns it into a lozenge.

## Borders before shadows

*Elevation* is the illusion that something sits above the page. The default tool is a drop shadow. Accent prefers a **1px border in Gallery Stone (#E8E2D5)** instead.

Shadows are unreliable. They vanish on bright screens, look muddy on dark backgrounds, and disappear entirely in Windows high-contrast mode. A border is crisp everywhere and costs nothing to render. Save shadows for things that genuinely float over other content: menus, popovers, dialogs. Even then, keep them soft and short.

## No card in a card

The quickest way to make an interface feel cramped is to nest boxes inside boxes: a card containing a panel containing a bordered list of mini-cards. Each layer adds padding, a border and another corner radius, and soon the content is a small island in a sea of frames.

If a card needs sections, separate them with spacing or a single divider line. If it needs sub-cards, it should probably be a page.

## The Accent rule

Cards have surface, art, interaction and anchor. Signature cards use 0, 12, 0, 12. Radii come from 0, 4, 8, 12, 999. Borders do the work of shadows. Never nest cards.

> **Why:** An asymmetric \`0 12px 0 12px\` corner cut gives a card an unmistakable architectural signature without resorting to heavy shadows or gimmicky chrome.

::demo:shape-radius-scale::

::demo:shape-asymmetric-corner::`,
    guidelines: `## Live Do & Don't comparisons

::demo:shape-do-no-nesting::

::demo:shape-do-border-rest::

## Do
- Give every card a surface, art, interaction and anchor.
- Use \`rounded-[0_12px_0_12px]\` on signature cards and feature panels.
- Use 8px radius on buttons and inputs, 4px on badges.
- Separate surfaces with a 1px Gallery Stone border.
- Reserve shadows for floating layers: menus, popovers, dialogs.

## Don't
- Don't nest a bordered card inside another bordered card.
- Don't use radii outside the scale (6, 10, 16, 20, 24).
- Don't put the asymmetric corner on buttons or inputs.
- Don't stack heavy shadows like \`shadow-2xl\` on static cards.
- Don't give one card more than one primary interaction.

## When to use a shadow
- An element floats above content and can be dismissed.

## When not to
- Static cards, inputs, sections. Use a border.`,
    specs: `## Card shape redline and stroke scale

::demo:shape-redline-card::

::demo:shape-strokes::

| Token | Radius value | CSS | Where to use |
|---|---|---|---|
| Sharp | \`0px\` | \`rounded-none\` | Hairline dividers, full-bleed bands |
| Subtle | \`4px\` | \`rounded-sm\` | Inline code chips, checkboxes, kbd tags |
| Control | \`6px–8px\` | \`rounded-md\` / \`rounded-lg\` | Inputs, selects, figure stages, menus |
| Signature card | \`0 12px 0 12px\` | \`rounded-[0_12px_0_12px]\` | Editorial dossier cards and poster studies |
| Pill | \`9999px\` | \`rounded-full\` | Status badges, avatars, audio Play button |

## Radius tokens
- \`--radius-0: 0\`
- \`--radius-sm: 4px\`
- \`--radius-md: 8px\`
- \`--radius-lg: 12px\`
- \`--radius-pill: 999px\`
- \`--radius-accent: 0 12px 0 12px\`

## Card
- Size: 400×408 (or fluid width with \`aspect-[400/408]\` art)
- Surface: Card #F3EFE9, 1px border #E8E2D5
- Padding: 16 (mobile) / 24 (desktop)
- Art → anchor gap: 16
- Anchor: title 18/28, meta 13/20

## Elevation
- Level 0: border only.
- Level 1 (menus): \`0 4px 16px rgba(17,24,39,0.08)\`
- Level 2 (dialogs): \`0 16px 48px rgba(17,24,39,0.16)\`

## Snippet
\`\`\`tsx
export function AccentCard({ title, meta, href, art }: { title: string; meta: string; href: string; art: React.ReactNode }) {
  return (
    <a href={href} className="block overflow-hidden rounded-[0_12px_0_12px] border border-[#E8E2D5] bg-[#F3EFE9]">
      <div className="aspect-[400/408]">{art}</div>
      <div className="p-4 md:p-6">
        <h3 className="text-lg leading-7">{title}</h3>
        <p className="text-[13px] leading-5">{meta}</p>
      </div>
    </a>
  );
}
\`\`\``,
    accessibility: `## Forced-colors border preservation

::demo:shape-ax-forced-colours::

## Requirements
- WCAG 1.4.11 (Non-text Contrast): if a border is the only thing defining a control's edge (inputs, buttons), it needs 3:1 against the background. Decorative card borders are exempt, but the card must still be identifiable by its content.
- WCAG 2.4.7 (Focus Visible): whole-card links need a visible focus ring that follows the card shape. Use \`outline\` with \`outline-offset\`, which respects border-radius in modern browsers.

## Whole-card links
- Wrap the card in one link, or use a stretched-link pattern from the title. Don't nest buttons inside a link.
- The accessible name should be the anchor text, not the entire card's content read as one run-on sentence.

## Forced colours
- Shadows disappear in high-contrast mode; borders remain. Another reason to prefer borders.`,
  },
  rules: [
    {
      id: 'shape.radius-scale',
      statement: 'Use only border radii of 0, 4, 8, 12 or 999px.',
      why: 'A short radius scale makes shapes feel made by one hand.',
      violationPattern: 'rounded-\\[(2|3|5|6|7|9|10|14|16|18|20|24)px\\]',
    },
    {
      id: 'shape.accent-corner',
      statement: 'Signature cards use border-radius 0 12px 0 12px; buttons and inputs never do.',
      why: 'The asymmetric corner is a recognisable inflection; on controls it causes hesitation.',
    },
    {
      id: 'shape.borders-over-shadows',
      statement: 'Static surfaces use a 1px #E8E2D5 border instead of a drop shadow.',
      why: 'Borders stay crisp on every screen and in high-contrast mode.',
      violationPattern: 'shadow-(xl|2xl)',
    },
    {
      id: 'shape.no-card-in-card',
      statement: 'Never nest a bordered card inside another bordered card.',
      why: 'Nested frames waste space and bury content.',
    },
    {
      id: 'shape.card-anatomy',
      statement: 'Every card has a surface, art, one primary interaction and a text anchor.',
      why: 'Clear anatomy makes cards scannable and nameable.',
    },
  ],
};
