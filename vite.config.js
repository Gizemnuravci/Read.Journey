import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { copyFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

function githubPagesFallback() {
  return {
    name: "github-pages-fallback",
    closeBundle() {
      copyFileSync(
        resolve(projectRoot, "dist/index.html"),
        resolve(projectRoot, "dist/404.html"),
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), githubPagesFallback()],
  base: "/Read.Journey/",
});
