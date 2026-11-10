<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['dropdown-menu']">
    <template #preview>
      <AdsDropdownMenu :items="items">
        <UButton trailing-icon="i-lucide-chevron-down" color="neutral" variant="outline">
          Ações
        </UButton>
      </AdsDropdownMenu>
    </template>

    <template #params>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        Para escolher valores, use o <strong>AdsSelect</strong> em Campos.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsDropdownMenu from "../../../../../app/components/AdsDropdownMenu.vue";

const items = [
  [
    { label: "Editar", icon: "i-lucide-pencil", onSelect: () => {} },
    { label: "Duplicar", icon: "i-lucide-copy", onSelect: () => {} },
  ],
  [{ label: "Excluir", icon: "i-lucide-trash-2", color: "error" as const, onSelect: () => {} }],
];

const code = buildTag("AdsDropdownMenu", [attr(true, ":items", "items")], "  <UButton>Ações</UButton>");
</script>
