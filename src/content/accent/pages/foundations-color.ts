import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/color',
  section: 'foundations',
  kind: 'doc',
  title: 'Color & Contrast',
  summary: 'Contrast in plain words, why AAA matters, and how Albers decides what is in focus and what is in relief.',
  readingMinutes: 6,
  tabs: {
    overview: `## What contrast actually is

Contrast is how different two colours are in **brightness**. Not hue. Brightness. Red text on a green background can be wildly different in hue and still be nearly unreadable, because both colours reflect about the same amount of light.

The number you see quoted, like 4.5:1 or 7:1, is a ratio of *luminance*, which is a measure of how much light a colour gives off as your eye perceives it. Pure white against pure black is 21:1, the maximum. A colour against itself is 1:1. Everything else falls between. Higher is easier to read.

## Why it matters to real people

It is tempting to think contrast is a rule for a small group of users. It is not. It is a rule for everyone, on a bad day.

- **Aging eyes.** By sixty, the average eye lets in about a third of the light it did at twenty. Grey-on-grey that looks elegant to a 28-year-old designer is a blank wall to their parents.
- **Sunlight.** Take your phone outside at noon. Screen brightness gets crushed by glare, and low-contrast text is the first thing to disappear.
- **Cheap screens.** Your audience is not all on calibrated studio displays. Budget laptops and old Android phones wash out pale colours.
- **Tired people.** Reading at 11pm after a long shift is a disability of its own.

Good contrast costs nothing and helps all of them.

## AA and AAA

The Web Content Accessibility Guidelines (WCAG) set two levels for text:

- **AA:** 4.5:1 for body text, 3:1 for large text (24px, or 19px bold). This is the legal baseline in most places.
- **AAA:** 7:1 for body text, 4.5:1 for large text.

Accent targets **AAA (7:1) for body text on every room surface.** That is stricter than most design systems. We do it because the cost is small, a few shades darker on the ink, and the benefit falls on exactly the people listed above. We checked all 49 pastel-on-tonal-dark combinations across the rooms and every one clears 7:1.

::demo:contrast-explorer::

## Relief and focus

Josef Albers spent years showing that colour is never seen on its own. In *The Interaction of Color*, the same grey looks warm next to blue and cool next to orange. A colour's meaning depends on its neighbours.

Accent borrows two of his ideas. A colour is either **in relief**, meaning it supports and recedes (backgrounds, borders, surfaces), or **in focus**, meaning it asks for attention (a button, a link, a selected state). Most of a page should be relief. If everything is in focus, nothing is.

This is the Gestalt principle in practice: the whole is greater than the parts. You are not picking nice colours. You are arranging relationships.

## The light foundations: why Warm Sandstone instead of white

Every Accent room starts from a warm **Sandstone** floor rather than clinical pure white:

- **Warm Sandstone \`#E8E2D5\` (\`--a-bg\`):** The primary Layer 0 page canvas. Inspired by archival museum paper and papyrus, it steps relative luminance down to roughly 77% of pure white.
- **Archival Card \`#F3EFE9\` (\`--a-surface\`):** Raised Layer 1 surfaces, stages, and dossier cards.
- **Sandstone Light \`#FAF8F5\`:** Reserved for inner raised wells and form inputs, never the full-bleed page background.
- **Slate Ink \`#111827\` (\`--a-ink\`):** Primary body text. Almost black, slightly slate-toned, clearing \`12.6:1\` (WCAG AAA) on Sandstone and \`14.1:1\` (WCAG AAA) on Card without the harshness of \`#000000\`.

## Eye fatigue, blue light, and visual ergonomics

Most design systems default to \`#FFFFFF\` backgrounds because it is the browser default, not because it is good for human eyes. Reading long essays or curating pipes on a pure white screen causes four distinct physiological problems:

1. **Short-wavelength blue-light spike (\`~450nm\`):** To render \`#FFFFFF\`, an LCD or OLED display must fire its red, green, and blue sub-pixels at \`255 / 255\` (100% power). Short-wavelength blue light scatters more inside the human cornea and lens (*chromatic aberration*), forcing the eye to work harder to focus and suppressing evening melatonin. Stepping the canvas to **Warm Sandstone (\`#E8E2D5\`, \`R:232 G:226 B:213\`)** cuts blue sub-pixel emission by 16.5% before the user even turns on Night Shift.
2. **Sustained pupillary constriction:** Staring at a 100%-luminance white monitor is optically equivalent to staring into a desk lamp. The iris constricts tightly for hours while the ciliary muscles hold close accommodation on 16px type. Lowering canvas luminance to \`~77%\` lets the pupil rest closer to its natural paper-reading aperture.
3. **Room-to-screen luminance shock:** In a normal indoor room, walls and desks reflect warm light at a fraction of a monitor's peak nit output. A stark white screen creates a harsh brightness jump every time you glance from your notes to your display.
4. **Pattern glare and astigmatism vibration:** Maximum \`21:1\` contrast (\`#000000\` on \`#FFFFFF\`) turns paragraphs of text into high-frequency black-and-white stripes that shimmer for readers with astigmatism, migraine sensitivity, or Irlen visual stress. Slate Ink (\`#111827\`) on Warm Sandstone (\`#E8E2D5\`) delivers \`12.6:1\`—well above the \`7.0:1\` WCAG AAA threshold—while eliminating stripe vibration.

::demo:color-eye-fatigue::

Then each room adds a **tonal dark set**: deep backgrounds tinted toward the room's character, with pastel accents on top. Pastels on dark are where Accent gets its colour. A soft mint on deep forest green, a pale apricot on espresso. The pastel is in focus, the dark is in relief, and the contrast is checked.

::demo:room-gallery::

## The accent colour, used sparingly

Pipes pink, #D44983, is the accent. It is for the one thing on the screen you most want someone to do or notice. Primary buttons, the active nav item, a focus ring. If you find pink on more than about 10% of a screen, something has gone wrong. An accent used everywhere is just a colour.

## Never colour alone

About one in twelve men has some form of colour blindness. If your error state is "the border turns red," a lot of people will never see it. Every state that colour communicates, error, success, selected, required, needs a second signal: an icon, a word, a weight change, an underline. Colour can confirm. It should never be the only messenger.

## The Accent rule

Body text hits 7:1 on its surface. Most of the page is in relief; one thing is in focus. Pink is rare. State is never colour alone.

> **Why:** Following Josef Albers, a colour is either in relief (supporting the room quietly) or in focus (calling attention to a single action).

::demo:color-relief-focus::

::demo:color-ramps::`,
    guidelines: `## Live Do & Don't comparisons

::demo:color-do-never-alone::

::demo:color-do-contrast::

## Do
- Check every text and surface pair. Body text: 7:1. Large text and UI icons: 4.5:1 minimum.
- Use Ink #111827 for body text on light surfaces.
- Keep the accent pink to primary actions, active states and focus rings.
- Pair every colour-coded state with text or an icon.
- Put pastels on tonal darks, not on Alabaster, where they fail contrast.

## Don't
- Don't use grey placeholder text as a label.
- Don't put pastel text on white or Alabaster.
- Don't signal errors with a red border alone.
- Don't use pure #000 on pure #FFF for long reading; it vibrates.
- Don't let the accent colour cover more than roughly 10% of a screen.

## When to use a tonal dark surface
- Hero sections, feature bands, room-themed headers.

## When not to
- Long forms and dense tables. Keep those on the light foundations.`,
    specs: `## Semantic token redline and AA vs AAA tiers

::demo:color-redline-tokens::

::demo:color-aa-aaa::

| Token | Light hex | Dark hex | Role | Contrast vs Canvas |
|---|---|---|---|---|
| \`--a-bg\` | \`#E8E2D5\` | \`#111827\` | Page canvas (Warm Sandstone / Slate Ink) | — |
| \`--a-surface\` | \`#F3EFE9\` | \`#1A2233\` | Card / stage fill (Archival Card) | — |
| \`--a-ink\` | \`#111827\` | \`#F3EFE9\` | Primary body ink | \`12.6:1\` / \`14.1:1\` (AAA) |
| \`--a-muted\` | \`#4B5563\` | \`#C9C2B6\` | Secondary metadata | \`5.8:1\` / \`7.1:1\` (AA+/AAA) |
| \`--a-accent-text\` | \`#A3285C\` | \`#F4B4CF\` | Text-safe pink accent | \`5.4:1\` / \`10.2:1\` (AA+/AAA) |

## Light foundations
- \`--sandstone: #E8E2D5\` (primary page canvas; cuts blue-light spike by 16.5%)
- \`--card: #F3EFE9\` (raised card & figure surface)
- \`--alabaster: #FAF8F5\` (inner raised wells and inputs only)
- \`--ink: #111827\` (primary text)
- \`--accent: #D44983\` (focus, primary)

## Contrast targets
- Body text on any surface: ≥ 7:1
- Large text (≥24px, or ≥19px bold): ≥ 4.5:1
- Non-text UI (borders of inputs, icons that carry meaning): ≥ 3:1

## Luminance
Relative luminance L = 0.2126 R + 0.7152 G + 0.0722 B on linearised sRGB. Ratio = (L1 + 0.05) / (L2 + 0.05).

## Snippet
\`\`\`tsx
export function StatusLabel({ ok }: { ok: boolean }) {
  return (
    <span className={ok ? 'text-emerald-900' : 'text-red-900'}>
      <span aria-hidden="true">{ok ? '✓ ' : '! '}</span>
      {ok ? 'Paid' : 'Payment failed'}
    </span>
  );
}
\`\`\``,
    accessibility: `## Colour-blind simulation and focus ring contrast

::demo:color-blind-sim::

::demo:color-ax-ring::

## Requirements
- WCAG 1.4.3 (Contrast Minimum, AA): 4.5:1 body, 3:1 large text.
- WCAG 1.4.6 (Contrast Enhanced, AAA): 7:1 body, 4.5:1 large. Accent targets this.
- WCAG 1.4.11 (Non-text Contrast): input borders, focus rings and meaningful icons ≥ 3:1 against adjacent colours.
- WCAG 1.4.1 (Use of Color): colour is never the only way to convey information.

## Testing
- Check contrast in both light foundations and every room's tonal set.
- Simulate protanopia and deuteranopia in Chrome DevTools (Rendering panel).
- Test with \`forced-colors: active\` (Windows High Contrast). Use \`currentColor\` for icons and borders so they survive.

## Motion and colour
- Don't flash colours more than three times per second (WCAG 2.3.1).`,
  },
  rules: [
    {
      id: 'color.aaa-body',
      statement: 'Body text must have at least 7:1 contrast against its background.',
      why: 'Aging eyes, sunlight and cheap screens all crush low-contrast text.',
    },
    {
      id: 'color.no-light-grey-text',
      statement: 'Do not use light grey text such as text-gray-300 or text-gray-400 on light backgrounds.',
      why: 'Pale grey on off-white fails contrast for most readers.',
      violationPattern: 'text-(gray|slate|zinc|neutral|stone)-(200|300|400)\\b',
    },
    {
      id: 'color.accent-sparingly',
      statement: 'Use the accent colour #D44983 only for primary actions, active states and focus rings.',
      why: 'An accent used everywhere stops being an accent.',
    },
    {
      id: 'color.not-only',
      statement: 'Never convey state with colour alone; pair it with text or an icon.',
      why: 'About one in twelve men has colour vision deficiency.',
    },
    {
      id: 'color.pastel-on-dark',
      statement: 'Place pastel colours on tonal dark surfaces, never as text on light surfaces.',
      why: 'Pastels fail contrast on light grounds but sing on dark ones.',
    },
    {
      id: 'color.sandstone-canvas-no-pure-white',
      statement: 'Use Warm Sandstone (#E8E2D5) for the primary light-mode page canvas and Archival Card (#F3EFE9) for cards; never use pure #FFFFFF as a full-bleed reading background.',
      why: 'Pure white fires blue sub-pixels at 100% and causes pupil constriction, glare, and eye fatigue during long reading.',
    },
  ],
};
