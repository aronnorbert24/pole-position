import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import './style.css'
import router from './router/router.ts'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

pinia.use(piniaPluginPersistedState)

app.mount('#app')
