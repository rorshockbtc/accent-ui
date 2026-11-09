import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/onboarding',
  section: 'patterns',
  title: '3-Archetype Discovery & Airy Onboarding',
  summary:
    'How to structure discovery and browse pages around Personal, Business, and Topic-based examples with airy max-w-6xl spacing and zero cognitive overload.',
  readingMinutes: 6,
  tabs: {
    overview: `## Show how the system works by live archetype

When a new visitor lands on a platform like Pipes (\`/explore\`), dumping 270 unsorted items or multi-row filter controls leaves them asking: *"What is this for? Why does this matter to me?"*

Accént solves discovery overload with the **Airy 3-Archetype Discovery Pattern**:

1. **\`01 · Personal Pipes (pipe\\your-name)\`**: Show 3 real human notebooks (\`pipe\\cubby\`, \`pipe\\dr-cyree\`, \`pipe\\bombthrower\`) on open architectural pedestals so visitors immediately see how an individual uses a Pipe.
2. **\`02 · Business & Studio Pipes (pipe\\your-company)\`**: Show 3 real studio and product canons (\`pipe\\chb\`, \`pipe\\optimization\`, \`pipe\\marigold\`) so founders and teams see how a business uses a Pipe.
3. **\`03 · Topic-Based Pipes (pipe\\subject)\`**: Present featured public subject libraries in an airy 3-column grid followed by a complete, scannable hairline directory of all remaining topics.`,

    guidelines: `## Airy Spacing Rules (\`max-w-6xl\`, \`py-16 sm:py-24\`)

- Alternate section backgrounds between Warm Sandstone (\`#E8E2D5\`) and Archival Paper (\`#FAF8F5\`) separated by \`1px\` hairlines (\`border-t border-[#111827]/15\`).
- Keep descriptions directly on the canvas—never trap item descriptions inside nested sub-boxes inside cards.
- Provide a single-row jump bar (\`All Three Types · 01 Personal · 02 Business · 03 Topics\`) paired with one search input.`,

    specs: `## Container & Grid Cadence

- **Container**: \`container max-w-6xl mx-auto px-6 sm:px-8\`
- **Vertical Section Padding**: \`py-16 sm:py-24\`
- **3-Column Pedestal Grid**: \`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-12 gap-y-14\``,

    accessibility: `## Landmark & Heading Progression

- Each archetype section uses a semantic \`<section>\` with a sequential \`<h2>\` (\`How Personal Pipes Work.\`, \`How Business Pipes Work.\`, \`How Topic Pipes Work.\`).`,
  },
  rules: [
    {
      id: 'onboarding.three-archetypes',
      statement:
        'Structure catalog and discovery pages around clear human archetypes (Personal, Business, Topic) with concrete live examples before presenting dense directories.',
      why: 'Visitors understand concrete examples in 3 seconds, whereas abstract protocol jargon causes immediate bounce.',
    },
    {
      id: 'onboarding.airy-cadence',
      statement:
        'Use generous section padding (py-16 sm:py-24) and open pedestals with zero nested boxes inside catalog items.',
      why: 'Breathing room is what separates an editorial publication from a cluttered dashboard.',
    },
  ],
};
