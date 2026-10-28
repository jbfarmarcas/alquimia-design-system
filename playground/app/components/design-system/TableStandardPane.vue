<template>
  <AdsTable
    v-if="name === 'CompetitorsTab'"
    :data="storeRows"
    :columns="storeColumns"
  >
    <template #name-cell="{ row }">
      <span class="flex flex-col">
        <span class="text-[var(--ads-text-primary)]">{{ row.original.name }}</span>
        <span class="text-[var(--ads-text-tertiary)]">{{ row.original.address }}</span>
      </span>
    </template>
    <template #status-cell="{ row }">
      <AdsPill tone="secondary" :status="row.original.status === 'done' ? 'success' : 'attention'" :label="row.original.status === 'done' ? 'Concluída' : 'Pendente'" />
    </template>
    <template #origin-cell="{ row }">
      <AdsPill
        v-if="row.original.origin"
        tone="secondary"
        :status="row.original.origin === 'manual' ? 'innovation' : 'default'"
        :label="row.original.origin === 'manual' ? 'Manual' : 'Importado'"
      />
      <span v-else class="text-[var(--ads-text-tertiary)]">—</span>
    </template>
    <template #updated-cell="{ row }">
      <span v-if="row.original.updated">{{ row.original.updated }}</span>
      <span v-else class="text-[var(--ads-text-tertiary)]">—</span>
    </template>
    <template #action-cell="{ row }">
      <AdsButton
        v-if="row.original.status === 'done'"
        type="unfilled"
        size="sm"
        trailing
        icon="i-lucide-chevron-right"
        label="Ver detalhes"
      />
      <AdsButton v-else size="sm" leading icon="i-lucide-map-pin" label="Mapear" />
    </template>
  </AdsTable>

  <AdsTable
    v-else-if="name === 'sessions.vue'"
    :data="sessionRows"
    :columns="sessionColumns"
  >
    <template #status-cell="{ row }">
      <AdsPill tone="secondary" :status="row.original.status === 'Concluída' ? 'success' : 'attention'" :label="row.original.status" />
    </template>
    <template #action-cell>
      <AdsButton type="unfilled" size="sm" icon="i-lucide-trash-2" aria-label="Remover" />
    </template>
  </AdsTable>

  <AdsTable
    v-else-if="name === 'token/index.vue'"
    :data="tokenRows"
    :columns="tokenColumns"
  >
    <template #action-cell>
      <AdsButton size="sm" leading icon="i-lucide-log-in" label="Usar" />
    </template>
  </AdsTable>

  <AdsTable
    v-else-if="name === 'StepProductResultTable'"
    :data="demoProducts"
    :columns="productColumns"
    striped
    sticky
    borders="grid"
    class="max-h-64"
    :column-pinning="{ left: ['select', 'description'] }"
  >
    <template #select-header>
      <AdsCheckbox :model-value="allProducts" aria-label="Selecionar todos" @update:model-value="toggleAllProducts" />
    </template>
    <template #select-cell="{ row }">
      <span @click.stop>
        <AdsCheckbox v-model="productSelection[row.original.id]" :aria-label="`Selecionar ${row.original.description}`" />
      </span>
    </template>
    <template #description-cell="{ row }">
      <span class="text-[var(--ads-text-primary)]">{{ row.original.description }}</span>
    </template>
    <template #notability-cell="{ row }">
      <AdsNotabilityPill :notability="row.original.notability" />
    </template>
  </AdsTable>

  <AdsTable v-else-if="name === 'StepImportLinks'" :data="linkRows" :columns="linkColumns" striped>
    <template #select-cell>
      <AdsCheckbox aria-label="Selecionar" />
    </template>
    <template #rede-cell="{ row }">
      <span class="text-[var(--ads-text-primary)]">{{ row.original.rede }}</span>
    </template>
    <template #status-cell="{ row }">
      <AdsPill tone="secondary" :status="row.original.status === 'Vinculado' ? 'success' : 'attention'" :label="row.original.status" />
    </template>
  </AdsTable>

  <AdsTable
    v-else-if="name === 'ResearchResultTable'"
    :data="demoResearch"
    :columns="researchColumns"
    striped
    sticky
    borders="grid"
    class="max-h-80"
    :column-pinning="{ left: ['description'] }"
  >
    <template #description-cell="{ row }">
      <span class="text-[var(--ads-text-primary)]">{{ row.original.description }}</span>
    </template>
    <template #notability-cell="{ row }">
      <AdsNotabilityPill :notability="row.original.notability" />
    </template>
  </AdsTable>

  <AdsTable
    v-else-if="name === 'StoreCompetitivenessTable'"
    :data="demoCompetitiveness"
    :columns="heatColumns"
    sticky
    borders="grid"
    class="max-h-80"
    :column-pinning="{ left: ['store'], right: ['total', 'uf', 'cluster'] }"
  >
    <template #store-cell="{ row }">
      <span class="text-[var(--ads-text-primary)]">{{ row.original.store }}</span>
    </template>
    <template v-for="key in competitorKeys" :key="`${key}-header`" #[`${key}-header`]>
      <AdsButton
        type="unfilled"
        color="neutral"
        size="sm"
        leading
        :icon="heatVisible[key] ? 'i-lucide-eye' : 'i-lucide-eye-off'"
        :label="heatHeader(key)"
        :aria-pressed="heatVisible[key]"
        :aria-label="heatVisible[key] ? `Ocultar coluna ${heatHeader(key)}` : `Exibir coluna ${heatHeader(key)}`"
        @click="heatVisible[key] = !heatVisible[key]"
      />
    </template>
    <template v-for="key in heatKeys" :key="`${key}-footer`" #[`${key}-footer`]>
      <span data-cell-fill :class="adsTableCellFill(heatTone(key, demoCompetitivenessTotals[key]))">
        {{ demoCompetitivenessTotals[key].toLocaleString("pt-BR") }}%
      </span>
    </template>
    <template v-for="key in heatKeys" :key="key" #[`${key}-cell`]="{ row }">
      <span
        v-if="row.original[key] != null"
        data-cell-fill
        :class="adsTableCellFill(heatTone(key, row.original[key]))"
      >
        {{ row.original[key]?.toLocaleString("pt-BR") }}%
      </span>
      <span v-else class="text-[var(--ads-text-tertiary)]">—</span>
    </template>
  </AdsTable>

  <AdsTable
    v-else-if="name === 'ConsolidatedResultTable'"
    :data="treeRows"
    :columns="treeColumns"
    striped
    sticky
    borders="grid"
    class="max-h-80"
    :get-row-id="(row: TreeNode) => row.id"
    :get-sub-rows="(row: TreeNode) => row.children"
    :column-pinning="{ left: ['name'] }"
    v-model:expanded="treeExpanded"
  >
    <template #name-cell="{ row }">
      <span class="flex items-center gap-1 text-[var(--ads-text-primary)]" :class="adsTableTreeIndent(row.depth)">
        <AdsButton
          v-if="row.original.children?.length"
          type="unfilled"
          size="sm"
          :icon="row.getIsExpanded() ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'"
          :aria-expanded="row.getIsExpanded()"
          :aria-label="row.getIsExpanded() ? `Comprimir ${row.original.name}` : `Abrir ${row.original.name}`"
          @click="row.toggleExpanded()"
        />
        {{ row.original.name }}
      </span>
    </template>
    <template v-for="key in treeMetricKeys" :key="key" #[`${key}-delta-cell`]="{ row }">
      <span :class="adsTableVariationClass(treeDelta(key, row.original))">{{ treeDeltaLabel(key, row.original) }}</span>
    </template>
  </AdsTable>

  <AdsTable
    v-else-if="name === 'StepTargetMargin'"
    v-model:expanded="marginExpanded"
    :data="marginTree"
    :columns="marginColumns"
    depth
    :get-row-id="(row: MarginNode) => row.id"
    :get-sub-rows="(row: MarginNode) => row.children"
  >
    <template #name-cell="{ row }">
      <span
        class="flex items-center gap-1 text-[var(--ads-text-primary)]"
        :class="adsTableTreeIndent(row.depth)"
        :data-depth="adsTableDepthAttr(row.depth)"
      >
        <AdsButton
          v-if="row.original.children?.length"
          type="unfilled"
          size="sm"
          :icon="row.getIsExpanded() ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'"
          :aria-expanded="row.getIsExpanded()"
          :aria-label="row.getIsExpanded() ? `Comprimir ${row.original.name}` : `Abrir ${row.original.name}`"
          @click="row.toggleExpanded()"
        />
        {{ row.original.name }}
      </span>
    </template>
    <template #target-cell="{ row }">
      <AdsNumberInput
        v-if="!row.original.children?.length"
        v-model="row.original.target"
        class="ms-auto w-28"
        suffix="%"
        min="0"
        step="0.5"
        :aria-label="`Margem objetivo de ${row.original.name}`"
      />
      <span v-else>—</span>
    </template>
  </AdsTable>

  <div v-else-if="name === 'NotabilityCategoriesCard'" class="flex flex-col gap-4">
    <AdsTableToolbar
      v-model:search="roleSearch"
      title="Classificação de Categorias"
      description="Ajuste os papéis para redefinir a notabilidade dos produtos."
    >
      <AdsFilterSelect
        v-model="roleFilter"
        type="radio"
        class="sm:w-44"
        :searchable="false"
        :select-all="false"
        placeholder="Papel"
        :options="roleFilterOptions"
        aria-label="Filtrar por papel"
      />
    </AdsTableToolbar>
    <AdsTable :data="filteredRoleRows" :columns="roleColumns">
    <template #category-cell="{ row }">
      <span class="text-[var(--ads-text-primary)]">{{ row.original.category }}</span>
    </template>
    <template #role-cell="{ row }">
      <AdsFilterSelect
        v-model="row.original.role"
        type="radio"
        :searchable="false"
        :select-all="false"
        block
        placeholder="Papel"
        :options="CATEGORY_ROLE_OPTIONS"
        :aria-label="`Papel da categoria ${row.original.category}`"
      />
    </template>
    <template #origin-cell="{ row }">
      <AdsPill
        tone="secondary"
        :status="row.original.origin === 'overridden' ? 'attention' : 'default'"
        :label="row.original.origin === 'overridden' ? 'Alterado' : 'Calculado'"
      />
    </template>
    <template #history-cell="{ row }">
      <AdsButton
        type="unfilled"
        size="sm"
        icon="i-lucide-history"
        :aria-label="`Histórico da categoria ${row.original.category}`"
      />
    </template>
    </AdsTable>
  </div>

  <AdsTable
    v-else-if="name === 'StepImportValidation'"
    :data="validationRows"
    :columns="validationColumns"
    striped
  >
    <template #field-cell="{ row }">
      <AdsPill tone="secondary" status="warning" :label="row.original.field" />
    </template>
    <template #action-cell>
      <AdsButton type="unfilled" size="sm" label="Corrigir" />
    </template>
  </AdsTable>

  <AdsTable v-else-if="name === 'NotabilityProductsCard'" :data="demoSummary" :columns="summaryColumns">
    <template #label-cell="{ row }">
      <AdsNotabilityPill :notability="row.original.notability" :label="row.original.label" />
    </template>
  </AdsTable>

  <AdsTable v-else-if="name === 'ImportFilePreview'" :data="demoPreviewRows" :columns="previewColumns">
    <template v-for="(header, index) in demoPreviewHeaders" :key="header" #[`c${index}-cell`]="{ row }">
      <InvertedTooltip v-if="row.original[`c${index}`]" :text="row.original[`c${index}`] ?? ''" class="block min-w-0">
        <span class="block">{{ row.original[`c${index}`] }}</span>
      </InvertedTooltip>
      <span v-else class="text-[var(--ads-text-tertiary)]">—</span>
    </template>
  </AdsTable>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { TableColumn } from "@nuxt/ui";
