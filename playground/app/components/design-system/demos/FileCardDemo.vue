<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['file-card']">
    <template #preview>
      <div class="w-full max-w-md">
        <AdsFileCard
          v-if="status === 'error'"
          name="planilha.csv"
          detail="2.0 KB"
          status="error"
          message="O arquivo passa de 5 MB."
          :removable="removable"
        />
        <AdsFileCard v-else name="01-sucesso-todas-redes.xlsx" detail="17.2 KB" :removable="removable" />
      </div>
    </template>

    <template #params>
      <DocsParam label="Status">
        <AdsSegmentedTabs v-model="status" :items="fileStatusItems" aria-label="Status do arquivo" />
      </DocsParam>
      <AdsSwitch v-model="removable" label="Remover" />
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsFileCard from "../../../../../app/components/AdsFileCard.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const status = ref<"success" | "error">("error");
const removable = ref(false);

const fileStatusItems = [
  { label: "Sucesso", value: "success" },
  { label: "Erro", value: "error" },
];

const code = computed(() => {
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
});
</script>
