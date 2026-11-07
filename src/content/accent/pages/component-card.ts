import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/card',
  section: 'components',
  title: 'Cards',
  summary: 'Surface, art, interaction, anchor: the four parts of every Accent card, on a 400×408 surface.',
  readingMinutes: 5,
  kind: 'doc',
  tabs: {
    overview: `## A card is a small room

A card groups everything about one thing: a recipe, an essay, a product, a person. It lets a reader compare many things at a glance and pick one. Done well, a grid of cards feels like a gallery wall. Done badly, it looks like a pile of coupons.

The difference is almost always discipline. Same shape, same proportions, same order of parts, every time.

> **Why:** Repeating the exact four-part order (Surface, Art, Interaction, Anchor) on a 400×408 frame lets readers scan across a 12-column grid without recalibrating their eyes on every tile.

::demo:card-parts::

## Anatomy: four parts

Accent borrows the card anatomy from Josef Albers' way of looking at color. Nothing is seen in isolation; each part is either in support or in focus.

- **Surface.** The ground. Card color (#F3EFE9 on light foundations) set against the page (#FAF8F5). The surface is in support. It should never shout.
- **Art.** The image, illustration or big number. This is what the eye lands on first. It is in focus.
- **Interaction.** What you can do: the title link, a button, a menu. Usually one primary interaction, which is the whole card.
- **Anchor.** The text that grounds the art: title, a line of description, metadata. It tells you what you are looking at.

## Proportion: 400 × 408

The standard Accent surface is 400px wide and 408px tall. It is 2% taller than wide. That small extra height lets the art sit slightly above dead center, which is where people prefer it. Optical center sits a touch higher than geometric center, and a perfectly square card always feels like it is sagging. Both numbers sit on the 8px grid.

## Radius: 0, 12, 0, 12

Accent cards use an asymmetric radius: square top-left, 12px top-right, square bottom-right, 12px bottom-left. It is a small accent mark, a visual inflection, and it makes a grid of cards read as a family. Do not mix it with fully rounded cards on the same page.

## States

- **Rest.** Surface with a 1px hairline ring.
- **Hover.** The ring darkens slightly and the art may scale by at most 2%. No bouncing, no tilting.
- **Focus-visible.** A clear focus ring around the whole card when the card is a link.
- **Selected.** For pickers: a 2px accent ring plus a check icon. Never color alone.

::demo:card-examples::

## When to use

Use cards for collections of comparable things where an image or summary helps people choose. Use a plain list when items are text-only and people scan by name, like settings or a table of invoices. A card for a single paragraph of text is a box, not a card.

## Breaking the grid

Sometimes the art matters more than the padding. If a logo or portrait needs to grow, grow it in 8px steps and keep the anchor aligned. Bend the rule only when you can say why it serves the whole.`,
    guidelines: `## Live Do & Don't comparisons

::demo:card-do-nesting::

::demo:card-do-radius::

## Do

- Keep every card in a grid the same size and same part order.
- Make the whole card one link when it leads to one place.
- Write anchor titles that make sense out of context.
- Use 4:5 or 400×408 art crops consistently within a grid.

## Don't

- Don't nest cards inside cards.
- Don't put three buttons on a card. One interaction, maybe a secondary menu.
- Don't mix rounded and asymmetric radii in the same grid.
- Don't use cards for single blocks of text.
- Don't animate cards with tilt, bounce or parallax on hover.

## When to use

- Galleries, product grids, essay indexes, team pages.

## When not to

- Dense data (use a table or list).
- One-off content blocks (use a section).`,
    specs: `## Card anatomy redline and proportions

::demo:card-redline::

| Part | Measurement | Token / Class | Notes |
|---|---|---|---|
| Surface ratio | \`400×408\` (or fluid column) | \`rounded-[0_12px_0_12px]\` | 2% taller than wide per *Colors Type Grids* |
| Padding | \`24px\` (3 × 8) | \`p-6\` | \`16px\` (\`p-4\`) on compact mobile tiles |
| Border | \`1px solid\` | \`border-[#111827]/12\` | Replaces drop shadows at rest |
| Anchor heading | \`20px / 28px\` | \`font-serif text-xl\` | Carries the single card link |
| Interaction | \`≥ 44px\` tall | \`min-h-[44px]\` | One primary action per card |

## Tokens

- Surface: 400×408px (fluid: \`aspect-[400/408]\`).
- Radius: \`rounded-[0_12px_0_12px]\`.
- Surface color: Card #F3EFE9 on Alabaster #FAF8F5.
- Ring: 1px \`ring-foreground/10\`.
- Padding: 16px default, 12px small (\`size="sm"\`).
- Gap between parts: 16px.
- Title: display serif, 20–24px; description: UI sans 14px, 2 lines max.
- Grid gap: 24px desktop, 16px mobile.

## Anatomy order

1. Art
2. Anchor (title, description)
3. Metadata (badge, date)
4. Interaction (whole-card link or footer action)

## Usage

\`\`\`tsx
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

<a href="/essays/albers" className="block focus-visible:ring-3">
  <Card className="aspect-[400/408] rounded-[0_12px_0_12px]">
    <img src="/sample/albers.jpg" alt="" className="aspect-[4/5] object-cover" />
    <CardHeader>
      <CardTitle>Color is never alone</CardTitle>
      <CardDescription>Albers and the interaction of color.</CardDescription>
    </CardHeader>
  </Card>
</a>
\`\`\``,
    accessibility: `## Single-tab-stop card link pattern

::demo:card-ax-keyboard::

## Requirements

- **One link per card.** Wrap the card in a single link, or use the title link with a stretched pseudo-element. Avoid several links that read the same.
- **Alt text.** Decorative art gets \`alt=""\`; informative art gets a real description (WCAG 1.1.1).
- **Focus.** The whole card shows a visible focus ring (WCAG 2.4.7).
- **Contrast.** Anchor text at 7:1 on the card surface.
- **Headings.** Card titles use a consistent heading level so screen reader users can jump between them.
- **Motion.** Hover scale is disabled under \`prefers-reduced-motion\`.

## Keyboard

One Tab stop per card, plus one for any secondary menu.`,
  },
  rules: [
    {
      id: 'card.four-parts',
      statement: 'Cards contain surface, art, anchor (title) and one interaction, in that order.',
      why: 'Consistent order lets people compare cards without re-reading each one.',
    },
    {
      id: 'card.proportion',
      statement: 'Use 400×408 (aspect-[400/408]) or 4:5 card proportions consistently within a grid.',
      why: 'Slightly taller than wide places art near optical center.',
    },
    {
      id: 'card.asymmetric-radius',
      statement: 'Accent cards use radius 0 12px 0 12px; do not mix with fully rounded cards.',
      why: 'One shape language makes a grid read as a family.',
      violationPattern: 'Card[^>]*rounded-(2xl|3xl|full)',
    },
    {
      id: 'card.no-nesting',
      statement: 'Never nest a Card inside another Card.',
      why: 'Boxes in boxes flatten hierarchy and waste space.',
    },
    {
      id: 'card.grid-8',
      statement: 'Card padding and grid gaps must be multiples of 8px (4px allowed for small sizes).',
      why: 'Off-grid padding degrades the layout one card at a time.',
      violationPattern: '(p|gap|px|py)-\\[(13|15|17|18|19|21|22|23)px\\]',
    },
  ],
};
