<template>
  <UModal
    :model-value="true"
    :dismissible="false"
    :ui="{
      overlay: 'backdrop-blur-lg',
      content: 'bg-transparent shadow-none ring-0',
    }"
  >
    <template #description>
      <div class="sr-only">
        {{ description }}
      </div>
    </template>

    <template #title>
      <div class="sr-only">
        {{ title }}
      </div>
    </template>

    <template #content>
      <div class="px-10 text-center">
        <div class="mb-4 flex justify-center">
          <div
            class="flex aspect-square h-20 items-center justify-center rounded-full"
            :class="feedback.surface"
          >
            <img v-if="iconSrc" :src="iconSrc" alt="" class="w-full">
            <UIcon
              v-else
              :key="variant"
              :name="feedback.icon"
              mode="svg"
              class="ads-overlay-icon size-10"
              :class="[feedback.color, feedback.animation]"
              aria-hidden="true"
            />
          </div>
        </div>

        <h3 class="mb-2 text-lg leading-[1.3] font-bold" :class="feedback.title">
          {{ title }}
        </h3>

        <p
          class="mb-4 text-sm leading-[1.3] tabular-nums"
          :class="feedback.description"
          role="status"
          aria-live="polite"
        >
          {{ description }}
        </p>

        <UProgress
          v-if="showProgress"
          :model-value="progress"
          :max="100"
          size="sm"
          class="mx-auto mb-4 max-w-xs"
        />

        <p
          v-if="hint"
          class="mb-4 text-xs tabular-nums text-[var(--ads-text-tertiary)]"
          aria-live="polite"
        >
          {{ hint }}
        </p>

        <div
          v-if="actionLabel || secondaryActionLabel"
          class="flex flex-wrap items-center justify-center gap-2"
        >
          <AdsButton
            v-if="actionLabel"
            :leading="Boolean(resolvedActionIcon)"
            :icon="resolvedActionIcon"
            :label="actionLabel"
            @click="onAction?.()"
          />
          <AdsButton
            v-if="secondaryActionLabel"
            type="unfilled"
            :leading="Boolean(secondaryActionIcon)"
            :icon="secondaryActionIcon"
            :label="secondaryActionLabel"
            @click="onSecondaryClick"
          />
        </div>

        <slot />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { OverlayLoadingProps } from "../types/overlay-loading.types";
import AdsButton from "./AdsButton.vue";

const emit = defineEmits<{
  close: [];
}>();

const props = withDefaults(defineProps<OverlayLoadingProps>(), {
  title: "Carregando...",
  description: "Aguarde enquanto processamos as informações.",
  hint: "",
  showProgress: false,
  progress: 0,
  variant: "loading",
  iconSrc: "",
  actionLabel: "",
  actionIcon: undefined,
  onAction: undefined,
  secondaryActionLabel: "",
  secondaryActionIcon: undefined,
  onSecondaryAction: undefined,
  onUserClose: undefined,
});

type Feedback = {
  icon: string;
  animation: string;
  surface: string;
  color: string;
  title: string;
  description: string;
};

const neutralText = {
  title: "text-[var(--ads-text-primary)]",
  description: "text-[var(--ads-text-secondary)]",
};

/**
 * Cada estado usa um ícone Lucide em SVG inline (o traço pode ser animado) e as cores de status do ADS.
 * - loading: loader-circle girando.
 * - search: lupa percorrendo um pequeno círculo.
 * - info: info pulsando.
 * - success: traço desenhado e um pulo no fim.
 * - error (status/warning, vermelho): traço desenhado e tremida.
 * - warning (status/attention, amarelo): triângulo desenhado e balanço.
 * Com movimento reduzido no sistema, os ícones aparecem parados.
 */
