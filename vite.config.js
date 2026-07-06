import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/usuarios": "http://localhost:3000",
      "/publicaciones": "http://localhost:3000",
      "/comentarios": "http://localhost:3000",
      "/reacciones": "http://localhost:3000",
    },
  },
})
