<script setup>
import { MapPin, Mail, Phone, MessageSquare } from 'lucide-vue-next'
import { TOOLS } from '../../data/tools.js'

const footerTools = TOOLS.filter((t) =>
  ['gmb-audit', 'seo-site-audit', 'ai-search-visibility', 'local-rank-check', 'review-analysis', 'caption-generator'].includes(t.slug)
)
const healthTools = TOOLS.filter((t) => t.category === 'health')
const year = 2026
</script>

<template>
  <footer class="relative bg-ink text-slate-300 pt-16 pb-8 overflow-hidden">
    <!-- soft brand glow -->
    <div aria-hidden class="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-brand-600/20 blur-3xl" />
    <div class="relative container mx-auto px-4">
      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <!-- Brand -->
        <div class="lg:col-span-2 max-w-sm">
          <div class="flex items-center gap-2.5 mb-4">
            <img src="/favicon-64.png" alt="ZoomLocal logo" class="w-9 h-9 rounded-xl" />
            <span class="text-lg font-extrabold text-white">Zoom<span class="text-brand-400">Local</span></span>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed">
            ZoomLocal is a managed <strong class="text-slate-200">Local SEO agency</strong>. We run your Google Business
            Profile end to end, reviews, rankings, content, profile protection and monthly reporting, plus websites,
            Google Ads and AI-search optimization, so local businesses get found first.
          </p>
          <div class="mt-5 space-y-2 text-sm">
            <a href="mailto:info@zoomlocal.in" class="flex items-center gap-2 text-slate-400 hover:text-brand-300 transition-colors"><Mail class="w-4 h-4" /> info@zoomlocal.in</a>
            <a href="tel:+919270362196" class="flex items-center gap-2 text-slate-400 hover:text-brand-300 transition-colors"><Phone class="w-4 h-4" /> +91 92703 62196</a>
            <a href="https://wa.me/919270362196" target="_blank" rel="noopener" class="flex items-center gap-2 text-slate-400 hover:text-brand-300 transition-colors"><MessageSquare class="w-4 h-4" /> Chat on WhatsApp</a>
            <p class="flex items-center gap-2 text-slate-500"><MapPin class="w-4 h-4" /> Serving local businesses across India</p>
          </div>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4">Services</h4>
          <ul class="space-y-2.5 text-sm text-slate-400">
            <li><RouterLink to="/#services" class="hover:text-brand-300 transition-colors">Google Business Profile Management</RouterLink></li>
            <li><RouterLink to="/#services" class="hover:text-brand-300 transition-colors">Website Development</RouterLink></li>
            <li><RouterLink to="/#services" class="hover:text-brand-300 transition-colors">Google Ads</RouterLink></li>
            <li><RouterLink to="/#services" class="hover:text-brand-300 transition-colors">AEO &amp; GEO (AI Search)</RouterLink></li>
            <li><RouterLink to="/pricing" class="hover:text-brand-300 transition-colors">Pricing</RouterLink></li>
          </ul>
        </div>

        <!-- Free Tools -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4">Free SEO Tools</h4>
          <ul class="space-y-2.5 text-sm text-slate-400">
            <li v-for="t in footerTools" :key="t.slug">
              <RouterLink :to="`/tools/${t.slug}`" class="hover:text-brand-300 transition-colors">{{ t.name }}</RouterLink>
            </li>
            <li><RouterLink to="/tools" class="text-brand-400 hover:text-brand-300 font-medium">All free tools →</RouterLink></li>
          </ul>
        </div>

        <!-- Company / Healthcare -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4">Company</h4>
          <ul class="space-y-2.5 text-sm text-slate-400">
            <li><RouterLink to="/blog" class="hover:text-brand-300 transition-colors">Blog</RouterLink></li>
            <li><RouterLink to="/#contact" class="hover:text-brand-300 transition-colors">Contact us</RouterLink></li>
            <li v-for="t in healthTools" :key="t.slug">
              <RouterLink :to="`/tools/${t.slug}`" class="hover:text-brand-300 transition-colors">{{ t.name }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <p>© {{ year }} ZoomLocal Tech Private Limited, India. All rights reserved.</p>
        <p>Managed Local SEO · Google Business Profile Experts</p>
      </div>
    </div>
  </footer>
</template>
