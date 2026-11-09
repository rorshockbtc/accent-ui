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

Accént replaces card soup with **Open Architectural Pedestals** and **Hairline Ledgers**:

- **Open Architectural Pedestal**: Content sits directly on the warm sandstone (\`#E8E2D5\`) or archival paper (\`#FAF8F5\`) canvas, anchored at the top by a crisp \`2px\` structural rule (\`border-t-2 border-[#111827]\`, or \`border-[#FE299E]\` for the primary focal column).
- **Hairline Ledger Row**: Dense directories and indexes use a 12-column horizontal table row separated by \`1px\` hairlines (\`border-b border-[var(--a-rule)]\`) with tabular numerals and hover highlights.

::demo:pedestal-comparison::`,

    guidelines: `## When to use a Pedestal vs. a Ledger vs. a Card

- **Use an Open Pedestal** for 3-column feature rows, flagship canons, Today's Three stories, and Personal/Business/Topic Pipe showcases.
- **Use a Hairline Ledger** whenever displaying more than 9 items in a directory, changelog, token table, or search index.
- **Reserve Cards** strictly for standalone interactive widgets (such as an audio player, a checkout form well, or a draggable modal) and **never nest a card inside another card**.`,

    specs: `## Reference Markup: 3-Column Open Architectural Pedestal

\`\`\`tsx
<article className="group flex flex-col justify-between pt-6 border-t-2 border-[#111827] hover:border-[#FE299E] transition-colors">
  <div className="space-y-3.5">
    <div className="flex items-center justify-between font-mono text-xs">
      <span className="font-bold text-[#FE299E]">pipe\\stoicism</span>
      <span className="text-[#111827]/60">27 notes</span>
    </div>
    <h3 className="font-serif text-2xl sm:text-3xl text-[#111827]">
      Classical Stoic Canon
    </h3>
    <p className="text-sm sm:text-base text-[#111827]/75 leading-relaxed">
      Primary-source treatises from Marcus Aurelius, Epictetus, and Seneca.
    </p>
  </div>
  <div className="pt-6 mt-6 flex items-center justify-between">
    <a href="/explore/stoicism" className="font-mono text-xs font-bold uppercase tracking-wider">
      Open Pipe →
    </a>
  </div>
</article>
\`\`\``,

    accessibility: `## Semantic Structure

- Wrap each independent pedestal in \`<article>\` or \`<li>\` inside an \`<ol>\`/\`<ul>\`.
- Ensure the heading inside the pedestal follows sequential document hierarchy (\`<h2>\` or \`<h3>\`).`,
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
