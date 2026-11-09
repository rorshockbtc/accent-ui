import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'ai/mcp-and-cli',
  section: 'ai',
  title: 'Agent Endpoints: rules.json, styles.md & Prompt Compiler',
  summary:
    'Machine-readable endpoints (/design-system/rules.json and /design-system/styles.md), CLI swizzling, and the 4-step local 7B prompt compiler.',
  readingMinutes: 6,
  tabs: {
    overview: `## Built for humans and AI agents simultaneously

Like Meta's Astryx—and going three steps further with mathematical WCAG verification, two-tier choreography, and 4-step 7B prompt compilation—Accént exposes its entire specification as zero-auth, machine-readable endpoints:

1. **\`GET /design-system/rules.json\`**: Returns all \`200+\` atomic \`AgentRule\` objects across all 57 pages, including regular-expression \`violationPattern\` ratchets and W3C DTCG verified contrast pairs.
2. **\`GET /design-system/styles.md?brand=<id>\`**: Returns a complete, ready-to-commit \`STYLES.md\` Markdown contract for any of the 7 official Brand Profiles (\`editorial-sandstone\`, \`playful-principal\`, \`albers-perspectives\`, \`cassandra-noir\`, \`hacienda-emerald\`, \`terracotta-civic\`, \`greater-terminal\`).
3. **Stepwise Prompt Compiler (\`compileStepwisePrompt\`)**: Splits complex UI generation tasks into 4 small, regex-validated steps for local 7B models, 2 phases for 14B–32B models, or 1 pass for frontier cloud models.

::demo:mcp-endpoint-tester::`,

    guidelines: `## How Agents Query Accént

- **Before scaffolding a page**: Fetch \`/design-system/styles.md?brand=playful-principal\` (or read the repo's local \`STYLES.md\`) to load the active CSS variables, typography stack, and structural posture.
- **After generating TSX/CSS**: Run every rule in \`/design-system/rules.json\` that has a \`violationPattern\` against the generated code string. If any regex matches, fix the violation before returning code to the user.`,

    specs: `## Live Machine Endpoints

| Endpoint | Content-Type | Purpose |
|---|---|---|
| \`/design-system/rules.json\` | \`application/json\` | Full rule registry, token hexes, and regex violation ratchets |
| \`/design-system/styles.md\` | \`text/markdown\` | Default \`editorial-sandstone\` \`STYLES.md\` contract |
| \`/design-system/styles.md?brand=playful-principal\` | \`text/markdown\` | CHB Corporate (\`colonhyphenbracket.pink\`) \`STYLES.md\` contract |
| \`/design-system/styles.md?brand=cassandra-noir\` | \`text/markdown\` | Kyle Portfolio (\`hire.colonhyphenbracket.pink\`) \`STYLES.md\` contract |
| \`/design-system/styles.md?brand=terracotta-civic\` | \`text/markdown\` | Marigold (\`marigoldinsights.org\`) \`STYLES.md\` contract |`,

    accessibility: `## Deterministic CI Ratchet

Every pull request and agent commit runs \`npx vitest run design-system-spec\` to verify that all 57 pages, 7 brand dialects, and regex ratchets pass with zero regressions.`,
  },
  rules: [
    {
      id: 'mcp.verify-against-rules-json',
      statement:
        'Autonomous coding agents must validate generated UI code against the violationPattern regular expressions in /design-system/rules.json before completing a task.',
      why: 'Prevents sub-13px text, nested interactive tags, and layout-thrashing animations from ever landing in git.',
    },
  ],
};
