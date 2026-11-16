import type { Metadata } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import { AccentShell } from '@/components/AccentShell';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { getAccentNav } from '@/content/accent/registry';
import { ACCENT_FONT_CLASSES } from './fonts';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const fraunces = Fraunces({
  variable: '--font-serif',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Accént · The Pipes & CHB Design System',
    template: '%s · Accént',
  },
  description:
    'Accént is the Pipes design system: grids, typography, color, components and the reasons behind them, written for non-designers, engineers and local AI models.',
};

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} ${ACCENT_FONT_CLASSES} antialiased`}>
        <MotionProvider>
          <AccentShell nav={getAccentNav()}>{children}</AccentShell>
        </MotionProvider>
      </body>
    </html>
  );
}
