<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.tabs">
    <template #preview>
      <div class="w-full max-w-xl">
        <AdsTabs v-model="tab" :items="items" :content="false" />
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
import AdsTabs from "../../../../../app/components/AdsTabs.vue";

const count = ref("3");
const tab = ref("visao");

const countItems = [
  { label: "2 abas", value: "2" },
  { label: "3 abas", value: "3" },
];

const options: TabsItem[] = [
  { label: "Visão geral", value: "visao" },
  { label: "Concorrentes", value: "concorrentes" },
  { label: "Notabilidade", value: "notabilidade" },
];

const items = computed<TabsItem[]>(() => options.slice(0, Number(count.value)));

watch(count, () => {
  if (!items.value.some((item) => item.value === tab.value)) tab.value = String(items.value[0]?.value ?? "");
});

const code = computed(() =>
  buildTag("AdsTabs", [
    attr(true, "v-model", "tab"),
    attr(true, ":items", "items"),
    attr(true, ":content", "false"),
  ]),
);
</script>
