<template>
  <UTooltip
    :text="text"
    arrow
    :delay-duration="delayDuration"
    :disabled="disabled || !text"
    :content="content"
    :ui="tooltipUi"
  >
    <slot />
  </UTooltip>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string;
    delayDuration?: number;
    disabled?: boolean;
    content?: {
      side?: "top" | "right" | "bottom" | "left";
      align?: "start" | "center" | "end";
      sideOffset?: number;
    };
  }>(),
  {
    delayDuration: 150,
    disabled: false,
    content: () => ({ side: "top", align: "start", sideOffset: 8 }),
  },
);

/** Tooltip padrão escuro do produto (`bg-inverted`). */
const tooltipUi = {
  content:
    "z-[70] h-auto max-w-xs rounded-[var(--ads-tooltip-radius)] bg-[var(--ads-tooltip-bg)] px-[var(--ads-tooltip-padding-x)] py-[var(--ads-tooltip-padding-y)] text-[length:var(--ads-tooltip-font-size)] text-[var(--ads-tooltip-text)] shadow-lg ring-0",
  text: "whitespace-normal",
  arrow: "fill-[var(--ads-tooltip-bg)]",
};
</script>
