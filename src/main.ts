import { createApp } from 'vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
import './style.css'
import App from './App.vue'
const app = createApp(App)
app.use(pinia)
app.mount('#app')
