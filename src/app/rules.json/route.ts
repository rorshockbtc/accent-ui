import { NextResponse } from 'next/server';
import { getAllAccentRules } from '@/content/accent/registry';
import {
  DESIGN_TOKENS,
  ACCENT_PRIMARY,
  ACCENT_SKY,
  SEMANTIC_CONTRAST_PAIRS,
} from '@/styles/design-tokens';

export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json(
    {
      system: 'Accént (Pipes Design System)',
      version: DESIGN_TOKENS.version,
      docs: 'https://design.pipes.pink',
      note: 'Each rule is a single instruction for a generating model. violationPattern, when present, is a JavaScript regex source; a match in generated code indicates a violation.',
      tokens: {
        primaryPink: ACCENT_PRIMARY,
        sovereignSkyBlue: ACCENT_SKY,
        verifiedContrastPairs: SEMANTIC_CONTRAST_PAIRS,
      },
      rules: getAllAccentRules(),
    },
    { headers: { 'Cache-Control': 'public, max-age=3600' } }
  );
}
