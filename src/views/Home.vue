<template>
<div>
    <h1>{{ title }}</h1>
</div>
</template>

<script setup lang="ts">
// @ts-ignore
import { ref, onMounted } from 'vue';
const title = ref<string | any>('首頁');

onMounted(() => {
  
});
</script>