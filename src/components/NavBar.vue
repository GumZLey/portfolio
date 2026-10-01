<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { sections } from '@/data/content'
import { goTo, paletteOpen, theme, toggleTheme } from '@/state'

const active = ref('')
const progress = ref(0)
const scrolled = ref(false)
const isMac = /Mac|iPhone|iPad/.test(navigator.platform)

let io
let frame = 0
const onScroll = () => {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight
    progress.value = max > 0 ? scrollY / max : 0
    scrolled.value = scrollY > 40
  })
}

onMounted(() => {
  // A section is "active" while it crosses the middle of the viewport.
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && (active.value = e.target.id)),
    { rootMargin: '-50% 0px -50% 0px' },
  )
  sections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) io.observe(el)
  })
  addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  io?.disconnect()
  removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition-colors duration-300"
    :class="scrolled ? 'bg-bg/70 backdrop-blur-xl border-b border-line' : 'text-white'"
  >
    <div
      class="absolute left-0 top-0 h-0.5 bg-gradient-to-r from-accent to-cyan"
      :style="{ width: progress * 100 + '%' }"
    />
    <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
      <a href="#top" class="font-display text-2xl" @click.prevent="goTo('top')">Ananda</a>

      <ul class="hidden items-center gap-1 md:flex">
        <li v-for="s in sections" :key="s.id">
          <a
            :href="'#' + s.id"
            class="rounded-full px-3 py-1.5 text-sm transition-colors"
            :class="active === s.id ? 'bg-accent/15 text-accent' : 'opacity-70 hover:opacity-100'"
            @click.prevent="goTo(s.id)"
            >{{ s.label }}</a
          >
        </li>
      </ul>

      <div class="flex items-center gap-2">
        <button
          class="flex items-center gap-2 rounded-full border border-current/20 px-3 py-1.5 font-mono text-xs opacity-80 hover:opacity-100"
          aria-label="Open command palette"
          @click="paletteOpen = true"
        >
          <span class="md:hidden">Menu</span>
          <kbd class="hidden md:inline">{{ isMac ? '⌘' : 'Ctrl' }} K</kbd>
        </button>
        <button
          class="grid size-9 place-items-center rounded-full border border-current/20 opacity-80 hover:opacity-100"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <svg
            v-if="theme === 'dark'"
            viewBox="0 0 24 24"
            class="size-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
            />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            class="size-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>
