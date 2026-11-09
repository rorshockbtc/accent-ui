import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'ai/agent-adapters',
  section: 'ai',
  title: 'Cross-Repo Adapter Protocol & Motion Injection',
  summary:
    'Copy-paste agent instructions for invoking Accént in another GitHub repository (such as highdraw, chb-corporate-site, or marigold), consuming motion tokens, and writing project-local rules.',
  readingMinutes: 8,
  tabs: {
    overview: `## How any GitHub project consumes Accént and makes it its own

When you want to introduce Accént—or just Accént's **Two-Tier Choreography & Motion System**—into another GitHub repository that currently has zero motion or its own brand identity, the downstream agent does **not** need to submit Pull Requests back to the master Accént repo.

Instead, the downstream agent follows the **3-Step Fork-and-Adapt Protocol**:
1. **Invoke**: Pull the canonical motion tokens (\`src/lib/motion/tokens.ts\`), brand primitives (\`AccentBrandMotion.tsx\`), and base \`STYLES.md\` from Accént (\`github.com/rorshockbtc/accent-ui\` or \`design.pipes.pink/design-system/styles.md\`).
2. **Adapt**: Create a local \`accent.config.ts\` and \`STYLES.md\` in the target repository using \`defineAccentTheme()\`.
3. **Experiment Locally**: Write project-specific motion variants, custom springs, or bespoke choreography primitives inside the target repo's \`src/lib/motion/\` and document them in Section 5 (\`customExtension\`) of the repo's local \`STYLES.md\`.

::demo:agent-adapter-playground::`,

    guidelines: `## Ready-to-Send Prompt for a Downstream Repository Agent (e.g. \`highdraw\`)

Copy and paste the block below directly to the coding agent in your other GitHub project:

\`\`\`markdown
### Agent Task: Adopt Accént Motion & Create Local STYLES.md Adapter

1. **Fetch the Canonical Accént Contracts**:
   - Reference the Accént Design System repo (\`https://github.com/rorshockbtc/accent-ui\`) and live spec endpoints:
     - Rules JSON: \`https://design.pipes.pink/design-system/rules.json\`
     - Base Style Contract: \`https://design.pipes.pink/design-system/styles.md?brand=playful-principal\`
2. **Install & Scaffold Two-Tier Motion (\`src/lib/motion/tokens.ts\`)**:
   - Wrap the app in Framer Motion \`<LazyMotion features={domAnimation}>\` so the motion runtime stays \`~16KB\`.
   - Import or copy Accént's Tier 1 operational physics (\`140ms\` micro press \`scale(0.97)\`, \`220ms\` standard transition \`[0.16, 1, 0.3, 1]\`, \`SPRING_LAYOUT\` \`{ stiffness: 380, damping: 32 }\`) and Tier 2 editorial/brand choreography (\`<RiseLines />\`, \`<FadeUp />\`, \`<Hairline />\`, \`<ScaryHeadline />\`, \`<Smile />\`).
   - Always honor \`useReducedMotion()\` by collapsing durations to \`<= 120ms\` and stripping Y-axis translation.
3. **Create Local \`STYLES.md\` (Do NOT put style rules in \`AGENTS.md\`)**:
   - Write our project's \`STYLES.md\` in the repo root.
   - Keep Layer 1 invariants intact (8pt spatial grid, \`>= 13px\` minimum font size, \`>= 44×44px\` touch targets, WCAG AA/AAA contrast, no layout-thrashing \`transition-all\` on \`width\`/\`height\`).
   - Use Section 5 (\`customExtension\`) of \`STYLES.md\` and \`src/lib/motion/custom.ts\` to freely experiment with project-specific motion choreography, custom spring curves, and brand tokens without opening PRs to upstream Accént.
\`\`\``,

    specs: `## Motion Injection Checklist for Downstream Repos

| Primitive | Tier | Timing / Physics | GPU-Safe Properties Only |
|---|---|---|---|
| \`BUTTON_PRESS\` | Tier 1 Operational | \`140ms\` · \`scale(0.97)\` | \`transform\`, \`opacity\` |
| \`SPRING_LAYOUT\` | Tier 1 Operational | \`stiffness: 380, damping: 32\` | \`layoutId\` transform |
| \`RiseLines\` | Tier 2 Editorial | \`900ms\` · \`[0.22, 1, 0.36, 1]\` | \`transform: translateY\` inside \`overflow-hidden\` |
| \`ScaryHeadline\` | Tier 2 Editorial | \`350ms\` strike + \`stiffness: 240, damping: 24\` | \`scaleX\`, \`y\`, \`opacity\` |
| \`Hairline\` | Tier 2 Editorial | \`900ms\` draw from \`origin-left\` | \`transform: scaleX\` |`,

    accessibility: `## Motion Safety Guardrails

- Never animate \`width\`, \`height\`, \`top\`, \`left\`, or \`margin\`. Animate only \`transform\` (\`translate\`, \`scale\`, \`rotate\`) and \`opacity\`.
- Never introduce infinite looping animations on reading surfaces (the only permitted ambient tick is the discrete \`<Smile />\` punctuation wink, which halts under \`prefers-reduced-motion\`).`,
  },
  rules: [
    {
      id: 'adapter.local-experimentation',
      statement:
        'Downstream repositories may define custom motion variants and brand overrides in their local STYLES.md (Section 5 customExtension) provided all animations use GPU-composited transform/opacity and respect prefers-reduced-motion.',
      why: 'Enables rapid creative experimentation in projects like highdraw without fragmenting core performance or accessibility guarantees.',
    },
  ],
};
