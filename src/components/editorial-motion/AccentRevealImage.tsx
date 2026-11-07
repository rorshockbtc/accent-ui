'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useMotionPreference } from '@/components/motion/MotionProvider';
import { EASE_EDITORIAL, EDITORIAL_DURATION } from '@/lib/motion/tokens';

export interface AccentRevealImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
  priority?: boolean;
}

/**
 * Accént Editorial Curtain Image Reveal (Tier 2 Showcase Motion)
 *
 * Cinematic clip-path curtain wipe that reveals rich editorial photography
 * accompanied by a subtle zoom settle (scale 1.05 -> 1.0).
 */
export function AccentRevealImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  delay = 0,
}: AccentRevealImageProps) {
  const { isReduced } = useMotionPreference();

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <m.div
        initial={
          isReduced
            ? { opacity: 0 }
            : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }
        }
        whileInView={
          isReduced
            ? { opacity: 1 }
            : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
        }
        viewport={{ once: true, margin: '-6% 0px' }}
        transition={{
          duration: isReduced ? 0.2 : EDITORIAL_DURATION.reveal,
          ease: EASE_EDITORIAL,
          delay,
        }}
        className="w-full h-full"
      >
        <m.img
          src={src}
          alt={alt}
          initial={isReduced ? { scale: 1 } : { scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: isReduced ? 0.2 : 1.2,
            ease: EASE_EDITORIAL,
            delay,
          }}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      </m.div>
    </div>
  );
}
