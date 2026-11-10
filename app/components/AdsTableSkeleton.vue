<template>
  <div class="w-full bg-[var(--ads-surface-card)]">
    <!-- Variante Logo: logo do Radar centralizado -->
    <div
      v-if="variant === 'logo'"
      class="flex min-h-[var(--ads-table-skeleton-logo-min-height,200px)] items-center justify-center p-8"
      role="status"
      aria-label="Carregando tabela"
    >
      <AdsLoading variant="logo" size="md" />
    </div>

    <!-- Variante Skeleton: linhas de barra -->
    <template v-else>
      <div class="grid grid-cols-8 gap-4 border-b border-[var(--ads-border-subtle)] bg-neutral-100 p-4">
        <USkeleton v-for="column in 8" :key="`head-${column}`" class="h-4 w-full" />
      </div>
      <div
        v-for="row in skeletonRows"
        :key="row"
        class="grid grid-cols-8 items-center gap-4 border-b border-[var(--ads-border-subtle)] p-4 last:border-b-0"
        role="status"
        aria-label="Carregando linha"
        aria-hidden="true"
      >
        <USkeleton class="size-4" />
        <div class="flex items-center gap-3">
          <USkeleton class="size-8 shrink-0 rounded-full" />
          <div class="flex min-w-0 flex-1 flex-col gap-1">
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-3 w-2/3" />
          </div>
        </div>
        <USkeleton v-for="column in 6" :key="`${row}-${column}`" class="h-4 w-full" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AdsLoading from "./AdsLoading.vue";

export type AdsTableSkeletonVariant = "skeleton" | "logo";

const props = withDefaults(
  defineProps<{
    /**
     * Número de linhas do skeleton. Mínimo 1, máximo 8.
     * Corresponde a Linha 1 a Linha 8 do Figma.
     */
    rows?: number;
    /**
     * skeleton: barras de placeholder na grade da tabela.
     * logo: loader do Radar centralizado na área da tabela.
     */
    variant?: AdsTableSkeletonVariant;
  }>(),
  {
    rows: 4,
    variant: "skeleton",
  },
);

const skeletonRows = computed(() => {
  const count = Math.min(8, Math.max(1, props.rows));
  return Array.from({ length: count }, (_, index) => index);
});
</script>
