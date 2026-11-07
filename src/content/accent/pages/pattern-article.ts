import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/article',
  section: 'patterns',
  title: 'Article Reading View',
  summary: 'A reading view built for long attention: 60–70 character measure, generous leading, and nothing competing with the words.',
  readingMinutes: 5,
  kind: 'doc',
  tabs: {
    overview: `## Built for reading, not skimming

Most of the web is designed to be skimmed. The article view is the exception. When someone opens an essay in a Pipes room, they have decided to spend ten minutes with it. Our job is to get out of the way.

That means a narrow column, a comfortable line height, a serif that holds up at length, and almost nothing else on screen. No sidebars of related links, no sticky share buttons, no popup asking for an email at paragraph three.

::demo:leading-rhythm::

## Anatomy

- **Kicker (optional).** A small uppercase label above the title: the section or pipe namespace.
- **Title.** Display serif, 40–56px, tight leading (1.1). The one \`<h1>\`.
- **Dek.** One or two sentences below the title that tell you why to read on.
- **Byline and meta.** Author, date, reading time, in 13–14px UI sans.
- **Lead image (optional).** Full column width or slightly wider, with a caption.
- **Body.** Serif 18–20px, leading around 1.6–1.75, measure 60–70 characters.
- **Subheads.** H2 and H3 in the display serif or sans, with more space above than below so they attach to the section they introduce.
- **Pull quotes, figures, footnotes.** Sparing. One pull quote per essay is plenty.
- **End mark.** A small glyph or rule that says "you finished." Readers like knowing.

## Measure: 60 to 70 characters

Measure is the width of a line of text. Too wide and the eye loses its place jumping back to the start of the next line. Too narrow and the rhythm turns choppy. Sixty to seventy characters, roughly ten to twelve words, is the range typographers have trusted for centuries. In CSS: \`max-width: 65ch\`.

## Leading and rhythm

Leading (line height) gives each line room to breathe. On the 8px grid, an 18px body works with 32px leading; 20px body with 32 or 36px. Paragraph spacing equals one line of leading, so the vertical rhythm stays even down the page. The demo above shows what happens when leading drifts off the grid: the page starts to look tired.

## States

The reading view has a loading state (title and dek render first, body follows), a reading-progress indicator (optional, a 2px bar at the top, never a percentage counter), and a print style that drops navigation entirely.

## When to use

Essays, guides, documentation pages over 600 words, anything meant to be read start to finish. Use a card grid or list for indexes, and a dashboard layout for tools.

## The Accent rule

Words first. If a component on the page does not help someone read the essay, it does not belong on the essay page.
::demo:article-anatomy::

## Long-form versus news

A feature essay and a news item share a column, but not a posture. The essay is read slowly, so it gets larger type, longer leading and one pull quote. The news item is scanned first and read second, so the headline leads, paragraphs stay short and related links sit near the top.


::demo:article-long-vs-news::

> **Why:** One column, no sidebars. Every study of reading on screen lands on the same result: the eye needs a stable left edge and a predictable line length. Sidebars take both away.
`,
    guidelines: `## Do

- Cap the body at 65ch.
- Use one serif for body text and one sans for UI.
- Keep leading on the 8px grid (32px for 18px body).
- Left-align body text; ragged right is easier to read than justified on screens.
- Caption every figure.

## Don't

- Don't justify text on the web; it creates rivers of white space.
- Don't put sidebars or sticky share bars beside the body.
- Don't interrupt the essay with email popups.
- Don't set body text below 16px, or any text below 13px.
- Don't use more than one pull quote per essay.

## When to use

- Essays, long guides, case studies.

## When not to

- Indexes, dashboards, product pages.
::demo:article-do-measure::

::demo:article-do-image::

## Details that decide the feel

- **Pull quote.** One per essay, set inside the measure, quoted from the text itself, never new content.
- **Footnotes.** Numbered, 14px, with a link back to the mark. They live at the end, not in the margin on phones.
- **Progress.** A 4px bar at the top is fine. A floating percentage is noise.
- **Related.** After the end mark. A reader who reached the end wants the next thing, and one who has not does not want leaving.
`,
    specs: `## Tokens

- Body: serif 18px / 32px leading (mobile 17px / 28px).
- Measure: \`max-w-[65ch]\`.
- Title: display serif 48px / 56px leading desktop, 36px / 40px mobile.
- Dek: serif 22px / 32px, muted.
- Meta: UI sans 13px, \`tabular-nums\` for dates.
- H2: 28px / 36px, 48px above, 16px below.
- H3: 22px / 32px, 32px above, 8px below.
- Paragraph spacing: 32px (one line).
- Figure margin: 40px vertical.

## Usage

\`\`\`tsx
<article className="mx-auto max-w-[65ch] px-4 font-serif text-[18px] leading-8">
  <p className="text-[13px] uppercase tracking-[0.75px]">pipe\\essays</p>
  <h1 className="text-5xl leading-[56px]">Color is never alone</h1>
  <p className="text-[22px] leading-8 text-muted-foreground">What Albers knew about neighbors.</p>
  <MarkdownRenderer content={body} />
</article>
\`\`\`
## Redline


::demo:article-redline::

## Measurements

| Part | Long-form | News |
|---|---|---|
| Title | Serif 40–56px / 1.1 | Serif 32–40px / 1.2 |
| Body | Serif 19–20px / 1.7 | Serif 17px / 1.55 |
| Measure | 60–70ch | 60–70ch |
| Paragraph gap | 24px | 16px |
| Subhead space | 48 above, 16 below | 32 above, 8 below |
| Pull quote | 1 per essay | none |
| Related links | after end mark | after the first paragraph |
`,
    accessibility: `## Requirements

- **Structure.** One \`<h1>\`, logical heading order, \`<article>\` landmark (WCAG 1.3.1).
- **Contrast.** Body text 7:1 against the room surface (WCAG 1.4.6).
- **Resize.** Text scales to 200% without loss or horizontal scroll (WCAG 1.4.4, 1.4.10).
- **Spacing.** Layout survives user line-height 1.5 and paragraph spacing 2× overrides (WCAG 1.4.12).
- **Links.** Underlined in body text, not color alone (WCAG 1.4.1).
- **Images.** Meaningful alt text; captions are not a substitute for alt.

## Reading aids

Honor \`prefers-reduced-motion\` for progress bars and image reveals. Provide a reading time in minutes in the meta line.
## Live: progress and landmarks

::demo:article-ax-reading::
`,
  },
  rules: [
    {
      id: 'article.measure',
      statement: 'Body text columns in article views are capped at 60–70ch (max-w-[65ch]).',
      why: 'Long lines make the eye lose its place.',
    },
    {
      id: 'article.no-justify',
      statement: 'Never justify body text on the web.',
      why: 'Browsers cannot hyphenate well enough, so justified text gets rivers.',
      violationPattern: 'text-justify',
    },
    {
      id: 'article.leading-grid',
      statement: 'Body line height sits on the 8px grid: 28px or 32px for 17–18px text.',
      why: 'Even vertical rhythm keeps long pages calm.',
    },
    {
      id: 'article.no-distractions',
      statement: 'Do not render sidebars, sticky share bars or modals inside the article reading view.',
      why: 'The reader chose to read; respect that.',
    },
    {
      id: 'article.one-pull-quote',
      statement: 'Use at most one pull quote per article, set inside the text measure.',
      why: 'Repeated pull quotes turn a reading view into a magazine ad.',
    },
    {
      id: 'article.related-after-end',
      statement: 'Place related links after the end of the article, never in a side column.',
      why: 'A side column steals the left edge and the reader\u2019s attention.',
    },
  ],
};
