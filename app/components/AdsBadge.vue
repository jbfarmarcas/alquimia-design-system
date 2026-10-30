<template>
  <span
    v-if="mini"
    class="inline-block size-[var(--ads-badge-dot)] shrink-0 rounded-full"
    :class="surfaceClass"
    aria-hidden="true"
  />
  <span
    v-else
    class="inline-flex size-[var(--ads-badge-size)] shrink-0 items-center justify-center overflow-hidden rounded-full px-[5px] py-1 text-[length:var(--ads-badge-font-size)] [font-weight:var(--ads-badge-weight)] leading-[1.2]"
    :class="surfaceClass"
  >
    {{ value }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type AdsBadgeColor = "primary" | "success" | "attention" | "warning" | "new" | "innovation" | "blocked";

const props = withDefaults(
  defineProps<{
    /** Cor do contador. Innovation usa o rosa do handoff (#fde3ff / data-1 800). */
    color?: AdsBadgeColor;
    /** Ponto de 8px, sem número. */
    mini?: boolean;
    value?: string | number;
  }>(),
  {
    color: "primary",
    mini: false,
    value: 2,
  },
);

const surfaces: Record<AdsBadgeColor, string> = {
  primary: "bg-[var(--ads-surface-brand)] text-[var(--ads-badge-text)]",
  success: "bg-[var(--ads-status-success-500)] text-[var(--ads-badge-text)]",
  attention: "bg-[var(--ads-status-attention-500)] text-[var(--ads-badge-text)]",
  warning: "bg-[var(--ads-status-warning-500)] text-[var(--ads-badge-text)]",
  new: "bg-[var(--ads-status-new-500)] text-[var(--ads-badge-text)]",
  innovation: "bg-[#fde3ff] text-[var(--ads-chart-data-1-800)]",
  blocked: "bg-[var(--ads-status-void-800)] text-[var(--ads-badge-text)]",
};

const surfaceClass = computed(() => surfaces[props.color]);
</script>
