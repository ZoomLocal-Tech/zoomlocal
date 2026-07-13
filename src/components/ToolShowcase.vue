<script setup>
import { ref, computed } from 'vue'
import { ExternalLink, Lock, Zap } from 'lucide-vue-next'
import BrandLogo from './BrandLogo.vue'
import { embedUrl } from '../config.js'

// Featured tools shown live inside the mock browser. Each maps to a real
// white-label embed on fly-social.com (loaded on demand when its tab opens).
const TABS = [
  { slug: 'gmb-audit', label: 'Google Business Audit', brand: 'gbp', path: 'free-google-audit' },
  { slug: 'local-rank-check', label: 'Local Rank Checker', brand: 'google-maps', path: 'rank-checker' },
  { slug: 'review-analysis', label: 'Review Analysis', brand: 'google', path: 'review-analysis' },
  { slug: 'ai-search-visibility', label: 'AI Search Visibility', brand: 'gemini', path: 'ai-visibility' },
  { slug: 'instagram-audit', label: 'Instagram Audit', brand: 'instagram', path: 'instagram-audit' },
  { slug: 'seo-site-audit', label: 'SEO Site Audit', brand: 'google', path: 'seo-audit' },
]

const active = ref(0)
// Track which tabs have been opened so we only mount the iframe once each.
const loaded = ref(new Set([0]))

function select(i) {
  active.value = i
  loaded.value.add(i)
}

const current = computed(() => TABS[active.value])
const currentUrl = computed(() => embedUrl(current.value.slug))
</script>

<template>
  <div>
    <!-- Tool tabs -->
    <div class="flex flex-wrap justify-center gap-2 mb-6">
      <button
        v-for="(t, i) in TABS"
        :key="t.slug"
        type="button"
        @click="select(i)"
        class="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-all"
        :class="active === i
          ? 'border-brand-500 bg-brand-600 text-white shadow-brand'
          : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700'"
      >
        <span class="h-4 w-4 shrink-0"><BrandLogo :name="t.brand" class="h-4 w-4" /></span>
        {{ t.label }}
      </button>
    </div>

    <!-- Mock browser window with the live embed -->
    <div class="mx-auto max-w-5xl">
      <div class="rounded-2xl border border-slate-200 bg-white shadow-brand-lg overflow-hidden">
        <!-- chrome -->
        <div class="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
          <span class="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span class="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span class="h-3 w-3 rounded-full bg-[#28c840]" />
          <div class="ml-3 flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500">
            <Lock class="h-3 w-3 text-emerald-500 shrink-0" />
            <span class="truncate">zoomlocal.in/tools/{{ current.path }}</span>
            <span class="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
            </span>
          </div>
        </div>

        <!-- live embed -->
        <div class="relative bg-slate-50" style="height: 560px">
          <template v-for="(t, i) in TABS" :key="t.slug">
            <iframe
              v-if="loaded.has(i)"
              v-show="active === i"
              :src="embedUrl(t.slug)"
              :title="t.label"
              class="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </template>
        </div>
      </div>

      <!-- caption + open-in-new-tab -->
      <div class="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-sm text-slate-500">
          <Zap class="inline h-4 w-4 text-brand-500 -mt-0.5" />
          This is the <strong class="text-ink">real, working {{ current.label }}</strong>, running live on ZoomLocal.
        </p>
        <a
          :href="currentUrl || `/tools/${current.slug}`"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          Open full tool <ExternalLink class="h-4 w-4" />
        </a>
      </div>
    </div>

    <!-- Powered-by trust strip -->
    <div class="mt-10 mx-auto max-w-3xl">
      <p class="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
        Powered by real data + leading AI
      </p>
      <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        <div class="flex items-center gap-2 text-sm font-semibold text-slate-600"><BrandLogo name="gbp" class="h-6 w-6" /> Google Business Profile</div>
        <div class="flex items-center gap-2 text-sm font-semibold text-slate-600"><BrandLogo name="google-maps" class="h-6 w-6" /> Google Maps data</div>
        <div class="flex items-center gap-2 text-sm font-semibold text-slate-600"><BrandLogo name="gemini" class="h-6 w-6" /> Gemini AI</div>
        <div class="flex items-center gap-2 text-sm font-semibold text-slate-600"><BrandLogo name="chatgpt" class="h-6 w-6" /> ChatGPT</div>
        <div class="flex items-center gap-2 text-sm font-semibold text-slate-600"><BrandLogo name="perplexity" class="h-6 w-6" /> Perplexity</div>
      </div>
    </div>
  </div>
</template>
