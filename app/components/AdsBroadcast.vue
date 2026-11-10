<!--
  AdsBroadcast — atalho de compatibilidade. O Broadcast agora é uma variante da Pill:
  prefira <AdsPill variant="broadcast" />.
-->
<template>
  <AdsPill variant="broadcast" :status="status" :label="label" />
</template>

<script setup lang="ts">
import AdsPill from "./AdsPill.vue";

export type AdsBroadcastStatus = "warning" | "success";

withDefaults(
  defineProps<{
    label?: string;
    status?: AdsBroadcastStatus;
  }>(),
  {
    label: "LIVE",
    status: "warning",
  },
);
</script>
