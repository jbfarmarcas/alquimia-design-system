<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['filter-dropdown']">
    <template #preview>
      <AdsFilterDropdown
        v-if="kind === 'checkbox'"
        v-model="checks"
        type="checkbox"
        :options="checkboxOptions"
        :searchable="searchOn"
        :select-all="selectAllOn"
      />
      <AdsFilterDropdown v-else v-model="choice" type="radio" :options="radioOptions" :searchable="searchOn" />
    </template>

    <template #params>
      <DocsParam label="Tipo">
        <AdsSegmentedTabs v-model="kind" :items="kindItems" aria-label="Tipo do painel" />
      </DocsParam>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="searchOn" label="Busca" />
        <AdsSwitch v-if="kind === 'checkbox'" v-model="selectAllOn" label="Selecionar todos" />
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
import AdsFilterDropdown from "../../../../../app/components/AdsFilterDropdown.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const kind = ref<"checkbox" | "radio">("checkbox");
const checks = ref<string[]>(["centro"]);
const choice = ref("trimestre");
const searchOn = ref(true);
const selectAllOn = ref(true);

const kindItems = [
  { label: "Checkbox", value: "checkbox" },
  { label: "Radio", value: "radio" },
];

const checkboxOptions = [
  { value: "centro", label: "Centro" },
  { value: "jardins", label: "Jardins" },
  { value: "vila-nova", label: "Vila Nova" },
  { value: "ribeirao", label: "Ribeirão" },
];

const radioOptions = [
  { value: "mes", label: "Último mês" },
  { value: "trimestre", label: "Último trimestre" },
  { value: "ytd", label: "YTD" },
];

const code = computed(() =>
  buildTag("AdsFilterDropdown", [
    attr(true, "v-model", kind.value === "checkbox" ? "checks" : "choice"),
    attr(true, "type", kind.value),
    attr(true, ":options", "options"),
    attr(!searchOn.value, ":searchable", "false"),
    attr(kind.value === "checkbox" && !selectAllOn.value, ":select-all", "false"),
  ]),
);
</script>