import AdsButton from "../../../../app/components/AdsButton.vue";
import AdsCheckbox from "../../../../app/components/AdsCheckbox.vue";
import AdsFilterSelect from "../../../../app/components/AdsFilterSelect.vue";
import AdsNotabilityPill from "../../../../app/components/AdsNotabilityPill.vue";
import AdsNumberInput from "../../../../app/components/AdsNumberInput.vue";
import AdsPill from "../../../../app/components/AdsPill.vue";
import AdsTable from "../../../../app/components/AdsTable.vue";
import AdsTableToolbar from "../../../../app/components/AdsTableToolbar.vue";
import InvertedTooltip from "../../../../app/components/InvertedTooltip.vue";
import {
  adsTableCellFill,
  adsTableColumn,
  adsTableDepthAttr,
  adsTableGroup,
  adsTablePinned,
  adsTableTreeIndent,
  adsTableVariationClass,
  type AdsTableHeat,
} from "../../../../app/utils/ads-table";
import { CATEGORY_ROLE_OPTIONS } from "../../../../app/utils/category-role";
import { numberToBRL, numberToCompactBRL } from "../../../../app/utils/money";
import { formatPercentagePtBr } from "../../../../app/utils/percentage";
import {
  demoCompetitiveness,
  demoCompetitivenessTotals,
  demoPreviewHeaders,
  demoPreviewRows,
  demoProducts,
  demoResearch,
  demoStores,
  demoSummary,
  demoTree,
  type DemoCompetitivenessRow,
  type DemoTreeRow,
} from "./table-fixtures";

