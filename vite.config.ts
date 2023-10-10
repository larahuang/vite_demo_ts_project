/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
// @ts-ignore
import AutoImport from 'unplugin-auto-import/vite'
// @ts-ignore
import Components from 'unplugin-vue-components/vite'
// @ts-ignore
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { visualizer } from "rollup-plugin-visualizer"
// @ts-ignore
import viteImagemin from "vite-plugin-imagemin"
// @ts-ignore
import viteCompression from "vite-plugin-compression"

export default defineConfig({
    base   : './',
    plugins: [
        vue(),
        /*element 自動導入*/
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        /*element 自動導入*/
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        visualizer(),
        viteCompression(),
        viteImagemin(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    envDir: resolve(__dirname, './env'),
})
