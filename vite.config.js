import UnheadVite from '@unhead/addons/vite'
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.js',
      publicDirectory: 'public',
      refresh: true,
    }),
    react({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    UnheadVite(), // @see {@link https://unhead.unjs.io/setup/unhead/introduction}
  ],
  server: {
    hmr: {
      host: 'localhost',
    },
  },
  build: {
    minify: true,
  },
})
