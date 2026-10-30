<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.badge">
    <template #preview>
      <AdsBadge :color="badgeColor" :mini="badgeMini" />
    </template>

    <template #params>
      <AdsFilterSelect
        v-model="badgeColor"
        type="radio"
        label="Cor"
        block
        :searchable="false"
        :options="badgeColorOptions"
      />
      <AdsSwitch v-model="badgeMini" label="Mini (ponto)" />
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsBadge, { type AdsBadgeColor } from "../../../../../app/components/AdsBadge.vue";
import AdsFilterSelect from "../../../../../app/components/AdsFilterSelect.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const badgeColor = ref<AdsBadgeColor>("primary");
const badgeMini = ref(false);

const badgeColorOptions = [
  { value: "primary", label: "Primary" },
  { value: "success", label: "Success" },
  { value: "attention", label: "Attention" },
  { value: "warning", label: "Warning" },
  { value: "new", label: "New" },
  { value: "innovation", label: "Innovation" },
  { value: "blocked", label: "Blocked" },
];

const code = computed(() =>
  buildTag("AdsBadge", [attr(badgeColor.value !== "primary", "color", badgeColor.value), attr(badgeMini.value, "mini")]),
);
</script>
