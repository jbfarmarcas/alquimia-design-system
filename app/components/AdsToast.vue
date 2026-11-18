<template>
  <div
    v-if="appearance === 'status'"
    class="flex w-[var(--ads-toast-status-width)] max-w-full items-center justify-between gap-3 rounded-[var(--ads-toast-radius)] bg-[var(--ads-toast-status-bg)] p-3 text-[var(--ads-toast-status-text)] shadow-[var(--ads-shadow-level-1)]"
    role="status"
  >
    <div class="flex min-w-0 items-center gap-3">
      <span
        v-if="showIcon"
        class="inline-flex shrink-0 items-center justify-center"
        :style="statusIconBox"
      >
        <UIcon
          :name="statusIcon"
          class="ads-toast-icon size-full"
          :class="[statusIconClass, status === 'loading' ? 'animate-spin' : '']"
          aria-hidden="true"
        />
      </span>
      <div class="min-w-0">
        <p class="text-[length:var(--ads-toast-status-title-size)] leading-[1.3] font-bold">{{ title || resolvedMessage }}</p>
        <p v-if="subtitle" class="text-[length:var(--ads-toast-status-subtitle-size)] leading-[1.1]">{{ subtitle }}</p>
      </div>
    </div>
    <button
      v-if="closable"
      type="button"
      class="flex size-[18px] shrink-0 items-center justify-center text-[var(--ads-text-contrast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-contrast)]"
      aria-label="Fechar"
      @click="emit('close')"
    >
      <UIcon name="i-lucide-x" class="size-[18px]" />
    </button>
  </div>
  <div
    v-else
    class="flex flex-wrap items-center gap-[var(--ads-toast-gap)] rounded-[var(--ads-toast-radius)] p-[var(--ads-toast-padding)]"
    :class="[surfaceClass, app ? 'w-[331px] max-w-full' : 'w-full']"
    role="status"
  >
    <div class="flex min-w-0 flex-1 basis-full items-start gap-2 sm:basis-auto">
      <span
        v-if="showIcon"
        class="inline-flex shrink-0 items-center justify-center"
        :style="bannerIconBox"
      >
        <UIcon
          :name="resolvedIcon"
          class="ads-toast-icon size-full"
          :class="iconClass"
          aria-hidden="true"
        />
      </span>
      <div class="min-w-0 flex-1">
        <slot>
          <p class="text-[length:var(--ads-toast-font-size)] [font-weight:var(--ads-toast-weight)] leading-[1.3] text-[var(--ads-toast-text)]">
            {{ resolvedMessage }}<button
              v-if="actionLabel"
              type="button"
              class="ms-1 inline-flex items-baseline gap-1 font-normal text-[var(--ads-text-brand)] underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]"
              @click="emit('action')"
            >
              {{ actionLabel }}
              <UIcon
                v-if="actionIcon"
                :name="actionIcon"
                class="ads-icon-xxs size-[var(--ads-space-xxs)] shrink-0 self-center"
                aria-hidden="true"
              />
            </button>
          </p>
          <p
            v-if="description"
            class="text-[length:var(--ads-toast-font-size)] leading-[1.3] text-[var(--ads-text-secondary)]"
            :class="app ? 'mt-1' : 'mt-0.5'"
          >
            {{ description }}
          </p>
        </slot>
      </div>
    </div>
    <div v-if="closable" class="ml-auto flex shrink-0 items-center">
      <button
        type="button"
        class="flex size-[18px] shrink-0 items-center justify-center rounded-[var(--ads-radius-xsm)] text-[var(--ads-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-primary)]"
        aria-label="Fechar"
        @click="emit('close')"
      >
        <UIcon name="i-lucide-x" class="size-[18px]" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type AdsToastStatus = "success" | "error" | "warning" | "attention" | "neutral" | "loading";
export type AdsToastAppearance = "banner" | "status";

