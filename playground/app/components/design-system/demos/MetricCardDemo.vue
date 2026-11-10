<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['metric-card']">
    <template #preview>
      <AdsMetricCard
        :class="type === 'pending' ? 'w-[360px] max-w-full' : 'w-[300px] max-w-full'"
        v-bind="cardProps"
        :as="type === 'pending' ? 'button' : 'div'"
        :selected="state === 'selected'"
        :loading="state === 'loading'"
        :empty="state === 'empty'"
      />
    </template>

    <template #params>
      <DocsParam label="Tipo">
        <AdsSegmentedTabs v-model="type" :items="typeItems" aria-label="Tipo do card" />
      </DocsParam>
      <DocsParam label="Estado">
        <AdsSegmentedTabs v-model="state" :items="stateItems" aria-label="Estado do card" />
      </DocsParam>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-if="type !== 'pending'" v-model="negative" label="Variação negativa" />
        <AdsSwitch v-if="type === 'metric'" v-model="inline" label="Comparativo em linha" />
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
import AdsMetricCard from "../../../../../app/components/AdsMetricCard.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

type CardType = "kpi" | "pending" | "metric";
type CardState = "default" | "selected" | "loading" | "empty";

const type = ref<CardType>("metric");
const state = ref<CardState>("default");
const negative = ref(false);
const inline = ref(false);

const typeItems = [
  { label: "KPI", value: "kpi" },
  { label: "Pendência", value: "pending" },
  { label: "Métrica", value: "metric" },
];

// Selecionado só existe no KPI e na Pendência (Figma).
const stateItems = computed(() => [
  { label: "Padrão", value: "default" },
  ...(type.value === "metric" ? [] : [{ label: "Selecionado", value: "selected" }]),
  { label: "Carregando", value: "loading" },
  { label: "Vazio", value: "empty" },
]);

watch(type, (value) => {
  if (value === "metric" && state.value === "selected") state.value = "default";
});

const delta = computed(() => ({
  delta: "1,15%",
  deltaDirection: negative.value ? "down" : "up",
  deltaTone: negative.value ? "negative" : "positive",
}) as const);

const cardProps = computed(() => {
  if (type.value === "kpi") {
    return { type: "kpi", title: "Faturamento", hint: "Soma das vendas no período.", icon: "i-lucide-dollar-sign", value: "R$ 342.978,09", ...delta.value } as const;
  }
  if (type.value === "pending") {
    return { type: "pending", title: "Lojas sem pesquisa", hint: "Lojas que ainda não enviaram a pesquisa.", icon: "i-lucide-store", value: "128", unit: "pendências" } as const;
  }
  return {
    type: "metric",
    title: "Receita simulada",
    hint: "Receita mensal com base na média de unidades vendidas e no preço final.",
    period: "01/12/2023 - 20/12/2023",
    value: "R$ 342.978,09",
    ...delta.value,
    comparisonLabel: "Média diária do período:",
    comparisonBadge: inline.value ? undefined : "Set, Out e Nov",
    comparisonValue: "2.498",
    comparisonInline: inline.value,
    emptyDescription: "Ajuste o período ou os filtros para ver esta métrica.",
  } as const;
});

const code = computed(() => {
  const p = cardProps.value as Record<string, unknown>;
  const str = (key: string) => (typeof p[key] === "string" ? (p[key] as string) : undefined);
  return buildTag("AdsMetricCard", [
    attr(true, "type", type.value),
    attr(true, "title", str("title")),
    attr(Boolean(str("hint")), "hint", str("hint")),
    attr(Boolean(str("icon")), "icon", str("icon")),
    attr(Boolean(str("period")), "period", str("period")),
    attr(true, "value", str("value")),
    attr(Boolean(str("unit")), "unit", str("unit")),
    attr(Boolean(str("delta")), "delta", str("delta")),
    attr(Boolean(str("delta")) && negative.value, "delta-direction", "down"),
    attr(Boolean(str("delta")) && negative.value, "delta-tone", "negative"),
    attr(Boolean(str("comparisonLabel")), "comparison-label", str("comparisonLabel")),
    attr(Boolean(str("comparisonBadge")), "comparison-badge", str("comparisonBadge")),
    attr(Boolean(str("comparisonValue")), "comparison-value", str("comparisonValue")),
    attr(type.value === "metric" && inline.value, "comparison-inline"),
    attr(type.value === "pending", "as", "button"),
    attr(state.value === "selected", "selected"),
    attr(state.value === "loading", "loading"),
    attr(state.value === "empty", "empty"),
    attr(state.value === "empty" && type.value === "metric", "empty-description", str("emptyDescription")),
  ]);
});
</script>
