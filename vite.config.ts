<<<<<<< HEAD
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
  base: '/',
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
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  envDir: resolve(__dirname, './env'),
})
=======
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
// @ts-ignore
import { visualizer } from "rollup-plugin-visualizer"
// @ts-ignore
import viteImagemin from "vite-plugin-imagemin"
// @ts-ignore
import viteCompression from "vite-plugin-compression"
export default defineConfig({
  base: './',
  plugins: [
        vue(),
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
>>>>>>> f8e60ec9cf88f3fb063505381538cf92dd7793be
