<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.tooltip">
    <template #preview>
      <AdsTooltip
        :wing="wing"
        title="Título"
        description="Texto de apoio do tooltip, em branco."
        :show-title="titleOn"
        :show-description="descriptionOn"
      >
        <AdsButton type="outline" label="Passe o mouse" />
      </AdsTooltip>
    </template>

    <template #params>
      <DocsParam label="Seta">
        <AdsSegmentedTabs v-model="wing" :items="wingItems" aria-label="Lado da seta" />
      </DocsParam>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="titleOn" label="Título" />
        <AdsSwitch v-model="descriptionOn" label="Descrição" />
      </div>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        O balão abre no hover ou no foco do botão.
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
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";
import AdsTooltip from "../../../../../app/components/AdsTooltip.vue";

type Wing = "up" | "down" | "left" | "right";

const wing = ref<Wing>("up");
const titleOn = ref(true);
const descriptionOn = ref(true);

const wingItems = [
  { label: "Cima", value: "up" },
  { label: "Baixo", value: "down" },
  { label: "Esquerda", value: "left" },
  { label: "Direita", value: "right" },
];

const anchor = buildTag("AdsButton", [attr(true, "type", "outline"), attr(true, "label", "Passe o mouse")]);

const code = computed(() =>
  buildTag(
    "AdsTooltip",
    [
      attr(wing.value !== "up", "wing", wing.value),
      attr(true, "title", "Título"),
      attr(true, "description", "Texto de apoio do tooltip, em branco."),
      attr(!titleOn.value, ":show-title", "false"),
      attr(!descriptionOn.value, ":show-description", "false"),
    ],
    indent(anchor),
  ),
);
</script>
