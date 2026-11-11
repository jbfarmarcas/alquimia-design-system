<!--
  Demo do catálogo para AdsTable.
  Cobre: cabeçalho fixo, colunas fixas, linhas zebradas, 9 tipos de célula,
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
      <DocsParam v-if="variant === 'loading'" label="Estilo">
        <AdsSegmentedTabs v-model="skeletonVariant" :items="skeletonItems" aria-label="Estilo do carregamento" />
      </DocsParam>
      <DocsParam v-if="variant === 'standard'" label="Colunas fixas">
        <AdsSegmentedTabs v-model="pinMode" :items="pinItems" aria-label="Colunas fixas" />
      </DocsParam>
      <DocsParam v-if="variant === 'standard'" label="Linhas">
        <AdsSegmentedTabs v-model="volume" :items="volumeItems" aria-label="Quantidade de linhas" />
      </DocsParam>
      <DocsParam v-if="variant === 'standard'" label="Opções">
        <div class="flex flex-wrap gap-4">
          <AdsSwitch v-model="sticky" label="Cabeçalho fixo" />
          <AdsSwitch v-model="striped" label="Zebrado" />
          <AdsSwitch v-model="virtualOn" label="Lista virtual" />
        </div>
      </DocsParam>
    </div>

    <!-- Preview: tabela padrão -->
    <div v-if="variant === 'standard'">
      <AdsTable
        v-model:column-pinning="pinning"
        :data="tableRows"
        :columns="columns"
        :sticky="sticky ? 'header' : false"
        :striped="striped"
        :virtualize="virtualOn"
      >
        <template #store-cell="{ row }">
          <span class="flex items-center gap-3">
            <span class="flex size-8 shrink-0 items-center justify-center rounded-[var(--ads-radius-sm)] bg-[var(--ads-button-secondary)]">
              <UIcon name="i-lucide-store" class="size-[18px] text-[var(--ads-text-brand)]" aria-hidden="true" />
            </span>
            <span class="flex min-w-0 flex-1 flex-col gap-0.5 text-[var(--ads-text-secondary)]">
              <span class="truncate font-bold">{{ row.original.store }}</span>
              <span :class="[SUBTEXT, 'truncate']">{{ row.original.address }}</span>
            </span>
          </span>
        </template>

        <template #status-cell="{ row }">
          <AdsPill
            tone="secondary"
            :status="row.original.mapped ? 'success' : 'attention'"
            :label="row.original.mapped ? '4 Concorrentes mapeados' : 'Pendente'"
          />
        </template>

        <template #origin-cell="{ row }">
          <AdsPill
            v-if="row.original.origin"
            tone="secondary"
            :status="row.original.origin === 'Manual' ? 'warning' : 'default'"
            :label="row.original.origin"
          />
        </template>

        <template #updated-cell="{ row }">
          <span v-if="row.original.mapped" class="inline-flex items-center gap-1 whitespace-nowrap" :class="SUBTEXT">
            <UIcon name="i-lucide-clock" class="size-4" aria-hidden="true" />
            Atualizado há 2 dias
          </span>
        </template>

        <template #action-cell="{ row }">
          <a
            v-if="row.original.mapped"
            href="#"
            class="inline-flex items-center gap-1 whitespace-nowrap text-[length:var(--ads-font-size-xxxs)] leading-[var(--ads-line-height-sm)] font-bold text-[var(--ads-text-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            :aria-label="`Ver detalhes de ${row.original.store}`"
            @click.prevent
          >
            Ver detalhes
            <UIcon name="i-lucide-chevron-right" class="size-4" aria-hidden="true" />
          </a>
          <AdsButton
            v-else
            type="secondary"
            leading
            icon="i-lucide-sparkle"
            label="Mapear"
            :aria-label="`Mapear ${row.original.store}`"
          />
        </template>
      </AdsTable>
    </div>

    <!-- Preview: tipos de célula -->
    <div v-else-if="variant === 'cell-types'">
      <p class="mb-2 text-sm font-bold text-[var(--ads-text-primary)]">9 tipos de célula</p>
      <div class="overflow-x-auto">
        <TableCellTypesPane />
      </div>
    </div>

    <!-- Preview: loading -->
    <div v-else-if="variant === 'loading'">
      <p class="mb-2 text-sm font-bold text-[var(--ads-text-primary)]">Carregamento com AdsTableSkeleton</p>
      <AdsTable :data="[]" :columns="columns" loading :skeleton-rows="4" :skeleton-variant="skeletonVariant" />
      <p class="mt-3 text-sm text-[var(--ads-text-secondary)]">
        Passe <code class="rounded bg-neutral-100 px-1 font-mono text-xs">:loading="true"</code>
        e <code class="rounded bg-neutral-100 px-1 font-mono text-xs">:skeleton-rows="n"</code>.
        Para o estilo Logo: <code class="rounded bg-neutral-100 px-1 font-mono text-xs">skeleton-variant="logo"</code>.
      </p>
    </div>

    <!-- Preview: estado vazio -->
    <div v-else-if="variant === 'empty'">
      <p class="mb-2 text-sm font-bold text-[var(--ads-text-primary)]">Estado vazio</p>
      <AdsTable :data="[]" :columns="columns" />
    </div>

    <!-- Referência -->
    <DocsReference :block="{ language: 'vue', code, apis: docsApis.table }" />
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref, watch } from "vue";
import type { TableColumn } from "@nuxt/ui";
import DocsParam from "../DocsParam.vue";
import DocsReference from "../DocsReference.vue";
import { docsApis } from "../catalog-docs";
import TableCellTypesPane from "../TableCellTypesPane.vue";
import { demoMappedStores, type DemoMappedStoreRow } from "../table-fixtures";
import AdsButton from "../../../../../app/components/AdsButton.vue";
import AdsPill from "../../../../../app/components/AdsPill.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";
import AdsTable from "../../../../../app/components/AdsTable.vue";
import AdsTableHeaderCell from "../../../../../app/components/AdsTableHeaderCell.vue";
import { adsTablePinned } from "../../../../../app/utils/ads-table";

