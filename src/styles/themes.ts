/**
 * Accént 3.0 — 5-Axis Programmable Design Interface & Multi-Brand Dialect Engine
 *
 * Accommodates intentional aesthetic drift across the Colon Hyphen Bracket ecosystem
 * and external open-source adopters via five programmable axes:
 *   1. Chromatic Engine & Multi-Product Slots (with automatic WCAG 2.1 AA/AAA fill derivation)
 *   2. Typographic Voice & Optical Scaling (--a-font-display, --a-tracking-display, --a-leading-body)
 *   3. Structural Posture & Geometry (--a-radius-cta, pedestal-hairline vs archival-spine vs warm-well)
 *   4. Choreography & Kinetic Dialect (Tier 1 operational vs Tier 2 editorial/spring motion)
 *   5. Punctuation Identity & Optional Code Injection Escape Hatch (customCss / customRules / codeSnippet)
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

export type StructuralPosture = 'pedestal-hairline' | 'archival-spine' | 'warm-well' | 'terminal-grid';

export interface ProductColorSlot {
  mark: string;
  name: string;
  color: string;
  role: string;
}

export interface CustomStyleExtension {
  /** Optional scoped CSS rules or custom property overrides injected at runtime */
  css?: string;
  /** Optional natural-language or structural rules appended to STYLES.md */
  rules?: string[];
  /** Optional React/Tailwind/TS code pattern snippet for downstream agents & developers */
  codeSnippet?: string;
  /** Optional component names or token keys nominated for upstream graduation into Accént Core */
  upstreamCandidates?: string[];
}

