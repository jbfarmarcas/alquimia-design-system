<template>
  <DocsDemo language="ts" :code="overlayCode" :apis="docsApis['overlay-loading']">
    <template #preview>
      <AdsButton type="outline" label="Abrir overlay" @click="openOverlayDemo" />
    </template>

    <template #params>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        Sem parâmetros. O overlay cobre a página e fecha sozinho depois do sucesso.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import AdsButton from "../../../../../app/components/AdsButton.vue";
import { useOverlayLoading } from "../../../../../app/composables/useOverlayLoading";

const overlay = useOverlayLoading();
let overlayTimer: ReturnType<typeof setTimeout> | undefined;

const closeOverlayDemo = () => {
  clearTimeout(overlayTimer);
  overlay.close();
};

const openOverlayDemo = () => {
  clearTimeout(overlayTimer);
  overlay.show({
    title: "Processando a pesquisa",
    description: "Aguarde enquanto preparamos os dados.",
    variant: "loading",
  });
  overlayTimer = setTimeout(() => {
    overlay.update({
      title: "Pesquisa pronta",
      description: "O processo terminou.",
      variant: "success",
      actionLabel: "Fechar",
      onAction: closeOverlayDemo,
    });
    overlayTimer = setTimeout(closeOverlayDemo, 2400);
  }, 1400);
};

onBeforeUnmount(() => {
  clearTimeout(overlayTimer);
  overlay.close();
});

const overlayCode = [
  "const overlay = useOverlayLoading();",
  "",
  "overlay.show({",
  '  title: "Processando a pesquisa",',
  '  description: "Aguarde enquanto preparamos os dados.",',
  '  variant: "loading",',
  "});",
  "",
  "overlay.update({",
  '  title: "Pesquisa pronta",',
  '  variant: "success",',
  '  actionLabel: "Fechar",',
  "  onAction: () => overlay.close(),",
  "});",
].join("\n");
</script>
