<template>
  <div class="w-full bg-[var(--ads-surface-card)]">
    <div class="grid grid-cols-8 gap-4 border-b border-[var(--ads-border-subtle)] bg-neutral-100 p-4">
      <USkeleton v-for="column in 8" :key="`head-${column}`" class="h-4 w-full" />
    </div>
    <div
      v-for="row in skeletonRows"
      :key="row"
      class="grid grid-cols-8 items-center gap-4 border-b border-[var(--ads-border-subtle)] p-4 last:border-b-0"
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
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{ rows?: number }>(), { rows: 4 });

const skeletonRows = computed(() =>
  Array.from({ length: props.rows }, (_, index) => index),
);
</script>
