/**
 * Accént · Pipes Sovereign Design System Tokens (v3.0.0)
 * Single source of truth for web (Next.js) and desktop (pipes-native Tauri / Rust).
 * Formatted for W3C DTCG / Figma Tokens Studio and strict developer-grade type safety.
 */

import tokensJson from './design-tokens.json';

export type Mode = 'light' | 'dark';
export type SurfaceMode = 'editorial' | 'commercial';
export type PastelName = 'blush' | 'peach' | 'butter' | 'sage' | 'ice' | 'periwinkle' | 'lilac';
export type TonalDarkName = 'oxblood' | 'leather' | 'bronze' | 'forest' | 'abyss' | 'midnight' | 'plum';

export const DESIGN_TOKENS = tokensJson;
export const PASTELS = tokensJson.color.pastels;
export const TONAL_DARKS = tokensJson.color.tonalDarks;
export const CANVAS = tokensJson.color.canvas;
export const ACCENT_PRIMARY = tokensJson.color.accent.primary;
export const ACCENT_SKY = tokensJson.color.accent.sky;
export const CURATED_PAIRINGS = tokensJson.color.curatedCrossChromaticPairings;
export const TYPOGRAPHY = tokensJson.typography;
export const SPACING = tokensJson.spacing;
export const RADIUS = tokensJson.radius;
export const Z_INDEX = tokensJson.zIndex;
export const ELEVATION = tokensJson.elevation;

/**
 * Calculates WCAG relative luminance of an sRGB hex code.
 */
