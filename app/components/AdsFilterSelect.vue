<template>
  <div class="flex w-full min-w-0 flex-col gap-0.5">
    <p
      v-if="label"
      :id="labelId"
      class="text-[length:var(--ads-filter-label-size)] leading-[1.2] text-[var(--ads-text-secondary)]"
    >
      {{ label }}
    </p>

    <UPopover
      v-model:open="isOpen"
      :portal="true"
      :content="{ align: 'start', side: 'bottom', sideOffset: 4 }"
      :ui="popoverUi"
    >
      <button
        type="button"
        class="flex h-[var(--ads-filter-height)] max-w-full items-center gap-0.5 rounded-[var(--ads-filter-radius)] px-[var(--ads-filter-padding-x)] text-[length:var(--ads-filter-font-size)] leading-[1.3] transition-colors focus-visible:border-(length:--ads-border-width-slim) focus-visible:border-[var(--ads-filter-focus-border)] focus-visible:outline-none disabled:cursor-not-allowed"
        :class="[fieldClass, block ? 'w-full justify-between' : 'w-fit']"
        :disabled="disabled"
        :data-state="fieldState"
        :aria-haspopup="type === 'month' ? 'dialog' : 'listbox'"
        :aria-expanded="isOpen"
        :aria-invalid="error ? true : undefined"
        :aria-labelledby="label ? labelId : undefined"
        :aria-describedby="supportText ? supportId : undefined"
      >
        <InvertedTooltip
          :text="triggerLabel"
          :disabled="!triggerHasTooltip"
          :content="{ side: 'top', align: 'start', sideOffset: 4 }"
        >
          <span class="min-w-0 truncate text-left">{{ triggerLabel }}</span>
        </InvertedTooltip>
        <UIcon name="i-lucide-chevron-down" class="size-4 shrink-0 text-base" :class="chevronClass" />
      </button>

      <template #content>
        <AdsMonthPicker
          v-if="type === 'month'"
          v-model="monthModel"
          @pick="isOpen = false"
        />
        <AdsFilterDropdown
          v-else
          v-model="model"
          v-model:query="query"
          :type="listType"
          :options="options"
          :searchable="showSearch"
          :select-all="showSelectAll"
          :select-all-label="selectAllLabel"
          :empty-label="emptyLabel"
          :search-placeholder="searchPlaceholder"
          :list-label="label || 'Opções'"
          @pick="isOpen = false"
        />
      </template>
    </UPopover>

    <p
      v-if="supportText"
      :id="supportId"
      class="text-[length:var(--ads-filter-label-size)] leading-[1.2] text-[var(--ads-text-secondary)]"
    >
      {{ supportText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch } from "vue";
import AdsFilterDropdown from "./AdsFilterDropdown.vue";
import AdsMonthPicker from "./AdsMonthPicker.vue";
import InvertedTooltip from "./InvertedTooltip.vue";
import {
  filterLabelNeedsTooltip,
  filterTriggerLabel,
  type AdsFilterOption,
  type AdsFilterType,
} from "../utils/ads-filter-select";

const props = withDefaults(
  defineProps<{
    type: AdsFilterType;
    label?: string;
    hint?: string;
    error?: string;
    placeholder?: string;
    disabled?: boolean;
    options?: AdsFilterOption[];
    /** `null` = padrão do tipo (checkbox busca e seleciona todos). */
    searchable?: boolean | null;
    selectAll?: boolean | null;
    selectAllLabel?: string;
    allSelectedLabel?: string;
    emptyLabel?: string;
    searchPlaceholder?: string;
    /** O gatilho ocupa a largura do campo, como um select de formulário. */
    block?: boolean;
  }>(),
  {
    placeholder: "Selecione",
    disabled: false,
    options: () => [],
    searchable: null,
    selectAll: null,
    selectAllLabel: "Selecionar todos",
    allSelectedLabel: "Todos selecionados",
    emptyLabel: "Nenhum resultado",
    searchPlaceholder: "Pesquisar",
    block: false,
  },
);

const model = defineModel<string | string[]>({ required: true });

const isOpen = ref(false);
const query = ref("");
const labelId = useId();
const supportId = useId();

const showSearch = computed(() =>
  props.searchable === null ? props.type === "checkbox" : props.searchable,
);
const showSelectAll = computed(() =>
  props.selectAll === null ? props.type === "checkbox" : props.selectAll,
);
const listType = computed(() => (props.type === "radio" ? "radio" : "checkbox"));

const supportText = computed(() => props.error || props.hint || "");

const hasValue = computed(() => {
  if (Array.isArray(model.value)) return model.value.length > 0;
  return model.value.length > 0;
});

const fieldState = computed(() => {
  if (props.disabled) return "disabled";
  if (props.error) return "error";
  if (isOpen.value) return "open";
  if (hasValue.value) return "selected";
  return "default";
});

const fieldClass = computed(() => {
  if (fieldState.value === "disabled") {
    return "border border-[var(--ads-filter-disabled-border)] bg-[var(--ads-filter-disabled-background)] text-[var(--ads-filter-disabled-text)]";
  }
  if (fieldState.value === "error") {
    return "border-(length:--ads-border-width-slim) border-[var(--ads-filter-error-border)] bg-[var(--ads-filter-background)] text-[var(--ads-filter-text)]";
  }
  if (fieldState.value === "open") {
    return "border-(length:--ads-border-width-slim) border-[var(--ads-filter-focus-border)] bg-[var(--ads-filter-background)] text-[var(--ads-filter-text)]";
  }
  if (fieldState.value === "selected") {
    return "border border-[var(--ads-filter-border)] hover:border-[var(--ads-filter-hover-border)] bg-ads-neutro-claro-20 text-[var(--ads-filter-text)]";
  }
  return "border border-[var(--ads-filter-border)] hover:border-[var(--ads-filter-hover-border)] bg-[var(--ads-filter-background)] text-[var(--ads-filter-text)]";
});

const chevronClass = computed(() => {
  if (fieldState.value === "disabled") return "text-ads-neutro-medio-60";
  if (fieldState.value === "selected") return "text-ads-neutro-escuro-500";
  return "text-ads-neutro-medio-100";
});

const triggerLabel = computed(() =>
  filterTriggerLabel({
    type: props.type,
    value: model.value,
    options: props.options,
    placeholder: props.placeholder,
    allSelectedLabel: props.allSelectedLabel,
  }),
);

const triggerHasTooltip = computed(() => filterLabelNeedsTooltip(triggerLabel.value));

const monthModel = computed({
  get: () => (typeof model.value === "string" ? model.value : ""),
  set: (value: string) => {
    model.value = value;
  },
});

watch(isOpen, (open) => {
  if (!open) query.value = "";
});

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) isOpen.value = false;
  },
);

const popoverUi = {
  content: "z-50 w-auto overflow-visible bg-transparent p-0 shadow-none ring-0",
};
</script>
