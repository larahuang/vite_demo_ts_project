/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed,  watch } from 'vue';
import { useI18n } from "vue-i18n";
import type { FormInstance } from 'element-plus';
//element 成功或失敗警告訊息 Type
import { ElMessage } from 'element-plus';
import { homeMenuType, langListType, ruleFormType, ruleValidatorType } from '../types/all.ts'

export const useIndexStore = defineStore('index', () => {
    const { locale } = useI18n();
    const i18n = useI18n();

    //Menu
    const i18nHome = computed(() => i18n.t("nav_menu.home"))
    const i18nLogin = computed(() => i18n.t("nav_menu.login"))
    const i18nRegister = computed(() => i18n.t("nav_menu.register"))
    const homeMenu=ref<homeMenuType[]>([
        { name: i18nHome, id: '001', link: '/index' },
        { name: i18nLogin, id: '002', link: '/login' },
        { name: i18nRegister, id: '003', link: '/register' }
    ])

    //Menu active
    const active = ref<number>(0);
    const isActive = ref<boolean>(false);
    const clickActive = (index: number) => {
        active.value = index;
    }

    //langLists
    const langLists = ref<langListType[]>([
        { id: '001', name: 'English', href: '' },
        { id: '002', name: '繁體中文', href: '' }
    ])

    //langLists active
    const activeLang = ref<number>(0);
    const isActiveLang = ref<boolean>(false);
    //
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const changeLange = (e: any, index: number) => {
        locale.value = e.target.value
        activeLang.value = index;
        localStorage.setItem("locale", locale.value);
        //  resetForm(formEl);
        //  console.log(e)
        const changeBtn:any = document.querySelector('.is-error .el-form-item__error');
        changeBtn.style.color = "white !important";
    }
    const ruleFormRef = ref<FormInstance>()

    //登入表單內容
    const ruleForm = ref<ruleFormType>({
        email   : '',
        password: '',
    })

    //註冊表單內容
    const ruleRegisterForm = ref<ruleFormType>({
        username : '',
        email    : '',
        password : '',
        checkPass: '',
    })

    //登入驗證規則
    const rules = computed<ruleValidatorType>(() => (
        {
            email: [
                { required: true, message: i18n.t("form_validate.PleaseEnterPassword"), trigger: "blur" },
                {
                    type   : 'email', message: '電子信箱格式不符', trigger: [
                        'blur',
                        'change'
                    ]
                },
            ],
            password: [
                { required: true, message: i18n.t("form_validate.PleaseEnterPassword"), trigger: "blur" },
                { min: 6, max: 30, message: "长度在6到30个字符之间", trigger: "blur" },
            ],
        }
    ))

    // 檢查密碼是否兩次相同
    const checkPassword = (_rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(i18n.t("form_validate.PleaseConfirmPassword"))

        } else if (value !== ruleRegisterForm.value.password) {
            callback(new Error('兩次密碼不相同！'))
        } else {
            callback()
        }
    }

    //註冊驗證規則
    const rulesRegister = computed<ruleValidatorType>(() => (
        {
            email: [
                { required: true, message: i18n.t("form_validate.PasswordCannotBeEmpty"), trigger: "blur" },
                {
                    type   : 'email', message: '電子信箱格式不符', trigger: [
                        'blur',
                        'change'
                    ]
                },
            ],
            password: [
                { required: true, message: i18n.t("form_validate.PasswordCannotBeEmpty"), trigger: "blur" },
                { min: 6, max: 30, message: "长度在6到30个字符之间", trigger: "blur" },
            ],
            checkPass: [{ validator: checkPassword, trigger: 'blur' }],
        }
    ))

    //登入LoginSubmit
    const LoginSubmit = (formEl: FormInstance | undefined) => {
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
                    console.log(error)
                }
            } else {
                console.log('validator', fields, formEl)
                // localStorage.setItem("loginValidator", 'true');
            }
        })
    }

    //註冊送出
    const RegisterSubmit = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate(async (valid, fields) => {
            // stopWatch();
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
    //重置按鈕
    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }
    // watch locale
    // watch(locale, newlocale => {
    //     console.log(newlocale)
    //     localStorage.setItem("locale", newlocale);
    // });


    return {
        homeMenu, active, isActive, clickActive,
        langLists, activeLang, isActiveLang,
        locale, changeLange,
        ruleFormRef,
        ruleForm, rules, LoginSubmit,
        ruleRegisterForm, rulesRegister, RegisterSubmit, resetForm,
    }
})
