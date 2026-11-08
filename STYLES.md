# STYLES.md — Accént 3.0 Upstream Design System Contract (`@rorshockbtc/accent-ui`)

> **Style Control Plane (`STYLES.md` vs. `AGENTS.md`)**: This file is the authoritative, rigid, opinionated design-system specification for **Accént 3.0 (`rorshockbtc/accent-ui` & `design.pipes.pink`)**. Operational agent rules belong in `AGENTS.md`; all visual, typographic, chromatic, structural, and motion rules live here and in `src/styles/themes.ts`.
> Live Spec & Self-Service Brand Studio: https://design.pipes.pink

---

## 1. Layer 1 Mathematical Invariants (Non-Negotiable Across All 7 Dialects)

1. **8-Point Spatial Grid**: All spacing, padding, and layout rhythm use multiples of `4px` / `8px`.
2. **Strict `13px` (`0.8125rem`) Typographic Floor**: Never render text smaller than `13px`. Body prose runs at `>= 16px` (`1rem`), measure `60–70ch`.
3. **`44×44px` Minimum Interactive Touch Targets**: Every button, link pill, tab trigger, and icon control must maintain at least `44×44px` hit area (`min-h-[44px]`).
4. **Hairline Architecture Over Boxy Shadows**: Separate sibling regions and lists with `1px solid var(--a-rule)` hairlines or architectural pedestals (`border-t` / `border-l`). Never nest bordered cards (`card.no-nesting`).
5. **Dual-Accent WCAG 2.1 AA/AAA Contrast (`deriveAccessibleAccent()`)**:
   - `--a-ink` on `--a-bg` must maintain **`>= 7.0:1` (WCAG AAA)**.
   - `--a-muted` on `--a-bg`, `--a-accent-text` on `--a-bg`, and `--a-accent-fg` on `--a-accent-fill` must maintain **`>= 4.5:1` (WCAG AA)**.
   - Use `--a-accent` for electric punctuation marks (`: - ]`, `|||`, `❀`), `<Smile />`, and `<ScaryHeadline />` bars; use `--a-accent-fill` for filled button surfaces with white text.
6. **Two-Tier Motion Physics**:
   - **Tier 1 (Ergonomic)**: `120ms–320ms` (`cubic-bezier(0.16, 1, 0.3, 1)`), `.t-press`, `.t-color`.
   - **Tier 2 (Editorial Choreography)**: `RiseLines`, `ScaryHeadline`, `Smile`, `FadeUp`, `Reveal`, `Hairline`, `EyebrowRule`, `GhostNumeral`, `AccentRevealText` using `[0.22, 1, 0.36, 1]`.

---

## 2. Official 7-Dialect Brand Registry (`src/styles/themes.ts`)

| Mark | Profile ID | Property | Display Font | Light Canvas | Light Accent / Fill | CTA Radius & Posture |
|---|---|---|---|---|---|---|
| `´` | `editorial-sandstone` | **Pipes Protocol** (`pipes.pink`) | Fraunces | `#E8E2D5` | `#D44983` / `#B8326D` | `6px` · `archival-spine` |
| `: - ]` | `playful-principal` | **CHB Corporate** (`colonhyphenbracket.pink`) | Bricolage Grotesque | `#FAF8F5` | `#FE299E` / `#B81468` | `9999px` · `pedestal-hairline` |
| `; - ]` | `albers-perspectives` | **Albers Perspectives** (`colonhyphenbracket.pink`) | Newsreader | `#EAE0D0` | `#FE299E` / `#B81468` | `10px` · `warm-well` |
| `>_` | `cassandra-noir` | **Kyle Cyree Portfolio** (`hire.colonhyphenbracket.pink`) | Cormorant Garamond | `#EAE0D0` (Dark `#161413`) | `#FE299E` / `#B81468` | `6px` · `archival-spine` |
| `01 /` | `hacienda-emerald` | **Chicuinaco Estate** (`chicuinaco`) | Fraunces | `#E8E2D5` | `#1B5E3A` / `#1B5E3A` | `4px` · `pedestal-hairline` |
| `❀` | `terracotta-civic` | **Marigold Analytics** (`marigoldinsights.org`) | Fraunces | `#E8E2D5` (`#FDFBF7` surface) | `#E05B37` / `#AD3617` | `12px` · `warm-well` |
| `>` | `greater-terminal` | **Greater `>` AI** (`greater.pink`) | Major Mono Display | `#F7F5F0` (Dark `#0A0A0A`) | `#FE299E` / `#B81468` | `4px` · `terminal-grid` |

---

## 3. Optional Agentic & Custom Code Injection (`customExtension`)

When a downstream brand requires bespoke styling beyond the 5 core axes, pass `customExtension: { css, rules, codeSnippet }` to `defineAccentTheme()` or use the **"Optional: Inject Custom CSS / Agent Rules"** drawer on https://design.pipes.pink to live-preview and export a self-contained `STYLES.md` with zero GitHub pull requests required.
