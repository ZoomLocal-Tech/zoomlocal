<script setup>
// A Fly Agent advert inside a blog article. Fly Agent is our own product (it runs
// a business's Google profile for it), so every article carries three of these:
// "top" under the opening answer, "mid" halfway down, "end" after the article.
// Each links to the Fly Agent landing page with UTM tags naming the article and
// the slot, so the sign-up dashboard can tell which article and which banner
// brought someone in.
//
// The banner is plain markup in the prerendered page, readable with no script.
// The script only adds motion: a short rise when the banner scrolls into view,
// for visitors whose device has not asked for reduced motion.
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'top' }, // 'top' | 'mid' | 'end'
  slug: { type: String, default: '' },
  // An article can give the middle banner its own words, matched to its topic.
  kicker: { type: String, default: '' },
  title: { type: String, default: '' },
  text: { type: String, default: '' },
})

const LANDING = 'https://www.fly-social.com/gbp-growth-agent/'

const href = computed(() => {
  const q = new URLSearchParams({
    utm_source: 'zoomlocal-blog',
    utm_medium: 'banner',
    utm_campaign: props.slug || 'blog',
    utm_content: props.variant,
  })
  return `${LANDING}?${q.toString()}`
})

const COPY = {
  top: {
    kicker: 'For clinics, shops and local businesses',
    title: 'Your Google profile, run for you.',
    text: 'Fly Agent replies to reviews the same day, plans a month of posts and checks your rank every week.',
    cta: 'Start free for 14 days',
    note: 'No card. Set up in 10 minutes.',
  },
  mid: {
    kicker: 'Short on time?',
    title: 'Let Fly Agent keep your Google profile up to date.',
    text: 'It checks your profile every 4 hours, day and night, and nothing big happens without your yes.',
    cta: 'Try Fly Agent free',
    note: '14 days free, no card',
  },
  end: {
    kicker: 'Fly Agent',
    title: 'Stop doing your Google profile by hand.',
    text: 'Fly Agent checks it every 4 hours, replies to reviews the same day in your tone and plans a month of posts. Nothing big happens without your yes.',
    cta: 'Start free for 14 days',
    note: 'No card needed',
  },
}

const copy = computed(() => {
  const base = COPY[props.variant] || COPY.top
  return {
    ...base,
    kicker: props.kicker || base.kicker,
    title: props.title || base.title,
    text: props.text || base.text,
  }
})

const root = ref(null)
const seen = ref(false)
const armed = ref(false)
let observer = null

onMounted(() => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !('IntersectionObserver' in window) || !root.value) return
  armed.value = true
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        seen.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.25 },
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <aside
    ref="root"
    :class="['fa', `fa--${variant}`, { 'fa--armed': armed, 'fa--seen': seen }]"
    :aria-label="`Advert: ${copy.title}`"
  >
    <a :href="href" target="_blank" rel="noopener" class="fa__link">
      <span class="fa__label">Fly Agent</span>
      <span class="fa__glow" aria-hidden="true" />
      <svg class="fa__plane" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M60 6 4 28l18 7 4 19 9-12 13 10L60 6Z" fill="currentColor" opacity=".95" />
        <path d="M22 35 60 6 26 54l-4-19Z" fill="#000" opacity=".12" />
      </svg>
      <span class="fa__body">
        <span class="fa__kicker">{{ copy.kicker }}</span>
        <span class="fa__title">{{ copy.title }}</span>
        <span class="fa__text">{{ copy.text }}</span>
      </span>
      <span class="fa__side">
        <img
          v-if="variant === 'top'"
          src="/fly-agent/fly-agent-logo.png"
          alt="Fly Agent"
          width="180"
          height="60"
          loading="lazy"
          class="fa__logo"
        />
        <span class="fa__cta">{{ copy.cta }} <span class="fa__arrow" aria-hidden="true">→</span></span>
        <span class="fa__note">{{ copy.note }}</span>
      </span>
    </a>
  </aside>
</template>

<style scoped>
.fa { margin: 2.25rem 0; }
.fa__link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  overflow: hidden;
  padding: 1.75rem 1.75rem 1.6rem;
  border-radius: 1.4rem;
  text-decoration: none !important;
  isolation: isolate;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.fa__link:hover { transform: translateY(-2px); }
