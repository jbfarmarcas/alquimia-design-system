<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div v-if="title || description || $slots.title" class="min-w-0">
      <slot name="title">
        <p class="font-bold text-[var(--ads-text-primary)]">{{ title }}</p>
        <p v-if="description" class="mt-1 text-sm text-[var(--ads-text-secondary)]">{{ description }}</p>
      </slot>
    </div>

    <div class="flex min-w-0 flex-wrap items-center gap-3">
      <AdsSearchInput
        v-if="searchable"
        v-model="search"
        size="sm"
        class="w-full sm:w-64"
        :placeholder="searchPlaceholder"
      />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import AdsSearchInput from "./AdsSearchInput.vue";

withDefaults(
  defineProps<{
    /** Título à esquerda. Sem título, a busca e os filtros ocupam a faixa. */
    title?: string;
    description?: string;
    /** Mostra o AdsSearchInput. O filtro entra no slot padrão, com AdsFilterSelect. */
    searchable?: boolean;
    searchPlaceholder?: string;
  }>(),
  {
    title: "",
    description: "",
    searchable: true,
    searchPlaceholder: "Pesquisar",
  },
);

const search = defineModel<string>("search", { default: "" });
</script>
