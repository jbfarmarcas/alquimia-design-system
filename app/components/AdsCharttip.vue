<template>
  <DefinePanel>
    <div class="flex min-w-[var(--ads-charttip-min-width)] flex-col gap-4 rounded-[var(--ads-tooltip-radius)] bg-[var(--ads-tooltip-bg)] p-4 text-[var(--ads-tooltip-title)] shadow-[var(--ads-shadow-level-1)]">
      <p v-if="title" class="text-center text-base leading-[1.3] font-bold">{{ title }}</p>
      <ul class="flex flex-col gap-2">
        <li v-for="(row, index) in rows" :key="index" class="flex items-center gap-2 text-sm leading-[1.3]">
          <span class="size-[var(--ads-charttip-swatch)] shrink-0 rounded-[var(--ads-radius-xsm)]" :class="row.colorClass" :style="row.color ? { background: row.color } : undefined" />
          <span class="min-w-0 flex-1">{{ row.label }}</span>
          <span>{{ row.value }}</span>
        </li>
      </ul>
    </div>
  </DefinePanel>

  <UTooltip
    v-if="hasTrigger"
    :delay-duration="delayDuration"
    :content="{ side, align: 'center', sideOffset: 8 }"
    :ui="tooltipUi"
  >
    <slot />
    <template #content>
      <ReusePanel />
    </template>
  </UTooltip>
  <ReusePanel v-else />
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { createReusableTemplate } from "@vueuse/core";

export type AdsCharttipRow = {
  label: string;
  value: string;
  /** Classe de fundo, como `bg-ads-grafico-c1-400`. */
  colorClass?: string;
  /** Cor sem token. Preferir `colorClass`. */
  color?: string;
};

const props = withDefaults(
  defineProps<{
    title?: string;
    rows?: AdsCharttipRow[];
    /** Figma `Property 1`. Com slot, escolhe o lado em que o painel abre, como no AdsTooltip. A seta não é desenhada. */
    wing?: "up" | "down" | "left" | "right";
    delayDuration?: number;
  }>(),
  {
    title: "Título",
    rows: () => [
      { label: "Série 1", value: "12", colorClass: "bg-ads-grafico-c1-400" },
      { label: "Série 2", value: "8", colorClass: "bg-ads-innovation-500" },
      { label: "Série 3", value: "5", colorClass: "bg-ads-grafico-c3-400" },
    ],
    wing: "down",
    delayDuration: 150,
  },
);

const [DefinePanel, ReusePanel] = createReusableTemplate();

const slots = useSlots();
const hasTrigger = computed(() => Boolean(slots.default));

const side = computed(() => {
  if (props.wing === "down") return "bottom" as const;
  if (props.wing === "left") return "left" as const;
  if (props.wing === "right") return "right" as const;
  return "top" as const;
});

/** O painel já tem fundo, raio e sombra: o conteúdo do UTooltip só posiciona. */
const tooltipUi = {
  content: "z-[70] h-auto rounded-none bg-transparent p-0 shadow-none ring-0",
};
</script>
