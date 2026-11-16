import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/observing',
  section: 'patterns',
  title: '03 · Observing: Self-Healing Streams & Searchable Traces',
  summary:
    'Eliminate layout flicker and opaque pulsing spinners using deterministic Markdown stream healing and native <details> retrieval traces searchable via Cmd+F.',
  readingMinutes: 6,
  aiPhase: 'observing',
  subPatterns: [
    'Streaming Prose',
    'Self-Healing Markdown',
    'Reason Traces',
    'Stepwise Milestones',
    'Polite Live Regions',
  ],
  chromaticPair: { pastel: 'butter', dark: 'bronze' },
  liveInPipes: [
    { label: 'Greater Local Runner', href: '/greater' },
    { label: 'Design System Playground', href: '/design-system/playground' },
  ],
  relatedSlugs: ['essays/perceived-speed-and-provenance', 'components/accordion', 'patterns/evaluating'],
  tabs: {
    overview: `## Replace magic spinners with honest execution progress

When an AI interface replaces 3 seconds of processing with pulsing pastel dots saying *"Thinking..."*, users learn nothing about whether the system checked real sources or hallucinated from weight memory. Meanwhile, raw token streams often flicker broken Markdown syntax mid-sentence.

> **Why:** Deterministic Markdown healing keeps mid-stream rendering calm on mobile viewports, while native \`<details>\` step traces show retrieved SHA-256 slices without JS animation overhead.

Pair \`<AccentStreamingProse />\` with \`<AccentReasoningTrace />\` so observation feels crisp, inspectable, and typographically calm.

::demo:ai-observe-overview::`,

    guidelines: `## Rules for Observing AI Work in Flight

- **Heal incomplete Markdown syntax deterministically**: Run \`healStreamingMarkdown(raw)\` before passing partial tokens into \`<AccentProse />\` so unclosed triple-backtick code fences, dangling bold markers, or half-emitted tables never corrupt page flow.

::demo:ai-observe-heal::

- **Use structured retrieval milestones instead of infinite loops**: Record discrete phase steps (\`01 Retrieve\`, \`02 Verify\`, \`03 Synthesize\`) inside a native disclosure well, honoring Accént's ban on infinite idle looping spinners.

::demo:ai-observe-trace-dont::`,

    specs: `## Self-Healing Parser & Native Disclosure Contract

| Component / Function | Responsibility | Performance Guarantee |
|---|---|---|
| \`healStreamingMarkdown(raw)\` | Closes unclosed fences, inline code, tables | \`O(n)\` client pass per token flush |
| \`<AccentStreamingProse />\` | Wraps \`<AccentProse />\` + \`>\` cursor | Zero DOM layout thrashing |
| \`<AccentReasoningTrace />\` | Native \`<details className="accent-disclosure">\` | Scoped \`::details-content\` transition only when reduced motion off |

Inspect the deterministic healing pipeline and ARIA live region markup:

::demo:ai-observe-spec::`,

    accessibility: `## Native Find-in-Page (` + '`⌘F`' + `) & Summary Semantics

Per modern web standards, native \`<details>\` keeps collapsed retrieval logs searchable via browser Find-in-Page and expands automatically on match—avoiding \`hidden="until-found"\` CSS visibility pitfalls. Never nest heading elements (\`<h2>\`–\`<h4>\`) inside \`<summary>\`, and place the rotating \`▸\` disclosure glyph immediately before the label text.

::demo:ai-observe-a11y::`,
  },
  rules: [
    {
      id: 'observe.self-healing-markdown',
      statement:
        'Normalize incomplete code fences, inline ticks, and Markdown table rows via healStreamingMarkdown() before rendering streamed prose.',
      why: 'Prevents jarring layout jumps and broken code containers while tokens arrive progressively.',
    },
    {
      id: 'observe.native-details-trace',
      statement:
        'Render reasoning and tool execution logs inside native <details>/<summary> disclosures without heading elements inside <summary>.',
      why: 'Preserves JAWS/TalkBack button exposure while keeping all reasoning steps natively searchable with Ctrl/Cmd+F.',
    },
  ],
};
