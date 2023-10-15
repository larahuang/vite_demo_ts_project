<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <div>
            {{ i18nRegister }}
        </div>
        <el-form ref="ruleFormRef"
                 :model="ruleRegisterForm"
                 :rules="rulesRegister"
                 label-width="120px"
                 class="demo-ruleForm">
            <el-form-item
                label="使用者">
                <el-input v-model="ruleRegisterForm.username" />
            </el-form-item>
            <el-form-item prop="email"
                          label="電子郵件">
                <el-input v-model="ruleRegisterForm.email" />
            </el-form-item>
            <el-form-item label="密碼"
                          prop="password">
                <el-input v-model="ruleRegisterForm.password"
                          type="password"
                          autocomplete="off" />
            </el-form-item>
            <el-form-item label="確認密碼"
                          prop="checkPass">
                <el-input v-model="ruleRegisterForm.checkPass"
                          type="password"
                          autocomplete="off" />
            </el-form-item>
            <!---->
            <el-form-item>
                <el-button @click="resetForm(ruleFormRef)">
                    重置
                </el-button>
                <el-button type="primary"
                           @click="RegisterSubmit(ruleFormRef)">
                    送出
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    // @ts-ignore
    import { useNavbarStore } from '../stores/nav.ts';
    // @ts-ignore
    import { useLoginStore } from '../stores/auth.ts';
    //宣告
    const store = useLoginStore();
    const storeNav = useNavbarStore();
    // @ts-ignore
    const { i18nRegister } = storeToRefs(storeNav);
    // @ts-ignore
    const { rulesRegister, ruleRegisterForm, ruleFormRef } = storeToRefs(store);
    // @ts-ignore
    const { RegisterSubmit, resetForm } = store;
</script>

