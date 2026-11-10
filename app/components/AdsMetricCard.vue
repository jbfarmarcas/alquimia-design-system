<template>
  <component
    :is="as"
    :type="as === 'button' ? 'button' : undefined"
    :disabled="as === 'button' ? disabled : undefined"
    :aria-busy="loading || undefined"
    class="flex h-full min-w-0 rounded-[var(--ads-metric-radius)] border p-[var(--ads-metric-padding)] text-left font-normal transition-[background-color,border-color,box-shadow]"
    :class="[type === 'kpi' ? 'flex-row items-center gap-4' : 'flex-col items-start gap-3', surfaceClass]"
  >
    <!-- KPI: ícone grande à esquerda, título e valor à direita -->
    <template v-if="type === 'kpi'">
      <UIcon v-if="icon" :name="icon" class="size-6 shrink-0" :class="iconClass" aria-hidden="true" />
      <div class="flex min-w-0 flex-1 flex-col items-start gap-2">
        <div class="flex min-w-0 items-center gap-2">
          <p :class="titleClass">{{ title }}</p>
          <AdsCardHint v-if="hint" :text="hint" />
        </div>
        <span v-if="loading" :class="skeletonClass" class="h-5 w-[140px] rounded-[var(--ads-radius-xsm)]" aria-hidden="true" />
        <div v-else-if="empty" class="flex min-w-0 items-center gap-2">
          <span class="text-[length:var(--ads-font-size-rg)] font-bold leading-[1.3] text-[var(--ads-text-tertiary)]" aria-hidden="true">—</span>
          <span :class="emptyMessageClass">{{ emptyMessage }}</span>
        </div>
        <div v-else class="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <p class="text-[length:var(--ads-font-size-rg)] font-bold leading-[1.3] text-[var(--ads-text-secondary)] tabular-nums">{{ value }}</p>
          <AdsCardVariation v-if="delta" :value="delta" :direction="deltaDirection" :tone="deltaTone" />
        </div>
      </div>
    </template>

    <!-- Pendência: ícone pequeno e título em negrito; número grande com unidade -->
    <template v-else-if="type === 'pending'">
      <div class="flex w-full min-w-0 items-center gap-1">
        <UIcon v-if="icon" :name="icon" class="size-4 shrink-0" :class="iconClass" aria-hidden="true" />
        <p class="min-w-0 truncate font-bold" :class="titleClass">{{ title }}</p>
        <AdsCardHint v-if="hint" :text="hint" />
      </div>
      <span v-if="loading" :class="skeletonClass" class="h-7 w-[72px] rounded-[var(--ads-radius-xsm)]" aria-hidden="true" />
      <div v-else-if="empty" class="flex min-w-0 items-baseline gap-1">
        <span class="text-[length:var(--ads-font-size-md)] font-bold leading-[1.3] text-[var(--ads-text-tertiary)]" aria-hidden="true">—</span>
        <span :class="emptyMessageClass">{{ emptyMessage }}</span>
      </div>
      <p v-else class="flex min-w-0 flex-wrap items-baseline gap-1">
        <span :class="[bigValueClass, selected ? '!text-[var(--ads-text-brand)]' : '']">{{ value }}</span>
        <span v-if="unit" class="text-[length:var(--ads-font-size-xxxs)] font-bold leading-[1.2] text-[var(--ads-text-secondary)]">{{ unit }}</span>
      </p>
    </template>

    <!-- Métrica: período, valor com variação e comparativo -->
    <template v-else>
      <div class="flex w-full min-w-0 items-center gap-2">
        <p class="min-w-0 flex-1" :class="titleClass">{{ title }}</p>
        <AdsCardHint v-if="hint" :text="hint" />
        <slot name="actions" />
      </div>

      <AdsCardPeriod v-if="period || (loading && periodLabel)" :label="periodLabel" :value="period" :loading="loading" />

      <div v-if="empty && !loading" class="flex w-full justify-center py-2">
        <slot name="empty">
          <AdsEmptyState small :title="emptyMessage" :subtitle="emptyDescription ?? ''" :show-actions="Boolean($slots['empty-actions'])">
            <slot name="empty-actions" />
          </AdsEmptyState>
        </slot>
      </div>

      <template v-else>
        <span v-if="loading" :class="skeletonClass" class="h-7 w-[110px] rounded-[var(--ads-radius-xsm)]" aria-hidden="true" />
        <div v-else class="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <UIcon v-if="valueIcon" :name="valueIcon" class="size-6 shrink-0 text-[var(--ads-text-primary)]" aria-hidden="true" />
          <p :class="bigValueClass">{{ value }}</p>
          <AdsCardVariation v-if="delta" :value="delta" :direction="deltaDirection" :tone="deltaTone" />
        </div>

        <template v-if="comparisonLabel">
          <hr v-if="divider && !comparisonInline" class="h-px w-full border-0 bg-[var(--ads-border-subtle)]" />

          <div v-if="comparisonInline" class="flex w-full flex-wrap items-baseline gap-x-2 gap-y-1 text-[var(--ads-text-secondary)]">
            <span class="text-[length:var(--ads-font-size-xxxs)] leading-[1.2]">{{ comparisonLabel }}</span>
            <span v-if="loading" :class="skeletonClass" class="h-4 w-20 rounded-[var(--ads-radius-xsm)]" aria-hidden="true" />
            <span v-else class="text-[length:var(--ads-font-size-xs)] leading-[1.3] tabular-nums">{{ comparisonValue }}</span>
          </div>

          <div v-else class="flex w-full flex-col items-start gap-2">
            <AdsCardPeriod
              :label="comparisonLabel"
              :value="comparisonBadge"
              tone="neutral"
              :loading="loading && Boolean(comparisonBadge)"
              :skeleton-width="80"
            />
            <span v-if="loading" :class="skeletonClass" class="h-4 w-16 rounded-[var(--ads-radius-xsm)]" aria-hidden="true" />
            <p v-else class="text-[length:var(--ads-font-size-xs)] leading-[1.3] text-[var(--ads-text-secondary)] tabular-nums">{{ comparisonValue }}</p>
          </div>
        </template>
      </template>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AdsCardHint from "./AdsCardHint.vue";
