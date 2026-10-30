<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['menu-bar']">
    <template #preview>
      <div class="flex max-w-full justify-center overflow-x-auto">
        <AdsMenuBar v-model:active-id="menuId" :open-id="menuOpen ? menuId : ''" />
      </div>
    </template>

    <template #params>
      <AdsSwitch v-model="menuOpen" label="Aberto (faixa)" />
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsMenuBar from "../../../../../app/components/AdsMenuBar.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const menuId = ref("home");
const menuOpen = ref(false);

const code = computed(() =>
  buildTag("AdsMenuBar", [attr(true, "v-model:active-id", menuId.value), attr(menuOpen.value, "open-id", menuId.value)]),
);
</script>
