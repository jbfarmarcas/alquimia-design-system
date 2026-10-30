<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.card">
    <template #preview>
      <AdsCard
        class="w-72 max-w-full"
        title="Pesquisa 14/09"
        description="12 lojas, 3 concorrentes, coleta até 30/10."
        footer-text="Atualizada hoje"
        :as="asButton ? 'button' : 'div'"
        :selected="selected"
      />
    </template>

    <template #params>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="asButton" label="Ação (botão)" />
        <AdsSwitch v-model="selected" label="Selecionado" />
      </div>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsCard from "../../../../../app/components/AdsCard.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const asButton = ref(false);
const selected = ref(false);

const code = computed(() =>
  buildTag("AdsCard", [
    attr(true, "title", "Pesquisa 14/09"),
    attr(true, "description", "12 lojas, 3 concorrentes, coleta até 30/10."),
    attr(true, "footer-text", "Atualizada hoje"),
    attr(asButton.value, "as", "button"),
    attr(selected.value, "selected"),
  ]),
);
</script>
