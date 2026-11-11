<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.select">
    <template #preview>
      <AdsSelect
        v-if="trigger === 'inline'"
        v-model="selection"
        :type="kind"
        :options="options"
        :searchable="searchOn"
        :select-all="selectAllOn"
        inline
      />

      <AdsSelect
        v-else-if="trigger === 'custom'"
        v-model="selection"
        :type="kind"
        :options="options"
        :searchable="searchOn"
        :select-all="selectAllOn"
      >
        <template #trigger="{ label }">
          <UButton trailing-icon="i-lucide-chevron-down" color="neutral" variant="outline">
            {{ label }}
          </UButton>
        </template>
      </AdsSelect>

      <div v-else class="w-72 max-w-full">
        <AdsSelect
          v-model="selection"
          :type="kind"
          label="Label"
          placeholder="Placeholder"
          :hint="supportHint"
          :error="fieldState === 'erro' ? ERROR : ''"
          :disabled="fieldState === 'desabilitado'"
          :ai-suggestion="fieldState === 'ia'"
          :options="options"
          :add-label="addOn ? 'Cadastrar {query}' : undefined"
          @add="onAdd"
          :searchable="searchOn"
          :select-all="selectAllOn"
        />
      </div>
    </template>

    <template #params>
      <DocsParam label="Gatilho">
        <AdsSegmentedTabs v-model="trigger" :items="triggerItems" aria-label="Gatilho do select" />
      </DocsParam>
      <DocsParam label="Tipo">
        <AdsSegmentedTabs v-model="kind" :items="kindItems" aria-label="Tipo do select" />
      </DocsParam>
      <DocsParam v-if="trigger === 'field'" label="Estado">
        <AdsSegmentedTabs v-model="fieldState" :items="stateItems" aria-label="Estado do campo" />
      </DocsParam>
      <div v-if="kind !== 'month'" class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="searchOn" label="Busca" />
        <AdsSwitch v-if="kind === 'checkbox'" v-model="selectAllOn" label="Selecionar todos" />
        <AdsSwitch v-model="richOn" label="Subtítulo e selo" />
        <AdsSwitch v-model="manyOn" label="3 000 opções" />
        <AdsSwitch v-if="trigger === 'field'" v-model="addOn" label="Cadastrar novo" />
        <AdsSwitch v-if="trigger === 'field'" v-model="hintOn" label="Orientação" />
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
import AdsSelect from "../../../../../app/components/AdsSelect.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";
import type { AdsSelectOption, AdsSelectType } from "../../../../../app/utils/ads-filter-select";

type Trigger = "field" | "custom" | "inline";
type FieldState = "vazio" | "preenchido" | "ia" | "erro" | "desabilitado";

const HINT = "Orientação curta sobre o campo.";
const ERROR = "Informe um valor para continuar.";

const trigger = ref<Trigger>("field");
const kind = ref<AdsSelectType>("checkbox");
const fieldState = ref<FieldState>("vazio");
const searchOn = ref(true);
const selectAllOn = ref(true);
const richOn = ref(true);
const manyOn = ref(false);
const addOn = ref(false);
const hintOn = ref(true);
const selection = ref<string | string[]>([]);

const triggerItems = [
  { label: "Campo", value: "field" },
  { label: "Próprio", value: "custom" },
  { label: "Sem gatilho", value: "inline" },
];

const kindItems = [
  { label: "Checkbox", value: "checkbox" },
  { label: "Simples", value: "radio" },
  { label: "Mês", value: "month" },
];

const stateItems = [
  { label: "Vazio", value: "vazio" },
  { label: "Preenchido", value: "preenchido" },
  { label: "IA", value: "ia" },
  { label: "Erro", value: "erro" },
  { label: "Desabilitado", value: "desabilitado" },
];

