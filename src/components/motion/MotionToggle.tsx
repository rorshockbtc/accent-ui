'use client';

import { useMotionPreference } from '@/components/motion/MotionProvider';
import { Sparkles, EyeOff } from 'lucide-react';

export function MotionToggle({ className = '' }: { className?: string }) {
  const { isReduced, toggleMotionMode } = useMotionPreference();

  const label = isReduced ? 'Motion reduced (fades only). Click for natural motion.' : 'Natural motion active. Click to reduce motion.';

  return (
    <button
      type="button"
      data-testid="motion-toggle-btn"
      onClick={toggleMotionMode}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border/60 bg-surface/80 hover:bg-surface text-foreground/80 hover:text-foreground transition-colors cursor-pointer ${className}`}
    >
      {isReduced ? (
        <EyeOff className="w-4 h-4 text-stone-500" aria-hidden="true" />
      ) : (
        <Sparkles className="w-4 h-4 text-[#D44983]" aria-hidden="true" />
      )}
    </button>
  );
}
