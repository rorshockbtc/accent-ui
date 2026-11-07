import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'essays/mixing-typefaces',
  section: 'essays',
  kind: 'essay',
  title: 'Mixing Typefaces Without Making a Mess: A Field Guide for Non-Designers',
  summary:
    'How to pair one serif with one sans, six open pairings with fallback stacks, when to use just one, and why Georgia numerals can wreck a price list.',
  readingMinutes: 10,
  pipes: ['website-design', 'chb'],
  rules: [
    {
      id: 'type.max-two-families',
      statement: 'Use at most one serif family and one sans family, plus an optional monospace for code.',
      why: 'More families add noise without adding meaning.',
    },
    {
      id: 'type.fallback-stack',
      statement: 'Every font-family declaration must end with a full fallback stack and a generic family (serif, sans-serif or monospace).',
      why: 'Web fonts fail to load more often than you think; the fallback is what many readers actually see.',
      violationPattern: "font-family:\\s*['\"]?[A-Za-z0-9 ]+['\"]?\\s*;",
    },
    {
      id: 'type.tabular-figures',
      statement: 'Set prices, tables, totals and any column of numbers with font-variant-numeric: lining-nums tabular-nums.',
      why: 'Lining, equal-width digits line up vertically and are easy to compare.',
    },
    {
      id: 'type.no-georgia-numbers',
      statement: 'Do not use Georgia (or any old-style-figure font) for prices or financial data unless lining figures are forced on.',
      why: "Georgia's 3, 4, 5, 7 and 9 drop below the baseline and make numbers hard to scan.",
    },
    {
      id: 'type.role-split',
      statement: 'Assign the serif and the sans distinct roles (for example display vs interface) and do not swap them between components.',
      why: 'Pairings work through contrast of role; mixing roles randomly reads as a mistake.',
    },
  ],
  tabs: {
    overview: `# Mixing Typefaces Without Making a Mess

Most people building a website make one of two choices about fonts. They pick one font they like and use it for everything. Or they never choose at all, and the site ends up in whatever the template shipped with, which these days is nearly always Inter.

Neither choice is wrong. Both leave something on the table. A well-chosen pair of typefaces can make a small business site feel considered, make long articles easier to read, and make prices easy to compare. A badly chosen pair looks like a ransom note.

This is a field guide for the person in the middle: a founder, a writer, a shop owner, who wants a site that looks intentional and does not want to study typography for a year.

## Why people stick with one font or the default

### Choice is paralysing

Google Fonts lists well over a thousand families. Faced with that, most people do the sensible thing and close the tab. The default is safe, and safe is fine.

### Bad pairings are memorable

Everybody has seen a flyer with four fonts on it. The fear of making that flyer is real, and it pushes people toward one font forever.

### Nobody explains the rules

Designers pair fonts by instinct built over years. When asked how, they say "it just works". That is not useful to you. So here are the rules, written down.

## How a pairing actually works

### Rule one: contrast of role

The two fonts should do different jobs. The classic split is a serif for display (headlines, pull quotes, big numbers that carry emotion) and a sans for interface (buttons, labels, navigation, form fields). Or the reverse: a serif for long body text and a sans for headings. Either is fine. What matters is that each font has a role and keeps it.

A serif, briefly, is a typeface with small strokes at the ends of letters, like Garamond. A sans (from "sans serif", without serifs) has plain ends, like Inter or Roboto.

Pipes itself uses Fraunces for display, Inter for interface, and JetBrains Mono for code. Fraunces never labels a button. Inter never sets a hero headline. That consistency is most of the trick.

### Rule two: similar x-height

The x-height is how tall the lowercase letters are, measured by the letter x. Two fonts with very different x-heights look mismatched when they sit near each other, because at the same point size one looks noticeably smaller. Pick a pair whose lowercase letters are about the same height.

Stack the lowercase x from twelve fonts and the spread is obvious.

::demo:fig-xheight-overlay::

### Rule three: shared proportions

Look at the round letters, o and e and a. Are they wide and generous in one font and narrow in the other? Then they will feel like they come from different worlds. Good pairs share a skeleton: similar widths, similar openness, similar overall feel. They differ in detail, not in bones.

::demo:type-pairing::

### Rule four: one of each, and stop

One serif. One sans. Optionally a monospace for code or data. That is the limit. Accent does not mandate specific fonts; it mandates this structure: one open serif (from Google Fonts or another Open Font License source) and one widely supported sans, each with a proper fallback stack.

Some pairs work and some quietly fail.

::demo:fig-pairing-gallery::

## Six pairings that work

All of these are free and open. Each comes with a fallback stack, which is the list of fonts the browser tries if the first one fails to load. The fallback is not a detail. On slow connections, in email clients, and in corporate networks that block font downloads, the fallback is what people actually see.

### Fraunces and Inter

Fraunces is a soft, slightly quirky display serif with a lot of personality. Inter is a neutral, very legible interface sans. This is what Pipes uses. Good for products that want warmth without losing clarity.

- Display: Fraunces, "Iowan Old Style", "Palatino Linotype", Georgia, serif
- Interface: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif

### EB Garamond and Roboto

A classical book serif with a plain, mechanical sans. This is the pairing on Kyle Cyree's "Albers & Vignelli in CSS" poster. Good for editorial work, galleries and anything with a literary feel.

- Display: "EB Garamond", Garamond, "Times New Roman", serif
- Interface: Roboto, system-ui, "Segoe UI", Arial, sans-serif

### Source Serif 4 and Source Sans 3

A pair designed by the same foundry to go together. This is the training-wheels option: the proportions already match, so it is hard to get wrong. Good for documentation and reports.

- Serif: "Source Serif 4", Charter, Georgia, serif
- Sans: "Source Sans 3", system-ui, "Segoe UI", Arial, sans-serif

### Literata and IBM Plex Sans

Literata was built for long reading on screens. IBM Plex Sans has a slightly technical, engineered feel. Good for blogs from technical teams and anything mixing prose and data.

- Serif: Literata, Charter, Georgia, serif
- Sans: "IBM Plex Sans", system-ui, "Segoe UI", Arial, sans-serif

### Newsreader and Public Sans

Newsreader is a modern news serif with optical sizes. Public Sans came out of the US government's design system and is plain and trustworthy. Good for civic projects, newsletters and nonprofits.

- Serif: Newsreader, Georgia, "Times New Roman", serif
- Sans: "Public Sans", system-ui, "Segoe UI", Arial, sans-serif

### Lora and Work Sans

Lora is a friendly, brushy serif. Work Sans is a slightly wide, open sans. Good for small businesses, cafés, studios: places that want to feel human.

- Serif: Lora, Georgia, serif
- Sans: "Work Sans", system-ui, "Segoe UI", Arial, sans-serif

Fallbacks matter because fonts sometimes fail to load.

::demo:fig-fallback-swap::

## When to use only one

### Serif-only

A single good serif can carry a whole site, especially if it is mostly reading: a writer's portfolio, a long essay, a menu. Use weight and size for hierarchy instead of a second family. Literata, Source Serif 4 and Newsreader all have enough weights to do it.

### Sans-only

Product interfaces, dashboards and tools often work best in one sans. Inter, IBM Plex Sans and Public Sans are all comfortable at small sizes. You lose some warmth. You gain calm.

### The test

If you are unsure, try the single-family version first. Add a second family only if you can name the job it will do that the first cannot.

## The numbers problem

This is the part most guides skip, and it matters most for anyone selling anything.

### Old-style figures

Some typefaces use old-style numerals, sometimes called text figures. They are designed to blend into a sentence like lowercase letters. In these fonts, some digits rise above and some drop below the line. Georgia is the most common example on the web: its 3, 4, 5, 7 and 9 hang below the baseline.

In a sentence ("founded in 1974") that looks lovely. In a price list it is a mess.

### Why it hurts

Picture a menu with \$13, \$45 and \$79. In Georgia, the 3, 4, 5, 7 and 9 bob up and down. Your eye has to work harder to read each price, and much harder to compare them. On a financial dashboard, or an invoice, or a bank statement, that extra effort creates real mistakes.

::demo:numerals::

### Lining and tabular figures

The fix has two parts.

- **Lining figures** sit on the baseline and share the height of capital letters. Every digit lines up.
- **Tabular figures** give every digit the same width, so a column of numbers aligns vertically. 111 and 888 take up the same horizontal space.

In CSS, one line turns both on, if the font supports them: \`font-variant-numeric: lining-nums tabular-nums;\`. Put it on every price, total, table and chart label. Inter, IBM Plex Sans, Source Sans 3 and Public Sans all support it.

## The counter-argument: just use the system font

A reasonable person might say: skip all this. Use the operating system's font (San Francisco on Apple devices, Segoe UI on Windows, Roboto on Android). It loads instantly, it is very legible, and readers are used to it.

That is a strong position. System fonts are fast and familiar, and for an internal tool it is often the right call. Our fallback stacks lean on system fonts for exactly that reason.

The weakness is identity. A system font makes your site look like the operating system. That is perfect for a settings screen and flat for a bakery or a magazine. A single open display serif costs one font file and gives you a voice. Keep the system sans for interface if you like. Let one serif do the talking.

There is also a practical catch. System fonts differ by platform, so your layout shifts slightly between a Mac and a Windows laptop. If you need consistency, a web font gives it to you.

## A checklist

- Pick one serif and one sans, or one of either.
- Give each font a role and do not swap roles.
- Check that x-heights and proportions roughly match.
- Write a full fallback stack ending in serif or sans-serif.
- Keep body text at 16px or more and never go below 13px anywhere.
- Hold reading lines to 60 to 70 characters.
- Turn on lining and tabular figures for every number someone might compare.
- Avoid Georgia for prices.

## Closing

Typography is not decoration you add at the end. It is the voice your words are spoken in. You do not need a dozen fonts to have a voice. You need two, or one, chosen for a reason, with a plan for when they fail to load, and numbers that line up when someone is trying to decide whether to pay you.
`,
  },
};
