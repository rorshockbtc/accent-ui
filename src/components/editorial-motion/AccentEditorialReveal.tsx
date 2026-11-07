'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useMotionPreference } from '@/components/motion/MotionProvider';
import { EASE_EDITORIAL, EDITORIAL_DURATION } from '@/lib/motion/tokens';

export interface AccentEditorialRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Accént Editorial Viewport Reveal (Tier 2 Showcase Motion)
 *
 * Smooth, glamorous opacity + elevation reveal as elements enter the viewport.
 * Uses `viewport={{ once: true, margin: '-6% 0px' }}` and the soft-settle Chicuinaco curve.
 */
export function AccentEditorialReveal({
  children,
  className = '',
  delay = 0,
  y = 16,
}: AccentEditorialRevealProps) {
  const { isReduced } = useMotionPreference();

  return (
    <m.div
      className={className}
      initial={isReduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{
        duration: isReduced ? 0.2 : EDITORIAL_DURATION.fadeIn,
        ease: EASE_EDITORIAL,
        delay,
      }}
    >
      {children}
    </m.div>
  );
}
