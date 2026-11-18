<template>
  <span
    class="inline-flex min-h-[var(--ads-notability-height)] shrink-0 items-center justify-center overflow-hidden rounded-[var(--ads-radius-pill)] px-[var(--ads-notability-padding-x)] py-[var(--ads-space-quark)] text-center text-[length:var(--ads-notability-font-size)] leading-[1.3] whitespace-nowrap [font-weight:var(--ads-notability-weight)]"
    :class="surface"
  >
    {{ resolvedLabel }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatNotability } from "../utils/notability";

const props = defineProps<{
  notability: string;
  label?: string;
}>();

/**
 * image: status/new 100 + 800.
 * traffic: charts/data 4/100 a 80% + charts/data 4/800.
 * profit: innovation/100 a 70% + charts/data 2/800.
 */
const surfaces: Record<string, string> = {
  image: "bg-[var(--ads-status-new-100)] text-[var(--ads-status-new-800)]",
  traffic: "bg-[color-mix(in_srgb,var(--ads-chart-data-4-100)_80%,transparent)] text-[var(--ads-chart-data-4-800)]",
  profit: "bg-[color-mix(in_srgb,var(--ads-status-innovation-100)_70%,transparent)] text-[var(--ads-chart-data-2-800)]",
};

const surface = computed(() => surfaces[props.notability] ?? surfaces.image);

const resolvedLabel = computed(() => props.label ?? formatNotability(props.notability));
</script>
