<script setup>
import { skillGroups } from '@/data/content'
import { highlight } from '@/state'
</script>

<template>
  <section id="skills" class="relative overflow-hidden py-28">
    <div class="mx-auto max-w-6xl px-4 md:px-8">
      <p v-reveal class="eyebrow">02 · SKILLS</p>
      <h2 v-reveal="80" class="section-title mt-3">The stack I reach for</h2>

      <div class="mt-12 grid gap-6 md:grid-cols-2">
        <div
          v-for="(group, gi) in skillGroups"
          :key="group.name"
          v-reveal="gi * 100"
          class="rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur"
          :class="gi === 2 ? 'md:col-span-2' : ''"
        >
          <h3 class="font-mono text-sm text-muted">{{ group.name }}</h3>
          <ul class="mt-5 flex flex-wrap gap-3">
            <li
              v-for="s in group.skills"
              :key="s.id"
              class="skill flex items-center gap-2.5 rounded-2xl border border-line bg-bg px-4 py-3 transition hover:-translate-y-1 hover:border-accent/60"
              :class="[
                s.level ? 'w-full border-cyan/50 bg-cyan/10 py-5 sm:w-auto sm:min-w-64' : '',
                highlight === s.id ? 'pulse' : '',
              ]"
            >
              <img
                v-if="s.icon"
                :src="s.icon"
                alt=""
                class="size-7 rounded-md bg-white object-contain p-0.5"
                loading="lazy"
              />
              <span
                v-else
                class="grid size-7 place-items-center rounded-lg font-mono text-xs font-bold"
                :class="s.id === 'go' ? 'bg-cyan text-bg' : 'bg-fg/10'"
                >{{ s.id === 'go' ? 'Go' : 'JS' }}</span
              >
              <span class="font-medium" :class="s.level ? 'text-xl' : ''">{{ s.name }}</span>
              <span
                v-if="s.level"
                class="ml-auto rounded-full bg-cyan px-2.5 py-0.5 font-mono text-[11px] font-semibold text-bg"
                >{{ s.level }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pulse {
  border-color: var(--cyan);
  animation: pulse 0.9s ease-out 3;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--cyan) 60%, transparent);
  }
  100% {
    box-shadow: 0 0 0 16px transparent;
  }
}
</style>
