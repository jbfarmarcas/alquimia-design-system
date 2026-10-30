<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['search-input']">
    <template #preview>
      <div class="w-72 max-w-full">
        <AdsSearchInput
          v-model="text"
          :size="searchSize"
          :hint="supportHint"
          :state="interactiveState"
        />
      </div>
    </template>

    <template #params>
      <DocsParam label="Estado">
        <AdsSegmentedTabs v-model="state" :items="stateItems" aria-label="Estado do campo" />
      </DocsParam>

      <DocsParam label="Tamanho">
        <AdsSegmentedTabs v-model="searchSize" :items="searchSizeItems" aria-label="Tamanho da busca" />
      </DocsParam>

      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
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
import AdsSearchInput from "../../../../../app/components/AdsSearchInput.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

type FieldState = "default" | "active" | "focus" | "disabled";

const HINT = "Orientação curta sobre o campo.";

const state = ref<FieldState>("default");
const searchSize = ref<"md" | "sm">("md");
const hintOn = ref(true);
const text = ref("");

const stateItems: { label: string; value: FieldState }[] = [
  { label: "Default", value: "default" },
  { label: "Ativo", value: "active" },
  { label: "Foco", value: "focus" },
  { label: "Desabilitado", value: "disabled" },
];

const sample = (value: FieldState) => {
  if (value === "default") return "";
  return "Texto digitado";
};

watch(state, (value) => {
  text.value = sample(value);
});

const interactiveState = computed(() => (state.value === "default" ? null : state.value));
const supportHint = computed(() => (hintOn.value ? HINT : ""));

const searchSizeItems = [
  { label: "Padrão", value: "md" },
  { label: "Compacta", value: "sm" },
];

const code = computed(() => {
  const frozen = ["active", "focus"].includes(state.value);

  return buildTag("AdsSearchInput", [
    attr(true, "v-model", "text"),
    attr(searchSize.value === "sm", "size", "sm"),
    attr(hintOn.value, "hint", HINT),
    attr(frozen, "state", state.value),
    attr(state.value === "disabled", "disabled"),
  ]);
});
</script>