const SUBTEXT =
  "text-[length:var(--ads-font-size-xxxs)] leading-[var(--ads-line-height-sm)] text-[var(--ads-text-secondary)]";

const variant = ref<"standard" | "cell-types" | "loading" | "empty">("standard");
const pinMode = ref<"none" | "first" | "both">("first");
const sticky = ref(false);
const striped = ref(true);
const virtualOn = ref(false);
const volume = ref<"few" | "many">("few");

const volumeItems = [
  { label: "Poucas (8)", value: "few" },
  { label: "Muitas (2 000)", value: "many" },
];

/** Volume para testar a lista virtual: as lojas de exemplo repetidas com nomes únicos. */
const manyRows: DemoMappedStoreRow[] = Array.from({ length: 2000 }, (_, index) => {
  const base = demoMappedStores[index % demoMappedStores.length]!;
  return { ...base, id: `${base.id}-${index}`, store: `${base.store} ${index + 1}` };
});
const tableRows = computed(() => (volume.value === "many" ? manyRows : demoMappedStores));
const skeletonVariant = ref<"skeleton" | "logo">("skeleton");

const skeletonItems = [
  { label: "Skeleton", value: "skeleton" },
  { label: "Logo", value: "logo" },
];

const variantItems = [
  { label: "Padrão", value: "standard" },
  { label: "Tipos de célula", value: "cell-types" },
  { label: "Carregando", value: "loading" },
  { label: "Vazio", value: "empty" },
];

const pinItems = [
  { label: "Nenhuma", value: "none" },
  { label: "Primeira", value: "first" },
  { label: "Primeira e última", value: "both" },
];

const pinningFor = (mode: typeof pinMode.value) => ({
  left: mode === "none" ? [] : ["store"],
  right: mode === "both" ? ["action"] : [],
});

const pinning = ref(pinningFor(pinMode.value));
watch(pinMode, (mode) => {
  pinning.value = pinningFor(mode);
});

const pinnedStore = adsTablePinned(380);
const pinnedAction = adsTablePinned(160, { class: { td: "text-right" } });

const columns: TableColumn<DemoMappedStoreRow>[] = [
  {
    id: "store",
    header: ({ column }) => h(AdsTableHeaderCell, { column, label: "Loja Própria", pinnable: true }),
    ...pinnedStore,
  },
  {
    id: "status",
    header: ({ column }) => h(AdsTableHeaderCell, { column, label: "Status de Mapeamento", align: "center" }),
    meta: { class: { th: "min-w-55", td: "min-w-55 text-center" } },
  },
  {
    id: "origin",
    header: ({ column }) => h(AdsTableHeaderCell, { column, label: "Origem", align: "center" }),
    meta: { class: { th: "min-w-40", td: "min-w-40 text-center" } },
  },
  {
    id: "updated",
    header: ({ column }) => h(AdsTableHeaderCell, { column, label: "Última Atualização" }),
    meta: { class: { th: "min-w-50", td: "min-w-50" } },
  },
  {
    id: "action",
    header: ({ column }) =>
      h(AdsTableHeaderCell, { column, label: "Ação", hideLabel: true, align: "right", pinnable: true, pinSide: "right" }),
    ...pinnedAction,
  },
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
<!-- Texto · Ícone + Texto · Pill · Botão · Link · Meta · Ações · Combinado · Progresso -->
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
  if (pinMode.value !== "none") attrs.push('v-model:column-pinning="pinning"');
  if (striped.value) attrs.push("striped");
  if (virtualOn.value) attrs.push("virtualize");
  return `<AdsTable :data="rows" :columns="cols"${attrs.length ? "\n  " + attrs.join("\n  ") : ""} />

// Título com ordenar e fixar, ligados por coluna
{
  id: "store",
  header: ({ column }) => h(AdsTableHeaderCell, { column, label: "Loja", pinnable: true }),
  ...adsTablePinned(380),
}`;
});
</script>
