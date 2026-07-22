<script setup>
import { ref, markRaw } from 'vue'
import {
  ArrowRight, BarChart3, Calendar, Check, ChevronDown, ClipboardCheck,
  Globe, Mail, MapPin, MessageSquare, Shield, Star, Target,
  TrendingUp, Users, Zap, Sparkles, Phone,
  Building2, MapPinned, LineChart, Megaphone,
} from 'lucide-vue-next'
import ManagedContactForm from '../components/managed/ManagedContactForm.vue'
import ToolShowcase from '../components/ToolShowcase.vue'
import HeroRankClimb from '../components/HeroRankClimb.vue'
import AeoGeoSeoSection from '../components/AeoGeoSeoSection.vue'
import BrandLogo from '../components/BrandLogo.vue'
import ClientLogos from '../components/ClientLogos.vue'
import { useSeo, ORGANIZATION_SCHEMA, SITE_URL } from '../composables/useSeo.js'

// Deterministic particle positions so SSG output matches client hydration.
const particles = Array.from({ length: 26 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  duration: `${4 + (i % 4)}s`,
  delay: `${(i % 5) * 0.4}s`,
}))

// Platforms we optimize a business's presence across.
const PLATFORMS = [
  { name: 'Google Search', brand: 'google' },
  { name: 'Google Maps', brand: 'google-maps' },
  { name: 'Business Profile', brand: 'gbp' },
  { name: 'Instagram', brand: 'instagram' },
  { name: 'Facebook', brand: 'facebook' },
  { name: 'LinkedIn', brand: 'linkedin' },
  { name: 'Google Ads', brand: 'google-ads' },
]

// AI answer engines — where AEO (Answer Engine Optimization) and GEO
// (Generative Engine Optimization) get you recommended and cited.
const AI_PLATFORMS = [
  { name: 'ChatGPT', brand: 'chatgpt' },
  { name: 'Gemini', brand: 'gemini' },
  { name: 'Perplexity', brand: 'perplexity' },
]

// Real capability areas (from the fly-local-boost feature set) + AI Search.
const CAPABILITIES = [
  { icon: markRaw(Building2), label: 'Profile Management', sub: 'Info, categories & photos', color: '#1476e6' },
  { icon: markRaw(MapPinned), label: 'Multi-Location', sub: 'All branches, one place', color: '#0ea5e9' },
  { icon: markRaw(LineChart), label: 'Customer Insights', sub: 'Keywords, trends & rank', color: '#16b67c' },
  { icon: markRaw(Star), label: 'Reputation', sub: 'Reviews replied & tracked', color: '#f59e0b' },
  { icon: markRaw(Megaphone), label: 'Content & Posts', sub: 'Posts, offers, scheduled', color: '#e11d48' },
  { icon: markRaw(Sparkles), label: 'AI Search', sub: 'AEO + GEO visibility', color: '#8b5cf6' },
]

