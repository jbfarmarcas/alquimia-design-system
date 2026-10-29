<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.card">
    <template #preview>
      <AdsFeatureCard
        v-if="component === 'feature'"
        title="Simulação"
        description="Simulações de preços e cenários."
        icon="i-lucide-calculator"
        :color="featureColor"
        :disabled="disabled"
        :footer-text="footerOn ? 'Atualizada hoje' : undefined"
      />

      <AdsCard
        v-else-if="component === 'conteudo'"
        class="w-72 max-w-full"
        title="Pesquisa 14/09"
        description="12 lojas, 3 concorrentes, coleta até 30/10."
        footer-text="Atualizada hoje"
        :as="asButton ? 'button' : 'div'"
        :selected="selected"
      />

      <AdsMetricCard
        v-else
        class="w-72 max-w-full"
        title="Receita simulada"
        hint="Receita mensal com base na média de unidades vendidas e no preço final."
        :value="empty ? 'Sem dados de pesquisa' : 'R$ 7.392.864,08'"
        :caption="empty ? undefined : 'Atual: R$ 7.570.494,28'"
        :empty="empty"
        :selected="selected"
      >
        <template v-if="!empty" #delta>
          <span class="text-error">-2,3%</span>
        </template>
      </AdsMetricCard>
    </template>

    <template #params>
      <DocsParam label="Componente">
        <AdsSegmentedTabs v-model="component" :items="componentItems" aria-label="Componente de card" />
      </DocsParam>

      <template v-if="component === 'feature'">
        <AdsFilterSelect
          v-model="featureColor"
          type="radio"
          label="Cor do ícone"
          block
          :searchable="false"
          :options="featureColorOptions"
        />
        <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
          <AdsSwitch v-model="disabled" label="Em breve" />
          <AdsSwitch v-model="footerOn" label="Rodapé" />
        </div>
      </template>

      <template v-else-if="component === 'conteudo'">
        <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
          <AdsSwitch v-model="asButton" label="Ação (botão)" />
          <AdsSwitch v-model="selected" label="Selecionado" />
        </div>
      </template>

      <template v-else>
        <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
          <AdsSwitch v-model="empty" label="Sem valor" />
          <AdsSwitch v-model="selected" label="Selecionado" />
        </div>
      </template>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag, indent } from "../../../utils/code-builder";
import AdsCard from "../../../../../app/components/AdsCard.vue";
import AdsFeatureCard, { type AdsFeatureCardColor } from "../../../../../app/components/AdsFeatureCard.vue";
import AdsFilterSelect from "../../../../../app/components/AdsFilterSelect.vue";
import AdsMetricCard from "../../../../../app/components/AdsMetricCard.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

type CardComponent = "feature" | "conteudo" | "metrica";

const component = ref<CardComponent>("feature");
const featureColor = ref<AdsFeatureCardColor>("success");
const disabled = ref(false);
const footerOn = ref(true);
const asButton = ref(false);
const selected = ref(false);
const empty = ref(false);

const componentItems = [
  { label: "Feature", value: "feature" },
  { label: "Conteúdo", value: "conteudo" },
  { label: "Métrica", value: "metrica" },
];

const featureColorOptions = [
  { value: "primary", label: "Primary" },
  { value: "success", label: "Success" },
  { value: "attention", label: "Attention" },
  { value: "warning", label: "Warning" },
  { value: "new", label: "New" },
  { value: "blocked", label: "Blocked" },
  { value: "innovation", label: "Innovation" },
];

const deltaSlot = '<template #delta>\n  <span class="text-error">-2,3%</span>\n</template>';

const code = computed(() => {
  if (component.value === "feature") {
    return buildTag("AdsFeatureCard", [
      attr(true, "title", "Simulação"),
      attr(true, "description", "Simulações de preços e cenários."),
      attr(true, "icon", "i-lucide-calculator"),
      attr(featureColor.value !== "primary", "color", featureColor.value),
      attr(disabled.value, "disabled"),
      attr(footerOn.value, "footer-text", "Atualizada hoje"),
    ]);
  }

  if (component.value === "conteudo") {
    return buildTag("AdsCard", [
      attr(true, "title", "Pesquisa 14/09"),
      attr(true, "description", "12 lojas, 3 concorrentes, coleta até 30/10."),
      attr(true, "footer-text", "Atualizada hoje"),
      attr(asButton.value, "as", "button"),
      attr(selected.value, "selected"),
    ]);
  }

  return buildTag(
    "AdsMetricCard",
    [
      attr(true, "title", "Receita simulada"),
      attr(true, "hint", "Receita mensal com base na média de unidades vendidas e no preço final."),
      attr(true, "value", empty.value ? "Sem dados de pesquisa" : "R$ 7.392.864,08"),
      attr(!empty.value, "caption", "Atual: R$ 7.570.494,28"),
      attr(empty.value, "empty"),
      attr(selected.value, "selected"),
    ],
    empty.value ? undefined : indent(deltaSlot),
  );
});
</script>
