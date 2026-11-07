import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/dark-theme',
  section: 'foundations',
  title: 'Dark Theme & Rooms',
  summary: 'Why dark mode is not an inverted light page: tonal dark surfaces, pastel ink, zero pure black, and the 12 architectural rooms.',
  readingMinutes: 7,
  tabs: {
    overview: `## Dark mode is not a colour inversion

The fastest way to ruin a reading interface is to flip \`#FFFFFF\` to \`#000000\` and \`#000000\` to \`#FFFFFF\`. Pure white text on pure OLED black causes **halation**: the bright letterforms bleed into the dark background, making lines shimmer and tiring the eyes within minutes. At the same time, saturated brand colours that passed contrast on white paper turn into vibrating neon on dark slate.

Accént treats dark mode—and every dark room in Pipes—as an independent lighting environment built on Josef Albers's principle of relative colour:

- **Tonal dark grounds, never \`#000000\`:** Our darkest canvases are warm deep inks (\`#111827\`, Oxblood \`#390502\`, Forest \`#102805\`, Abyss \`#011C27\`, Midnight \`#020137\`, Plum \`#220129\`).
- **Warm parchment and pastel inks, never \`#FFFFFF\`:** Body text in dark rooms uses warm stone (\`#F3EFE9\`) or one of the 7 calibrated pastels (*Blush*, *Peach*, *Butter*, *Sage*, *Ice*, *Periwinkle*, *Lilac*), every single one mathematically verified to pass **WCAG AAA (\`≥ 7.0:1\`)** across all 7 tonal darks.
- **Elevation by lightness:** Because dark shadows do not show up on dark backgrounds, higher layers step up in surface lightness (\`#111827\` canvas → \`#1A2233\` card → \`#222C40\` menu).

> **Why:** When a reader switches to a dark room at night, the page should feel like lamplight on heavy paper, not a terminal screen burning their retinas.

::demo:dark-toggle::

## The 12 rooms across light and dark

Every pipe chooses one of 12 architectural rooms. Seven are warm light rooms (*Gallery*, *Chapel*, *Atelier*, *Fairway*, *Brew*, *Atlas*, *Signal*) and five are deep nocturnal rooms (*Image Lab*, *Vault*, *Ledger*, *Forge*, *Orbit*).

::demo:dark-rooms-contrast::

## Why inverting a light page always fails

If you take a light page and mechanically invert its hex values (\`#FAF8F5\` → \`#05070A\`, \`#D44983\` → dark magenta), three things break immediately:

1. **Halation on pure black:** Pure \`#000000\` turns off OLED pixels completely. When bright white text sits next to turned-off pixels in a dim room, the human iris opens wide and the bright letterforms bleed outward into a fuzzy halo. Stepping the canvas up to \`#111827\` (Slate Ink) or a room-specific tonal dark keeps every pixel softly lit and eliminates halation.
2. **Saturated accents lose contrast:** A deep royal blue or crimson that cleared 5.5:1 against warm Alabaster drops below 2.5:1 against dark slate, vibrating visually and failing WCAG AA. In dark rooms, interactive accents shift upward into our **7 calibrated pastels**, each verified at \`≥ 7.0:1\` AAA against dark surfaces.
3. **Shadows vanish:** You cannot cast a dark shadow onto a dark floor. Dark elevation works by **lightness**, not shadow: each higher layer steps slightly lighter (\`#111827\` Canvas → \`#1A2233\` Card → \`#222C40\` Raised Popover) with a 1px light-alpha border.

## How photography and diagrams adapt in dark rooms

Bright white-background charts or sunlit photographs dropped onto a dark canvas act like a glare source. In dark rooms, diagrams use transparent or Layer 1 (\`#1A2233\`) backgrounds with pastel strokes, and photography carries an inset \`1px solid rgba(243,239,233,0.14)\` frame so dark edges in the photo never bleed into the canvas.`,
    guidelines: `## Avoid pure black (#000000) and pure white (#FFFFFF)

Keep dark canvases at \`#111827\` or a tonal dark, and keep primary text at \`#F3EFE9\` so long essays stay comfortable to read.

::demo:dark-do-not-black::

## Desaturate accents into pastels on dark grounds

A deep crimson or royal blue that looks crisp on Alabaster becomes illegible on dark slate. Shift dark-mode accents and highlights to the 7 calibrated pastels.

::demo:dark-do-pastel::

## Tame bright photography in dark rooms

An unadjusted white-background diagram or bright midday photo acts like a flashlight in a dark room. Add a subtle border and slightly soften glare where appropriate.

::demo:dark-do-images::`,
    specs: `## Dark surface ladder and room tokens

::demo:dark-redline-ladder::

::demo:dark-ladder::

| Surface tier | Token / Role | Light hex | Dark hex | Primary ink | Muted ink | Border |
|---|---|---|---|---|---|---|
| Layer 0 | Canvas (\`--a-bg\`) | \`#E8E2D5\` | \`#111827\` | \`#F3EFE9\` | \`#C9C2B6\` | \`rgba(243,239,233,0.14)\` |
| Layer 1 | Card (\`--a-surface\`) | \`#F3EFE9\` | \`#1A2233\` | \`#F3EFE9\` | \`#C9C2B6\` | \`rgba(243,239,233,0.16)\` |
| Layer 2 | Raised / Hover | \`#FFFFFF\` | \`#222C40\` | \`#F3EFE9\` | \`#D6D0C4\` | \`rgba(243,239,233,0.22)\` |
| Accent | Interactive pink | \`#D44983\` | \`#EE8AB4\` | \`#111827\` | — | — |

\`\`\`css
.accent-root[data-accent-theme='dark'] {
  --a-bg: #111827;
  --a-surface: #1A2233;
  --a-ink: #F3EFE9;
  --a-muted: #C9C2B6;
  --a-rule: rgba(243, 239, 233, 0.14);
  --a-accent: #EE8AB4;
  --a-accent-text: #F4B4CF;
  color-scheme: dark;
}
\`\`\``,
    accessibility: `## Contrast floors in dark environments

- **Body text:** \`≥ 7.0:1\` (WCAG AAA) against both Layer 0 canvas and Layer 1 card surfaces.
- **Muted metadata:** \`≥ 4.5:1\` (WCAG AA) at our minimum 13px font size—never use low-opacity grey (\`opacity-40\`) on dark slate.
- **Native controls:** Always set \`color-scheme: dark\` on dark roots so browser scrollbars, date pickers, and native \`<select>\` popups render in dark mode automatically.

::demo:dark-ax-contrast::`,
  },
  rules: [
    {
      id: 'dark.no-pure-black',
      statement: 'Never use #000000 (bg-black) as a reading canvas; use #111827 or one of the 7 tonal darks.',
      why: 'Pure OLED black paired with bright text causes halation and eye fatigue.',
      violationPattern: '\\bbg-black\\b|#000000',
    },
    {
      id: 'dark.elevate-by-lightness',
      statement: 'In dark themes, step elevated cards and menus up to a lighter surface token (#1A2233, #222C40) plus a 1px light-alpha border.',
      why: 'Dark drop shadows are invisible against dark backgrounds.',
    },
    {
      id: 'dark.pastel-on-dark-aaa',
      statement: 'When setting coloured text on a tonal dark background, use one of the 7 calibrated pastels (>= 7.0:1 AAA).',
      why: 'Saturated mid-tone colours fail contrast on dark surfaces.',
    },
    {
      id: 'dark.color-scheme-property',
      statement: 'Set color-scheme: dark on dark theme containers.',
      why: 'Ensures native scrollbars, form controls, and system popovers match the dark surface.',
    },
  ],
};
