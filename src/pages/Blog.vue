<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { POSTS } from '../data/posts.js'
import { useSeo, SITE_URL } from '../composables/useSeo.js'

function fmtDate(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

useSeo({
  title: 'Blog | Local SEO & AI Search Tips for Businesses and Agencies | ZoomLocal',
  description:
    'Practical guides on Local SEO, Google Business Profile, and getting recommended in AI search (ChatGPT, Gemini, Perplexity) for local businesses and marketing agencies.',
  path: '/blog',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    name: 'ZoomLocal Blog',
    url: `${SITE_URL}/blog`,
    description:
      'Practical guides on Local SEO, Google Business Profile, and AI search visibility for local businesses and marketing agencies.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    blogPost: POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      description: p.description,
    })),
  },
})
</script>

<template>
  <div class="pt-28 pb-24">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16 max-w-3xl mx-auto" v-reveal>
        <h1 class="text-4xl md:text-6xl font-black mb-4 text-slate-900">From the Blog</h1>
        <p class="text-slate-600 text-lg">Practical local SEO and AI-search tips you can act on this week.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <RouterLink v-for="post in POSTS" :key="post.slug" :to="`/blog/${post.slug}`"
          class="group block bg-white border border-slate-200 hover:border-green-500/60 rounded-2xl p-7 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
          <div class="flex items-center gap-2 mb-3">
            <span v-for="tag in post.tags" :key="tag" class="text-[11px] px-2.5 py-1 rounded-full bg-green-50 text-green-700">{{ tag }}</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">{{ post.title }}</h2>
          <p class="text-slate-600 text-sm mb-4">{{ post.description }}</p>
          <div class="flex items-center justify-between text-xs text-slate-500">
            <span>{{ fmtDate(post.date) }} · {{ post.readingTime }}</span>
            <span class="inline-flex items-center text-green-600 group-hover:translate-x-1 transition-transform">Read <ArrowRight class="w-3.5 h-3.5 ml-1" /></span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
