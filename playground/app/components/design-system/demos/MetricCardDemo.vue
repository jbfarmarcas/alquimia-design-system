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
      <div class="flex flex-wrap items-end gap-x-4 gap-y-4">
        <div :class="choiceClass(typeItems.length)">
          <DocsParam label="Tipo">
            <AdsSegmentedTabs v-if="typeItems.length <= 3" v-model="type" :items="typeItems" aria-label="Tipo do card" />
            <USelect v-else v-model="type" :items="typeItems" aria-label="Tipo do card" class="w-full" />
          </DocsParam>
        </div>
        <div :class="choiceClass(stateItems.length)">
          <DocsParam label="Estado">
            <AdsSegmentedTabs v-if="stateItems.length <= 3" v-model="state" :items="stateItems" aria-label="Estado do card" />
            <USelect v-else v-model="state" :items="stateItems" aria-label="Estado do card" class="w-full" />
          </DocsParam>
        </div>
        <div :class="choiceClass(hintIconItems.length)">
          <DocsParam label="Ícone da dica">
            <AdsSegmentedTabs v-if="hintIconItems.length <= 3" v-model="hintIcon" :items="hintIconItems" aria-label="Ícone da dica" />
            <USelect v-else v-model="hintIcon" :items="hintIconItems" aria-label="Ícone da dica" class="w-full" />
          </DocsParam>
        </div>
        <div :class="choiceClass(hintColorItems.length)">
          <DocsParam label="Cor da dica">
            <AdsSegmentedTabs v-if="hintColorItems.length <= 3" v-model="hintColor" :items="hintColorItems" aria-label="Cor da dica" />
            <USelect v-else v-model="hintColor" :items="hintColorItems" aria-label="Cor da dica" class="w-full" />
          </DocsParam>
        </div>
        <div :class="choiceClass(hintAlignItems.length)">
          <DocsParam label="Posição da dica">
            <AdsSegmentedTabs v-if="hintAlignItems.length <= 3" v-model="hintAlign" :items="hintAlignItems" aria-label="Posição da dica" />
            <USelect v-else v-model="hintAlign" :items="hintAlignItems" aria-label="Posição da dica" class="w-full" />
          </DocsParam>
        </div>
        <div class="flex min-h-9 flex-wrap items-center gap-x-6 gap-y-3">
          <AdsSwitch v-if="type !== 'pending'" v-model="negative" label="Variação negativa" />
          <AdsSwitch v-if="type === 'metric'" v-model="inline" label="Comparativo em linha" />
        </div>
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
import type { AdsCardHintAlign, AdsCardHintColor } from "../../../../../app/components/AdsCardHint.vue";
import AdsMetricCard from "../../../../../app/components/AdsMetricCard.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

/** Até 3 opções cabe em abas. Acima disso, o select ocupa menos espaço. */
const choiceClass = (count: number) => (count > 3 ? "min-w-36 flex-1" : "shrink-0");

type CardType = "kpi" | "pending" | "metric";
type CardState = "default" | "selected" | "loading" | "empty";

const type = ref<CardType>("metric");
const state = ref<CardState>("default");
const negative = ref(false);
const inline = ref(false);
const hintIcon = ref("i-lucide-info");
const hintColor = ref<AdsCardHintColor>("secondary");
const hintAlign = ref<AdsCardHintAlign>("start");

const hintIconItems = [
  { label: "Info", value: "i-lucide-info" },
  { label: "Ajuda", value: "i-lucide-circle-help" },
  { label: "Alerta", value: "i-lucide-triangle-alert" },
  { label: "IA", value: "i-lucide-sparkles" },
];

const hintColorItems = [
  { label: "Padrão", value: "secondary" },
  { label: "Marca", value: "brand" },
  { label: "Sucesso", value: "success" },
  { label: "Atenção", value: "attention" },
  { label: "Alerta", value: "warning" },
];

const hintAlignItems = [
  { label: "Ao lado", value: "start" },
  { label: "À direita", value: "end" },
];

const hintProps = computed(() => ({
  hintIcon: hintIcon.value,
  hintColor: hintColor.value,
  hintAlign: hintAlign.value,
}));

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
    return { type: "kpi", title: "Faturamento", hint: "Soma das vendas no período.", icon: "i-lucide-dollar-sign", value: "R$ 342.978,09", ...delta.value, ...hintProps.value } as const;
  }
  if (type.value === "pending") {
    return { type: "pending", title: "Lojas sem pesquisa", hint: "Lojas que ainda não enviaram a pesquisa.", icon: "i-lucide-store", value: "128", unit: "pendências", ...hintProps.value } as const;
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
    ...hintProps.value,
  } as const;
});

const code = computed(() => {
  const p = cardProps.value as Record<string, unknown>;
  const str = (key: string) => (typeof p[key] === "string" ? (p[key] as string) : undefined);
  return buildTag("AdsMetricCard", [
    attr(true, "type", type.value),
    attr(true, "title", str("title")),
    attr(Boolean(str("hint")), "hint", str("hint")),
    attr(str("hintIcon") !== "i-lucide-info", "hint-icon", str("hintIcon")),
    attr(str("hintColor") !== "secondary", "hint-color", str("hintColor")),
    attr(str("hintAlign") === "end", "hint-align", "end"),
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
