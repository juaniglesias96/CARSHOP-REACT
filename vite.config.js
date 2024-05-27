import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port:5175,
  },
  plugins: [react()],
  base: "/CARSHOP-REACT/",
});