defineProps<{ name: string }>();

const money = adsTableColumn.numeric;
const brl = (value: number | null) => (value == null ? "—" : numberToBRL(value));
const pct = (value: number) => formatPercentagePtBr(value);
const delta = (current: number, simulated: number) => ((simulated - current) / current) * 100;
const signed = (value: number, unit: string) =>
  `${value > 0 ? "+" : ""}${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}${unit}`;

const storeRows = demoStores.slice(0, 3);
const storeColumns: TableColumn<(typeof storeRows)[number]>[] = [
  { id: "name", header: "Loja Própria", meta: adsTableColumn.identity },
  { id: "status", header: "Status de Mapeamento" },
  { id: "origin", header: "Origem" },
  { id: "updated", header: "Última Atualização" },
  { id: "action", header: "", meta: adsTableColumn.action },
];

const sessionRows = [
  { file: "pesquisa-outubro.xlsx", status: "Concluída", created: "21/10/2026 14:02", rows: "1.240" },
  { file: "pesquisa-batel.csv", status: "Rascunho", created: "27/10/2026 09:41", rows: "318" },
];
const sessionColumns: TableColumn<(typeof sessionRows)[number]>[] = [
  { accessorKey: "file", header: "Arquivo", meta: adsTableColumn.identity },
  { id: "status", header: "Status" },
  { accessorKey: "created", header: "Criado em" },
  { accessorKey: "rows", header: "Linhas", meta: money },
  { id: "action", header: "", meta: adsTableColumn.action },
];

