<template>
  <div
    class="flex h-[284px] w-[290px] flex-col gap-3 rounded-[var(--ads-radius-sm)] bg-[var(--ads-surface-card)] p-4 shadow-[var(--ads-shadow-level-1)]"
    role="dialog"
    aria-label="Selecionar mês"
  >
    <div class="flex items-center justify-between">
      <button
        type="button"
        class="inline-flex size-6 items-center justify-center text-[var(--ads-text-primary)]"
        aria-label="Ano anterior"
        @click="year -= 1"
      >
        <UIcon name="i-lucide-chevron-left" class="size-6" />
      </button>
      <p class="text-sm font-bold leading-[1.3] text-[var(--ads-text-primary)]">{{ year }}</p>
      <button
        type="button"
        class="inline-flex size-6 items-center justify-center text-[var(--ads-text-primary)]"
        aria-label="Próximo ano"
        @click="year += 1"
      >
        <UIcon name="i-lucide-chevron-right" class="size-6" />
      </button>
    </div>

    <div class="grid min-h-0 flex-1 grid-cols-3 grid-rows-4 gap-1">
      <button
        v-for="(month, index) in ADS_FILTER_MONTHS"
        :key="month.short"
        type="button"
        class="flex items-center justify-center rounded-[var(--ads-radius-xsm)] text-sm leading-[1.3]"
        :class="
          index === selectedMonthIndex
            ? 'bg-[var(--ads-surface-brand)] font-bold text-[var(--ads-text-contrast)]'
            : 'text-[var(--ads-text-primary)]'
        "
        :aria-label="month.full"
        :aria-pressed="index === selectedMonthIndex"
        @click="onSelect(index)"
      >
        {{ month.short }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  ADS_FILTER_MONTHS,
  formatMonthValue,
  parseMonthValue,
} from "../utils/ads-filter-select";

const model = defineModel<string>({ default: "" });
const emit = defineEmits<{ pick: [] }>();

const initial = parseMonthValue(model.value);
const year = ref(initial?.year ?? new Date().getFullYear());

watch(
  () => model.value,
  (value) => {
    const parsed = parseMonthValue(value);
    if (parsed) year.value = parsed.year;
  },
);

const selectedMonthIndex = computed(() => {
  const parsed = parseMonthValue(model.value);
  if (!parsed || parsed.year !== year.value) return -1;
  return parsed.monthIndex;
});

const onSelect = (monthIndex: number) => {
  model.value = formatMonthValue(year.value, monthIndex);
  emit("pick");
};
</script>
