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
 * 1. AccentExhibitionHero — Asymmetric Gallery Split + Living Art Stage
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
 * Clean 4-Plane Museum Exhibition Hero:
 *   Plane 0: Visible domain-derived WebGL pigment shader atmosphere (`Live / Off` toggle)
 *   Plane 1: Monumental Fraunces serif title & unboxed editorial pedestal (`lg:col-span-5`)
 *   Plane 2: Living Masterwork Stage (`lg:col-span-7` or full 12-col Expanded Salon) with
 *            domain `<canvas>` particles (snow, embers, sunbeams, signal), Ken Burns drift,
 *            3D pointer parallax & clamped 2.5x Loupe — zero overlapping card covering caption
 *   Plane 3: Illustrated Polyptych Filmstrip (`AccentFolioStrip`)
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

  const audioPedestal = (
    <div data-testid="hero-audio-card" className="pt-4 border-t border-[var(--a-rule)] space-y-3.5">
      {/* One Sovereign Pink Focal Pill CTA + Clean Sans Unboxed Actions */}
      <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3.5 gap-y-2">
        <AccentBloomButton
          variant="pink"
          data-testid="play-active-episode-btn"
          onClick={onPrimaryPlayClick}
          className="!min-h-[44px] sm:!min-h-[46px] !px-4 sm:!px-6 !rounded-full !bg-[#FE299E] hover:!bg-[#111827] !text-white !shadow-[0_12px_30px_-10px_rgba(254,41,158,0.65)] !text-xs sm:!text-sm !font-sans !font-semibold shrink-0"
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
        atmosphereLive={atmosphereLive}
        analyserNode={analyserNode}
        onSeek={onSeek}
        onSkipDelta={onSkipDelta}
      />

      {marginalia && <div className="pt-2.5 border-t border-[var(--a-rule)]">{marginalia}</div>}
    </div>
  );

  return (
    <section
      data-testid="thesis-hero"
      className="relative overflow-hidden border-b border-[var(--a-rule)] bg-[var(--a-surface)]/30"
    >
      {/* Plane 0: Perceptible Flowing Pigment Shader Atmosphere */}
      <AccentShaderBackdrop
        palette={heroPalette}
        paused={!atmosphereLive}
        progress={Math.min(1, Math.max(0.18, progressRatio))}
        className={theme === 'dark' ? 'opacity-[0.46]' : 'opacity-[0.65]'}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(ellipse 68% 78% at 22% 40%, rgba(17,24,39,0.72) 0%, rgba(17,24,39,0.28) 76%)'
              : 'radial-gradient(ellipse 68% 78% at 22% 40%, rgba(232,226,213,0.78) 0%, rgba(232,226,213,0.28) 76%)',
        }}
      />

      {watermarkRoman && (
        <div
          aria-hidden="true"
          className="pointer-events-none select-none hidden lg:block absolute -top-6 right-8 font-serif font-light leading-none tracking-[-0.05em] text-[clamp(8rem,13vw,12rem)] text-[var(--a-ink)] opacity-[0.04]"
          style={{ fontFamily: 'var(--font-accent-display, var(--font-serif), Georgia, serif)' }}
        >
          {watermarkRoman}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-3 pb-5 sm:pt-6 sm:pb-8 lg:pt-8 lg:pb-10 space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Quiet Sans Gallery Top Stamp */}
        <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-[var(--a-rule)] text-xs font-sans uppercase tracking-[0.1em] sm:tracking-[0.14em] text-[var(--a-muted)]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-4 sm:w-5 h-px bg-[var(--a-accent)] shrink-0" aria-hidden="true" />
            <span className="text-[var(--a-accent-text)] font-semibold truncate">{editionLabel}</span>
          </div>
          <span className="hidden sm:inline tabular-nums shrink-0 font-medium">{catalogueStamp}</span>
        </div>

        {/* Asymmetric Split Poster (lg:cols 1..5 Editorial + Unboxed Audio | lg:cols 6..12 Living Art) */}
        {salonExpanded ? (
          <div className="space-y-6">
            <header className="max-w-[54rem] space-y-2.5">
              <h1
                className="font-serif text-[2rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4.1rem] leading-[1.03] tracking-[-0.03em] font-semibold text-[var(--a-ink)] text-balance"
                style={{ fontFamily: 'var(--font-accent-display, var(--font-serif), Georgia, serif)' }}
              >
                <m.span
                  className="block"
                  initial={isReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: isReduced ? 0.16 : 0.6, ease: EASE_EDITORIAL }}
                >
                  {title}
                </m.span>
              </h1>
              <p
                className="font-serif text-[15px] sm:text-lg lg:text-xl leading-6 sm:leading-7 text-[var(--a-ink)]/80 max-w-[60ch] text-pretty"
                style={{ fontFamily: 'var(--font-accent-serif, var(--font-serif), Georgia, serif)' }}
              >
                {subtitle}
              </p>
            </header>

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

            {audioPedestal}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 lg:items-start">
            {/* Left Column: Editorial Headline, Mobile Stage, and Clean Unboxed Audio Pedestal */}
            <div className="lg:col-span-5 min-w-0 space-y-4">
              <header className="space-y-2.5">
                <h1
                  className="font-serif text-[1.9rem] sm:text-5xl lg:text-[3.15rem] xl:text-[3.75rem] leading-[1.03] tracking-[-0.03em] font-semibold text-[var(--a-ink)] text-balance"
                  style={{ fontFamily: 'var(--font-accent-display, var(--font-serif), Georgia, serif)' }}
                >
                  <m.span
                    className="block"
                    initial={isReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: isReduced ? 0.16 : 0.6, ease: EASE_EDITORIAL }}
                  >
                    {title}
                  </m.span>
                </h1>

                <p
                  className="font-serif text-[15px] sm:text-lg leading-6 sm:leading-7 text-[var(--a-ink)]/80 line-clamp-2 sm:line-clamp-none text-pretty"
                  style={{ fontFamily: 'var(--font-accent-serif, var(--font-serif), Georgia, serif)' }}
                >
                  {subtitle}
                </p>
              </header>

              {/* Mobile Compact Living Stage (`< lg`: animated canvas right between Subtitle & Listen CTA) */}
              <div className="lg:hidden">
                <AccentClassicalStage
                  compactMobile
                  activePlate={activePlate}
                  seriesCoverPlate={seriesCoverPlate}
                  isPlaying={isPlaying}
                  atmosphereLive={atmosphereLive}
                  onToggleAtmosphere={onToggleAtmosphere}
                />
              </div>

              {audioPedestal}
            </div>

            {/* Right Column: Full Living Masterwork Stage (`lg+` unobstructed by any box!) */}
            <div className="hidden lg:block lg:col-span-7 min-w-0">
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
          </div>
        )}

        {/* Illustrated Visual Polyptych Filmstrip */}
        <div className="pt-4 border-t border-[var(--a-rule)] space-y-2.5" data-testid="hero-episode-picker">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans font-medium">
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
            className="min-h-[44px] px-2 font-sans text-xs text-[var(--a-accent-text)] font-semibold hover:underline underline-offset-4 cursor-pointer"
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
            <p
              className="font-serif text-sm italic text-[var(--a-ink)]"
              style={{ fontFamily: 'var(--font-accent-serif, var(--font-serif), Georgia, serif)' }}
            >
              “{activeEp.pullQuote.text}”{' '}
              <span className="not-italic font-sans text-xs text-[var(--a-muted)]">
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
                className="font-serif text-2xl sm:text-[30px] leading-[1.3] tracking-[-0.015em] italic text-[var(--a-ink)] text-pretty"
                style={{ fontFamily: 'var(--font-accent-serif, var(--font-serif), Georgia, serif)' }}
              >
                {activeEp.pullQuote.text}
              </blockquote>
              <figcaption className="mt-3 font-sans text-xs text-[var(--a-muted)]">
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
