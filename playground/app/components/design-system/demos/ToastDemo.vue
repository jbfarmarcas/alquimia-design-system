<template>
  <DocsDemo :language="language" :code="code" :apis="docsApis.toast">
    <template #preview>
      <div v-if="appearance === 'flutuante'">
        <AdsButton :color="buttonColor" label="Mostrar toast" @click="showFloatingToast" />
      </div>
      <div v-else class="w-full max-w-xl">
        <AdsToast
          :appearance="appearance === 'status' ? 'status' : 'banner'"
          :status="status"
          :app="app"
          :closable="closable"
          :subtitle="appearance === 'status' ? 'Explicação opcional' : undefined"
          :action-label="appearance === 'banner' && actionOn ? 'Tentar novamente' : undefined"
        />
      </div>
    </template>

    <template #params>
      <DocsParam label="Aparência">
        <AdsSegmentedTabs v-model="appearance" :items="appearanceItems" aria-label="Aparência do toast" />
      </DocsParam>
      <DocsParam label="Status">
        <AdsSegmentedTabs v-model="status" :items="statusItems" aria-label="Status do aviso" />
      </DocsParam>
      <div v-if="appearance !== 'flutuante'" class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-if="appearance === 'banner'" v-model="app" label="Variação App" />
        <AdsSwitch v-model="closable" label="Fechar" />
        <AdsSwitch v-if="appearance === 'banner'" v-model="actionOn" label="Ação" />
      </div>
      <p v-else class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        O toast flutuante usa useToast do Nuxt UI, com as cores de status do ADS.
      </p>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsButton, { type AdsButtonColor } from "../../../../../app/components/AdsButton.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";
import AdsToast, { type AdsToastStatus } from "../../../../../app/components/AdsToast.vue";

type ToastAppearance = "banner" | "status" | "flutuante";

const appearance = ref<ToastAppearance>("banner");
const status = ref<AdsToastStatus>("error");
const app = ref(false);
const closable = ref(true);
const actionOn = ref(false);

const appearanceItems = [
  { label: "Toast", value: "banner" },
  { label: "Reporte", value: "status" },
  { label: "Flutuante", value: "flutuante" },
];

const statusItems = [
  { label: "Primário", value: "primary" },
  { label: "Sucesso", value: "success" },
  { label: "Erro", value: "error" },
  { label: "Alerta", value: "warning" },
  { label: "Neutro", value: "neutral" },
  { label: "Carga", value: "loading" },
];

const messages: Record<AdsToastStatus, { title: string; description: string }> = {
  primary: { title: "Pesquisa importada", description: "A conferência segue disponível no histórico." },
  success: { title: "Alteração salva", description: "O preço foi atualizado nesta praça." },
  error: { title: "Não foi possível salvar", description: "Tente novamente ou contate o suporte." },
  warning: { title: "Revise os dados", description: "Alguns produtos ficaram sem preço." },
  neutral: { title: "Lembrete", description: "A pesquisa vence em 3 dias." },
  loading: { title: "Carregando", description: "O reporte está em andamento." },
};

const toastColor = computed(() => (status.value === "loading" ? "primary" : status.value));

/** Mesmo mapeamento do `AdsToast`: o botão usa as cores de status do ADS. */
const buttonColor = computed((): AdsButtonColor => {
  if (status.value === "loading") return "primary";
  if (status.value === "error") return "warning";
  if (status.value === "warning") return "attention";
  return status.value;
});

const language = computed(() => (appearance.value === "flutuante" ? "ts" : "vue"));

const toast = useToast();

const showFloatingToast = () => {
  const message = messages[status.value];
  toast.add({
    title: message.title,
    description: message.description,
    color: toastColor.value,
  });
};

const code = computed(() => {
  if (appearance.value === "flutuante") {
    const message = messages[status.value];
    return [
      "toast.add({",
      `  title: "${message.title}",`,
      `  description: "${message.description}",`,
      `  color: "${toastColor.value}",`,
      "});",
    ].join("\n");
  }

  return buildTag("AdsToast", [
    attr(appearance.value === "status", "appearance", "status"),
    attr(true, "status", status.value),
    attr(appearance.value === "status", "subtitle", "Explicação opcional"),
    attr(appearance.value === "banner" && app.value, "app"),
    attr(!closable.value, ":closable", "false"),
    attr(appearance.value === "banner" && actionOn.value, "action-label", "Tentar novamente"),
  ]);
});
</script>
