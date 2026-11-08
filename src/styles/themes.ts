/**
 * Accént Multi-Brand Theme Registry, Engineered Drift & Adapter Factory
 *
 * Defines first-class brand profiles across the Colon Hyphen Bracket ecosystem
 * and provides `defineAccentTheme()` + `validateThemeContrast()` so internal properties
 * and external open-source forks can engineer deliberate aesthetic drift without
 * breaking Accént's mathematical invariants (8pt grid, 13px floor, 44px tap targets, WCAG AA/AAA).
 */

import type { Mode } from './design-tokens';
import { getAccentThemeVars, getContrastRatio } from './design-tokens';

export type BrandProfileId =
  | 'editorial-sandstone'
  | 'playful-principal'
  | 'albers-perspectives'
  | 'cassandra-noir'
  | 'hacienda-emerald'
  | 'terracotta-civic'
  | 'greater-terminal';

export interface BrandProfile<TId extends string = BrandProfileId> {
  id: TId;
  name: string;
  tagline: string;
  usedBy: string;
  repoUrl?: string;
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

export interface ThemeContrastAudit {
  pair: string;
  mode: Mode;
  foreground: string;
  background: string;
  ratio: number;
  minRequired: number;
  passesAa: boolean;
  passesAaa: boolean;
}

export const BRAND_PROFILES: Record<BrandProfileId, BrandProfile> = {
  'editorial-sandstone': {
    id: 'editorial-sandstone',
    name: 'Editorial Sandstone (Pipes)',
    tagline: 'MoMA/Met archival sandstone canvas, Fraunces display serif, and Dual-Accent Pink + Sky.',
    usedBy: 'pipes.pink · design.pipes.pink',
    repoUrl: 'https://github.com/rorshockbtc/pipes',
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
    repoUrl: 'https://github.com/rorshockbtc/chb-corporate-site',
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
    repoUrl: 'https://github.com/rorshockbtc/chb-corporate-site',
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
  'cassandra-noir': {
    id: 'cassandra-noir',
    name: 'Cassandra Noir (Kyle Cyree Portfolio)',
    tagline: 'Cassandra Obsidian Noir (#161413) dark mode & Albers Sandstone (#EAE0D0) light mode with Cormorant Garamond + Dusty Rose.',
    usedBy: 'kyle.colonhyphenbracket.pink · Ask Kyle',
    repoUrl: 'https://github.com/rorshockbtc/portfolio',
    mark: '>_',
    typography: {
      display: 'Cormorant Garamond',
      serif: 'Newsreader',
      sans: 'Inter',
      mono: 'JetBrains Mono',
    },
    tokens: {
      light: {
        '--a-bg': '#EAE0D0',
        '--a-surface': '#F4EFE6',
        '--a-card': '#F4EFE6',
        '--a-well': '#FAF8F5',
        '--a-ink': '#281B16',
        '--a-muted': '#5C4940',
        '--a-rule': 'rgba(40, 27, 22, 0.14)',
        '--a-accent': '#FE299E',
        '--a-accent-fill': '#B81468',
        '--a-accent-fill-hover': '#281B16',
        '--a-accent-fg': '#FFFFFF',
        '--a-accent-text': '#A3285C',
        '--a-sky': '#02A7F1',
        '--a-sky-fg': '#111827',
        '--a-sky-deep': '#0369A1',
        '--a-sky-deep-fg': '#FFFFFF',
        '--a-sky-surface': '#D4EBF5',
        '--a-sky-ink': '#02212F',
        '--a-sky-text': '#0369A1',
        '--a-link': '#281B16',
        '--a-emerald': '#2D8A4E',
        '--a-radius-cta': '6px',
      },
      dark: {
        '--a-bg': '#161413',
        '--a-surface': '#211E1C',
        '--a-card': '#211E1C',
        '--a-well': '#2C2825',
        '--a-ink': '#F1EBD8',
        '--a-muted': '#B5ABA0',
        '--a-rule': 'rgba(241, 235, 216, 0.14)',
        '--a-accent': '#D9777F',
        '--a-accent-fill': '#D9777F',
        '--a-accent-fill-hover': '#F1EBD8',
        '--a-accent-fg': '#161413',
        '--a-accent-text': '#E8959C',
        '--a-sky': '#38BDF8',
        '--a-sky-fg': '#161413',
        '--a-sky-deep': '#38BDF8',
        '--a-sky-deep-fg': '#161413',
        '--a-sky-surface': '#17253B',
        '--a-sky-ink': '#F1EBD8',
        '--a-sky-text': '#7DD3FC',
        '--a-link': '#F1EBD8',
        '--a-emerald': '#4ADE80',
        '--a-radius-cta': '6px',
      },
    },
  },
  'hacienda-emerald': {
    id: 'hacienda-emerald',
    name: 'Hacienda Emerald (Chicuinaco Estate)',
    tagline: 'Archival Sandstone (#E8E2D5), Hacienda Botanical Emerald (#1B5E3A), and Warm Gold (#A87B12) with Lime dark mode.',
    usedBy: 'chicuinaco (Hacienda & Hospitality)',
    repoUrl: 'https://github.com/rorshockbtc/chicuinaco',
    mark: '01 /',
    typography: {
      display: 'Fraunces',
      serif: 'Fraunces',
      sans: 'Plus Jakarta Sans',
      mono: 'JetBrains Mono',
    },
    tokens: {
      light: {
        '--a-bg': '#E8E2D5',
        '--a-surface': '#F3EFE9',
        '--a-card': '#F3EFE9',
        '--a-well': '#FAF8F5',
        '--a-ink': '#161514',
        '--a-muted': '#57534E',
        '--a-rule': 'rgba(22, 21, 20, 0.14)',
        '--a-accent': '#1B5E3A',
        '--a-accent-fill': '#1B5E3A',
        '--a-accent-fill-hover': '#161514',
        '--a-accent-fg': '#FFFFFF',
        '--a-accent-text': '#14492C',
        '--a-sky': '#835E08',
        '--a-sky-fg': '#FFFFFF',
        '--a-sky-deep': '#6B4C05',
        '--a-sky-deep-fg': '#FFFFFF',
        '--a-sky-surface': '#F5ECD7',
        '--a-sky-ink': '#161514',
        '--a-sky-text': '#715106',
        '--a-link': '#161514',
        '--a-emerald': '#1B5E3A',
        '--a-radius-cta': '4px',
      },
      dark: {
        '--a-bg': '#14120F',
        '--a-surface': '#1E1B17',
        '--a-card': '#1E1B17',
        '--a-well': '#292520',
        '--a-ink': '#F5F2EB',
        '--a-muted': '#B8B2A6',
        '--a-rule': 'rgba(245, 242, 235, 0.14)',
        '--a-accent': '#B8E986',
        '--a-accent-fill': '#B8E986',
        '--a-accent-fill-hover': '#F5F2EB',
        '--a-accent-fg': '#14120F',
        '--a-accent-text': '#B8E986',
        '--a-sky': '#F3C969',
        '--a-sky-fg': '#14120F',
        '--a-sky-deep': '#F3C969',
        '--a-sky-deep-fg': '#14120F',
        '--a-sky-surface': '#2A2315',
        '--a-sky-ink': '#F5F2EB',
        '--a-sky-text': '#F3C969',
        '--a-link': '#F5F2EB',
        '--a-emerald': '#B8E986',
        '--a-radius-cta': '4px',
      },
    },
  },
  'terracotta-civic': {
    id: 'terracotta-civic',
    name: 'Terracotta Garden (Marigold Civic Analytics)',
    tagline: 'Warm Cream (#E8E2D5), Deep Chocolate Ink (#4A352F), and Terracotta (#B93815) for zero-knowledge DuckDB civic storytelling.',
    usedBy: 'marigold (Civic Data & Analytics)',
    repoUrl: 'https://github.com/rorshockbtc/marigold',
    mark: '§',
    typography: {
      display: 'Fraunces',
      serif: 'Newsreader',
      sans: 'Inter',
      mono: 'JetBrains Mono',
    },
    tokens: {
      light: {
        '--a-bg': '#E8E2D5',
        '--a-surface': '#FDFBF7',
        '--a-card': '#FDFBF7',
        '--a-well': '#FFFFFF',
        '--a-ink': '#36241F',
        '--a-muted': '#5E463F',
        '--a-rule': 'rgba(54, 36, 31, 0.14)',
        '--a-accent': '#E05B37',
        '--a-accent-fill': '#AD3617',
        '--a-accent-fill-hover': '#36241F',
        '--a-accent-fg': '#FFFFFF',
        '--a-accent-text': '#9E3013',
        '--a-sky': '#0F766E',
        '--a-sky-fg': '#FFFFFF',
        '--a-sky-deep': '#115E59',
        '--a-sky-deep-fg': '#FFFFFF',
        '--a-sky-surface': '#CCFBF1',
        '--a-sky-ink': '#134E4A',
        '--a-sky-text': '#115E59',
        '--a-link': '#36241F',
        '--a-emerald': '#15803D',
        '--a-radius-cta': '12px',
      },
      dark: {
        '--a-bg': '#1C1513',
        '--a-surface': '#281E1B',
        '--a-card': '#281E1B',
        '--a-well': '#362824',
        '--a-ink': '#F7F3EB',
        '--a-muted': '#C8B9B2',
        '--a-rule': 'rgba(247, 243, 235, 0.14)',
        '--a-accent': '#FB923C',
        '--a-accent-fill': '#FB923C',
        '--a-accent-fill-hover': '#F7F3EB',
        '--a-accent-fg': '#1C1513',
        '--a-accent-text': '#FDBA74',
        '--a-sky': '#2DD4BF',
        '--a-sky-fg': '#1C1513',
        '--a-sky-deep': '#2DD4BF',
        '--a-sky-deep-fg': '#1C1513',
        '--a-sky-surface': '#132A28',
        '--a-sky-ink': '#F7F3EB',
        '--a-sky-text': '#5EEAD4',
        '--a-link': '#F7F3EB',
        '--a-emerald': '#4ADE80',
        '--a-radius-cta': '12px',
      },
    },
  },
  'greater-terminal': {
    id: 'greater-terminal',
    name: 'Greater Terminal (Greater > AI)',
    tagline: 'High-contrast monochrome prompt surface with Major Mono Display, zero box-shadows, and Sovereign Pink (#FE299E) cursor focus.',
    usedBy: 'greater-than (Greater > Conversational Engine)',
    repoUrl: 'https://github.com/rorshockbtc/greater-than',
    mark: '>',
    typography: {
      display: 'Major Mono Display',
      serif: 'Fraunces',
      sans: 'Inter',
      mono: 'JetBrains Mono',
    },
    tokens: {
      light: {
        '--a-bg': '#F7F5F0',
        '--a-surface': '#EFECE4',
        '--a-card': '#EFECE4',
        '--a-well': '#FFFFFF',
        '--a-ink': '#0A0A0A',
        '--a-muted': '#4B5563',
        '--a-rule': 'rgba(10, 10, 10, 0.16)',
        '--a-accent': '#FE299E',
        '--a-accent-fill': '#B81468',
        '--a-accent-fill-hover': '#0A0A0A',
        '--a-accent-fg': '#FFFFFF',
        '--a-accent-text': '#B81468',
        '--a-sky': '#0284C7',
        '--a-sky-fg': '#FFFFFF',
        '--a-sky-deep': '#0369A1',
        '--a-sky-deep-fg': '#FFFFFF',
        '--a-sky-surface': '#E0F2FE',
        '--a-sky-ink': '#0C4A6E',
        '--a-sky-text': '#0369A1',
        '--a-link': '#0A0A0A',
        '--a-emerald': '#15803D',
        '--a-radius-cta': '4px',
      },
      dark: {
        '--a-bg': '#0A0A0A',
        '--a-surface': '#141414',
        '--a-card': '#141414',
        '--a-well': '#1F1F1F',
        '--a-ink': '#F5F5F4',
        '--a-muted': '#A8A29E',
        '--a-rule': 'rgba(245, 245, 244, 0.16)',
        '--a-accent': '#FF5CB8',
        '--a-accent-fill': '#FF5CB8',
        '--a-accent-fill-hover': '#F5F5F4',
        '--a-accent-fg': '#0A0A0A',
        '--a-accent-text': '#FF7AC6',
        '--a-sky': '#38BDF8',
        '--a-sky-fg': '#0A0A0A',
        '--a-sky-deep': '#38BDF8',
        '--a-sky-deep-fg': '#0A0A0A',
        '--a-sky-surface': '#0C2536',
        '--a-sky-ink': '#E0F2FE',
        '--a-sky-text': '#38BDF8',
        '--a-link': '#F5F5F4',
        '--a-emerald': '#4ADE80',
        '--a-radius-cta': '4px',
      },
    },
  },
};

export const BRAND_PROFILE_LIST: BrandProfile[] = [
  BRAND_PROFILES['editorial-sandstone'],
  BRAND_PROFILES['playful-principal'],
  BRAND_PROFILES['albers-perspectives'],
  BRAND_PROFILES['cassandra-noir'],
  BRAND_PROFILES['hacienda-emerald'],
  BRAND_PROFILES['terracotta-civic'],
  BRAND_PROFILES['greater-terminal'],
];

export function getBrandThemeVars(
  brand: BrandProfileId,
  mode: Mode
): Record<string, string> {
  const profile = BRAND_PROFILES[brand] ?? BRAND_PROFILES['editorial-sandstone'];
  return profile.tokens[mode];
}

/**
 * Generates both Accént `--a-*` variables AND shadcn/ui bridge CSS custom properties
 * (`--background`, `--foreground`, `--card`, `--primary`, `--muted`, `--border`, `--ring`)
 * so Vite, Next.js, and shadcn projects can adopt any Accént Brand Profile with one call.
 */
export function getShadcnBridgeVars(
  brandOrProfile: BrandProfileId | BrandProfile<string>,
  mode: Mode
): Record<string, string> {
  const profile =
    typeof brandOrProfile === 'string'
      ? BRAND_PROFILES[brandOrProfile] ?? BRAND_PROFILES['editorial-sandstone']
      : brandOrProfile;
  const t = profile.tokens[mode];

  return {
    ...t,
    '--background': t['--a-bg'],
    '--foreground': t['--a-ink'],
    '--card': t['--a-card'],
    '--card-foreground': t['--a-ink'],
    '--popover': t['--a-well'],
    '--popover-foreground': t['--a-ink'],
    '--primary': t['--a-accent-fill'],
    '--primary-foreground': t['--a-accent-fg'],
    '--secondary': t['--a-surface'],
    '--secondary-foreground': t['--a-ink'],
    '--muted': t['--a-surface'],
    '--muted-foreground': t['--a-muted'],
    '--accent': t['--a-sky-surface'],
    '--accent-foreground': t['--a-sky-ink'],
    '--border': t['--a-rule'],
    '--input': t['--a-rule'],
    '--ring': t['--a-accent'],
    '--radius': t['--a-radius-cta'] ?? '6px',
  };
}

/**
 * Audits a BrandProfile's light and dark token pairs against Accént's mathematical
 * WCAG 2.1 AA (4.5:1) and AAA (7.0:1) contrast requirements.
 */
export function validateThemeContrast(profile: BrandProfile<string>): {
  valid: boolean;
  audits: ThemeContrastAudit[];
} {
  const audits: ThemeContrastAudit[] = [];

  for (const mode of ['light', 'dark'] as const) {
    const t = profile.tokens[mode];
    const checks: Array<{ pair: string; fg: string; bg: string; min: number }> = [
      { pair: 'body-ink-on-bg', fg: t['--a-ink'], bg: t['--a-bg'], min: 7.0 },
      { pair: 'muted-on-bg', fg: t['--a-muted'], bg: t['--a-bg'], min: 4.5 },
      { pair: 'primary-cta-fill', fg: t['--a-accent-fg'], bg: t['--a-accent-fill'], min: 4.5 },
      { pair: 'accent-text-on-bg', fg: t['--a-accent-text'], bg: t['--a-bg'], min: 4.5 },
      { pair: 'sky-text-on-bg', fg: t['--a-sky-text'], bg: t['--a-bg'], min: 4.5 },
    ];

    for (const c of checks) {
      if (!c.fg?.startsWith('#') || !c.bg?.startsWith('#')) continue;
      const ratio = Number(getContrastRatio(c.fg, c.bg).toFixed(2));
      audits.push({
        pair: c.pair,
        mode,
        foreground: c.fg,
        background: c.bg,
        ratio,
        minRequired: c.min,
        passesAa: ratio >= 4.5,
        passesAaa: ratio >= 7.0,
      });
    }
  }

  return {
    valid: audits.every((a) => a.ratio >= a.minRequired),
    audits,
  };
}

export interface DefineAccentThemeInput {
  id: string;
  name: string;
  tagline: string;
  usedBy: string;
  repoUrl?: string;
  mark?: string;
  extends?: BrandProfileId;
  typography?: Partial<BrandProfile['typography']>;
  tokens: {
    light?: Partial<Record<string, string>>;
    dark?: Partial<Record<string, string>>;
  };
}

/**
 * First-class Engineered Drift Factory (`defineAccentTheme`).
 * Allows any project or open-source adapter to extend a canonical Accént preset,
 * override surface/accent/typography tokens, and automatically validate WCAG contrast.
 */
export function defineAccentTheme(input: DefineAccentThemeInput): BrandProfile<string> & {
  contrastReport: ReturnType<typeof validateThemeContrast>;
  getCssVars: (mode: Mode) => Record<string, string>;
} {
  const base = BRAND_PROFILES[input.extends ?? 'editorial-sandstone'];

  const cleanLight: Record<string, string> = { ...base.tokens.light };
  if (input.tokens.light) {
    for (const [k, v] of Object.entries(input.tokens.light)) {
      if (typeof v === 'string') cleanLight[k] = v;
    }
  }

  const cleanDark: Record<string, string> = { ...base.tokens.dark };
  if (input.tokens.dark) {
    for (const [k, v] of Object.entries(input.tokens.dark)) {
      if (typeof v === 'string') cleanDark[k] = v;
    }
  }

  const profile: BrandProfile<string> = {
    id: input.id,
    name: input.name,
    tagline: input.tagline,
    usedBy: input.usedBy,
    repoUrl: input.repoUrl,
    mark: input.mark ?? base.mark,
    typography: {
      ...base.typography,
      ...input.typography,
    },
    tokens: {
      light: cleanLight,
      dark: cleanDark,
    },
  };

  const contrastReport = validateThemeContrast(profile);

  return {
    ...profile,
    contrastReport,
    getCssVars: (mode: Mode) => getShadcnBridgeVars(profile, mode),
  };
}
