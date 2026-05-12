import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'public_html',
    emptyOutDir: true,
    target: 'es2017',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          theology: ['./src/data/theologyPublicDomain'],
          gutenberg: ['./src/data/gutenbergMegaCatalog'],
        },
      },
    },
  },
  server: { port: 3000 },
});
