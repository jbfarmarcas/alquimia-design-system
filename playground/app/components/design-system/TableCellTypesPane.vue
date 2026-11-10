<!--
  Demonstração dos 9 tipos de célula do _Table Cell (Figma: Table).

  1. Texto           — título e subtexto opcional
  2. Ícone + Texto   — ícone em caixa, título e subtexto
  3. Pill            — AdsPill centralizada
  4. Botão           — AdsButton secundário
  5. Link            — "Ver detalhes" com chevron
  6. Meta            — relógio e data
  7. Ações           — editar, excluir e mais
  8. Combinado       — ícone, textos, pill e botão
  9. Progresso       — rótulo e barra
-->
<template>
  <div class="flex flex-col gap-6">
  <AdsTable v-for="(group, index) in COLUMN_GROUPS" :key="index" :data="demoCellTypes" :columns="group">
    <!-- 1. Texto -->
    <template #text-cell="{ row }">
      <span class="flex flex-col gap-0.5 whitespace-nowrap">
        <span>{{ row.original.productName }}</span>
        <span :class="SUBTEXT">{{ row.original.metaSecondary }}</span>
      </span>
    </template>

    <!-- 2. Ícone + Texto -->
    <template #department-cell="{ row }">
      <span class="flex items-center gap-3 whitespace-nowrap">
        <span :class="ICON_BOX">
          <UIcon :name="row.original.departmentIcon" class="size-[18px] text-[var(--ads-text-brand)]" aria-hidden="true" />
        </span>
        <span class="flex flex-col gap-0.5 text-[var(--ads-text-secondary)]">
          <span class="font-bold">{{ row.original.department }}</span>
          <span :class="SUBTEXT">{{ row.original.metaPrimary }}</span>
        </span>
      </span>
    </template>

    <!-- 3. Pill -->
    <template #status-cell="{ row }">
      <AdsPill tone="secondary" :status="PILL_STATUS[row.original.status]" :label="PILL_LABEL[row.original.status]" />
    </template>

    <!-- 4. Botão -->
    <template #button-cell="{ row }">
      <AdsButton type="secondary" label="Ação" :aria-label="`Ação em ${row.original.productName}`" />
    </template>

    <!-- 5. Link -->
    <template #link-cell="{ row }">
      <a
        href="#"
        class="inline-flex items-center gap-1 whitespace-nowrap text-[length:var(--ads-font-size-xxxs)] leading-[var(--ads-line-height-sm)] font-bold text-[var(--ads-text-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        :aria-label="`${row.original.linkLabel}: ${row.original.productName}`"
        @click.prevent
      >
        {{ row.original.linkLabel }}
        <UIcon name="i-lucide-chevron-right" class="size-4" aria-hidden="true" />
      </a>
    </template>

    <!-- 6. Meta -->
    <template #meta-cell>
      <span class="inline-flex items-center gap-1 whitespace-nowrap" :class="SUBTEXT">
        <UIcon name="i-lucide-clock" class="size-4" aria-hidden="true" />
        Atualizado há 2 dias
      </span>
    </template>

    <!-- 7. Ações -->
    <template #actions-cell="{ row }">
      <span class="flex items-center justify-end gap-1">
        <button
          v-for="action in ACTIONS"
          :key="action.name"
          type="button"
          class="flex size-8 items-center justify-center rounded-[var(--ads-radius-xsm)] text-[var(--ads-border-icon)] hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ads-button-primary)]"
          :aria-label="`${action.name} ${row.original.productName}`"
        >
          <UIcon :name="action.icon" class="size-[18px]" aria-hidden="true" />
        </button>
      </span>
    </template>

    <!-- 8. Combinado -->
    <template #combined-cell="{ row }">
      <span class="flex items-center gap-3 whitespace-nowrap">
        <span :class="ICON_BOX">
          <UIcon :name="row.original.departmentIcon" class="size-[18px] text-[var(--ads-text-brand)]" aria-hidden="true" />
        </span>
        <span class="flex min-w-0 flex-1 flex-col gap-0.5 text-[var(--ads-text-secondary)]">
          <span class="font-bold">{{ row.original.department }}</span>
          <span :class="SUBTEXT">{{ row.original.metaSecondary }}</span>
        </span>
        <AdsPill tone="secondary" :status="PILL_STATUS[row.original.status]" :label="PILL_LABEL[row.original.status]" />
        <AdsButton type="secondary" label="Ação" :aria-label="`Ação em ${row.original.department}`" />
      </span>
    </template>

    <!-- 9. Progresso -->
    <template #progress-cell="{ row }">
      <span class="flex flex-col items-end gap-3">
        <span :class="SUBTEXT">Progresso</span>
        <ProgressBarLoading
          :percent="row.original.progress"
          :show-icon="false"
          :show-percent="false"
          :show-elapsed-time="false"
          root-class="w-full"
          :aria-label="`Progresso de ${row.original.productName}`"
        />
      </span>
    </template>
  </AdsTable>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import AdsButton from "../../../../app/components/AdsButton.vue";
import AdsPill, { type AdsPillStatus } from "../../../../app/components/AdsPill.vue";
import AdsTable from "../../../../app/components/AdsTable.vue";
import ProgressBarLoading from "../../../../app/components/ProgressBarLoading.vue";
import { adsTableColumn } from "../../../../app/utils/ads-table";
import { demoCellTypes, type DemoCellTypeRow } from "./table-fixtures";

const ICON_BOX =
  "flex size-8 shrink-0 items-center justify-center rounded-[var(--ads-radius-sm)] bg-[var(--ads-button-secondary)]";
const SUBTEXT =
  "text-[length:var(--ads-font-size-xxxs)] leading-[var(--ads-line-height-sm)] text-[var(--ads-text-secondary)]";

const ACTIONS = [
  { name: "Editar", icon: "i-lucide-pencil" },
  { name: "Excluir", icon: "i-lucide-trash-2" },
  { name: "Mais opções de", icon: "i-lucide-ellipsis-vertical" },
];

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

/** Em duas tabelas para os 9 tipos aparecerem sem rolagem lateral. */
const COLUMN_GROUPS: TableColumn<DemoCellTypeRow>[][] = [
  [
    { id: "text", header: "Texto" },
    { id: "department", header: "Ícone + Texto" },
    { id: "status", header: "Pill", meta: adsTableColumn.center },
    { id: "button", header: "Botão", meta: { class: { th: "text-right", td: "text-right" } } },
    { id: "link", header: "Link", meta: { class: { th: "text-right", td: "text-right" } } },
  ],
  [
    { id: "meta", header: "Meta" },
    { id: "actions", header: "Ações", meta: adsTableColumn.action },
    { id: "combined", header: "Combinado" },
    { id: "progress", header: "Progresso", meta: { class: { th: "min-w-50 text-right", td: "min-w-50" } } },
  ],
];
</script>
