<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['feature-card']">
    <template #preview>
      <div class="flex w-full flex-wrap items-stretch gap-6">
        <AdsFeatureCard
          title="Pesquisa"
          description="Pesquisas de preços e análises competitivas"
          icon="i-lucide-search"
          color="primary"
          :disabled="disabled"
          :hoverable="hoverable"
          :actions="pesquisaActions"
        />
        <AdsFeatureCard
          title="Simulação"
          description="Simulações de preços e cenários"
          icon="i-lucide-calculator"
          :color="featureColor"
          :disabled="disabled"
          :hoverable="hoverable"
          :actions="simulacaoActions"
        />
      </div>
    </template>

    <template #params>
      <AdsSelect
        v-model="featureColor"
        type="radio"
        label="Cor da pílula (Simulação)"
        block
        :searchable="false"
        :options="featureColorOptions"
      />
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="disabled" label="Em breve" />
        <AdsSwitch v-model="hoverable" label="Hover" />
      </div>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag, joinBlocks } from "../../../utils/code-builder";
import AdsFeatureCard, { type AdsFeatureCardAction, type AdsFeatureCardColor } from "../../../../../app/components/AdsFeatureCard.vue";
import AdsSelect from "../../../../../app/components/AdsSelect.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const featureColor = ref<AdsFeatureCardColor>("success");
const disabled = ref(false);
const hoverable = ref(true);

const pesquisaActions: AdsFeatureCardAction[] = [
  { label: "Histórico", icon: "i-lucide-clock" },
  { label: "Criar", icon: "i-lucide-plus" },
  { label: "Análise", icon: "i-lucide-chart-column" },
];

const simulacaoActions: AdsFeatureCardAction[] = [
  { label: "Histórico", icon: "i-lucide-clock" },
  { label: "Criar", icon: "i-lucide-plus" },
];

const featureColorOptions = [
  { value: "primary", label: "Primary" },
  { value: "success", label: "Success" },
  { value: "attention", label: "Attention" },
  { value: "warning", label: "Warning" },
  { value: "new", label: "New" },
  { value: "blocked", label: "Blocked" },
  { value: "ai", label: "IA" },
];

const pesquisaCode = computed(() =>
  buildTag("AdsFeatureCard", [
    attr(true, "title", "Pesquisa"),
    attr(true, "description", "Pesquisas de preços e análises competitivas"),
    attr(true, "icon", "i-lucide-search"),
    attr(disabled.value, "disabled"),
    attr(!hoverable.value, ":hoverable", "false"),
    attr(
      true,
      ":actions",
      "[{ label: 'Histórico', icon: 'i-lucide-clock' }, { label: 'Criar', icon: 'i-lucide-plus' }, { label: 'Análise', icon: 'i-lucide-chart-column' }]",
    ),
  ]),
);

const simulacaoCode = computed(() =>
  buildTag("AdsFeatureCard", [
    attr(true, "title", "Simulação"),
    attr(true, "description", "Simulações de preços e cenários"),
    attr(true, "icon", "i-lucide-calculator"),
    attr(featureColor.value !== "primary", "color", featureColor.value),
    attr(disabled.value, "disabled"),
    attr(!hoverable.value, ":hoverable", "false"),
    attr(
      true,
      ":actions",
      "[{ label: 'Histórico', icon: 'i-lucide-clock' }, { label: 'Criar', icon: 'i-lucide-plus' }]",
    ),
  ]),
);

const code = computed(() => joinBlocks(pesquisaCode.value, simulacaoCode.value));
</script>
