import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy requests prefixed '/api' and '/uploads'
    proxy: {
      "/api": "https://ecommerce-backend-q69l.onrender.com",
      "/uploads": "https://ecommerce-backend-q69l.onrender.com",
    },
  },
});

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:5000",
//         changeOrigin: true,
//         secure: false, // This can help if the backend server is using self-signed SSL
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//       "/uploads": {
//         target: "http://localhost:5000",
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/uploads/, ''),
//       },
//     },
//   },
// });
