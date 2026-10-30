<template>
  <footer class="flex min-h-[var(--ads-footer-min-height)] w-full flex-wrap items-center justify-between gap-3 bg-[var(--ads-surface-card)] px-10 py-2">
    <p class="text-xs leading-4 text-[var(--ads-footer-text)]">
      <span class="font-bold">© Copyright Radar Farmarcas </span>
      <span>- Todos os direitos reservados.</span>
    </p>
    <p class="flex items-center gap-2 text-xs leading-4 text-[var(--ads-footer-text)]">
      <span>{{ developerLabel }}</span>
      <img :src="logoUrl" alt="Farmarcas" class="h-[var(--ads-footer-logo-height)] w-auto" />
    </p>
  </footer>
</template>

<script setup lang="ts">
import logoUrl from "../assets/brand/farmarcas.svg?url";

withDefaults(
  defineProps<{
    developerLabel?: string;
  }>(),
  {
    developerLabel: "Desenvolvido por",
  },
);
</script>
