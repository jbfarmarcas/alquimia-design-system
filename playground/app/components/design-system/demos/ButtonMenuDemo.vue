<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['button-menu']">
    <template #preview>
      <div class="flex flex-col items-start gap-2">
        <AdsButton
          label="Ações"
          trailing
          trailing-icon="i-lucide-chevron-down"
          :aria-expanded="open"
          aria-haspopup="menu"
          @click="open = !open"
        />
        <AdsButtonMenu
          v-if="open"
          :options="menuOptions"
          :show-subtitles="showSubtitles"
          :show-icons="showIcons"
          @select="onSelect"
        />
      </div>
      <p class="self-end text-sm text-[var(--ads-text-secondary)]" aria-live="polite">
        {{ selected ? `Escolhido: ${selected}` : "Nenhuma opção escolhida." }}
      </p>
    </template>

    <template #params>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="open" label="Menu aberto" />
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
import AdsButton from "../../../../../app/components/AdsButton.vue";
import AdsButtonMenu from "../../../../../app/components/AdsButtonMenu.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const open = ref(true);
const selected = ref("");
const showSubtitles = ref(true);
const showIcons = ref(true);

const menuOptions = [
  { value: "a", title: "Opção com ícone", subtitle: "Subtítulo opcional com até duas linhas.", icon: "i-lucide-sparkles" },
  { value: "b", title: "Segunda opção", subtitle: "Outro subtítulo.", icon: "i-lucide-sparkles" },
];

function onSelect(value: string) {
  selected.value = menuOptions.find((option) => option.value === value)?.title ?? value;
  open.value = false;
}

const menuTag = computed(() =>
  buildTag("AdsButtonMenu", [
    attr(true, ":options", "options"),
    attr(!showSubtitles.value, ":show-subtitles", "false"),
    attr(!showIcons.value, ":show-icons", "false"),
    attr(true, "@select", "onSelect"),
  ]),
);

// O gatilho e a abertura ficam fora do componente.
const code = computed(
  () => `<AdsButton label="Ações" trailing trailing-icon="i-lucide-chevron-down" @click="open = !open" />\n${menuTag.value.replace("<AdsButtonMenu", "<AdsButtonMenu v-if=\"open\"")}`,
);
</script>
