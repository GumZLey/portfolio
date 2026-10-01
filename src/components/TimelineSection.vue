<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { timeline } from '@/data/content'

const list = ref(null)
const fill = ref(0)
let frame = 0

// The line fills as the list scrolls past the middle of the screen.
const onScroll = () => {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    const r = list.value.getBoundingClientRect()
    fill.value = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height))
  })
}
onMounted(() => {
  addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => removeEventListener('scroll', onScroll))
</script>

<template>
  <section id="journey" class="mx-auto max-w-4xl px-4 py-28 md:px-8">
    <p v-reveal class="eyebrow">03 · JOURNEY</p>
    <h2 v-reveal="80" class="section-title mt-3">How I got here</h2>

    <div ref="list" class="relative mt-14">
      <div class="absolute bottom-0 left-3 top-0 w-px bg-line md:left-1/2">
        <div
          class="w-full origin-top bg-gradient-to-b from-accent to-cyan"
          :style="{ height: fill * 100 + '%' }"
        />
      </div>

      <ol class="space-y-12 pl-10 md:pl-0">
        <li
          v-for="(item, i) in timeline"
          :key="item.title"
          v-reveal
          class="relative md:w-1/2"
          :class="i % 2 ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right'"
        >
          <span
            class="absolute top-1.5 -left-[2.1rem] size-3.5 rounded-full border-2 border-bg ring-2"
            :class="[
              item.current ? 'bg-cyan ring-cyan/40 animate-pulse' : 'bg-accent ring-accent/30',
              i % 2 ? 'md:-left-[0.45rem]' : 'md:left-auto md:-right-[0.45rem]',
            ]"
          />
          <p class="font-mono text-sm" :class="item.current ? 'text-cyan' : 'text-accent'">
            {{ item.when }}
          </p>
          <h3 class="mt-1 text-xl font-bold">{{ item.title }}</h3>
          <p class="mt-2 text-muted">{{ item.body }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
