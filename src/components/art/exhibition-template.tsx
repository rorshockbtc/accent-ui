'use client';

import React, { useMemo, useState } from 'react';
import { useMotionPreference } from '@/components/motion/MotionProvider';
import { EASE_EDITORIAL } from '@/lib/motion/tokens';
import { m } from 'framer-motion';
import {
  AccentBloomButton,
  AccentShaderBackdrop,
  type SkyPalette,
} from './index';
import {
  AccentAudioCadenceBar,
  AccentClassicalStage,
  AccentFolioStrip,
  resolveThesisMoodPalette,
  type CadenceChapter,
  type ClassicalStagePlate,
  type FolioStripItem,
} from './classical-stage';
import {
  AccentSharePlateDialog,
  AccentSynthesisAtlas,
  type AccentSynthesisAtlasProps,
} from './synthesis-atlas';
import { AccentFolioReader } from './folio-reader';

/* ============================================================================
 * 1. AccentExhibitionHero — 4-Plane Monumental Layered Museum Stage
 * ========================================================================== */

export interface AccentExhibitionHeroProps {
  editionLabel: string;
  catalogueStamp: string;
  title: string;
  subtitle: string;
  heroPalette: SkyPalette;
  atmosphereLive: boolean;
  onToggleAtmosphere: () => void;
  salonExpanded: boolean;
  onToggleSalon: () => void;
  activePlate: ClassicalStagePlate;
  seriesCoverPlate?: ClassicalStagePlate;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progressRatio: number;
  activeEpisodeNumber: number;
  activeEpisodeLabel: string;
  activeEpisodeTitle: string;
  activeChapterTitle?: string;
  chapters: CadenceChapter[];
  analyserNode?: AnalyserNode | null;
  primaryCtaContent: React.ReactNode;
  onPrimaryPlayClick: () => void;
  secondaryActions: React.ReactNode;
  episodePickerHeader: React.ReactNode;
  folioItems: FolioStripItem[];
  onSelectEpisode: (epNum: number) => void;
  onSeek: (seconds: number) => void;
  onSkipDelta: (delta: number) => void;
  onOpenSharePlate: () => void;
  marginalia?: React.ReactNode;
  theme?: 'light' | 'dark';
  watermarkRoman?: string;
}

/**
 * 4-Plane Layered Exhibition Hero (Accént Surface Archetype: `exhibition`):
 *   Plane 0: Domain-derived WebGL pigment shader + architectural registration hairlines
 *   Plane 1: Full-12-col Monumental Display Masthead (up to 80px serif display scale)
 *   Plane 2: Double-Matted Ebonized Masterwork Stage (`cols 5..13` gallery split, or `cols 1..13` Salon Wall)
 *   Plane 3: Foreground Frosted Vellum Audio & Citation Plinth (`cols 1..6`, overlapping col 5 on `lg+`)
 *   Plane 4: 12-col Multi-Canvas Polyptych Contact Sheet (`AccentFolioStrip`)
 */
