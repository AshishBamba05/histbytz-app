import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/eraview-history-app/",
  plugins: [react()],
})
