<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['button-group']">
    <template #preview>
      <AdsButtonGroup v-model="group" :options="groupOptions" />
    </template>

    <template #params>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        Sem parâmetros. Clique em um segmento para trocar o valor do v-model.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsButtonGroup from "../../../../../app/components/AdsButtonGroup.vue";

const group = ref("mes");

const groupOptions = [
  { value: "dia", label: "Dia" },
  { value: "mes", label: "Mês" },
  { value: "ano", label: "Ano" },
];

const code = computed(() =>
  buildTag("AdsButtonGroup", [attr(true, "v-model", group.value), attr(true, ":options", "options")]),
);
</script>
