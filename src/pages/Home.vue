<script setup>
import { markRaw } from 'vue'
import {
  ArrowRight, BarChart3, Calendar, Check, ChevronRight, ClipboardCheck,
  Globe, Mail, MapPin, MessageSquare, Shield, Smartphone, Star, Target,
  TrendingUp, Users, Zap,
} from 'lucide-vue-next'
import ManagedContactForm from '../components/managed/ManagedContactForm.vue'
import { useSeo, ORGANIZATION_SCHEMA, SITE_URL } from '../composables/useSeo.js'

// Deterministic particle positions so SSG output matches client hydration.
const particles = Array.from({ length: 30 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  duration: `${3 + (i % 4)}s`,
  delay: `${(i % 5) * 0.4}s`,
}))

const IMPACT_STATS = [
  { value: '3×', label: 'More Search Impressions', description: 'Average improvement in Google Search visibility within 6 months', color: '#25D366' },
  { value: '47%', label: 'More Leads & Calls', description: 'Increase in direction requests, calls, and website visits from GBP', color: '#06b6d4' },
  { value: '4.6★', label: 'Average Review Rating', description: 'Clients maintain 4.5+ star ratings with proactive review management', color: '#f59e0b' },
  { value: '10+', label: 'Hours Saved / Week', description: 'Time saved on Local SEO tasks your team no longer needs to do', color: '#8b5cf6' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Grant Access', description: 'Share access to your Google Business Profile locations. One-click secure Google authorization, we never see your password.', icon: markRaw(Shield), stepText: 'text-green-500/20', iconBg: 'bg-green-500/10', iconText: 'text-green-400' },
  { step: '02', title: 'We Audit & Optimize', description: 'Our Local SEO experts run a complete profile audit, optimize your listing, and set up monitoring, protection, and content plans.', icon: markRaw(ClipboardCheck), stepText: 'text-emerald-500/20', iconBg: 'bg-emerald-500/10', iconText: 'text-emerald-400' },
  { step: '03', title: 'Ongoing Management', description: 'We manage reviews, publish content, track rankings, protect your profile, and send you monthly reports. You do nothing.', icon: markRaw(Zap), stepText: 'text-teal-500/20', iconBg: 'bg-teal-500/10', iconText: 'text-teal-400' },
]

const MANAGED_ACTIVITIES = [
  { category: 'Reputation Management', icon: markRaw(Star), color: '#f59e0b', gradient: 'from-amber-500 to-yellow-400', activities: ['Monitor and respond to every Google review within 24 hours', 'AI-powered response drafts reviewed by human experts', 'Auto-respond to positive reviews with SEO-optimized replies', 'Escalate negative reviews immediately to you', 'Generate review request links & QR codes for customers', 'Track review sentiment trends and response rates'] },
  { category: 'Profile Optimization & Protection', icon: markRaw(Shield), color: '#10b981', gradient: 'from-emerald-500 to-teal-400', activities: ['Complete GBP profile audit and optimization', 'Optimize business categories, services & attributes', 'Write and maintain SEO-optimized business description', '24/7 monitoring for unauthorized profile changes', 'Instant alerts if someone edits your hours, phone, or address', 'Regular profile health checks and improvement recommendations'] },
  { category: 'Content & Post Publishing', icon: markRaw(Calendar), color: '#8b5cf6', gradient: 'from-violet-500 to-fuchsia-400', activities: ['Create and publish weekly GBP posts (updates, offers, events)', 'AI-generated content ideas tailored to your business', 'Professional image sourcing and post design', 'Seasonal and holiday content planning', 'Promote special offers, events, and announcements', 'Maintain consistent posting schedule for SEO signals'] },
  { category: 'Rank Tracking & SEO', icon: markRaw(TrendingUp), color: '#06b6d4', gradient: 'from-cyan-500 to-blue-400', activities: ['Track rankings for your target keywords across locations', 'Monitor competitor rankings and identify opportunities', 'Keyword research and strategy recommendations', 'Search traffic analysis, which queries drive visits', 'Local pack position monitoring (Google Maps 3-pack)', 'Visibility score tracking and improvement plans'] },
  { category: 'Analytics & Reporting', icon: markRaw(BarChart3), color: '#ef4444', gradient: 'from-red-500 to-orange-400', activities: ['Monthly performance reports with key metrics', 'Track views, clicks, calls, direction requests, and bookings', 'Search vs Maps performance breakdown', 'Mobile vs desktop traffic analysis', 'Month-over-month trend comparisons', 'Actionable insights and next-step recommendations'] },
  { category: 'Local SEO Enhancements', icon: markRaw(Globe), color: '#25D366', gradient: 'from-green-500 to-emerald-400', activities: ['Build and manage your branded microsite / landing page', 'Photo management, upload and organize GBP photos', 'Citation monitoring across online directories', 'NAP consistency checks (Name, Address, Phone)', 'GBP Q&A management and monitoring', 'Holiday hours and special hours maintenance'] },
]

const SERVICES = [
  { icon: markRaw(Globe), title: 'Website Development', desc: 'Fast, SEO-ready websites built to turn visitors into customers.' },
  { icon: markRaw(TrendingUp), title: 'AEO & GEO', desc: 'Get found in AI search, ChatGPT, Gemini and Perplexity, and answer engines.' },
  { icon: markRaw(Target), title: 'Google Ads', desc: 'Targeted local ad campaigns that drive calls, directions and leads.' },
]

const WHO_FOR = [
  { icon: markRaw(MapPin), title: 'Solo Business Owners', desc: 'Restaurants, clinics, salons, retail stores, too busy running your business to manage Google' },
  { icon: markRaw(Users), title: 'Multi-Location Brands', desc: 'Franchises, chains, and brands with multiple outlets needing consistent Local SEO across locations' },
  { icon: markRaw(Target), title: 'Healthcare Providers', desc: 'Doctors, dentists, hospitals, where reputation and accurate profile information is critical' },
  { icon: markRaw(Globe), title: 'Service Businesses', desc: 'Plumbers, electricians, consultants, businesses that depend on local search for leads' },
]

const MONTHLY_FEATURES = ["Fully managed by ZoomLocal's Local SEO experts", 'Review monitoring & AI-powered responses', '24/7 profile protection & alerts', 'Weekly GBP content & posts', 'Keyword rank tracking', 'Monthly performance reports', 'Review generator (QR code + link)', 'Profile optimization & audit']
const ANNUAL_FEATURES = ['Everything in Monthly plan', 'Priority support', 'Locked-in pricing', 'No monthly auto-debit hassle']

const CLIENT_LOGOS = ['c-1.png','c-2.png','c-3.png','c-4.png','c-5.png','c-6.png','c-7.png','c-8.png','c-9.png','c-10.png','c-11.png','c-12.png','c-14.png','c-15.png','c-16.png','c-18.png','c-19.svg','c-20.png','c-21.png','c-22.png','c-23.png','c-24.png','c-25.png','c-26.png'].map((f) => `/lovable-uploads/${f}`)
const LOGO_LOOP = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

const WHATSAPP_URL = "https://wa.me/919270362196?text=Hi%2C%20I%27m%20interested%20in%20ZoomLocal%27s%20Managed%20Local%20SEO%20Services"

const FAQ = [
  { q: 'What is a managed Google Business Profile service?', a: 'It means a dedicated Local SEO team runs your Google Business Profile for you, reviews, posts, rankings, profile protection and monthly reporting, so you get more visibility and leads without doing the work yourself.' },
  { q: 'How much does managed Local SEO cost?', a: 'It starts at ₹100 per day per location on the annual plan, or ₹120 per day per location billed monthly. Everything is included, with no hidden fees.' },
  { q: 'Do I have to share my Google password?', a: 'No. You grant access with a one-click secure Google authorization. We never see or store your password.' },
]

useSeo({
  title: "Managed Local SEO Services | ZoomLocal Manages Your Google Business Profile",
  description:
    "ZoomLocal's Local SEO experts manage your Google Business Profile end to end, reviews, rankings, content, profile protection and reporting. From ₹100/day per location.",
  path: '/',
  jsonLd: [
    ORGANIZATION_SCHEMA,
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Managed Local SEO / Google Business Profile Management',
      provider: { '@type': 'Organization', name: 'ZoomLocal', url: SITE_URL },
      areaServed: 'IN',
      description: 'Done-for-you Google Business Profile management: reviews, rankings, content, protection and reporting.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div v-for="(p, i) in particles" :key="i" class="absolute w-1 h-1 rounded-full bg-green-500/30"
          :style="{ left: p.left, top: p.top, animation: `float ${p.duration} ease-in-out infinite`, animationDelay: p.delay }" />
      </div>
      <div class="absolute inset-0 opacity-10" :style="{ backgroundImage: 'linear-gradient(rgba(37,211,102,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,211,102,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }" />
      <div class="absolute inset-0 bg-gradient-to-b from-green-950/20 via-transparent to-gray-950" />
      <div class="relative z-10 container mx-auto px-4 text-center">
        <div v-reveal>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
            <Users class="w-4 h-4 text-green-400" />
            <span class="text-sm text-green-300">Managed by ZoomLocal's Local SEO Experts</span>
          </div>
          <h1 class="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">Grow Your Business</span>
            <br /><span class="text-white">on Google Search</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-4 leading-relaxed">
            More visibility. More customers. More growth.
            <br class="hidden md:block" />
            Our Local SEO experts manage your Google Business Profile so you get found first.
          </p>
          <p class="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            <span class="text-green-400">Reviews</span>, <span class="text-emerald-400">rankings</span>,
            <span class="text-teal-400">content</span>, <span class="text-cyan-400">profile protection</span>,
            <span class="text-violet-400">reporting</span> — you grant access, our experts handle everything.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="#contact" class="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-4 text-lg rounded-xl shadow-lg shadow-green-500/25 font-semibold transition-colors">
              <Mail class="w-5 h-5" /> Talk to Our Team
            </a>
            <a href="#services" class="inline-flex items-center justify-center bg-transparent border border-gray-600 hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-xl font-semibold transition-colors">
              See What's Included
            </a>
          </div>
          <div class="flex flex-wrap gap-6 justify-center text-sm text-gray-500">
            <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-400" /> No dashboards to learn</div>
            <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-400" /> Dedicated expert team</div>
            <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-400" /> Monthly reports included</div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronRight class="w-6 h-6 text-gray-600 rotate-90" />
      </div>
    </section>

    <!-- Client Logos -->
    <section class="py-12 relative bg-gray-950 overflow-hidden">
      <div class="container mx-auto px-4">
        <div v-reveal>
          <p class="text-center text-sm text-gray-500 mb-8 uppercase tracking-widest">Trusted by businesses across the world</p>
          <div class="relative">
            <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-950 to-transparent z-10" />
            <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-950 to-transparent z-10" />
            <div class="flex gap-8 items-center animate-scroll">
              <div v-for="(logo, i) in LOGO_LOOP" :key="i" class="flex-shrink-0 bg-white/90 rounded-xl px-5 py-3 flex items-center justify-center min-w-[100px]">
                <img :src="logo" alt="Client logo" class="h-10 w-auto object-contain" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Stats -->
    <section class="py-20 relative bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950">
      <div class="container mx-auto px-4">
        <div v-reveal class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-3 text-white">The Impact of Managed Local SEO</h2>
          <p class="text-gray-400 text-lg">Real results our clients see when our experts manage their GBP</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto items-stretch">
          <div v-for="(stat, i) in IMPACT_STATS" :key="i" v-reveal="i" class="h-full">
            <div class="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 text-center h-full flex flex-col justify-center">
              <div class="text-5xl md:text-6xl font-black mb-3" :style="{ color: stat.color }">{{ stat.value }}</div>
              <h3 class="text-lg font-bold text-white mb-2">{{ stat.label }}</h3>
              <p class="text-gray-500 text-sm">{{ stat.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-24 relative">
      <div class="container mx-auto px-4">
        <div v-reveal class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-white">How It Works</h2>
          <p class="text-gray-400 text-lg">You focus on your business. Our experts handle the Local SEO.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div v-for="(item, i) in HOW_IT_WORKS" :key="i" v-reveal="i">
            <div class="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 h-full">
              <div class="text-6xl font-black mb-4" :class="item.stepText">{{ item.step }}</div>
              <div class="w-12 h-12 rounded-xl p-2.5 mb-4" :class="item.iconBg">
                <component :is="item.icon" class="w-full h-full" :class="item.iconText" />
              </div>
              <h3 class="text-xl font-bold text-white mb-3">{{ item.title }}</h3>
              <p class="text-gray-400">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What Our Experts Do -->
    <section id="services" class="py-24 relative">
      <div class="absolute inset-0 bg-gradient-to-b from-gray-950 via-green-950/10 to-gray-950" />
      <div class="relative container mx-auto px-4">
        <div v-reveal class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Our Services</span>
          </h2>
          <p class="text-gray-400 text-lg max-w-3xl mx-auto">
            Google Business Profile management is our core. We also build websites, run Google Ads, and get you found in AI search.
          </p>
        </div>

        <!-- Core service, featured -->
        <div v-reveal class="max-w-7xl mx-auto mb-6">
          <div class="relative rounded-3xl border border-green-500/40 bg-gradient-to-br from-green-600/15 to-emerald-600/5 p-8 md:p-10">
            <span class="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold mb-4">CORE SERVICE</span>
            <div class="md:flex md:items-center md:justify-between gap-8">
              <div class="max-w-2xl">
                <h3 class="text-2xl md:text-3xl font-bold text-white mb-3">Google Business Profile Management</h3>
                <p class="text-gray-300">Done for you. We run your entire Google presence, reviews, rankings, content, profile protection and monthly reporting, so you get found first and never lift a finger.</p>
              </div>
              <a href="#contact" class="mt-6 md:mt-0 inline-flex shrink-0 items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors">Get started <ArrowRight class="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <!-- Other services -->
        <div class="grid sm:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          <div v-for="(s, i) in SERVICES" :key="i" v-reveal="i" class="bg-gray-900/70 border border-gray-800 rounded-2xl p-6">
            <div class="w-11 h-11 rounded-lg bg-gray-800 p-2.5 mb-4">
              <component :is="s.icon" class="w-full h-full text-gray-300" />
            </div>
            <h4 class="text-white font-bold mb-1.5">{{ s.title }}</h4>
            <p class="text-gray-500 text-sm">{{ s.desc }}</p>
          </div>
        </div>

        <!-- Inside the core service -->
        <div v-reveal class="text-center mb-10">
          <h3 class="text-2xl md:text-3xl font-bold text-white">What our Google Business Profile management includes</h3>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div v-for="(group, i) in MANAGED_ACTIVITIES" :key="i" v-reveal="i">
            <div class="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 p-8 h-full">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br p-3 mb-6 shadow-lg" :class="group.gradient" :style="{ boxShadow: `0 8px 32px ${group.color}40` }">
                <component :is="group.icon" class="w-full h-full text-white" />
              </div>
              <h3 class="text-xl font-bold text-white mb-4">{{ group.category }}</h3>
              <ul class="space-y-2.5">
                <li v-for="(activity, j) in group.activities" :key="j" class="flex items-start gap-2.5 text-sm text-gray-400">
                  <Check class="w-3.5 h-3.5 mt-0.5 flex-shrink-0" :style="{ color: group.color }" />
                  <span>{{ activity }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Who It's For -->
    <section class="py-24 relative bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950">
      <div class="container mx-auto px-4">
        <div v-reveal class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-white">Who Is This For?</h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">Managed Local SEO is ideal for businesses that want results without the effort</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div v-for="(item, i) in WHO_FOR" :key="i" v-reveal="i">
            <div class="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 h-full">
              <div class="w-10 h-10 rounded-lg bg-green-500/10 p-2 mb-4">
                <component :is="item.icon" class="w-full h-full text-green-400" />
              </div>
              <h3 class="text-base font-bold text-white mb-2">{{ item.title }}</h3>
              <p class="text-gray-500 text-sm">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="py-24 relative">
      <div class="container mx-auto px-4">
        <div v-reveal class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-white">Simple, Transparent Pricing</h2>
          <p class="text-gray-400 text-lg">Everything included. No hidden fees. Our team handles it all.</p>
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
              <a href="#contact" class="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl py-4 font-semibold transition-colors">Get Started <ArrowRight class="w-5 h-5" /></a>
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
                <a href="#contact" class="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl py-4 font-semibold transition-colors">Get Started <ArrowRight class="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Free tools teaser -->
    <section class="py-20 relative bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950">
      <div class="container mx-auto px-4 text-center max-w-3xl" v-reveal>
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">Prefer to do it yourself? Start with a free audit.</h2>
        <p class="text-gray-400 text-lg mb-8">Run a free Google, SEO, review or AI-visibility audit on any business and see exactly what to fix.</p>
        <RouterLink to="/tools" class="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-7 py-4 rounded-xl font-semibold transition-colors">
          Explore Free Tools <ArrowRight class="w-5 h-5" />
        </RouterLink>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-green-950/50 via-emerald-950/50 to-teal-950/50" />
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div v-for="(p, i) in particles" :key="i" class="absolute w-1 h-1 rounded-full bg-green-500/30"
          :style="{ left: p.left, top: p.top, animation: `float ${p.duration} ease-in-out infinite`, animationDelay: p.delay }" />
      </div>
      <div class="relative container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <div v-reveal>
            <div class="text-center mb-10">
              <h2 class="text-4xl md:text-5xl font-bold mb-4 text-white">Let's Get Started</h2>
              <p class="text-lg text-gray-400">Tell us about your business and our Local SEO team will reach out within 24 hours.</p>
            </div>
            <div class="bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-800 p-8 md:p-10">
              <ManagedContactForm />
            </div>
            <div class="mt-8 text-center">
              <p class="text-gray-500 text-sm mb-4">Or reach us directly on WhatsApp</p>
              <a :href="WHATSAPP_URL" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-green-500/50 transition-all duration-300 group">
                <div class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center"><MessageSquare class="w-5 h-5 text-green-400" /></div>
                <div class="text-left">
                  <p class="text-white font-semibold text-sm group-hover:text-green-400 transition-colors">Chat on WhatsApp</p>
                  <p class="text-gray-500 text-xs">+91 92703 62196</p>
                </div>
                <ArrowRight class="w-4 h-4 text-gray-600 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
