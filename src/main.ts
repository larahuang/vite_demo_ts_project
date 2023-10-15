import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zh from 'element-plus/dist/locale/zh-tw'
import i18n from './plugins/i18n'
import { pageTitle } from 'vue-page-title'
const pinia = createPinia()

import 'element-plus/dist/index.css'
import '@/assets/scss/all.scss'
import App from './App.vue'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(pageTitle({ router }))
app.use(ElementPlus, { locale: zh })
app.use(i18n)
app.mount('#app')
