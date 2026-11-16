import { NextRequest, NextResponse } from 'next/server';
import {
  BRAND_PROFILES,
  generateStylesMarkdown,
  type BrandProfileId,
} from '@/styles/themes';
import {
  WEBSITE_THEME_MAP,
  generateThemeStylesMarkdown,
  type WebsiteThemeId,
} from '@/styles/website-themes';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawTheme = searchParams.get('theme')?.trim();

  if (rawTheme && rawTheme in WEBSITE_THEME_MAP) {
    const theme = WEBSITE_THEME_MAP[rawTheme as WebsiteThemeId];
    const markdown = generateThemeStylesMarkdown(theme);
    return new NextResponse(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

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
