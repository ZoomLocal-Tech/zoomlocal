<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPostBySlug } from '../data/posts.js'
import { useSeo, SITE_URL, ORGANIZATION_SCHEMA } from '../composables/useSeo.js'

const route = useRoute()
const post = computed(() => getPostBySlug(route.params.slug))

function fmtDate(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

if (post.value) {
  useSeo({
    title: `${post.value.title} | ZoomLocal Blog`,
    description: post.value.description,
    path: `/blog/${post.value.slug}`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.value.title,
      description: post.value.description,
      datePublished: post.value.date,
      dateModified: post.value.date,
      author: { '@type': 'Organization', name: post.value.author },
      publisher: ORGANIZATION_SCHEMA,
      mainEntityOfPage: `${SITE_URL}/blog/${post.value.slug}`,
    },
  })
}
</script>

<template>
  <div class="pt-28 pb-24">
    <article v-if="post" class="container mx-auto px-4 max-w-3xl">
      <RouterLink to="/blog" class="text-green-400/80 text-sm hover:text-green-400">← All posts</RouterLink>
      <div class="flex items-center gap-2 mt-6 mb-4">
        <span v-for="tag in post.tags" :key="tag" class="text-[11px] px-2.5 py-1 rounded-full bg-green-500/10 text-green-400">{{ tag }}</span>
      </div>
      <h1 class="text-3xl md:text-5xl font-black text-white leading-tight mb-4">{{ post.title }}</h1>
      <p class="text-gray-500 text-sm mb-10">{{ fmtDate(post.date) }} · {{ post.readingTime }} · {{ post.author }}</p>
      <div class="blog-body" v-html="post.html" />

      <div class="mt-14 p-8 rounded-3xl bg-gradient-to-br from-green-600/15 to-emerald-600/10 border border-green-500/20 text-center">
        <h2 class="text-2xl font-bold text-white mb-3">Want this handled for you?</h2>
        <p class="text-gray-400 mb-6">Our team manages your Google Business Profile end to end, or run a free audit yourself.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink to="/#contact" class="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold">Talk to Us</RouterLink>
          <RouterLink to="/tools" class="inline-flex items-center justify-center border border-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold">Free Tools</RouterLink>
        </div>
      </div>
    </article>

    <div v-else class="text-center py-20">
      <h1 class="text-2xl font-bold text-white mb-3">Post not found</h1>
      <RouterLink to="/blog" class="text-green-400 hover:text-green-300">← Back to blog</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.blog-body :deep(h2) { font-size: 1.5rem; font-weight: 700; color: #fff; margin: 2rem 0 0.75rem; }
.blog-body :deep(p) { color: #9ca3af; line-height: 1.75; margin-bottom: 1rem; }
.blog-body :deep(ul) { color: #9ca3af; margin: 0 0 1rem 1.25rem; list-style: disc; }
.blog-body :deep(li) { margin-bottom: 0.5rem; line-height: 1.7; }
.blog-body :deep(strong) { color: #e5e7eb; }
.blog-body :deep(a) { color: #34d399; text-decoration: underline; }
</style>
