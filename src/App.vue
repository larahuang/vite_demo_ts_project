<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
    <div>
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
        <ul>
            <li v-for="(item, id) in homeMenu"
                :key="id">
                {{ item.name }}
            </li>
        </ul>
        <router-view />
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useNavbarStore } from './stores/nav';
    //宣告store = useCounterStore()
    const store = useNavbarStore();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { homeMenu } = storeToRefs(store);
    const { changeLang } = store;
</script>

<style lang="scss" scoped>
ul{
    display: flex;
    li  {
    display : flex;
    padding:10px;

    }
}
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
