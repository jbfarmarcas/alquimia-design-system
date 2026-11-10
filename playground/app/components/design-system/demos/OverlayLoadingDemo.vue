<template>
  <DocsDemo language="ts" :code="overlayCode" :apis="docsApis['overlay-loading']">
    <template #preview>
      <AdsButton type="outline" label="Abrir overlay" @click="openOverlayDemo" />
    </template>

    <template #params>
      <DocsParam label="Estado">
        <AdsSegmentedTabs v-model="variant" :items="variantItems" aria-label="Estado do overlay" />
      </DocsParam>
      <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        Carregando e busca não podem ser fechados: no demo, passam sozinhos para sucesso. No erro, as ações são Tentar novamente e Fechar.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import AdsButton from "../../../../../app/components/AdsButton.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import { useOverlayLoading } from "../../../../../app/composables/useOverlayLoading";
import type { OverlayLoadingOptions, OverlayVariant } from "../../../../../app/types/overlay-loading.types";

const overlay = useOverlayLoading();
let overlayTimer: ReturnType<typeof setTimeout> | undefined;

const variant = ref<OverlayVariant>("loading");

const variantItems = [
  { label: "Carregando", value: "loading" },
  { label: "Busca", value: "search" },
  { label: "Info", value: "info" },
  { label: "Sucesso", value: "success" },
  { label: "Erro", value: "error" },
  { label: "Warning", value: "warning" },
];

const closeOverlayDemo = () => {
  clearTimeout(overlayTimer);
  overlay.close();
};

const closeAction = { actionLabel: "Fechar", actionIcon: "i-lucide-x", onAction: closeOverlayDemo };

const states: Record<OverlayVariant, OverlayLoadingOptions> = {
  loading: { title: "Processando a pesquisa", description: "Aguarde enquanto preparamos os dados." },
  search: { title: "Buscando lojas", description: "Procurando resultados para o filtro escolhido." },
  info: { title: "Sincronizando", description: "Os dados são atualizados a cada 15 minutos.", ...closeAction },
  success: { title: "Pesquisa pronta", description: "O processo terminou.", ...closeAction },
  error: {
    title: "Não foi possível concluir",
    description: "A conexão caiu durante o processo.",
    actionLabel: "Tentar novamente",
    onAction: () => openOverlayDemo(),
    secondaryActionLabel: "Fechar",
    onSecondaryAction: closeOverlayDemo,
  },
  warning: { title: "Dados incompletos", description: "Algumas lojas não enviaram o fechamento.", ...closeAction },
};

const openOverlayDemo = () => {
  clearTimeout(overlayTimer);
  const current = variant.value;
  if (current !== "loading" && current !== "search") {
    overlay.show({ variant: current, ...states[current] });
    return;
  }
  // loading e search bloqueiam a tela: o processo simulado termina em sucesso, que pode ser fechado.
  overlay.show({ variant: current, ...states[current] });
  overlayTimer = setTimeout(() => {
    overlay.update({ variant: "success", ...states.success });
    overlayTimer = setTimeout(closeOverlayDemo, 2400);
  }, 1400);
};

onBeforeUnmount(() => {
  clearTimeout(overlayTimer);
  overlay.close();
});

const overlayCode = computed(() => {
  if (variant.value === "error") {
    return [
      "const overlay = useOverlayLoading();",
      "",
      "overlay.show({",
      '  variant: "error",',
      '  title: "Não foi possível concluir",',
      '  description: "A conexão caiu durante o processo.",',
      '  actionLabel: "Tentar novamente", // ícone refresh-cw por padrão no erro',
      "  onAction: () => retry(),",
      '  secondaryActionLabel: "Fechar", // sem onSecondaryAction, fecha o overlay',
      "});",
    ].join("\n");
  }
  if (variant.value === "loading") {
    return [
      "const overlay = useOverlayLoading();",
      "",
      "overlay.show({",
      '  variant: "loading",',
      '  title: "Processando a pesquisa",',
      '  description: "Aguarde enquanto preparamos os dados.",',
      "});",
      "",
      "overlay.update({",
      '  variant: "success",',
      '  title: "Pesquisa pronta",',
      '  actionLabel: "Fechar",',
      '  actionIcon: "i-lucide-x",',
      "  onAction: () => overlay.close(),",
      "});",
    ].join("\n");
  }
  const state = states[variant.value];
  return [
    "const overlay = useOverlayLoading();",
    "",
    "overlay.show({",
    `  variant: "${variant.value}",`,
    `  title: "${state.title}",`,
    `  description: "${state.description}",`,
    ...(state.actionLabel ? ['  actionLabel: "Fechar",', '  actionIcon: "i-lucide-x",', "  onAction: () => overlay.close(),"] : []),
    "});",
  ].join("\n");
});
</script>
