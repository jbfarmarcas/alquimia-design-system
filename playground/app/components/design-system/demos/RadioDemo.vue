<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.radio">
    <template #preview>
      <div class="flex flex-col items-start gap-3" role="radiogroup" aria-label="Origem">
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
import { docsApis } from "../catalog-docs";
import { attr, buildTag, joinBlocks } from "../../../utils/code-builder";
import AdsRadio from "../../../../../app/components/AdsRadio.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const labelOn = ref(true);
const disabled = ref(false);
const radioValue = ref("manual");

const code = computed(() =>
  joinBlocks(
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
  ),
);
</script>
