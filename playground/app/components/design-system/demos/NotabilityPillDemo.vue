<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['notability-pill']">
    <template #preview>
      <AdsNotabilityPill :notability="notability" />
    </template>

    <template #params>
      <DocsParam label="Notabilidade">
        <AdsSegmentedTabs v-model="notability" :items="notabilityItems" aria-label="Notabilidade" />
      </DocsParam>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsNotabilityPill from "../../../../../app/components/AdsNotabilityPill.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";

const notability = ref("traffic");

const notabilityItems = [
  { label: "Imagem", value: "image" },
  { label: "Tráfego", value: "traffic" },
  { label: "Lucro", value: "profit" },
];

const code = computed(() => buildTag("AdsNotabilityPill", [attr(true, "notability", notability.value)]));
</script>
