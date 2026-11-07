/**
 * Accént Motion 1.0 — Canonical Motion Tokens & Choreography Presets
 *
 * Implements the Accént Motion Doctrine (`foundations/motion`):
 * - Three durations: 120ms (`fast`), 200ms (`base`), 320ms (`slow`)
 * - One easing curve: `cubic-bezier(0.16, 1, 0.3, 1)` for entrances and state changes
 * - One shared spring (`SPRING_LAYOUT`) strictly for `layoutId` shared-element indicators and sheet drag
 * - GPU-safe properties only (`transform`, `opacity`)
 * - `prefers-reduced-motion` honored everywhere via `MotionConfig reducedMotion="user"` and CSS
 */

export const DURATION = {
  fast: 0.12,
  base: 0.2,
  slow: 0.32,
} as const;

export const DURATION_MS = {
  fast: 120,
  base: 200,
  slow: 320,
} as const;

export const EASE_ACCENT: readonly [number, number, number, number] = [0.16, 1, 0.3, 1] as const;
export const EASE_ACCENT_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)' as const;

/**
 * Accént Editorial Easing (Tier 2 Showcase) — slow, soft settle inspired by Chicuinaco.
 * Used for glamorous landing page hero text reveals, image curtains, and section entries.
 */
export const EASE_EDITORIAL: readonly [number, number, number, number] = [0.22, 1, 0.36, 1] as const;
export const EASE_EDITORIAL_CSS = 'cubic-bezier(0.22, 1, 0.36, 1)' as const;

export const EDITORIAL_DURATION = {
  staggerWord: 0.035,
  staggerCard: 0.08,
  fadeIn: 0.65,
  reveal: 0.85,
} as const;

/**
 * Shared spring physics used strictly for `layoutId` active indicators
 * (episode bar, tab underline) and interactive sheet/drawer drag.
 */
export const SPRING_LAYOUT = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 34,
};

/**
 * 120ms micro-feedback press scale for interactive buttons and chips.
 */
export const TAP = {
  scale: 0.97,
} as const;

/**
 * Subtle 8px rise + opacity reveal for commercial surfaces and one-shot confirmations.
 * Never used on editorial body prose.
 */
export const RISE = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE_ACCENT,
    },
  },
} as const;

/**
 * Delightful card hover micro-interaction preset (GPU-safe transform).
 */
export const CARD_HOVER = {
  y: -4,
  transition: { duration: DURATION.fast, ease: EASE_ACCENT },
} as const;

export const CARD_TAP = {
  scale: 0.985,
  transition: { duration: DURATION.fast, ease: EASE_ACCENT },
} as const;

/**
 * Staggered container preset (capped at 40ms stagger for commercial card grids).
 */
export const STAGGER_CONTAINER = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
} as const;

/**
 * Mobile bottom-sheet slide preset (320ms Accént curve, symmetric exit).
 */
export const SHEET_SLIDE_UP = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_ACCENT },
  },
  exit: {
    opacity: 0,
    y: 28,
    transition: { duration: DURATION.base, ease: EASE_ACCENT },
  },
} as const;

/**
 * Backdrop fade preset (200ms Accént curve).
 */
export const BACKDROP_FADE = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE_ACCENT },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.fast, ease: EASE_ACCENT },
  },
} as const;

export const MOTION_STORAGE_KEY = 'pipes_motion_mode';
export const MOTION_EVENT_NAME = 'pipes-motion-change';
export type MotionMode = 'natural' | 'reduced';

