import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/discovering',
  section: 'patterns',
  title: '01 · Discovering: Zero-Shot Affordances & Progressive Tiers',
  summary:
    'Replace blank prompt anxiety and AI sparkle bloat with structured SQL/template recipes, progressive local-to-cloud intelligence switches, and immediate domain orientation.',
  readingMinutes: 6,
  aiPhase: 'discovering',
  subPatterns: [
    'Intent Recipes',
    'Prompt Suggestions',
    'Zero-Latency Local First',
    'Progressive Intelligence Tiers',
    'Domain Orientation',
  ],
  chromaticPair: { pastel: 'ice', dark: 'abyss' },
  liveInPipes: [
    { label: 'Explore Canons Directory', href: '/explore' },
    { label: 'Marigold Civic Insights', href: '/explore/marigold' },
  ],
  relatedSlugs: ['essays/dont-make-people-prompt', 'patterns/instructing', 'components/command-palette'],
  tabs: {
    overview: `## Orient people before asking them to type

Blank chat boxes punish newcomers. When someone lands in a research archive or civic tool, an empty textarea forcing them to invent prompt phrasing communicates nothing about what the corpus contains or what the engine can reliably execute.

> **Why:** Starting at Tier 1 (0ms deterministic templates and SQL filters) satisfies the majority of user curiosity immediately without wasting neural latency, WebGPU memory, or remote API tokens.

Accént groups **Discovering** around two primitives: **\`<AccentEngineTierSwitch />\`** to surface local-first speed and memory posture transparently, and structured domain recipes that execute cleanly on the first tap.

::demo:ai-discover-overview::`,

    guidelines: `## Design Rules for the Discovering Phase

- **Replace generic wand buttons with real intent recipes**: Lead with concrete domain actions (for example, *Compare Primary Letters* or *Extract Chronology*) paired with crisp typographic numerals \`01\`–\`06\`, zero \`Sparkles\` icons, and zero floating pill clouds.

::demo:ai-discover-recipe::

- **Always expose Tier 1 instant affordability first**: If an answer can be served via deterministic SQL, full-text search, or verified markdown slices, execute locally in \`0ms\` before prompting a user to load weights or configure API keys.

::demo:ai-discover-affordance::`,

    specs: `## Discovery Affordance & Tier Architecture

| Tier | Component / Pattern | Latency Target | Privacy Posture |
|---|---|---|---|
| **01 · Instant Local** | SQL / DuckDB-Wasm / Client Filter | \`0 ms\` | Zero telemetry · \`0 MB\` model RAM |
| **02 · WebGPU SLM** | Local Worker (\`Qwen 1.7B/4B\`) | \`18–45 tok/s\` | Cached in IndexedDB · Offline safe |
| **03 · Sovereign BYOK** | Signed Context Envelope + Stream | \`AbortController\` SSE | Explicit scope chips · Zero retention |

Inspect the deterministic \`AccentPromptRecipe[]\` schema powering zero-shot triggers:

::demo:ai-discover-spec::`,

    accessibility: `## Keyboard Roving Focus & Non-Color State Indicators

Single-row engine tier tabs maintain strict \`44×44px\` touch clearance on \`390×844\` screens without wrapping onto multiple rows. Active selection uses a pseudo-element \`border-bottom\` indicator paired with high-contrast ink weight—never relying solely on hue changes or \`box-shadow\` so Windows Forced Colors mode always shows which tier is active.

::demo:ai-discover-a11y::`,
  },
  rules: [
    {
      id: 'discover.structured-recipes-over-blank-box',
      statement:
        'Provide inspectable zero-shot intent recipes and Tier 1 local filters alongside any open prompt input so users do not face blank-page prompt paralysis.',
      why: 'Reduces first-visit friction and prevents unnecessary neural inference calls when deterministic filters suffice.',
    },
    {
      id: 'ai.no-sparkle-slop',
      statement:
        'Never import Sparkles from lucide-react or emit literal sparkle emoji (✨) to decorate AI features; use bold Fraunces typography, tabular numerals, and Accént color contrast.',
      why: 'Sparkle iconography signals generic AI template UI and undermines editorial trustworthiness.',
      violationPattern: '<Sparkles|Sparkles\\b|✨',
    },
  ],
};
