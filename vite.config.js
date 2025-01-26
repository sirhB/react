import UnheadVite from '@unhead/addons/vite'
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.jsx'],
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
