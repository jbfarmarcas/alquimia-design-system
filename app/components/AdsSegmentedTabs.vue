<template>
  <UTabs
    v-model="model"
    :items="items as TabsItem[]"
    :content="false"
    variant="pill"
    color="neutral"
    :ui="adsSegmentedTabsUi"
    :aria-label="ariaLabel"
  >
    <!-- Rótulo e, abaixo, o subtítulo opcional. O ícone de 24px vem do próprio UTabs, à esquerda. -->
    <template #default="{ item }">
      <span>{{ item.label }}</span>
      <span
        v-if="(item as AdsSegmentedTabsItem).subtitle"
        class="font-normal text-[var(--ads-text-secondary)]"
      >
        {{ (item as AdsSegmentedTabsItem).subtitle }}
      </span>
    </template>
  </UTabs>
</template>

<script setup lang="ts" generic="T extends string | number">
import type { TabsItem } from "@nuxt/ui";
import { watch } from "vue";
import { adsSegmentedTabsUi } from "../theme/ads-theme";

/** Estende TabsItem com `subtitle` opcional. O `icon` (24px, à esquerda) já vem do Nuxt UI. */
export interface AdsSegmentedTabsItem extends Omit<TabsItem, "slot"> {
  /** Linha secundária abaixo do rótulo, em 12px regular. */
  subtitle?: string;
}

const MAX_TABS = 8;

const props = withDefaults(
  defineProps<{
    items: AdsSegmentedTabsItem[];
    ariaLabel?: string;
  }>(),
  {
    ariaLabel: undefined,
  },
);

if (import.meta.dev) {
  watch(
    () => props.items.length,
    (len) => {
      if (len > MAX_TABS) {
        console.warn(
          `[AdsSegmentedTabs] Limite de ${MAX_TABS} abas excedido (${len}). Acima desse limite o filtro pode ficar ilegível em telas menores.`,
        );
      }
    },
    { immediate: true },
  );
}

const model = defineModel<T>({ required: true });
</script>
