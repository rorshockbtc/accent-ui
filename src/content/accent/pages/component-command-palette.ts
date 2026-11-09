import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/command-palette',
  section: 'components',
  title: 'Command Bar, Search & Filter Strips (⌘K)',
  summary:
    'Zero-latency search inputs, single-row category pill strips, and keyboard-first command palettes without multi-row control soup.',
  readingMinutes: 5,
  tabs: {
    overview: `## One filter bar, never three

A common failure in complex web apps is stacking multiple rows of competing filter pills, view-mode toggles, sort dropdowns, and search bars at the top of a page. Visitors spend more time decoding the controls than reading the content.

Accént enforces a **Single-Row Filter & Search Bar**:
- Left side: 4 to 7 clear category pills in one horizontal row (\`gap-2\`).
- Right side: A clean \`h-11\` search input with a leading \`16px\` icon in \`--a-accent\` and an instant \`Clear ×\` action when active.

::demo:command-palette-demo::`,

    guidelines: `## Guidelines

- **Instant client-side filtering**: Filter lists on keystroke without requiring a submit button when the dataset has fewer than 500 items.
- **Always provide a zero-results recovery action**: When a search query matches 0 items, offer a 1-click \`Clear Search\` button and a constructive next action (such as claiming the missing topic).`,

    specs: `## Search Input Specification

- **Height**: \`44px\` (\`h-11\`)
- **Shape**: \`rounded-full\` (or \`var(--a-radius-cta)\`)
- **Border**: \`border border-[var(--a-rule)] focus:border-[var(--a-accent)]\`
- **Typography**: \`text-sm font-sans text-[var(--a-ink)] placeholder:text-[var(--a-muted)]\``,

    accessibility: `## Keyboard & Screen Reader Support

- Every search input must have \`type="search"\` and an explicit \`aria-label\`.
- Filter pills must indicate active state via \`aria-pressed={isActive}\` or \`aria-current\`.`,
  },
  rules: [
    {
      id: 'command.single-row-controls',
      statement:
        'Consolidate category filter pills and search inputs into a single horizontal control bar; never stack 3 or more rows of filter toggles above content.',
      why: 'Multi-row control soup overwhelms users and pushes primary content below the fold.',
    },
    {
      id: 'command.zero-state-recovery',
      statement:
        'Every search or filter view must render an explicit empty state with a 1-click Clear/Reset button when zero items match.',
      why: 'Prevents users from getting stranded on a blank screen.',
    },
  ],
};
