import { defineConfig } from 'tsup';

const sharedExternal = [
  'react',
  'react-dom',
  'next',
  'framer-motion',
  'lucide-react',
  'diff',
  '@orama/orama',
  'three',
];

export default defineConfig([
  // Server-safe pure TypeScript entrypoints (zero 'use client' banner)
  {
    entry: {
      tokens: 'src/styles/design-tokens.ts',
      themes: 'src/styles/themes.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    tsconfig: 'tsconfig.build.json',
    clean: false,
    external: sharedExternal,
    sourcemap: true,
    minify: false,
  },
  // Client React component & motion entrypoints (safe inside Next App Router RSC trees)
  {
    entry: {
      index: 'src/index.ts',
      ui: 'src/components/ui/index.tsx',
      motion: 'src/components/motion/MotionProvider.tsx',
      art: 'src/components/art/index.tsx',
    },
    format: ['cjs', 'esm'],
    dts: true,
    tsconfig: 'tsconfig.build.json',
    clean: false,
    external: sharedExternal,
    banner: {
      js: "'use client';",
    },
    onSuccess: 'cp src/styles/accent.css dist/styles.css',
    sourcemap: true,
    minify: false,
  },
]);
