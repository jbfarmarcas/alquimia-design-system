<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['filter-select']">
    <template #preview>
      <div class="w-72 max-w-full">
        <AdsFilterSelect
          v-model="selection"
          :type="kind"
          label="Label"
          placeholder="Placeholder"
          :hint="supportHint"
          :error="filterState === 'erro' ? ERROR : ''"
          :disabled="filterState === 'desabilitado'"
          :options="options"
        />
      </div>
    </template>

    <template #params>
      <DocsParam label="Tipo">
        <AdsSegmentedTabs v-model="kind" :items="kindItems" aria-label="Tipo do filtro" />
      </DocsParam>
      <DocsParam label="Estado">
        <AdsSegmentedTabs v-model="filterState" :items="stateItems" aria-label="Estado do filtro" />
      </DocsParam>
      <AdsSwitch v-model="hintOn" label="Orientação" />
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsFilterSelect from "../../../../../app/components/AdsFilterSelect.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

type FilterKind = "checkbox" | "radio" | "month";
type FilterState = "vazio" | "preenchido" | "erro" | "desabilitado";

const HINT = "Orientação curta sobre o campo.";
const ERROR = "Informe um valor para continuar.";

const kind = ref<FilterKind>("checkbox");
const filterState = ref<FilterState>("vazio");
const hintOn = ref(true);
const selection = ref<string | string[]>([]);

const kindItems = [
  { label: "Checkbox", value: "checkbox" },
  { label: "Radio", value: "radio" },
  { label: "Mês", value: "month" },
];

const stateItems = [
  { label: "Vazio", value: "vazio" },
  { label: "Preenchido", value: "preenchido" },
  { label: "Erro", value: "erro" },
  { label: "Desabilitado", value: "desabilitado" },
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

const options = computed(() => (kind.value === "checkbox" ? checkboxOptions : radioOptions));
const supportHint = computed(() => (hintOn.value && filterState.value !== "erro" ? HINT : ""));

watch([kind, filterState], () => {
  if (filterState.value !== "preenchido") {
    selection.value = kind.value === "checkbox" ? [] : "";
    return;
  }
  if (kind.value === "checkbox") selection.value = ["centro", "jardins"];
  else if (kind.value === "radio") selection.value = "trimestre";
  else selection.value = "2023-09";
});

const code = computed(() =>
  buildTag("AdsFilterSelect", [
    attr(true, "v-model", "selection"),
    attr(true, "type", kind.value),
    attr(true, "label", "Label"),
    attr(kind.value !== "month", ":options", "options"),
    attr(filterState.value === "erro", "error", ERROR),
    attr(supportHint.value !== "", "hint", HINT),
    attr(filterState.value === "desabilitado", "disabled"),
  ]),
);
</script>
