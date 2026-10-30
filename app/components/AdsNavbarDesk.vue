<template>
  <header class="flex h-[var(--ads-navbar-desk-height)] w-full items-center justify-between border-b border-[var(--ads-navbar-desk-border)] bg-[var(--ads-surface-card)] px-[var(--ads-navbar-desk-padding-x)] shadow-[0_2px_4px_-1px_color-mix(in_srgb,var(--color-ads-neutro-medio-60)_75%,transparent)]">
    <div class="flex items-center gap-3">
      <img :src="radarUrl" alt="RADAR" class="h-[21px] w-auto" />
      <AdsProductTag v-if="product" :product="product" :label="productLabel" />
    </div>
    <div class="flex items-center gap-2">
      <AdsBroadcast v-if="showBroadcast" />
      <button
        v-for="action in actions"
        :key="action.id"
        type="button"
        class="flex size-[var(--ads-navbar-desk-action)] items-center justify-center rounded-[var(--ads-radius-xsm)] p-2 text-[var(--ads-text-secondary)] hover:bg-ads-neutro-claro-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]"
        :aria-label="action.label"
        @click="emit('action', action.id)"
      >
        <UIcon :name="action.icon" class="size-[18px]" />
      </button>
      <span class="flex size-[var(--ads-navbar-desk-avatar)] items-center justify-center overflow-hidden rounded-full bg-ads-neutro-claro-30" aria-hidden="true">
        <img v-if="avatarUrl" :src="avatarUrl" alt="" class="size-full object-cover" />
        <UIcon v-else name="i-lucide-user" class="size-4 text-[var(--ads-text-secondary)]" />
      </span>
    </div>
  </header>
</template>

<script setup lang="ts">
import radarUrl from "../assets/brand/radar.svg?url";
import AdsBroadcast from "./AdsBroadcast.vue";
import AdsProductTag, { type AdsProductTagName } from "./AdsProductTag.vue";

export type AdsNavbarDeskAction = {
  id: string;
  label: string;
  icon: string;
};

withDefaults(
  defineProps<{
    product?: AdsProductTagName | null;
    productLabel?: string;
    showBroadcast?: boolean;
    avatarUrl?: string;
    actions?: AdsNavbarDeskAction[];
  }>(),
  {
    product: "performance",
    productLabel: "performance",
    showBroadcast: true,
    avatarUrl: "",
    actions: () => [
      { id: "alerts", label: "Alertas", icon: "i-lucide-bell" },
      { id: "settings", label: "Configurações", icon: "i-lucide-settings" },
      { id: "apps", label: "Aplicativos", icon: "i-lucide-layout-grid" },
    ],
  },
);

const emit = defineEmits<{
  action: [id: string];
}>();
</script>
