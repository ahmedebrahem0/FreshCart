import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isGhPages = env.GITHUB_PAGES === "true";
  const repo = env.BASE_PATH || "FreshCart";

  return {
    base: isGhPages ? `/${repo}/` : "/",
    plugins: [react()],
    build: {
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
