import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base is set to './' so the build works when hosted from any subpath
// (e.g. https://username.github.io/repo-name/) without extra config.
export default defineConfig({
  plugins: [react()],
  base: './',
})
