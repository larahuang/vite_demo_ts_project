import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useI18n } from "vue-i18n";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { homeMenuType, langListType } from "../types/all";

export const useNavbarStore = defineStore('navbar', () => {

    const { locale } = useI18n();
    // console.log('目前語系', locale.value)
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

    const active = ref<number>(0);
    const isActive = ref<boolean>(false);
    const clickActive = (index: number) => {
        active.value = index;
    }

    const activeLang = ref<number>(0);
    const isActiveLang = ref<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const changeLange = (e: any, index: number) => {
        locale.value = e.target.value
        activeLang.value = index;
        localStorage.setItem("locale", locale.value);
    }

    watch(locale, newlocale => {
        console.log(newlocale)
        localStorage.setItem("locale", newlocale);
    });

    return {
        homeMenu, i18nHome, i18nLogin, i18nRegister, langLists, active, isActive, clickActive, locale, changeLange, isActiveLang, activeLang
    }
})
