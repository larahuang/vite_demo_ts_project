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
