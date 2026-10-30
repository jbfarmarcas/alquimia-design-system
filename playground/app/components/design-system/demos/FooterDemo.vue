<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.footer">
    <template #preview>
      <AdsFooter />
    </template>

    <template #params>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        Sem parâmetros. developerLabel troca o texto ao lado da logo.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import AdsFooter from "../../../../../app/components/AdsFooter.vue";

const code = "<AdsFooter />";
</script>
