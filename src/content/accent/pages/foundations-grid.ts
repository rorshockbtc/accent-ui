import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/grid',
  section: 'foundations',
  kind: 'doc',
  title: 'Grid & Spacing',
  summary: 'An 8pt base, a 4pt fallback, and a short spacing scale that keeps every layout honest.',
  readingMinutes: 5,
  tabs: {
    overview: `## What a grid is

A grid is an agreement. Every box, gap and margin on the page promises to land on the same set of invisible lines. Nobody sees the lines. Everybody feels them. A page built on a grid looks calm even when it is crowded, and a page built without one looks slightly drunk even when it is nearly empty.

Accent uses an **8pt grid**. Every width, height, padding and gap is a multiple of 8. When 8 is too coarse, which happens with small type and tight controls, you may settle for **4**. That is the whole rule. Most of this page is about why it holds up.

## Why 8

Computers think in powers of two. Screens come in widths like 1280, 768 and 390, and almost all of them divide cleanly by 8. The browser's default root font size is 16px, and 8 is exactly half of it. So when you build on 8, your spacing, your type and your screen sizes all share a common factor. Things line up without anyone having to nudge them.

The other reason is human. A short list of allowed numbers ends arguments. Without a grid, every padding value is a fresh decision: 13? 14? 15? Feels about right? Multiply that by forty components and five people and you get what Kyle's poster calls "slapdashery of dimestore interface designs." With a grid the question becomes: 8, 12 or 16? Pick one and move on.

## The 71px problem

Here is how a grid dies. Somebody uses auto layout in Figma. A text box comes out 71px tall because the font's line box happens to land there. Nobody rounds it. The card under it now starts at 71, its padding pushes the next thing to 87, and three screens later nothing lines up with anything.

Round 71 to 72. Every time. The root grid degrades "one lazy auto layout at a time," and the fix is equally small: one deliberate rounding at a time. Same goes for padding at 13 when the scale offers 12 and 16. Thirteen is not a design choice. It is a typo that shipped.

::demo:grid-overlay::

## Columns

Spacing handles the small stuff. Columns handle the big stuff: where content starts and stops across the page.

- **Desktop (1024px and up):** 12 columns, 24px gutters, content capped at 1280px wide. Twelve divides into halves, thirds, quarters and sixths, so almost any layout fits.
- **Tablet (768px):** 8 columns, 24px gutters. Halves and quarters still work. Thirds get awkward, so avoid them here.
- **Mobile (390px):** 4 columns, 16px gutters and 16px outer margins. Most things go full width. Two-up cards are the most you should try.

A *gutter* is the gap between columns. A *margin* is the gap between the outermost column and the edge of the screen. Neither is decoration; they are breathing room.

## The spacing scale

You do not get every multiple of 8. You get a short list:

**4, 8, 12, 16, 24, 32, 48, 64, 96**

Small steps at the bottom for icon gaps and tight labels. Big jumps at the top for section breaks. The gaps between steps grow as the numbers grow, because your eye notices the difference between 4 and 8 far more than the difference between 88 and 96.

::demo:spacing-scale::

A useful habit: related things sit close (8 or 12), unrelated things sit far (32 or more). Spacing is the cheapest way to say "these belong together" without drawing a single line.

## Breaking the grid

Sometimes you should break it. The poster puts it plainly: "the size of the circle is more important than the padding." If an avatar needs to be 44px to be tappable and recognisable, and the padding that would keep it on-grid makes the card look starved, keep the avatar and adjust the padding.

The test is simple. Can you say out loud why you broke it, in one sentence, in service of the whole page? "The logo's optical weight needed 2px more" passes. "It looked fine" does not. Bend rules for a reason. Never bend them by accident.

## The Accent rule

Every dimension is a multiple of 8, or of 4 when 8 is too coarse. Spacing comes from the scale. Columns follow the 12/8/4 pattern. Break any of it only with a reason you would write in a commit message.

> **Why:** Rounding every box height to a multiple of 8 prevents single-pixel drift from accumulating down a multi-column page.

::demo:grid-round-stack::

::demo:grid-break-reason::`,
    guidelines: `## Live Do & Don't comparisons

::demo:grid-do-scale::

::demo:grid-do-rounding::

## Do
- Pick spacing from the scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Round auto-layout output to the nearest multiple of 8 (or 4). 71 becomes 72.
- Group related items with small gaps (8–12) and separate sections with large ones (32+).
- Cap content at 1280px on desktop and centre it.
- Use 16px side margins on phones.

## Don't
- Don't use 13, 15, 18 or 20 for padding. 20 is a multiple of 4 but not on the scale; use 16 or 24.
- Don't nest arbitrary Tailwind values like \`p-[13px]\`.
- Don't let every gap be the same size. Uniform spacing erases hierarchy.
- Don't use thirds on the 8-column tablet grid.

## When to use 4
- Gaps between an icon and its label.
- Padding inside badges and small chips.
- Fine-tuning line boxes on small type.

## When to break the grid
- When an element's size matters more than the spacing around it (avatars, logos, targets).
- When optical alignment beats mathematical alignment, such as a round glyph sitting 1–2px past an edge.
- Write the reason down. If you can't, don't break it.`,
    specs: `## Column and card redlines

::demo:grid-redline-columns::

::demo:grid-redline-card::

| Viewport tier | Breakpoint | Columns | Gutter | Outer margin | Max container |
|---|---|---|---|---|---|
| Mobile | \`390px\` | \`4\` | \`16px\` | \`16px\` | \`100%\` |
| Tablet | \`768px\` | \`8\` | \`24px\` | \`24px\` | \`768px\` |
| Desktop | \`1280px+\` | \`12\` | \`24px\` | \`24px\` | \`1280px–1440px\` |

## Tokens
- \`--space-1: 4px\`
- \`--space-2: 8px\`
- \`--space-3: 12px\`
- \`--space-4: 16px\`
- \`--space-6: 24px\`
- \`--space-8: 32px\`
- \`--space-12: 48px\`
- \`--space-16: 64px\`
- \`--space-24: 96px\`

## Columns
- Desktop ≥1024px: 12 columns, 24px gutter, max-width 1280px, 32px outer margin.
- Tablet 768–1023px: 8 columns, 24px gutter, 24px margin.
- Mobile <768px: 4 columns, 16px gutter, 16px margin.

## Tailwind mapping
Tailwind's default scale is already 4-based. Allowed: \`1, 2, 3, 4, 6, 8, 12, 16, 24\`. Avoid \`5, 7, 9, 10, 11\` and any bracketed pixel values.

## Snippet
\`\`\`tsx
export function PageGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-4 gap-4 md:grid-cols-8 md:gap-6 lg:grid-cols-12">
        {children}
      </div>
    </div>
  );
}
\`\`\``,
    accessibility: `## Text-spacing resilience (WCAG 1.4.12)

::demo:grid-ax-textspacing::

## Spacing is an accessibility feature
- WCAG 1.4.12 (Text Spacing): layouts must survive users raising line-height to 1.5, paragraph spacing to 2×, and letter spacing to 0.12em. Don't fix heights on text containers; let the grid flex vertically.
- WCAG 1.4.10 (Reflow): content must work at 320px wide without horizontal scrolling. The 4-column mobile grid with 16px margins satisfies this.
- WCAG 2.5.8 (Target Size): keep at least 8px between adjacent interactive targets, and Accent targets are 44×44px minimum.

## Zoom
- Use rem for spacing tokens where possible so spacing scales with the user's font size.
- Test at 200% zoom. The 12-column layout should collapse to 8 or 4 rather than overflow.

## Grouping
- Screen reader users don't see spacing. If proximity is the only thing grouping items, add a heading, a list or a fieldset so the grouping exists in the markup too.`,
  },
  rules: [
    {
      id: 'grid.multiple-of-8',
      statement: 'Every padding, margin, gap, width and height must be a multiple of 8px, or of 4px when 8 is too coarse.',
      why: 'A shared base unit makes everything line up without manual nudging.',
      violationPattern: '(p|m|gap|w|h|px|py|mx|my|pt|pb|pl|pr|mt|mb|ml|mr)-\\[(1|2|3|5|6|7|9|10|11|13|14|15|17|18|19|21|22|23)px\\]',
    },
    {
      id: 'grid.spacing-scale',
      statement: 'Use only spacing values from the scale 4, 8, 12, 16, 24, 32, 48, 64, 96.',
      why: 'A short list of options ends bikeshedding and keeps rhythm consistent.',
      violationPattern: '\\b(p|m|gap|px|py|mx|my)-(5|7|9|10|11)\\b',
    },
    {
      id: 'grid.round-auto-layout',
      statement: 'Round any computed dimension to the nearest multiple of 8 (71 becomes 72).',
      why: 'Grids degrade one lazy auto layout at a time.',
    },
    {
      id: 'grid.columns',
      statement: 'Use 12 columns with 24px gutters on desktop (max 1280px), 8 on tablet, and 4 on mobile with 16px gutters and margins.',
      why: 'Predictable columns make layouts portable across screen sizes.',
    },
    {
      id: 'grid.break-with-reason',
      statement: 'Only break the grid when an element size matters more than its spacing, and leave a comment explaining why.',
      why: 'Rules bent on purpose serve the whole; rules bent by accident erode it.',
    },
  ],
};
