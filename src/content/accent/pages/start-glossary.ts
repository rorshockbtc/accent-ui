import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'start/glossary',
  section: 'start',
  title: 'Glossary',
  summary: 'Plain-English definitions for every design, typography, colour, and accessibility term used across Accént.',
  readingMinutes: 8,
  tabs: {
    overview: `## Why a plain-English glossary matters

Most design systems read like insider shorthand. If you are a founder, writer, small-business owner, or engineer who did not go to art school, words like *leading*, *x-height*, *tabular figures*, or *WCAG AAA* can feel like gatekeeping. Every term below is defined in one or two direct sentences and links to the page where you can see it in action.

## A–C

- **8-Point Grid** — A layout rule where every size, gap, and padding value is a multiple of 8 pixels (8, 16, 24, 32…), with 4 pixels reserved for fine detail. See [Grid & Spacing](/design-system/foundations/grid).
- **Anchor** — In Accént card anatomy, the title or headline that names what the card is about. See [Shape, Radius & Elevation](/design-system/foundations/shape).
- **ARIA (Accessible Rich Internet Applications)** — HTML attributes (like \`aria-current="page"\` or \`aria-live="polite"\`) that tell screen readers what a control is doing when plain HTML tags are not enough.
- **Ascender** — The part of a lowercase letter (like *b*, *d*, *h*, *k*, or *l*) that rises above the main body of the word.
- **Aspect Ratio** — The proportional relationship between width and height, such as \`16:10\` for a widescreen hero or \`400×408\` for a near-square study card. See [Imagery & Media](/design-system/foundations/imagery).
- **Baseline** — The invisible horizontal line that letters sit on, like ruled notebook paper.
- **Baseline Grid** — A repeating vertical rhythm of 8-pixel horizontal lines that keeps text columns and cards aligned across a page. See [Grid & Spacing](/design-system/foundations/grid).
- **Blue-Light Attenuation** — Stepping the light-mode canvas down from pure white (\`#FFFFFF\`, \`B: 255\`) to Warm Sandstone (\`#E8E2D5\`, \`B: 213\`) to reduce short-wavelength (\`~450nm\`) scatter, eye fatigue, and evening circadian disruption. See [Color & Contrast](/design-system/foundations/color).
- **Breadcrumb** — A secondary row of links near the top of a page (for example, *Home / Foundations / Grid*) showing where you are in a hierarchy. See [Navigation](/design-system/components/navigation).
- **Cap Height** — The height of a capital letter like *H* or *M* measured from the baseline to its flat top.
- **Ch (Character Unit)** — A CSS width unit equal to the width of the numeral \`0\` in the active font; \`65ch\` is roughly 65 characters per line. See [Typography, Leading & Rhythm](/design-system/foundations/typography).
- **Clear Space** — The protected margin around a logo or punctuation mark where no other text or border may intrude. See [Brand & Punctuation Marks](/design-system/foundations/brand).
- **CLS (Cumulative Layout Shift)** — A measure of how much a page jumps around while images or fonts load; Accént targets \`0.00\` by reserving space ahead of time. See [Imagery & Media](/design-system/foundations/imagery).
- **Contrast Ratio** — A number from \`1:1\` (invisible) to \`21:1\` (black on white) measuring the brightness difference between text and its background. See [Color & Contrast](/design-system/foundations/color).
- **Crest Fallback** — A deterministic monogram or geometric SVG generated from a pipe's name so pages without photography still look finished. See [Room Hero](/design-system/components/hero).
- **CVA (Class Variance Authority)** — A tiny TypeScript helper that locks component variants (such as \`default\`, \`outline\`, \`destructive\`) into predictable class lists.

## D–L

- **Descender** — The tail of a letter (like *g*, *j*, *p*, *q*, or *y*) or old-style numeral that drops below the baseline.
- **DTCG (Design Tokens Community Group)** — The W3C standard JSON format (\`$value\`, \`$type\`) for sharing design tokens between tools and codebases.
- **Elevation** — How layers stack from the base page canvas up to raised menus and modal dialogs; Accént separates layers with crisp hairline borders rather than blurry drop shadows. See [Elevation & Layering](/design-system/foundations/elevation).
- **Eye Fatigue (Asthenopia)** — Ocular strain caused by prolonged pupillary constriction and ciliary muscle accommodation against overly bright (\`#FFFFFF\`) or low-contrast screens; mitigated in Accént by Warm Sandstone (\`#E8E2D5\`), a 13px font floor, and \`60–70ch\` measure. See [Color & Contrast](/design-system/foundations/color).
- **Fallback Stack** — The backup fonts listed in CSS (such as \`Georgia\` or \`system-ui\`) that render immediately if a web font is slow or blocked. See [Mixing Typefaces](/design-system/essays/mixing-typefaces).
- **Focus Ring** — The high-contrast outline drawn around a button, link, or input when you navigate with the \`Tab\` key. See [Touch Targets & Input](/design-system/foundations/touch).
- **Focus Trap** — Keeping \`Tab\` navigation cycling inside an open modal dialog until the person closes it. See [Dialog & Sheet](/design-system/components/dialog).
- **Gestalt** — The perceptual principle that people read the overall arrangement and relationship of parts before they inspect individual details. See [Relief and Focus](/design-system/essays/relief-and-focus).
- **Gutter** — The empty column gap between adjacent grid columns (24px on desktop, 16px on mobile). See [Grid & Spacing](/design-system/foundations/grid).
- **Halation** — The uncomfortable visual buzz or smear that happens when pure white text (\`#FFFFFF\`) is placed on pure black (\`#000000\`). See [Dark Theme & Rooms](/design-system/foundations/dark-theme).
- **Hit Area (Touch Target)** — The clickable or tappable region around a control; Accént requires at least \`44×44px\` even when the visible icon is smaller. See [Touch Targets & Input](/design-system/foundations/touch).
- **Leading (Line Height)** — The vertical distance from one baseline of text to the next, named after the strips of lead typesetters placed between rows of metal type. See [Typography, Leading & Rhythm](/design-system/foundations/typography).
- **Lining Figures** — Numerals (\`0–9\`) that all stand at uniform capital height on the baseline so prices and tables stay level. See [Typography, Leading & Rhythm](/design-system/foundations/typography).

## M–S

- **Measure** — The width of a column of body text; 60 to 70 characters per line (\`60–70ch\`) is the sweet spot where the eye does not lose its place wrapping to the next line. See [Typography, Leading & Rhythm](/design-system/foundations/typography).
- **Monospace** — A typeface where every character occupies the exact same horizontal width, used for code, token IDs, and aligned data.
- **Old-Style Figures** — Numerals designed with ascenders and descenders (like Georgia's \`3, 4, 5, 7, 9\`) that blend into running prose but make financial columns hard to scan. See [Mixing Typefaces](/design-system/essays/mixing-typefaces).
- **Optical Alignment** — Adjusting an icon or shape by a pixel or two so it looks centred to the human eye rather than merely centred by bounding-box math. See [Iconography & Restraint](/design-system/foundations/iconography).
- **Pattern Glare** — Visual vibration or stripe illusion triggered by high-frequency lines of pure black text (\`#000000\`) on pure white (\`#FFFFFF\`, \`21:1\`), especially uncomfortable for readers with astigmatism or migraine sensitivity. See [Color & Contrast](/design-system/foundations/color).
- **Priority+ Navigation** — A navigation bar that shows as many top-level links as fit the current screen width and tucks the rest into a single *More* menu. See [Navigation](/design-system/components/navigation).
- **Redline** — A specification drawing that overlays exact pixel dimensions, padding, and hit-target boxes on top of a live component.
- **Relief vs. Focus** — Josef Albers's distinction between quiet background surfaces that support the page (*relief*) and the one element that claims attention (*focus*). See [Color & Contrast](/design-system/foundations/color).
- **Room** — One of the 12 complete architectural colour palettes in Pipes (such as *Chapel*, *Atelier*, *Gallery*, or *Vault*) that sets wash, card, ink, border, and accent together. See [Dark Theme & Rooms](/design-system/foundations/dark-theme).
- **Sandstone Canvas (\`#E8E2D5\`)** — The default warm papyrus-toned Layer 0 background across Pipes and Accént, chosen over clinical white (\`#FFFFFF\`) to reduce blue-light emission and eye strain. See [Color & Contrast](/design-system/foundations/color).
- **Sans-Serif** — A clean typeface without projecting strokes at the ends of letters (like *Inter* or *Roboto*), suited for dense UI controls and labels.
- **Scrim** — A semi-transparent dark or light wash behind a modal or under text on a photo to protect contrast. See [Elevation & Layering](/design-system/foundations/elevation).
- **Serif** — A typeface with small finishing strokes at the ends of letter stems (like *Fraunces* or *EB Garamond*), suited for headlines and long-form reading.
- **Skeleton Screen** — A calm placeholder outline matching the exact dimensions of incoming content so the page does not jump while data loads. See [Empty, Loading & Error](/design-system/patterns/states).

## T–Z

- **Tabular Figures (\`tabular-nums\`)** — Numerals engineered to share an identical character width so digits in vertical columns, timers, and price tables line up digit-for-digit. See [Typography, Leading & Rhythm](/design-system/foundations/typography).
- **Token** — A named design decision (such as \`#E8E2D5\` for Warm Sandstone canvas or \`24px\` for card padding) stored once so humans and AI models never guess raw values.
- **Tracking (Letter Spacing)** — Uniform spacing added between letters; small uppercase labels need positive tracking (\`0.08em–0.12em\`) so the capitals can breathe. See [Typography, Leading & Rhythm](/design-system/foundations/typography).
- **WCAG AA / AAA** — The Web Content Accessibility Guidelines contrast tiers: AA requires \`4.5:1\` for body text; AAA requires \`7:1\`, which Accént enforces on reading surfaces. See [Color & Contrast](/design-system/foundations/color).
- **X-Height** — The height of lowercase letters like *x*, *a*, or *e*; pairing a serif and a sans with similar x-heights keeps mixed text looking balanced. See [Mixing Typefaces](/design-system/essays/mixing-typefaces).`,
  },
  rules: [
    {
      id: 'glossary.define-jargon',
      statement: 'Define any specialist typographic or accessibility term in plain English the first time it appears.',
      why: 'Accént is written for non-designers first; unexplained jargon shuts readers out.',
    },
    {
      id: 'glossary.link-canonical-page',
      statement: 'Link glossary definitions to the Foundation or Component page that demonstrates the concept live.',
      why: 'Seeing a rule in motion teaches faster than a dictionary entry alone.',
    },
  ],
};
