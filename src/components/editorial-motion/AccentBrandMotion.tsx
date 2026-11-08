'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  m,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type MotionValue,
} from 'framer-motion';
import { useMotionPreference } from '@/components/motion/MotionProvider';
import { EASE_EDITORIAL } from '@/lib/motion/tokens';

// --------------------------------------------------------------------------
// 1. RiseLines — Line-by-line masked rise for large display typography
// --------------------------------------------------------------------------
export interface RiseLinesProps {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  immediate?: boolean;
}

/**
 * Line-by-line masked rise (`y: "110%" -> "0%"` over `0.9s`, `cubic-bezier(0.22, 1, 0.36, 1)`).
 * Upstreamed from CHB Corporate (`feat/playful-principal`).
 */
export function RiseLines({
  lines,
  className = '',
  delay = 0,
  immediate = false,
}: RiseLinesProps) {
  const { isReduced } = useMotionPreference();

  return (
    <m.span
      className={`block ${className}`}
      initial="hidden"
      {...(immediate
        ? { animate: 'visible' }
        : {
            whileInView: 'visible',
            viewport: { once: true, amount: 0.15 },
          })}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <m.span
            className="block"
            variants={{
              hidden: isReduced ? { opacity: 0 } : { y: '110%' },
              visible: isReduced ? { opacity: 1 } : { y: '0%' },
            }}
            transition={{
              duration: isReduced ? 0.2 : 0.9,
              ease: EASE_EDITORIAL,
              delay: delay + i * 0.08,
            }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </m.span>
  );
}

// --------------------------------------------------------------------------
// 2. FadeUp — Soft 24px scroll-triggered settle reveal
// --------------------------------------------------------------------------
export interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  immediate?: boolean;
}

/**
 * Scroll-triggered soft fade-up (`y: 24 -> 0`, `0.8s`, `cubic-bezier(0.22, 1, 0.36, 1)`).
 * Upstreamed from CHB Corporate (`feat/playful-principal`).
 */
export function FadeUp({
  children,
  className = '',
  delay = 0,
  y = 24,
  immediate = false,
}: FadeUpProps) {
  const { isReduced } = useMotionPreference();

  return (
    <m.div
      className={className}
      initial={isReduced ? { opacity: 0 } : { opacity: 0, y }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0 } }
        : {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: '-8% 0px' },
          })}
      transition={{
        duration: isReduced ? 0.2 : 0.8,
        ease: EASE_EDITORIAL,
        delay,
      }}
    >
      {children}
    </m.div>
  );
}

// --------------------------------------------------------------------------
// 3. Hairline — Left-origin horizontal rule expansion (`scaleX: 0 -> 1`)
// --------------------------------------------------------------------------
export interface HairlineProps {
  className?: string;
  delay?: number;
}

export function Hairline({
  className = 'bg-[var(--a-rule)]',
  delay = 0,
}: HairlineProps) {
  const { isReduced } = useMotionPreference();

  return (
    <m.div
      initial={isReduced ? { opacity: 0 } : { scaleX: 0 }}
      whileInView={isReduced ? { opacity: 1 } : { scaleX: 1 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{
        duration: isReduced ? 0.2 : 0.85,
        delay,
        ease: EASE_EDITORIAL,
      }}
      style={{ transformOrigin: 'left center' }}
      className={`h-px w-full ${className}`}
    />
  );
}

// --------------------------------------------------------------------------
// 4. Stagger & StaggerItem — Coordinated container/child stagger choreography
// --------------------------------------------------------------------------
export interface StaggerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
}

export function Stagger({
  children,
  staggerChildren = 0.06,
  delayChildren = 0.02,
  className,
  ...rest
}: StaggerProps) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-6% 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </m.div>
  );
}

export interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  y?: number;
  className?: string;
}

