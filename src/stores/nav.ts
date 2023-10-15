import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useI18n } from "vue-i18n";
import { homeMenuType, langListType } from "../types/all";

export const useNavbarStore = defineStore('navbar', () => {
    const { locale } = useI18n();
    const i18n = useI18n();

    const i18nHome = computed(() => i18n.t("nav_menu.home"))
    const i18nLogin = computed(() => i18n.t("nav_menu.login"))
    const i18nRegister = computed(() => i18n.t("nav_menu.register"))
    const homeMenu=ref<homeMenuType[]>([
        { name: i18nHome, id: '001', link: '/index' },
        { name: i18nLogin, id: '002', link: '/login' },
        { name: i18nRegister, id: '003', link: '/register' }
    ])

    const langLists = ref<langListType[]>([
        { id: '001', name: 'English', href: '' },
        { id: '002', name: '繁體中文', href: '' }
    ])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const changeLang = (e: any) => {
        locale.value = e.target.value
        localStorage.setItem("locale", locale.value);
        console.log(localStorage.getItem('loginValidator'))
        console.log(e.target.value)
    }
    watch(locale, newlocale => {
        localStorage.setItem("locale", newlocale);
    });

    return {
        homeMenu, changeLang, i18nHome, i18nLogin, i18nRegister, locale, langLists
    }
})
