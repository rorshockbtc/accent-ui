import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'patterns/states',
  section: 'patterns',
  title: 'Empty, Loading & Error',
  summary: 'The screens nobody designs: what people see before data arrives, when there is none, and when something breaks.',
  readingMinutes: 5,
  kind: 'doc',
  tabs: {
    overview: `## The other half of your product

Designers draw the screen full of perfect data. Users spend a surprising amount of time on the other screens: the empty room on day one, the half-second while a list loads, the moment the Wi-Fi drops mid-save. These states decide whether a product feels trustworthy. A blank white box with a spinner says "we did not think about you." A clear sentence with a next step says "we did."

## Empty states

An empty state appears when there is nothing to show yet. There are three kinds, and they need different words.

- **First use.** The room is new. Explain what will appear here and offer the one action that fills it: "Your library is empty. Add your first essay."
- **No results.** A search or filter found nothing. Repeat what they searched for and suggest a way out: "No recipes match 'saffron'. Clear filters or try a broader word."
- **Cleared.** The user finished everything. Celebrate briefly: "Inbox zero. Go outside."

### Anatomy

- **Illustration or icon (optional).** One quiet mark, 48–96px. Never a cartoon that takes more room than the text.
- **Headline.** What is happening, in plain words.
- **Body.** One sentence on why or what next.
- **Action.** One button that fixes it. Owners only; visitors get no action they cannot take.

## Loading states

People tolerate waiting when they can see progress. Under 300ms, show nothing; a flash of spinner is worse than a tiny delay. Between 300ms and 2s, show skeletons: placeholder blocks in the card color at the exact size of the content coming, so nothing jumps when it arrives. Over 2s, add words: "Loading your library…" Over 10s, show real progress or let people leave and come back.

Load the important part first. Text before images. The title before the comments. Never block a whole page on its slowest widget.

## Error states

Errors are your fault until proven otherwise. Write them like a person who is sorry and helpful.

- **Say what happened** in plain words: "We couldn't save your changes."
- **Say why** if you know: "You're offline."
- **Say what to do**: "We'll retry when you're back online, or copy your text now."
- **Keep their work.** Never clear a form on error.

Inline errors sit next to the thing that failed. Page-level errors replace only the broken region, not the navigation. A full error page is for when nothing works, and it still includes a home link.

## When to use

Every component that loads data needs all three designed: empty, loading, error. If the design file does not include them, the design is not finished.

## The Accent rule

Every state has words and a way forward. A spinner alone is not a state; it is a shrug.
## Every state, side by side

::demo:states-matrix::

> **Why:** Happy-path screens are the minority of what users see. Empty, slow, broken and offline are the screens that decide whether they trust the product.
`,
    guidelines: `## Do

- Design empty, loading and error states for every data view.
- Use skeletons sized like the real content.
- Delay loading indicators by 300ms.
- Write errors that say what happened, why, and what to do.
- Preserve user input after any error.

## Don't

- Don't show a lone spinner for more than two seconds.
- Don't blame the user ("You entered invalid data").
- Don't show raw error codes or stack traces without a human sentence.
- Don't replace the whole page when one widget fails.
- Don't use cute illustrations bigger than the message.

## When to use

- Any list, feed, search, form submission or remote data view.

## When not to

- Static content that cannot fail or be empty.
::demo:states-do-empty::

::demo:states-do-error::

## Skeletons
Match the real layout. A skeleton that does not look like the content makes the jump when it loads feel worse than a spinner.
`,
    specs: `## Tokens

- Empty icon: 48px (inline) to 96px (full page), muted ink.
- Empty headline: UI sans 18px weight 600; body 14px, max 48ch.
- Vertical padding: 48px inline, 96px full page.
- Skeleton: Card #F3EFE9, pulse 1.5s, disabled under reduced motion.
- Loading delay: 300ms before showing indicators.
- Error text: destructive color at 7:1, with icon; 13px minimum.
- Retry button: outline variant, 44px hit area.

## Usage

\`\`\`tsx
if (status === 'loading') return <CardSkeleton count={6} />;
if (status === 'error') return (
  <div role="alert" className="py-12 text-center">
    <p className="text-lg font-semibold">We couldn't load your library.</p>
    <p className="text-sm text-muted-foreground">Check your connection and try again.</p>
    <Button variant="outline" onClick={retry} className="mt-4">Try again</Button>
  </div>
);
if (items.length === 0) return <EmptyLibrary onAdd={openComposer} />;
\`\`\`
## Redline

::demo:states-redline-skeleton::

## State matrix

| State | Icon | Message | Action | Live region |
|---|---|---|---|---|
| Empty | Inbox | What is missing | Add the first one | none |
| Loading | Skeleton | none | none | role=status |
| Error | Triangle | What failed, input kept | Try again | role=alert |
| Offline | Wifi off | Shows saved copy and time | none | role=status |
| Partial | none | Showing 2 of 3 | Retry the rest | role=status |
| Success | Check | What was saved | Optional next step | role=status |
`,
    accessibility: `## Requirements

- **Errors announced.** Use \`role="alert"\` for blocking errors and \`aria-live="polite"\` for status (WCAG 4.1.3).
- **Error identification.** Describe errors in text (WCAG 3.3.1) with suggestions (WCAG 3.3.3).
- **Loading.** Mark loading regions \`aria-busy="true"\`; announce completion politely.
- **Skeletons.** Hide decorative skeletons from screen readers with \`aria-hidden="true"\`.
- **Motion.** Stop skeleton pulses under \`prefers-reduced-motion\` (WCAG 2.3.3).
- **Focus.** After a failed submit, move focus to the error message.
- **Timeouts.** Warn before session timeouts and allow extension (WCAG 2.2.1).
## Live: announcing changes

::demo:states-ax-announce::
`,
  },
  rules: [
    {
      id: 'states.all-three',
      statement: 'Every data-driven view implements empty, loading and error states.',
      why: 'Users see these states often; missing ones look broken.',
    },
    {
      id: 'states.words-not-spinner',
      statement: 'Loading longer than 2 seconds shows text, not a spinner alone.',
      why: 'Words reassure people that something is happening.',
    },
    {
      id: 'states.error-actionable',
      statement: 'Error messages say what happened and what to do next, and offer a retry when possible.',
      why: 'An error without a next step is a dead end.',
      violationPattern: '(Something went wrong|An error occurred)[.!]?\\s*["\'<]',
    },
    {
      id: 'states.preserve-input',
      statement: 'Never clear user input when an error occurs.',
      why: 'Retyping is the fastest way to lose a user.',
    },
    {
      id: 'states.alert-role',
      statement: 'Blocking error containers use role="alert".',
      why: 'Screen reader users need to hear that something failed.',
    },
    {
      id: 'states.skeleton-matches',
      statement: 'Skeletons copy the real layout: same rows, same heights, same gaps.',
      why: 'Layout shift on load feels like a glitch.',
    },
    {
      id: 'states.partial-honest',
      statement: 'When some data fails, show what loaded and say how many are missing.',
      why: 'Hiding the gap makes users trust incomplete data.',
    },
  ],
};
