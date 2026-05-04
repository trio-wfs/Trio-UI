import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['components/index.ts', 'fixtures/index.ts'],
  format: ['esm', 'cjs'],
  dts: { compilerOptions: { strict: false } },
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  external: [
    'react',
    'react-dom',
    '@mui/material',
    '@mui/icons-material',
    '@emotion/react',
    '@emotion/styled',
    'ag-charts-react',
    'ag-charts-community',
  ],
});
