<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['side-menu']">
    <template #preview>
      <AdsSideMenu :items="sideItems" :default-open="['mae']" class="max-h-[420px] overflow-y-auto" />
    </template>

    <template #params>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        Sem parâmetros. Clique no item mãe para abrir e fechar os filhos.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import AdsSideMenu from "../../../../../app/components/AdsSideMenu.vue";

const sideItems = [
  { id: "um", label: "Item de nome comprido", icon: "i-lucide-sun" },
  {
    id: "mae",
    label: "Item mãe",
    icon: "i-lucide-sun",
    badge: true,
    children: [{ id: "filho", label: "Item filho", icon: "i-lucide-sun", pill: "Novo" }],
  },
  { id: "tres", label: "Outro item", icon: "i-lucide-sun" },
];

const code = '<AdsSideMenu :items="items" />';
</script>
