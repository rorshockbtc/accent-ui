'use client';

import React, { useState } from 'react';
import { Stage, Seg } from '../primitives';
import { AccentShaderBackdrop } from '@/components/art';
import {
  AccentClassicalStage,
  AccentFolioStrip,
  resolveThesisMoodPalette,
} from '@/components/art/classical-stage';
import { AccentSynthesisAtlas } from '@/components/art/synthesis-atlas';
import { AccentFolioReader } from '@/components/art/folio-reader';

const SAMPLE_PLATES = [
  {
    ep: 1,
    shortLabel: 'Ep 01',
    title: 'Volga & Gracchi',
    durationLabel: '55m',
    coldOpen: 'January 1897. Filling in the first census of the Empire, Nicholas II writes: "Master of the Russian Land."',
    src: '/accent/exhibition/repin-volga.jpg',
    caption: 'Agrarian foundations across river trade and smallholder property.',
    credit: 'Ilya Repin, Barge Haulers on the Volga (1873), State Russian Museum',
  },
  {
    ep: 3,
    shortLabel: 'Ep 03',
    title: 'Vanguard Capture',
    durationLabel: '48m',
    coldOpen: 'Summer 1903. Forty-three exiles open a congress in a Brussels flour warehouse before splitting in London.',
    src: '/accent/exhibition/kustodiev-bolshevik.jpg',
    caption: 'Organized discipline overcoming procedural majorities.',
    credit: 'Boris Kustodiev, The Bolshevik (1920), State Tretyakov Gallery',
  },
  {
    ep: 4,
    shortLabel: 'Ep 04',
    title: 'Managerial Machine',
    durationLabel: '45m',
    coldOpen: 'Around 315 AD, Lactantius warns there are now fewer taxpayers than officials drawing wages.',
    src: '/accent/exhibition/cole-consummation.jpg',
    caption: 'Administrative apparatus expanding beyond productive taxpayers.',
    credit: 'Thomas Cole, The Consummation of Empire (1836), New-York Historical Society',
  },
];

export function ExhibitionStageDemo() {
  const [epNum, setEpNum] = useState(1);
  const [domain, setDomain] = useState<'history' | 'information-theory' | 'bitcoin'>('history');
  const [live, setLive] = useState(true);

  const plate = SAMPLE_PLATES.find((p) => p.ep === epNum) ?? SAMPLE_PLATES[0];
  const palette = resolveThesisMoodPalette([domain], epNum, 'light');

  return (
    <Stage
      label="Exhibition mood shader & interactive folio strip"
      controls={
        <Seg
          label="Subject domain"
          value={domain}
          onChange={setDomain}
          options={[
            { id: 'history', label: 'Classical History' },
            { id: 'information-theory', label: 'Information Theory' },
            { id: 'bitcoin', label: 'Monetary Rules' },
          ]}
        />
      }
      caption="Mood shaders shift pigment automatically by subject domain and episode while preserving WCAG contrast on the reading surface."
    >
      <div className="relative overflow-hidden border border-[var(--a-rule)] p-4 sm:p-6 space-y-4 bg-[var(--a-bg)]">
        <AccentShaderBackdrop palette={palette} paused={!live} className="opacity-35" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6 space-y-3">
            <p className="font-sans text-xs uppercase tracking-[0.12em] text-[var(--a-accent-text)] font-semibold">
              Domain Wash · pipe\{domain}
            </p>
            <h4 className="font-serif text-2xl font-semibold text-[var(--a-ink)]">
              {plate.title}
            </h4>
            <AccentFolioStrip
              items={SAMPLE_PLATES.map((p) => ({
                episodeNumber: p.ep,
                shortLabel: p.shortLabel,
                title: p.title,
                durationLabel: p.durationLabel,
                testId: `demo-folio-${p.ep}`,
              }))}
              activeEpisodeNumber={epNum}
              layoutScope="demo"
              onSelectEpisode={setEpNum}
            />
          </div>
          <div className="md:col-span-6">
            <AccentClassicalStage
              activePlate={{
                src: plate.src,
                alt: plate.caption,
                caption: plate.caption,
                credit: plate.credit,
                coldOpen: plate.coldOpen,
                plateLabel: plate.shortLabel,
                hotspots: [
                  {
                    xPct: 32,
                    yPct: 38,
                    label: 'Primary Grid',
                    detail: 'Loupe reveals hairline structural divisions and ink hierarchy.',
                  },
                  {
                    xPct: 68,
                    yPct: 58,
                    label: 'Color Interaction',
                    detail: 'Warm sandstone paper absorbs saturated pigment washes cleanly.',
                  },
                ],
              }}
              atmosphereLive={live}
              onToggleAtmosphere={() => setLive((v) => !v)}
            />
          </div>
        </div>
      </div>
    </Stage>
  );
}

