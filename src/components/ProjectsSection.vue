<script setup>
import { computed, ref } from 'vue'
import { earlyWork, filters, projects } from '@/data/content'

const filter = ref('All')
const shown = computed(() =>
  filter.value === 'All' ? projects : projects.filter((p) => p.tags.includes(filter.value)),
)
</script>

<template>
  <section id="projects" class="mx-auto max-w-6xl px-4 py-28 md:px-8">
    <p v-reveal class="eyebrow">04 · PROJECTS</p>
    <div class="mt-3 flex flex-wrap items-end justify-between gap-6">
      <h2 v-reveal="80" class="section-title">Things I've built</h2>
      <div v-reveal="160" class="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        <button
          v-for="f in filters"
          :key="f"
          class="rounded-full border px-4 py-1.5 text-sm transition"
          :class="
            f === filter
              ? 'border-accent bg-accent text-white'
              : 'border-line hover:border-accent/60'
          "
          :aria-pressed="f === filter"
          @click="filter = f"
        >
          {{ f }}
        </button>
      </div>
    </div>

    <TransitionGroup tag="div" name="card" class="relative mt-12 grid gap-6 md:grid-cols-2">
      <article
        v-for="p in shown"
        :key="p.name"
        v-tilt="6"
        class="group overflow-hidden rounded-3xl border border-line bg-surface transition-shadow hover:shadow-[0_20px_60px_-20px_var(--accent)]"
      >
        <div class="relative aspect-[16/9] overflow-hidden bg-bg">
          <img
            :src="p.image"
            :alt="`${p.name} screenshot`"
            class="size-full object-cover object-top transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <span
            v-if="p.status"
            class="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 font-mono text-xs text-white backdrop-blur"
            >● {{ p.status }}</span
          >
        </div>
        <div class="p-6">
          <div class="flex items-start justify-between gap-4">
            <h3 class="text-2xl font-bold">{{ p.name }}</h3>
            <a
              :href="p.link"
              target="_blank"
              rel="noopener"
              class="shrink-0 rounded-full border border-line px-3 py-1 font-mono text-xs transition hover:border-accent hover:text-accent"
              :aria-label="`${p.name} on GitHub`"
              >GitHub ↗</a
            >
          </div>
          <p class="mt-3 leading-relaxed text-muted">{{ p.summary }}</p>
          <ul class="mt-5 flex flex-wrap gap-2">
            <li
              v-for="t in p.stack"
              :key="t"
              class="rounded-md bg-fg/5 px-2 py-1 font-mono text-xs"
            >
              {{ t }}
            </li>
          </ul>
        </div>
      </article>
    </TransitionGroup>

    <div class="mt-20">
      <h3 v-reveal class="font-mono text-sm text-muted">
        EARLY WORK · The Odin Project &amp; Frontend Mentor
      </h3>
      <ul class="early mt-5 flex snap-x gap-4 overflow-x-auto pb-4">
        <li v-for="w in earlyWork" :key="w.name" class="w-56 shrink-0 snap-start">
          <a :href="w.link" target="_blank" rel="noopener" class="group block">
            <div class="aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface">
              <img
                :src="w.image"
                :alt="`${w.name} screenshot`"
                class="size-full object-cover object-top transition duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <p class="mt-2 text-sm font-medium group-hover:text-accent">{{ w.name }}</p>
            <p class="font-mono text-xs text-muted">{{ w.from }}</p>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.card-enter-active,
.card-leave-active {
  transition:
    opacity 0.35s,
    transform 0.35s;
}
.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.card-leave-active {
  position: absolute;
}
.card-move {
  transition: transform 0.45s ease;
}
.early {
  scrollbar-width: thin;
}
</style>
