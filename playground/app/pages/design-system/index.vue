<template>
  <DesignSystemFrame
    v-model:active-id="activeId"
    title="Alquimia Design System"
    lede="Cada seção mostra o componente real, os parâmetros que mudam o exemplo, o código para copiar e a tabela de propriedades."
    :sections="sections"
  >
    <nav class="mt-12 flex flex-col gap-8" aria-label="Índice">
      <div v-for="(group, groupIndex) in catalogGroups" :key="group.name" class="flex flex-col gap-3">
        <p
          v-if="group.sections.length > 1"
          :id="`indice-grupo-${groupIndex}`"
          class="text-[length:var(--ads-font-size-xxxs)] font-bold tracking-[0.14em] text-[var(--ads-text-tertiary)] uppercase"
        >
          {{ group.name }}
        </p>
        <ul
          class="grid gap-3 sm:grid-cols-2"
          :aria-labelledby="group.sections.length > 1 ? `indice-grupo-${groupIndex}` : undefined"
        >
          <li v-for="section in group.sections" :key="section.id">
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
      </div>
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
        :figma="figmaLinksFor(section.id)"
        @copy="copyComponentName"
      />
      <component :is="demos[section.id]" />
    </section>
  </DesignSystemFrame>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, type Component } from "vue";
import DesignSystemFrame from "../../components/DesignSystemFrame.vue";
import DesignSystemSectionHeading from "../../components/DesignSystemSectionHeading.vue";
import { catalogGroups, catalogSections, type CatalogSectionId } from "../../components/design-system/catalog-sections";
import { figmaLinksFor } from "../../components/design-system/figma-links";
import BadgeDemo from "../../components/design-system/demos/BadgeDemo.vue";
import BroadcastDemo from "../../components/design-system/demos/BroadcastDemo.vue";
import ButtonDemo from "../../components/design-system/demos/ButtonDemo.vue";
import ButtonGroupDemo from "../../components/design-system/demos/ButtonGroupDemo.vue";
import ButtonMenuDemo from "../../components/design-system/demos/ButtonMenuDemo.vue";
import CardDemo from "../../components/design-system/demos/CardDemo.vue";
import CharttipDemo from "../../components/design-system/demos/CharttipDemo.vue";
import CheckboxDemo from "../../components/design-system/demos/CheckboxDemo.vue";
import ColorsDemo from "../../components/design-system/demos/ColorsDemo.vue";
import DatePickerDemo from "../../components/design-system/demos/DatePickerDemo.vue";
import DropdownMenuDemo from "../../components/design-system/demos/DropdownMenuDemo.vue";
import EmptyStateDemo from "../../components/design-system/demos/EmptyStateDemo.vue";
import FarmarcasPillDemo from "../../components/design-system/demos/FarmarcasPillDemo.vue";
import FeatureCardDemo from "../../components/design-system/demos/FeatureCardDemo.vue";
import FileCardDemo from "../../components/design-system/demos/FileCardDemo.vue";
import FilterDropdownDemo from "../../components/design-system/demos/FilterDropdownDemo.vue";
import FilterOptionDemo from "../../components/design-system/demos/FilterOptionDemo.vue";
import FilterSelectDemo from "../../components/design-system/demos/FilterSelectDemo.vue";
import FooterDemo from "../../components/design-system/demos/FooterDemo.vue";
import InputDemo from "../../components/design-system/demos/InputDemo.vue";
import ListDropdownDemo from "../../components/design-system/demos/ListDropdownDemo.vue";
import LoadingDemo from "../../components/design-system/demos/LoadingDemo.vue";
import MenuBarDemo from "../../components/design-system/demos/MenuBarDemo.vue";
import MetricCardDemo from "../../components/design-system/demos/MetricCardDemo.vue";
import MiniPillDemo from "../../components/design-system/demos/MiniPillDemo.vue";
import ModalDemo from "../../components/design-system/demos/ModalDemo.vue";
import MonthPickerDemo from "../../components/design-system/demos/MonthPickerDemo.vue";
import NavbarAppDemo from "../../components/design-system/demos/NavbarAppDemo.vue";
import NavbarDeskDemo from "../../components/design-system/demos/NavbarDeskDemo.vue";
import NotabilityPillDemo from "../../components/design-system/demos/NotabilityPillDemo.vue";
import NumberInputDemo from "../../components/design-system/demos/NumberInputDemo.vue";
import NuxtTooltipDemo from "../../components/design-system/demos/NuxtTooltipDemo.vue";
import OverlayLoadingDemo from "../../components/design-system/demos/OverlayLoadingDemo.vue";
import PaginationDemo from "../../components/design-system/demos/PaginationDemo.vue";
import PillDemo from "../../components/design-system/demos/PillDemo.vue";
import ProductTableSkeletonDemo from "../../components/design-system/demos/ProductTableSkeletonDemo.vue";
import ProductTagDemo from "../../components/design-system/demos/ProductTagDemo.vue";
import ProgressBarLoadingDemo from "../../components/design-system/demos/ProgressBarLoadingDemo.vue";
import RadioDemo from "../../components/design-system/demos/RadioDemo.vue";
import SearchInputDemo from "../../components/design-system/demos/SearchInputDemo.vue";
import SegmentedTabsDemo from "../../components/design-system/demos/SegmentedTabsDemo.vue";
import SideMenuDemo from "../../components/design-system/demos/SideMenuDemo.vue";
import SmalltipDemo from "../../components/design-system/demos/SmalltipDemo.vue";
import SteptipDemo from "../../components/design-system/demos/SteptipDemo.vue";
import SwitchDemo from "../../components/design-system/demos/SwitchDemo.vue";
import TabsDemo from "../../components/design-system/demos/TabsDemo.vue";
import TextareaDemo from "../../components/design-system/demos/TextareaDemo.vue";
import ToastDemo from "../../components/design-system/demos/ToastDemo.vue";
import TooltipDemo from "../../components/design-system/demos/TooltipDemo.vue";

