<template>
  <DesignSystemFrame
    v-model:active-id="activeId"
    title="Alquimia Design System"
    lede="Cada seção mostra o componente real, os parâmetros que mudam o exemplo, o código para copiar e a tabela de propriedades."
    :sections="sections"
  >
    <nav class="mt-12" aria-label="Índice">
      <ul class="grid gap-3 sm:grid-cols-2">
        <li v-for="section in sections" :key="section.id">
          <a
            :href="`#${section.id}`"
            class="flex h-full flex-col gap-2 rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] px-5 py-4 transition-colors duration-150 ease-out hover:border-primary-200 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            @click="activeId = section.id"
          >
            <span class="font-bold text-[var(--ads-text-primary)]">{{ section.label }}</span>
            <span class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
              {{ section.purpose }}
            </span>
          </a>
        </li>
      </ul>
    </nav>

    <section
      v-for="section in sections"
      :id="section.id"
      :key="section.id"
      class="mt-20 scroll-mt-24 flex flex-col gap-8 md:scroll-mt-12"
    >
      <DesignSystemSectionHeading
        :section="section"
        :copied-name="copiedName"
        @copy="copyComponentName"
      />
      <component :is="demos[section.id]" />
    </section>
  </DesignSystemFrame>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import DesignSystemFrame from "../../components/DesignSystemFrame.vue";
import DesignSystemSectionHeading from "../../components/DesignSystemSectionHeading.vue";
import ButtonDemo from "../../components/design-system/demos/ButtonDemo.vue";
import ColorsDemo from "../../components/design-system/demos/ColorsDemo.vue";
import ControlsDemo from "../../components/design-system/demos/ControlsDemo.vue";
import CardDemo from "../../components/design-system/demos/CardDemo.vue";
import FeedbackDemo from "../../components/design-system/demos/FeedbackDemo.vue";
import FieldsDemo from "../../components/design-system/demos/FieldsDemo.vue";
import FilterDemo from "../../components/design-system/demos/FilterDemo.vue";
import LoadingDemo from "../../components/design-system/demos/LoadingDemo.vue";
import ModalDemo from "../../components/design-system/demos/ModalDemo.vue";
import PillsDemo from "../../components/design-system/demos/PillsDemo.vue";
import TabsDemo from "../../components/design-system/demos/TabsDemo.vue";

definePageMeta({
  name: "design-system",
  layout: "design-system",
});

const sections = [
  {
    id: "cores",
    label: "Cores",
    purpose: "Escalas do ADS. O passo é o nome do token; o hex é o valor no código.",
    components: [],
  },
  {
    id: "botoes",
    label: "Botão",
    purpose: "Ação de tela. O exemplo segue os parâmetros: tipo, cor, tamanho, conteúdo e estado. Outline e unfilled não têm pressed. O tipo IA pulsa o brilho.",
    components: ["AdsButton"],
  },
  {
    id: "campos",
    label: "Campos",
    purpose: "Formulário, número, busca, texto longo e data. O rótulo fica acima do campo.",
    components: ["AdsInput", "AdsNumberInput", "AdsSearchInput", "AdsTextarea", "AdsDatePicker"],
  },
  {
    id: "filtro",
    label: "Filtro",
    purpose: "Select com lista, busca ou calendário de mês. Rótulo longo ganha reticências e tooltip.",
    components: ["AdsFilterSelect"],
  },
  {
    id: "abas",
    label: "Abas",
    purpose: "Troca de visão na mesma tela: link para seções, segmented para um filtro curto.",
    components: ["AdsTabs", "AdsSegmentedTabs"],
  },
  {
    id: "feedback",
    label: "Feedback",
    purpose: "Aviso, toast flutuante, arquivo escolhido e tooltip. O arquivo usa success e warning do ADS.",
    components: ["AdsToast", "AdsFileCard", "UTooltip", "InvertedTooltip"],
  },
  {
    id: "carregando",
    label: "Carregando",
    purpose: "Espera na tela. Spinner na área vazia, skeleton quando o formato já é conhecido, shimmer quando o conteúdo continua visível. Ação no botão, processo de tela, percentual e o esqueleto de tabela usam a peça de cada caso.",
    components: ["AdsLoading", "AdsButton", "useOverlayLoading", "ProgressBarLoading", "ProductTableSkeleton"],
  },
  {
    id: "pills",
    label: "Pills",
    purpose: "Estado e contagem em uma peça compacta.",
    components: ["AdsBadge", "AdsBroadcast", "AdsPill", "AdsNotabilityPill", "AdsMiniPill"],
  },
  {
    id: "controles",
    label: "Controles",
    purpose: "Switch, checkbox e radio. Texto de 14, regular, na cor secondary.",
    components: ["AdsSwitch", "AdsCheckbox", "AdsRadio"],
  },
  {
    id: "modal",
    label: "Modal",
    purpose: "Confirmação que interrompe: título, texto de apoio e duas ações.",
    components: ["AdsModal"],
  },
  {
    id: "card",
    label: "Card",
    purpose: "AdsFeatureCard é a entrada de um fluxo: ícone, título, descrição e seta, com 396px. AdsCard é o cartão de conteúdo e substitui UCard. AdsMetricCard é o número em destaque.",
    components: ["AdsFeatureCard", "AdsCard", "AdsMetricCard"],
  },
] as const;

const demos = {
  cores: ColorsDemo,
  botoes: ButtonDemo,
  campos: FieldsDemo,
  filtro: FilterDemo,
  abas: TabsDemo,
  feedback: FeedbackDemo,
  carregando: LoadingDemo,
  pills: PillsDemo,
  controles: ControlsDemo,
  modal: ModalDemo,
  card: CardDemo,
} as const;

const activeId = ref<(typeof sections)[number]["id"] | "">("");
const copiedName = ref("");
let sectionObserver: IntersectionObserver | undefined;
let copyTimer: ReturnType<typeof setTimeout> | undefined;
const visibleSections = new Map<string, number>();

const copyComponentName = async (name: string) => {
  let copied = false;
  try {
    await navigator.clipboard.writeText(name);
    copied = true;
  } catch {
    const area = document.createElement("textarea");
    area.value = name;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.append(area);
    area.select();
    copied = document.execCommand("copy");
    area.remove();
  }
  if (!copied) return;
  copiedName.value = name;
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    if (copiedName.value === name) copiedName.value = "";
  }, 1600);
};

onMounted(() => {
  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleSections.set(entry.target.id, entry.intersectionRatio);
        else visibleSections.delete(entry.target.id);
      }
      const current = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0];
      activeId.value = (current?.[0] as (typeof sections)[number]["id"]) ?? "";
    },
    { root: document.querySelector("main"), rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.4] },
  );

  for (const section of sections) {
    const element = document.getElementById(section.id);
    if (element) sectionObserver.observe(element);
  }
});

onBeforeUnmount(() => {
  sectionObserver?.disconnect();
  visibleSections.clear();
  clearTimeout(copyTimer);
});
</script>
