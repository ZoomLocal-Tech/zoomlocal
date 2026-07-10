<script setup>
import { TOOLS } from '../../data/tools.js'

const footerTools = TOOLS.filter((t) =>
  ['gmb-audit', 'seo-site-audit', 'ai-search-visibility', 'local-rank-check', 'review-analysis', 'caption-generator'].includes(t.slug)
)
const healthTools = TOOLS.filter((t) => t.category === 'health')
</script>

<template>
  <footer class="border-t border-gray-800 bg-gray-950 pt-14 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <img src="/favicon-64.png" alt="ZoomLocal" class="w-8 h-8 rounded-lg" />
            <span class="text-lg font-bold text-white">ZoomLocal</span>
          </div>
          <p class="text-sm text-gray-500 leading-relaxed">
            ZoomLocal is your local growth partner. We manage your Google Business Profile, build your website, run your Google Ads, and get you found in AI search, all done for you.
          </p>
          <p class="text-sm text-gray-500 mt-4">
            <a href="mailto:info@zoomlocal.in" class="hover:text-green-400">info@zoomlocal.in</a><br />
            <a href="tel:+919270362196" class="hover:text-green-400">+91 92703 62196</a>
          </p>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4">Services</h4>
          <ul class="space-y-2.5 text-sm text-gray-400">
            <li><RouterLink to="/" class="hover:text-green-400">Managed Local SEO</RouterLink></li>
            <li><RouterLink to="/pricing" class="hover:text-green-400">Pricing</RouterLink></li>
            <li><RouterLink to="/#contact" class="hover:text-green-400">Talk to our team</RouterLink></li>
            <li><a href="https://wa.me/919270362196" target="_blank" rel="noopener" class="hover:text-green-400">WhatsApp us</a></li>
          </ul>
        </div>

        <!-- Free Tools -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4">Free Tools</h4>
          <ul class="space-y-2.5 text-sm text-gray-400">
            <li v-for="t in footerTools" :key="t.slug">
              <RouterLink :to="`/tools/${t.slug}`" class="hover:text-green-400">{{ t.name }}</RouterLink>
            </li>
            <li><RouterLink to="/tools" class="text-green-400 hover:text-green-300">All tools →</RouterLink></li>
          </ul>
        </div>

        <!-- Healthcare -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4">Healthcare</h4>
          <ul class="space-y-2.5 text-sm text-gray-400">
            <li v-for="t in healthTools" :key="t.slug">
              <RouterLink :to="`/tools/${t.slug}`" class="hover:text-green-400">{{ t.name }}</RouterLink>
            </li>
            <li><RouterLink to="/tools#health" class="text-green-400 hover:text-green-300">All healthcare tools →</RouterLink></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4">Company</h4>
          <ul class="space-y-2.5 text-sm text-gray-400">
            <li><RouterLink to="/blog" class="hover:text-green-400">Blog</RouterLink></li>
            <li><RouterLink to="/#contact" class="hover:text-green-400">Contact</RouterLink></li>
            <li><a href="https://fly-social.com" target="_blank" rel="noopener" class="hover:text-green-400">Fly for Agencies</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-6 border-t border-gray-800/60 text-center text-xs text-gray-600">
        © 2026 ZoomLocal Tech Private Limited, India. All rights reserved.
      </div>
    </div>
  </footer>
</template>
