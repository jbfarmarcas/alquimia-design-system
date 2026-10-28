<template>
  <span
    class="inline-flex h-[18px] shrink-0 items-center justify-center rounded-full px-2 py-1 text-[10px] font-bold leading-[1.1] whitespace-nowrap"
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
  "nao-iniciado": "bg-[#d1d9ed] text-[#18224b]",
  pausado: "bg-[#ffe7b9] text-[#8f6600]",
  novo: "bg-[#79e9ff] text-[#006478]",
};

const labels: Record<AdsMiniPillType, string> = {
  "nao-iniciado": "Não iniciado",
  pausado: "Pausado",
  novo: "Novo",
};

const surfaceClass = computed(() => surfaces[props.type]);
const resolvedLabel = computed(() => props.label ?? labels[props.type]);
</script>
