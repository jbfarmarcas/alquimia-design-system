<template>
  <span
    class="inline-flex h-[var(--ads-notability-height)] min-w-[var(--ads-notability-min-width)] shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full px-[var(--ads-notability-padding-x)] py-1 text-center text-[length:var(--ads-notability-font-size)] [font-weight:var(--ads-notability-weight)] leading-[1.2] whitespace-nowrap"
    :class="surfaceClass"
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

const surfaces: Record<string, string> = {
  image: "bg-[var(--ads-status-new-100)] text-[var(--ads-status-new-800)]",
  traffic: "bg-[var(--ads-status-success-100)] text-[var(--ads-status-success-800)]",
  profit: "bg-[var(--ads-status-innovation-100)] text-[var(--ads-status-innovation-800)]",
};

const surfaceClass = computed(() => surfaces[props.notability] ?? surfaces.image);
const resolvedLabel = computed(() => props.label ?? formatNotability(props.notability));
</script>
