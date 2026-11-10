<!--
  AdsSelectPanel — peça interna do AdsSelect (Figma: Super dropdown). Use o AdsSelect;
  para mostrar só a lista, AdsSelect com inline.
  Seleção simples (radio) ou múltipla (checkbox), busca opcional no topo, "selecionar todos",
  subtítulo, selo e itens desabilitados. A lista rola a partir de 320px.
-->
<template>
  <div
    class="flex flex-col overflow-hidden rounded-[var(--ads-radius-sm)] border border-[var(--ads-select-panel-border)] bg-[var(--ads-surface-card)] shadow-[var(--ads-shadow-level-1)]"
    :class="widthClass"
  >
    <div v-if="searchable" class="border-b border-[var(--ads-select-divider)] px-4 pt-4 pb-3">
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
      class="flex min-h-12 items-center p-4 text-sm leading-[1.3] text-[var(--ads-text-secondary)]"
    >
      {{ emptyLabel }}
    </p>

    <div
      v-else
      class="max-h-[var(--ads-select-panel-max-height)] overflow-y-auto overscroll-contain [scrollbar-color:var(--color-ads-neutro-claro-50)_transparent] [scrollbar-width:thin]"
      :role="type === 'radio' ? 'listbox' : 'group'"
      :aria-label="listLabel"
    >
      <AdsSelectItem
        v-if="showSelectAll"
        mode="checkbox"
        :label="selectAllLabel"
        :selected="checkState === 'all'"
        :indeterminate="checkState === 'partial'"
        :divider="rows.length > 0"
        @select="onSelectAll"
      />
      <AdsSelectItem
        v-for="(option, index) in rows"
        :key="option.value"
        :mode="type"
        :label="option.label"
        :subtitle="option.subtitle"
        :badge="option.badge"
        :disabled="option.disabled"
        :selected="isSelected(option.value)"
        :divider="index < rows.length - 1"
        @select="onSelect(option.value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AdsSelectItem from "./AdsSelectItem.vue";
import {
  groupFilterOptions,
  selectionCheckState,
  toggleFilterValue,
  toggleSelectAll,
  type AdsFilterOption as FilterOption,
} from "../utils/ads-filter-select";

const props = withDefaults(
  defineProps<{
    /** radio: seleção simples (Figma Simples). checkbox: seleção múltipla. */
    type: "checkbox" | "radio";
    options: FilterOption[];
    /** Campo de busca no topo, com divisória. */
    searchable?: boolean;
    /** "Selecionar todos" no começo da lista. Só no checkbox, e some durante a busca. */
    selectAll?: boolean;
    selectAllLabel?: string;
    emptyLabel?: string;
    searchPlaceholder?: string;
    listLabel?: string;
    /** Largura do painel. Padrão: --ads-select-panel-width (320px). */
    widthClass?: string;
  }>(),
  {
    searchable: true,
    selectAll: true,
    selectAllLabel: "Selecionar todos",
    emptyLabel: "Nenhum resultado",
    searchPlaceholder: "Pesquisar",
    listLabel: "Opções",
    widthClass: "w-[var(--ads-select-panel-width)] max-w-full",
  },
);

const model = defineModel<string | string[]>({ required: true });
const query = defineModel<string>("query", { default: "" });
const emit = defineEmits<{ pick: [] }>();

const groups = computed(() => groupFilterOptions(props.options, query.value));
/** Correspondência exata da busca vem primeiro. */
const rows = computed(() => [...groups.value.exact, ...groups.value.matches]);
const enabledOptions = computed(() => props.options.filter((option) => !option.disabled));

const selectedList = computed(() =>
  Array.isArray(model.value) ? model.value : model.value ? [model.value] : [],
);
const checkState = computed(() => selectionCheckState(selectedList.value, enabledOptions.value));
const showSelectAll = computed(
  () => props.type === "checkbox" && props.selectAll && query.value.trim() === "",
);

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
  model.value = toggleSelectAll(selectedList.value, enabledOptions.value);
};

/** Busca do Figma: pílula de 40px, borda neutra e lupa de 16px. */
const searchFieldUi = {
  base: "h-10 rounded-[var(--ads-radius-pill)] bg-[var(--ads-surface-card)] text-sm text-[var(--ads-text-secondary)] !outline-none ring-1 ring-inset ring-ads-neutro-claro-50 enabled:hover:ring-[var(--ads-filter-hover-border)] placeholder:text-[var(--ads-filter-disabled-text)] focus-visible:!outline-none focus-visible:ring-(length:--ads-border-width-slim) focus-visible:ring-[var(--ads-text-brand)]",
  leadingIcon: "size-4 text-[var(--ads-text-tertiary)]",
};
</script>