export function StaggerItem({
  children,
  y = 16,
  className,
  ...rest
}: StaggerItemProps) {
  const { isReduced } = useMotionPreference();

  return (
    <m.div
      variants={{
        hidden: isReduced ? { opacity: 0 } : { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: isReduced ? 0.2 : 0.65,
            ease: EASE_EDITORIAL,
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </m.div>
  );
}

// --------------------------------------------------------------------------
// 5. Eyebrow — Monospace eyebrow with colored punctuation mark
// --------------------------------------------------------------------------
export interface EyebrowProps {
  mark: string;
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function Eyebrow({
  mark,
  children,
  color = 'var(--a-accent)',
  className = '',
}: EyebrowProps) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--a-muted)] ${className}`}
    >
      <span className="font-bold text-[15px]" style={{ color }} aria-hidden="true">
        {mark}
      </span>
      <span>{children}</span>
    </div>
  );
}

// --------------------------------------------------------------------------
// 6. Smile (AccentSmile) — Animated `: - ]` -> `; - ]` wink primitive
// --------------------------------------------------------------------------
export interface SmileProps {
  className?: string;
  winkEvery?: number | null;
  hoverWink?: boolean;
  color?: string;
}

/**
 * The CHB mark — ": - ]" — that occasionally winks into "; - ]" with a spring bracket tilt.
 * Pure typography; no image assets.
 */
export function Smile({
  className = '',
  winkEvery = 4200,
  hoverWink = true,
  color = 'currentColor',
}: SmileProps) {
  const { isReduced } = useMotionPreference();
  const [wink, setWink] = useState(false);

  useEffect(() => {
    if (isReduced || !winkEvery) return;
    const id = window.setInterval(() => {
      setWink(true);
      window.setTimeout(() => setWink(false), 260);
    }, winkEvery);
    return () => window.clearInterval(id);
  }, [isReduced, winkEvery]);

  return (
    <span
      className={`inline-flex items-baseline font-serif font-bold leading-none select-none tracking-normal ${className}`}
      style={{ color }}
      onMouseEnter={() => hoverWink && setWink(true)}
      onMouseLeave={() => hoverWink && setWink(false)}
      aria-label="colon hyphen bracket smile"
      role="img"
    >
      <span className="relative inline-block w-[0.62em] text-center">
        <m.span
          className="absolute inset-0"
          animate={{ opacity: wink ? 0 : 1, scaleY: wink ? 0.2 : 1 }}
          transition={{ duration: 0.12 }}
        >
          :
        </m.span>
        <m.span
          className="absolute inset-0"
          animate={{ opacity: wink ? 1 : 0 }}
          transition={{ duration: 0.12 }}
        >
          ;
        </m.span>
        <span className="invisible">:</span>
      </span>
      <span className="inline-block mx-[0.12em] text-center">-</span>
      <m.span
        className="inline-block w-[0.62em] text-center origin-left"
        animate={{ rotate: wink ? 8 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
      >
        ]
      </m.span>
    </span>
  );
}

export const AccentSmile = Smile;

// --------------------------------------------------------------------------
// 7. ScaryHeadline (AccentStrikeReplace) — 3-phase strike-through + spring swap
// --------------------------------------------------------------------------
export type ScaryPair = { scary: string; friendly: string };

export const HOME_SCARY_PAIRS: ScaryPair[] = [
  { scary: 'SOC 2 audits', friendly: 'a checklist' },
  { scary: 'HIPAA', friendly: 'trust' },
  { scary: 'vendor lock-in', friendly: 'freedom' },
  { scary: 'legacy code', friendly: 'calm' },
  { scary: 'regulators', friendly: 'easy audits' },
  { scary: 'cryptography', friendly: 'privacy' },
  { scary: 'dark patterns', friendly: 'honest UX' },
];

export const STUDIO_SCARY_PAIRS: ScaryPair[] = [
  { scary: 'four-person handoffs', friendly: 'one principal' },
  { scary: 'six-month discovery', friendly: 'a five-day sprint' },
  { scary: 'bloated agency retainers', friendly: 'shipped code' },
  { scary: 'Figma-to-nowhere', friendly: 'working software' },
];

export const MANIFESTO_SCARY_PAIRS: ScaryPair[] = [
  { scary: 'coastal gatekeeping', friendly: 'Main Street craft' },
  { scary: 'unpatched WordPress', friendly: 'software you own' },
  { scary: 'fake neutrality', friendly: 'honest opinions' },
  { scary: 'opaque surveillance', friendly: 'local-first trust' },
];

export const DESIGN_SYSTEM_SCARY_PAIRS: ScaryPair[] = [
  { scary: 'arbitrary hex codes', friendly: 'semantic tokens' },
  { scary: 'nested card soup', friendly: 'quiet hairlines' },
  { scary: 'layout shift jank', friendly: 'GPU transforms' },
  { scary: 'guesswork spacing', friendly: 'an 8-point grid' },
];

type StrikePhase = 'scary' | 'strike' | 'friendly';

export interface ScaryHeadlineProps {
  accent?: string;
  pairs?: ScaryPair[];
  leadIn?: string;
  connector?: string;
  fallbackWord?: string;
  inkColor?: string;
  struckColor?: string;
}

/**
 * 3-phase state machine ("scary" -> "strike" -> "friendly") with animated strike-through bar,
 * spring word replacement (`stiffness: 240, damping: 24`), and `Smile` wink.
 * Upstreamed from CHB Corporate (`feat/playful-principal`).
 */
export function ScaryHeadline({
  accent = 'var(--a-accent)',
  pairs = HOME_SCARY_PAIRS,
  leadIn = 'We turn',
  connector = 'into',
  fallbackWord = 'a smile',
  inkColor = 'var(--a-ink)',
  struckColor = 'var(--a-muted)',
}: ScaryHeadlineProps) {
  const { isReduced } = useMotionPreference();
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<StrikePhase>('scary');

  useEffect(() => {
    const ms: Record<StrikePhase, number> = isReduced
      ? { scary: 2400, strike: 10, friendly: 2600 }
      : { scary: 1700, strike: 600, friendly: 2400 };
    const t = window.setTimeout(() => {
      if (phase === 'scary') setPhase('strike');
      else if (phase === 'strike') setPhase('friendly');
      else {
        setPhase('scary');
        setI((n) => (n + 1) % pairs.length);
      }
    }, ms[phase]);
    return () => window.clearTimeout(t);
  }, [phase, isReduced, pairs.length]);

  const pair = pairs[i % pairs.length];
  const struck = phase !== 'scary';

  return (
    <span className="block" aria-label={`${leadIn} ${pair.scary} ${connector} ${pair.friendly}`}>
      <span className="block overflow-hidden pb-[0.08em]">
        <m.span
          className="block"
          style={{ color: inkColor }}
          initial={isReduced ? { opacity: 0 } : { y: '110%' }}
          animate={isReduced ? { opacity: 1 } : { y: '0%' }}
          transition={{ duration: isReduced ? 0.2 : 0.9, ease: EASE_EDITORIAL }}
        >
          {leadIn}
        </m.span>
      </span>

      {/* Line 2: the scary thing */}
      <span className="block overflow-hidden pb-[0.08em] min-h-[1.06em]">
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={pair.scary}
            className="relative inline-block sm:whitespace-nowrap"
            style={{ color: struck ? struckColor : inkColor, opacity: struck ? 0.45 : 1 }}
            initial={isReduced ? { opacity: 0 } : { y: '100%' }}
            animate={isReduced ? { opacity: struck ? 0.45 : 1 } : { y: '0%' }}
            exit={isReduced ? { opacity: 0 } : { y: '-100%' }}
            transition={{ duration: isReduced ? 0.15 : 0.55, ease: EASE_EDITORIAL }}
          >
            {pair.scary}
            <m.span
              aria-hidden="true"
              className="absolute left-[-2%] top-[52%] h-[0.085em] rounded-full"
              style={{ backgroundColor: accent }}
              initial={{ width: '0%' }}
              animate={{ width: struck ? '104%' : '0%' }}
              transition={{ duration: isReduced ? 0.1 : 0.45, ease: [0.65, 0, 0.35, 1] }}
            />
          </m.span>
        </AnimatePresence>
      </span>

      {/* Line 3: into [friendly] : - ] */}
      <span className="block overflow-hidden pb-[0.08em] min-h-[1.06em] sm:whitespace-nowrap">
        <m.span
          className="inline-block mr-[0.24em]"
          style={{ color: inkColor }}
          initial={isReduced ? { opacity: 0 } : { y: '110%' }}
          animate={isReduced ? { opacity: 1 } : { y: '0%' }}
          transition={{ duration: isReduced ? 0.2 : 0.9, ease: EASE_EDITORIAL, delay: 0.15 }}
        >
          {connector}
        </m.span>
        <span className="relative inline-block">
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={phase === 'friendly' ? pair.friendly : fallbackWord}
              className="inline-block"
              style={{ color: phase === 'friendly' ? accent : inkColor }}
              initial={
                isReduced
                  ? { opacity: 0 }
                  : { y: '100%', rotate: phase === 'friendly' ? -3 : 0 }
              }
              animate={isReduced ? { opacity: 1 } : { y: '0%', rotate: 0 }}
              exit={isReduced ? { opacity: 0 } : { y: '-100%' }}
              transition={
                isReduced
                  ? { duration: 0.15 }
                  : { type: 'spring', stiffness: 240, damping: 24 }
              }
            >
              {phase === 'friendly' ? pair.friendly : fallbackWord}
            </m.span>
          </AnimatePresence>
        </span>{' '}
        <Smile
          className="inline-flex align-baseline text-[0.72em] sm:text-[0.78em]"
          color={accent}
          winkEvery={phase === 'friendly' ? 900 : 5000}
        />
      </span>
    </span>
  );
}

export const AccentStrikeReplace = ScaryHeadline;

// --------------------------------------------------------------------------
// 8. Reveal — Configurable scroll reveal (Portfolio / Cassandra adapter alias)
// --------------------------------------------------------------------------
export interface RevealProps extends FadeUpProps {
  duration?: number;
}

/**
 * Configurable scroll-triggered settle reveal (`duration = 0.72, y = 20`).
 * Upstreamed from `rorshockbtc/portfolio` (`client/src/components/motion/primitives.tsx`).
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 20,
  duration = 0.72,
  immediate = false,
}: RevealProps) {
  const { isReduced } = useMotionPreference();

  return (
    <m.div
      className={className}
      initial={isReduced ? { opacity: 0 } : { opacity: 0, y }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0 } }
        : {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: '-8% 0px' },
          })}
      transition={{
        duration: isReduced ? 0.2 : duration,
        ease: EASE_EDITORIAL,
        delay,
      }}
    >
      {children}
    </m.div>
  );
}

// --------------------------------------------------------------------------
// 9. useParallax & GhostNumeral — Subtle scroll-tied parallax & ghost index
// --------------------------------------------------------------------------
/**
 * Scroll-tied vertical parallax transform hook (`[-distance, distance]`).
 * Upstreamed from `rorshockbtc/chicuinaco` (`client/src/components/motion.tsx`).
 */
export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  distance = 40
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
}

export interface GhostNumeralProps {
  value: string;
  className?: string;
}

/**
 * Giant low-opacity archival background numeral (`01`, `02`, `§`) with subtle scroll parallax.
 * Upstreamed from `rorshockbtc/chicuinaco` (`client/src/components/motion.tsx`).
 */
export function GhostNumeral({ value, className = '' }: GhostNumeralProps) {
  const { isReduced } = useMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  const y = useParallax(ref, isReduced ? 0 : 28);

  return (
    <m.div
      ref={ref}
      style={isReduced ? undefined : { y }}
      aria-hidden="true"
      className={`pointer-events-none select-none font-serif font-light leading-none tracking-[-0.05em] text-[clamp(7rem,18vw,16rem)] text-[var(--a-ink)] opacity-[0.05] ${className}`}
    >
      {value}
    </m.div>
  );
}

// --------------------------------------------------------------------------
// 10. EyebrowRule — Drawn-line + tabular index eyebrow (Chicuinaco adapter)
// --------------------------------------------------------------------------
export interface EyebrowRuleProps {
  children: React.ReactNode;
  index?: string;
  className?: string;
}

/**
 * Animated left-drawn rule (`scaleX: 0 -> 1`) paired with an optional tabular index (`01 /`).
 * Upstreamed from `rorshockbtc/chicuinaco` (`client/src/components/motion.tsx`).
 */
export function EyebrowRule({ children, index, className = '' }: EyebrowRuleProps) {
  const { isReduced } = useMotionPreference();

  return (
    <m.div
      initial={isReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
      whileInView={isReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: isReduced ? 0.2 : 0.6, ease: EASE_EDITORIAL }}
      className={`inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-[var(--a-accent-text)] ${className}`}
    >
      <m.span
        initial={isReduced ? { opacity: 1 } : { scaleX: 0 }}
        whileInView={isReduced ? { opacity: 1 } : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: isReduced ? 0.2 : 0.7, delay: 0.1, ease: EASE_EDITORIAL }}
        style={{ transformOrigin: 'left center' }}
        className="h-px w-6 bg-[var(--a-accent)]"
        aria-hidden="true"
      />
      {index ? <span className="tabular-nums opacity-65">{index}</span> : null}
      <span>{children}</span>
    </m.div>
  );
}

