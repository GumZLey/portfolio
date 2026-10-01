import '@/assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

// Fade/slide an element in the first time it scrolls into view.
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return
      e.target.classList.add('in')
      io.unobserve(e.target)
    }),
  { threshold: 0.15 },
)

createApp(App)
  .directive('reveal', {
    mounted(el, { value }) {
      el.classList.add('reveal')
      if (value) el.style.setProperty('--delay', `${value}ms`)
      io.observe(el)
    },
    unmounted: (el) => io.unobserve(el),
  })
  // Subtle 3D tilt toward the cursor.
  .directive('tilt', {
    mounted(el, { value = 10 }) {
      if (reducedMotion || !matchMedia('(pointer: fine)').matches) return
      el.classList.add('tilt')
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * value}deg`)
        el.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * value}deg`)
      })
      el.addEventListener('pointerleave', () => {
        el.style.setProperty('--rx', '0deg')
        el.style.setProperty('--ry', '0deg')
      })
    },
  })
  .mount('#app')
