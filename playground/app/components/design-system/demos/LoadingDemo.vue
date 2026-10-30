<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.loading">
    <template #preview>
      <div v-if="variant === 'spinner'" class="flex w-full min-w-0 items-center justify-center rounded-[var(--ads-radius-md)] bg-white p-4">
        <AdsLoading :size="size" :tone="tone" :region="region" :label="region ? 'Carregando lojas...' : ''" />
      </div>

      <div v-else-if="variant === 'skeleton'" class="w-72 max-w-full rounded-[var(--ads-radius-md)] bg-white p-4">
        <AdsLoading
          variant="skeleton"
          :lines="Number(skeletonLines)"
          :class="Number(skeletonLines) > 0 ? '' : 'h-10 w-full'"
        />
      </div>

      <div v-else class="relative w-72 max-w-full overflow-hidden rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-white p-4">
        <p class="text-sm font-medium text-[var(--ads-text-primary)]">Pesquisa Centro</p>
        <p class="mt-1 text-sm text-[var(--ads-text-secondary)]">Arquivando esta pesquisa.</p>
        <AdsLoading variant="shimmer" class="rounded-[var(--ads-radius-md)]" />
      </div>
    </template>

    <template #params>
      <DocsParam label="Variante">
        <AdsSegmentedTabs v-model="variant" :items="variantItems" aria-label="Variante do loading" />
      </DocsParam>

      <template v-if="variant === 'spinner'">
        <div class="flex flex-wrap items-end gap-x-8 gap-y-5">
          <DocsParam label="Tamanho">
            <AdsSegmentedTabs v-model="size" :items="sizeItems" aria-label="Tamanho do spinner" />
          </DocsParam>
          <DocsParam label="Tom">
            <AdsSegmentedTabs v-model="tone" :items="toneItems" aria-label="Tom do spinner" />
          </DocsParam>
        </div>
        <AdsSwitch v-model="region" label="Seção vazia" />
      </template>

      <DocsParam v-else-if="variant === 'skeleton'" label="Formato">
        <AdsSegmentedTabs v-model="skeletonLines" :items="linesItems" aria-label="Formato do skeleton" />
      </DocsParam>

      <p v-else class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        O pai precisa de relative e overflow-hidden.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsLoading, { type AdsLoadingSize, type AdsLoadingTone } from "../../../../../app/components/AdsLoading.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

type LoadingVariant = "spinner" | "skeleton" | "shimmer";

const variant = ref<LoadingVariant>("spinner");
const size = ref<AdsLoadingSize>("md");
const tone = ref<AdsLoadingTone>("primary");
const region = ref(false);
const skeletonLines = ref("3");

const variantItems = [
  { label: "Spinner", value: "spinner" },
  { label: "Skeleton", value: "skeleton" },
  { label: "Shimmer", value: "shimmer" },
];

const sizeItems = [
  { label: "Pequeno", value: "sm" },
  { label: "Médio", value: "md" },
  { label: "Grande", value: "lg" },
];

const toneItems = [
  { label: "Primário", value: "primary" },
  { label: "Muted", value: "muted" },
];

const linesItems = [
  { label: "Linhas", value: "3" },
  { label: "Bloco", value: "0" },
];

const code = computed(() => {
  if (variant.value === "spinner") {
    return buildTag("AdsLoading", [
      attr(region.value, "region"),
      attr(region.value, "label", "Carregando lojas..."),
      attr(size.value !== "md", "size", size.value),
      attr(tone.value !== "primary", "tone", tone.value),
    ]);
  }

  if (variant.value === "skeleton") {
    const lines = Number(skeletonLines.value);
    return buildTag("AdsLoading", [
      attr(true, "variant", "skeleton"),
      attr(lines > 0, ":lines", String(lines)),
      attr(lines === 0, "class", "h-10 w-full"),
    ]);
  }

  return buildTag("AdsLoading", [attr(true, "variant", "shimmer")]);
});
</script>
