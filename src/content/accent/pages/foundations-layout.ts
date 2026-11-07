import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/layout',
  section: 'foundations',
  kind: 'doc',
  title: 'Layout & Breakpoints',
  summary: 'Five breakpoints, two kinds of page, and a plan for what gives way when the screen gets crowded.',
  readingMinutes: 5,
  tabs: {
    overview: `## Layout is a set of decisions about loss

Every layout is designed for some screen and then squeezed onto others. The interesting question isn't how it looks at its best. It is what gives way, and in what order, as space runs out. A good responsive layout loses things gracefully, like a person packing for a trip who knows which shirts to leave behind. A bad one keeps everything and crushes it.

## Five breakpoints

A *breakpoint* is a screen width where the layout changes. Accent uses five, chosen to match real devices rather than round numbers:

- **390px:** a modern phone held upright. Our mobile baseline.
- **768px:** a tablet in portrait, or a small laptop window.
- **1024px:** a tablet in landscape, or a laptop with a sidebar open. Desktop layouts start here.
- **1280px:** a typical laptop. Content reaches its maximum width.
- **1440px:** large monitors. Nothing gets wider; margins grow.

Design at 390 first. It is the hardest constraint, and anything that works there tends to expand well. Designing at 1440 first and shrinking later is how you end up with hamburger menus hiding half your product.

> **Why:** Starting at 390px forces honest hierarchy decisions up front; expanding a working single-column hierarchy to 12 columns is straightforward, whereas squeezing a 12-column desktop screen onto a phone produces crushed targets and hidden drawers.

::demo:layout-breakpoint-ladder::

::demo:layout-reading-vs-app::

## Container widths

Content should never stretch the full width of a big monitor. A paragraph 200 characters wide is unreadable, and a grid of cards spread across 2,000 pixels looks lost.

- **Reading column:** 680px max, which holds a 65ch measure at 18px.
- **Standard content:** 1280px max, on the 12-column grid.
- **Wide (dashboards, galleries):** 1440px max.

Above those widths, the container stays put and the margins grow. White space at the edges of a big screen is not waste. It is framing.

## Two kinds of page

Most pages are one of two types, and they want different layouts.

A **reading layout** is for articles, docs, blog posts, about pages. One column, centred, narrow. Navigation stays out of the way. Images can break out wider than the text column for emphasis. The page's job is to get out of the way of the words.

An **app layout** is for tools: dashboards, editors, settings. It fills the screen, usually with a fixed sidebar, a toolbar, and a main area that scrolls on its own. The page's job is to keep controls within reach while content changes.

Mixing them causes trouble. A blog post in an app shell feels cramped and fussy. A dashboard in a reading column wastes most of a laptop screen.

## How congestion collapses

When a row of things no longer fits, there are a few honest options. Accent uses **priority-plus**: items are ranked by importance, the most important stay visible, and the rest move into a "More" menu as space shrinks. It beats the hamburger because the top three destinations are always one tap away instead of two.

The general order of collapse, from first to last:

1. Decorative extras go: secondary images, illustrations, taglines.
2. Multi-column grids drop columns: 4 to 3 to 2 to 1.
3. Sidebars become drawers or move below the content.
4. Navigation collapses with priority-plus.
5. Data tables become stacked cards, each row a card with labelled values.

What should never collapse: the primary action, the page title, and the user's ability to get back.

## Sticky regions

*Sticky* elements stay on screen as you scroll: headers, toolbars, a checkout button. They're useful and greedy. Every sticky pixel is a pixel your content can't use, and on a phone in landscape mode that adds up fast.

The Accent limit: no more than one sticky region per edge, and sticky regions together take no more than about 20% of the viewport height on mobile. A header that hides on scroll down and returns on scroll up is often the best compromise.

## The Accent rule

Five breakpoints, mobile first. Content capped at 680, 1280 or 1440. Choose reading or app layout on purpose. Collapse with priority-plus, decoration first. One sticky region per edge.`,
    guidelines: `## Live Do & Don't comparisons

::demo:layout-do-measure::

::demo:layout-do-sticky::

## Do
- Design at 390px first, then expand.
- Cap reading text at 680px and general content at 1280px.
- Use priority-plus navigation instead of hiding everything behind a hamburger.
- Turn wide tables into stacked, labelled cards on mobile.
- Keep the primary action visible at every breakpoint.

## Don't
- Don't let body text run the full width of a large screen.
- Don't stack a sticky header, sticky sub-nav and sticky footer on mobile.
- Don't put a reading page inside an app shell.
- Don't invent breakpoints at arbitrary widths like 900 or 1100.
- Don't hide content on mobile that users need; reorganise it.

## When to use an app layout
- Tools people use repeatedly, with persistent controls.

## When to use a reading layout
- Anything people mostly read once, top to bottom.`,
    specs: `## Shell redline and container widths

::demo:layout-redline-shell::

::demo:layout-containers::

| Breakpoint | Width | Columns | Left sidebar | Right "On this page" rail | Reading measure |
|---|---|---|---|---|---|
| Phone | \`390px\` | \`4\` | Bottom sheet (\`Contents\`) | Hidden | \`100%\` (\`~38ch\`) |
| Tablet | \`768px\` | \`8\` | Bottom sheet (\`Contents\`) | Hidden | \`65ch\` |
| Laptop | \`1024px\` | \`12\` | Sticky \`256px\` | Hidden | \`65–68ch\` |
| Desktop | \`1280px–1440px\` | \`12\` | Sticky \`256px\` | Sticky \`220px\` | \`68ch\` |

## Breakpoints
- \`sm: 390px\` (baseline, no query)
- \`md: 768px\`
- \`lg: 1024px\`
- \`xl: 1280px\`
- \`2xl: 1440px\`

## Containers
- \`--container-read: 680px\`
- \`--container: 1280px\`
- \`--container-wide: 1440px\`

## Sticky budget
- Mobile: total sticky height ≤ 20% of viewport (about 160px on a 844px-tall phone).
- Header height: 56 mobile, 64 desktop.

## Snippet
\`\`\`tsx
export function ReadingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-[680px] px-4 py-12 md:px-6 md:py-16">
      {children}
    </main>
  );
}
\`\`\``,
    accessibility: `## HTML5 landmarks and skip link

::demo:layout-ax-landmarks::

## Requirements
- WCAG 1.4.10 (Reflow): content works at 320px CSS width (equivalent to 1280px at 400% zoom) without horizontal scrolling, except for data tables and maps.
- WCAG 1.3.4 (Orientation): don't lock the page to portrait or landscape.
- WCAG 2.4.11 (Focus Not Obscured, AA in 2.2): sticky headers must not cover the focused element. Use \`scroll-padding-top\` equal to the header height.
- WCAG 1.3.2 (Meaningful Sequence): reordering with CSS must not break the reading order screen readers follow.

## Landmarks
- Use \`header\`, \`nav\`, \`main\`, \`aside\`, \`footer\` so screen reader users can jump between regions.
- Provide a "Skip to content" link as the first focusable element.

## Priority-plus
- The "More" button needs \`aria-expanded\` and \`aria-controls\`, and its menu must be keyboard operable.`,
  },
  rules: [
    {
      id: 'layout.breakpoints',
      statement: 'Use only the breakpoints 768, 1024, 1280 and 1440px, designing mobile-first from 390px.',
      why: 'Shared breakpoints match real devices and keep components in sync.',
      violationPattern: '@media[^{]*\\((min|max)-width:\\s*(600|900|960|1100|1200)px\\)',
    },
    {
      id: 'layout.container',
      statement: 'Cap reading columns at 680px and standard content at 1280px.',
      why: 'Unbounded line lengths and sprawling grids are hard to read.',
    },
    {
      id: 'layout.priority-plus',
      statement: 'Collapse navigation with priority-plus: keep top items visible and move the rest into a More menu.',
      why: 'Key destinations stay one tap away instead of hiding behind a hamburger.',
    },
    {
      id: 'layout.sticky-budget',
      statement: 'Allow at most one sticky region per screen edge, totalling no more than 20% of mobile viewport height.',
      why: 'Sticky chrome steals reading space and can hide focused elements.',
    },
    {
      id: 'layout.primary-visible',
      statement: 'The page title and primary action stay visible at every breakpoint.',
      why: 'Collapsing should remove decoration, never purpose.',
    },
  ],
};
