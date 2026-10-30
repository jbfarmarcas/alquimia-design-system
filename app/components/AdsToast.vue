<template>
  <div
    v-if="appearance === 'status'"
    class="flex w-[var(--ads-toast-status-width)] max-w-full items-center justify-between gap-3 rounded-[var(--ads-toast-radius)] bg-[var(--ads-toast-status-bg)] p-3 text-[var(--ads-toast-status-text)] shadow-[var(--ads-shadow-level-1)]"
    role="status"
  >
    <div class="flex min-w-0 items-center gap-3">
      <UIcon
        :name="statusIcon"
        class="size-[var(--ads-toast-status-icon)] shrink-0"
        :class="[statusIconClass, status === 'loading' ? 'animate-spin' : '']"
        aria-hidden="true"
      />
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
      <UIcon
        :name="resolvedIcon"
        class="size-[var(--ads-toast-icon)] shrink-0"
        :class="iconClass"
        aria-hidden="true"
      />
      <div class="min-w-0 flex-1">
        <slot>
          <p class="text-[length:var(--ads-toast-font-size)] [font-weight:var(--ads-toast-weight)] leading-[1.3] text-[var(--ads-toast-text)]">
            {{ resolvedMessage }}
          </p>
        </slot>
      </div>
    </div>
    <div
      v-if="actionLabel || closable"
      class="ml-auto flex shrink-0 items-center gap-2"
    >
      <AdsButton
        v-if="actionLabel"
        size="sm"
        :color="actionColor"
        :leading="Boolean(actionIcon)"
        :icon="actionIcon"
        :label="actionLabel"
        @click="emit('action')"
      />
      <button
        v-if="closable"
        type="button"
        class="flex size-6 shrink-0 items-center justify-center rounded text-[var(--ads-text-primary)] hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-primary)]"
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
import AdsButton from "./AdsButton.vue";
import type { AdsButtonColor } from "./AdsButton.vue";

export type AdsToastStatus = "primary" | "success" | "error" | "warning" | "neutral" | "loading";
export type AdsToastAppearance = "banner" | "status";

const props = withDefaults(
  defineProps<{
    status?: AdsToastStatus;
    /** `banner` é a faixa clara. `status` é o reporte escuro (Figma Status Toast). */
    appearance?: AdsToastAppearance;
    /** Faixa estreita de 331px, a variação `App` do ADS. */
    app?: boolean;
    message?: string;
    title?: string;
    subtitle?: string;
    icon?: string;
    /** Quando falso, o aviso permanece sem a ação de fechar. */
    closable?: boolean;
    /** Recuperação na própria faixa, como tentar de novo. */
    actionLabel?: string;
    /** Ícone da ação. Vazio esconde o ícone. */
    actionIcon?: string;
  }>(),
  {
    status: "error",
    appearance: "banner",
    app: false,
    message: undefined,
    title: undefined,
    subtitle: undefined,
    icon: undefined,
    closable: true,
    actionLabel: undefined,
    actionIcon: "i-lucide-refresh-cw",
  },
);

const emit = defineEmits<{
  close: [];
  action: [];
}>();

const actionColor = computed((): AdsButtonColor => {
  if (props.status === "success") return "success";
  if (props.status === "warning") return "attention";
  if (props.status === "primary") return "primary";
  if (props.status === "neutral") return "neutral";
  return "warning";
});

const surfaceClass = computed(() => {
  if (props.status === "primary") return "bg-[var(--ads-toast-primary-bg)]";
  if (props.status === "success") return "bg-[var(--ads-status-success-100)]";
  if (props.status === "warning") return "bg-[var(--ads-toast-warning-bg)]";
  if (props.status === "neutral") return "bg-[var(--ads-toast-neutral-bg)]";
  if (props.status === "loading") return "bg-[var(--ads-toast-primary-bg)]";
  return "bg-[var(--ads-toast-error-bg)]";
});

const iconClass = computed(() => {
  if (props.status === "primary") return "text-[var(--ads-toast-primary-icon)]";
  if (props.status === "success") return "text-[var(--ads-toast-success-icon)]";
  if (props.status === "warning") return "text-[var(--ads-toast-warning-icon)]";
  if (props.status === "neutral") return "text-[var(--ads-toast-neutral-icon)]";
  if (props.status === "loading") return "text-ads-oportunidade-300";
  return "text-[var(--ads-toast-error-icon)]";
});

const resolvedIcon = computed(() => {
  if (props.icon) return props.icon;
  if (props.status === "primary") return "i-lucide-info";
  if (props.status === "success") return "i-lucide-circle-check";
  if (props.status === "warning") return "i-lucide-triangle-alert";
  if (props.status === "neutral") return "i-lucide-calendar-fold";
  if (props.status === "loading") return "i-lucide-loader-circle";
  return "i-lucide-circle-x";
});

const statusIcon = computed(() => {
  if (props.icon) return props.icon;
  if (props.status === "success") return "i-lucide-circle-check";
  if (props.status === "warning") return "i-lucide-triangle-alert";
  if (props.status === "loading") return "i-lucide-loader-circle";
  return "i-lucide-circle-x";
});

const statusIconClass = computed(() => {
  if (props.status === "success") return "text-[var(--ads-toast-status-success)]";
  if (props.status === "warning") return "text-[var(--ads-toast-status-warning)]";
  if (props.status === "loading") return "text-[var(--ads-toast-status-loading)]";
  return "text-[var(--ads-toast-status-error)]";
});

const resolvedMessage = computed(() => {
  if (props.message) return props.message;
  if (props.status === "primary") return "Mensagem informativa";
  if (props.status === "success") return "Mensagem de sucesso";
  if (props.status === "warning") return "Mensagem de alerta";
  if (props.status === "neutral") return "Mensagem de lembrete";
  if (props.status === "loading") return "Mensagem de reporte";
  return "Mensagem de erro";
});
</script>
