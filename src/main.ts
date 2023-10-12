import { createApp } from 'vue'
import router from './router' 
import { createPinia } from 'pinia'
import { pageTitle } from 'vue-page-title'
import i18n from './plugins/i18n'
const pinia = createPinia()
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(pinia)
app.use(router) 
app.use(pageTitle({ router }))
app.use(i18n) 
app.mount('#app')
