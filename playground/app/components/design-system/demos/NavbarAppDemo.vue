<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['navbar-app']">
    <template #preview>
      <AdsNavbarApp v-model:active-id="appId" class="max-w-[375px]" />
    </template>

    <template #params>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        Sem parâmetros. Toque em um destino para trocar o activeId.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsNavbarApp from "../../../../../app/components/AdsNavbarApp.vue";

const appId = ref("home");

const code = computed(() => buildTag("AdsNavbarApp", [attr(true, "v-model:active-id", appId.value)]));
</script>
