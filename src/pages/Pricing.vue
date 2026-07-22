<script setup>
import { Check, ArrowRight } from 'lucide-vue-next'
import { useSeo, SITE_URL, breadcrumbLd, faqLd } from '../composables/useSeo.js'

const MONTHLY_FEATURES = ["Fully managed by ZoomLocal's Local SEO experts", 'Review monitoring & AI-powered responses', '24/7 profile protection & alerts', 'Weekly GBP content & posts', 'Keyword rank tracking', 'Monthly performance reports', 'Review generator (QR code + link)', 'Profile optimization & audit']
const ANNUAL_FEATURES = ['Everything in Monthly plan', 'Priority support', 'Locked-in pricing', 'No monthly auto-debit hassle']

const FAQ = [
  { q: 'What is included in the price?', a: 'Everything: review management, profile optimisation and protection, weekly content, rank tracking and monthly reporting. No hidden fees.' },
  { q: 'Is there a contract?', a: 'The monthly plan is auto-debit and you can cancel anytime. The annual plan is paid upfront and locks in the lower rate.' },
  { q: 'Do you work with multiple locations?', a: 'Yes. Pricing is per location, so multi-location brands and franchises get consistent Local SEO across every outlet.' },
]

useSeo({
  title: 'Pricing | Managed Local SEO from ₹100/day per location | ZoomLocal',
  description:
    'Simple, all-inclusive managed Local SEO pricing. From ₹100/day per location on the annual plan or ₹120/day billed monthly. Everything handled by our experts.',
  path: '/pricing',
  keywords: 'local seo pricing india, google business profile management cost, GMB management price, local seo packages india, managed local seo cost',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Managed Local SEO',
      description: 'Done-for-you Google Business Profile management, billed per location.',
      image: `${SITE_URL}/og-image.jpg`,
      brand: { '@type': 'Organization', name: 'ZoomLocal' },
      offers: [
        { '@type': 'Offer', name: 'Monthly', price: '3600', priceCurrency: 'INR', url: `${SITE_URL}/pricing`, availability: 'https://schema.org/InStock' },
        { '@type': 'Offer', name: 'Annual', price: '36500', priceCurrency: 'INR', url: `${SITE_URL}/pricing`, availability: 'https://schema.org/InStock' },
      ],
    },
    faqLd(FAQ),
    breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ]),
  ],
})
</script>

<template>
  <div class="pt-28 pb-24">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16" v-reveal>
        <h1 class="text-4xl md:text-6xl font-black mb-4 text-white">Simple, Transparent Pricing</h1>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">Everything included. No hidden fees. Our team handles your Google Business Profile end to end.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div v-reveal="0">
          <div class="relative bg-gray-900 rounded-3xl border border-gray-800 p-8 h-full flex flex-col">
            <h3 class="text-xl font-bold text-white mb-1">Monthly</h3>
            <p class="text-gray-500 text-sm mb-6">Auto-debit, cancel anytime</p>
            <div class="mb-4">
              <div class="flex items-baseline gap-1"><span class="text-6xl font-black text-white">₹120</span><span class="text-gray-400 text-lg font-medium">/day</span></div>
              <p class="text-gray-500 text-sm mt-1">per location</p>
            </div>
            <div class="bg-gray-800/50 rounded-xl p-4 mb-6">
              <div class="flex justify-between items-center"><span class="text-gray-400 text-sm">Billed monthly</span><span class="text-white font-semibold text-lg">₹3,600<span class="text-gray-500 text-sm font-normal">/mo</span></span></div>
            </div>
            <ul class="space-y-3 mb-8 flex-grow">
              <li v-for="(f, i) in MONTHLY_FEATURES" :key="i" class="flex items-start gap-3 text-sm text-gray-300"><Check class="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /><span>{{ f }}</span></li>
            </ul>
            <RouterLink to="/#contact" class="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl py-4 font-semibold transition-colors">Get Started <ArrowRight class="w-5 h-5" /></RouterLink>
          </div>
        </div>
        <div v-reveal="1">
          <div class="relative h-full">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur-sm opacity-60" />
            <div class="relative bg-gray-900 rounded-3xl border border-green-500/50 p-8 h-full flex flex-col">
              <div class="flex items-center justify-between mb-1">
                <h3 class="text-xl font-bold text-white">Annual</h3>
                <div class="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold">SAVE ₹6,700/yr</div>
              </div>
              <p class="text-gray-500 text-sm mb-6">Pay upfront, save more</p>
              <div class="mb-4">
                <div class="flex items-baseline gap-2"><span class="text-6xl font-black text-white">₹100</span><span class="text-gray-400 text-lg font-medium">/day</span><span class="text-gray-600 text-sm line-through ml-1">₹120/day</span></div>
                <p class="text-gray-500 text-sm mt-1">per location</p>
              </div>
              <div class="bg-gray-800/50 rounded-xl p-4 mb-6 text-sm">
                <div class="flex justify-between text-gray-400 mb-2"><span>Monthly rate (12 months)</span><span class="line-through">₹43,200</span></div>
                <div class="flex justify-between items-center"><span class="text-white font-semibold">Billed annually</span><span class="text-green-400 font-bold text-lg">₹36,500<span class="text-gray-500 text-sm font-normal">/yr</span></span></div>
              </div>
              <ul class="space-y-3 mb-8 flex-grow">
                <li v-for="(f, i) in ANNUAL_FEATURES" :key="i" class="flex items-start gap-3 text-sm text-gray-300"><Check class="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /><span>{{ f }}</span></li>
              </ul>
              <RouterLink to="/#contact" class="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl py-4 font-semibold transition-colors">Get Started <ArrowRight class="w-5 h-5" /></RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="max-w-3xl mx-auto mt-20" v-reveal>
        <h2 class="text-2xl md:text-3xl font-bold text-white text-center mb-8">Pricing FAQ</h2>
        <div class="space-y-4">
          <div v-for="(f, i) in FAQ" :key="i" class="bg-gray-900/80 border border-gray-800 rounded-2xl p-6">
            <h3 class="text-white font-semibold mb-2">{{ f.q }}</h3>
            <p class="text-gray-400 text-sm">{{ f.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
