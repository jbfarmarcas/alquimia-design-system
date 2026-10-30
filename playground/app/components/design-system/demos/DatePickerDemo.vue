<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['date-picker']">
    <template #preview>
      <div class="w-72 max-w-full">
        <AdsDatePicker v-if="!rangeOn" v-model="date" class="w-full" />
        <AdsDatePicker v-else v-model:start="rangeStart" v-model:end="rangeEnd" range class="w-full" />
      </div>
    </template>

    <template #params>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="rangeOn" label="Período" />
      </div>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsDatePicker from "../../../../../app/components/AdsDatePicker.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const rangeOn = ref(false);
const date = ref("");
const rangeStart = ref("");
const rangeEnd = ref("");

const code = computed(() =>
  buildTag(
    "AdsDatePicker",
    rangeOn.value
      ? [attr(true, "v-model:start", "rangeStart"), attr(true, "v-model:end", "rangeEnd"), attr(true, "range")]
      : [attr(true, "v-model", "date")],
  ),
);
</script>
