import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/portfolio',
  section: 'patterns',
  title: 'Portfolio & Gallery',
  summary: 'Show the work: consistent 4:5 or 400×408 tiles, honest captions, and case studies that explain decisions.',
  readingMinutes: 5,
  kind: 'doc',
  tabs: {
    overview: `## Let the work talk

A portfolio has one job: make someone want to see more of your work, then make it easy to understand why the work is good. Photographers, illustrators, architects, bakers with a cake gallery: the pattern is the same.

The failure mode is a grid where every tile has a different shape, a different hover trick and a different caption style. The viewer ends up looking at your layout instead of your work. Accent galleries are boring on purpose. The frame is consistent so the pictures can be different.

::demo:card-examples::

## Anatomy of the gallery grid

- **Intro.** A short headline and one paragraph about who you are and what you make. Two sentences beats a manifesto.
- **Filter (optional).** A row of category links when you have more than twelve pieces. Not before.
- **Tiles.** One per project. Every tile uses the same proportion: 4:5 portrait or the 400×408 Accent surface. Pick one and keep it.
- **Captions.** Below the tile, never on top of the image. Title on one line, a short descriptor on the next ("Brand identity, 2026"). 13–14px UI sans.
- **Pagination or load more.** A labeled button, not infinite scroll, so people can find the footer and their place.

## Grid

Three columns on desktop, two on tablets, one or two on phones. Gutters of 24px on desktop and 16px on mobile, both on the grid. Tiles crop to the proportion with \`object-cover\`; you choose the focal point so faces and products are not cut in half.

## The case study

Clicking a tile opens a case study, which is an article reading view with more images. A good case study follows a simple structure:

- **The brief.** What was asked, by whom, and the constraint that made it interesting.
- **The work.** The final pieces, big.
- **The decisions.** Two or three choices you made and why. This is the part clients and hiring managers actually read.
- **The outcome.** What changed. Numbers if you have them, a quote if you do not.
- **Credits.** Who else worked on it.

## States

Tiles have rest, hover (caption underline, image scale no more than 2%), focus-visible (ring around tile), and loading (card-colored placeholder at the correct proportion, so the grid does not jump). Empty galleries show a sentence and an "Add your first piece" action for the owner.

## Imagery

In public Accent docs and demos we use sample or Unsplash imagery only. Never a real user's portrait.

## When to use

Visual work where the image carries the story. For writing portfolios, use an essay index instead.
::demo:portfolio-case-study::

> **Why:** A portfolio exists to show work, so the chrome stays plain. One ratio, one gap and captions below the art make dozens of different projects feel like a single body of work.
`,
    guidelines: `## Do

- Use one tile proportion across the whole grid.
- Put captions below images.
- Set focal points so crops keep the subject.
- Lead with your best three pieces.
- Structure case studies as brief, work, decisions, outcome, credits.

## Don't

- Don't mix portrait, square and landscape tiles in one grid.
- Don't overlay captions on images.
- Don't use infinite scroll.
- Don't add hover tricks (flip, tilt, zoom past 2%).
- Don't show more than 24 pieces on one page.

## When to use

- Visual portfolios, product galleries, event photos.

## When not to

- Writing portfolios (use an essay index).
- Data-heavy listings (use a table).
::demo:portfolio-do-captions::

::demo:portfolio-do-ratio::

## Filtering and touch


::demo:portfolio-filter::

- Filter with real buttons and show a count.
- Hover can add polish, such as a slight lift. It can never carry information.
`,
    specs: `## Tokens

- Tile: \`aspect-[4/5]\` or \`aspect-[400/408]\`, radius 0 12px 0 12px.
- Grid: 3 / 2 / 1 columns at lg / md / base.
- Gutter: 24px desktop, 16px mobile.
- Caption: title UI sans 14px weight 500; descriptor 13px muted; 8px above.
- Placeholder: Card #F3EFE9 at tile proportion.
- Hover scale: max 1.02, 200ms ease-out.

## Usage

\`\`\`tsx
<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
  {works.map((w) => (
    <li key={w.slug}>
      <a href={'/work/' + w.slug} className="group block focus-visible:ring-3">
        <img src={w.src} alt={w.alt} className="aspect-[4/5] w-full rounded-[0_12px_0_12px] object-cover" />
        <p className="mt-2 text-sm font-medium">{w.title}</p>
        <p className="text-[13px] text-muted-foreground">{w.descriptor}</p>
      </a>
    </li>
  ))}
</ul>
\`\`\`
## Redline

::demo:portfolio-redline-tile::

## Tile ratios

| Ratio | Use for | Columns (desktop / phone) |
|---|---|---|
| 4:5 | Posters, print, portraits of objects | 3 / 2 |
| 1:1 | Logos, marks, icons | 4 / 2 |
| 3:2 | Screens, photography | 3 / 1 |
| Gap | 16px everywhere | 16px |

::demo:portfolio-ratios::
`,
    accessibility: `## Requirements

- **Alt text.** Describe what the image shows, not "project image" (WCAG 1.1.1).
- **Lists.** Mark the grid as a list so screen readers announce the count.
- **Focus.** One focusable link per tile with a visible ring (WCAG 2.4.7).
- **Lightboxes.** Trap focus, close on Escape, return focus to the tile.
- **Motion.** Disable hover scale under \`prefers-reduced-motion\`.
- **Captions.** At least 13px and 7:1 against the page.
## Live: one link per tile

::demo:portfolio-ax-tile::
`,
  },
  rules: [
    {
      id: 'portfolio.one-proportion',
      statement: 'All tiles in a gallery share one proportion: 4:5 or 400×408.',
      why: 'A consistent frame lets the work, not the layout, stand out.',
    },
    {
      id: 'portfolio.caption-below',
      statement: 'Place captions below images, not overlaid on them.',
      why: 'Overlays hide the work and often fail contrast.',
    },
    {
      id: 'portfolio.no-infinite-scroll',
      statement: 'Use pagination or a labeled "Load more" button instead of infinite scroll.',
      why: 'Infinite scroll hides the footer and loses the reader\u2019s place.',
    },
    {
      id: 'portfolio.real-alt',
      statement: 'Gallery images need descriptive alt text, never generic words like "image".',
      why: 'Blind visitors deserve to know what the work looks like.',
      violationPattern: 'alt="(image|photo|picture|project)"',
    },
    {
      id: 'portfolio.no-hover-caption',
      statement: 'Never reveal titles or captions only on hover.',
      why: 'Touch and keyboard users never see them.',
      violationPattern: 'group-hover:opacity-100',
    },
    {
      id: 'portfolio.case-study-order',
      statement: 'Case studies run Hero, Context, Process, Result, Next in that order.',
      why: 'Readers who skim still learn what you did and what happened.',
    },
  ],
};
