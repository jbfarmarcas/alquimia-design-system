<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.pill">
    <template #preview>
      <AdsPill :status="pillStatus" :tone="pillTone" :icon="pillIcon ? 'i-lucide-info' : undefined" />
    </template>

    <template #params>
      <div class="grid items-end gap-6 sm:grid-cols-2">
        <AdsFilterSelect
          v-model="pillStatus"
          type="radio"
          label="Status"
          block
          :searchable="false"
          :options="pillStatusOptions"
        />
        <DocsParam label="Tom">
          <AdsSegmentedTabs v-model="pillTone" :items="pillToneItems" aria-label="Tom da pill" />
        </DocsParam>
      </div>
      <AdsSwitch v-model="pillIcon" label="Ícone" />
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsFilterSelect from "../../../../../app/components/AdsFilterSelect.vue";
import AdsPill, { type AdsPillStatus, type AdsPillTone } from "../../../../../app/components/AdsPill.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const pillStatus = ref<AdsPillStatus>("success");
const pillTone = ref<AdsPillTone>("primary");
const pillIcon = ref(false);

const pillStatusOptions = [
  { value: "default", label: "Default" },
  { value: "success", label: "Success" },
  { value: "attention", label: "Attention" },
  { value: "warning", label: "Warning" },
  { value: "new", label: "New" },
  { value: "blocked", label: "Blocked" },
  { value: "innovation", label: "Innovation" },
  { value: "neutral", label: "Neutral" },
];

const pillToneItems = [
  { label: "Primary", value: "primary" },
  { label: "Secondary", value: "secondary" },
];

const code = computed(() =>
  buildTag("AdsPill", [
    attr(pillStatus.value !== "default", "status", pillStatus.value),
    attr(pillTone.value !== "primary", "tone", pillTone.value),
    attr(pillIcon.value, "icon", "i-lucide-info"),
  ]),
);
</script>
