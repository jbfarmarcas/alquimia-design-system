<template>
  <span
    class="inline-flex h-[var(--ads-pill-height)] min-w-[var(--ads-pill-min-width)] shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full px-[var(--ads-pill-padding-x)] py-1 text-center text-[length:var(--ads-pill-font-size)] [font-weight:var(--ads-pill-weight)] leading-[1.2] whitespace-nowrap"
    :class="surfaceClass"
  >
    <UIcon
      v-if="icon"
      :name="icon"
      class="size-3.5 shrink-0"
      :class="iconClass"
      aria-hidden="true"
    />
    {{ resolvedLabel }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type AdsPillStatus = "default" | "success" | "attention" | "warning" | "new" | "blocked" | "innovation" | "neutral";
export type AdsPillTone = "primary" | "secondary";

const props = withDefaults(
  defineProps<{
    status?: AdsPillStatus;
    tone?: AdsPillTone;
    label?: string;
    icon?: string;
    /** Classes do ícone, como o giro do carregamento. */
    iconClass?: string;
  }>(),
  {
    status: "default",
    tone: "primary",
    label: undefined,
    icon: undefined,
    iconClass: undefined,
  },
);

/** Coleta manual: primary com fundo charts/data-1/800 e texto branco; secondary com fundo #fde3ff. */
const innovationSecondary = "bg-[#fde3ff] text-[var(--ads-chart-data-1-800)]";

const surfaces: Record<AdsPillTone, Record<AdsPillStatus, string>> = {
  primary: {
    default: "bg-[var(--ads-pill-primary-bg)] text-[var(--ads-pill-primary-text)]",
    success: "bg-[#15c57e] text-white",
    attention: "bg-[#e9a700] text-white",
    warning: "bg-[#dc0034] text-white",
    new: "bg-[#05b4d8] text-white",
    blocked: "bg-[#0e1013] text-white",
    innovation: "bg-[var(--ads-chart-data-1-800)] text-white",
    neutral: "bg-[var(--color-neutral-300)] text-[var(--ads-text-primary)]",
  },
  secondary: {
    default: "bg-[#e4f2ff] text-[#00389e]",
    success: "bg-[#c3ffe6] text-[#0e5a3b]",
    attention: "bg-[#ffe7b9] text-[#8f6600]",
    warning: "bg-[#ffbdcd] text-[#840221]",
    new: "bg-[#c4f5ff] text-[#006478]",
    blocked: "bg-[#cfdef3] text-[#0e1013]",
    innovation: innovationSecondary,
    neutral: "bg-[var(--color-neutral-200)] text-[var(--ads-text-primary)]",
  },
};

const labels: Record<AdsPillTone, Record<AdsPillStatus, string>> = {
  primary: {
    default: "Primary",
    success: "Success",
    attention: "Attention",
    warning: "Warning",
    new: "New!",
    blocked: "Blocked",
    innovation: "Inovação",
    neutral: "Neutral",
  },
  secondary: {
    default: "Secondary",
    success: "Success",
    attention: "Attention",
    warning: "Warning",
    new: "New!",
    blocked: "Blocked",
    innovation: "Inovação",
    neutral: "Neutral",
  },
};

const surfaceClass = computed(() => surfaces[props.tone][props.status]);
const resolvedLabel = computed(() => props.label ?? labels[props.tone][props.status]);
</script>
