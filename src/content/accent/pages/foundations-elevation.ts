import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/elevation',
  section: 'foundations',
  title: 'Elevation & Layering',
  summary: 'How surfaces stack from canvas to modal, and why Accént uses crisp hairline borders instead of heavy drop shadows.',
  readingMinutes: 6,
  tabs: {
    overview: `## Depth without fog

Most modern UI kits create depth by spraying blurry grey drop shadows under every card, button, and toolbar. Put ten shadowed cards on one screen and the page looks like it was photographed through smog. Worse, in dark mode, black drop shadows disappear completely against dark backgrounds, leaving cards floating with no edge at all.

Accént takes its cue from print architecture and gallery framing: **surfaces separate by tonal shift and a 1-pixel hairline border**, reserving shadows strictly for temporary floating layers (menus, popovers, dialogs) that physically overlap the page below.

> **Why:** A 1px border at 12% ink opacity works identically in light mode, dark mode, high-contrast mode, and print. It never blurs the 8-point grid edge.

::demo:elevation-layers::

## The five structural layers

Every screen in Pipes and ! Bang uses at most five vertical planes:

1. **Layer 0 · Canvas (\`#E8E2D5\` Warm Sandstone)** — The full-bleed background of the page, stepped down from pure white to cut blue-light glare and eye fatigue.
2. **Layer 1 · Surface / Card (\`#F3EFE9\` Archival Card)** — Resting containers, dossiers, and stage frames, bounded by a 1px hairline rule.
3. **Layer 2 · Sticky Bar (\`z-30\`)** — Top navigation and section tab bars that pin during scroll with a subtle bottom rule.
4. **Layer 3 · Popover & Menu (\`z-40\`)** — Dropdowns, combobox lists, and tooltips that temporarily overlap content and carry a tight crisp shadow.
5. **Layer 4 · Scrim & Modal Dialog (\`z-50\`)** — Interruptive sheets and dialogs backed by a 40% ink scrim that dims the background and traps keyboard focus.

::demo:elevation-shadow-toggle::

## Why borders beat shadows on reading pages

When Josef Albers taught colour interaction at Black Mountain College and Yale, he showed that the boundary between two surfaces determines how the eye reads both of them. A blurry drop shadow creates an ambiguous gradient zone—six to twenty-four pixels wide—where neither the card nor the canvas owns the space. On a dense grid of twelve cards, those fuzzy halos collide in the 24px gutters and make the grid lines look crooked even when the CSS math is exact.

A 1-pixel border at 12% ink opacity (\`rgba(17, 24, 39, 0.12)\` in light rooms, \`rgba(243, 239, 233, 0.14)\` in dark rooms) solves three problems at once:

- **Grid fidelity:** The card edge lands on a single crisp pixel on the 8-point grid, so adjacent columns align like lead rules in a newspaper.
- **Dark-mode parity:** In dark rooms like *Vault* or *Signal*, black shadows are invisible. Stepping the surface lightness up one notch (\`#111827\` → \`#1A2233\`) and drawing a hairline light-alpha border gives dark cards the exact same structural presence as light cards.
- **Zero GPU repaint cost:** Scrolling a long feed of bordered cards never triggers expensive blur-radius compositing on low-power phones or tablets.

## When a shadow is genuinely earned

Accént permits a restrained shadow in only two situations:

1. **Layer 3 Popovers, Menus, and Combobox lists** that temporarily overlap text below them and need to separate from a card that already has a 1px border.
2. **Layer 4 Modal Dialogs and Sheets** that sit above a 40% ink scrim during an explicit user interruption.

If an element scrolls with the document and never overlaps another element, it lives on Layer 1 and never wears a shadow.`,
    guidelines: `## Borders over shadows at rest

Resting cards sit inside the document flow; they do not float in mid-air. Separate them from the canvas with a subtle fill shift and a 1px border.

::demo:elevation-do-borders::

## Never nest cards inside cards inside cards

When you need to group items inside a card, use whitespace, a typographic subheading, or a horizontal hairline divider—never another bordered, shadowed box.

::demo:elevation-do-card-in-card::

## Dim the background behind modal dialogs

A modal dialog asks the person to stop what they were doing and make a decision. Always place a visible scrim behind it so the eye knows which layer is active.

::demo:elevation-do-scrim::`,
    specs: `## Layer, border, and z-index scale

::demo:elevation-redline-menu::

| Layer | Role | Light surface | Dark surface | Border | Shadow | z-index |
|---|---|---|---|---|---|---|
| 0 · Canvas | Page background | \`#E8E2D5\` | \`#111827\` | None | None | \`0\` |
| 1 · Card | Resting container | \`#F3EFE9\` | \`#1A2233\` | \`1px solid rgba(17,24,39,0.14)\` | None | \`1\` |
| 2 · Sticky | Header / tab bar | \`#E8E2D5/95\` | \`#111827/95\` | Bottom \`1px\` rule | None | \`30\` |
| 3 · Floating | Menu / popover | \`#FFFFFF\` | \`#222C40\` | \`1px solid rgba(17,24,39,0.16)\` | \`0 8px 24px rgba(17,24,39,0.12)\` | \`40\` |
| 4 · Modal | Dialog / sheet | \`#FAF8F5\` | \`#1A2233\` | \`1px solid rgba(17,24,39,0.20)\` | \`0 20px 48px rgba(0,0,0,0.28)\` | \`50\` |

\`\`\`tsx
// Resting card: tonal surface + 1px border, zero shadow
<article className="rounded-[0_12px_0_12px] bg-[#F3EFE9] border border-[#111827]/12 p-6">
  {children}
</article>

// Floating menu: white surface + crisp border + restrained shadow
<div role="menu" className="z-40 rounded-md bg-white border border-[#111827]/15 shadow-[0_8px_24px_rgba(17,24,39,0.12)] p-1">
  {items}
</div>
\`\`\``,
    accessibility: `## Focus containment and Windows High Contrast

- **Forced-colors mode:** Drop shadows are stripped completely by Windows High Contrast / \`forced-colors: active\`. Because every Accént card and menu carries a real 1px CSS border, box boundaries remain 100% visible when shadows are turned off.
- **Modal focus containment:** When Layer 4 (Dialog or Mobile Sheet) opens, keyboard \`Tab\` focus must stay inside the elevated layer and background content must become inert.

::demo:elevation-ax-focus-trap::`,
  },
  rules: [
    {
      id: 'elevation.no-shadow-at-rest',
      statement: 'Do not apply shadow-lg, shadow-xl, or shadow-2xl to resting cards or grid items; use a 1px border and surface tone shift.',
      why: 'Heavy shadows muddy the grid in light mode and vanish in dark mode.',
      violationPattern: '\\bshadow-(lg|xl|2xl)\\b',
    },
    {
      id: 'elevation.no-nested-cards',
      statement: 'Never place a bordered Card inside another bordered Card more than one level deep; use hairline dividers or spacing.',
      why: 'Nested card-in-card boxes create visual clutter and waste horizontal measure on mobile.',
    },
    {
      id: 'elevation.z-index-scale',
      statement: 'Use only the documented z-index tiers (0, 10, 30 sticky, 40 popover, 50 modal); never emit arbitrary z-[9999].',
      why: 'Arbitrary z-index wars cause menus and dialogs to clip behind headers.',
      violationPattern: 'z-\\[999',
    },
    {
      id: 'elevation.border-for-forced-colors',
      statement: 'Every floating menu, popover, and dialog must include a 1px solid border in addition to any shadow.',
      why: 'Users in forced-colors / high-contrast modes rely on borders because CSS box-shadows are disabled.',
    },
  ],
};
