<template>
  <span
    class="inline-flex h-[var(--ads-mini-height)] shrink-0 items-center justify-center rounded-full px-[var(--ads-mini-padding-x)] py-1 text-[length:var(--ads-mini-font-size)] [font-weight:var(--ads-mini-weight)] leading-[1.1] whitespace-nowrap"
    :class="surfaceClass"
  >
    {{ resolvedLabel }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

type AdsMiniPillType = "nao-iniciado" | "pausado" | "novo";

const props = withDefaults(
  defineProps<{
    type?: AdsMiniPillType;
    label?: string;
  }>(),
  {
    type: "nao-iniciado",
    label: undefined,
  },
);

const surfaces: Record<AdsMiniPillType, string> = {
  "nao-iniciado": "bg-[var(--ads-mini-idle-bg)] text-[var(--ads-mini-idle-text)]",
  pausado: "bg-[var(--ads-mini-paused-bg)] text-[var(--ads-mini-paused-text)]",
  novo: "bg-[var(--ads-mini-new-bg)] text-[var(--ads-mini-new-text)]",
};

const labels: Record<AdsMiniPillType, string> = {
  "nao-iniciado": "Não iniciado",
  pausado: "Pausado",
  novo: "Novo",
};

const surfaceClass = computed(() => surfaces[props.type]);
const resolvedLabel = computed(() => props.label ?? labels[props.type]);
</script>
