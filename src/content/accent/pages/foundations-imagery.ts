import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/imagery',
  section: 'foundations',
  kind: 'doc',
  title: 'Imagery & Media',
  summary: 'A few aspect ratios, space reserved before images load, honest alt text, and a crest when there is no picture.',
  readingMinutes: 5,
  tabs: {
    overview: `## Pictures carry weight

Images are the heaviest thing on most pages, in two senses. They are the biggest files, so they decide how fast a page feels. And they are the first thing the eye lands on, so they decide what a page feels like. A good photo can do more than three paragraphs of copy. A bad one, or a missing one, or one that jumps the layout around while it loads, can undo everything else.

This page covers four habits: picking from a short list of shapes, reserving space before the image arrives, writing alt text a human would actually want, and knowing what to show when there is no picture at all.

## A short list of shapes

An *aspect ratio* is the relationship between width and height. Accent uses four:

- **16:10** for heroes and wide banners. Slightly taller than the 16:9 of video, which gives subjects more headroom and feels less like a TV.
- **4:5** for portraits and product shots on mobile. It fills a phone screen without cropping heads.
- **1:1** for avatars, thumbnails and grids of equal items.
- **400×408 near-square** for Accent cards. That is 2% taller than wide. Kyle's poster explains why: humans like art sitting slightly above dead centre, the same reason picture framers give the bottom mat a touch more width. You won't notice the 8 pixels. You will notice that the card feels settled.

Fewer ratios means images line up in grids, crops are predictable, and your photographer or stock search has a clear brief.

## Reserve the space

Have you ever gone to tap a link and had the page jump, so you hit an ad instead? That is *layout shift*. Google measures it as Cumulative Layout Shift (CLS), and it is one of the three Core Web Vitals that affect search ranking.

The usual cause is an image without dimensions. The browser lays out the text, the image arrives, and everything below gets shoved down. The fix is boring and total: always give images a \`width\` and \`height\`, or wrap them in a box with \`aspect-ratio\` set. The browser holds the space open, the image fills it, nothing moves.

> **Why:** Reserving image dimensions ahead of network decode keeps Cumulative Layout Shift (CLS) at \`0.00\` so readers never lose their line or mis-tap a shifting button.

::demo:imagery-ratio-ladder::

::demo:imagery-cls-reserve::

::demo:imagery-crest-fallback::

## When there is no image

Small businesses often don't have photos yet. User profiles start empty. A grey box with a broken-image icon says "this is unfinished."

Accent uses a **crest** instead: the room's tonal dark background with the first letter or a punctuation mark set large in the display serif, centred slightly above middle. It is intentional, it matches the room, and it takes no bandwidth. A bakery with no photos still gets a card that looks designed.

## Writing alt text

Alt text is what a screen reader says in place of the image, and what shows if the image fails to load. Writing it well is a small act of respect.

- **Describe what matters in context.** On a bakery's menu, "Sourdough loaf, scored crust, cut to show an open crumb" beats "bread."
- **Skip "image of" and "photo of."** Screen readers already announce it is an image.
- **Keep it to a sentence or two.** If the image needs a paragraph, put the paragraph in the page.
- **Decorative images get empty alt** (\`alt=""\`), so screen readers skip them entirely. A texture behind a heading is decorative. A chart is not.
- **Never stuff keywords.** Alt text is for people, not search engines, and search engines can tell.

## Sample images only in public docs

Everything in these docs uses sample imagery: Unsplash photos, illustrations, crests. Never a real Pipes user's portrait, storefront or product, even with permission granted somewhere in the terms of service. People share photos with a product to run their business, not to become our marketing. Treat that as a hard line.

## Art direction per room

Each of the twelve rooms suggests a photographic mood that matches its palette. Gallery leans toward still, gallery-lit objects on plain grounds. Brew wants warm, close, steamy. Fairway wants big skies and long horizons. Forge wants texture and grit. Pick images that look like they were shot under the same light as the room's colours. A cold blue stock photo in a warm espresso room looks pasted in, no matter how nice it is on its own.

That is Albers again. An image is never seen in isolation. It sits next to your colours and your type, and it either belongs or it doesn't.

## The Accent rule

Four ratios. Dimensions on every image. A crest when there's no photo. Alt text that a person would want read aloud. Sample images in public. Art direction that matches the room.`,
    guidelines: `## Live Do & Don't comparisons

::demo:imagery-do-alt::

::demo:imagery-do-dimensions::

## Do
- Use 16:10, 4:5, 1:1 or 400×408.
- Set width and height or \`aspect-ratio\` on every image and video.
- Lazy-load images below the fold; eager-load and \`fetchpriority="high"\` the hero.
- Show a crest when no image exists.
- Write alt text that describes what matters in this context.
- Choose images whose light and palette match the room.

## Don't
- Don't ship images without dimensions.
- Don't use a grey box or broken-image icon as a placeholder.
- Don't start alt text with "image of."
- Don't use real users' photos in public docs or marketing.
- Don't lazy-load the hero image.

## When to use alt=""
- Pure decoration: textures, dividers, background flourishes.

## When not to
- Anything that carries information: products, people, charts, screenshots.`,
    specs: `## Card art redline and focal-point cropping

::demo:imagery-redline-card-art::

::demo:imagery-focal-crop::

| Aspect ratio | CSS class / style | Primary use | Fallback |
|---|---|---|---|
| \`16:10\` | \`aspect-[16/10]\` | Room mastheads and lead essay figures | Deterministic SVG room crest |
| \`400:408\` | \`aspect-[400/408]\` | Poster study cards (2% taller than wide) | Tonal Albers colour field |
| \`4:5\` | \`aspect-[4/5]\` | Portfolio and book cover tiles | Two-tone geometric study |
| \`1:1\` | \`aspect-square\` | Avatars and compact thumbnails | Two-letter serif monogram |

## Ratios
- Hero: \`aspect-[16/10]\`
- Portrait: \`aspect-[4/5]\`
- Square: \`aspect-square\`
- Accent card art: \`aspect-[400/408]\`

## Formats
- Photos: AVIF with WebP fallback, served via \`srcset\` at 1×, 1.5×, 2×.
- Hero target: under 200KB at 1280px wide.

## Crest anatomy
- Background: room tonal dark.
- Glyph: display serif, 48–96px, room pastel, optically centred 2% above middle.

## Snippet
\`\`\`tsx
export function CardArt({ src, alt, initial }: { src?: string; alt: string; initial: string }) {
  if (!src) {
    return (
      <div className="flex aspect-[400/408] items-center justify-center bg-[var(--room-dark)] pb-[2%]">
        <span aria-hidden="true" className="font-serif text-6xl text-[var(--room-pastel)]">{initial}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} width={400} height={408} loading="lazy" className="aspect-[400/408] object-cover" />;
}
\`\`\``,
    accessibility: `## Scrim contrast over photography

::demo:imagery-ax-contrast::

## Requirements
- WCAG 1.1.1 (Non-text Content): informative images have meaningful alt; decorative images have \`alt=""\`.
- WCAG 1.4.5 (Images of Text): don't bake text into images. Set it in HTML.
- WCAG 2.2.2 (Pause, Stop, Hide): auto-playing video or carousels longer than 5 seconds need a pause control.
- WCAG 1.2.2 (Captions): video with speech needs captions.

## Reduced motion and data
- Respect \`prefers-reduced-motion\`: no autoplaying video backgrounds.
- Consider \`prefers-reduced-data\` where supported: serve smaller images.

## Crests
- The crest glyph is decorative; the card's heading carries the name, so hide the glyph from screen readers.`,
  },
  rules: [
    {
      id: 'image.dimensions',
      statement: 'Every img must have width and height attributes or sit in a container with a fixed aspect-ratio.',
      why: 'Unsized images cause layout shift that makes people tap the wrong thing.',
    },
    {
      id: 'image.ratios',
      statement: 'Use only 16:10, 4:5, 1:1 or 400x408 aspect ratios.',
      why: 'Fewer shapes keep grids aligned and crops predictable.',
    },
    {
      id: 'image.alt-no-prefix',
      statement: 'Alt text must not begin with "image of", "photo of" or "picture of".',
      why: 'Screen readers already announce that it is an image.',
      violationPattern: 'alt=["\'](image|photo|picture) of',
    },
    {
      id: 'image.crest-fallback',
      statement: 'When no image exists, render a room-coloured crest with a large serif initial instead of a grey placeholder.',
      why: 'A crest looks intentional; a grey box looks broken.',
    },
    {
      id: 'image.sample-only',
      statement: 'Public docs and marketing use sample or Unsplash images only, never real user photos.',
      why: 'People share photos to run their business, not to become our advertising.',
    },
  ],
};
