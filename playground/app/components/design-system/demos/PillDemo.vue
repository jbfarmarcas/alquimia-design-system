<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.pill">
    <template #preview>
      <div class="flex flex-wrap items-center gap-4">
        <AdsPill
          v-if="broadcast"
          broadcast
          :color="broadcastColor"
          label="LIVE"
        />
        <AdsPill
          v-else-if="pillVariant === 'text'"
          variant="text"
          :color="pillColor"
          label="12 lojas · 4 concorrentes · 86 produtos"
          :icon="pillIcon ? 'i-lucide-store' : undefined"
        />
        <AdsPill
          v-else
          :variant="pillVariant"
          :color="pillColor"
          :size="pillSize"
          :icon="pillIcon ? 'i-lucide-info' : undefined"
          :trailing-icon="pillTrailingIcon ? 'i-lucide-chevron-down' : undefined"
        />
      </div>
    </template>

    <template #params>
      <div class="flex flex-col gap-4">
        <DocsParam v-if="broadcast" label="Cor">
          <AdsSegmentedTabs v-model="broadcastColor" :items="broadcastColorItems" aria-label="Cor do broadcast" />
        </DocsParam>
        <div v-else class="w-48">
          <AdsSelect
            v-model="pillColor"
            type="radio"
            label="Cor"
            block
            :searchable="false"
            :options="pillColorOptions"
          />
        </div>

        <div class="flex flex-wrap items-end gap-x-6 gap-y-3">
          <DocsParam label="Variante">
            <AdsSegmentedTabs v-model="pillVariant" :items="variantItems" aria-label="Variante da pill" />
          </DocsParam>
          <DocsParam v-if="!broadcast && pillVariant !== 'text'" label="Tamanho">
            <AdsSegmentedTabs v-model="pillSize" :items="pillSizeItems" aria-label="Tamanho da pill" />
          </DocsParam>
        </div>

        <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
          <AdsSwitch v-model="broadcast" label="Broadcast" />
          <AdsSwitch v-if="!broadcast" v-model="pillIcon" label="Ícone à esquerda" />
          <AdsSwitch v-if="!broadcast && pillVariant !== 'text'" v-model="pillTrailingIcon" label="Ícone à direita" />
        </div>
      </div>
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
import AdsPill, { type AdsPillColor, type AdsPillSize, type AdsPillVariant } from "../../../../../app/components/AdsPill.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const pillVariant = ref<AdsPillVariant>("default");
const broadcast = ref(false);
const broadcastColor = ref<"warning" | "success">("warning");
const pillColor = ref<AdsPillColor>("success");

const variantItems = [
  { label: "Padrão", value: "default" },
  { label: "Suave", value: "soft" },
  { label: "Texto", value: "text" },
];

const broadcastColorItems = [
  { label: "Warning", value: "warning" },
  { label: "Success", value: "success" },
];
const pillSize = ref<AdsPillSize>("md");
const pillIcon = ref(false);
const pillTrailingIcon = ref(false);

const pillColorOptions: { value: AdsPillColor; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "success", label: "Success" },
  { value: "attention", label: "Attention" },
  { value: "warning", label: "Warning" },
  { value: "new", label: "New" },
  { value: "blocked", label: "Blocked" },
];

const pillSizeItems = [
  { label: "md", value: "md" },
  { label: "sm", value: "sm" },
];

const code = computed(() =>
  broadcast.value
    ? buildTag("AdsPill", [attr(true, "broadcast"), attr(true, "color", broadcastColor.value), attr(true, "label", "LIVE")])
    : pillVariant.value === "text"
    ? buildTag("AdsPill", [
      attr(true, "variant", "text"),
      attr(pillColor.value !== "default", "color", pillColor.value),
      attr(true, "label", "12 lojas · 4 concorrentes · 86 produtos"),
      attr(pillIcon.value, "icon", "i-lucide-store"),
    ])
    : buildTag("AdsPill", [
    attr(pillVariant.value !== "default", "variant", pillVariant.value),
    attr(pillColor.value !== "default", "color", pillColor.value),
    attr(pillSize.value !== "md", "size", pillSize.value),
    attr(pillIcon.value, "icon", "i-lucide-info"),
    attr(pillTrailingIcon.value, "trailing-icon", "i-lucide-chevron-down"),
  ]),
);
</script>
