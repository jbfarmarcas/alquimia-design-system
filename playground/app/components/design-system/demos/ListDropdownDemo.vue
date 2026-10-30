<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['list-dropdown']">
    <template #preview>
      <AdsListDropdown v-model="listValue" :options="radioOptions" :search="searchOn" class="max-w-sm" />
    </template>

    <template #params>
      <AdsSwitch v-model="searchOn" label="Busca" />
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsListDropdown from "../../../../../app/components/AdsListDropdown.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const listValue = ref("mes");
const searchOn = ref(true);

const radioOptions = [
  { value: "mes", label: "Último mês" },
  { value: "trimestre", label: "Último trimestre" },
  { value: "ytd", label: "YTD" },
];

const code = computed(() =>
  buildTag("AdsListDropdown", [
    attr(true, "v-model", listValue.value),
    attr(true, ":options", "options"),
    attr(!searchOn.value, ":search", "false"),
  ]),
);
</script>
