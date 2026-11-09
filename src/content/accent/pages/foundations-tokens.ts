import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/tokens',
  section: 'foundations',
  title: 'W3C DTCG Token Architecture & CSS Variable Bridge',
  summary:
    'Single-source-of-truth design tokens in W3C DTCG JSON format, the three-part accent color triad (--a-accent, --a-accent-fill, --a-accent-text), and the zero-drift shadcn/ui CSS variable bridge.',
  readingMinutes: 7,
  tabs: {
    overview: `## One JSON file governs every surface

Accént stores every foundational primitive in a single W3C Design Tokens Community Group (DTCG) file at \`src/styles/design-tokens.json\`, typed and exported through \`src/styles/design-tokens.ts\` and \`src/styles/themes.ts\`.

Nothing in Accént relies on undocumented magic numbers. From a full-bleed 1440px marketing masthead down to a 390×844 mobile sheet or a 400px Chrome Extension side panel, every component consumes the same semantic CSS custom properties (\`--a-*\`).

## The Three-Part Accent Triad (\`--a-accent\`, \`--a-accent-fill\`, \`--a-accent-text\`)

Most design systems use a single \`--primary\` variable for everything—forcing brands to choose between dull, muddied brand marks or inaccessible neon buttons that fail WCAG contrast with white text.

Accént solves this mathematically with \`deriveAccessibleAccent(rawHex, canvasHex)\`, splitting every brand's signature color into three distinct semantic tokens:

1. **\`--a-accent\` (Raw Signature Mark)**: Used for large punctuation marks (\`: - ]\`, \`|||\`, \`>\`), \`<Smile />\` winks, \`<ScaryHeadline />\` strike bars, and active focus rings (e.g., Sovereign Hot Pink \`#FE299E\`).
2. **\`--a-accent-fill\` (WCAG AA Button Fill)**: Automatically darkened until contrast with \`#FFFFFF\` is \`>= 4.6:1\` (e.g., \`#B81468\` at \`5.6:1\`), used for solid primary CTA buttons when strict AA text contrast is required.
3. **\`--a-accent-text\` (WCAG AA Inline Text)**: Automatically calibrated against the active canvas \`--a-bg\` (\`>= 4.6:1\`) for inline kickers, badges, and prose links.

::demo:triad-explorer::`,

    guidelines: `## Token Naming & Usage Rules

- **Always reference semantic \`--a-*\` tokens** in reusable components instead of raw hex literals so switching \`data-accent-brand\` adapts the component immediately.
- **Bridge shadcn/ui & Tailwind variables automatically**: Call \`getShadcnBridgeVars(brandId, mode)\` at the root container to populate \`--background\`, \`--foreground\`, \`--card\`, \`--primary\`, \`--muted\`, \`--border\`, \`--ring\`, and \`--radius\` from the active Accént Brand Profile.
- **Never set typography below the \`13px\` (\`0.8125rem\`) floor**: The smallest legal token in \`design-tokens.json\` is \`font.size.xs\` (\`0.8125rem\` / \`13px\`).`,

    specs: `## Complete Semantic CSS Custom Property Table

| Token | Role | Editorial Sandstone (Light) | Playful-Principal CHB (Light) | Cassandra Noir (Dark) |
|---|---|---|---|---|
| \`--a-bg\` | Primary page canvas | \`#E8E2D5\` | \`#FAF8F5\` | \`#161413\` |
| \`--a-surface\` | Secondary pedestal / well | \`#FAF8F5\` | \`#F3EEE6\` | \`#211E1C\` |
| \`--a-well\` | Elevated input / modal surface | \`#FFFFFF\` | \`#FFFFFF\` | \`#2C2825\` |
| \`--a-ink\` | Primary body & heading ink | \`#111827\` | \`#111827\` | \`#F1EBD8\` |
| \`--a-muted\` | Secondary metadata ink | \`#4B5563\` | \`#4B5563\` | \`#B5ABA0\` |
| \`--a-rule\` | 1px structural hairline | \`rgba(17,24,39,0.14)\` | \`rgba(17,24,39,0.12)\` | \`rgba(241,235,216,0.14)\` |
| \`--a-accent\` | Signature punctuation mark | \`#FE299E\` | \`#FE299E\` | \`#D9777F\` |
| \`--a-accent-fill\` | Accessible primary CTA fill | \`#B8326D\` | \`#B81468\` | \`#D9777F\` |
| \`--a-accent-text\` | Accessible inline accent text | \`#9B1B56\` | \`#B81468\` | \`#E8959C\` |
| \`--a-sky\` | Secondary Dual-Accent Sky | \`#02A7F1\` | \`#0A9BE0\` | \`#38BDF8\` |
| \`--a-radius-cta\` | Primary button corner radius | \`6px\` | \`9999px\` | \`6px\` |
| \`--a-font-display\` | Display headline font stack | \`Fraunces\` | \`Bricolage Grotesque\` | \`Cormorant Garamond\` |`,

    accessibility: `## Compile-Time & Runtime Token Verification

- Every token pair in \`src/styles/design-tokens.json\` is tested on every commit by \`src/lib/__tests__/design-system-spec.test.ts\`.
- Body ink (\`--a-ink\` on \`--a-bg\`) is locked to **WCAG 2.1 AAA (\`>= 7.0:1\`)** across all 7 official Brand Profiles in both Light and Dark modes.`,
  },
  rules: [
    {
      id: 'tokens.semantic-vars',
      statement:
        'Reusable Accént components must consume --a-* CSS custom properties rather than hardcoded hex colors so multi-brand theming works without code changes.',
      why: 'Hardcoded hexes break dark mode and prevent downstream Brand Profiles from adapting the UI.',
    },
    {
      id: 'tokens.accent-triad',
      statement:
        'Use --a-accent for punctuation marks and decorative accents, --a-accent-fill for solid button backgrounds, and --a-accent-text for inline colored text.',
      why: 'Separates electric brand saturation from WCAG 2.1 AA text contrast requirements.',
    },
    {
      id: 'tokens.min-font-floor',
      statement:
        'Never define or apply a font-size token smaller than 13px (0.8125rem).',
      why: 'Sub-13px type fails archival and senior legibility standards.',
      violationPattern: 'text-\\[(8|9|10|11|12)px\\]',
    },
  ],
};