export interface BrandProfile<TId extends string = BrandProfileId> {
  id: TId;
  name: string;
  tagline: string;
  usedBy: string;
  productionUrl?: string;
  repoUrl?: string;
  mark: string;
  typography: {
    display: string;
    serif: string;
    sans: string;
    mono: string;
    displayTracking?: string;
    bodyLineHeight?: string;
  };
  structure?: {
    ctaRadius: string;
    posture: StructuralPosture;
    summary: string;
  };
  productSlots?: ProductColorSlot[];
  customExtension?: CustomStyleExtension;
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

/**
 * Programmatically derives a WCAG 2.1 AA-compliant button fill (`>= 4.5:1` with white `#FFFFFF`)
 * and inline text shade (`>= 4.5:1` on `canvasHex`) from any raw brand accent hex (e.g., `#FE299E`).
 * This allows non-technical users or agents to pick any vibrant signature color for punctuation
 * marks while automatically guaranteeing accessible button fills and text links.
 */
export function deriveAccessibleAccent(
  rawHex: string,
  canvasHex = '#FAF8F5'
): {
  markHex: string;
  fillHex: string;
  fillForegroundHex: string;
  inlineTextHex: string;
  fillContrastRatio: number;
  textContrastRatio: number;
} {
  const clean = /^#[0-9A-Fa-f]{6}$/.test(rawHex.trim()) ? rawHex.trim().toUpperCase() : '#FE299E';
  const cleanCanvas = /^#[0-9A-Fa-f]{6}$/.test(canvasHex.trim())
    ? canvasHex.trim().toUpperCase()
    : '#FAF8F5';

  const darkenHex = (hex: string, factor: number): string => {
    const r = Math.max(0, Math.min(255, Math.round(parseInt(hex.slice(1, 3), 16) * factor)));
    const g = Math.max(0, Math.min(255, Math.round(parseInt(hex.slice(3, 5), 16) * factor)));
    const b = Math.max(0, Math.min(255, Math.round(parseInt(hex.slice(5, 7), 16) * factor)));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
  };

  let fillHex = clean;
  let factor = 0.96;
  while (getContrastRatio('#FFFFFF', fillHex) < 4.6 && factor > 0.15) {
    fillHex = darkenHex(clean, factor);
    factor -= 0.04;
  }

  let inlineTextHex = fillHex;
  let textFactor = factor;
  while (getContrastRatio(inlineTextHex, cleanCanvas) < 4.6 && textFactor > 0.12) {
    inlineTextHex = darkenHex(clean, textFactor);
    textFactor -= 0.04;
  }

  return {
    markHex: clean,
    fillHex,
    fillForegroundHex: '#FFFFFF',
    inlineTextHex,
    fillContrastRatio: Number(getContrastRatio('#FFFFFF', fillHex).toFixed(2)),
    textContrastRatio: Number(getContrastRatio(inlineTextHex, cleanCanvas).toFixed(2)),
  };
}

export const CHB_SEVEN_PRODUCT_SLOTS: ProductColorSlot[] = [
  { mark: '|||', name: 'Pipes', color: '#EAB308', role: 'Solar Yellow — verified human knowledge network' },
  { mark: '!', name: 'BANG!', color: '#16A34A', role: 'Emerald Green — local zero-cost website IDE' },
  { mark: '#', name: 'Hash', color: '#C2410C', role: 'Burnt Terracotta — private writing retreat' },
  { mark: '; - ]', name: 'Semi', color: '#FE299E', role: 'Sovereign Hot Pink — flagship Socratic editor' },
  { mark: '>', name: 'Greater', color: '#0284C7', role: 'Cobalt Sky — universal classroom in 90+ languages' },
  { mark: 'é', name: 'Accént', color: '#E11D48', role: 'Crimson Ruby — MIT open-source design system' },
  { mark: '❀', name: 'Marigold', color: '#D97706', role: 'Amber Gold — local zero-knowledge civic analytics' },
];

export const BRAND_PROFILES: Record<BrandProfileId, BrandProfile> = {
  'editorial-sandstone': {
    id: 'editorial-sandstone',
    name: 'Editorial Sandstone (Pipes)',
    tagline: 'MoMA/Met archival sandstone canvas, Fraunces display serif, 3-column hairline spine, and Dual-Accent Pink + Sky.',
    usedBy: 'pipes.pink · design.pipes.pink',
    productionUrl: 'https://pipes.pink',
    repoUrl: 'https://github.com/rorshockbtc/pipes',
    mark: '´',
    typography: {
      display: 'Fraunces',
      serif: 'Fraunces',
      sans: 'Inter',
      mono: 'JetBrains Mono',
      displayTracking: '-0.02em',
      bodyLineHeight: '1.65',
    },
    structure: {
      ctaRadius: '6px',
      posture: 'archival-spine',
      summary: '3-column editorial reading spine divided by 1px rgba(17,24,39,0.14) hairlines and 6px architectural radii.',
    },
    tokens: {
      light: {
        ...getAccentThemeVars('light'),
        '--a-radius-cta': '6px',
        '--a-font-display': "'Fraunces', Georgia, serif",
        '--a-tracking-display': '-0.02em',
      },
      dark: {
        ...getAccentThemeVars('dark'),
        '--a-radius-cta': '6px',
        '--a-font-display': "'Fraunces', Georgia, serif",
        '--a-tracking-display': '-0.02em',
      },
    },
  },
  'playful-principal': {
    id: 'playful-principal',
    name: 'Playful-Principal (CHB Corporate)',
    tagline: 'Crisp Alabaster paper (#FAF8F5), Bricolage Grotesque (-0.035em), Sovereign Hot Pink (#FE299E) marks, 7 product colors, de-cardified pedestals, and pill CTAs.',
    usedBy: 'colonhyphenbracket.pink',
    productionUrl: 'https://colonhyphenbracket.pink',
    repoUrl: 'https://github.com/rorshockbtc/chb-corporate-site',
    mark: ': - ]',
    typography: {
      display: 'Bricolage Grotesque',
      serif: 'Newsreader',
      sans: 'Inter',
      mono: 'JetBrains Mono',
      displayTracking: '-0.035em',
      bodyLineHeight: '1.55',
    },
    structure: {
      ctaRadius: '9999px',
      posture: 'pedestal-hairline',
      summary: 'De-cardified open architectural pedestals (border-t and border-l hairlines instead of boxy cards) with full-pill CTAs (9999px).',
    },
    productSlots: CHB_SEVEN_PRODUCT_SLOTS,
    customExtension: {
      css: `.accent-pedestal { border-top: 1px solid rgba(17, 24, 39, 0.15); padding-top: 1.5rem; }`,
      rules: [
        'Preserve Sovereign Hot Pink (#FE299E) on all punctuation marks (: - ]), <Smile /> winks, <ScaryHeadline /> strike bars, and hover links.',
        'Use --a-accent-fill (#B81468, 5.6:1 WCAG AA) strictly for filled primary CTA buttons carrying white text.',
        'Maintain the 7 non-repeating product signature colors (Pipes #EAB308, BANG! #16A34A, Hash #C2410C, Semi #FE299E, Greater #0284C7, Accént #E11D48, Marigold #D97706).',
        'Prefer open architectural pedestals (border-l / border-t hairlines) over boxed, shadowed cards.',
      ],
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
        '--a-font-display': "var(--font-bricolage), 'Bricolage Grotesque', 'Inter', system-ui, sans-serif",
        '--a-tracking-display': '-0.035em',
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
        '--a-font-display': "var(--font-bricolage), 'Bricolage Grotesque', 'Inter', system-ui, sans-serif",
        '--a-tracking-display': '-0.035em',
      },
    },
  },
  'albers-perspectives': {
    id: 'albers-perspectives',
    name: 'Albers Sandstone (Perspectives)',
    tagline: 'Josef Albers Warm Sandstone (#EAE0D0), Deep Espresso Ink (#281B16), and Blueprint Cobalt / Forest audience lenses.',
    usedBy: 'colonhyphenbracket.pink (Perspectives)',
    productionUrl: 'https://colonhyphenbracket.pink',
    repoUrl: 'https://github.com/rorshockbtc/chb-corporate-site',
    mark: '; - ]',
    typography: {
      display: 'Newsreader',
      serif: 'EB Garamond',
      sans: 'Inter',
      mono: 'JetBrains Mono',
      displayTracking: '-0.02em',
      bodyLineHeight: '1.65',
    },
    structure: {
      ctaRadius: '10px',
      posture: 'warm-well',
      summary: 'Josef Albers homages with warm sandstone wells (#F2EAE0) and 10px tactile corners.',
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
        '--a-font-display': "var(--font-newsreader), 'Newsreader', Georgia, serif",
        '--a-tracking-display': '-0.02em',
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
        '--a-font-display': "var(--font-newsreader), 'Newsreader', Georgia, serif",
        '--a-tracking-display': '-0.02em',
      },
    },
  },
  'cassandra-noir': {
    id: 'cassandra-noir',
    name: 'Cassandra Noir (Kyle Cyree Portfolio)',
    tagline: 'Cassandra Obsidian Noir (#161413) dark mode & Albers Sandstone (#EAE0D0) light mode with Cormorant Garamond + Dusty Rose.',
    usedBy: 'hire.colonhyphenbracket.pink · Ask Kyle',
    productionUrl: 'https://hire.colonhyphenbracket.pink',
    repoUrl: 'https://github.com/rorshockbtc/portfolio',
    mark: '>_',
    typography: {
      display: 'Cormorant Garamond',
      serif: 'Newsreader',
      sans: 'Inter',
      mono: 'JetBrains Mono',
      displayTracking: '-0.025em',
      bodyLineHeight: '1.7',
    },
    structure: {
      ctaRadius: '6px',
      posture: 'archival-spine',
      summary: 'High-contrast monograph case studies with WebP before/after comparison stages and 6px buttons.',
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
        '--a-font-display': "var(--font-eb-garamond), 'Cormorant Garamond', Georgia, serif",
        '--a-tracking-display': '-0.025em',
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
        '--a-font-display': "var(--font-eb-garamond), 'Cormorant Garamond', Georgia, serif",
        '--a-tracking-display': '-0.025em',
      },
    },
  },
  'hacienda-emerald': {
    id: 'hacienda-emerald',
    name: 'Hacienda Emerald (Chicuinaco Estate)',
    tagline: 'Archival Sandstone (#E8E2D5), Hacienda Botanical Emerald (#1B5E3A), and Warm Gold (#835E08) with GhostNumeral parallax.',
    usedBy: 'chicuinaco (Hacienda & Hospitality)',
    repoUrl: 'https://github.com/rorshockbtc/chicuinaco',
    mark: '01 /',
    typography: {
      display: 'Fraunces',
      serif: 'Fraunces',
      sans: 'Plus Jakarta Sans',
      mono: 'JetBrains Mono',
      displayTracking: '-0.025em',
      bodyLineHeight: '1.65',
    },
    structure: {
      ctaRadius: '4px',
      posture: 'pedestal-hairline',
      summary: 'Crisp 4px architectural corners, GhostNumeral background indices, and left-drawn EyebrowRule dividers.',
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
        '--a-font-display': "'Fraunces', Georgia, serif",
        '--a-tracking-display': '-0.025em',
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
        '--a-font-display': "'Fraunces', Georgia, serif",
        '--a-tracking-display': '-0.025em',
      },
    },
  },
  'terracotta-civic': {
    id: 'terracotta-civic',
    name: 'Terracotta Garden (Marigold Civic Analytics)',
    tagline: 'Warm Cream (#FDFBF7), Deep Chocolate Ink (#36241F), and Terracotta (#AD3617) for senior-accessible zero-knowledge civic data.',
    usedBy: 'marigoldinsights.org',
    productionUrl: 'https://marigoldinsights.org',
    repoUrl: 'https://github.com/rorshockbtc/marigold',
    mark: '❀',
    typography: {
      display: 'Fraunces',
      serif: 'Newsreader',
      sans: 'Inter',
      mono: 'JetBrains Mono',
      displayTracking: '-0.02em',
      bodyLineHeight: '1.8',
    },
    structure: {
      ctaRadius: '12px',
      posture: 'warm-well',
      summary: 'Generous 1.8 line-height and 12px tactile parchment wells engineered for senior civic volunteers.',
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
        '--a-font-display': "'Fraunces', Georgia, serif",
        '--a-tracking-display': '-0.02em',
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
        '--a-font-display': "'Fraunces', Georgia, serif",
        '--a-tracking-display': '-0.02em',
      },
    },
  },
  'greater-terminal': {
    id: 'greater-terminal',
    name: 'Greater Terminal (Greater > AI)',
    tagline: 'High-contrast monochrome prompt surface with Major Mono Display, zero box-shadows, and Sovereign Pink (#FE299E) cursor focus.',
    usedBy: 'greater.pink',
    productionUrl: 'https://greater.pink',
    repoUrl: 'https://github.com/rorshockbtc/greater-than',
    mark: '>',
    typography: {
      display: 'Major Mono Display',
      serif: 'Fraunces',
      sans: 'Inter',
      mono: 'JetBrains Mono',
      displayTracking: '-0.01em',
      bodyLineHeight: '1.65',
    },
    structure: {
      ctaRadius: '4px',
      posture: 'terminal-grid',
      summary: 'Zero box-shadows, crisp 4px prompt geometry, and 120ms terminal response physics.',
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
        '--a-font-display': "'JetBrains Mono', monospace",
        '--a-tracking-display': '-0.01em',
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
        '--a-font-display': "'JetBrains Mono', monospace",
        '--a-tracking-display': '-0.01em',
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
  productionUrl?: string;
  repoUrl?: string;
  mark?: string;
  extends?: BrandProfileId;
  typography?: Partial<BrandProfile['typography']>;
  structure?: Partial<NonNullable<BrandProfile['structure']>>;
  productSlots?: ProductColorSlot[];
  customExtension?: CustomStyleExtension;
  tokens: {
    light?: Partial<Record<string, string>>;
    dark?: Partial<Record<string, string>>;
  };
}

/**
 * First-class Programmable Design Interface Factory (`defineAccentTheme`).
 * Allows any project, designer, or agent to extend a canonical Accént preset,
 * override surface/accent/typography/geometry tokens, inject custom CSS/code extensions,
 * and automatically validate WCAG contrast and compile a `STYLES.md` specification.
 */
export function defineAccentTheme(input: DefineAccentThemeInput): BrandProfile<string> & {
  contrastReport: ReturnType<typeof validateThemeContrast>;
  getCssVars: (mode: Mode) => Record<string, string>;
  toStylesMarkdown: () => string;
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
    productionUrl: input.productionUrl ?? base.productionUrl,
    repoUrl: input.repoUrl ?? base.repoUrl,
    mark: input.mark ?? base.mark,
    typography: {
      ...base.typography,
      ...input.typography,
    },
    structure: {
      ctaRadius: input.structure?.ctaRadius ?? cleanLight['--a-radius-cta'] ?? base.structure?.ctaRadius ?? '6px',
      posture: input.structure?.posture ?? base.structure?.posture ?? 'archival-spine',
      summary: input.structure?.summary ?? base.structure?.summary ?? '1px hairline structural layout.',
    },
    productSlots: input.productSlots ?? base.productSlots,
    customExtension: input.customExtension ?? base.customExtension,
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
    toStylesMarkdown: () => generateStylesMarkdown(profile),
  };
}

