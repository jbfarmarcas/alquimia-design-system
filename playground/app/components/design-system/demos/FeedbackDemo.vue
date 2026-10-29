<template>
  <DocsDemo :language="language" :code="code" :apis="docsApis.feedback">
    <template #preview>
      <div v-if="component === 'toast'" class="w-full max-w-xl">
        <AdsToast
          :status="status"
          :app="app"
          :closable="closable"
          :action-label="actionOn ? 'Tentar novamente' : undefined"
        />
      </div>

      <div v-else-if="component === 'flutuante'">
        <AdsButton :color="buttonColor" label="Mostrar toast" @click="showFloatingToast" />
      </div>

      <div v-else-if="component === 'arquivo'" class="w-full max-w-md">
        <AdsFileCard
          v-if="status === 'error'"
          name="planilha.csv"
          detail="2.0 KB"
          status="error"
          message="O arquivo passa de 5 MB."
          :removable="removable"
        />
        <AdsFileCard
          v-else
          name="01-sucesso-todas-redes.xlsx"
          detail="17.2 KB"
          :removable="removable"
        />
      </div>

      <div v-else class="flex flex-wrap items-end gap-8">
        <UTooltip v-if="tooltipType === 'UTooltip'" arrow text="Ação principal.">
          <AdsButton type="outline" label="Passe o mouse" />
        </UTooltip>
        <div v-else class="w-48 max-w-full">
          <InvertedTooltip text="Preço médio ponderado dos concorrentes mapeados nesta praça.">
            <span class="block truncate text-sm text-[var(--ads-text-primary)]">
              Preço médio ponderado dos concorrentes mapeados nesta praça.
            </span>
          </InvertedTooltip>
        </div>
      </div>
    </template>

    <template #params>
      <DocsParam label="Componente">
        <AdsSegmentedTabs v-model="component" :items="componentItems" aria-label="Componente de feedback" />
      </DocsParam>

      <template v-if="component === 'toast' || component === 'flutuante'">
        <DocsParam label="Status">
          <AdsSegmentedTabs v-model="status" :items="statusItems" aria-label="Status do aviso" />
        </DocsParam>
        <div v-if="component === 'toast'" class="flex flex-wrap items-center gap-x-8 gap-y-4">
          <AdsSwitch v-model="app" label="Variação App" />
          <AdsSwitch v-model="closable" label="Fechar" />
          <AdsSwitch v-model="actionOn" label="Ação" />
        </div>
      </template>

      <template v-if="component === 'arquivo'">
        <DocsParam label="Status">
          <AdsSegmentedTabs v-model="status" :items="fileStatusItems" aria-label="Status do arquivo" />
        </DocsParam>
        <AdsSwitch v-model="removable" label="Remover" />
      </template>

      <DocsParam v-if="component === 'tooltip'" label="Tipo">
        <AdsSegmentedTabs v-model="tooltipType" :items="tooltipItems" aria-label="Tipo de tooltip" />
      </DocsParam>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag, indent } from "../../../utils/code-builder";
import AdsButton, { type AdsButtonColor } from "../../../../../app/components/AdsButton.vue";
import AdsFileCard from "../../../../../app/components/AdsFileCard.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";
import AdsToast, { type AdsToastStatus } from "../../../../../app/components/AdsToast.vue";
import InvertedTooltip from "../../../../../app/components/InvertedTooltip.vue";

type FeedbackComponent = "toast" | "flutuante" | "arquivo" | "tooltip";

const component = ref<FeedbackComponent>("toast");
const status = ref<AdsToastStatus>("error");
const app = ref(false);
const closable = ref(true);
const actionOn = ref(false);
const removable = ref(false);
const tooltipType = ref<"UTooltip" | "InvertedTooltip">("UTooltip");

const componentItems = [
  { label: "Toast", value: "toast" },
  { label: "Flutuante", value: "flutuante" },
  { label: "Arquivo", value: "arquivo" },
  { label: "Tooltip", value: "tooltip" },
];

const statusItems = [
  { label: "Primário", value: "primary" },
  { label: "Sucesso", value: "success" },
  { label: "Erro", value: "error" },
  { label: "Alerta", value: "warning" },
  { label: "Neutro", value: "neutral" },
];

const fileStatusItems = [
  { label: "Sucesso", value: "success" },
  { label: "Erro", value: "error" },
];

const tooltipItems = [
  { label: "UTooltip", value: "UTooltip" },
  { label: "Texto truncado", value: "InvertedTooltip" },
];

const messages: Record<AdsToastStatus, { title: string; description: string }> = {
  primary: { title: "Pesquisa importada", description: "A conferência segue disponível no histórico." },
  success: { title: "Alteração salva", description: "O preço foi atualizado nesta praça." },
  error: { title: "Não foi possível salvar", description: "Tente novamente ou contate o suporte." },
  warning: { title: "Revise os dados", description: "Alguns produtos ficaram sem preço." },
  neutral: { title: "Lembrete", description: "A pesquisa vence em 3 dias." },
};

const toastColor = computed(() => status.value);

/** Mesmo mapeamento do `AdsToast`: o botão usa as cores de status do ADS. */
const buttonColor = computed((): AdsButtonColor => {
  if (status.value === "error") return "warning";
  if (status.value === "warning") return "attention";
  return status.value;
});

const language = computed(() => (component.value === "flutuante" ? "ts" : "vue"));

const toast = useToast();

const showFloatingToast = () => {
  const message = messages[status.value];
  toast.add({
    title: message.title,
    description: message.description,
    color: toastColor.value,
  });
};

watch(component, (next) => {
  if (next === "arquivo" && status.value === "primary") status.value = "success";
  if (next === "arquivo" && status.value === "warning") status.value = "error";
  if (next === "arquivo" && status.value === "neutral") status.value = "error";
});

const code = computed(() => {
  if (component.value === "toast") {
    return buildTag("AdsToast", [
      attr(true, "status", status.value),
      attr(app.value, "app"),
      attr(!closable.value, ":closable", "false"),
      attr(actionOn.value, "action-label", "Tentar novamente"),
    ]);
  }

  if (component.value === "flutuante") {
    const message = messages[status.value];
    return [
      "toast.add({",
      `  title: "${message.title}",`,
      `  description: "${message.description}",`,
      `  color: "${toastColor.value}",`,
      "});",
    ].join("\n");
  }

  if (component.value === "arquivo") {
    if (status.value === "error") {
      return buildTag("AdsFileCard", [
        attr(true, "name", "planilha.csv"),
        attr(true, "detail", "2.0 KB"),
        attr(true, "status", "error"),
        attr(true, "message", "O arquivo passa de 5 MB."),
        attr(removable.value, "removable"),
      ]);
    }
    return buildTag("AdsFileCard", [
      attr(true, "name", "01-sucesso-todas-redes.xlsx"),
      attr(true, "detail", "17.2 KB"),
      attr(removable.value, "removable"),
    ]);
  }

  if (tooltipType.value === "UTooltip") {
    const button = buildTag("AdsButton", [attr(true, "type", "outline"), attr(true, "label", "Passe o mouse")]);
    return buildTag("UTooltip", [attr(true, "arrow"), attr(true, "text", "Ação principal.")], indent(button));
  }

  const span = buildTag(
    "span",
    [attr(true, "class", "block truncate text-sm text-[var(--ads-text-primary)]")],
    "Preço médio ponderado dos concorrentes mapeados nesta praça.",
  );
  return buildTag(
    "InvertedTooltip",
    [attr(true, "text", "Preço médio ponderado dos concorrentes mapeados nesta praça.")],
    indent(span),
  );
});
</script>
