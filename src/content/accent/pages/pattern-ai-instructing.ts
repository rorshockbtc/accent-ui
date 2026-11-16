import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/instructing',
  section: 'patterns',
  title: '02 · Instructing: Scoped Context, Voice & Interruptible Prompts',
  summary:
    'Ground AI generation inside visible pipe\\slug context chips, parameterizable templates, optional dictation hooks, and instant AbortController interruption.',
  readingMinutes: 6,
  aiPhase: 'instructing',
  subPatterns: [
    'Scoped Context Chips',
    'Prompt Enhancement',
    'Voice Input Hook',
    'Parameters & Constraints',
    'AbortController Stop',
  ],
  chromaticPair: { pastel: 'peach', dark: 'leather' },
  liveInPipes: [
    { label: 'Socratic Dialogues (Semi)', href: '/explore/stoicism' },
    { label: 'Trim Context Compiler', href: '/explore/trim' },
  ],
  relatedSlugs: ['essays/dont-make-people-prompt', 'patterns/discovering', 'patterns/observing'],
  tabs: {
    overview: `## Make constraints visible at the point of authorship

Unscoped prompts invite hallucination. When a curator or reader instructs an assistant without knowing what corpora, word limits, or citation rules are active underneath, every answer becomes an unpredictable black box.

> **Why:** Rendering active canons as explicit removable \`pipe\\slug\` scope items inside \`<AccentPromptComposer />\` guarantees both user and model share the exact citation boundary.

During generation, primary submit controls transition cleanly into a high-contrast \`■ Stop Generation\` button backed by a live \`AbortController\`.

::demo:ai-instruct-overview::`,

    guidelines: `## Rules for Scoped Instruction Interfaces

- **Show attached knowledge boundaries inline**: Never hide system corpora inside opaque server wrappers. Let users add or remove \`pipe\\stoicism\` or \`pipe\\local-first\` directly above the input field.

::demo:ai-instruct-scope::

- **Keep streaming interruptible at all times**: The moment generation begins, swap Submit for Stop (\`■\`) so users can halt runaway tokens instantaneously without losing their typed query text.

::demo:ai-instruct-abort::`,

    specs: `## Prompt Composer & Abortable Envelope Spec

| Element | Primitive / Attribute | Requirement |
|---|---|---|
| **Composer Frame** | \`<form className="border-t-2 border-[var(--a-ink)]">\` | Preserves input text across cancellations |
| **Scope Removers** | \`aria-label="Remove scope ..."\` | \`min-h-[44px]\` hit box per chip |
| **Streaming Action** | \`type="button"\` + \`AbortController.abort()\` | Swaps CTA to \`■ Stop Generation\` mid-stream |
| **Context Pruning** | Trim \`~\` Byte-0 Envelope | Targets ~85–90% boilerplate token savings |

Inspect token compaction savings before transmission:

::demo:ai-instruct-spec::`,

    accessibility: `## Screen-Reader Labels & 44px Scope Controls

Textareas include explicit \`<label className="sr-only">\` associations matching their unique \`useId()\` identifier, while optional voice toggles expose live \`aria-pressed={voiceActive}\` states. Scope removal buttons retain full \`44px\` touch clearance so thumb users on \`390×844\` phones never accidentally clear neighboring chips.

::demo:ai-instruct-a11y::`,
  },
  rules: [
    {
      id: 'instruct.abortable-streams',
      statement:
        'Every streaming AI composer must wire a live AbortController and swap the Submit button to an accessible >=44px Stop control while generating.',
      why: 'Users must never be locked inside a slow or off-track generation stream.',
    },
    {
      id: 'instruct.visible-scope-chips',
      statement:
        'Display active knowledge sources or pipe\\namespaces as removable UI scopes above or beside the composer rather than burying grounding inside hidden system strings.',
      why: 'Explicit scoping builds user agency and prevents accidental cross-corpus hallucination.',
    },
  ],
};
