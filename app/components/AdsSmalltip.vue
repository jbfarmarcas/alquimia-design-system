<template>
  <UTooltip
    v-if="hasTrigger"
    arrow
    :delay-duration="delayDuration"
    :content="{ side: 'top', align: 'center', sideOffset: 4, arrowPadding }"
    :ui="tooltipUi"
  >
    <slot />
    <template #content>
      <span class="text-[length:var(--ads-tooltip-small-font-size)] leading-[1.1] text-[var(--ads-tooltip-title)]">{{ text }}</span>
    </template>
  </UTooltip>
  <p
    v-else
    class="inline-flex rounded-[var(--ads-tooltip-radius)] bg-[var(--ads-tooltip-bg)] p-[var(--ads-tooltip-small-padding)] text-[length:var(--ads-tooltip-small-font-size)] leading-[1.1] text-[var(--ads-tooltip-title)] shadow-[var(--ads-shadow-level-1)]"
  >
    {{ text }}
  </p>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

withDefaults(
  defineProps<{
    text?: string;
    delayDuration?: number;
  }>(),
  {
    text: "Clique para ver mais",
    delayDuration: 150,
  },
);

const slots = useSlots();
const hasTrigger = computed(() => Boolean(slots.default));

/** Igual a `--ads-tooltip-radius`. Sem isso, a seta no canto fica sobre a curva e solta do balão. */
const arrowPadding = 12;

const tooltipUi = {
  content:
    "z-[70] rounded-[var(--ads-tooltip-radius)] bg-[var(--ads-tooltip-bg)] p-[var(--ads-tooltip-small-padding)] shadow-[var(--ads-shadow-level-1)] ring-0",
  arrow: "fill-[var(--ads-tooltip-bg)]",
};
</script>
