<!--
  Demonstração da AdsHeavyTable (Figma: Heavy Table).

  Mostra:
  - Cabeçalho em dois níveis, com ordenar e fixar (_Fin Header Cell).
  - Grupos de contas em accordion, com itens em zebra (_Fin Account Cell).
  - Coluna de conta fixa à esquerda e cabeçalho fixo.
  - Var. favorável e desfavorável, invertida nas despesas; meses futuros em tom de projeção.
-->
<template>
  <AdsHeavyTable
    v-model:expanded="expanded"
    v-model:column-pinning="pinning"
    :data="rows"
    :columns="columns"
    :get-sub-rows="(row: DemoHeavyRow) => row.children"
    :get-row-id="(row: DemoHeavyRow) => row.id"
    class="max-h-[640px]"
  >
    <template #name-cell="{ row }">
      <AdsHeavyAccountCell :row="row" :label="row.original.name" />
    </template>
  </AdsHeavyTable>
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import type { TableColumn } from "@nuxt/ui";
import AdsHeavyAccountCell from "../../../../app/components/AdsHeavyAccountCell.vue";
import AdsHeavyHeaderCell from "../../../../app/components/AdsHeavyHeaderCell.vue";
import AdsHeavyTable from "../../../../app/components/AdsHeavyTable.vue";
import {
  adsHeavyAccountColumn,
  adsHeavyColumn,
  adsHeavyVariationClass,
} from "../../../../app/utils/ads-table";
import { demoHeavy, type DemoHeavyRow } from "./table-fixtures";

const rows = demoHeavy;
const expanded = ref<Record<string, boolean>>({ receitas: true, mercadorias: true });
const pinning = ref({ left: ["name"], right: [] as string[] });

const formatValue = (value: number) => value.toLocaleString("pt-BR");

const percent = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 1,
  signDisplay: "exceptZero",
});

const variation = ([forecast, actual]: readonly [number, number]) =>
  ((actual - forecast) / forecast) * 100;

type ClosedPeriod = "jul" | "ago" | "set";
type FuturePeriod = "out" | "nov" | "dez";

const closedPeriod = (key: ClosedPeriod, label: string): TableColumn<DemoHeavyRow> => ({
  id: key,
  ...adsHeavyColumn.period,
  header: ({ column, table }) =>
    h(AdsHeavyHeaderCell, { column, label, sortColumn: table.getColumn(`${key}-actual`) }),
  columns: [
    {
      id: `${key}-forecast`,
      header: "Previsto",
      accessorFn: (row) => row[key][0],
      cell: ({ row }) => formatValue(row.original[key][0]),
      ...adsHeavyColumn.value,
    },
    {
      id: `${key}-actual`,
      header: "Realizado",
      accessorFn: (row) => row[key][1],
      cell: ({ row }) => formatValue(row.original[key][1]),
      ...adsHeavyColumn.value,
    },
    {
      id: `${key}-variation`,
      header: "Var.",
      accessorFn: (row) => variation(row[key]),
      cell: ({ row }) => {
        const value = variation(row.original[key]);
        return h(
          "span",
          { class: adsHeavyVariationClass(value, { inverted: row.original.inverted }) },
          `${percent.format(value)}%`,
        );
      },
      ...adsHeavyColumn.valueEnd,
    },
  ],
});

const futurePeriod = (key: FuturePeriod, label: string): TableColumn<DemoHeavyRow> => ({
  id: key,
  ...adsHeavyColumn.period,
  header: ({ column, table }) =>
    h(AdsHeavyHeaderCell, { column, label, sortColumn: table.getColumn(`${key}-forecast`) }),
  columns: [
    {
      id: `${key}-forecast`,
      header: "Previsto",
      accessorFn: (row) => row[key],
      cell: ({ row }) =>
        h("span", { class: adsHeavyVariationClass(null, { projected: true }) }, formatValue(row.original[key])),
      ...adsHeavyColumn.projected,
    },
  ],
});

const columns: TableColumn<DemoHeavyRow>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => h(AdsHeavyHeaderCell, { column, label: "Descrição de Contas" }),
    ...adsHeavyAccountColumn(),
  },
  closedPeriod("jul", "Jul/2026"),
  closedPeriod("ago", "Ago/2026"),
  closedPeriod("set", "Set/2026"),
  futurePeriod("out", "Out/2026"),
  futurePeriod("nov", "Nov/2026"),
  futurePeriod("dez", "Dez/2026"),
];
</script>
