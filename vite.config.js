import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/mini-project-frontend/',
  build : {
    rollupOptions :  {
      output: {
        manualChunks: {
          vendor : ['react', 'react-dom']
        }
      }
    }
  }
})
