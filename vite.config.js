import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { TOOLS } from './src/data/tools.js'
import { POSTS } from './src/data/posts.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // vite-ssg: expand the dynamic :slug routes into concrete pages to prerender.
  ssgOptions: {
    formatting: 'minify',
    includedRoutes(paths) {
      const dynamic = [
        ...TOOLS.map((t) => `/tools/${t.slug}`),
        ...POSTS.map((p) => `/blog/${p.slug}`),
      ]
      const statics = paths.filter((p) => !p.includes(':'))
      return [...new Set([...statics, ...dynamic])]
    },
  },
})
