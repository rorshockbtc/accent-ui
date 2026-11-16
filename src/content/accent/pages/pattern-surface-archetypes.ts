import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/surface-archetypes',
  section: 'patterns',
  title: 'Surface Archetypes & Watercolor Craft',
  aiPhase: 'architecture',
  subPatterns: ['Threshold vs. Sanctuary Motion', 'Digital Multiply Glazing', 'Atmospheric Disclosure'],
  liveInPipes: [
    { label: 'Asterisk × Pipes Bridge', href: '/asterisk' },
    { label: 'Asterisk Open-Door Sign Up', href: '/sign-up?ref=asterisk' },
  ],
  summary:
    'Prevent dry, mechanical compliance by separating choreographed marketing thresholds from calm writing sanctuaries, multiply-glazed art layers, and atmospheric status bands.',
  readingMinutes: 6,
  kind: 'doc',
  tabs: {
    overview: `## Why compliant software still feels like a spec sheet

Obeying contrast math, \`13px\` minimum type floors, \`44px\` touch targets, and hairline borders stops clutter—but left alone, it does not tell an engineer when a page should feel theatrical or when it should get completely out of the user's way. When every route runs identical motion rules and renders five-row lint tables upfront, active editors feel noisy while marketing stories feel clinical.

> **Why:** Splitting an application into explicit surface archetypes (\`threshold\`, \`sanctuary\`, \`gallery\`, and \`edition\`) lets an expressive story bloom on arrival while keeping the studio canvas serene.

## The four surface archetypes

- **Threshold (\`/\`, \`/asterisk\`).** The front porch. Choreographed scroll storytelling, wet-in-wet \`AccentShaderBackdrop\` horizons, and pigment-bloom pill CTAs (\`.wc-cta\`).
- **Sanctuary (\`/studio\`, \`/write\`).** Where people think and compose. Zero scroll-jacking and zero ambient loops. Motion answers only direct human actions: focusing an input, switching tabs, resolving a readiness warning, or launching a published envelope.
- **Gallery (\`/studio/rooms\`, \`/sign-up?ref=asterisk\`).** Generous whitespace framing bespoke plates (\`object-[50%_20%]\` portraits and \`.wc-glaze\` watercolor layers) paired with three short rules and one clear next step.
- **Edition (\`/explore/*\`, \`design.pipes.pink/*\`).** Long-form archival reading columns capped at \`60ch–70ch\` with keyboard-scrollable specification tables.

::demo:surface-threshold-vs-sanctuary::

## Atmospheric disclosure instead of checklist clutter

Do not greet a writer with five green rows of lint assertions. \`AccentWeatherBand\` leads with one plain sky state (*Blank page*, *Overcast*, *Clearing*, or *Clear skies*), surfaces only actionable problems inline with one-click fixes, and tucks passing checks inside a closed native \`<details>\` summary (\`N clear ✓\`).

::demo:surface-weather-band::`,
    guidelines: `## Threshold vs. Sanctuary budgets

::demo:surface-threshold-vs-sanctuary::

## Progressive weather disclosure

::demo:surface-weather-band::

## Do

- Assign every route an explicit archetype before choosing animations.
- Keep studio/sanctuary writing sheets centered up to \`54rem\` wide and tuck saved drafts into a native \`<dialog closedby="any">\` drawer.
- Set \`AccentTabs\` to \`layout="scroll"\` whenever more than four destinations appear on phones.
- Preserve \`prefers-reduced-motion: reduce\` by collapsing every sky and scene to its final settled state.

## Don't

- Don't run continuous ambient loops or scroll-driven parallax inside a text editor.
- Don't stack translucent white cards over glazed illustrations when \`mix-blend-mode: multiply\` blends pigment straight into the paper canvas.
- Don't force a multi-column comparison table above the fold on gallery pages; tuck it behind a collapsed \`<details>\` summary.`,
    specs: `## Surface budgets & art pipeline telemetry

::demo:surface-glaze-specs::

| Archetype | Scroll choreography | Ambient shader / loops | Max persistent rails | Primary examples |
|---|---|---|---|---|
| \`threshold\` | Enabled (\`useScroll\` horizon progress) | Wet-in-wet WebGL paused offscreen (\`DPR <= 1.5\`) | 0 sticky toolbars | \`asterisk.pipes.pink/\`, \`pipes.pink/asterisk\` |
| \`sanctuary\` | Forbidden | Zero idle animation; action-only responses | 1 collapsible drawer (\`<dialog>\`) | \`asterisk.pipes.pink/studio\`, \`pipes.pink/write\` |
| \`gallery\` | Disabled | Gentle ambient doorway glow only (\`prefers-reduced-motion\` safe) | 0–1 calm split column | \`/sign-up?ref=asterisk\`, \`/studio/rooms\` |
| \`edition\` | Disabled | Opacity/hairline reveals only | 2 side rails (\`220px\` + \`240px\`) | \`/explore/*\`, \`design.pipes.pink/*\` |

## Tokens & utilities (\`accent-ui/styles.css\`)

- \`.wc-glaze\`: \`mix-blend-mode: multiply\` for white-paper cutouts.
- \`.wc-cta\`: Sovereign Hot Pink (\`#FE299E\`) pill CTA with dynamic \`--bx\`, \`--by\` bloom origin.
- \`.wc-link\`: Hand-brushed SVG stroke underline expanding smoothly on hover, focus, and active section state.
- \`.a-textarea\`: \`field-sizing: content; width: 100%; min-block-size: 5lh; max-block-size: 18lh;\`.`,
    accessibility: `## Single-row tabs, native dialogs & forced-colors safety

::demo:surface-tabs-a11y::

- **Forced-colors indicator:** Draw active tab underlines via pseudo-element \`border-block-end\` (\`after:border-b-[2.5px]\`), never background boxes alone, so Windows Forced Colors mode keeps selection unmistakable.
- **Native dialogs:** Use \`<dialog closedby="any">\` opened via \`showModal()\` plus the Safari backdrop coordinate listener so clicking outside a draft drawer dismisses cleanly on every browser.
- **Reduced motion:** Freeze \`AccentShaderBackdrop\` to frame zero and disable infinite door-glow animations when \`prefers-reduced-motion: reduce\` is active.
- **Form semantics:** Pair \`AccentField\` labels with \`aria-describedby\` error IDs and keep mobile inputs at \`>= 16px\` font size to prevent viewport zoom.`,
  },
  rules: [
    {
      id: 'surface.archetype-separation',
      statement: 'Separate choreographed Threshold storytelling pages from calm, action-only Sanctuary working surfaces.',
      why: 'Continuous scroll effects and ambient loops exhaust writers trying to draft or edit prose.',
    },
    {
      id: 'surface.weather-disclosure',
      statement: 'Surface only actionable warnings inline via AccentWeatherBand and collapse passing checks behind N clear ✓.',
      why: 'Full verification ledgers crowd active workflows with visual noise.',
    },
    {
      id: 'surface.tabs-scroll-and-border',
      statement: 'Keep multi-channel AccentTabs on one scrolling row with ArrowLeft/Right navigation and border-block-end active indicators.',
      why: 'Wrapping tabs break layout symmetry on phones and background-only indicators disappear in Forced Colors mode.',
    },
    {
      id: 'surface.native-dialog-dismiss',
      statement: 'Implement slide-over draft drawers as native <dialog closedby="any"> modals with showModal() and backdrop coordinate fallback.',
      why: 'Browser-native top-layer dialogs guarantee focus trapping, Esc dismissal, and Safari compatibility.',
    },
  ],
};
