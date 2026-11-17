'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Code2, ArrowLeft } from 'lucide-react';
import {
  AccentExhibitionTemplate,
  type ExhibitionEpisodeEntry,
} from '@/components/art/exhibition-template';

const SAMPLE_PRESETS: Record<
  'civilization' | 'epistemic',
  {
    label: string;
    editionLabel: string;
    title: string;
    subtitle: string;
    pipes: string[];
    episodes: ExhibitionEpisodeEntry[];
    columns: string[];
    rows: Array<{ episodeNumber: number; stage: string; evidencePin: string; cells: string[] }>;
    pipeNodes: Array<{ slug: string; label: string; discipline: string; why: string; episodes: number[] }>;
    bibliography: Array<{
      id: string;
      author: string;
      title: string;
      year: string;
      url: string;
      pipe: string;
      roleInThesis: string;
    }>;
  }
> = {
  civilization: {
    label: 'History & Institutions',
    editionLabel: 'Accént Exhibition Template · Audio + Synthesis Atlas',
    title: 'How Republics Trade Farmers for Managers',
    subtitle:
      'Four museum plates paired with synchronized audio chapters, a 2.5x curator loupe, and a 2,000-year comparative evidence atlas.',
    pipes: ['ancient-history', 'history', 'politics', 'institutional-capture'],
    columns: ['Roman Republic (133 BC)', 'Russia (1903–1921)', 'Modern Administrative State'],
    rows: [
      {
        episodeNumber: 1,
        stage: 'I. Smallholder Base Under Pressure',
        evidencePin: 'Plutarch 9.4 · Stolypin Reform',
        cells: [
          'Citizen soldiers return to bought-out homesteads.',
          'Communal mir village holds land in collective debt.',
          'Rising compliance floor favors large balance sheets.',
        ],
      },
      {
        episodeNumber: 2,
        stage: 'II. Vanguard Over Procedure',
        evidencePin: 'Tacitus Annals 1.2 · 1903 Split',
        cells: [
          'Formal magistracies stay visible as command centralizes.',
          'Disciplined minority captures rail and telegraph hubs.',
          'Institutional committees outmaneuver dispersed members.',
        ],
      },
      {
        episodeNumber: 3,
        stage: 'III. Administrators Outnumber Producers',
        evidencePin: 'Lactantius DMP 7 · 5.4M Officials',
        cells: [
          'Tax receivers surpass tax contributors under Diocletian.',
          'State ministries expand tenfold while grain shipments stall.',
          'Managerial layer decouples compensation from outcomes.',
        ],
      },
      {
        episodeNumber: 4,
        stage: 'IV. Exit & Household Renewal',
        evidencePin: 'Hirschman 1970 · Local Property',
        cells: [
          'Rural coloni bound to imperial tax ledgers.',
          'Rebellion in Tambov crushed by central requisitions.',
          'Independent tools and direct property restore civic voice.',
        ],
      },
    ],
    pipeNodes: [
      {
        slug: 'ancient-history',
        label: 'pipe\\ancient-history',
        discipline: 'Classical Antiquity',
        why: 'Agrarian law, Gracchi reforms, and late Roman fiscal collapse.',
        episodes: [1, 2, 3],
      },
      {
        slug: 'history',
        label: 'pipe\\history',
        discipline: 'Modern History',
        why: 'Emancipation decrees, Stolypin homesteads, and 1917 logistics.',
        episodes: [1, 2, 4],
      },
      {
        slug: 'politics',
        label: 'pipe\\politics',
        discipline: 'Elite Theory',
        why: 'How small disciplined caucuses capture procedural assemblies.',
        episodes: [2, 3, 4],
      },
      {
        slug: 'economics',
        label: 'pipe\\economics',
        discipline: 'Political Economy',
        why: 'Transaction costs, ownership boundaries, and exit capacity.',
        episodes: [1, 3, 4],
      },
    ],
    bibliography: [
      {
        id: 'plutarch',
        author: 'Plutarch',
        title: 'Life of Tiberius Gracchus',
        year: '133 BC',
        url: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Tiberius_Gracchus*.html',
        pipe: 'ancient-history',
        roleInThesis: 'Records the speech warning that Rome’s soldiers have no clod of earth.',
      },
      {
        id: 'tacitus',
        author: 'Tacitus',
        title: 'Annals, Book I',
        year: '116',
        url: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Tacitus/Annals/1A*.html',
        pipe: 'ancient-history',
        roleInThesis: 'Shows how Augustus kept republican titles while absorbing real command.',
      },
      {
        id: 'lactantius',
        author: 'Lactantius',
        title: 'On the Deaths of the Persecutors',
        year: '315',
        url: 'https://www.newadvent.org/fathers/0705.htm',
        pipe: 'history',
        roleInThesis: 'Eye-witness account of administrative receivers exceeding taxpayers.',
      },
      {
        id: 'burnham',
        author: 'James Burnham',
        title: 'The Managerial Revolution',
        year: '1941',
        url: 'https://archive.org/details/in.ernet.dli.2015.49967',
        pipe: 'politics',
        roleInThesis: 'Traces control moving from proprietors to salaried administrators.',
      },
      {
        id: 'hirschman',
        author: 'Albert O. Hirschman',
        title: 'Exit, Voice, and Loyalty',
        year: '1970',
        url: 'https://archive.org',
        pipe: 'economics',
        roleInThesis: 'Demonstrates why voice requires viable independent exit alternatives.',
      },
    ],
    episodes: [
      {
        episodeNumber: 1,
        partLabel: 'Movement I',
        romanNumeral: 'I',
        title: 'Barge Haulers & Smallholders',
        subtitle: 'Why societies weaken before the first palace argument starts.',
        durationSeconds: 3240,
        plate: {
          src: '/accent/exhibition/repin-volga.jpg',
          alt: "Ilya Repin's Barge Haulers on the Volga (1873)",
          caption: 'Eleven men haul a river barge against the Volga current.',
          credit: 'Ilya Repin, 1873, State Russian Museum',
          plateLabel: 'Plate 01 · Repin (1873)',
          coldOpen:
            'January 1897. Asked his occupation on the first Russian census, Nicholas II fills in: "Master of the Russian Land."',
          hotspots: [
            {
              xPct: 32,
              yPct: 48,
              label: 'The Tow Rope',
              detail: 'Seasonal peasant labor bound the grain corridors well into industrial railroads.',
            },
            {
              xPct: 72,
              yPct: 36,
              label: 'Distant Steam',
              detail: 'On the horizon sits the steamship—industrial scale creeping behind human draft power.',
            },
          ],
        },
        chapters: [
          { index: 1, title: 'When Families Lose Property', startTime: 0, timestampFormatted: '00:00' },
          { index: 2, title: 'Tiberius Gracchus & Stolypin', startTime: 1120, timestampFormatted: '18:40' },
        ],
        pullQuote: {
          text: 'Though they are styled masters of the world, they have not a single clod of earth that is their own.',
          speaker: 'Tiberius Gracchus',
          work: 'Plutarch, Life of Tiberius Gracchus',
          locator: '9.5',
        },
        essayMarkdown: `## I. The Foundation Beneath Politics\n\nPolitical crisis arrives late. Long before crowds gather in a square, the independent household loses its economic footing.\n\n## II. Why Reformers Get Caught in the Middle\n\nBoth Tiberius Gracchus in 133 BC and Pyotr Stolypin in 1906 wagered that freeholding families stabilize a state. Both faced entrenched rent-collectors on one side and revolutionaries on the other.`,
      },
      {
        episodeNumber: 2,
        partLabel: 'Movement II',
        romanNumeral: 'II',
        title: 'Disciplined Vanguards',
        subtitle: 'How rule-followers lose to opponents organized strictly for leverage.',
        durationSeconds: 2880,
        plate: {
          src: '/accent/exhibition/kustodiev-bolshevik.jpg',
          alt: "Boris Kustodiev's The Bolshevik (1920)",
          caption: 'A colossal red banner strides above crowded snowbound streets.',
          credit: 'Boris Kustodiev, 1920, Tretyakov Gallery',
          plateLabel: 'Plate 02 · Kustodiev (1920)',
          coldOpen:
            'Summer 1903. Forty-three exiles cram into a Brussels flour warehouse before relocating to London.',
          hotspots: [
            {
              xPct: 46,
              yPct: 26,
              label: 'Banner Scale',
              detail: 'Disciplined organization magnifies a narrow minority into a seemingly unstoppable tide.',
            },
            {
              xPct: 22,
              yPct: 76,
              label: 'Street Level',
              detail: 'Everyday townspeople watch procedural norms give way to street control.',
            },
          ],
        },
        chapters: [
          { index: 1, title: 'The London Floor Vote', startTime: 0, timestampFormatted: '00:00' },
          { index: 2, title: 'Augustus & Institutional Shells', startTime: 960, timestampFormatted: '16:00' },
        ],
        pullQuote: {
          text: 'Give us an organisation of revolutionaries, and we will overturn Russia.',
          speaker: 'Vladimir Lenin',
          work: 'What Is to Be Done?',
          locator: 'ch. IV (1902)',
        },
        essayMarkdown: `## I. Rules Assuming Good Faith\n\nDebating clubs assume everyone in the room values the bylaws above winning the vote.\n\n## II. The Hermit-Crab Senate\n\nAs Tacitus observed, Augustus kept republican offices standing while quietly gathering command over pay and legions.`,
      },
      {
        episodeNumber: 3,
        partLabel: 'Movement III',
        romanNumeral: 'III',
        title: 'Consummation & Administrators',
        subtitle: 'When those guarding the ledger outnumber those contributing to it.',
        durationSeconds: 2700,
        plate: {
          src: '/accent/exhibition/cole-consummation.jpg',
          alt: "Thomas Cole's Consummation of Empire (1836)",
          caption: 'Marble colonnades multiply at the peak of imperial splendour.',
          credit: 'Thomas Cole, 1836, New-York Historical Society',
          plateLabel: 'Plate 03 · Cole (1836)',
          coldOpen:
            'Around 315 AD, Lactantius reports there are fewer taxpayers in the fields than clerks collecting salaries.',
          hotspots: [
            {
              xPct: 50,
              yPct: 42,
              label: 'Bridge Procession',
              detail: 'Public ceremony swells even as countryside tax capacity hollows out.',
            },
          ],
        },
        chapters: [
          { index: 1, title: 'Diocletian & 116 Provinces', startTime: 0, timestampFormatted: '00:00' },
          { index: 2, title: 'Burnham’s Managerial Class', startTime: 900, timestampFormatted: '15:00' },
        ],
        pullQuote: {
          text: 'There began to be fewer men who paid taxes than there were who received wages.',
          speaker: 'Lactantius',
          work: 'On the Deaths of the Persecutors',
          locator: 'ch. 7',
        },
        essayMarkdown: `## I. Counting Heads vs. Growing Wheat\n\nSubdividing bureaus feels like competence from inside a ministry. On the frontier farm, it simply multiplies requisitions.\n\n## II. Burnham’s Prediction\n\nWriting in 1941, James Burnham argued owners of enterprise quietly yield real day-to-day authority to administrative networks.`,
      },
      {
        episodeNumber: 4,
        partLabel: 'Movement IV',
        romanNumeral: 'IV',
        title: 'Destruction & Independent Reconstruction',
        subtitle: 'Why lasting liberty begins when households reclaim ownership of tools and memory.',
        durationSeconds: 3060,
        plate: {
          src: '/accent/exhibition/cole-destruction.jpg',
          alt: "Thomas Cole's Destruction (1836)",
          caption: 'Storm clouds gather over the collapsing harbour statue.',
          credit: 'Thomas Cole, 1836, New-York Historical Society',
          plateLabel: 'Plate 04 · Cole (1836)',
          coldOpen:
            'Painted in 1836 as a visual sermon to an ambitious young republic: fire begins quietly in how citizens live.',
          hotspots: [
            {
              xPct: 74,
              yPct: 38,
              label: 'Broken Colossus',
              detail: 'Overextended empires crack under the weight of detached leadership.',
            },
          ],
        },
        chapters: [
          { index: 1, title: 'When Exit Walls Close', startTime: 0, timestampFormatted: '00:00' },
          { index: 2, title: 'Local Ownership Today', startTime: 1020, timestampFormatted: '17:00' },
        ],
        essayMarkdown: `## I. The Limits of Paper Constitutions\n\nLaw survives when independent citizens have somewhere concrete to stand when central plans falter.\n\n## II. What Small Makers Rebuild\n\nLocal-first tools, plain files, and accountable communities restore the exit option before rhetoric has to break.`,
      },
    ],
  },
  epistemic: {
    label: 'Information Theory & Signal Lab',
    editionLabel: 'Accént Exhibition Template · Signal & Epistemic Hygiene',
    title: 'Channel Capacity Against Institutional Noise',
    subtitle:
      'Demonstrating how domain-reactive shaders automatically shift from painterly ochre to Bell Labs oscilloscope phosphor.',
    pipes: ['information-theory', 'bayesian-inference', 'reasoning-protocol'],
    columns: ['Mathematical Bound', 'Common Trap', 'Daily Verification Habit'],
    rows: [
      {
        episodeNumber: 1,
        stage: 'I. Signal vs. Channel Bandwidth',
        evidencePin: 'Shannon 1948 · Entropy Bound',
        cells: [
          'Redundant coding preserves exact truth across noisy lines.',
          'Compression by vibe strips source citations first.',
          'Anchor every quantitative figure to a verifiable document.',
        ],
      },
      {
        episodeNumber: 2,
        stage: 'II. Prior Updating Under Evidence',
        evidencePin: 'Bayes Theorem · Likelihood Ratio',
        cells: [
          'Strong surprises shift beliefs strictly proportional to likelihood.',
          'Motivated filters protect cherished priors from falsification.',
          'Log explicit disconfirming observations next to claims.',
        ],
      },
    ],
    pipeNodes: [
      {
        slug: 'information-theory',
        label: 'pipe\\information-theory',
        discipline: 'Bell Labs & Coding',
        why: 'Shannon entropy and error-correcting redundancy.',
        episodes: [1],
      },
      {
        slug: 'bayesian-inference',
        label: 'pipe\\bayesian-inference',
        discipline: 'Probability',
        why: 'Calibrating confidence strictly against base rates.',
        episodes: [2],
      },
    ],
    bibliography: [
      {
        id: 'shannon',
        author: 'Claude Shannon',
        title: 'A Mathematical Theory of Communication',
        year: '1948',
        url: 'https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf',
        pipe: 'information-theory',
        roleInThesis: 'Establishes fundamental limits of reliable signaling through noisy channels.',
      },
      {
        id: 'feynman',
        author: 'Richard Feynman',
        title: 'Cargo Cult Science',
        year: '1974',
        url: 'https://calteches.library.caltech.edu/51/2/CargoCult.htm',
        pipe: 'bayesian-inference',
        roleInThesis: 'Defines integrity as bending over backward to show how you might be wrong.',
      },
    ],
    episodes: [
      {
        episodeNumber: 1,
        partLabel: 'Movement I',
        romanNumeral: 'I',
        title: 'Shannon & Redundant Coding',
        subtitle: 'Why clean verification requires deliberate structural slack.',
        durationSeconds: 2640,
        plate: {
          src: '/themes/assets/law-library.webp',
          alt: 'Reading room shelves bathed in warm light',
          caption: 'Archival primary texts remain the error-correcting parity bits of public writing.',
          credit: 'Accént Exhibition Library Study',
          plateLabel: 'Plate 01 · Signal Archive',
          coldOpen:
            'Murray Hill, 1948. Claude Shannon scribbles entropy integrals across yellow legal pads while switchboards hum overhead.',
        },
        chapters: [{ index: 1, title: 'Entropy & Parity', startTime: 0, timestampFormatted: '00:00' }],
        pullQuote: {
          text: 'The first principle is that you must not fool yourself — and you are the easiest person to fool.',
          speaker: 'Richard Feynman',
          work: 'Caltech Commencement',
          locator: '1974',
        },
        essayMarkdown: `## I. Information As Surprise\n\nA sentence carrying no risk of being wrong transmits zero information.\n\n## II. Citation As Parity\n\nWhen every claim links directly to its archival ledger, error propagates less easily across secondary retellings.`,
      },
      {
        episodeNumber: 2,
        partLabel: 'Movement II',
        romanNumeral: 'II',
        title: 'Calibration Under Noise',
        subtitle: 'Separating genuine signal changes from decorative motion.',
        durationSeconds: 2400,
        plate: {
          src: '/themes/assets/timber-architecture.webp',
          alt: 'Exposed structural joinery showing load-bearing timber geometry',
          caption: 'Structural clarity leaves nothing hidden behind decorative veneer.',
          credit: 'Accént Architectural Joinery Study',
          plateLabel: 'Plate 02 · Joinery & Load',
          coldOpen:
            'Clean engineering lets every load-bearing beam show how force travels from roof to foundation.',
        },
        chapters: [{ index: 1, title: 'Load-Bearing Structure', startTime: 0, timestampFormatted: '00:00' }],
        essayMarkdown: `## I. Visible Structure\n\nGood systems expose their uncertainty intervals alongside their headline averages.`,
      },
    ],
  },
};

