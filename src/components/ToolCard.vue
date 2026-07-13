<script setup>
import { ref } from 'vue'
import { ArrowRight } from 'lucide-vue-next'

defineProps({ tool: { type: Object, required: true } })

// Lightweight mouse-follow 3D tilt (client only; harmless during prerender).
const tiltRef = ref(null)
function onMove(e) {
  const el = tiltRef.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-6px)`
}
function onLeave() {
  if (tiltRef.value) tiltRef.value.style.transform = ''
}
</script>

<template>
  <RouterLink :to="`/tools/${tool.slug}`" class="tool-card group block h-full" @mousemove="onMove" @mouseleave="onLeave">
    <div ref="tiltRef" class="tool-card-inner relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6">
      <span aria-hidden class="card-sheen" />
      <h3 class="pop text-lg font-black leading-snug text-ink transition-colors group-hover:text-brand-600">{{ tool.name }}</h3>
      <p class="pop mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{{ tool.description }}</p>
      <span class="try-btn pop mt-auto pt-5">
        <span class="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2 text-sm font-bold text-white shadow-brand transition-transform group-hover:-translate-y-0.5">
          Try it free <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </span>
    </div>
  </RouterLink>
</template>

<style scoped>
.tool-card { perspective: 1100px; }
.tool-card-inner {
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease;
  /* layered shadow so the card reads as a raised 3D surface at rest */
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 10px 22px -12px rgba(15, 23, 42, 0.18), 0 26px 44px -26px rgba(20, 118, 230, 0.22);
  will-change: transform;
}
.tool-card:hover .tool-card-inner {
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 22px 40px -16px rgba(15, 23, 42, 0.22), 0 40px 70px -30px rgba(20, 118, 230, 0.4);
}

/* content floats above the card face for depth during the tilt */
.pop { transform: translateZ(26px); }
.try-btn { transform: translateZ(42px); }

/* subtle top light so the surface looks dimensional */
.card-sheen {
  position: absolute; inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0) 42%);
  pointer-events: none;
}
</style>
