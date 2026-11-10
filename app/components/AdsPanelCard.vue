<template>
  <section
    class="flex flex-col gap-4 border border-[var(--ads-card-border)] bg-[var(--ads-card-background)] p-6"
    :class="[radiusClass, loading ? 'relative overflow-hidden' : '']"
    :aria-busy="loading || undefined"
  >
    <!-- Overlay de carregamento (shimmer sobre o conteúdo existente). Só no código. -->
    <AdsLoading v-if="loading" variant="shimmer" overlay />

    <div v-if="showHeader" class="flex w-full items-start gap-4">
      <div class="flex min-w-0 flex-1 flex-col items-start gap-1">
        <slot name="header">
          <div v-if="title || hint" class="flex min-w-0 max-w-full items-center gap-2">
            <h3 v-if="title" class="min-w-0 text-[length:var(--ads-font-size-xs)] font-normal leading-[1.3] text-[var(--ads-card-title)]">
              {{ title }}
            </h3>
            <AdsCardHint v-if="hint" :text="hint" />
          </div>
          <p v-if="subtitle" class="text-[length:var(--ads-font-size-xxxs)] leading-[1.2] text-[var(--ads-text-secondary)]">
            {{ subtitle }}
          </p>
        </slot>
      </div>

      <div v-if="$slots.actions || viewToggle" class="flex shrink-0 items-center gap-2">
        <slot name="actions" />
        <div v-if="viewToggle" class="flex items-center gap-1" role="group" aria-label="Visualização">
          <button
            v-for="option in VIEW_OPTIONS"
            :key="option.value"
            type="button"
            class="flex size-8 items-center justify-center rounded-[var(--ads-radius-sm)] text-[var(--ads-text-primary)] transition-colors hover:bg-ads-neutro-claro-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-border-focused)]"
            :class="{ 'bg-ads-neutro-claro-20': view === option.value }"
            :aria-label="option.label"
            :aria-pressed="view === option.value"
            @click="view = option.value"
          >
            <UIcon :name="option.icon" class="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <!-- Corpo: gráfico ou tabela via slot padrão -->
    <div class="min-h-0 w-full flex-1">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import AdsCardHint from "./AdsCardHint.vue";
import AdsLoading from "./AdsLoading.vue";

export type AdsPanelCardView = "chart" | "table";

const props = withDefaults(
  defineProps<{
    /** O slot header substitui título e subtítulo. */
    title?: string;
    /** Texto do ícone de informação ao lado do título. */
    hint?: string;
    subtitle?: string;
    /** Mostra os botões Gráfico e Tabela. Use com v-model:view. */
    viewToggle?: boolean;
    /** Estado Carregando: shimmer sobre o painel. Só no código: o Figma não tem. */
    loading?: boolean;
    /** `sm` (8px) é o do Figma; `md` (12px) é só no código. */
    radius?: "sm" | "md";
  }>(),
  {
    title: undefined,
    hint: undefined,
    subtitle: undefined,
    viewToggle: false,
    loading: false,
    radius: "sm",
  },
);

/** Visualização ativa: troque o conteúdo do slot padrão conforme o valor. */
const view = defineModel<AdsPanelCardView>("view", { default: "chart" });

const VIEW_OPTIONS: { value: AdsPanelCardView; label: string; icon: string }[] = [
  { value: "chart", label: "Ver gráfico", icon: "i-lucide-chart-line" },
  { value: "table", label: "Ver tabela", icon: "i-lucide-table" },
];

const slots = useSlots();

const showHeader = computed(() =>
  Boolean(props.title || props.subtitle || props.hint || props.viewToggle || slots.header || slots.actions),
);

const radiusClass = computed(() =>
  props.radius === "md" ? "rounded-[var(--ads-card-radius)]" : "rounded-[var(--ads-card-radius-sm)]",
);
</script>
