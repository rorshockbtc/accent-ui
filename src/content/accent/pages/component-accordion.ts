import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/accordion',
  section: 'components',
  title: 'Accordions, Disclosure Wells & Collapsible Specs',
  summary:
    'Progressive disclosure using native <details>/<summary> and ARIA disclosure patterns to keep primary surfaces airy and uncluttered.',
  readingMinutes: 5,
  tabs: {
    overview: `## Progressive disclosure keeps pages airy

When a page needs to offer deep technical controls—such as custom CSS injection in the Brand Studio, advanced API parameters, or long FAQ answers—dumping every textarea onto the initial screen creates cognitive overload.

> **Why:** Native HTML \`<details>\` and \`<summary>\` handle toggle semantics, keyboard Enter/Space activation, and automatic browser Find-in-Page expansion reliably without layout-thrashing JavaScript height animations.

Accént uses **Disclosure Wells** and **Hairline Accordions** to keep the default view calm while keeping power-user controls one click away.

::demo:accordion-demo::`,

    guidelines: `## Do & Don't

- **Do** use native \`<details>\`/\`<summary>\` progressive disclosure for optional escape hatches (like \`Optional: Inject Custom CSS / Agent Rules\`), placing any disclosure chevron right before the label text.

::demo:accordion-escape-hatch::

- **Don't** place heading elements (\`<h2>\`–\`<h4>\`) inside \`<summary>\`—screen readers like JAWS and TalkBack flatten \`<summary>\` into a button and strip inner heading navigation. Keep headings outside or use plain phrasing text inside \`<summary>\`.

::demo:accordion-summary-heading::`,

    specs: `## Disclosure Trigger Spec

| Part | Specification | Constraint |
|---|---|---|
| **Element Pair** | Native \`<details>\` + \`<summary>\` | Preferred over custom JS height state or \`hidden="until-found"\` |
| **Trigger Height** | \`min-h-[44px]\` flex inline layout | Chevron placed adjacent to text label, never pushed far right |
| **Motion** | \`details::details-content\` + \`allow-discrete\` | Scoped inside \`@media (prefers-reduced-motion: no-preference)\` |

::demo:accordion-details-spec::`,

    accessibility: `## ARIA, Keyboard & Searchability Contract

- Native \`<details>\`/\`<summary>\` exposes expanded/collapsed state automatically to screen readers, toggles cleanly with \`Enter\` or \`Space\`, and stays searchable and auto-expandable via browser Find-in-Page (\`⌘F\` / \`Ctrl+F\`) without hidden DOM hacks.
- When building non-native disclosures, always keep \`aria-expanded\` synchronized on the invoking \`<button>\` with \`44×44px\` minimum hit area.

::demo:accordion-keyboard-state::`,
  },
  rules: [
    {
      id: 'accordion.aria-expanded',
      statement:
        'Every collapsible disclosure or accordion trigger button must set aria-expanded={isOpen} and maintain a 44px minimum height.',
      why: 'Screen readers require aria-expanded to announce whether a disclosure section is open or collapsed.',
    },
  ],
};
