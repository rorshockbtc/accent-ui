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

Accént uses **Disclosure Wells** and **Hairline Accordions** to keep the default view calm while keeping power-user controls one click away.

::demo:accordion-demo::`,

    guidelines: `## Do & Don't

- **Do** use progressive disclosure for optional escape hatches (like \`Optional: Inject Custom CSS / Agent Rules\`).
- **Don't** hide primary value propositions or core navigation inside an accordion.
- **Don't** animate \`height\` or \`max-height\` with layout-thrashing CSS; use native disclosure or opacity + transform transitions.`,

    specs: `## Disclosure Trigger Spec

- **Trigger Button**: \`min-h-[44px] w-full flex items-center justify-between py-3 border-b border-[var(--a-rule)]\`
- **Attributes**: \`aria-expanded={isOpen}\` and \`aria-controls={panelId}\``,

    accessibility: `## ARIA Contract

- The toggle button must carry \`aria-expanded="true" | "false"\`.
- Enter and Space keys must toggle the panel natively.`,
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
