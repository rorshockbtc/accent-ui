import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/cross-platform',
  section: 'patterns',
  title: 'Cross-Platform Parity: Web, Mobile, Chrome Extension & Desktop',
  summary:
    'How Accént adapts seamlessly across 1440px desktop web, 390×844 mobile viewports, 400×600 Chrome Extension side panels, and native Tauri desktop apps.',
  readingMinutes: 7,
  tabs: {
    overview: `## Four surfaces, one design genome

Pipes and Colon Hyphen Bracket ship across four distinct runtime environments:
1. **Desktop Web (\`1280px–1440px\`)**: 12-column editorial grids, 3-column open architectural pedestals, and sticky sidebars.
2. **Mobile Web & PWA (\`390×844px\`)**: Single-column vertical flow, \`85vh\` thumb-zone bottom sheets, and \`44×44px\` touch targets with zero horizontal scroll (\`overflow-x-clip\`).
3. **Chrome Extension Manifest V3 (\`400×600px\` Popup & Side Panel)**: Compact single-column pedestal stack, instant URL clipper, and shared \`--a-*\` token sheet.
4. **Native Desktop App (\`Tauri / macOS & Windows\`)**: Draggable window titlebar region, local SQLite/Parquet shard status bar, and keyboard-first (\`⌘K\`) navigation.

::demo:cross-platform-parity::`,

    guidelines: `## Cross-Platform Adaptation Rules

- **Never fork token hexes per platform**: Web, mobile, extension, and desktop consume the exact same \`BrandProfile\` tokens from \`src/styles/themes.ts\`.
- **Adapt column count, never type floor**: Even inside a \`360px\` Chrome Extension side panel, body and code text never drop below \`13px\` (\`0.8125rem\`).`,

    specs: `## Surface Viewport Breakpoints

| Surface | Viewport Width | Max Columns | Primary Navigation |
|---|---|---|---|
| **Desktop Web** | \`1024px–1440px\` | 3 pedestals / 12-col grid | Sticky top header + inline links |
| **Tablet** | \`768px–1023px\` | 2 pedestals | Sticky top header + bottom sheet |
| **Mobile (\`390×844\`)** | \`320px–767px\` | 1 column | Top bar + \`85vh\` bottom sheet |
| **Chrome Extension** | \`360px–420px\` | 1 column | 4-tab top pill bar (\`Clip · Search · Desk · Trim\`) |
| **Desktop IDE (Tauri)** | \`1200px+\` | 3-pane split (\`240px + 1fr + 320px\`) | Left rail + \`⌘K\` command palette |`,

    accessibility: `## Cross-Surface Ergonomics

- All four surfaces respect \`prefers-reduced-motion: reduce\` and system light/dark mode (\`prefers-color-scheme\`).`,
  },
  rules: [
    {
      id: 'platform.shared-tokens',
      statement:
        'Web, mobile, Chrome Extension, and desktop surfaces must consume the same BrandProfile CSS variables rather than maintaining separate color palettes.',
      why: 'Guarantees unmistakable brand continuity when a user moves from the browser extension to the web or desktop app.',
    },
  ],
};
