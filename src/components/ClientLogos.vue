<script setup>
import { computed } from 'vue'

const props = defineProps({ logos: { type: Array, required: true } })

const half = computed(() => Math.ceil(props.logos.length / 2))
const rowA = computed(() => props.logos.slice(0, half.value))
const rowB = computed(() => props.logos.slice(half.value))
</script>

<template>
  <div class="lg-wrap">
    <div class="lg-row">
      <div class="lg-track lg-left">
        <template v-for="pass in 2" :key="pass">
          <div v-for="(logo, i) in rowA" :key="pass + '-' + i" class="lg-card lg-tilt-l">
            <img :src="logo" alt="ZoomLocal client logo" loading="lazy" />
          </div>
        </template>
      </div>
    </div>
    <div class="lg-row">
      <div class="lg-track lg-right">
        <template v-for="pass in 2" :key="pass">
          <div v-for="(logo, i) in rowB" :key="pass + '-' + i" class="lg-card lg-tilt-r">
            <img :src="logo" alt="ZoomLocal client logo" loading="lazy" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lg-wrap { display: flex; flex-direction: column; gap: 20px; }

.lg-row {
  overflow: hidden;
  padding: 20px 0;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
}
.lg-track { display: flex; gap: 22px; width: max-content; will-change: transform; }
.lg-left { animation: lgLeft 46s linear infinite; }
.lg-right { animation: lgRight 46s linear infinite; }
.lg-row:hover .lg-track { animation-play-state: paused; }
@keyframes lgLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes lgRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }

.lg-card {
  flex: 0 0 auto;
  width: 158px; height: 88px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  /* layered shadow so each tile reads as a raised 3D surface */
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 12px 26px -16px rgba(15, 23, 42, 0.28), 0 26px 44px -28px rgba(20, 118, 230, 0.2);
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease;
}
.lg-tilt-l { transform: perspective(780px) rotateY(-17deg); }
.lg-tilt-r { transform: perspective(780px) rotateY(17deg); }

.lg-card:hover {
  transform: perspective(780px) rotateY(0deg) translateZ(28px) scale(1.06);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 26px 50px -18px rgba(20, 118, 230, 0.45);
  z-index: 3;
}

.lg-card img {
  max-height: 48px;
  max-width: 76%;
  width: auto;
  object-fit: contain;
  filter: saturate(1.02);
}

@media (max-width: 640px) {
  .lg-card { width: 130px; height: 76px; }
  .lg-card img { max-height: 40px; }
}

@media (prefers-reduced-motion: reduce) {
  .lg-left, .lg-right { animation: none; }
}
</style>
