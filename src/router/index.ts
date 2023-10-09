import { createRouter, createWebHistory,createWebHashHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router'
// @ts-ignore
import Layout from '../layout/Layout.vue';

const routes: Array<RouteRecordRaw> = [
    { //前台
        path: '/',
        name: 'Home',
        // redirect: '/index',
            // component: Layout,
          // @ts-ignore
         component: () => import('../views/Home.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        // @ts-ignore
        component: () => import('../views/errorPage/404.vue'),
        meta: {
            title: '404'
        },
    }

]

const options: RouterOptions = {
    // @ts-ignore
    history: createWebHistory(),//井字號不顯示
   // history: createWebHashHistory(),//井字號顯示
 routes,
}
const router: Router = createRouter(options)


export default router