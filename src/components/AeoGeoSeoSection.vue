<script setup>
import { Search, TrendingUp, Sparkles, Check, MapPin, Quote } from 'lucide-vue-next'
import BrandLogo from './BrandLogo.vue'

// SEO / AEO / GEO, three ways we get local businesses found.
const CARDS = [
  {
    key: 'seo', tag: 'SEO', full: 'Search Engine Optimization', color: '#1476e6', tint: '#eff6ff',
    title: 'Rank #1 on Google',
    desc: 'We optimize your Google Business Profile, website and content so you climb to the top of Google Search and Maps for the keywords your customers actually type.',
    points: ['Local keyword targeting', 'On-page + technical SEO', 'Google Maps 3-pack ranking'],
  },
  {
    key: 'aeo', tag: 'AEO', full: 'Answer Engine Optimization', color: '#16b67c', tint: '#e9fbf3',
    title: 'Get picked by AI',
    desc: 'When customers ask ChatGPT, Gemini or Perplexity for the best local option, we make sure your business is the one recommended, by name.',
    points: ['Answer-ready structured content', 'Entity + review signals', 'AI mentions tracked'],
  },
  {
    key: 'geo', tag: 'GEO', full: 'Generative Engine Optimization', color: '#8b5cf6', tint: '#f5f3ff',
    title: 'Be the cited source',
    desc: 'Generative search pulls from trusted sources. We build the schema, entities and authority so AI engines cite you, not your competitors.',
    points: ['Schema + knowledge graph', 'Authority & citations', 'Generative-ready pages'],
  },
]
</script>

