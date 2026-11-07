# Accént Pass 2 brief (read BRIEF.md and types.ts first, then this)

Goal: every doc page must SHOW as well as tell. Today all visuals sit on the Overview tab; Guidelines, Specs and Accessibility are text-only bullets. Fix that.

## Hard requirements per doc page (foundations / components / patterns / ai)
1. **Guidelines tab**: at least 2 live Do/Don't pairs (`::demo:<id>::` whose component renders `<DoDont>`), plus text. "Don't" examples must be REAL bad practice rendered honestly (e.g. a neon-gradient card, two primary buttons, 24px targets), not strawmen, and every pair needs a one-sentence reason on each side.
2. **Specs tab**: at least one redline demo (real component with `<DimH>`, `<DimV>`, `<HitBox>` measurement overlays) AND at least one markdown **table** of tokens/sizes (pipe tables are supported: `| A | B |` + `|---|---|` row; the first column renders as a row header; escape a literal pipe as `\|`). Keep the TSX snippet.
3. **Accessibility tab**: at least one live demo (focus order with `<FocusMark>`, 44px `<HitBox>` overlay, contrast chips, screen-reader-text beside visible text, keyboard map). Keep the requirements list.
4. **Overview tab**: keep existing prose (expand where thin; aim 600+ words for new pages). Prefer a page-specific demo; do NOT reuse a demo that already appears on 2 other pages.
5. Callouts: a blockquote line that begins `> **Why:** ...` renders as a "Why we decided this" aside (also `**Note:**`, `**Warning:**`). Use 1–2 per page for the design rationale (M3/Astryx style).
6. Rules: 4–6 per page; ids unique across the whole site (prefix with the page area, e.g. `button.one-primary`).
7. Total new demos: aim for 5–8 per existing page, 6–9 per new page.

## Demo authoring
- Put demos ONLY in the set file you own (see ownership). Export `DEMOS: Record<string, React.ComponentType>` with ids like `button-do-one-primary`, `button-redline-sizes`, `button-ax-hitarea` (lowercase, hyphens, page-prefixed, unique site-wide; never reuse or overwrite an id from demos.tsx or another set).
- Import from `../primitives`: `Stage, Seg, DoDont, DimH, DimV, HitBox, Tag, FocusMark`. Every demo is wrapped in `<Stage label=... caption=...>` (DoDont brings its own frame). Add `'use client'` (already in the stub).
- Real components: use `@/components/ui/{button,badge,input,card}` and `@/components/pipe-home/PipeRibbon`, `@/components/design-system/{SovereignCrest,DossierPillarCard}` where relevant. For controls that don't exist yet (select, tabs, dialog, toast, avatar, pagination, tooltip, switch...) build accessible reference implementations inside the demo with native elements (`<select>`, `<input type=checkbox role=switch>`, `<dialog>`, ARIA tabs) rather than adding new dependencies.
- Style tokens: Alabaster `#FAF8F5` canvas, Gallery Stone `#E8E2D5`, Card `#F3EFE9`, Ink `#111827`, Muted `#4B5563`, Pink `#D44983` (text-safe `#A3285C`), Good `#166534`, Bad `#9F1239`. Do not use CSS variables starting `--a-` inside demo bodies (the demo canvas is always light unless `surface="dark"`); inside Stage chrome they are fine.
- Hard rules the demos themselves must obey: text ≥ 12px (`text-xs`) and body ≥ 14px; interactive controls ≥ 44px tall/wide hit area; every status pairs colour with an icon or text; `tabular-nums` on numbers; no emoji as icons (except inside a deliberate "Don't" example); visible `focus-visible` ring; keyboard operable; no decorative icon per item.
- Fonts are self-hosted CSS vars: `var(--font-serif)` Fraunces, `var(--font-sans)` Inter, `var(--font-mono)`, `var(--font-eb-garamond)`, `var(--font-source-serif)`, `var(--font-literata)`, `var(--font-newsreader)`, `var(--font-lora)`, `var(--font-roboto)`, `var(--font-source-sans)`, `var(--font-plex-sans)`, `var(--font-public-sans)`, `var(--font-work-sans)`. Never load fonts from Google at runtime.
- Public docs use sample content and abstract CSS/SVG only; Unsplash only via `https://images.unsplash.com/...` with alt text; never real people's portraits or /pipe-heroes/ assets.
- Interactive demos (Seg toggles, sliders) are welcome but each must still be useful in its default state, since people scroll rather than click.
- Keep each demo component under ~120 lines; share small helpers inside your set file.

## Content authoring
- Markdown template strings; escape backticks (\`) and avoid `${`. Voice per BRIEF.md and the humanizer skill: direct, concrete, no AI clichés.
- Reference demos from any tab with `::demo:<id>::` alone on a line.
- Use tables for tokens, sizes, breakpoints, durations, ratios, state matrices.
- For new pages, replace the stub file completely. Keep exports `export const page: AccentPage`.

## Ownership (do not edit files outside your list; others run concurrently)
Run `cd /Users/kyle/Developer/antigravity/pipes-unified && npx tsc --noEmit` before finishing and fix errors in your files (ignore `.next/` generated type errors). Also run `npx vitest run src/lib/__tests__/accent-docs.test.ts` and fix failures that point at your pages. Report: files changed, demo ids added, anything you invented or couldn't verify.
