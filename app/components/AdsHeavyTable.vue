<!--
  AdsHeavyTable — Tabela financeira (Figma: "Heavy Table").

  Baseada no UTable (via AdsTable) com:
  - Cabeçalho em dois níveis (grupos de colunas via nested `columns`).
  - Grupos de linhas em accordion expandir/recolher (_Fin Group):
    passe `get-sub-rows`, `get-row-id` e `v-model:expanded`;
    na primeira coluna, use `AdsHeavyAccountCell`.
  - Títulos com ordenar e fixar via `AdsHeavyHeaderCell`.
  - Larguras e divisórias de período via `adsHeavyColumn` e `adsHeavyAccountColumn()`.
  - Cabeçalho fixo por padrão (`sticky="header"`).
  - Tons de variação e projeção via `adsHeavyVariationClass()`.

  Props não declaradas (column-pinning, get-row-id, get-sub-rows, v-model:expanded,
  footer, row-class, etc.) são repassadas ao UTable via attrs fallthrough.
  Para o botão de fixar funcionar, use `v-model:column-pinning`.

  @example
  ```vue
  <AdsHeavyTable
    :data="rows"
    :columns="cols"
    :get-sub-rows="(row) => row.children"
    :get-row-id="(row) => row.id"
    v-model:expanded="expanded"
    v-model:column-pinning="pinning"
    class="max-h-96"
  >
    <template #name-cell="{ row }">
      <AdsHeavyAccountCell :row="row" :label="row.original.name" />
    </template>
  </AdsHeavyTable>
  ```
-->
<template>
  <AdsTable
    :data="data"
    :columns="columns"
    :loading="loading"
    :skeleton-rows="skeletonRows"
    :skeleton-variant="skeletonVariant"
    :skeleton-cell-size="adsHeavyCellSize(density)"
    :sticky="sticky"
    :virtualize="virtualize"
    :framed="framed"
    :density="density"
    :striped="false"
    :borders="borders"
    :depth="false"
    :pinned-edge="false"
    :empty-label="emptyLabel"
    :empty-icon="emptyIcon"
    :loading-label="loadingLabel"
    :ui="mergedUi"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </AdsTable>
</template>

<script setup lang="ts" generic="T extends TableData">
import { computed } from "vue";
import type { TableColumn, TableData } from "@nuxt/ui";
import AdsTable from "./AdsTable.vue";
import type { AdsTableSkeletonVariant } from "./AdsTableSkeleton.vue";
import {
  adsHeavyCellSize,
  buildAdsHeavyTableUi,
  type AdsTableBorders,
  type AdsTableDensity,
  type AdsTableUi,
} from "../utils/ads-table";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    data: T[];
    columns: TableColumn<T>[];
    /** md: padrão financeiro. sm: tabela compacta. */
    density?: AdsTableDensity;
    /** Borda e raio próprios. Dentro de AdsCard, false. */
    framed?: boolean;
    /** lines: só horizontal. grid: horizontal e vertical. */
    borders?: AdsTableBorders;
    loading?: boolean;
    /** Número de linhas do skeleton de carregamento (1–8). */
    skeletonRows?: number;
    /**
     * Estilo do skeleton padrão.
     * skeleton: barras de placeholder. logo: loader do Radar.
     */
    skeletonVariant?: AdsTableSkeletonVariant;
    /**
     * Cabeçalho fixo quando a tabela tem altura máxima.
     * Padrão: "header" — cabeçalho fica no topo ao rolar horizontalmente.
     */
    sticky?: boolean | "header" | "footer";
    /** Lista virtual para muitas linhas. Repassa ao AdsTable. */
    virtualize?: boolean;
    emptyLabel?: string;
    emptyIcon?: string;
    loadingLabel?: string;
    /** Ajuste pontual de um slot; soma ao padrão. */
    ui?: Partial<AdsTableUi>;
  }>(),
  {
    density: "md",
    framed: true,
    borders: "lines",
    loading: false,
    skeletonRows: 5,
    skeletonVariant: "skeleton",
    sticky: "header",
    virtualize: false,
    emptyLabel: "Nenhum registro encontrado",
    emptyIcon: "i-lucide-inbox",
    loadingLabel: undefined,
    ui: undefined,
  },
);

const mergedUi = computed((): AdsTableUi => {
  const base = buildAdsHeavyTableUi({
    density: props.density,
    framed: props.framed,
    borders: props.borders,
    stickyHeader: props.sticky === true || props.sticky === "header",
  });
  if (!props.ui) return base;
  const merged = { ...base };
  for (const key of Object.keys(props.ui) as (keyof AdsTableUi)[]) {
    merged[key] = `${base[key]} ${props.ui[key] ?? ""}`.trim();
  }
  return merged;
});
</script>
