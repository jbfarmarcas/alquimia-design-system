<template>
  <div class="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1">
    <span class="text-[length:var(--ads-font-size-xxs)] font-normal leading-[1.3] text-[var(--ads-text-secondary)]">{{ label }}</span>
    <span
      v-if="loading"
      class="block h-[var(--ads-pill-height)] animate-pulse rounded-[var(--ads-radius-pill)] bg-[var(--ads-loading-skeleton)] motion-reduce:animate-none"
      :style="{ width: `${skeletonWidth}px` }"
      aria-hidden="true"
    />
    <AdsPill
      v-else-if="value"
      :label="value"
      variant="soft"
      color="default"
      :custom-surface="tone === 'neutral' ? neutralSurface : undefined"
    />
  </div>
</template>

<script setup lang="ts">
import AdsPill from "./AdsPill.vue";

/**
 * Rótulo de 14px com o valor numa pill. Serve no card e fora dele.
 * brand é a pill secundária padrão (período). neutral é o selo cinza do comparativo.
 */
const neutralSurface = "bg-[var(--ads-status-void-100)] text-[var(--ads-status-void-800)]";

withDefaults(
  defineProps<{
    label: string;
    value?: string;
    tone?: "brand" | "neutral";
    loading?: boolean;
    /** Largura do skeleton da pill, em px. */
    skeletonWidth?: number;
  }>(),
  {
    value: undefined,
    tone: "brand",
    loading: false,
    skeletonWidth: 150,
  },
);
</script>
