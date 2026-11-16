import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/pedestal',
  section: 'components',
  title: 'Architectural Pedestals & Hairline Ledgers (De-Cardification)',
  summary:
    'The signature Accént & CHB replacement for generic SaaS card grids: open border-t-2 and border-l-2 architectural pedestals and scannable 12-column hairline ledgers.',
  readingMinutes: 6,
  tabs: {
    overview: `## Why we de-cardified the web

Generic AI-generated websites wrap every piece of content in a rounded white card with a drop shadow, a border, a badge, and a sub-card inside it. When a page has 30 cards on screen, the boxes compete with the typography and nothing feels important.

> **Why:** Stripping unnecessary borders lets Warm Sandstone breathe as paper so Fraunces headlines and a single chromatic rule establish immediate hierarchy.

Accént replaces card soup with **Open Architectural Pedestals** and **Hairline Ledgers**:

- **Open Architectural Pedestal**: Content sits directly on the warm sandstone (\`#E8E2D5\`) or archival paper (\`#FAF8F5\`) canvas, anchored at the top by a crisp \`2px\` structural rule (\`border-t-2 border-[#111827]\`, or \`border-[#FE299E]\` for the primary focal column).
- **Hairline Ledger Row**: Dense directories and indexes use a 12-column horizontal table row separated by \`1px\` hairlines (\`border-b border-[var(--a-rule)]\`) with tabular numerals and hover highlights.

::demo:pedestal-comparison::`,

    guidelines: `## When to use a Pedestal vs. a Ledger vs. a Card

- **Use an Open Pedestal** for 3-column feature rows, flagship canons, and Personal/Business/Topic showcases.
- **Use a Hairline Ledger** whenever displaying more than 9 items in a directory, changelog, token table, or search index.

::demo:pedestal-density-rule::

- **Reserve Cards** strictly for standalone interactive widgets and **never nest a card inside another card**.

::demo:pedestal-nesting-dont::`,

    specs: `## Architectural Pedestal Spacing & Border Tokens

| Property | Light Token | Focal Column | Purpose |
|---|---|---|---|
| **Top Stroke** | \`border-t-2 border-[var(--a-ink)]\` | \`border-t-2 border-[var(--a-accent)]\` | Anchors reading start without enclosing sides |
| **Top Padding** | \`pt-6\` (\`24px\`) | \`pt-6\` (\`24px\`) | Keeps kicker typography off the top border |
| **Vertical Gap** | \`gap-y-14\` (\`56px\`) | \`gap-y-14\` | Replaces horizontal card gaps with quiet breathing room |

::demo:pedestal-anatomy::`,

    accessibility: `## Semantic Structure & Sequential Landmarks

- Wrap each independent pedestal in \`<article>\` or \`<li>\` inside a semantic \`<ol>\` or \`<ul>\`.
- Ensure the heading inside the pedestal follows sequential document hierarchy (\`<h2>\` for section intro, \`<h3>\` per column) so screen-reader rotor navigation jumps cleanly from item to item.
- Keep all action links inside pedestals \`>= 44×44px\` via inline-flex padding.

::demo:pedestal-heading-tree::`,
  },
  rules: [
    {
      id: 'pedestal.prefer-open-pedestals',
      statement:
        'For 3-column editorial grids and feature showcases, use open top-bordered pedestals (pt-6 border-t-2) directly on the canvas instead of boxed shadowed cards.',
      why: 'Eliminates visual clutter and lets Fraunces/Bricolage typography carry the hierarchy.',
    },
    {
      id: 'pedestal.focal-pink-rule',
      statement:
        'In a 3-column pedestal row, highlight at most one primary column with a Sovereign Pink top rule (border-[#FE299E]) while sibling columns use ink hairlines.',
      why: 'Preserves the one-focal-accent principle so the eye knows where to start.',
    },
  ],
};
