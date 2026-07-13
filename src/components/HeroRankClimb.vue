<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Star, MapPin, Navigation, TrendingUp, Search, Phone, Crown, Sparkles, FileText, Check, MousePointer2, Share2, Heart, MessageCircle, Send, Bookmark, MessageSquare, Quote } from 'lucide-vue-next'
import BrandLogo from './BrandLogo.vue'

// Premium 3D motion graphic: the Google local-pack screen sits at a diagonal
// perspective; "Your Business" climbs #6 -> #1 inside it while layered chips
// float out of the frame. DOM order is fixed; each row is positioned by a
// translateY transition so the reorder animates smoothly.
const ROW = 56

const businesses = [
  { id: 'you', name: 'Your Business', cat: 'Dentist · 0.4 km', you: true, pin: '#1476e6' },
  { id: 'c1', name: 'Cityline Dental Care', cat: 'Dentist · 1.1 km', rating: 4.4, reviews: 168, pin: '#ef4444' },
  { id: 'c2', name: 'Smile Studio Clinic', cat: 'Dentist · 0.9 km', rating: 4.3, reviews: 121, pin: '#f59e0b' },
  { id: 'c3', name: 'Perfect Teeth Centre', cat: 'Dentist · 1.6 km', rating: 4.2, reviews: 96, pin: '#8b5cf6' },
  { id: 'c4', name: 'OrthoPlus Dental', cat: 'Dentist · 2.0 km', rating: 4.1, reviews: 74, pin: '#14b8a6' },
  { id: 'c5', name: 'Dental Hub', cat: 'Dentist · 2.4 km', rating: 3.9, reviews: 52, pin: '#ec4899' },
]

const initialOrder = ['c1', 'c2', 'c3', 'c4', 'c5', 'you']
const order = ref([...initialOrder])
const slotOf = (id) => order.value.indexOf(id)
const youRank = computed(() => slotOf('you') + 1)
const youAtTop = computed(() => youRank.value === 1)

// Calls, reviews and rating all grow as the ranking climbs 6 -> 1.
const CALLS_BY_RANK = { 6: 9, 5: 17, 4: 28, 3: 41, 2: 58, 1: 76 }
const REVIEWS_BY_RANK = { 6: 126, 5: 188, 4: 251, 3: 314, 2: 372, 1: 412 }
const RATING_BY_RANK = { 6: 4.5, 5: 4.6, 4: 4.7, 3: 4.8, 2: 4.8, 1: 4.9 }
const calls = computed(() => CALLS_BY_RANK[youRank.value])
const youReviews = computed(() => REVIEWS_BY_RANK[youRank.value])
const youRating = computed(() => RATING_BY_RANK[youRank.value].toFixed(1))

// Inline styles so the rank pill (and its number) always render.
function pillStyle(id, you) {
  const top = slotOf(id) === 0
  if (top && you) return { backgroundColor: '#16b67c', color: '#ffffff' }
  if (top) return { backgroundColor: '#f59e0b', color: '#ffffff' }
  return { backgroundColor: '#f1f5f9', color: '#94a3b8' }
}
// Row background inline (gradient utilities don't reliably generate for the
// custom `accent` color). #1 gets a light-green tint (dark text stays
// readable); the "flash" comes from the glowing ring + pulse, not a fill.
function rowStyle(you) {
  const base = { height: '48px' }
  if (you && youAtTop.value) base.background = 'linear-gradient(90deg, #c7f2de, #eafbf4)'
  else if (you) base.background = '#ffffff'
  else base.background = 'rgba(255,255,255,0.7)'
  return base
}
// The "you" row rides slightly larger + lifted so it visibly floats above
// the list as it climbs (reads more 3D / dynamic than a flat slide).
function rowTransform(b) {
  const y = slotOf(b.id) * ROW
  return b.you ? `translateY(${y}px) scale(1.05)` : `translateY(${y}px)`
}

// When it lands at #1 the panel flips to the "publish everywhere" scene,
// then slides up through: review responder -> AEO/GEO (AI recommends you).
const flipped = ref(false)
const scene2 = ref(false)   // review responder
const scene3 = ref(false)   // AEO / GEO — AI answers
// Vertical position of the slide track: 0 = posting, 1 = reviews, 2 = AEO/GEO.
const sceneStep = computed(() => (scene3.value ? 2 : scene2.value ? 1 : 0))

// The AI answer engines we make recommend the business by name.
const AI_ENGINES = [
  { name: 'ChatGPT', brand: 'chatgpt' },
  { name: 'Gemini', brand: 'gemini' },
  { name: 'Perplexity', brand: 'perplexity' },
]

const REVIEWS = [
  { name: 'Priya S.', rating: 5, text: 'Amazing service, the whole team was so friendly and quick!', reply: 'Thank you so much, Priya! We loved having you and can\'t wait to welcome you back. 💙', color: '#f59e0b' },
  { name: 'Rahul M.', rating: 5, text: 'Great experience, will definitely be coming again soon.', reply: 'Thanks Rahul! So glad you enjoyed it, see you next time. 🙌', color: '#8b5cf6' },
  { name: 'Ananya K.', rating: 4, text: 'Really good, highly recommend to anyone nearby.', reply: 'You\'re the best, Ananya! Thank you for the kind words and the recommendation. 🙏', color: '#0ea5e9' },
]
let timer
const schedule = (fn, ms) => { timer = setTimeout(fn, ms) }
onMounted(() => {
  const climb = () => {
    const i = order.value.indexOf('you')
    if (i > 0) {
      const next = [...order.value]
      ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
      order.value = next
      schedule(climb, 700)
    } else {
      // reached #1: hold, then flip to the content-publishing scene
      schedule(() => {
        flipped.value = true                 // flip to posting scene
        schedule(() => {
          scene2.value = true                // slide up to review responder
          schedule(() => {
            scene3.value = true              // slide up to AEO/GEO (AI answers)
            schedule(() => {
              // flip back to the ranking FIRST (the AI card rides the back face
              // as it rotates away/hides), then reset the slide track behind it
              // so no posting/review card ever slides back into view.
              flipped.value = false          // flip back to the ranking
              order.value = [...initialOrder] // reset ranking (hidden during the flip)
              schedule(() => {
                scene3.value = false         // snap track back to posting, off-screen behind the hidden back face
                scene2.value = false
                schedule(climb, 500)         // and climb again
              }, 1000)                        // wait for the flip to finish
            }, 7200)                         // AEO/GEO duration
          }, 6800)                           // review-responder duration
        }, 5600)                             // posting duration before the slide
      }, 1300)
    }
  }
  schedule(climb, 600)
})
onUnmounted(() => clearTimeout(timer))

