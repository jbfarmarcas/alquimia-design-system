<!--
  Demonstração dos 8 tipos de célula do _Table Cell (Figma: Table).

  Tipos cobertos:
  1. Texto           — valor simples em text-secondary
  2. Ícone + Texto   — ícone Lucide antes do rótulo
  3. Pill            — AdsPill com status
  4. Botão           — AdsButton (ação primária ou secundária)
  5. Link            — âncora em text-brand
  6. Meta            — duas linhas: primária (text-primary) + secundária (text-tertiary)
  7. Ações           — um ou mais AdsButton icon-only
  8. Combinado       — Pill + texto extra (ex.: pill de status + nome secundário)
-->
<template>
  <AdsTable :data="demoCellTypes" :columns="columns">
    <!-- 2. Ícone + Texto -->
    <template #department-cell="{ row }">
      <span class="flex items-center gap-1.5">
        <UIcon :name="row.original.departmentIcon" class="size-4 shrink-0 text-[var(--ads-border-icon-support)]" aria-hidden="true" />
        <span>{{ row.original.department }}</span>
      </span>
    </template>

    <!-- 3. Pill -->
    <template #status-cell="{ row }">
      <AdsPill
        tone="secondary"
        :status="PILL_STATUS[row.original.status]"
        :label="PILL_LABEL[row.original.status]"
      />
    </template>

    <!-- 4. Botão -->
    <template #button-cell="{ row }">
      <AdsButton
        v-if="row.original.hasAction"
        type="unfilled"
        size="sm"
        trailing
        icon="i-lucide-chevron-right"
        label="Ver detalhes"
        :aria-label="`Ver detalhes de ${row.original.productName}`"
      />
      <span v-else class="text-[var(--ads-text-tertiary)]">—</span>
    </template>

    <!-- 5. Link -->
    <template #link-cell="{ row }">
      <a
        href="#"
        class="font-medium text-[var(--ads-text-brand)] underline decoration-[var(--ads-button-secondary-pressed)] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        :aria-label="`Ficha de ${row.original.productName}`"
        @click.prevent
      >
        {{ row.original.linkLabel }}
      </a>
    </template>

    <!-- 6. Meta -->
    <template #meta-cell="{ row }">
      <span class="flex flex-col">
        <span class="text-[var(--ads-text-primary)]">{{ row.original.metaPrimary }}</span>
        <span class="text-[length:var(--ads-font-size-xxxs)] text-[var(--ads-text-tertiary)]">{{ row.original.metaSecondary }}</span>
      </span>
    </template>

    <!-- 7. Ações -->
    <template #actions-cell="{ row }">
      <span class="flex items-center justify-end gap-1">
        <AdsButton
          type="unfilled"
          size="sm"
          icon="i-lucide-pencil"
          :aria-label="`Editar ${row.original.productName}`"
        />
        <AdsButton
          type="unfilled"
          size="sm"
          icon="i-lucide-trash-2"
          :aria-label="`Remover ${row.original.productName}`"
        />
      </span>
    </template>

    <!-- 8. Combinado (Pill + nome secundário) -->
    <template #combined-cell="{ row }">
      <span class="flex flex-col gap-0.5">
        <AdsPill
          tone="secondary"
          :status="PILL_STATUS[row.original.status]"
          :label="PILL_LABEL[row.original.status]"
        />
        <span class="text-[length:var(--ads-font-size-xxxs)] text-[var(--ads-text-tertiary)]">
          {{ row.original.metaSecondary }}
        </span>
      </span>
    </template>
  </AdsTable>
</template>

<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import AdsButton from "../../../../app/components/AdsButton.vue";
import AdsPill, { type AdsPillStatus } from "../../../../app/components/AdsPill.vue";
import AdsTable from "../../../../app/components/AdsTable.vue";
import { adsTableColumn } from "../../../../app/utils/ads-table";
import { demoCellTypes, type DemoCellTypeRow } from "./table-fixtures";

// 6 status válidos do AdsPill (innovation e neutral foram removidos)
const PILL_STATUS: Record<DemoCellTypeRow["status"], AdsPillStatus> = {
  done: "success",
  pending: "attention",
  blocked: "blocked",
};
const PILL_LABEL: Record<DemoCellTypeRow["status"], string> = {
  done: "Concluída",
  pending: "Pendente",
  blocked: "Bloqueada",
};

const columns: TableColumn<DemoCellTypeRow>[] = [
  // 1. Texto
  { accessorKey: "productName", header: "1 · Texto", meta: adsTableColumn.identity },
  // 2. Ícone + Texto
  { id: "department", header: "2 · Ícone + Texto" },
  // 3. Pill
  { id: "status", header: "3 · Pill" },
  // 4. Botão
  { id: "button", header: "4 · Botão" },
  // 5. Link
  { id: "link", header: "5 · Link" },
  // 6. Meta
  { id: "meta", header: "6 · Meta" },
  // 7. Ações
  { id: "actions", header: "7 · Ações", meta: adsTableColumn.action },
  // 8. Combinado
  { id: "combined", header: "8 · Combinado" },
];
</script>
