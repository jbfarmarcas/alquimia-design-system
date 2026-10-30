<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['segmented-tabs']">
    <template #preview>
      <div class="w-full max-w-xl">
        <AdsSegmentedTabs v-model="tab" :items="items" aria-label="Filtro de status" />
      </div>
    </template>

    <template #params>
      <DocsParam label="Quantidade">
        <AdsSegmentedTabs v-model="count" :items="countItems" aria-label="Quantidade de abas" />
      </DocsParam>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import { computed, ref, watch } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";

const count = ref("3");
const tab = ref("todas");

const countItems = [
  { label: "2 abas", value: "2" },
  { label: "3 abas", value: "3" },
];

const options: TabsItem[] = [
  { label: "Todas", value: "todas" },
  { label: "Ativas", value: "ativas" },
  { label: "Encerradas", value: "encerradas" },
];

const items = computed<TabsItem[]>(() => options.slice(0, Number(count.value)));

watch(count, () => {
  if (!items.value.some((item) => item.value === tab.value)) tab.value = String(items.value[0]?.value ?? "");
});

const code = computed(() =>
  buildTag("AdsSegmentedTabs", [
    attr(true, "v-model", "tab"),
    attr(true, ":items", "items"),
    attr(true, "aria-label", "Filtro de status"),
  ]),
);
</script>
