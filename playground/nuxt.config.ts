import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const playgroundDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  extends: [".."],
  compatibilityDate: "2025-06-17",

  devServer: {
    port: 3010,
  },

  runtimeConfig: {
    reviewDatabasePath: join(playgroundDir, "data", "review.sqlite"),
  },

  routeRules: {
    "/": { redirect: "/design-system" },
  },

  devtools: {
    enabled: true,
  },
});
