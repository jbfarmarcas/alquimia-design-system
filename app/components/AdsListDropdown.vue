<template>
  <AdsFilterDropdown
    v-model="model"
    v-model:query="query"
    type="radio"
    :options="options"
    :searchable="search"
    :select-all="false"
    :empty-label="emptyLabel"
    :search-placeholder="searchPlaceholder"
    :list-label="listLabel"
    width-class="min-w-[var(--ads-list-min-width)] w-full"
    @pick="emit('pick', model)"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import AdsFilterDropdown from "./AdsFilterDropdown.vue";
import type { AdsFilterOption } from "../utils/ads-filter-select";

withDefaults(
  defineProps<{
    options: AdsFilterOption[];
    /** Figma `Search`. */
    search?: boolean;
    emptyLabel?: string;
    searchPlaceholder?: string;
    listLabel?: string;
  }>(),
  {
    search: true,
    emptyLabel: "Nenhum resultado",
    searchPlaceholder: "Pesquisar",
    listLabel: "Opções",
  },
);

const model = defineModel<string>({ default: "" });
const query = ref("");
const emit = defineEmits<{
  pick: [value: string];
}>();
</script>
