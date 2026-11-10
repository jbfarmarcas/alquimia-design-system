<template>
  <AdsPill :label="resolvedLabel" :custom-surface="surface" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatNotability } from "../utils/notability";
import AdsPill from "./AdsPill.vue";

const props = defineProps<{
  notability: string;
  label?: string;
}>();

/** image → cyan (new), traffic → verde (success), profit → IA (surface-ai / text-ai). */
const surface = computed(() => {
  if (props.notability === "traffic") return "bg-[var(--ads-status-success-100)] text-[var(--ads-status-success-800)]";
  if (props.notability === "profit") return "bg-[var(--ads-surface-ai)] text-[var(--ads-text-ai)]";
  // image (default)
  return "bg-[var(--ads-status-new-100)] text-[var(--ads-status-new-800)]";
});

const resolvedLabel = computed(() => props.label ?? formatNotability(props.notability));
</script>
