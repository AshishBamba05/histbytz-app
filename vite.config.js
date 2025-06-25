import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/eraview-history-app/', // <-- this line is crucial
  plugins: [react()],
})