export function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '').slice(0, 6);
  const r = parseInt(cleanHex.slice(0, 2), 16) / 255;
  const g = parseInt(cleanHex.slice(2, 4), 16) / 255;
  const b = parseInt(cleanHex.slice(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Computes contrast ratio between two hex colors according to WCAG 2.1 specs.
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Validates whether a foreground/background pair meets WCAG AAA standards (>= 7:1).
 */
export function isWcagAaa(foregroundHex: string, backgroundHex: string): boolean {
  return getContrastRatio(foregroundHex, backgroundHex) >= 7.0;
}

/**
 * Validates whether a foreground/background pair meets WCAG AA standards (>= 4.5:1).
 */
export function isWcagAa(foregroundHex: string, backgroundHex: string): boolean {
  return getContrastRatio(foregroundHex, backgroundHex) >= 4.5;
}

/**
 * 49-point Cross-Chromatic Matrix lookup.
 * Every single Pastel on every single Tonal Dark is mathematically guaranteed AAA compliant.
 */
export function getCrossChromaticPair(pastel: PastelName, dark: TonalDarkName) {
  const foreground = PASTELS[pastel].$value;
  const background = TONAL_DARKS[dark].$value;
  const ratio = getContrastRatio(foreground, background);

  return {
    foreground,
    background,
    contrastRatio: Number(ratio.toFixed(2)),
    isAaa: ratio >= 7.0,
    isAa: ratio >= 4.5,
  };
}

export interface SemanticContrastPair {
  id: string;
  label: string;
  mode: Mode;
  foreground: string;
  background: string;
  minRatio: number;
}

/**
 * Canonical semantic text/button pairs verified in CI to prevent contrast regressions.
 */
export const SEMANTIC_CONTRAST_PAIRS: SemanticContrastPair[] = [
  {
    id: 'light.body-ink-on-sandstone',
    label: 'Slate Ink on Warm Sandstone (Body)',
    mode: 'light',
    foreground: CANVAS.light.ink.$value,
    background: CANVAS.light.default.$value,
    minRatio: 7.0,
  },
  {
    id: 'light.muted-on-sandstone',
    label: 'Muted Slate on Warm Sandstone',
    mode: 'light',
    foreground: CANVAS.light.inkMuted.$value,
    background: CANVAS.light.default.$value,
    minRatio: 4.5,
  },
  {
    id: 'light.primary-cta-pink',
    label: 'White on Primary Pink Button Fill (#B8326D)',
    mode: 'light',
    foreground: ACCENT_PRIMARY.light.fillForeground.$value,
    background: ACCENT_PRIMARY.light.fill.$value,
    minRatio: 4.5,
  },
  {
    id: 'light.primary-text-pink-on-sandstone',
    label: 'Inline Pink Accent Text (#A3285C) on Sandstone',
    mode: 'light',
    foreground: ACCENT_PRIMARY.light.text.$value,
    background: CANVAS.light.default.$value,
    minRatio: 4.5,
  },
  {
    id: 'light.sky-ice-surface',
    label: 'Marine Abyss (#02212F) on Crystalline Ice Sky (#D4EBF5)',
    mode: 'light',
    foreground: ACCENT_SKY.light.surfaceForeground.$value,
    background: ACCENT_SKY.light.surface.$value,
    minRatio: 7.0,
  },
  {
    id: 'light.sky-electric-fill',
    label: 'Slate Ink (#111827) on Electric Sky Fill (#01A9F4)',
    mode: 'light',
    foreground: ACCENT_SKY.light.fillForeground.$value,
    background: ACCENT_SKY.light.fill.$value,
    minRatio: 4.5,
  },
  {
    id: 'light.sky-deep-fill',
    label: 'White (#FFFFFF) on Deep Cerulean (#0369A1)',
    mode: 'light',
    foreground: ACCENT_SKY.light.deepFillForeground.$value,
    background: ACCENT_SKY.light.deepFill.$value,
    minRatio: 4.5,
  },
  {
    id: 'light.sky-text-on-sandstone',
    label: 'Deep Cerulean Text (#0369A1) on Sandstone',
    mode: 'light',
    foreground: ACCENT_SKY.light.text.$value,
    background: CANVAS.light.default.$value,
    minRatio: 4.5,
  },
  {
    id: 'dark.body-linen-on-charcoal',
    label: 'Warm Linen on Slate Charcoal (Dark Body)',
    mode: 'dark',
    foreground: CANVAS.dark.ink.$value,
    background: CANVAS.dark.default.$value,
    minRatio: 7.0,
  },
  {
    id: 'dark.muted-on-charcoal',
    label: 'Warm Stone on Slate Charcoal (Dark Muted)',
    mode: 'dark',
    foreground: CANVAS.dark.inkMuted.$value,
    background: CANVAS.dark.default.$value,
    minRatio: 7.0,
  },
  {
    id: 'dark.primary-cta-rose',
    label: 'Slate Ink (#111827) on Dark-Mode Rose Fill (#EE8AB4)',
    mode: 'dark',
    foreground: ACCENT_PRIMARY.dark.fillForeground.$value,
    background: ACCENT_PRIMARY.dark.fill.$value,
    minRatio: 4.5,
  },
  {
    id: 'dark.sky-text-on-charcoal',
    label: 'Luminous Sky (#38BDF8) on Slate Charcoal (#111827)',
    mode: 'dark',
    foreground: ACCENT_SKY.dark.text.$value,
    background: CANVAS.dark.default.$value,
    minRatio: 7.0,
  },
];

/**
 * Generates the canonical CSS custom properties for a given theme mode.
 * Used by both globals.css and React roots so token values never drift.
 */
export function getAccentThemeVars(mode: Mode): Record<string, string> {
  if (mode === 'light') {
    return {
      '--a-bg': CANVAS.light.default.$value,
      '--a-surface': CANVAS.light.card.$value,
      '--a-card': CANVAS.light.card.$value,
      '--a-well': CANVAS.light.paper.$value,
      '--a-ink': CANVAS.light.ink.$value,
      '--a-muted': CANVAS.light.inkMuted.$value,
      '--a-rule': 'rgba(17, 24, 39, 0.14)',
      '--a-accent': ACCENT_PRIMARY.light.mark.$value,
      '--a-accent-fill': ACCENT_PRIMARY.light.fill.$value,
      '--a-accent-fill-hover': ACCENT_PRIMARY.light.fillHover.$value,
      '--a-accent-fg': ACCENT_PRIMARY.light.fillForeground.$value,
      '--a-accent-text': ACCENT_PRIMARY.light.text.$value,
      '--a-sky': ACCENT_SKY.light.fill.$value,
      '--a-sky-fg': ACCENT_SKY.light.fillForeground.$value,
      '--a-sky-deep': ACCENT_SKY.light.deepFill.$value,
      '--a-sky-deep-fg': ACCENT_SKY.light.deepFillForeground.$value,
      '--a-sky-surface': ACCENT_SKY.light.surface.$value,
      '--a-sky-ink': ACCENT_SKY.light.surfaceForeground.$value,
      '--a-sky-text': ACCENT_SKY.light.text.$value,
      '--a-link': CANVAS.light.ink.$value,
      '--a-emerald': '#15803D',
    };
  }
  return {
    '--a-bg': CANVAS.dark.default.$value,
    '--a-surface': CANVAS.dark.surface.$value,
    '--a-card': CANVAS.dark.card.$value,
    '--a-well': CANVAS.dark.surface.$value,
    '--a-ink': CANVAS.dark.ink.$value,
    '--a-muted': CANVAS.dark.inkMuted.$value,
    '--a-rule': 'rgba(243, 239, 233, 0.14)',
    '--a-accent': ACCENT_PRIMARY.dark.mark.$value,
    '--a-accent-fill': ACCENT_PRIMARY.dark.fill.$value,
    '--a-accent-fill-hover': ACCENT_PRIMARY.dark.fillHover.$value,
    '--a-accent-fg': ACCENT_PRIMARY.dark.fillForeground.$value,
    '--a-accent-text': ACCENT_PRIMARY.dark.text.$value,
    '--a-sky': ACCENT_SKY.dark.fill.$value,
    '--a-sky-fg': ACCENT_SKY.dark.fillForeground.$value,
    '--a-sky-deep': ACCENT_SKY.dark.deepFill.$value,
    '--a-sky-deep-fg': ACCENT_SKY.dark.deepFillForeground.$value,
    '--a-sky-surface': ACCENT_SKY.dark.surface.$value,
    '--a-sky-ink': ACCENT_SKY.dark.surfaceForeground.$value,
    '--a-sky-text': ACCENT_SKY.dark.text.$value,
    '--a-link': CANVAS.dark.ink.$value,
    '--a-emerald': '#34D399',
  };
}
