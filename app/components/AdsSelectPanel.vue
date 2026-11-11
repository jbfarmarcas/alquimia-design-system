<!--
  AdsSelectPanel — peça interna do AdsSelect (Figma: Super dropdown). Use o AdsSelect;
  para mostrar só a lista, AdsSelect com inline.
  Seleção simples (radio) ou múltipla (checkbox), busca opcional no topo, "selecionar todos",
  subtítulo, selo e itens desabilitados. A lista rola a partir de 320px.
  A lista é virtualizada (@tanstack/vue-virtual): só as linhas visíveis são montadas,
  então milhares de opções não travam a tela. Altura medida por linha, pois subtítulo e selo mudam a altura.
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

    <div
      ref="scrollRef"
      class="max-h-[var(--ads-select-panel-max-height)] overflow-y-auto overscroll-contain [scrollbar-color:var(--color-ads-neutro-claro-50)_transparent] [scrollbar-width:thin]"
      :role="type === 'radio' ? 'listbox' : 'group'"
      :aria-label="listLabel"
    >
      <p
        v-if="groups.empty"
        class="flex min-h-12 items-center p-4 text-sm leading-[1.3] text-[var(--ads-text-secondary)]"
      >
        {{ emptyLabel }}
      </p>

      <div v-else class="relative w-full" :style="{ height: `${virtualizer.getTotalSize()}px` }">
        <div
          v-for="virtualRow in virtualizer.getVirtualItems()"
          :key="virtualRow.key"
          :ref="measureRow"
          :data-index="virtualRow.index"
          role="presentation"
          class="absolute top-0 left-0 w-full"
          :style="{ transform: `translateY(${virtualRow.start}px)` }"
        >
          <AdsSelectItem
            v-if="!rowItems[virtualRow.index].option"
            mode="checkbox"
            :label="selectAllLabel"
            :selected="checkState === 'all'"
            :indeterminate="checkState === 'partial'"
            :divider="rowItems.length > 1"
            @select="onSelectAll"
          />
          <AdsSelectItem
            v-else
            :mode="type"
            :label="rowItems[virtualRow.index].option!.label"
            :subtitle="rowItems[virtualRow.index].option!.subtitle"
            :badge="rowItems[virtualRow.index].option!.badge"
            :disabled="rowItems[virtualRow.index].option!.disabled"
            :selected="isSelected(rowItems[virtualRow.index].option!.value)"
            :divider="virtualRow.index < rowItems.length - 1"
            @select="onSelect(rowItems[virtualRow.index].option!.value)"
          />
        </div>
      </div>
    </div>

    <button
      v-if="addText"
      type="button"
      class="flex min-h-12 w-full items-center gap-2 border-t border-[var(--ads-select-divider)] px-4 py-3 text-left text-sm leading-[1.3] font-bold text-[var(--ads-text-brand)] transition-colors hover:bg-[var(--ads-select-item-hover)] focus-visible:bg-[var(--ads-select-item-hover)] focus-visible:outline-none"
      data-testid="select-add"
      @click="emit('add', query.trim())"
    >
      <UIcon name="i-lucide-plus" class="size-4 shrink-0" aria-hidden="true" />
      <span class="min-w-0 truncate">{{ addText }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useVirtualizer } from "@tanstack/vue-virtual";
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
    /**
     * Ação de cadastrar no rodapé, com ícone de adicionar. `{query}` vira a busca atual.
     * Sem valor, a ação não aparece.
     */
    addLabel?: string;
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
const emit = defineEmits<{
  pick: [];
  /** Ação de cadastrar. Recebe a busca atual, sem espaços nas pontas. */
  add: [query: string];
}>();

/** Texto da ação: `{query}` recebe a busca; sem busca, o trecho some. */
const addText = computed(() => {
  if (!props.addLabel) return "";
  const text = props.addLabel.replaceAll("{query}", query.value.trim());
  return text.replace(/\s+/g, " ").trim();
});

const groups = computed(() => groupFilterOptions(props.options, query.value));
/** Correspondência exata da busca vem primeiro. */
const rows = computed(() => [...groups.value.exact, ...groups.value.matches]);
const enabledOptions = computed(() => props.options.filter((option) => !option.disabled));

const selectedList = computed(() =>
  Array.isArray(model.value) ? model.value : model.value ? [model.value] : [],
);
const selectedSet = computed(() => new Set(selectedList.value));
const checkState = computed(() => selectionCheckState(selectedList.value, enabledOptions.value));
const showSelectAll = computed(
  () => props.type === "checkbox" && props.selectAll && query.value.trim() === "",
);

/** Linhas da lista virtual: "selecionar todos" (sem option) no começo, quando aparece. */
interface PanelRow {
  key: string;
  option?: FilterOption;
}
const rowItems = computed<PanelRow[]>(() => {
  const list = rows.value.map((option) => ({ key: option.value, option }));
  return showSelectAll.value ? [{ key: SELECT_ALL_KEY }, ...list] : list;
});

const SELECT_ALL_KEY = "__select-all__";
/** Altura mínima de uma linha (min-h-12). A medida real corrige linhas com subtítulo ou selo. */
const ROW_ESTIMATE = 48;

const scrollRef = ref<HTMLElement | null>(null);
const virtualizer = useVirtualizer(
  computed(() => ({
    count: rowItems.value.length,
    getScrollElement: () => scrollRef.value,
    estimateSize: () => ROW_ESTIMATE,
    overscan: 8,
    getItemKey: (index: number) => rowItems.value[index]?.key ?? index,
  })),
);

const measureRow = (el: unknown) => {
  if (el instanceof HTMLElement) virtualizer.value.measureElement(el);
};

const isSelected = (value: string) => selectedSet.value.has(value);

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
