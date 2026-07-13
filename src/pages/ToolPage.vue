<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  ArrowRight, ArrowLeft, Check, MessageSquare, Zap, Clock, ShieldCheck,
  Gauge, TrendingUp, Star, Sparkles, HeartPulse,
} from 'lucide-vue-next'
import { getToolBySlug, TOOLS } from '../data/tools.js'
import { embedUrl } from '../config.js'
import { useSeo, SITE_URL } from '../composables/useSeo.js'

const route = useRoute()
const tool = computed(() => getToolBySlug(route.params.slug))
const src = computed(() => (tool.value ? embedUrl(tool.value.slug) : ''))
const iframeRef = ref(null)

// Per-category theming so each tool page feels tailored while staying on-brand.
const CAT_META = {
  audit: { label: 'Audit & Analysis', icon: Gauge, color: '#1476e6' },
  visibility: { label: 'Visibility & Rankings', icon: TrendingUp, color: '#16b67c' },
  reputation: { label: 'Reputation', icon: Star, color: '#f59e0b' },
  content: { label: 'Content & Social', icon: Sparkles, color: '#8b5cf6' },
  health: { label: 'Healthcare Self-Tests', icon: HeartPulse, color: '#f43f5e' },
}
const cat = computed(() => CAT_META[tool.value?.category] || CAT_META.audit)

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
  const iframe = iframeRef.value
  if (e.data.type === 'fly-embed-resize') {
    iframe.style.height = e.data.height + 'px'
  } else if (e.data.type === 'fly-embed-scroll-to-modal') {
    // Modal-aware scroll: centre when it fits the viewport, top-align (with a
    // safe zone for the sticky header) when it doesn't.
    const ifr = iframe.getBoundingClientRect()
    const modalTopAbs = window.pageYOffset + ifr.top + (e.data.top || 0)
    const vh = window.innerHeight
    const safeTop = 100
    const modalHeight = e.data.height || 0
    let targetY
    if (modalHeight > 0 && modalHeight + safeTop + 20 < vh) {
      const ideal = modalTopAbs - (vh - modalHeight) / 2
      targetY = Math.max(modalTopAbs - safeTop, ideal)
    } else {
      targetY = modalTopAbs - safeTop
    }
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
  } else if (e.data.type === 'fly-embed-scroll-to-offset') {
    // Legacy fallback (e.g. the "Report Ready" card in the GMB Audit success state).
    const rect = iframe.getBoundingClientRect()
    const fallbackY = window.pageYOffset + rect.top + (e.data.offset || 0) - 100
    window.scrollTo({ top: Math.max(0, fallbackY), behavior: 'smooth' })
  }
}
onMounted(() => window.addEventListener('message', onMessage))
onUnmounted(() => window.removeEventListener('message', onMessage))
</script>

