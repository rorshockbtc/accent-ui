import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/evaluating',
  section: 'patterns',
  title: '04 · Evaluating: Inline Provenance & Verification Ledgers',
  summary:
    'Substitute hollow AI confidence pills with accessible popover citation previews and scrollable SHA-256 verification ledgers linking directly to primary sources.',
  readingMinutes: 6,
  aiPhase: 'evaluating',
  subPatterns: [
    'Inline Citations',
    'Popover Source Previews',
    'Verification Ledger',
    'CID Integrity Receipts',
    'Trust Without Badges',
  ],
  chromaticPair: { pastel: 'sage', dark: 'forest' },
  liveInPipes: [
    { label: 'Stoicism Primary Canon', href: '/explore/stoicism' },
    { label: 'Combined Thesis Editions', href: '/thesis/the-sovereign-interface' },
  ],
  relatedSlugs: ['essays/perceived-speed-and-provenance', 'components/table', 'patterns/observing'],
  tabs: {
    overview: `## Trust comes from addresses, not green pills

Anyone can stitch a \`"98% Confident"\` green pill next to an ungrounded sentence. Serious researchers, bankers, and civic analysts evaluate claims by clicking straight through to the underlying treatise, inspecting its SHA-256 content identifier, and verifying how closely the quote matches.

> **Why:** Pairing clickable \`<AccentCitationLink />\` footnotes with a sticky \`<AccentVerificationLedger />\` puts deterministic cryptographic proof right below the synthesis without crowding inline reading flow.

Hover or focus any inline bracketed marker below to inspect supplemental source context via native \`[popover]\`:

::demo:ai-evaluate-overview::`,

    guidelines: `## Rules for Citation & Verification Interfaces

- **Keep hovercards strictly supplemental**: Never hide exclusive source metadata or URLs inside hover popovers. Always link to the full source via \`href\` AND mirror full verification rows inside \`<AccentVerificationLedger />\`.

::demo:ai-evaluate-popover::

- **Ban subjective self-graded accuracy theater**: Replace vague \`"AI verified"\` pills with real \`pipe\\namespace\` links, \`tabular-nums\` alignment scores, and verifiable \`pipes:node:v1\` SHA-256 digests.

::demo:ai-evaluate-anti-slop::`,

    specs: `## Verification Ledger & Anchored Popover Spec

| Primitive | Markup Contract | Positioning / CSS Rule |
|---|---|---|
| \`AccentCitationLink\` | \`<a href aria-describedby={id}>\` + \`[popover]\` | Never sets \`aria-expanded\`; tooltip carries \`role="tooltip"\` |
| \`[popover].accent-hovercard\` | Anchored hint card | Gates \`inset: auto; margin: 0;\` inside \`@supports (position-area: block-end)\` |
| \`AccentVerificationLedger\` | Native \`<table>\` inside \`tabIndex={0}\` region | Sticky \`<thead>\`, zero vertical cell borders, \`tabular-nums\` |

Inspect canonical node verification structure:

::demo:ai-evaluate-spec::`,

    accessibility: `## Forced Colors, Hovercard Focus & Responsive Ledger Regions

Following modern web accessibility guidance, hint triggers that navigate on Enter use \`aria-describedby\` pointing to \`role="tooltip"\`—never \`aria-expanded\`, which misleads screen-reader users into expecting an accordion. Escape dismisses open tooltips cleanly, while wide ledgers scroll horizontally inside \`role="region" tabIndex={0}\` wrappers so \`390×844\` phones never clip columns.

::demo:ai-evaluate-a11y::`,
  },
  rules: [
    {
      id: 'evaluate.cite-primary-ledger',
      statement:
        'Grounded AI claims must pair inline citations with an inspectable AccentVerificationLedger containing source links and SHA-256 CIDs rather than hollow confidence percentages.',
      why: 'Real verification requires direct inspection of primary sources, not self-graded AI badges.',
    },
    {
      id: 'evaluate.popover-tooltip-semantics',
      statement:
        'Citation hovercards whose trigger navigates on click must use aria-describedby and role="tooltip" (never aria-expanded), with inset: auto gated inside @supports (position-area: block-end).',
      why: 'Prevents screen-reader state confusion and avoids off-screen popover clipping in browsers without CSS Anchor Positioning.',
    },
  ],
};
