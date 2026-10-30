<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.pagination">
    <template #preview>
      <AdsPagination v-model:page="page" :total-pages="Number(totalPages)" />
    </template>

    <template #params>
      <DocsParam label="Total de páginas">
        <AdsSegmentedTabs v-model="totalPages" :items="totalItems" aria-label="Total de páginas" />
      </DocsParam>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsPagination from "../../../../../app/components/AdsPagination.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";

const page = ref(3);
const totalPages = ref("12");

const totalItems = [
  { label: "5 páginas", value: "5" },
  { label: "12 páginas", value: "12" },
];

watch(totalPages, (total) => {
  if (page.value > Number(total)) page.value = Number(total);
});

const code = computed(() =>
  buildTag("AdsPagination", [attr(true, "v-model:page", String(page.value)), attr(true, ":total-pages", totalPages.value)]),
);
</script>
