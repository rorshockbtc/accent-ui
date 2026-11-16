'use client';

import React from 'react';
import { DispatchStudioSite, type StudioVariantProps } from './StudioVariants';

/**
 * StudioCraftedSite — the Colon Hyphen Bracket (:-]) build of the same business.
 * Dispatches across 5 audience-specific interactive app architectures (`TacoStudioSite`,
 * `BankStudioSite`, `SalonStudioSite`, `OfficeStudioSite`, `PortfolioStudioSite`), each
 * with its own hero composition, motion choreography, interactive domain tool, and layout rhythm.
 */
export function StudioCraftedSite(props: StudioVariantProps) {
  return <DispatchStudioSite {...props} />;
}
