import {
  EB_Garamond,
  Source_Serif_4,
  Literata,
  Newsreader,
  Lora,
  Roboto,
  Source_Sans_3,
  IBM_Plex_Sans,
  Public_Sans,
  Work_Sans,
} from 'next/font/google';

/**
 * Self-hosted by next/font at build time (no runtime request to Google).
 * Fraunces and Inter are already loaded app-wide as --font-serif / --font-sans.
 * Use these CSS variables in demos: var(--font-eb-garamond) etc.
 */
const ebGaramond = EB_Garamond({ subsets: ['latin'], display: 'swap', variable: '--font-eb-garamond', style: ['normal', 'italic'] });
const sourceSerif = Source_Serif_4({ subsets: ['latin'], display: 'swap', variable: '--font-source-serif', style: ['normal', 'italic'] });
const literata = Literata({ subsets: ['latin'], display: 'swap', variable: '--font-literata', style: ['normal', 'italic'] });
const newsreader = Newsreader({ subsets: ['latin'], display: 'swap', variable: '--font-newsreader', style: ['normal', 'italic'] });
const lora = Lora({ subsets: ['latin'], display: 'swap', variable: '--font-lora', style: ['normal', 'italic'] });
const roboto = Roboto({ subsets: ['latin'], display: 'swap', variable: '--font-roboto', weight: ['400', '500', '700'] });
const sourceSans = Source_Sans_3({ subsets: ['latin'], display: 'swap', variable: '--font-source-sans' });
const plexSans = IBM_Plex_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-plex-sans', weight: ['400', '500', '600', '700'] });
const publicSans = Public_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-public-sans' });
const workSans = Work_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-work-sans' });

export const ACCENT_FONT_CLASSES = [
  ebGaramond,
  sourceSerif,
  literata,
  newsreader,
  lora,
  roboto,
  sourceSans,
  plexSans,
  publicSans,
  workSans,
]
  .map((f) => f.variable)
  .join(' ');
