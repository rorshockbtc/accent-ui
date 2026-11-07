import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'start/colors-type-grids',
  section: 'start',
  title: 'Colors Type Grids (the poster)',
  summary:
    'Kyle Cyree’s human-made poster on grid-based design, typography, and the interaction of color. The source document for Accént’s foundations.',
  readingMinutes: 4,
  tabs: {
    overview: `## The source document

Before Accént had a name, it had a poster. *Albers & Vignelli in CSS: The Interaction of Color & How to Help Typography Breathe* is a one-sheet manifesto by Kyle Cyree of Colon Hyphen Bracket. It is one hundred percent human-made, and almost every foundation in this system traces back to it.

[Open the interactive poster](https://cassandra.colonhyphenbracket.pink/colorstypegrids) · [Download the PDF](/accent/colors-type-grids-poster.pdf)

::demo:poster::

## The ideas in one page

- **Eight is the number.** Computers count in powers of two, and eight is half of the web’s 16px root size. Every dimension is divisible by eight, and occasionally by four.
- **Round the 71 up.** If auto layout makes a text box 71px tall and you leave it, the grid degrades “one lazy auto layout at a time.” Make it 72.
- **You only have a few shapes.** Mostly rectangles and circles. Everything else is decoration: color, typography, iconography, and media.
- **Cards have anatomy.** Surface, Art, Interaction, and an Anchor. Surfaces are a touch taller than wide (400 × 408) because people like art sitting slightly above dead center.
- **Color is never alone.** Following Josef Albers, a color is either in relief (supporting) or in focus. It only exists in relation to what surrounds it.
- **Break the grid on purpose.** Sometimes the size of the circle matters more than the padding. Bend a rule only when you can say why, and only in service of the whole.
- **Humans first.** See people as humans first, users second, and customers last, if you earn and keep their trust.

## Where these ideas live in Accént

- [Grid & Spacing](/design-system/foundations/grid)
- [Typography, Leading & Rhythm](/design-system/foundations/typography)
- [Color & Contrast](/design-system/foundations/color)
- [Shape, Radius & Elevation](/design-system/foundations/shape)
- [Relief and Focus](/design-system/essays/relief-and-focus), the long-form essay`,
  },
  rules: [
    {
      id: 'poster.round-to-grid',
      statement: 'Round any computed dimension to the nearest multiple of 8 (or 4 for fine detail).',
      why: 'A 71px box breaks the root grid; 72px keeps it.',
    },
  ],
};
