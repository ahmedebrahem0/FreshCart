import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/FreshCart/",
  plugins: [react()],
  build: {
    outDir: "docs",
    assetsDir: "assets",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
});
