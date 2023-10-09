import { createApp } from 'vue'
import router from './router' 
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import { pageTitle } from 'vue-page-title'
const pinia = createPinia()

import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)
    app.use(pinia)
    app.use(router)    
    app.use(pageTitle({ router }))
    app.use(ElementPlus)
app.mount('#app')
