import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/writing',
  section: 'foundations',
  title: 'Writing & Voice',
  summary: 'How Accént interfaces speak: verb+noun button labels, honest error messages, useful empty states, and zero AI filler.',
  readingMinutes: 6,
  tabs: {
    overview: `## Copy is interface structure

As the *Colors Type Grids* poster puts it: *"Without the copy or the content, the design is impossible."* Most interfaces feel confusing not because a box is the wrong shade of grey, but because the button says **Submit**, the error banner says **Invalid input (code 422)**, and the empty screen says **No data found**.

Accént holds interface copy to four rules:

1. **Meet non-technical people where they are.** Never say *hydrate*, *beat*, *namespace node*, or *serialize* in user-facing UI. Say *save to your pipe*, *story*, *topic*, and *download*.
2. **Buttons name the result.** Every action button starts with a concrete verb followed by the object it acts on: *Publish essay*, *Download PDF*, *Delete pipe*.
3. **Errors answer three questions in one breath:** What went wrong, why it happened, and how to fix it right now.
4. **Zero robotic filler.** Words like *delve*, *unleash*, *seamless*, *elevate*, *robust*, and *"In today's fast-paced world"* are banned from both editorial stories and UI microcopy.

> **Why:** Clear words reduce friction faster than any tooltip or onboarding tour. When a label says what it actually does, people feel respected.

::demo:writing-rewrite-lab::

## Formatting numbers, dates, and money

- **Currency & counts:** Always pair numbers with \`tabular-nums\` and spell out units clearly (\`$1,280.00\`, \`70% creator share\`, \`14 min read\`).
- **Dates:** Use unambiguous human dates (*22 Oct 2026* or *October 22, 2026*), never ambiguous slash dates (*10/11/26*) that swap meaning between the US and Europe.

::demo:writing-numbers::

## Voice principles: knowledgeable, direct, human

Whether someone is reading a morning briefing in Pipes, setting up a storefront in ! Bang, or chatting with Semi (\`;-]\`), the voice should sound like a thoughtful colleague sitting across the table—never a corporate press release and never a sycophantic chatbot.

- **Lead with the plain truth.** If a local 7B model needs 12 seconds to compile a layout step, say *"Step 2 of 4 · Checking contrast rules (about 10 seconds)"* instead of *"Our AI magic is crafting your experience!"*
- **Respect the reader's time.** Cut throat-clearing openings (*"It is important to remember that..."*, *"In order to begin..."*). Start with the verb or the finding.
- **Never blame the person.** Replace *"You entered an invalid postcode"* with *"Enter a 5-digit US ZIP code, like 78701."*
- **Keep vocabulary stable.** Once you call a space a **pipe**, do not call it a *channel* on the settings tab, a *stream* in the dialog, and a *feed* in the toast. One concept gets one noun across the entire product.

## The banned-words list

Our automated test suite and agent rules flag common LLM filler words before they ship. If you spot *delve*, *tapestry*, *unleash*, *elevate*, *seamless*, *game-changer*, *testament*, or *realm* in generated copy, rewrite the sentence using concrete nouns and ordinary verbs.`,
    guidelines: `## Write verb + noun button labels

People scan buttons before they read the paragraph above them. The button label alone must tell them what will happen when they click.

::demo:writing-do-buttons::

## Write errors that explain the fix

Never blame the person or dump a raw server exception. State the problem plainly and tell them the exact next step.

::demo:writing-do-errors::

## Give every empty state a starting action

A blank box that says *No items* looks broken. Explain what will live here and provide a single button to create or import the first item.

::demo:writing-do-empty::

## Name the consequence in destructive confirmations

When asking someone to confirm a deletion, repeat the specific noun in both the heading and the red button so muscle memory cannot click the wrong option.

::demo:writing-do-confirm::`,
    specs: `## Microcopy anatomy & length limits

::demo:writing-redline-error::

| Element | Target length | Capitalisation | Punctuation | Example |
|---|---|---|---|---|
| Button label | 1–3 words (≤ 24 chars) | Sentence case | No trailing period | \`Publish story\` |
| Badge / tag | 1–2 words (≤ 18 chars) | Sentence case or monospace | None | \`Verified\` · \`pipe\\chb\` |
| Input label | 1–3 words | Sentence case | No colon | \`Email address\` |
| Helper / error text | 1–2 short sentences (≤ 90 chars) | Sentence case | Period at end | \`Enter a full email, like ada@example.com.\` |
| Empty state heading | 3–7 words | Sentence case | No period | \`Your curator desk is empty\` |

\`\`\`tsx
// Error message contract: visible icon + what happened + how to fix
<p id="email-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-[#9F1239]">
  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
  <span>Enter a complete email address with an @ symbol, like ada@example.com.</span>
</p>
\`\`\``,
    accessibility: `## Screen-reader link context and reading level

- **Never write "Click here" or "Read more" alone:** Screen-reader users often navigate by pulling up a list of all links on the page. Five links that all say *Read more* are useless out of context. Name the destination (*Read the Grid & Spacing guide*).
- **Plain language is cognitive accessibility:** WCAG 3.1 recommends keeping general interface copy at a lower-secondary reading level (~Grade 8): short sentences, active voice, one idea per paragraph.

::demo:writing-ax-screenreader::`,
  },
  rules: [
    {
      id: 'writing.verb-noun-buttons',
      statement: 'Button labels must use a specific verb + noun ("Publish story", "Delete pipe"), never generic "Submit", "OK", or "Yes".',
      why: 'People scan buttons out of context; specific verbs prevent accidental actions.',
      violationPattern: '>\\s*(Submit|OK|Yes|Click here)\\s*<',
    },
    {
      id: 'writing.no-ai-slop',
      statement: 'Never emit banned AI filler words (delve, unleash, seamless, elevate, tapestry, "fast-paced world").',
      why: 'Robotic filler erodes reader trust immediately.',
      violationPattern: '\\b(delve|unleash|seamless|elevate|tapestry|fast-paced digital world)\\b',
    },
    {
      id: 'writing.no-internal-jargon',
      statement: 'Never use internal engineering jargon ("hydrate", "beat", "node payload") in user-facing labels.',
      why: 'Most Pipes readers and curators are non-technical.',
    },
    {
      id: 'writing.meaningful-link-text',
      statement: 'Link text must describe the destination on its own; never output bare "Click here" or "Learn more" links without context.',
      why: 'Screen-reader rotor lists read link text in isolation.',
    },
  ],
};
