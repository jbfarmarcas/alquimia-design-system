<template>
  <UDashboardGroup
    storage-key="ads-docs"
    unit="px"
    class="bg-[var(--ads-surface-main)] text-[var(--ads-text-primary)]"
  >
    <UDashboardSidebar
      id="docs"
      collapsible
      resizable
      :default-size="272"
      :min-size="220"
      :max-size="360"
      :collapsed-size="72"
      :ui="{
        root: 'h-full min-h-0 border-e border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)]',
        header: 'h-auto min-h-(--ui-header-height) border-b border-[var(--ads-border-subtle)] px-4',
        body: 'min-h-0 gap-2 px-3 py-4',
        content: 'bg-[var(--ads-surface-card)]',
      }"
    >
      <template #header="{ collapsed }">
        <NuxtLink
          to="/design-system"
          class="flex min-w-0 items-center gap-2.5 rounded-[var(--ads-radius-sm)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          :class="collapsed ? 'justify-center' : ''"
        >
          <span
            class="grid size-8 shrink-0 place-items-center rounded-[var(--ads-radius-sm)] bg-primary text-sm font-bold text-[var(--ads-text-contrast)]"
          >
            A
          </span>
          <span v-show="!collapsed" class="min-w-0 leading-tight">
            <span class="block truncate text-sm font-bold tracking-[-0.02em] text-[var(--ads-text-primary)]">
              Alquimia
            </span>
            <span class="block truncate text-[length:var(--ads-font-size-xxxs)] text-[var(--ads-text-secondary)]">
              Design System
            </span>
          </span>
        </NuxtLink>
      </template>

      <template #default="{ collapsed }">
        <nav aria-label="Documentação">
          <UNavigationMenu
            orientation="vertical"
            color="primary"
            variant="pill"
            :collapsed="collapsed"
            :tooltip="collapsed"
            :popover="collapsed"
            :items="menuItems"
            :ui="menuUi"
          />
        </nav>
      </template>
    </UDashboardSidebar>

    <UDashboardPanel
      id="docs-panel"
      :ui="{
        root: 'h-full min-h-0 overflow-hidden bg-[var(--ads-surface-main)]',
        body: 'min-h-0 gap-0 overflow-hidden p-0',
      }"
    >
      <template #header>
        <UDashboardNavbar
          :as="{ title: 'p' }"
          :ui="{
            root: 'border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)]',
            title: 'min-w-0 text-[length:var(--ads-font-size-xxs)] font-medium text-[var(--ads-text-secondary)]',
          }"
        >
          <template #leading>
            <UDashboardSidebarCollapse color="neutral" variant="ghost" />
          </template>
          <template #title>
            <span class="shrink-0 text-[var(--ads-text-tertiary)]">Design System</span>
            <UIcon name="i-lucide-chevron-right" class="size-3.5 shrink-0 text-[var(--ads-text-tertiary)]" />
            <span class="truncate font-bold text-[var(--ads-text-primary)]">{{ title }}</span>
            <template v-if="currentSection">
              <UIcon name="i-lucide-chevron-right" class="size-3.5 shrink-0 text-[var(--ads-text-tertiary)]" />
              <span class="truncate font-bold text-[var(--ads-text-primary)]">{{ currentSection.label }}</span>
            </template>
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <main
          class="min-h-0 flex-1 overflow-auto [scrollbar-color:var(--ads-border-subtle)_transparent] [scrollbar-width:thin]"
        >
          <DesignSystemReview :sections="sections">
            <header id="introducao" class="max-w-[70ch]">
              <p class="text-[length:var(--ads-font-size-xxxs)] font-bold tracking-[0.14em] text-[var(--ads-text-brand)] uppercase">
                Alquimia
              </p>
              <h1 class="mt-3 text-[length:var(--ads-font-size-lg)] font-bold leading-[1.12] tracking-[-0.03em] text-[var(--ads-text-primary)]">
                {{ title }}
              </h1>
              <p class="mt-4 max-w-[62ch] text-base leading-relaxed text-[var(--ads-text-secondary)]">
                {{ lede }}
              </p>
            </header>
            <slot />
          </DesignSystemReview>
        </main>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, watch } from "vue";
import type { NavigationMenuItem } from "@nuxt/ui";
import { useRoute } from "vue-router";

