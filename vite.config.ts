import react from '@vitejs/plugin-react-swc';
import path from "node:path";
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "types": path.resolve(__dirname, "./src/@types"),
    }
  }
})
