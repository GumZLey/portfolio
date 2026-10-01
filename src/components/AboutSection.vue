<script setup>
import profile from '@/assets/photos/profile.jpg'

const facts = [
  ['Role', 'Application Developer @ T.C.C Technology'],
  ['Main language', 'Go'],
  ['Education', 'B.Eng. Computer Engineering, Mahidol University'],
  ['Graduating', '6 October 2026'],
  ['Speaks', 'Thai, English'],
]
</script>

<template>
  <section
    id="about"
    class="mx-auto grid max-w-6xl items-center gap-12 px-4 py-28 md:grid-cols-[5fr_6fr] md:px-8"
  >
    <div v-reveal class="relative mx-auto w-full max-w-sm">
      <div
        class="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/40 to-cyan/40 blur-2xl"
      />
      <img
        v-tilt="14"
        :src="profile"
        alt="Portrait of Ananda Kongkoed"
        class="relative aspect-[4/5] w-full rounded-[2rem] border border-line object-cover object-[45%_center] shadow-2xl"
        loading="lazy"
      />
      <span
        class="absolute -bottom-4 -right-2 rounded-full border border-line bg-surface px-4 py-2 font-mono text-xs shadow-lg"
      >
        <span class="mr-1.5 inline-block size-2 animate-pulse rounded-full bg-green-500" />currently
        shipping Go
      </span>
    </div>

    <div>
      <p v-reveal class="eyebrow">01 · ABOUT</p>
      <h2 v-reveal="80" class="section-title mt-3">
        Backend at heart.<br /><span class="text-muted">Full-stack by habit.</span>
      </h2>
      <div v-reveal="160" class="mt-6 space-y-4 text-lg leading-relaxed text-muted">
        <p>
          I'm Ananda (Ley), a Computer Engineering graduate from Mahidol University and an
          Application Developer at T.C.C Technology, where I started as an intern. My day-to-day is
          backend work: designing services, data models, and APIs, mostly in Go.
        </p>
        <p>
          Before settling on the backend I tried a bit of everything: machine learning, game dev,
          embedded systems, and plenty of frontend. So I'm comfortable owning a feature end to end,
          from the database schema to the last pixel.
        </p>
      </div>
      <dl v-reveal="240" class="mt-8 divide-y divide-line border-y border-line">
        <div v-for="[k, v] in facts" :key="k" class="flex justify-between gap-6 py-3 text-sm">
          <dt class="font-mono text-muted">{{ k }}</dt>
          <dd class="text-right font-medium">{{ v }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