const props = defineProps<{
  title: string;
  lede: string;
  sections: readonly { id: string; label: string }[];
}>();

const activeId = defineModel<string>("activeId", { default: "" });

const route = useRoute();
const { openNoteCount } = useDesignReview();

const currentSection = computed(() => props.sections.find((section) => section.id === activeId.value));

const normalize = (path: string) => path.replace(/\/$/, "") || "/";

const onPage = (to: string) => normalize(route.path) === to;

const selectSection = (id: string) => {
  if (props.sections.some((section) => section.id === id)) activeId.value = id;
};

const scrollRoot = () => document.querySelector("main");

const syncActiveSection = () => {
  const main = scrollRoot();
  if (!main) return;
  const line = main.getBoundingClientRect().top + 140;
  let current = "";
  for (const section of props.sections) {
    const element = document.getElementById(section.id);
    if (!element) continue;
    if (element.getBoundingClientRect().top <= line) current = section.id;
  }
  if (current !== activeId.value) activeId.value = current;
};

const scrollToSection = (id: string) => {
  nextTick(() => {
    document.getElementById(id)?.scrollIntoView({ block: "start" });
    syncActiveSection();
  });
};

const onMainScroll = () => syncActiveSection();

onMounted(() => {
  scrollRoot()?.addEventListener("scroll", onMainScroll, { passive: true });
  syncActiveSection();
  const id = route.hash.replace(/^#/, "");
  if (id) scrollToSection(id);
});

onBeforeUnmount(() => {
  scrollRoot()?.removeEventListener("scroll", onMainScroll);
});

watch(
  () => route.hash,
  (hash) => {
    const id = hash.replace(/^#/, "");
    if (id) scrollToSection(id);
  },
);

type DocsPage = {
  label: string;
  to: string;
  icon: string;
  children: readonly { id: string; label: string }[];
};

const pages: readonly DocsPage[] = [
  {
    label: "Catálogo",
    to: "/design-system",
    icon: "i-lucide-component",
    children: [
      { id: "cores", label: "Cores" },
      { id: "botoes", label: "Botão" },
      { id: "campos", label: "Campos" },
      { id: "filtro", label: "Filtro" },
      { id: "abas", label: "Abas" },
      { id: "feedback", label: "Feedback" },
      { id: "carregando", label: "Carregando" },
      { id: "pills", label: "Pills" },
      { id: "controles", label: "Controles" },
      { id: "modal", label: "Modal" },
      { id: "card", label: "Card" },
    ],
  },
  {
    label: "Tabelas",
    to: "/design-system/tabelas",
    icon: "i-lucide-table-2",
    children: [
      { id: "decisoes", label: "Decisões" },
      { id: "inventario", label: "Inventário" },
      { id: "comparacao", label: "Padrão" },
    ],
  },
];

const menuItems = computed<NavigationMenuItem[]>(() =>
  pages.map((page) => {
    const here = onPage(page.to);
    const sectionOpen = here && props.sections.some((section) => section.id === activeId.value);
    return {
      label: page.label,
      icon: page.icon,
      to: page.to,
      exact: true,
      defaultOpen: true,
      active: here && !sectionOpen,
      children: page.children.map((child) => {
        const active = here && activeId.value === child.id;
        const openNotes = openNoteCount(child.id, page.to);
        return {
          label: child.label,
          to: `${page.to}#${child.id}`,
          active,
          badge: openNotes
            ? { label: String(openNotes), color: "warning", variant: "subtle", size: "sm" }
            : undefined,
          "aria-current": active ? "location" : undefined,
          onSelect: () => {
            selectSection(child.id);
            if (here) scrollToSection(child.id);
          },
        };
      }),
    };
  }),
);

const menuUi = {
  root: "w-full",
  list: "flex w-full flex-col gap-1",
  link: "rounded-[var(--ads-radius-sm)] text-[var(--ads-text-secondary)] before:rounded-[var(--ads-radius-sm)] data-[active]:font-bold data-[active]:text-primary data-[active]:before:bg-primary-50",
  linkLeadingIcon: "size-4 text-neutral-400 group-data-[active]:text-primary",
  linkTrailingIcon: "size-4 text-neutral-400",
  childList: "ms-3.5 gap-0.5 border-neutral-200",
  childItem: "ps-1",
};
</script>
