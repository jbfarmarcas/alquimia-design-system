<template>
  <button
    type="button"
    class="flex h-[50px] w-full items-center gap-2 py-4 text-left hover:bg-neutral-100"
    :class="mode === 'checkbox' ? 'ps-4' : 'ps-6'"
    :role="mode === 'checkbox' ? 'checkbox' : 'option'"
    :aria-checked="checkedState === undefined ? undefined : String(checkedState)"
    :aria-selected="mode === 'radio' ? String(selected) : undefined"
    @click="emit('select')"
  >
    <span
      v-if="mode === 'checkbox'"
      class="flex size-4 shrink-0 items-center justify-center rounded-[var(--ads-radius-xsm)] border-2 border-[var(--ads-text-brand)]"
      :class="selected || indeterminate ? 'bg-[var(--ads-surface-brand)]' : 'bg-[var(--ads-surface-card)]'"
    >
      <UIcon
        v-if="indeterminate"
        name="i-lucide-minus"
        class="size-3 text-[var(--ads-text-contrast)]"
      />
      <UIcon
        v-else-if="selected"
        name="i-lucide-check"
        class="size-3 text-[var(--ads-text-contrast)]"
      />
    </span>
    <InvertedTooltip
      :text="label"
      :disabled="!needsTooltip"
      :content="{ side: 'bottom', align: 'start', sideOffset: 4 }"
    >
      <span
        class="block min-w-0 truncate text-sm leading-[1.3] text-[var(--ads-text-secondary)]"
        :class="mode === 'radio' && selected ? 'font-bold' : 'font-normal'"
      >
        {{ displayLabel }}
      </span>
    </InvertedTooltip>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import InvertedTooltip from "./InvertedTooltip.vue";
import {
  filterLabelNeedsTooltip,
  truncateFilterLabel,
} from "../utils/ads-filter-select";

const props = withDefaults(
  defineProps<{
    label: string;
    mode: "checkbox" | "radio";
    selected?: boolean;
    indeterminate?: boolean;
  }>(),
  {
    selected: false,
    indeterminate: false,
  },
);

const emit = defineEmits<{ select: [] }>();

const displayLabel = computed(() => truncateFilterLabel(props.label));
const needsTooltip = computed(() => filterLabelNeedsTooltip(props.label));
const checkedState = computed(() => {
  if (props.mode !== "checkbox") return undefined;
  if (props.indeterminate) return "mixed";
  return props.selected;
});
</script>
