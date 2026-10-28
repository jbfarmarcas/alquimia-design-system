<template>
  <div data-review-demo class="flex flex-col gap-8">
    <div
      data-review-preview
      class="flex min-h-28 flex-wrap items-center gap-6 rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-neutral-100 p-4 sm:p-6"
    >
      <slot name="preview" />
    </div>

    <div class="flex flex-col gap-5">
      <h3 class="text-sm font-bold text-[var(--ads-text-primary)]">Parâmetros</h3>
      <slot name="params" />
    </div>

    <DocsReference :block="{ language, code, apis }" />
  </div>
</template>

<script setup lang="ts">
import DocsReference from "./DocsReference.vue";
import type { DocsApi, DocsBlock } from "./catalog-docs";

defineProps<{
  language: DocsBlock["language"];
  code: string;
  apis: DocsApi[];
}>();
</script>
