<template>
  <div class="max-w-[65ch]">
    <h2 class="text-xl font-bold tracking-[-0.02em] text-[var(--ads-text-primary)]">
      {{ section.label }}
    </h2>
    <p class="mt-3 text-base leading-relaxed text-[var(--ads-text-secondary)]">
      {{ section.purpose }}
    </p>
    <div v-if="section.components.length" class="mt-4 flex flex-wrap gap-2">
      <button
        v-for="name in section.components"
        :key="name"
        type="button"
        class="rounded-[var(--ads-radius-xsm)] bg-neutral-100 px-2 py-1 font-mono text-xs text-[var(--ads-text-primary)] transition-colors duration-150 ease-out hover:bg-[var(--ads-button-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        :aria-label="copiedName === name ? `${name} copiado` : `Copiar ${name}`"
        @click="emit('copy', name)"
      >
        {{ copiedName === name ? "Copiado" : name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  section: {
    label: string;
    purpose: string;
    components: readonly string[];
  };
  copiedName: string;
}>();

const emit = defineEmits<{ copy: [name: string] }>();
</script>
