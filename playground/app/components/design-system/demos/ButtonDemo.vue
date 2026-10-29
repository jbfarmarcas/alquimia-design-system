<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.botoes">
    <template #preview>
      <AdsButton
        :type="buttonType"
        :color="buttonColor"
        :size="buttonSize"
        :state="previewState"
        :disabled="buttonState === 'disabled'"
        :loading="loading"
        :label="buttonContent === 'icon' ? '' : buttonType === 'ia' ? 'Ajude a IA' : 'Button Test'"
        :leading="buttonContent === 'label' && leading"
        :trailing="buttonContent === 'label' && trailing"
        :aria-label="buttonContent === 'icon' ? 'Ação' : undefined"
      />
    </template>

    <template #params>
      <DocsParam label="Tipo">
        <AdsSegmentedTabs v-model="buttonType" :items="typeItems" aria-label="Tipo do botão" />
      </DocsParam>

      <div class="grid items-end gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AdsFilterSelect
          v-if="buttonType !== 'ia'"
          v-model="buttonColor"
          type="radio"
          label="Cor"
          block
          :searchable="false"
          :options="colorOptions"
        />
        <DocsParam label="Tamanho">
          <AdsSegmentedTabs v-model="buttonSize" :items="sizeItems" aria-label="Tamanho do botão" />
        </DocsParam>
        <DocsParam label="Conteúdo">
          <AdsSegmentedTabs v-model="buttonContent" :items="contentItems" aria-label="Conteúdo do botão" />
        </DocsParam>
      </div>

      <DocsParam label="Estado">
        <AdsSegmentedTabs v-model="buttonState" :items="stateItems" aria-label="Estado do botão" />
        <p
          v-if="buttonType === 'outline' || buttonType === 'unfilled'"
          class="mt-2 text-xs leading-relaxed text-[var(--ads-text-secondary)]"
        >
          Outline e unfilled não têm pressed.
        </p>
        <p v-else-if="buttonType === 'ia'" class="mt-2 text-xs leading-relaxed text-[var(--ads-text-secondary)]">
          O brilho pulsa sozinho. Hover e pressed seguram o brilho mais forte. A cor de status não entra nesse tipo.
        </p>
      </DocsParam>

      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-if="buttonContent === 'label'" v-model="leading" label="Ícone à esquerda" />
        <AdsSwitch v-if="buttonContent === 'label'" v-model="trailing" label="Ícone à direita" />
        <AdsSwitch v-model="loading" label="Carregando" />
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
import AdsButton, {
  type AdsButtonColor,
  type AdsButtonSize,
  type AdsButtonType,
} from "../../../../../app/components/AdsButton.vue";
import AdsFilterSelect from "../../../../../app/components/AdsFilterSelect.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

type ButtonState = "active" | "hover" | "pressed" | "disabled";

const buttonType = ref<AdsButtonType>("filled");
const buttonColor = ref<AdsButtonColor>("primary");
const buttonSize = ref<AdsButtonSize>("md");
const buttonContent = ref<"label" | "icon">("label");
const buttonState = ref<ButtonState>("active");
const leading = ref(true);
const trailing = ref(true);
const loading = ref(false);

const typeItems = [
  { label: "Filled", value: "filled" },
  { label: "Outline", value: "outline" },
  { label: "Unfilled", value: "unfilled" },
  { label: "Secondary", value: "secondary" },
  { label: "IA", value: "ia" },
];

const colorOptions = [
  { value: "primary", label: "Primary" },
  { value: "success", label: "Success" },
  { value: "attention", label: "Attention" },
  { value: "warning", label: "Warning" },
  { value: "new", label: "New" },
  { value: "innovation", label: "Inovação" },
  { value: "blocked", label: "Blocked" },
  { value: "neutral", label: "Neutral" },
];

const sizeItems = [
  { label: "Desktop", value: "md" },
  { label: "Mobile", value: "sm" },
];

const contentItems = [
  { label: "Rótulo", value: "label" },
  { label: "Só ícone", value: "icon" },
];

const stateItems = computed(() => {
  const items = [
    { label: "Ativo", value: "active" },
    { label: "Hover", value: "hover" },
    { label: "Pressed", value: "pressed" },
    { label: "Desabilitado", value: "disabled" },
  ];
  if (buttonType.value === "outline" || buttonType.value === "unfilled") {
    return items.filter((item) => item.value !== "pressed");
  }
  return items;
});

const previewState = computed(() =>
  buttonState.value === "hover" || buttonState.value === "pressed" ? buttonState.value : null,
);

watch(buttonType, (type) => {
  if (type === "ia") leading.value = true;
  if (buttonState.value === "pressed" && type !== "filled" && type !== "secondary" && type !== "ia") {
    buttonState.value = "active";
  }
});

const code = computed(() =>
  buildTag("AdsButton", [
    attr(buttonType.value !== "filled", "type", buttonType.value),
    attr(buttonColor.value !== "primary", "color", buttonColor.value),
    attr(buttonSize.value !== "md", "size", buttonSize.value),
    attr(buttonContent.value === "icon", "aria-label", "Ação"),
    attr(buttonContent.value === "label", "label", buttonType.value === "ia" ? "Ajude a IA" : "Button Test"),
    attr(buttonContent.value === "label" && leading.value, "leading"),
    attr(buttonContent.value === "label" && trailing.value, "trailing"),
    attr(previewState.value !== null, "state", previewState.value ?? undefined),
    attr(buttonState.value === "disabled", "disabled"),
    attr(loading.value, "loading"),
  ]),
);
</script>
