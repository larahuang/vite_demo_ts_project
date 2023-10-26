
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed,  watch } from 'vue';
import { useI18n } from "vue-i18n";
import type { FormInstance } from 'element-plus';
//element 成功或失敗警告訊息 Type
import { ElMessage } from 'element-plus';
import { ruleFormType, ruleValidatorType } from '../types/all.ts'
export const useRegisterStore = defineStore('register', () => {
    const { locale } = useI18n();
    const i18n = useI18n();

    const ruleRegisterFormRef = ref<FormInstance>()

    const ruleRegisterForm = ref<ruleFormType>({
        username : '',
        email    : '',
        password : '',
        checkPass: '',
    })

    // // 檢查密碼是否兩次相同
    const checkPassword= (_rule: any , value: any, callback: string) => {
        if (value === '') {
            callback(i18n.t("form_validate.PleaseConfirmPassword"))

        } else if (value !== ruleRegisterForm.value.password) {
            callback(new Error('兩次密碼不相同！'))
        } else {
            callback()
        }
    }
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
    const registerResetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }


    watch(locale, newlocale => {
        localStorage.setItem("locale", newlocale);
    });


    return {
        registerResetForm, ruleRegisterFormRef, ruleRegisterForm, rulesRegister, RegisterSubmit, locale,
    }
})