const IMPACT_STATS = [
  { value: '3×', label: 'More Search Impressions', description: 'Average lift in Google Search + Maps visibility within 6 months', color: '#2563eb' },
  { value: '47%', label: 'More Leads & Calls', description: 'Increase in calls, direction requests and website clicks from your GBP', color: '#16b67c' },
  { value: '4.6★', label: 'Average Review Rating', description: 'Clients hold 4.5+ star ratings with proactive review management', color: '#f59e0b' },
  { value: '10+', label: 'Hours Saved / Week', description: 'Local SEO work your team never has to touch again', color: '#8b5cf6' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Grant Secure Access', description: 'Share access to your Google Business Profile with one-click secure Google authorization. We never see your password.', icon: markRaw(Shield) },
  { step: '02', title: 'We Audit & Optimize', description: 'Our Local SEO experts run a full profile audit, fix and optimize every field, and set up monitoring, protection and content plans.', icon: markRaw(ClipboardCheck) },
  { step: '03', title: 'Ongoing Management', description: 'We manage reviews, publish content, track rankings, protect your profile and send monthly reports. You focus on your business.', icon: markRaw(Zap) },
]

const MANAGED_ACTIVITIES = [
  { category: 'Reputation Management', icon: markRaw(Star), color: '#f59e0b', gradient: 'from-amber-500 to-yellow-400', activities: ['Monitor and respond to every Google review within 24 hours', 'AI-drafted responses reviewed by human experts', 'Auto-respond to positive reviews with SEO-optimized replies', 'Escalate negative reviews to you immediately', 'Review request links & QR codes to grow ratings', 'Sentiment tracking and response-rate reporting'] },
  { category: 'Profile Optimization & Protection', icon: markRaw(Shield), color: '#2563eb', gradient: 'from-brand-600 to-brand-400', activities: ['Complete Google Business Profile audit and optimization', 'Optimize categories, services and attributes', 'SEO-optimized business description, written and maintained', '24/7 monitoring for unauthorized profile changes', 'Instant alerts if hours, phone or address are edited', 'Regular health checks and improvement plans'] },
  { category: 'Content & Post Publishing', icon: markRaw(Calendar), color: '#8b5cf6', gradient: 'from-violet-500 to-fuchsia-400', activities: ['Weekly Google Business posts (updates, offers, events)', 'AI-generated content ideas tailored to your business', 'Professional image sourcing and post design', 'Seasonal and holiday content planning', 'Promote offers, events and announcements', 'Consistent posting schedule for stronger SEO signals'] },
  { category: 'Rank Tracking & Local SEO', icon: markRaw(TrendingUp), color: '#0ea5e9', gradient: 'from-sky-500 to-cyan-400', activities: ['Track rankings for target keywords across locations', 'Monitor competitor rankings and find opportunities', 'Keyword research and strategy', 'Local pack (Google Maps 3-pack) position monitoring', 'Search-query analysis, see what drives visits', 'Visibility score tracking and improvement plans'] },
  { category: 'Analytics & Reporting', icon: markRaw(BarChart3), color: '#ef4444', gradient: 'from-red-500 to-orange-400', activities: ['Monthly performance reports with the metrics that matter', 'Views, clicks, calls, directions and bookings tracked', 'Search vs Maps performance breakdown', 'Mobile vs desktop traffic analysis', 'Month-over-month trend comparisons', 'Actionable insights and clear next steps'] },
  { category: 'AI Search & Local Enhancements', icon: markRaw(Sparkles), color: '#10b981', gradient: 'from-emerald-500 to-teal-400', activities: ['Get recommended in ChatGPT, Gemini and Perplexity', 'Branded microsite / landing page management', 'Photo management and GBP media optimization', 'Citation and NAP consistency across directories', 'Google Q&A management and monitoring', 'Holiday and special hours maintenance'] },
]

const SERVICES = [
  { icon: markRaw(Globe), title: 'Website Development', desc: 'Fast, SEO-ready websites built to turn local visitors into customers.' },
  { icon: markRaw(Sparkles), title: 'AEO & GEO (AI Search)', desc: 'Get found and recommended in ChatGPT, Gemini and Perplexity answers.' },
  { icon: markRaw(Target), title: 'Google Ads', desc: 'Targeted local ad campaigns that drive calls, directions and leads.' },
]

const WHO_FOR = [
  { icon: markRaw(MapPin), title: 'Solo Business Owners', desc: 'Restaurants, clinics, salons and stores, too busy to manage Google.' },
  { icon: markRaw(Users), title: 'Multi-Location Brands', desc: 'Franchises and chains needing consistent Local SEO across outlets.' },
  { icon: markRaw(Target), title: 'Healthcare Providers', desc: 'Doctors, dentists and hospitals where reputation and accuracy are critical.' },
  { icon: markRaw(Globe), title: 'Service Businesses', desc: 'Plumbers, electricians and consultants that live on local search.' },
]

const MONTHLY_FEATURES = ["Fully managed by ZoomLocal's Local SEO experts", 'Review monitoring & AI-powered responses', '24/7 profile protection & alerts', 'Weekly Google Business content & posts', 'Keyword rank tracking', 'Monthly performance reports', 'Review generator (QR code + link)', 'Profile optimization & audit']
const ANNUAL_FEATURES = ['Everything in Monthly plan', 'Priority support', 'Locked-in pricing', 'No monthly auto-debit hassle']

// Sample client testimonials. Replace with real client quotes when available.
const TESTIMONIALS = [
  { quote: 'Within three months our clinic went from page two to the Google Maps top three for "dentist near me". Calls doubled and we did nothing, ZoomLocal handled everything.', name: 'Dr. Anjali Deshpande', role: 'Bright Smile Dental, Pune', color: '#2563eb' },
  { quote: 'The review management alone is worth it. Every review answered within a day, our rating climbed to 4.8, and we finally look as good online as we are in person.', name: 'Rahul Menon', role: 'Coastal Kitchen, Kochi', color: '#0ea5e9' },
  { quote: 'We run four salon locations. ZoomLocal keeps every Google profile consistent, posts weekly, and sends one clean monthly report. It replaced an entire in-house effort.', name: 'Simran Kaur', role: 'Glow Studios, Chandigarh', color: '#8b5cf6' },
]

const CLIENT_LOGOS = ['c-1.png','c-2.png','c-3.png','c-4.png','c-5.png','c-6.png','c-7.png','c-8.png','c-9.png','c-10.png','c-11.png','c-12.png','c-14.png','c-15.png','c-16.png','c-18.png','c-19.svg','c-20.png','c-21.png','c-22.png','c-23.png','c-24.png','c-25.png','c-26.png'].map((f) => `/lovable-uploads/${f}`)

const WHATSAPP_URL = "https://wa.me/919270362196?text=Hi%2C%20I%27m%20interested%20in%20ZoomLocal%27s%20Managed%20Local%20SEO%20Services"

const FAQ = [
  { q: 'What is a managed Google Business Profile service?', a: 'It means a dedicated Local SEO team runs your Google Business Profile for you, reviews, posts, rankings, profile protection and monthly reporting, so you get more visibility and leads on Google Search and Maps without doing the work yourself.' },
  { q: 'How much does managed Local SEO cost?', a: 'It starts at ₹100 per day per location on the annual plan, or ₹120 per day per location billed monthly. Everything is included, with no hidden fees.' },
  { q: 'Do I have to share my Google password?', a: 'No. You grant access with a one-click secure Google authorization. We never see or store your password.' },
  { q: 'How is ZoomLocal different from doing it myself?', a: 'You could run the free audit tools yourself, but managed Local SEO means our experts do the ongoing work: responding to reviews, publishing posts, tracking rankings, protecting your profile and reporting, consistently, every week.' },
  { q: 'Which cities and businesses do you work with?', a: 'We work with local businesses across India — Mumbai, Pune, Delhi NCR, Bengaluru, Hyderabad, Chennai, Ahmedabad, Kolkata and beyond: restaurants, clinics, salons, retail, healthcare and service businesses, both single-location owners and multi-location brands.' },
  { q: 'What is AEO (Answer Engine Optimization)?', a: 'AEO is optimizing your business to be the direct answer when people ask questions — in Google featured snippets, voice search and AI assistants. It relies on question-shaped content, FAQ sections and structured data (schema) so engines can quote you confidently.' },
  { q: 'What is GEO (Generative Engine Optimization)?', a: 'GEO is optimizing your business to be cited and recommended inside AI-generated answers from ChatGPT, Gemini, Claude and Perplexity. These engines recommend businesses that are clearly described on sources they trust — your website, Google Business Profile, directories and reviews. ZoomLocal builds and maintains exactly that footprint.' },
  { q: 'How long does Local SEO take to show results?', a: 'Most clients see measurable movement in 4–8 weeks — better local-pack positions, more profile views, more calls — with the strongest gains at the 3–6 month mark as reviews, content and ranking signals compound. Local SEO is compounding work, not a one-time switch.' },
]

// Cities we actively serve — rendered on the page and fed to areaServed
// schema so "local seo <city>" queries and AI engines connect us to them.
const CITIES = ['Mumbai', 'Pune', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Chennai', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Surat', 'Nagpur', 'Kochi', 'Chandigarh', 'Lucknow', 'Indore', 'Nashik']

const openFaq = ref(0)

useSeo({
  title: 'Local SEO, AEO & GEO Agency | Google Business Profile Management | ZoomLocal',
  description:
    "ZoomLocal is a managed Local SEO, AEO and GEO agency. Our experts run your Google Business Profile end to end, reviews, rankings, content and reporting, and optimize you for AI answer engines (ChatGPT, Gemini, Perplexity), so you rank higher on Google Maps and get recommended by AI. From ₹100/day per location.",
  path: '/',
  jsonLd: [
    ORGANIZATION_SCHEMA,
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ZoomLocal',
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/tools?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: 'ZoomLocal, Managed Local SEO & Google Business Profile Management',
      serviceType: 'Local SEO, Google Business Profile Management, AEO, GEO',
      url: SITE_URL,
      image: `${SITE_URL}/og-image.jpg`,
      logo: `${SITE_URL}/zoomlocal-logo.png`,
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        ...CITIES.map((c) => ({ '@type': 'City', name: c })),
      ],
      priceRange: '₹₹',
      telephone: '+91-92703-62196',
      description: 'Done-for-you Google Business Profile management: reviews, rankings, content, protection and monthly reporting for local businesses.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'ZoomLocal Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Business Profile Management', description: 'End-to-end GBP management: reviews, weekly posts, rank tracking, profile protection and monthly reporting. From ₹100/day per location.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AEO & GEO (AI Search Optimization)', description: 'Get found and recommended in ChatGPT, Gemini, Claude and Perplexity answers.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development', description: 'Fast, SEO-ready websites built to convert local visitors into customers.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads Management', description: 'Targeted local ad campaigns that drive calls, directions and leads.' } },
        ],
      },
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
    <!-- ============================ HERO ============================ -->
    <section class="relative min-h-[100svh] overflow-hidden pt-28 pb-20 md:pt-32 md:pb-24">
      <!-- background -->
      <div aria-hidden class="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/70 via-transparent to-transparent" />
      <div aria-hidden class="absolute inset-0 -z-10 opacity-[0.5]" :style="{ backgroundImage: 'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)', backgroundSize: '56px 56px', maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)' }" />
      <div aria-hidden class="absolute -top-24 -left-24 -z-10 h-96 w-96 rounded-full bg-brand-300/30 blur-3xl animate-blob" />
      <div aria-hidden class="absolute top-10 -right-24 -z-10 h-96 w-96 rounded-full bg-accent-300/40 blur-3xl animate-blob" style="animation-delay: 4s" />
      <div aria-hidden class="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div v-for="(p, i) in particles" :key="i" class="absolute w-1.5 h-1.5 rounded-full bg-brand-400/40"
          :style="{ left: p.left, top: p.top, animation: `float ${p.duration} ease-in-out infinite`, animationDelay: p.delay }" />
      </div>

      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- copy -->
          <div v-reveal>
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-200 shadow-sm mb-6">
              <span class="relative flex h-2 w-2"><span class="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-brand-400" /><span class="relative inline-flex h-2 w-2 rounded-full bg-brand-600" /></span>
              <span class="text-sm font-semibold text-brand-700">India's Managed Local SEO Experts</span>
            </div>
            <h1 class="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] text-ink">
              Rank higher on Google.
              <span class="block text-gradient-brand">Get found by local customers.</span>
            </h1>
            <p class="mt-6 text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
              ZoomLocal is a done-for-you <strong class="text-ink">Local SEO agency</strong>. Our experts manage your
              <strong class="text-ink">Google Business Profile</strong> end to end, reviews, rankings, content, profile
              protection and reporting, so you show up first on Google Search and Maps.
            </p>
            <div class="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#contact" class="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white px-7 py-3.5 text-base rounded-xl shadow-brand font-semibold transition-colors">
                <Mail class="w-5 h-5" /> Book a Free Audit
              </a>
              <a href="#tools" class="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-brand-300 text-ink px-7 py-3.5 text-base rounded-xl font-semibold transition-colors shadow-sm">
                Try Our Free Tools <ArrowRight class="w-5 h-5 text-brand-600" />
              </a>
            </div>
            <div class="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
              <div class="flex items-center gap-2"><Check class="w-4 h-4 text-brand-600" /> No dashboards to learn</div>
              <div class="flex items-center gap-2"><Check class="w-4 h-4 text-brand-600" /> Dedicated expert team</div>
              <div class="flex items-center gap-2"><Check class="w-4 h-4 text-brand-600" /> Monthly reports included</div>
            </div>
          </div>

          <!-- hero visual: animated Google Maps rank climb (#6 -> #1) -->
          <div v-reveal="1">
            <HeroRankClimb />
          </div>
        </div>

        <!-- capability grid: everything we manage, end to end -->
        <div v-reveal class="mt-16 md:mt-24">
          <p class="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">Everything we manage for you — end to end</p>
          <div class="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <div v-for="c in CAPABILITIES" :key="c.label"
              class="group flex flex-col items-center gap-2.5 rounded-2xl border border-slate-200 bg-white/90 px-3 py-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-brand">
              <span class="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110" :style="{ background: c.color + '18', color: c.color }">
                <component :is="c.icon" class="h-5 w-5" />
              </span>
              <div>
                <div class="text-sm font-black leading-tight text-ink">{{ c.label }}</div>
                <div class="mt-0.5 text-[11px] text-slate-500">{{ c.sub }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== CLIENT LOGOS (3D conveyor) ===================== -->
    <section class="relative py-16 border-y border-slate-100 overflow-hidden">
      <div aria-hidden class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/50 via-transparent to-white/50" />
      <div class="container mx-auto px-4">
        <div v-reveal class="mx-auto mb-10 max-w-xl text-center">
          <span class="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent-600">
            <Star class="h-3.5 w-3.5 fill-accent-500 text-accent-500" /> Loved by local brands
          </span>
          <h2 class="text-2xl md:text-3xl font-black text-ink">Trusted by <span class="text-gradient-brand">local businesses</span> across India &amp; beyond</h2>
          <p class="mt-2 text-sm text-slate-500">From clinics and restaurants to retail and services — growing on Google every day.</p>
        </div>
      </div>
      <ClientLogos :logos="CLIENT_LOGOS" />
    </section>

    <!-- ===================== PLATFORM TRUST BAR ===================== -->
    <section class="py-14 border-b border-slate-100">
      <div class="container mx-auto px-4">
        <div v-reveal>
          <p class="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">One team, every platform your customers use</p>
          <p class="mx-auto mb-7 max-w-xl text-center text-sm text-slate-500">We manage and grow your presence across search, maps and social — <strong class="font-semibold text-slate-600">and now AI answers too</strong> — so you show up wherever people (and AI) look for you.</p>

          <!-- classic search + social platforms -->
          <div class="flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
            <div v-for="p in PLATFORMS" :key="p.name"
              class="group flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-brand">
              <span class="inline-flex h-6 shrink-0 items-center [&_svg]:h-full [&_svg]:w-auto">
                <BrandLogo :name="p.brand" />
              </span>
              <span class="text-sm font-bold text-slate-700 transition-colors group-hover:text-ink">{{ p.name }}</span>
            </div>
          </div>

          <!-- AI answer engines: AEO + GEO -->
          <div class="mt-4 flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-2 text-[11px] font-black uppercase tracking-wide text-violet-700">
              <Sparkles class="h-3.5 w-3.5" /> AEO + GEO · AI Search
            </span>
            <div v-for="p in AI_PLATFORMS" :key="p.name"
              class="group flex items-center gap-2.5 rounded-full border border-violet-200/70 bg-white/90 px-4 py-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-[0_18px_40px_-16px_rgba(139,92,246,0.5)]">
              <span class="inline-flex h-6 shrink-0 items-center [&_svg]:h-full [&_svg]:w-auto">
                <BrandLogo :name="p.brand" />
              </span>
              <span class="text-sm font-bold text-slate-700 transition-colors group-hover:text-ink">{{ p.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== IMPACT STATS ===================== -->
    <section class="py-20 md:py-24">
      <div class="container mx-auto px-4">
        <div v-reveal class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-3xl md:text-4xl font-black text-ink mb-3">The impact of managed Local SEO</h2>
          <p class="text-slate-600 text-lg">Real results local businesses see when our experts run their Google Business Profile.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          <div v-for="(stat, i) in IMPACT_STATS" :key="i" v-reveal="i"
            class="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-card hover:shadow-brand transition-shadow">
            <div class="text-5xl font-black mb-3" :style="{ color: stat.color }">{{ stat.value }}</div>
            <h3 class="text-base font-bold text-ink mb-2">{{ stat.label }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ stat.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== SERVICES ===================== -->
    <section id="services" class="py-20 md:py-24 bg-gradient-to-b from-transparent via-brand-50/50 to-transparent">
      <div class="container mx-auto px-4">
        <div v-reveal class="text-center max-w-2xl mx-auto mb-12">
          <span class="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">What we do</span>
          <h2 class="text-3xl md:text-4xl font-black text-ink mb-3">A full local growth agency, in one team</h2>
          <p class="text-slate-600 text-lg">Google Business Profile management is our core. We also build websites, run Google Ads, and get you found in AI search.</p>
        </div>

        <!-- core service -->
        <div v-reveal class="max-w-6xl mx-auto mb-6">
          <div class="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-600 to-brand-700 p-8 md:p-10 text-white shadow-brand-lg">
            <div aria-hidden class="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div class="relative md:flex md:items-center md:justify-between gap-8">
              <div class="max-w-2xl">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold mb-4"><Star class="w-3 h-3" /> CORE SERVICE</span>
                <h3 class="text-2xl md:text-3xl font-black mb-3">Google Business Profile Management</h3>
                <p class="text-brand-50/90 text-lg">Done for you. We run your entire Google presence, reviews, rankings, content, profile protection and monthly reporting, so you get found first and never lift a finger.</p>
              </div>
              <a href="#contact" class="mt-6 md:mt-0 inline-flex shrink-0 items-center justify-center gap-2 bg-white text-brand-700 hover:bg-brand-50 px-6 py-3.5 rounded-xl font-bold transition-colors">Get started <ArrowRight class="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <!-- other services -->
        <div class="grid sm:grid-cols-3 gap-5 max-w-6xl mx-auto mb-16">
          <div v-for="(s, i) in SERVICES" :key="i" v-reveal="i" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-card hover:border-brand-200 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-brand-50 p-3 mb-4"><component :is="s.icon" class="w-full h-full text-brand-600" /></div>
            <h4 class="text-ink font-bold mb-1.5">{{ s.title }}</h4>
            <p class="text-slate-500 text-sm leading-relaxed">{{ s.desc }}</p>
          </div>
        </div>

        <!-- what's included -->
        <div v-reveal class="text-center mb-10">
          <h3 class="text-2xl md:text-3xl font-black text-ink">Everything included in Profile Management</h3>
          <p class="text-slate-600 mt-2">Six areas of work, handled by our team, every single week.</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div v-for="(group, i) in MANAGED_ACTIVITIES" :key="i" v-reveal="i"
            class="rounded-2xl border border-slate-200 bg-white p-7 shadow-card hover:shadow-brand transition-shadow">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br p-3 mb-5" :class="group.gradient">
              <component :is="group.icon" class="w-full h-full text-white" />
            </div>
            <h3 class="text-lg font-bold text-ink mb-4">{{ group.category }}</h3>
            <ul class="space-y-2.5">
              <li v-for="(activity, j) in group.activities" :key="j" class="flex items-start gap-2.5 text-sm text-slate-600">
                <Check class="w-4 h-4 mt-0.5 flex-shrink-0" :style="{ color: group.color }" />
                <span>{{ activity }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== SEO / AEO / GEO ===================== -->
    <AeoGeoSeoSection />

    <!-- ===================== FREE TOOLS SHOWCASE ===================== -->
    <section id="tools" class="py-20 md:py-24">
      <div class="container mx-auto px-4">
        <div v-reveal class="text-center max-w-2xl mx-auto mb-10">
          <span class="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">Free tools, real results</span>
          <h2 class="text-3xl md:text-4xl font-black text-ink mb-3">Try our free Local SEO tools, live</h2>
          <p class="text-slate-600 text-lg">Audit any Google Business Profile, check local rankings, analyze reviews and more. These are the real, working tools, running right here.</p>
        </div>
        <div v-reveal>
          <ToolShowcase />
        </div>
        <div class="text-center mt-10">
          <RouterLink to="/tools" class="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-brand-300 text-ink px-6 py-3.5 rounded-xl font-semibold transition-colors shadow-sm">
            Explore all free tools <ArrowRight class="w-5 h-5 text-brand-600" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ===================== HOW IT WORKS ===================== -->
    <section class="py-20 md:py-24 bg-slate-50 border-y border-slate-100">
      <div class="container mx-auto px-4">
        <div v-reveal class="text-center max-w-2xl mx-auto mb-14">
          <h2 class="text-3xl md:text-4xl font-black text-ink mb-3">How it works</h2>
          <p class="text-slate-600 text-lg">You focus on your business. Our experts handle the Local SEO.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div v-for="(item, i) in HOW_IT_WORKS" :key="i" v-reveal="i"
            class="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
            <div class="text-6xl font-black text-brand-100 mb-3">{{ item.step }}</div>
            <div class="w-12 h-12 rounded-xl bg-brand-600 p-3 mb-4 shadow-brand"><component :is="item.icon" class="w-full h-full text-white" /></div>
            <h3 class="text-xl font-bold text-ink mb-2">{{ item.title }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== WHO IT'S FOR ===================== -->
    <section class="py-20 md:py-24">
      <div class="container mx-auto px-4">
        <div v-reveal class="text-center max-w-2xl mx-auto mb-14">
          <h2 class="text-3xl md:text-4xl font-black text-ink mb-3">Who we help</h2>
          <p class="text-slate-600 text-lg">Managed Local SEO is for businesses that want results without the effort.</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          <div v-for="(item, i) in WHO_FOR" :key="i" v-reveal="i" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <div class="w-11 h-11 rounded-xl bg-brand-50 p-2.5 mb-4"><component :is="item.icon" class="w-full h-full text-brand-600" /></div>
            <h3 class="text-base font-bold text-ink mb-2">{{ item.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== TESTIMONIALS ===================== -->
    <section class="py-20 md:py-24 bg-gradient-to-b from-transparent via-brand-50/50 to-transparent">
      <div class="container mx-auto px-4">
        <div v-reveal class="text-center max-w-2xl mx-auto mb-14">
          <div class="inline-flex items-center gap-1 mb-3">
            <Star v-for="n in 5" :key="n" class="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <h2 class="text-3xl md:text-4xl font-black text-ink mb-3">Loved by local businesses</h2>
          <p class="text-slate-600 text-lg">Owners who handed us their Google presence, and never looked back.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <figure v-for="(t, i) in TESTIMONIALS" :key="i" v-reveal="i"
            class="rounded-2xl border border-slate-200 bg-white p-7 shadow-card flex flex-col">
            <div class="flex gap-1 mb-4"><Star v-for="n in 5" :key="n" class="w-4 h-4 fill-amber-400 text-amber-400" /></div>
            <blockquote class="text-slate-700 leading-relaxed flex-1">"{{ t.quote }}"</blockquote>
            <figcaption class="mt-5 flex items-center gap-3 pt-5 border-t border-slate-100">
              <div class="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold" :style="{ backgroundColor: t.color }">{{ t.name.charAt(0) }}</div>
              <div><div class="text-sm font-bold text-ink">{{ t.name }}</div><div class="text-xs text-slate-500">{{ t.role }}</div></div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ===================== PRICING ===================== -->
    <section id="pricing" class="py-20 md:py-24">
      <div class="container mx-auto px-4">
        <div v-reveal class="text-center max-w-2xl mx-auto mb-14">
          <h2 class="text-3xl md:text-4xl font-black text-ink mb-3">Simple, transparent pricing</h2>
          <p class="text-slate-600 text-lg">Everything included. No hidden fees. Our team handles it all.</p>
        </div>
        <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div v-reveal="0" class="rounded-3xl border border-slate-200 bg-white p-8 shadow-card flex flex-col">
            <h3 class="text-xl font-bold text-ink mb-1">Monthly</h3>
            <p class="text-slate-500 text-sm mb-6">Auto-debit, cancel anytime</p>
            <div class="mb-4"><div class="flex items-baseline gap-1"><span class="text-6xl font-black text-ink">₹120</span><span class="text-slate-400 text-lg font-medium">/day</span></div><p class="text-slate-500 text-sm mt-1">per location</p></div>
            <div class="bg-slate-50 rounded-xl p-4 mb-6 flex justify-between items-center"><span class="text-slate-500 text-sm">Billed monthly</span><span class="text-ink font-bold text-lg">₹3,600<span class="text-slate-400 text-sm font-normal">/mo</span></span></div>
            <ul class="space-y-3 mb-8 flex-grow">
              <li v-for="(f, i) in MONTHLY_FEATURES" :key="i" class="flex items-start gap-3 text-sm text-slate-600"><Check class="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" /><span>{{ f }}</span></li>
            </ul>
            <a href="#contact" class="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-ink rounded-xl py-4 font-bold transition-colors">Get Started <ArrowRight class="w-5 h-5" /></a>
          </div>
          <div v-reveal="1" class="relative rounded-3xl border-2 border-brand-500 bg-white p-8 shadow-brand-lg flex flex-col">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-bold shadow-brand">MOST POPULAR · SAVE ₹6,700/yr</div>
            <h3 class="text-xl font-bold text-ink mb-1">Annual</h3>
            <p class="text-slate-500 text-sm mb-6">Pay upfront, save more</p>
            <div class="mb-4"><div class="flex items-baseline gap-2"><span class="text-6xl font-black text-brand-600">₹100</span><span class="text-slate-400 text-lg font-medium">/day</span><span class="text-slate-400 text-sm line-through">₹120</span></div><p class="text-slate-500 text-sm mt-1">per location</p></div>
            <div class="bg-brand-50 rounded-xl p-4 mb-6 text-sm"><div class="flex justify-between text-slate-500 mb-2"><span>Monthly rate (12 mo)</span><span class="line-through">₹43,200</span></div><div class="flex justify-between items-center"><span class="text-ink font-semibold">Billed annually</span><span class="text-brand-700 font-bold text-lg">₹36,500<span class="text-slate-400 text-sm font-normal">/yr</span></span></div></div>
            <ul class="space-y-3 mb-8 flex-grow">
              <li v-for="(f, i) in ANNUAL_FEATURES" :key="i" class="flex items-start gap-3 text-sm text-slate-600"><Check class="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" /><span>{{ f }}</span></li>
            </ul>
            <a href="#contact" class="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white rounded-xl py-4 font-bold shadow-brand transition-colors">Get Started <ArrowRight class="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== FAQ ===================== -->
    <section class="py-20 md:py-24 bg-slate-50 border-y border-slate-100">
      <div class="container mx-auto px-4 max-w-3xl">
        <div v-reveal class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-black text-ink mb-3">Frequently asked questions</h2>
          <p class="text-slate-600 text-lg">Everything you need to know about managed Local SEO.</p>
        </div>
        <div class="space-y-3">
          <div v-for="(f, i) in FAQ" :key="i" class="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <button type="button" class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left" @click="openFaq = openFaq === i ? -1 : i">
              <span class="font-bold text-ink">{{ f.q }}</span>
              <ChevronDown class="w-5 h-5 text-brand-600 shrink-0 transition-transform" :class="{ 'rotate-180': openFaq === i }" />
            </button>
            <div v-show="openFaq === i" class="px-6 pb-5 -mt-1 text-slate-600 leading-relaxed">{{ f.a }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== CITIES SERVED ===================== -->
    <section class="py-14">
      <div class="container mx-auto px-4 max-w-4xl text-center" v-reveal>
        <h2 class="text-2xl md:text-3xl font-black text-ink mb-3">Local SEO services across India</h2>
        <p class="text-slate-600 leading-relaxed">
          ZoomLocal manages Google Business Profiles for businesses in
          <span class="font-semibold text-ink">{{ CITIES.join(', ') }}</span>
          — and every city in between. Wherever your customers search
          "near me", we make sure they find you first.
        </p>
      </div>
    </section>

    <!-- ===================== CONTACT ===================== -->
    <section id="contact" class="relative isolate py-20 md:py-24 overflow-hidden">
      <div aria-hidden class="absolute inset-0 -z-10 bg-gradient-to-br from-brand-600 to-brand-800" />
      <div aria-hidden class="absolute inset-0 -z-10 opacity-20" :style="{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }" />
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <div v-reveal class="text-center mb-10">
            <h2 class="text-3xl md:text-4xl font-black text-white mb-3">Let's grow your Google presence</h2>
            <p class="text-lg text-brand-50/90">Tell us about your business and our Local SEO team will reach out within 24 hours.</p>
          </div>
          <div v-reveal class="bg-white rounded-3xl shadow-brand-lg p-6 md:p-10">
            <ManagedContactForm />
          </div>
          <div class="mt-8 text-center">
            <p class="text-brand-50/80 text-sm mb-4">Or reach us directly</p>
            <div class="flex flex-wrap justify-center gap-3">
              <a :href="WHATSAPP_URL" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold transition-colors backdrop-blur">
                <MessageSquare class="w-5 h-5" /> WhatsApp us
              </a>
              <a href="tel:+919270362196" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold transition-colors backdrop-blur">
                <Phone class="w-5 h-5" /> +91 92703 62196
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