const props = withDefaults(
  defineProps<{
    status?: AdsToastStatus;
    /** `banner` é a faixa clara (Toast Header). `status` é o reporte escuro (Toast Alert). */
    appearance?: AdsToastAppearance;
    /** Faixa estreita de 331px, a variação `App` do ADS. */
    app?: boolean;
    message?: string;
    /** Descrição complementar exibida abaixo da mensagem na faixa (banner). */
    description?: string;
    title?: string;
    subtitle?: string;
    /**
     * Ícone Lucide. Sem valor, segue o status.
     * `false` tira o ícone do DOM, sem o vão do token.
     */
    icon?: string | false;
    /** Quando falso, o aviso permanece sem a ação de fechar. */
    closable?: boolean;
    /** Rótulo da ação no fim da frase. Sem valor, esconde a ação. */
    actionLabel?: string;
    /** Ícone Lucide da ação, como `i-lucide-arrow-up-right`. Sem valor, a ação é só texto. */
    actionIcon?: string;
  }>(),
  {
    status: "error",
    appearance: "banner",
    app: false,
    message: undefined,
    description: undefined,
    title: undefined,
    subtitle: undefined,
    icon: undefined,
    closable: true,
    actionLabel: undefined,
    actionIcon: undefined,
  },
);

const emit = defineEmits<{
  close: [];
  action: [];
}>();

const surfaceClass = computed(() => {
  if (props.status === "success") return "bg-[var(--ads-status-success-100)]";
  if (props.status === "warning" || props.status === "attention") return "bg-[var(--ads-toast-warning-bg)]";
  if (props.status === "neutral") return "bg-[var(--ads-toast-neutral-bg)]";
  if (props.status === "loading") return "bg-[var(--ads-toast-primary-bg)]";
  return "bg-[var(--ads-toast-error-bg)]";
});

const iconClass = computed(() => {
  if (props.status === "success") return "text-[var(--ads-toast-success-icon)]";
  if (props.status === "warning" || props.status === "attention") return "text-[var(--ads-toast-warning-icon)]";
  if (props.status === "neutral") return "text-[var(--ads-toast-neutral-icon)]";
  if (props.status === "loading") return "text-[var(--ads-toast-primary-icon)]";
  return "text-[var(--ads-toast-error-icon)]";
});

const showIcon = computed(() => props.icon !== false);

/** Caixa do token. O CSS unlayered do Iconify não define o tamanho: a classe .ads-toast-icon ocupa a caixa. */
const bannerIconBox = { width: "var(--ads-toast-icon)", height: "var(--ads-toast-icon)", "--ads-toast-icon-size": "var(--ads-toast-icon)" };
const statusIconBox = { width: "var(--ads-toast-status-icon)", height: "var(--ads-toast-status-icon)", "--ads-toast-icon-size": "var(--ads-toast-status-icon)" };

const resolvedIcon = computed(() => {
  if (typeof props.icon === "string" && props.icon) return props.icon;
  if (props.status === "success") return "i-lucide-circle-check";
  if (props.status === "warning") return "i-lucide-triangle-alert";
  if (props.status === "attention") return "i-lucide-circle-alert";
  if (props.status === "neutral") return "i-lucide-calendar-fold";
  if (props.status === "loading") return "i-lucide-info";
  return "i-lucide-circle-x";
});

const statusIcon = computed(() => {
  if (props.icon) return props.icon;
  if (props.status === "success") return "i-lucide-circle-check";
  if (props.status === "warning" || props.status === "attention") return "i-lucide-triangle-alert";
  if (props.status === "loading") return "i-lucide-loader-circle";
  return "i-lucide-circle-x";
});

const statusIconClass = computed(() => {
  if (props.status === "success") return "text-[var(--ads-toast-status-success)]";
  if (props.status === "warning" || props.status === "attention") return "text-[var(--ads-toast-status-warning)]";
  if (props.status === "loading") return "text-[var(--ads-toast-status-loading)]";
  return "text-[var(--ads-toast-status-error)]";
});

const resolvedMessage = computed(() => {
  if (props.message) return props.message;
  if (props.status === "success") return "Mensagem de sucesso";
  if (props.status === "warning") return "Mensagem de alerta";
  if (props.status === "attention") return "Mensagem de atenção";
  if (props.status === "neutral") return "Mensagem de lembrete";
  if (props.status === "loading") return "Mensagem de reporte";
  return "Mensagem de erro";
});
</script>
