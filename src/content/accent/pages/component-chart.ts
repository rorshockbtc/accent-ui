import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/data-visualization',
  section: 'components',
  title: 'Data Visualization',
  summary: 'Charts that answer one question: direct labels, tabular numbers, and never color alone.',
  readingMinutes: 5,
  kind: 'doc',
  tabs: {
    overview: `## A chart is an answer

Every chart should answer one question the reader already has. "Are sales up?" "Which room gets the most visits?" "When did it break?" If you cannot write the question in a sentence above the chart, the chart is not ready.

Accent charts take their cue from visx and the quieter end of the Tufte tradition: small, low-level primitives composed carefully, with almost no chrome. No 3D, no gradients, no legend floating off to the side making you play matching games.

> **Why:** Direct labels on bars and lines eliminate the back-and-forth eye travel of detached colour legends and remain readable for colour-blind readers and monochrome printouts alike.

::demo:chart-demo::

## Anatomy

- **Title.** The question or, better, the answer. "Visits doubled after the redesign" beats "Visits, 2026."
- **Plot area.** The marks: bars, lines, dots. This is the art, in focus.
- **Axes.** Quiet. Hairline baseline, a few tick labels, no box around the plot. Gridlines, if any, at 10% ink.
- **Direct labels.** Series names written at the end of each line or on each bar, in the series color. They replace legends.
- **Annotations.** A short note pinned to the moment that matters: "Price change", "Outage."
- **Source.** One muted line underneath. Where the numbers came from and when.

## Numbers

Use lining, tabular figures everywhere in charts: \`font-variant-numeric: lining-nums tabular-nums\`. Old-style numerals, the kind Georgia uses by default, drop 3, 4, 5, 7 and 9 below the baseline. That is lovely in a novel and terrible in a price column, because digits stop lining up and your eye cannot compare them. Tabular figures give every digit the same width so columns align.

Format for humans: "1.2k" on axes, full values in tooltips, thousands separators always, units on the axis label not every tick.

## Never color alone

Around one in twelve men see red and green as similar. Every series must be distinguishable without color: direct labels, different line styles (solid, dashed), different marker shapes, or position. The room accent can highlight the one series that matters while others recede to grey. That is Albers again: one color in focus, the rest in relief.

## States

- **Loading.** Show the axes and a flat placeholder line, not a spinner.
- **Empty.** Say why there is no data and what will make it appear.
- **Hover/focus.** A crosshair and a tooltip with exact values; keyboard users can step through points.
- **Error.** Plain words and a retry.

## When to use

Line charts for change over time. Bars for comparing categories. A single big number when there is only one number. A table when people need exact values or will look things up. Pie charts almost never; people are bad at comparing angles.

## KPI callouts and proportional strips

::demo:chart-kpi-spark::

::demo:chart-strip::`,
    guidelines: `## Live Do & Don't comparisons

::demo:chart-do-direct-labels::

::demo:chart-do-zero-axis::

## Do

- Title the chart with its finding.
- Label series directly instead of using a legend.
- Use tabular, lining numerals.
- Start bar chart axes at zero.
- Highlight one series in the accent; grey the rest.

## Don't

- Don't rely on color alone to tell series apart.
- Don't use 3D, gradients or drop shadows.
- Don't use pie charts with more than three slices.
- Don't truncate the y-axis on bar charts.
- Don't put more than five series on one chart. Use small multiples.

## When to use

- Trends, comparisons, distributions.

## When not to

- When the reader needs exact values (use a table).
- When there is a single figure (use a big number).`,
    specs: `## Bar chart redline and accessible table toggle

::demo:chart-redline-bars::

::demo:chart-table-toggle::

| Element | Measurement | Typography | Rule |
|---|---|---|---|
| Bar thickness | \`12px\` (\`h-3\`) | — | \`8px–16px\` gap between rows |
| Category label | Left-aligned above bar | \`14px\` sans (\`font-medium\`) | Direct label—never a detached colour legend |
| Value readout | Right-aligned above bar | \`14px\` \`tabular-nums font-semibold\` | Always includes unit (\`%\`, \`\$\`, \`ms\`) |
| Axis baseline | Starts at \`0\` | — | Truncated bar axes are forbidden |

## Tokens

- Numerals: \`lining-nums tabular-nums\` (\`tabular-nums\` in Tailwind).
- Tick labels: UI sans 13px, muted.
- Direct labels: UI sans 13px, weight 500, series color at 7:1 or ink.
- Title: UI sans 16px weight 600, or display serif 20px.
- Line weight: 2px data, 1px axis, gridlines 1px at 10% ink.
- Bar gap: 8px; bar corner radius 0.
- Chart padding: 16px; left margin sized to the longest tick label.
- Aspect: 16:9 default, 4:5 on mobile.

## Usage (visx)

\`\`\`tsx
import { LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';

<svg role="img" aria-labelledby="chart-title chart-desc">
  <title id="chart-title">Visits doubled after the redesign</title>
  <desc id="chart-desc">Weekly visits rose from 1,200 to 2,450 between March and May.</desc>
  <LinePath data={data} x={(d) => x(d.date)} y={(d) => y(d.visits)} strokeWidth={2} />
</svg>
\`\`\``,
    accessibility: `## Colour-blind-safe palettes and table equivalent

::demo:chart-ax-palettes::

## Requirements

- **Not color alone.** Use labels, patterns or shapes (WCAG 1.4.1).
- **Text alternative.** A title and description summarizing the finding, plus a data table link (WCAG 1.1.1).
- **Contrast.** Data marks at 3:1 against the background (WCAG 1.4.11); text at 7:1.
- **Keyboard.** Interactive charts let users move between points with arrow keys and see the tooltip.
- **Text size.** Tick labels at least 13px.
- **Motion.** Entry animations respect \`prefers-reduced-motion\`.

## Screen readers

Provide the underlying data as a table, visually hidden or behind a "Show data" toggle.`,
  },
  rules: [
    {
      id: 'chart.not-color-only',
      statement: 'Distinguish chart series with direct labels, line styles or shapes, not color alone.',
      why: 'Color-blind readers cannot match colors to a legend.',
    },
    {
      id: 'chart.tabular-nums',
      statement: 'All numbers in charts and tables use lining tabular numerals.',
      why: 'Old-style and proportional digits do not align, so values are hard to compare.',
    },
    {
      id: 'chart.direct-labels',
      statement: 'Prefer direct labels on series over a separate legend.',
      why: 'Legends force the eye back and forth.',
    },
    {
      id: 'chart.no-3d',
      statement: 'Never use 3D, gradient fills or drop shadows on data marks.',
      why: 'Decoration distorts the data.',
    },
    {
      id: 'chart.text-alternative',
      statement: 'Every chart svg has role="img", a title stating the finding, and a description.',
      why: 'Screen reader users need the answer too.',
    },
  ],
};
