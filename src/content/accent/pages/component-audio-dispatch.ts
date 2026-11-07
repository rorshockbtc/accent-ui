import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'components/audio-dispatch',
  section: 'components',
  title: 'Audio Dispatch',
  summary: 'The editorial briefing player: deterministic 24-bar waveform, tabular timecodes, 1×–1.5× speed control, and synchronized click-to-seek transcript.',
  readingMinutes: 6,
  tabs: {
    overview: `## Spoken briefings that respect the page

When a curator publishes an audio dispatch or Semi reads a morning briefing aloud, the player should feel like part of the publication—not an embedded third-party iframe covered in promotional chrome.

The Accént **Audio Dispatch** component is built around four editorial guarantees:

1. **Zero layout shift (\`0.00\` CLS):** The 24-bar waveform is rendered deterministically at fixed height before the audio buffer even loads.
2. **Tabular timecodes (\`tabular-nums\`):** Elapsed and total duration (\`01:14 / 03:40\`) never jitter horizontally as seconds tick by.
3. **User-initiated playback only:** Audio never autoplays on page load.
4. **Synchronized clickable transcript:** Every spoken briefing pairs with a visible text transcript below the bar; clicking any paragraph seeks directly to that timestamp.

> **Why:** Many readers commute with audio and review notes in text later—or read in a quiet room where playing audio is impossible. Treating the transcript as a first-class half of the player serves both habits and meets WCAG AAA media accessibility.

::demo:audio-player::

## Anatomy of an editorial audio player

Unlike a background music app that docks a persistent mini-player over every screen, an **Audio Dispatch** sits inline at the top of the essay or briefing it belongs to:

- **44×44px Play / Pause trigger:** High-contrast solid ink circle on the left edge, immediately reachable by thumb or keyboard \`Tab\`.
- **24-bar deterministic waveform:** Drawn from static amplitude buckets stored with the story metadata so the visual rhythm of the voice appears immediately at page load with zero network decode delay and \`0.00\` layout shift.
- **Tabular timecode & speed pill:** Elapsed and total time (\`01:14 / 03:40\`) set in JetBrains Mono with \`tabular-nums\`, alongside a three-step speed selector (\`1×\`, \`1.25×\`, \`1.5×\`) that remembers the reader's preference across dispatches.
- **Interactive transcript:** Below the bar, each paragraph carries a clickable timestamp chip (\`00:42\`). Clicking any paragraph jumps the audio playhead to that moment and highlights the active sentence in a warm card surface shift.`,
    guidelines: `## Never autoplay audio on page load

Unexpected audio startles readers, interrupts screen readers mid-sentence, and gets blocked by mobile browsers anyway. Always wait for a deliberate click on the 44×44px Play button.

::demo:audio-do-autoplay::

## Always pair audio dispatches with a visible transcript

An audio file without text cannot be skimmed, searched, quoted, or read by deaf and hard-of-hearing visitors.

::demo:audio-do-transcript::`,
    specs: `## Player redline and token table

::demo:audio-redline::

| Part | Measurement | Token / Class | Notes |
|---|---|---|---|
| Play / Pause button | \`44×44px\` circle | \`h-11 w-11 rounded-full bg-[#111827] text-white\` | Primary keyboard and touch target |
| Waveform track | \`32px\` tall, 24 bars | \`h-8 gap-1\` | Played bars in \`#D44983\`, unplayed in \`#111827/20\` |
| Timecode readout | \`12px\` monospace | \`font-mono text-xs tabular-nums\` | \`MM:SS / MM:SS\` format |
| Speed selector | \`32px\` segmented pills | \`1×\` · \`1.25×\` · \`1.5×\` | Preserves pitch across speeds |
| Transcript row | \`≥ 36px\` click target | \`rounded px-2 py-1\` | Active segment highlighted in \`#F3EFE9\` |

\`\`\`tsx
<section aria-label="Audio briefing" className="rounded-lg border border-[#111827]/15 bg-white p-4">
  <div className="flex items-center gap-4">
    <button
      type="button"
      aria-label={playing ? 'Pause briefing' : 'Play briefing'}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#111827] text-white"
    >
      {playing ? <Pause className="h-5 w-5" aria-hidden /> : <Play className="h-5 w-5" aria-hidden />}
    </button>
    <div role="slider" tabIndex={0} aria-label="Seek position" aria-valuemin={0} aria-valuemax={duration} aria-valuenow={currentTime} />
    <span className="font-mono text-xs tabular-nums">{formatTime(currentTime)} / {formatTime(duration)}</span>
  </div>
</section>
\`\`\``,
    accessibility: `## Keyboard seek slider and transcript buttons

- **Play/Pause button:** Toggles label cleanly between \`"Play briefing"\` and \`"Pause briefing"\`.
- **Seek slider (\`role="slider"\`):** Focusable with \`Tab\`; \`ArrowRight\` / \`ArrowLeft\` seeks forward or backward in 5-second steps, and announces \`aria-valuenow\` / \`aria-valuetext\` (*"1 minute 14 seconds of 3 minutes 40 seconds"*).
- **Transcript buttons:** Each timestamped line is a native \`<button>\` so keyboard users can jump to any section.

::demo:audio-ax-keys::`,
  },
  rules: [
    {
      id: 'audio.no-autoplay',
      statement: 'Never set autoplay on <audio> or <video> elements with sound; playback must require explicit user interaction.',
      why: 'Autoplaying audio interferes with screen readers and violates WCAG 1.4.2.',
      violationPattern: '<(audio|video)\\b[^>]*\\bautoplay\\b',
    },
    {
      id: 'audio.require-transcript',
      statement: 'Every Audio Dispatch player must include a visible text transcript on the same page.',
      why: 'Required for deaf/hard-of-hearing accessibility (WCAG 1.2.1) and text searchability.',
    },
    {
      id: 'audio.tabular-timecode',
      statement: 'Apply tabular-nums to all audio/video elapsed and duration timers.',
      why: 'Prevents the timer and adjacent waveform from jittering every second.',
    },
    {
      id: 'audio.keyboard-slider',
      statement: 'Make the waveform seek bar keyboard operable with role="slider" and Left/Right arrow key handlers.',
      why: 'Ensures keyboard-only users can scrub through audio briefings.',
    },
  ],
};
