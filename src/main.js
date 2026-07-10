import './assets/main.css'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'

// v-reveal: fades + slides an element in the first time it scrolls into view.
// The mounted hook only runs in the browser, so SSG prerender is unaffected.
const revealDirective = {
  mounted(el, binding) {
    if (typeof IntersectionObserver === 'undefined') {
      el.style.opacity = '1'
      return
    }
    const delay = (binding.value || 0) * 100
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.transition = 'opacity 700ms ease-out, transform 700ms ease-out'
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, delay)
          obs.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )
    observer.observe(el)
    el._revealObserver = observer
  },
  unmounted(el) {
    el._revealObserver?.disconnect()
  },
}

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to) {
      if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
      return { top: 0 }
    },
  },
  ({ app }) => {
    app.directive('reveal', revealDirective)
  }
)
