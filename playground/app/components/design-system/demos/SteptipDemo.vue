<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.steptip">
    <template #preview>
      <AdsSteptip :step="Number(step)" title="Filtre os produtos" description="Use os filtros para achar os produtos da sua praça.">
        <AdsButton type="outline" label="Filtros" icon="i-lucide-sliders-horizontal" leading />
      </AdsSteptip>
    </template>

    <template #params>
      <DocsParam label="Passo">
        <AdsSegmentedTabs v-model="step" :items="stepItems" aria-label="Passo atual" />
      </DocsParam>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        O passo abre no hover ou no foco do botão que ele explica.
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
import AdsButton from "../../../../../app/components/AdsButton.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSteptip from "../../../../../app/components/AdsSteptip.vue";

const step = ref("2");

const stepItems = [
  { label: "1 de 3", value: "1" },
  { label: "2 de 3", value: "2" },
  { label: "3 de 3", value: "3" },
];

const anchor = buildTag("AdsButton", [
  attr(true, "type", "outline"),
  attr(true, "label", "Filtros"),
  attr(true, "icon", "i-lucide-sliders-horizontal"),
  attr(true, "leading"),
]);

const code = computed(() =>
  buildTag(
    "AdsSteptip",
    [
      attr(true, ":step", step.value),
      attr(true, "title", "Filtre os produtos"),
      attr(true, "description", "Use os filtros para achar os produtos da sua praça."),
    ],
    indent(anchor),
  ),
);
</script>
