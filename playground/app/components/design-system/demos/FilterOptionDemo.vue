<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['filter-option']">
    <template #preview>
      <div class="w-72 overflow-hidden rounded-[var(--ads-radius-sm)] border border-ads-neutro-claro-50">
        <AdsFilterOption mode="checkbox" label="Centro" :selected="optionOn" @select="optionOn = !optionOn" />
        <AdsFilterOption mode="radio" label="Último trimestre" selected />
      </div>
    </template>

    <template #params>
      <AdsSwitch v-model="optionOn" label="Checkbox marcado" />
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag, joinBlocks } from "../../../utils/code-builder";
import AdsFilterOption from "../../../../../app/components/AdsFilterOption.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const optionOn = ref(true);

const code = computed(() =>
  joinBlocks(
    buildTag("AdsFilterOption", [
      attr(true, "mode", "checkbox"),
      attr(true, "label", "Centro"),
      attr(optionOn.value, "selected"),
    ]),
    buildTag("AdsFilterOption", [attr(true, "mode", "radio"), attr(true, "label", "Último trimestre"), attr(true, "selected")]),
  ),
);
</script>
