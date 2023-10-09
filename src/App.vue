

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
  </div>

</template>

<script setup lang="ts">
// @ts-ignore
import { storeToRefs } from 'pinia';
// @ts-ignore
import { ref, onMounted } from 'vue';
// @ts-ignore
import { useCounterStore } from './stores/counter.ts';
//引入 import {storeToRefs } from 'pinia'


//宣告store = useCounterStore()
const store = useCounterStore();
//解構store,數據取出counter, cardLists
// @ts-ignore
const { count, cardLists } = storeToRefs(store);
const {  addCount } = store;

const clickAdd = () => {
  addCount()
}
onMounted(() => {
 // fetchApi();
});
console.log(import.meta.env.VITE_API_URL, count.value)
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
