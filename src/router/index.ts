/* eslint-disable @typescript-eslint/ban-ts-comment */
//createWebHashHistory
import { createRouter, createWebHistory,  RouterOptions, Router, RouteRecordRaw } from 'vue-router'
// @ts-ignore
import Layout from '../layout/Layout.vue';

const routes: Array<RouteRecordRaw> = [
    { //前台
        path     : '/',
        redirect : '/index',
        component: Layout,
        children : [
            {
                path     : 'index',
                component: () => import('../views/Home.vue'),
                name     : 'Home',
                meta     : { title: '首頁' }
            },

            {
                path     : 'register',
                name     : 'Register',
                // @ts-ignore
                component: () => import('../views/Register.vue'),
                meta     : { title: '註冊' }
            },
            {
                path     : 'login',
                name     : 'Login',
                // @ts-ignore
                component: () => import('../views/Login.vue'),
                meta     : { title: '登入' }
            },
        ]
    },
    {
        path     : '/:catchAll(.*)',
        name     : '404',
        // @ts-ignore
        component: () => import('../views/errorPage/404.vue'),
        meta     : {
            title: '404'
        },
    }

]

const options: RouterOptions = {
    // @ts-ignore
    history: createWebHistory(), //井字號不顯示
    // history: createWebHashHistory(),//井字號顯示
    routes,
}
const router: Router = createRouter(options)


export default router