<template>
  <section class="relative overflow-hidden py-20 md:py-24">
    <div aria-hidden class="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-slate-100/40 to-transparent" />
    <div aria-hidden class="absolute -top-24 right-10 -z-10 h-72 w-72 rounded-full bg-brand-200/30 blur-3xl animate-blob" />
    <div aria-hidden class="absolute bottom-0 left-10 -z-10 h-72 w-72 rounded-full bg-accent-200/30 blur-3xl animate-blob" style="animation-delay: 5s" />

    <div class="container mx-auto px-4">
      <div v-reveal class="mx-auto mb-14 max-w-2xl text-center">
        <span class="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-600">
          <Sparkles class="h-3.5 w-3.5" /> Found everywhere
        </span>
        <h2 class="text-3xl md:text-4xl font-black text-ink mb-3">SEO gets you on Google. We get you <span class="text-gradient-brand">everywhere.</span></h2>
        <p class="text-slate-600 text-lg">Search is changing. Customers now ask AI too. We optimize you across all three, classic search, AI answers, and generative engines.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        <div v-for="(c, i) in CARDS" :key="c.key" v-reveal="i"
          class="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-brand">
          <!-- tag -->
          <div class="mb-4 flex items-center gap-2.5">
            <span class="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md" :style="{ background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)` }">
              <span class="text-sm font-black">{{ c.tag }}</span>
            </span>
            <div>
              <div class="text-base font-black text-ink leading-tight">{{ c.title }}</div>
              <div class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{{ c.full }}</div>
            </div>
          </div>

          <!-- dynamic mini-viz -->
          <div class="relative mb-4 overflow-hidden rounded-2xl border border-slate-100 p-3" :style="{ background: c.tint }">
            <!-- SEO: rank list climbing -->
            <div v-if="c.key === 'seo'" class="space-y-1.5">
              <div class="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1">
                <span class="flex h-4 w-4 items-center justify-center rounded-full bg-slate-300 px-1 text-[9px]">🔍</span>
                <span class="text-[10px] text-slate-500">best dentist near me</span>
              </div>
              <div class="seo-row seo-row-you flex items-center gap-2 rounded-lg border-2 border-brand-400 bg-white px-2 py-1.5 shadow-sm">
                <span class="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-black text-white">1</span>
                <MapPin class="h-3.5 w-3.5 text-brand-600" />
                <span class="flex-1 text-[11px] font-bold text-ink">Your Business</span>
                <span class="inline-flex items-center gap-0.5 text-[10px] font-bold text-accent-600"><TrendingUp class="h-3 w-3" /> #1</span>
              </div>
              <div class="flex items-center gap-2 rounded-lg border border-slate-100 bg-white/70 px-2 py-1.5 opacity-70">
                <span class="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-black text-slate-400">2</span>
                <MapPin class="h-3.5 w-3.5 text-slate-300" />
                <span class="flex-1 text-[11px] font-semibold text-slate-400">Cityline Dental</span>
              </div>
            </div>

            <!-- AEO: AI recommends you -->
            <div v-else-if="c.key === 'aeo'">
              <div class="mb-2 flex items-center gap-1.5">
                <BrandLogo name="chatgpt" class="h-4 w-4" />
                <BrandLogo name="gemini" class="h-4 w-4" />
                <BrandLogo name="perplexity" class="h-4 w-4" />
                <span class="text-[10px] font-semibold text-slate-400">"best dentist near me?"</span>
              </div>
              <div class="aeo-answer rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-[11px] leading-snug text-slate-600 shadow-sm">
                I'd recommend <span class="font-black text-ink">Your Business</span>
                <span class="inline-flex items-center gap-0.5 align-middle text-amber-500">4.9<Sparkles class="h-2.5 w-2.5 fill-amber-400 text-amber-400" /></span>,
                it's the top-rated option nearby.<span class="aeo-caret" />
              </div>
            </div>

            <!-- GEO: cited as the source -->
            <div v-else class="space-y-1.5">
              <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400"><Quote class="h-3 w-3 text-violet-500" /> Cited as source</div>
              <div v-for="(g, gi) in [{ n: 'ChatGPT', b: 'chatgpt' }, { n: 'Gemini', b: 'gemini' }, { n: 'Perplexity', b: 'perplexity' }]" :key="g.n"
                class="geo-chip flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1 shadow-sm" :style="{ '--gd': (gi * 0.5) + 's' }">
                <BrandLogo :name="g.b" class="h-4 w-4 shrink-0" />
                <span class="flex-1 text-[11px] font-semibold text-slate-600">{{ g.n }} cites yourbrand.com</span>
                <span class="flex h-4 w-4 items-center justify-center rounded-full bg-violet-500 text-white"><Check class="h-2.5 w-2.5" :stroke-width="4" /></span>
              </div>
            </div>
          </div>

          <p class="mb-4 flex-1 text-sm leading-relaxed text-slate-600">{{ c.desc }}</p>
          <ul class="space-y-1.5">
            <li v-for="p in c.points" :key="p" class="flex items-center gap-2 text-[13px] text-slate-600">
              <span class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white" :style="{ background: c.color }"><Check class="h-2.5 w-2.5" :stroke-width="4" /></span>
              {{ p }}
            </li>
          </ul>
        </div>
      </div>

      <p v-reveal class="mt-8 text-center text-sm text-slate-500">
        One team, one plan, we handle <strong class="text-ink">SEO, AEO and GEO</strong> so you show up wherever your customers are searching.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* SEO: the "you" row nudges up on a loop */
.seo-row-you { animation: seoRise 3s ease-in-out infinite; }
@keyframes seoRise { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); box-shadow: 0 10px 24px -8px rgba(20, 118, 230, 0.4); } }

/* AEO: blinking caret on the AI answer */
.aeo-caret { display: inline-block; width: 1.5px; height: 11px; margin-left: 1px; vertical-align: -1px; background: #16b67c; animation: aeoBlink 1.1s step-end infinite; }
@keyframes aeoBlink { 50% { opacity: 0; } }
.aeo-answer { animation: aeoIn 0.6s ease-out both; }
@keyframes aeoIn { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: none; } }

/* GEO: citation chips pulse in sequence */
.geo-chip { animation: geoPulse 3s ease-in-out infinite; animation-delay: var(--gd); }
@keyframes geoPulse { 0%, 100% { border-color: #e2e8f0; } 50% { border-color: #c4b5fd; box-shadow: 0 6px 16px -6px rgba(139, 92, 246, 0.35); } }

@media (prefers-reduced-motion: reduce) {
  .seo-row-you, .aeo-answer, .aeo-caret, .geo-chip { animation: none !important; }
}
</style>