const TEMPLATE_SNIPPET = `import { AccentExhibitionTemplate } from 'accent-ui/art';

export default function SeriesPage() {
  return (
    <AccentExhibitionTemplate
      editionLabel="Combined Pipe Exhibition"
      title="How Republics Trade Farmers for Managers"
      subtitle="Synchronized classical paintings, 2.5x loupe, and 4-lens synthesis atlas."
      pipes={['ancient-history', 'history', 'politics']}
      episodes={episodes}
      atlas={atlasData}
    />
  );
}`;

export default function AccentExhibitionTemplatePage() {
  const [presetKey, setPresetKey] = useState<'civilization' | 'epistemic'>('civilization');
  const [copied, setCopied] = useState(false);

  const preset = SAMPLE_PRESETS[presetKey];

  return (
    <div className="min-h-screen bg-[var(--a-bg)] text-[var(--a-ink)]">
      {/* Top Workbench Bar */}
      <div className="border-b border-[var(--a-rule)] bg-[var(--a-surface)]/80 px-4 sm:px-6 lg:px-8 py-3">
        <div className="mx-auto max-w-[1440px] flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/design-system/templates"
              className="min-h-[44px] inline-flex items-center gap-1.5 text-[var(--a-ink)] hover:underline underline-offset-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Accént Templates
            </Link>
            <span className="text-[var(--a-rule)]">|</span>
            <div className="inline-flex border border-[var(--a-rule)] bg-[var(--a-bg)] divide-x divide-[var(--a-rule)]">
              {(Object.keys(SAMPLE_PRESETS) as Array<'civilization' | 'epistemic'>).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setPresetKey(k)}
                  className={`min-h-[36px] px-3 cursor-pointer ${
                    presetKey === k
                      ? 'bg-[var(--a-surface)] font-semibold text-[var(--a-ink)]'
                      : 'text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                  }`}
                >
                  {SAMPLE_PRESETS[k].label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(TEMPLATE_SNIPPET).catch(() => {});
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="min-h-[40px] inline-flex items-center gap-1.5 border border-[var(--a-rule)] bg-[var(--a-bg)] px-3.5 hover:border-[var(--a-ink)] cursor-pointer font-semibold"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[var(--a-emerald)]" /> Copied JSX Starter
              </>
            ) : (
              <>
                <Code2 className="h-3.5 w-3.5 text-[var(--a-accent-text)]" /> Copy JSX Starter
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Monumental Exhibition Template */}
      <AccentExhibitionTemplate
        editionLabel={preset.editionLabel}
        title={preset.title}
        subtitle={preset.subtitle}
        pipes={preset.pipes}
        episodes={preset.episodes}
        atlas={{
          kicker: 'Interactive Synthesis Atlas',
          title: 'Comparative Pattern & Pipe Lineage',
          subtitle:
            'Inspect trajectory curves, trace cross-Pipe citations, explore historical chronology, or read the accessible data table twin.',
          columns: preset.columns,
          rows: preset.rows,
          pipes: preset.pipeNodes,
          episodes: preset.episodes.map((e) => ({
            episodeNumber: e.episodeNumber,
            title: e.title,
            durationSeconds: e.durationSeconds,
            essayWords: e.essayMarkdown.split(/\s+/).length,
          })),
          bibliography: preset.bibliography,
        }}
      />
    </div>
  );
}
