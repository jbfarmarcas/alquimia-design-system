<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['button-menu']">
    <template #preview>
      <AdsButtonMenu :options="menuOptions" :show-subtitles="showSubtitles" :show-icons="showIcons" />
    </template>

    <template #params>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="showSubtitles" label="Subtítulos" />
        <AdsSwitch v-model="showIcons" label="Ícones" />
      </div>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsButtonMenu from "../../../../../app/components/AdsButtonMenu.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const showSubtitles = ref(true);
const showIcons = ref(true);

const menuOptions = [
  { value: "a", title: "Opção com ícone", subtitle: "Subtítulo opcional com até duas linhas.", icon: "i-lucide-sparkles" },
  { value: "b", title: "Segunda opção", subtitle: "Outro subtítulo.", icon: "i-lucide-sparkles" },
];

const code = computed(() =>
  buildTag("AdsButtonMenu", [
    attr(true, ":options", "options"),
    attr(!showSubtitles.value, ":show-subtitles", "false"),
    attr(!showIcons.value, ":show-icons", "false"),
  ]),
);
</script>
