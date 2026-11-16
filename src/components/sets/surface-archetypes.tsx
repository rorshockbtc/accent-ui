'use client';

import React, { useState } from 'react';
import { Stage, Seg } from '../primitives';
import { AccentTabs, AccentHairlineList, AccentHairlineItem, AccentTextarea } from '@/components/ui';
import { AccentWeatherBand, type WeatherCheckItem } from '@/components/art';

export function SurfaceThresholdVsSanctuary() {
  const [surface, setSurface] = useState<'threshold' | 'sanctuary' | 'gallery'>('threshold');

  const specs = {
    threshold: {
      rule: 'Choreographed storytelling & wet-in-wet shader skies',
      motion: 'Scroll-linked horizon progress, rising sun, gliding bird motifs, pointer bloom',
      examples: 'asterisk.pipes.pink/ · pipes.pink/asterisk · colonhyphenbracket.pink/',
    },
    sanctuary: {
      rule: 'Zero scroll-jacking or ambient motion while writing',
      motion: 'Action-only responses (tab focus, input typing, validation weather, publish flight)',
      examples: 'asterisk.pipes.pink/studio · pipes.pink/write',
    },
    gallery: {
      rule: 'Generous air around painted/photographed plates',
      motion: 'Soft multiply-glaze ambient framing + native <details> comparison tables',
      examples: 'asterisk.pipes.pink/studio/rooms · pipes.pink/sign-up?ref=asterisk',
    },
  }[surface];

  return (
    <Stage label="Surface archetypes" caption="Compare motion budgets across Threshold, Sanctuary, and Gallery surfaces.">
      <div className="space-y-5">
        <Seg
          label="Surface archetype"
          options={[
            { id: 'threshold', label: 'Threshold (/)' },
            { id: 'sanctuary', label: 'Sanctuary (/studio)' },
            { id: 'gallery', label: 'Gallery (/rooms)' },
          ]}
          value={surface}
          onChange={setSurface}
        />
        <AccentHairlineList>
          <AccentHairlineItem index={1}>
            <div className="text-[15px] font-semibold text-[var(--a-ink)]">{specs.rule}</div>
            <p className="mt-1 text-[14px] text-[var(--a-muted)]">{specs.motion}</p>
          </AccentHairlineItem>
          <AccentHairlineItem index={2}>
            <div className="font-mono text-[13px] text-[var(--a-muted)]">Production routes</div>
            <div className="mt-1 font-mono text-[14px] text-[var(--a-ink)]">{specs.examples}</div>
          </AccentHairlineItem>
        </AccentHairlineList>
      </div>
    </Stage>
  );
}

export function SurfaceWeatherBandDemo() {
  const [hasLink, setHasLink] = useState(true);
  const [text, setText] = useState('Read our field note at https://pipes.pink/explore/asterisk');

  const checks: WeatherCheckItem[] = [
    {
      id: 'len',
      label: 'Length within Threads 500-character limit',
      status: text.length <= 500 ? 'pass' : 'warn',
    },
    {
      id: 'link',
      label: hasLink ? 'Main post contains an inline URL (moves to reply)' : 'Main post free of inline URL throttle risk',
      status: hasLink ? 'warn' : 'pass',
      detail: 'Threads throttles main posts containing external links.',
      actionLabel: hasLink ? 'Move link to first reply' : undefined,
      onAction: () => {
        setText((t) => t.replace(/\s*https?:\/\/\S+/g, '').trim());
        setHasLink(false);
      },
    },
    {
      id: 'floor',
      label: 'Target sizes >= 44px and >= 13px font floor',
      status: 'pass',
    },
  ];

  return (
    <Stage label="Atmospheric progressive disclosure" caption="AccentWeatherBand surfaces actionable warnings inline while folding passing checks behind N clear ✓.">
      <div className="space-y-4">
        <AccentWeatherBand checks={checks} />
        <AccentTextarea
          aria-label="Draft composer demo"
          value={text}
          onChange={(e) => {
            const val = e.target.value;
            setText(val);
            setHasLink(/https?:\/\//.test(val));
          }}
        />
      </div>
    </Stage>
  );
}

export function SurfaceGlazeSpecsDemo() {
  return (
    <Stage label="Multiply glazing & fallback stack" caption="Paper-leveled illustrations blend cleanly over canvas paper without cutting rectangles.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border-t border-[var(--a-rule)] pt-4 space-y-1.5">
          <div className="font-mono text-[13px] font-semibold text-[var(--a-accent-text,#B81468)]">1. Glaze compositing</div>
          <p className="text-[14px] text-[var(--a-ink)]">
            <code>.wc-glaze</code> applies <code>mix-blend-mode: multiply</code> over canvas paper so only pigment darkens the page while dark full-bleed paintings preserve highlight headroom.
          </p>
        </div>
        <div className="border-t border-[var(--a-rule)] pt-4 space-y-1.5">
          <div className="font-mono text-[13px] font-semibold text-[var(--a-accent-text,#B81468)]">2. Shader fallback</div>
          <p className="text-[14px] text-[var(--a-ink)]">
            <code>AccentShaderBackdrop</code> caps DPR at 1.5, pauses offscreen via IntersectionObserver, and renders a static plate when reduced motion or no WebGL is detected.
          </p>
        </div>
      </div>
    </Stage>
  );
}

export function SurfaceTabsA11yDemo() {
  const [channel, setChannel] = useState('threads');
  return (
    <Stage label="Single-row scrolling AccentTabs" caption="Supports 6+ items without 2-row mobile wrapping, ArrowLeft/Right roving focus, and forced-colors-safe borders.">
      <AccentTabs
        ariaLabel="Six social channels"
        layout="scroll"
        activeTab={channel}
        onSelect={setChannel}
        tabs={[
          { id: 'x', label: 'X' },
          { id: 'threads', label: 'Threads' },
          { id: 'facebook', label: 'Facebook' },
          { id: 'substack', label: 'Substack Notes' },
          { id: 'instagram', label: 'Instagram' },
          { id: 'tiktok', label: 'TikTok' },
        ]}
      />
      <p className="mt-4 text-[14px] text-[var(--a-muted)]">
        Active room: <strong className="text-[var(--a-ink)]">{channel}</strong> — arrow keys move across all 6 channels on a single horizontal strip.
      </p>
    </Stage>
  );
}

export const SURFACE_ARCHETYPE_DEMOS: Record<string, React.ComponentType> = {
  'surface-threshold-vs-sanctuary': SurfaceThresholdVsSanctuary,
  'surface-weather-band': SurfaceWeatherBandDemo,
  'surface-glaze-specs': SurfaceGlazeSpecsDemo,
  'surface-tabs-a11y': SurfaceTabsA11yDemo,
};
