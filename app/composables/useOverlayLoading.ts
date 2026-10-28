import type { OverlayLoadingOptions } from "../types/overlay-loading.types";

export const useOverlayLoading = () => {
  const overlay = useOverlay();
  const OverlayLoadingComponent = defineAsyncComponent(
    () => import("../components/OverlayLoading.vue")
  );

  let currentOverlay: {
    id: symbol;
    open: () => void;
    close: () => void;
    patch: (props: Record<string, unknown>) => void;
  } | null = null;
  const show = (options: OverlayLoadingOptions) => {
    if (currentOverlay) {
      currentOverlay.close();
    }
    currentOverlay = overlay.create(OverlayLoadingComponent, {
      destroyOnClose: true,
      props: {
        isVisible: true,
        ...options,
      },
    });

    currentOverlay?.open();

    return currentOverlay?.id ?? null;
  };

  const close = () => {
    if (currentOverlay) {
      currentOverlay.close();
      currentOverlay = null;
    }
  };

  /**
   * Mescla props no componente do overlay. Props devem ser planas (title, description, …):
   * o `patch` do useOverlay faz `{ ...overlay.props, ...patch }`, não aceita `{ props: { … } }`.
   */
  const update = (options: Partial<OverlayLoadingOptions>) => {
    if (currentOverlay) {
      currentOverlay.patch({
        isVisible: true,
        ...options,
      });
    }
  };

  const isOpen = () => {
    return currentOverlay !== null;
  };

  const getCurrentId = () => currentOverlay?.id ?? null;

  return {
    show,
    close,
    update,
    isOpen,
    getCurrentId,
  };
};

