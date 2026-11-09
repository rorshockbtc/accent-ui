import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/motion',
  section: 'foundations',
  kind: 'doc',
  title: 'Motion',
  summary: 'Three durations, one easing curve, full respect for reduced motion, and a list of things that never move.',
  readingMinutes: 5,
  tabs: {
    overview: `## Motion is a sentence, not a shout

Movement is the strongest attention signal a screen has. Our eyes evolved to notice motion at the edge of vision before anything else, because motion used to mean a predator. That is exactly why interface animation needs a light hand. Every animation says "look here." Say it about the right things, briefly, and people feel guided. Say it about everything, and people feel harassed.

Good motion explains. A menu that slides out from its button shows where it came from. A card that expands into a page shows that the page is that card, enlarged. A toast that fades in at the corner says "something happened, no rush." Motion that doesn't explain anything is decoration, and decoration that moves is the most distracting kind.

## Two tiers of motion: Product vs. Editorial Showcase

Accent makes a clean distinction between high-frequency product workflows and low-frequency showcase surfaces:

1. **Tier 1: Product / Operational Motion**
   - High-frequency daily usage: exploring pipes, writing notes, toggling views, opening drawers.
   - Durations: **120ms** (micro/tap), **200ms** (base/menus), **320ms** (slow/panels).
   - Easing: **cubic-bezier(0.16, 1, 0.3, 1)**.
   - Doctrine: Snappy, minimal, zero text movement, zero distraction. Respects attention.

2. **Tier 2: Editorial & Corporate Showcase Motion**
   - Low-frequency, high-impact surfaces: the marketing homepage, Colon Hyphen Bracket corporate flagship (\`colonhyphenbracket.pink\`), public launch pages, and Romanov Thesis editions.
   - Durations: **650ms** (fade in), **850ms–900ms** (masked line/word reveal), **35ms** (stagger per word).
   - Easing: **cubic-bezier(0.22, 1, 0.36, 1)** (soft settle inspired by Chicuinaco).
   - Primitives: \`RiseLines\` (line-by-line masked display rise), \`ScaryHeadline\` (3-phase strike-through + spring swap), \`Smile\` (animated \`: - ]\` wink), \`FadeUp\`, \`Hairline\` (left-origin rule draw), \`AccentRevealText\` (staggered word masks), \`AccentEditorialReveal\`, and \`AccentRevealImage\` (clip-path curtain reveals).

::demo:motion-editorial-showcase::

## Three durations (Tier 1 Product)

Accent uses three durations and nothing else:

- **120ms** for small, immediate feedback: a button press, a checkbox tick, a hover colour change. Fast enough to feel like a direct response to your finger.
- **200ms** for things appearing and disappearing: menus, tooltips, toasts, dropdowns.
- **320ms** for larger moves: a panel sliding in, a modal opening, a page transition.

Why these? Below about 100ms, people can't perceive a transition at all; it just looks like a jump. Above about 400ms, it starts to feel like waiting. Most interface motion should live between those, and three steps is enough to express small, medium and large.

The bigger the thing that moves, and the further it travels, the longer it gets. A tooltip that takes 320ms feels sluggish. A full-screen panel at 120ms feels like a glitch.

## One easing curve

*Easing* describes how speed changes during an animation. A linear animation moves at constant speed and looks robotic. Real objects accelerate and decelerate.

Accent uses one curve for almost everything: **cubic-bezier(0.16, 1, 0.3, 1)**. It's an "ease-out" shape that starts fast and settles gently. Things arrive quickly and come to rest softly, like a drawer closed by a good hinge. Because the fast part is at the start, the interface feels responsive. Because the slow part is at the end, the eye has time to see where things landed.

One curve across the whole product makes motion feel consistent in the same way one typeface does.

## Reduced motion

Some people get dizzy, nauseous or disoriented from on-screen movement, particularly large sliding, zooming and parallax effects. This is called *vestibular sensitivity*, and it affects a lot more people than most designers assume, including many with migraines and inner-ear conditions.

Every major operating system has a setting for this, and browsers expose it as \`prefers-reduced-motion: reduce\`. When it's on, Accent replaces movement with simple opacity fades, or removes the animation entirely. Content still appears; it just doesn't travel. This is not optional and not an "accessibility mode" add-on. It's part of the default build.

## What never animates

Some things should simply stay still:

- **Body text.** No typewriter effects, no words sliding in as you scroll. People are trying to read.
- **Layout on load.** Content shouldn't fly in from the sides when a page opens. It should just be there.
- **Numbers that matter.** Counting animations on prices or balances look clever and make people wait to learn how much they owe.
- **Anything looping forever.** Spinning logos, bouncing arrows, pulsing badges. If it moves for more than five seconds, it needs a pause control, and it probably shouldn't exist.
- **Focus rings.** They must appear instantly.
- **Error messages.** Shaking forms are cute once and then cruel.

Loading spinners are the one honest loop, and they should be replaced by skeletons or progress bars whenever the wait is predictable.

## The Accent rule

120, 200 or 320ms. One curve: cubic-bezier(0.16, 1, 0.3, 1). Respect prefers-reduced-motion everywhere. Text, prices, focus rings and errors stay still.

> **Why:** Motion in an editorial product exists to orient the reader—showing where a sheet came from or confirming a state change—never to show off.

::demo:motion-playground::

::demo:motion-never::`,
    guidelines: `## Live Do & Don't comparisons

::demo:motion-do-duration::

::demo:motion-do-properties::

## Do
- Use 120ms for feedback, 200ms for appear/disappear, 320ms for large moves.
- Use \`cubic-bezier(0.16, 1, 0.3, 1)\` for entrances and most transitions.
- Animate only \`transform\` and \`opacity\` for smooth performance.
- Wrap motion in \`prefers-reduced-motion\` checks, falling back to fades.
- Make motion explain where something came from or went.

## Don't
- Don't animate body text, prices or balances.
- Don't run animations longer than 400ms.
- Don't loop animations indefinitely.
- Don't animate \`width\`, \`height\`, \`top\` or \`left\`; they cause jank.
- Don't shake forms on error.
- Don't use parallax on content people need to read.

## When to animate
- State changes the person caused: open, close, select, submit.

## When not to
- Page load, scroll reveals of text, anything decorative.`,
    specs: `## Duration scale redline and GPU-safe properties

::demo:motion-redline-durations::

::demo:motion-transform-only::

| Tier | Duration | Easing curve | Typical use |
|---|---|---|---|
| Micro | \`120ms\` | \`cubic-bezier(0.16, 1, 0.3, 1)\` | Button press, toggle thumb, hover tint |
| Standard | \`200ms\` | \`cubic-bezier(0.16, 1, 0.3, 1)\` | Popover open, tab indicator, toast enter |
| Sheet / Modal | \`320ms\` | \`cubic-bezier(0.16, 1, 0.3, 1)\` | Mobile bottom sheet slide, drawer |
| Reduced motion | \`0ms\` | \`none\` | Instant opacity swap when \`prefers-reduced-motion: reduce\` |

## Tokens
- \`--duration-fast: 120ms\`
- \`--duration-base: 200ms\`
- \`--duration-slow: 320ms\`
- \`--ease-accent: cubic-bezier(0.16, 1, 0.3, 1)\`

## Reduced motion
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
\`\`\`

## Snippet
\`\`\`tsx
import { motion, useReducedMotion } from 'framer-motion';

export function Panel({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduce ? 0.12 : 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
\`\`\``,
    accessibility: `## Honouring prefers-reduced-motion

::demo:motion-ax-reduced::

::demo:motion-reduced-compare::

## Requirements
- WCAG 2.3.3 (Animation from Interactions, AAA): motion triggered by interaction can be disabled. Honour \`prefers-reduced-motion\`.
- WCAG 2.2.2 (Pause, Stop, Hide): anything moving, blinking or scrolling for more than 5 seconds needs a pause control.
- WCAG 2.3.1 (Three Flashes): nothing flashes more than three times per second.

## Screen readers
- Animations are invisible to screen readers. Announce state changes with live regions (\`aria-live="polite"\`), not motion alone.
- Don't move focus during an animation; move it once the element has arrived.

## Testing
- Turn on Reduce Motion in macOS (Accessibility → Display) or emulate it in Chrome DevTools Rendering and check every flow.`,
  },
  rules: [
    {
      id: 'motion.durations',
      statement: 'Use only transition and animation durations of 120ms, 200ms or 320ms.',
      why: 'A short duration scale feels consistent and never makes people wait.',
      violationPattern: 'duration-(75|100|150|300|500|700|1000)\\b',
    },
    {
      id: 'motion.easing',
      statement: 'Use cubic-bezier(0.16, 1, 0.3, 1) as the easing curve.',
      why: 'One curve makes motion feel like one product; ease-out feels responsive.',
      violationPattern: '\\b(ease-linear|ease-in)\\b',
    },
    {
      id: 'motion.reduced',
      statement: 'Every animation must respect prefers-reduced-motion by switching to a fade or no animation.',
      why: 'Movement makes people with vestibular sensitivity dizzy or sick.',
    },
    {
      id: 'motion.never-animate',
      statement: 'Never animate body text, prices, balances, focus rings or error messages.',
      why: 'These need to be read or noticed immediately.',
    },
    {
      id: 'motion.transform-opacity',
      statement: 'Animate only transform and opacity.',
      why: 'Animating layout properties causes stutter on slower devices.',
      violationPattern: 'transition-\\[(width|height|top|left)\\]',
    },
  ],
};
