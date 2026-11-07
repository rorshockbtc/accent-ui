import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/hero',
  section: 'components',
  title: 'Room Hero',
  summary: 'The opening of a Pipes room: a greeting, a personal note, one image, and a byline.',
  readingMinutes: 4,
  kind: 'doc',
  tabs: {
    overview: `## The first thing anyone sees

A room hero is the top of a Pipes room. It works like the foyer of a house. In two seconds a visitor should know whose room this is, what it is about, and what to do next. That is all. A hero is not a brochure.

Most heroes fail by trying to say everything: three headlines, a carousel, a video, four buttons. Accent heroes say one thing in a big serif and let a single picture carry the mood.

> **Why:** Restraining the masthead to one headline, one image frame, and at most one primary action establishes room identity in two seconds without pushing the curated dispatches below the fold.

::demo:hero-demo::

## Anatomy

The hero maps directly to the \`SovereignHero\` component props.

- **Greeting title** (\`greetingTitle\`). The headline, set in the display serif at 40–64px. Short, human, specific. "Recipes from my grandmother's kitchen" beats "Welcome to my site."
- **Greeting subtitle** (\`greetingSubtitle\`). One line of context in the UI sans. What the room contains.
- **Author badge** (\`authorBadge\`, optional). A small uppercase label: role, location, or pipe namespace like pipe\\recipes.
- **Personal note** (\`personalNote\`). Two or three sentences in the owner's voice. This is the part that makes a room feel inhabited rather than templated.
- **Hero image** (\`heroImage\`, optional). One image, cropped to 4:5 or wide. In public docs we use sample or Unsplash imagery, never a real user's portrait.
- **Author name** (\`authorName\`). The byline. Rooms belong to people.

## Layout

On desktop, text and image sit side by side on a 12-column grid: text across seven columns, image across five. On mobile they stack, text first, so the headline loads above the fold even before the image does. Vertical padding is 64px desktop, 40px mobile.

## Room themes

Each of the 12 rooms (Gallery, Chapel, Atelier, Fairway, Brew, Atlas, Signal, Image Lab, Vault, Ledger, Forge, Orbit) restyles the hero through color tokens only. Structure stays the same. Body text on every room surface clears 7:1 contrast.

## States

The hero has a loading state (text renders, image area shows the card color, not a spinner) and a no-image state (text spans the full measure, 60–70 characters). It has no hover state; only its links do.

## When to use

Use the room hero once, at the top of a room's home. Use a simple page header for inner pages. Never stack two heroes.

## The Accent rule

One headline, one image, one primary action at most. If the hero needs a carousel, the room has not decided what it is about.

## Responsive behaviour and media fallback states

::demo:hero-states::

::demo:hero-layout-responsive::`,
    guidelines: `## Live Do & Don't comparisons

::demo:hero-do-one-action::

::demo:hero-do-scrim::

## Do

- Write the title in the owner's voice, under ten words.
- Keep the personal note to three sentences.
- Load text first; let the image arrive after.
- Use sample imagery in documentation and demos.

## Don't

- Don't use carousels or autoplay video in a hero.
- Don't put more than one primary button in the hero.
- Don't overlay text on a busy photo without a solid scrim.
- Don't center long paragraphs; centered text is for one or two lines.

## When to use

- The top of a room's home page.

## When not to

- Inner pages, dialogs, or anywhere below another hero.`,
    specs: `## Masthead 12-column redline

::demo:hero-redline-layout::

| Slot | Desktop (12 col) | Mobile (4 col) | Aspect / Measure | Notes |
|---|---|---|---|---|
| Copy column | \`6 or 7 cols\` | \`4 cols\` (top) | \`max-w-[60ch]\` | Kicker + Fraunces H1 + summary + 1 CTA |
| Media frame | \`6 or 5 cols\` | \`4 cols\` (bottom) | \`aspect-[16/10]\` | Reserved ahead of load (\`0.00\` CLS) |
| Vertical padding | \`48px–64px\` | \`32px\` | Multiples of 8px | Bottom \`1px\` room border |

## Tokens

- Title: display serif, 40px mobile / 64px desktop, leading 1.1.
- Subtitle: UI sans 18px, leading 28px.
- Author badge: UI sans 12px uppercase, 0.75px tracking.
- Personal note: serif 18px, leading 32px, max 65ch.
- Padding: 64px vertical desktop, 40px mobile.
- Grid: 7 / 5 columns of 12, 24px gutter.
- Image: 4:5 crop, radius 0 12px 0 12px.

## Usage

\`\`\`tsx
import { SovereignHero } from '@/components/design-system/SovereignHero';

<SovereignHero
  greetingTitle="Recipes from my grandmother's kitchen"
  greetingSubtitle="Forty years of Sunday dinners, written down."
  authorBadge="pipe\\recipes"
  personalNote="She never measured anything. I did, badly, for a decade."
  heroImage="/sample/kitchen.jpg"
  authorName="Sample Author"
/>
\`\`\``,
    accessibility: `## Heading hierarchy and reading order

::demo:hero-ax-reading-order::

## Requirements

- **Heading.** The greeting title is the page's single \`<h1>\` (WCAG 1.3.1).
- **Alt text.** Describe the hero image if it carries meaning; otherwise \`alt=""\`.
- **Contrast.** Text over imagery needs a solid scrim reaching 7:1 for body text (WCAG 1.4.6).
- **Motion.** No autoplay. Any entrance animation respects \`prefers-reduced-motion\` (WCAG 2.3.3).
- **Reflow.** Content stacks without horizontal scroll at 320px wide (WCAG 1.4.10).
- **Text size.** Nothing in the hero below 13px; the author badge is decorative repetition of the byline.`,
  },
  rules: [
    {
      id: 'hero.single-h1',
      statement: 'The hero title is the only h1 on the page.',
      why: 'Screen reader users navigate by headings; two h1s blur the page topic.',
    },
    {
      id: 'hero.no-carousel',
      statement: 'Never use a carousel or autoplay video in the room hero.',
      why: 'Rotating content is missed by most people and fails motion guidelines.',
      violationPattern: '(Carousel|autoPlay|autoplay)',
    },
    {
      id: 'hero.one-primary',
      statement: 'The hero contains at most one primary action.',
      why: 'The hero answers one question: what is this room?',
    },
    {
      id: 'hero.sample-imagery',
      statement: 'Documentation and demo heroes use sample or Unsplash imagery, never real user portraits.',
      why: 'People did not consent to being in our docs.',
    },
  ],
};
