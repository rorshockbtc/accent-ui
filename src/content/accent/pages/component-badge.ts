import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/badge',
  section: 'components',
  title: 'Badge',
  summary: 'Small labels that describe status or category. They inform; they never ask to be clicked unless they are links.',
  readingMinutes: 4,
  kind: 'doc',
  tabs: {
    overview: `## What a badge does

A badge is a tiny label stuck to something bigger. "Draft." "Paid." "New." "3 unread." It answers a question the reader already has about the thing next to it, and it answers in one or two words.

Badges are cheap to add, which is the problem. Put a badge on every card and none of them mean anything. A page with eleven pink pills looks like a sale rack. Accent treats badges like salt: a pinch makes the dish, a fistful ruins it.

> **Why:** Capping badges at one or two per card preserves Albers focus—if every card wears three bright pills, the eye can no longer spot the one status that actually needs attention.

::demo:badge-states::

## Anatomy

- **Container.** A pill, 20px tall, fully rounded. This is the one place Pipes allows a full radius, because the pill shape reads instantly as "label, not button."
- **Label.** 12px UI sans at weight 500 on screen. Keep it to one or two words. If you need a sentence, you need a callout, not a badge.
- **Icon (optional).** 12px, leading. A dot, a check, a clock. It reinforces the meaning for people who scan by shape.
- **Count (optional).** A tabular number. "12", not "twelve". Use lining, tabular figures so counts do not wobble as they change.

Twelve pixels is under the 13px minimum for body text. Badges get an exception because the label is short, uppercase is never forced, and the meaning is repeated elsewhere (a status column, a heading). If the badge is the only place the information lives, bump it to 13px.

## Variants

- **Default.** Solid fill. Reserve it for the single most important status on screen.
- **Secondary.** Tinted fill. The everyday badge for categories and tags.
- **Outline.** Bordered, no fill. Quiet metadata such as "v2.1" or "PDF".
- **Destructive.** Soft red. Errors, overdue, failed.
- **Ghost and link.** Interactive badges, such as a tag that filters a list. These must behave like links.

## States

Most badges are static. Interactive ones (filter chips, removable tags) need hover, focus-visible and pressed states, and the 44px hit area rule applies to them just as it applies to buttons. A 20px pill can still have a 44px tap zone.

## When to use

Use a badge to show status (Draft, Live, Archived), category (Recipe, Essay), or a count that changes. Do not use a badge as a heading, a button, or decoration. If removing the badge loses no information, remove it.

## The Accent rule

Never encode meaning in color alone. "Overdue" in red works because the word says overdue. A red dot with no word is a puzzle for the eight percent of men with some form of color blindness, and for anyone reading in sunlight.`,
    guidelines: `## Live Do & Don't comparisons

::demo:badge-do-text::

::demo:badge-do-max-two::

## Do

- Keep labels to one or two words.
- Use a consistent vocabulary: pick "Live" or "Published" and stick to it.
- Pair status color with a word and, ideally, an icon.
- Limit to one badge per card, two at most.

## Don't

- Don't use badges as buttons. If it does something, make it a button or a link.
- Don't stack three badges in a row to describe one item.
- Don't use the default (solid) variant for routine categories.
- Don't truncate badge text. Shorten the word instead.

## When to use

- Status that the user checks often.
- Counts that update (unread, pending).
- Categories that help filtering.

## When not to

- Long explanations (use a callout or helper text).
- Calls to action (use a button).
- Purely decorative flair.`,
    specs: `## Badge redline and variant table

::demo:badge-redline::

| Variant | Background | Text / Icon | Border | Typical use |
|---|---|---|---|---|
| \`default\` | \`#111827\` | \`#FAF8F5\` | None | Primary category tag |
| \`secondary\` | \`#E8E2D5\` | \`#111827\` | None | Neutral topic count |
| \`outline\` | Transparent | \`#111827\` | \`1px solid #111827/25\` | \`pipe\slug\` attribution chip |
| \`verified\` | \`#166534/10\` | \`#166534\` + Check | \`1px solid #166534/40\` | Passing gate / AAA badge |

## Tokens

- Height: 20px (\`h-5\`).
- Padding: 8px horizontal, 2px vertical. With icon: 6px on the icon side.
- Radius: full (\`rounded-4xl\`).
- Font: UI sans 12px, weight 500, \`tabular-nums\` for counts.
- Icon: 12px.
- Gap: 4px.

## Spacing

- Badge to adjacent text: 8px.
- Badge to badge: 4px.

## Usage

\`\`\`tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive"><AlertCircle data-icon="inline-start" />Overdue</Badge>
<Badge variant="outline" className="tabular-nums">12</Badge>
\`\`\``,
    accessibility: `## Contrast and screen-reader phrasing

::demo:badge-ax-contrast::

::demo:badge-ax-sr::

## Requirements

- **Not color alone.** Status must be conveyed by text (WCAG 1.4.1).
- **Contrast.** Badge text at least 4.5:1 against its fill (WCAG 1.4.3); aim for 7:1 on room surfaces.
- **Interactive badges.** Use a link or button element, give a 44×44px hit area, and show a visible focus ring.
- **Counts.** A bare "3" next to an icon needs context. Add visually hidden text: "3 unread messages."

## Screen readers

- Status badges that change live (e.g. "Saving" to "Saved") should sit in a polite live region.
- Decorative icons inside badges get \`aria-hidden="true"\`.`,
  },
  rules: [
    {
      id: 'badge.text-not-color',
      statement: 'Every status badge must contain a text label; never use a color dot alone.',
      why: 'Color-blind users and screen readers cannot read color.',
    },
    {
      id: 'badge.max-two',
      statement: 'Show at most two badges per card or list row.',
      why: 'More badges dilute meaning until none are noticed.',
    },
    {
      id: 'badge.short-label',
      statement: 'Badge labels are one or two words; longer text belongs in helper text.',
      why: 'Badges are scanned, not read.',
    },
    {
      id: 'badge.not-a-button',
      statement: 'Do not attach onClick to a Badge; use a Button or link instead.',
      why: 'Clickable labels confuse people and lack keyboard support.',
      violationPattern: '<Badge[^>]*onClick=',
    },
  ],
};
