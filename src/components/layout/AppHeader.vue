<script setup>
import { ref } from 'vue'
import { Menu, X, ChevronDown, Phone } from 'lucide-vue-next'
import { TOOLS } from '../../data/tools.js'
import { POSTS } from '../../data/posts.js'

const mobileOpen = ref(false)
const openMenu = ref(null) // desktop hover dropdown

const topTools = TOOLS.filter((t) => t.category !== 'health').slice(0, 6)
const healthTools = TOOLS.filter((t) => t.category === 'health')

const nav = [
  {
    label: 'Services',
    to: '/#services',
    items: [
      { label: 'Google Business Profile Management', to: '/#services' },
      { label: 'Website Development', to: '/#services' },
      { label: 'AEO & GEO (AI Search)', to: '/#services' },
      { label: 'Google Ads', to: '/#services' },
    ],
  },
  {
    label: 'Free Tools',
    to: '/tools',
    items: [
      ...topTools.map((t) => ({ label: t.name, to: `/tools/${t.slug}` })),
      { label: 'All tools →', to: '/tools' },
    ],
  },
  {
    label: 'Healthcare',
    to: '/tools#health',
    items: healthTools.map((t) => ({ label: t.name, to: `/tools/${t.slug}` })),
  },
  {
    label: 'Pricing',
    to: '/pricing',
    items: [
      { label: 'Monthly plan', to: '/pricing' },
      { label: 'Annual plan', to: '/pricing' },
    ],
  },
  {
    label: 'Blog',
    to: '/blog',
    items: POSTS.slice(0, 4).map((p) => ({ label: p.title, to: `/blog/${p.slug}` })),
  },
]
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_20px_-12px_rgba(15,23,42,0.25)]">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2.5 group">
        <img src="/favicon-64.png" alt="ZoomLocal logo" class="w-9 h-9 rounded-xl ring-1 ring-brand-100 group-hover:ring-brand-300 transition" />
        <span class="text-lg font-extrabold tracking-tight text-ink">Zoom<span class="text-brand-600">Local</span></span>
      </RouterLink>

      <!-- Desktop nav with dropdowns -->
      <nav class="hidden md:flex items-center gap-1">
        <div
          v-for="item in nav"
          :key="item.label"
          class="relative"
          @mouseenter="openMenu = item.label"
          @mouseleave="openMenu = null"
        >
          <RouterLink
            :to="item.to"
            class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 transition-colors"
          >
            {{ item.label }}
            <ChevronDown class="w-3.5 h-3.5 opacity-50" />
          </RouterLink>
          <div v-if="openMenu === item.label" class="absolute left-0 top-full pt-2 w-72">
            <div class="bg-white border border-slate-200 rounded-2xl p-2 shadow-xl shadow-slate-900/10">
              <RouterLink
                v-for="sub in item.items"
                :key="sub.label"
                :to="sub.to"
                class="block px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition-colors truncate"
              >{{ sub.label }}</RouterLink>
            </div>
          </div>
        </div>
        <a
          href="tel:+919270362196"
          class="ml-2 hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-700 transition-colors"
        >
          <Phone class="w-4 h-4" /> +91 92703 62196
        </a>
        <RouterLink
          to="/#contact"
          class="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white text-sm font-semibold shadow-brand transition-colors"
        >Book a Free Audit</RouterLink>
      </nav>

      <button class="md:hidden text-slate-700" @click="mobileOpen = !mobileOpen" aria-label="Menu">
        <Menu v-if="!mobileOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileOpen" class="md:hidden border-t border-slate-200 bg-white max-h-[80vh] overflow-y-auto">
      <nav class="container mx-auto px-4 py-4 space-y-4">
        <div v-for="item in nav" :key="item.label">
          <RouterLink :to="item.to" class="block text-sm font-bold text-ink py-1" @click="mobileOpen = false">{{ item.label }}</RouterLink>
          <div class="mt-1 ml-3 space-y-1 border-l border-slate-200 pl-3">
            <RouterLink
              v-for="sub in item.items"
              :key="sub.label"
              :to="sub.to"
              class="block text-sm text-slate-500 hover:text-brand-700 py-1"
              @click="mobileOpen = false"
            >{{ sub.label }}</RouterLink>
          </div>
        </div>
        <RouterLink
          to="/#contact"
          class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold w-full"
          @click="mobileOpen = false"
        >Book a Free Audit</RouterLink>
      </nav>
    </div>
  </header>
</template>
