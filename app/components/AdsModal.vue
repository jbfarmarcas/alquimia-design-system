<template>
  <UModal
    v-model:open="open"
    :dismissible="dismissible"
    :close="false"
    :title="title"
    :description="description"
    :ui="{ overlay: 'bg-neutral-950/40', content: contentClass }"
    :content="{
      onEscapeKeyDown: () => emit('dismiss', 'esc'),
      onPointerDownOutside: () => emit('dismiss', 'outside'),
    }"
  >
    <template #content="{ close }">
      <div class="flex min-h-0 w-full flex-col gap-[var(--ads-space-xxs)]">
        <div class="flex items-start gap-[var(--ads-space-nano)]">
          <span
            v-if="icon"
            class="flex size-[var(--ads-space-xs)] shrink-0 items-center justify-center text-[var(--ads-text-primary)]"
            aria-hidden="true"
          >
            <UIcon :name="icon" class="size-[var(--ads-space-xxs)]" />
          </span>
          <div class="flex min-h-[var(--ads-space-xs)] min-w-0 flex-1 items-center">
            <slot name="title">
              <h2 class="text-[length:var(--ads-modal-title-size)] font-bold leading-[1.3] text-[var(--ads-modal-title)]">
                {{ title }}
              </h2>
            </slot>
          </div>
          <button
            v-if="closable"
            type="button"
            class="flex size-[var(--ads-space-xs)] shrink-0 items-center justify-center rounded-[var(--ads-radius-xsm)] text-[var(--ads-text-primary)] hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]"
            aria-label="Fechar"
            @click="dismiss(close)"
          >
            <UIcon name="i-lucide-x" class="size-[18px]" />
          </button>
        </div>

        <p v-if="description" class="text-[length:var(--ads-modal-body-size)] leading-[var(--ads-line-height-md)] text-[var(--ads-modal-body)]">
          {{ description }}
        </p>

        <div v-if="slots.default" class="min-h-0 overflow-y-auto">
          <slot />
        </div>

        <div v-if="slots.footer" class="flex w-full shrink-0 items-center justify-end gap-[var(--ads-space-quark)] bg-white">
          <slot name="footer" />
        </div>
        <div v-else-if="showDefaultActions" class="flex w-full items-center justify-end gap-[var(--ads-space-quark)]">
          <AdsButton
            v-if="cancelLabel"
            type="unfilled"
            :label="cancelLabel"
            @click="dismiss(close)"
          />
          <AdsButton
            v-if="confirmLabel"
            :label="confirmLabel"
            @click="emit('confirm')"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import AdsButton from "./AdsButton.vue";

/**
 * `dialog`: cartão centralizado (desktop, Figma `APP=No`), 532px, raio SM (8px).
 * `sheet`: folha presa à base (mobile/app, Figma `APP=Yes`), largura cheia,
 * arredondamento só no topo, sombra nível 2.
 *
 * Espaçamento, na escala ADS:
 * - padding do cartão e faixa do cabeçalho: space-xs (24px)
 * - vão entre cabeçalho, texto, conteúdo e ações: space-xxs (16px)
 * - vão entre ícone, título e fechar: space-nano (8px)
 * - ícone: space-xxs (16px). O X do desktop segue o SM do Figma (18px)
 * - título: 20px bold, line-height 130% (Subtitle 20 do Figma)
 */
export type AdsModalVariant = "dialog" | "sheet";
export type AdsModalSize = "md" | "lg" | "xl" | "2xl" | "3xl";
export type AdsModalDismissReason = "esc" | "outside";

const props = withDefaults(
  defineProps<{
    title: string;
    description?: string;
    /** Nome Lucide, como `i-lucide-align-center`. Sem valor, o título fica só com o texto. */
    icon?: string;
    cancelLabel?: string;
    confirmLabel?: string;
    variant?: AdsModalVariant;
    /** Largura do cartão. `md` é o diálogo de confirmação (532px). */
    size?: AdsModalSize;
    scrollable?: boolean;
    dismissible?: boolean;
    /** Sem o X. Overlay e Esc continuam no `dismissible`. */
    closable?: boolean;
  }>(),
  {
    description: undefined,
    icon: undefined,
    cancelLabel: "Cancelar",
    confirmLabel: "Continuar",
    variant: "dialog",
    size: "md",
    scrollable: false,
    dismissible: true,
    closable: true,
  },
);

/**
 * `!` força a prioridade sobre as classes padrão do tema `UModal`
 * (ex.: `shadow-lg`, `rounded-lg`), que entram na cascata depois das nossas
 * — sem o important, o valor do Figma perde para o default do Nuxt UI.
 */
const widths: Record<AdsModalSize, string> = {
  md: "!w-[min(532px,calc(100%-2rem))]",
  lg: "!w-[min(42rem,calc(100%-2rem))]",
  xl: "!w-[min(48rem,calc(100%-2rem))]",
  "2xl": "!w-[min(56rem,calc(100%-2rem))]",
  "3xl": "!w-[min(64rem,calc(100%-2rem))]",
};

const contentClass = computed(() => {
  const scroll = props.scrollable ? " !max-h-[calc(100dvh-2rem)] !overflow-y-auto" : "";
  if (props.variant === "sheet") {
    return `!inset-x-0 !bottom-0 !top-auto !left-0 !translate-x-0 !translate-y-0 !w-full !max-w-none !max-h-[calc(100dvh-2rem)] !divide-y-0 !overflow-y-auto !bg-[var(--ads-modal-background)] !p-[var(--ads-modal-padding)] !shadow-[var(--ads-shadow-level-2)] !ring-1 !ring-[var(--ads-modal-border)] !rounded-t-[var(--ads-modal-radius)] !rounded-b-none${scroll}`;
  }
  return `${widths[props.size]} !max-w-none !divide-y-0 !rounded-[var(--ads-modal-radius)] !border !border-[var(--ads-modal-border)] !bg-[var(--ads-modal-background)] !p-[var(--ads-modal-padding)] !shadow-[var(--ads-shadow-level-3)] !ring-0${scroll}`;
});

const emit = defineEmits<{
  confirm: [];
  cancel: [];
  dismiss: [reason: AdsModalDismissReason];
}>();

const open = defineModel<boolean>("open", { default: false });
const slots = useSlots();
const showDefaultActions = computed(() => !slots.footer && !slots.default);

const dismiss = (close: () => void) => {
  if (!props.closable) return;
  emit("cancel");
  close();
  open.value = false;
};
</script>
