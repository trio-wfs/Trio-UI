import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  // Base path so chunk imports resolve correctly from any page depth.
  // CI sets SHOWCASE_BASE='/Trio-UI/showcase/dist/' for GitHub Pages where
  // the site lives under the repo name; local dev keeps the project-root
  // absolute path.
  base: process.env.SHOWCASE_BASE || '/showcase/dist/',
  build: {
    outDir: 'showcase/dist',
    emptyDirOnBuild: true,
    rollupOptions: {
      input: resolve(__dirname, 'showcase/mount.tsx'),
      output: {
        entryFileNames: 'showcase.js',
        // Keep chunk names readable
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        // ESM format for <script type="module">
        format: 'es',
      },
    },
  },
  // Resolve from project root
  resolve: {
    alias: {
      '@': resolve(__dirname),
    },
  },
});
