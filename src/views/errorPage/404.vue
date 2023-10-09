<template>
    <div>
         <h1>{{ title }}</h1>
    <button @click="$router.push('/')">回首頁</button>
    </div>
</template>



<script setup lang="ts">
// @ts-ignore
import { ref, onMounted } from 'vue';
const title = ref<string | any>('404');

onMounted(() => {

});
</script>