<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['metric-card']">
    <template #preview>
      <AdsMetricCard
        class="w-72 max-w-full"
        title="Receita simulada"
        hint="Receita mensal com base na média de unidades vendidas e no preço final."
        :value="empty ? 'Sem dados de pesquisa' : 'R$ 7.392.864,08'"
        :caption="empty ? undefined : 'Atual: R$ 7.570.494,28'"
        :empty="empty"
        :selected="selected"
      >
        <template v-if="!empty" #delta>
          <span class="text-error">-2,3%</span>
        </template>
      </AdsMetricCard>
    </template>

    <template #params>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="empty" label="Sem valor" />
        <AdsSwitch v-model="selected" label="Selecionado" />
      </div>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag, indent } from "../../../utils/code-builder";
import AdsMetricCard from "../../../../../app/components/AdsMetricCard.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const selected = ref(false);
const empty = ref(false);

const deltaSlot = '<template #delta>\n  <span class="text-error">-2,3%</span>\n</template>';

const code = computed(() =>
  buildTag(
    "AdsMetricCard",
    [
      attr(true, "title", "Receita simulada"),
      attr(true, "hint", "Receita mensal com base na média de unidades vendidas e no preço final."),
      attr(true, "value", empty.value ? "Sem dados de pesquisa" : "R$ 7.392.864,08"),
      attr(!empty.value, "caption", "Atual: R$ 7.570.494,28"),
      attr(empty.value, "empty"),
      attr(selected.value, "selected"),
    ],
    empty.value ? undefined : indent(deltaSlot),
  ),
);
</script>
