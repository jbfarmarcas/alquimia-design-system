<template>
  <nav
    class="flex w-[var(--ads-side-width)] flex-col border-r-[0.5px] border-[var(--ads-side-border)] bg-[var(--ads-surface-card)]"
    aria-label="Menu lateral"
  >
    <template v-for="item in items" :key="item.id">
      <component
        :is="item.to && !item.children?.length ? NuxtLink : 'button'"
        v-bind="item.to && !item.children?.length ? { to: item.to } : { type: 'button' }"
        class="flex h-[var(--ads-side-row-height)] items-center gap-1 border-b-[0.5px] border-[var(--ads-side-border)] py-2 pe-1 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]"
        :class="rowClass(item, false)"
        :aria-expanded="item.children?.length ? isOpen(item.id) : undefined"
        @click="onRow(item)"
      >
        <span class="flex min-w-0 flex-1 items-center gap-2">
          <UIcon :name="item.icon || 'i-lucide-sun'" class="size-4 shrink-0 text-ads-neutro-escuro-500" />
          <span class="line-clamp-2 text-xs font-bold leading-[1.2] text-[var(--ads-text-secondary)]">{{ item.label }}</span>
        </span>
        <span
          v-if="item.badge"
          class="size-[var(--ads-side-badge)] shrink-0 rounded-full bg-[var(--ads-funcional-opportunity-200)]"
          aria-hidden="true"
        />
        <AdsMiniPill v-if="item.pill" type="novo" :label="item.pill" />
        <UIcon
          v-if="item.children?.length"
          name="i-lucide-chevron-down"
          class="size-4 shrink-0 text-ads-neutro-medio-100 transition-transform duration-150"
          :class="isOpen(item.id) ? '' : '-rotate-90'"
        />
      </component>
      <component
        :is="child.to ? NuxtLink : 'button'"
        v-for="child in isOpen(item.id) ? item.children : []"
        :key="child.id"
        v-bind="child.to ? { to: child.to } : { type: 'button' }"
        class="flex h-[var(--ads-side-row-height)] items-center gap-2 border-b-[0.5px] border-[var(--ads-side-border)] py-2 pe-1 ps-6 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]"
        :class="rowClass(child, true)"
        @click="emit('select', child.id)"
      >
        <UIcon :name="child.icon || 'i-lucide-sun'" class="size-4 shrink-0 text-ads-neutro-escuro-500" />
        <span class="line-clamp-2 min-w-0 flex-1 text-xs font-bold leading-[1.2] text-[var(--ads-text-secondary)]">{{ child.label }}</span>
        <AdsMiniPill v-if="child.pill" type="novo" :label="child.pill" />
      </component>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { NuxtLink } from "#components";
import AdsMiniPill from "./AdsMiniPill.vue";

export type AdsSideMenuItem = {
  id: string;
  label: string;
  icon?: string;
  to?: RouteLocationRaw;
  children?: AdsSideMenuItem[];
  /** Texto da mini pill. Vazio esconde. */
  pill?: string;
  /** Ponto de 8px (Figma Show Badge no item mãe). */
  badge?: boolean;
};

const props = withDefaults(
  defineProps<{
    items: AdsSideMenuItem[];
    /** Pais abertos no primeiro render. O Figma não desenha o clique. */
    defaultOpen?: string[];
  }>(),
  {
    defaultOpen: () => [],
  },
);

const emit = defineEmits<{
  select: [id: string];
}>();

const openIds = ref(new Set(props.defaultOpen));

const isOpen = (id: string) => openIds.value.has(id);

const rowClass = (item: AdsSideMenuItem, child: boolean) => {
  if (child) return "bg-[var(--ads-side-child-bg)]";
  if (item.children?.length && isOpen(item.id)) return "bg-[var(--ads-side-open-bg)] ps-4";
  return "bg-[var(--ads-surface-card)] ps-4";
};

const onRow = (item: AdsSideMenuItem) => {
  if (item.children?.length) {
    const next = new Set(openIds.value);
    if (next.has(item.id)) next.delete(item.id);
    else next.add(item.id);
    openIds.value = next;
  }
  emit("select", item.id);
};
</script>
