<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['farmarcas-pill']">
    <template #preview>
      <AdsFarmarcasPill :department="department" />
    </template>

    <template #params>
      <AdsFilterSelect
        v-model="department"
        type="radio"
        label="Departamento"
        block
        :searchable="false"
        :options="departmentOptions"
      />
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsFarmarcasPill, { type AdsFarmarcasDepartment } from "../../../../../app/components/AdsFarmarcasPill.vue";
import AdsFilterSelect from "../../../../../app/components/AdsFilterSelect.vue";

const department = ref<AdsFarmarcasDepartment>("expansao");

const departmentOptions = [
  { value: "expansao", label: "Expansão" },
  { value: "marketing", label: "Marketing" },
  { value: "ti", label: "TI" },
  { value: "financeiro", label: "Financeiro" },
  { value: "produto", label: "produto" },
];

const code = computed(() => buildTag("AdsFarmarcasPill", [attr(true, "department", department.value)]));
</script>
