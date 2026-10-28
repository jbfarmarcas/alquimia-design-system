<template>
  <UDropdownMenu :items="items" :content="content" :ui="adsDropdownMenuUi">
    <slot />
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { adsDropdownMenuUi } from "../theme/ads-theme";

defineProps<{
  items: DropdownMenuItem[] | DropdownMenuItem[][];
  content?: {
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
  };
}>();
</script>
