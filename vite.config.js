import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // يقرأ .env وبيئة Vercel
  const isGhPages = env.GITHUB_PAGES === "true";
  const repo = env.BASE_PATH || "FreshCart";    // غيّر اسم الريبو لو مختلف

  return {
    base: isGhPages ? `/${repo}/` : "/",        // GH Pages ←→ Vercel
    plugins: [react()],
    server: { port: 3000 },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            router: ["react-router-dom"],
          },
        },
      },
    },
  };
});
