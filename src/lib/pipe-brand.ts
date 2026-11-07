
// import { NAMESPACE_BRAND } from './pipe-namespace-brands';
// import { heroForNamespace } from './pipe-heroes';
// import { extractSearchTermsForPipe } from '@/lib/images/pipe-semantic-search';
export type PipeBrandId =
  | 'gallery'
  | 'vault'
  | 'chapel'
  | 'atelier'
  | 'fairway'
  | 'brew'
  | 'ledger'
  | 'forge'
  | 'atlas'
  | 'signal'
  | 'imagen'
  | 'orbit';
export type PipeMood = 'warm' | 'cool' | 'earth' | 'ink' | 'neon' | 'paper';
export type PipeMotif = 'none' | 'grid' | 'arc' | 'ripple' | 'stack' | 'orbit';
export type PipeBrand = {
  id: PipeBrandId;
  label: string;
  mode: 'light' | 'dark';
  mood: PipeMood;
  motif: PipeMotif;
  tagline: string;
  colors: {
    wash: string;
    ink: string;
    muted: string;
    card: string;
    cardElevated: string;
    border: string;
    accent: string;
    accentFg: string;
    glow: string;
  };
  heroImage?: string;
  tileImage?: string;
};
export const PIPE_BRANDS: Record<PipeBrandId, PipeBrand> = {
  gallery: {
    id: 'gallery',
    label: 'Gallery',
    mode: 'light',
    mood: 'paper',
    motif: 'grid',
    tagline: 'Open graph · shared bones',
    colors: {
      wash: '#E8E2D5',
      ink: '#111827',
      muted: '#4B5563',
      card: '#F3EFE9',
      cardElevated: '#FFFcf7',
      border: '#111827',
      accent: '#D44983',
      accentFg: '#FFFFFF',
      glow: 'rgba(212,73,131,0.25)',
    },
    heroImage: '/editorial/hero-curator-desk.jpg',
    tileImage: '/editorial/hero-curator-desk.jpg',
  },
  vault: {
    id: 'vault',
    label: 'Vault',
    mode: 'dark',
    mood: 'ink',
    motif: 'stack',
    tagline: 'Settlement · incentives · hard money',
    colors: {
      wash: '#0B0F14',
      ink: '#FFFFFF',
      muted: '#94A3B8',
      card: '#111822',
      cardElevated: '#1E293B',
      border: '#223044',
      accent: '#F59E0B',
      accentFg: '#0B0F14',
      glow: 'rgba(245,158,11,0.25)',
    },
    heroImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1400&q=80',
    tileImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=940&q=80',
  },
  chapel: {
    id: 'chapel',
    label: 'Chapel',
    mode: 'light',
    mood: 'warm',
    motif: 'arc',
    tagline: 'Text · tradition · careful light',
    colors: {
      wash: '#EDE6D9',
      ink: '#2C241B',
      muted: '#6B5E4F',
      card: '#F7F1E6',
      cardElevated: '#FFFBF3',
      border: '#2C241B',
      accent: '#8B6F4E',
      accentFg: '#F7F1E6',
      glow: 'rgba(139,111,78,0.22)',
    },
    heroImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80',
    tileImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=940&q=80',
  },
  atelier: {
    id: 'atelier',
    label: 'Atelier',
    mode: 'light',
    mood: 'paper',
    motif: 'grid',
    tagline: 'Builders · pink ink on draft paper',
    colors: {
      wash: '#E4DCD0',
      ink: '#111827',
      muted: '#5B5563',
      card: '#F6F0E8',
      cardElevated: '#FFFcf8',
      border: '#111827',
      accent: '#D44983',
      accentFg: '#FFFFFF',
      glow: 'rgba(212,73,131,0.22)',
    },
    heroImage: '/editorial/cubby-toymaker-bench.jpg',
    tileImage: '/editorial/cubby-toymaker-bench.jpg',
  },
  fairway: {
    id: 'fairway',
    label: 'Fairway',
    mode: 'light',
    mood: 'earth',
    motif: 'orbit',
    tagline: 'Help community enterprises endure · Clubhouse 1099',
    colors: {
      wash: '#f6f5f3',
      ink: '#262626',
      muted: '#5a635c',
      card: '#fffcf8',
      cardElevated: '#ffffff',
      border: '#dddad5',
      accent: '#004f3b',
      accentFg: '#f6f5f3',
      glow: 'rgba(0,79,59,0.22)',
    },
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80',
    tileImage: 'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=940&q=80',
  },
  brew: {
    id: 'brew',
    label: 'Brew',
    mode: 'light',
    mood: 'warm',
    motif: 'ripple',
    tagline: 'Heat · grind · pour',
    colors: {
      wash: '#E8DFD4',
      ink: '#1F1510',
      muted: '#6B5648',
      card: '#F5EEE6',
      cardElevated: '#FFF9F3',
      border: '#1F1510',
      accent: '#6B3F2A',
      accentFg: '#F5EEE6',
      glow: 'rgba(107,63,42,0.22)',
    },
    heroImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=80',
    tileImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=940&q=80',
  },
  ledger: {
    id: 'ledger',
    label: 'Ledger',
    mode: 'dark',
    mood: 'cool',
    motif: 'stack',
    tagline: 'Who holds the pen',
    colors: {
      wash: '#121826',
      ink: '#E8EEF6',
      muted: '#94A3B8',
      card: '#1B2436',
      cardElevated: '#243047',
      border: '#334155',
      accent: '#5B8DEF',
      accentFg: '#121826',
      glow: 'rgba(91,141,239,0.28)',
    },
    heroImage: '/editorial/beat-sound-ledger.jpg',
    tileImage: '/editorial/beat-sound-ledger.jpg',
  },
  forge: {
    id: 'forge',
    label: 'Forge',
    mode: 'dark',
    mood: 'cool',
    motif: 'grid',
    tagline: 'Stress-test before it cools',
    colors: {
      wash: '#111318',
      ink: '#E6E8EF',
      muted: '#9AA3B5',
      card: '#1A1E28',
      cardElevated: '#252A38',
      border: '#3A4154',
      accent: '#6C8CFF',
      accentFg: '#111318',
      glow: 'rgba(108,140,255,0.3)',
    },
    heroImage: '/editorial/wooden-rube-goldberg.jpg',
    tileImage: '/editorial/wooden-rube-goldberg.jpg',
  },
  atlas: {
    id: 'atlas',
    label: 'Atlas',
    mode: 'light',
    mood: 'earth',
    motif: 'orbit',
    tagline: 'Lots · liens · maps under maps',
    colors: {
      wash: '#E8DFD2',
      ink: '#1C1410',
      muted: '#6B5648',
      card: '#F6F0E7',
      cardElevated: '#FFFBF5',
      border: '#1C1410',
      accent: '#B45309',
      accentFg: '#FFFFFF',
      glow: 'rgba(180,83,9,0.22)',
    },
    heroImage: '/pipe-heroes/topo.webp',
    tileImage: '/pipe-heroes/topo.webp',
  },
  signal: {
    id: 'signal',
    label: 'Signal',
    mode: 'light',
    mood: 'cool',
    motif: 'ripple',
    tagline: 'Verify the channel',
    colors: {
      wash: '#D9E8E5',
      ink: '#102A28',
      muted: '#3F5F5A',
      card: '#ECF5F3',
      cardElevated: '#F7FCFA',
      border: '#102A28',
      accent: '#0F766E',
      accentFg: '#ECF5F3',
      glow: 'rgba(15,118,110,0.22)',
    },
    heroImage: '/editorial/kinetic-marble-conduit.jpg',
    tileImage: '/editorial/kinetic-marble-conduit.jpg',
  },
  imagen: {
    id: 'imagen',
    label: 'Image Lab',
    mode: 'light',
    mood: 'neon',
    motif: 'orbit',
    tagline: 'Prompt in · variant out',
    colors: {
      wash: '#E6DFD4',
      ink: '#111827',
      muted: '#4B5563',
      card: '#F4EEE6',
      cardElevated: '#FFFcf8',
      border: '#111827',
      accent: '#D44983',
      accentFg: '#FFFFFF',
      glow: 'rgba(212,73,131,0.28)',
    },
    heroImage: '/editorial/greater-reasoning-oracle.jpg',
    tileImage: '/editorial/greater-reasoning-oracle.jpg',
  },
  orbit: {
    id: 'orbit',
    label: 'Orbit',
    mode: 'dark',
    mood: 'ink',
    motif: 'orbit',
    tagline: 'Launch windows · dark sky · long arcs',
    colors: {
      wash: '#070B14',
      ink: '#E6ECF5',
      muted: '#8B9BB4',
      card: '#101826',
      cardElevated: '#182235',
      border: '#2A3A55',
      accent: '#7DD3FC',
      accentFg: '#070B14',
      glow: 'rgba(125,211,252,0.28)',
    },
    heroImage: '/editorial/village-of-conduits.jpg',
    tileImage: '/editorial/village-of-conduits.jpg',
  }
};
export function brandIdForNamespace(namespace: string, override?: PipeBrandId | null): PipeBrandId {
  if (override && PIPE_BRANDS[override]) return override;
  return 'gallery';
}
export function brandForNamespace(namespace: string, override?: PipeBrandId | null): PipeBrand {
  const clean = namespace.toLowerCase().trim();
  if (
    clean === 'my-first-bitcoin' ||
    clean === 'myfirstbitcoin' ||
    clean === 'miprimerbitcoin' ||
    clean === 'mi-primer-bitcoin' ||
    clean === 'mpb' ||
    clean === 'mfb'
  ) {
    return {
      id: 'gallery',
      label: 'My First Bitcoin Classroom',
      mode: 'light',
      mood: 'paper',
      motif: 'grid',
      tagline:
        'Global Impartial Bitcoin Education · 89+ Communities in 48 Countries · 10-Chapter Bitcoin Diploma (EN & ES)',
      colors: {
        wash: '#FAF8F5',
        ink: '#111827',
        muted: '#4B5563',
        card: '#FFFFFF',
        cardElevated: '#FEFDFB',
        border: '#E5E0D8',
        accent: '#D97706',
        accentFg: '#FFFFFF',
        glow: 'rgba(217, 119, 6, 0.20)',
      },
      heroImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80',
      tileImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=940&q=80',
    };
  }

  const base = PIPE_BRANDS[brandIdForNamespace(namespace, override)];
  return {
    ...base,
    tagline:
      namespace.toLowerCase() === 'pipes'
        ? 'The kinetic protocol for human knowledge · Merkle-DAG custody & microtoll settlement'
        : base.tagline,
    heroImage: base.heroImage,
    tileImage: base.tileImage,
  };
}
export function brandCssVars(brand: PipeBrand): Record<string, string> {
  const c = brand.colors;
  return {
    '--pipe-wash': c.wash,
    '--pipe-ink': c.ink,
    '--pipe-muted': c.muted,
    '--pipe-card': c.card,
    '--pipe-card-elevated': c.cardElevated,
    '--pipe-border': c.border,
    '--pipe-accent': c.accent,
    '--pipe-accent-fg': c.accentFg,
    '--pipe-glow': c.glow,
    '--pipe-mood': brand.mood,
    '--room-ink': c.ink,
    '--room-card': c.card,
    '--room-border': c.border,
    '--room-accent': c.accent,
    '--background': c.wash,
    '--foreground': c.ink,
    '--card': c.card,
    '--card-foreground': c.ink,
    '--popover': c.cardElevated || c.card,
    '--popover-foreground': c.ink,
    '--primary': c.accent,
    '--primary-foreground': c.accentFg,
    '--muted': c.cardElevated || c.card,
    '--muted-foreground': c.muted,
    '--input': c.cardElevated || c.card,
    '--border': c.border,
  };
}
