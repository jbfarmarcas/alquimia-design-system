<template>
  <DesignSystemFrame
    v-model:active-id="activeId"
    title="Instalação"
    lede="Como usar o Alquimia Design System em um projeto Nuxt: instalar o pacote, estender a layer e envolver o app. São três passos, e o resto já vem configurado."
    :sections="INSTALL_SECTIONS"
  >
    <section id="requisitos" :class="sectionClass">
      <DesignSystemSectionHeading :section="section('requisitos')" :copied-name="copiedName" @copy="copyName" />
      <dl class="border-y border-[var(--ads-border-subtle)]">
        <div
          v-for="item in INSTALL_REQUIREMENTS"
          :key="item.name"
          class="grid gap-1 border-b border-[var(--ads-border-subtle)] py-4 last:border-b-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
        >
          <dt class="font-bold text-[var(--ads-text-primary)]">{{ item.name }}</dt>
          <dd class="max-w-[70ch] text-sm leading-relaxed text-[var(--ads-text-secondary)]">{{ item.value }}</dd>
        </div>
      </dl>
    </section>

    <section id="instalar" :class="sectionClass">
      <DesignSystemSectionHeading :section="section('instalar')" :copied-name="copiedName" @copy="copyName" />
      <div class="grid gap-4 lg:grid-cols-3">
        <DocsCode v-for="command in INSTALL_COMMANDS" :key="command.id" :code="command.code" :language="command.label" />
      </div>
      <p class="max-w-[70ch] text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        O pacote publica só a pasta <span class="font-mono">app/</span> e o <span class="font-mono">nuxt.config.ts</span>. Ele está no
        <a
          href="https://www.npmjs.com/package/ads-nuxt"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold text-[var(--ads-text-brand)] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >npm<span class="sr-only"> (abre em nova aba)</span></a>
        com acesso público, então não precisa de token nem de registry próprio.
      </p>
    </section>

    <section id="configurar" :class="sectionClass">
      <DesignSystemSectionHeading :section="section('configurar')" :copied-name="copiedName" @copy="copyName" />
      <DocsCode :code="INSTALL_CONFIG_CODE" language="nuxt.config.ts" />
      <div class="flex max-w-[70ch] flex-col gap-3">
        <p class="text-sm font-bold text-[var(--ads-text-primary)]">Isso já registra no seu projeto:</p>
        <ul class="flex list-disc flex-col gap-1.5 ps-5 text-sm leading-relaxed text-[var(--ads-text-secondary)]">
          <li v-for="item in INSTALL_REGISTERED" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <section id="uapp" :class="sectionClass">
      <DesignSystemSectionHeading :section="section('uapp')" :copied-name="copiedName" @copy="copyName" />
      <DocsCode :code="INSTALL_APP_CODE" language="app.vue" />
      <p class="max-w-[70ch] text-sm leading-relaxed text-[var(--ads-text-secondary)]">
        <span class="font-mono">adsToaster</span> põe os toasts no canto superior direito, sem barra de progresso. <span class="font-mono">uiLocale</span>
        traduz calendário, meses e rótulos do Nuxt UI para pt-BR.
      </p>
    </section>

    <section id="primeiro-uso" :class="sectionClass">
      <DesignSystemSectionHeading :section="section('primeiro-uso')" :copied-name="copiedName" @copy="copyName" />
      <DocsCode :code="INSTALL_USAGE_CODE" language="index.vue" />
      <div class="flex flex-col gap-3">
        <p class="text-sm font-bold text-[var(--ads-text-primary)]">Resultado</p>
        <div class="max-w-md rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-[var(--ads-surface-main)] p-5">
          <AdsCard title="Cadastro">
            <div class="flex flex-col gap-4">
              <AdsInput v-model="nome" label="Nome" placeholder="Digite seu nome" />
              <AdsButton type="filled" label="Salvar" leading icon="i-lucide-save" />
            </div>
          </AdsCard>
        </div>
      </div>
    </section>

    <section id="personalizar" :class="sectionClass">
      <DesignSystemSectionHeading :section="section('personalizar')" :copied-name="copiedName" @copy="copyName" />
      <div class="grid items-start gap-4 lg:grid-cols-2">
        <div class="flex min-w-0 flex-col gap-2">
          <p class="text-sm font-bold text-[var(--ads-text-primary)]">Tokens de componente</p>
          <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
            Sobrescreva a variável CSS depois do CSS da layer. Os nomes estão em
            <NuxtLink
              to="/design-system/tokens"
              class="font-bold text-[var(--ads-text-brand)] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >Tokens</NuxtLink>.
          </p>
          <DocsCode :code="INSTALL_TOKENS_CODE" language="css" />
        </div>
        <div class="flex min-w-0 flex-col gap-2">
          <p class="text-sm font-bold text-[var(--ads-text-primary)]">Tema do Nuxt UI</p>
          <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
            A layer customiza button, input, inputDate, calendar, select, selectMenu, toast, toaster e tooltip. O app.config.ts do seu projeto tem
            a palavra final.
          </p>
          <DocsCode :code="INSTALL_THEME_CODE" language="app.config.ts" />
        </div>
      </div>
    </section>

    <section id="verificar" :class="sectionClass">
      <DesignSystemSectionHeading :section="section('verificar')" :copied-name="copiedName" @copy="copyName" />
      <div class="grid items-start gap-8 lg:grid-cols-2">
        <div class="flex flex-col gap-3">
          <p class="text-sm font-bold text-[var(--ads-text-primary)]">Está certo se</p>
          <ul class="flex list-disc flex-col gap-1.5 ps-5 text-sm leading-relaxed text-[var(--ads-text-secondary)]">
            <li v-for="item in INSTALL_CHECKLIST" :key="item">{{ item }}</li>
          </ul>
        </div>
        <dl class="border-y border-[var(--ads-border-subtle)]">
          <div
            v-for="item in INSTALL_PITFALLS"
            :key="item.problem"
            class="flex flex-col gap-1 border-b border-[var(--ads-border-subtle)] py-4 last:border-b-0"
          >
            <dt class="font-bold text-[var(--ads-text-primary)]">{{ item.problem }}</dt>
            <dd class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">{{ item.fix }}</dd>
          </div>
        </dl>
      </div>
    </section>
  </DesignSystemFrame>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import DesignSystemFrame from "../../components/DesignSystemFrame.vue";
