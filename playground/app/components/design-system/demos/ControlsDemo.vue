<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.controles">
    <template #preview>
      <AdsSwitch
        v-if="component === 'switch'"
        v-model="switchOn"
        :label="labelOn ? 'Somente ativas' : ''"
        :disabled="disabled"
      />

      <AdsCheckbox
        v-else-if="component === 'checkbox'"
        v-model="checkOn"
        v-model:indeterminate="checkMixed"
        :label="labelOn ? 'Todas as lojas' : ''"
        :disabled="disabled"
      />

      <div v-else class="flex flex-col items-start gap-3" role="radiogroup" aria-label="Origem">
        <AdsRadio
          v-model="radioValue"
          name="origem"
          value="manual"
          :label="labelOn ? 'Coleta manual' : ''"
          :disabled="disabled"
        />
        <AdsRadio
          v-model="radioValue"
          name="origem"
          value="import"
          :label="labelOn ? 'Importada' : ''"
          :disabled="disabled"
        />
      </div>
    </template>

    <template #params>
      <DocsParam label="Componente">
        <AdsSegmentedTabs v-model="component" :items="componentItems" aria-label="Componente de controle" />
      </DocsParam>

      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="labelOn" label="Rótulo" />
        <AdsSwitch v-model="disabled" label="Desabilitado" />
      </div>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag, joinBlocks } from "../../../utils/code-builder";
import AdsCheckbox from "../../../../../app/components/AdsCheckbox.vue";
import AdsRadio from "../../../../../app/components/AdsRadio.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

type ControlComponent = "switch" | "checkbox" | "radio";

const component = ref<ControlComponent>("switch");
const labelOn = ref(true);
const disabled = ref(false);
const switchOn = ref(true);
const checkOn = ref(false);
const checkMixed = ref(true);
const radioValue = ref("manual");

const componentItems = [
  { label: "Switch", value: "switch" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Radio", value: "radio" },
];

const code = computed(() => {
  if (component.value === "switch") {
    return buildTag("AdsSwitch", [
      attr(true, "v-model", "switchOn"),
      attr(labelOn.value, "label", "Somente ativas"),
      attr(disabled.value, "disabled"),
    ]);
  }

  if (component.value === "checkbox") {
    return buildTag("AdsCheckbox", [
      attr(true, "v-model", "checkOn"),
      attr(true, "v-model:indeterminate", "checkMixed"),
      attr(labelOn.value, "label", "Todas as lojas"),
      attr(disabled.value, "disabled"),
    ]);
  }

  return joinBlocks(
    buildTag("AdsRadio", [
      attr(true, "v-model", "radioValue"),
      attr(true, "name", "origem"),
      attr(true, "value", "manual"),
      attr(labelOn.value, "label", "Coleta manual"),
      attr(disabled.value, "disabled"),
    ]),
    buildTag("AdsRadio", [
      attr(true, "v-model", "radioValue"),
      attr(true, "name", "origem"),
      attr(true, "value", "import"),
      attr(labelOn.value, "label", "Importada"),
      attr(disabled.value, "disabled"),
    ]),
  );
});
</script>
