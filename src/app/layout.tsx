import type { Metadata } from 'next';
import { AccentShell } from '@/components/AccentShell';
import { getAccentNav } from '@/content/accent/registry';
import { ACCENT_FONT_CLASSES } from './fonts';

export const metadata: Metadata = {
  title: {
    default: 'Accént · The Pipes Design System',
    template: '%s · Accént',
  },
  description:
    'Accént is the Pipes design system: grids, typography, color, components and the reasons behind them, written for non-designers, engineers and local AI models.',
};

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={ACCENT_FONT_CLASSES}>
      <AccentShell nav={getAccentNav()}>{children}</AccentShell>
    </div>
  );
}
