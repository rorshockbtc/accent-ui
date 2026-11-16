import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/ai-flows',
  section: 'patterns',
  title: '06 · Sovereign AI Flows: End-to-End Composition & Seal to Pipe',
  summary:
    'Unite discovery tiers, scoped composers, self-healing streams, cryptographic ledgers, and human diff consent into calm, inline reading-to-curation workflows.',
  readingMinutes: 7,
  aiPhase: 'flows',
  subPatterns: [
    'Local-First Pipeline',
    'Inline Multimodal Composition',
    'Draft to Verified Graduation',
    'Seal to Pipe Node',
    'Voice-to-Ledger Workflow',
  ],
  chromaticPair: { pastel: 'blush', dark: 'oxblood' },
  liveInPipes: [
    { label: 'Sovereign Interface Thesis', href: '/thesis/the-sovereign-interface' },
    { label: 'Pipes Local Setup', href: '/desktop' },
  ],
  relatedSlugs: ['patterns/discovering', 'patterns/evaluating', 'essays/dont-make-people-prompt'],
  tabs: {
    overview: `## How the five lifecycle phases compose without UI chaos

Too many AI applications bolt five separate modals, sidebars, floating sparkle buttons, and feedback surveys onto an existing layout until the product feels like a cockpit. Accént treats **Discovering -> Instructing -> Observing -> Evaluating -> Refining** as a single unified vertical flow directly on sandstone paper.

> **Why:** Keeping all five stages inline preserves the reader's primary column context and turns ephemeral model outputs into permanent, verifiable content-addressed Pipe nodes.

Interact with the unified flow below from engine tier selection through scoped execution and streaming prose:

::demo:ai-flows-overview::`,

    guidelines: `## Rules for End-to-End AI Workflows

- **Keep synthesis inline inside the document column**: Never trap readers inside full-screen wizard modals that hide the primary sources they are trying to verify.

::demo:ai-flows-handoff::

- **Provide a clear graduation path from ephemeral synthesis to permanent memory**: Always end serious research flows with a \`Seal to Pipe\` action computing a permanent \`pipes:node:v1\` SHA-256 node rather than burying outputs inside an unindexed chat scrollback.

::demo:ai-flows-graduation::`,

    specs: `## End-to-End Flow State Machine & Token Contract

| Stage | Primitive | Trigger -> Output |
|---|---|---|
| **01 Discover** | \`<AccentEngineTierSwitch />\` | Select \`local-0ms\` / \`webgpu-slm\` / \`cloud-byok\` |
| **02 Instruct** | \`<AccentPromptComposer />\` | Recipe or custom query + \`pipe\\\` scopes |
| **03 Observe** | \`<AccentStreamingProse />\` + \`<AccentReasoningTrace />\` | Healed Markdown + searchable \`<details>\` phases |
| **04 Evaluate** | \`<AccentCitationLink />\` + \`<AccentVerificationLedger />\` | Hover hint + SHA-256 table |
| **05 Refine** | \`<AccentDiffViewer />\` + \`<AccentFollowUpList />\` | \`jsdiff\` consent + \`Seal to Pipe\` |

Inspect the deterministic state transitions:

::demo:ai-flows-spec::`,

    accessibility: `## Polite Async Announcements Without Focus Hijacking

Moving cleanly from query submission through live token output and verification ledger rendering requires disciplined focus management. Keep focus anchored on user controls (such as Stop Generation or Accept Revision), route streaming progress notices through \`aria-live="polite"\`, and maintain strict \`44×44px\` targets from step one through final graduation.

::demo:ai-flows-a11y::`,
  },
  rules: [
    {
      id: 'flow.inline-over-modal-wizard',
      statement:
        'Render multi-step AI query, streaming observation, citation audit, and diff consent inline within the reading flow rather than isolating them inside blocking full-screen modals.',
      why: 'Readers need simultaneous visual access to source documents while auditing synthesized claims.',
    },
    {
      id: 'flow.graduate-to-durable-node',
      statement:
        'Include an explicit Save or Seal to Pipe graduation step in research flows so verified insights transition out of transient chat history into durable addressable records.',
      why: 'Chat scrollback is poor long-term memory; structured knowledge nodes endure.',
    },
  ],
};
