import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'essays/perceived-speed-and-provenance',
  section: 'essays',
  kind: 'essay',
  title: 'Perceived Speed & Cryptographic Provenance: Designing Trustworthy AI Without Sparkle Theater',
  summary:
    'Why pulsing spinners, unclosed streaming markdown, and green confidence badges erode reader trust—and how self-healing parsers, native disclosures, and SHA-256 ledgers fix them.',
  readingMinutes: 11,
  insightCategory: 'signals',
  relatedSlugs: ['patterns/observing', 'patterns/evaluating', 'patterns/refining'],
  pipes: ['website-design', 'pipes'],
  tabs: {
    overview: `## Why theatrical AI chrome ages poorly overnight

Open almost any SaaS application released in 2024 or 2025 and you can date its interface to the week it was scaffolded. Every toolbar sprouts twin four-pointed sparkles; a gray rounded box pulses indefinitely under a label whispering *"Thinking deeply..."*; text streams directly into the DOM with broken triple backticks flashing raw symbols for four hundred milliseconds; and the bottom footer awards itself a soothing pill reading *"98% AI Verified"*.

That visual vocabulary was never engineered for comprehension. It was borrowed wholesale to make fragile probabilism look charismatic during product demos. Once novelty fades and people rely on software for serious journalism, medical comprehension, financial analysis, or software craftsmanship, Sparkle Theater stops charming anyone. Worse, it actively harms usability on three measurable axes:

1. **Optical fatigue & churn**: Infinite pulsing dots and breathing glow shadows violate sensory calm, drain attention during long reading sessions, and fail strict reduced-motion hygiene.
2. **Broken mid-stream syntax**: Unclosed Markdown blocks force screen layouts to snap vertically between raw text and formatted HTML as final closing ticks arrive.
3. **Unverifiable authority**: Self-reported confidence scores without inspectable primary source addresses invite false certainty right where scrutiny is most vital.

> **Why:** Real trustworthiness requires showing your working—clean typography while streams stabilize, honest millisecond execution traces inside native HTML disclosures, and clickable SHA-256 citation ledgers linking directly to primary texts.

Accént rejects aesthetic obfuscation across every AI surface. When machines assist human inquiry, perceived speed must pair cleanly with **typographic poise** and **cryptographic accountability**.

::demo:essay-stream-heal-diagram::

## Calming the stream: Why self-healing Markdown matters

Human eyes track vertical margins effortlessly while reading static typography on Warm Sandstone (\`#E8E2D5\`), because words keep fixed baselines and predictable line lengths. Token-by-token streaming attacks that stability whenever partial tokens alter DOM structure prematurely.

Consider what happens halfway through streaming a TypeScript helper or Markdown table over Server-Sent Events:

- At token \`42\`, the model emits \`\`\`ts followed by three lines of code, while line four is still traveling across the network. A naive Markdown renderer sees no closing triple backticks, parses the partial snippet incorrectly or dumps unstyled monospace into prose, then violently snaps the whole block into a dark Espresso container \`800ms\` later when the closing \`\`\` finally lands.
- Two sentences earlier, an unclosed \`**deterministic\` marker prints literal asterisks in serif copy before abruptly collapsing into bold weight as the closing \`**\` arrives.
- Half-streamed comparison tables print disjointed pipe symbols (\`| Canon | SHA\`) across multiple wrapped lines until the separator line finishes transmitting.

Those micro-jumps make users subtly distrust the reading room. Everything feels unstable, half-baked, and fragile.

In \`accent-ui\`, \`healStreamingMarkdown(raw)\` runs a pure \`O(n)\` client pass on incoming string buffers before passing text to \`<AccentProse />\`. If an odd count of \`\`\` fences is open, it appends a provisional closing fence so the code stage renders calmly in place inside its \`#111827\` frame while lines populate downward smoothly. If an inline code backtick, bold delimiter, or table header divider sits incomplete on the trailing line, it repairs that tail cleanly without mutating earlier committed tokens. Combined with a crisp monospace \`>\` stream marker in Slate Ink and polite ARIA announcements (\`aria-live="polite"\`) that never hijack keyboard focus, streaming reads like live typesetting rather than browser glitches.

## Transparency without theater: Native \`<details>\` execution traces

How should software explain what an agent actually did during the \`300ms\` to \`1,200ms\` before prose starts arriving? Most tools choose one of two extremes: either hide retrieval entirely behind a spinning orb, or flood the main column with verbose raw JSON logs that push the answer off a \`390×844\` screen.

Native HTML \`<details>\` and \`<summary>\` paired with modern \`::details-content\` disclosure styling solves both failures with remarkable simplicity. By structuring traces into concise, numbered execution steps inside \`<AccentReasoningTrace />\`:

- Readers see a single calm \`44px\` hairline toggle reading \`▸ Reasoning & Retrieval Trace (3 steps · 300ms)\`.
- Expanding it reveals structured phases—\`01 Retrieve\` (\`14ms\`, Matched 4 canonical nodes in \`pipe\\stoicism\`), \`02 Verify\` (\`6ms\`, Recomputed \`pipes:node:v1\` checksum), \`03 Synthesize\` (\`280ms\`, Mapped 2 primary footnotes)—with crisp tabular timing rather than vague adjectives.
- Because the inner markup uses standard DOM inside native \`<details>\`, **browser Find-in-Page (\`⌘F\` / \`Ctrl+F\`) remains 100% functional even while collapsed**. If an auditor hits \`⌘F\` and searches for \`"BM25"\` or \`"9f820b"\`, the browser automatically expands the trace and jumps straight to the step—zero brittle JavaScript \`hidden="until-found"\` workarounds needed.
- Crucially, Accént obeys screen-reader accessibility contracts learned from real assistive technology audits: never place heading tags (\`<h2>\`–\`<h4>\`) inside \`<summary>\` (which JAWS and TalkBack flatten into button labels, destroying heading navigation), and always keep the rotating \`▸\` indicator directly beside the text rather than flinging a lonely chevron to the far right edge of wide screens.

::demo:essay-trace-findability::

## Provenance over Vibes: Inline Popovers and Verification Ledgers

Once an answer finishes streaming, the central ergonomic question shifts from *how fast did it load?* to *why should I believe any claim in these four paragraphs?*

Most consumer chatbots solve provenance poorly. Some strip citations completely; others inject tiny superscript numbers that trigger full page reloads, obscure footnotes inside unstyled URL strings, or paste synthetic confidence scores like *"Accuracy: High"*. Confidence percentages generated by the same probabilistic model that wrote the paragraph carry zero epistemic value—they are aesthetic theater masking circular reasoning.

Accént separates reading fluency from source auditing using a dual surface: **Inline Supplemental Hovercards** (\`<AccentCitationLink />\`) backed by an **Inspectable Verification Ledger** (\`<AccentVerificationLedger />\`).

### Rule 1: Supplemental hints only, proper tooltip roles always

When a sentence references *De Brevitate Vitae §1*, pressing \`Enter\` or tapping \`[01] On the Shortness of Life\` navigates cleanly to the cited treatise or verification row. Hovering with a mouse or focusing via keyboard reveals a concise supplemental \`[popover]\` card showing the source \`pipe\\stoicism\`, its \`sha256\` prefix, and verification timestamp—using native CSS Anchor Positioning gated safely inside \`@supports (position-area: block-end)\` with clean fallback spacing. Notice the crucial accessibility distinction: because activating that anchor navigates rather than expanding an accordion, it carries \`aria-describedby\` linking to \`role="tooltip"\` and **never** uses \`aria-expanded\`, preventing screen readers from misleading users into expecting toggle behavior. Every datum glimpsed in the hovercard is equally available by following the link, obeying progressive disclosure strictly.

### Rule 2: Tabular cryptographic accountability

Directly underneath synthesized prose sits \`<AccentVerificationLedger />\`: a native, sticky-headed HTML \`<table>\` wrapped in a focusable scroll region (\`role="region" tabIndex={0}\`) so wide columns never push \`390×844\` phones horizontally off screen. Horizontal \`1px\` hairlines divide every claim row cleanly without vertical cell cages, pairing clickable treatise titles with right-aligned \`tabular-nums\` alignment checks and canonical \`pipes:node:v1\` SHA-256 digests. In one glance, a skeptic verifies which specific human-curated primary node anchored every paragraph—turning ephemeral AI inference into durable intellectual trail-blazing.

::demo:essay-citation-ledger-vs-badge::

## Closing the loop: Human-in-the-Loop Diffs and Sealing Knowledge

Even with flawless provenance, synthesis is rarely final on the first pass. When an assistant refines an existing note, tightens legal or financial prose, or proposes a structural change to design documentation, overwriting the author's words silently violates sovereignty. Readers turn from collaborators into nervous proofreaders trying to spot what shifted behind their backs.

Using MIT-licensed \`jsdiff\` (\`diffWords\` and \`diffLines\`), \`<AccentDiffViewer />\` renders every proposed revision client-side in under one millisecond, equipping reviewers to toggle word-level precision or full structural line comparison with unmistakable explicit **Accept** and **Reject** controls. Crucially, to satisfy WCAG 1.4.1 color independence, removed tokens combine strikethrough typography, crimson borders, and explicit \`[-]\` text prefixes, while inserted additions pair thick double-underlines with \`[+]\` markers. Even on monochrome e-ink displays or strict Windows High Contrast configurations, not one character of editorial intent disappears.

Finally, when dialogue surfaces genuine new insights—cross-checking Marcus Aurelius against Seneca, or isolating structural gaps inside a civic dataset—Accént refuses to strand conclusions inside an unsearchable infinite scrollback. Underneath a calm vertical \`1px\` hairline list of Socratic next questions (rejecting chaotic pastel badge clouds), one prominent action stands anchored at the edge of the flow: **\`\\ Seal Verified Synthesis to Pipe\`**. Ephemeral tokens graduate cleanly into permanent, content-addressed, curator-owned memory.

## Engine Tier Honesty: Matching Hardware Latency to Cognitive Task

Perceived speed is broken whenever interfaces pretend every operation takes the same amount of work. Modern client-side software routinely blends three fundamentally different execution strata: deterministic local heuristics running directly inside a browser tab or local SQLite index in \`0ms\`, WebGPU or edge small-language-model passes executing on the user's own silicon in \`~120ms\`, and remote frontier reasoning streams streaming over TLS from sovereign bring-your-own-key endpoints in \`800ms+\`. Hiding those hardware boundaries behind one generic spinning orb trains users either to distrust fast actions or to accept multi-second stalls on trivial edits.

Accént resolves that ambiguity directly through \`<AccentEngineTierSwitch />\`—an explicit three-column segmented hairline rail displaying tabular latency budgets (\`Local · 0ms\`, \`WebGPU · 120ms\`, \`Cloud BYOK · 800ms+\`) right beside the composer. On \`390×844\` mobile screens, each tier preserves a full \`44px\` tap target and clear active typography without collapsing into mystery icons. If the active browser environment lacks WebGPU adapters or fails a health probe against \`ollama\`, the control visibly dims or falls back to local deterministic search rather than failing silently five seconds after submission. Honest speed means the user always knows whether a question leaves their laptop before a single byte moves across the wire.

Design systems succeed when they stop chasing temporary aesthetic trends and start encoding durable truths about human cognition. Removing sparkle icons did not strip warmth or surprise from Accént—instead, it gave bold typography, intentional color, honest provenance ledgers, and responsive calm the room they needed to earn real long-term trust.`,
  },
  rules: [
    {
      id: 'essay.provenance.no-sparkle-theater',
      statement:
        'Communicate AI status and trustworthiness through self-healing typography, structured retrieval traces, and cryptographic source ledgers rather than decorative sparkle animations or ungrounded confidence badges.',
      why: 'Sovereign users evaluate interfaces by inspectable evidence and calm predictability, never marketing chrome.',
    },
    {
      id: 'essay.provenance.graduate-to-canon',
      statement:
        'Connect verified AI syntheses directly to permanent source-addressed records and diff-gated drafts so validated research never stagnates in transient chat scrollback.',
      why: 'Bridges exploratory dialogue directly into durable, citable human knowledge.',
    },
  ],
};
