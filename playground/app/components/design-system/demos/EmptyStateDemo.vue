<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['empty-state']">
    <template #preview>
      <AdsEmptyState :small="emptySmall" :show-actions="actionsOn" />
    </template>

    <template #params>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="emptySmall" label="Small" />
        <AdsSwitch v-model="actionsOn" label="Ações" />
      </div>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsEmptyState from "../../../../../app/components/AdsEmptyState.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const emptySmall = ref(false);
const actionsOn = ref(true);

const code = computed(() =>
  buildTag("AdsEmptyState", [attr(emptySmall.value, "small"), attr(!actionsOn.value, ":show-actions", "false")]),
);
</script>
