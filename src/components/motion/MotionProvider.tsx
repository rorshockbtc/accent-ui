'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { LazyMotion, domMax, MotionConfig } from 'framer-motion';
import {
  DURATION,
  EASE_ACCENT,
  MOTION_STORAGE_KEY,
  MOTION_EVENT_NAME,
  type MotionMode,
} from '@/lib/motion/tokens';

interface MotionContextType {
  motionMode: MotionMode;
  isReduced: boolean;
  setMotionMode: (mode: MotionMode) => void;
  toggleMotionMode: () => void;
}

const MotionContext = createContext<MotionContextType>({
  motionMode: 'natural',
  isReduced: false,
  setMotionMode: () => {},
  toggleMotionMode: () => {},
});

export function useMotionPreference() {
  return useContext(MotionContext);
}

/**
 * Global Accént Motion Provider:
 * - Wraps the application in `LazyMotion` (`domMax` for `layoutId` + drag support on `m.*` primitives)
 * - Honors in-app user preference ('natural' vs 'reduced') stored in localStorage
 * - Falls back to OS `prefers-reduced-motion` when set to 'natural' via `reducedMotion="user"`
 * - When user selects 'reduced', passes `reducedMotion="always"` which disables all layout shifts and springs
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [motionMode, setMotionModeState] = useState<MotionMode>('natural');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(MOTION_STORAGE_KEY) as MotionMode | null;
      if (stored === 'natural' || stored === 'reduced') {
        setMotionModeState(stored);
      }
    } catch {
      // LocalStorage access may fail in restricted sandboxes
    }

    const onExternalChange = (e: Event) => {
      const custom = e as CustomEvent<MotionMode>;
      if (custom.detail === 'natural' || custom.detail === 'reduced') {
        setMotionModeState(custom.detail);
      }
    };
    window.addEventListener(MOTION_EVENT_NAME, onExternalChange);
    return () => window.removeEventListener(MOTION_EVENT_NAME, onExternalChange);
  }, []);

  const setMotionMode = (mode: MotionMode) => {
    setMotionModeState(mode);
    try {
      localStorage.setItem(MOTION_STORAGE_KEY, mode);
      window.dispatchEvent(new CustomEvent(MOTION_EVENT_NAME, { detail: mode }));
    } catch {
      // ignore
    }
  };

  const toggleMotionMode = () => {
    setMotionMode(motionMode === 'reduced' ? 'natural' : 'reduced');
  };

  const isReduced = motionMode === 'reduced';

  return (
    <MotionContext.Provider
      value={{
        motionMode,
        isReduced,
        setMotionMode,
        toggleMotionMode,
      }}
    >
      <LazyMotion features={domMax}>
        <MotionConfig
          reducedMotion={isReduced ? 'always' : 'user'}
          transition={{
            duration: DURATION.base,
            ease: EASE_ACCENT,
          }}
        >
          {children}
        </MotionConfig>
      </LazyMotion>
    </MotionContext.Provider>
  );
}
