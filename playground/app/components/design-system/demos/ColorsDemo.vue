<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.cores">
    <template #preview>
      <div class="flex w-full flex-col gap-8">
        <section v-for="group in adsColorGroups" :key="group.name" :aria-label="group.name">
          <h3 class="mb-3 text-sm leading-[1.3] font-bold text-[var(--ads-text-primary)]">{{ group.name }}</h3>
          <ul class="flex w-full flex-wrap gap-x-3 gap-y-4">
            <li v-for="swatch in group.swatches" :key="String(swatch.step)" class="w-[4.75rem]">
              <button
                type="button"
                class="block w-full rounded-[var(--ads-radius-sm)] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]"
                :aria-pressed="isSelected(group.name, swatch.step)"
                :aria-label="`${group.name} ${swatch.step}, ${swatch.hex}`"
                @click="select(group.name, swatch.step)"
              >
                <span
                  class="block h-10 rounded-[var(--ads-radius-sm)] ring-1 ring-inset ring-[var(--ads-border-subtle)]"
                  :class="[swatch.surface, isSelected(group.name, swatch.step) ? 'ring-2 ring-[var(--ads-text-brand)]' : '']"
                />
                <span class="mt-1 block text-xs font-medium text-[var(--ads-text-primary)]">{{ swatch.step }}</span>
                <span class="block font-mono text-[10px] uppercase text-[var(--ads-text-secondary)]">{{ swatch.hex }}</span>
                <span class="block break-all font-mono text-[10px] text-[var(--ads-text-secondary)]">{{ swatch.surface }}</span>
              </button>
            </li>
          </ul>
        </section>
      </div>
    </template>

    <template #params>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        Todas as escalas aparecem acima. Clique numa cor para ver o código.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import { adsColorGroups } from "../../../../../app/constants/ads-color-swatches";

const groupName = ref(adsColorGroups[0]?.name ?? "");
const step = ref(String(adsColorGroups[0]?.swatches[0]?.step ?? ""));

function isSelected(name: string, swatchStep: string | number) {
  return groupName.value === name && step.value === String(swatchStep);
}

function select(name: string, swatchStep: string | number) {
  groupName.value = name;
  step.value = String(swatchStep);
}

const selected = computed(() =>
  adsColorGroups
    .find((item) => item.name === groupName.value)
    ?.swatches.find((swatch) => String(swatch.step) === step.value),
);

const code = computed(() => {
  if (!selected.value) return "";
  return buildTag("div", [
    attr(true, "class", `${selected.value.surface} h-10 w-10 rounded-sm`),
    // Também disponíveis: selected.value.text e selected.value.border.
  ]);
});
</script>
