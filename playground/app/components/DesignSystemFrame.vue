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
            :key="menuKey"
            type="single"
            orientation="vertical"
            color="primary"
            variant="pill"
            :collapsed="collapsed"
            :tooltip="collapsed"
            :popover="collapsed"
            :items="collapsed ? collapsedMenuItems : menuItems"
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { NavigationMenuItem } from "@nuxt/ui";
import { useRoute } from "vue-router";

const props = defineProps<{
  title: string;
  lede: string;
  sections: readonly { id: string; label: string }[];
}>();

import { tokenGroups } from "./design-system/token-sections";
import { catalogGroups } from "./design-system/catalog-sections";
import { INSTALL_SECTIONS } from "./design-system/install-docs";

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
  // No fim da página, a última seção nunca chega à linha: ela vira a ativa.
  const atBottom = main.scrollTop + main.clientHeight >= main.scrollHeight - 2;
  const last = props.sections.at(-1);
  if (atBottom && main.scrollTop > 0 && last && document.getElementById(last.id)) current = last.id;
  if (current !== activeId.value) activeId.value = current;
};

const scrollToSection = (id: string) => {
  nextTick(() => {
    document.getElementById(id)?.scrollIntoView({ block: "start" });
    syncActiveSection();
  });
};

const onMainScroll = () => syncActiveSection();

/**
 * O subgrupo da seção ativa abre por `defaultOpen`, que só vale na montagem. A seção do link
 * (#hash) só é conhecida no cliente, então o menu remonta uma vez depois disso.
 */
const menuKey = ref(0);

onMounted(() => {
  scrollRoot()?.addEventListener("scroll", onMainScroll, { passive: true });
  syncActiveSection();
  const id = route.hash.replace(/^#/, "");
  if (id) {
    selectSection(id);
    scrollToSection(id);
  }
  nextTick(() => menuKey.value++);
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

/** Item do menu: um link para a seção ou, com `children`, um subgrupo que abre e fecha. */
type DocsChild = { id: string; label: string; children?: readonly DocsChild[] };

type DocsPage = {
  label: string;
  to: string;
  icon: string;
  children: readonly DocsChild[];
};

/**
 * Catálogo: cada `group` de `catalog-sections.ts` vira um subgrupo (Botões, Campos, Cards, Tabelas…).
 * Grupo com uma seção só, como Cores e Modal, fica como link direto.
 */
function catalogNavChildren(): DocsChild[] {
  return catalogGroups.map((group) => {
    const links = group.sections.map((section) => ({ id: section.id, label: section.label }));
    if (links.length === 1) return links[0]!;
    return { id: `grupo-${group.name}`, label: group.name, children: links };
  });
}

/** Tokens: mesmos grupos do catálogo. Só fica como link direto o que também é link direto no catálogo (Cores, Modal). */
function tokenNavChildren(): DocsChild[] {
  return tokenGroups.map((group) => {
    const links = group.components.map((component) => ({ id: component.section, label: component.label }));
    if (!group.nested && links.length === 1) return links[0]!;
    return { id: `tokens-${group.name}`, label: group.name, children: links };
  });
}

const pages: readonly DocsPage[] = [
  {
    label: "Instalação",
    to: "/design-system/instalacao",
    icon: "i-lucide-package",
    children: INSTALL_SECTIONS.map((section) => ({ id: section.id, label: section.label })),
  },
  {
    label: "Componentes",
    to: "/design-system",
    icon: "i-lucide-component",
    children: catalogNavChildren(),
  },
  {
    label: "Tokens",
    to: "/design-system/tokens",
    icon: "i-lucide-palette",
    children: tokenNavChildren(),
  },
];

const menuItemsFor = (collapsed: boolean): NavigationMenuItem[] =>
  pages.map((page) => {
    const here = onPage(page.to);
    const sectionOpen = here && props.sections.some((section) => section.id === activeId.value);
    return {
      label: page.label,
      icon: page.icon,
      to: page.to,
      exact: true,
      defaultOpen: here,
      active: here && !sectionOpen,
      children: page.children.flatMap((child): NavigationMenuItem[] => {
        if (!child.children) return [sectionLink(page, child, here)];
        const links = child.children.map((section) => sectionLink(page, section, here));
        // Recolhido, o popover mostra a lista plana, sem subgrupos.
        if (collapsed) return links;
        const hasActive = here && child.children.some((section) => section.id === activeId.value);
        const openNotes = child.children.reduce((sum, section) => sum + openNoteCount(section.id, page.to), 0);
        return [{
          label: child.label,
          defaultOpen: hasActive,
          // Destaca o subgrupo da seção ativa, mesmo fechado.
          active: hasActive,
          badge: openNotes
            ? { label: String(openNotes), color: "warning", variant: "subtle", size: "sm" }
            : undefined,
          children: links,
        }];
      }),
    };
  });

/** Link para uma seção da página, com o número de anotações abertas. */
const sectionLink = (page: DocsPage, child: DocsChild, here: boolean): NavigationMenuItem => {
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
};

const menuItems = computed(() => menuItemsFor(false));
const collapsedMenuItems = computed(() => menuItemsFor(true));

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
