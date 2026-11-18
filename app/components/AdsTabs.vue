<template>
  <UTabs
    ref="tabs"
    v-model="model"
    variant="link"
    color="primary"
    :items="items"
    :content="content"
    :default-item="defaultItem"
    :ui="ui"
  >
    <template v-if="slots.trailing" #trailing="slotProps">
      <slot name="trailing" v-bind="slotProps" />
    </template>
    <template v-if="slots.content" #content="slotProps">
      <slot name="content" v-bind="slotProps" />
    </template>
  </UTabs>
</template>

<script setup lang="ts" generic="T extends string | number">
import type { TabsItem } from "@nuxt/ui";
import { computed, nextTick, onBeforeUnmount, onMounted, useSlots, useTemplateRef, watch } from "vue";
import { adsLinkTabsUi } from "../theme/ads-theme";
import { bindTabWheel, revealActiveTab } from "./ads-tab-scroll";

const props = withDefaults(
  defineProps<{
    items: TabsItem[];
    /** `false` deixa só a faixa de abas, sem painel. */
    content?: boolean;
    defaultItem?: TabsItem;
    /** Classes extras na lista, como um recuo lateral. */
    listClass?: string;
  }>(),
  {
    content: true,
    defaultItem: undefined,
    listClass: "",
  },
);

const model = defineModel<T>();
const slots = useSlots();

const ui = computed(() => ({
  ...adsLinkTabsUi,
  root: [adsLinkTabsUi.root, props.content ? "flex-col gap-4" : ""]
    .filter(Boolean)
    .join(" "),
  list: [adsLinkTabsUi.list, props.listClass].filter(Boolean).join(" "),
}));

const tabs = useTemplateRef<{ $el?: HTMLElement }>("tabs");
let unbindWheel: (() => void) | undefined;

function reveal() {
  nextTick(() => revealActiveTab(tabs.value?.$el));
}

onMounted(() => {
  const list = tabs.value?.$el?.querySelector<HTMLElement>('[role="tablist"]');
  if (list) unbindWheel = bindTabWheel(list);
  reveal();
});

onBeforeUnmount(() => unbindWheel?.());

watch(model, reveal);
watch(() => props.items, reveal);
</script>
