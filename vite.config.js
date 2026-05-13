import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,

    minify: 'terser',

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom')
            ) {
              return 'react-vendor'
            }

            if (id.includes('framer-motion')) {
              return 'animation-vendor'
            }

            if (
              id.includes('lucide-react') ||
              id.includes('recharts')
            ) {
              return 'ui-vendor'
            }

            return 'vendor'
          }
        },
      },
    },

    chunkSizeWarningLimit: 1000,
  },

  server: {
    port: 5173,
    strictPort: false,
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react',
    ],
  },
})