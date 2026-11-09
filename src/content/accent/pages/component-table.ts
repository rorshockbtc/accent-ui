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

::demo:hairline-table-demo::`,

    guidelines: `## Do & Don't

- **Do** apply \`tabular-nums\` (\`font-variant-numeric: tabular-nums\`) to every column containing numbers, prices, percentages, dates, or contrast ratios.
- **Do** left-align text columns and right-align numeric columns so decimal points line up vertically.
- **Don't** put cards or multi-line buttons inside table cells.`,

    specs: `## Table Anatomy & Spacing

- **Header Row (\`<thead>\`)**: \`text-xs font-mono font-semibold uppercase tracking-wider text-[var(--a-muted)] border-b-2 border-[var(--a-ink)]\`
- **Body Row (\`<tbody> tr\`)**: \`border-b border-[var(--a-rule)] hover:bg-[var(--a-surface)] transition-colors\`
- **Cell Padding**: \`py-3.5 px-3\` (minimum \`44px\` row height)`,

    accessibility: `## Table Accessibility

- Always use native \`<table>\`, \`<thead>\`, \`<tbody>\`, \`<th scope="col">\`, and \`<td>\` elements.
- Wrap wide tables in an \`overflow-x-auto\` container with \`tabIndex={0}\` and \`role="region"\` so mobile viewports never clip columns.`,
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
