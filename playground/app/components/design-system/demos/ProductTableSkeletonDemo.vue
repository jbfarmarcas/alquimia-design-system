<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['table-skeleton']">
    <template #preview>
      <div class="max-h-64 w-full overflow-hidden rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-white">
        <AdsTableSkeleton :rows="rows" :variant="tableVariant" />
      </div>
    </template>

    <template #params>
      <div class="flex flex-wrap items-end gap-x-8 gap-y-5">
        <DocsParam label="Variante">
          <AdsSegmentedTabs v-model="tableVariant" :items="variantItems" aria-label="Variante do skeleton" />
        </DocsParam>
        <DocsParam v-if="tableVariant === 'skeleton'" label="Linhas">
          <AdsSegmentedTabs v-model="rowsStr" :items="rowItems" aria-label="Número de linhas" />
        </DocsParam>
      </div>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsTableSkeleton, { type AdsTableSkeletonVariant } from "../../../../../app/components/AdsTableSkeleton.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";

const tableVariant = ref<AdsTableSkeletonVariant>("skeleton");
const rowsStr = ref("4");

const rows = computed(() => Number(rowsStr.value));

const variantItems = [
  { label: "Skeleton", value: "skeleton" },
  { label: "Logo", value: "logo" },
];

const rowItems = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "4", value: "4" },
  { label: "6", value: "6" },
  { label: "8", value: "8" },
];

const code = computed(() =>
  buildTag("AdsTableSkeleton", [
    attr(tableVariant.value !== "skeleton", "variant", tableVariant.value),
    attr(tableVariant.value === "skeleton" && rows.value !== 4, ":rows", rowsStr.value),
  ]),
);
</script>
