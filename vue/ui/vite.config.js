import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(( {command} ) => ({
  base: command === 'build' ? '/ui/dist' : undefined,
  define: {
    global: 'window'
  },
  build: {
    sourcemap: false
  },
  optimizeDeps: {
      esbuildOptions: {
          mainFields: ['module', 'main'],
          resolveExtensions: ['.js', '.jsx']
      }
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
}) );
