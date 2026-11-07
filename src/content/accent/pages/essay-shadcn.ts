import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'essays/beyond-the-shadcn-default',
  section: 'essays',
  kind: 'essay',
  title: 'Beyond the Shadcn Default: Why Every AI-Generated Website Looks the Same',
  summary:
    'Zinc borders, 14px Inter, three-column pricing. How shadcn/ui won, why AI agents copy it, and how opinionated tokens and 12 rooms bring the soul back.',
  readingMinutes: 10,
  pipes: ['chb', 'website-design'],
  rules: [
    {
      id: 'theme.no-default-zinc',
      statement: 'Do not use stock shadcn zinc tokens such as hsl(240 5.9% 90%); use the active room tokens (--room-wash, --room-ink) instead.',
      why: 'Stock tokens are the main reason AI-built sites look identical.',
      violationPattern: 'hsl\\(240 5\\.9% 90%\\)',
    },
    {
      id: 'theme.no-raw-hex',
      statement: 'Never write raw hex colours in components; reference design tokens only.',
      why: 'Raw hex codes drift, break theming, and skip contrast checks.',
      violationPattern: '#[0-9a-fA-F]{3,8}\\b',
    },
    {
      id: 'components.headless-primitives',
      statement: 'Build interactive widgets (dialog, menu, popover, combobox) on Base UI primitives with cva variants, not hand-written focus logic.',
      why: 'Focus traps and ARIA state are hard to get right by hand; headless primitives already handle them.',
    },
    {
      id: 'type.floor-13',
      statement: 'Never set text smaller than 13px, including badges and captions.',
      why: 'Tiny muted badges are a hallmark of template UI and are hard to read.',
      violationPattern: 'text-\\[(1[0-2]|[0-9])px\\]',
    },
  ],
  tabs: {
    overview: `# Beyond the Shadcn Default

Open twenty AI-generated startup sites launched in the last year and a half. Squint. You will see the same website twenty times.

A thin zinc border, usually \`1px solid hsl(240 5.9% 90%)\`. Cramped 14px Inter on a stark white card. A hero with a gradient blob. Three pricing columns with the middle one "Most popular". A tiny grey badge that says "New". Rounded corners at exactly the same radius everywhere.

That look has a name. It is the default silhouette of shadcn/ui. This essay is about how it got everywhere, why AI agents keep reaching for it, and what we did in Accent so that sites built with Pipes and Bang do not all look like the same rented apartment.

## First, some definitions

### What Radix is

Radix UI is a library of "headless" components. Headless means the component handles behaviour (keyboard, focus, screen reader announcements) but ships with no visual style. A Radix dialog knows how to trap focus and close on Escape. It does not know what colour it should be.

### What shadcn/ui is

shadcn/ui is a collection of Radix components with Tailwind styles already applied. You copy the code into your project and own it. It is not a dependency in the normal sense; it is a starter kit you paste in.

### What Base UI is

Base UI is another headless library, from people who worked on Radix and Material UI. Like Radix, it gives you accessible behaviour without a look. We use it in Accent, together with a small tool called cva (class variance authority), which lets us define a button's variants (primary, quiet, danger; small, medium, large) as a typed list instead of a pile of ad hoc classes.

The three layers fit together like this.

::demo:fig-state-ownership::

## How shadcn won

### Raw headless components are a lot of work

Building on raw Radix sounds noble. In practice, you are signing up for weeks of state management. A proper combobox needs a roving tabindex, so arrow keys move between options. A dialog needs a focus trap, so Tab does not escape behind the overlay. A popover needs collision detection, so it flips when it hits the edge of the screen. Each of those comes with ARIA attributes you have to wire correctly.

Nobody shipping a product on a deadline wants to hand-wire twenty ARIA attributes per dropdown. Radix does a lot of this for you, but you still have to style every state, compose the parts, and decide on spacing, colour and type from scratch.

### shadcn made the boring part free

shadcn solved the speed problem beautifully. Paste in a Button, a Dialog, a Card, and you are done. It looks clean. It is accessible enough. It works in dark mode. For a lot of teams that was a genuine gift, and the people behind it deserve credit.

### Then everybody used it

When a good default exists, people use it. A very large number of projects adopted shadcn with its stock tokens unchanged. The result is that the web got cleaner and also much more same-y.

## Why AI agents default to shadcn

### Models learn the average

Claude, Cursor, v0 and their peers learned to write interfaces by reading public code. A huge share of recent React code uses stock shadcn. So when you ask an agent to "build a dashboard", it gives you the statistical average of everything it read. The average is zinc borders and 14px Inter.

This is not laziness. It is how prediction works. If you do not give a model a strong opinion, it will give you the most common one.

### "Make it look good" is not a spec

Ask a model to make something look good and it reaches for what looked good, on average, in its training set. That produces competent, forgettable work. Taste requires specific constraints: which fonts, which colours, which spacing scale, which radius, and why.

### Cohesive UI costs more tokens than backend

AI agents write backend code very well. They will cut through an API route like a lightsaber through butter. Ask for a cohesive interface and they burn several times the tokens, revise and revise, and the result still looks like slop. That is because cohesion is a system property. It lives in the relationships between components, not in any one component, and you cannot predict your way into it without rules.

Here are two sample sites with identical layouts and very different results.

::demo:fig-same-layout-sites::

## Our decision: headless underneath, rooms on top

When we designed Accent, we refused to choose between "accessible and fast" and "looks like something".

### Keep the ergonomics

We kept the good part of the shadcn idea. Our components sit on Base UI primitives with cva variants. Neither a human engineer nor a local model running inside Bang ever writes a focus trap by hand. Variants are typed: a Button takes a variant and a size, and nothing else. That removes the "utility soup" where every button has a slightly different stack of classes.

### Replace the skin

What we threw out is the single neutral theme. Instead, Accent defines twelve rooms: Gallery, Chapel, Atelier, Fairway, Brew, Atlas, Signal, Image Lab, Vault, Ledger, Forge and Orbit.

A room is a full theme with a mood. Gallery is warm sandstone paper. Chapel is careful parchment (#EDE6D9) with antique bronze (#8B6F4E), suited to philosophy, scripture or long reading. Atelier is pink ink on draft paper, for builders. Ledger is calm and numerical, for money. Each room has its own wash (background), ink (text), and accent, all expressed as tokens.

::demo:room-gallery::

The differences come down to a few measurable habits.

::demo:fig-fingerprint::

### Make the rules strict

Rooms only work if the rules underneath them are strict:

- Text never goes below 13px, anywhere. No 10px grey badges.
- Body text hits WCAG AAA contrast, which is a ratio of at least 7:1 between text and background. We verified 49 pastel and tonal-dark pairs against that bar.
- Spacing is on an 8-point grid.
- Components reference tokens, never raw hex codes.

### A concrete example

Here is the same prompt run two ways: "Build a pricing page for a bakery's catering service."

Without Accent, a model returns the familiar three white cards, zinc borders, a purple gradient button and "Most popular" in a 10px pill.

With Accent, the model is told the room is Brew. It gets warm cream wash, dark roast ink, Fraunces headings at a readable size, prices set in lining tabular figures so they line up, and buttons at least 44px tall. Same component code. Very different page. The bakery looks like a bakery.

### How a room reaches the model

A room is not a mood board. It is a short block of tokens plus a handful of one-sentence rules, exported as JSON. When Bang asks a model for a page, the room name and its tokens go into the prompt before anything else. The model never has to guess a colour, because the only colours it is allowed to use have names like --room-wash and --room-ink. When it guesses anyway, a lint check spots the raw hex code and sends the step back.

That is the whole mechanism. No fine-tuning, no secret sauce. Just an opinion, written down in a form a machine can obey and a person can read.

## The counter-argument: sameness is a feature

Let us argue the other side honestly.

### Familiar interfaces are easier to use

Jakob's law says users spend most of their time on other sites, so they expect yours to work the same way. A familiar shadcn interface has a learning curve of zero. Novelty can confuse people.

That is right about behaviour. It is wrong about appearance. Nobody is confused by a warm background or a serif heading. Accent keeps behaviour conventional: buttons look like buttons, menus open where you expect, dialogs close on Escape. We change the mood, not the mechanics.

### Defaults protect people from bad taste

A neutral default stops a well-meaning founder from shipping lime green on magenta. Fair. But a room is also a default. It is just a better-specified one, with contrast already checked. You get guardrails and character at the same time.

### shadcn can be themed

True. shadcn uses CSS variables and you can theme it. Very few people do, and agents almost never do, because nobody tells them how. The problem is not shadcn's code. The problem is the absence of an opinion on top of it. Accent is that opinion, written down where both people and models can read it.

## What this means for you

### If you are a founder or small-business owner

Your site is often the first conversation a customer has with you. If it looks like every other AI-built site, you have spent that first impression on saying nothing. Pick a room that matches your business and let the system handle the rest.

### If you are an engineer

Keep your headless primitives. Keep cva. Delete the stock tokens. Wire your components to room tokens and enforce the floor rules in lint or CI.

### If you are an AI agent

Read the rules file before you write any markup. Use the room tokens. Do not invent hex codes. Do not shrink text below 13px. Your average is not our spec.

## Closing

shadcn/ui made accessible components easy, and that was a real step forward. The sameness that followed is not its fault. It is what happens when a good default meets a machine trained to repeat the most common answer.

The fix is not to throw away the good engineering. It is to put a point of view on top of it: specific rooms, strict floors, checked contrast, and rules short enough that a 7B model can follow them. Then "build me a pricing page" stops meaning "build me the pricing page everyone else has."
`,
  },
};
