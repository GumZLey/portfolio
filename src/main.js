import "@/assets/main.css"
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

library.add(faChevronDown)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