<template>
  <div class="relative overflow-hidden pt-28 pb-24">
    <!-- ambient background -->
    <div aria-hidden class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/70 via-transparent to-transparent" />
    <div aria-hidden class="pointer-events-none absolute -top-24 right-[-6rem] -z-10 h-80 w-80 rounded-full blur-3xl animate-blob" :style="{ background: cat.color + '22' }" />
    <div aria-hidden class="pointer-events-none absolute top-40 left-[-6rem] -z-10 h-80 w-80 rounded-full bg-accent-200/30 blur-3xl animate-blob" style="animation-delay: 5s" />

    <div class="container mx-auto px-4">
      <template v-if="tool">
        <!-- ===== hero header ===== -->
        <div class="mx-auto max-w-3xl text-center" v-reveal>
          <RouterLink to="/tools" class="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-600">
            <ArrowLeft class="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> All free tools
          </RouterLink>

          <div class="mt-5 flex justify-center">
            <span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide" :style="{ color: cat.color, background: cat.color + '16' }">
              <component :is="cat.icon" class="h-3.5 w-3.5" /> {{ cat.label }}
            </span>
          </div>

          <h1 class="mt-4 text-4xl font-black leading-tight text-ink md:text-5xl">{{ tool.name }}</h1>
          <p class="mt-3 text-lg font-semibold" :style="{ color: cat.color }">{{ tool.tagline }}</p>
          <p class="mt-3 text-lg leading-relaxed text-slate-600">{{ tool.description }}</p>

          <!-- trust pills -->
          <div class="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <span class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-semibold text-slate-600 shadow-sm"><Zap class="h-4 w-4 text-accent-500" /> Free to run</span>
            <span class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-semibold text-slate-600 shadow-sm"><ShieldCheck class="h-4 w-4 text-brand-500" /> No signup</span>
            <span class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-semibold text-slate-600 shadow-sm"><Clock class="h-4 w-4 text-violet-500" /> Results in seconds</span>
          </div>
        </div>

        <!-- ===== live embed in a clean, minimal frame ===== -->
        <div v-if="src" class="relative mx-auto mt-12 max-w-4xl" v-reveal>
          <div aria-hidden class="absolute -inset-4 -z-10 rounded-[32px] opacity-50 blur-3xl" :style="{ background: `linear-gradient(120deg, ${cat.color}22, #16b67c1f)` }" />
          <div class="overflow-hidden rounded-[24px] bg-white p-1.5 shadow-card ring-1 ring-slate-200/70">
            <!-- slim category accent + live status -->
            <div class="flex items-center justify-between px-3 py-2">
              <span class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                <span class="h-1.5 w-1.5 rounded-full animate-pulse" :style="{ background: cat.color }" /> Live tool
              </span>
              <span class="text-[11px] font-semibold text-slate-400">ZoomLocal</span>
            </div>
            <!-- the actual tool -->
            <iframe ref="iframeRef" :src="src" title="Free tool"
              class="rounded-2xl"
              style="width:100%;height:800px;border:none;display:block;background:#fff;" allow="clipboard-write" />
          </div>
          <p class="mt-3 text-center text-sm text-slate-500">
            <Sparkles class="-mt-0.5 inline h-4 w-4" :style="{ color: cat.color }" /> This is the real, working tool — running live on ZoomLocal.
          </p>
        </div>

        <!-- ===== placeholder until the embed is connected ===== -->
        <div v-else class="mx-auto mt-12 max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card md:p-10" v-reveal>
          <div class="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl" :style="{ background: cat.color + '16' }">
            <MessageSquare class="h-6 w-6" :style="{ color: cat.color }" />
          </div>
          <h2 class="mb-3 text-2xl font-black text-ink">Run this tool for free</h2>
          <p class="mb-6 text-slate-600">Want a {{ tool.name }} report for your business, or to add this tool to your own site under your brand? Talk to our team and we will set you up.</p>
          <div class="flex flex-col justify-center gap-3 sm:flex-row">
            <RouterLink to="/#contact" class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 font-semibold text-white shadow-brand transition-transform hover:-translate-y-0.5">
              Talk to us <ArrowRight class="h-4 w-4" />
            </RouterLink>
            <a href="https://wa.me/919270362196" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50">
              WhatsApp us
            </a>
          </div>
        </div>

        <!-- ===== why it matters ===== -->
        <div class="mx-auto mt-16 max-w-3xl" v-reveal>
          <div class="rounded-3xl border border-slate-200 bg-white p-7 shadow-card md:p-9">
            <h2 class="mb-3 text-2xl font-black text-ink">Why it matters</h2>
            <p class="text-slate-600">{{ tool.description }} For agencies, it doubles as a lead magnet: run it on a prospect, send them a branded report, and start the conversation already knowing what to fix.</p>
            <ul class="mt-6 grid gap-3 sm:grid-cols-3">
              <li v-for="point in ['Free to run, results in seconds', 'A clear, shareable report you can act on', 'White-label for agencies under their own brand']" :key="point"
                class="flex items-start gap-2.5 rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 text-[13px] leading-snug text-slate-600">
                <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" :style="{ background: cat.color }"><Check class="h-3 w-3" :stroke-width="3.5" /></span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- ===== related tools ===== -->
        <div v-if="related.length" class="mx-auto mt-16 max-w-4xl" v-reveal>
          <h2 class="mb-5 text-xl font-black text-ink">Related tools</h2>
          <div class="grid gap-4 sm:grid-cols-3">
            <RouterLink v-for="r in related" :key="r.slug" :to="`/tools/${r.slug}`"
              class="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-brand">
              <span aria-hidden class="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" :style="{ background: cat.color }" />
              <p class="pr-6 font-bold text-ink">{{ r.name }}</p>
              <p class="mt-1 flex-1 text-sm text-slate-500">{{ r.tagline }}</p>
              <span class="mt-3 inline-flex items-center gap-1 text-sm font-semibold transition-colors" :style="{ color: cat.color }">
                Open tool <ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </RouterLink>
          </div>
        </div>
      </template>

      <!-- ===== not found ===== -->
      <div v-else class="py-20 text-center">
        <h1 class="mb-3 text-2xl font-black text-ink">Tool not found</h1>
        <RouterLink to="/tools" class="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700">
          <ArrowLeft class="h-4 w-4" /> Back to all tools
        </RouterLink>
      </div>
    </div>
  </div>
</template>
