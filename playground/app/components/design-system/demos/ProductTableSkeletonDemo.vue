<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['product-table-skeleton']">
    <template #preview>
      <div class="max-h-64 w-full overflow-hidden rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-white">
        <ProductTableSkeleton :rows="4" />
      </div>
    </template>

    <template #params>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        Sem parâmetros. O esqueleto segue as colunas da tabela.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import DocsDemo from "../DocsDemo.vue";
import ProductTableSkeleton from "../../ProductTableSkeleton.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";

const code = buildTag("ProductTableSkeleton", [attr(true, ":rows", "4")]);
</script>
