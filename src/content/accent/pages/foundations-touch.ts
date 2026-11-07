import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/touch',
  section: 'foundations',
  kind: 'doc',
  title: 'Touch Targets & Input',
  summary: 'Fingers are not cursors: 44px targets, 8px gaps, thumb zones, visible focus and polite validation.',
  readingMinutes: 5,
  tabs: {
    overview: `## Fingers are not cursors

A mouse pointer is one pixel wide and perfectly steady. A fingertip covers roughly 10 millimetres of glass, blocks the very thing it's touching, and belongs to someone who might be walking, riding a bus, or holding a coffee in the other hand. Interfaces designed for the mouse and shipped to phones are full of tiny traps.

This page is about making controls easy to hit, easy to find with a keyboard, and polite when something goes wrong.

## 44 by 44

Every interactive element in Accent has a **target of at least 44×44px**. A *target* is the area that responds to a tap, not necessarily the visible shape. A 20px icon can sit inside a 44px button. A text link in a list can have padding that extends its tappable area.

Why 44? It's Apple's long-standing guideline, and it maps to the size of an adult fingertip at typical screen densities. WCAG 2.2 sets a lower legal floor of 24px, but 24 is the minimum before something is broken, not the size at which it's comfortable. People with tremors, arthritis, or just cold hands hit 44 reliably. They miss 24 constantly.

## 8px between targets

Two 44px buttons pressed against each other are still easy to mis-tap. Keep **at least 8px** between adjacent targets. It's one step on the spacing scale and it saves an enormous number of wrong taps, especially for destructive pairs like "Save" and "Delete."

::demo:touch-targets::

## Thumb zones

Most people hold a phone in one hand and tap with the thumb. That thumb comfortably reaches the bottom and middle of the screen and strains to reach the top corners, especially on large phones.

- **Easy:** the bottom third and centre. Put primary actions here: a checkout button, a compose button, a bottom tab bar.
- **Stretch:** the middle edges. Fine for secondary actions.
- **Hard:** the top corners. Fine for things people rarely need: settings, account menus. Not fine for "Next" in a multi-step form.

That's why so many good mobile apps put their main navigation at the bottom. It's not fashion. It's anatomy.

## Hover is a bonus

Hover only exists for mice and trackpads. On a touchscreen there is no hover, and on a keyboard there's nothing to hover with. So hover can **add** information but must never **hold** it. A tooltip that explains a button is fine if the button also has a label. A menu that only opens on hover locks out everyone on a phone.

CSS lets you check: \`@media (hover: hover)\` applies styles only on devices that can actually hover.

## Focus you can see

Many people don't use a mouse at all. They tab through pages with a keyboard, use switch devices, or navigate by voice. For them, the *focus ring*, the outline showing which element is active, is the cursor. Removing it is like hiding the mouse pointer.

Accent uses \`:focus-visible\`, which shows the ring for keyboard users and hides it after mouse clicks, so nobody has to choose between accessibility and tidiness. The ring is 2px of accent pink, offset 2px from the element, so it's visible on every surface.

## Validation that waits

The old way of form validation was aggressive: you click into an email field, type one letter, and it turns red and shouts "Invalid email!" You haven't finished typing.

CSS now has \`:user-valid\` and \`:user-invalid\`. They only apply **after the person has interacted with the field and moved on**. So errors appear when they're useful, not while someone is mid-thought. Pair the state with a written message (never colour alone) and put it right under the field, not in a list at the top of the form.

Also give the browser hints: the right \`type\` (email, tel, number), \`inputmode\`, and \`autocomplete\`. A phone keyboard that opens with numbers for a phone field is the kind of small kindness people notice without knowing why.

## The Accent rule

44×44 targets with 8px between. Primary actions within thumb reach. Hover adds, never hides. Focus rings always visible to keyboards. Validate after the person moves on.

> **Why:** Designing for a 44×44px fingertip and late validation (\`:user-valid\` / \`:user-invalid\`) makes forms calmer on both phones and desktops.

::demo:touch-thumb-reach::

::demo:touch-user-valid::`,
    guidelines: `## Live Do & Don't comparisons

::demo:touch-do-size::

::demo:touch-do-spacing::

## Do
- Make every target at least 44×44px, extending with padding if the visual is smaller.
- Leave 8px or more between adjacent targets.
- Put primary mobile actions in the bottom third of the screen.
- Use \`:focus-visible\` with a 2px accent outline and 2px offset.
- Use \`:user-invalid\` for error styling, with a text message under the field.
- Set \`type\`, \`inputmode\` and \`autocomplete\` on inputs.

## Don't
- Don't remove outlines with \`outline: none\` without a replacement.
- Don't put essential information or menus behind hover.
- Don't place destructive and confirm buttons touching each other.
- Don't validate on every keystroke.
- Don't put "Next" in the top corner of a mobile form.

## When to use a bottom bar
- Mobile apps with 3–5 top-level destinations.

## When not to
- Content sites where reading is the main task; use a top header that hides on scroll.`,
    specs: `## Hit-area redline and target scale

::demo:touch-redline-hitarea::

::demo:touch-target-sizes::

| Control type | Visual size | Minimum hit target | Minimum gap between targets | Focus ring |
|---|---|---|---|---|
| Primary / Secondary button | \`32px–44px\` tall | \`44×44px\` | \`8px\` | \`2px solid #D44983\`, \`2px\` offset |
| Icon-only toolbar button | \`16px–20px\` glyph | \`44×44px\` | \`8px\` | \`2px solid #D44983\` |
| Checkbox / Radio row | \`18×18px\` box | \`44px\` full label row | \`4px\` vertical | \`2px\` ring on input |
| Mobile sheet nav link | \`16px\` text | \`48px\` full width | \`1px\` divider | Inset \`2px\` ring |

## Tokens
- \`--target-min: 44px\`
- \`--target-gap: 8px\`
- \`--focus-ring: 2px solid #D44983\`
- \`--focus-offset: 2px\`
- Input height: 44px (48px on mobile forms)

## CSS
\`\`\`css
:focus-visible { outline: 2px solid #D44983; outline-offset: 2px; }
input:user-invalid { border-color: #B91C1C; }
@media (hover: hover) { .card:hover { border-color: #111827; } }
\`\`\`

## Snippet
\`\`\`tsx
export function EmailField() {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm">Email</span>
      <input
        type="email"
        autoComplete="email"
        inputMode="email"
        required
        aria-describedby="email-error"
        className="peer h-11 rounded-lg border border-[#E8E2D5] px-3 user-invalid:border-red-700"
      />
      <span id="email-error" className="hidden text-[13px] text-red-800 peer-user-invalid:block">
        Enter an email like name@example.com.
      </span>
    </label>
  );
}
\`\`\``,
    accessibility: `## Keyboard focus-visible rings

::demo:touch-ax-focus::

## Requirements
- WCAG 2.5.8 (Target Size Minimum, AA): 24×24px floor. Accent requires 44×44px (matches 2.5.5, AAA).
- WCAG 2.4.7 (Focus Visible): every focusable element shows a visible indicator.
- WCAG 2.4.13 (Focus Appearance, AAA): ring at least 2px thick with 3:1 contrast.
- WCAG 1.4.13 (Content on Hover or Focus): hover content must be dismissible, hoverable and persistent.
- WCAG 3.3.1 (Error Identification) and 3.3.3 (Error Suggestion): describe errors in text and suggest a fix.
- WCAG 1.3.5 (Identify Input Purpose): use \`autocomplete\` tokens.

## Keyboard
- Every action reachable by Tab, activated by Enter or Space.
- Tab order follows visual order.

## Screen readers
- Link error messages with \`aria-describedby\`; set \`aria-invalid="true"\` when invalid.`,
  },
  rules: [
    {
      id: 'touch.min-target',
      statement: 'Every interactive element must have a tappable area of at least 44x44px.',
      why: 'Fingers are about 10mm wide and often unsteady.',
      violationPattern: '<button[^>]*\\b(h-(6|7|8|9|10)|w-(6|7|8|9|10))\\b',
    },
    {
      id: 'touch.gap',
      statement: 'Leave at least 8px between adjacent interactive targets.',
      why: 'Touching targets cause wrong taps, especially on destructive actions.',
    },
    {
      id: 'touch.focus-visible',
      statement: 'Never remove focus outlines without a :focus-visible replacement of 2px solid accent with 2px offset.',
      why: 'For keyboard users the focus ring is the cursor.',
      violationPattern: '(outline:\\s*none|outline-none)(?![^"]*focus-visible)',
    },
    {
      id: 'touch.no-hover-only',
      statement: 'Do not hide essential content or menus behind hover.',
      why: 'Touchscreens and keyboards cannot hover.',
    },
    {
      id: 'touch.user-valid',
      statement: 'Style validation with :user-valid and :user-invalid and show a text message under the field.',
      why: 'Errors should appear after someone finishes, not while they type.',
    },
  ],
};
