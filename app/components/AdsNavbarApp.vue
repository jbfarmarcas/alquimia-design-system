<template>
  <nav
    class="flex h-[var(--ads-navbar-app-height)] w-full items-center justify-center gap-[var(--ads-navbar-app-gap)] border-t border-ads-neutro-claro-20 bg-[var(--ads-surface-card)] px-4"
    aria-label="Navegação do aplicativo"
  >
    <component
      :is="item.to ? NuxtLink : 'button'"
      v-for="item in items"
      :key="item.id"
      v-bind="item.to ? { to: item.to } : { type: 'button' }"
      class="flex w-[var(--ads-navbar-app-item-width)] flex-col items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]"
      :aria-current="item.id === activeId ? 'page' : undefined"
      @click="emit('update:activeId', item.id)"
    >
      <span
        class="flex size-[var(--ads-navbar-app-well)] items-center justify-center rounded-[var(--ads-radius-xsm)]"
        :class="item.id === activeId ? 'bg-[var(--ads-navbar-app-active)] text-[var(--ads-text-contrast)]' : 'text-[var(--ads-text-secondary)]'"
      >
        <UIcon :name="item.icon" class="size-[18px]" />
      </span>
      <span
        class="text-[length:var(--ads-navbar-app-font-size)] font-bold leading-4"
        :class="item.id === activeId ? 'text-[var(--ads-navbar-app-active)]' : 'text-[var(--ads-text-secondary)]'"
      >{{ item.label }}</span>
    </component>
  </nav>
</template>

<script lang="ts">
import type { RouteLocationRaw } from "vue-router";

export type AdsNavbarAppItem = {
  id: string;
  label: string;
  icon: string;
  to?: RouteLocationRaw;
};

export const adsNavbarAppItems: AdsNavbarAppItem[] = [
  { id: "home", label: "Home", icon: "i-lucide-home" },
  { id: "agenda", label: "Agenda", icon: "i-lucide-calendar-days" },
  { id: "apps", label: "Apps", icon: "i-lucide-layout-grid" },
  { id: "tickets", label: "Tickets", icon: "i-lucide-messages-square" },
  { id: "perfil", label: "Perfil", icon: "i-lucide-circle-user" },
];
</script>

<script setup lang="ts">
import { NuxtLink } from "#components";


withDefaults(
  defineProps<{
    items?: AdsNavbarAppItem[];
    activeId?: string;
  }>(),
  {
    items: () => adsNavbarAppItems,
    activeId: "home",
  },
);

const emit = defineEmits<{
  "update:activeId": [id: string];
}>();

</script>
