<template>
  <component
    :is="as"
    :type="as === 'button' ? 'button' : undefined"
    :disabled="as === 'button' ? disabled : undefined"
    :aria-busy="loading || undefined"
    class="ads-card flex h-full min-w-0 flex-col items-start p-[var(--ads-card-padding)] text-left transition-[background-color,border-color,box-shadow]"
    :class="[gapClass, radiusClass, surfaceClass]"
    :style="paddingStyle"
  >
    <!-- Cabeçalho -->
    <div v-if="showHeader" class="flex w-full min-w-0 items-center gap-2">
      <div class="min-w-0 flex-1">
        <slot name="header">
          <p :class="titleClass">{{ title }}</p>
        </slot>
      </div>
      <AdsCardHint v-if="hint" :text="hint" />
      <slot name="actions" />
    </div>

    <AdsCardPeriod v-if="period || (loading && periodLabel && type === 'container')" :label="periodLabel" :value="period" :loading="loading" :skeleton-width="110" />

    <p v-if="description && !loading && !empty" :class="descriptionClass">
      {{ description }}
    </p>

    <!-- Vazio: mantém o cabeçalho e mostra o empty state -->
    <div v-if="empty && !loading" class="flex w-full justify-center py-2">
      <slot name="empty">
        <AdsEmptyState small :title="emptyMessage" :subtitle="emptyDescription ?? ''" :show-actions="Boolean($slots['empty-actions'])">
          <slot name="empty-actions" />
        </AdsEmptyState>
      </slot>
    </div>

    <!-- Detalhes: lista de informações -->
    <template v-else-if="type === 'details'">
      <div v-if="loading" class="flex w-full flex-col items-start gap-3" aria-hidden="true">
        <span
          v-for="(width, index) in detailSkeletonWidths"
          :key="index"
          class="block h-3.5 max-w-full animate-pulse rounded-[var(--ads-radius-xsm)] bg-[var(--ads-loading-skeleton)] motion-reduce:animate-none"
          :style="{ width: `${width}px` }"
        />
      </div>
      <dl v-else-if="rows.length" class="flex w-full flex-col items-start gap-3">
        <div v-for="(row, index) in rows" :key="index" class="flex min-w-0 max-w-full items-center gap-1 text-[length:var(--ads-font-size-xxxs)] leading-[1.2] text-[var(--ads-text-secondary)]">
          <UIcon v-if="row.icon" :name="row.icon" class="size-4 shrink-0" aria-hidden="true" />
          <dt class="shrink-0 font-bold">{{ row.label }}</dt>
          <dd class="min-w-0 truncate">{{ row.value }}</dd>
        </div>
      </dl>
      <slot />
    </template>

    <!-- Container: conteúdo livre (gráfico, tabela, lista) -->
    <template v-else>
      <div v-if="loading" class="flex h-[200px] w-full items-center justify-center">
        <AdsLoading variant="logo" />
      </div>
      <div v-else-if="$slots.default" class="w-full min-w-0 flex-1">
        <slot />
      </div>
    </template>

    <div v-if="(footerText || $slots.footer) && !loading && !empty" class="flex w-full flex-wrap items-start justify-between gap-3">
      <slot name="footer">
        <p class="text-[length:var(--ads-font-size-xxxs)] text-[var(--ads-text-secondary)]">{{ footerText }}</p>
      </slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots, type Component } from "vue";
import AdsCardHint from "./AdsCardHint.vue";
import AdsCardPeriod from "./AdsCardPeriod.vue";
import AdsEmptyState from "./AdsEmptyState.vue";
import AdsLoading from "./AdsLoading.vue";

export type AdsCardType = "container" | "details" | "informative";
/** box: cartão com borda e raio. line: só a divisória de baixo, para uma linha de lista. */
export type AdsCardVariant = "box" | "line";
/** default: 16px (padrão). compact: 8px. relaxed: 24px (estratégia, histórico, notabilidade). */
export type AdsCardPadding = "default" | "compact" | "relaxed";

const CARD_PADDING: Record<AdsCardPadding, string> = {
  default: "16px",
  compact: "8px",
  relaxed: "24px",
};

export interface AdsCardRow {
  /** Ícone Lucide de 16px. */
  icon?: string;
  /** Rótulo em negrito, como "Criado em:". */
  label: string;
  value: string;
}