.fa__link:focus-visible { outline: 3px solid #6d3df5; outline-offset: 3px; }

/* the three looks */
.fa--top .fa__link {
  background: linear-gradient(120deg, #f4efff 0%, #fbf7ff 50%, #fff1e6 100%);
  border: 1px solid #e7e0ff;
  box-shadow: 0 18px 40px -22px rgba(109, 61, 245, 0.45);
  color: #1d1636;
}
.fa--mid .fa__link {
  background: radial-gradient(120% 140% at 85% 15%, #3b2a8f 0%, #1d1636 58%, #130e26 100%);
  color: #fff;
  box-shadow: 0 22px 46px -24px rgba(29, 22, 54, 0.75);
}
.fa--end .fa__link {
  background: linear-gradient(135deg, #6d3df5 0%, #5a2fe0 60%, #4a22c9 100%);
  color: #fff;
  box-shadow: 0 22px 46px -22px rgba(109, 61, 245, 0.65);
}

.fa__label {
  position: absolute;
  top: 0.7rem;
  right: 1rem;
  font: 600 10px/1 Inter, system-ui, sans-serif;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.55;
}
.fa__body { display: flex; flex-direction: column; gap: 0.5rem; flex: 1 1 auto; min-width: 0; }
.fa__kicker {
  font: 700 12px/1.2 Inter, system-ui, sans-serif;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ff8a00;
}
.fa--mid .fa__kicker { color: #ffb35c; }
.fa--end .fa__kicker { color: #ffd7a8; }
.fa__title {
  font: 900 1.6rem/1.15 Inter, system-ui, sans-serif;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
.fa--top .fa__title { color: #1d1636; }
.fa__text { font: 500 0.98rem/1.55 Inter, system-ui, sans-serif; opacity: 0.86; }
.fa--top .fa__text { color: #4a4560; opacity: 1; }

.fa__side { display: flex; flex-direction: column; align-items: center; gap: 0.55rem; flex: 0 0 auto; }
.fa__logo { display: block; width: 150px; height: auto; padding: 6px 12px; border-radius: 12px; background: #fff; box-shadow: 0 6px 16px rgba(29, 22, 54, 0.08); }
.fa__cta {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  font: 700 0.98rem/1 Inter, system-ui, sans-serif;
  background: #6d3df5;
  color: #fff;
  box-shadow: 0 10px 22px -8px rgba(109, 61, 245, 0.6);
}
.fa--mid .fa__cta { background: #ff8a00; box-shadow: 0 10px 22px -8px rgba(255, 138, 0, 0.6); }
.fa--end .fa__cta { background: #fff; color: #5a2fe0; box-shadow: none; }
.fa__note { font: 600 0.78rem/1.2 Inter, system-ui, sans-serif; opacity: 0.7; }
.fa--top .fa__note { color: #6b6585; opacity: 1; }

.fa__plane {
  position: absolute;
  width: 34px;
  height: 34px;
  left: -40px;
  top: 18%;
  color: #6d3df5;
  opacity: 0;
  z-index: -1;
}
.fa--mid .fa__plane, .fa--end .fa__plane { color: #ffffff; }
.fa__glow {
  position: absolute;
  right: -60px;
  bottom: -70px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 138, 0, 0.5) 0%, rgba(255, 138, 0, 0) 70%);
  z-index: -1;
  opacity: 0.55;
}
.fa--top .fa__glow { background: radial-gradient(circle, rgba(109, 61, 245, 0.22) 0%, rgba(109, 61, 245, 0) 70%); }

/* motion, only when the device allows it */
@media (prefers-reduced-motion: no-preference) {
  .fa__plane { animation: fa-fly 7s ease-in-out infinite; animation-delay: 1.2s; }
  .fa__glow { animation: fa-breathe 6s ease-in-out infinite; }
  .fa__cta::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.45) 50%, transparent 70%);
    transform: translateX(-120%);
    animation: fa-shine 3.6s ease-in-out infinite;
  }
  .fa--end .fa__cta::after { background: linear-gradient(110deg, transparent 30%, rgba(109, 61, 245, 0.18) 50%, transparent 70%); }
  .fa__link:hover .fa__arrow { transform: translateX(3px); }
  .fa__arrow { transition: transform 0.2s ease; }
  .fa--armed { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fa--armed.fa--seen { opacity: 1; transform: none; }
}
@keyframes fa-fly {
  0% { transform: translate(0, 0) rotate(8deg); opacity: 0; }
  10% { opacity: 0.35; }
  55% { transform: translate(560px, -30px) rotate(-4deg); opacity: 0.28; }
  70%, 100% { transform: translate(820px, -70px) rotate(-10deg); opacity: 0; }
}
@keyframes fa-breathe {
  0%, 100% { transform: scale(1); opacity: 0.45; }
  50% { transform: scale(1.12); opacity: 0.7; }
}
@keyframes fa-shine {
  0%, 55% { transform: translateX(-120%); }
  85%, 100% { transform: translateX(120%); }
}

@media (max-width: 640px) {
  .fa__link { flex-direction: column; align-items: flex-start; gap: 1.1rem; padding: 1.5rem 1.25rem 1.35rem; }
  .fa__title { font-size: 1.35rem; }
  .fa__kicker { max-width: 78%; }
  .fa__side { align-items: flex-start; }
  .fa__logo { display: none; }
}
</style>
