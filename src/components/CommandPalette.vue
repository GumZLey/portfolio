<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { links, sections } from '@/data/content'
import { goTo, paletteOpen, toggleTheme } from '@/state'

const dialog = ref(null)
const input = ref(null)
const query = ref('')
const index = ref(0)

const open = (url) => window.open(url, '_blank', 'noopener')
const commands = [
  { label: 'Home', hint: 'Go to', run: () => goTo('top') },
  ...sections.map((s) => ({ label: s.label, hint: 'Go to', run: () => goTo(s.id) })),
  {
    label: 'Copy email',
    hint: links.email,
    run: () => navigator.clipboard?.writeText(links.email),
  },
  { label: 'Get CV', hint: 'Google Drive', run: () => open(links.cv) },
  { label: 'GitHub', hint: 'Open', run: () => open(links.github) },
  { label: 'LinkedIn', hint: 'Open', run: () => open(links.linkedin) },
  { label: 'Toggle theme', hint: 'Light / dark', run: toggleTheme },
]
const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  return q ? commands.filter((c) => `${c.hint} ${c.label}`.toLowerCase().includes(q)) : commands
})
watch(query, () => (index.value = 0))

watch(paletteOpen, async (isOpen) => {
  if (isOpen) {
    query.value = ''
    dialog.value.showModal()
    await nextTick()
    input.value.focus()
  } else if (dialog.value.open) dialog.value.close()
})

function run(cmd) {
  paletteOpen.value = false
  cmd?.run()
}
function onKey(e) {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    const n = results.value.length
    index.value = (index.value + (e.key === 'ArrowDown' ? 1 : -1) + n) % n
  } else if (e.key === 'Enter') run(results.value[index.value])
}

const onGlobalKey = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    paletteOpen.value = !paletteOpen.value
  }
}
onMounted(() => addEventListener('keydown', onGlobalKey))
onBeforeUnmount(() => removeEventListener('keydown', onGlobalKey))
</script>

<template>
  <!-- native <dialog>: focus trap, Esc to close, and backdrop for free -->
  <dialog
    ref="dialog"
    class="palette m-auto mt-[15vh] w-[min(560px,calc(100%-2rem))] rounded-2xl border border-line bg-surface p-0 text-fg shadow-2xl"
    aria-label="Command palette"
    @close="paletteOpen = false"
    @click.self="paletteOpen = false"
  >
    <div class="flex items-center gap-3 border-b border-line px-4">
      <span class="font-mono text-accent">&gt;</span>
      <input
        ref="input"
        v-model="query"
        class="w-full bg-transparent py-4 outline-none placeholder:text-muted"
        placeholder="Type a command or section…"
        role="combobox"
        aria-controls="palette-list"
        :aria-activedescendant="`cmd-${index}`"
        aria-expanded="true"
        @keydown="onKey"
      />
      <kbd class="rounded border border-line px-1.5 font-mono text-[10px] text-muted">ESC</kbd>
    </div>
    <ul id="palette-list" role="listbox" class="max-h-80 overflow-y-auto p-2">
      <li
        v-for="(c, i) in results"
        :id="`cmd-${i}`"
        :key="c.label"
        role="option"
        :aria-selected="i === index"
        class="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5"
        :class="i === index ? 'bg-accent/15 text-accent' : ''"
        @mousemove="index = i"
        @click="run(c)"
      >
        <span>{{ c.label }}</span>
        <span class="font-mono text-xs text-muted">{{ c.hint }}</span>
      </li>
      <li v-if="!results.length" class="px-3 py-6 text-center text-sm text-muted">No matches</li>
    </ul>
  </dialog>
</template>

<style scoped>
.palette::backdrop {
  background: rgb(0 0 0 / 0.5);
  backdrop-filter: blur(4px);
}
</style>
