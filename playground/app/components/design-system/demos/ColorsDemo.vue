<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.cores">
    <template #preview>
      <ul class="flex w-full flex-wrap gap-x-3 gap-y-4">
        <li v-for="swatch in group?.swatches ?? []" :key="String(swatch.step)" class="w-[4.75rem]">
          <button
            type="button"
            class="block w-full rounded-[var(--ads-radius-sm)] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]"
            :aria-pressed="String(swatch.step) === step"
            @click="step = String(swatch.step)"
          >
            <span
              class="block h-10 rounded-[var(--ads-radius-sm)] ring-1 ring-inset ring-[var(--ads-border-subtle)]"
              :class="[swatch.surface, String(swatch.step) === step ? 'ring-2 ring-[var(--ads-text-brand)]' : '']"
            />
            <span class="mt-1 block text-xs font-medium text-[var(--ads-text-primary)]">{{ swatch.step }}</span>
            <span class="block font-mono text-[10px] uppercase text-[var(--ads-text-secondary)]">{{ swatch.hex }}</span>
          </button>
        </li>
      </ul>
    </template>

    <template #params>
      <div class="grid gap-6 sm:grid-cols-2">
        <AdsFilterSelect
          v-model="groupName"
          type="radio"
          label="Grupo"
          block
          :searchable="false"
          :options="groupOptions"
        />
        <AdsFilterSelect
          v-model="step"
          type="radio"
          label="Passo"
          block
          :searchable="false"
          :options="stepOptions"
        />
      </div>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsFilterSelect from "../../../../../app/components/AdsFilterSelect.vue";
import { adsColorGroups } from "../../../../../app/constants/ads-color-swatches";

const groupOptions = adsColorGroups.map((item) => ({ value: item.name, label: item.name }));
const groupName = ref(adsColorGroups[0]?.name ?? "");

const group = computed(() => adsColorGroups.find((item) => item.name === groupName.value));

const stepOptions = computed(() =>
  (group.value?.swatches ?? []).map((swatch) => ({
    value: String(swatch.step),
    label: String(swatch.step),
  })),
);

const step = ref(stepOptions.value[0]?.value ?? "");

watch(groupName, () => {
  step.value = stepOptions.value[0]?.value ?? "";
});

const selected = computed(() =>
  group.value?.swatches.find((swatch) => String(swatch.step) === step.value),
);

const code = computed(() => {
  if (!selected.value) return "";
  return buildTag("div", [
    attr(true, "class", `${selected.value.surface} h-10 w-10 rounded-sm`),
  ]);
});
</script>
