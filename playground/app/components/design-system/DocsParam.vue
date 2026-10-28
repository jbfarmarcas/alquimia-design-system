<template>
  <div class="flex min-w-0 flex-col gap-2">
    <p class="text-xs font-medium text-[var(--ads-text-secondary)]">{{ label }}</p>
    <div class="max-w-full overflow-x-auto">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>();
</script>
