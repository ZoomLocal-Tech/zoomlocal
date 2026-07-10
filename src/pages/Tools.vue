<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { toolsByCategory, TOOLS } from '../data/tools.js'
import { useSeo, SITE_URL } from '../composables/useSeo.js'

const groups = toolsByCategory()

useSeo({
  title: 'Free Local SEO & Marketing Audit Tools | ZoomLocal',
  description:
    'Free white-label audit tools: Google Business Profile audit, website SEO audit, AI search visibility, review analysis, rank checker, AI content generators and more. Run any audit in seconds.',
  path: '/tools',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Marketing Audit Tools',
    itemListElement: TOOLS.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      url: `${SITE_URL}/tools/${t.slug}`,
    })),
  },
})
</script>

<template>
  <div class="pt-28 pb-24">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16 max-w-3xl mx-auto" v-reveal>
        <h1 class="text-4xl md:text-6xl font-black mb-4 text-white">Free Audit Tools</h1>
        <p class="text-gray-400 text-lg">Run a free audit on any business in seconds, Google, SEO, reviews, AI visibility, social and more. See exactly what to fix, then get a branded report.</p>
      </div>

      <div v-for="group in groups" :key="group.key" :id="group.key" class="mb-14 scroll-mt-24">
        <h2 class="text-2xl font-bold text-white mb-6">{{ group.label }}</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink v-for="t in group.tools" :key="t.slug" :to="`/tools/${t.slug}`"
            class="group block bg-gray-900/80 border border-gray-800 hover:border-green-500/50 rounded-2xl p-6 transition-all duration-300">
            <h3 class="text-lg font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{{ t.name }}</h3>
            <p class="text-green-400/80 text-xs mb-3">{{ t.tagline }}</p>
            <p class="text-gray-500 text-sm mb-4">{{ t.description }}</p>
            <span class="inline-flex items-center text-green-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
              Try it free <ArrowRight class="w-4 h-4 ml-1.5" />
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
