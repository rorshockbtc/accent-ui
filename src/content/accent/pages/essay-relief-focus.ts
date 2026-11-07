import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'essays/relief-and-focus',
  section: 'essays',
  kind: 'essay',
  title: 'Relief and Focus: Albers, Vignelli and the 8-Point Grid',
  summary:
    'What a colour theorist and a Modernist typographer can teach a team shipping cards in Figma: the 8-point grid, relief versus focus, and when to break the rules.',
  readingMinutes: 10,
  pipes: ['website-design', 'cubby'],
  rules: [
    {
      id: 'essay.relief.multiple-of-8',
      statement: 'Use spacing, sizes and paddings that are multiples of 8px; use 4px only when 8 is too coarse.',
      why: 'A shared base unit keeps every component aligned to the same rhythm.',
      violationPattern: '(padding|margin|gap|height|width):\\s*(1[13579]|2[1235679]|3[13579]|71|13)px',
    },
    {
      id: 'essay.relief.round-auto-layout',
      statement: 'Round any measured box size to the nearest multiple of 8, for example 71px becomes 72px.',
      why: 'The grid degrades one lazy auto layout at a time.',
    },
    {
      id: 'color.one-focus',
      statement: 'Give each card or section exactly one element in focus (the accent colour); every other colour plays a supporting, relief role.',
      why: 'Albers showed colour is perceived in relation to its neighbours; two focal colours cancel each other.',
    },
    {
      id: 'card.anatomy',
      statement: 'Compose cards from four parts in order: surface, art, interaction, anchor.',
      why: 'A fixed anatomy makes cards predictable for readers and for models.',
    },
    {
      id: 'grid.justified-break',
      statement: 'Break a grid rule only when a named element (such as the art) matters more than the spacing, and document why.',
      why: 'Rules serve the whole; bending them without a reason is just drift.',
    },
  ],
  tabs: {
    overview: `# Relief and Focus

This essay is built on a poster. It is called "Albers & Vignelli in CSS: Colors Type Grids", and it was made by hand, by a human, by Kyle Cyree at Colon Hyphen Bracket. You can see it at [cassandra.colonhyphenbracket.pink/colorstypegrids](https://cassandra.colonhyphenbracket.pink/colorstypegrids). The ideas, the measurements and the jokes in what follows come from that poster. Credit where it belongs.

The poster asks a simple question. Two of the twentieth century's great designers, Josef Albers and Massimo Vignelli, spent their lives on colour, type and grids. What would they say about a modern product team shipping card components out of Figma auto layout? Probably something rude. Then something useful.

## Why we need a grid at all

### A designer has very few shapes

Strip away the decoration and an interface is made of rectangles. Occasionally circles. That is about it. Everything else is decoration in the honest sense: colour, typography, iconography, and graphics or media.

If the shapes are that simple, the only thing holding them together is how they relate. How far apart they sit. How big they are compared to each other. Whether their edges line up. A grid is just a promise about those relationships.

### Computers think in powers of two

Screens, memory and image formats like numbers such as 2, 4, 8, 16, 32 and 64. Browsers set the default text size, the root em, at 16px. Half of 16 is 8. So 8px is a natural base unit: small enough to be precise, large enough to be visible, and it divides cleanly into everything the browser already does.

The Accent rule is short. Everything is divisible by 8. Occasionally you settle for 4.

::demo:grid-overlay::

### What 8 looks like in practice

- Padding inside a button: 8 vertical, 16 horizontal.
- Gap between cards: 24 or 32.
- Section spacing: 64 or 96.
- Line height for 16px body text: 24.
- A touch target: at least 44, which in practice we build as 48.

None of those numbers were picked because they "looked right" in isolation. They were picked because they all relate to each other.

## How grids die

### One lazy auto layout at a time

Here is the failure the poster names. A designer drops text into a Figma frame with auto layout. The box hugs its content and comes out at 71px tall. Nobody rounds it to 72. Someone else sets padding to 13 because 12 felt tight and 16 felt loose. The next component inherits both.

No single decision was a disaster. Collectively, the root grid degrades one lazy auto layout at a time. Six months later nothing lines up and nobody can say why.

Here is what one pixel of drift does over ten stacked items.

::demo:fig-grid-drift::

### The corporate version

Large teams optimise for developer time. Figma tokens and auto layout made it fast to produce screens and very easy to stop thinking about relationships. The poster calls the result "the slapdashery of dimestore interface designs". It is harsh. Open your company's settings page and decide whether it is wrong.

### The AI version

AI coding agents inherited the problem and made it faster. They write backend code beautifully. On interfaces, they burn several times the tokens and still produce slop, because nobody gave them the grid. They round nothing. They will happily write a 13px gap.

## Albers: relief and focus

### Colour is never seen alone

Josef Albers taught colour at the Bauhaus and Yale. His book, The Interaction of Color, makes one idea impossible to unsee: you never perceive a colour in isolation. The same grey looks warm next to blue and cool next to orange. The same pink looks electric on cream and muddy on brown.

That is Gestalt thinking. The whole is greater than the parts. A colour's meaning comes from its neighbours.

Albers made the point with squares; here is the same trick.

::demo:fig-albers-illusion::

### Every colour has a job

From that, the poster draws a practical rule. In any composition, a colour is either in relief or in focus.

- Relief colours support. They are the wash behind the card, the border, the secondary text. Their job is to recede.
- The focus colour is the one thing you want the eye to land on. In Pipes that is usually the pink accent, #D44983.

If two colours both try to be in focus, they fight, and the reader's eye pings between them. If everything is relief, nothing happens. One focus per card. Everything else holds it up.

On a card, the difference looks like this.

::demo:fig-relief-vs-focus::

### A concrete example

Take a product card on Alabaster (#FAF8F5). The card surface is Card (#F3EFE9). The border is Gallery Stone (#E8E2D5). Body text is Ink (#111827). All relief. The single "Add to cart" button is pink. That is the focus. Now add a green "Sale" badge and a blue "New" badge. Three focal colours. The button no longer wins. Remove the badges or turn them into relief tones, and the button wins again.

## The card, dissected

### Four parts

The poster breaks a card into four named parts, borrowing Albers' habit of naming relationships:

- **Surface**: the rectangle itself, its colour and radius.
- **Art**: the image, illustration or graphic.
- **Interaction**: the button or link that does something.
- **Anchor**: the text that tells you what the card is, usually title and meta.

::demo:card-anatomy::

### Why 400 by 408

The surfaces on the poster are 400px wide and 408px tall. That is about 2% taller than wide. The reason is perceptual. People like art sitting slightly above dead centre; an exact square makes content look like it is sinking. Eight extra pixels lift it. And 408 is still divisible by 8.

### Asymmetric corners

The card radius is 0, 12, 0, 12: two sharp corners, two rounded, diagonally opposite. It gives the card a direction and a little personality without decoration. It is a small decision that makes a whole page feel designed rather than defaulted.

## Vignelli: discipline

### Few typefaces

Massimo Vignelli famously argued you need only a handful of typefaces in a lifetime. The poster pairs just two: EB Garamond, a classical serif, and Roboto, a plain sans. That is the Accent approach too. One serif, one sans, done.

### Specify type like a typographer

The poster writes type specs the old way: "Roboto 10pt, 16 leading" and "UPPERCASE 6pt, 0.75 tracking". Leading is the distance between lines. Tracking is the space between letters. Writing both down forces you to think about rhythm. On screen we translate those into pixels and keep the 13px floor, but the habit of specifying all three numbers (size, leading, tracking) is the point.

### Grids as moral position

For Vignelli, the grid was not decoration. It was honesty. It showed you had thought about where things go and why. That is the attitude we want: the grid is a set of promises you keep to the reader.

## Putting it to work on Monday

### Audit one screen

Open one screen of your product. Inspect five random paddings and gaps. Write down the numbers. If you find a 13, a 71 or a 22, you have found the drift. Round each to the nearest multiple of 8 and see whether anyone notices. Usually nobody does, except that the page suddenly looks calmer.

### Count the focal colours

On the same screen, count how many things are shouting in a saturated colour. If the answer is more than one per card or section, demote the extras to relief tones. Keep the one that leads to the next step.

### Name the parts

Next time you build a card, label its surface, art, interaction and anchor in the component file. It sounds fussy. It stops arguments, because everyone, including the AI agent writing the code, knows which part they are changing.

## The counter-argument: grids are a cage

There is a serious objection to all this.

### Rules kill expression

Strict grids can make everything look like a spreadsheet. Some of the most memorable design breaks the grid on purpose. David Carson's magazine spreads did not live on an 8-point scale.

### The poster agrees, with a condition

The poster says it directly: sometimes you break the grid. In one of its examples, "the size of the circle is more important than the padding." The art needed to be a particular size, and that mattered more than keeping the padding on the 8-point step.

The condition is the important part. You bend the rule only with a reason you can say out loud, and the reason has to serve the whole composition. "The circle reads better at this size" is a reason. "Auto layout made it 71" is not.

### Rules make breaking legible

A grid also makes breaks visible. When everything else sits on 8, the one element that does not becomes the deliberate gesture. Without a grid, nothing is a break, because nothing was a rule.

## Humans first

### The order of priorities

The poster ends with a line worth pinning above every desk: see users as humans first, users second, customers last.

A grid helps tired eyes find the next thing. Relief and focus help someone know where to tap. A card that holds its art a little above centre feels calm. None of that is about conversion rates, although it helps those too. It is about treating the person on the other side of the screen as a person.

## Closing

Albers gave us a way to think about colour as relationships. Vignelli gave us discipline about type and grids. Kyle's poster translated both into CSS: 8-point spacing, round your 71s, one focus per card, four-part anatomy, 400 by 408, corners at 0, 12, 0, 12.

You can follow those rules without being a designer. That is the point. And when you break one, you will know you broke it, and you will have a reason.
`,
  },
};
