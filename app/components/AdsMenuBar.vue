<template>
  <nav
    class="flex w-[var(--ads-menu-width)] flex-col items-center gap-[var(--ads-menu-gap)] bg-[var(--ads-surface-card)] px-0 py-[var(--ads-menu-padding-y)] shadow-[0_2px_4px_-1px_color-mix(in_srgb,var(--color-ads-neutro-medio-60)_75%,transparent)]"
    aria-label="Menu principal"
  >
    <template v-for="item in items" :key="item.id">
      <span
        v-if="item.dividerBefore"
        class="h-px w-12 bg-[var(--ads-menu-divider)]"
        role="separator"
      />
      <component
        :is="item.to ? NuxtLink : 'button'"
        v-bind="item.to ? { to: item.to } : { type: 'button' }"
        class="flex w-full flex-col items-center gap-1 rounded-[var(--ads-radius-xsm)] px-1 py-0 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]"
        :class="stateOf(item) === 'open' ? 'shadow-[inset_4px_0_0_var(--ads-text-brand)]' : ''"
        :aria-current="stateOf(item) === 'regular' ? undefined : 'page'"
        @click="onSelect(item.id)"
      >
        <span class="flex size-[var(--ads-menu-icon-box)] items-center justify-center rounded-[var(--ads-radius-xsm)] p-1">
          <UIcon :name="item.icon" class="size-[var(--ads-menu-icon)]" :class="iconTone(item)" />
        </span>
        <span
          class="max-w-full text-[length:var(--ads-menu-label-size)] font-bold leading-[1.2] whitespace-pre-line"
          :class="labelTone(item)"
        >{{ item.label }}</span>
      </component>
    </template>
  </nav>
</template>

<script lang="ts">
import type { RouteLocationRaw } from "vue-router";

export type AdsMenuBarState = "regular" | "selected" | "open";

export type AdsMenuBarItem = {
  id: string;
  label: string;
  icon: string;
  to?: RouteLocationRaw;
  dividerBefore?: boolean;
  state?: AdsMenuBarState;
};

/** Ordem do Menu bar default no Figma. Home usa o mesmo tom dos demais (o frame default pinta o rótulo em dark/500). */
export const adsMenuBarItems: AdsMenuBarItem[] = [
  { id: "home", label: "Home", icon: "i-lucide-home" },
  { id: "gestao", label: "Gestão", icon: "i-lucide-folder-tree", dividerBefore: true },
  { id: "financas", label: "Finanças", icon: "i-lucide-hand-coins" },
  { id: "compras", label: "Compras", icon: "i-lucide-shopping-cart" },
  { id: "trade", label: "Trade", icon: "i-lucide-store" },
  { id: "marketing", label: "Marketing", icon: "i-lucide-megaphone" },
  { id: "capacitacao", label: "Capacitação", icon: "i-lucide-book-open" },
  { id: "relatorios", label: "Relatórios", icon: "i-lucide-bar-chart-big" },
  { id: "promocao", label: "Promoção", icon: "i-lucide-trophy" },
  { id: "encontro", label: "Encontro\nFarmarcas", icon: "i-lucide-contact" },
  { id: "campanhas", label: "Campanhas", icon: "i-lucide-goal", dividerBefore: false },
];
</script>

<script setup lang="ts">
import { NuxtLink } from "#components";



const props = withDefaults(
  defineProps<{
    items?: AdsMenuBarItem[];
    activeId?: string;
    openId?: string;
  }>(),
  {
    items: () => adsMenuBarItems,
    activeId: "",
    openId: "",
  },
);

const emit = defineEmits<{
  "update:activeId": [id: string];
  select: [id: string];
}>();

const stateOf = (item: AdsMenuBarItem): AdsMenuBarState => {
  if (item.state) return item.state;
  if (props.openId === item.id) return "open";
  if (props.activeId === item.id) return "selected";
  return "regular";
};

const iconTone = (item: AdsMenuBarItem) =>
  stateOf(item) === "regular" ? "text-ads-neutro-escuro-500" : "text-[var(--ads-text-brand)]";

const labelTone = (item: AdsMenuBarItem) =>
  stateOf(item) === "regular" ? "text-[var(--ads-text-secondary)]" : "text-[var(--ads-text-brand)]";

const onSelect = (id: string) => {
  emit("update:activeId", id);
  emit("select", id);
};

</script>
