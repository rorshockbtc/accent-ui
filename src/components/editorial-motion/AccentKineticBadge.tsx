'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useMotionPreference } from '@/components/motion/MotionProvider';

export function AccentKineticBadge({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  const { isReduced } = useMotionPreference();

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex items-center gap-[3px] h-3.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <m.span
            key={i}
            initial={isReduced ? { scaleY: 1 } : { scaleY: 0.3, opacity: 0.4 }}
            animate={
              isReduced
                ? { scaleY: 1, opacity: 1 }
                : {
                    scaleY: [0.3, 1, 0.7, 1],
                    opacity: [0.4, 1, 0.8, 1],
                  }
            }
            transition={{
              duration: 0.8,
              delay: i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-[2px] h-3.5 bg-[#D44983] origin-bottom rounded-[0.5px]"
          />
        ))}
      </span>
      <span className="text-xs font-sans uppercase tracking-widest text-[#111827]/70 dark:text-stone-400 font-bold">
        {label}
      </span>
    </div>
  );
}