export function ExhibitionAtlasDemo() {
  return (
    <Stage
      label="Four-lens synthesis atlas"
      caption="Every multi-epoch comparison or Pipe graph ships Trajectory, Pipe Loom, Chronology, and an accessible Data Table twin."
    >
      <AccentSynthesisAtlas
        kicker="Pattern Specimen · Cross-Pipe Atlas"
        title="One Sequence Across Four Lenses"
        columns={['Early Form', 'Turning Point', 'Modern Parallel']}
        rows={[
          {
            episodeNumber: 1,
            stage: 'I. Distributed Ownership',
            evidencePin: 'Smallholder base anchors civic liberty',
            cells: [
              'Yeoman citizenry holds land & tools directly.',
              'Credit enclosure concentrates estates.',
              'Subscriptions replace household asset stakes.',
            ],
          },
          {
            episodeNumber: 2,
            stage: 'II. Procedural Capture',
            evidencePin: 'Formal names stay while rules shift',
            cells: [
              'Committees keep republican ceremonial titles.',
              'Organized vanguard captures scheduling.',
              'Managerial boards insulate policy from voters.',
            ],
          },
          {
            episodeNumber: 3,
            stage: 'III. Administrative Overhead',
            evidencePin: 'Guardians outnumber net contributors',
            cells: [
              'Subdivided ministries multiply mandates.',
              'Permits & compliance slow workshops.',
              'Local-first tools reopen exit routes.',
            ],
          },
        ]}
        pipes={[
          { slug: 'history', label: 'pipe\\history', episodes: [1, 2], why: 'Primary historical records' },
          { slug: 'economics', label: 'pipe\\economics', episodes: [1, 3], why: 'Property and transaction costs' },
          { slug: 'politics', label: 'pipe\\politics', episodes: [2, 3], why: 'Elite organization and capture' },
        ]}
        episodes={[
          { episodeNumber: 1, title: 'Household Stakes', essayWords: 1200 },
          { episodeNumber: 2, title: 'Capture Mechanics', essayWords: 1450 },
          { episodeNumber: 3, title: 'Exit & Remedy', essayWords: 1380 },
        ]}
        bibliography={[
          {
            id: 'bib-plutarch',
            author: 'Plutarch',
            title: 'Life of Tiberius Gracchus',
            year: '133 BC',
            url: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Tiberius_Gracchus*.html',
            pipe: 'history',
            roleInThesis: 'Documents agrarian dispossession before constitutional breakdown.',
          },
          {
            id: 'bib-burnham',
            author: 'James Burnham',
            title: 'The Managerial Revolution',
            year: '1941',
            url: 'https://archive.org/details/in.ernet.dli.2015.49967',
            pipe: 'politics',
            roleInThesis: 'Identifies separation of administrative control from legal ownership.',
          },
          {
            id: 'bib-hirschman',
            author: 'Albert O. Hirschman',
            title: 'Exit, Voice, and Loyalty',
            year: '1970',
            url: 'https://archive.org',
            pipe: 'economics',
            roleInThesis: 'Models how voice collapses without real exit alternatives.',
          },
        ]}
      />
    </Stage>
  );
}

export function ExhibitionFolioReaderDemo() {
  const sampleMarkdown = `## I. The Opening Scene

Long-form companion essays do not need to dump two thousand words in a single vertical wall while a reader listens to an episode. Breaking prose along natural structural headings lets readers turn movements at the pace of conversation.

## II. The Audio-Synced Turn

Each movement links proportionally to chapter timestamps so a listener can jump backward or forward between printed argument and spoken exchange without losing their place.`;

  return (
    <Stage
      label="Audio-synced paginated movements"
      caption="Long-form companions paginate cleanly into movements with direct audio jump links and an optional continuous scroll mode."
    >
      <AccentFolioReader
        markdown={sampleMarkdown}
        episodeNumber={1}
        durationSeconds={1800}
        chapters={[
          { startTime: 0, timestampFormatted: '00:00' },
          { startTime: 840, timestampFormatted: '14:00' },
        ]}
      />
    </Stage>
  );
}

export function ExhibitionA11yMotionDemo() {
  const [paused, setPaused] = useState(true);
  return (
    <Stage
      label="WCAG 2.2.2 atmospheric pause control & reduced-motion state"
      caption="Shaders, pointer loupes, and media-coupled cadence reeds expose an explicit Pause/Live switch and freeze automatically under prefers-reduced-motion."
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border border-[var(--a-rule)] p-4 bg-[var(--a-surface)]">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.12em] text-[var(--a-accent-text)] font-semibold">
            Atmosphere State: {paused ? 'Still (Paused)' : 'Live Reactive'}
          </p>
          <p className="text-sm text-[var(--a-muted)] mt-1">
            Label toggles text directly without setting ambiguous aria-pressed states when wording changes.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="min-h-[44px] px-4 border border-[var(--a-rule)] bg-[var(--a-bg)] font-sans text-xs font-semibold cursor-pointer hover:border-[var(--a-ink)]"
        >
          {paused ? 'Resume Atmosphere' : 'Pause Atmosphere'}
        </button>
      </div>
    </Stage>
  );
}

export const EXHIBITION_STAGE_DEMOS: Record<string, React.ComponentType> = {
  'exhibition-stage-demo': ExhibitionStageDemo,
  'exhibition-atlas-demo': ExhibitionAtlasDemo,
  'exhibition-folio-reader-demo': ExhibitionFolioReaderDemo,
  'exhibition-a11y-motion-demo': ExhibitionA11yMotionDemo,
};
