<template>
  <div
    class="flex flex-wrap items-center gap-[var(--ads-toast-gap)] rounded-[var(--ads-toast-radius)] p-[var(--ads-toast-padding)]"
    :class="[surfaceClass, app ? 'w-[331px] max-w-full' : 'w-full']"
    role="status"
  >
    <div class="flex min-w-0 flex-1 basis-full items-start gap-2 sm:basis-auto">
      <UIcon
        :name="resolvedIcon"
        class="mt-0.5 size-[var(--ads-toast-icon)] shrink-0 text-[var(--ads-toast-text)]"
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

export type AdsToastStatus = "primary" | "success" | "error" | "warning" | "neutral";

const props = withDefaults(
  defineProps<{
    status?: AdsToastStatus;
    /** Faixa estreita de 331px, a variação `App` do ADS. */
    app?: boolean;
    message?: string;
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
    app: false,
    message: undefined,
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
  return "bg-[var(--ads-toast-error-bg)]";
});

const resolvedIcon = computed(() => {
  if (props.icon) return props.icon;
  if (props.status === "primary") return "i-lucide-info";
  if (props.status === "success") return "i-lucide-circle-check";
  if (props.status === "warning") return "i-lucide-triangle-alert";
  if (props.status === "neutral") return "i-lucide-calendar-fold";
  return "i-lucide-circle-x";
});

const resolvedMessage = computed(() => {
  if (props.message) return props.message;
  if (props.status === "primary") return "Mensagem informativa";
  if (props.status === "success") return "Mensagem de sucesso";
  if (props.status === "warning") return "Mensagem de alerta";
  if (props.status === "neutral") return "Mensagem de lembrete";
  return "Mensagem de erro";
});
</script>
