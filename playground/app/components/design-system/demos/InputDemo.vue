<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.input">
    <template #preview>
      <div class="w-72 max-w-full">
        <AdsInput
          v-model="text"
          :label="labelOn ? 'Label' : ''"
          :hint="supportHint"
          :error="supportError"
          placeholder="Placeholder"
          :state="interactiveState"
        />
      </div>
    </template>

    <template #params>
      <DocsParam label="Estado">
        <AdsSegmentedTabs v-model="state" :items="stateItems" aria-label="Estado do campo" />
      </DocsParam>

      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="labelOn" label="Rótulo" />
        <AdsSwitch v-model="hintOn" label="Orientação" />
      </div>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsInput from "../../../../../app/components/AdsInput.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

type FieldState = "default" | "active" | "focus" | "error" | "disabled" | "ai";

const HINT = "Orientação curta sobre o campo.";
const ERROR = "Informe um valor para continuar.";

const state = ref<FieldState>("default");
const labelOn = ref(true);
const hintOn = ref(true);
const text = ref("");

const stateItems: { label: string; value: FieldState }[] = [
  { label: "Default", value: "default" },
  { label: "Ativo", value: "active" },
  { label: "Foco", value: "focus" },
  { label: "Erro", value: "error" },
  { label: "Desabilitado", value: "disabled" },
  { label: "IA", value: "ai" },
];

const sample = (value: FieldState) => {
  if (value === "default") return "";
  if (value === "ai") return "Taxas com cartão de crédito";
  return "Texto digitado";
};

watch(state, (value) => {
  text.value = sample(value);
});

const interactiveState = computed(() => (state.value === "default" ? null : state.value));
const supportError = computed(() => (state.value === "error" ? ERROR : ""));
const supportHint = computed(() => (hintOn.value && state.value !== "error" ? HINT : ""));

const code = computed(() => {
  const frozen = ["active", "focus", "ai"].includes(state.value);

  return buildTag("AdsInput", [
    attr(true, "v-model", "text"),
    attr(labelOn.value, "label", "Label"),
    attr(true, "placeholder", "Placeholder"),
    attr(state.value === "error", "error", ERROR),
    attr(hintOn.value && state.value !== "error", "hint", HINT),
    attr(frozen, "state", state.value),
    attr(state.value === "disabled", "disabled"),
  ]);
});
</script>
