import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  root: "./client",
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./", "../shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**"],
    },
  },
  build: {
    outDir: "../dist/spa",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./client"),
      "@shared": path.resolve(process.cwd(), "./shared"),
    },
  },
});