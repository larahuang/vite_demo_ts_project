import { createI18n } from 'vue-i18n';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOCALE } from './locale';
import ZH_TW from '../lang/zh-TW.json'
import EN_US from '../lang/en-US.json'

type MessageSchema = typeof ZH_TW

const i18n = createI18n<[MessageSchema], LOCALE.ZH_TW | LOCALE.EN_US>({
    locale  : '繁體中文',
    messages: {
        [LOCALE.ZH_TW]: ZH_TW,
        [LOCALE.EN_US]: EN_US,
    },
});
export default i18n
