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

### 安裝axios
```
npm install axios --save

```
第一種寫法=>axios頁面載入
App.vue測試
```
<script setup lang="ts">
    // @ts-ignore
    import axios from 'axios'
    const getData = async () => {
        try {
            console.log('環境變數加入位址', import.meta.env.VITE_API_URL)
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
    });

</script>
```
第二種寫法=>pinia axios

```
import { defineStore } from 'pinia'
import axios from 'axios'
//引入vue Composition API
import { ref, computed } from 'vue'
// @ts-ignore
import { counterType,dataListType } from '../types/counter.ts'
export const useCounterStore = defineStore('counter', () => { 
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
        }
        catch (error) {
            console.log(error)
        }    
       
    }
    return {
        dataLists,getLists,
    }
})

```
在App.vue引入
//引入pinia storeToRefs => 宣告=>解構


### 安裝router
```
npm install --save vue-router@next
```
在src資料夾內創建router/index.ts
在src下創建 views/Home.vue 和 views/errorPage/404.vue
在main.ts引入 router

App.vue加入  
```
<router-view></router-view>
```


### Vite 動態title
```
npm i --save vue-page-title

```
在main.ts引入 vue-page-title

### 修改 icon
public新增 img/logo.svg
index.html加入
```
<link rel="icon" type="image/svg+xml" href="/img/logo.svg" />
```


### 安裝 ESLint
https://blog-lara.vercel.app/2023/07/22/eslint_ts/
https://www.npmjs.com/package/stylelint-order
```
npm install @typescript-eslint/eslint-plugin --save-dev
npm install @typescript-eslint/parser --save-dev
npm install @vue/eslint-config-typescript --save-dev
npm install eslint --save-dev
npm install eslint-plugin-typescript --save-dev
npm install eslint-plugin-vue  --save-dev
npm install prettier --save-dev
npm install stylelint --save-dev

npm install stylelint-config-html  --save-dev
npm install stylelint-config-standard  --save-dev
npm install stylelint-config-standard-vue  --save-dev
npm install stylelint-order  --save-dev
npm install vue-eslint-parser --save-dev
npm install postcss --save-dev
npm install postcss-html --save-dev
```


### 打包優化
一 安裝 rollup-plugin-visualizer
```
npm i rollup-plugin-visualizer -D
```
vite.config.js  引入visualizer()
//引入
import { visualizer } from "rollup-plugin-visualizer";

module.exports = {
    plugins: [
    vue(), 
    visualizer()//visualizer exports 
    ],
};
打包之後會在項目根目錄生成 stats.html 文件，打開

二 GZIP 配置
```
npm i vite-plugin-compression -D
```
vite.config.js  引入
```
import { vite-plugin-compression } from “vite-plugin-compression”;
//引入visualizer
import { visualizer } from "rollup-plugin-visualizer";
//引入vite-plugin-compression
import viteCompression from 'vite-plugin-compression'
module.exports = {
    plugins: [
    vue(), 
    visualizer(),
    viteCompression()//引入vite-plugin-compression
    ],
};
```
打包後就會生成 gzip 文件了
三 圖片壓縮
```
npm i vite-plugin-imagemin -D
```
