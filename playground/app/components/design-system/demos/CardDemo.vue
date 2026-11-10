<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.card">
    <template #preview>
      <AdsCard
        v-if="type === 'details'"
        class="w-[320px] max-w-full"
        type="details"
        title="Pesquisa de preços"
        hint="Dados gerais da pesquisa."
        :rows="detailRows"
        :loading="state === 'loading'"
        :empty="state === 'empty'"
        empty-description="Esta pesquisa ainda não tem informações."
      />
      <AdsCard
        v-else
        class="w-[480px] max-w-full"
        title="Vendas por dia"
        hint="Total vendido em cada dia do período."
        period="01/12/2023 - 20/12/2023"
        :loading="state === 'loading'"
        :empty="state === 'empty'"
        empty-description="Ajuste o período ou os filtros para ver as vendas."
      >
        <div class="flex h-[200px] items-center justify-center rounded-[var(--ads-radius-sm)] border border-dashed border-[var(--ads-border-subtle)] bg-[var(--ads-surface-main)]">
          <p class="text-[length:var(--ads-font-size-xxs)] text-[var(--ads-text-tertiary)]">Conteúdo do card (gráfico, tabela…)</p>
        </div>
      </AdsCard>
    </template>

    <template #params>
      <DocsParam label="Tipo">
        <AdsSegmentedTabs v-model="type" :items="typeItems" aria-label="Tipo do card" />
      </DocsParam>
      <DocsParam label="Estado">
        <AdsSegmentedTabs v-model="state" :items="stateItems" aria-label="Estado do card" />
      </DocsParam>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildSfc, buildTag, indent, toLiteral } from "../../../utils/code-builder";
import AdsCard from "../../../../../app/components/AdsCard.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";

const type = ref<"container" | "details">("container");
const state = ref<"default" | "loading" | "empty">("default");

const typeItems = [
  { label: "Container", value: "container" },
  { label: "Detalhes", value: "details" },
];

const stateItems = [
  { label: "Padrão", value: "default" },
  { label: "Carregando", value: "loading" },
  { label: "Vazio", value: "empty" },
];

const detailRows = [
  { icon: "i-lucide-list-checks", label: "Quantidade:", value: "10 perguntas" },
  { icon: "i-lucide-trophy", label: "Máxima pontuação possível:", value: "25 pontos" },
  { icon: "i-lucide-calendar", label: "Criado em:", value: "01/08/2023" },
  { icon: "i-lucide-calendar", label: "Atualizado em:", value: "01/08/2023" },
  { icon: "i-lucide-calendar-check", label: "Realizado pela última vez em:", value: "01/08/2023" },
];

const code = computed(() => {
  const loading = state.value === "loading";
  const empty = state.value === "empty";
  if (type.value === "details") {
    return buildSfc(
      `const rows = ${toLiteral(detailRows)};`,
      buildTag("AdsCard", [
        attr(true, "type", "details"),
        attr(true, "title", "Pesquisa de preços"),
        attr(true, "hint", "Dados gerais da pesquisa."),
        attr(true, ":rows", "rows"),
        attr(loading, "loading"),
        attr(empty, "empty"),
        attr(empty, "empty-description", "Esta pesquisa ainda não tem informações."),
      ]),
    );
  }
  return buildTag(
    "AdsCard",
    [
      attr(true, "title", "Vendas por dia"),
      attr(true, "hint", "Total vendido em cada dia do período."),
      attr(true, "period", "01/12/2023 - 20/12/2023"),
      attr(loading, "loading"),
      attr(empty, "empty"),
      attr(empty, "empty-description", "Ajuste o período ou os filtros para ver as vendas."),
    ],
    indent("<!-- gráfico, tabela ou lista -->"),
  );
});
</script>
