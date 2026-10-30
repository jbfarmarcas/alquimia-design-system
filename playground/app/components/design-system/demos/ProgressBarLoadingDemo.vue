<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['progress-bar-loading']">
    <template #preview>
      <div class="w-full max-w-md rounded-[var(--ads-radius-md)] bg-white p-4">
        <ProgressBarLoading
          title="Importando preços"
          description="Conferindo as linhas do arquivo."
          :percent="Number(percent)"
          :indeterminate="indeterminate"
          :variant="progressStatus"
          :show-elapsed-time="false"
        />
      </div>
    </template>

    <template #params>
      <div class="flex flex-wrap items-end gap-x-8 gap-y-5">
        <DocsParam label="Andamento">
          <AdsSegmentedTabs v-model="percent" :items="percentItems" aria-label="Andamento" />
        </DocsParam>
        <DocsParam label="Resultado">
          <AdsSegmentedTabs v-model="progressStatus" :items="progressItems" aria-label="Resultado do trabalho" />
        </DocsParam>
      </div>
      <AdsSwitch v-model="indeterminate" label="Indeterminado" />
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import ProgressBarLoading from "../../../../../app/components/ProgressBarLoading.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

type ProgressStatus = "primary" | "success" | "error";

const percent = ref("68");
const indeterminate = ref(false);
const progressStatus = ref<ProgressStatus>("primary");

const percentItems = [
  { label: "25%", value: "25" },
  { label: "68%", value: "68" },
  { label: "100%", value: "100" },
];

const progressItems = [
  { label: "Em andamento", value: "primary" },
  { label: "Sucesso", value: "success" },
  { label: "Erro", value: "error" },
];

const code = computed(() =>
  buildTag("ProgressBarLoading", [
    attr(true, "title", "Importando preços"),
    attr(true, "description", "Conferindo as linhas do arquivo."),
    attr(!indeterminate.value, ":percent", percent.value),
    attr(indeterminate.value, "indeterminate"),
    attr(progressStatus.value !== "primary", "variant", progressStatus.value),
    attr(true, ":show-elapsed-time", "false"),
  ]),
);
</script>
