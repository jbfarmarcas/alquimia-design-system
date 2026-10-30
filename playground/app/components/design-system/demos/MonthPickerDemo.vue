<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['month-picker']">
    <template #preview>
      <div class="w-72 max-w-full">
        <AdsMonthPicker v-model="month" />
      </div>
    </template>

    <template #params>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        Sem parâmetros. Escolha um mês na grade para trocar o valor do v-model.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsMonthPicker from "../../../../../app/components/AdsMonthPicker.vue";

const month = ref("2026-10");

const code = computed(() => buildTag("AdsMonthPicker", [attr(true, "v-model", month.value)]));
</script>
