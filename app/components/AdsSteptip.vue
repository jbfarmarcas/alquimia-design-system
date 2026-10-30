<template>
  <DefinePanel>
    <div class="flex w-[var(--ads-steptip-width)] flex-col gap-3 rounded-[var(--ads-tooltip-radius)] bg-[var(--ads-tooltip-bg)] p-4 text-[var(--ads-tooltip-title)] shadow-[var(--ads-shadow-level-1)]">
      <div class="flex items-start justify-between gap-3">
        <p class="text-base leading-[1.3] font-bold">{{ title }}</p>
        <p class="shrink-0 text-xs leading-[1.2] font-medium">{{ step }}/{{ totalSteps }}</p>
      </div>
      <p class="text-sm leading-[1.3]">{{ description }}</p>
      <div class="flex items-center justify-between gap-3">
        <button
          type="button"
          class="text-base text-[var(--ads-steptip-skip)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-tooltip-title)]"
          @click="emit('skip')"
        >
          {{ skipLabel }}
        </button>
        <div class="flex items-center gap-3">
          <button
            v-if="step > 1"
            type="button"
            class="text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-contrast)]"
            @click="emit('back')"
          >
            {{ backLabel }}
          </button>
          <button
            type="button"
            class="text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-contrast)]"
            @click="step >= totalSteps ? emit('finish') : emit('next')"
          >
            {{ step >= totalSteps ? finishLabel : nextLabel }}
          </button>
        </div>
      </div>
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

const [DefinePanel, ReusePanel] = createReusableTemplate();

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    step?: number;
    totalSteps?: number;
    skipLabel?: string;
    backLabel?: string;
    nextLabel?: string;
    finishLabel?: string;
    /** Lado do gatilho onde o passo abre. Só vale com slot. */
    side?: "top" | "right" | "bottom" | "left";
    delayDuration?: number;
  }>(),
  {
    title: "Título do passo",
    description: "Texto que orienta a pessoa neste passo.",
    step: 1,
    totalSteps: 3,
    skipLabel: "pular",
    backLabel: "voltar",
    nextLabel: "próximo",
    finishLabel: "concluir",
    side: "bottom",
    delayDuration: 150,
  },
);

const emit = defineEmits<{
  skip: [];
  back: [];
  next: [];
  finish: [];
}>();

const slots = useSlots();
const hasTrigger = computed(() => Boolean(slots.default));
const side = computed(() => props.side);

/** O painel já tem fundo, raio e sombra: o conteúdo do UTooltip só posiciona. */
const tooltipUi = {
  content: "z-[70] h-auto rounded-none bg-transparent p-0 shadow-none ring-0",
};
</script>
