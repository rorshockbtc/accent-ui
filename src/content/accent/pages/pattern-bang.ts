import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/bang-templates',
  section: 'patterns',
  title: '! Bang Site Templates',
  summary: 'How ! Bang builds small-business websites from Accent: a fixed page skeleton, one room, and copy written by the owner.',
  readingMinutes: 5,
  kind: 'doc',
  tabs: {
    overview: `## A website for the bakery down the street

! Bang is the Pipes website builder for small businesses. The exclamation mark is the point: a shop sign, a "we're open!", an announcement. Bang's customers are bakers, barbers, plumbers and bookkeepers. They do not want to learn design. They want a site that looks like it was made by someone who cared, and they want it by Friday.

Bang templates are Accent with the decisions already made. The owner picks a room, writes a few sentences, uploads a few photos, and the template does the rest without ever breaking the grid.

## The page skeleton

Every Bang site uses the same skeleton. Sections can be turned off, but not reordered into chaos.

- **Navigation.** Brand on the left, up to five links, one action button (Call, Book, Order). Collapses to a labeled Menu on phones.
- **Hero.** One headline, one sentence, one photo, one primary action. Built on the Room Hero.
- **The essentials.** Hours, address, phone, in that order, high on the page. This is the section most visitors came for. A bakery site that hides its opening hours below three paragraphs of founder story has failed.
- **Offer.** Services, menu or products as a card grid or a simple priced list with tabular numbers.
- **Proof.** Two or three short reviews with first names, or a small photo gallery.
- **Story (optional).** A paragraph about the people behind the counter.
- **Contact.** A map link, a short form, and the phone number again.
- **Footer.** Hours repeated, social links, legal.

## Why fixed?

Freedom sounds generous, but for someone who has never designed anything, a blank canvas is a trap. Fixed structure means every Bang site is fast, accessible and readable on a phone by default. The owner's personality comes through in the room colors, the photos and, most of all, the words.

## Rooms

Owners choose one of the 12 Accent rooms. Brew suits cafés. Fairway suits outdoor and sports businesses. Ledger suits accountants. Atelier suits makers. Each room changes color and mood but keeps 7:1 body contrast and the same component specs.

## Copy prompts

Bang asks plain questions instead of showing empty text boxes: "What do regulars always order?" "What should someone know before their first visit?" Answers become headings and body copy. AI can tidy grammar but never invents claims, prices or reviews.

## States

Every section has an empty state that shows the owner what to add and hides the section from the public until it is filled. A Bang site never ships a lorem ipsum.

## When to use

Single-location small businesses that need to be found, called and visited. Multi-location chains and online stores with hundreds of products need more than Bang.
## Three skeletons

::demo:bang-templates::

> **Note:** The Bang knowledge base file is not in this repository. The templates and rule lists here are illustrative reconstructions of the page's own skeleton order, not an export of Bang's source.

> **Why:** A small business owner has one hour to build a site. A fixed skeleton makes the hour enough, and every template obeys the same grid so none of them looks half-finished.
`,
    guidelines: `## Do

- Put hours, address and phone in the top half of the home page.
- Keep one primary action site-wide (Call, Book or Order).
- Use the owner's own words for the story and offer.
- Show prices with tabular numbers and currency symbols.
- Hide empty sections from the public.

## Don't

- Don't reorder the skeleton so contact info sinks below the fold.
- Don't publish placeholder text or stock reviews.
- Don't let AI invent prices, awards or testimonials.
- Don't add carousels, popups or autoplay music.
- Don't use more than one room per site.

## When to use

- Cafés, salons, trades, clinics, studios, local services.

## When not to

- Large e-commerce catalogs or multi-brand sites.
::demo:bang-do-hero::

::demo:bang-do-form::
`,
    specs: `## Skeleton order

1. Nav (64px desktop / 56px mobile)
2. Hero (Room Hero)
3. Essentials (hours, address, phone)
4. Offer (card grid or price list)
5. Proof (reviews or gallery)
6. Story (optional)
7. Contact
8. Footer

## Tokens

- Section padding: 64px desktop, 40px mobile.
- Max content width: 1200px; text measure 65ch.
- Price list: UI sans 16px, \`tabular-nums\`, prices right-aligned.
- Hours: definition list, day names 14px weight 500.
- Primary action: default Button, 44px hit area, sticky bottom bar on phones.

## Template config

\`\`\`ts
const site: BangSite = {
  room: 'brew',
  action: { kind: 'call', label: 'Call the shop', href: 'tel:+15555550123' },
  sections: ['hero', 'essentials', 'offer', 'proof', 'contact'],
};
\`\`\`
## Redline

::demo:bang-redline-skeleton::

## Template differences

| Part | Storefront | Service | Portfolio |
|---|---|---|---|
| Hero | One product, one price | Service, phone, hours | Selected work |
| Grid | 3 col, square tiles | 3 col, service cards | 3 col, 4:5 tiles |
| Primary action | Add to cart | Call | Contact |
| Proof | Reviews | Reviews and map | Case studies |
`,
    accessibility: `## Requirements

- **Phone and address as text.** Not baked into images (WCAG 1.4.5).
- **Tap to call.** Phone numbers use \`tel:\` links with 44px targets.
- **Hours.** Marked up as a list or table-like definition list so screen readers read day and time together.
- **Maps.** Embedded maps have a text address and directions link alongside (WCAG 1.1.1).
- **Contrast.** Every room keeps body text at 7:1.
- **Forms.** Contact forms follow the Inputs & Forms rules: visible labels, errors in words.
- **Language.** Set \`lang\` on the html element for the site's language (WCAG 3.1.1).
## Live: checks every site ships with

::demo:bang-ax-checks::
`,
  },
  rules: [
    {
      id: 'bang.essentials-high',
      statement: 'Hours, address and phone appear directly after the hero on Bang home pages.',
      why: 'It is the information most visitors came for.',
    },
    {
      id: 'bang.no-placeholder',
      statement: 'Never publish lorem ipsum or placeholder copy; hide empty sections instead.',
      why: 'Placeholder text tells customers the business is not paying attention.',
      violationPattern: '[Ll]orem ipsum',
    },
    {
      id: 'bang.no-invented-claims',
      statement: 'Do not generate prices, reviews, awards or testimonials; use only owner-supplied facts.',
      why: 'Invented claims are false advertising.',
    },
    {
      id: 'bang.tel-links',
      statement: 'Phone numbers are rendered as tel: links in text, never as images.',
      why: 'Visitors on phones should be one tap from calling.',
    },
    {
      id: 'bang.one-room',
      statement: 'A Bang site uses exactly one room theme.',
      why: 'Mixing rooms breaks visual identity and contrast guarantees.',
    },
    {
      id: 'bang.twelve-column',
      statement: 'Bang pages sit on a 12-column grid with 16px gutters.',
      why: 'One grid keeps every template aligned.',
    },
  ],
};
