<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['segmented-tabs']">
    <template #preview>
      <div class="w-full max-w-xl">
        <AdsSegmentedTabs v-model="tab" :items="items" aria-label="Filtro de status" />
      </div>
    </template>

    <template #params>
      <DocsParam label="Quantidade">
        <AdsSegmentedTabs v-model="count" :items="countItems" aria-label="Quantidade de abas" />
      </DocsParam>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="showIcons" label="Ícones" />
        <AdsSwitch v-model="showSubtitles" label="Subtítulos" />
      </div>
      <p class="text-xs leading-relaxed text-[var(--ads-text-secondary)]">
        Limite: 8 abas. Acima desse número o componente avisa no console (dev) e o layout pode
        ficar ilegível em telas menores.
        Ícone (24px, à esquerda) e subtítulo são opcionais por aba: <code>items[n].icon</code> e <code>items[n].subtitle</code>.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import { computed, ref, watch } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildSfc, buildTag, toLiteral } from "../../../utils/code-builder";
import AdsSegmentedTabs, { type AdsSegmentedTabsItem } from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const count = ref("3");
const tab = ref("todas");
const showIcons = ref(false);
const showSubtitles = ref(false);

const countItems: TabsItem[] = [
  { label: "2 abas", value: "2" },
  { label: "3 abas", value: "3" },
  { label: "4 abas", value: "4" },
];

const baseOptions: AdsSegmentedTabsItem[] = [
  { label: "Todas", value: "todas", icon: "i-lucide-layers", subtitle: "Total" },
  { label: "Ativas", value: "ativas", icon: "i-lucide-circle-check", subtitle: "Em uso" },
  { label: "Encerradas", value: "encerradas", icon: "i-lucide-circle-x", subtitle: "Concluídas" },
  { label: "Rascunhos", value: "rascunhos", icon: "i-lucide-file-pen", subtitle: "Em edição" },
];

const items = computed<AdsSegmentedTabsItem[]>(() =>
  baseOptions.slice(0, Number(count.value)).map((item) => ({
    ...item,
    icon: showIcons.value ? item.icon : undefined,
    subtitle: showSubtitles.value ? item.subtitle : undefined,
  })),
);

watch(count, () => {
  if (!items.value.some((item) => item.value === tab.value)) tab.value = String(items.value[0]?.value ?? "");
});

const code = computed(() =>
  buildSfc(
    `import { ref } from "vue";

const tab = ref(${JSON.stringify(tab.value)});
const items = ${toLiteral(
      items.value.map((item) => ({ label: item.label, value: item.value, icon: item.icon, subtitle: item.subtitle })),
    )};`,
    buildTag("AdsSegmentedTabs", [
      attr(true, "v-model", "tab"),
      attr(true, ":items", "items"),
      attr(true, "aria-label", "Filtro de status"),
    ]),
  ),
);
</script>
