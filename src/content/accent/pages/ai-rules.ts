import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'ai/rules',
  section: 'ai',
  title: 'Rules a Local Model Must Never Break',
  summary: 'Every Accent page ships machine-readable rules. Here is how rules.json and the stepwise compiler keep a 7B model on the grid.',
  readingMinutes: 6,
  kind: 'doc',
  tabs: {
    overview: `## Why a design system needs rules for robots

AI writes backend code like a lightsaber through butter. Ask it for a cohesive interface and it burns five times the tokens and still hands you something that looks like every other generated landing page. The model is not stupid. It just has no taste and no memory of your decisions.

Accent gives it both, in a form small enough for a laptop. Every page in this design system carries a short list of rules alongside the prose. Humans read the tabs. Models read the rules.

## What a rule looks like

Each rule has four parts:

- **id.** A stable dotted name, like \`grid.multiple-of-8\` or \`button.hit-area-44\`.
- **statement.** One sentence a 7B model can follow without interpretation. "All touch targets are at least 44×44px."
- **why.** The human reason, so a person reviewing output understands what broke and why it matters.
- **violationPattern (optional).** A regular expression that, if it matches generated code, flags a violation. For example \`text-\\[(8|9|10|11|12)px\\]\` catches text below 13px.

## rules.json

All rules from all pages are exported as one file at \`/design-system/rules.json\`. Any tool can fetch it: a local agent, a CI check, a linter in your editor. It is plain JSON, grouped by page slug, so a model working on a card only needs to load card, grid and accessibility rules rather than the whole design system.

## The stepwise compiler

Small local models, like Qwen 2.5 Coder 7B on an 8–16GB Mac, fall apart when handed a 2,500-word prompt. They forget the start by the time they reach the end. So Pipes compiles design work into steps.

::demo:stepwise-compiler::

- **7B models get four steps** of about 200 tokens each: layout, components, content, polish. After each step, output is checked against the relevant \`violationPattern\` rules. Failures go back with the rule statement attached, and the model retries just that step.
- **14–32B models get two phases**: structure, then detail, each validated.
- **Frontier cloud models get one pass**, validated at the end.

The rules are the same at every size. Only the chunking changes.

## Enlarging things without breaking things

Here is the classic case. A business owner says, "Make the logo bigger." A naive model changes \`h-8\` to \`h-[37px]\` and the header grid quietly falls apart.

Accent lets the model grow a card or logo only in 8px steps: 32 to 40 to 48. Each step is validated. Neighboring padding adjusts in 8px steps too, and any interactive element keeps its 44×44px hit area no matter how the art around it changes. If the owner wants it bigger still, the model keeps stepping until the next step would break a rule, then stops and says so in plain words. That is the poster's lesson: sometimes the size of the circle matters more than the padding, but you change it on purpose, on the grid.

## The Accent rule

A model may bend the layout. It may never break a rule without a human approving it.
## Before and after

::demo:ai-before-after-8px::

## What is in the registry

::demo:ai-rule-counts::

> **Why:** A rule only matters if something checks it. Giving each rule a regex lets a script, not a hope, catch the failures a small model makes most.
`,
    guidelines: `## Do

- Load only the rule groups relevant to the current step.
- Feed failed rule statements back to the model verbatim.
- Grow or shrink elements in 8px steps and validate each step.
- Keep 44×44px hit areas on every interactive element through any resize.
- Write new rules as single, testable sentences.

## Don't

- Don't paste the entire design system into a 7B model's prompt.
- Don't accept arbitrary pixel values like \`h-[37px]\` from generated code.
- Don't let a model silently ignore a failed check.
- Don't write rules that need taste to evaluate; that is what the why field is for.

## When to use

- Any AI-assisted generation of Pipes or Bang interfaces.
- CI linting of generated or hand-written components.

## When not to

- As a substitute for human review of copy and imagery.
::demo:ai-do-scoped::

::demo:ai-do-grid-steps::

## Try it

::demo:ai-rule-checker::
`,
    specs: `## Endpoint

- URL: \`/design-system/rules.json\`
- Shape: \`{ [slug: string]: AgentRule[] }\`

## AgentRule

\`\`\`ts
type AgentRule = {
  id: string;
  statement: string;
  why: string;
  violationPattern?: string;
};
\`\`\`

## Compiler budgets

- 7B (8–16GB RAM): 4 steps × ~200 tokens, validate after each.
- 14–32B: 2 phases, validate after each.
- Frontier cloud: 1 pass, validate at end.

## Resize stepping

\`\`\`ts
const STEP = 8;
function enlarge(current: number, target: number) {
  const sizes: number[] = [];
  for (let s = current + STEP; s <= target; s += STEP) sizes.push(s);
  return sizes; // each size is rendered, then checked against rules
}
const MIN_HIT = 44;
\`\`\`

## Validation

\`\`\`ts
const broken = rules.filter((r) => r.violationPattern && new RegExp(r.violationPattern).test(code));
\`\`\`
## Redline: one rule, resolved

::demo:ai-before-after-8px::

## Rule fields

| Field | Required | Used by |
|---|---|---|
| id | yes | Compiler, tests, rules.json |
| statement | yes | Prompt for the model |
| why | yes | Human docs |
| violationPattern | no | Rule checker, validation step |
`,
    accessibility: `## Rules protect people

Most mechanical rules exist to keep accessibility intact when a model edits code:

- **Target size.** 44×44px minimum (WCAG 2.5.5) survives every resize step.
- **Text size.** Nothing below 13px; patterns catch \`text-[12px]\` and smaller.
- **Contrast.** Room tokens guarantee 7:1 body text; models may not substitute raw hex colors.
- **Semantics.** No \`div\` with \`onClick\`; buttons stay buttons (WCAG 4.1.2).
- **Labels.** Icon buttons keep \`aria-label\` after refactors.

## Human review

Regex checks catch mechanical errors, not meaning. Alt text, error copy and reading order still need a person.
## Live: rules that protect people

::demo:ai-ax-protect::
`,
  },
  rules: [
    {
      id: 'ai.grid-steps',
      statement: 'When resizing cards, logos or images, change dimensions only in 8px steps.',
      why: 'Arbitrary sizes degrade the grid one edit at a time.',
      violationPattern: '(h|w|size)-\\[(?!(?:8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|160|192|256|400|408)px\\])\\d+px\\]',
    },
    {
      id: 'ai.keep-hit-area',
      statement: 'Interactive elements keep a 44×44px hit area after any resize or refactor.',
      why: 'Shrinking targets to fit a bigger logo locks out thumbs.',
    },
    {
      id: 'ai.min-text',
      statement: 'Generated code must not set text below 13px.',
      why: 'Small text is unreadable for many people.',
      violationPattern: 'text-\\[(8|9|10|11|12)px\\]',
    },
    {
      id: 'ai.no-silent-break',
      statement: 'If a requested change would violate a rule, stop and explain instead of applying it.',
      why: 'Humans approve exceptions; models do not.',
    },
    {
      id: 'ai.scoped-rules',
      statement: 'Load only rule groups relevant to the current step from /design-system/rules.json.',
      why: 'Small models lose track of long prompts.',
    },
    {
      id: 'ai.odd-px-values',
      statement: 'Do not use arbitrary pixel values ending in an odd digit.',
      why: 'Odd values leave the 4px/8px grid.',
      violationPattern: '\\[\\d*[1357]px\\]',
    },
  ],
};
