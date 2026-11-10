<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.badge">
    <template #preview>
      <AdsBadge :color="badgeColor" :mini="badgeMini" />
    </template>

    <template #params>
      <AdsSelect
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
import AdsSelect from "../../../../../app/components/AdsSelect.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const badgeColor = ref<AdsBadgeColor>("primary");
const badgeMini = ref(false);

// Nota: "color" é uma prop só no código — o Figma tem só Context (Secondary, Notifications).
const badgeColorOptions = [
  { value: "primary", label: "Primary" },
  { value: "success", label: "Success" },
  { value: "attention", label: "Attention" },
  { value: "warning", label: "Warning" },
  { value: "new", label: "New" },
  { value: "blocked", label: "Blocked" },
];

const code = computed(() =>
  buildTag("AdsBadge", [attr(badgeColor.value !== (badgeMini.value ? "new" : "primary"), "color", badgeColor.value), attr(badgeMini.value, "mini")]),
);
</script>
