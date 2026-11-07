/**
 * Accént Multi-Brand Theme Registry & Forkable Brand Presets
 *
 * Defines first-class brand profiles so different properties in the Colon Hyphen Bracket
 * ecosystem (and external open-source forks) can switch or extend themes cleanly without
 * forking components or breaking WCAG contrast guarantees.
 */

import type { Mode } from './design-tokens';
import { getAccentThemeVars } from './design-tokens';

export type BrandProfileId =
  | 'editorial-sandstone'
  | 'playful-principal'
  | 'albers-perspectives';

export interface BrandProfile {
  id: BrandProfileId;
  name: string;
  tagline: string;
  usedBy: string;
  mark: string;
  typography: {
    display: string;
    serif: string;
    sans: string;
    mono: string;
  };
  tokens: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

export const BRAND_PROFILES: Record<BrandProfileId, BrandProfile> = {
  'editorial-sandstone': {
    id: 'editorial-sandstone',
    name: 'Editorial Sandstone (Pipes)',
    tagline: 'MoMA/Met archival sandstone canvas, Fraunces display serif, and Dual-Accent Pink + Sky.',
    usedBy: 'pipes.pink · design.pipes.pink',
    mark: '´',
    typography: {
      display: 'Fraunces',
      serif: 'Fraunces',
      sans: 'Inter',
      mono: 'JetBrains Mono',
    },
    tokens: {
      light: {
        ...getAccentThemeVars('light'),
        '--a-radius-cta': '6px',
      },
      dark: {
        ...getAccentThemeVars('dark'),
        '--a-radius-cta': '6px',
      },
    },
  },
  'playful-principal': {
    id: 'playful-principal',
    name: 'Playful-Principal (CHB Corporate)',
    tagline: 'Crisp Alabaster paper (#FAF8F5), Bricolage Grotesque display, Hot Pink (#FE299E), and pill CTAs.',
    usedBy: 'colonhyphenbracket.pink (feat/playful-principal)',
    mark: ': - ]',
    typography: {
      display: 'Bricolage Grotesque',
      serif: 'Newsreader',
      sans: 'Inter',
      mono: 'JetBrains Mono',
    },
    tokens: {
      light: {
        '--a-bg': '#FAF8F5',
        '--a-surface': '#F3EEE6',
        '--a-card': '#F3EEE6',
        '--a-well': '#FFFFFF',
        '--a-ink': '#111827',
        '--a-muted': '#4B5563',
        '--a-rule': 'rgba(17, 24, 39, 0.12)',
        '--a-accent': '#FE299E',
        '--a-accent-fill': '#B81468',
        '--a-accent-fill-hover': '#111827',
        '--a-accent-fg': '#FFFFFF',
        '--a-accent-text': '#B81468',
        '--a-sky': '#0A9BE0',
        '--a-sky-fg': '#111827',
        '--a-sky-deep': '#0B5CAB',
        '--a-sky-deep-fg': '#FFFFFF',
        '--a-sky-surface': '#DFECEF',
        '--a-sky-ink': '#02212F',
        '--a-sky-text': '#0B5CAB',
        '--a-link': '#111827',
        '--a-emerald': '#3FA535',
        '--a-radius-cta': '9999px',
      },
      dark: {
        '--a-bg': '#0F141C',
        '--a-surface': '#18202C',
        '--a-card': '#18202C',
        '--a-well': '#222C3C',
        '--a-ink': '#FAF8F5',
        '--a-muted': '#CBD5E1',
        '--a-rule': 'rgba(250, 248, 245, 0.14)',
        '--a-accent': '#FF5CB8',
        '--a-accent-fill': '#FF5CB8',
        '--a-accent-fill-hover': '#FAF8F5',
        '--a-accent-fg': '#111827',
        '--a-accent-text': '#FF7AC6',
        '--a-sky': '#38BDF8',
        '--a-sky-fg': '#111827',
        '--a-sky-deep': '#38BDF8',
        '--a-sky-deep-fg': '#111827',
        '--a-sky-surface': '#0C2536',
        '--a-sky-ink': '#E0F2FE',
        '--a-sky-text': '#38BDF8',
        '--a-link': '#FAF8F5',
        '--a-emerald': '#4ADE80',
        '--a-radius-cta': '9999px',
      },
    },
  },
  'albers-perspectives': {
    id: 'albers-perspectives',
    name: 'Albers Sandstone (Perspectives)',
    tagline: 'Josef Albers Warm Sandstone (#EAE0D0), Deep Espresso Ink (#281B16), and Blueprint Cobalt / Forest accents.',
    usedBy: 'colonhyphenbracket.pink (Perspectives)',
    mark: '; - ]',
    typography: {
      display: 'Newsreader',
      serif: 'EB Garamond',
      sans: 'Inter',
      mono: 'JetBrains Mono',
    },
    tokens: {
      light: {
        '--a-bg': '#EAE0D0',
        '--a-surface': '#F2EAE0',
        '--a-card': '#F2EAE0',
        '--a-well': '#FAF8F5',
        '--a-ink': '#281B16',
        '--a-muted': '#4A3A32',
        '--a-rule': 'rgba(40, 27, 22, 0.16)',
        '--a-accent': '#FE299E',
        '--a-accent-fill': '#B81468',
        '--a-accent-fill-hover': '#281B16',
        '--a-accent-fg': '#FFFFFF',
        '--a-accent-text': '#B81468',
        '--a-sky': '#0B5CAB',
        '--a-sky-fg': '#FFFFFF',
        '--a-sky-deep': '#084482',
        '--a-sky-deep-fg': '#FFFFFF',
        '--a-sky-surface': '#DFECEF',
        '--a-sky-ink': '#281B16',
        '--a-sky-text': '#0B5CAB',
        '--a-link': '#281B16',
        '--a-emerald': '#1B6346',
        '--a-radius-cta': '10px',
      },
      dark: {
        '--a-bg': '#231814',
        '--a-surface': '#2E201B',
        '--a-card': '#2E201B',
        '--a-well': '#3D2B24',
        '--a-ink': '#F2EAE0',
        '--a-muted': '#D3C7B5',
        '--a-rule': 'rgba(242, 234, 224, 0.16)',
        '--a-accent': '#FF6EC7',
        '--a-accent-fill': '#FF6EC7',
        '--a-accent-fill-hover': '#F2EAE0',
        '--a-accent-fg': '#231814',
        '--a-accent-text': '#FF85D0',
        '--a-sky': '#60A5FA',
        '--a-sky-fg': '#231814',
        '--a-sky-deep': '#60A5FA',
        '--a-sky-deep-fg': '#231814',
        '--a-sky-surface': '#17253B',
        '--a-sky-ink': '#F2EAE0',
        '--a-sky-text': '#93C5FD',
        '--a-link': '#F2EAE0',
        '--a-emerald': '#34D399',
        '--a-radius-cta': '10px',
      },
    },
  },
};

export const BRAND_PROFILE_LIST: BrandProfile[] = [
  BRAND_PROFILES['editorial-sandstone'],
  BRAND_PROFILES['playful-principal'],
  BRAND_PROFILES['albers-perspectives'],
];

export function getBrandThemeVars(
  brand: BrandProfileId,
  mode: Mode
): Record<string, string> {
  const profile = BRAND_PROFILES[brand] ?? BRAND_PROFILES['editorial-sandstone'];
  return profile.tokens[mode];
}
