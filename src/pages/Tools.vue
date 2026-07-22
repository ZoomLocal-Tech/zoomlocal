<script setup>
import { Sparkles } from 'lucide-vue-next'
import { toolsByCategory, TOOLS } from '../data/tools.js'
import { useSeo, SITE_URL, breadcrumbLd } from '../composables/useSeo.js'
import ToolCard from '../components/ToolCard.vue'

const groups = toolsByCategory()

useSeo({
  title: 'Free Local SEO & Marketing Audit Tools | ZoomLocal',
  description:
    'Free white-label audit tools: Google Business Profile audit, website SEO audit, AI search visibility, review analysis, rank checker, AI content generators and more. Run any audit in seconds.',
  path: '/tools',
  keywords: 'free local seo tools, google business profile audit free, marketing audit tools, white label seo tools, free seo checker',
  jsonLd: [
    {
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
    breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Free Tools', path: '/tools' },
    ]),
  ],
})
</script>

<template>
  <div class="relative overflow-hidden pt-28 pb-24">
    <!-- ambient background -->
    <div aria-hidden class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/70 via-transparent to-transparent" />
    <div aria-hidden class="pointer-events-none absolute -top-24 right-[-6rem] -z-10 h-80 w-80 rounded-full bg-brand-200/30 blur-3xl animate-blob" />
    <div aria-hidden class="pointer-events-none absolute top-40 left-[-6rem] -z-10 h-80 w-80 rounded-full bg-accent-200/30 blur-3xl animate-blob" style="animation-delay: 5s" />

    <div class="container mx-auto px-4">
      <!-- hero -->
      <div class="mx-auto mb-16 max-w-3xl text-center" v-reveal>
        <span class="mb-4 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-600">
          <Sparkles class="h-3.5 w-3.5" /> Free forever · No signup
        </span>
        <h1 class="text-4xl font-black text-ink md:text-6xl">Free <span class="text-gradient-brand">audit tools</span></h1>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Run a free audit on any business in seconds — Google, SEO, reviews, AI visibility, social and more.
          See exactly what to fix, then get a branded report.
        </p>
      </div>

      <!-- grouped tool cards -->
      <div v-for="group in groups" :key="group.key" :id="group.key" class="mb-16 scroll-mt-24">
        <div class="mb-6 flex items-center gap-3" v-reveal>
          <h2 class="text-2xl font-black text-ink">{{ group.label }}</h2>
          <span class="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
          <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-500">{{ group.tools.length }}</span>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(t, i) in group.tools" :key="t.slug" v-reveal="i">
            <ToolCard :tool="t" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
