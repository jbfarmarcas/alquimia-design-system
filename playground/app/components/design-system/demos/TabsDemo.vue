<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.abas">
    <template #preview>
      <div class="w-full max-w-xl">
        <AdsTabs v-if="variant === 'link'" v-model="tab" :items="items" :content="false" />
        <AdsSegmentedTabs v-else v-model="tab" :items="items" aria-label="Filtro de status" />
      </div>
    </template>

    <template #params>
      <DocsParam label="Variante">
        <AdsSegmentedTabs v-model="variant" :items="variantItems" aria-label="Variante da aba" />
      </DocsParam>

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

type TabsVariant = "link" | "segmento";

const variant = ref<TabsVariant>("link");
const count = ref("3");
const tab = ref("visao");

const variantItems = [
  { label: "Link", value: "link" },
  { label: "Segmented", value: "segmento" },
];

const countItems = [
  { label: "2 abas", value: "2" },
  { label: "3 abas", value: "3" },
];

const linkOptions: TabsItem[] = [
  { label: "Visão geral", value: "visao" },
  { label: "Concorrentes", value: "concorrentes" },
  { label: "Notabilidade", value: "notabilidade" },
];

const segmentOptions: TabsItem[] = [
  { label: "Todas", value: "todas" },
  { label: "Ativas", value: "ativas" },
  { label: "Encerradas", value: "encerradas" },
];

const items = computed<TabsItem[]>(() =>
  (variant.value === "link" ? linkOptions : segmentOptions).slice(0, Number(count.value)),
);

watch([variant, count], () => {
  tab.value = String(items.value[0]?.value ?? "");
});

const code = computed(() => {
  if (variant.value === "link") {
    return buildTag("AdsTabs", [
      attr(true, "v-model", "tab"),
      attr(true, ":items", "items"),
      attr(true, ":content", "false"),
    ]);
  }
  return buildTag("AdsSegmentedTabs", [
    attr(true, "v-model", "tab"),
    attr(true, ":items", "items"),
    attr(true, "aria-label", "Filtro de status"),
  ]);
});
</script>
