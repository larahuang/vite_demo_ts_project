# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### create vite@latest <project>
node版本 v18.12.1
```
npm create vite@latest <project>

? Project name: › vite-project //專案名稱
? Select a framework: › - Use arrow-keys. Return to submit.
    Vanilla
❯   Vue
    React
    Preact
    Lit
    Svelte
    Others
? Select a variant: › - Use arrow-keys. Return to submit.
    JavaScript
❯   TypeScript
    Customize with create-vue 
    Nuxt 

cd <project>
npm install
npm run dev


  VITE v4.4.11  ready in 1334 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help

```

### 環境變數設定
修改vite.config.js 檔案，加入以下
```
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';//環境變數設定加入這些
import { resolve } from 'path';//環境變數設定加入這些

export default defineConfig({
  base: '/',//環境變數設定加入這些
  plugins: [
    vue(),
  ],
  ////環境變數設定加入這些
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  envDir: resolve(__dirname, './env'),
});
```

** 處理錯誤：修改vite.config.ts配置與安裝 @types/node
```
npm install --save-dev @types/node
```

＊＊在專案內加入env資料夾資料夾內新增：.env.development,.env.production,.env.staging
開發端環境=>.env.development
正式主機位置=>.env.production
測試環境=>.env.staging

環境變數 ＝>VITE_API_URL(規定為VITE_開頭全大寫＿隔開)
```
VITE_API_URL = 'Api網址'
```


使用
```
import.meta.env.VITE_API_URL

```

### 安裝pinia
```
npm install --save pinia

```
main.ts引入
```
import { createApp } from 'vue'
import { createPinia } from 'pinia'//加入pinia
import router from './router/index' 
import './style.css'
import App from './App.vue'
const pinia = createPinia() //加入pinia

const app = createApp(App)
    app.use(pinia)//加入pinia
app.mount('#app')

```
新增counter.ts
```
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
```
在App.vue測試
```
<template>
  <div>
  <h1 style="color:#333">{{ count  }}</h1>
    <button @click="clickAdd">Add</button>
  </div>
</template>

//引入pinia storeToRefs => 宣告store = useCounterStore() =>解構store addCount函式 ,storeToRefs(store) 解構數據取出counter, cardLists;
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



```


