<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis['panel-card']">
    <template #preview>
      <AdsPanelCard
        v-model:view="view"
        class="w-full"
        title="Informações gerais por perfil de cliente"
        :hint="showHint ? 'Compara as vendas de cada perfil de cliente.' : undefined"
        :subtitle="showSubtitle ? 'Últimos 12 meses' : undefined"
        :view-toggle="viewToggle"
        :loading="loading"
      >
        <!-- Corpo de exemplo: troque pelo gráfico ou pela tabela -->
        <div class="flex h-[320px] items-center justify-center rounded-[var(--ads-radius-sm)] border border-dashed border-[var(--ads-border-subtle)] bg-[var(--ads-surface-main)]">
          <p class="text-[length:var(--ads-font-size-xxs)] text-[var(--ads-text-tertiary)]">
            {{ view === "table" ? "Tabela" : "Gráfico" }} via slot padrão
          </p>
        </div>
      </AdsPanelCard>
    </template>

    <template #params>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <AdsSwitch v-model="showHint" label="Info" />
        <AdsSwitch v-model="showSubtitle" label="Subtítulo" />
        <AdsSwitch v-model="viewToggle" label="Alternar visualização" />
        <AdsSwitch v-model="loading" label="Carregando" />
      </div>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildSfc, buildTag, indent } from "../../../utils/code-builder";
import AdsPanelCard from "../../../../../app/components/AdsPanelCard.vue";
import type { AdsPanelCardView } from "../../../../../app/components/AdsPanelCard.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

const view = ref<AdsPanelCardView>("chart");
const showHint = ref(true);
const showSubtitle = ref(false);
const viewToggle = ref(true);
const loading = ref(false);

const bodySlot = '<MeuGrafico v-if="view === \'chart\'" />\n<MinhaTabela v-else />';

const code = computed(() => {
  const tag = buildTag(
    "AdsPanelCard",
    [
      attr(viewToggle.value, "v-model:view", "view"),
      attr(true, "title", "Informações gerais por perfil de cliente"),
      attr(showHint.value, "hint", "Compara as vendas de cada perfil de cliente."),
      attr(showSubtitle.value, "subtitle", "Últimos 12 meses"),
      attr(viewToggle.value, "view-toggle"),
      attr(loading.value, "loading"),
    ],
    indent(viewToggle.value ? bodySlot : "<!-- gráfico ou tabela -->"),
  );
  if (!viewToggle.value) return tag;
  return buildSfc(
    `import { ref } from "vue";\n\nconst view = ref<"chart" | "table">(${JSON.stringify(view.value)});`,
    tag,
  );
});
</script>
