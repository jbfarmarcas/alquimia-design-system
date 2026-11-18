<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.card">
    <template #preview>
      <div class="flex w-full max-w-xl flex-col gap-6">
        <AdsCard
          v-if="type === 'details'"
          class="w-[320px] max-w-full"
          type="details"
          title="Pesquisa de preços"
          hint="Dados gerais da pesquisa."
          :rows="detailRows"
          :padding="cardPadding"
          :variant="variant"
          :selected="selected"
          :description="selected ? SELECTED_TEXT : undefined"
          :loading="state === 'loading'"
          :empty="state === 'empty'"
          empty-description="Esta pesquisa ainda não tem informações."
        />
        <AdsCard
          v-else-if="selected"
          class="w-[320px] max-w-full"
          :padding="cardPadding"
          :variant="variant"
          selected
          title="Notabilidade de imagem"
          :description="SELECTED_TEXT"
        />
        <AdsCard
          v-else
          class="w-full"
          title="Vendas por dia"
          hint="Total vendido em cada dia do período."
          :period="variant === 'line' ? undefined : '01/12/2023 - 20/12/2023'"
          :padding="cardPadding"
          :variant="variant"
          :loading="state === 'loading'"
          :empty="state === 'empty'"
          empty-description="Ajuste o período ou os filtros para ver as vendas."
        >
          <div v-if="variant === 'line'" class="text-[length:var(--ads-font-size-xxs)] text-[var(--ads-text-secondary)]">
            Drogasil • Centro
          </div>
          <div v-else class="flex h-[200px] items-center justify-center rounded-[var(--ads-radius-sm)] border border-dashed border-[var(--ads-border-subtle)] bg-[var(--ads-surface-main)]">
            <p class="text-[length:var(--ads-font-size-xxs)] text-[var(--ads-text-tertiary)]">Conteúdo do card (gráfico, tabela…)</p>
          </div>
        </AdsCard>

        <AdsCardPeriod label="Período:" value="01/12/2023 - 20/12/2023" />

        <AdsCard title="Categorias" padding="relaxed">
          <AdsTable :data="categoryRows" :columns="categoryColumns" :framed="false" />
        </AdsCard>
      </div>
    </template>

    <template #params>
      <DocsParam label="Tipo">
        <AdsSegmentedTabs v-model="type" :items="typeItems" aria-label="Tipo do card" />
      </DocsParam>
      <DocsParam label="Estado">
        <AdsSegmentedTabs v-model="state" :items="stateItems" aria-label="Estado do card" />
      </DocsParam>
      <DocsParam label="Padding">
        <AdsSegmentedTabs v-model="cardPadding" :items="paddingItems" aria-label="Padding do card" />
      </DocsParam>
      <DocsParam label="Casca">
        <AdsSegmentedTabs v-model="variant" :items="variantItems" aria-label="Casca do card" />
      </DocsParam>
      <AdsSwitch v-model="selected" label="Selecionado" />
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { TableColumn } from "@nuxt/ui";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildSfc, buildTag, indent, toLiteral } from "../../../utils/code-builder";
import AdsCard, { type AdsCardPadding, type AdsCardVariant } from "../../../../../app/components/AdsCard.vue";
import AdsCardPeriod from "../../../../../app/components/AdsCardPeriod.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";
import AdsTable from "../../../../../app/components/AdsTable.vue";

const SELECTED_TEXT = "A loja está acima da média da praça neste indicador.";

const type = ref<"container" | "details">("container");
const state = ref<"default" | "loading" | "empty">("default");
const cardPadding = ref<AdsCardPadding>("default");
const variant = ref<AdsCardVariant>("box");
const selected = ref(false);

const categoryRows = [
  { name: "Genéricos", share: "32%" },
  { name: "Similares", share: "18%" },
];

const categoryColumns: TableColumn<(typeof categoryRows)[number]>[] = [
  { accessorKey: "name", header: "Categoria" },
  { accessorKey: "share", header: "Participação" },
];

const typeItems = [
  { label: "Container", value: "container" },
  { label: "Detalhes", value: "details" },
];

const stateItems = [
  { label: "Padrão", value: "default" },
  { label: "Carregando", value: "loading" },
  { label: "Vazio", value: "empty" },
];

const paddingItems = [
  { label: "Padrão", value: "default" },
  { label: "Compacto", value: "compact" },
  { label: "Relaxado", value: "relaxed" },
];

const variantItems = [
  { label: "Caixa", value: "box" },
  { label: "Linha", value: "line" },
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
  const shared = [
    attr(cardPadding.value !== "default", "padding", cardPadding.value),
    attr(variant.value !== "box", "variant", variant.value),
    attr(selected.value, "selected"),
    attr(selected.value, "description", SELECTED_TEXT),
  ];
  if (selected.value && type.value !== "details") {
    return buildTag("AdsCard", [
      attr(true, "title", "Notabilidade de imagem"),
      ...shared,
    ]);
  }
  if (type.value === "details") {
    return buildSfc(
      `const rows = ${toLiteral(detailRows)};`,
      buildTag("AdsCard", [
        attr(true, "type", "details"),
        attr(true, "title", "Pesquisa de preços"),
        attr(true, "hint", "Dados gerais da pesquisa."),
        attr(true, ":rows", "rows"),
        ...shared,
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
      attr(variant.value !== "line", "period", "01/12/2023 - 20/12/2023"),
      ...shared,
      attr(loading, "loading"),
      attr(empty, "empty"),
      attr(empty, "empty-description", "Ajuste o período ou os filtros para ver as vendas."),
    ],
    indent("<!-- gráfico, tabela ou lista -->"),
  );
});
</script>
