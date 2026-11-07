'use client';

import React from 'react';

/**
 * Curated, public sample photography & editorial illustrations for Accént (`´`).
 *
 * Policy:
 * - Zero personal/user photography from Pipes rooms.
 * - All external photos are verified 200 OK public Unsplash photographs with explicit dimensions and descriptive alt text.
 * - Editorial SVG scenes depict real, recognizable subjects (coastal lighthouse on a headland, artisan bakery sourdough,
 *   grandmother's kitchen table, museum room studies, and studio case-study plates) rather than abstract CSS gradients.
 */

export const SAMPLE_PHOTOS = {
  library: {
    src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80',
    alt: 'Warm timber library shelves filled with bound books in soft afternoon light',
    width: 1200,
    height: 750,
  },
  bakery: {
    src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
    alt: 'Freshly baked crusty sourdough loaves cooling on a wooden bakery rack',
    width: 1000,
    height: 667,
  },
  kitchen: {
    src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80',
    alt: 'Hands kneading dough on a floured wooden kitchen table beside ceramic bowls',
    width: 1000,
    height: 667,
  },
  coast: {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    alt: 'Morning light over a calm coastal cove and sandy shoreline',
    width: 1000,
    height: 667,
  },
  studio: {
    src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    alt: 'Sunlit architectural studio room with a wooden chair and framed art on warm walls',
    width: 1000,
    height: 667,
  },
  portrait: {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    alt: 'Sample curator portrait in warm studio lighting',
    width: 400,
    height: 400,
  },
} as const;

/**
 * Detailed coastal lighthouse on a green headland at dawn.
 * Used for aspect-ratio ladders, focal-point cropping (lighthouse positioned at x=78%, y=40%),
 * alt-text comparisons, and worst-pixel contrast studies.
 */
export function CoastalLighthouseScene({
  className = 'h-full w-full',
  preserveAspectRatio = 'xMidYMid slice',
  showReticle = false,
  reticleAt = 'subject',
  ariaLabel = 'Illustration: a white and pink-banded lighthouse on a green coastal headland at dawn',
}: {
  className?: string;
  preserveAspectRatio?: string;
  showReticle?: boolean;
  reticleAt?: 'subject' | 'center';
  ariaLabel?: string;
}) {
  const rx = reticleAt === 'subject' ? 312 : 200;
  const ry = reticleAt === 'subject' ? 100 : 125;
  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id="lh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D6E6F2" />
          <stop offset="52%" stopColor="#F7E3B5" />
          <stop offset="100%" stopColor="#E9A98B" />
        </linearGradient>
        <linearGradient id="lh-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2C4C66" />
          <stop offset="100%" stopColor="#1B3247" />
        </linearGradient>
      </defs>
      {/* Dawn sky */}
      <rect width="400" height="168" fill="url(#lh-sky)" />
      {/* Low sun */}
      <circle cx="116" cy="112" r="28" fill="#FAF8F5" fillOpacity="0.85" />
      {/* Light beam from lantern room */}
      <polygon points="312,62 110,20 110,104" fill="#FAF8F5" fillOpacity="0.28" />
      {/* Distant hills */}
      <path d="M0 168 Q90 138 190 168 Z" fill="#8A7968" fillOpacity="0.55" />
      {/* Sea */}
      <rect y="165" width="400" height="85" fill="url(#lh-sea)" />
      {/* Sea wave lines */}
      <path d="M18 184 H92 M130 198 H210 M44 216 H140" stroke="#E8E2D5" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />
      {/* Green coastal headland on right */}
      <path d="M185 250 C205 190 248 156 400 152 L400 250 Z" fill="#3F6B4F" />
      <path d="M215 250 C235 205 275 174 400 170 L400 250 Z" fill="#2D523A" />
      {/* Keeper's cottage */}
      <rect x="256" y="132" width="34" height="24" rx="1" fill="#F3EFE9" stroke="#111827" strokeWidth="1.5" />
      <polygon points="253,132 273,118 293,132" fill="#A3285C" stroke="#111827" strokeWidth="1.5" />
      <rect x="268" y="141" width="8" height="15" fill="#111827" />
      {/* Lighthouse tower at x ≈ 312 (78%), y ≈ 100 (40%) */}
      <polygon points="298,156 303,68 321,68 326,156" fill="#FAF8F5" stroke="#111827" strokeWidth="1.5" />
      {/* Red/pink daymark stripe */}
      <polygon points="301,108 302,88 322,88 323,108" fill="#D44983" />
      {/* Gallery deck & lantern room */}
      <rect x="299" y="64" width="26" height="5" fill="#111827" />
      <rect x="304" y="52" width="16" height="12" fill="#F7E3B5" stroke="#111827" strokeWidth="1.5" />
      <polygon points="301,52 312,41 323,52" fill="#111827" />
      <circle cx="312" cy="58" r="3" fill="#FFFFFF" />
      {/* Optional focal reticle */}
      {showReticle && (
        <g aria-hidden>
          <circle cx={rx} cy={ry} r="18" fill="none" stroke="#D44983" strokeWidth="2" />
          <circle cx={rx} cy={ry} r="3.5" fill="#D44983" />
          <line x1={rx - 26} y1={ry} x2={rx + 26} y2={ry} stroke="#D44983" strokeWidth="1.5" />
          <line x1={rx} y1={ry - 26} x2={rx} y2={ry + 26} stroke="#D44983" strokeWidth="1.5" />
        </g>
      )}
    </svg>
  );
}