// Platforms the post publishes to on the flip side.
const PLATFORMS_PUB = [
  { label: 'Instagram', brand: 'instagram' },
  { label: 'Google Business', brand: 'gbp' },
  { label: 'Facebook', brand: 'meta' },
  { label: 'Blog', brand: null },
  { label: 'LinkedIn', brand: 'linkedin' },
]

// Multi-color confetti burst for the #1 moment.
const sparkles = [
  { x: '10%', y: '20%', d: '0s', s: 8, c: '#1476e6' }, { x: '84%', y: '14%', d: '0.15s', s: 10, c: '#2ecb8e' },
  { x: '22%', y: '80%', d: '0.3s', s: 7, c: '#f59e0b' }, { x: '90%', y: '66%', d: '0.1s', s: 9, c: '#ec4899' },
  { x: '66%', y: '88%', d: '0.25s', s: 8, c: '#8b5cf6' }, { x: '46%', y: '8%', d: '0.35s', s: 7, c: '#14b8a6' },
  { x: '6%', y: '54%', d: '0.2s', s: 6, c: '#f43f5e' }, { x: '94%', y: '38%', d: '0.4s', s: 8, c: '#1476e6' },
]
</script>

<template>
  <div class="stage select-none">
    <!-- colorful rotating ambient aura -->
    <div aria-hidden class="aura" />
    <div aria-hidden class="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-300/25 via-white/0 to-accent-300/25 blur-3xl" />

    <div class="scene">
      <!-- ===== main tilted panel (the ranking screen) ===== -->
      <div class="panel3d rounded-[26px]">
        <div class="flip-card" :class="{ flipped }">
        <!-- ============ FRONT: Google ranking ============ -->
        <div class="flip-face flip-front relative rounded-[26px] bg-white ring-1 ring-brand-200/70">
          <div class="relative overflow-hidden rounded-[26px]">
          <!-- stylized map backdrop -->
          <svg class="absolute inset-0 h-full w-full" viewBox="0 0 400 470" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <defs><linearGradient id="mbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eff7ff" /><stop offset="1" stop-color="#edf8f3" /></linearGradient></defs>
            <rect width="400" height="470" fill="url(#mbg)" />
            <g stroke="#d9e6f5" stroke-width="9" fill="none" opacity="0.8"><path d="M-20 90 H420" /><path d="M-20 250 H420" /><path d="M-20 400 H420" /><path d="M70 -20 V500" /><path d="M230 -20 V500" /><path d="M330 -20 V500" /></g>
            <g stroke="#e6eefb" stroke-width="4" fill="none"><path d="M-20 165 H420" /><path d="M150 -20 V500" /><path d="M290 -20 V500" /></g>
            <g fill="#e6eefb" opacity="0.7"><rect x="82" y="102" width="52" height="48" rx="4" /><rect x="242" y="102" width="52" height="48" rx="4" /><rect x="82" y="262" width="52" height="48" rx="4" /><rect x="342" y="262" width="46" height="48" rx="4" /></g>
            <g fill="#dff3ea" opacity="0.7"><path d="M300 20 q40 60 -10 120 q-60 20 -60 -60 q10 -70 70 -60z" /></g>
          </svg>
          <div aria-hidden class="absolute inset-0 bg-gradient-to-b from-white/60 via-white/85 to-white" />
          <!-- glossy screen shine -->
          <div aria-hidden class="screen-shine" />

          <div class="relative">
            <!-- realistic Google search bar -->
            <div class="flex items-center gap-3 px-5 pt-4 pb-2.5">
              <BrandLogo name="google" class="h-7 w-7 shrink-0" />
              <div class="search-pill flex flex-1 items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2.5">
                <span class="flex-1 truncate text-[15px] leading-none text-slate-700">dentist near me<span class="s-caret" /></span>
                <span class="text-lg leading-none text-slate-300">×</span>
                <span class="inline-flex h-5 w-5 shrink-0 [&_svg]:h-full [&_svg]:w-full"><BrandLogo name="google-mic" /></span>
                <span class="inline-flex h-5 w-5 shrink-0 [&_svg]:h-full [&_svg]:w-full"><BrandLogo name="google-lens" /></span>
                <span class="mx-0.5 h-5 w-px bg-slate-200" />
                <span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50"><Search class="h-4 w-4 text-brand-600" /></span>
              </div>
            </div>
            <!-- Google result tabs -->
            <div class="flex items-center gap-5 px-5 text-[12px] font-medium text-slate-500 border-b border-slate-100">
              <span class="flex items-center gap-1.5 py-2"><Search class="h-3.5 w-3.5" /> All</span>
              <span class="flex items-center gap-1.5 py-2 -mb-px border-b-2 border-brand-600 font-semibold text-brand-600"><MapPin class="h-3.5 w-3.5" /> Maps</span>
              <span class="py-2 hidden md:inline">Images</span>
              <span class="py-2 hidden md:inline">News</span>
              <span class="ml-auto py-2 text-[11px] text-slate-400">About 2,40,000 results</span>
            </div>

            <!-- live stats strip -->
            <div class="flex gap-2 px-4 pb-3">
              <div class="flex flex-1 items-center gap-2 rounded-xl border px-3 py-2 transition-colors duration-500"
                :style="youAtTop ? { borderColor: '#86e2bf', background: '#eafbf3' } : { borderColor: '#dbeafe', background: '#f5f9ff' }">
                <div class="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white" :style="{ background: youAtTop ? 'linear-gradient(135deg,#34d39e,#0b9566)' : 'linear-gradient(135deg,#3aa0ff,#1476e6)' }">
                  <span class="text-sm font-black leading-none">{{ youRank }}</span>
                  <Crown v-if="youAtTop" class="absolute -top-2 -right-1.5 h-4 w-4 text-amber-400" fill="currentColor" />
                </div>
                <div class="min-w-0">
                  <div class="text-[9px] font-bold uppercase tracking-wide text-slate-400 leading-none">Maps rank</div>
                  <div class="text-xs font-black text-ink leading-tight mt-0.5">{{ youAtTop ? 'Ranked #1' : '#' + youRank }}</div>
                </div>
              </div>
              <div class="flex flex-1 items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white" style="background:#16b67c"><Phone class="h-4 w-4" /></div>
                <div class="min-w-0">
                  <div class="text-[9px] font-bold uppercase tracking-wide text-slate-400 leading-none">Calls / week</div>
                  <div class="text-xs font-black text-ink leading-tight mt-0.5 tabular-nums">{{ calls }} <span style="color:#16b67c">↑</span></div>
                </div>
              </div>
              <div class="hidden sm:flex flex-1 items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white" style="background:#f59e0b"><Star class="h-4 w-4 fill-white" /></div>
                <div class="min-w-0">
                  <div class="text-[9px] font-bold uppercase tracking-wide text-slate-400 leading-none">Reviews</div>
                  <div class="text-xs font-black text-ink leading-tight mt-0.5 tabular-nums">{{ youRating }} <span class="text-slate-400 font-semibold">({{ youReviews }})</span></div>
                </div>
              </div>
            </div>

            <!-- ranked list -->
            <div class="relative px-3 pb-4" :style="{ height: businesses.length * ROW + 'px' }">
              <div v-for="b in businesses" :key="b.id" class="absolute left-3 right-3 rank-row" :style="{ transform: rowTransform(b), zIndex: b.you ? 20 : 10 }">
                <div v-if="b.you" aria-hidden class="you-halo" :style="{ background: youAtTop ? '#22c58a' : '#1e90ff' }" />
                <div class="relative flex items-center gap-3 rounded-2xl px-3 py-2.5 border transition-all duration-500"
                  :class="b.you ? (youAtTop ? 'border-accent-400 ring-2 ring-accent-400 row-glow row-shimmer' : 'border-brand-300 shadow-brand ring-1 ring-brand-200') : 'border-slate-100 backdrop-blur-sm'"
                  :style="rowStyle(b.you)">
                  <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black transition-all duration-500"
                    :style="pillStyle(b.id, b.you)">{{ slotOf(b.id) + 1 }}</div>
                  <div class="relative flex h-8 w-8 shrink-0 items-center justify-center">
                    <template v-if="b.you">
                      <span class="absolute inline-flex h-8 w-8 rounded-full animate-pulse-ring" :style="{ backgroundColor: youAtTop ? '#2ecb8e' : '#1e90ff', opacity: 0.45 }" />
                      <span class="relative flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md" :style="{ background: youAtTop ? 'linear-gradient(135deg,#34d39e,#0b9566)' : 'linear-gradient(135deg,#3aa0ff,#1476e6)' }">
                        <MapPin class="h-4 w-4" :stroke-width="2.6" />
                      </span>
                    </template>
                    <span v-else class="flex h-8 w-8 items-center justify-center rounded-full" :style="{ backgroundColor: b.pin + '1f' }"><MapPin class="h-4 w-4" :style="{ color: b.pin }" /></span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                      <span class="truncate text-sm font-extrabold" :class="b.you ? 'text-ink' : 'text-slate-600'">{{ b.name }}</span>
                      <span v-if="b.you" class="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase text-white transition-colors duration-500" :style="{ backgroundColor: youAtTop ? '#0b9566' : '#1476e6' }">You</span>
                    </div>
                    <div class="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span class="font-bold text-amber-500">{{ b.you ? youRating : b.rating }}</span>
                      <Star class="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span class="tabular-nums">({{ b.you ? youReviews : b.reviews }})</span>
                      <span class="text-slate-300 hidden sm:inline">·</span><span class="truncate hidden sm:inline">{{ b.cat }}</span>
                    </div>
                  </div>
                  <Navigation v-if="!b.you" class="h-4 w-4 shrink-0 text-slate-300" />
                  <TrendingUp v-else class="h-4 w-4 shrink-0 transition-colors duration-500" :style="{ color: youAtTop ? '#0b9566' : '#1476e6' }" />
                </div>
              </div>
              <template v-if="youAtTop">
                <span v-for="(s, i) in sparkles" :key="i" class="sparkle" :style="{ left: s.x, top: s.y, width: s.s + 'px', height: s.s + 'px', animationDelay: s.d, background: `radial-gradient(circle, ${s.c} 0%, transparent 70%)` }" />
              </template>
            </div>
          </div>
          </div>
        </div>

        <!-- ============ BACK: posting card slides out, review card slides in ============ -->
        <div class="flip-face flip-back absolute inset-0 rounded-[26px]">
          <div class="relative h-full overflow-hidden rounded-[26px]">
          <div class="scene-track" :style="{ transform: `translateY(${sceneStep * -100}%)` }">
          <!-- posting card (slides up and out) -->
          <div class="scene-card scene-card-1 overflow-hidden rounded-[26px] bg-white ring-1 ring-brand-200/70">
          <div aria-hidden class="absolute inset-0" style="background:linear-gradient(160deg,#eff5ff,#eafaf3)"></div>
          <div aria-hidden class="absolute -top-14 -right-10 h-44 w-44 rounded-full" style="background:radial-gradient(circle,rgba(147,197,253,0.5),transparent 70%)"></div>
          <div aria-hidden class="absolute -bottom-14 -left-8 h-44 w-44 rounded-full" style="background:radial-gradient(circle,rgba(94,222,170,0.45),transparent 70%)"></div>

          <div v-if="flipped" class="relative h-full flex flex-col">
            <!-- header -->
            <div class="flex items-center gap-2.5 px-5 pt-4 pb-2.5">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-brand" style="background:linear-gradient(135deg,#1476e6,#16b67c)"><Sparkles class="h-5 w-5" /></span>
              <div class="min-w-0 flex-1">
                <div class="text-[15px] font-black text-ink leading-tight">We post for you, on every platform</div>
                <div class="text-[11px] text-slate-500">Our team designs, writes and publishes your content on schedule</div>
              </div>
              <span class="hidden sm:inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold text-brand-700"><Sparkles class="h-3 w-3" /> AI Studio</span>
            </div>

            <div class="relative flex-1 flex items-stretch gap-3 px-4 pb-4 min-h-0">
              <!-- editor card -->
              <div class="relative flex w-1/2 flex-col rounded-2xl border border-slate-200 bg-white shadow-card overflow-hidden">
                <div class="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
                  <span class="h-2 w-2 rounded-full bg-[#ff5f57]" /><span class="h-2 w-2 rounded-full bg-[#febc2e]" /><span class="h-2 w-2 rounded-full bg-[#28c840]" />
                  <span class="ml-1.5 truncate text-[10px] text-slate-400">summer-sale.post</span>
                  <span class="ml-auto flex shrink-0 items-center gap-1 text-[9px] font-bold text-brand-600"><span class="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" /> EDITING</span>
                </div>
                <div class="relative flex-1 p-2.5">
                  <!-- realistic Instagram post preview -->
                  <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <div class="flex items-center gap-2 px-2.5 py-1.5">
                      <span class="h-6 w-6 shrink-0 rounded-full ring-2 ring-rose-400/70" style="background:linear-gradient(135deg,#1476e6,#16b67c)" />
                      <div class="min-w-0 flex-1 leading-tight">
                        <div class="truncate text-[10px] font-bold text-ink">yourbrand</div>
                        <div class="text-[8px] text-slate-400">Sponsored · Just now</div>
                      </div>
                      <span class="text-sm leading-none text-slate-400">···</span>
                    </div>
                    <div class="relative" style="height:110px; background:linear-gradient(135deg,#2f7cf6,#16b67c)">
                      <div class="absolute -right-6 -top-8 h-20 w-20 rounded-full bg-white/15" />
                      <span class="el el-emoji absolute right-3 bottom-3 text-3xl">☀️</span>
                      <div class="el el-kicker absolute left-3 top-2.5 rounded-full bg-white/25 px-2 py-0.5 text-[8px] font-black uppercase tracking-wide text-white">Summer Sale</div>
                      <div class="el el-head absolute left-3 top-7 text-white">
                        <div class="text-2xl font-black leading-none drop-shadow-sm">30% OFF</div>
                        <div class="mt-0.5 text-[9px] font-semibold text-white/90">This week only</div>
                      </div>
                      <div class="el el-badge absolute right-2 top-2 rounded bg-white px-1.5 py-0.5 text-[8px] font-black text-brand-700 shadow">BOOK NOW</div>
                    </div>
                    <div class="flex items-center gap-3 px-2.5 pt-1.5">
                      <Heart class="h-4 w-4 fill-rose-500 text-rose-500" />
                      <MessageCircle class="h-4 w-4 text-slate-700" />
                      <Send class="h-4 w-4 text-slate-700" />
                      <Bookmark class="ml-auto h-4 w-4 text-slate-700" />
                    </div>
                    <div class="px-2.5 pb-2 pt-1">
                      <div class="text-[10px] font-bold text-ink">1,248 likes</div>
                      <div class="el el-cap text-[10px] leading-snug text-slate-600"><span class="font-bold text-ink">yourbrand</span> Beat the heat with our biggest sale yet 🔥 <span class="font-semibold text-brand-600">#summersale #localdeals</span><span class="cap-caret" /></div>
                    </div>
                  </div>
                  <span class="edit-cursor"><MousePointer2 class="h-4 w-4 text-ink" fill="#ffffff" /></span>
                </div>
              </div>

              <!-- publishing card -->
              <div class="relative flex w-1/2 flex-col rounded-2xl border border-slate-200 bg-white shadow-card overflow-hidden">
                <div class="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
                  <Share2 class="h-3.5 w-3.5 text-brand-600" />
                  <span class="text-[10px] font-bold uppercase tracking-wide text-slate-500">Publishing to</span>
                  <span class="ml-auto rounded-full bg-brand-50 px-1.5 py-0.5 text-[9px] font-bold text-brand-600">5 live</span>
                </div>
                <div class="flex flex-1 flex-col gap-1.5 p-2.5">
                  <div v-for="(p, i) in PLATFORMS_PUB" :key="p.label" class="plat relative flex items-center gap-2 overflow-hidden rounded-lg border border-slate-200 bg-white px-2 py-1.5" :style="{ '--d': (2.3 + i * 0.6) + 's' }">
                    <span class="chip-signal" />
                    <span class="h-5 w-5 shrink-0 [&_svg]:h-full [&_svg]:w-full"><BrandLogo v-if="p.brand" :name="p.brand" /><FileText v-else class="text-brand-600" /></span>
                    <span class="flex-1 truncate text-[11px] font-bold text-slate-700">{{ p.label }}</span>
                    <span class="plat-check flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white" style="background:#16b67c"><Check class="h-2.5 w-2.5" :stroke-width="4" /></span>
                  </div>
                  <div class="post-callout mt-2 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-gradient-to-br from-brand-50 to-accent-50 px-3 py-2.5 shadow-sm">
                    <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white" style="background:linear-gradient(135deg,#1476e6,#16b67c)"><Share2 class="h-5 w-5" /></span>
                    <div class="min-w-0">
                      <div class="text-xs font-black leading-tight text-ink">We post for you</div>
                      <div class="text-[10px] font-semibold text-slate-500">on every platform, automatically</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          </div>

          <!-- review responder card (slides up and in) -->
          <div class="scene-card scene-card-2 overflow-hidden rounded-[26px] bg-white ring-1 ring-brand-200/70">
            <div aria-hidden class="absolute inset-0" style="background:linear-gradient(160deg,#eff5ff,#eafaf3)"></div>
            <div v-if="scene2" class="relative h-full flex flex-col">
              <div class="flex items-center gap-2.5 px-5 pt-4 pb-2.5">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-brand" style="background:linear-gradient(135deg,#1476e6,#16b67c)"><MessageSquare class="h-5 w-5" /></span>
                <div class="min-w-0 flex-1">
                  <div class="text-[15px] font-black leading-tight text-ink">We reply to all your reviews</div>
                  <div class="text-[11px] text-slate-500">Manually &amp; automated — in your brand voice</div>
                </div>
                <div class="rr-toggle"><span class="rr-knob" /></div>
              </div>
              <div class="flex-1 space-y-2 overflow-hidden px-4 pb-4">
                <div v-for="(r, i) in REVIEWS" :key="r.name" class="rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
                  <div class="flex items-center gap-2">
                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white" :style="{ background: r.color }">{{ r.name.charAt(0) }}</span>
                    <div class="min-w-0 flex-1">
                      <div class="text-[11px] font-bold leading-tight text-ink">{{ r.name }}</div>
                      <div class="flex items-center gap-0.5"><Star v-for="n in r.rating" :key="n" class="h-2.5 w-2.5 fill-amber-400 text-amber-400" /></div>
                    </div>
                    <BrandLogo name="google" class="h-3.5 w-3.5" />
                  </div>
                  <div class="mt-1 text-[10px] leading-snug text-slate-500">{{ r.text }}</div>
                  <div class="rr-reply mt-1.5 rounded-lg border-l-2 border-brand-400 bg-brand-50/70 px-2 py-1.5" :style="{ '--d': (0.9 + i * 1.1) + 's' }">
                    <div class="mb-0.5 flex items-center gap-1">
                      <Sparkles class="h-2.5 w-2.5 text-brand-500" />
                      <span class="text-[8px] font-bold uppercase tracking-wide text-brand-600">AI reply</span>
                      <span class="ml-auto inline-flex items-center gap-0.5 rounded-full bg-accent-500 px-1.5 py-0.5 text-[8px] font-bold text-white"><Check class="h-2 w-2" :stroke-width="4" /> Replied</span>
                    </div>
                    <div class="text-[10px] leading-snug text-slate-600">{{ r.reply }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- AEO / GEO card — AI engines recommend you by name (slides up and in) -->
          <div class="scene-card scene-card-3 overflow-hidden rounded-[26px] bg-white ring-1 ring-brand-200/70">
            <div aria-hidden class="absolute inset-0" style="background:linear-gradient(160deg,#f2effe,#e9f4ff)"></div>
            <!-- live moving AI backdrop: panning grid + drifting glow + scan sweep -->
            <div aria-hidden class="aeo-grid absolute inset-0"></div>
            <div aria-hidden class="aeo-orb aeo-orb-a absolute h-48 w-48 rounded-full bg-violet-400/25 blur-3xl"></div>
            <div aria-hidden class="aeo-orb aeo-orb-b absolute h-48 w-48 rounded-full bg-brand-400/25 blur-3xl"></div>
            <div aria-hidden class="aeo-scan absolute inset-0"></div>
            <div v-if="scene3" class="relative h-full flex flex-col">
              <!-- header -->
              <div class="flex items-center gap-3 px-5 pt-5 pb-3">
                <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg" style="background:linear-gradient(135deg,#8b5cf6,#1476e6)"><Sparkles class="h-6 w-6" /></span>
                <div class="min-w-0 flex-1">
                  <div class="text-[17px] font-black leading-tight text-ink">We rank you on top AI platforms</div>
                  <div class="text-[12px] text-slate-500">AEO + GEO — ChatGPT, Gemini &amp; Perplexity recommend you</div>
                </div>
                <span class="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-violet-700"><span class="aeo-live-dot" /> Live</span>
              </div>

              <!-- real AI search bar: query typing in -->
              <div class="aeo-el px-4" style="--d:0.15s">
                <div class="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-3.5 py-2.5 shadow-md ring-1 ring-brand-100">
                  <Search class="h-4 w-4 shrink-0 text-violet-500" />
                  <span class="flex-1 truncate text-[13px] font-semibold text-slate-700">best dentist near me<span class="aeo-caret" /></span>
                  <span class="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black text-white shadow-sm" style="background:linear-gradient(135deg,#8b5cf6,#1476e6)">Ask AI</span>
                </div>
              </div>

              <!-- which engines are answering (tabs) -->
              <div class="aeo-el flex items-center gap-2 px-4 pt-3" style="--d:0.45s">
                <span class="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700 shadow-sm">
                  <span class="inline-flex h-4 w-4 shrink-0 items-center justify-center [&_svg]:h-full [&_svg]:w-full"><BrandLogo name="chatgpt" /></span> ChatGPT
                </span>
                <span class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                  <span class="inline-flex h-4 w-4 shrink-0 items-center justify-center [&_svg]:h-full [&_svg]:w-full"><BrandLogo name="gemini" /></span> Gemini
                </span>
                <span class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                  <span class="inline-flex h-4 w-4 shrink-0 items-center justify-center [&_svg]:h-full [&_svg]:w-full"><BrandLogo name="perplexity" /></span> Perplexity
                </span>
              </div>

              <!-- the AI answer, streaming in -->
              <div class="aeo-el px-4 pt-3" style="--d:0.75s">
                <div class="rounded-2xl border border-slate-200 bg-white/95 px-3.5 py-3 shadow-md">
                  <div class="mb-2 flex items-center gap-2">
                    <span class="inline-flex h-5 w-5 shrink-0 items-center justify-center [&_svg]:h-full [&_svg]:w-full"><BrandLogo name="chatgpt" /></span>
                    <span class="text-[12px] font-bold text-ink">Answer</span>
                    <span class="aeo-stream inline-flex items-center gap-0.5"><span class="aeo-dot" /><span class="aeo-dot" /><span class="aeo-dot" /></span>
                    <span class="ml-auto inline-flex items-center gap-1 rounded-full bg-accent-500 px-2 py-0.5 text-[9px] font-black text-white shadow-sm"><Check class="h-2.5 w-2.5" :stroke-width="4" /> Top pick</span>
                  </div>
                  <div class="text-[12.5px] leading-relaxed text-slate-600">
                    For a top-rated dentist nearby, I'd recommend
                    <span class="aeo-name">Your Business</span><sup class="text-[9px] font-bold text-violet-500">1</sup>
                    <span class="inline-flex items-center gap-0.5 align-middle font-bold text-amber-500">4.9<Star class="h-3 w-3 fill-amber-400 text-amber-400" /></span>
                    — loved for friendly, quick service.
                  </div>
                </div>
              </div>

              <!-- sources: you're the cited source across every engine -->
              <div class="aeo-el flex-1 px-4 pb-4 pt-3" style="--d:1.5s">
                <div class="mb-2 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wide text-violet-600"><Quote class="h-3.5 w-3.5" /> Sources · cited across AI</div>
                <div class="flex flex-wrap gap-2">
                  <div v-for="(e, i) in AI_ENGINES" :key="e.name" class="aeo-cite flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm" :style="{ '--d': (1.7 + i * 0.4) + 's' }">
                    <span class="inline-flex h-5 w-5 shrink-0 items-center justify-center [&_svg]:h-full [&_svg]:w-full"><BrandLogo :name="e.brand" /></span>
                    <span class="text-[11px] font-bold text-ink">yourbusiness.com</span>
                    <span class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-500 text-white"><Check class="h-2.5 w-2.5" :stroke-width="4" /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.stage {
  position: relative;
  perspective: 1600px;
  perspective-origin: 55% 46%;
}
.aura {
  position: absolute;
  inset: -14%;
  z-index: -20;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #1476e6, #22d3ee, #2ecb8e, #a78bfa, #f472b6, #1476e6);
  filter: blur(64px);
  opacity: 0.32;
  animation: spinAura 16s linear infinite;
}
@keyframes spinAura { to { transform: rotate(360deg); } }

.search-pill {
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.14);
  transition: box-shadow 0.25s ease;
}
.search-pill:hover { box-shadow: 0 2px 12px rgba(32, 33, 36, 0.22); }
.s-caret {
  display: inline-block; width: 1.5px; height: 15px; margin-left: 2px;
  vertical-align: -2px; background: #5f6368;
  animation: caretBlink 1.1s step-end infinite;
}
@keyframes caretBlink { 50% { opacity: 0; } }
.scene {
  position: relative;
  transform-style: preserve-3d;
  animation: sceneFloat 9s ease-in-out infinite;
}
.stage:hover .scene { animation-play-state: paused; }

.panel3d {
  transform: rotateY(-13deg) rotateX(6deg) rotateZ(-0.5deg);
  transform-style: preserve-3d;
}
/* The flip happens INSIDE the fixed tilt, so the posting (back) card ends at
   the exact same angle + symmetry as the ranking (front) card. Shadow lives
   on the flip card so it turns with it (no static frame left behind). */
.flip-card {
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center;
  border-radius: 26px;
  transition: transform 0.95s cubic-bezier(0.5, 0.05, 0.2, 1);
  box-shadow: 26px 40px 80px -34px rgba(20, 118, 230, 0.4), 0 18px 38px -22px rgba(15, 23, 42, 0.3);
}
.flip-card.flipped { transform: rotateY(180deg); }
.flip-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.flip-front { position: relative; }
.flip-back { transform: rotateY(180deg); }

/* two complete cards on a vertical track: posting card slides up and out,
   review card slides up into frame. The clip lives on the wrapper above,
   so cards swap cleanly inside the frame with nothing sticking out. */
.scene-track { position: absolute; inset: 0; transition: transform 0.85s cubic-bezier(0.65, 0, 0.2, 1); }
.scene-card { position: absolute; left: 0; right: 0; height: 100%; }
.scene-card-1 { top: 0; }
.scene-card-2 { top: 100%; }
.scene-card-3 { top: 200%; }

/* AEO/GEO card: elements rise in, the AI answer types, citations pop in turn */
.aeo-el { opacity: 0; animation: aeoUp 0.55s cubic-bezier(0.34, 1.3, 0.6, 1) var(--d) both; }
@keyframes aeoUp { 0% { opacity: 0; transform: translateY(14px); } 100% { opacity: 1; transform: none; } }
.aeo-name { font-weight: 900; color: #1476e6; background: linear-gradient(transparent 62%, #c9d9ff 62%); padding: 0 1px; border-radius: 2px; }
.aeo-caret { display: inline-block; width: 1.5px; height: 11px; margin-left: 1px; vertical-align: -1px; background: #16b67c; animation: caretBlink 1.05s step-end infinite; }
.aeo-live-dot { display: inline-block; height: 5px; width: 5px; border-radius: 9999px; background: #8b5cf6; box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.6); animation: aeoLive 1.6s ease-out infinite; }
@keyframes aeoLive { 0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.55); } 70%, 100% { box-shadow: 0 0 0 5px rgba(139, 92, 246, 0); } }
.aeo-cite { opacity: 0; animation: aeoCite 0.55s cubic-bezier(0.34, 1.4, 0.6, 1) var(--d) both; }
@keyframes aeoCite { 0% { opacity: 0; transform: translateX(-10px) scale(0.97); } 100% { opacity: 1; transform: none; } }
/* live moving AI backdrop */
.aeo-grid {
  background-image:
    linear-gradient(rgba(139, 92, 246, 0.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 118, 230, 0.10) 1px, transparent 1px);
  background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(120% 90% at 50% 40%, #000 45%, transparent 100%);
  mask-image: radial-gradient(120% 90% at 50% 40%, #000 45%, transparent 100%);
  animation: aeoGrid 4.5s linear infinite;
}
@keyframes aeoGrid { to { background-position: 26px 26px, 26px 26px; } }
.aeo-orb { will-change: transform; }
.aeo-orb-a { top: -34px; right: -30px; animation: aeoOrbA 11s ease-in-out infinite; }
.aeo-orb-b { bottom: -40px; left: -30px; animation: aeoOrbB 13s ease-in-out infinite; }
@keyframes aeoOrbA { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-26px, 30px) scale(1.12); } }
@keyframes aeoOrbB { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(30px, -24px) scale(1.1); } }
.aeo-scan {
  pointer-events: none;
  background: linear-gradient(115deg, transparent 42%, rgba(255, 255, 255, 0.5) 50%, transparent 58%);
  transform: translateX(-100%);
  animation: aeoScan 4.5s ease-in-out infinite;
}
@keyframes aeoScan { 0% { transform: translateX(-100%); } 55%, 100% { transform: translateX(100%); } }
.aeo-dot { display: inline-block; height: 3px; width: 3px; border-radius: 9999px; background: #a78bfa; animation: aeoDot 1s ease-in-out infinite; }
.aeo-dot:nth-child(2) { animation-delay: 0.15s; }
.aeo-dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes aeoDot { 0%, 100% { opacity: 0.3; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-1.5px); } }

@keyframes sceneFloat {
  0%, 100% { transform: translateY(0) rotateY(0deg) rotateX(0deg); }
  50% { transform: translateY(-9px) rotateY(-3deg) rotateX(1deg); }
}

/* floating layers, modest Z depth so the 3D projection keeps them on-screen */
.float-el { position: absolute; }
.layer-rank    { top: -18px;  right: -18px; --tz: 64px; --ry: -7deg; animation: bob 6s ease-in-out infinite; }
.layer-calls   { bottom: -16px; left: -12px; --tz: 74px; --ry: 6deg; animation: bob 7s ease-in-out infinite; animation-delay: -2.2s; }
.layer-reviews { top: 40%;    left: -22px; --tz: 48px; --ry: 9deg; animation: bob 8s ease-in-out infinite; animation-delay: -4s; }

@keyframes bob {
  0%, 100% { transform: translateZ(var(--tz)) rotateY(var(--ry)) translateY(0); }
  50%      { transform: translateZ(var(--tz)) rotateY(var(--ry)) translateY(-9px); }
}

/* glossy diagonal light sweep across the screen */
.screen-shine {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.55) 48%, transparent 56%);
  transform: translateX(-100%);
  animation: shine 5.5s ease-in-out infinite;
}
@keyframes shine { 0% { transform: translateX(-100%); } 55%, 100% { transform: translateX(100%); } }

.rank-row { transition: transform 600ms cubic-bezier(0.34, 1.35, 0.5, 1); will-change: transform; }
/* colored glow behind the "you" card so it reads as lifted / climbing */
.you-halo {
  position: absolute;
  inset: -9px 0;
  border-radius: 22px;
  filter: blur(16px);
  opacity: 0.55;
  z-index: -1;
  animation: haloPulse 1.8s ease-in-out infinite;
}
@keyframes haloPulse {
  0%, 100% { opacity: 0.38; transform: scale(0.985); }
  50% { opacity: 0.72; transform: scale(1.02); }
}
.row-glow { animation: rowGlow 1.5s ease-in-out infinite; }
@keyframes rowGlow {
  0%, 100% { box-shadow: 0 8px 24px -6px rgba(11, 149, 102, 0.55); }
  50% { box-shadow: 0 14px 40px -4px rgba(16, 182, 124, 0.95); }
}
.row-shimmer { position: relative; overflow: hidden; }
.row-shimmer::after {
  content: ''; position: absolute; inset: 0; border-radius: 1rem;
  background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%);
  transform: translateX(-100%); animation: rowsweep 2s ease-in-out infinite; pointer-events: none;
}
@keyframes rowsweep { to { transform: translateX(100%); } }