/**
 * Compiles any `BrandProfile` (plus optional user/agent-injected custom CSS & code rules)
 * into a standalone `STYLES.md` Design System Contract file.
 * Keeps the Style Control Plane (`STYLES.md`) strictly separate from `AGENTS.md`.
 */
export function generateStylesMarkdown(profile: BrandProfile<string>): string {
  const l = profile.tokens.light;
  const d = profile.tokens.dark;
  const slotsSection =
    profile.productSlots && profile.productSlots.length > 0
      ? `\n## 3. Multi-Product Non-Repeating Signature Color Slots\n\n| Mark | Product | Hex | Role |\n|---|---|---|---|\n${profile.productSlots
          .map((s) => `| \`${s.mark}\` | **${s.name}** | \`${s.color}\` | ${s.role} |`)
          .join('\n')}\n`
      : '';

  const customRulesSection =
    profile.customExtension?.rules && profile.customExtension.rules.length > 0
      ? `\n## 6. Brand-Specific Sovereign Style Rules\n\n${profile.customExtension.rules
          .map((r, idx) => `${idx + 1}. ${r}`)
          .join('\n')}\n`
      : '';

  const customCssSection = profile.customExtension?.css
    ? `\n## 7. Injected Custom CSS / Programmable Extension\n\n\`\`\`css\n${profile.customExtension.css.trim()}\n\`\`\`\n`
    : '';

  const customCodeSection = profile.customExtension?.codeSnippet
    ? `\n## 8. Custom Component / Agentic Pattern Extension\n\n\`\`\`tsx\n${profile.customExtension.codeSnippet.trim()}\n\`\`\`\n`
    : '';

  const upstreamCandidatesSection =
    profile.customExtension?.upstreamCandidates && profile.customExtension.upstreamCandidates.length > 0
      ? `\n## 9. Upstream Contribution Pipeline Candidates\n\n> The following components or primitives are nominated for graduation back into \`@rorshockbtc/accent-ui\`:\n\n${profile.customExtension.upstreamCandidates
          .map((c) => `- \`${c}\` (requires token parameterization & Layer 1 verification before upstream PR)`)
          .join('\n')}\n`
      : '';

  return `# STYLES.md — ${profile.name} (\`${profile.id}\`)

