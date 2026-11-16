import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/code-block',
  section: 'components',
  title: 'Code Blocks, Terminal Stages & Copy Specs',
  summary:
    'JetBrains Mono code specimens, terminal header bars, 1-click clipboard copy with 1500ms confirmation, and token redlines.',
  readingMinutes: 5,
  tabs: {
    overview: `## Code is first-class prose in Accént

Because Accént is written for engineers, product builders, and AI coding agents alike, code blocks and terminal commands must be as legible as editorial paragraphs.

> **Why:** Setting monospace specimens on dark Archival Espresso (\`#111827\`) at >=13px with explicit language headers makes dense CLI and TypeScript snippets readable across 390px and 1440px screens.

Every code block uses **JetBrains Mono** (\`var(--font-mono)\`) at \`13px\`–\`14px\` with \`1.6\` line-height, wrapped in a horizontal scroll container so long lines never break mobile layouts.

::demo:code-block-demo::`,

    guidelines: `## Copy-to-Clipboard Choreography

- Every multi-line code specimen or \`STYLES.md\` export block should include a top-right \`Copy\` button (\`min-h-[36px] px-3\`) confirming completion for \`1500ms\`.

::demo:code-copy-choreography::

- Pair every block with a header naming the target path and language so engineers and coding agents never paste snippets into the wrong file.

::demo:code-language-header::`,

    specs: `## Code Block Tokens

| Token / Property | Value | Role |
|---|---|---|
| **Font Stack** | \`var(--font-mono), 'JetBrains Mono', monospace\` | Unambiguous distinction between \`0\`/\`O\` and \`1\`/\`l\` |
| **Font Size** | \`0.8125rem\` (\`13px\`) minimum | Complies strictly with Accént's typographic floor |
| **Container** | \`bg-[#111827] text-[#F3EFE9] overflow-x-auto\` | High AAA contrast without mobile horizontal clipping |

::demo:code-token-anatomy::`,

    accessibility: `## Screen Reader & Keyboard Access

- Code containers with horizontal overflow must carry \`tabIndex={0}\` and a descriptive label so keyboard users can scroll long CLI commands using Left/Right arrows without trapping focus.
- Clipboard copy actions announce completion clearly via visible label transitions and \`aria-live="polite"\` regions.

::demo:code-scroll-tabindex::`,
  },
  rules: [
    {
      id: 'code.jetbrains-mono',
      statement:
        'All code blocks, CLI commands, SHA-256 hashes, and pipe\\namespace paths must render in JetBrains Mono (font-mono) at >= 13px.',
      why: 'Distinguishes machine identifiers and syntax from editorial prose.',
    },
    {
      id: 'code.overflow-scroll',
      statement:
        'Always wrap <pre><code> blocks in an overflow-x-auto container so long lines never cause horizontal page overflow on 390px mobile viewports.',
      why: 'Unwrapped preformatted lines break mobile viewport width.',
    },
  ],
};
