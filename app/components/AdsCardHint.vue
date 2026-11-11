<template>
  <span class="inline-flex shrink-0" :class="align === 'end' ? 'order-last ml-auto' : undefined">
    <AdsTooltip :description="text" :show-title="false" class="inline-flex">
      <!-- span focável, e não button: o card inteiro pode ser um botão -->
      <span
        tabindex="0"
        role="img"
        class="inline-flex size-4 items-center justify-center rounded-[var(--ads-radius-circular)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-border-focused)]"
        :class="colorClass"
        :aria-label="text"
      >
        <UIcon :name="icon" class="size-4" aria-hidden="true" />
      </span>
    </AdsTooltip>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AdsTooltip from "./AdsTooltip.vue";

/** Cor do ícone do balão. `secondary` é o cinza do Figma. */
export type AdsCardHintColor = "secondary" | "primary" | "brand" | "success" | "attention" | "warning" | "new" | "ai";

/** `start` fica junto do título. `end` encosta no fim da linha, à direita. */
export type AdsCardHintAlign = "start" | "end";

const props = withDefaults(
  defineProps<{
    /** Texto do balão. Também nomeia o ícone para leitor de tela. */
    text: string;
    /** Ícone Lucide. Padrão: informação. */
    icon?: string;
    color?: AdsCardHintColor;
    align?: AdsCardHintAlign;
  }>(),
  {
    icon: "i-lucide-info",
    color: "secondary",
    align: "start",
  },
);

const colorClasses: Record<AdsCardHintColor, string> = {
  secondary: "text-[var(--ads-text-secondary)]",
  primary: "text-[var(--ads-text-primary)]",
  brand: "text-[var(--ads-text-brand)]",
  success: "text-[var(--ads-status-success-800)]",
  attention: "text-[var(--ads-status-attention-800)]",
  warning: "text-[var(--ads-status-warning-800)]",
  new: "text-[var(--ads-status-new-800)]",
  ai: "text-[var(--ads-text-ai)]",
};

const colorClass = computed(() => colorClasses[props.color]);
</script>
