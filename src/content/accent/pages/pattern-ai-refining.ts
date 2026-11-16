import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/refining',
  section: 'patterns',
  title: '05 · Refining: Client-Side Diffs & Hairline Socratic Follow-Ups',
  summary:
    'Keep human authorship sovereign using word/line MIT jsdiff redlines, explicit Accept/Reject gates, and minimalist 1px hairline follow-up branches.',
  readingMinutes: 6,
  aiPhase: 'refining',
  subPatterns: [
    'Word & Line Diffs',
    'Human-in-the-Loop Approval',
    'Socratic Follow-Ups',
    'Seal to Pipe Distillation',
    'Branching Explorations',
  ],
  chromaticPair: { pastel: 'lilac', dark: 'plum' },
  liveInPipes: [
    { label: 'Curate & Refine Studio', href: '/curate' },
    { label: 'Website Design Pipe', href: '/explore/website-design' },
  ],
  relatedSlugs: ['patterns/evaluating', 'patterns/ai-flows', 'essays/dont-make-people-prompt'],
  tabs: {
    overview: `## Never overwrite human drafts silently

When an AI model proposes an edit to a curator's essay, policy, or TypeScript token file, silently swapping the text destroys authorial trust. Likewise, bombarding the bottom of every response with five bubbly floating prompt pills clutters the page like adware.

> **Why:** Computing word and line deltas client-side with MIT \`jsdiff\` inside \`<AccentDiffViewer />\` paired with a quiet \`1px\` hairline \`<AccentFollowUpList />\` respects both editorial ownership and screen calm.

Inspect and approve or reject proposed wording below before sealing results into a canonical Pipe:

::demo:ai-refine-overview::`,

    guidelines: `## Rules for Iterative Refinement Surfaces

- **Use 1px hairline lists instead of pill suggestion clouds**: Present Socratic next questions cleanly vertically with leading \`>\` glyphs and generous \`44px\` tap height so readers scan options naturally like a table of contents.

::demo:ai-refine-followups::

- **Always expose word vs. line diff granularity + manual Accept/Reject**: Let reviewers inspect single-phrase adjustments alongside multi-line restructures without server round-trips.

::demo:ai-refine-hitl::`,

    specs: `## Diff Redline & Follow-Up Specification

| Element | Library / Semantic Tag | Visual + Non-Color Marker |
|---|---|---|
| **Word / Line Engine** | MIT \`diff\` (\`diffWords\`, \`diffLines\`) | Client-side \`< 1ms\` diff hunk array |
| **Deletion Span** | Semantic \`<del>\` | \`[-]\` monospace prefix + strikethrough + crimson rule |
| **Insertion Span** | Semantic \`<ins>\` | \`[+]\` monospace prefix + double underline + sage rule |
| **Follow-Up List** | \`divide-y divide-[var(--a-rule)]\` | Vertical list + single \`Seal to Pipe\` CTA |

Inspect MIT \`jsdiff\` invocation contract:

::demo:ai-refine-spec::`,

    accessibility: `## WCAG 1.4.1 Color-Independent Diff Affordances

Red and green tints alone lock out protanopia and deuteranopia reviewers as well as monochrome e-ink or Windows Forced Colors users. Every deletion in \`<AccentDiffViewer />\` renders a leading \`[-]\` text prefix plus semantic \`<del>\` line-through geometry, while every insertion renders \`[+]\` plus double-underline decoration.

::demo:ai-refine-a11y::`,
  },
  rules: [
    {
      id: 'refine.explicit-diff-consent',
      statement:
        'AI-proposed edits to user drafts must render an inspectable diff with explicit Accept and Reject controls rather than silently overwriting content.',
      why: 'Protects authorial control and makes model changes auditable at the word and line level.',
    },
    {
      id: 'refine.non-color-diff-markers',
      statement:
        'Encode diff deletions and insertions with semantic <del>/<ins> elements and visible [-]/[+] text prefixes alongside color.',
      why: 'Satisfies WCAG 1.4.1 Use of Color so diffs remain unambiguous for color-vision-deficient readers.',
    },
  ],
};
