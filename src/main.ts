import { createApp } from 'vue'
import router from './router' 
import { createPinia } from 'pinia'
import { pageTitle } from 'vue-page-title'
const pinia = createPinia()
import './style.css'
import App from './App.vue'
const app = createApp(App)
    app.use(pinia)
    app.use(router) 
    app.use(pageTitle({router }))
app.mount('#app')
