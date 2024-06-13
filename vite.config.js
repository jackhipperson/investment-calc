import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    base: '/investment-calc-with-cypress/',
    plugins: [react()]
  }

  return config
})