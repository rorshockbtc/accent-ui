import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'start/introduction',
  section: 'start',
  title: 'Introduction',
  summary:
    'What Accént is, who it is for, and how to read it whether you design, write code, run a business, or are a local AI model.',
  readingMinutes: 5,
  tabs: {
    overview: `## What Accént is

Accént is the design system behind Pipes. It is the set of decisions that makes a Pipes page, a ! Bang website, or a Colon Hyphen Bracket client project feel like it was made on purpose: the grid, the type, the colors, the components, and the reasons behind each of them.

It is also a teaching document. Most design systems are written for the people who already know design. They list tokens and props and assume you understand why a 13px floor exists or why your prices look wrong in Georgia. Accént is written for the person who does not know yet, and for the AI model they are building with.

## Why the accent mark

An accent changes how a letter is spoken without changing the letter. That is what a design system does to a product. The words and features stay the same; the emphasis, rhythm, and tone change.

All of our products are punctuation marks. ´ Accént is the design system, ! Bang is the website builder, :-] is the company, ;-] is Semi, > is Greater, # is Hash (journaling), ~ is Trim, and \\ is the pipe namespace. The essay [Punctuation as Product](/design-system/essays/punctuation-as-product) explains why.

::demo:punctuation-family::

## How to read these docs

Every page in Foundations, Components, and Patterns has four tabs:

- **Overview** explains what something is and why it matters, in plain English. Start here if you are not a designer.
- **Guidelines** lists what to do, what to avoid, and when to use it.
- **Specs** gives exact numbers, tokens, and code. This is for engineers.
- **Accessibility** lists the requirements that keep the thing usable for everyone.

Every page also ends with **Rules for AI models**. These are the same decisions written as short, checkable instructions. A 7B model running on a laptop cannot read this whole site, but it can follow five rules at a time. Those rules are also published as JSON at [/design-system/rules.json](/design-system/rules.json).

## Where to start

- New to design? Read [Grid & Spacing](/design-system/foundations/grid), then [Typography](/design-system/foundations/typography), then [Color & Contrast](/design-system/foundations/color) (including why Accént sits on a **Warm Sandstone \`#E8E2D5\`** canvas instead of clinical white to prevent blue-light glare and eye fatigue).
- Picking fonts? Read [Mixing Typefaces](/design-system/essays/mixing-typefaces).
- Building with an AI model? Read [Rules a Local Model Must Never Break](/design-system/ai/rules).
- Wondering why AI websites all look the same? Read [Beyond the Shadcn Default](/design-system/essays/beyond-the-shadcn-default).

## What Accént is not

It is not a constraint on every release. Pipes ships fast and the system catches up. It is a reference that gets updated when the product teaches us something, not a gate that every change must pass through. The public docs use sample content and stock imagery only; nothing here shows a real member's work or face.`,
  },
  rules: [
    {
      id: 'system.read-rules-first',
      statement: 'Before generating UI, load the rules for the page type you are building from /design-system/rules.json.',
      why: 'Small models do better with five relevant rules than with the whole design system.',
    },
    {
      id: 'system.sample-content-only',
      statement: 'Public examples use sample names and stock imagery, never real member portraits.',
      why: 'The design system is public reference material and must not expose people.',
      violationPattern: '/pipe-heroes/|/pipe-editorial/',
    },
  ],
};
