<template>
  <span
    class="inline-flex shrink-0 items-center gap-0.5 text-[length:var(--ads-font-size-xxxs)] font-bold leading-[1.2] tabular-nums"
    :class="tone === 'negative' ? 'text-[var(--ads-status-warning-500)]' : 'text-[var(--ads-status-success-800)]'"
  >
    <UIcon :name="direction === 'down' ? 'i-lucide-arrow-down' : 'i-lucide-arrow-up'" class="size-4" aria-hidden="true" />
    <span class="sr-only">{{ direction === "down" ? "Queda de" : "Alta de" }}</span>
    {{ value }}
  </span>
</template>

<script setup lang="ts">
export type AdsCardVariationDirection = "up" | "down";
export type AdsCardVariationTone = "positive" | "negative";

/**
 * Variação de métrica (_Card Variation do Figma): seta e percentual.
 * direction diz se o número subiu ou caiu; tone diz se isso é bom (positive) ou ruim (negative).
 */
withDefaults(
  defineProps<{
    value: string;
    direction?: AdsCardVariationDirection;
    tone?: AdsCardVariationTone;
  }>(),
  {
    direction: "up",
    tone: "positive",
  },
);
</script>
