<template>
  <div
    class="overflow-hidden rounded-[var(--ads-radius-sm)] border border-ads-neutro-claro-50 bg-[var(--ads-surface-card)] shadow-[var(--ads-shadow-level-1)]"
    :class="widthClass"
  >
    <div v-if="searchable" class="px-4 pt-4 pb-2">
      <UInput
        v-model="query"
        :placeholder="searchPlaceholder"
        aria-label="Pesquisar opções"
        icon="i-lucide-search"
        color="neutral"
        variant="outline"
        size="md"
        class="w-full"
        :ui="searchFieldUi"
      >
        <template v-if="query" #trailing>
          <button
            type="button"
            class="text-[var(--ads-text-secondary)]"
            aria-label="Limpar busca"
            @click="query = ''"
          >
            <UIcon name="i-lucide-x" class="size-4" />
          </button>
        </template>
      </UInput>
    </div>

    <p
      v-if="groups.empty"
      class="flex h-16 items-center ps-6 text-sm leading-[1.3] text-[var(--ads-text-secondary)]"
    >
      {{ emptyLabel }}
    </p>

    <template v-else>
      <div v-if="groups.exact.length">
        <template v-for="(option, index) in groups.exact" :key="option.value">
          <AdsFilterOption
            :mode="type"
            :label="option.label"
            :selected="isSelected(option.value)"
            @select="onSelect(option.value)"
          />
          <div
            v-if="index < groups.exact.length - 1"
            class="h-px bg-[var(--ads-button-secondary-disabled)]"
            :class="dividerInsetClass"
            role="presentation"
          />
        </template>
      </div>

      <div
        v-if="showSelectAll || groups.matches.length"
        class="overflow-y-auto overscroll-contain [scrollbar-color:var(--color-ads-neutro-claro-50)_transparent] [scrollbar-width:thin]"
        :class="
          groups.exact.length
            ? 'max-h-[244px] border-t-[0.5px] border-[var(--ads-border-icon)]'
            : 'max-h-[294px]'
        "
      >
        <div :role="type === 'radio' ? 'listbox' : 'group'" :aria-label="listLabel">
          <template v-if="showSelectAll">
            <AdsFilterOption
              mode="checkbox"
              :label="selectAllLabel"
              :selected="checkState === 'all'"
              :indeterminate="checkState === 'partial'"
              @select="onSelectAll"
            />
            <div
              v-if="groups.matches.length"
              class="h-px bg-[var(--ads-button-secondary-disabled)]"
              :class="dividerInsetClass"
              role="presentation"
            />
          </template>
          <template v-for="(option, index) in groups.matches" :key="option.value">
            <AdsFilterOption
              :mode="type"
              :label="option.label"
              :selected="isSelected(option.value)"
              @select="onSelect(option.value)"
            />
            <div
              v-if="index < groups.matches.length - 1"
              class="h-px bg-[var(--ads-button-secondary-disabled)]"
              :class="dividerInsetClass"
              role="presentation"
            />
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AdsFilterOption from "./AdsFilterOption.vue";
import {
  groupFilterOptions,
  selectionCheckState,
  toggleFilterValue,
  toggleSelectAll,
  type AdsFilterOption as FilterOption,
} from "../utils/ads-filter-select";

const props = withDefaults(
  defineProps<{
    type: "checkbox" | "radio";
    options: FilterOption[];
    searchable?: boolean;
    selectAll?: boolean;
    selectAllLabel?: string;
    emptyLabel?: string;
    searchPlaceholder?: string;
    listLabel?: string;
    widthClass?: string;
  }>(),
  {
    searchable: true,
    selectAll: true,
    selectAllLabel: "Selecionar todos",
    emptyLabel: "Nenhum resultado",
    searchPlaceholder: "Pesquisar",
    listLabel: "Opções",
    widthClass: "w-[270px]",
  },
);

const model = defineModel<string | string[]>({ required: true });
const query = defineModel<string>("query", { default: "" });
const emit = defineEmits<{ pick: [] }>();

const groups = computed(() => groupFilterOptions(props.options, query.value));
const selectedList = computed(() =>
  Array.isArray(model.value) ? model.value : model.value ? [model.value] : [],
);
const checkState = computed(() =>
  selectionCheckState(selectedList.value, props.options),
);
const showSelectAll = computed(
  () => props.type === "checkbox" && props.selectAll && query.value.trim() === "",
);
/** O separador começa no mesmo eixo do conteúdo da opção: texto (rádio) ou caixa (checkbox). */
const dividerInsetClass = computed(() => (props.type === "checkbox" ? "mx-4" : "mx-6"));

const isSelected = (value: string) => selectedList.value.includes(value);

const onSelect = (value: string) => {
  if (props.type === "radio") {
    model.value = value;
    emit("pick");
    return;
  }
  model.value = toggleFilterValue(selectedList.value, value);
};

const onSelectAll = () => {
  model.value = toggleSelectAll(selectedList.value, props.options);
};

/**
 * Busca do painel ADS: pílula.
 */
const searchFieldUi = {
  base: "h-10 rounded-[var(--ads-radius-pill)] bg-[var(--ads-surface-card)] text-sm text-[var(--ads-text-secondary)] !outline-none ring-1 ring-inset ring-ads-neutro-claro-50 enabled:hover:ring-[var(--ads-filter-hover-border)] placeholder:text-[var(--ads-text-tertiary)] focus-visible:!outline-none focus-visible:ring-(length:--ads-border-width-slim) focus-visible:ring-[var(--ads-text-brand)]",
  leadingIcon: "text-[var(--ads-text-tertiary)]",
};
</script>
