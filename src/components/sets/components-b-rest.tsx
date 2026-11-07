'use client';

import React, { useState } from 'react';
import { Play, Pause, Volume2, ChevronLeft, ChevronRight, HelpCircle, Check, Circle } from 'lucide-react';
import { Stage, Seg, DoDont, DimH, DimV, HitBox, Tag, FocusMark } from '../primitives';
import { Btn, RING, useSim, fmt, serif, mono } from './components-b-kit';
import { SAMPLE_PHOTOS } from '../sample-media';

/* ------------------------------------------------------------------ */
/* Avatar demos                                                        */
/* ------------------------------------------------------------------ */

const AVATAR_SIZES = [24, 32, 40, 56, 96] as const;

function AvatarModes() {
  const [mode, setMode] = useState<'photo' | 'initials' | 'crest'>('photo');
  return (
    <Stage
      label="Avatar fallback ladder"
      controls={
        <Seg
          label="Source"
          value={mode}
          onChange={setMode}
          options={[
            { id: 'photo', label: 'Photo' },
            { id: 'initials', label: 'Initials' },
            { id: 'crest', label: 'Monogram crest' },
          ]}
        />
      }
      caption="Every avatar has a deterministic fallback: editorial photo → two-letter monogram → deterministic room crest. Layout never shifts."
    >
      <div className="flex flex-wrap items-end gap-6">
        {AVATAR_SIZES.map((sz) => (
          <div key={sz} className="flex flex-col items-center gap-2">
            <div
              style={{ width: sz, height: sz }}
              className="rounded-full border border-[#111827]/20 bg-[#111827] text-[#FAF8F5] overflow-hidden grid place-items-center font-serif font-semibold"
            >
              {mode === 'photo' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={SAMPLE_PHOTOS.portrait.src}
                  alt={SAMPLE_PHOTOS.portrait.alt}
                  width={sz}
                  height={sz}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : mode === 'initials' ? (
                <span style={{ fontSize: Math.max(12, Math.round(sz * 0.36)) }}>AL</span>
              ) : (
                <svg viewBox="0 0 40 40" className="w-full h-full" aria-label="Ada Lovelace crest">
                  <rect width="40" height="40" fill="#111827" />
                  <circle cx="20" cy="20" r="14" fill="none" stroke="#E8E2D5" strokeWidth="1.5" />
                  <path d="M12 28 L20 12 L28 28 Z" fill="none" stroke="#D44983" strokeWidth="1.5" />
                </svg>
              )}
            </div>
            <span className="text-xs font-mono tabular-nums text-[#4B5563]">{sz}px</span>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function AvatarGroupStack() {
  const people = [
    { initials: 'AL', bg: '#111827', name: 'Ada Lovelace' },
    { initials: 'MV', bg: '#73385D', name: 'Massimo Vignelli' },
    { initials: 'JA', bg: '#40658F', name: 'Josef Albers' },
    { initials: 'AA', bg: '#166534', name: 'Anni Albers' },
  ];
  return (
    <Stage label="Avatar stack & presence badge" caption="Cap stacks at 4 visible circles plus a +N counter. Presence dots always pair with visible status text.">
      <div className="flex flex-wrap items-center gap-8">
        <div className="flex items-center -space-x-2">
          {people.map((p) => (
            <span
              key={p.initials}
              title={p.name}
              style={{ backgroundColor: p.bg }}
              className="inline-grid h-10 w-10 place-items-center rounded-full ring-2 ring-[#FAF8F5] text-xs font-semibold text-white"
            >
              {p.initials}
            </span>
          ))}
          <span className="inline-grid h-10 w-10 place-items-center rounded-full ring-2 ring-[#FAF8F5] bg-[#E8E2D5] text-xs font-mono font-semibold text-[#111827] tabular-nums">
            +3
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-md border border-[#111827]/15 bg-white px-3 py-2">
          <span className="relative inline-grid h-10 w-10 place-items-center rounded-full bg-[#111827] text-xs font-semibold text-white">
            AL
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#166534] ring-2 ring-white" aria-hidden />
          </span>
          <div className="text-sm">
            <strong className="block">Ada Lovelace</strong>
            <span className="text-xs text-[#166534] font-medium">Online · Reviewing specs</span>
          </div>
        </div>
      </div>
    </Stage>
  );
}

function AvatarDoStatus() {
  return (
    <DoDont
      label="Avatar status indicator"
      doExample={
        <div className="flex items-center gap-3">
          <span className="relative inline-grid h-10 w-10 place-items-center rounded-full bg-[#111827] text-xs font-semibold text-white">
            AL
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#166534] ring-2 ring-[#FAF8F5]" aria-hidden />
          </span>
          <div className="text-sm">
            <strong className="block">Ada Lovelace</strong>
            <span className="text-xs text-[#166534]">Available</span>
          </div>
        </div>
      }
      dontExample={
        <div className="flex items-center gap-3">
          <span className="relative inline-grid h-10 w-10 place-items-center rounded-full bg-[#111827] text-xs font-semibold text-white">
            AL
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#166534]" />
          </span>
          <strong className="text-sm">Ada Lovelace</strong>
        </div>
      }
      doWhy="Pair the presence dot with a 2px cutout ring and a plain-text status word so colour-blind and screen-reader users know what the dot means."
      dontWhy="Never rely on an unlabelled green or red dot alone to communicate online, busy, or away states."
    />
  );
}

function AvatarDoFallback() {
  return (
    <DoDont
      label="Missing photo fallback"
      doExample={
        <div className="flex items-center gap-3">
          <span className="inline-grid h-10 w-10 place-items-center rounded-full bg-[#111827] text-xs font-serif font-semibold text-[#FAF8F5]">
            AL
          </span>
          <span className="text-sm font-medium">Ada Lovelace</span>
        </div>
      }
      dontExample={
        <div className="flex items-center gap-3">
          <span className="inline-grid h-10 w-10 place-items-center rounded-full bg-gray-300 text-xs text-gray-500">
            ?
          </span>
          <span className="text-sm font-medium">Ada Lovelace</span>
        </div>
      }
      doWhy="Render deterministic initials or a room crest when no photo is set."
      dontWhy="Never show a broken image icon or generic grey mystery silhouette."
    />
  );
}

function AvatarRedline() {
  return (
    <Stage label="Avatar redline & stack overlap" caption="Sizes snap to the 8px grid (24, 32, 40, 56, 96). Stacked avatars overlap by 8px (-ml-2) with a 2px surface ring.">
      <div className="flex flex-wrap items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-[#111827] text-white grid place-items-center text-xs font-semibold">AL</div>
          <DimV height={40} label="40px" />
        </div>
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#111827] text-white grid place-items-center text-xs font-semibold ring-2 ring-[#FAF8F5]">AL</div>
          <div className="-ml-2 h-10 w-10 rounded-full bg-[#73385D] text-white grid place-items-center text-xs font-semibold ring-2 ring-[#FAF8F5]">MV</div>
          <span className="ml-3 text-xs font-mono text-[#A3285C]">-8px overlap · 2px ring</span>
        </div>
      </div>
    </Stage>
  );
}

function AvatarAxAlt() {
  return (
    <Stage label="Accessible alt text when name is adjacent" caption="When the person's name is printed right next to the avatar, mark the avatar decorative (alt='') so screen readers do not announce the name twice.">
      <div className="grid gap-4 sm:grid-cols-2 text-sm">
        <div className="rounded-md border border-[#111827]/15 bg-white p-4">
          <Tag tone="good">Adjacent name present</Tag>
          <p className="mt-2 font-mono text-xs">{'<img src="..." alt="" /> <span>Ada Lovelace</span>'}</p>
          <p className="mt-1 text-xs text-[#4B5563]">Screen reader announces: &ldquo;Ada Lovelace&rdquo; (once).</p>
        </div>
        <div className="rounded-md border border-[#111827]/15 bg-white p-4">
          <Tag tone="ink">Standalone avatar button</Tag>
          <p className="mt-2 font-mono text-xs">{'<button aria-label="Account menu for Ada Lovelace">'}</p>
          <p className="mt-1 text-xs text-[#4B5563]">When no visible name sits beside it, the button carries the full label.</p>
        </div>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* Pagination demos                                                    */
/* ------------------------------------------------------------------ */

function PaginationInteractive() {
  const [page, setPage] = useState(5);
  const total = 20;
  const pages: (number | '…')[] =
    page <= 3
      ? [1, 2, 3, 4, '…', total]
      : page >= total - 2
        ? [1, '…', total - 3, total - 2, total - 1, total]
        : [1, '…', page - 1, page, page + 1, '…', total];
  return (
    <Stage label="Interactive pagination with stable 7-slot width" caption="Notice how the bar always occupies 7 slots so Next and Previous never jump under the cursor.">
      <nav aria-label="Archive pages" className="flex flex-wrap items-center justify-between gap-4">
        <Btn kind="ghost" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          <ChevronLeft className="h-4 w-4" aria-hidden /> Previous
        </Btn>
        <ul className="hidden sm:flex items-center gap-1">
          {pages.map((p, idx) =>
            p === '…' ? (
              <li key={`e-${idx}`} className="h-11 w-11 grid place-items-center text-sm text-[#4B5563]" aria-hidden>
                …
              </li>
            ) : (
              <li key={p}>
                <button
                  type="button"
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? 'page' : undefined}
                  onClick={() => setPage(p)}
                  className={`h-11 w-11 rounded-md text-sm font-medium tabular-nums ${RING} ${
                    p === page ? 'bg-[#111827] text-white font-semibold' : 'hover:bg-[#E8E2D5]'
                  }`}
                >
                  {p}
                </button>
              </li>
            )
          )}
        </ul>
        <span className="sm:hidden text-sm tabular-nums font-medium">
          Page {page} of {total}
        </span>
        <Btn kind="ghost" disabled={page === total} onClick={() => setPage((p) => Math.min(total, p + 1))}>
          Next <ChevronRight className="h-4 w-4" aria-hidden />
        </Btn>
      </nav>
    </Stage>
  );
}

function PaginationDoPattern() {
  return (
    <DoDont
      label="Numbered pagination vs infinite scroll"
      doExample={
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-2 rounded border border-[#111827]/20 bg-white">← Prev</span>
          <span className="px-3 py-2 rounded bg-[#111827] text-white tabular-nums">2</span>
          <span className="px-3 py-2 rounded border border-[#111827]/20 bg-white">Next →</span>
        </div>
      }
      dontExample={
        <div className="text-center text-xs text-[#4B5563] space-y-2">
          <div className="h-5 w-5 mx-auto rounded-full border-2 border-[#111827] border-t-transparent animate-spin" />
          <p>Loading more items forever (footer unreachable)…</p>
        </div>
      }
      doWhy="Use numbered pages or explicit Next/Previous links when people need to bookmark a spot, reach the footer, or return to item 42."
      dontWhy="Never trap footer links below an endless scroll stream."
    />
  );
}

function PaginationDoMobile() {
  return (
    <DoDont
      label="Mobile pagination density"
      doExample={
        <div className="flex items-center justify-between w-full max-w-[300px] text-sm">
          <Btn kind="ghost">Prev</Btn>
          <span className="tabular-nums font-medium">Page 4 of 18</span>
          <Btn kind="ghost">Next</Btn>
        </div>
      }
      dontExample={
        <div className="flex gap-0.5 text-xs">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <span key={n} className="h-6 w-5 grid place-items-center border border-[#111827]/20">
              {n}
            </span>
          ))}
        </div>
      }
      doWhy="Collapse to Previous · Page X of Y · Next on 390px viewports so every button stays ≥44×44px."
      dontWhy="Never cram ten tiny 20px page numbers onto a phone screen."
    />
  );
}

function PaginationRedline() {
  return (
    <Stage label="Pagination redline" caption="Every page button is a 44×44px square with 4px gap and tabular numerals.">
      <div className="flex items-center gap-4">
        <HitBox w={44} h={44} label="44×44">
          <span className="text-sm font-semibold tabular-nums">1</span>
        </HitBox>
        <DimH width={16} label="4px gap" />
        <HitBox w={44} h={44} label="aria-current='page'">
          <span className="h-11 w-11 rounded-md bg-[#111827] text-white grid place-items-center text-sm font-semibold tabular-nums">2</span>
        </HitBox>
      </div>
    </Stage>
  );
}

function PaginationAxLandmark() {
  return (
    <Stage label="Pagination ARIA contract" caption="Wrap in <nav aria-label='Pagination'> and set aria-current='page' on the active button.">
      <pre style={mono} className="text-xs bg-[#111827] text-[#F3EFE9] p-4 rounded-md overflow-x-auto">
{`<nav aria-label="Pagination">
  <ul>
    <li><a href="?page=1" aria-label="Page 1">1</a></li>
    <li><a href="?page=2" aria-current="page" aria-label="Page 2, current page">2</a></li>
    <li><a href="?page=3" aria-label="Page 3">3</a></li>
  </ul>
</nav>`}
      </pre>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* Tooltip demos                                                       */
/* ------------------------------------------------------------------ */

function TooltipDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Stage
      label="Keyboard & hover tooltip (aria-describedby)"
      caption="Focus or hover the icon button to reveal its label; press Escape to dismiss without moving focus."
    >
      <div className="flex items-center gap-6 py-4">
        <div
          className="relative inline-block"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button
            type="button"
            aria-describedby="demo-tip-1"
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
            className={`h-11 w-11 rounded-md border border-[#111827]/25 bg-white grid place-items-center ${RING}`}
          >
            <HelpCircle className="h-5 w-5" aria-hidden />
            <span className="sr-only">Copy W3C token JSON</span>
          </button>
          {open && (
            <span
              id="demo-tip-1"
              role="tooltip"
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded bg-[#111827] text-[#FAF8F5] px-2.5 py-1 text-xs shadow"
            >
              Copy W3C token JSON (⌘C)
            </span>
          )}
        </div>
        <span className="text-sm text-[#4B5563]">Tab to the button and press Escape to test keyboard dismissal.</span>
      </div>
    </Stage>
  );
}

function TooltipDoVisibleLabel() {
  return (
    <DoDont
      label="Essential instructions vs supplemental hints"
      doExample={
        <div className="text-sm space-y-1">
          <label className="block font-medium">Password</label>
          <p className="text-xs text-[#4B5563]">At least 12 characters, no common phrases.</p>
        </div>
      }
      dontExample={
        <div className="text-sm flex items-center gap-1">
          <label className="font-medium">Password</label>
          <span className="text-xs text-[#4B5563]" title="At least 12 characters">(hover ? for rules)</span>
        </div>
      }
      doWhy="Print password rules, pricing caveats, and required-field hints inline where touch and voice users can read them immediately."
      dontWhy="Never hide essential form rules inside a hover-only tooltip that touchscreens cannot trigger."
    />
  );
}

function TooltipDoConcise() {
  return (
    <DoDont
      label="Tooltip length and interactivity"
      doExample={
        <span className="inline-block rounded bg-[#111827] text-[#FAF8F5] px-2.5 py-1 text-xs">
          Download PDF (670 KB)
        </span>
      }
      dontExample={
        <div className="rounded bg-[#111827] text-[#FAF8F5] p-3 text-xs max-w-[220px] space-y-2">
          <p>Download the complete poster PDF including all 4 columns and read the terms.</p>
          <span className="underline text-[#D44983]">Click here to learn more →</span>
        </div>
      }
      doWhy="Keep tooltips under 60 characters of plain text."
      dontWhy="Never put links or buttons inside a tooltip; it disappears the moment the pointer moves toward it. Use a Popover or Dialog instead."
    />
  );
}

function TooltipRedline() {
  return (
    <Stage label="Tooltip redline" caption="8px offset from trigger, 8px×12px padding, 4px radius, max-w 240px.">
      <div className="flex flex-col items-center gap-1 py-2">
        <span className="rounded bg-[#111827] text-[#FAF8F5] px-3 py-1.5 text-xs">Copy link (⌘K)</span>
        <DimV height={16} label="8px gap" />
        <HitBox w={44} h={44} label="44×44 trigger">
          <HelpCircle className="h-5 w-5" aria-hidden />
        </HitBox>
      </div>
    </Stage>
  );
}

function TooltipAxEscape() {
  return (
    <Stage label="WCAG 1.4.13 Content on Hover or Focus" caption="Three mandatory rules: Dismissible (Escape closes), Hoverable (pointer can move over tooltip), Persistent (stays open while focused/hovered).">
      <div className="grid gap-3 sm:grid-cols-3 text-sm">
        <div className="rounded border border-[#111827]/15 bg-white p-3">
          <strong className="block">1. Dismissible</strong>
          <span className="text-xs text-[#4B5563]">Pressing Escape hides the tooltip without blurring the trigger.</span>
        </div>
        <div className="rounded border border-[#111827]/15 bg-white p-3">
          <strong className="block">2. Hoverable</strong>
          <span className="text-xs text-[#4B5563]">Low-vision magnifier users can move the cursor onto the tooltip text itself.</span>
        </div>
        <div className="rounded border border-[#111827]/15 bg-white p-3">
          <strong className="block">3. Persistent</strong>
          <span className="text-xs text-[#4B5563]">Never auto-hide on a timer while the trigger still has focus or hover.</span>
        </div>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* Audio Dispatch demos                                                */
/* ------------------------------------------------------------------ */

const BARS = [28, 52, 64, 40, 88, 72, 36, 92, 60, 44, 78, 84, 48, 32, 68, 90, 56, 42, 76, 62, 38, 82, 54, 46];
const TRANSCRIPT = [
  { at: 0, text: '0:00 — Why we built Accént on an 8-point grid instead of arbitrary auto-layout.' },
  { at: 8, text: '0:08 — Following Josef Albers: every colour is either in relief or in focus.' },
  { at: 16, text: '0:16 — Stepwise compilation lets a local 7B model ship verified UI in four passes.' },
];

function AudioPlayerDemo() {
  const [speed, setSpeed] = useState<'1' | '1.25' | '1.5'>('1');
  const sim = useSim(24, Number(speed));
  const pct = (sim.t / 24) * 100;
  return (
    <Stage
      label="Audio Dispatch briefing bar with synchronized transcript"
      controls={
        <Seg
          label="Playback speed"
          value={speed}
          onChange={setSpeed}
          options={[
            { id: '1', label: '1×' },
            { id: '1.25', label: '1.25×' },
            { id: '1.5', label: '1.5×' },
          ]}
        />
      }
      caption="Deterministic waveform (zero CLS), tabular timecode, 44×44px Play/Pause trigger, and click-to-seek transcript."
    >
      <div className="rounded-lg border border-[#111827]/15 bg-white p-4 space-y-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={sim.toggle}
            aria-label={sim.playing ? 'Pause briefing' : 'Play briefing'}
            className={`h-11 w-11 shrink-0 rounded-full bg-[#111827] text-white grid place-items-center ${RING}`}
          >
            {sim.playing ? <Pause className="h-5 w-5" aria-hidden /> : <Play className="h-5 w-5 ml-0.5" aria-hidden />}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <strong style={serif} className="text-base truncate">Morning Dispatch · pipe\website-design</strong>
              <span style={mono} className="text-xs tabular-nums text-[#4B5563]">
                {fmt(sim.t)} / {fmt(24)}
              </span>
            </div>
            <div
              role="slider"
              tabIndex={0}
              aria-label="Seek briefing position"
              aria-valuemin={0}
              aria-valuemax={24}
              aria-valuenow={Math.round(sim.t)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') sim.seek(sim.t + 2);
                if (e.key === 'ArrowLeft') sim.seek(sim.t - 2);
              }}
              className={`mt-2 flex items-end gap-1 h-8 cursor-pointer ${RING}`}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = (e.clientX - rect.left) / rect.width;
                sim.seek(ratio * 24);
              }}
            >
              {BARS.map((h, i) => {
                const active = (i / BARS.length) * 100 <= pct;
                return (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-sm ${active ? 'bg-[#D44983]' : 'bg-[#111827]/20'}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-t border-[#111827]/10 pt-3 space-y-1.5">
          <p className="text-xs font-mono uppercase tracking-wider text-[#4B5563]">Synchronized transcript</p>
          {TRANSCRIPT.map((line, idx) => {
            const nextAt = TRANSCRIPT[idx + 1]?.at ?? 99;
            const current = sim.t >= line.at && sim.t < nextAt;
            return (
              <button
                key={line.at}
                type="button"
                onClick={() => sim.seek(line.at)}
                className={`block w-full text-left text-sm px-2 py-1 rounded ${RING} ${
                  current ? 'bg-[#F3EFE9] font-medium text-[#111827]' : 'text-[#4B5563] hover:text-[#111827]'
                }`}
              >
                {line.text}
              </button>
            );
          })}
        </div>
      </div>
    </Stage>
  );
}

function AudioDoAutoplay() {
  return (
    <DoDont
      label="User-initiated playback vs autoplay"
      doExample={
        <div className="flex items-center gap-3">
          <span className="h-11 w-11 rounded-full bg-[#111827] text-white grid place-items-center">
            <Play className="h-5 w-5 ml-0.5" aria-hidden />
          </span>
          <div className="text-sm">
            <strong className="block">Listen to 3-min briefing</strong>
            <span className="text-xs text-[#4B5563]">Starts only when clicked</span>
          </div>
        </div>
      }
      dontExample={
        <div className="flex items-center gap-3 text-sm text-[#9F1239]">
          <Volume2 className="h-5 w-5 animate-pulse" aria-hidden />
          <span>Audio playing automatically on page load…</span>
        </div>
      }
      doWhy="Wait for an explicit click or tap before playing audio, and display total duration up front."
      dontWhy="Never autoplay audio on page load; it collides with screen readers and startles readers."
    />
  );
}

function AudioDoTranscript() {
  return (
    <DoDont
      label="Transcript availability"
      doExample={
        <div className="text-sm space-y-1">
          <strong className="block">Audio briefing + full text transcript below</strong>
          <span className="text-xs text-[#166534]">Deaf, hard-of-hearing, and skimming readers get 100% of the content.</span>
        </div>
      }
      dontExample={
        <div className="text-sm space-y-1">
          <strong className="block">Audio-only MP3 blob</strong>
          <span className="text-xs text-[#9F1239]">Zero text fallback, unsearchable, inaccessible without headphones.</span>
        </div>
      }
      doWhy="Always pair an audio briefing with a visible, indexable transcript."
      dontWhy="Never lock key editorial information inside an audio-only player with no transcript."
    />
  );
}

function AudioRedline() {
  return (
    <Stage label="Audio Dispatch bar redline" caption="64px compact bar height, 44×44px Play button, 32px waveform track, tabular-nums timecode.">
      <div className="flex items-center gap-4">
        <HitBox w={44} h={44} label="44×44 Play">
          <span className="h-11 w-11 rounded-full bg-[#111827] text-white grid place-items-center">
            <Play className="h-4 w-4" aria-hidden />
          </span>
        </HitBox>
        <DimH width={120} label="24 bar waveform · 32px h" />
        <span style={mono} className="text-xs tabular-nums border border-dashed border-[#D44983] px-2 py-1">01:14 / 03:40</span>
      </div>
    </Stage>
  );
}

function AudioAxKeys() {
  return (
    <Stage label="Keyboard & ARIA slider contract" caption="Space toggles Play/Pause; Left/Right arrows seek ±5 seconds on the progress slider.">
      <div className="grid gap-3 sm:grid-cols-3 text-sm">
        <div className="rounded border border-[#111827]/15 bg-white p-3">
          <strong style={mono} className="text-xs">Space / Enter</strong>
          <p className="mt-1 text-xs text-[#4B5563]">Play or pause on the trigger button.</p>
        </div>
        <div className="rounded border border-[#111827]/15 bg-white p-3">
          <strong style={mono} className="text-xs">← / → Arrows</strong>
          <p className="mt-1 text-xs text-[#4B5563]">Seek backward or forward on role=&ldquo;slider&rdquo;.</p>
        </div>
        <div className="rounded border border-[#111827]/15 bg-white p-3">
          <strong style={mono} className="text-xs">Transcript click</strong>
          <p className="mt-1 text-xs text-[#4B5563]">Each paragraph is a button that jumps to its timestamp.</p>
        </div>
      </div>
    </Stage>
  );
}

export const DEMOS: Record<string, React.ComponentType> = {
  'avatar-modes': AvatarModes,
  'avatar-group-stack': AvatarGroupStack,
  'avatar-do-status': AvatarDoStatus,
  'avatar-do-fallback': AvatarDoFallback,
  'avatar-redline': AvatarRedline,
  'avatar-ax-alt': AvatarAxAlt,
  'page-interactive': PaginationInteractive,
  'page-do-pattern': PaginationDoPattern,
  'page-do-mobile': PaginationDoMobile,
  'page-redline': PaginationRedline,
  'page-ax-landmark': PaginationAxLandmark,
  'tip-interactive': TooltipDemo,
  'tip-do-visible': TooltipDoVisibleLabel,
  'tip-do-concise': TooltipDoConcise,
  'tip-redline': TooltipRedline,
  'tip-ax-escape': TooltipAxEscape,
  'audio-player': AudioPlayerDemo,
  'audio-do-autoplay': AudioDoAutoplay,
  'audio-do-transcript': AudioDoTranscript,
  'audio-redline': AudioRedline,
  'audio-ax-keys': AudioAxKeys,
};
