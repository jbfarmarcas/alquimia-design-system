<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.stepper">
    <template #preview>
      <div
        class="mx-auto flex w-full min-w-0 flex-col gap-8"
        :class="previewWidthClass"
      >
        <!-- Só o stepper rola; os botões ficam fixos -->
        <div
          class="overflow-x-auto p-1"
          :class="scrollerClass"
        >
          <AdsStepper
            v-model="currentStep"
            :steps="steps"
            :variant="variant"
            :orientation="orientation"
            :indicator="indicator"
            :show-labels="showLabels"
            :clickable="clickable"
            :allow-forward="allowForward"
            aria-label="Progresso do pedido"
          />
        </div>

        <div class="flex items-center justify-center gap-3">
          <UButton
            variant="outline"
            color="neutral"
            size="sm"
            :disabled="currentStep === 0"
            @click="currentStep = Math.max(0, currentStep - 1)"
          >
            Voltar
          </UButton>
          <span class="text-sm text-[var(--ads-text-secondary)]">Passo {{ currentStep + 1 }} / {{ steps.length }}</span>
          <UButton
            size="sm"
            :disabled="currentStep === steps.length - 1"
            @click="currentStep = Math.min(steps.length - 1, currentStep + 1)"
          >
            Avançar
          </UButton>
        </div>
      </div>
    </template>

    <template #params>
      <DocsParam label="Variante">
        <AdsSegmentedTabs v-model="variant" :items="variantItems" aria-label="Variante do stepper" />
      </DocsParam>
      <DocsParam v-if="variant === 'visual'" label="Orientação">
        <AdsSegmentedTabs v-model="orientation" :items="orientationItems" aria-label="Orientação do stepper" />
      </DocsParam>
      <DocsParam v-if="variant === 'visual'" label="Indicador">
        <AdsSegmentedTabs v-model="indicator" :items="indicatorItems" aria-label="Indicador do passo" />
      </DocsParam>
      <DocsParam label="Passos">
        <AdsSegmentedTabs v-model="stepCount" :items="stepCountItems" aria-label="Quantidade de passos" />
      </DocsParam>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="clickable" label="Clicável" />
        <AdsSwitch v-if="clickable" v-model="allowForward" label="Permitir avançar" />
        <AdsSwitch v-model="showLabels" label="Rótulos" />
      </div>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsStepper from "../../../../../app/components/AdsStepper.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const currentStep = ref(1);
const variant = ref<"simple" | "visual">("visual");
const orientation = ref<"horizontal" | "vertical">("horizontal");
const indicator = ref<"icon" | "number">("number");
const showLabels = ref(true);
const clickable = ref(true);
const allowForward = ref(false);
const stepCount = ref("4");

const variantItems = [
  { label: "Visual", value: "visual" },
  { label: "Simples", value: "simple" },
];

const orientationItems = [
  { label: "Horizontal", value: "horizontal" },
  { label: "Vertical", value: "vertical" },
];

const indicatorItems = [
  { label: "Número", value: "number" },
  { label: "Ícone", value: "icon" },
];

const stepCountItems = [
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
];

const allSteps = [
  { label: "Dados", description: "Informações básicas", icon: "i-lucide-user" },
  { label: "Endereço", description: "Onde fica a loja", icon: "i-lucide-map-pin" },
  { label: "Pagamento", description: "Forma de cobrança", icon: "i-lucide-credit-card" },
  { label: "Revisão", description: "Confira os dados", icon: "i-lucide-clipboard-check" },
  { label: "Confirmação", description: "Envie o pedido", icon: "i-lucide-circle-check" },
  { label: "Conclusão", description: "Tudo pronto", icon: "i-lucide-party-popper" },
];

const steps = computed(() => allSteps.slice(0, Number(stepCount.value)));

// A barra de rolagem fica abaixo dos passos, sem cobrir a descrição.
const scrollerClass = computed(() => {
  if (variant.value !== "visual") return "";
  if (orientation.value === "vertical") return "mx-auto w-fit max-w-full";
  return "pb-4";
});

const previewWidthClass = computed(() => {
  if (variant.value === "simple") return "max-w-3xl";
  if (orientation.value === "horizontal") return "max-w-5xl";
  return "max-w-lg";
});

watch(stepCount, () => {
  if (currentStep.value >= steps.value.length) {
    currentStep.value = steps.value.length - 1;
  }
});

const code = computed(() =>
  buildTag("AdsStepper", [
    attr(true, "v-model", "currentStep"),
    attr(true, ":steps", "steps"),
    attr(variant.value !== "simple", "variant", variant.value),
    attr(variant.value === "visual" && orientation.value !== "horizontal", "orientation", orientation.value),
    attr(variant.value === "visual" && indicator.value !== "number", "indicator", indicator.value),
    attr(!showLabels.value, ":show-labels", "false"),
    attr(clickable.value, "clickable", true),
    attr(clickable.value && allowForward.value, "allow-forward", true),
    attr(true, "aria-label", "Progresso do pedido"),
  ]),
);
</script>