export function AccentExhibitionHero({
  editionLabel,
  catalogueStamp,
  title,
  subtitle,
  heroPalette,
  atmosphereLive,
  onToggleAtmosphere,
  salonExpanded,
  onToggleSalon,
  activePlate,
  seriesCoverPlate,
  isPlaying,
  currentTime,
  duration,
  progressRatio,
  activeEpisodeNumber,
  activeEpisodeLabel,
  activeEpisodeTitle,
  activeChapterTitle,
  chapters,
  analyserNode,
  primaryCtaContent,
  onPrimaryPlayClick,
  secondaryActions,
  episodePickerHeader,
  folioItems,
  onSelectEpisode,
  onSeek,
  onSkipDelta,
  onOpenSharePlate,
  marginalia,
  theme = 'light',
  watermarkRoman,
}: AccentExhibitionHeroProps) {
  const { isReduced } = useMotionPreference();

  return (
    <section
      data-testid="thesis-hero"
      className="relative overflow-hidden border-b border-[var(--a-rule)] bg-[var(--a-surface)]/40"
    >
      {/* Plane 0: Wet-in-Wet Domain Pigment Atmosphere + Registration Rules */}
      <AccentShaderBackdrop
        palette={heroPalette}
        paused={!atmosphereLive}
        progress={Math.min(1, Math.max(0.18, progressRatio))}
        className={theme === 'dark' ? 'opacity-[0.28]' : 'opacity-[0.38]'}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--a-bg)]/88 via-[var(--a-bg)]/48 to-[var(--a-bg)]/82"
      />
      {watermarkRoman && (
        <div
          aria-hidden="true"
          className="pointer-events-none select-none hidden lg:block absolute -top-10 right-6 font-serif font-light leading-none tracking-[-0.06em] text-[clamp(10rem,18vw,17rem)] text-[var(--a-ink)] opacity-[0.045]"
        >
          {watermarkRoman}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-3.5 pb-5 sm:pt-5 sm:pb-7 lg:pt-6 lg:pb-8 space-y-4 lg:space-y-5">
        {/* Plane 1: Monumental Horizontal Masthead & Catalogue Stamp */}
        <header className="space-y-1.5 sm:space-y-2 border-b border-[var(--a-ink)]/12 pb-3 sm:pb-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-[0.14em] text-[var(--a-muted)]">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="inline-block w-5 h-px bg-[var(--a-accent)] shrink-0" aria-hidden="true" />
              <span className="text-[var(--a-accent-text)] font-semibold">
                {editionLabel}
              </span>
            </div>
            <span className="hidden sm:inline tabular-nums shrink-0">{catalogueStamp}</span>
          </div>

          <h1
            className="font-serif text-[26px] sm:text-5xl lg:text-[62px] xl:text-[72px] leading-[1.01] tracking-[-0.03em] font-semibold text-[var(--a-ink)] max-w-[22ch]"
            style={{ fontFamily: 'var(--font-accent-display), Georgia, serif' }}
          >
            <m.span
              className="block"
              initial={isReduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isReduced ? 0.16 : 0.65, ease: EASE_EDITORIAL }}
            >
              {title}
            </m.span>
          </h1>

          <p
            className="text-[15px] sm:text-base lg:text-lg leading-6 sm:leading-7 text-[var(--a-muted)] max-w-[66ch] line-clamp-2 sm:line-clamp-none"
            style={{ fontFamily: 'var(--font-accent-serif), Georgia, serif' }}
          >
            {subtitle}
          </p>
        </header>

        {/* Mobile Compact Painting Plate (`< lg` above-the-fold framing) */}
        <div className="lg:hidden">
          <AccentClassicalStage
            compactMobile
            activePlate={activePlate}
            atmosphereLive={atmosphereLive}
            onToggleAtmosphere={onToggleAtmosphere}
          />
        </div>

        {/* Plane 2 & Plane 3: Overlapping Frosted Vellum Plinth (cols 1..6) over Ebonized Museum Stage (cols 5..13) */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-0 ${
            salonExpanded ? 'lg:gap-y-6' : 'lg:items-end'
          }`}
        >
          {/* Plane 2: Monumental Framed Painting Canvas (`cols 5..13` or full `cols 1..13` in Salon Wall mode) */}
          <div
            className={`hidden lg:block ${
              salonExpanded
                ? 'lg:col-span-12'
                : 'lg:col-start-5 lg:col-end-13 lg:row-start-1 z-10'
            }`}
          >
            <AccentClassicalStage
              activePlate={activePlate}
              seriesCoverPlate={seriesCoverPlate}
              isPlaying={isPlaying}
              atmosphereLive={atmosphereLive}
              onToggleAtmosphere={onToggleAtmosphere}
              salonExpanded={salonExpanded}
              onToggleSalon={onToggleSalon}
              onOpenSharePlate={onOpenSharePlate}
            />
          </div>

          {/* Plane 3: Foreground Translucent Vellum Plinth (`cols 1..7`, overlaps Painting left plinth on `lg+`) */}
          <div
            data-testid="hero-audio-card"
            className={
              salonExpanded
                ? 'lg:col-span-12 lg:p-5 bg-[var(--a-bg)]/94 backdrop-blur-md border border-[var(--a-ink)]/18 space-y-2.5'
                : 'lg:col-start-1 lg:col-end-7 lg:row-start-1 z-20 lg:mb-4 lg:p-5 bg-[var(--a-bg)]/94 lg:border lg:border-[var(--a-ink)]/18 lg:shadow-[0_28px_64px_-20px_rgba(17,24,39,0.28)] backdrop-blur-md space-y-3'
            }
          >
            {/* Primary Focal Button + Quiet Unboxed Controls */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <AccentBloomButton
                variant="pink"
                data-testid="play-active-episode-btn"
                onClick={onPrimaryPlayClick}
                className="!min-h-[44px] !px-5 !text-sm !font-semibold shrink-0"
              >
                {primaryCtaContent}
              </AccentBloomButton>
              {secondaryActions}
            </div>

            <AccentAudioCadenceBar
              episodeLabel={activeEpisodeLabel}
              episodeTitle={activeEpisodeTitle}
              activeChapterTitle={activeChapterTitle}
              chapters={chapters}
              currentTime={currentTime}
              duration={duration}
              isPlaying={isPlaying}
              analyserNode={analyserNode}
              onSeek={onSeek}
              onSkipDelta={onSkipDelta}
            />

            {marginalia && (
              <div className="pt-2.5 border-t border-[var(--a-rule)]">{marginalia}</div>
            )}
          </div>
        </div>

        {/* Plane 4: 12-Column Polyptych Gallery Contact Sheet */}
        <div className="space-y-1.5" data-testid="hero-episode-picker">
          <div className="flex items-center justify-between gap-2 text-xs font-mono">
            {episodePickerHeader}
          </div>
          <AccentFolioStrip
            items={folioItems}
            activeEpisodeNumber={activeEpisodeNumber}
            isPlaying={isPlaying}
            variant="polyptych"
            onSelectEpisode={onSelectEpisode}
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
 * 2. AccentExhibitionTemplate — Turnkey Reusable Page Template for Adopters
 * ========================================================================== */

export interface ExhibitionEpisodeEntry {
  episodeNumber: number;
  partLabel: string;
  romanNumeral: string;
  title: string;
  subtitle: string;
  durationSeconds: number;
  essayMarkdown: string;
  plate: ClassicalStagePlate;
  chapters: Array<CadenceChapter & { index: number; timestampFormatted: string }>;
  pullQuote?: {
    text: string;
    speaker: string;
    work: string;
    locator: string;
  };
}

export interface AccentExhibitionTemplateProps {
  editionLabel: string;
  title: string;
  subtitle: string;
  pipes: string[];
  episodes: ExhibitionEpisodeEntry[];
  atlas: Omit<AccentSynthesisAtlasProps, 'activeEpisodeNumber' | 'onSelectEpisode'>;
  shareBaseUrl?: string;
}

export function AccentExhibitionTemplate({
  editionLabel,
  title,
  subtitle,
  pipes,
  episodes,
  atlas,
  shareBaseUrl = 'https://pipes.pink/design-system/templates/exhibition',
}: AccentExhibitionTemplateProps) {
  const [activeEpNum, setActiveEpNum] = useState<number>(episodes[0]?.episodeNumber ?? 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(140);
  const [atmosphereLive, setAtmosphereLive] = useState(true);
  const [salonExpanded, setSalonExpanded] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const activeEp = useMemo(
    () => episodes.find((e) => e.episodeNumber === activeEpNum) ?? episodes[0],
    [episodes, activeEpNum],
  );
  const moodPalette = useMemo(
    () => resolveThesisMoodPalette(pipes, activeEp?.episodeNumber ?? 1, 'light'),
    [pipes, activeEp?.episodeNumber],
  );

  if (!activeEp) return null;

  const totalSec = activeEp.durationSeconds || 1800;

  return (
    <div className="bg-[var(--a-bg)] text-[var(--a-ink)]">
      <AccentExhibitionHero
        editionLabel={editionLabel}
        catalogueStamp={`${episodes.length} EPISODES · ${atlas.pipes.length} PIPES · ${atlas.bibliography.length} SOURCES`}
        title={title}
        subtitle={subtitle}
        heroPalette={moodPalette}
        atmosphereLive={atmosphereLive}
        onToggleAtmosphere={() => setAtmosphereLive((v) => !v)}
        salonExpanded={salonExpanded}
        onToggleSalon={() => setSalonExpanded((v) => !v)}
        activePlate={activeEp.plate}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={totalSec}
        progressRatio={currentTime / totalSec}
        activeEpisodeNumber={activeEp.episodeNumber}
        activeEpisodeLabel={activeEp.partLabel}
        activeEpisodeTitle={activeEp.title}
        activeChapterTitle={activeEp.chapters[0]?.title}
        chapters={activeEp.chapters}
        watermarkRoman={activeEp.romanNumeral}
        primaryCtaContent={
          <>
            <span aria-hidden>{isPlaying ? '⏸' : '▶'}</span>
            <span>
              {isPlaying
                ? `Pause Ep 0${activeEp.episodeNumber}`
                : `Listen · Ep 0${activeEp.episodeNumber}`}
            </span>
          </>
        }
        onPrimaryPlayClick={() => setIsPlaying((p) => !p)}
        secondaryActions={
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="min-h-[44px] px-2 font-mono text-xs text-[var(--a-accent-text)] font-semibold hover:underline underline-offset-4 cursor-pointer"
          >
            ✦ Share Plate
          </button>
        }
        episodePickerHeader={
          <>
            <span className="uppercase tracking-[0.1em] text-[var(--a-muted)]">
              Exhibition Polyptych ({episodes.length} Plates)
            </span>
            <span className="text-[var(--a-muted)]">Click any canvas to switch movement</span>
          </>
        }
        folioItems={episodes.map((ep) => ({
          episodeNumber: ep.episodeNumber,
          shortLabel: `Ep 0${ep.episodeNumber}`,
          title: ep.title,
          durationLabel: `${Math.round(ep.durationSeconds / 60)}m`,
          thumbnailSrc: ep.plate.src,
          testId: `template-folio-${ep.episodeNumber}`,
        }))}
        onSelectEpisode={(n) => {
          setActiveEpNum(n);
          setCurrentTime(0);
        }}
        onSeek={(sec) => setCurrentTime(sec)}
        onSkipDelta={(d) => setCurrentTime((t) => Math.max(0, Math.min(totalSec, t + d)))}
        onOpenSharePlate={() => setShareOpen(true)}
        marginalia={
          activeEp.pullQuote && (
            <p className="font-serif text-sm italic text-[var(--a-ink)]">
              “{activeEp.pullQuote.text}”{' '}
              <span className="not-italic font-mono text-xs text-[var(--a-muted)]">
                — {activeEp.pullQuote.speaker}, {activeEp.pullQuote.locator}
              </span>
            </p>
          )
        }
      />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <AccentSynthesisAtlas
          {...atlas}
          activeEpisodeNumber={activeEp.episodeNumber}
          onSelectEpisode={(n) => setActiveEpNum(n)}
          onPlayEpisode={(n) => {
            setActiveEpNum(n);
            setIsPlaying(true);
          }}
          onShareStage={() => setShareOpen(true)}
        />

        <div className="max-w-[68ch] mx-auto space-y-8">
          {activeEp.pullQuote && (
            <figure className="relative pl-6 border-l-2 border-[var(--a-accent)]">
              <span
                aria-hidden="true"
                className="block font-serif text-5xl leading-none text-[var(--a-accent)] opacity-45 -mb-3"
              >
                “
              </span>
              <blockquote
                className="font-serif text-2xl sm:text-[30px] leading-[1.3] tracking-[-0.015em] italic text-[var(--a-ink)]"
                style={{ fontFamily: 'var(--font-accent-serif), Georgia, serif' }}
              >
                {activeEp.pullQuote.text}
              </blockquote>
              <figcaption className="mt-3 font-mono text-xs text-[var(--a-muted)]">
                — {activeEp.pullQuote.speaker}, <em>{activeEp.pullQuote.work}</em>,{' '}
                {activeEp.pullQuote.locator}
              </figcaption>
            </figure>
          )}

          <AccentFolioReader
            markdown={activeEp.essayMarkdown}
            episodeNumber={activeEp.episodeNumber}
            durationSeconds={totalSec}
            chapters={activeEp.chapters}
            currentTime={currentTime}
            isPlaying={isPlaying}
            onSeekTimestamp={(sec) => {
              setCurrentTime(sec);
              setIsPlaying(true);
            }}
          />
        </div>
      </div>

      <AccentSharePlateDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        seriesTitle={title}
        episodeLabel={activeEp.partLabel}
        episodeTitle={activeEp.title}
        plateSrc={activeEp.plate.src}
        plateCredit={activeEp.plate.credit}
        quoteOrThesis={activeEp.pullQuote?.text || activeEp.subtitle}
        sourceAttribution={
          activeEp.pullQuote
            ? `${activeEp.pullQuote.speaker}, ${activeEp.pullQuote.work}`
            : editionLabel
        }
        shareUrl={shareBaseUrl}
      />
    </div>
  );
}
