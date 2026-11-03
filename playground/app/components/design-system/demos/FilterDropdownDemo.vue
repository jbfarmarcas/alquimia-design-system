<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['filter-dropdown']">
    <template #preview>
      <AdsFilterDropdown
        v-if="kind === 'checkbox'"
        v-model="checks"
        type="checkbox"
        :options="checkboxOptions"
        :searchable="searchOn"
        :select-all="selectAllOn"
      />
      <AdsFilterDropdown v-else v-model="choice" type="radio" :options="radioOptions" :searchable="searchOn" />
    </template>

    <template #params>
      <DocsParam label="Tipo">
        <AdsSegmentedTabs v-model="kind" :items="kindItems" aria-label="Tipo do painel" />
      </DocsParam>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="searchOn" label="Busca" />
        <AdsSwitch v-if="kind === 'checkbox'" v-model="selectAllOn" label="Selecionar todos" />
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
import AdsFilterDropdown from "../../../../../app/components/AdsFilterDropdown.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const kind = ref<"checkbox" | "radio">("checkbox");
const checks = ref<string[]>(["centro", "moema"]);
const choice = ref("trimestre");
const searchOn = ref(true);
const selectAllOn = ref(true);

const kindItems = [
  { label: "Checkbox", value: "checkbox" },
  { label: "Radio", value: "radio" },
];

/** 50 bairros de SP — demonstra rolagem, busca e altura máxima */
const checkboxOptions = [
  { value: "agua-rasa", label: "Água Rasa" },
  { value: "aricanduva", label: "Aricanduva" },
  { value: "bela-vista", label: "Bela Vista" },
  { value: "bom-retiro", label: "Bom Retiro" },
  { value: "bras", label: "Brás" },
  { value: "brooklin", label: "Brooklin" },
  { value: "butanta", label: "Butantã" },
  { value: "campo-belo", label: "Campo Belo" },
  { value: "carandiru", label: "Carandiru" },
  { value: "casa-verde", label: "Casa Verde" },
  { value: "centro", label: "Centro" },
  { value: "cidade-tiradentes", label: "Cidade Tiradentes" },
  { value: "consolacao", label: "Consolação" },
  { value: "cursino", label: "Cursino" },
  { value: "ermelino", label: "Ermelino Matarazzo" },
  { value: "freguesia", label: "Freguesia do Ó" },
  { value: "guaianases", label: "Guaianases" },
  { value: "ipiranga", label: "Ipiranga" },
  { value: "itaim-bibi", label: "Itaim Bibi" },
  { value: "itaquera", label: "Itaquera" },
  { value: "jabaquara", label: "Jabaquara" },
  { value: "jacana", label: "Jaçanã" },
  { value: "jardins", label: "Jardins" },
  { value: "jaragua", label: "Jaraguá" },
  { value: "lapa", label: "Lapa" },
  { value: "liberdade", label: "Liberdade" },
  { value: "mandaqui", label: "Mandaqui" },
  { value: "mirandopolis", label: "Mirandópolis" },
  { value: "moema", label: "Moema" },
  { value: "morumbi", label: "Morumbi" },
  { value: "parque-carmo", label: "Parque do Carmo" },
  { value: "penha", label: "Penha" },
  { value: "perus", label: "Perus" },
  { value: "pinheiros", label: "Pinheiros" },
  { value: "pirituba", label: "Pirituba" },
  { value: "ponte-rasa", label: "Ponte Rasa" },
  { value: "ribeirao", label: "Ribeirão" },
  { value: "sacoma", label: "Sacomã" },
  { value: "santana", label: "Santana" },
  { value: "santo-amaro", label: "Santo Amaro" },
  { value: "saude", label: "Saúde" },
  { value: "sao-mateus", label: "São Mateus" },
  { value: "sapopemba", label: "Sapopemba" },
  { value: "tatuape", label: "Tatuapé" },
  { value: "tremebe", label: "Tremembé" },
  { value: "tucuruvi", label: "Tucuruvi" },
  { value: "vila-mariana", label: "Vila Mariana" },
  { value: "vila-nova", label: "Vila Nova" },
  { value: "vila-prudente", label: "Vila Prudente" },
  { value: "vila-sonia", label: "Vila Sônia" },
];

/** 12 períodos — demonstra radio com volume razoável */
const radioOptions = [
  { value: "7d", label: "Últimos 7 dias" },
  { value: "15d", label: "Últimos 15 dias" },
  { value: "mes", label: "Último mês" },
  { value: "bimestre", label: "Último bimestre" },
  { value: "trimestre", label: "Último trimestre" },
  { value: "quadrimestre", label: "Último quadrimestre" },
  { value: "semestre", label: "Último semestre" },
  { value: "ytd", label: "YTD (ano corrente)" },
  { value: "ano", label: "Último ano" },
  { value: "2anos", label: "Últimos 2 anos" },
  { value: "3anos", label: "Últimos 3 anos" },
  { value: "todo", label: "Todo o período" },
];

const code = computed(() =>
  buildTag("AdsFilterDropdown", [
    attr(true, "v-model", kind.value === "checkbox" ? "checks" : "choice"),
    attr(true, "type", kind.value),
    attr(true, ":options", "options"),
    attr(!searchOn.value, ":searchable", "false"),
    attr(kind.value === "checkbox" && !selectAllOn.value, ":select-all", "false"),
  ]),
);
</script>
