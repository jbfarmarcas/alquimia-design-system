<template>
  <AdsTooltip :description="text" :show-title="false" class="inline-flex shrink-0">
    <!-- span focável, e não button: o card inteiro pode ser um botão -->
    <span
      tabindex="0"
      role="img"
      class="inline-flex size-4 items-center justify-center rounded-[var(--ads-radius-circular)] text-[var(--ads-text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-border-focused)]"
      :aria-label="text"
    >
      <UIcon name="i-lucide-info" class="size-4" aria-hidden="true" />
    </span>
  </AdsTooltip>
</template>

<script setup lang="ts">
import AdsTooltip from "./AdsTooltip.vue";

/** Ícone de informação dos cards (Info do Figma). O texto abre no hover e no foco. */
defineProps<{
  text: string;
}>();
</script>
