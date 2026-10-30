<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['dropdown-menu']">
    <template #preview>
      <AdsDropdownMenu :items="menuItems">
        <AdsButton type="outline" label="Ações" trailing icon="i-lucide-chevron-down" />
      </AdsDropdownMenu>
    </template>

    <template #params>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        Sem parâmetros. O gatilho vai no slot padrão; as ações vêm de items.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import AdsButton from "../../../../../app/components/AdsButton.vue";
import AdsDropdownMenu from "../../../../../app/components/AdsDropdownMenu.vue";

const menuItems = [
  { label: "Editar", icon: "i-lucide-pencil" },
  { label: "Duplicar", icon: "i-lucide-copy" },
];

const code = '<AdsDropdownMenu :items="items">\n  <AdsButton type="outline" label="Ações" />\n</AdsDropdownMenu>';
</script>
