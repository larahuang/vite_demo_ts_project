/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed, watch } from 'vue';
import { useI18n } from "vue-i18n";
//@ts-ignore
import type { FormInstance, FormRules } from 'element-plus';
//element 成功或失敗警告訊息 Type
import { ElMessage } from 'element-plus';
// @ts-ignore
import { ruleFormType, ruleValidatorType } from '../types/all.ts'
export const useLoginStore = defineStore('login', () => {
    //const { locale } = useI18n();
    const i18n = useI18n();
    const ruleFormRef = ref<FormInstance>()
    //表單內容
    const ruleForm = ref<ruleFormType>({
        email   : '',
        password: '',
    })
    const ruleRegisterForm = ref<ruleFormType>({
        username : '',
        email    : '',
        password : '',
        checkPass: '',
    })

    // // 檢查密碼是否兩次相同
    const checkPassword= (_rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(i18n.t("form_validate.PleaseConfirmPassword"))

        } else if (value !== ruleRegisterForm.value.password) {
            callback(new Error('兩次密碼不相同！'))
        } else {
            callback()
        }
    }
    //
    const rules = computed<ruleValidatorType>(() => ({
        email: [
            { required: true, message: i18n.t("form_validate.PleaseEnterPassword"), trigger: "blur" },
            { type   : 'email', message: '電子信箱格式不符', trigger: [
                'blur',
                'change'
            ] },
        ],
        password: [
            { required: true, message: i18n.t("form_validate.PasswordCannotBeEmpty"), trigger: "blur" },
            { min: 6, max: 30, message: "长度在6到30个字符之间", trigger: "blur" },
        ],
    }))
    //驗證規則
    const rulesRegister = computed<ruleValidatorType>(() => (
        {
            email: [
                { required: true, message: i18n.t("form_validate.PleaseEnterPassword"), trigger: "blur" },
                { type   : 'email', message: '電子信箱格式不符', trigger: [
                    'blur',
                    'change'
                ] },
            ],
            password: [
                { required: true, message: i18n.t("form_validate.PasswordCannotBeEmpty"), trigger: "blur" },
                { min: 6, max: 30, message: "长度在6到30个字符之间", trigger: "blur" },
            ],
            checkPass: [{ validator: checkPassword, trigger: 'blur' }],
        }
    ))


    const LoginSubmit = (formEl: FormInstance | undefined) => {
        console.log('點擊LoginSubmit', formEl)

        if (!formEl) return
        formEl.validate(async (valid, fields) => {
            if (valid) {
                try {
                    const query = {
                        email   : ruleForm.value.email,
                        password: ruleForm.value.password,
                    }
                    const api = `${import.meta.env.VITE_API_URL}/auth/login`;
                    const res = await axios.post(api, query)
                    if (res.status === 200) {
                        localStorage.setItem('LoginToken', res.data.token);
                        ElMessage({
                            message: '登入成功！',
                            type   : 'success',
                        })
                        console.log('Success!')
                    }

                } catch (error) {
                    console.log(localStorage.getItem('loginValidator'), error)
                    if (localStorage.getItem('loginValidator') != '0') {
                        console.log(error)
                    }


                }
            } else {
                console.log('validator', fields)
                localStorage.setItem("loginValidator", '0');
            }
        })
    }

    const RegisterSubmit = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate(async (valid, fields) => {
            if (valid) {
                try {
                    const query = {
                        email   : ruleRegisterForm.value.email,
                        password: ruleRegisterForm.value.password,
                    }
                    const api = `${import.meta.env.VITE_API_URL}/auth/register`;
                    const res = await axios.post(api, query)
                    if (res.status === 200) {
                        ElMessage({
                            message: '註冊成功！',
                            type   : 'success',
                        })
                        console.log('Success!')
                    }

                } catch (error) {
                    console.log(error)

                }
            } else {
                console.log('validator', fields)
            }
        })
    }
    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }
    // watch(locale, newlocale => {
    //     localStorage.setItem("locale", newlocale);
    // });


    return {
        LoginSubmit, resetForm, ruleFormRef, rules, ruleForm, ruleRegisterForm, rulesRegister, RegisterSubmit,
    }
})
