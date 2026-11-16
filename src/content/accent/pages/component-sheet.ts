import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/sheet',
  section: 'components',
  title: 'Bottom Sheets, Drawers & Side Panels',
  summary:
    'Mobile 85vh bottom sheets (SHEET_SLIDE_UP), backdrop fade choreography (BACKDROP_FADE), Escape dismissal, and Chrome Extension side-panel ergonomics.',
  readingMinutes: 5,
  tabs: {
    overview: `## Thumb-friendly overlays on mobile, side panels on desktop

On mobile viewports (\`< 1024px\`), top-left hamburger drawers force users to stretch their thumb to the top corner of the screen. Accént uses **Bottom Sheets (\`max-h-[85vh] rounded-t-2xl\`)** that slide up smoothly from the bottom edge using \`SHEET_SLIDE_UP\` (\`320ms cubic-bezier(0.16, 1, 0.3, 1)\`).

> **Why:** Anchoring mobile navigation and secondary drawers at the bottom keeps every primary action inside natural one-handed thumb reach on 390×844 viewports.

::demo:sheet-demo::`,

    guidelines: `## Behavior & Dismissal

- Every sheet or drawer must close via **three redundant paths**: the \`44×44px\` close button, tapping the dimmed backdrop, or pressing \`Escape\`.

::demo:sheet-dismiss-paths::

- Reserve full-height right sidebars for \`1024px+\` desktop tools and slide \`85vh\` bottom sheets from the bottom edge on mobile.

::demo:sheet-thumb-zone::`,

    specs: `## Motion Variants (\`src/lib/motion/tokens.ts\`)

| State | Property | Curve / Timing |
|---|---|---|
| **Open Slide** | \`transform: translateY\` (\`100% -> 0\`) | \`320ms\` · \`[0.16, 1, 0.3, 1]\` |
| **Close Slide** | \`transform: translateY\` (\`0 -> 100%\`) | \`220ms\` · \`[0.16, 1, 0.3, 1]\` |
| **Reduced Motion** | \`opacity\` fade only | \`<= 120ms\` · zero vertical translation |

\`\`\`ts
export const SHEET_SLIDE_UP = {
  initial: { y: '100%' },
  animate: { y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
  exit: { y: '100%', transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
};
\`\`\`

::demo:sheet-spring-tokens::`,

    accessibility: `## Dialog Semantics & Focus Return

- Set \`role="dialog"\`, \`aria-modal="true"\`, and an explicit \`aria-label\` on the sheet container so screen readers isolate modal content from background landmarks.
- Bind \`keydown\` for \`Escape\` dismissal whenever the sheet is open, maintain a \`44×44px\` visible close control, and return keyboard focus cleanly to the invoking trigger button upon unmount.

::demo:sheet-dialog-aria::`,
  },
  rules: [
    {
      id: 'sheet.three-way-dismiss',
      statement:
        'Every modal sheet or drawer must support dismissal via an explicit 44×44px close button, backdrop click, and the Escape key.',
      why: 'Trapping users inside an overlay on mobile or keyboard breaks navigation.',
    },
  ],
};
