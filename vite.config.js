import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const foldername = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(foldername, 'index.html'),
        tallysystem: resolve(foldername, 'tallysystem.html'),
        overview: resolve(foldername, "overview.html"),
      }
    }
  }
});