<!--
  Demo do catálogo para AdsTable.
  Cobre: cabeçalho fixo, colunas fixas, linhas zebradas, 8 tipos de célula,
  carregamento com AdsTableSkeleton e estado vazio.
  Cascas Lista/Grade e depth/árvore existem no código mas não são documentadas aqui.
-->
<template>
  <div class="flex flex-col gap-10">
    <!-- Parâmetros -->
    <div class="flex flex-wrap items-end gap-x-8 gap-y-5">
      <DocsParam label="Variante">
        <AdsSegmentedTabs v-model="variant" :items="variantItems" aria-label="Variante" />
      </DocsParam>
      <DocsParam v-if="variant === 'standard'" label="Opções">
        <div class="flex flex-wrap gap-4">
          <AdsSwitch v-model="sticky" label="Cabeçalho fixo" />
          <AdsSwitch v-model="pinned" label="Coluna fixa" />
          <AdsSwitch v-model="striped" label="Zebrado" />
        </div>
      </DocsParam>
    </div>

    <!-- Preview: tabela padrão -->
    <div v-if="variant === 'standard'">
      <p class="mb-2 text-sm font-bold text-[var(--ads-text-primary)]">Tabela padrão</p>
      <AdsTable
        :data="specimenRows"
        :columns="specimenColumns"
        :sticky="sticky ? 'header' : false"
        :column-pinning="pinned ? { left: ['store'] } : undefined"
        :striped="striped"
        class="max-h-48"
      >
        <template #store-cell="{ row }">
          <span class="font-bold text-[var(--ads-text-primary)]">{{ row.original.store }}</span>
        </template>
      </AdsTable>
    </div>

    <!-- Preview: 8 tipos de célula -->
    <div v-else-if="variant === 'cell-types'">
      <p class="mb-2 text-sm font-bold text-[var(--ads-text-primary)]">8 tipos de célula</p>
      <div class="overflow-x-auto">
        <TableCellTypesPane />
      </div>
    </div>

    <!-- Preview: loading -->
    <div v-else-if="variant === 'loading'">
      <p class="mb-2 text-sm font-bold text-[var(--ads-text-primary)]">Carregamento com AdsTableSkeleton</p>
      <AdsTable :data="[]" :columns="specimenColumns" loading :skeleton-rows="4" />
      <p class="mt-3 text-sm text-[var(--ads-text-secondary)]">
        Passe <code class="rounded bg-neutral-100 px-1 font-mono text-xs">:loading="true"</code>
        e <code class="rounded bg-neutral-100 px-1 font-mono text-xs">:skeleton-rows="n"</code>.
        Para o estilo Logo: <code class="rounded bg-neutral-100 px-1 font-mono text-xs">skeleton-variant="logo"</code>.
      </p>
    </div>

    <!-- Preview: estado vazio -->
    <div v-else-if="variant === 'empty'">
      <p class="mb-2 text-sm font-bold text-[var(--ads-text-primary)]">Estado vazio</p>
      <AdsTable :data="[]" :columns="specimenColumns" />
    </div>

    <!-- Referência -->
    <DocsReference :block="{ language: 'vue', code, apis: docsApis.table }" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { TableColumn } from "@nuxt/ui";
import DocsParam from "../DocsParam.vue";
import DocsReference from "../DocsReference.vue";
import { docsApis } from "../catalog-docs";
import TableCellTypesPane from "../TableCellTypesPane.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";
import AdsTable from "../../../../../app/components/AdsTable.vue";

type DemoRow = { store: string; q1: string; q2: string; q3: string; total: string };

const variant = ref<"standard" | "cell-types" | "loading" | "empty">("standard");
const sticky = ref(true);
const pinned = ref(true);
const striped = ref(false);

const variantItems = [
  { label: "Padrão", value: "standard" },
  { label: "Tipos de célula", value: "cell-types" },
  { label: "Carregando", value: "loading" },
  { label: "Vazio", value: "empty" },
];

const fmtPct = (n: number) => (n % 1 === 0 ? String(n) : String(n).replace(".", ","));

const specimenRows: DemoRow[] = Array.from({ length: 8 }, (_, i) => ({
  store: `Loja ${String.fromCharCode(65 + i)}`,
  q1: `${fmtPct(90 + i * 2)}%`,
  q2: `${fmtPct(88 + i * 1.5)}%`,
  q3: `${fmtPct(92 + i * 1.8)}%`,
  total: `${fmtPct(91 + i * 1.5)}%`,
}));

const specimenColumns: TableColumn<DemoRow>[] = [
  { id: "store", accessorKey: "store", header: "Loja", meta: { class: { th: "min-w-40", td: "min-w-40" } } },
  { accessorKey: "q1", header: "Q1 (%)", meta: { class: { th: "min-w-28 text-right", td: "min-w-28 text-right tabular-nums" } } },
  { accessorKey: "q2", header: "Q2 (%)", meta: { class: { th: "min-w-28 text-right", td: "min-w-28 text-right tabular-nums" } } },
  { accessorKey: "q3", header: "Q3 (%)", meta: { class: { th: "min-w-28 text-right", td: "min-w-28 text-right tabular-nums" } } },
  { accessorKey: "total", header: "Total (%)", meta: { class: { th: "min-w-28 text-right", td: "min-w-28 text-right tabular-nums" } } },
];

const code = computed(() => {
  if (variant.value === "loading") {
    return `<AdsTable :data="rows" :columns="cols" loading :skeleton-rows="4" />`;
  }
  if (variant.value === "empty") {
    return `<AdsTable :data="[]" :columns="cols" />`;
  }
  if (variant.value === "cell-types") {
    return `<!-- Tipos de célula são definidos nos slots da coluna: -->
<!-- 1.Texto (accessorKey) · 2.Ícone+Texto · 3.Pill · 4.Botão -->
<!-- 5.Link · 6.Meta · 7.Ações (adsTableColumn.action) · 8.Combinado -->
<AdsTable :data="rows" :columns="cols">
  <template #status-cell="{ row }">
    <AdsPill tone="secondary" :status="row.original.status" />
  </template>
  <template #actions-cell="{ row }">
    <AdsButton type="unfilled" size="sm" icon="i-lucide-pencil" />
  </template>
</AdsTable>`;
  }
  const attrs: string[] = [];
  if (sticky.value) attrs.push('sticky="header"');
  if (pinned.value) attrs.push(':column-pinning="{ left: [\'store\'] }"');
  if (striped.value) attrs.push("striped");
  return `<AdsTable :data="rows" :columns="cols"${attrs.length ? "\n  " + attrs.join("\n  ") : ""} />`;
});
</script>
