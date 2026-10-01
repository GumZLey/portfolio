import { ref } from 'vue'

// Skill / graph node id to pulse (set when a hero node is clicked).
export const highlight = ref(null)
export const paletteOpen = ref(false)

export const theme = ref(document.documentElement.dataset.theme)
export function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  try {
    localStorage.setItem('theme', theme.value)
  } catch {
    // storage blocked: theme still applies for this visit
  }
}

export function goTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
