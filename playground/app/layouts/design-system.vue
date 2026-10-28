<template>
  <UApp :locale="uiLocale" :tooltip="{ delayDuration: 400 }" :toaster="adsToaster">
    <div
      class="h-dvh overflow-hidden bg-[var(--ads-surface-main)] text-[var(--ads-text-primary)] selection:bg-primary-100 selection:text-[var(--ads-text-primary)]"
    >
      <slot />
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { uiLocale } from "../../../app/locale/pt-br";
import { adsToaster } from "../../../app/theme/ads-theme";

useHead({ title: "Alquimia Design System" });
</script>
