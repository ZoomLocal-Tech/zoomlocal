import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { TOOLS } from './src/data/tools.js'
// Both sources of articles. This import is what makes an article published from
// the Fly CMS a real prerendered page: its slug appears in includedRoutes below
// and vite-ssg writes dist/blog/<slug>/index.html for it, exactly as it does
// for a post typed into posts.js.
//
// It matters because Firebase Hosting serves this site as plain files with no
// rewrite rule. A route that is not prerendered here is not a file in dist, and
// a visitor asking for it gets a real 404 from the host before the app ever
// loads. Reading the articles in the browser instead would therefore not work
// at all, quite apart from shipping an empty page to crawlers.
import { POSTS } from './src/data/all-posts.js'

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
