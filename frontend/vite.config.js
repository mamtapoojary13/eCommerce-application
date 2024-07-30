import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy requests prefixed '/api' and '/uploads'
    proxy: {
      "/api": "https://ecommerce-backend-x8kl.onrender.com",
      "/uploads": "https://ecommerce-backend-x8kl.onrender.com",
    },
  },
});
