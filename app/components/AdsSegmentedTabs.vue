<template>
  <UTabs
    v-model="model"
    :items="items"
    :content="false"
    variant="pill"
    color="neutral"
    :ui="adsSegmentedTabsUi"
    :aria-label="ariaLabel"
  />
</template>

<script setup lang="ts" generic="T extends string | number">
import type { TabsItem } from "@nuxt/ui";
import { adsSegmentedTabsUi } from "../theme/ads-theme";

withDefaults(
  defineProps<{
    items: TabsItem[];
    ariaLabel?: string;
  }>(),
  {
    ariaLabel: undefined,
  },
);

const model = defineModel<T>({ required: true });
</script>
