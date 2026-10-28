<template>
  <DocsDemo :language="language" :code="code" :apis="docsApis.carregando">
    <template #preview>
      <div v-if="example === 'spinner'" class="flex w-full min-w-0 items-center justify-center rounded-[var(--ads-radius-md)] bg-white p-4">
        <AdsLoading :size="size" :tone="tone" :region="region" :label="region ? 'Carregando lojas...' : ''" />
      </div>

      <div v-else-if="example === 'skeleton'" class="w-72 max-w-full rounded-[var(--ads-radius-md)] bg-white p-4">
        <AdsLoading
          variant="skeleton"
          :lines="Number(skeletonLines)"
          :class="Number(skeletonLines) > 0 ? '' : 'h-10 w-full'"
        />
      </div>

      <div v-else-if="example === 'shimmer'" class="relative w-72 max-w-full overflow-hidden rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-white p-4">
        <p class="text-sm font-medium text-[var(--ads-text-primary)]">Pesquisa Centro</p>
        <p class="mt-1 text-sm text-[var(--ads-text-secondary)]">Arquivando esta pesquisa.</p>
        <AdsLoading variant="shimmer" class="rounded-[var(--ads-radius-md)]" />
      </div>

      <div v-else-if="example === 'botao'">
        <AdsButton :loading="buttonLoading" label="Salvar" />
      </div>

      <div v-else-if="example === 'processo'">
        <AdsButton type="outline" label="Abrir overlay" @click="openOverlayDemo" />
      </div>

      <div v-else-if="example === 'percentual'" class="w-full max-w-md rounded-[var(--ads-radius-md)] bg-white p-4">
        <ProgressBarLoading
          title="Importando preços"
          description="Conferindo as linhas do arquivo."
          :percent="Number(percent)"
          :indeterminate="indeterminate"
          :variant="progressStatus"
          :show-elapsed-time="false"
        />
      </div>

      <div v-else class="max-h-64 w-full overflow-hidden rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-white">
        <ProductTableSkeleton :rows="4" />
      </div>
    </template>

    <template #params>
      <template v-if="example === 'spinner'">
        <div class="flex flex-wrap items-end gap-x-8 gap-y-5">
          <DocsParam label="Tamanho">
            <AdsSegmentedTabs v-model="size" :items="sizeItems" aria-label="Tamanho do spinner" />
          </DocsParam>
          <DocsParam label="Tom">
            <AdsSegmentedTabs v-model="tone" :items="toneItems" aria-label="Tom do spinner" />
          </DocsParam>
        </div>
        <AdsSwitch v-model="region" label="Seção vazia" />
      </template>

      <template v-else-if="example === 'skeleton'">
        <DocsParam label="Formato">
          <AdsSegmentedTabs v-model="skeletonLines" :items="linesItems" aria-label="Formato do skeleton" />
        </DocsParam>
      </template>

      <template v-else-if="example === 'botao'">
        <AdsSwitch v-model="buttonLoading" label="Carregando" />
      </template>

      <template v-else-if="example === 'percentual'">
        <div class="flex flex-wrap items-end gap-x-8 gap-y-5">
          <DocsParam label="Andamento">
            <AdsSegmentedTabs v-model="percent" :items="percentItems" aria-label="Andamento" />
          </DocsParam>
          <DocsParam label="Resultado">
            <AdsSegmentedTabs v-model="progressStatus" :items="progressItems" aria-label="Resultado do trabalho" />
          </DocsParam>
        </div>
        <AdsSwitch v-model="indeterminate" label="Indeterminado" />
      </template>

      <p v-else-if="example === 'shimmer' || example === 'processo' || example === 'tabela'" class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        {{ noParamsText }}
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import ProductTableSkeleton from "../../ProductTableSkeleton.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsButton from "../../../../../app/components/AdsButton.vue";
import AdsLoading, { type AdsLoadingSize, type AdsLoadingTone } from "../../../../../app/components/AdsLoading.vue";
import ProgressBarLoading from "../../../../../app/components/ProgressBarLoading.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";
import { useOverlayLoading } from "../../../../../app/composables/useOverlayLoading";

type LoadingExample = "spinner" | "skeleton" | "shimmer" | "botao" | "processo" | "percentual" | "tabela";
type ProgressStatus = "primary" | "success" | "error";

const example = ref<LoadingExample>("spinner");
const size = ref<AdsLoadingSize>("md");
const tone = ref<AdsLoadingTone>("primary");
const region = ref(false);
const skeletonLines = ref("3");
const buttonLoading = ref(false);
const percent = ref("68");
const indeterminate = ref(false);
const progressStatus = ref<ProgressStatus>("primary");

const exampleOptions = [
  { value: "spinner", label: "Spinner" },
  { value: "skeleton", label: "Skeleton" },
  { value: "shimmer", label: "Shimmer" },
  { value: "botao", label: "Botão" },
  { value: "processo", label: "Processo" },
  { value: "percentual", label: "Percentual" },
  { value: "tabela", label: "Tabela" },
];

const sizeItems = [
  { label: "Pequeno", value: "sm" },
  { label: "Médio", value: "md" },
  { label: "Grande", value: "lg" },
];

const toneItems = [
  { label: "Primário", value: "primary" },
  { label: "Muted", value: "muted" },
];

const linesItems = [
  { label: "Linhas", value: "3" },
  { label: "Bloco", value: "0" },
];

const percentItems = [
  { label: "25%", value: "25" },
  { label: "68%", value: "68" },
  { label: "100%", value: "100" },
];

const progressItems = [
  { label: "Em andamento", value: "primary" },
  { label: "Sucesso", value: "success" },
  { label: "Erro", value: "error" },
];

const noParamsText = computed(() => {
  if (example.value === "shimmer") return "Sem parâmetros. O pai precisa de relative e overflow-hidden.";
  if (example.value === "processo") return "Sem parâmetros. O overlay cobre a página e fecha sozinho depois do sucesso.";
  return "Sem parâmetros. O esqueleto segue as colunas da tabela.";
});

const language = computed(() => (example.value === "processo" ? "ts" : "vue"));

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

const code = computed(() => {
  if (example.value === "spinner") {
    return buildTag("AdsLoading", [
      attr(region.value, "region"),
      attr(region.value, "label", "Carregando lojas..."),
      attr(size.value !== "md", "size", size.value),
      attr(tone.value !== "primary", "tone", tone.value),
    ]);
  }

  if (example.value === "skeleton") {
    const lines = Number(skeletonLines.value);
    return buildTag("AdsLoading", [
      attr(true, "variant", "skeleton"),
      attr(lines > 0, ":lines", String(lines)),
      attr(lines === 0, "class", "h-10 w-full"),
    ]);
  }

  if (example.value === "shimmer") {
    return buildTag("AdsLoading", [attr(true, "variant", "shimmer")]);
  }

  if (example.value === "botao") {
    return buildTag("AdsButton", [
      attr(buttonLoading.value, "loading"),
      attr(true, "label", "Salvar"),
    ]);
  }

  if (example.value === "processo") {
    return overlayCode;
  }

  if (example.value === "percentual") {
    return buildTag("ProgressBarLoading", [
      attr(true, "title", "Importando preços"),
      attr(true, "description", "Conferindo as linhas do arquivo."),
      attr(!indeterminate.value, ":percent", percent.value),
      attr(indeterminate.value, "indeterminate"),
      attr(progressStatus.value !== "primary", "variant", progressStatus.value),
      attr(true, ":show-elapsed-time", "false"),
    ]);
  }

  return buildTag("ProductTableSkeleton", [attr(true, ":rows", "4")]);
});
</script>
