<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['filter-select']">
    <template #preview>
      <div class="w-72 max-w-full">
        <AdsFilterSelect
          v-model="selection"
          :type="kind"
          label="Label"
          placeholder="Placeholder"
          :hint="supportHint"
          :error="filterState === 'erro' ? ERROR : ''"
          :disabled="filterState === 'desabilitado'"
          :ai-suggestion="filterState === 'ia'"
          :options="options"
        />
      </div>
    </template>

    <template #params>
      <DocsParam label="Tipo">
        <AdsSegmentedTabs v-model="kind" :items="kindItems" aria-label="Tipo do filtro" />
      </DocsParam>
      <DocsParam label="Estado">
        <AdsSegmentedTabs v-model="filterState" :items="stateItems" aria-label="Estado do filtro" />
      </DocsParam>
      <AdsSwitch v-model="hintOn" label="Orientação" />
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsFilterSelect from "../../../../../app/components/AdsFilterSelect.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

type FilterKind = "checkbox" | "radio" | "month";
type FilterState = "vazio" | "preenchido" | "ia" | "erro" | "desabilitado";

const HINT = "Orientação curta sobre o campo.";
const ERROR = "Informe um valor para continuar.";

const kind = ref<FilterKind>("checkbox");
const filterState = ref<FilterState>("vazio");
const hintOn = ref(true);
const selection = ref<string | string[]>([]);

const kindItems = [
  { label: "Checkbox", value: "checkbox" },
  { label: "Radio", value: "radio" },
  { label: "Mês", value: "month" },
];

const stateItems = [
  { label: "Vazio", value: "vazio" },
  { label: "Preenchido", value: "preenchido" },
  { label: "IA", value: "ia" },
  { label: "Erro", value: "erro" },
  { label: "Desabilitado", value: "desabilitado" },
];

/** 50 bairros de SP — volume alto para demonstrar rolagem e busca */
const checkboxOptions = [
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
  { value: "agua-rasa", label: "Água Rasa" },
  { value: "aricanduva", label: "Aricanduva" },
];

/** 12 períodos — volume razoável para radio */
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

const options = computed(() => (kind.value === "checkbox" ? checkboxOptions : radioOptions));
const supportHint = computed(() => (hintOn.value && filterState.value !== "erro" ? HINT : ""));

watch([kind, filterState], () => {
  if (filterState.value !== "preenchido" && filterState.value !== "ia") {
    selection.value = kind.value === "checkbox" ? [] : "";
    return;
  }
  if (kind.value === "checkbox") selection.value = ["centro", "jardins", "moema", "pinheiros"];
  else if (kind.value === "radio") selection.value = "trimestre";
  else selection.value = "2023-09";
});

const code = computed(() =>
  buildTag("AdsFilterSelect", [
    attr(true, "v-model", "selection"),
    attr(true, "type", kind.value),
    attr(true, "label", "Label"),
    attr(kind.value !== "month", ":options", "options"),
    attr(filterState.value === "erro", "error", ERROR),
    attr(supportHint.value !== "", "hint", HINT),
    attr(filterState.value === "desabilitado", "disabled"),
    attr(filterState.value === "ia", "ai-suggestion"),
  ]),
);
</script>
