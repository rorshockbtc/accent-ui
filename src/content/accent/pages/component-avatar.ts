import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/avatar',
  section: 'components',
  title: 'Avatar',
  summary: 'Representing curators, authors, and pipes with a zero-shift fallback ladder: editorial photo, two-letter monogram, or deterministic crest.',
  readingMinutes: 5,
  tabs: {
    overview: `## Identity without broken images or privacy leaks

An avatar shows who curated a pipe, authored an essay, or joined a thread. In many systems, missing profile photos collapse into an ugly grey mystery silhouette—or worse, public documentation accidentally ships with real users' personal photographs.

Accént enforces a three-rung **deterministic fallback ladder** at every avatar size (\`24, 32, 40, 56, 96px\`):

1. **Editorial portrait** (with \`object-cover\` inside a fixed circle so it never stretches).
2. **Two-letter serif monogram** derived from the display name (*AL* for Ada Lovelace) set in Fraunces on an ink or room-toned circle.
3. **Deterministic SVG crest** generated from the namespace hash when representing a topic pipe rather than an individual.

> **Why:** Public design system pages and ! Bang templates must never use real members' personal portraits. Our deterministic monogram and crest fallbacks make every page look complete with zero privacy exposure and \`0.00\` layout shift.

::demo:avatar-modes::

## Avatar stacks and presence badges

When showing multiple contributors on a pipe, overlap at most 4 avatars by \`8px\` (\`-space-x-2\`) with a \`2px\` canvas-coloured ring, followed by a \`+N\` count pill.

::demo:avatar-group-stack::

## Proportions, framing, and room harmony

Portraits vary wildly in lighting and crop. To keep a grid of contributors or pipe curators looking cohesive inside any of the 12 rooms:

- **Circle for people, asymmetric square for pipes:** Individual curators and authors use a full circle (\`rounded-full\`), whereas topic pipes and publications use the signature Accént asymmetric corner (\`rounded-[0_8px_0_8px]\`) so readers can tell a person apart from a publication by shape alone.
- **Subtle inner ring:** Apply \`ring-1 ring-[#111827]/12\` (or \`ring-[#F3EFE9]/16\` in dark rooms) on every avatar image so a portrait with a white studio background never bleeds into the Alabaster canvas.
- **Monogram typography:** Set two-letter fallback initials in Fraunces SemiBold at roughly 38% of the circle diameter (\`15px\` inside a \`40px\` avatar), centred optically with \`leading-none\`.`,
    guidelines: `## Pair presence dots with a cutout ring and visible status text

A tiny green or red dot on the corner of an avatar is invisible to colour-blind readers and silent to screen readers. Always pair it with a status word (*Online*, *Away*).

::demo:avatar-do-status::

## Fall back to deterministic initials, never a generic silhouette

Every person and pipe has a name. Use its initials in our serif display face when no photo is present.

::demo:avatar-do-fallback::`,
    specs: `## Size scale, overlap redline, and tokens

::demo:avatar-redline::

| Size token | Diameter | Monogram font size | Where to use |
|---|---|---|---|
| \`xs\` | \`24px\` (3 × 8) | \`12px\` (\`text-xs\`) | Compact inline bylines and badge chips |
| \`sm\` | \`32px\` (4 × 8) | \`13px\` | Comment rows and table cells |
| \`md\` (default) | \`40px\` (5 × 8) | \`15px\` | Card headers, avatar stacks, top nav trigger |
| \`lg\` | \`56px\` (7 × 8) | \`20px\` | Author bio cards and dossier headers |
| \`xl\` | \`96px\` (12 × 8) | \`34px\` | Profile mastheads |

\`\`\`tsx
// Avatar with automatic initials fallback and decorative alt when name is adjacent
<div className="flex items-center gap-3">
  <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#111827] font-serif text-sm font-semibold text-[#FAF8F5] ring-1 ring-[#111827]/15">
    AL
  </span>
  <span className="text-sm font-medium">Ada Lovelace</span>
</div>
\`\`\``,
    accessibility: `## Avoiding duplicate screen-reader announcements

When an avatar sits right next to the person's printed name (*[AL] Ada Lovelace*), giving the image \`alt="Ada Lovelace"\` causes screen readers to say *"Ada Lovelace, Ada Lovelace"*. Set \`alt=""\` (or \`aria-hidden="true"\` on initials) when the name is already printed beside it, and provide a full \`aria-label\` only when the avatar stands alone as an interactive button.

::demo:avatar-ax-alt::`,
  },
  rules: [
    {
      id: 'avatar.deterministic-fallback',
      statement: 'Every avatar must fall back to 2-letter initials or a deterministic SVG crest when no image URL is available.',
      why: 'Prevents broken image icons and keeps layout dimensions locked.',
    },
    {
      id: 'avatar.empty-alt-when-named',
      statement: 'Set alt="" (or aria-hidden="true") on an avatar when the person’s name is rendered as visible text immediately beside it.',
      why: 'Prevents screen readers from stuttering the person’s name twice in a row.',
    },
    {
      id: 'avatar.stack-max-four',
      statement: 'Display at most 4 overlapping avatars in a group stack before collapsing remaining items into a +N counter pill.',
      why: 'Long chains of tiny overlapping circles waste width and become unreadable on mobile.',
    },
    {
      id: 'avatar.status-not-color-alone',
      statement: 'Never render a coloured presence dot on an avatar without accompanying status text or an accessible label.',
      why: 'Honours WCAG 1.4.1 (Use of Color).',
    },
  ],
};
