<!--
  AdsHeavyHeaderCell — Título de coluna da AdsHeavyTable (Figma: "_Fin Header Cell").

  Ordenar só aparece em coluna ordenável. Grupo não ordena sozinho no TanStack: passe em
  `sort-column` a subcoluna que ele ordena. Fixar some com `enablePinning: false` e pede
  `v-model:column-pinning` na tabela.

  @example
  ```ts
  { id: "jul", header: ({ column, table }) => h(AdsHeavyHeaderCell, {
      column, label: "Jul/2026", sortColumn: table.getColumn("jul-real"),
  }) }
  ```
-->
<template>
  <div class="flex items-center justify-center">
    <component
      :is="sortTarget?.getCanSort() ? 'button' : 'span'"
      :type="sortTarget?.getCanSort() ? 'button' : undefined"
      class="flex items-center gap-2 rounded-[var(--ads-radius-xsm)] font-bold text-[var(--ads-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ads-button-primary)]"
      :aria-label="sortTarget?.getCanSort() ? `Ordenar por ${label}` : undefined"
      @click="sortTarget?.getCanSort() && sortTarget.toggleSorting()"
    >
      <UIcon
        v-if="sortTarget?.getCanSort()"
        :name="sortIcon"
        class="size-4 shrink-0 text-[var(--ads-border-icon-support)]"
        aria-hidden="true"
      />
      {{ label }}
    </component>
    <button
      v-if="column?.getCanPin()"
      type="button"
      class="flex size-6 shrink-0 items-center justify-center rounded-[var(--ads-radius-xsm)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ads-button-primary)]"
      :aria-label="`${column.getIsPinned() ? 'Soltar' : 'Fixar'} coluna ${label}`"
      :aria-pressed="Boolean(column.getIsPinned())"
      @click="column.pin(column.getIsPinned() ? false : 'left')"
    >
      <UIcon
        name="i-lucide-pin"
        class="size-4"
        :class="column.getIsPinned() ? 'text-[var(--ads-text-brand)]' : 'text-[var(--ads-border-icon-support)]'"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { AdsTableHeaderColumn } from "../utils/ads-table";

const props = defineProps<{
  label: string;
  /** Coluna do TanStack, recebida na função `header`. */
  column?: AdsTableHeaderColumn;
  /** Coluna que o título ordena, quando não é a própria (grupos). */
  sortColumn?: AdsTableHeaderColumn;
}>();

const sortTarget = computed(() => props.sortColumn ?? props.column);

const SORT_ICON = { asc: "i-lucide-arrow-up", desc: "i-lucide-arrow-down" } as const;

const sortIcon = computed(() => {
  const sorted = sortTarget.value?.getIsSorted();
  return sorted ? SORT_ICON[sorted] : "i-lucide-chevrons-up-down";
});
</script>