const tokenRows = [
  { group: "104", name: "Farmácia Exemplo", id: "a1b2c3d4-e5f6-7890", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6…" },
  { group: "221", name: "Rede Demo", id: "f0e9d8c7-b6a5-4321", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6…" },
];
const tokenColumns: TableColumn<(typeof tokenRows)[number]>[] = [
  { accessorKey: "group", header: "GE", meta: money },
  { accessorKey: "name", header: "Nome", meta: adsTableColumn.identity },
  { accessorKey: "id", header: "ID (jti)" },
  { accessorKey: "token", header: "Token (trecho)" },
  { id: "action", header: "", meta: adsTableColumn.action },
];

const productSelection = reactive<Record<number, boolean>>(
  Object.fromEntries(demoProducts.map((product) => [product.id, false])),
);
const allProducts = computed(() => demoProducts.every((product) => productSelection[product.id]));
const toggleAllProducts = (checked: boolean) => {
  for (const product of demoProducts) productSelection[product.id] = checked;
};
const productColumns: TableColumn<(typeof demoProducts)[number]>[] = [
  { id: "select", header: "", ...adsTablePinned(48, adsTableColumn.select) },
  { id: "description", header: "Descrição", ...adsTablePinned(256, adsTableColumn.identity) },
  { id: "notability", header: "Notabilidade" },
  { accessorKey: "currentPrice", header: "Preço atual", meta: money, cell: ({ row }) => brl(row.original.currentPrice) },
  { accessorKey: "finalPrice", header: "Preço final", meta: money, cell: ({ row }) => brl(row.original.finalPrice) },
];

const linkRows = [
  { rede: "Drogasil Batel", status: "Vinculado", address: "Av. do Batel, 1700" },
  { rede: "Raia Centro", status: "Pendente", address: "Rua XV de Novembro, 900" },
  { rede: "Nissei Portão", status: "Pendente", address: "Av. Kennedy, 3900" },
];
const linkColumns: TableColumn<(typeof linkRows)[number]>[] = [
  { id: "select", header: "", meta: adsTableColumn.select },
  { id: "rede", header: "Rede", meta: adsTableColumn.identity },
  { id: "status", header: "Status" },
  { accessorKey: "address", header: "Endereço" },
];

const researchMin = {
  class: {
    th: "min-w-[120px] text-right",
    td: "min-w-[120px] text-right tabular-nums",
  },
};
const researchColumns: TableColumn<(typeof demoResearch)[number]>[] = [
  {
    id: "description",
    header: "Descrição",
    size: 250,
    meta: {
      class: {
        th: "min-w-[250px]",
        td: "min-w-[250px] font-bold text-[var(--ads-text-primary)]",
      },
    },
  },
  { id: "notability", header: "Notabilidade", meta: { class: { th: "min-w-[120px]", td: "min-w-[120px]" } } },
  {
    id: "mine",
    header: "Meus dados",
    meta: adsTableGroup("brand"),
    columns: [
      { accessorKey: "myPrice", header: "Meu preço", meta: researchMin, cell: ({ row }) => brl(row.original.myPrice) },
    ],
  },
  {
    id: "competitors",
    header: "Dados de pesquisa – concorrentes",
    meta: adsTableGroup("success"),
    columns: [
      { accessorKey: "average", header: "Preço médio", meta: researchMin, cell: ({ row }) => brl(row.original.average) },
      { accessorKey: "ic", header: "IC (%)", meta: researchMin, cell: ({ row }) => `${row.original.ic.toLocaleString("pt-BR")}%` },
      { accessorKey: "drogasil", header: "Drogasil", meta: researchMin, cell: ({ row }) => brl(row.original.drogasil) },
      { accessorKey: "raia", header: "Raia", meta: researchMin, cell: ({ row }) => brl(row.original.raia) },
      { accessorKey: "pagueMenos", header: "Pague Menos", meta: researchMin, cell: ({ row }) => brl(row.original.pagueMenos) },
    ],
  },
  {
    id: "market",
    header: "Dados de mercado",
    meta: adsTableGroup("innovation"),
    columns: [
      { accessorKey: "iqvia", header: "IQVIA", meta: researchMin, cell: ({ row }) => brl(row.original.iqvia) },
      { accessorKey: "closeUp", header: "Farmarcas", meta: researchMin, cell: ({ row }) => brl(row.original.closeUp) },
    ],
  },
];

const heatKeys = ["drogasil", "raia", "pagueMenos", "nissei", "total"] as const;
const competitorKeys = heatKeys.filter((key) => key !== "total");
const heatVisible = reactive<Record<(typeof competitorKeys)[number], boolean>>({
  drogasil: true,
  raia: true,
  pagueMenos: true,
  nissei: true,
});
const heatOf = (value: number | null): AdsTableHeat => {
  if (value == null) return "empty";
  return value >= 100 ? "high" : "low";
};
const heatTone = (key: (typeof heatKeys)[number], value: number | null): AdsTableHeat =>
  key !== "total" && !heatVisible[key] ? "muted" : heatOf(value);
const heatHeader = (key: (typeof heatKeys)[number]) => {
  if (key === "pagueMenos") return "Pague Menos";
  if (key === "total") return "Total Geral";
  return key[0].toUpperCase() + key.slice(1);
};
const heatColumns: TableColumn<DemoCompetitivenessRow>[] = [
  { id: "store", header: "Lojas", footer: "Total Geral", ...adsTablePinned(160, adsTableColumn.identity) },
  ...heatKeys.map((key) => ({
    id: key,
    header: heatHeader(key),
    footer: key,
    ...(key === "total"
      ? adsTablePinned(120, adsTableColumn.center)
      : { meta: { class: { th: "min-w-36 text-center", td: "min-w-36 text-center" } } }),
  })),
  { id: "uf", accessorKey: "uf", header: "UF", ...adsTablePinned(96, adsTableColumn.center) },
  { id: "cluster", accessorKey: "cluster", header: "Cluster", ...adsTablePinned(120) },
];

type TreeNode = Omit<DemoTreeRow, "children"> & { id: string; children?: TreeNode[] };
const withIds = (rows: DemoTreeRow[], parent = ""): TreeNode[] =>
  rows.map((row) => {
    const id = parent ? `${parent}/${row.name}` : row.name;
    return { ...row, id, children: row.children ? withIds(row.children, id) : undefined };
  });
const treeRows = withIds(demoTree);
const treeExpanded = ref<Record<string, boolean>>({ Medicamentos: true });
const margin = (profit: number, revenue: number) => (profit / revenue) * 100;
type TreeMetric = { label: string; current: (row: TreeNode) => number; simulated: (row: TreeNode) => number; money: boolean };
const treeMetrics: Record<"revenue" | "profit" | "margin" | "ic", TreeMetric> = {
  revenue: { label: "Receita (R$)", current: (row) => row.revenue, simulated: (row) => row.revenueSimulated, money: true },
  profit: { label: "Lucro (R$)", current: (row) => row.profit, simulated: (row) => row.profitSimulated, money: true },
  margin: {
    label: "Margem (%)",
    current: (row) => margin(row.profit, row.revenue),
    simulated: (row) => margin(row.profitSimulated, row.revenueSimulated),
    money: false,
  },
  ic: { label: "IC (%)", current: (row) => row.ic, simulated: (row) => row.icSimulated, money: false },
};
const treeDelta = (key: keyof typeof treeMetrics, row: TreeNode) => {
  const metric = treeMetrics[key];
  return metric.money
    ? delta(metric.current(row), metric.simulated(row))
    : metric.simulated(row) - metric.current(row);
};
const treeDeltaLabel = (key: keyof typeof treeMetrics, row: TreeNode) =>
  signed(treeDelta(key, row), treeMetrics[key].money ? "%" : " p.p.");
const treeMetricKeys = Object.keys(treeMetrics) as (keyof typeof treeMetrics)[];
const treeColumns: TableColumn<TreeNode>[] = [
  { id: "name", header: "Hierarquia de produto", ...adsTablePinned(256, adsTableColumn.identity) },
  ...treeMetricKeys.map((key): TableColumn<TreeNode> => {
    const metric = treeMetrics[key];
    const format = (value: number) => (metric.money ? numberToCompactBRL(value) : pct(value));
    return {
      id: key,
      header: metric.label,
      columns: [
        { id: `${key}-current`, header: "Atual", meta: money, cell: ({ row }) => format(metric.current(row.original)) },
        { id: `${key}-simulated`, header: "Simulado", meta: money, cell: ({ row }) => format(metric.simulated(row.original)) },
        { id: `${key}-delta`, header: metric.money ? "Δ%" : "Δ p.p.", meta: money },
      ],
    };
  }),
  {
    id: "variation",
    header: "Variação de Preço (Cluster A)",
    columns: [
      { accessorKey: "raise", header: "Aumento", meta: money },
      { accessorKey: "reduce", header: "Redução", meta: money },
      { accessorKey: "keep", header: "Manter", meta: money },
    ],
  },
];

type MarginNode = {
  id: string;
  name: string;
  revenue: string;
  cost: string;
  margin: string;
  target: string;
  children?: MarginNode[];
};
const marginTree = reactive<MarginNode[]>([
  {
    id: "med",
    name: "Medicamentos",
    revenue: "R$ 120.000",
    cost: "R$ 80.000",
    margin: "33%",
    target: "",
    children: [
      {
        id: "ana",
        name: "Analgésicos",
        revenue: "R$ 48.000",
        cost: "R$ 32.200",
        margin: "33%",
        target: "",
        children: [
          { id: "dor", name: "Dor e febre", revenue: "R$ 30.000", cost: "R$ 20.100", margin: "33%", target: "35" },
        ],
      },
    ],
  },
]);
const marginExpanded = ref<Record<string, boolean>>({ med: true, ana: true });
const marginColumns: TableColumn<MarginNode>[] = [
  { id: "name", header: "Hierarquia", meta: adsTableColumn.identity },
  { accessorKey: "revenue", header: "Receita Mensal", meta: money },
  { accessorKey: "cost", header: "Custo Mensal", meta: money },
  { accessorKey: "margin", header: "Margem Atual (%)", meta: money },
  { id: "target", header: "Margem Objetivo (%)", meta: money },
];

const roleRows = reactive([
  { category: "Dor e febre", department: "Medicamentos", revenue: 360000, share: 25, role: "routine", origin: "calculated" },
  { category: "Proteção solar", department: "Perfumaria", revenue: 480000, share: 62, role: "seasonal", origin: "overridden" },
  { category: "Fraldas", department: "Infantil", revenue: 520000, share: 48, role: "destination", origin: "calculated" },
]);
const roleSearch = ref("");
const roleFilter = ref("all");
const roleFilterOptions = [
  { value: "all", label: "Todos os papéis" },
  ...CATEGORY_ROLE_OPTIONS,
];
const filteredRoleRows = computed(() => {
  const term = roleSearch.value.trim().toLocaleLowerCase("pt-BR");
  return roleRows.filter((row) => {
    const matchesRole = roleFilter.value === "all" || row.role === roleFilter.value;
    const matchesTerm = !term || `${row.category} ${row.department}`.toLocaleLowerCase("pt-BR").includes(term);
    return matchesRole && matchesTerm;
  });
});
const roleColumns: TableColumn<(typeof roleRows)[number]>[] = [
  { id: "category", header: "Categoria", meta: adsTableColumn.identity },
  { accessorKey: "department", header: "Departamento" },
  { accessorKey: "revenue", header: "Receita 12M", meta: money, cell: ({ row }) => numberToCompactBRL(row.original.revenue) },
  { accessorKey: "share", header: "Part. Receita Dep.", meta: money, cell: ({ row }) => pct(row.original.share) },
  { id: "role", header: "Papel Atual" },
  { id: "origin", header: "Origem" },
  { id: "history", header: "", meta: adsTableColumn.action },
];

const validationRows = [
  { line: "14", field: "Preço", product: "Dipirona 500mg 10 comprimidos" },
  { line: "38", field: "EAN", product: "Protetor solar FPS 50 200ml" },
];
const validationColumns: TableColumn<(typeof validationRows)[number]>[] = [
  { accessorKey: "line", header: "Linha", meta: money },
  { id: "field", header: "Campo" },
  { accessorKey: "product", header: "Produto (referência)", meta: adsTableColumn.identity },
  { id: "action", header: "Ação", meta: adsTableColumn.action },
];

const summaryColumns: TableColumn<(typeof demoSummary)[number]>[] = [
  { id: "label", header: "Classe" },
  { accessorKey: "products", header: "Qtd Produtos", meta: money, cell: ({ row }) => row.original.products.toLocaleString("pt-BR") },
  { accessorKey: "productShare", header: "% Qtd", meta: money, cell: ({ row }) => pct(row.original.productShare * 100) },
  { accessorKey: "revenue", header: "Receita 12M", meta: money, cell: ({ row }) => numberToCompactBRL(row.original.revenue) },
  { accessorKey: "revenueShare", header: "% Receita", meta: money, cell: ({ row }) => pct(row.original.revenueShare * 100) },
];

const previewColumns: TableColumn<(typeof demoPreviewRows)[number]>[] = demoPreviewHeaders.map((header, index) => ({
  id: `c${index}`,
  header,
}));
</script>
