<script setup>
import { useHead } from '@unhead/vue'

// Client-side-navigation fallback for unknown routes. Direct hits on unknown
// URLs are served by Firebase Hosting as public/404.html with a real 404
// status; this page only appears for in-app navigation to a bad path.
useHead({
  title: 'Page not found | ZoomLocal',
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <div class="pt-28 pb-24 min-h-screen">
    <div class="container mx-auto px-4 text-center max-w-2xl">
      <div class="text-7xl font-black mb-4 bg-gradient-to-br from-brand-600 to-sky-400 bg-clip-text text-transparent">404</div>
      <h1 class="text-3xl md:text-4xl font-black mb-4 text-white">This page could not be found</h1>
      <p class="text-gray-400 text-lg mb-10">The link may be outdated or the page may have moved. Head back to the homepage, or explore our free Local SEO tools.</p>
      <div class="flex items-center justify-center gap-3 flex-wrap">
        <RouterLink to="/" class="px-6 py-3 rounded-xl font-semibold bg-brand-600 text-white hover:opacity-85 transition-opacity">Go to homepage</RouterLink>
        <RouterLink to="/tools" class="px-6 py-3 rounded-xl font-semibold bg-white/10 text-gray-200 border border-white/15 hover:opacity-85 transition-opacity">Free tools</RouterLink>
        <RouterLink to="/blog" class="px-6 py-3 rounded-xl font-semibold bg-white/10 text-gray-200 border border-white/15 hover:opacity-85 transition-opacity">Blog</RouterLink>
      </div>
    </div>
  </div>
</template>
