<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.campos">
    <template #preview>
      <div class="w-72 max-w-full">
        <AdsInput
          v-if="kind === 'input'"
          v-model="text"
          :label="labelOn ? 'Label' : ''"
          :hint="supportHint"
          :error="supportError"
          placeholder="Placeholder"
          :state="interactiveState"
        />
        <AdsNumberInput
          v-else-if="kind === 'number'"
          v-model="text"
          :label="labelOn ? 'Label' : ''"
          :hint="supportHint"
          :error="supportError"
          placeholder="Placeholder"
          suffix="%"
          :state="interactiveState"
        />
        <AdsSearchInput
          v-else-if="kind === 'search'"
          v-model="text"
          :size="searchSize"
          :hint="supportHint"
          :state="interactiveState"
        />
        <AdsTextarea
          v-else-if="kind === 'textarea'"
          v-model="text"
          :label="labelOn ? 'Label' : ''"
          :hint="supportHint"
          :error="supportError"
          placeholder="Placeholder"
          :state="interactiveState"
        />
        <AdsDatePicker v-else-if="!rangeOn" v-model="date" class="w-full" />
        <AdsDatePicker v-else v-model:start="rangeStart" v-model:end="rangeEnd" range class="w-full" />
      </div>
    </template>

    <template #params>
      <DocsParam label="Componente">
        <AdsSegmentedTabs v-model="kind" :items="kindItems" aria-label="Componente do campo" />
      </DocsParam>

      <DocsParam v-if="kind !== 'date'" label="Estado">
        <AdsSegmentedTabs v-model="state" :items="stateItems" aria-label="Estado do campo" />
      </DocsParam>

      <DocsParam v-if="kind === 'search'" label="Tamanho">
        <AdsSegmentedTabs v-model="searchSize" :items="searchSizeItems" aria-label="Tamanho da busca" />
      </DocsParam>

      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-if="kind !== 'search' && kind !== 'date'" v-model="labelOn" label="Rótulo" />
        <AdsSwitch v-if="kind !== 'date'" v-model="hintOn" label="Orientação" />
        <AdsSwitch v-if="kind === 'date'" v-model="rangeOn" label="Período" />
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
import AdsDatePicker from "../../../../../app/components/AdsDatePicker.vue";
import AdsInput from "../../../../../app/components/AdsInput.vue";
import AdsNumberInput from "../../../../../app/components/AdsNumberInput.vue";
import AdsSearchInput from "../../../../../app/components/AdsSearchInput.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";
import AdsTextarea from "../../../../../app/components/AdsTextarea.vue";

type FieldKind = "input" | "number" | "search" | "textarea" | "date";
type FieldState = "default" | "active" | "focus" | "error" | "disabled" | "ai";

const HINT = "Orientação curta sobre o campo.";
const ERROR = "Informe um valor para continuar.";

const kind = ref<FieldKind>("input");
const state = ref<FieldState>("default");
const searchSize = ref<"md" | "sm">("md");
const labelOn = ref(true);
const hintOn = ref(true);
const rangeOn = ref(false);
const text = ref("");
const date = ref("");
const rangeStart = ref("");
const rangeEnd = ref("");

const kindItems = [
  { label: "Input", value: "input" },
  { label: "Número", value: "number" },
  { label: "Busca", value: "search" },
  { label: "Texto longo", value: "textarea" },
  { label: "Data", value: "date" },
];

const stateOptions: Record<FieldKind, { label: string; value: FieldState }[]> = {
  input: [
    { label: "Default", value: "default" },
    { label: "Ativo", value: "active" },
    { label: "Foco", value: "focus" },
    { label: "Erro", value: "error" },
    { label: "Desabilitado", value: "disabled" },
    { label: "IA", value: "ai" },
  ],
  number: [
    { label: "Default", value: "default" },
    { label: "Ativo", value: "active" },
    { label: "Foco", value: "focus" },
    { label: "Erro", value: "error" },
    { label: "Desabilitado", value: "disabled" },
  ],
  search: [
    { label: "Default", value: "default" },
    { label: "Ativo", value: "active" },
    { label: "Foco", value: "focus" },
    { label: "Desabilitado", value: "disabled" },
  ],
  textarea: [
    { label: "Default", value: "default" },
    { label: "Ativo", value: "active" },
    { label: "Foco", value: "focus" },
    { label: "Erro", value: "error" },
    { label: "Desabilitado", value: "disabled" },
  ],
  date: [],
};

const stateItems = computed(() => stateOptions[kind.value]);

const searchSizeItems = [
  { label: "Padrão", value: "md" },
  { label: "Compacta", value: "sm" },
];

const sample = (value: FieldState) => {
  if (value === "default") return "";
  if (value === "ai") return "Taxas com cartão de crédito";
  return "Texto digitado";
};

watch(
  () => kind.value,
  (next) => {
    if (!stateOptions[next].some((item) => item.value === state.value)) {
      state.value = "default";
    }
  },
);

watch(state, (value) => {
  text.value = sample(value);
});

const interactiveState = computed(() => (state.value === "default" ? null : state.value));
const supportError = computed(() => (state.value === "error" ? ERROR : ""));
const supportHint = computed(() => (hintOn.value && state.value !== "error" ? HINT : ""));

const componentName = computed(() => {
  if (kind.value === "number") return "AdsNumberInput";
  if (kind.value === "search") return "AdsSearchInput";
  if (kind.value === "textarea") return "AdsTextarea";
  return "AdsInput";
});

const code = computed(() => {
  if (kind.value === "date") {
    return buildTag(
      "AdsDatePicker",
      rangeOn.value
        ? [attr(true, "v-model:start", "rangeStart"), attr(true, "v-model:end", "rangeEnd"), attr(true, "range")]
        : [attr(true, "v-model", "date")],
    );
  }

  const isSearch = kind.value === "search";
  const frozen = ["active", "focus", "ai"].includes(state.value);

  return buildTag(componentName.value, [
    attr(true, "v-model", "text"),
    attr(labelOn.value && !isSearch, "label", "Label"),
    attr(kind.value === "number", "suffix", "%"),
    attr(!isSearch, "placeholder", "Placeholder"),
    attr(isSearch && searchSize.value === "sm", "size", "sm"),
    attr(state.value === "error", "error", ERROR),
    attr(hintOn.value && state.value !== "error", "hint", HINT),
    attr(frozen, "state", state.value),
    attr(state.value === "disabled", "disabled"),
  ]);
});
</script>
