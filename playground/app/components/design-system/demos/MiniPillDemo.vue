<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['mini-pill']">
    <template #preview>
      <AdsMiniPill :type="miniType" />
    </template>

    <template #params>
      <DocsParam label="Estado">
        <AdsSegmentedTabs v-model="miniType" :items="miniItems" aria-label="Estado mini" />
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
import AdsMiniPill from "../../../../../app/components/AdsMiniPill.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";

type MiniType = "nao-iniciado" | "pausado" | "novo";

const miniType = ref<MiniType>("pausado");

const miniItems = [
  { label: "Não iniciado", value: "nao-iniciado" },
  { label: "Pausado", value: "pausado" },
  { label: "Novo", value: "novo" },
];

const code = computed(() => buildTag("AdsMiniPill", [attr(true, "type", miniType.value)]));
</script>
