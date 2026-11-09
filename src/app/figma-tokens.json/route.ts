import { NextRequest, NextResponse } from 'next/server';
import {
  BRAND_PROFILES,
  generateFigmaVariablesJson,
  generateFigmaCodeConnectManifest,
  type BrandProfileId,
} from '@/styles/themes';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawBrand = (searchParams.get('brand') || 'editorial-sandstone').trim() as BrandProfileId;
  const format = (searchParams.get('format') || 'variables').trim();
  const profile =
    rawBrand in BRAND_PROFILES
      ? BRAND_PROFILES[rawBrand]
      : BRAND_PROFILES['editorial-sandstone'];

  if (format === 'code-connect') {
    const manifest = generateFigmaCodeConnectManifest(profile);
    return new NextResponse(manifest, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  const payload = generateFigmaVariablesJson(profile);

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
