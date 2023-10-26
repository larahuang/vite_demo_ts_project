import { createI18n } from 'vue-i18n'
import zh from '../lang/zh-TW.json'
import en from '../lang/en-US.json'

type MessageSchema = typeof zh

const i18n = createI18n<[MessageSchema], '繁體中文' | 'English'>({
    legacy         : false, // 要把 legacy 設為 false，才可以使用 Composition API
    locale         : '繁體中文',
    fallbackLocale : '繁體中文',
    globalInjection: true,
    messages       : {
        '繁體中文'   : zh,
        'English': en
    }
})

export default i18n
