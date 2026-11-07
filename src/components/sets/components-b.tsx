'use client';

import type React from 'react';
import { DEMOS as HERO } from './components-b-hero';
import { DEMOS as NAV } from './components-b-nav';
import { DEMOS as CHART } from './components-b-chart';
import { DEMOS as DIALOG } from './components-b-dialog';
import { DEMOS as TOAST } from './components-b-toast';
import { DEMOS as REST } from './components-b-rest';

export const DEMOS: Record<string, React.ComponentType> = {
  ...HERO,
  ...NAV,
  ...CHART,
  ...DIALOG,
  ...TOAST,
  ...REST,
};
