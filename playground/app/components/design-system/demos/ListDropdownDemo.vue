<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['list-dropdown']">
    <template #preview>
      <AdsListDropdown v-model="listValue" :options="radioOptions" :search="searchOn" class="max-w-sm" />
    </template>

    <template #params>
      <AdsSwitch v-model="searchOn" label="Busca" />
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsListDropdown from "../../../../../app/components/AdsListDropdown.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const listValue = ref("farmarcas");
const searchOn = ref(true);

/** 30 farmácias/redes — volume alto para demonstrar rolagem e busca */
const radioOptions = [
  { value: "abrafarma", label: "Abrafarma" },
  { value: "araujo", label: "Araujo" },
  { value: "bigfarma", label: "Big Farma" },
  { value: "braspharma", label: "Braspharma" },
  { value: "catedral", label: "Catedral" },
  { value: "drogacenter", label: "Drogacenter" },
  { value: "drogal", label: "Drogal" },
  { value: "drogaria-sao-paulo", label: "Drogaria São Paulo" },
  { value: "drogasil", label: "Drogasil" },
  { value: "drogatel", label: "Drogatel" },
  { value: "drogazul", label: "Drogazul" },
  { value: "farmarcas", label: "Farmarcas" },
  { value: "farmacias-app", label: "Farmácias App" },
  { value: "farmacias-pague-menos", label: "Farmácias Pague Menos" },
  { value: "farmais", label: "FarMais" },
  { value: "farmaprime", label: "FarmaPrime" },
  { value: "farmarede", label: "FarmaRede" },
  { value: "farmasul", label: "FarmaSul" },
  { value: "farmavida", label: "FarmaVida" },
  { value: "gran-pharmaco", label: "Gran Pharmaco" },
  { value: "extrafarma", label: "Extrafarma" },
  { value: "nissei", label: "Nissei" },
  { value: "panvel", label: "Panvel" },
  { value: "parceiro-farma", label: "Parceiro Farma" },
  { value: "raia", label: "Raia" },
  { value: "redepharma", label: "Redepharma" },
  { value: "sao-joao", label: "São João" },
  { value: "ultrafarma", label: "Ultrafarma" },
  { value: "unidroga", label: "Unidroga" },
  { value: "venancio", label: "Venâncio" },
];

const code = computed(() =>
  buildTag("AdsListDropdown", [
    attr(true, "v-model", listValue.value),
    attr(true, ":options", "options"),
    attr(!searchOn.value, ":search", "false"),
  ]),
);
</script>
