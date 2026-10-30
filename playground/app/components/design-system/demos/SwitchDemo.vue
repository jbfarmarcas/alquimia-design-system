<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.switch">
    <template #preview>
      <AdsSwitch v-model="switchOn" :label="labelOn ? 'Somente ativas' : ''" :disabled="disabled" />
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
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const labelOn = ref(true);
const disabled = ref(false);
const switchOn = ref(true);

const code = computed(() =>
  buildTag("AdsSwitch", [
    attr(true, "v-model", "switchOn"),
    attr(labelOn.value, "label", "Somente ativas"),
    attr(disabled.value, "disabled"),
  ]),
);
</script>
