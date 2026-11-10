<!--
  AdsTableHeaderCell — Título de coluna da AdsTable (Figma: "_Table Header Cell").

  Ordenar e fixar vêm desligados: ligue com `sortable` e `pinnable` quando a coluna permitir.
  Fixar pede `v-model:column-pinning` na tabela.

  @example
  ```ts
  { id: "store", header: ({ column }) => h(AdsTableHeaderCell, { column, label: "Loja", pinnable: true }) }
  ```
-->
<template>
  <div class="flex items-center gap-2">
    <div class="flex min-w-0 flex-1 items-center" :class="JUSTIFY[align]">
      <button
        v-if="canSort"
        type="button"
        class="flex items-center gap-1 rounded-[var(--ads-radius-xsm)] font-bold focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ads-button-primary)]"
        :aria-label="`Ordenar por ${label}`"
        @click="column?.toggleSorting()"
      >
        {{ label }}
        <UIcon
          :name="sortIcon"
          class="size-4 shrink-0 text-[var(--ads-border-icon-support)]"
          aria-hidden="true"
        />
      </button>
      <span v-else :class="{ 'sr-only': hideLabel }">{{ label }}</span>
    </div>
    <button
      v-if="canPin"
      type="button"
      class="flex size-6 shrink-0 items-center justify-center rounded-[var(--ads-radius-xsm)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ads-button-primary)]"
      :aria-label="`${column?.getIsPinned() ? 'Soltar' : 'Fixar'} coluna ${label}`"
      :aria-pressed="Boolean(column?.getIsPinned())"
      @click="column?.pin(column.getIsPinned() ? false : pinSide)"
    >
      <UIcon
        name="i-lucide-pin"
        class="size-4"
        :class="column?.getIsPinned() ? 'text-[var(--ads-text-brand)]' : 'text-[var(--ads-border-icon-support)]'"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { AdsTableHeaderColumn } from "../utils/ads-table";

const JUSTIFY = { left: "justify-start", center: "justify-center", right: "justify-end" } as const;
const SORT_ICON = { asc: "i-lucide-arrow-up", desc: "i-lucide-arrow-down" } as const;

const props = withDefaults(
  defineProps<{
    label: string;
    /** Coluna do TanStack, recebida na função `header`. */
    column?: AdsTableHeaderColumn;
    /** Acompanha o conteúdo: pills ao centro, ações à direita. */
    align?: keyof typeof JUSTIFY;
    sortable?: boolean;
    pinnable?: boolean;
    /** Lado em que o botão fixa a coluna: left no início, right no final da tabela. */
    pinSide?: "left" | "right";
    /** Mantém o título só para leitor de tela, como na coluna de ações. */
    hideLabel?: boolean;
  }>(),
  { column: undefined, align: "left", sortable: false, pinnable: false, pinSide: "left", hideLabel: false },
);

const canSort = computed(() => props.sortable && props.column?.getCanSort());
const canPin = computed(() => props.pinnable && props.column?.getCanPin());

const sortIcon = computed(() => {
  const sorted = props.column?.getIsSorted();
  return sorted ? SORT_ICON[sorted] : "i-lucide-chevrons-up-down";
});
</script>
