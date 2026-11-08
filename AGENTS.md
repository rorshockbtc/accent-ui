# AGENTS.md — Accént 3.0 Design System (`rorshockbtc/accent-ui`)

This repository (`https://github.com/rorshockbtc/accent-ui`, live at `https://design.pipes.pink`) is the canonical MIT-licensed open-source design system, multi-brand theme engine, and motion choreography library for **Colon Hyphen Bracket** (`: - ]`).

## 1. Two-Layer Architecture: Invariants vs. Engineered Drift

Accént separates **Layer 1 Invariants** (which no project or agent may ever break) from **Layer 2 Brand Adapters** (which are engineered to drift across properties and OSS forks).

### Layer 1: Immutable Mathematical Invariants (`src/styles/design-tokens.ts` & `src/lib/motion/tokens.ts`)
- **8-Point Spatial Grid**: Spacing tokens step strictly along `4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`.
- **13px Typography Floor**: No rendered text may ever drop below `13px` (`0.8125rem`). Body prose sits at `16px–18px` with `60–70ch` measure.
- **44×44px Touch Targets**: All interactive buttons, links, and controls must maintain `>= 44×44px` hit areas.
- **Hairline Structural Architecture**: Divide layout sections and cards with `1px solid var(--a-rule)` hairlines, never multi-layer SaaS drop shadows or nested cards (`card.no-nesting`).
- **WCAG 2.1 AA/AAA Contrast**: Verified programmatically via `validateThemeContrast()`. Body ink on canvas must pass `>= 7.0:1` (AAA); muted text, inline accent text, and primary CTA button fills must pass `>= 4.5:1` (AA) in both light and dark modes.
- **Two-Tier Motion Physics**:
  - **Tier 1 (Operational UI)**: `120ms / 200ms / 320ms` on `cubic-bezier(0.16, 1, 0.3, 1)` (`EASE_ACCENT`).
  - **Tier 2 (Editorial & Brand Choreography)**: `550ms–900ms` on `cubic-bezier(0.22, 1, 0.36, 1)` (`EASE_EDITORIAL`) + Framer Motion `LazyMotion` (`domAnimation`).
  - **Accessibility**: Every animated primitive must subscribe to `useMotionPreference()` and collapse transforms when `prefers-reduced-motion: reduce` is active.

### Layer 2: Official Brand Profiles (`src/styles/themes.ts`)
1. `editorial-sandstone` — **Pipes Protocol** (`pipes.pink`, `design.pipes.pink`) · Mark: `´`
2. `playful-principal` — **CHB Corporate Flagship** (`colonhyphenbracket.pink`) · Mark: `: - ]`
3. `albers-perspectives` — **CHB Albers Perspectives** (`colonhyphenbracket.pink`) · Mark: `; - ]`
4. `cassandra-noir` — **Kyle Cyree Portfolio & Ask Kyle** (`kyle.colonhyphenbracket.pink`) · Mark: `>_`
5. `hacienda-emerald` — **Chicuinaco Estate** (`rorshockbtc/chicuinaco`) · Mark: `01 /`
6. `terracotta-civic` — **Marigold Civic Analytics** (`rorshockbtc/marigold`) · Mark: `§`
7. `greater-terminal` — **Greater `>` Conversational Engine** (`rorshockbtc/greater-than`) · Mark: `>`

## 2. How Downstream Projects & External Forks Adapt Accént
- Downstream projects call `defineAccentTheme()` or `getShadcnBridgeVars(brandId, mode)` from `@rorshockbtc/accent-ui` to populate both `--a-*` variables and shadcn/ui `--background` / `--foreground` / `--primary` variables.
- When a downstream repo invents a novel motion primitive or component, generalize its colors to `var(--a-*)` and upstream it into `src/components/editorial-motion/` via Pull Request.
