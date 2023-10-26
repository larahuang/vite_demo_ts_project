/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import axios from 'axios'
//引入vue Composition API
import { ref, computed, watch } from 'vue'
import { useI18n } from "vue-i18n";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import zh from 'element-plus/dist/locale/zh-tw';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import en from 'element-plus/dist/locale/en';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { counterType, dataListType } from '../types/counter.ts'
//改為Function 寫法與Composition API
export const useCounterStore = defineStore('counter', () => {
    const { locale } = useI18n();
    const i18n = useI18n();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count = ref<any>(0);

    //computed
    const doubleCount = computed(() => {
        return count.value * 2
    })

    const addCount = () => {
        count.value ++
    }

    const dataLists = ref<any>([])
    const getLists = async () => {
        try {
            const api = `${import.meta.env.VITE_API_URL}/v1/bpi/currentprice.json`;
            const res = await axios.get(api)
            if (res.status === 200) {
                dataLists.value = res.data.bpi;
            } else {
                console.log('Fail')
            }
        } catch (error) {
            console.log(error)
        }

    }

    return {
        count, addCount, doubleCount,
        dataLists, getLists, locale,
    }
})
