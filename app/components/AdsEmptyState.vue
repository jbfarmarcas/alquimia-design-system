<template>
  <div
    class="flex flex-col items-center text-center"
    :class="small ? 'gap-[var(--ads-empty-gap-sm)]' : 'gap-[var(--ads-empty-gap)]'"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      class="text-[var(--ads-empty-icon-color)]"
      :class="small ? 'size-[var(--ads-empty-icon-sm)]' : 'size-[var(--ads-empty-icon)]'"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6" />
      <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </svg>
    <div class="flex max-w-xs flex-col items-center gap-[var(--ads-empty-text-gap)]">
      <p
        class="font-bold leading-[1.3] text-[var(--ads-text-primary)]"
        :class="small ? 'text-[length:var(--ads-empty-title-size-sm)]' : 'text-[length:var(--ads-empty-title-size)]'"
      >
        {{ title }}
      </p>
      <p v-if="subtitle" class="text-[length:var(--ads-empty-subtitle-size)] leading-[1.2] text-[var(--ads-text-secondary)]">
        {{ subtitle }}
      </p>
    </div>
    <div v-if="showActions" class="flex flex-col items-center gap-2">
      <slot>
        <AdsButton :label="primaryLabel" leading trailing />
        <AdsButton type="unfilled" :label="secondaryLabel" leading trailing />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdsButton from "./AdsButton.vue";

withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    /** Figma `Small=Yes`. */
    small?: boolean;
    showActions?: boolean;
    primaryLabel?: string;
    secondaryLabel?: string;
  }>(),
  {
    title: "Título do empty state",
    subtitle: "Coloque aqui um texto explicando e direcionando o usuário. Uso opcional.",
    small: false,
    showActions: true,
    primaryLabel: "Button Test",
    secondaryLabel: "Button Test",
  },
);
</script>
