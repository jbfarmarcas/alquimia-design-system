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
  /**
   * O overlay é destruído ao fechar (destroyOnClose). Fechar pelo X ou pela ação emite `close`
   * direto no useOverlay, sem passar por aqui; chamar close/patch depois disso lança
   * "Overlay not found". Por isso a referência é limpa quando o overlay fecha, por qualquer caminho.
   */
  const safely = (action: () => void) => {
    try {
      action();
    } catch {
      currentOverlay = null;
    }
  };

  const show = (options: OverlayLoadingOptions) => {
    if (currentOverlay) {
      const previous = currentOverlay;
      safely(() => previous.close());
    }
    const created = overlay.create(OverlayLoadingComponent, {
      destroyOnClose: true,
      props: {
        isVisible: true,
        ...options,
      },
    });
    currentOverlay = created;

    const opened = created.open();
    void Promise.resolve(opened).then(() => {
      if (currentOverlay?.id === created.id) currentOverlay = null;
    });

    return created.id;
  };

  const close = () => {
    if (currentOverlay) {
      const target = currentOverlay;
      currentOverlay = null;
      safely(() => target.close());
    }
  };

  /**
   * Mescla props no componente do overlay. Props devem ser planas (title, description, …):
   * o `patch` do useOverlay faz `{ ...overlay.props, ...patch }`, não aceita `{ props: { … } }`.
   */
  const update = (options: Partial<OverlayLoadingOptions>) => {
    if (currentOverlay) {
      const target = currentOverlay;
      safely(() =>
        target.patch({
          isVisible: true,
          ...options,
        }),
      );
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

