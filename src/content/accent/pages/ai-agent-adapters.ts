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

> **Why:** Fork-and-adapt lets downstream repos iterate freely in \`STYLES.md\` Section 5 and \`<LazyMotion>\` variants without blocking on upstream package releases.

Instead, the downstream agent follows the **3-Step Fork-and-Adapt Protocol**:
1. **Invoke**: Pull the canonical motion tokens (\`src/lib/motion/tokens.ts\`), brand primitives (\`AccentBrandMotion.tsx\`), and base \`STYLES.md\` from Accént (\`github.com/rorshockbtc/accent-ui\` or \`design.pipes.pink/design-system/styles.md\`).
2. **Adapt**: Create a local \`accent.config.ts\` and \`STYLES.md\` in the target repository using \`defineAccentTheme()\`.
3. **Experiment Locally**: Write project-specific motion variants, custom springs, or bespoke choreography primitives inside the target repo's \`src/lib/motion/\` and document them in Section 5 (\`customExtension\`) of the repo's local \`STYLES.md\`.

::demo:agent-adapter-playground::`,

    guidelines: `## Ready-to-Send Prompt for a Downstream Repository Agent (e.g. \`highdraw\`)

Every downstream repository adopts Accént in three autonomous steps (\`Invoke -> Adapt -> Experiment\`):

::demo:adapter-fork-workflow::

Wrap the application root in Framer Motion \`<LazyMotion features={domAnimation}>\` and strictly prohibit layout-thrashing CSS properties (\`width\`, \`height\`, \`transition-all\`).

::demo:adapter-lazy-motion::`,

    specs: `## Motion Injection Checklist for Downstream Repos

| Primitive | Tier | Timing / Physics | GPU-Safe Properties Only |
|---|---|---|---|
| \`BUTTON_PRESS\` | Tier 1 Operational | \`140ms\` · \`scale(0.97)\` | \`transform\`, \`opacity\` |
| \`SPRING_LAYOUT\` | Tier 1 Operational | \`stiffness: 380, damping: 32\` | \`layoutId\` transform |
| \`RiseLines\` | Tier 2 Editorial | \`900ms\` · \`[0.22, 1, 0.36, 1]\` | \`transform: translateY\` inside \`overflow-hidden\` |
| \`ScaryHeadline\` | Tier 2 Editorial | \`350ms\` strike + \`stiffness: 240, damping: 24\` | \`scaleX\`, \`y\`, \`opacity\` |
| \`Hairline\` | Tier 2 Editorial | \`900ms\` draw from \`origin-left\` | \`transform: scaleX\` |

::demo:adapter-tier-inspector::`,

    accessibility: `## Motion Safety Guardrails & Reduced Motion Compliance

- Never animate \`width\`, \`height\`, \`top\`, \`left\`, or \`margin\`. Animate only GPU-composited \`transform\` (\`translate\`, \`scale\`, \`rotate\`) and \`opacity\`.
- Never introduce infinite looping animations on reading surfaces (the only permitted ambient tick is the discrete \`<Smile />\` punctuation wink, which halts immediately under \`prefers-reduced-motion\`).

::demo:adapter-motion-audit::`,
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