> **Design System**: [Accént 3.0](https://design.pipes.pink) (\`https://github.com/rorshockbtc/accent-ui\`) · MIT Open Source
> **Control Plane Notice**: This file (\`STYLES.md\`) governs visual, typographic, chromatic, and choreography architecture. It is intentionally separated from \`AGENTS.md\` (operational runtime control).

## 1. Brand Dialect Identity
- **Dialect ID**: \`${profile.id}\`
- **Signature Punctuation Mark**: \`${profile.mark}\`
- **Used By**: ${profile.usedBy}${profile.productionUrl ? ` (${profile.productionUrl})` : ''}
- **Summary**: ${profile.tagline}

## 2. Chromatic Tokens & WCAG 2.1 AA/AAA Separation

| Token | Light Mode | Dark Mode | Purpose |
|---|---|---|---|
| \`--a-bg\` | \`${l['--a-bg']}\` | \`${d['--a-bg']}\` | Primary page canvas (AAA contrast with \`--a-ink\`) |
| \`--a-surface\` | \`${l['--a-surface']}\` | \`${d['--a-surface']}\` | Secondary card / well surface |
| \`--a-ink\` | \`${l['--a-ink']}\` | \`${d['--a-ink']}\` | Primary body & display ink |
| \`--a-muted\` | \`${l['--a-muted']}\` | \`${d['--a-muted']}\` | Muted metadata & secondary prose (\`>= 4.5:1\` AA) |
| \`--a-rule\` | \`${l['--a-rule']}\` | \`${d['--a-rule']}\` | \`1px\` structural hairline divider |
| \`--a-accent\` | \`${l['--a-accent']}\` | \`${d['--a-accent']}\` | Signature punctuation mark, strike-through bar & focus ring |
| \`--a-accent-fill\` | \`${l['--a-accent-fill']}\` | \`${d['--a-accent-fill']}\` | Accessible primary button background fill (\`>= 4.5:1\` AA with \`--a-accent-fg\`) |
| \`--a-accent-fg\` | \`${l['--a-accent-fg']}\` | \`${d['--a-accent-fg']}\` | Foreground text on primary filled CTA buttons |
| \`--a-accent-text\` | \`${l['--a-accent-text']}\` | \`${d['--a-accent-text']}\` | Inline accent text on \`--a-bg\` (\`>= 4.5:1\` AA) |
| \`--a-sky\` | \`${l['--a-sky']}\` | \`${d['--a-sky']}\` | Secondary accent mark / highlight |
| \`--a-radius-cta\` | \`${l['--a-radius-cta'] ?? '6px'}\` | \`${d['--a-radius-cta'] ?? '6px'}\` | Programmable CTA button border-radius |
${slotsSection}
## 4. Typography & Optical Scaling
- **Display Font**: \`${profile.typography.display}\` (optical tracking: \`${profile.typography.displayTracking ?? '-0.02em'}\`)
- **Editorial Serif**: \`${profile.typography.serif}\`
- **UI Sans**: \`${profile.typography.sans}\` (body line-height: \`${profile.typography.bodyLineHeight ?? '1.65'}\`)
- **Monospace / Telemetry**: \`${profile.typography.mono}\`
- **Hard Floor**: Never render any text smaller than \`13px\` (\`0.8125rem\`).

## 5. Structural Posture & Motion Physics
- **Architectural Posture**: \`${profile.structure?.posture ?? 'archival-spine'}\` — ${profile.structure?.summary ?? 'Divide sections with 1px hairlines, never multi-layer SaaS drop shadows.'}
- **CTA Geometry**: \`--a-radius-cta: ${profile.structure?.ctaRadius ?? l['--a-radius-cta'] ?? '6px'}\` with \`>= 44×44px\` minimum touch target area.
- **Tier 1 Operational Motion**: \`120ms / 200ms / 320ms\` on \`cubic-bezier(0.16, 1, 0.3, 1)\`.
- **Tier 2 Editorial & Brand Choreography**: \`550ms–900ms\` on \`cubic-bezier(0.22, 1, 0.36, 1)\` (\`RiseLines\`, \`ScaryHeadline\`, \`Smile\`, \`FadeUp\`, \`Hairline\`, \`GhostNumeral\`). Always honor \`prefers-reduced-motion: reduce\`.
${customRulesSection}${customCssSection}${customCodeSection}${upstreamCandidatesSection}`;
}
