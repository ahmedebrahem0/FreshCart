import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/FreshCart/", // اسم الريبو
  plugins: [react()],
  build: {
    outDir: "docs", // اخلي البيلد يطلع في docs
    emptyOutDir: true,
    assetsDir: "assets",
  },
  server: { port: 3000 },
});
