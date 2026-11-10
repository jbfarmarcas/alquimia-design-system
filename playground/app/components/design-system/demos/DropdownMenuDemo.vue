<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['dropdown-menu']">
    <template #preview>
      <div class="flex flex-wrap items-start gap-4">
        <!-- Modo herança (API original) -->
        <AdsDropdownMenu v-if="demoMode === 'legacy'" :items="legacyItems">
          <UButton trailing-icon="i-lucide-chevron-down" color="neutral" variant="outline">
            Menu de ações
          </UButton>
        </AdsDropdownMenu>

        <!-- Modo seleção simples -->
        <AdsDropdownMenu
          v-else-if="demoMode === 'simple'"
          v-model="simpleValue"
          mode="simple"
          :options="options"
          :searchable="searchable"
          list-label="Período"
        >
          <UButton trailing-icon="i-lucide-chevron-down" color="neutral" variant="outline">
            {{ simpleLabel }}
          </UButton>
        </AdsDropdownMenu>

        <!-- Modo checkbox -->
        <AdsDropdownMenu
          v-else
          v-model="checkboxValues"
          mode="checkbox"
          :options="optionsWithBadge"
          :searchable="searchable"
          list-label="Status"
        >
          <UButton trailing-icon="i-lucide-chevron-down" color="neutral" variant="outline">
            {{ checkboxLabel }}
          </UButton>
        </AdsDropdownMenu>
      </div>
    </template>

    <template #params>
      <DocsParam label="Modo">
        <AdsSegmentedTabs v-model="demoMode" :items="modeItems" aria-label="Modo do dropdown" />
      </DocsParam>
      <AdsSwitch v-if="demoMode !== 'legacy'" v-model="searchable" label="Busca" />
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsDropdownMenu from "../../../../../app/components/AdsDropdownMenu.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const demoMode = ref<"legacy" | "simple" | "checkbox">("simple");
const simpleValue = ref("trimestre");
const checkboxValues = ref<string[]>(["ativo", "pendente"]);
const searchable = ref(false);

const modeItems = [
  { label: "Simples", value: "simple" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Herança", value: "legacy" },
];

const options = [
  { value: "7d", label: "Últimos 7 dias", subtitle: "Intervalo curto" },
  { value: "30d", label: "Últimos 30 dias", subtitle: "Intervalo médio" },
  { value: "trimestre", label: "Último trimestre", subtitle: "3 meses" },
  { value: "semestre", label: "Último semestre", subtitle: "6 meses" },
  { value: "ano", label: "Último ano", subtitle: "12 meses" },
];

const optionsWithBadge = [
  {
    value: "ativo",
    label: "Ativo",
    badge: {
      label: "142",
      style: { background: "var(--ads-status-success-100)", color: "var(--ads-status-success-800)" },
    },
  },
  {
    value: "pendente",
    label: "Pendente",
    subtitle: "Aguardando aprovação",
    badge: {
      label: "38",
      style: { background: "var(--ads-status-attention-100)", color: "var(--ads-status-attention-800)" },
    },
  },
  {
    value: "bloqueado",
    label: "Bloqueado",
    badge: {
      label: "5",
      style: { background: "var(--ads-status-warning-100)", color: "var(--ads-status-warning-800)" },
    },
  },
  {
    value: "encerrado",
    label: "Encerrado",
    subtitle: "Contrato finalizado",
    badge: {
      label: "91",
      style: { background: "var(--ads-neutro-claro-20, #f0f3f6)", color: "var(--ads-text-secondary)" },
    },
  },
];

const legacyItems = [
  [
    { label: "Editar", icon: "i-lucide-pencil", onSelect: () => {} },
    { label: "Duplicar", icon: "i-lucide-copy", onSelect: () => {} },
  ],
  [{ label: "Excluir", icon: "i-lucide-trash-2", color: "error" as const, onSelect: () => {} }],
];

const simpleLabel = computed(() => {
  const found = options.find((o) => o.value === simpleValue.value);
  return found?.label ?? "Selecione";
});

const checkboxLabel = computed(() => {
  if (checkboxValues.value.length === 0) return "Selecione";
  if (checkboxValues.value.length === 1) {
    return optionsWithBadge.find((o) => o.value === checkboxValues.value[0])?.label ?? "1 selecionado";
  }
  return `${checkboxValues.value.length} selecionados`;
});

const code = computed(() => {
  if (demoMode.value === "legacy") {
    return buildTag("AdsDropdownMenu", [attr(true, ":items", "items")], "  <UButton>Menu de ações</UButton>");
  }
  if (demoMode.value === "simple") {
    return buildTag("AdsDropdownMenu", [
      attr(true, "v-model", "value"),
      attr(true, 'mode', "simple"),
      attr(true, ":options", "options"),
      attr(searchable.value, "searchable", true),
    ], "  <UButton>Selecione</UButton>");
  }
  return buildTag("AdsDropdownMenu", [
    attr(true, "v-model", "values"),
    attr(true, 'mode', "checkbox"),
    attr(true, ":options", "options"),
    attr(searchable.value, "searchable", true),
  ], "  <UButton>Selecione</UButton>");
});
</script>
