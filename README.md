<div align="center">
  <svg viewBox="0 0 24 32" width="48" height="64" aria-hidden="true">
    <path d="M9 30 L17 2 L23 2 L13 30 Z" fill="#EE2C82" />
  </svg>
  <h1>´ Accént 3.0 · Exhaustive Edition</h1>
  <p><strong>The 5-axis, 7-dialect, agent-native design system behind Pipes (`pipes.pink`), Colon Hyphen Bracket (`:-]`), and Greater (`>`).</strong></p>

  <p>
    <a href="https://github.com/rorshockbtc/accent-ui/actions"><img src="https://img.shields.io/github/actions/workflow/status/rorshockbtc/accent-ui/ci.yml?branch=main&label=CI&style=flat-square" alt="CI Status" /></a>
    <a href="https://github.com/rorshockbtc/accent-ui/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT License" /></a>
    <a href="https://design.pipes.pink"><img src="https://img.shields.io/badge/Specs-57_Pages_·_223_Rules-D44983?style=flat-square" alt="57 Pages · 223 Rules" /></a>
    <a href="https://design.pipes.pink/themes"><img src="https://img.shields.io/badge/Dialects-7_Brands_·_5_Axes-0284C7?style=flat-square" alt="7 Brand Dialects" /></a>
  </p>

  <p>
    <a href="https://design.pipes.pink"><strong>Overview</strong></a> ·
    <a href="https://design.pipes.pink/themes"><strong>5-Axis Theme Studio</strong></a> ·
    <a href="https://design.pipes.pink/playground"><strong>Live Code & Linter Playground</strong></a> ·
    <a href="https://design.pipes.pink/components"><strong>57-Spec Matrix</strong></a> ·
    <a href="https://design.pipes.pink/templates"><strong>6 Production Templates</strong></a> ·
    <a href="https://design.pipes.pink/styles.md"><strong>STYLES.md</strong></a> ·
    <a href="https://design.pipes.pink/rules.json"><strong>rules.json</strong></a>
  </p>
</div>

---

## ✦ Why Accént 3.0?

An accent (`´`) changes how a word is spoken without changing the word itself.

While conventional design systems stop at a single product palette or a 1-axis color/font swap, **Accént 3.0** governs **7 distinct brand voices** from one mathematical spine—pairing **5-Axis Engineered Drift**, **57 four-tab specification pages**, **223 regex-enforced AI rules**, and **Zero-PR `STYLES.md` governance**.

### The 4 Interactive Studios (`design.pipes.pink`)
1. **5-Axis Theme Studio (`/themes`)**: Switch between 7 sovereign dialects (`editorial-sandstone`, `playful-principal`, `albers-sandstone`, `swiss-corporate`, `warm-well`, `terminal-grid`, `high-contrast-civic`), customize all 5 axes live, and inspect 5 full-canvas application surfaces simultaneously.
2. **Live Code, Regex Linter & `STYLES.md` Playground (`/playground`)**: Edit TSX templates, run the real-time regex rule ratchet against 223 machine-enforceable rules, tweak custom CSS escape hatches, and compile `STYLES.md` contracts or stepwise 7B / 32B / Frontier prompts.
3. **57-Spec Component, Foundation & AI Contract Matrix (`/components`)**: Searchable, filterable directory of all 57 specifications—every one equipped with `Overview`, `Guidelines`, `Specs`, `Accessibility`, `Copy Agent Spec`, and `Rules JSON`.
4. **Ready-to-Ship Multi-Brand Templates (`/templates`)**: 6 production blueprints (3-Archetype Discovery, Playful-Principal Studio Flagship, Sovereign Publishing Desk, 3-Column Thesis Edition, DuckDB-Wasm Telemetry Ledger, and Personal Reading Desk) with 1-click Playground launch.

---

## ✦ 5-Axis Engineered Drift (`src/styles/themes.ts`)

Every brand profile in Accént adapts five simultaneous axes while locking mathematical invariants (8px baseline grid, `>= 13px` type floor, WCAG 2.1 AA/AAA contrast) in place:

1. **Axis 01 · Chromatic & Auto-WCAG Contrast Math**: `deriveAccessibleAccent()` separates `--a-accent` (display/borders), `--a-accent-fill` (solid button backgrounds), and `--a-accent-text` (inline links) so white-text and canvas-text contrast never drop below WCAG AA/AAA.
2. **Axis 02 · Optical Display Typography**: Switches `--a-font-display` (`Fraunces`, `Bricolage Grotesque`, `Newsreader`, `Inter`, `JetBrains Mono`) and display tracking (`-0.015em` to `-0.035em`).
3. **Axis 03 · CTA Geometry & Structural Posture**: Adapts `--a-cta-radius` (`6px` archival, `9999px` pill, `0px` terminal), `--a-cta-shadow` (quiet hairlines vs. tactile `3px` ink offset shadows), and `surfacePosture` (`archival-spine`, `pedestal-hairline`, `warm-well`, `terminal-grid`).
4. **Axis 04 · Two-Tier Motion & Corporate Choreography**: Tier 1 operational utility (`120ms/200ms/320ms`, zero text movement) vs. Tier 2 editorial & corporate showcase (`ScaryHeadline`, `RiseLines`, `Smile`, `GhostNumeral`).
5. **Axis 05 · Punctuation Identity & `STYLES.md` Escape Hatch**: Binds each dialect to its signature punctuation mark (`´`, `:-]`, `; - ]`, `~`, `>`) and compiles zero-PR `STYLES.md` contracts with `customExtension` CSS escape hatches.

---

## ✦ Zero-PR `STYLES.md` Governance & Machine Endpoints

Accént strictly separates **`STYLES.md`** (the Design System Control Plane) from **`AGENTS.md`** (the Operational Agent Control Plane):

```bash
# Fetch the live STYLES.md contract for any brand dialect:
curl "https://design.pipes.pink/styles.md?brand=playful-principal"

# Fetch all 223 machine-enforceable rules with regex violationPatterns:
curl "https://design.pipes.pink/rules.json"
```

Or compile a custom `AccentBrandAdapter` in TypeScript:

```ts
import { defineAccentTheme, generateStylesMarkdown, validateBrandAdapter } from 'accent-ui';

export const MY_ADAPTER = defineAccentTheme({
  id: 'my-studio',
  name: 'My Sovereign Studio',
  mark: ':-]',
  extends: 'playful-principal',
  light: {
    bg: '#FAF8F5',
    ink: '#18181B',
    accent: '#FE299E',
  },
  customExtension: {
    id: 'studio-custom-grid',
    description: 'Custom blueprint grid overlay for hero stages',
    cssVars: { '--studio-grid-size': '24px' },
  },
});

const audit = validateBrandAdapter(MY_ADAPTER); // Mathematical WCAG verification
const stylesMd = generateStylesMarkdown(MY_ADAPTER);
```

---

## ✦ Running Locally

```bash
git clone https://github.com/rorshockbtc/accent-ui.git
cd accent-ui
npm install
npm run dev
```

### Build & Verification Commands

```bash
npm run typecheck    # Validate strict TypeScript types across all 57 specs & studios
npm run build:lib    # Build ESM & CJS distribution bundles via tsup
npm run build        # Build Next.js documentation & studio site
```

---

## ✦ License

[MIT](LICENSE) © [Colon Hyphen Bracket](https://colonhyphenbracket.pink) & Kendall Kyle Cyree.
