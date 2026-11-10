<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['feature-card']">
    <template #preview>
      <AdsFeatureCard
        title="Simulação"
        description="Simulações de preços e cenários."
        icon="i-lucide-calculator"
        :color="featureColor"
        :disabled="disabled"
        :hoverable="hoverable"
        :badges="badgesOn ? badges : undefined"
        :footer-text="footerOn ? 'Atualizada hoje' : undefined"
      />
    </template>

    <template #params>
      <AdsFilterSelect
        v-model="featureColor"
        type="radio"
        label="Cor do ícone"
        block
        :searchable="false"
        :options="featureColorOptions"
      />
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="disabled" label="Em breve" />
        <AdsSwitch v-model="hoverable" label="Hover" />
        <AdsSwitch v-model="badgesOn" label="Badges" />
        <AdsSwitch v-model="footerOn" label="Rodapé" />
      </div>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsFeatureCard, { type AdsFeatureCardBadge, type AdsFeatureCardColor } from "../../../../../app/components/AdsFeatureCard.vue";
import AdsFilterSelect from "../../../../../app/components/AdsFilterSelect.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const featureColor = ref<AdsFeatureCardColor>("success");
const disabled = ref(false);
const hoverable = ref(true);
const badgesOn = ref(true);
const footerOn = ref(true);

const badges: AdsFeatureCardBadge[] = [
  { label: "Novo", status: "new" },
  { label: "Preços", status: "default" },
];

const featureColorOptions = [
  { value: "primary", label: "Primary" },
  { value: "success", label: "Success" },
  { value: "attention", label: "Attention" },
  { value: "warning", label: "Warning" },
  { value: "new", label: "New" },
  { value: "blocked", label: "Blocked" },
  { value: "ai", label: "IA" },
];

const code = computed(() =>
  buildTag("AdsFeatureCard", [
    attr(true, "title", "Simulação"),
    attr(true, "description", "Simulações de preços e cenários."),
    attr(true, "icon", "i-lucide-calculator"),
    attr(featureColor.value !== "primary", "color", featureColor.value),
    attr(disabled.value, "disabled"),
    attr(!hoverable.value, ":hoverable", "false"),
    attr(
      badgesOn.value,
      ":badges",
      "[{ label: 'Novo', status: 'new' }, { label: 'Preços', status: 'default' }]",
    ),
    attr(footerOn.value, "footer-text", "Atualizada hoje"),
  ]),
);
</script>
