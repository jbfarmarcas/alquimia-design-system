<template>
  <UTable
    :data="data"
    :columns="columns"
    :loading="loading"
    :sticky="sticky"
    :ui="tableUi"
  >
    <template v-if="!$slots.loading" #loading>
      <AdsTableSkeleton :rows="skeletonRows" :variant="skeletonVariant" />
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
import { computed, useSlots } from "vue";
import type { TableColumn, TableData } from "@nuxt/ui";
import AdsTableSkeleton, { type AdsTableSkeletonVariant } from "./AdsTableSkeleton.vue";
import {
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
    /** Cabeçalho (e rodapé) fixos quando a tabela tem altura máxima. */
    sticky?: boolean | "header" | "footer";
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
    sticky: false,
    emptyLabel: "Nenhum registro encontrado",
    emptyIcon: "i-lucide-inbox",
    loadingLabel: undefined,
    ui: undefined,
  },
);

const slots = useSlots();

const tableUi = computed(() => {
  const base = buildAdsTableUi({
    density: props.density,
    striped: props.striped,
    framed: props.framed,
    borders: props.borders,
    depth: props.depth,
  });
  if (!slots.expanded) {
    // Árvore via getSubRows: o UTable sempre desenha a linha de detalhe da linha aberta.
    base.tbody = `${base.tbody} [&>tr[data-slot=tr]:not([data-selectable])]:hidden`;
  }
  if (!props.ui) return base;
  const merged = { ...base };
  for (const key of Object.keys(props.ui) as (keyof AdsTableUi)[]) {
    merged[key] = `${base[key]} ${props.ui[key] ?? ""}`.trim();
  }
  return merged;
});
</script>
