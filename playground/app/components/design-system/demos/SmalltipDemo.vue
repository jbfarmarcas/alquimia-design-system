<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.smalltip">
    <template #preview>
      <div class="flex items-center gap-1 text-sm text-[var(--ads-text-primary)]">
        <span>Preço médio</span>
        <AdsSmalltip :text="text">
          <button
            type="button"
            class="inline-flex rounded-full text-[var(--ads-text-tertiary)] hover:text-[var(--ads-text-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]"
            aria-label="Sobre o preço médio"
          >
            <UIcon name="i-lucide-info" class="size-4" />
          </button>
        </AdsSmalltip>
      </div>
    </template>

    <template #params>
      <DocsParam label="Texto">
        <AdsSegmentedTabs v-model="text" :items="textItems" aria-label="Texto da dica" />
      </DocsParam>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        A dica abre no hover ou no foco do ícone.
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
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSmalltip from "../../../../../app/components/AdsSmalltip.vue";

const DEFAULT_TEXT = "Clique para ver mais";

const text = ref(DEFAULT_TEXT);

const textItems = [
  { label: "Padrão", value: DEFAULT_TEXT },
  { label: "Curto", value: "Média da praça" },
];

const anchor = buildTag(
  "button",
  [attr(true, "type", "button"), attr(true, "aria-label", "Sobre o preço médio")],
  indent('<UIcon name="i-lucide-info" class="size-4" />'),
);

const code = computed(() =>
  buildTag("AdsSmalltip", [attr(text.value !== DEFAULT_TEXT, "text", text.value)], indent(anchor)),
);
</script>
