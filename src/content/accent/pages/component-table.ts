import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/table',
  section: 'components',
  title: 'Data Tables, Ledgers & Financial Schedules',
  summary:
    'High-density tabular layouts with tabular-nums alignment, 1px hairline dividers, sticky headers, and responsive mobile overflow rules.',
  readingMinutes: 5,
  tabs: {
    overview: `## Tables are for comparison, not decoration

Whether displaying WCAG contrast ratios, bank balance-sheet NIM schedules in \`pipe\\commercial-banking\`, or 260+ Topic Pipes in a directory, tables must scan effortlessly across rows and columns.

Accént tables strip away vertical cell borders and alternating zebra stripes in favor of **clean horizontal hairlines (\`divide-y divide-[var(--a-rule)]\`)**, right-aligned \`tabular-nums\` for numbers, and generous \`py-3.5\` row padding.

> **Why:** Vertical borders create optical cages that slow horizontal reading; subtle 1px horizontal rules guide the eye cleanly across columns.

::demo:hairline-table-demo::`,

    guidelines: `## Do & Don't

- **Do** apply \`tabular-nums\` (\`font-variant-numeric: tabular-nums\`) to every column containing numbers, prices, percentages, dates, or contrast ratios so decimals align vertically.

::demo:table-tabular-nums::

- **Do** left-align text columns and right-align numeric columns so decimal points line up cleanly, and never nest cards or multi-button toolbars inside table rows.

::demo:table-cell-restraint::`,

    specs: `## Table Anatomy & Spacing

| Layer | Class / Token | Role |
|---|---|---|
| **Header Row (\`<thead>\`)** | \`border-b-2 border-[var(--a-ink)] font-mono text-[13px] uppercase\` | Anchors sticky column headers cleanly |
| **Body Row (\`<tbody> tr\`)** | \`border-b border-[var(--a-rule)] hover:bg-[var(--a-surface)]\` | Subtle sand shift on row inspection |
| **Cell Padding** | \`py-3.5 px-3\` | Ensures generous row rhythm and touch safety |

::demo:table-anatomy-redline::`,

    accessibility: `## Table Accessibility & Responsive Scroll Containment

- Always use native \`<table>\`, \`<thead>\`, \`<tbody>\`, \`<th scope="col">\`, and \`<td>\` elements so assistive technology announces row/column headers automatically.
- Wrap wide tables in an \`overflow-x-auto\` container with \`tabIndex={0}\` and \`role="region"\` so 390px mobile viewports scroll the table locally rather than breaking page width.

::demo:table-scroll-region::`,
  },
  rules: [
    {
      id: 'table.tabular-nums',
      statement:
        'Apply tabular-nums to all numeric, currency, percentage, date, and index columns in tables and ledgers.',
      why: 'Proportional digits jitter horizontally and prevent vertical comparison.',
    },
    {
      id: 'table.no-vertical-borders',
      statement:
        'Use horizontal 1px hairlines (border-b border-[var(--a-rule)]) between table rows; never draw vertical grid lines between columns.',
      why: 'Vertical cell borders create visual cages that slow horizontal eye scanning.',
    },
  ],
};
