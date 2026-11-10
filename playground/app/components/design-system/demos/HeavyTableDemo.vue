<!--
  Demo do catálogo para AdsHeavyTable.
  Cobre: cabeçalho em dois níveis, grupos em accordion (_Fin Group),
  cabeçalho e colunas fixos, tons de variação (adsHeavyVariationClass).

  Hidratação: AdsHeavyTable usa reka-ui internamente para o accordion expandir/recolher.
  O reka-ui gera IDs via um contador incremental próprio que pode divergir entre SSR e CSR
  se outros componentes que usam reka-ui forem renderizados antes desta seção numa rota
  diferente. No catálogo, renderizado no `<ClientOnly>` abaixo, o componente só executa
  no cliente, eliminando o mismatch de IDs do playground. Consumidores finais (apps Nuxt
  com SSR) não sofrem o mesmo problema porque renderizam um único contexto por rota —
  o mismatch só ocorre em demos com múltiplos componentes reka-ui na mesma página SSR.
  Em apps reais, use AdsHeavyTable normalmente sem ClientOnly.
-->
<template>
  <div class="flex flex-col gap-10">
    <ClientOnly>
      <TableHeavyPane />
      <template #fallback>
        <div class="flex h-48 items-center justify-center rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-neutral-50">
          <span class="text-sm text-[var(--ads-text-tertiary)]">Carregando tabela…</span>
        </div>
      </template>
    </ClientOnly>

    <DocsReference :block="{ language: 'vue', code, apis: docsApis['heavy-table'] }" />
  </div>
</template>

<script setup lang="ts">
import DocsReference from "../DocsReference.vue";
import { docsApis } from "../catalog-docs";
import TableHeavyPane from "../TableHeavyPane.vue";

const code = `<AdsHeavyTable
  :data="rows"
  :columns="columns"
  :get-sub-rows="(row) => row.children"
  :get-row-id="(row) => row.id"
  v-model:expanded="expanded"
  v-model:column-pinning="pinning"
  class="max-h-[640px]"
>
  <!-- Grupo com expandir e recolher, itens recuados -->
  <template #name-cell="{ row }">
    <AdsHeavyAccountCell :row="row" :label="row.original.name" />
  </template>

  <!-- Var.: em despesas, alta é desfavorável -->
  <template #jul-variation-cell="{ row }">
    <span :class="adsHeavyVariationClass(variation(row.original.jul), { inverted: row.original.inverted })">
      {{ formatPercent(variation(row.original.jul)) }}
    </span>
  </template>
</AdsHeavyTable>

// Colunas
const columns = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => h(AdsHeavyHeaderCell, { column, label: "Descrição de Contas" }),
    ...adsHeavyAccountColumn(),
  },
  {
    id: "jul",
    ...adsHeavyColumn.period,
    header: ({ column, table }) =>
      h(AdsHeavyHeaderCell, { column, label: "Jul/2026", sortColumn: table.getColumn("jul-actual") }),
    columns: [
      { id: "jul-forecast", header: "Previsto", accessorFn: (row) => row.jul[0], ...adsHeavyColumn.value },
      { id: "jul-actual", header: "Realizado", accessorFn: (row) => row.jul[1], ...adsHeavyColumn.value },
      { id: "jul-variation", header: "Var.", ...adsHeavyColumn.valueEnd },
    ],
  },
];`;
</script>
