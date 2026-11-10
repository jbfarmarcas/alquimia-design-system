<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['progress-bar-loading']">
    <template #preview>
      <div class="w-[400px] max-w-full rounded-[var(--ads-radius-md)] bg-white p-4">
        <ProgressBarLoading
          title="Importando preços"
          :description="showDescription ? 'Conferindo as linhas do arquivo.' : ''"
          :percent="effectivePercent"
          :indeterminate="isIndeterminate"
          :variant="isSuccess ? 'success' : 'primary'"
          :show-icon="showIcon"
          :show-percent="showPercent"
          :show-elapsed-time="showTime"
        />
      </div>
    </template>

    <template #params>
      <DocsParam label="Estado">
        <AdsSegmentedTabs v-model="state" :items="stateItems" aria-label="Estado da barra" />
      </DocsParam>
      <DocsParam v-if="state === 'running'" label="Progresso">
        <AdsSegmentedTabs v-model="percent" :items="percentItems" aria-label="Progresso" />
      </DocsParam>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="showIcon" label="Ícone" />
        <AdsSwitch v-model="showDescription" label="Descrição" />
        <AdsSwitch v-model="showPercent" label="Percentual" />
        <AdsSwitch v-model="showTime" label="Tempo decorrido" />
      </div>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        Não há estado de erro: a validação acontece depois do envio.
      </p>
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

const state = ref<"running" | "indeterminate" | "success">("running");
const percent = ref("50");
const showIcon = ref(true);
const showDescription = ref(true);
const showPercent = ref(true);
const showTime = ref(true);

const stateItems = [
  { label: "Em andamento", value: "running" },
  { label: "Indeterminado", value: "indeterminate" },
  { label: "Sucesso", value: "success" },
];

const percentItems = [
  { label: "0%", value: "0" },
  { label: "25%", value: "25" },
  { label: "50%", value: "50" },
  { label: "75%", value: "75" },
];

const isIndeterminate = computed(() => state.value === "indeterminate");
const isSuccess = computed(() => state.value === "success");
const effectivePercent = computed(() => (isSuccess.value ? 100 : Number(percent.value)));

const code = computed(() =>
  buildTag("ProgressBarLoading", [
    attr(true, "title", "Importando preços"),
    attr(showDescription.value, "description", "Conferindo as linhas do arquivo."),
    attr(!isIndeterminate.value, ":percent", String(effectivePercent.value)),
    attr(isIndeterminate.value, "indeterminate"),
    attr(isSuccess.value, "variant", "success"),
    attr(!showIcon.value, ":show-icon", "false"),
    attr(!showPercent.value, ":show-percent", "false"),
    attr(!showTime.value, ":show-elapsed-time", "false"),
  ]),
);
</script>