import AdsCardPeriod from "./AdsCardPeriod.vue";
import AdsCardVariation from "./AdsCardVariation.vue";
import type { AdsCardVariationDirection, AdsCardVariationTone } from "./AdsCardVariation.vue";
import AdsEmptyState from "./AdsEmptyState.vue";

export type AdsMetricCardType = "kpi" | "pending" | "metric";

const props = withDefaults(
  defineProps<{
    /**
     * kpi: ícone grande, título e valor.
     * pending: número em destaque com unidade, bom para cards selecionáveis.
     * metric: período, valor com variação e comparativo.
     */
    type?: AdsMetricCardType;
    title: string;
    /** Valor principal. */
    value?: string;
    /** Texto do ícone de informação ao lado do título. */
    hint?: string;
    /** Ícone Lucide: 24px no KPI, 16px na Pendência. */
    icon?: string;
    /** Unidade ao lado do número na Pendência, como "pendências". */
    unit?: string;
    /** Ícone de 24px antes do valor na Métrica. */
    valueIcon?: string;
    /** Variação ao lado do valor (KPI e Métrica), como "1,15%". */
    delta?: string;
    deltaDirection?: AdsCardVariationDirection;
    /** positive quando a variação é boa; negative quando é ruim. */
    deltaTone?: AdsCardVariationTone;
    /** Datas do período (Métrica), como "01/12/2023 - 20/12/2023". */
    period?: string;
    periodLabel?: string;
    /** Rótulo do comparativo (Métrica). Sem ele, o comparativo some. */
    comparisonLabel?: string;
    comparisonValue?: string;
    /** Selo cinza ao lado do rótulo do comparativo, como "Set, Out e Nov". */
    comparisonBadge?: string;
    /** Rótulo e valor do comparativo na mesma linha, sem divisória. */
    comparisonInline?: boolean;
    /** Linha entre o valor e o comparativo empilhado. */
    divider?: boolean;
    /** Estado Selecionado: fundo azul claro, borda azul e sombra. */
    selected?: boolean;
    /** Estado Carregando: título e rótulos ficam; valores viram skeleton. */
    loading?: boolean;
    /** Estado Vazio. KPI e Pendência mostram "—" com a mensagem; Métrica mostra o empty state. */
    empty?: boolean;
    emptyMessage?: string;
    /** Texto de apoio do empty state da Métrica. */
    emptyDescription?: string;
    /** `button` quando o cartão é a própria ação. */
    as?: "div" | "button";
    disabled?: boolean;
    /** Hover padrão dos cards clicáveis: borda cinza mais escura e sombra leve. false desliga. */
    hoverable?: boolean;
  }>(),
  {
    type: "metric",
    value: undefined,
    hint: undefined,
    icon: undefined,
    unit: undefined,
    valueIcon: undefined,
    delta: undefined,
    deltaDirection: "up",
    deltaTone: "positive",
    period: undefined,
    periodLabel: "Período:",
    comparisonLabel: undefined,
    comparisonValue: undefined,
    comparisonBadge: undefined,
    comparisonInline: false,
    divider: true,
    selected: false,
    loading: false,
    empty: false,
    emptyMessage: "Sem dados no período",
    emptyDescription: undefined,
    as: "div",
    disabled: false,
    hoverable: true,
  },
);

const titleClass = "text-[length:var(--ads-font-size-xs)] leading-[1.3] text-[var(--ads-metric-label)]";
const bigValueClass = "text-[length:var(--ads-font-size-md)] font-bold leading-[1.3] text-[var(--ads-metric-value)] tabular-nums";
const emptyMessageClass = "text-[length:var(--ads-font-size-xxxs)] leading-[1.2] text-[var(--ads-text-secondary)]";
const skeletonClass = "block animate-pulse bg-[var(--ads-loading-skeleton)] motion-reduce:animate-none";

const iconClass = computed(() =>
  props.selected ? "text-[var(--ads-text-brand)]" : "text-[var(--ads-text-secondary)]",
);

const surfaceClass = computed(() => {
  const classes = [
    props.selected
      ? "border-[var(--ads-card-selected-border)] bg-[var(--ads-card-selected-background)] shadow-[var(--ads-shadow-level-1)]"
      : "border-[var(--ads-metric-border)] bg-[var(--ads-metric-background)]",
  ];

  if (props.as === "button") {
    classes.push(
      "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-border-focused)] disabled:cursor-not-allowed disabled:opacity-50",
    );
    if (props.hoverable && !props.selected && !props.disabled) {
      classes.push("hover:border-[var(--ads-card-hover-border)] hover:shadow-[var(--ads-shadow-level-1)]");
    }
  }

  return classes;
});
</script>
