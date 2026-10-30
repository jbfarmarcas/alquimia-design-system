<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.broadcast">
    <template #preview>
      <AdsBroadcast :status="broadcastStatus" />
    </template>

    <template #params>
      <DocsParam label="Status">
        <AdsSegmentedTabs v-model="broadcastStatus" :items="broadcastItems" aria-label="Status da transmissão" />
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
import AdsBroadcast, { type AdsBroadcastStatus } from "../../../../../app/components/AdsBroadcast.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";

const broadcastStatus = ref<AdsBroadcastStatus>("warning");

const broadcastItems = [
  { label: "Atenção", value: "warning" },
  { label: "Sucesso", value: "success" },
];

const code = computed(() =>
  buildTag("AdsBroadcast", [attr(broadcastStatus.value !== "warning", "status", broadcastStatus.value)]),
);
</script>