const feedbacks: Record<OverlayVariant, Feedback> = {
  loading: {
    icon: "i-lucide-loader-circle",
    animation: "ads-overlay-icon--loading",
    surface: "bg-ads-radar-25",
    color: "text-[var(--ads-text-brand)]",
    ...neutralText,
  },
  search: {
    icon: "i-lucide-search",
    animation: "ads-overlay-icon--search",
    surface: "bg-ads-radar-25",
    color: "text-[var(--ads-text-brand)]",
    ...neutralText,
  },
  info: {
    icon: "i-lucide-info",
    animation: "ads-overlay-icon--info",
    surface: "bg-ads-radar-25",
    color: "text-[var(--ads-text-brand)]",
    ...neutralText,
  },
  success: {
    icon: "i-lucide-circle-check",
    animation: "ads-overlay-icon--draw ads-overlay-icon--success",
    surface: "bg-ads-status-success-100",
    color: "text-ads-status-success-700",
    title: "text-ads-status-success-800",
    description: "text-ads-status-success-700",
  },
  error: {
    icon: "i-lucide-circle-x",
    animation: "ads-overlay-icon--draw ads-overlay-icon--error",
    surface: "bg-ads-status-warning-100",
    color: "text-ads-status-warning-700",
    title: "text-ads-status-warning-800",
    description: "text-ads-status-warning-700",
  },
  warning: {
    icon: "i-lucide-triangle-alert",
    animation: "ads-overlay-icon--draw ads-overlay-icon--warning",
    surface: "bg-ads-status-attention-100",
    color: "text-ads-status-attention-700",
    title: "text-ads-status-attention-800",
    description: "text-ads-status-attention-700",
  },
};

const feedback = computed(() => feedbacks[props.variant] ?? feedbacks.loading);

/** Sem actionIcon, só o erro ganha o ícone de tentar de novo. */
const resolvedActionIcon = computed(() =>
  props.actionIcon ?? (props.variant === "error" ? "i-lucide-refresh-cw" : undefined),
);

const handleClose = () => {
  props.onUserClose?.();
  emit("close");
};

/** Sem onSecondaryAction, a ação secundária fecha o overlay (ex.: "Fechar" ao lado de "Tentar novamente"). */
const onSecondaryClick = () => {
  if (props.onSecondaryAction) props.onSecondaryAction();
  else handleClose();
};
</script>

<style>
.ads-overlay-icon--loading {
  animation: ads-overlay-spin 0.9s linear infinite;
}

.ads-overlay-icon--search {
  animation: ads-overlay-search 1.6s ease-in-out infinite;
}

.ads-overlay-icon--info {
  animation: ads-overlay-pulse 1.6s ease-in-out infinite;
}

.ads-overlay-icon--success {
  animation: ads-overlay-pop 0.45s ease-out 0.75s both;
}

.ads-overlay-icon--error {
  animation: ads-overlay-shake 0.45s ease-in-out 0.75s both;
}

.ads-overlay-icon--warning {
  transform-origin: 50% 85%;
  animation: ads-overlay-swing 0.7s ease-in-out 0.75s both;
}

.ads-overlay-icon--draw :is(path, circle, line, polyline) {
  stroke-dasharray: 80;
  stroke-dashoffset: 80;
  animation: ads-overlay-draw 0.5s ease-out forwards;
}

.ads-overlay-icon--draw :is(path, circle, line, polyline):not(:first-child) {
  animation-delay: 0.35s;
}

@keyframes ads-overlay-spin {
  to { transform: rotate(360deg); }
}

@keyframes ads-overlay-search {
  0%, 100% { transform: translate(-3px, 0); }
  25% { transform: translate(0, -3px); }
  50% { transform: translate(3px, 0); }
  75% { transform: translate(0, 3px); }
}

@keyframes ads-overlay-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.75; }
}

@keyframes ads-overlay-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes ads-overlay-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

@keyframes ads-overlay-shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-3px); }
  40%, 80% { transform: translateX(3px); }
}

@keyframes ads-overlay-swing {
  0%, 100% { transform: rotate(0); }
  20% { transform: rotate(-10deg); }
  40% { transform: rotate(8deg); }
  60% { transform: rotate(-5deg); }
  80% { transform: rotate(3deg); }
}

@media (prefers-reduced-motion: reduce) {
  .ads-overlay-icon,
  .ads-overlay-icon * {
    animation: none !important;
    stroke-dashoffset: 0 !important;
  }
}
</style>
