import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/exhibition-stage',
  section: 'patterns',
  title: 'Exhibition Stage, Folio Pagination & Synthesis Atlas',
  aiPhase: 'architecture',
  subPatterns: [
    'Classical Plate & Optical Loupe',
    'Audio-Coupled Cadence Timeline',
    '4-Lens Synthesis Atlas & Postcard Export',
  ],
  liveInPipes: [
    { label: 'Romanov to CEO Monarchs Thesis', href: '/thesis/romanov-to-ceo-monarchs' },
    { label: 'Plan Your Own Series Studio', href: '/thesis/new' },
  ],
  summary:
    'Combine museum-grade painting stages, single-CTA de-congested audio controls, audio-synced movement pagination, and interactive multi-Pipe data visualizations while preserving WCAG contrast and mobile zero-overflow.',
  readingMinutes: 7,
  kind: 'doc',
  tabs: {
    overview: `## Why archival editions outgrow static blog templates

Pure documentation spines work wonderfully for text-only specs, yet multimedia theses weave spoken episodes, classical museum canvases, chronological primary bibliographies, and cross-disciplinary knowledge graphs. Treating those assets as sixteen bordered buttons next to a static thumbnail wastes the craft inside the curation.

> **Why:** Formalizing \`exhibition\` as Accént's fifth surface archetype zones kinetic intensity cleanly: expressive shader pigment washes and an interactive \`2.5×\` curator's loupe lead the upper stage, audio-coupled reeds visualize live speech rhythm, and long-form essays paginate into movements below without visual noise.

## The Exhibition anatomy

- **One focal CTA above the fold.** Replace multi-row pill clusters with a single \`AccentBloomButton\` flanked by quiet unboxed typographic links (\`Play All\`, \`Subscribe\`, \`Share Plate\`).
- **Morphing Masterwork Stage (\`AccentClassicalStage\`).** Switching episodes transitions the hero painting to that chapter's historical artwork alongside its cold-open dateline and documentary loupe pins.
- **Interactive Synthesis Atlas (\`AccentSynthesisAtlas\`).** Elevates dense matrices into four interchangeable views—Structural Trajectory, Combined-Pipe Loom, Deep-Time Chronology, and an accessible Data Table twin—paired with a 1-click \`1200×630\` postcard exporter.

::demo:exhibition-stage-demo::`,
    guidelines: `## Pairing the stage with the 4-lens atlas

::demo:exhibition-stage-demo::

## Interactive synthesis atlas & paginated movements

::demo:exhibition-atlas-demo::

::demo:exhibition-folio-reader-demo::

## Do

- Derive hero backdrop pigments via \`resolveThesisMoodPalette\` so shader atmosphere reflects the subject Pipes without mutating high-contrast reading tokens.
- Keep the gallery contact-sheet selector (\`AccentFolioStrip\`) inside a responsive CSS Grid on phones so every cell remains inside \`390px\` with zero horizontal overflow.
- Drive waveform reed bars directly via \`Web Audio AnalyserNode\` DOM transforms while audio plays, halting cleanly when paused.
- Pair every visual lens in \`AccentSynthesisAtlas\` with the native semantic \`Data Table\` twin.

## Don't

- Don't surround every auxiliary action (\`15s\`, \`Subscribe\`, \`1×\`, \`Ep 01..05\`) with thick card borders or competing fills.
- Don't trap listeners in a multi-thousand-word scroll wall without movement pagination and timestamp jump cues.
- Don't run continuous infinite CSS animations (\`animate-pulse\`) on decorative elements.`,
    specs: `## Component contracts & motion zones

::demo:exhibition-atlas-demo::

| Zone / Primitive | Motion Driver | Primary Responsibility | WCAG / Ratchet Constraint |
|---|---|---|---|
| \`AccentShaderBackdrop\` | WebGL1 FBM + \`resolveThesisMoodPalette\` | Subject-tailored atmospheric wash behind Hero | Explicit \`Atmosphere: Live / Still\` button + \`paused\` prop |
| \`AccentClassicalStage\` | Framer \`AnimatePresence\` + Pointer \`translate3d\` | Episode-synced masterwork + \`2.5×\` Curator Loupe | Loupe clamped strictly inside \`overflow-hidden\` frame |
| \`AccentAudioCadenceBar\` | Direct \`AnalyserNode\` \`scaleY\` at rAF | Proportional chapter timeline + native range scrub | Zero React re-renders per audio frame; \`44px\` hit area |
| \`AccentSynthesisAtlas\` | Interactive SVG + spring cursor hairline | Trajectory, Pipe Loom, Chronology, Table twin | Direct curve end-labels + distinct stroke dashes |
| \`AccentFolioReader\` | Movement split on \`## \` headings | Audio-synced paginated movements + continuous toggle | Scroll position restores cleanly to article header |`,
    accessibility: `## WCAG 2.2.2 pause controls, Loupe clamping & keyboard parity

::demo:exhibition-a11y-motion-demo::

- **Explicit motion pause control:** Any shader or persistent ambient motion displays a visible toggle (\`Atmosphere: Live / Still\`). When the label swaps text, do not attach \`aria-pressed\`.
- **Keyboard loupe access:** \`Inspect 2.5×\` works equally with keyboard Enter/Space and phone taps, cycling numbered historical detail hotspots inside the stage mat without floating popups overflowing narrow screens.
- **Accessible seek & table twins:** \`AccentAudioCadenceBar\` overlays a native semantic \`<input type="range">\` for screen readers and arrow keys, while \`AccentSynthesisAtlas\` exposes a complete semantic \`<table>\` / \`<dl>\` twin.`,
  },
  rules: [
    {
      id: 'exhibition.single-focal-cta',
      statement:
        'Keep one primary filled CTA button in an Exhibition hero and style secondary transport, subscription, and share actions as unboxed typographic controls.',
      why: 'More than two competing boxed button clusters create SaaS visual congestion and obscure the primary artwork.',
    },
    {
      id: 'exhibition.atmosphere-pause',
      statement:
        'Provide a visible Live/Still pause control next to any ambient shader or kinetic backdrop and freeze on prefers-reduced-motion.',
      why: 'WCAG 2.2.2 requires users to pause or stop motion lasting more than five seconds even when OS reduced-motion is unset.',
    },
    {
      id: 'exhibition.atlas-table-twin',
      statement:
        'Pair multi-lens editorial charts in AccentSynthesisAtlas with a direct Data Table twin and mobile stacked list.',
      why: 'Screen-reader users and researchers checking exact figures need lossless tabular access alongside visual patterns.',
    },
    {
      id: 'exhibition.media-coupled-motion',
      statement:
        'Drive audio equalizer/cadence bars only from live playback telemetry via transform and halt cleanly when paused.',
      why: 'Decoupled infinite pulse loops inflate CPU/battery cost and fail Pipes design-system audit ratchets.',
    },
  ],
};
