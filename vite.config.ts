import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

console.log('Build ENV:', process.env.VITE_APP_BASE_URL, process.env.VITE_API_BASE_URL);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    VITE_APP_BASE_URL: JSON.stringify(process.env.VITE_APP_BASE_URL),
    VITE_API_BASE_URL: JSON.stringify(process.env.VITE_API_BASE_URL)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
})