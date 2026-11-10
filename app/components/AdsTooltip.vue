<template>
  <UTooltip
    v-if="hasTrigger"
    arrow
    :delay-duration="delayDuration"
    :disabled="disabled"
    :content="{ side, align, sideOffset: 8 }"
    :ui="tooltipUi"
  >
    <slot />
    <template #content>
      <div class="flex max-w-[328px] flex-col gap-1 text-[var(--ads-text-contrast)]">
        <p v-if="showTitle" class="text-[length:var(--ads-tooltip-title-size)] leading-[1.3] font-bold text-[var(--ads-tooltip-title)]">{{ title }}</p>
        <p v-if="showDescription" class="text-[length:var(--ads-tooltip-font-size)] leading-[1.3] text-[var(--ads-tooltip-title)]">{{ description }}</p>
      </div>
    </template>
  </UTooltip>
  <div
    v-else
    class="flex max-w-[328px] flex-col gap-1 rounded-[var(--ads-tooltip-radius)] bg-[var(--ads-tooltip-bg)] p-[var(--ads-tooltip-padding-x)] text-[var(--ads-tooltip-title)] shadow-[var(--ads-shadow-level-1)]"
  >
    <p v-if="showTitle" class="text-[length:var(--ads-tooltip-title-size)] leading-[1.3] font-bold">{{ title }}</p>
    <p v-if="showDescription" class="text-[length:var(--ads-tooltip-font-size)] leading-[1.3]">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

type Wing = "up" | "down" | "left" | "right";

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    showTitle?: boolean;
    showDescription?: boolean;
    /** Figma `Wing Position`. */
    wing?: Wing;
    delayDuration?: number;
    /** Alinhamento do balão em relação ao gatilho. */
    align?: "start" | "center" | "end";
    /** Não abre o balão. Útil para texto que só aparece quando é cortado. */
    disabled?: boolean;
  }>(),
  {
    title: "Título",
    description: "Descrição do tooltip.",
    showTitle: true,
    showDescription: true,
    wing: "up",
    delayDuration: 150,
    align: "center",
    disabled: false,
  },
);

const slots = useSlots();
const hasTrigger = computed(() => Boolean(slots.default));

const side = computed(() => {
  if (props.wing === "down") return "bottom" as const;
  if (props.wing === "left") return "left" as const;
  if (props.wing === "right") return "right" as const;
  return "top" as const;
});

const tooltipUi = {
  content:
    "z-[70] h-auto max-w-[328px] rounded-[var(--ads-tooltip-radius)] bg-[var(--ads-tooltip-bg)] p-[var(--ads-tooltip-padding-x)] shadow-[var(--ads-shadow-level-1)] ring-0",
  arrow: "fill-[var(--ads-tooltip-bg)]",
};
</script>
