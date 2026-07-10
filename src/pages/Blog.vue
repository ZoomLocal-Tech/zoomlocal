<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { POSTS } from '../data/posts.js'
import { useSeo } from '../composables/useSeo.js'

function fmtDate(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

useSeo({
  title: 'Blog | Local SEO & AI Search Tips for Businesses and Agencies | ZoomLocal',
  description:
    'Practical guides on Local SEO, Google Business Profile, and getting recommended in AI search (ChatGPT, Gemini, Perplexity) for local businesses and marketing agencies.',
  path: '/blog',
})
</script>

<template>
  <div class="pt-28 pb-24">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16 max-w-3xl mx-auto" v-reveal>
        <h1 class="text-4xl md:text-6xl font-black mb-4 text-white">From the Blog</h1>
        <p class="text-gray-400 text-lg">Practical local SEO and AI-search tips you can act on this week.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <RouterLink v-for="post in POSTS" :key="post.slug" :to="`/blog/${post.slug}`"
          class="group block bg-gray-900/80 border border-gray-800 hover:border-green-500/50 rounded-2xl p-7 transition-all duration-300">
          <div class="flex items-center gap-2 mb-3">
            <span v-for="tag in post.tags" :key="tag" class="text-[11px] px-2.5 py-1 rounded-full bg-green-500/10 text-green-400">{{ tag }}</span>
          </div>
          <h2 class="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{{ post.title }}</h2>
          <p class="text-gray-500 text-sm mb-4">{{ post.description }}</p>
          <div class="flex items-center justify-between text-xs text-gray-600">
            <span>{{ fmtDate(post.date) }} · {{ post.readingTime }}</span>
            <span class="inline-flex items-center text-green-400 group-hover:translate-x-1 transition-transform">Read <ArrowRight class="w-3.5 h-3.5 ml-1" /></span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