import DesignSystemSectionHeading from "../../components/DesignSystemSectionHeading.vue";
import DocsCode from "../../components/design-system/DocsCode.vue";
import {
  INSTALL_APP_CODE,
  INSTALL_CHECKLIST,
  INSTALL_COMMANDS,
  INSTALL_CONFIG_CODE,
  INSTALL_PITFALLS,
  INSTALL_REGISTERED,
  INSTALL_REQUIREMENTS,
  INSTALL_SECTIONS,
  INSTALL_THEME_CODE,
  INSTALL_TOKENS_CODE,
  INSTALL_USAGE_CODE,
  type InstallSectionId,
} from "../../components/design-system/install-docs";

definePageMeta({
  name: "design-system-install",
  layout: "design-system",
});

const sectionClass = "mt-20 flex scroll-mt-24 flex-col gap-6 md:scroll-mt-12";

const section = (id: InstallSectionId) => {
  const found = INSTALL_SECTIONS.find((item) => item.id === id);
  if (!found) throw new Error(`Seção ${id} ausente`);
  return found;
};

const activeId = ref<InstallSectionId | "">("");
const nome = ref("");
const copiedName = ref("");
let copyTimer: ReturnType<typeof setTimeout> | undefined;

const copyName = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    return;
  }
  copiedName.value = value;
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    if (copiedName.value === value) copiedName.value = "";
  }, 1600);
};

onBeforeUnmount(() => {
  clearTimeout(copyTimer);
});
</script>
