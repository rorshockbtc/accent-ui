import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/mobile',
  section: 'patterns',
  title: 'Mobile & Multi-Device',
  summary: 'Design for the thumb first, then widen. Four breakpoints, 44px targets, and content that reflows instead of shrinking.',
  readingMinutes: 5,
  kind: 'doc',
  tabs: {
    overview: `## Most people are holding a phone

More than half of visits to a typical small-business site come from phones. Those visitors are on a bus, in a queue, holding a coffee. They have one thumb free and a few seconds of patience. Accent designs for that person first, then lets the layout breathe as the screen gets wider.

This is called mobile-first. It is less about phones than about priorities: if something does not earn its place on a 375px screen, ask whether it earns it on a 1440px one.

::demo:breakpoints::

## Breakpoints

A breakpoint is a screen width where the layout changes. Accent uses four, all on the 8px grid.

- **Base (0–639px).** Phones. One column, stacked content, bottom-sheet navigation.
- **sm (640px).** Large phones and small tablets. Two-column grids appear.
- **md (768px).** Tablets. Side-by-side layouts, top nav returns.
- **lg (1024px) and up.** Laptops and desktops. Full grids, sidebars for docs.

Breakpoints follow the content, not devices. If your card grid looks cramped at 900px, fix the grid at 900px. Do not hunt for "the iPad size."

## Anatomy of a mobile screen

- **Top bar.** Brand and a labeled menu trigger, 56px tall.
- **Content.** Single column, 16px side padding, full-width images.
- **Thumb zone.** The bottom third of the screen. Primary actions live here: a sticky bottom action bar or a bottom sheet.
- **Safe areas.** Padding for notches and home indicators via \`env(safe-area-inset-*)\`.

## Touch targets

::demo:touch-targets::

A fingertip is roughly 45px wide. Every tappable thing gets a 44×44px hit area, with 8px between neighboring targets so a slightly off tap does not trigger the wrong one. The drawn element can be smaller, like a 24px icon, but the hit area cannot.

## Reflow, don't shrink

When the screen narrows, content should rearrange, not shrink. Text never drops below 13px, body copy stays at 16px or more on phones, and nothing scrolls sideways except deliberate carousels of cards. Tables become stacked lists. Multi-column forms were already one column.

## Hover does not exist on touch

Anything revealed only on hover is invisible on a phone. Menus, tooltips with essential information, card actions: show them, or put them behind a tap.

## States

Account for slow connections. Show content placeholders at the right size, load images lazily below the fold, and keep the page usable before JavaScript finishes.

## When to use

Always. There is no "desktop-only" page on the public web. Internal tools can set a minimum width if they say so clearly.
## Thumb zones and navigation

::demo:mobile-nav-frames::

> **Why:** Most visits happen one-handed, on the move. We draw for 390px first because it is the common phone width, and because anything that works there can only get easier on a larger screen.

## Landscape


::demo:mobile-landscape::
`,
    guidelines: `## Do

- Write styles mobile-first, adding complexity at larger breakpoints.
- Keep primary actions in the thumb zone on phones.
- Give every target 44×44px and 8px spacing.
- Use \`inputMode\` and correct input types for mobile keyboards.
- Test on a real phone, outdoors, one-handed.

## Don't

- Don't hide essential content or actions behind hover.
- Don't shrink text below 13px to fit.
- Don't allow sideways page scrolling.
- Don't set breakpoints for specific devices.
- Don't disable pinch zoom.

## When to use

- Every public page.

## When not to

- Never skip mobile on public pages.
::demo:mobile-do-nav::

::demo:mobile-do-cta::

## Sticky CTA and safe areas

::demo:mobile-cta::

## Forms

::demo:mobile-form-frame::
`,
    specs: `## Breakpoints

- base: 0px
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px (max content width 1200px)

## Tokens

- Side padding: 16px base, 24px md, 32px lg.
- Touch target: 44×44px minimum; spacing 8px.
- Body text: 16px minimum on base.
- Top bar: 56px; bottom action bar: 64px plus safe area.
- Bottom sheet item height: 48px.

## Usage

\`\`\`tsx
<div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-3 lg:gap-6 lg:px-8">
  …
</div>

<div className="fixed inset-x-0 bottom-0 p-4 pb-[calc(16px+env(safe-area-inset-bottom))] md:hidden">
  <Button className="h-11 w-full">Book a table</Button>
</div>
\`\`\`
## Redline

::demo:mobile-redline::

## Phone measurements

| Item | Value |
|---|---|
| Design width | 390px |
| Side margin | 16px |
| Top safe area | 47px (status bar and notch) |
| Bottom safe area | 34px (home indicator) |
| Tab bar | 56px plus safe area |
| Sticky CTA | 48px button, 12px padding |
| Body text | 16px / 24px |
| Landscape | 844×390, side safe areas 47px |
`,
    accessibility: `## Requirements

- **Target size.** 44×44px (WCAG 2.5.5 AAA).
- **Reflow.** No horizontal scroll at 320px CSS width (WCAG 1.4.10).
- **Orientation.** Works in portrait and landscape (WCAG 1.3.4).
- **Zoom.** Never set \`user-scalable=no\` or \`maximum-scale=1\` (WCAG 1.4.4).
- **Pointer gestures.** Swipe and pinch have single-tap alternatives (WCAG 2.5.1).
- **Motion actuation.** Shake or tilt features have button alternatives (WCAG 2.5.4).

## Screen readers

Test with VoiceOver on iOS and TalkBack on Android. Bottom sheets must announce as dialogs and trap focus.
## Live: order and zoom

::demo:mobile-ax-order::
`,
  },
  rules: [
    {
      id: 'mobile.target-44',
      statement: 'All touch targets are at least 44×44px with 8px spacing between neighbors.',
      why: 'Fingertips are about 45px wide.',
    },
    {
      id: 'mobile.no-zoom-lock',
      statement: 'Never disable pinch zoom in the viewport meta tag.',
      why: 'Low-vision users rely on zoom.',
      violationPattern: '(user-scalable\\s*=\\s*no|maximum-scale\\s*=\\s*1)',
    },
    {
      id: 'mobile.no-hover-only',
      statement: 'Do not hide essential content or actions behind hover-only interactions.',
      why: 'Touch screens have no hover.',
    },
    {
      id: 'mobile.min-text',
      statement: 'No text below 13px at any breakpoint; body text 16px or more on phones.',
      why: 'Small text on small screens is unreadable outdoors.',
      violationPattern: 'text-\\[(8|9|10|11|12)px\\]',
    },
    {
      id: 'mobile.first',
      statement: 'Write base styles for phones and add sm/md/lg overrides upward.',
      why: 'It forces content priorities and avoids desktop layouts squeezed onto phones.',
    },
    {
      id: 'mobile.overflow-clip',
      statement: 'Every full-bleed shell sets max-width: 100vw and overflow-x: clip on html/body and the root wrapper.',
      why: 'Even a single overflowing inline link or pill bar otherwise forces iOS Safari and Chrome mobile emulation to zoom out the entire viewport, making the page render at half-width or clip off-screen.',
    },
    {
      id: 'mobile.single-row-player',
      statement: 'Sticky bottom audio players on phones use a single 56px–64px row with a 3px top progress bar, 44x44px buttons, and 8px gaps—never a 2-row stacked control bar.',
      why: 'Respects the 20% sticky-region viewport budget (layout.sticky-budget) and prevents thumb-zone mis-taps.',
    },
    {
      id: 'mobile.safe-area',
      statement: 'Fixed bars at the bottom add env(safe-area-inset-bottom) padding.',
      why: 'Otherwise the home indicator sits on top of the button.',
    },
  ],
};
