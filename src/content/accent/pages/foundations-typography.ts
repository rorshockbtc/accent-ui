import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/typography',
  section: 'foundations',
  kind: 'doc',
  title: 'Typography, Leading & Rhythm',
  summary: 'Why some sites just read better: leading on the grid, a short type scale, and one serif with one sans.',
  readingMinutes: 6,
  tabs: {
    overview: `## Why some sites look better

You have seen it. Two sites, same content, same colours. One feels expensive and easy. The other feels like a form you have to fill in at the DMV. Usually the difference is not the font. It is **rhythm**: the steady beat of lines, gaps and headings landing at predictable intervals as you scroll.

Rhythm comes from three dials. The size of the type. The *leading*, which is the vertical space each line occupies (CSS calls it line-height). And the gaps between blocks. When all three share a base unit, your eye stops working to find the next line. It just reads.

## Leading on the 8 grid

Accent puts line-heights on the same 8pt grid as everything else, with 4 as the fallback.

- 13px text, 20px leading (4 grid; this is our floor)
- 16px text, 24px leading
- 18px text, 28px leading
- 24px text, 32px leading
- 32px text, 40px leading
- 48px text, 56px leading

Look at 18/28. Twenty-eight is not a multiple of 8, it is a multiple of 4. Should you round up to 32? For body copy, no. 32px leading on 18px text is 1.78, which makes paragraphs float apart like loose pages. 28 keeps the lines connected, and two lines of 28 make 56, which is back on the 8 grid. That is the trick: individual lines can sit on 4 as long as the blocks they build land on 8. Round to 32 only for short display text where airiness is the point.

Notice too that leading gets proportionally tighter as type gets bigger. Body text wants about 1.5. Headlines want 1.1 to 1.2. Big type with body leading looks like a ransom note with gaps.

::demo:leading-rhythm::

## A short type scale

Pick six or seven sizes and stop: 13, 14, 16, 18, 24, 32, 48. Each step is noticeably different from the last. If two sizes look almost the same, one of them is redundant. Vignelli worked with a handful of typefaces and a handful of sizes for his entire career. The constraint is the style.

## The 13px floor

Nothing goes below 13px. Not captions, not legal text, not the timestamp in the corner. The poster lists "UPPERCASE 6pt" for print, but print is held at reading distance under good light. Screens are held at arm's length on a bus. If a label needs to be smaller than 13px to fit, the label is too long or the layout is too cramped.

## Measure

*Measure* is line length. Aim for **60 to 70 characters** per line for body text. Shorter lines chop thought into fragments. Longer lines make your eye lose its place on the return trip. In CSS, \`max-width: 65ch\` does it in one line.

## Uppercase needs air

Capital letters are all the same height and lack the ascenders and descenders that give lowercase words their shape. Packed tight, they blur. Give uppercase labels positive tracking, around 0.06 to 0.08em, and keep them short. The poster's "0.75 tracking" on 6pt caps is the same instinct.

## Serif or sans

A *serif* has small strokes at the ends of letters (Garamond, Fraunces). A *sans* does not (Inter, Roboto). Neither is more readable on modern screens. The real difference is voice. Serifs read as editorial, literary, a bit warm. Sans faces read as neutral, mechanical, modern.

Accent does not mandate fonts. It asks you to choose a process:

- **Pair:** one open serif for display or long reading, one widely supported sans for UI. Pipes uses Fraunces with Inter. The poster uses EB Garamond with Roboto.
- **Serif only:** good for writing-heavy sites. Use the serif's lighter weights for UI.
- **Sans only:** good for tools and dashboards. Get hierarchy from weight and size.

Whichever you pick, never more than two families plus a monospace for code, and always a fallback stack so the page still works if the web font fails.

::demo:type-pairing::

## The Georgia numerals warning

Georgia, and many old-style serifs, draws numbers with *descenders*: 3, 4, 5, 7 and 9 drop below the baseline like lowercase letters. In a sentence that looks lovely. In a price list or a bank statement it is a disaster, because the digits bounce up and down and columns stop lining up.

For anything with money, dates in tables or stats, use **lining, tabular figures**: \`font-variant-numeric: lining-nums tabular-nums\`. Lining means every digit sits on the baseline at cap height. Tabular means every digit is the same width, so \$1,111 and \$8,888 occupy the same space.

::demo:numerals::

## The Accent rule

Leading on the 4/8 grid, blocks landing on 8. A scale of about seven sizes, nothing under 13px. Body measure 60–70ch. One serif, one sans, or one of either, with fallbacks. Tabular lining numerals wherever money lives.

> **Why:** Pairing a high-character open serif for display headings with a neutral humanist sans for UI controls lets each typeface do the job it was built for.

::demo:type-xheight::

::demo:type-measure::`,
    guidelines: `## Live Do & Don't comparisons

::demo:type-do-measure::

::demo:type-do-numerals::

## Do
- Set body text at 16/24 or 18/28.
- Cap paragraphs at \`max-w-[65ch]\`.
- Track uppercase labels at 0.06–0.08em.
- Use \`tabular-nums lining-nums\` on prices, totals, tables and counters.
- Declare a full fallback stack for every family.
- Tighten leading as size increases (1.5 body, 1.1–1.2 display).

## Don't
- Don't go below 13px for any text.
- Don't use more than two type families plus mono.
- Don't use old-style figures (Georgia's default) in financial tables.
- Don't set long paragraphs in all caps or in italics.
- Don't centre body paragraphs longer than three lines.

## When to pair
- Editorial sites, portfolios, brands that want warmth.

## When to go single-family
- Dashboards and tools: sans only.
- Long-form writing with little UI: serif only.`,
    specs: `## Type scale redline and fallback metrics

::demo:type-scale-redline::

::demo:type-fallback-render::

| Role | Size | Line height | Grid multiple | Measure | Weight |
|---|---|---|---|---|---|
| Display H1 | \`48px\` (\`3rem\`) | \`56px\` | \`7 × 8px\` | \`≤ 30ch\` | \`600\` |
| Section H2 | \`28px\` (\`1.75rem\`) | \`40px\` | \`5 × 8px\` | \`≤ 45ch\` | \`600\` |
| Subhead H3 | \`18px\` (\`1.125rem\`) | \`32px\` | \`4 × 8px\` | \`≤ 60ch\` | \`600\` |
| Body prose | \`17px\` | \`32px\` | \`4 × 8px\` | \`60–70ch\` | \`400\` |
| UI control | \`14px\` (\`0.875rem\`) | \`24px\` | \`3 × 8px\` | — | \`500\` |
| Metadata floor | \`13px\` (\`0.8125rem\`) | \`20px\` | \`5 × 4px\` | — | \`500\` |

## Scale (size / leading)
- \`text-xs\`: 13 / 20
- \`text-sm\`: 14 / 20
- \`text-base\`: 16 / 24
- \`text-lg\`: 18 / 28
- \`text-2xl\`: 24 / 32
- \`text-4xl\`: 32 / 40
- \`text-6xl\`: 48 / 56

## Fallback stacks
- Serif: \`"Fraunces", "EB Garamond", "Iowan Old Style", "Palatino Linotype", Georgia, serif\`
- Sans: \`"Inter", "Roboto", system-ui, -apple-system, "Segoe UI", sans-serif\`
- Mono: \`"JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace\`

## Tracking
- Uppercase labels: \`letter-spacing: 0.08em\`
- Display 32px+: \`letter-spacing: -0.01em\` to \`-0.02em\`

## Snippet
\`\`\`tsx
export function Price({ cents }: { cents: number }) {
  return (
    <span className="font-sans text-base tabular-nums [font-variant-numeric:lining-nums_tabular-nums]">
      {(cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
    </span>
  );
}
\`\`\``,
    accessibility: `## User text-spacing override check

::demo:type-ax-spacing::

## Requirements
- WCAG 1.4.4 (Resize Text): text must scale to 200% without loss. Use rem, not px, for font sizes in CSS.
- WCAG 1.4.12 (Text Spacing): don't clip text when users raise line-height to 1.5× or letter-spacing to 0.12em. Avoid fixed heights on text boxes.
- WCAG 1.4.8 (Visual Presentation, AAA): lines no longer than 80 characters; our 60–70ch measure is inside it.
- Minimum 13px rendered size for any text in Accent.

## Screen readers
- Use real heading elements in order (h1, h2, h3). Don't fake headings with bold paragraphs.
- Uppercase via CSS \`text-transform\`, not typed caps, so screen readers don't spell words letter by letter.

## Dyslexia and low vision
- Avoid justified text; uneven word gaps create "rivers."
- Avoid long italic passages.
- Keep body weight at 400 or heavier on light backgrounds.`,
  },
  rules: [
    {
      id: 'type.min-size',
      statement: 'Never set text smaller than 13px.',
      why: 'Screens are read at arm length in bad light; tiny text excludes people.',
      violationPattern: 'text-\\[(8|9|10|11|12)px\\]',
    },
    {
      id: 'type.leading-grid',
      statement: 'Line-heights must be multiples of 4px: 16/24, 18/28, 24/32, 32/40, 48/56.',
      why: 'Leading on the grid creates vertical rhythm that makes pages easier to read.',
      violationPattern: 'leading-\\[(17|18|19|21|22|23|25|26|27|29|30|31)px\\]',
    },
    {
      id: 'type.measure',
      statement: 'Cap body paragraphs at 60 to 70 characters per line, for example max-w-[65ch].',
      why: 'Long lines make the eye lose its place; short lines fragment thought.',
    },
    {
      id: 'type.two-families',
      statement: 'Use at most one serif and one sans family plus one monospace, each with a fallback stack.',
      why: 'Fewer typefaces read as discipline; fallbacks keep the page usable if fonts fail.',
    },
    {
      id: 'type.tabular-money',
      statement: 'Apply tabular-nums and lining-nums to every price, total, table cell and counter.',
      why: 'Old-style numerals bounce off the baseline and break column alignment.',
    },
  ],
};
