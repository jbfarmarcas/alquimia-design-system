<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.modal">
    <template #preview>
      <AdsButton label="Abrir modal" @click="open = true" />
      <AdsModal
        v-model:open="open"
        :variant="variant"
        :size="size"
        :icon="icon ? 'i-lucide-align-center' : undefined"
        title="Confirmar alteração"
        :description="description ? DESCRIPTION : undefined"
        :closable="closable"
      />
    </template>

    <template #params>
      <div class="flex flex-wrap items-end gap-x-8 gap-y-5">
        <DocsParam label="Variante">
          <AdsSegmentedTabs v-model="variant" :items="variantItems" aria-label="Variante do modal" />
        </DocsParam>
        <DocsParam label="Tamanho">
          <AdsSegmentedTabs v-model="size" :items="sizeItems" aria-label="Tamanho do modal" />
        </DocsParam>
      </div>

      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="icon" label="Ícone" />
        <AdsSwitch v-model="description" label="Texto de apoio" />
        <AdsSwitch v-model="closable" label="Fechar (X)" />
      </div>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsButton from "../../../../../app/components/AdsButton.vue";
import AdsModal, { type AdsModalSize, type AdsModalVariant } from "../../../../../app/components/AdsModal.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const DESCRIPTION = "O texto de apoio explica a consequência. Cancelar fecha. Continuar segue a ação.";

const open = ref(false);
const variant = ref<AdsModalVariant>("dialog");
const size = ref<AdsModalSize>("md");
const icon = ref(true);
const description = ref(true);
const closable = ref(true);

const variantItems = [
  { label: "Dialog", value: "dialog" },
  { label: "Sheet", value: "sheet" },
];

const sizeItems = [
  { label: "MD", value: "md" },
  { label: "LG", value: "lg" },
  { label: "XL", value: "xl" },
  { label: "2XL", value: "2xl" },
  { label: "3XL", value: "3xl" },
];

const code = computed(() =>
  buildTag("AdsModal", [
    attr(true, "v-model:open", "open"),
    attr(variant.value !== "dialog", "variant", variant.value),
    attr(size.value !== "md", "size", size.value),
    attr(icon.value, "icon", "i-lucide-align-center"),
    attr(true, "title", "Confirmar alteração"),
    attr(description.value, "description", DESCRIPTION),
    attr(!closable.value, ":closable", "false"),
  ]),
);
</script>
