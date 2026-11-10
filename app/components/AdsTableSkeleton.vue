<!--
  AdsTableSkeleton — Carregamento da tabela (Figma: "Table Skeleton").

  Sozinho, desenha a casca do Figma com cabeçalho. Com `columns`, desenha só as linhas: é como
  o AdsTable usa, no slot #loading, debaixo do cabeçalho real. As linhas entram na grade da
  tabela por `display: table-row`, então cada bloco alinha com a coluna de verdade.
-->
<template>
  <div :class="rootClass">
    <span class="sr-only" role="status">Carregando tabela</span>

    <div v-if="!columns" class="table w-full table-fixed" aria-hidden="true">
      <div class="table-row bg-neutral-200">
        <div
          v-for="cell in PRODUCT_CELLS"
          :key="cell.width"
          class="table-cell h-12 border-b border-[var(--ads-border-subtle)] px-4 align-middle"
          :class="cell.width"
        >
          <div class="rounded-[var(--ads-radius-xsm)] bg-[var(--color-ads-neutro-claro-40)]" :class="[cell.head, ALIGN[cell.align]]" />
        </div>
      </div>
    </div>

    <div v-if="variant === 'logo'" class="flex h-64 items-center justify-center">
      <AdsLoading variant="logo" size="md" />
    </div>

    <div v-else :class="columns ? 'contents' : 'table w-full table-fixed'" aria-hidden="true">
      <div v-for="row in skeletonRows" :key="row" class="table-row [&:last-child>*]:border-b-0">
        <div
          v-for="(cell, index) in cells"
          :key="index"
          class="table-cell border-b border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] align-middle"
          :class="[columns ? cellClass : 'h-16 px-4', cell.width]"
        >
          <USkeleton class="bg-neutral-200" :class="[cell.block, ALIGN[cell.align]]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AdsLoading from "./AdsLoading.vue";

export type AdsTableSkeletonVariant = "skeleton" | "logo";
export type AdsTableSkeletonAlign = "left" | "center" | "right";

type SkeletonCell = { align: AdsTableSkeletonAlign; block: string; width?: string; head?: string };

const ALIGN: Record<AdsTableSkeletonAlign, string> = { left: "", center: "mx-auto", right: "ml-auto" };

const BLOCK = "rounded-[var(--ads-radius-xsm)]";

/** Colunas do Figma: seleção, descrição, notabilidade e dois preços. */
const PRODUCT_CELLS: (SkeletonCell & { width: string; head: string })[] = [
  { width: "w-14", head: "size-4", block: `size-4 ${BLOCK}`, align: "left" },
  { width: "w-80", head: "h-2.5 w-36", block: `h-3 w-54 ${BLOCK}`, align: "left" },
  { width: "w-45", head: "h-2.5 w-[74px]", block: "h-[13px] w-[110px] rounded-[var(--ads-radius-pill)]", align: "left" },
  { width: "w-35", head: "h-2.5 w-[54px]", block: `h-3 w-[59px] ${BLOCK}`, align: "right" },
  { width: "w-35", head: "h-2.5 w-[54px]", block: `h-3 w-[59px] ${BLOCK}`, align: "right" },
];

const props = withDefaults(
  defineProps<{
    /**
     * Número de linhas do skeleton. Mínimo 1, máximo 8.
     * Corresponde a Linha 1 a Linha 8 do Figma.
     */
    rows?: number;
    /**
     * skeleton: barras de placeholder na grade da tabela.
     * logo: loader do Radar centralizado na área da tabela.
     */
    variant?: AdsTableSkeletonVariant;
    /** Alinhamento de cada coluna da tabela real. Sem cabeçalho próprio quando informado. */
    columns?: AdsTableSkeletonAlign[];
    /** Altura e respiro das células, iguais aos da linha de dados. Só com `columns`. */
    cellClass?: string;
  }>(),
  {
    rows: 4,
    variant: "skeleton",
    columns: undefined,
    cellClass: "h-16 px-4",
  },
);

const skeletonRows = computed(() => {
  const count = Math.min(8, Math.max(1, props.rows));
  return Array.from({ length: count }, (_, index) => index);
});

const inTableRows = computed(() => Boolean(props.columns) && props.variant === "skeleton");

/** Sozinho, tem a casca da Table do Figma: borda neutra e raio de 12px. Dentro do AdsTable, a tabela já tem. */
const rootClass = computed(() => {
  if (inTableRows.value) return "contents";
  if (props.columns) return "w-full bg-[var(--ads-surface-card)]";
  return "w-full overflow-hidden rounded-[var(--ads-radius-md)] border border-neutral-300 bg-[var(--ads-surface-card)]";
});

const cells = computed((): SkeletonCell[] =>
  props.columns
    ? props.columns.map((align, index) => ({
        align,
        block: `h-3 ${BLOCK} ${index === 0 ? "w-full max-w-54" : "w-3/5 max-w-30"}`,
      }))
    : PRODUCT_CELLS,
);
</script>
