import { createI18n } from 'vue-i18n'
import zh from '../lang/zh-TW.json'
import en from '../lang/en-US.json'

type MessageSchema = typeof zh

const i18n = createI18n<[MessageSchema], 'zh-TW' | 'en-US'>({
  legacy: false, 
  locale: 'zh-TW',
  fallbackLocale: 'zh-TW',
  globalInjection: true,
  messages: {
    'zh-TW': zh,
    'en-US': en
  }
})

export default i18n
