<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="flex-row-nowrap-space-between">
        <ul class="item">
            <li v-for="(item, id) in homeMenu"
                :key="id">
                <a :href="item.link">
                    {{ item.name }}</a>
            </li>
        </ul>

        <div class="select-style">
            <el-form class="langLists"
                     filterable
                     :model="locale">
                <el-form-item>
                    <el-select v-model="locale"
                               placeholder="請選擇">
                        <el-option v-for="item in langLists"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.name" />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useNavbarStore } from '../stores/nav';
    //宣告store = useCounterStore()
    const store = useNavbarStore();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { homeMenu, locale, langLists } = storeToRefs(store);
    //const { changeLang } = store;
</script>
