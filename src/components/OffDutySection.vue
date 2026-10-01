<script setup>
import { computed, ref } from 'vue'
import { photos } from '@/data/content'

const tilts = [-5, 4, -2, 6]
const order = ref(photos.map((_, i) => i)) // order[0] is the top card
const drag = ref({ x: 0, y: 0, active: false })
const flying = ref(false)
const top = computed(() => photos[order.value[0]])

let start = { x: 0, y: 0 }
function down(e) {
  if (flying.value) return
  e.currentTarget.setPointerCapture(e.pointerId)
  start = { x: e.clientX, y: e.clientY }
  drag.value = { x: 0, y: 0, active: true }
}
function move(e) {
  if (!drag.value.active) return
  drag.value.x = e.clientX - start.x
  drag.value.y = e.clientY - start.y
}
function up() {
  if (!drag.value.active) return
  const { x } = drag.value
  drag.value.active = false
  // A small move counts as a tap: flip to the next photo as well.
  if (Math.abs(x) > 90 || Math.abs(x) < 5) next(Math.sign(x) || 1)
  else drag.value = { x: 0, y: 0, active: false }
}
function next(dir = 1) {
  flying.value = true
  drag.value = { x: dir * 600, y: -40, active: false }
  setTimeout(() => {
    order.value.push(order.value.shift())
    drag.value = { x: 0, y: 0, active: false }
    flying.value = false
  }, 320)
}

function style(photoIndex) {
  const depth = order.value.indexOf(photoIndex)
  const base = `rotate(${tilts[photoIndex]}deg)`
  if (depth !== 0) {
    return {
      zIndex: 10 - depth,
      transform: `${base} translateY(${depth * 10}px) scale(${1 - depth * 0.04})`,
    }
  }
  const { x, y, active } = drag.value
  return {
    zIndex: 20,
    transform: `translate(${x}px, ${y}px) rotate(${tilts[photoIndex] + x / 18}deg)`,
    transition: active ? 'none' : undefined,
    opacity: Math.abs(x) > 300 ? 0 : 1,
  }
}
</script>

<template>
  <section id="offduty" class="overflow-hidden py-28">
    <div class="mx-auto grid max-w-6xl items-center gap-16 px-4 md:grid-cols-2 md:px-8">
      <div>
        <p v-reveal class="eyebrow">05 · OFF-DUTY</p>
        <h2 v-reveal="80" class="section-title mt-3">When the terminal's closed</h2>
        <p v-reveal="160" class="mt-6 max-w-md text-lg leading-relaxed text-muted">
          Basketball, the driving range, and long walks with no notifications. Team sports taught me
          more about communication than any group project did.
        </p>
        <div v-reveal="240" class="mt-8 flex items-center gap-4">
          <button
            class="rounded-full border border-line px-5 py-2.5 text-sm transition hover:border-accent hover:text-accent"
            @click="next()"
          >
            Next photo →
          </button>
          <p class="font-mono text-xs text-muted" aria-live="polite">{{ top.caption }}</p>
        </div>
      </div>

      <div v-reveal class="relative mx-auto aspect-[3/4] w-72 select-none sm:w-80">
        <figure
          v-for="(p, i) in photos"
          :key="p.src"
          class="card absolute inset-0 overflow-hidden rounded-3xl border-4 border-surface bg-surface shadow-2xl"
          :class="order[0] === i ? 'cursor-grab active:cursor-grabbing' : ''"
          :style="style(i)"
          @pointerdown="order[0] === i && down($event)"
          @pointermove="move"
          @pointerup="up"
          @pointercancel="up"
        >
          <img
            :src="p.src"
            :alt="p.caption"
            class="size-full object-cover"
            draggable="false"
            loading="lazy"
          />
        </figure>
        <p class="absolute -bottom-10 inset-x-0 text-center font-mono text-xs text-muted">
          drag or tap the photo
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  touch-action: pan-y;
  transition:
    transform 0.32s cubic-bezier(0.2, 0.7, 0.2, 1),
    opacity 0.32s;
}
</style>
