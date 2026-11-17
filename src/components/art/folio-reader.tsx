'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useMotionPreference } from '@/components/motion/MotionProvider';
import { EASE_EDITORIAL, SPRING_LAYOUT } from '@/lib/motion/tokens';

export interface EssayMovement {
  index: number;
  roman: string;
  heading: string;
  markdown: string;
  wordCount: number;
  estimatedMinutes: number;
  startTimeSeconds: number;
  timestampFormatted: string;
}

const ROMANS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

function formatClock(sec: number): string {
  const s = Math.max(0, Math.floor(sec || 0));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export function splitEssayMovements(
  markdown: string,
  durationSeconds = 1800,
  chapters: Array<{ startTime: number; timestampFormatted: string }> = [],
): EssayMovement[] {
  const raw = (markdown || '').trim();
  if (!raw) return [];

  const parts = raw.split(/\n(?=##\s+)/);
  // If opening prose before first ## is short (< 90 words), keep it joined with Movement I
  const merged: string[] = [];
  for (let i = 0; i < parts.length; i++) {
    const chunk = parts[i].trim();
    if (!chunk) continue;
    if (
      i === 0 &&
      !chunk.startsWith('## ') &&
      parts.length > 1 &&
      chunk.split(/\s+/).length < 90
    ) {
      parts[1] = `${chunk}\n\n${parts[1].trim()}`;
      continue;
    }
    merged.push(chunk);
  }

  return merged.map((block, idx) => {
    const headingMatch = block.match(/(?:^|\n)##\s+([^\n]+)/);
    const heading = headingMatch ? headingMatch[1].trim() : `Movement ${ROMANS[idx] || idx + 1}`;
    const wordCount = block.split(/\s+/).filter(Boolean).length;
    const chIdx =
      chapters.length > 0
        ? Math.min(chapters.length - 1, Math.floor((idx / Math.max(1, merged.length)) * chapters.length))
        : -1;
    const startTimeSeconds =
      chIdx >= 0
        ? chapters[chIdx].startTime
        : Math.round((idx / Math.max(1, merged.length)) * durationSeconds);
    const timestampFormatted =
      chIdx >= 0 ? chapters[chIdx].timestampFormatted : formatClock(startTimeSeconds);

    return {
      index: idx,
      roman: ROMANS[idx] || String(idx + 1),
      heading,
      markdown: block,
      wordCount,
      estimatedMinutes: Math.max(1, Math.round(wordCount / 210)),
      startTimeSeconds,
      timestampFormatted,
    };
  });
}

function DefaultMarkdownBlock({ markdown }: { markdown: string }) {
  const blocks = markdown.trim().split(/\n\n+/);
  return (
    <div className="max-w-[65ch] break-words space-y-4">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={i}
              className="font-serif text-2xl sm:text-[28px] leading-9 font-semibold tracking-tight mt-6 mb-3 text-[var(--a-ink)]"
              style={{ fontFamily: 'var(--font-accent-display), Georgia, serif' }}
            >
              {trimmed.slice(3)}
            </h2>
          );
        }
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote
              key={i}
              className="my-6 border-l-2 border-[var(--a-ink)]/30 pl-6 font-serif text-xl leading-8 italic text-[var(--a-ink)]"
            >
              {trimmed.replace(/^>\s*/gm, '')}
            </blockquote>
          );
        }
        return (
          <p
            key={i}
            className="text-[17px] sm:text-[18px] leading-8 text-[var(--a-ink)]"
            style={{ fontFamily: 'var(--font-accent-serif), Georgia, serif' }}
          >
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export interface AccentFolioReaderProps {
  markdown: string;
  episodeNumber: number;
  durationSeconds: number;
  chapters?: Array<{ startTime: number; timestampFormatted: string }>;
  currentTime?: number;
  isPlaying?: boolean;
  onSeekTimestamp?: (seconds: number) => void;
  onRequestNextEpisode?: () => void;
  onRequestPrevEpisode?: () => void;
  nextEpisodeTitle?: string;
  prevEpisodeTitle?: string;
  scrollTargetId?: string;
  renderMarkdown?: (markdown: string) => React.ReactNode;
}

export function AccentFolioReader({
  markdown,
  episodeNumber,
  durationSeconds,
  chapters = [],
  currentTime = 0,
  isPlaying = false,
  onSeekTimestamp,
  onRequestNextEpisode,
  onRequestPrevEpisode,
  nextEpisodeTitle,
  prevEpisodeTitle,
  scrollTargetId = 'accent-article',
  renderMarkdown,
}: AccentFolioReaderProps) {
  const { isReduced } = useMotionPreference();
  const movements = useMemo(
    () => splitEssayMovements(markdown, durationSeconds, chapters),
    [markdown, durationSeconds, chapters],
  );

  const [readerMode, setReaderMode] = useState<'folio' | 'scroll'>('folio');
  const [activeMovementIdx, setActiveMovementIdx] = useState(0);
  const [followAudio, setFollowAudio] = useState(true);
  const manualPauseFollowRef = useRef<number>(0);

  // Reset to Movement I when switching episodes
  useEffect(() => {
    setActiveMovementIdx(0);
    manualPauseFollowRef.current = 0;
  }, [episodeNumber, markdown]);

  // Gently advance Folio movement when audio reaches next movement's timestamp window
  useEffect(() => {
    if (!isPlaying || !followAudio || readerMode !== 'folio' || movements.length <= 1) return;
    if (Date.now() < manualPauseFollowRef.current) return;

    let target = 0;
    for (let i = 0; i < movements.length; i++) {
      if (currentTime >= movements[i].startTimeSeconds) {
        target = i;
      }
    }
    if (target !== activeMovementIdx) {
      setActiveMovementIdx(target);
    }
  }, [isPlaying, followAudio, readerMode, currentTime, movements, activeMovementIdx]);

  const currentMovement = movements[activeMovementIdx] ?? movements[0];
  if (!currentMovement) return null;

  const selectMovement = (nextIdx: number, scrollTop = false) => {
    manualPauseFollowRef.current = Date.now() + 20000;
    setActiveMovementIdx(Math.max(0, Math.min(movements.length - 1, nextIdx)));
    if (scrollTop && typeof window !== 'undefined' && scrollTargetId) {
      const el = document.getElementById(scrollTargetId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({ top: Math.max(0, y), behavior: isReduced ? 'auto' : 'smooth' });
      }
    }
  };

  const canPaginate = movements.length >= 2;
  const bodyContent = (md: string) =>
    renderMarkdown ? renderMarkdown(md) : <DefaultMarkdownBlock markdown={md} />;

  return (
    <div data-testid="accent-folio-reader" className="max-w-[65ch]">
      {/* Folio Pagination Toolbar */}
      {canPaginate && (
        <div className="my-6 py-3 border-y border-[var(--a-rule)] space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-[var(--a-accent-text)] font-semibold uppercase tracking-[0.12em]">
              {readerMode === 'folio'
                ? `Movement ${currentMovement.roman} of ${movements.length} · ~${currentMovement.estimatedMinutes} min read`
                : `Continuous Edition · ${movements.length} Movements`}
            </span>
            <div className="flex items-center gap-3">
              {readerMode === 'folio' && (
                <button
                  type="button"
                  onClick={() => setFollowAudio((v) => !v)}
                  className={`min-h-[36px] underline-offset-4 cursor-pointer ${
                    followAudio
                      ? 'text-[var(--a-ink)] font-semibold underline'
                      : 'text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                  }`}
                >
                  {followAudio ? 'Audio Sync: ON' : 'Audio Sync: OFF'}
                </button>
              )}
              <button
                type="button"
                data-testid="folio-mode-toggle"
                onClick={() => setReaderMode((m) => (m === 'folio' ? 'scroll' : 'folio'))}
                className="min-h-[36px] text-[var(--a-muted)] hover:text-[var(--a-ink)] underline underline-offset-4 cursor-pointer"
              >
                {readerMode === 'folio' ? 'Read all on 1 page ↓' : 'Paginate by Movement'}
              </button>
            </div>
          </div>

          {readerMode === 'folio' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border border-[var(--a-rule)] bg-[var(--a-rule)]">
              {movements.map((mv, idx) => {
                const active = idx === activeMovementIdx;
                const spanFullOnOddLast =
                  movements.length % 2 === 1 && idx === movements.length - 1
                    ? 'sm:col-span-2'
                    : '';
                return (
                  <button
                    key={mv.roman}
                    type="button"
                    data-testid={`folio-movement-${idx + 1}`}
                    onClick={() => selectMovement(idx, false)}
                    className={`relative min-h-[44px] px-3.5 py-2 text-left font-mono text-xs cursor-pointer t-color flex items-center justify-between gap-2 ${spanFullOnOddLast} ${
                      active
                        ? 'bg-[var(--a-bg)] font-semibold text-[var(--a-ink)]'
                        : 'bg-[var(--a-surface)]/85 text-[var(--a-muted)] hover:bg-[var(--a-bg)] hover:text-[var(--a-ink)]'
                    }`}
                  >
                    {active && (
                      <m.span
                        layoutId="folio-movement-bar"
                        transition={isReduced ? { duration: 0.05 } : SPRING_LAYOUT}
                        className="absolute inset-x-0 top-0 h-0.5 bg-[var(--a-accent)]"
                      />
                    )}
                    <span className="truncate">
                      <span className={active ? 'text-[var(--a-accent-text)] font-bold' : ''}>
                        {mv.roman}.
                      </span>{' '}
                      {mv.heading}
                    </span>
                    <span className="text-[var(--a-muted)] tabular-nums shrink-0">
                      {mv.timestampFormatted}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Body Prose */}
      {readerMode === 'scroll' || !canPaginate ? (
        <div>{bodyContent(markdown)}</div>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={`ep-${episodeNumber}-mv-${currentMovement.index}`}
            initial={isReduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={isReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: isReduced ? 0.14 : 0.28, ease: EASE_EDITORIAL }}
          >
            {onSeekTimestamp && (
              <div className="mb-3 flex items-center justify-between text-xs font-mono text-[var(--a-muted)]">
                <span>Movement {currentMovement.roman}</span>
                <button
                  type="button"
                  onClick={() => onSeekTimestamp(currentMovement.startTimeSeconds)}
                  className="min-h-[36px] text-[var(--a-accent-text)] font-semibold hover:underline underline-offset-4 cursor-pointer"
                >
                  ▶ Hear from {currentMovement.timestampFormatted}
                </button>
              </div>
            )}

            {bodyContent(currentMovement.markdown)}

            {/* Tactile Folio Turn Pedestal */}
            <nav
              aria-label="Movement pagination"
              className="mt-10 pt-6 border-t border-[var(--a-rule)] grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {activeMovementIdx > 0 ? (
                <button
                  type="button"
                  onClick={() => selectMovement(activeMovementIdx - 1, true)}
                  className="text-left min-h-[60px] px-4 py-3 border border-[var(--a-rule)] hover:border-[var(--a-ink)] t-color cursor-pointer"
                >
                  <span className="block font-mono text-xs text-[var(--a-muted)]">
                    ← Previous Movement ({movements[activeMovementIdx - 1].roman})
                  </span>
                  <span className="block font-serif text-base font-semibold mt-0.5 truncate">
                    {movements[activeMovementIdx - 1].heading}
                  </span>
                </button>
              ) : onRequestPrevEpisode ? (
                <button
                  type="button"
                  onClick={onRequestPrevEpisode}
                  className="text-left min-h-[60px] px-4 py-3 border border-[var(--a-rule)] hover:border-[var(--a-ink)] t-color cursor-pointer"
                >
                  <span className="block font-mono text-xs text-[var(--a-muted)]">
                    ← Previous Episode
                  </span>
                  <span className="block font-serif text-base font-semibold mt-0.5 truncate">
                    {prevEpisodeTitle || `Episode ${episodeNumber - 1}`}
                  </span>
                </button>
              ) : (
                <span />
              )}

              {activeMovementIdx + 1 < movements.length ? (
                <button
                  type="button"
                  data-testid="folio-next-movement-btn"
                  onClick={() => selectMovement(activeMovementIdx + 1, true)}
                  className="text-right min-h-[60px] px-4 py-3 border border-[var(--a-accent)]/50 bg-[var(--a-surface)]/70 hover:border-[var(--a-accent)] t-color cursor-pointer"
                >
                  <span className="block font-mono text-xs text-[var(--a-accent-text)] font-semibold">
                    Turn to Movement {movements[activeMovementIdx + 1].roman} ({activeMovementIdx + 2}/{movements.length}) →
                  </span>
                  <span className="block font-serif text-base font-semibold mt-0.5 truncate">
                    {movements[activeMovementIdx + 1].heading}
                  </span>
                </button>
              ) : onRequestNextEpisode ? (
                <button
                  type="button"
                  onClick={onRequestNextEpisode}
                  className="text-right min-h-[60px] px-4 py-3 border border-[var(--a-accent)]/50 bg-[var(--a-surface)]/70 hover:border-[var(--a-accent)] t-color cursor-pointer"
                >
                  <span className="block font-mono text-xs text-[var(--a-accent-text)] font-semibold">
                    End of Essay · Continue Audio Journey →
                  </span>
                  <span className="block font-serif text-base font-semibold mt-0.5 truncate">
                    {nextEpisodeTitle || `Episode ${episodeNumber + 1}`}
                  </span>
                </button>
              ) : (
                <span />
              )}
            </nav>
          </m.div>
        </AnimatePresence>
      )}
    </div>
  );
}
