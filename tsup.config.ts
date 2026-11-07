import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    tokens: 'src/styles/design-tokens.ts',
    motion: 'src/lib/motion/tokens.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  tsconfig: 'tsconfig.build.json',
  clean: true,
  external: ['react', 'react-dom', 'next', 'framer-motion', 'lucide-react'],
  sourcemap: true,
  minify: false,
});
