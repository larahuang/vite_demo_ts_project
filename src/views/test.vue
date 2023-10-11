<template>
    <div>
        <h1 style="color:#333">
            {{ count }}
        </h1>
        <button @click="clickAdd">
            Add
        </button>

        <ul>
            <li v-for="(item, code) in dataLists"
                :key="code">
                {{ item.code }}-{{ item.symbol }}={{ item.rate }}
            </li>
        </ul>
        <div>
            切換語言：
            <select @change="changeLang">
                <option value="zh-TW">
                    中文
                </option>
                <option value="en-US">
                    English
                </option>
            </select>
        </div>
        <p>
            {{ $t('nav_menu.home') }}
        </p>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import axios from 'axios'
    import { ref, onMounted } from 'vue';
    import { useI18n } from 'vue-i18n'
    // @ts-ignore
    import { useCounterStore } from '../stores/counter.ts';
    //引入 import {storeToRefs } from 'pinia'

    const { locale } = useI18n()
    const changeLang = (e:any ) => {
        locale.value = e.target.value
    }
    //宣告store = useCounterStore()
    const store = useCounterStore();
    //解構store,數據取出counter, cardLists
    // @ts-ignore
    const { count, dataLists } = storeToRefs(store);
    const { addCount, getLists } = store;
    const lists = ref<any>([]);
    const clickAdd = () => {
        addCount()
    }

    const getData = async () => {
        try {
            console.log('位址', import.meta.env.VITE_API_URL)
            const api = `${import.meta.env.VITE_API_URL}/v1/bpi/currentprice.json`

            await axios.get(api)
                .then((res: { data: any; }) => {
                    lists.value = res.data;
                    console.log('lists.value', lists.value)
                })
        } catch (error) {
            console.log(error)
        }
    }
    onMounted(() => {
        getData();
        getLists();
    });
</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
