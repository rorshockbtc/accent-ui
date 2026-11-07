import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/tabs',
  section: 'components',
  title: 'Tabs',
  summary: 'Switching between peer views of the same subject without leaving the page, using the WAI-ARIA roving tabindex model.',
  readingMinutes: 6,
  tabs: {
    overview: `## One subject, multiple facets

Tabs let a reader examine the same topic from different angles—such as **Overview**, **Guidelines**, **Specs**, and **Accessibility** on every Accént page—without losing their scroll context or loading a new document.

Before reaching for tabs, make sure you do not actually want one of their cousins:

- **Tabs (\`role="tablist"\`)** — Switch the main content panel below the bar between 2 to 5 peer views of the same subject.
- **Segmented control (\`role="radiogroup"\`)** — Switches a compact inline display mode (such as *Light / Dark* or *12 col / 8 col / 4 col*) inside a single figure stage.
- **Primary navigation (\`<nav>\`)** — Moves the person to a different URL and subject altogether.

> **Why:** Replacing a confusing global "Story vs. Engineering" toggle with four clear per-page tabs lets non-technical readers stay comfortably on *Overview* while engineers jump straight to *Specs*.

::demo:tabs-compare::

## Interactive WAI-ARIA tabs

In a true tab bar, pressing \`Tab\` enters the active tab once, and \`ArrowLeft\` / \`ArrowRight\` moves across the tabs—so keyboard users do not have to press \`Tab\` five times just to reach the panel content.

::demo:tabs-aria::

## Mobile horizontal scroll without wrapping

On a 390px phone screen, four or five tabs must scroll horizontally on a single rail—never wrap into a jagged two-row staircase.

::demo:tabs-mobile-overflow::

## URL synchronization and panel persistence

On documentation and settings pages, sync the active tab with the URL hash (\`#overview\`, \`#guidelines\`, \`#specs\`, \`#accessibility\`) or search parameter so a teammate can copy the URL and link directly to the exact tab they are discussing. Updating the hash with \`history.replaceState\` keeps the browser Back button clean while making every tab bookmarkable.

Keep tab switching instantaneous:

- **Never fetch or mount a spinner if the tab content is already known.** All four tabs on an Accént page ship in the initial payload so switching tabs takes under 16ms.
- **Preserve form state across tabs.** If a user types into a filter or playground on Tab 1, switches to Tab 2 to check a token value, and switches back to Tab 1, their input should still be there.
- **Never nest a horizontal tab bar inside another horizontal tab bar.** Two stacked rows of underlined tabs confuse visual hierarchy; if a tab panel has sub-sections, use \`##\` headings and an on-page table of contents instead.`,
    guidelines: `## Keep tab labels to 1 or 2 nouns

Tab labels should be short, scannable nouns (*Overview*, *Specs*, *History*), never full sentences.

::demo:tabs-do-labels::

## Scroll horizontally on mobile; never wrap into multiple rows

Stacked rows of tabs break the visual connection between the selected tab underline and the panel below it.

::demo:tabs-do-overflow::`,
    specs: `## Tab bar redline and token table

::demo:tabs-redline::

| Property | Value | Token / Class | Notes |
|---|---|---|---|
| Bar height | \`48px\` | \`min-h-[48px]\` | Sits on the 8pt grid (` + '`6 × 8`' + `) |
| Horizontal padding | \`16px\` per tab | \`px-4\` | Comfortable touch spacing |
| Active indicator | \`2px\` bottom bar | \`border-b-2 border-[#D44983] -mb-px\` | Overlaps the 1px track rule |
| Active typography | \`14px\` weight \`600\` | \`text-sm font-semibold\` | Paired with bottom bar + \`aria-selected="true"\` |
| URL sync | Hash fragment | \`#overview\`, \`#specs\` | Allows deep-linking directly to a tab |

\`\`\`tsx
<div role="tablist" aria-label="Page sections" className="flex border-b border-[#111827]/12">
  {tabs.map((t, i) => (
    <button
      key={t.id}
      id={\`tab-\${t.id}\`}
      role="tab"
      type="button"
      aria-selected={active === t.id}
      aria-controls={\`panel-\${t.id}\`}
      tabIndex={active === t.id ? 0 : -1}
      onClick={() => setActive(t.id)}
      className={\`min-h-[48px] px-4 text-sm border-b-2 -mb-px \${
        active === t.id ? 'border-[#D44983] font-semibold' : 'border-transparent text-[#4B5563]'
      }\`}
    >
      {t.label}
    </button>
  ))}
</div>
\`\`\``,
    accessibility: `## Roving tabindex and keyboard contract

- **Single tab stop:** Only the active tab has \`tabIndex={0}\`; inactive tabs have \`tabIndex={-1}\`.
- **Arrow keys:** \`ArrowRight\` and \`ArrowLeft\` cycle through tabs and wrap around from last to first; \`Home\` and \`End\` jump to the first and last tab.
- **Panel linkage:** Every tab sets \`aria-controls="panel-id"\` and every \`role="tabpanel"\` sets \`aria-labelledby="tab-id"\`.

::demo:tabs-ax-keymap::`,
  },
  rules: [
    {
      id: 'tabs.roving-tabindex',
      statement: 'Implement WAI-ARIA roving tabindex on tablists: active tab gets tabIndex=0, inactive tabs get tabIndex=-1, and Left/Right arrows move between tabs.',
      why: 'Lets keyboard users enter the panel in one Tab press instead of tabbing past every inactive tab.',
    },
    {
      id: 'tabs.no-multiline-wrap',
      statement: 'Never wrap a tab bar onto multiple rows on mobile; use horizontal overflow scrolling (overflow-x-auto whitespace-nowrap).',
      why: 'Wrapped tab rows detach the active underline from the panel it controls.',
    },
    {
      id: 'tabs.two-to-five-max',
      statement: 'Keep tab bars between 2 and 5 tabs with 1–2 word noun labels.',
      why: 'More than 5 tabs overwhelms horizontal space and belongs in sidebar navigation.',
    },
    {
      id: 'tabs.indicator-not-color-alone',
      statement: 'Mark the active tab with both a 2px bottom bar and font-semibold (plus aria-selected="true"), never text colour alone.',
      why: 'Ensures the active tab is unmistakable in greyscale and high-contrast modes.',
    },
  ],
};
