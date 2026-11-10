<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.pill">
    <template #preview>
      <div class="flex flex-wrap items-center gap-4">
        <AdsPill
          v-if="pillVariant === 'broadcast'"
          variant="broadcast"
          :status="broadcastStatus"
        />
        <AdsPill
          v-else
          :status="pillStatus"
          :tone="pillTone"
          :size="pillSize"
          :icon="pillIcon ? 'i-lucide-info' : undefined"
          :trailing-icon="pillTrailingIcon ? 'i-lucide-chevron-down' : undefined"
        />
      </div>
    </template>

    <template #params>
      <DocsParam label="Variante">
        <AdsSegmentedTabs v-model="pillVariant" :items="variantItems" aria-label="Variante da pill" />
      </DocsParam>

      <DocsParam v-if="pillVariant === 'broadcast'" label="Status">
        <AdsSegmentedTabs v-model="broadcastStatus" :items="broadcastStatusItems" aria-label="Status do broadcast" />
      </DocsParam>

      <template v-else>
      <div class="grid items-end gap-6 sm:grid-cols-3">
        <AdsSelect
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
        <DocsParam label="Tamanho">
          <AdsSegmentedTabs v-model="pillSize" :items="pillSizeItems" aria-label="Tamanho da pill" />
        </DocsParam>
      </div>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="pillIcon" label="Ícone à esquerda" />
        <AdsSwitch v-model="pillTrailingIcon" label="Ícone à direita" />
      </div>

      <!-- Grade de tamanhos -->
      <div class="mt-2 flex flex-col gap-3">
        <p class="text-sm font-bold text-[var(--ads-text-primary)]">Tamanhos</p>
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex flex-col items-center gap-1">
            <AdsPill size="md" status="success" label="md · 24px" />
            <span class="text-[length:var(--ads-font-size-xxxs)] text-[var(--ads-text-tertiary)]">md (Pill)</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <AdsPill size="sm" status="success" label="sm · 18px" />
            <span class="text-[length:var(--ads-font-size-xxxs)] text-[var(--ads-text-tertiary)]">sm (Small Pill)</span>
          </div>
        </div>
      </div>
      </template>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsSelect from "../../../../../app/components/AdsSelect.vue";
import AdsPill, { type AdsPillSize, type AdsPillStatus, type AdsPillTone, type AdsPillVariant } from "../../../../../app/components/AdsPill.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const pillVariant = ref<AdsPillVariant>("default");
const broadcastStatus = ref<"warning" | "success">("warning");
const pillStatus = ref<AdsPillStatus>("success");

const variantItems = [
  { label: "Padrão", value: "default" },
  { label: "Broadcast", value: "broadcast" },
];

const broadcastStatusItems = [
  { label: "Warning", value: "warning" },
  { label: "Success", value: "success" },
];
const pillTone = ref<AdsPillTone>("primary");
const pillSize = ref<AdsPillSize>("md");
const pillIcon = ref(false);
const pillTrailingIcon = ref(false);

const pillStatusOptions = [
  { value: "default", label: "Default" },
  { value: "success", label: "Success" },
  { value: "attention", label: "Attention" },
  { value: "warning", label: "Warning" },
  { value: "new", label: "New" },
  { value: "blocked", label: "Blocked" },
];

const pillToneItems = [
  { label: "Primary", value: "primary" },
  { label: "Secondary", value: "secondary" },
];

const pillSizeItems = [
  { label: "md", value: "md" },
  { label: "sm", value: "sm" },
];

const code = computed(() =>
  pillVariant.value === "broadcast"
    ? buildTag("AdsPill", [attr(true, "variant", "broadcast"), attr(true, "status", broadcastStatus.value)])
    : buildTag("AdsPill", [
    attr(pillStatus.value !== "default", "status", pillStatus.value),
    attr(pillTone.value !== "primary", "tone", pillTone.value),
    attr(pillSize.value !== "md", "size", pillSize.value),
    attr(pillIcon.value, "icon", "i-lucide-info"),
    attr(pillTrailingIcon.value, "trailing-icon", "i-lucide-chevron-down"),
  ]),
);
</script>
