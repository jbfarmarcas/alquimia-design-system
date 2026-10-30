<template>
  <div v-if="id === 'button'" class="flex flex-col items-start gap-3">
    <AdsButton label="Primário" />
    <AdsButton state="hover" label="Hover" />
    <AdsButton state="pressed" label="Pressed" />
    <AdsButton state="disabled" label="Desabilitado" />
    <AdsButton type="secondary" label="Secundário" />
    <AdsButton label="Com ícone" icon="i-lucide-sparkles" leading />
    <AdsButton size="sm" label="Pequeno" />
  </div>

  <div v-else-if="id === 'input'" class="flex flex-col gap-4">
    <AdsInput v-model="text" label="Nome" placeholder="Digite" />
    <AdsInput model-value="Em foco" label="Foco" state="focus" />
    <AdsInput model-value="Inválido" label="Erro" error="Confira o valor" state="error" />
    <AdsInput model-value="Indisponível" label="Desabilitado" state="disabled" />
  </div>

  <div v-else-if="id === 'number'" class="flex flex-col gap-4">
    <AdsNumberInput v-model="amount" label="Quantidade" />
  </div>

  <div v-else-if="id === 'search'">
    <AdsSearchInput v-model="query" placeholder="Buscar" />
  </div>

  <div v-else-if="id === 'textarea'">
    <AdsTextarea v-model="note" label="Observação" placeholder="Escreva" />
  </div>

  <div v-else-if="id === 'date'" class="flex flex-col items-start gap-4">
    <AdsDatePicker v-model="date" />
    <AdsMonthPicker v-model="month" />
  </div>

  <div v-else-if="id === 'filter'">
    <AdsFilterSelect
      v-model="filter"
      type="checkbox"
      label="Rede"
      placeholder="Selecione"
      :options="filterOptions"
    />
  </div>

  <div v-else-if="id === 'tabs'" class="w-full">
    <AdsTabs v-model="tab" :items="tabItems" :content="false" />
  </div>

  <div v-else-if="id === 'segmented'" class="w-full">
    <AdsSegmentedTabs v-model="tab" :items="tabItems" aria-label="Abas de exemplo" />
  </div>

  <div v-else-if="id === 'toast'" class="flex w-full flex-col gap-3">
    <AdsToast status="primary" />
    <AdsToast status="error" />
    <AdsToast appearance="status" status="success" subtitle="Explicação opcional" />
  </div>

  <div v-else-if="id === 'file'" class="w-full">
    <AdsFileCard name="planilha.xlsx" detail="17.2 KB" />
  </div>

  <div v-else-if="id === 'tooltip'" class="flex flex-col items-start gap-4">
    <UTooltip arrow text="Ação principal.">
      <AdsButton type="outline" label="Passe o mouse" />
    </UTooltip>
    <InvertedTooltip text="Preço médio desta praça.">
      <span class="text-sm text-[var(--ads-text-primary)]">Tooltip invertido</span>
    </InvertedTooltip>
    <AdsTooltip title="Título" description="Descrição branca." />
    <AdsSmalltip />
  </div>

  <div v-else-if="id === 'loading'" class="flex w-full flex-col gap-4">
    <AdsLoading label="Carregando" />
    <AdsLoading variant="skeleton" :lines="3" />
  </div>

  <div v-else-if="id === 'progress'" class="w-full">
    <ProgressBarLoading :percent="40" />
  </div>

  <div v-else-if="id === 'badge'" class="flex items-center gap-3">
    <AdsBadge color="primary" />
    <AdsBadge color="primary" mini />
  </div>

  <div v-else-if="id === 'broadcast'" class="flex flex-wrap gap-3">
    <div class="flex flex-col items-start gap-1.5">
      <span class="text-xs font-medium text-[var(--ads-text-secondary)]">warning</span>
      <AdsBroadcast status="warning" label="ALERTA" />
    </div>
    <div class="flex flex-col items-start gap-1.5">
      <span class="text-xs font-medium text-[var(--ads-text-secondary)]">success</span>
      <AdsBroadcast status="success" label="AO VIVO" />
    </div>
  </div>

  <div v-else-if="id === 'pill'">
    <AdsPill />
  </div>

  <div v-else-if="id === 'notability'">
    <AdsNotabilityPill notability="image" />
  </div>

  <div v-else-if="id === 'mini'" class="flex flex-wrap gap-2">
    <AdsMiniPill type="nao-iniciado" />
    <AdsMiniPill type="pausado" />
    <AdsMiniPill type="novo" />
  </div>

  <div v-else-if="id === 'switch'" class="flex flex-col items-start gap-3">
    <AdsSwitch v-model="on" label="Ativo" />
    <AdsSwitch :model-value="false" label="Inativo" />
  </div>

  <div v-else-if="id === 'checkbox'" class="flex flex-col items-start gap-3">
    <AdsCheckbox v-model="checked" label="Selecionado" />
    <AdsCheckbox :model-value="false" label="Disponível" />
  </div>

  <div v-else-if="id === 'radio'" class="flex flex-col items-start gap-3">
    <AdsRadio v-model="choice" value="a" name="token-radio" label="Opção A" />
    <AdsRadio v-model="choice" value="b" name="token-radio" label="Opção B" />
  </div>

  <div v-else-if="id === 'modal'" class="flex flex-col items-start gap-3">
    <AdsButton label="Abrir modal" @click="modalOpen = true" />
    <AdsModal
      v-model:open="modalOpen"
      title="Confirmar alteração"
      description="O raio, o padding e as cores deste cartão vêm dos tokens do modal."
    />
  </div>

  <div v-else-if="id === 'feature'" class="w-full">
    <AdsFeatureCard
      title="Simulação"
      description="Simulações de preços e cenários."
      icon="i-lucide-calculator"
    />
  </div>

  <div v-else-if="id === 'card'" class="w-full">
    <AdsCard
      title="Pesquisa 14/09"
      description="12 lojas, 3 concorrentes, coleta até 30/10."
    />
  </div>

  <div v-else-if="id === 'menu'" class="flex justify-center">
    <AdsMenuBar />
  </div>
  <div v-else-if="id === 'navbar-app'" class="w-full">
    <AdsNavbarApp />
  </div>
  <div v-else-if="id === 'navbar-desk'" class="w-full overflow-x-auto">
    <AdsNavbarDesk />
  </div>
  <div v-else-if="id === 'side'" class="max-h-80 overflow-auto">
    <AdsSideMenu :items="sideItems" :default-open="['mae']" />
  </div>
  <div v-else-if="id === 'footer'" class="w-full">
    <AdsFooter />
  </div>
  <div v-else-if="id === 'product-tag'">
    <AdsProductTag product="performance" />
  </div>
  <div v-else-if="id === 'button-group'">
    <AdsButtonGroup v-model="group" :options="groupOptions" />
  </div>
  <div v-else-if="id === 'button-menu'">
    <AdsButtonMenu :options="menuOptions" />
  </div>
  <div v-else-if="id === 'list'" class="w-full">
    <AdsListDropdown v-model="listValue" :options="filterOptions" />
  </div>
  <div v-else-if="id === 'pagination'">
    <AdsPagination v-model:page="page" :total-pages="8" />
  </div>
  <div v-else-if="id === 'empty'">
    <AdsEmptyState :show-actions="false" />
  </div>
  <div v-else-if="id === 'funcional'" class="flex items-center gap-3">
    <span class="size-8 rounded-full bg-[var(--ads-funcional-warning-200)]" />
    <span class="size-8 rounded-full bg-[var(--ads-funcional-opportunity-200)]" />
  </div>
  <div v-else-if="id === 'farmarcas'" class="flex flex-wrap justify-center gap-2">
    <AdsFarmarcasPill department="expansao" />
    <AdsFarmarcasPill department="marketing" />
    <AdsFarmarcasPill department="ti" />
  </div>
  <div v-else-if="id === 'metric'" class="w-full">
    <AdsMetricCard
      title="Receita simulada"
      value="R$ 7.392"
      caption="Atual: R$ 7.570"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  id: string;
}>();

const text = ref("Ana");
const amount = ref(12);
const query = ref("");
const note = ref("");
const date = ref("");
const month = ref("2026-10");
const filter = ref<string[]>([]);
const tab = ref("visao");
const on = ref(true);
const checked = ref(true);
const choice = ref("a");
const modalOpen = ref(false);
const group = ref("mes");
const listValue = ref("norte");
const page = ref(2);
const groupOptions = [
  { value: "dia", label: "Dia" },
  { value: "mes", label: "Mês" },
];
const menuOptions = [
  { value: "a", title: "Opção", subtitle: "Subtítulo", icon: "i-lucide-sparkles" },
];
const sideItems = [
  { id: "mae", label: "Item mãe", icon: "i-lucide-sun", badge: true, children: [{ id: "filho", label: "Filho", icon: "i-lucide-sun", pill: "Novo" }] },
];

const filterOptions = [
  { label: "Rede Norte", value: "norte" },
  { label: "Rede Sul", value: "sul" },
];

const tabItems = [
  { label: "Visão geral", value: "visao" },
  { label: "Concorrentes", value: "concorrentes" },
];
</script>
