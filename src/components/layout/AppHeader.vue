<script setup>
import { ref } from 'vue'
import { Menu, X, ChevronDown } from 'lucide-vue-next'
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
      { label: 'Google Business Management', to: '/#services' },
      { label: 'Website Development', to: '/#services' },
      { label: 'AEO & GEO', to: '/#services' },
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
  <header class="fixed top-0 inset-x-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/60">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2">
        <img src="/favicon-64.png" alt="ZoomLocal" class="w-8 h-8 rounded-lg" />
        <span class="text-lg font-bold text-white">ZoomLocal</span>
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
            class="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            {{ item.label }}
            <ChevronDown class="w-3.5 h-3.5 opacity-60" />
          </RouterLink>
          <div v-if="openMenu === item.label" class="absolute left-0 top-full pt-2 w-64">
            <div class="bg-gray-900 border border-gray-800 rounded-xl p-2 shadow-2xl">
              <RouterLink
                v-for="sub in item.items"
                :key="sub.label"
                :to="sub.to"
                class="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors truncate"
              >{{ sub.label }}</RouterLink>
            </div>
          </div>
        </div>
        <RouterLink
          to="/#contact"
          class="ml-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-sm font-semibold transition-colors"
        >Talk to Us</RouterLink>
      </nav>

      <button class="md:hidden text-gray-300" @click="mobileOpen = !mobileOpen" aria-label="Menu">
        <Menu v-if="!mobileOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileOpen" class="md:hidden border-t border-gray-800/60 bg-gray-950 max-h-[80vh] overflow-y-auto">
      <nav class="container mx-auto px-4 py-4 space-y-4">
        <div v-for="item in nav" :key="item.label">
          <RouterLink :to="item.to" class="block text-sm font-semibold text-white py-1" @click="mobileOpen = false">{{ item.label }}</RouterLink>
          <div class="mt-1 ml-3 space-y-1 border-l border-gray-800 pl-3">
            <RouterLink
              v-for="sub in item.items"
              :key="sub.label"
              :to="sub.to"
              class="block text-sm text-gray-400 hover:text-white py-1"
              @click="mobileOpen = false"
            >{{ sub.label }}</RouterLink>
          </div>
        </div>
        <RouterLink
          to="/#contact"
          class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold w-full"
          @click="mobileOpen = false"
        >Talk to Us</RouterLink>
      </nav>
    </div>
  </header>
</template>
