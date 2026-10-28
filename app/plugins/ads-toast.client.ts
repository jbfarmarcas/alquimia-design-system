import { watch } from "vue";
import { resolveAdsToastIcon } from "../theme/ads-theme";

interface AdsToastState {
  color?: string;
  icon?: unknown;
}

export default defineNuxtPlugin(() => {
  const toasts = useState<AdsToastState[]>("toasts", () => []);

  watch(
    toasts,
    (list) => {
      for (const toast of list) {
        const icon = resolveAdsToastIcon(toast.color, toast.icon);
        if (toast.icon !== icon) {
          toast.icon = icon;
        }
      }
    },
    { deep: true, flush: "sync" },
  );
});
