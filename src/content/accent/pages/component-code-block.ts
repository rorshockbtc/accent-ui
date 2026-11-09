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

Every code block uses **JetBrains Mono** (\`var(--font-mono)\`) at \`13px\`–\`14px\` with \`1.6\` line-height, wrapped in a horizontal scroll container so long lines never break mobile layouts.`,

    guidelines: `## Copy-to-Clipboard Choreography

- Every multi-line code specimen or \`STYLES.md\` export block should include a top-right \`Copy\` button (\`min-h-[36px] px-3\`).
- Clicking \`Copy\` swaps the icon to a green check (\`var(--a-emerald)\`) and label \`Copied\` for \`1500ms\`–\`2200ms\` before returning to the resting state.`,

    specs: `## Code Block Tokens

- **Font Stack**: \`var(--font-mono), 'JetBrains Mono', monospace\`
- **Font Size**: \`0.8125rem\` (\`13px\`) minimum
- **Container**: \`rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)] p-4 overflow-x-auto\``,

    accessibility: `## Screen Reader & Keyboard Access

- Code containers with horizontal scroll must include \`tabIndex={0}\` so keyboard users can scroll long lines with arrow keys.
- Copy buttons must announce state changes via visible text or \`aria-live="polite"\`.`,
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
