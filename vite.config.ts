import process from 'node:process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    base: process.env.BASE_URL ?? '/',
    plugins: [vue()],
})
