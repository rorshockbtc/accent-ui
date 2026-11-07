# Accént content brief (shared by all content writers)

Repo: /Users/kyle/Developer/antigravity/pipes-unified
Contract: src/content/accent/types.ts (read it first). Each page file exports `export const page: AccentPage = {...}`.
Tab bodies are Markdown template strings (escape backticks as \` inside template literals; avoid `${`).
Rendered by src/components/MarkdownRenderer.tsx (supports #/##/### headings, bold, italic, inline code, fenced code, lists, blockquotes, links). Tables are NOT supported: use lists instead.
Insert live demos on their own line as `::demo:<id>::`. Only use these ids:
grid-overlay, spacing-scale, type-pairing, numerals, leading-rhythm, contrast-explorer, room-gallery,
icon-restraint, touch-targets, breakpoints, card-anatomy, button-states, badge-states, input-states,
card-examples, hero-demo, nav-demo, chart-demo, stepwise-compiler, punctuation-family

## Audience and voice
- Primary reader: a smart non-designer (founder, PM, writer, small-business owner) and secondarily engineers and local AI models.
- Overview tab: plain English. Explain WHAT, WHY it matters to a human, and the Accent rule. No jargon without a one-line definition.
- Guidelines tab: "Do" / "Don't" lists, "When to use" / "When not to".
- Specs tab: tokens, exact measurements, anatomy, a short TSX snippet.
- Accessibility tab: concrete requirements (WCAG refs, keyboard, screen reader, 44px targets).
- Voice: direct, wry, confident, concrete. No AI clichés (delve, unleash, seamless, robust, elevate, "in today's fast-paced", "it's not just X, it's Y", em-dash overuse). Short sentences mixed with long ones. Use real examples.
- Use ## and ### headings generously; they generate the "On this page" rail.

## Source material (Kyle's poster "Albers & Vignelli in CSS — Colors Type Grids", human-made, owned by Kyle, link https://cassandra.colonhyphenbracket.pink/colorstypegrids)
- 8pt grid: computers think in powers of two; 8 is half of the 16px root em. Everything divisible by 8, occasionally settle for 4.
- If auto-layout makes a text box 71px, round to 72, or the root grid degrades "one lazy auto layout at a time." Padding at 13 instead of 8/12/16 breaks it.
- A designer has few shapes (rectangles, circles); the rest is decoration: color, typography, iconography, graphics/media.
- Card anatomy: SURFACE, ART, INTERACTION, ANCHOR (Albers). Asymmetric radius 0,12,0,12. Surfaces 400x408: 2% taller than wide because humans like art slightly above dead center.
- Sometimes you break the grid: "the size of the circle is more important than the padding." Bend rules only with a justifiable reason in service of the whole.
- Albers, The Interaction of Color: color is never perceived in isolation; a color is in relief (support) or in focus. Gestalt: the whole is greater than the parts.
- Vignelli: discipline, few typefaces, grids. Poster pairs EB Garamond with Roboto. Type specs like "Roboto 10pt, 16 leading" and "UPPERCASE 6pt, 0.75 tracking".
- Critique: corporate teams optimizing dev time + Figma auto layout/tokens led to "slapdashery of dimestore interface designs." AI writes backend like a lightsaber through butter but burns 5x tokens on cohesive UI and still looks like slop.
- Great design: see users as humans first, users second, customers last.

## Pipes facts
- Pipes (pipes.pink) uses Fraunces (serif display) + Inter (sans UI) + JetBrains Mono.
- Accent itself does not mandate fonts: it teaches pairing ONE open serif (Google/Open Font) with ONE widely supported sans, with robust fallback stacks; users may pair, go serif-only, or sans-only.
- Georgia warning: old-style numerals with descenders (3,4,5,7,9 drop below baseline) make financial tables and prices hard to scan. Use lining, tabular figures (`font-variant-numeric: lining-nums tabular-nums`).
- Minimum text size 13px. Reading measure 60–70ch. Touch targets ≥ 44×44px. WCAG AAA (7:1) for body text on room surfaces; 49 pastel × tonal-dark pairs verified ≥ 7:1.
- Light foundations: Alabaster #FAF8F5, Gallery Stone #E8E2D5, Card #F3EFE9, Ink #111827. Pink accent #D44983.
- 12 rooms (themes): Gallery, Chapel, Atelier, Fairway, Brew, Atlas, Signal, Image Lab, Vault, Ledger, Forge, Orbit.
- Punctuation family (products are punctuation marks): ´ Accent (design system: emphasis/inflection), ! Bang (website builder for small businesses), :-] Colon Hyphen Bracket (the company), ;-] Simmy / Ask (the AI companion, winking), \ pipe namespace (e.g. pipe\website-design). Idea: words translate unevenly across cultures; punctuation (pause, emphasis, exclamation, path) is shared by most written languages, so it's a neutral primitive for products.
- Stepwise compiler: local 7B models (Qwen 2.5 Coder 7B on 8–16GB Macs) get 4 small validated steps (~200 tokens each) instead of one 2,500-word prompt; 14–32B get 2 phases; cloud frontier gets 1 pass. Inspired by https://www.okou.ai/en/blog/posts/ai-product-design-workflow-without-figma
- Public docs use sample/Unsplash imagery only, never real users' portraits.

## Rules field
Every page needs 3–6 `rules` (AgentRule). Use `violationPattern` regex strings where mechanical (e.g. `text-\\[(8|9|10|11|12)px\\]`), escaped correctly for a TS string.

When done, run `npx tsc --noEmit` scoped sanity (whole project is fine) and report back the file list. Do not edit files outside your assigned list.
