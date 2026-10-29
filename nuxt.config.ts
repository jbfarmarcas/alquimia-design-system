import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  $meta: {
    name: "design-system",
  },

  srcDir: "app",
  compatibilityDate: "2025-06-17",

  modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxt/ui", "@vueuse/nuxt"],

  css: [
    join(currentDir, "app/assets/css/main.css"),
    join(currentDir, "app/assets/css/component-tokens.css"),
  ],

  ui: {
    colorMode: false,
  },

  icon: {
    collections: ["lucide"],
  },

  fonts: {
    families: [{ name: "Inter", weights: [300, 400, 500, 700, 800] }],
  },
});
