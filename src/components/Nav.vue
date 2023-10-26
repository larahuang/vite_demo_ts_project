<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <header class="bg-d4e3fe">
        <div class="w-95 flex-row-nowrap-space-between">
            <!-- homeMenu -->
            <ul class="item">
                <li v-for="(item, index, id) in homeMenu"
                    :key="id"
                    :class="active == index ? 'isActive' : ''"
                    @click="clickActive(index)">
                    <router-link :to="item.link"
                                 class="hvr-underline-from-center">
                        {{ item.name }}
                    </router-link>
                </li>
            </ul>
            <!-- select-style -->
            <div class="select-lang">
                <el-form class="langLists">
                    <el-form-item>
                        <el-select v-model="locale"
                                   placeholder="請選擇">
                            <el-option v-for="(item, index, id) in langLists"
                                       :key="id"
                                       :class="activeLang == index ? 'isActiveLang' : ''"
                                       :label="item.name"
                                       :value="item.name"
                                       @change="changeLange" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    // @ts-ignore @click="resetForm(ruleFormRef)"
    import { useIndexStore  } from '../stores/index';
    //宣告store = useCounterStore()
    const store = useIndexStore();

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { homeMenu, langLists, active, isActive, locale, isActiveLang, activeLang, ruleFormRef } = storeToRefs(store);
    //const { clickActive } = store;
    // @ts-ignore
    const { clickActive, changeLange } = store;
</script>
