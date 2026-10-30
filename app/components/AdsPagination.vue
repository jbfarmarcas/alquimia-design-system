<template>
  <nav class="inline-flex items-center gap-[var(--ads-pagination-gap)] py-1" :aria-label="ariaLabel">
    <button
      type="button"
      class="py-0.5 text-sm leading-[1.3] text-[var(--ads-text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)] disabled:cursor-not-allowed disabled:text-[var(--ads-text-tertiary)]"
      :disabled="page <= 1"
      @click="go(page - 1)"
    >
      {{ prevLabel }}
    </button>
    <div class="flex items-center gap-[var(--ads-pagination-number-gap)]">
      <template v-for="item in items" :key="item.key">
        <span v-if="item.kind === 'gap'" class="px-1 text-sm text-ads-neutro-escuro-600" aria-hidden="true">…</span>
        <button
          v-else
          type="button"
          class="flex size-[var(--ads-pagination-cell)] items-center justify-center rounded-[var(--ads-radius-xsm)] text-sm leading-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]"
          :class="item.page === page ? 'bg-[var(--ads-pagination-selected)] text-[var(--ads-text-contrast)]' : 'text-[var(--ads-pagination-number)] hover:bg-ads-neutro-claro-20'"
          :aria-current="item.page === page ? 'page' : undefined"
          @click="go(item.page)"
        >
          {{ item.page }}
        </button>
      </template>
    </div>
    <button
      type="button"
      class="py-0.5 text-sm leading-[1.3] text-[var(--ads-text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)] disabled:cursor-not-allowed disabled:text-[var(--ads-text-tertiary)]"
      :disabled="page >= totalPages"
      @click="go(page + 1)"
    >
      {{ nextLabel }}
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    page?: number;
    totalPages?: number;
    prevLabel?: string;
    nextLabel?: string;
    ariaLabel?: string;
  }>(),
  {
    page: 1,
    totalPages: 1,
    prevLabel: "Anterior",
    nextLabel: "Próximo",
    ariaLabel: "Paginação",
  },
);

const emit = defineEmits<{
  "update:page": [page: number];
}>();

type PageItem = { kind: "page"; page: number; key: string } | { kind: "gap"; key: string };

const items = computed<PageItem[]>(() => {
  const total = Math.max(1, props.totalPages);
  const current = Math.min(Math.max(1, props.page), total);
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => ({
      kind: "page" as const,
      page: index + 1,
      key: `p${index + 1}`,
    }));
  }
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((value) => value >= 1 && value <= total).sort((a, b) => a - b);
  const result: PageItem[] = [];
  sorted.forEach((value, index) => {
    const previous = sorted[index - 1];
    if (previous !== undefined && value - previous > 1) {
      result.push({ kind: "gap", key: `g${previous}` });
    }
    result.push({ kind: "page", page: value, key: `p${value}` });
  });
  return result;
});

const go = (next: number) => {
  const total = Math.max(1, props.totalPages);
  const value = Math.min(Math.max(1, next), total);
  if (value !== props.page) emit("update:page", value);
};
</script>
