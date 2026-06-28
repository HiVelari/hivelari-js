import { defineConfig } from 'tsdown';

const neverBundle = [
  'next',
  'next/headers',
  'next/server',
  '@hivelari/sdk',
  'server-only',
];

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    format: ['cjs', 'esm'] as ['cjs', 'esm'],
    dts: true,
    clean: true,
    deps: { neverBundle },
  },
  {
    entry: { middleware: './src/middleware.ts' },
    format: ['cjs', 'esm'] as ['cjs', 'esm'],
    dts: true,
    clean: false,
    deps: { neverBundle },
  },
]);
