import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/select',
  section: 'components',
  title: 'Select & Combobox',
  summary: 'Choosing one option from a list: when to use native <select>, when to upgrade to a searchable combobox, and when radio buttons beat both.',
  readingMinutes: 6,
  tabs: {
    overview: `## Stop hiding four options behind a dropdown

The most overused control on the web is a custom dropdown menu holding three or four choices. It forces two clicks instead of one, hides the alternatives until opened, and often breaks mobile wheel pickers and keyboard type-ahead.

Accént divides single-choice selection into three clear tiers based on option count:

1. **2 to 5 options → Radio group or Segmented control.** Keep every choice visible on the page so people can compare and pick in a single tap. See [Checkbox, Radio & Switch](/design-system/components/selection-controls).
2. **6 to 15 options → Native \`<select>\`.** Uses the operating system's native wheel or menu, supports instant keyboard type-ahead, works offline with zero JavaScript, and never clips inside modals.
3. **16+ options (or dynamic search) → Combobox.** A text input paired with a filtered listbox (\`role="combobox"\`) so people can type three letters to narrow 200 rooms, countries, or typefaces down to two.

> **Why:** Native \`<select>\` gives you OS-grade touch ergonomics, screen-reader announcements, and hardware keyboard navigation for free. Only replace it when search filtering is genuinely needed.

::demo:select-native-vs-custom::

## Searchable combobox with empty state

When a list passes 15 items—such as picking a typeface or searching a pipe directory—a combobox lets the person filter as they type and shows a clear recovery message when nothing matches.

::demo:select-combo::

## Grouping, defaults, and keyboard ergonomics

When a native \`<select>\` holds 8 to 15 items that fall into natural categories—such as light rooms versus dark rooms, or serif typefaces versus sans-serif typefaces—wrap related options in \`<optgroup label="...">\`. Group headings break up a wall of text and let people scan by category before reading individual rows.

Always choose an honest initial state:

- **When a sensible default exists** (such as *Gallery (Light)* for a new pipe or *1×* for audio playback speed), pre-select it so the person can skip the field entirely if the default suits them.
- **When the person must make a conscious choice** (such as picking a billing tier or destructive export target), start with a disabled placeholder option (\`<option value="" disabled>Select a destination pipe…</option>\`) and validate on form submit.

Never trigger a full page navigation the instant a native \`<select>\` value changes (\`onChange\`), because keyboard users arrowing through options in Firefox and Windows browsers fire \`change\` events on every step. If selecting an item navigates to a new URL, use a disclosure menu of links instead of a form \`<select>\`.`,
    guidelines: `## Prefer visible radios for 5 or fewer options

If you only have three billing intervals or four room moods, lay them out as radio cards or a segmented control instead of burying them in a select menu.

::demo:select-do-native::

## Always provide a clear "No matches" recovery state in comboboxes

Never leave an empty white box dangling under a combobox input when a filter string returns zero items. State what was searched and offer a one-click reset.

::demo:select-do-empty::`,
    specs: `## Dimensions, tokens, and anatomy

::demo:select-redline::

| Part | Measurement | Token / Class | Notes |
|---|---|---|---|
| Trigger height | \`44px\` min | \`min-h-[44px]\` | Matches text inputs and buttons on the same row |
| Horizontal padding | \`12px\` left, \`36px\` right | \`pl-3 pr-9\` | Reserves room for the 16px chevron icon |
| Label gap | \`4px\` above trigger | \`mb-1 text-sm font-medium\` | Persistent visible \`<label>\` |
| Listbox max height | \`256px\` (8 × 32) | \`max-h-64 overflow-y-auto\` | Scrolls cleanly without running off screen |
| Option row height | \`40px–44px\` | \`min-h-[40px] px-3\` | Full-width hit area with checkmark indicator |

\`\`\`tsx
<label className="block text-sm">
  <span className="block font-medium mb-1">Architectural room</span>
  <select
    defaultValue="chapel"
    className="w-full min-h-[44px] rounded-md border border-[#111827]/25 bg-white px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D44983]"
  >
    <option value="gallery">Gallery (Light)</option>
    <option value="chapel">Chapel (Light)</option>
    <option value="atelier">Atelier (Light)</option>
    <option value="vault">Vault (Dark)</option>
  </select>
</label>
\`\`\``,
    accessibility: `## Keyboard navigation & touch hit areas

- **Label association:** Every \`<select>\` or combobox input must be wrapped in a \`<label>\` or linked via \`htmlFor\` / \`id\`. Placeholder text inside a select trigger is not a label.
- **Selected indicator:** In custom listboxes, always pair highlight colour with a visible check icon and \`aria-selected="true"\`.

::demo:select-ax-keymap::

::demo:select-ax-hitarea::`,
  },
  rules: [
    {
      id: 'select.five-or-fewer-use-radio',
      statement: 'When presenting 5 or fewer mutually exclusive options, use a radio group or segmented control instead of a dropdown select.',
      why: 'Visible options save a click and let people compare choices at a glance.',
    },
    {
      id: 'select.min-height-44',
      statement: 'Every select trigger and combobox input must be at least 44px tall (min-h-[44px]).',
      why: 'Meets mobile touch ergonomics and aligns with adjacent inputs and buttons.',
    },
    {
      id: 'select.visible-label',
      statement: 'Always pair a select or combobox with a persistent visible <label> above the control.',
      why: 'Once an option is chosen, any placeholder prompt disappears, leaving unlabelled selects mysterious.',
    },
    {
      id: 'select.combobox-empty-state',
      statement: 'Every searchable combobox must render a polite "No matches found" row when the filter returns zero items.',
      why: 'An empty or vanishing popup looks like a rendering bug.',
    },
  ],
};