definePageMeta({
  name: "design-system",
  layout: "design-system",
});

const sections = catalogSections;

/** Uma demonstração por seção. O `satisfies` acusa id sem demo ou demo sem seção. */
const demos = {
  cores: ColorsDemo,
  button: ButtonDemo,
  "button-group": ButtonGroupDemo,
  "button-menu": ButtonMenuDemo,
  input: InputDemo,
  "number-input": NumberInputDemo,
  "search-input": SearchInputDemo,
  textarea: TextareaDemo,
  "date-picker": DatePickerDemo,
  "month-picker": MonthPickerDemo,
  "filter-select": FilterSelectDemo,
  "list-dropdown": ListDropdownDemo,
  "filter-dropdown": FilterDropdownDemo,
  "filter-option": FilterOptionDemo,
  "dropdown-menu": DropdownMenuDemo,
  tabs: TabsDemo,
  "segmented-tabs": SegmentedTabsDemo,
  toast: ToastDemo,
  "file-card": FileCardDemo,
  "empty-state": EmptyStateDemo,
  pagination: PaginationDemo,
  tooltip: TooltipDemo,
  steptip: SteptipDemo,
  charttip: CharttipDemo,
  smalltip: SmalltipDemo,
  "tooltip-nuxt-ui": NuxtTooltipDemo,
  loading: LoadingDemo,
  "overlay-loading": OverlayLoadingDemo,
  "progress-bar-loading": ProgressBarLoadingDemo,
  "product-table-skeleton": ProductTableSkeletonDemo,
  badge: BadgeDemo,
  broadcast: BroadcastDemo,
  pill: PillDemo,
  "notability-pill": NotabilityPillDemo,
  "mini-pill": MiniPillDemo,
  "farmarcas-pill": FarmarcasPillDemo,
  switch: SwitchDemo,
  checkbox: CheckboxDemo,
  radio: RadioDemo,
  modal: ModalDemo,
  "menu-bar": MenuBarDemo,
  "navbar-app": NavbarAppDemo,
  "navbar-desk": NavbarDeskDemo,
  "side-menu": SideMenuDemo,
  footer: FooterDemo,
  "product-tag": ProductTagDemo,
  "feature-card": FeatureCardDemo,
  card: CardDemo,
  "metric-card": MetricCardDemo,
} as const satisfies Record<CatalogSectionId, Component>;

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
