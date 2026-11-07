import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/navigation',
  section: 'components',
  title: 'Navigation',
  summary: 'Every page has a way out. Top nav, priority-plus overflow into "More", and a mobile sheet when space runs out.',
  readingMinutes: 5,
  kind: 'doc',
  tabs: {
    overview: `## Always have a nav

Navigation is the map on the wall of the mall. Nobody admires it, everybody needs it, and the moment it is missing people panic and leave. Every Accent page has navigation, including landing pages, checkout steps and error pages. At the very least: a home link and a way back.

> **Why:** Priority-plus overflow keeps the top destinations visible as single-tap links on desktop and tablet, falling back to a thumb-friendly bottom sheet only when horizontal space genuinely runs out.

::demo:nav-demo::

## Anatomy of the top nav

- **Brand.** Left edge. The room name or logo, linking home. Height of the mark sits on the 8px grid (24 or 32px).
- **Primary links.** Four to six destinations, in sentence case. In Pipes rooms the \`PipeRibbon\` provides Home, Library, Greater, Ask, Export and Theme, with labels that can be renamed per room personality.
- **More.** The overflow menu that appears when links no longer fit.
- **Utility.** Right edge. Search, account, a single action button.
- **Active indicator.** A 2px underline in the room accent plus a weight change. Never color alone.

## Priority-plus: handling congestion

As the screen narrows, links compete for room. Accent uses the priority-plus pattern. You rank links by importance. The nav shows as many as fit, in order, and moves the rest into a "More" menu at the end. No wrapping onto two lines, no shrinking text below 13px, no squashing padding off the grid.

When even the top two or three links will not fit, usually below 640px, the nav collapses entirely. Accent prefers a bottom sheet triggered by a labeled "Menu" button. A hamburger icon is the acceptable fallback, but it must carry a visible word or an accessible name. Bottom sheets sit where thumbs already are; hamburgers in the top corner make people stretch.

## Sticky behavior

The top nav may stick to the top of the viewport. When it does, it stays 56–64px tall, gains a hairline bottom border once content scrolls under it, and never grows. On mobile, consider hiding it on scroll down and revealing it on scroll up, so reading space is not eaten by chrome. Pipes rooms pass \`sticky\` to \`PipeRibbon\` to opt in.

## Skip link

The first focusable element on every page is a "Skip to content" link. It is invisible until focused, then appears top-left. Keyboard and screen reader users would otherwise tab through every nav item on every page.

## States

Links have rest, hover (underline), focus-visible (ring), active/current (accent underline, \`aria-current="page"\`), and pressed. The More menu has open and closed states with \`aria-expanded\`.

## When to use

Top nav for sites with up to about seven sections. Side nav for documentation or apps with deep hierarchies, like this design system. Tabs for switching views of one object. Breadcrumbs as a supplement for deep pages, never as the only navigation.

## Priority+ overflow and secondary navigation

::demo:nav-priority-plus::

::demo:nav-breadcrumbs-footer::`,
    guidelines: `## Live Do & Don't comparisons

::demo:nav-do-current::

::demo:nav-do-menu-trigger::

## Do

- Rank links by importance so priority-plus overflows the least-used first.
- Mark the current page with an underline and \`aria-current\`.
- Include a skip link on every page.
- Label the mobile menu trigger with a word ("Menu").
- Keep nav labels to one or two words.

## Don't

- Don't ship a page with no navigation.
- Don't wrap nav links onto two lines.
- Don't shrink nav text below 13px to make it fit.
- Don't use a bare hamburger icon with no accessible name.
- Don't put more than seven top-level items in the nav.

## When to use

- Top nav: marketing sites, rooms, small apps.
- Side nav: docs and deep apps.

## When not to

- Tabs for site-wide sections. Tabs switch views within a page.`,
    specs: `## Navigation bar redline and mobile sheet

::demo:nav-redline-heights::

::demo:nav-mobile-sheet::

| Breakpoint | Bar height | Visible top-level items | Overflow strategy | Hit target |
|---|---|---|---|---|
| Desktop (\`≥ 1024px\`) | \`64px\` (8 × 8) | Up to 7 items | Priority+ \`More\` menu | \`≥ 44px\` tall |
| Tablet (\`768px–1023px\`) | \`64px\` | 4 items + \`More\` | Dropdown menu | \`≥ 44px\` tall |
| Mobile (\`< 768px\`) | \`56px\` (7 × 8) | Brand + \`Menu\` button | Bottom sheet (\`48px\` rows) | \`44×44px\` trigger |

## Tokens

- Nav height: 56px mobile, 64px desktop.
- Link text: UI sans 14px, weight 500; current: weight 600.
- Link padding: 12px horizontal, hit area 44px tall.
- Active indicator: 2px underline, room accent, 8px below text baseline.
- Gap between links: 8px.
- Sticky border: 1px hairline after scroll.
- Collapse breakpoint: 640px (bottom sheet).
- Bottom sheet: items 48px tall, 16px padding, max 85vh.

## Usage

\`\`\`tsx
import { PipeRibbon } from '@/components/pipe-home/PipeRibbon';

<a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
<PipeRibbon brand={brand} personality={personality} active="home" onChange={setPane} sticky />
<main id="main">…</main>
\`\`\``,
    accessibility: `## Skip link and keyboard focus order

::demo:nav-skip-link::

::demo:nav-ax-focus-order::

## Requirements

- **Landmark.** Wrap navigation in \`<nav aria-label="Main">\` (WCAG 1.3.1).
- **Skip link.** First focusable element (WCAG 2.4.1).
- **Current page.** \`aria-current="page"\` on the active link (WCAG 2.4.8).
- **Targets.** 44×44px hit areas on all links and the menu trigger.
- **Consistency.** Same order across pages (WCAG 3.2.3).
- **Menu trigger.** \`aria-expanded\`, \`aria-controls\`, and a visible or accessible name.

## Keyboard

- Tab through links in visual order.
- Enter or Space opens "More"; Escape closes it and returns focus to the trigger.
- The mobile sheet traps focus while open and restores it on close.`,
  },
  rules: [
    {
      id: 'nav.always-present',
      statement: 'Every page includes navigation with at least a home link.',
      why: 'Pages without a way out feel like traps.',
    },
    {
      id: 'nav.skip-link',
      statement: 'Include a "Skip to content" link as the first focusable element.',
      why: 'Keyboard users should not tab through the nav on every page.',
    },
    {
      id: 'nav.priority-plus',
      statement: 'When links do not fit, move lower-priority links into a "More" menu; never wrap or shrink text.',
      why: 'Wrapped navs look broken and tiny text is unreadable.',
    },
    {
      id: 'nav.aria-current',
      statement: 'Mark the active link with aria-current="page" and a non-color indicator.',
      why: 'People need to know where they are, regardless of color vision.',
    },
    {
      id: 'nav.labeled-menu',
      statement: 'Mobile menu triggers must have a visible label or aria-label.',
      why: 'A bare icon is unclear to many users and silent to screen readers.',
    },
  ],
};
