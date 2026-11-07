import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/input',
  section: 'components',
  title: 'Inputs & Forms',
  summary: 'Labels above, errors in words, and fields sized for the answer you expect.',
  readingMinutes: 5,
  kind: 'doc',
  tabs: {
    overview: `## Forms are conversations

A form is you asking someone questions. Most bad forms are bad for the same reason bad small talk is bad: they ask too much, too early, in a confusing order, and then scold you for the answer.

Accent forms ask the fewest questions possible, explain why each one matters, and tell you in plain words when something is wrong. If you can work out the answer yourself (a city from a postcode, a card type from its first digits), do not ask.

> **Why:** Persistent labels above fields and plain-English error messages below prevent the "what was this box asking for?" memory tax once a person starts typing.

::demo:input-states::

## Anatomy of a field

- **Label.** Above the field, always visible, 13px or larger. Placeholders are not labels. They vanish the moment someone starts typing, which is exactly when they would like to double-check what was asked.
- **Field.** The box. 32px drawn height on desktop with a 1px border and an 8px radius on Pipes inputs. On touch screens the tappable height grows to 44px.
- **Helper text (optional).** Below the field, muted, one line. "We only use this for receipts."
- **Error message.** Replaces or joins the helper text when validation fails. It says what is wrong and how to fix it: "Enter a date after today", not "Invalid input."
- **Optional marker.** Mark the rare optional field "(optional)" rather than starring every required one. Most fields should be required, or they should not be there.

## States

- **Rest.** Thin border, transparent fill.
- **Hover.** Slight border darkening on pointer devices.
- **Focus.** Border shifts to the ring color plus a 3px soft ring. Never remove it.
- **Filled.** Same as rest. Do not turn fields green when they are merely filled in.
- **Error.** Destructive border and ring, plus an error message in words with an icon.
- **Disabled.** 50% opacity, not focusable. Use read-only instead when people need to copy the value.

## Validation timing

Validate when the person leaves the field, not on every keystroke. Shouting "invalid email" after the first letter is rude. On submit, move focus to the first error and list all errors in a summary at the top for long forms.

## Size the field to the answer

A field's width is a hint. A postcode field as wide as the page suggests a paragraph. A one-line field for a bio suggests a tweet. Match the box to the expected answer, on the 8px grid.

## When to use

Text inputs for short free text. Text areas for anything over a sentence. Selects when there are more than five fixed options, radio buttons when there are five or fewer (people can see all choices at once). Switches for settings that apply instantly, checkboxes for choices confirmed with a button.

## The Accent rule

Labels above fields, errors in words, one column. Multi-column forms make people zigzag and skip fields.

## Match field width to the expected answer

::demo:input-width-to-answer::`,
    guidelines: `## Live Do & Don't comparisons

::demo:input-do-label::

::demo:input-do-error::

## Do

- Put labels above fields and keep them visible.
- Use one column for forms.
- Write errors that say how to fix the problem.
- Use the correct input type (\`email\`, \`tel\`, \`number\` with \`inputMode\`) so phones show the right keyboard.
- Support autofill with proper \`autocomplete\` values.

## Don't

- Don't use placeholder text as the only label.
- Don't validate on every keystroke.
- Don't clear the form after an error.
- Don't split phone numbers or dates into multiple fields unless you must.
- Don't ask for information you can derive or do not need.

## When to use

- Text input: names, emails, short answers.
- Textarea: messages, descriptions.
- Radio group: five or fewer exclusive options.
- Select: more than five options.

## When not to

- Don't use a select for yes/no; use radios or a checkbox.`,
    specs: `## Input field redline and state table

::demo:input-redline::

| State | Border | Background | Helper / Error text | ARIA attributes |
|---|---|---|---|---|
| Rest | \`1px solid #111827/25\` | \`#FFFFFF\` | \`#4B5563\` (\`13px\`) | \`aria-describedby\` |
| Focus | \`2px ring #D44983\` | \`#FFFFFF\` | \`#4B5563\` | — |
| Invalid (\`:user-invalid\`) | \`2px solid #9F1239\` | \`#FFFFFF\` | \`#9F1239\` + icon | \`aria-invalid="true"\` |
| Disabled | \`1px solid #111827/12\` | \`#F3EFE9\` | \`#4B5563\` | \`disabled\` |

## Tokens

- Field height: 32px drawn (\`h-8\`), 44px tappable on touch.
- Padding: 10px horizontal, 4px vertical.
- Border: 1px \`border-input\`; radius 8px (\`rounded-lg\`).
- Font: 16px on mobile (prevents iOS zoom), 14px from \`md\`.
- Label: 13–14px, weight 500, 8px above the field.
- Helper/error: 13px, 8px below the field.
- Field to field: 24px.

## Usage

\`\`\`tsx
import { Input } from '@/components/ui/input';

<div className="grid gap-2">
  <label htmlFor="email" className="text-sm font-medium">Email</label>
  <Input id="email" type="email" autoComplete="email" aria-describedby="email-help" />
  <p id="email-help" className="text-[13px] text-muted-foreground">We send receipts here.</p>
</div>
\`\`\`

## Error

\`\`\`tsx
<Input id="date" aria-invalid="true" aria-describedby="date-err" />
<p id="date-err" className="text-[13px] text-destructive">Enter a date after today.</p>
\`\`\``,
    accessibility: `## Focus order and assistive announcements

::demo:input-ax-focus-order::

::demo:input-ax-sr::

## Requirements

- **Labels.** Every field has a programmatic label via \`<label htmlFor>\` (WCAG 1.3.1, 3.3.2).
- **Errors.** Identified in text and linked with \`aria-describedby\`; set \`aria-invalid="true"\` (WCAG 3.3.1, 3.3.3).
- **Focus.** Visible focus ring with 3:1 contrast (WCAG 2.4.7).
- **Target size.** 44px tall tap area on touch devices.
- **Autocomplete.** Use \`autocomplete\` tokens for personal data (WCAG 1.3.5).
- **Text size.** 16px minimum on mobile inputs to prevent forced zoom.

## Keyboard

- Tab moves through fields in visual order.
- Enter submits single-line forms.
- On submit with errors, focus moves to the error summary or first invalid field.

## Screen readers

Group related radios and checkboxes in a \`<fieldset>\` with a \`<legend>\`.`,
  },
  rules: [
    {
      id: 'input.visible-label',
      statement: 'Every input must have a visible label element linked by htmlFor; placeholders are not labels.',
      why: 'Placeholders disappear when typing starts and are often low contrast.',
    },
    {
      id: 'input.error-in-words',
      statement: 'Error states must include a text message saying how to fix the problem, linked via aria-describedby.',
      why: 'A red border alone does not tell anyone what went wrong.',
    },
    {
      id: 'input.single-column',
      statement: 'Lay out forms in a single column.',
      why: 'Multi-column forms cause skipped fields and zigzag reading.',
    },
    {
      id: 'input.mobile-16px',
      statement: 'Input text must be at least 16px on mobile breakpoints.',
      why: 'iOS zooms the page on focus for smaller text, breaking the layout.',
    },
    {
      id: 'input.min-text',
      statement: 'Labels and helper text must be at least 13px.',
      why: 'Below 13px, helper text becomes unreadable for many people.',
      violationPattern: 'text-\\[(8|9|10|11|12)px\\]',
    },
  ],
};
