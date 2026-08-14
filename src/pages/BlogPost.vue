<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPostBySlug } from '../data/posts.js'
import { useSeo, SITE_URL, ORGANIZATION_SCHEMA, DEFAULT_OG_IMAGE, breadcrumbLd } from '../composables/useSeo.js'

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
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.value.title,
        description: post.value.description,
        image: DEFAULT_OG_IMAGE,
        datePublished: post.value.date,
        dateModified: post.value.updated || post.value.date,
        author: { '@type': 'Organization', name: post.value.author, url: SITE_URL },
        publisher: ORGANIZATION_SCHEMA,
        mainEntityOfPage: `${SITE_URL}/blog/${post.value.slug}`,
      },
      breadcrumbLd([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.value.title, path: `/blog/${post.value.slug}` },
      ]),
      // Posts ending in a real FAQ section declare it as `faqs`, so the questions
      // are eligible for rich results instead of being plain markup in the body.
      ...(post.value.faqs?.length
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.value.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]
        : []),
    ],
  })
}
</script>

<template>
  <div class="pt-28 pb-24">
    <article v-if="post" class="container mx-auto px-4 max-w-3xl">
      <RouterLink to="/blog" class="text-green-600 text-sm hover:text-green-700">← All posts</RouterLink>
      <div class="flex items-center gap-2 mt-6 mb-4">
        <span v-for="tag in post.tags" :key="tag" class="text-[11px] px-2.5 py-1 rounded-full bg-green-50 text-green-700">{{ tag }}</span>
      </div>
      <h1 class="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4">{{ post.title }}</h1>
      <p class="text-slate-500 text-sm mb-10">{{ fmtDate(post.date) }} · {{ post.readingTime }} · {{ post.author }}</p>
      <div class="blog-body" v-html="post.html" />

      <div class="mt-14 p-8 rounded-3xl bg-gradient-to-br from-green-600/15 to-emerald-600/10 border border-green-500/20 text-center">
        <h2 class="text-2xl font-bold text-slate-900 mb-3">Want this handled for you?</h2>
        <p class="text-slate-600 mb-6">Our team manages your Google Business Profile end to end, or run a free audit yourself.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink to="/#contact" class="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold">Talk to Us</RouterLink>
          <RouterLink to="/tools" class="inline-flex items-center justify-center border border-slate-300 hover:bg-slate-100 text-slate-800 px-6 py-3 rounded-xl font-semibold">Free Tools</RouterLink>
        </div>
      </div>
    </article>

    <div v-else class="text-center py-20">
      <h1 class="text-2xl font-bold text-slate-900 mb-3">Post not found</h1>
      <RouterLink to="/blog" class="text-green-600 hover:text-green-700">← Back to blog</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.blog-body :deep(h2) { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 2rem 0 0.75rem; }
.blog-body :deep(h3) { font-size: 1.15rem; font-weight: 700; color: #0f172a; margin: 1.5rem 0 0.5rem; }
.blog-body :deep(p) { color: #475569; line-height: 1.75; margin-bottom: 1rem; }
.blog-body :deep(ul) { color: #475569; margin: 0 0 1rem 1.25rem; list-style: disc; }
.blog-body :deep(li) { margin-bottom: 0.5rem; line-height: 1.7; }
.blog-body :deep(strong) { color: #0f172a; }
.blog-body :deep(a) { color: #059669; text-decoration: underline; }
</style>
