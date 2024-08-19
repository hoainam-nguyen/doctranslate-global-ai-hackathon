import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// npm install --save-dev @types/node
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 3000,
  },
});
