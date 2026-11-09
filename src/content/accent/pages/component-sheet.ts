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

::demo:sheet-demo::`,

    guidelines: `## Behavior & Dismissal

- Every sheet or drawer must close via **three redundant paths**:
  1. Clicking the \`44×44px\` \`×\` close button in the top-right corner of the sheet.
  2. Clicking or tapping the dimmed backdrop (\`bg-black/40\`).
  3. Pressing the \`Escape\` key.`,

    specs: `## Motion Variants (\`src/lib/motion/tokens.ts\`)

\`\`\`ts
export const SHEET_SLIDE_UP = {
  initial: { y: '100%' },
  animate: { y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
  exit: { y: '100%', transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
};
\`\`\``,

    accessibility: `## Dialog Semantics

- Set \`role="dialog"\`, \`aria-modal="true"\`, and an explicit \`aria-label\` on the sheet container.
- Bind \`keydown\` for \`Escape\` dismissal whenever the sheet is open.`,
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
