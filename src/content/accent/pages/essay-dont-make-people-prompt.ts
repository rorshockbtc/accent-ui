import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'essays/dont-make-people-prompt',
  section: 'essays',
  kind: 'essay',
  title: 'Don’t Make People Prompt: Progressive Local Intelligence & Zero-Shot Affordances',
  summary:
    'The blank chat box is the command-line prompt of 1984 dressed up with rounded corners. Why great Human–AI design starts with deterministic 0ms structure and escalates computation only when earned.',
  readingMinutes: 11,
  insightCategory: 'philosophy',
  relatedSlugs: ['patterns/discovering', 'patterns/instructing', 'patterns/ai-flows'],
  pipes: ['website-design', 'chb'],
  tabs: {
    overview: `## The tyranny of the blinking cursor

Every wave of computing initially forces humans to speak the machine's native tongue before interface designers reverse the contract. In 1979, early microcomputer software dropped a user onto a bare \`A>\` command prompt and dared them to memorize switches, flags, and file extensions. If you knew the incantation, the computer obeyed; if you forgot a hyphen, it scolded you with \`Syntax error\`. Graphical interfaces arrived not to dumb down computers, but to replace memorization with visible structure: menus showed what was possible, direct manipulation let hands test hypotheses in milliseconds, and undo let curiosity stay fearless.

Thirty years of interaction craft taught software builders never to greet a reader or analyst with a blank void. Yet the first generation of generative interfaces forgot that lesson overnight. Hundreds of applications pinned a white textarea inside the viewport, stamped *"Ask AI anything..."* inside the placeholder, and placed a cheerful purple wand beside it. For a software engineer writing a Python script, open prose prompting is liberating. For an architect comparing municipal zoning rules, a chef scaling pastry hydration, a banker inspecting quarterly NIM sensitivity, or a reader entering a Stoic canon for the first time, an empty chat box creates immediate friction. It forces the human to perform three hidden cognitive tasks before receiving a single byte of help: guess what the underlying corpus actually contains, invent an effective instruction syntax, and wait four seconds to discover whether the guess failed.

We call this failure mode **Blank-Box Laziness**. Instead of designing domain affordances that mirror how people think, product teams offload interface architecture onto the user's typing speed.

> **Why:** Every millisecond and keystroke spent coaxing a model into understanding your domain is interface debt that deterministic UI should have paid upfront.

Accént takes the opposite premise. Just as editorial layout treats Warm Sandstone (\`#E8E2D5\`) as quiet paper and large Fraunces serif numerals as orientation posts, Human–AI interfaces should communicate **what the system knows, what actions are safe, and how fast computation will return** before the keyboard is ever touched.

::demo:essay-zero-shot-latency::

## Why latency dictates cognitive style

Humans do not experience waiting uniformly. Research across graphical manipulation and hypertext reading consistently draws hard perceptual boundaries:

- **Under 100 milliseconds (\`0ms–100ms\`)**: Response feels like an extension of your own hand. Clicking a phase filter, toggling a DuckDB SQL slice, or running a regex contrast audit produces immediate feedback without breaking your train of thought.
- **Between 300ms and 1,500ms**: You remain focused on the task, provided progress is continuous and spatial layout stays motionless.
- **Beyond 3,000ms**: Working memory begins context-switching. Readers open another tab, glance at notifications, or forget the nuance of the question they asked.

Most modern LLM wrappers invert this physics completely. A user clicks a preset button like *"Compare Q3 vs Q4 deposits"*, which serializes a prompt, opens a cold TLS connection to a remote data center, runs attention layers across a frontier cluster, and streams back prose three to five seconds later—even when the underlying numbers live locally in a structured dataset two kilobytes away. Burning remote neural inference to answer deterministic questions is slow, expensive, opaque, and fragile offline.

## Progressive Local Intelligence: The Three Tiers

Across Pipes (\`pipes.pink\`), Marigold civic storytelling, and \`accent-ui\`, intelligence follows a strict escalation ladder that never jumps to heavy cloud weights when lighter computation already holds the truth.

### Tier 1: Zero-Latency Deterministic Compute (0ms)

At Tier 1, zero neural network runs at all. Structured UI controls—single-row archetype filters, domain recipe selectors, client-side WCAG contrast calculators, W3C token validators, or in-browser DuckDB-Wasm SQL queries—compute answers deterministically in less than ten milliseconds. Data stories render directly from local arrays without an LLM ever parsing the DOM. There is zero network call, zero cold start, zero hallucination probability, and zero telemetry leakage. Notice that a Tier 1 control looks simple only because the designer did the intellectual labor of naming the real comparisons users care about ahead of time.

### Tier 2: Browser WebGPU Small Language Models (18–45 tok/s)

When a reader genuinely asks an open synthesis question—rephrasing a passage for a sibling discipline, drafting a teaching outline across three primary letters, or summarizing notes stored locally inside \`~/Documents/Pipes_Local/\`—structured filters reach their ceiling. At that threshold, Tier 2 activates an on-device small language model (\`Qwen 1.7B/4B\` or \`SmolLM2\`) cached inside IndexedDB and executed inside a WebGPU Web Worker. Latency stays sub-second to first token, aircraft-mode notebooks keep working identically on trains or rural farms, and private documents never traverse third-party API logs. Because Tier 2 models run constrained context windows, stepwise prompting discipline applies: keep instructions compact, concrete, and schema-checked rather than dumping three thousand tokens of contradictory CSS directives into the system block.

### Tier 3: Sovereign BYOK Streaming with Byte-0 Pruning (~)

Sometimes deep synthesis genuinely warrants massive parameter counts—cross-referencing forty historical editions, drafting structural critiques across multiple Pipe canons, or running heavy code migrations. Tier 3 supports user-supplied credentials (\`BYOK\`) over streaming SSE paired with two non-negotiable guardrails: first, context pruning via \`pipe\\trim\` (\`~\`) removes redundant syntactic padding before bytes hit the wire; second, every claim returns linked directly into an inspectable \`AccentVerificationLedger\` with live cancellation via \`AbortController\`.

Notice what the \`<AccentEngineTierSwitch />\` primitive does in visual terms: it refuses to hide compute posture behind magical icons. Instead of guessing whether a click takes \`0ms\` or costs an external API call, the user sees crisp tabular numerals (\`01\`, \`02\`, \`03\`), exact memory footprints, and offline privacy posture on a single horizontal tab row before running a query.

::demo:essay-recipe-vs-blank::

## Designing Structured Recipes Without Killing Curiosity

Skeptics sometimes worry that replacing blank chat boxes with structured recipe controls locks readers into narrow rails. That only happens when recipes behave like closed vending machines rather than teachable entry points. In Accént's \`<AccentPromptComposer />\`, clicking a recipe does **not** fire an invisible backend RPC behind closed curtains. Instead, clicking *Compare Primary Letters* populates the visible textarea cleanly and highlights the active \`pipe\\stoicism\` scope chip right above the field.

That subtle design choice changes user psychology completely:

1. **Beginners ship immediately**: First-time visitors tap one curated action and see authoritative cited results in two seconds without agonizing over phrasing.
2. **Curiosity learns by example**: Reading the populated recipe teaches the user how crisp questions are structured inside that domain (\`Compare X against Y on dimension Z citing primary section numbers\`).
3. **Experts modify freely**: An experienced researcher taps the closest recipe as scaffolding, adjusts two constraints directly in the editable box, swaps out \`pipe\\stoicism\` for \`pipe\\economics\`, and hits Submit—saving half the typing while keeping total expressive freedom.

Voice input hooks (\`~ Dictate\`) reinforce the exact same principle for mobile phones on \`390×844\` viewports. Typing multi-clause research instructions with one thumb on a commuter train is agonizing. Allowing natural spoken framing inside an already-scoped composer preserves speed while visible chips ensure the system only retrieves inside trusted canons.

## Why Scoped Canons Beat Global Chat

A second fatal mistake in mainstream AI UI is treating context as an invisible soup. In standard chat interfaces, users paste five documents into a session, scroll twenty messages down, ask a follow-up question, and receive an answer blended ambiguously from old web weights, paragraph two of an earlier upload, and half-remembered boilerplate.

In Pipes and Accént, grounding is always explicit UI state. Attached canons render as clean typographic tokens (\`pipe\\stoicism\`, \`pipe\\website-design\`, \`pipe\\marigold\`) directly inside the composer rail, paired with \`44×44px\` remove controls. When a scope chip is removed, it is visibly gone from context before the next request runs. Combined with bold semantic headings and hairline separation rather than decorative cloud bubbles, the composer feels closer to an architect's drafting table than a toy messaging app.

::demo:essay-local-custody-stack::

## Typography, Color, and Motion as Functional Orientation

When software removes unnecessary sparkle micro-icons and rounded card soup, what carries the visual hierarchy? **Scale, luminance contrast, punctuation, and purposeful transition timing.**

Consider how Accént marks agency across the three intelligence tiers without adding a single decorative starburst:

- Large **Fraunces** tabular numerals (\`01\`, \`02\`, \`03\`) signal sequence and compute weight immediately across desktop and narrow phones.
- **Cross-chromatic color pairs** built from Josef Albers' relational surface math (\`Ice Sky #E0F2FE / Abyss #022C3B\`, \`Botanical Sage #ECFDF5 / Forest #14492C\`, \`Sunlit Peach #FFEDD5 / Leather #54230C\`) give each cognitive phase a quiet chromatic atmosphere that meets or exceeds WCAG 2.1 AAA (\`>= 7.0:1\`) ink contrast while keeping sandstone calm.
- **CHB punctuation glyphs** (\`>\` prompt execution, \`~\` trimmed context envelope, \`\\\` namespace separator) serve as visual anchors requiring zero SVG icon translation across human languages.
- **Modern web tab semantics**: The tier switcher indicates active selection through bold typography and a forced-colors-safe CSS pseudo-element \`border-bottom\`, never relying on hue shifts or drop shadows alone.

Human–AI tools mature the day users stop marveling at the parlor trick of text appearing word-by-word and start trusting the interface to answer real questions faster than traditional navigation could alone. That maturity begins when we stop making people prompt into the void—and instead let deterministic speed, explicit local custody, and bold editorial structure carry the cognitive load.`,
  },
  rules: [
    {
      id: 'essay.dont-prompt.zero-shot-first',
      statement:
        'Default exploratory interfaces to Tier 1 deterministic filters and domain recipes before escalating users to open generative prompting or remote API streams.',
      why: 'Respects human attention by delivering instant 0ms structure and eliminating blank-page prompt paralysis.',
    },
    {
      id: 'essay.dont-prompt.visible-grounding',
      statement:
        'Populate prompt composers with editable recipe templates and removable corpus scope chips rather than firing hidden prompts on button click.',
      why: 'Teaches domain syntax incrementally while preserving full manual editability and clear knowledge boundaries.',
    },
  ],
};
