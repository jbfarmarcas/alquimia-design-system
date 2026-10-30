<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.charttip">
    <template #preview>
      <div class="flex h-32 items-end gap-3">
        <AdsCharttip v-for="bar in bars" :key="bar.month" :title="bar.month" :rows="bar.rows" :wing="wing">
          <button
            type="button"
            class="w-8 rounded-t-[var(--ads-radius-xsm)] bg-ads-grafico-c1-400 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]"
            :style="{ height: `${bar.height}%` }"
            :aria-label="`${bar.month}: ${bar.rows[0]?.value} vendas`"
          />
        </AdsCharttip>
      </div>
    </template>

    <template #params>
      <DocsParam label="Lado">
        <AdsSegmentedTabs v-model="wing" :items="wingItems" aria-label="Lado do painel" />
      </DocsParam>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        O painel abre no hover ou no foco de cada barra. As linhas vêm de rows.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag, indent } from "../../../utils/code-builder";
import AdsCharttip from "../../../../../app/components/AdsCharttip.vue";
import type { AdsCharttipRow } from "../../../../../app/components/AdsCharttip.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";

type Wing = "up" | "down" | "left" | "right";

const wing = ref<Wing>("up");

const wingItems = [
  { label: "Cima", value: "up" },
  { label: "Baixo", value: "down" },
  { label: "Esquerda", value: "left" },
  { label: "Direita", value: "right" },
];

const rowsFor = (sales: number, goal: number): AdsCharttipRow[] => [
  { label: "Vendas", value: String(sales), colorClass: "bg-ads-grafico-c1-400" },
  { label: "Meta", value: String(goal), colorClass: "bg-ads-innovation-500" },
];

const bars = [
  { month: "Agosto", height: 55, rows: rowsFor(42, 50) },
  { month: "Setembro", height: 80, rows: rowsFor(61, 55) },
  { month: "Outubro", height: 68, rows: rowsFor(52, 60) },
];

const anchor = buildTag(
  "button",
  [
    attr(true, "type", "button"),
    attr(true, "class", "h-24 w-8 rounded-t-[var(--ads-radius-xsm)] bg-ads-grafico-c1-400"),
    attr(true, "aria-label", "Setembro: 61 vendas"),
  ],
);

const code = computed(() =>
  buildTag(
    "AdsCharttip",
    [attr(true, "title", "Setembro"), attr(true, ":rows", "rows"), attr(wing.value !== "down", "wing", wing.value)],
    indent(anchor),
  ),
);
</script>
