<template>
  <DesignSystemFrame
    v-model:active-id="activeId"
    title="Tabelas"
    lede="Cada tabela do catálogo na versão AdsTable, com dados de exemplo. A casca é a mesma: cor, borda, raio e a fonte de 14px no cabeçalho e na célula."
    :sections="TABLE_SECTIONS"
  >
    <section id="decisoes" :class="sectionClass">
      <DesignSystemSectionHeading :section="section('decisoes')" :copied-name="copiedName" @copy="copyComponentName" />
      <dl class="border-y border-[var(--ads-border-subtle)]">
        <div
          v-for="rule in TABLE_CHROME"
          :key="rule.part"
          class="grid gap-1 border-b border-[var(--ads-border-subtle)] py-4 last:border-b-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
        >
          <dt class="font-bold text-[var(--ads-text-primary)]">{{ rule.part }}</dt>
          <dd class="max-w-[70ch] text-sm leading-relaxed text-[var(--ads-text-secondary)]">{{ rule.value }}</dd>
        </div>
      </dl>
      <div class="grid items-start gap-4 lg:grid-cols-2">
        <div class="flex flex-col gap-2">
          <p class="text-[length:var(--ads-font-size-xxxs)] font-bold leading-[var(--ads-line-height-sm)] text-[var(--ads-text-primary)]">Lista</p>
          <AdsTable :data="specimenRows" :columns="specimenColumns" />
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-[length:var(--ads-font-size-xxxs)] font-bold leading-[var(--ads-line-height-sm)] text-[var(--ads-text-primary)]">Grade</p>
          <AdsTable :data="specimenRows" :columns="specimenColumns" striped />
        </div>
      </div>
      <p class="max-w-[70ch] text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        Seleção, árvore, mapa de calor e edição na linha são conteúdo da célula, não uma terceira casca. O papel da categoria usa AdsFilterSelect. Cabeçalho e célula usam o mesmo 14px (--ads-font-size-xxs); o cabeçalho é bold. Coluna fixa e célula preenchida continuam nas tabelas que já tinham isso.
      </p>
    </section>

    <section id="inventario" :class="sectionClass">
      <DesignSystemSectionHeading :section="section('inventario')" :copied-name="copiedName" @copy="copyComponentName" />
      <AdsTable :data="TABLE_INVENTORY" :columns="inventoryColumns" density="sm">
        <template #name-cell="{ row }">
          <button
            type="button"
            class="font-mono text-xs font-bold text-[var(--ads-text-primary)] transition-colors duration-150 ease-out hover:text-[var(--ads-text-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            :aria-label="copiedName === row.original.name ? `${row.original.name} copiado` : `Copiar ${row.original.name}`"
            @click="copyComponentName(row.original.name)"
          >
            {{ copiedName === row.original.name ? "Copiado" : row.original.name }}
          </button>
          <p class="mt-0.5 text-xs text-[var(--ads-text-tertiary)]">{{ row.original.path }}</p>
        </template>
        <template #base-cell="{ row }">
          <span class="font-mono text-xs">{{ row.original.base }}</span>
        </template>
        <template #variant-cell="{ row }">
          <a
            href="#comparacao"
            class="font-bold text-[var(--ads-text-brand)] underline decoration-[var(--ads-button-secondary-pressed)] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {{ TABLE_VARIANT_LABEL[row.original.variant] }}
          </a>
        </template>
      </AdsTable>
    </section>

    <section id="comparacao" :class="sectionClass">
      <DesignSystemSectionHeading :section="section('comparacao')" :copied-name="copiedName" @copy="copyComponentName" />
      <TableGallery />
    </section>
  </DesignSystemFrame>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import type { TableColumn } from "@nuxt/ui";
import AdsTable from "../../../../app/components/AdsTable.vue";
import DesignSystemFrame from "../../components/DesignSystemFrame.vue";
import DesignSystemSectionHeading from "../../components/DesignSystemSectionHeading.vue";
import TableGallery from "../../components/design-system/TableGallery.vue";
import {
  TABLE_CHROME,
  TABLE_INVENTORY,
  TABLE_SECTIONS,
  TABLE_VARIANT_LABEL,
  type TableInventoryRow,
  type TableSectionId,
} from "../../components/design-system/table-catalog";

definePageMeta({
  name: "design-system-tables",
  layout: "design-system",
});

const sectionClass = "mt-20 flex scroll-mt-24 flex-col gap-6 md:scroll-mt-12";

const section = (id: TableSectionId) => {
  const found = TABLE_SECTIONS.find((item) => item.id === id);
  if (!found) throw new Error(`Seção ${id} ausente`);
  return found;
};

const inventoryColumns: TableColumn<TableInventoryRow>[] = [
  { id: "name", header: "Componente" },
  { accessorKey: "screen", header: "Tela" },
  { id: "base", header: "Base" },
  { accessorKey: "header", header: "Cabeçalho hoje", meta: { class: { td: "min-w-56 whitespace-normal" } } },
  { accessorKey: "features", header: "Recursos", meta: { class: { td: "min-w-64 whitespace-normal" } } },
  { id: "variant", header: "Variante" },
];

const specimenRows = [
  { store: "Loja Centro", status: "Concluída", total: "100,3%" },
  { store: "Loja Batel", status: "Concluída", total: "105%" },
  { store: "Loja Joinville", status: "Pendente", total: "95%" },
];
const specimenColumns: TableColumn<(typeof specimenRows)[number]>[] = [
  { accessorKey: "store", header: "Loja" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "total", header: "Total" },
];

const activeId = ref<TableSectionId | "">("");
const copiedName = ref("");
let copyTimer: ReturnType<typeof setTimeout> | undefined;

const copyComponentName = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    return;
  }
  copiedName.value = value;
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    if (copiedName.value === value) copiedName.value = "";
  }, 1600);
};

onBeforeUnmount(() => {
  clearTimeout(copyTimer);
});
</script>
