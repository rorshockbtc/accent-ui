import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'ai/mcp-and-cli',
  section: 'ai',
  title: 'Agent Endpoints: Live MCP Tools, rules.json & styles.md',
  summary:
    'Live JSON-RPC 2.0 MCP tools (accent_search_patterns, accent_get_spec, accent_get_brand_contract, accent_lint_code), HTTP specs (/rules.json, /styles.md), and 4-step 7B prompt compilation.',
  readingMinutes: 6,
  tabs: {
    overview: `## Built for humans and AI agents simultaneously

Accént exposes its full specification and live lint ratchet over zero-auth HTTP endpoints and native Model Context Protocol (MCP) tools—matching and surpassing proprietary design-system MCP servers as an MIT open-source standard.

> **Why:** Autonomous coding agents hallucinate tokens when forced to scrape rendered HTML; exposing JSON-RPC MCP tools and deterministic \`rules.json\` ratchets eliminates guesswork cleanly.

1. **\`GET /design-system/rules.json\`**: Returns every atomic \`AgentRule\` across the documentation registry, complete with regular-expression \`violationPattern\` ratchets and W3C DTCG contrast pairs.
2. **\`GET /design-system/styles.md?brand=<id>\`**: Returns a ready-to-commit \`STYLES.md\` Markdown contract for any of the 7 official Brand Profiles.
3. **Live Accént MCP Tools (\`/api/mcp\` & \`packages/mcp-server\`)**: Agents directly invoke \`accent_search_patterns\`, \`accent_get_spec\`, \`accent_get_brand_contract\`, and \`accent_lint_code\`.

::demo:mcp-endpoint-tester::`,

    guidelines: `## How Agents Query Accént Deterministically

- Inspect and call any of the four registered Accént MCP tools directly via JSON-RPC \`tools/call\` before scaffolding screens or writing CSS overrides:

::demo:mcp-tool-roster::

- Always run \`accent_lint_code\` (or regex checks from \`/design-system/rules.json\`) before returning UI code to catch sub-13px utility classes, nested \`<Link><button>\` elements, or banned Sparkle slop icons instead of scraping documentation HTML.

::demo:mcp-deterministic-dont::`,

    specs: `## Live Machine Endpoints & MCP Tool Contracts

| Target | Transport | Returns |
|---|---|---|
| \`/design-system/rules.json\` | HTTP \`application/json\` | Full rule registry, token hexes, and regex violation ratchets |
| \`/design-system/styles.md?brand=<id>\` | HTTP \`text/markdown\` | Compiled 5-section \`STYLES.md\` contract for any dialect |
| \`accent_search_patterns\` | MCP JSON-RPC | Ranked Human–AI pattern specs, phases, and rule summaries |
| \`accent_get_spec\` | MCP JSON-RPC | Complete multi-tab spec + rules for any Accént page slug |
| \`accent_get_brand_contract\` | MCP JSON-RPC | Compiled \`STYLES.md\`, W3C DTCG tokens, or Figma JSON |
| \`accent_lint_code\` | MCP JSON-RPC | Deterministic violation scan (type floor, nested interactive, Sparkles) |

Inspect the live JSON-RPC 2.0 invocation payload below:

::demo:mcp-jsonrpc-envelope::`,

    accessibility: `## Deterministic CI Ratchet & Plain-Text Tooling

Every pull request runs \`npx vitest run src/lib/__tests__/accent-docs.test.ts src/lib/__tests__/design-system-spec.test.ts\` to verify every documentation page, brand dialect, and MCP contract holds cleanly. All CLI and MCP responses emit clean plain text free of noisy ANSI escape codes so terminal screen readers and \`tabIndex={0}\` scrollable viewports read every violation clearly.

::demo:mcp-cli-a11y::`,
  },
  rules: [
    {
      id: 'mcp.verify-against-rules-json',
      statement:
        'Autonomous coding agents must validate generated UI code against accent_lint_code or the violationPattern regular expressions in /design-system/rules.json before completing a task.',
      why: 'Prevents sub-13px text, nested interactive tags, Sparkles icon slop, and layout-thrashing animations from ever landing in git.',
    },
  ],
};
