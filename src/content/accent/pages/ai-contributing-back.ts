import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'ai/contributing-back',
  section: 'ai',
  title: 'How Imprints Contribute Back: The Accént Upstreaming Protocol',
  summary:
    'The 4-stage lifecycle for forking, incubating local design innovations in customExtension, parameterizing tokens to --a-*, and submitting components back upstream into Accént Core.',
  readingMinutes: 8,
  tabs: {
    overview: `## Why a unified design system needs a two-way street

When multiple products or independent imprints—such as **Colon Hyphen Bracket** (\`colonhyphenbracket.pink\`), **Kyle Portfolio** (\`hire.colonhyphenbracket.pink\`), **Chicuinaco Estate**, **Marigold Insights**, or **Highdraw**—share a core design system, they cannot be trapped in a rigid one-size-fits-all monoculture. Nor can they drift into unmaintainable disconnected forks.

> **Why:** Every imprint needs local autonomy to move at product speed while keeping shared primitives interoperable across dark mode, screen readers, and multi-brand tokens.

Accént solves this through the **Bi-Directional Upstreaming Protocol**:

1. **Downstream Freedom**: Any repository forks or adapts Accént using \`defineAccentTheme()\` and experiments locally in Section 5 (\`customExtension\`) of its local \`STYLES.md\`.
2. **Local Incubation**: Components, layout pedestals, or color refinements evolve rapidly in production without waiting for upstream PR reviews.
3. **Parameterization**: When a local pattern proves essential, its hardcoded values are mapped to semantic \`--a-*\` tokens.
4. **Upstream Graduation**: The component or token is contributed back to \`accent-ui\`, making it instantly available across all other imprints.

::demo:agent-adapter-playground::`,

    guidelines: `## The 4-Stage Component Lifecycle

Every component, motion curve, or layout structure travels through four deliberate phases:

::demo:contribute-graduation-flow::

### Phase 1 & 2: Private Experimentation & Local Incubation
- Implement the pattern directly in your project's \`src/components/\` and verify mobile Safari and desktop ergonomics.
- Register the pattern in your local \`accent.config.ts\` inside \`customExtension.rules\` or \`customExtension.codeSnippet\` and refresh \`STYLES.md\`:
\`\`\`bash
curl -sL "https://design.pipes.pink/styles.md?brand=playful-principal" > STYLES.md
\`\`\`

### Phase 3 & 4: Parameterization & Upstream Graduation
Strip hardcoded project hex colors and fixed radii before proposing a component back to core:

::demo:contribute-hex-cleanup::

- Replace raw hexes with \`var(--a-bg)\`, \`var(--a-surface)\`, \`var(--a-ink)\`, \`var(--a-accent)\`, \`var(--a-accent-fill)\`, and \`var(--a-radius-cta)\`.
- Parameterize animation timings with Accént Tier 1 (\`120ms–220ms\`) or Tier 2 (\`650ms–900ms\`) curves and run \`npm run typecheck && npx vitest run && npm run build:lib\`.`,

    specs: `## Upstream Contribution Checklist

Before an imprint's local component is merged upstream into Accént Core (\`accent-ui\`), it must pass this verification ratchet:

| Check | Requirement | Verification Method |
|---|---|---|
| **01 · Zero Raw Hexes** | No hardcoded colors like \`#FE299E\` or \`#111827\` in component body | Parameterized with \`var(--a-*)\` tokens |
| **02 · Type Floor** | Minimum typography size is \`text-xs\` (\`13px\` / \`0.8125rem\`) | Regex audit: \`!/text-\\[(8\|9\|10\|11\|12)px\\]/\` |
| **03 · Touch Target** | Interactive targets maintain \`>= 44×44px\` clickable surface | Class audit: \`min-h-[44px]\` or \`p-3\` |
| **04 · GPU-Only Motion** | Motion animates only \`transform\` and \`opacity\` | No layout-thrashing \`width\`, \`height\`, \`top\`, \`left\` |
| **05 · Contrast AA/AAA** | Verified by \`validateThemeContrast()\` math | Passes \`7.0:1\` AAA body ink & \`4.5:1\` AA CTAs |
| **06 · Reduced Motion** | Respects \`useReducedMotion()\` or \`motion-reduce:\` | Snaps or limits displacement to \`<= 120ms\` |

Inspect the automated verification gates interactively below:

::demo:contribute-ratchet-sim::`,

    accessibility: `## WCAG Invariant Protection During Upstreaming

When downstream projects customize buttons or backgrounds, they often adjust colors for local aesthetic reasons (such as restoring electric Hot Pink \`#FE299E\` over dark wine \`#B81468\`). Always verify the full semantic triad before merging back into core.

- Ensure the three-part accent triad (\`--a-accent\`, \`--a-accent-fill\`, \`--a-accent-text\`) correctly reflects the brand's intent without breaking AA contrast on white button labels or sandstone ink.
- Never let downstream overrides reduce contrast below WCAG 2.1 AAA (\`7.0:1\`) on body ink or AA (\`4.5:1\`) on muted metadata and inline links.

::demo:contribute-triad-a11y::`,
  },
  rules: [
    {
      id: 'contribute.parameterize-tokens',
      statement:
        'Components contributed upstream to Accént Core must replace project-specific hex colors and fixed values with semantic --a-* tokens.',
      why: 'Ensures the component renders correctly and cohesively across all brand dialects without visual collisions.',
    },
    {
      id: 'contribute.preserve-invariants',
      statement:
        'All upstreamed primitives must strictly satisfy Layer 1 invariants: 8pt spatial grid, >= 13px typographic floor, >= 44×44px touch targets, and GPU-safe motion.',
      why: 'Prevents downstream design experiments from introducing accessibility regressions or layout jank to other adopting projects.',
    },
  ],
};