.sparkle {
  position: absolute; border-radius: 9999px;
  background: radial-gradient(circle, #2ecb8e 0%, rgba(46,203,142,0) 70%);
  animation: sparkle 1.4s ease-in-out infinite; pointer-events: none;
}
@keyframes sparkle { 0%, 100% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.6); opacity: 1; } }

/* ===== back scene: create, edit, publish everywhere ===== */
.el { outline: 2px dashed transparent; outline-offset: 3px; border-radius: 6px; opacity: 0; }
.el-head { animation: elIn 0.5s ease-out 0.3s both; }
.el-kicker { animation: elIn 0.45s ease-out 0.6s both; }
.el-badge { animation: elPop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s both; }
.el-logo { animation: elPop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 1.65s both; }
.el-emoji { animation: elPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.9s both; }
.el-cap { animation: elIn 0.5s ease-out 1.05s both; }
.el-tags { animation: elIn 0.5s ease-out 1.5s both; }
.cap-caret { display: inline-block; width: 1.5px; height: 11px; margin-left: 1px; vertical-align: -1px; background: #94a3b8; animation: caretBlink 1.1s step-end infinite; }
/* platform status: scheduled -> posted */
.plat-st-a { animation: stFadeOut 0.35s ease var(--d) both; }
.plat-st-b { opacity: 0; animation: stFadeIn 0.35s ease var(--d) both; }
@keyframes stFadeOut { 0% { opacity: 1; } 100% { opacity: 0; } }
@keyframes stFadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
.pub-summary { opacity: 0; animation: sumIn 0.5s ease-out 5.7s both; }
.post-callout { animation: calloutIn 0.6s cubic-bezier(0.34, 1.4, 0.6, 1) 0.35s both; }
@keyframes calloutIn { 0% { opacity: 0; transform: translateY(16px) scale(0.92); } 100% { opacity: 1; transform: none; } }

/* review-responder card content animations (the card itself slides via .scene-track) */
.rr-toggle { position: relative; width: 34px; height: 20px; flex-shrink: 0; border-radius: 9999px; background: #cbd5e1; animation: rrToggle 0.5s ease-out 0.55s both; }
.rr-knob { position: absolute; top: 2px; left: 2px; height: 16px; width: 16px; border-radius: 9999px; background: #fff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25); animation: rrKnob 0.5s cubic-bezier(0.34, 1.4, 0.6, 1) 0.55s both; }
@keyframes rrToggle { to { background: #16b67c; } }
@keyframes rrKnob { to { transform: translateX(14px); } }
.rr-reply { opacity: 0; animation: rrReply 0.5s ease-out var(--d) both; }
@keyframes rrReply { 0% { opacity: 0; transform: translateY(10px) scale(0.98); } 100% { opacity: 1; transform: none; } }
@keyframes sumIn { 0% { opacity: 0; transform: translateY(10px) scale(0.97); } 100% { opacity: 1; transform: none; } }
@keyframes elIn {
  0% { opacity: 0; transform: translateY(8px) scale(0.96); outline-color: #1476e6; }
  60% { opacity: 1; transform: translateY(0) scale(1); outline-color: #1476e6; }
  100% { opacity: 1; transform: none; outline-color: transparent; }
}
@keyframes elPop {
  0% { opacity: 0; transform: scale(0.4); outline-color: #1476e6; }
  70% { opacity: 1; transform: scale(1.12); outline-color: #1476e6; }
  100% { opacity: 1; transform: scale(1); outline-color: transparent; }
}
.edit-cursor { position: absolute; left: 0; top: 0; z-index: 5; animation: curMove 2.1s ease-in-out both; }
@keyframes curMove {
  0% { transform: translate(70px, 16px); opacity: 0; }
  12% { opacity: 1; }
  32% { transform: translate(150px, 40px); }
  55% { transform: translate(190px, 24px); }
  80% { transform: translate(40px, 150px); }
  100% { transform: translate(120px, 130px); opacity: 1; }
}
.plat { animation: platLight 0.6s ease-out var(--d) both; }
.plat-check { transform: scale(0); animation: checkPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) var(--d) both; }
@keyframes platLight {
  0% { border-color: #e2e8f0; }
  45% { border-color: #34d39e; box-shadow: 0 8px 20px -6px rgba(22, 197, 138, 0.6); transform: translateX(-3px); }
  100% { border-color: #c9f0dd; box-shadow: 0 2px 8px -4px rgba(22, 197, 138, 0.35); transform: none; }
}
@keyframes checkPop { 0% { transform: scale(0); } 70% { transform: scale(1.3); } 100% { transform: scale(1); } }
/* a data streak that flows across each chip as its post publishes */
.chip-signal {
  position: absolute; top: 50%; left: -30px;
  width: 30px; height: 3px; margin-top: -1.5px; border-radius: 9999px;
  background: linear-gradient(90deg, rgba(47, 124, 246, 0), #2f7cf6);
  opacity: 0; pointer-events: none;
  animation: chipSignal 0.55s ease-in var(--d) both;
}
@keyframes chipSignal {
  0% { left: -30px; opacity: 0; }
  25% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}
.pub-toast { transform: translate(-50%, 24px); opacity: 0; animation: toastIn 0.5s ease-out 4.55s both; }
@keyframes toastIn { 0% { opacity: 0; transform: translate(-50%, 24px); } 100% { opacity: 1; transform: translate(-50%, 0); } }

/* Mobile / tablet: drop all 3D (iOS Safari mishandles 3D flips + backface,
   causing mirrored text and tearing). Flatten the card and cross-fade the
   two sides instead. Desktop keeps the full 3D flip. */
@media (max-width: 1023px) {
  .stage { perspective: none; }
  .scene { transform: none !important; animation: none !important; }
  .panel3d { transform: none !important; transform-style: flat; }
  .flip-card { transform: none !important; transform-style: flat; }
  .flip-face { backface-visibility: visible; -webkit-backface-visibility: visible; transition: opacity 0.5s ease; }
  .flip-back { transform: none !important; opacity: 0; }
  .flip-card.flipped .flip-front { opacity: 0; }
  .flip-card.flipped .flip-back { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .scene, .float-el, .screen-shine, .rank-row, .aura, .row-glow, .row-shimmer::after, .s-caret, .you-halo { animation: none !important; }
}
</style>
