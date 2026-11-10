<template>
  <div class="flex w-full flex-wrap items-center gap-x-2 gap-y-1">
    <span class="text-[length:var(--ads-font-size-xxxs)] leading-[1.2] text-[var(--ads-text-secondary)]">{{ label }}</span>
    <span
      v-if="loading"
      class="block h-[18px] animate-pulse rounded-[var(--ads-radius-pill)] bg-[var(--ads-loading-skeleton)] motion-reduce:animate-none"
      :style="{ width: `${skeletonWidth}px` }"
      aria-hidden="true"
    />
    <span
      v-else-if="value"
      class="inline-flex h-[18px] items-center rounded-[var(--ads-radius-pill)] px-2 text-[length:var(--ads-font-size-minimal)] font-bold leading-[1.1] whitespace-nowrap"
      :class="tone === 'neutral'
        ? 'bg-[var(--ads-status-void-100)] text-[var(--ads-status-void-800)]'
        : 'bg-ads-radar-25 text-ads-radar-800'"
    >
      {{ value }}
    </span>
  </div>
</template>

<script setup lang="ts">
/**
 * Rótulo com selo, usado no período e no comparativo dos cards.
 * brand é o selo de datas (azul); neutral é o selo do comparativo (cinza).
 */
withDefaults(
  defineProps<{
    label: string;
    value?: string;
    tone?: "brand" | "neutral";
    loading?: boolean;
    /** Largura do skeleton do selo, em px. */
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
