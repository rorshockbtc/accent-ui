'use client';

import React, { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { useMotionPreference } from '@/components/motion/MotionProvider';
import { EASE_EDITORIAL, EDITORIAL_DURATION } from '@/lib/motion/tokens';

export interface AccentRevealTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
  italicWords?: number[];
  immediate?: boolean;
}

/**
 * Accént Editorial RevealText (Tier 2 Showcase Motion)
 *
 * Words rise smoothly from behind an overflow-hidden mask with the Chicuinaco
 * editorial curve (`[0.22, 1, 0.36, 1]`).
 *
 * - Zero layout shift: Uses pure transform/translate-y.
 * - Fully accessible: Screen readers receive full text via `aria-label`; inner word spans are `aria-hidden`.
 * - Reduced motion safe: Instantly falls back to a clean opacity fade with zero displacement.
 */
export function AccentRevealText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = EDITORIAL_DURATION.staggerWord,
  italicWords = [],
  immediate = false,
}: AccentRevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });
  const { isReduced } = useMotionPreference();
  const show = immediate || inView;
  const words = text.split(' ');

  const MotionTag = m[Tag] as typeof m.span;

  return (
    <MotionTag
      ref={ref as any}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
        >
          <m.span
            className={`inline-block ${italicWords.includes(i) ? 'italic' : ''}`}
            initial={isReduced ? { opacity: 0 } : { y: '105%' }}
            animate={show ? (isReduced ? { opacity: 1 } : { y: '0%' }) : undefined}
            transition={{
              duration: isReduced ? 0.2 : EDITORIAL_DURATION.reveal,
              ease: EASE_EDITORIAL,
              delay: delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </m.span>
        </span>
      ))}
    </MotionTag>
  );
}
