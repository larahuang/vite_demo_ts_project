import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useI18n } from "vue-i18n";
import { homeMenuType } from "../types/all";

export const useNavbarStore = defineStore('navbar', () => {
    const { locale } = useI18n();
    const i18n = useI18n();

    const i18nPlatform = computed(() => i18n.t("nav_menu.home"))
    const i18nCompany = computed(() => i18n.t("nav_menu.login"))

    const homeMenu=ref<homeMenuType[]>([
        { name: i18nPlatform, id: '001', link: '/index' },
        { name: i18nCompany, id: '002', link: '/aboutus' }
    ])

    // const langLists = ref<langListType[]>([
    //     { id: '001', name: 'English', href: '' },
    //     { id: '002', name: '繁體中文', href: '' }
    // ])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const changeLang = (e: any) => {
        console.log(e)
        locale.value = e.target.value
        console.log(locale.value)
    }
    watch(locale, newlocale => {
        localStorage.setItem("locale", newlocale);
    });

    return {
        homeMenu, changeLang
    }
})
