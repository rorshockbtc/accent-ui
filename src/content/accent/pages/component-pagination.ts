import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/pagination',
  section: 'components',
  title: 'Pagination',
  summary: 'Moving through long archives and docs without losing your place: 7-slot numbered bars, mobile collapse, and prev/next doc links.',
  readingMinutes: 5,
  tabs: {
    overview: `## Let people see the bottom of the page

Infinite scroll was invented to keep people trapped in social feeds. In a knowledge archive, directory, or design system, infinite scroll is an anti-pattern: you cannot bookmark page 4, you cannot tell how many items exist, your browser Back button loses your spot, and you can never reach the footer links because new cards keep loading underneath your cursor.

Accént uses two predictable pagination patterns:

1. **Numbered 7-slot bar** for multi-page archives and tables. It always renders exactly **7 slots** (for example, \`1 … 4 [5] 6 … 20\`) so the bar width never changes and the *Next* button never jumps out from under the mouse cursor.
2. **Sequential Previous / Next cards** at the bottom of every documentation and essay page so readers can walk through Accént cover-to-cover like a book.

> **Why:** Keeping the slot count constant at 7 and setting \`tabular-nums\` on every page button guarantees that clicking through pages 1 to 20 shifts the layout by \`0px\`.

::demo:page-interactive::

## Anatomy of the 7-slot bar and sequential doc footer

A well-behaved pagination bar solves two layout problems that trip up most tables and archives:

1. **Constant horizontal width:** When a user is on page 1, the bar renders \`[1] 2 3 4 5 … 20\`. When they advance to page 10, it renders \`1 … 9 [10] 11 … 20\`. Because both states occupy exactly **7 slots** of \`44×44px\` cells with \`tabular-nums\`, the **Next** button stays pinned at the exact same pixel coordinate on every click.
2. **Real links for real URLs:** Whenever each page corresponds to a shareable query string (\`?page=2\`), render pagination items as \`<a>\` links styled as 44px buttons so people can middle-click to open page 3 in a new tab or copy the URL. Use \`<button>\` elements only when paging an in-memory client widget that does not own the page URL.

At the bottom of documentation and essay pages, replace numbered pagination with two wide **Previous / Next** cards showing the section kicker and page title so readers always know what chapter comes next.`,
    guidelines: `## Prefer numbered pages over infinite scroll for archives

Whenever someone might want to share a URL to a specific slice of results or reach the page footer, use explicit pagination.

::demo:page-do-pattern::

## Collapse to "Previous · Page X of Y · Next" on mobile

Seven numbered buttons plus Previous and Next will overflow a 390px phone screen. Hide the number list below \`640px\` (\`sm:\`) and show a clean \`Page X of Y\` counter between the two 44px buttons.

::demo:page-do-mobile::`,
    specs: `## Button redline and slot rules

::demo:page-redline::

| Element | Measurement | Token / Class | Notes |
|---|---|---|---|
| Page button | \`44×44px\` | \`h-11 w-11 rounded-md tabular-nums\` | Full square touch target |
| Button gap | \`4px\` | \`gap-1\` | Half-grid step between sibling numbers |
| Active page | Ink fill + white text | \`bg-[#111827] text-white font-semibold\` | Paired with \`aria-current="page"\` |
| Ellipsis slot | \`44×44px\` non-interactive | \`aria-hidden="true"\` | Preserves the 7-slot width |
| Mobile layout (\`< 640px\`) | Prev + counter + Next | \`flex justify-between\` | Keeps targets ≥ 44px on 390px screens |

\`\`\`tsx
<nav aria-label="Pagination" className="flex items-center justify-between gap-4">
  <Button variant="outline" disabled={page === 1}>Previous</Button>
  <ul className="hidden sm:flex items-center gap-1">
    <li>
      <a href="?page=1" aria-current="page" className="grid h-11 w-11 place-items-center rounded-md bg-[#111827] text-white text-sm font-semibold tabular-nums">
        1
      </a>
    </li>
    <li>
      <a href="?page=2" className="grid h-11 w-11 place-items-center rounded-md hover:bg-[#E8E2D5] text-sm tabular-nums">
        2
      </a>
    </li>
  </ul>
  <Button variant="outline">Next</Button>
</nav>
\`\`\``,
    accessibility: `## Landmark and current-page semantics

- **\`<nav aria-label="Pagination">\`:** Distinguishes the pagination bar from the primary site navigation in the screen-reader landmarks list.
- **\`aria-current="page"\`:** Placed on the active page link or button so assistive tech announces *"Page 5, current page"*.
- **Full button labels:** Label number links with \`aria-label="Page 5"\` rather than bare \`"5"\`.

::demo:page-ax-landmark::`,
  },
  rules: [
    {
      id: 'pagination.aria-current-page',
      statement: 'Mark the active pagination item with aria-current="page" inside a <nav aria-label="Pagination"> landmark.',
      why: 'Tells screen-reader users which page is currently loaded.',
    },
    {
      id: 'pagination.target-44x44',
      statement: 'Every pagination link or button must have a minimum 44x44px hit area and tabular-nums.',
      why: 'Prevents mis-taps on adjacent page numbers and keeps widths uniform.',
    },
    {
      id: 'pagination.mobile-compact',
      statement: 'On viewports under 640px, collapse numbered page lists to Previous, "Page X of Y", and Next.',
      why: 'Seven 44px number buttons plus Prev/Next exceed 390px mobile width.',
    },
    {
      id: 'pagination.stable-slot-count',
      statement: 'Keep desktop numbered pagination at a constant 7-slot count using ellipsis placeholders.',
      why: 'Prevents the Next and Previous buttons from shifting position as the user clicks through pages.',
    },
  ],
};
