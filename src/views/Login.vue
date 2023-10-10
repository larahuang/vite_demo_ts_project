<!-- eslint-disable vue/multi-word-component-names -->
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
            <el-form-item label="確認密碼"
                          prop="checkPass">
                <el-input v-model="ruleForm.checkPass"
                          type="password"
                          autocomplete="off" />
            </el-form-item>
            <!---->
            <el-form-item>
                <el-button @click="resetForm(ruleFormRef)">
                    重置
                </el-button>
                <el-button type="primary"
                           @click="submitForm(ruleFormRef)">
                    送出
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
    // @ts-ignore
    import { ref,  onMounted } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import type { FormInstance, FormRules } from 'element-plus'
    // @ts-ignore
    import { ruleFormType } from '../types/forms.ts'
    const ruleFormRef = ref<FormInstance>()
    const ruleForm = ref<ruleFormType>({
        email    : '',
        password : '',
        checkPass: '',

    })
    //驗證密碼
    const validatePassword = (_rule: any, value: any, callback: any) => {
        if (value === '') {
            //如果空值時驗證
            callback(new Error('請輸入密碼'))
        } else {
            //如果密碼不等於空
            if (ruleForm.value.checkPass !== '') {
                if (!ruleFormRef.value) return
                ruleForm.value.validateField('checkPass', () => null)
            }
            callback()
        }
    }
    // 檢查密碼是否兩次相同
    const checkPassword= (_rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('請再輸入一次密碼'))

        } else if (value !== ruleForm.value.password) {
            callback(new Error('兩次密碼不相同！'))
        } else {
            callback()
        }
    }
    //驗證規則
    const rules = ref<FormRules<ruleFormType>>({
        email: [
            {
                required: true,
                message : '請輸入電子信箱',
                trigger : 'blur',
            },
            {
                type   : 'email',
                message: '電子信箱格式不符',
                trigger: [
                    'blur',
                    'change'
                ],
            },
        ],
        password : [{ validator: validatePassword, trigger: 'blur' }],
        checkPass: [{ validator: checkPassword, trigger: 'blur' }],
    })

    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                console.log('submit!')
            } else {
                console.log('驗證', fields)
            }
        })
    }
    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }
    onMounted(() => {

    });
</script>
