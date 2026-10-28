import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set VITE_SITE_URL in .env (or your host's env settings) before deploying.
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 700,
  },
});
