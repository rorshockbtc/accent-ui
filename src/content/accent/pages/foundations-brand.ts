import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/brand',
  section: 'foundations',
  title: 'Brand & Punctuation Marks',
  summary: 'How the five punctuation marks (´, !, :-], ;-], \\) work as a visual system: geometry, clear space, minimum sizes, and colour rules.',
  readingMinutes: 6,
  tabs: {
    overview: `## Why our products are punctuation marks

Spoken words change across every border, but the marks that pace human thought—the accent that stresses a vowel, the exclamation that announces news, the colon-hyphen-bracket grin, the path slash—are shared across almost every modern keyboard and script.

In the Colon Hyphen Bracket family, **each product is a single punctuation mark**:

- **\`´\` Accént** — The design system. Changes how a product is spoken without changing its words.
- **\`!\` Bang** — The instant small-business website builder. An announcement, an open sign.
- **\`:-]\` Colon Hyphen Bracket** — The studio and parent company. A human face built out of plain ASCII grammar.
- **\`;-]\` (or \`;\`) Semi (Ask)** — The conversational AI companion. The wink says she is on your side (often misheard by speech-to-text as "Simmy", but she is always Semi).
- **\`>\` Greater** — The high-order conversational evaluation and edge-reasoning chatbot (often misheard as "Grader", always Greater).
- **\`#\` Hash** — The reflective journaling and epistemic drafting app.
- **\`~\` Trim** — The precision editorial trimming and content sculpting tool.
- **\`\\\` pipe** — The knowledge namespace (\`pipe\\website-design\`, \`pipe\\stoicism\`). A directory path connecting curator and reader.

> **Why:** A Unicode acute accent (\`U+00B4\`) is tiny at UI sizes because fonts draw it to hover over a lowercase vowel. For the Accént wordmark, we draw a custom vector blade (\`M9 30 L17 2 L23 2 L13 30 Z\`) tilted at 16 degrees so the mark holds its own beside 20px serif type.

::demo:brand-marks-sheet::

## Geometry and construction

Every mark in the family is built on the same 8-point grid and 16-degree italic slant used across our display typography.

::demo:brand-construction::

## How a new product gets a mark

When we launch a new tool, we do not invent an abstract corporate blob. We pick a punctuation mark whose grammatical job matches the product's human job.

::demo:brand-new-product::

## Why punctuation works across cultures and screens

Conventional tech logos age badly because they rely on fashion: glossy 2008 bevels, 2015 flat geometric gradients, or 2024 glowing AI sparkles. Punctuation marks have survived five centuries of movable type without needing a redesign.

Each mark in our family carries a specific editorial posture:

- **The acute accent (\`´\`)** sits above a letter to tell the reader where to place stress and attention. That is the exact job of a design system: it does not write the story, it gives the story clarity and inflection.
- **The exclamation point (\`!\`)** is the universal sign of a small business opening its doors: *We are here, come in.*
- **The ASCII faces (\`:-]\` and \`;-]\`)** turn cold terminal characters into warm human presence, reminding us that software is built by people for people.
- **The backslash (\`\\\`)** is a quiet structural joiner: \`pipe\\stoicism\`, \`pipe\\bitcoin\`, \`pipe\\website-design\`. It separates the platform from the community's own room without visual clutter.

## Lockup and pairing rules

When pairing a mark with its wordmark (such as **\`´\` Accént** or **\`!\` Bang**), set the wordmark in Fraunces Display SemiBold (600) with \`-0.02em\` tracking, separated from the vector mark by \`8px\` (\`gap-2\`). Never place two punctuation marks side by side in the same lockup, and never animate the marks with spinning or pulsing effects.`,
    guidelines: `## Respect the 1× height clear-space zone

Give every mark a quiet margin equal to at least the height of the mark (` + '`1H`' + `) on all four sides so navigation links and borders never crowd it.

::demo:brand-do-clearspace::

## Never stretch, outline, gradient-fill, or rotate the marks

The marks are typographic primitives. Treat them with the same restraint you give a headline typeface.

::demo:brand-do-wrong-uses::`,
    specs: `## Minimum sizes and colour lockups

::demo:brand-min-sizes::

::demo:brand-colour-versions::

| Mark | Product | Drawn SVG / Glyph | Primary colour (Light) | Primary colour (Dark) | Min height | Clear space |
|---|---|---|---|---|---|---|
| \`´\` | Accént | Vector blade \`24×32\` viewBox | \`#D44983\` mark + \`#111827\` word | \`#EE8AB4\` mark + \`#F3EFE9\` word | \`20px\` | \`1× mark height\` |
| \`!\` | Bang | Geometric exclamation | \`#D44983\` or \`#111827\` | \`#EE8AB4\` or \`#F3EFE9\` | \`20px\` | \`1× mark height\` |
| \`:-]\` | Colon Hyphen Bracket | Monospace triad | \`#111827\` | \`#F3EFE9\` | \`16px\` | \`0.5× width\` |
| \`;-]\` | Semi / Ask | Monospace wink triad | \`#D44983\` badge / \`#FFFFFF\` ink | \`#EE8AB4\` | \`16px\` | \`0.5× width\` |
| \`>\` | Greater | Angle bracket prompt | \`#111827\` | \`#F3EFE9\` | \`18px\` | \`0.5× width\` |
| \`#\` | Hash | Monospace octothorpe | \`#111827\` | \`#F3EFE9\` | \`18px\` | \`0.5× width\` |
| \`~\` | Trim | Continuous wave tilde | \`#D44983\` | \`#EE8AB4\` | \`16px\` | \`0.5× width\` |
| \`\\\` | pipe namespace | Monospace backslash | \`#A3285C\` | \`#F4B4CF\` | \`14px\` | Inline with slug |

\`\`\`tsx
// Official Accént mark lockup
export function AccentMark() {
  return (
    <span className="inline-flex items-baseline gap-2">
      <svg viewBox="0 0 24 32" width="18" height="24" aria-hidden="true" className="self-center">
        <path d="M9 30 L17 2 L23 2 L13 30 Z" fill="var(--a-accent)" />
      </svg>
      <span className="font-serif text-xl font-semibold tracking-tight">Accént</span>
    </span>
  );
}
\`\`\``,
    accessibility: `## How screen readers announce ASCII emoticons and marks

Left to itself, a screen reader will read \`:-]\` aloud as *"colon hyphen right bracket"* or skip \`´\` entirely. Always hide the raw glyph from assistive tech (\`aria-hidden="true"\`) and pair it with the spoken product name.

::demo:brand-ax-names::`,
  },
  rules: [
    {
      id: 'brand.svg-acute-mark',
      statement: 'Render the Accént logo mark using the custom 24x32 SVG blade rather than a raw Unicode U+00B4 character at header sizes.',
      why: 'The Unicode acute glyph is drawn as a tiny combining diacritic and disappears beside 20px type.',
    },
    {
      id: 'brand.aria-hide-ascii-marks',
      statement: 'Always set aria-hidden="true" on decorative ASCII marks (:-], ;-], ´, !) and provide the spoken product name in text or aria-label.',
      why: 'Prevents screen readers from reading out "semicolon hyphen right bracket".',
    },
    {
      id: 'brand.no-gradient-logos',
      statement: 'Never apply multi-stop neon gradients or drop shadows to brand punctuation marks.',
      why: 'Marks must remain flat, high-contrast typographic symbols.',
    },
    {
      id: 'brand.min-size-20px',
      statement: 'Keep standalone brand lockups at >= 20px height inside a >= 44x44px hit target when linked.',
      why: 'Preserves legibility and mobile tap ergonomics.',
    },
  ],
};
