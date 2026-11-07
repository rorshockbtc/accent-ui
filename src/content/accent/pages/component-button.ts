import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/button',
  section: 'components',
  title: 'Button',
  summary: 'One primary action per view, honest labels, and a hit area no thumb can miss.',
  readingMinutes: 4,
  kind: 'doc',
  tabs: {
    overview: `## What a button is for

A button does something. A link goes somewhere. That single distinction settles most arguments about buttons before they start. If clicking it saves, sends, deletes, buys or opens a dialog, it is a button. If it takes you to another page, it is a link, even when it is dressed up to look like a button.

People skim interfaces the way they skim a menu at a crowded bar. They look for the one thing that will get them what they came for. Your job is to make that thing obvious and to make everything else quieter.

> **Why:** One primary button per view answers "what happens next?" at a glance; two competing solid buttons force the person to stop and decode which action is actually primary.

::demo:button-states::

## Anatomy

A Pipes button has four parts, and only one of them is optional.

- **Container.** The rectangle. In Pipes it is square-cornered (\`rounded-none\`) so it sits on the same grid as cards and inputs. Height is 32px visually for the default size, 36px for large.
- **Label.** A verb, in sentence case: "Save draft", "Send invoice", "Delete room". Never "Click here", never "Submit" when you know what is being submitted.
- **Icon (optional).** 16px, leading or trailing. An icon supports the label. It does not replace it unless the button is a well-known icon-only control, like a close X, and then it needs an accessible name.
- **Hit area.** The part you cannot see. The tappable region must be at least 44×44px even when the drawn container is 32px tall. We extend it with padding or a pseudo-element, never by shrinking the target.

## Variants

The component ships six variants. Think of them as volume levels.

- **Default (primary).** Solid ink or room accent. One per view. This is the answer to "what should I do here?"
- **Secondary.** A tinted fill for the second most likely action.
- **Outline.** Bordered, for actions that sit beside a primary without competing with it.
- **Ghost.** No fill until hover. Toolbars, table rows, dense settings.
- **Destructive.** A soft red wash. It should look a little uncomfortable, because the action is.
- **Link.** Text with an underline on hover, for inline actions in prose.

## States

Every button must show what it is doing. The states are rest, hover, focus-visible, active (a 1px press down), disabled, and loading. Loading keeps the button's width so the layout does not jump, swaps the label for a short progress word ("Saving…"), and blocks double submission. Disabled buttons fade to 50% opacity, which is exactly why you should use them sparingly: a greyed button tells the user "no" without telling them why. Prefer leaving the button active and explaining the problem on click.

## When to use

Use a button when the user commits to an action on this screen. Use a link for navigation. Use a toggle or switch for a setting that takes effect immediately. Use a menu when you have more than three related actions competing for the same space.

## The Accent rule

One primary per view. If you find yourself wanting two, you have two views, or you have not decided what the page is for yet. Decide first, then draw the button.`,
    guidelines: `## Live Do & Don't comparisons

::demo:button-do-one-primary::

::demo:button-do-verb-label::

::demo:button-do-link-vs-button::

## Do

- Write labels as verb + noun: "Publish page", "Add room".
- Put the primary action where the eye finishes reading: bottom right of dialogs, end of forms.
- Keep the width stable across loading and success states.
- Pair a destructive action with a confirmation that names the thing being destroyed.

## Don't

- Don't place two default (primary) buttons side by side.
- Don't use a button to navigate between pages. Use a link styled as a button if you must.
- Don't write "OK", "Yes" or "Submit" when a specific verb exists.
- Don't rely on color alone to separate destructive from safe actions. The label must say it.
- Don't disable a button without visible text explaining what is missing.

## When to use

- Committing a form, opening a dialog, starting a process, confirming a choice.

## When not to

- Moving to another URL (use a link).
- Turning a setting on or off instantly (use a switch).
- Five or more sibling actions (use a menu or a toolbar of ghost buttons).`,
    specs: `## Size & anatomy redlines

::demo:button-redline-sizes::

::demo:button-redline-anatomy::

| Size | Drawn height | Hit-area height | Horizontal padding | Font size | Icon size |
|---|---|---|---|---|---|
| \`xs\` | \`24px\` | \`44px\` (extended) | \`8px\` | \`12px\` | \`12px\` |
| \`sm\` | \`28px\` | \`44px\` (extended) | \`10px\` | \`13px\` | \`14px\` |
| \`default\` | \`32px\` | \`44px\` (extended) | \`12px\` | \`14px\` | \`16px\` |
| \`lg\` | \`44px\` | \`44px\` | \`20px\` | \`15px\` | \`18px\` |

## Tokens

- Font: UI sans, 14px (\`text-sm\`), weight 500.
- Radius: 0 (\`rounded-none\`).
- Focus ring: 3px, \`ring-ring/50\`.
- Gap between icon and label: 6px default, 4px for small sizes.
- Icon size: 16px default, 14px small, 12px extra-small.

## Sizes

- **xs:** 24px drawn height. Dense toolbars only, hit area extended to 44px.
- **sm:** 28px drawn height.
- **default:** 32px drawn height, 10px horizontal padding.
- **lg:** 36px drawn height.
- **icon:** 32×32 square, hit area 44×44.

Drawn heights are allowed to sit on the 4px half-step. Hit areas are not negotiable.

## Spacing

- Space between adjacent buttons: 8px.
- Space between a form's last field and its actions: 24px.

## Usage

\`\`\`tsx
import { Button } from '@/components/ui/button';

<div className="flex gap-2">
  <Button variant="outline">Cancel</Button>
  <Button>Publish page</Button>
</div>
\`\`\`

## Extending the hit area

\`\`\`tsx
<Button size="icon" variant="ghost" aria-label="Close" className="relative after:absolute after:-inset-1.5">
  <X />
</Button>
\`\`\``,
    accessibility: `## Hit-area extension and focus order

::demo:button-ax-hitarea::

::demo:button-ax-focus-order::

## Requirements

- **Name.** Every button needs an accessible name. Icon-only buttons need \`aria-label\` (WCAG 4.1.2).
- **Target size.** At least 44×44px hit area (WCAG 2.5.5 AAA; 2.5.8 sets the AA floor at 24px, we aim higher).
- **Keyboard.** Reachable with Tab, activated with Enter and Space. Native \`<button>\` gives you this for free; a \`<div onClick>\` does not.
- **Focus.** Visible focus ring with at least 3:1 contrast against the surface (WCAG 2.4.7, 1.4.11).
- **Contrast.** Label text at 7:1 against the button fill on room surfaces.

## Screen readers

- Loading: set \`aria-busy="true"\` and announce the result through a polite live region.
- Toggle buttons use \`aria-pressed\`.
- Buttons that open menus use \`aria-haspopup\` and \`aria-expanded\`.

## Disabled buttons

Disabled native buttons drop out of the tab order, so keyboard users may never learn they exist. If the reason matters, use \`aria-disabled="true"\` and keep the button focusable, then explain on activation.`,
  },
  rules: [
    {
      id: 'button.one-primary',
      statement: 'Render at most one default (primary) variant Button per view.',
      why: 'Two loud buttons force the user to stop and decide which one you meant.',
    },
    {
      id: 'button.hit-area-44',
      statement: 'Every button and icon button must have a tappable area of at least 44×44px.',
      why: 'Thumbs are about 45px wide. Smaller targets cause mis-taps.',
    },
    {
      id: 'button.verb-label',
      statement: 'Button labels must be specific verbs, not "Click here", "OK" or "Submit".',
      why: 'A specific verb tells people what will happen before they commit.',
      violationPattern: '>\\s*(Click here|Submit|OK)\\s*</(Button|button)>',
    },
    {
      id: 'button.no-div-click',
      statement: 'Use a native button element or the Button component, never a div or span with onClick.',
      why: 'Divs get no keyboard support or accessible role.',
      violationPattern: '<(div|span)[^>]*onClick=',
    },
    {
      id: 'button.icon-needs-label',
      statement: 'Icon-only buttons must include an aria-label.',
      why: 'Screen readers otherwise announce "button" with no clue to its purpose.',
    },
  ],
};
