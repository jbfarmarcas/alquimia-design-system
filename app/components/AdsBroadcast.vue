<!--
  AdsBroadcast — atalho de compatibilidade. O Broadcast é a prop da Pill:
  prefira <AdsPill broadcast />.
-->
<template>
  <AdsPill broadcast :color="color" :label="label" />
</template>

<script setup lang="ts">
import AdsPill from "./AdsPill.vue";

export type AdsBroadcastColor = "warning" | "success";

withDefaults(
  defineProps<{
    label?: string;
    color?: AdsBroadcastColor;
  }>(),
  {
    label: "",
    color: "warning",
  },
);
</script>
