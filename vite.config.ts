import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/shared/styles/_variables.scss" as v;
        @use "@/shared/styles/_mixins.scss" as m;`
      }
    }
  },
  resolve: {
    alias: {
      // Configuration de l'alias pour correspondre à import
      '@': path.resolve(__dirname, './src'),
    },
        dedupe: ['react', 'react-dom']

  },
})