import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/theming',
  section: 'foundations',
  title: 'Theming, Adapters & Engineered Drift',
  summary:
    'How to govern deliberate aesthetic drift across the Colon Hyphen Bracket ecosystem and open-source forks using defineAccentTheme(), WCAG contrast auditing, and the shadcn/ui CSS variable bridge.',
  readingMinutes: 8,
  tabs: {
    overview: `## Why drift is a feature when the math stays fixed

A single-brand design system forces every product to look like the same app. Across the **Colon Hyphen Bracket** ecosystem—and across external open-source adopters—each product has its own job, audience, and editorial mood:

- **Pipes (\`editorial-sandstone\`)** is an archival knowledge library on MoMA/Met Warm Sandstone (\`#E8E2D5\`) with **Fraunces** and Sovereign Pink (\`#B8326D\`).
- **CHB Corporate (\`playful-principal\`)** is a high-converting studio flagship on Crisp Alabaster (\`#FAF8F5\`) with **Bricolage Grotesque**, Hot Pink (\`#FE299E\`), pill CTAs, and the winking \`: - ]\` mark.
- **Albers Perspectives (\`albers-perspectives\`)** channels Josef Albers' *Interaction of Color* on Warm Sandstone (\`#EAE0D0\`) and Espresso Ink (\`#281B16\`).
- **Kyle Cyree Portfolio (\`cassandra-noir\`)** pairs Cassandra Obsidian Noir (\`#161413\`) dark mode and Albers Sandstone light mode with **Cormorant Garamond** and Dusty Rose (\`#D9777F\`).
- **Chicuinaco Estate (\`hacienda-emerald\`)** pairs Archival Sandstone (\`#E8E2D5\`) with Botanical Hacienda Emerald (\`#1B5E3A\`), Warm Gold (\`#835E08\`), and **Plus Jakarta Sans**.
- **Marigold (\`terracotta-civic\`)** uses Warm Cream (\`#FDFBF7\`), Deep Chocolate Ink (\`#36241F\`), and Terracotta (\`#AD3617\`) for zero-knowledge DuckDB civic storytelling.
- **Greater \`>\` (\`greater-terminal\`)** strips the canvas to high-contrast monochrome (\`#0A0A0A\` / \`#F7F5F0\`) with **Major Mono Display** and Sovereign Pink cursor focus.

We call this **Engineered Drift**: the **Brand Profile** (surface hexes, display font, CTA radius, punctuation mark) is designed to drift per product, while the **Mathematical Invariants** never budge.

## Layer 1 vs. Layer 2: What never drifts vs. what adapts

| Layer | Governed By | Can Projects Override? | Examples |
|---|---|---|---|
| **Layer 1: Invariants** | \`@rorshockbtc/accent-ui\` Core | **Never** | 8pt spatial grid, \`13px\` (\`0.8125rem\`) minimum type floor, \`44×44px\` tap targets, zero \`box-shadow\` in editorial mode, WCAG AA (\`4.5:1\`) / AAA (\`7.0:1\`) contrast, two-tier motion physics (\`[0.16, 1, 0.3, 1]\` & \`[0.22, 1, 0.36, 1]\`), \`prefers-reduced-motion\` compliance |
| **Layer 2: Brand Adapter** | \`defineAccentTheme()\` / \`src/styles/themes.ts\` | **Yes (Encouraged)** | \`--a-bg\`, \`--a-surface\`, \`--a-ink\`, \`--a-accent\`, \`--a-sky\`, \`--a-radius-cta\`, display/serif/sans font stacks, signature punctuation mark (\`´\`, \`: - ]\`, \`>\`, \`01 /\`) |`,

    guidelines: `## How to create or adapt a Brand Profile with \`defineAccentTheme()\`

Instead of hardcoding rogue hex values inside component files, define your project's aesthetic drift in a single \`accent.config.ts\` (or register it upstream in \`src/styles/themes.ts\`) using \`defineAccentTheme()\`.

\`defineAccentTheme()\` automatically:
1. Inherits any un-overridden tokens from your chosen base preset (\`editorial-sandstone\` by default).
2. Runs \`validateThemeContrast()\` against both light and dark modes to verify that body ink (\`>= 7.0:1\` AAA), muted copy (\`>= 4.5:1\` AA), and CTA button fills (\`>= 4.5:1\` AA) pass WCAG 2.1 math.
3. Generates both Accént \`--a-*\` variables **and** shadcn/ui bridge variables (\`--background\`, \`--foreground\`, \`--card\`, \`--primary\`, \`--muted\`, \`--border\`, \`--ring\`, \`--radius\`) via \`getShadcnBridgeVars()\`.

## How to fork and upstream improvements across GitHub repositories

To maximize open-source reuse and showcase architectural velocity across your GitHub profile:

1. **Official Presets Live in \`rorshockbtc/accent-ui\`**: All 7 flagship CHB brand profiles live in \`src/styles/themes.ts\`, and all shared Tier 2 choreography primitives (\`RiseLines\`, \`ScaryHeadline\`, \`Smile\`, \`FadeUp\`, \`Reveal\`, \`Hairline\`, \`Stagger\`, \`Eyebrow\`, \`EyebrowRule\`, \`GhostNumeral\`, \`useParallax\`, \`AccentRevealText\`, \`AccentRevealImage\`) live in \`src/components/editorial-motion/\`.
2. **Downstream Projects Consume via Adapter**: Each project (\`chb-corporate-site\`, \`portfolio\`, \`chicuinaco\`, \`marigold\`, \`greater-than\`, \`pipes\`) declares its official \`BrandProfileId\` in \`AGENTS.md\` and maps its root CSS variables through \`getShadcnBridgeVars(brandId, mode)\`.
3. **Upstream Novel Primitives via PR**: Whenever an agent invents a reusable motion primitive or layout pattern in a product repo (such as \`GhostNumeral\` in Chicuinaco or \`ScaryHeadline\` in CHB Corporate), upstream the generalized primitive into \`rorshockbtc/accent-ui\` using \`--a-*\` tokens.`,

    specs: `## Official Ecosystem Brand Profiles (\`src/styles/themes.ts\`)

| Mark | Profile ID | Name & Property | Display + Sans | Light Canvas (\`--a-bg\`) | Light Accent (\`--a-accent-fill\`) | CTA Radius |
|---|---|---|---|---|---|---|
| \`´\` | \`editorial-sandstone\` | **Pipes Protocol** (\`pipes.pink\`) | Fraunces + Inter | \`#E8E2D5\` | \`#B8326D\` | \`6px\` |
| \`: - ]\` | \`playful-principal\` | **CHB Corporate** (\`colonhyphenbracket.pink\`) | Bricolage Grotesque + Inter | \`#FAF8F5\` | \`#B81468\` (\`#FE299E\` mark) | \`9999px\` |
| \`; - ]\` | \`albers-perspectives\` | **Albers Perspectives** (\`colonhyphenbracket.pink\`) | Newsreader + Inter | \`#EAE0D0\` | \`#B81468\` | \`10px\` |
| \`>_\` | \`cassandra-noir\` | **Kyle Portfolio** (\`kyle.colonhyphenbracket.pink\`) | Cormorant Garamond + Inter | \`#EAE0D0\` (Dark: \`#161413\`) | \`#B81468\` (Dark: \`#D9777F\`) | \`6px\` |
| \`01 /\` | \`hacienda-emerald\` | **Chicuinaco Estate** (\`chicuinaco\`) | Fraunces + Plus Jakarta Sans | \`#E8E2D5\` | \`#1B5E3A\` (Dark: \`#B8E986\`) | \`4px\` |
| \`§\` | \`terracotta-civic\` | **Marigold Analytics** (\`marigold\`) | Fraunces + Inter | \`#E8E2D5\` (\`#FDFBF7\` card) | \`#AD3617\` | \`12px\` |
| \`>\` | \`greater-terminal\` | **Greater \`>\` AI** (\`greater-than\`) | Major Mono Display + Inter | \`#F7F5F0\` (Dark: \`#0A0A0A\`) | \`#B81468\` | \`4px\` |

## Code: Defining a Custom Theme Adapter (\`accent.config.ts\`)

\`\`\`ts
import { defineAccentTheme } from '@rorshockbtc/accent-ui';

export const myBrandTheme = defineAccentTheme({
  id: 'hacienda-emerald',
  name: 'Hacienda Emerald',
  tagline: 'Archival Sandstone and Botanical Emerald for hospitality.',
  usedBy: 'chicuinaco',
  mark: '01 /',
  extends: 'editorial-sandstone',
  typography: {
    display: 'Fraunces',
    sans: 'Plus Jakarta Sans',
  },
  tokens: {
    light: {
      '--a-bg': '#E8E2D5',
      '--a-surface': '#F3EFE9',
      '--a-ink': '#161514',
      '--a-accent': '#1B5E3A',
      '--a-accent-fill': '#1B5E3A',
      '--a-accent-fg': '#FFFFFF',
      '--a-accent-text': '#14492C',
      '--a-radius-cta': '4px',
    },
  },
});

// Fail CI if any semantic contrast pair drops below WCAG AA (4.5:1) / AAA (7.0:1):
if (!myBrandTheme.contrastReport.valid) {
  console.error('WCAG Contrast Violation:', myBrandTheme.contrastReport.audits);
}
\`\`\``,

    accessibility: `## Automated WCAG Contrast Governance for Custom Themes

Every time you or an AI agent defines a new theme with \`defineAccentTheme()\`, \`validateThemeContrast()\` audits 10 semantic foreground/background pairs across both Light and Dark modes:

1. **\`body-ink-on-bg\`** (\`--a-ink\` on \`--a-bg\`): Must be **\`>= 7.0:1\` (WCAG AAA)**.
2. **\`muted-on-bg\`** (\`--a-muted\` on \`--a-bg\`): Must be **\`>= 4.5:1\` (WCAG AA)**.
3. **\`primary-cta-fill\`** (\`--a-accent-fg\` on \`--a-accent-fill\`): Must be **\`>= 4.5:1\` (WCAG AA)**.
4. **\`accent-text-on-bg\`** (\`--a-accent-text\` on \`--a-bg\`): Must be **\`>= 4.5:1\` (WCAG AA)**.
5. **\`sky-text-on-bg\`** (\`--a-sky-text\` on \`--a-bg\`): Must be **\`>= 4.5:1\` (WCAG AA)**.

> **Why we separate \`--a-accent\` (mark) from \`--a-accent-fill\` (button background) and \`--a-accent-text\` (inline text):** Vibrant brand colors like CHB Hot Pink (\`#FE299E\`) or Marigold Terracotta (\`#E05B37\`) look electric as large punctuation marks or strike-through bars on light paper, but yield \`~3.4:1\` contrast with white button text. By pairing \`--a-accent: #FE299E\` with \`--a-accent-fill: #B81468\` (\`5.6:1\` with white), your brand keeps its signature electric pop while passing strict WCAG 2.1 AA audits.`,
  },
  rules: [
    {
      id: 'theme.engineered-drift',
      statement:
        'Express brand differentiation through BrandProfile tokens (--a-bg, --a-surface, --a-ink, --a-accent, --a-radius-cta, typography) via defineAccentTheme(), never by violating the 8pt grid, 13px type floor, or 44px touch targets.',
      why: 'Allows every property in the ecosystem to have a distinct soul while sharing one bulletproof structural and accessibility foundation.',
    },
    {
      id: 'theme.validate-contrast',
      statement:
        'Every BrandProfile must pass validateThemeContrast() with >= 7.0:1 AAA for body ink on canvas and >= 4.5:1 AA for muted copy, inline accent text, and primary CTA button fills in both light and dark modes.',
      why: 'Prevents custom palettes from degrading legibility when switching themes.',
    },
    {
      id: 'theme.shadcn-bridge',
      statement:
        'In projects using shadcn/ui or Tailwind CSS variables (--background, --foreground, --primary, --border), map those variables directly from getShadcnBridgeVars(brandId, mode) rather than maintaining two disconnected token tables.',
      why: 'Guarantees zero token drift between shadcn primitives and Accént editorial components.',
    },
  ],
};