/** Lojas do Figma (Super dropdown), com volume para rolar. */
const stores: AdsSelectOption[] = [
  { value: "pague-menos", label: "Pague Menos", subtitle: "R. Teodoro Sampaio, 1020", badge: { label: "Novo!" } },
  { value: "dsp", label: "Drogaria São Paulo", subtitle: "Rua XV De Novembro, 88" },
  { value: "sao-joao", label: "Farmácia São João", subtitle: "Av. Brig. Luís Antônio, 300", badge: { label: "Sugestão Inteligente", tone: "ai" } },
  { value: "panvel", label: "Panvel", subtitle: "Rua Joana de Andrade, 3112" },
  { value: "drogasil", label: "Drogasil", subtitle: "Av. Paulista, 1500" },
  { value: "raia", label: "Droga Raia", subtitle: "Rua Augusta, 2210" },
  { value: "nissei", label: "Farmácias Nissei", subtitle: "Rua Vergueiro, 455", disabled: true },
  { value: "venancio", label: "Drogarias Venancio", subtitle: "Rua Domingos de Morais, 900" },
  { value: "extrafarma", label: "Extrafarma", subtitle: "Av. Rebouças, 1240" },
  { value: "ultrafarma", label: "Ultrafarma", subtitle: "Av. Washington Luís, 4200" },
];

/** Volume para testar a lista virtual: as lojas repetidas com nomes e valores únicos. */
const manyStores: AdsSelectOption[] = Array.from({ length: 3000 }, (_, index) => {
  const base = stores[index % stores.length]!;
  return { ...base, value: `${base.value}-${index}`, label: `${base.label} ${index + 1}` };
});

/** Lojas cadastradas pela ação do rodapé nesta sessão. */
const added = ref<AdsSelectOption[]>([]);

const onAdd = (name: string) => {
  if (!name) return;
  added.value.push({ value: `nova-${added.value.length + 1}`, label: name, subtitle: "Cadastrada agora" });
};

const options = computed<AdsSelectOption[]>(() => {
  const source = [...(manyOn.value ? manyStores : stores), ...added.value];
  return richOn.value ? source : source.map(({ value, label, disabled }) => ({ value, label, disabled }));
});

const supportHint = computed(() => (hintOn.value && fieldState.value !== "erro" ? HINT : ""));

watch(
  [kind, fieldState, trigger],
  () => {
    const filled = trigger.value !== "field" || fieldState.value === "preenchido" || fieldState.value === "ia";
    if (kind.value === "month") selection.value = filled ? "2023-09" : "";
    else if (kind.value === "checkbox") selection.value = filled ? ["sao-joao", "panvel"] : [];
    else selection.value = filled ? "sao-joao" : "";
  },
  { immediate: true },
);

const code = computed(() => {
  const list = kind.value !== "month";
  const attrs = [
    attr(true, "v-model", "selection"),
    attr(true, "type", kind.value),
    attr(list, ":options", "options"),
    attr(list && kind.value === "radio" && searchOn.value, "searchable"),
    attr(list && kind.value === "checkbox" && !searchOn.value, ":searchable", "false"),
    attr(kind.value === "checkbox" && !selectAllOn.value, ":select-all", "false"),
  ];
  if (trigger.value === "inline") return buildTag("AdsSelect", [...attrs, attr(true, "inline")]);
  if (trigger.value === "custom") {
    return buildTag(
      "AdsSelect",
      attrs,
      '  <template #trigger="{ label }">\n    <UButton>{{ label }}</UButton>\n  </template>',
    );
  }
  return buildTag("AdsSelect", [
    ...attrs,
    attr(true, "label", "Label"),
    attr(fieldState.value === "erro", "error", ERROR),
    attr(supportHint.value !== "", "hint", HINT),
    attr(fieldState.value === "desabilitado", "disabled"),
    attr(fieldState.value === "ia", "ai-suggestion"),
    attr(addOn.value, "add-label", "Cadastrar {query}"),
    attr(addOn.value, "@add", "onAdd"),
  ]);
});
</script>
