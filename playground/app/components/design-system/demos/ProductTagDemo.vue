<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['product-tag']">
    <template #preview>
      <AdsProductTag :product="product" />
    </template>

    <template #params>
      <AdsFilterSelect
        v-model="product"
        type="radio"
        label="Produto"
        block
        :searchable="false"
        :options="productOptions"
      />
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsFilterSelect from "../../../../../app/components/AdsFilterSelect.vue";
import AdsProductTag, { type AdsProductTagName } from "../../../../../app/components/AdsProductTag.vue";

const product = ref<AdsProductTagName>("performance");

const productOptions = [
  { value: "performance", label: "Performance" },
  { value: "pricing", label: "Pricing" },
  { value: "marketing", label: "Marketing" },
  { value: "gestao", label: "Gestão" },
  { value: "vendas", label: "Vendas" },
];

const code = computed(() => buildTag("AdsProductTag", [attr(true, "product", product.value)]));
</script>
