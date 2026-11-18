<template>
  <div
    ref="scroller"
    class="min-w-0 max-w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    :class="overflows ? 'overflow-x-auto overscroll-x-contain' : ''"
  >
    <UTabs
      v-model="model"
      :items="items as TabsItem[]"
      :content="false"
      variant="pill"
      color="neutral"
      :ui="adsSegmentedTabsUi"
      :aria-label="ariaLabel"
    >
    <!-- Rótulo e, abaixo, o subtítulo opcional. O ícone de 24px vem do próprio UTabs, à esquerda. -->
    <template #default="{ item }">
      <span>{{ item.label }}</span>
      <span
        v-if="(item as AdsSegmentedTabsItem).subtitle"
        class="font-normal text-[var(--ads-text-secondary)]"
      >
        {{ (item as AdsSegmentedTabsItem).subtitle }}
      </span>
    </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number">
import type { TabsItem } from "@nuxt/ui";
import { nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from "vue";
import { adsSegmentedTabsUi } from "../theme/ads-theme";
import { bindTabWheel, revealActiveTab } from "./ads-tab-scroll";

/** Estende TabsItem com `subtitle` opcional. O `icon` (24px, à esquerda) já vem do Nuxt UI. */
export interface AdsSegmentedTabsItem extends Omit<TabsItem, "slot"> {
  /** Linha secundária abaixo do rótulo, em 12px regular. */
  subtitle?: string;
}

const MAX_TABS = 8;

const props = withDefaults(
  defineProps<{
    items: AdsSegmentedTabsItem[];
    ariaLabel?: string;
  }>(),
  {
    ariaLabel: undefined,
  },
);

if (import.meta.dev) {
  watch(
    () => props.items.length,
    (len) => {
      if (len > MAX_TABS) {
        console.warn(
          `[AdsSegmentedTabs] Limite de ${MAX_TABS} abas excedido (${len}). A faixa rola na horizontal; prefira até ${MAX_TABS} abas.`,
        );
      }
    },
    { immediate: true },
  );
}

const model = defineModel<T>({ required: true });

const scroller = useTemplateRef<HTMLElement>("scroller");
/** Começa rolando para o SSR não estourar a página; o mount solta se a faixa cabe. */
const overflows = ref(true);
let unbindWheel: (() => void) | undefined;
let observer: ResizeObserver | undefined;

function syncOverflow() {
  const el = scroller.value;
  if (!el) return;
  overflows.value = el.scrollWidth > el.clientWidth + 1;
}

function reveal() {
  nextTick(() => {
    syncOverflow();
    nextTick(() => revealActiveTab(scroller.value));
  });
}

onMounted(() => {
  const el = scroller.value;
  if (!el) return;
  unbindWheel = bindTabWheel(el);
  observer = new ResizeObserver(() => syncOverflow());
  observer.observe(el);
  if (el.firstElementChild) observer.observe(el.firstElementChild);
  reveal();
});

onBeforeUnmount(() => {
  unbindWheel?.();
  observer?.disconnect();
});

watch(model, reveal);
watch(() => props.items, reveal);
</script>
