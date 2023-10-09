import { defineStore } from 'pinia';
//引入vue Composition API
import { ref, computed } from 'vue';
// @ts-ignore
import { counterType } from '../types/counter.ts'
//改為Function 寫法與Composition API
export const useCounterStore = defineStore('counter', () => { 
    const count = ref<any>(0);

    //computed
    const doubleCount = computed(() =>
    {
       return count.value * 2
    })
    
    const addCount = () =>
    {
        count.value ++
    }
    const cardLists = ref([])
    
     return {
        count,addCount,doubleCount,
        cardLists
    }
})