/**
 * Six distinct, recognizable editorial & portfolio plates to replace the old `ART[0..5]` CSS gradients.
 * 0: Studio A — Architectural arch & geometric monolith
 * 1: Sourdough / Bakery — Scored artisan boule on a wooden peel with wheat ear
 * 2: Quarry Print — Swiss typographic grid poster specimen
 * 3: Moth Identity — Botanical moth & lunar phase emblem
 * 4: Field Notes / Corner Bakery — Open stitch-bound notebook & espresso cup
 * 5: Lantern / Service — Warm brass table lamp casting a reading cone
 */
export function EditorialPlate({
  i = 0,
  className = '',
  style,
  label,
}: {
  i?: number;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}) {
  const idx = ((i % 6) + 6) % 6;
  return (
    <div
      className={`overflow-hidden bg-[#E8E2D5] ${className}`}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {idx === 0 && (
        <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect width="240" height="200" fill="#E8E2D5" />
          <rect x="24" y="20" width="192" height="160" fill="#F3EFE9" stroke="#111827" strokeWidth="1.5" />
          <path d="M68 180 V92 A52 52 0 0 1 172 92 V180 Z" fill="#111827" />
          <circle cx="144" cy="76" r="18" fill="#D44983" />
          <path d="M44 180 L96 128 L148 180 Z" fill="#A3285C" fillOpacity="0.85" />
          <line x1="24" y1="156" x2="216" y2="156" stroke="#111827" strokeWidth="1" strokeOpacity="0.25" />
        </svg>
      )}
      {idx === 1 && (
        <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect width="240" height="200" fill="#F3EFE9" />
          {/* Linen cloth stripe */}
          <rect y="142" width="240" height="58" fill="#E8E2D5" />
          <line x1="0" y1="154" x2="240" y2="154" stroke="#A3285C" strokeWidth="2" strokeOpacity="0.45" />
          <line x1="0" y1="162" x2="240" y2="162" stroke="#A3285C" strokeWidth="1" strokeOpacity="0.45" />
          {/* Wooden board */}
          <rect x="34" y="134" width="172" height="12" rx="4" fill="#8B5A2B" stroke="#111827" strokeWidth="1.5" />
          {/* Sourdough boule */}
          <path d="M52 134 C52 74 188 74 188 134 Z" fill="#C67D3B" stroke="#111827" strokeWidth="2" />
          <path d="M66 128 C72 86 168 86 174 128" fill="none" stroke="#E8C39E" strokeWidth="2.5" strokeDasharray="8 5" />
          {/* Ear / scoring */}
          <path d="M86 98 Q120 82 154 98" fill="none" stroke="#FAF8F5" strokeWidth="3" strokeLinecap="round" />
          <path d="M96 112 Q120 100 144 112" fill="none" stroke="#FAF8F5" strokeWidth="2" strokeLinecap="round" />
          {/* Steam wisps */}
          <path d="M92 64 Q86 50 94 38 M120 58 Q114 44 122 32 M148 64 Q142 50 150 38" fill="none" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        </svg>
      )}
      {idx === 2 && (
        <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect width="240" height="200" fill="#FAF8F5" />
          {/* Swiss grid lines */}
          <g stroke="#D44983" strokeWidth="0.75" strokeOpacity="0.4">
            <line x1="32" y1="0" x2="32" y2="200" />
            <line x1="88" y1="0" x2="88" y2="200" />
            <line x1="152" y1="0" x2="152" y2="200" />
            <line x1="208" y1="0" x2="208" y2="200" />
            <line x1="0" y1="48" x2="240" y2="48" />
            <line x1="0" y1="144" x2="240" y2="144" />
          </g>
          <rect x="32" y="24" width="56" height="56" fill="#111827" />
          <rect x="96" y="48" width="112" height="96" fill="#E8E2D5" stroke="#111827" strokeWidth="1.5" />
          <circle cx="152" cy="96" r="28" fill="#A3285C" />
          <rect x="32" y="156" width="120" height="8" fill="#111827" />
          <rect x="32" y="170" width="76" height="6" fill="#4B5563" />
        </svg>
      )}
      {idx === 3 && (
        <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect width="240" height="200" fill="#111827" />
          {/* Lunar crescent & stars */}
          <circle cx="182" cy="44" r="16" fill="#F3EFE9" />
          <circle cx="188" cy="40" r="14" fill="#111827" />
          {/* Geometric moth wings */}
          <path d="M120 74 C88 42 42 58 48 104 C52 132 92 136 120 114 Z" fill="#E8E2D5" stroke="#FAF8F5" strokeWidth="1.5" />
          <path d="M120 74 C152 42 198 58 192 104 C188 132 148 136 120 114 Z" fill="#E8E2D5" stroke="#FAF8F5" strokeWidth="1.5" />
          <path d="M120 114 C96 128 70 156 86 172 C100 182 114 156 120 138 Z" fill="#D44983" />
          <path d="M120 114 C144 128 170 156 154 172 C140 182 126 156 120 138 Z" fill="#D44983" />
          <circle cx="82" cy="94" r="10" fill="#111827" />
          <circle cx="158" cy="94" r="10" fill="#111827" />
          <circle cx="82" cy="94" r="4" fill="#F4A3C3" />
          <circle cx="158" cy="94" r="4" fill="#F4A3C3" />
          <rect x="117" y="64" width="6" height="78" rx="3" fill="#FAF8F5" />
        </svg>
      )}
      {idx === 4 && (
        <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect width="240" height="200" fill="#E8E2D5" />
          {/* Open notebook */}
          <rect x="26" y="34" width="124" height="132" rx="4" fill="#FAF8F5" stroke="#111827" strokeWidth="1.5" />
          <line x1="88" y1="34" x2="88" y2="166" stroke="#111827" strokeWidth="1.5" />
          <g stroke="#4B5563" strokeWidth="2" strokeLinecap="round">
            <line x1="38" y1="56" x2="76" y2="56" />
            <line x1="38" y1="70" x2="72" y2="70" />
            <line x1="38" y1="84" x2="76" y2="84" />
            <line x1="100" y1="56" x2="136" y2="56" stroke="#A3285C" />
            <line x1="100" y1="70" x2="138" y2="70" />
            <line x1="100" y1="84" x2="128" y2="84" />
          </g>
          {/* Bookmark ribbon */}
          <polygon points="116,166 116,184 122,178 128,184 128,166" fill="#D44983" />
          {/* Espresso cup on saucer */}
          <circle cx="190" cy="126" r="28" fill="#F3EFE9" stroke="#111827" strokeWidth="1.5" />
          <circle cx="190" cy="126" r="18" fill="#4A2C18" stroke="#111827" strokeWidth="1.5" />
          <path d="M208 122 H216 A4 4 0 0 1 216 130 H208" fill="none" stroke="#111827" strokeWidth="2" />
        </svg>
      )}
      {idx === 5 && (
        <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect width="240" height="200" fill="#1E293B" />
          {/* Warm cone of light */}
          <polygon points="120,68 36,184 204,184" fill="#F7E3B5" fillOpacity="0.22" />
          {/* Table surface */}
          <rect y="168" width="240" height="32" fill="#E8E2D5" />
          {/* Lamp base & stem */}
          <rect x="96" y="160" width="48" height="8" rx="2" fill="#111827" />
          <line x1="120" y1="74" x2="120" y2="160" stroke="#111827" strokeWidth="4" />
          {/* Dome shade */}
          <path d="M72 80 C72 42 168 42 168 80 Z" fill="#D44983" stroke="#111827" strokeWidth="2" />
          <ellipse cx="120" cy="80" rx="48" ry="6" fill="#F7E3B5" stroke="#111827" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
}
