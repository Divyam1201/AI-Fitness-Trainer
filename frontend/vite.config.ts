import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server:{
  //    proxy: {
  //     '/api': {
  //       target: `http://localhost:3000`, // Your backend port
  //       changeOrigin: true,
  //     },
  //   },
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['@vapi-ai/web'],
  },
})