const props = withDefaults(
  defineProps<{
    /**
     * container: título, período e conteúdo livre no slot padrão.
     * details: título maior e lista de informações (rows).
     * informative: chamada azul de notabilidade, com título curto em maiúsculas e texto de apoio.
     * Ignora selected, variant e padding.
     */
    type?: AdsCardType;
    /** O slot header substitui. */
    title?: string;
    /** Texto do ícone de informação ao lado do título. */
    hint?: string;
    /** Datas do período, como "01/12/2023 - 20/12/2023". */
    period?: string;
    periodLabel?: string;
    /** Linhas do card Detalhes. */
    rows?: AdsCardRow[];
    /** Texto de apoio. No selected, 14px em text/secondary. Fora disso, só no código. */
    description?: string;
    /** Linha curta no rodapé. O slot footer substitui. Só no código: o Figma não tem. */
    footerText?: string;
    /**
     * `button` quando o cartão é a própria ação. Também aceita um componente de link
     * (como NuxtLink, com `to` passado direto no card): fica clicável como o botão.
     */
    as?: "div" | "button" | Component;
    disabled?: boolean;
    /** Hover padrão dos cards clicáveis: borda cinza mais escura e sombra leve. false desliga. */
    hoverable?: boolean;
    /** Estado Selecionado: fundo azul claro, borda azul e sombra. Título 14 bold e descrição 14. */
    selected?: boolean;
    /** box é o cartão. line é só a borda inferior, sem raio. */
    variant?: AdsCardVariant;
    /** default (16px) é o padrão. compact (8px) é o respiro menor. relaxed (24px) é o respiro maior (estratégia, histórico, notabilidade). */
    padding?: AdsCardPadding;
    /** `md` (12px) é o do Figma; `sm` (8px) é só no código. Ignorado em line. */
    radius?: "sm" | "md";
    /** Estado Carregando: no container, o loader do Radar; no details, skeleton nas linhas. */
    loading?: boolean;
    /** Estado Vazio: mantém o cabeçalho e mostra o empty state. */
    empty?: boolean;
    emptyMessage?: string;
    emptyDescription?: string;
  }>(),
  {
    type: "container",
    title: undefined,
    hint: undefined,
    period: undefined,
    periodLabel: "Período:",
    rows: () => [],
    description: undefined,
    footerText: undefined,
    as: "div",
    disabled: false,
    hoverable: true,
    selected: false,
    variant: "box",
    padding: "default",
    radius: "md",
    loading: false,
    empty: false,
    emptyMessage: "Sem dados no período",
    emptyDescription: undefined,
  },
);

const slots = useSlots();

const containerTitleClass = "text-[length:var(--ads-font-size-xs)] font-bold leading-[1.3] text-[var(--ads-card-title)]";
const detailsTitleClass = "text-[length:var(--ads-font-size-rg)] font-bold leading-[1.3] text-[var(--ads-card-title)]";
const selectedTitleClass = "text-[length:var(--ads-font-size-xxs)] font-bold leading-[1.3] text-[var(--ads-text-primary)]";

const informativeTitleClass =
  "w-full text-[length:var(--ads-font-size-xxxs)] font-bold uppercase leading-[var(--ads-line-height-sm)] text-[var(--ads-text-secondary)]";

const isInformative = computed(() => props.type === "informative");

const titleClass = computed(() => {
  if (isInformative.value) return informativeTitleClass;
  if (props.selected) return selectedTitleClass;
  return props.type === "details" ? detailsTitleClass : containerTitleClass;
});

const descriptionClass = computed(() => {
  if (isInformative.value) {
    return "w-full text-[length:var(--ads-font-size-xxs)] font-normal leading-[1.3] text-[var(--ads-text-secondary)]";
  }
  return props.selected
    ? "text-[length:var(--ads-font-size-xxs)] font-normal leading-[1.3] text-[var(--ads-text-secondary)]"
    : "text-[length:var(--ads-card-body-size)] leading-[1.4] text-[var(--ads-card-body)]";
});

/** O valor local vence o token global, e a tabela dentro do card usa o mesmo respiro. */
const paddingStyle = computed(() => ({
  "--ads-card-padding": isInformative.value ? "var(--ads-space-xxxs)" : CARD_PADDING[props.padding],
  "--ads-card-bleed": "var(--ads-card-padding)",
}));

/** 6px do Figma não existe na escala. O passo mais próximo é o quark (4px). */
const gapClass = computed(() => (isInformative.value ? "gap-[var(--ads-space-quark)]" : "gap-3"));

/** Larguras do skeleton do Figma; uma barra por linha. */
const SKELETON_WIDTHS = [200, 240, 160, 180, 260];
const detailSkeletonWidths = computed(() => {
  const count = props.rows.length || SKELETON_WIDTHS.length;
  return Array.from({ length: count }, (_, index) => SKELETON_WIDTHS[index % SKELETON_WIDTHS.length]);
});

const showHeader = computed(() => Boolean(props.title || props.hint || slots.header || slots.actions));

const radiusClass = computed(() => {
  if (isInformative.value) return "rounded-[var(--ads-radius-sm)]";
  if (props.variant === "line") return "rounded-none";
  return props.radius === "sm" ? "rounded-[var(--ads-card-radius-sm)]" : "rounded-[var(--ads-card-radius)]";
});

const surfaceClass = computed(() => {
  const line = props.variant === "line";
  const classes = [
    isInformative.value
      ? "border border-[var(--color-ads-radar-200)] bg-[var(--color-ads-radar-25)]"
      : props.selected
        ? line
          ? "[border-width:0_0_1px] border-[var(--ads-card-selected-border)] bg-[var(--ads-card-selected-background)]"
          : "border border-[var(--ads-card-selected-border)] bg-[var(--ads-card-selected-background)] shadow-[var(--ads-shadow-level-1)]"
        : line
          ? "[border-width:0_0_1px] border-[var(--ads-card-border)] bg-[var(--ads-card-background)]"
          : "border border-[var(--ads-card-border)] bg-[var(--ads-card-background)]",
  ];

  if (props.as !== "div") {
    classes.push(
      "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-border-focused)] disabled:cursor-not-allowed disabled:opacity-[var(--ads-card-disabled-opacity,0.5)] aria-disabled:cursor-not-allowed",
    );
    // Hover padrão dos cards clicáveis. Na linha, só a divisória escurece: sombra viraria caixa.
    if (props.hoverable && !props.selected && !isInformative.value && !props.disabled) {
      classes.push(line ? "hover:border-[var(--ads-card-hover-border)]" : "hover:border-[var(--ads-card-hover-border)] hover:shadow-[var(--ads-shadow-level-1)]");
    }
  }

  return classes;
});
</script>
