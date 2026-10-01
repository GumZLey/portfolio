<script setup>
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { links } from '@/data/content'
import { goTo, highlight } from '@/state'

// three.js lands in its own chunk, loaded after first paint.
const HeroGraph = defineAsyncComponent(() => import('./HeroGraph.vue'))

const roles = ['Backend Engineer', 'Go Developer', 'Full-stack Builder', 'Application Developer']
const typed = ref(roles[0])
let timer

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  let r = 0
  let i = roles[0].length
  let deleting = true
  const tick = () => {
    const word = roles[r]
    i += deleting ? -1 : 1
    typed.value = word.slice(0, i)
    let wait = deleting ? 40 : 80
    if (deleting && i === 0) {
      deleting = false
      r = (r + 1) % roles.length
    } else if (!deleting && i === roles[r].length) {
      deleting = true
      wait = 2200
    }
    timer = setTimeout(tick, wait)
  }
  timer = setTimeout(tick, 2200)
})
onBeforeUnmount(() => clearTimeout(timer))

let pulseTimer
function onSelect(id) {
  goTo('skills')
  highlight.value = id
  clearTimeout(pulseTimer)
  pulseTimer = setTimeout(() => (highlight.value = null), 2600)
}
</script>

<template>
  <section id="top" class="hero relative h-svh min-h-[560px] overflow-hidden text-white">
    <HeroGraph @select="onSelect" />

    <!-- keep text readable over the graph without blocking pointer events -->
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07070c] via-transparent to-transparent md:bg-gradient-to-r md:from-[#07070c]/90 md:via-[#07070c]/30"
    />

    <div
      class="pointer-events-none relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-24 md:justify-center md:px-8 md:pb-0"
    >
      <p class="eyebrow">&gt; whoami</p>
      <h1 class="mt-3 font-display text-[clamp(4rem,13vw,10rem)] leading-[0.9] tracking-tight">
        ANANDA
      </h1>
      <p class="mt-2 text-lg tracking-[0.35em] text-white/60 md:text-xl">KONGKOED</p>
      <p class="mt-6 h-8 font-mono text-xl md:text-2xl" aria-live="off">
        <span class="text-[#38d6f5]">{{ typed }}</span
        ><span class="caret">▍</span>
      </p>
      <p class="mt-4 max-w-md text-white/70">
        I design and build reliable backend systems in Go, and I can ship the frontend too.
        Application Developer at T.C.C Technology.
      </p>
      <div class="pointer-events-auto mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          class="rounded-full bg-[#fd7e14] px-6 py-3 font-medium text-black transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_#fd7e14]"
          @click.prevent="goTo('projects')"
          >View projects</a
        >
        <a
          :href="links.cv"
          target="_blank"
          rel="noopener"
          class="rounded-full border border-white/25 px-6 py-3 font-medium transition hover:-translate-y-0.5 hover:bg-white/10"
          >Get my CV ↗</a
        >
      </div>
      <p class="mt-10 hidden font-mono text-xs text-white/40 md:block">
        ↳ move your cursor across the graph · click a node to jump to that skill
      </p>
    </div>

    <button
      class="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/50 hover:text-white"
      aria-label="Scroll to About"
      @click="goTo('about')"
    >
      <svg viewBox="0 0 24 24" class="size-7" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  </section>
</template>

<style scoped>
.hero {
  background:
    radial-gradient(60% 60% at 70% 45%, rgb(56 214 245 / 0.12), transparent 70%),
    radial-gradient(40% 40% at 30% 70%, rgb(253 126 20 / 0.1), transparent 70%), #07070c;
}
.caret {
  animation: blink 1s steps(1) infinite;
  color: #fd7e14;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
