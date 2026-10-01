<script setup>
import { ref } from 'vue'
import { links } from '@/data/content'
import github from '@/assets/Socials/Github.png'
import linkedin from '@/assets/Socials/Linkedin.png'
import instagram from '@/assets/Socials/Instagram.png'
import facebook from '@/assets/Socials/Facebook.png'

const socials = [
  { name: 'GitHub', href: links.github, icon: github },
  { name: 'LinkedIn', href: links.linkedin, icon: linkedin },
  { name: 'Instagram', href: links.instagram, icon: instagram },
  { name: 'Facebook', href: links.facebook, icon: facebook },
]

const copied = ref(false)
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(links.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    location.href = `mailto:${links.email}` // clipboard blocked: fall back to the mail app
  }
}
</script>

<template>
  <section id="contact" class="relative overflow-hidden border-t border-line py-32">
    <div
      class="pointer-events-none absolute left-1/2 top-0 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]"
    />
    <div class="relative mx-auto max-w-4xl px-4 text-center md:px-8">
      <p v-reveal class="eyebrow">06 · CONTACT</p>
      <h2
        v-reveal="80"
        class="mt-4 text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight"
      >
        Let's build something<br /><span class="font-display text-accent">reliable.</span>
      </h2>
      <p v-reveal="160" class="mx-auto mt-6 max-w-lg text-lg text-muted">
        Open to backend and full-stack opportunities, collaborations, or just a chat about Go.
      </p>

      <div v-reveal="240" class="mt-10 flex flex-wrap justify-center gap-3">
        <button
          class="group flex items-center gap-3 rounded-full bg-fg px-6 py-3.5 font-mono text-bg transition hover:-translate-y-0.5"
          @click="copyEmail"
        >
          {{ links.email }}
          <span class="rounded-full bg-bg/15 px-2 py-0.5 text-xs">{{
            copied ? 'copied ✓' : 'copy'
          }}</span>
        </button>
        <a
          :href="links.cv"
          target="_blank"
          rel="noopener"
          class="rounded-full border border-line px-6 py-3.5 font-medium transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >Get my CV ↗</a
        >
      </div>

      <ul v-reveal="320" class="mt-10 flex justify-center gap-4">
        <li v-for="s in socials" :key="s.name">
          <a
            :href="s.href"
            target="_blank"
            rel="noopener"
            :aria-label="s.name"
            class="grid size-12 place-items-center rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:border-accent"
          >
            <img :src="s.icon" alt="" class="size-6 object-contain" />
          </a>
        </li>
      </ul>
    </div>

    <footer class="mt-24 text-center font-mono text-xs text-muted">
      © {{ new Date().getFullYear() }} Ananda Kongkoed · built with Vue, Tailwind &amp; three.js ·
      press
      <kbd class="rounded border border-line px-1">Ctrl K</kbd>
    </footer>
  </section>
</template>
