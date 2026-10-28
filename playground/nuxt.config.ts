import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const playgroundDir = dirname(fileURLToPath(import.meta.url));
const usePolling = process.env.CHOKIDAR_USEPOLLING === "true";

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

  watchers: usePolling
    ? { chokidar: { usePolling: true, interval: 1000 } }
    : undefined,

  vite: {
    server: {
      allowedHosts: [".sslip.io"],
      watch: usePolling ? { usePolling: true, interval: 1000 } : undefined,
    },
  },
});
