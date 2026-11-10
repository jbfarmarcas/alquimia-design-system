<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.loading">
    <template #preview>
      <div v-if="variant === 'spinner' || variant === 'logo'" class="flex w-full min-w-0 items-center justify-center rounded-[var(--ads-radius-md)] bg-white p-8">
        <AdsLoading :variant="variant" :size="size" :tone="tone" :region="region" :label="labelText" />
      </div>

      <div v-else-if="variant === 'skeleton'" class="w-[272px] max-w-full rounded-[var(--ads-radius-md)] bg-white p-4">
        <AdsLoading
          variant="skeleton"
          :size="size"
          :tone="tone"
          :lines="Number(skeletonLines)"
          :class="Number(skeletonLines) > 0 ? '' : 'h-10 w-full'"
        />
      </div>

      <div v-else-if="!overlay" class="w-[272px] max-w-full rounded-[var(--ads-radius-md)] bg-white p-4">
        <AdsLoading variant="shimmer" :size="size" :tone="tone" />
      </div>

      <div v-else class="relative w-72 max-w-full overflow-hidden rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-white p-4">
        <p class="text-sm font-medium text-[var(--ads-text-primary)]">Pesquisa Centro</p>
        <p class="mt-1 text-sm text-[var(--ads-text-secondary)]">Arquivando esta pesquisa.</p>
        <AdsLoading variant="shimmer" overlay />
      </div>
    </template>

    <template #params>
      <DocsParam label="Variante">
        <AdsSegmentedTabs v-model="variant" :items="variantItems" aria-label="Variante do loading" />
      </DocsParam>

      <div v-if="!(variant === 'shimmer' && overlay)" class="flex flex-wrap items-end gap-x-8 gap-y-5">
        <DocsParam label="Tamanho">
          <AdsSegmentedTabs v-model="size" :items="sizeItems" aria-label="Tamanho" />
        </DocsParam>
        <DocsParam label="Tom">
          <AdsSegmentedTabs v-model="tone" :items="toneItems" aria-label="Tom" />
        </DocsParam>
        <DocsParam v-if="variant === 'skeleton'" label="Formato">
          <AdsSegmentedTabs v-model="skeletonLines" :items="linesItems" aria-label="Formato do skeleton" />
        </DocsParam>
      </div>

      <div v-if="variant === 'spinner' || variant === 'logo'" class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="showLabel" label="Rótulo" />
        <AdsSwitch v-model="region" label="Seção vazia (só no código)" />
      </div>

      <template v-else-if="variant === 'shimmer'">
        <AdsSwitch v-model="overlay" label="Sobre o conteúdo (só no código)" />
        <p v-if="overlay" class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
          Com <code>overlay</code>, só o brilho aparece. O pai precisa de <code>relative</code> e <code>overflow-hidden</code>.
        </p>
      </template>

      <p v-else class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        <strong>lines</strong> (só no código): o Figma define 3 linhas fixas.
        Passe <code>:lines="0"</code> e uma class de altura para o bloco único.
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
import AdsLoading, { type AdsLoadingSize, type AdsLoadingTone, type AdsLoadingVariant } from "../../../../../app/components/AdsLoading.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const variant = ref<AdsLoadingVariant>("spinner");
const size = ref<AdsLoadingSize>("md");
const tone = ref<AdsLoadingTone>("primary");
const region = ref(false);
const showLabel = ref(false);
const overlay = ref(false);
const skeletonLines = ref("3");

const labelText = computed(() => (showLabel.value ? "Carregando…" : ""));

const variantItems = [
  { label: "Spinner", value: "spinner" },
  { label: "Skeleton", value: "skeleton" },
  { label: "Shimmer", value: "shimmer" },
  { label: "Logo", value: "logo" },
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
  { label: "3 linhas", value: "3" },
  { label: "Bloco", value: "0" },
];

const code = computed(() => {
  if (variant.value === "shimmer" && overlay.value) {
    return buildTag("AdsLoading", [attr(true, "variant", "shimmer"), attr(true, "overlay")]);
  }

  const lines = Number(skeletonLines.value);
  const isSkeleton = variant.value === "skeleton";
  const withLabel = variant.value === "spinner" || variant.value === "logo";

  return buildTag("AdsLoading", [
    attr(variant.value !== "spinner", "variant", variant.value),
    attr(size.value !== "md", "size", size.value),
    attr(tone.value !== "primary", "tone", tone.value),
    attr(withLabel && showLabel.value, "label", labelText.value),
    attr(withLabel && region.value, "region"),
    attr(isSkeleton && lines !== 3, ":lines", String(lines)),
    attr(isSkeleton && lines === 0, "class", "h-10 w-full"),
  ]);
});
</script>
