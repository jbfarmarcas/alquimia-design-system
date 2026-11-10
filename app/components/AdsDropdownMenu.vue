<!--
  AdsDropdownMenu — menu de ações (UDropdownMenu com o tema ADS).
  Para escolher valores (simples, múltipla, busca, subtítulo, selo), use o AdsSelect.
-->
<template>
  <UDropdownMenu :items="items" :content="content" :ui="adsDropdownMenuUi">
    <slot />
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { adsDropdownMenuUi } from "../theme/ads-theme";

withDefaults(
  defineProps<{
    /** Ações do menu. Grupos em arrays aninhados ganham separador. */
    items?: DropdownMenuItem[] | DropdownMenuItem[][];
    content?: {
      side?: "top" | "right" | "bottom" | "left";
      align?: "start" | "center" | "end";
      sideOffset?: number;
    };
  }>(),
  {
    items: () => [],
    content: undefined,
  },
);
</script>
