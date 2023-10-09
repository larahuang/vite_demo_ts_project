

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  <h1 style="color:#333">{{ count  }}</h1>
    <button @click="clickAdd">Add</button>

    <ul>
      <li v-for="(item,code) in dataLists" :key="code">
        {{ item.code }}-{{ item.symbol }}={{ item.rate }}
      </li>
    </ul>
    <router-view></router-view>

  </div>

</template>

<script setup lang="ts">
// @ts-ignore
import { storeToRefs } from 'pinia';
// @ts-ignore
import axios from 'axios'
// @ts-ignore
import { ref, onMounted } from 'vue';
// @ts-ignore
import { useCounterStore } from './stores/counter.ts';
//引入 import {storeToRefs } from 'pinia'


//宣告store = useCounterStore()
const store = useCounterStore();
//解構store,數據取出counter, cardLists
// @ts-ignore
const { count, dataLists } = storeToRefs(store);
const {  addCount, getLists } = store;
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
