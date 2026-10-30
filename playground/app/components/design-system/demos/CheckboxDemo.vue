<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.checkbox">
    <template #preview>
      <AdsCheckbox
        v-model="checkOn"
        v-model:indeterminate="checkMixed"
        :label="labelOn ? 'Todas as lojas' : ''"
        :disabled="disabled"
      />
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
import { attr, buildTag } from "../../../utils/code-builder";
import AdsCheckbox from "../../../../../app/components/AdsCheckbox.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const labelOn = ref(true);
const disabled = ref(false);
const checkOn = ref(false);
const checkMixed = ref(true);

const code = computed(() =>
  buildTag("AdsCheckbox", [
    attr(true, "v-model", "checkOn"),
    attr(true, "v-model:indeterminate", "checkMixed"),
    attr(labelOn.value, "label", "Todas as lojas"),
    attr(disabled.value, "disabled"),
  ]),
);
</script>
