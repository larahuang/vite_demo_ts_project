<template>
    <div>
        <el-form ref="ruleFormRef"
                 :model="ruleForm"
                 :rules="rules"
                 label-width="120px"
                 class="demo-ruleForm">
            <el-form-item prop="email"
                          label="電子郵件">
                <el-input v-model="ruleForm.email" />
            </el-form-item>
            <el-form-item label="密碼"
                          prop="password">
                <el-input v-model="ruleForm.password"
                          type="password"
                          autocomplete="off" />
            </el-form-item>
            <!---->
            <el-form-item>
                <el-button @click="resetForm(ruleFormRef)">
                    重置
                </el-button>
                <el-button type="primary"
                           @click="LoginSubmit(ruleFormRef)">
                    送出
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    // @ts-ignore
    import { useLoginStore } from '../stores/auth.ts';
    //宣告
    const store = useLoginStore();
    // @ts-ignore
    const { rules, ruleForm, ruleFormRef } = storeToRefs(store);
    // @ts-ignore
    const { LoginSubmit, resetForm } = store;
</script>

