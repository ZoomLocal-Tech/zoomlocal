<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight, Check, MessageSquare } from 'lucide-vue-next'
import { getToolBySlug, TOOLS } from '../data/tools.js'
import { embedUrl, EMBED_AGENCY_SLUG } from '../config.js'
import { useSeo, SITE_URL } from '../composables/useSeo.js'

const route = useRoute()
const tool = computed(() => getToolBySlug(route.params.slug))
const src = computed(() => (tool.value ? embedUrl(tool.value.slug) : ''))
const iframeRef = ref(null)

const related = computed(() =>
  tool.value ? TOOLS.filter((t) => t.category === tool.value.category && t.slug !== tool.value.slug).slice(0, 3) : []
)

if (tool.value) {
  useSeo({
    title: `${tool.value.name} (Free) | ZoomLocal`,
    description: tool.value.description,
    path: `/tools/${tool.value.slug}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.value.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      description: tool.value.description,
      url: `${SITE_URL}/tools/${tool.value.slug}`,
    },
  })
}

function onMessage(e) {
  if (!e.data || !iframeRef.value) return
  if (e.data.type === 'fly-embed-resize') {
    iframeRef.value.style.height = e.data.height + 'px'
  }
}
onMounted(() => window.addEventListener('message', onMessage))
onUnmounted(() => window.removeEventListener('message', onMessage))
</script>

<template>
  <div class="pt-28 pb-24">
    <div class="container mx-auto px-4">
      <template v-if="tool">
        <div class="max-w-3xl mx-auto text-center mb-10" v-reveal>
          <RouterLink to="/tools" class="text-green-400/80 text-sm hover:text-green-400">← All free tools</RouterLink>
          <h1 class="text-4xl md:text-5xl font-black text-white mt-4 mb-3">{{ tool.name }}</h1>
          <p class="text-green-400 text-sm mb-3">{{ tool.tagline }}</p>
          <p class="text-gray-400 text-lg">{{ tool.description }}</p>
        </div>

        <!-- Live embed -->
        <div v-if="src" class="max-w-4xl mx-auto">
          <p class="text-center text-lg md:text-xl font-semibold text-white mb-6">
            Take an audit to get a reality check for your profile.
          </p>
          <iframe ref="iframeRef" :src="src" title="Audit tool"
            style="width:100%;height:800px;border:none;border-radius:12px;" allow="clipboard-write" />
        </div>

        <!-- Placeholder until the agency embed is connected -->
        <div v-else class="max-w-2xl mx-auto bg-gray-900/80 border border-gray-800 rounded-3xl p-8 md:p-10 text-center" v-reveal>
          <div class="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-5">
            <MessageSquare class="w-6 h-6 text-green-400" />
          </div>
          <h2 class="text-2xl font-bold text-white mb-3">Run this audit for free</h2>
          <p class="text-gray-400 mb-6">Want a {{ tool.name }} report for your business, or to add this tool to your own site under your brand? Talk to our team and we will set you up.</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <RouterLink to="/#contact" class="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              Talk to Us <ArrowRight class="w-4 h-4" />
            </RouterLink>
            <a href="https://wa.me/919270362196" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 border border-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
              WhatsApp us
            </a>
          </div>
        </div>

        <!-- Why it matters -->
        <div class="max-w-3xl mx-auto mt-16" v-reveal>
          <h2 class="text-2xl font-bold text-white mb-4">Why it matters</h2>
          <p class="text-gray-400">{{ tool.description }} For agencies, it doubles as a lead magnet: run it on a prospect, send them a branded report, and start the conversation already knowing what to fix.</p>
          <ul class="mt-6 space-y-3">
            <li class="flex items-start gap-3 text-gray-300"><Check class="w-4 h-4 text-green-400 mt-1 flex-shrink-0" /><span>Free to run, results in seconds</span></li>
            <li class="flex items-start gap-3 text-gray-300"><Check class="w-4 h-4 text-green-400 mt-1 flex-shrink-0" /><span>A clear, shareable report you can act on</span></li>
            <li class="flex items-start gap-3 text-gray-300"><Check class="w-4 h-4 text-green-400 mt-1 flex-shrink-0" /><span>Available white-label for agencies under their own brand</span></li>
          </ul>
        </div>

        <!-- Related -->
        <div v-if="related.length" class="max-w-4xl mx-auto mt-16">
          <h2 class="text-xl font-bold text-white mb-5">Related tools</h2>
          <div class="grid sm:grid-cols-3 gap-4">
            <RouterLink v-for="r in related" :key="r.slug" :to="`/tools/${r.slug}`" class="block bg-gray-900/80 border border-gray-800 hover:border-green-500/50 rounded-xl p-4 transition-colors">
              <p class="text-white font-semibold text-sm">{{ r.name }}</p>
              <p class="text-gray-500 text-xs mt-1">{{ r.tagline }}</p>
            </RouterLink>
          </div>
        </div>
      </template>

      <div v-else class="text-center py-20">
        <h1 class="text-2xl font-bold text-white mb-3">Tool not found</h1>
        <RouterLink to="/tools" class="text-green-400 hover:text-green-300">← Back to all tools</RouterLink>
      </div>
    </div>
  </div>
</template>
