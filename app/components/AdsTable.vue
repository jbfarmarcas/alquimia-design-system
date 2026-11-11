<template>
  <UTable
    :key="virtualize ? 'virtual' : 'static'"
    :data="data"
    :columns="columns"
    :loading="loading"
    :sticky="sticky"
    :virtualize="virtualizeOptions"
    :ui="tableUi"
  >
    <template v-if="!$slots.loading" #loading>
      <AdsTableSkeleton
        :rows="skeletonRows"
        :variant="skeletonVariant"
        :columns="skeletonColumns"
        :cell-class="skeletonCellSize ?? adsTableCellSize(density)"
      />
    </template>

    <template v-if="!$slots.empty" #empty>
      <div class="flex flex-col items-center gap-2">
        <UIcon
          :name="emptyIcon"
          class="size-6 text-[var(--ads-border-icon-support)]"
          aria-hidden="true"
        />
        <p class="text-sm text-[var(--ads-text-secondary)]">{{ emptyLabel }}</p>
      </div>
    </template>

    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </UTable>
</template>

<script setup lang="ts" generic="T extends TableData">
import { computed, useAttrs, useSlots } from "vue";
import type { TableColumn, TableData } from "@nuxt/ui";
import AdsTableSkeleton, {
  type AdsTableSkeletonAlign,
  type AdsTableSkeletonVariant,
} from "./AdsTableSkeleton.vue";
import {
  adsTableCellSize,
  buildAdsTableUi,
  type AdsTableBorders,
  type AdsTableDensity,
  type AdsTableUi,
} from "../utils/ads-table";

const props = withDefaults(
  defineProps<{
    data: T[];
    columns: TableColumn<T>[];
    /** md: lista e gestão. sm: grade de dados larga ou prévia. */
    density?: AdsTableDensity;
    /** Zebra só em grade numérica larga. */
    striped?: boolean;
    /** Borda e raio próprios. Dentro de AdsCard, false. */
    framed?: boolean;
    /** lines: só horizontal. grid: horizontal e vertical. */
    borders?: AdsTableBorders;
    /** Degradê por nível. A célula marca `data-depth` de 0 a 2. */
    depth?: boolean;
    loading?: boolean;
    /**
     * Número de linhas do skeleton de carregamento (1–8).
     * Passado para o AdsTableSkeleton no slot #loading padrão.
     */
    skeletonRows?: number;
    /**
     * Estilo do skeleton padrão.
     * skeleton: barras de placeholder. logo: loader do Radar.
     * Passado para AdsTableSkeleton; ignorado quando #loading é passado via slot.
     */
    skeletonVariant?: AdsTableSkeletonVariant;
    /** Altura e respiro da linha do skeleton, quando a tabela foge do padrão da densidade. */
    skeletonCellSize?: string;
    /** Cabeçalho (e rodapé) fixos. A tabela ganha altura máxima de 70vh; max-h na classe sobrescreve. */
    sticky?: boolean | "header" | "footer";
    /**
     * Lista virtual: só as linhas visíveis são montadas. Use com muitas linhas (centenas ou mais).
     * Precisa de rolagem própria (sticky ou max-h), senão a tabela inteira é montada.
     */
    virtualize?: boolean;
    /** Linha de 1px na borda da coluna fixa. */
    pinnedEdge?: boolean;
    emptyLabel?: string;
    emptyIcon?: string;
    loadingLabel?: string;
    /** Ajuste pontual de um slot; soma ao padrão. */
    ui?: Partial<AdsTableUi>;
  }>(),
  {
    density: "md",
    striped: false,
    framed: true,
    borders: "lines",
    depth: false,
    loading: false,
    skeletonRows: 5,
    skeletonVariant: "skeleton",
    skeletonCellSize: undefined,
    sticky: false,
    virtualize: false,
    pinnedEdge: true,
    emptyLabel: "Nenhum registro encontrado",
    emptyIcon: "i-lucide-inbox",
    loadingLabel: undefined,
    ui: undefined,
  },
);

const slots = useSlots();
const attrs = useAttrs();

const leafColumns = (columns: TableColumn<T>[]): TableColumn<T>[] =>
  columns.flatMap((column) =>
    "columns" in column && column.columns?.length ? leafColumns(column.columns) : [column],
  );

const columnKey = (column: TableColumn<T>) =>
  column.id ?? ("accessorKey" in column ? String(column.accessorKey) : "");

/** Alinhamento das colunas visíveis, lido da mesma classe que alinha o dado. */
const skeletonColumns = computed((): AdsTableSkeletonAlign[] => {
  const hidden = (attrs.columnVisibility ?? attrs["column-visibility"] ?? {}) as Record<string, boolean>;
  return leafColumns(props.columns)
    .filter((column) => hidden[columnKey(column)] !== false)
    .map((column) => {
      const td = column.meta?.class?.td;
      if (typeof td !== "string") return "left";
      if (/\btext-right\b/.test(td)) return "right";
      return /\btext-center\b/.test(td) ? "center" : "left";
    });
});

/** Altura estimada da linha pela densidade; a medida real corrige linhas com conteúdo maior. */
const virtualizeOptions = computed(() =>
  props.virtualize
    ? { estimateSize: props.density === "md" ? 64 : 40, overscan: 12 }
    : false,
);

const tableUi = computed(() => {
  const base = buildAdsTableUi({
    density: props.density,
    striped: props.striped,
    framed: props.framed,
    borders: props.borders,
    depth: props.depth,
    stickyHeader: props.sticky === true || props.sticky === "header",
    pinnedEdge: props.pinnedEdge,
  });
  if (!slots.expanded) {
    // Árvore via getSubRows: o UTable sempre desenha a linha de detalhe da linha aberta.
    base.tbody = `${base.tbody} [&>tr[data-slot=tr]:not([data-selectable])]:hidden`;
  }
  if (props.loading && !props.data.length) {
    // O skeleton já indica a carga; a barra do UTable é para recarga com dados na tela.
    base.thead = `${base.thead} after:hidden`;
    if (!slots.loading && props.skeletonVariant === "skeleton") {
      // Tira a linha e a célula do caminho para as linhas do skeleton entrarem na grade.
      base.tbody = `${base.tbody} [&>tr:has(>[data-slot=loading])]:contents`;
      base.loading = "contents";
    }
  }
  if (!props.ui) return base;
  const merged = { ...base };
  for (const key of Object.keys(props.ui) as (keyof AdsTableUi)[]) {
    merged[key] = `${base[key]} ${props.ui[key] ?? ""}`.trim();
  }
  return merged;
});
</script>
