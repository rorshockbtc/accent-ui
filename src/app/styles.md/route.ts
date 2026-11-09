import { NextRequest, NextResponse } from 'next/server';
import {
  BRAND_PROFILES,
  generateStylesMarkdown,
  type BrandProfileId,
} from '@/styles/themes';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawBrand = (searchParams.get('brand') || 'editorial-sandstone').trim() as BrandProfileId;
  const profile =
    rawBrand in BRAND_PROFILES
      ? BRAND_PROFILES[rawBrand]
      : BRAND_PROFILES['editorial-sandstone'];

  const markdown = generateStylesMarkdown(profile);

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
