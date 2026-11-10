<!--
  AdsHeavyAccountCell — Primeira coluna da AdsHeavyTable (Figma: "_Fin Account Cell" e "_Fin Toggle").

  O nível sai da profundidade da linha: 0 é Grupo, 1 é Item, 2 ou mais é Subitem.
  Marca a linha para o fundo azul do grupo e para a zebra dos itens.

  @example
  ```vue
  <template #name-cell="{ row }">
    <AdsHeavyAccountCell :row="row" :label="row.original.name" />
  </template>
  ```
-->
<template>
  <div
    class="flex items-center gap-3 pe-4"
    :class="INDENT[Math.min(row.depth, INDENT.length - 1)]"
    :data-heavy-group="isGroup ? '' : undefined"
    :data-heavy-zebra="isZebra ? '' : undefined"
  >
    <button
      v-if="row.subRows.length"
      type="button"
      class="relative flex size-5 shrink-0 items-center justify-center rounded-[var(--ads-radius-xsm)] border border-[var(--ads-neutral-mid-60)] bg-[var(--ads-surface-card)] after:absolute after:-inset-1.5 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ads-button-primary)]"
      :aria-expanded="row.getIsExpanded()"
      :aria-label="`${row.getIsExpanded() ? 'Recolher' : 'Expandir'} ${label}`"
      @click="row.toggleExpanded()"
    >
      <UIcon
        :name="row.getIsExpanded() ? 'i-lucide-minus' : 'i-lucide-plus'"
        class="size-4 text-[var(--ads-text-secondary)]"
        aria-hidden="true"
      />
    </button>
    <span class="min-w-0 flex-1 overflow-hidden text-ellipsis">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const INDENT = ["ps-4", "ps-12", "ps-18"] as const;

const props = defineProps<{
  /** Linha do TanStack, recebida no slot da célula. */
  row: {
    depth: number;
    index: number;
    subRows: unknown[];
    getIsExpanded: () => boolean;
    toggleExpanded: () => void;
  };
  label: string;
}>();

const isGroup = computed(() => props.row.depth === 0);
/** `index` recomeça em cada grupo, então a zebra também recomeça. */
const isZebra = computed(() => !isGroup.value && props.row.index % 2 === 1);
</script>
