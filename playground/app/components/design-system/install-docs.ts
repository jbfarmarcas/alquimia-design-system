/**
 * Conteúdo da página /design-system/instalacao: o manual de instalação do pacote `ads-nuxt`.
 * A página e o menu lateral leem esta mesma lista, então um id novo entra nos dois lugares.
 */
export const INSTALL_PACKAGE = "ads-nuxt";

export const INSTALL_SECTIONS = [
  {
    id: "requisitos",
    label: "Requisitos",
    purpose: "O que o projeto precisa ter antes de instalar. O resto vem junto com o pacote.",
    components: [],
  },
  {
    id: "instalar",
    label: "Instalar",
    purpose: "Adicione o pacote ao projeto Nuxt com o gerenciador que você já usa.",
    components: [],
  },
  {
    id: "configurar",
    label: "Configurar",
    purpose: "O ADS é uma Nuxt Layer: basta estendê-la no nuxt.config.ts.",
    components: [],
  },
  {
    id: "uapp",
    label: "Envolver o app",
    purpose: "O Nuxt UI precisa do UApp para que toast, tooltip e overlays funcionem.",
    components: [],
  },
  {
    id: "primeiro-uso",
    label: "Primeiro uso",
    purpose: "Os componentes Ads* são auto-importados. Não há import manual.",
    components: ["AdsCard", "AdsInput", "AdsButton"],
  },
  {
    id: "personalizar",
    label: "Personalizar",
    purpose: "Ajuste tokens e tema no seu projeto, sem editar o pacote.",
    components: [],
  },
  {
    id: "verificar",
    label: "Verificar",
    purpose: "Confirme que a instalação está certa e veja onde costuma falhar.",
    components: [],
  },
  {
    id: "skill",
    label: "Skill para o agente",
    purpose: "Ensina o agente de IA do projeto (Cursor, Claude Code e outros) a usar o ADS: componentes, tokens e utilitários.",
    components: [],
  },
] as const;

export type InstallSectionId = (typeof INSTALL_SECTIONS)[number]["id"];

export const INSTALL_REQUIREMENTS = [
  { name: "Node.js", value: "20 ou mais. Recomendado 22." },
  { name: "Nuxt", value: "^4.0.0 (peer dependency, instalada por você)." },
  { name: "Vue", value: "^3.5.18 (peer dependency, instalada por você)." },
  {
    name: "Já incluídos",
    value: "@nuxt/ui v4, @nuxt/fonts, @nuxt/icon, @vueuse/nuxt, Tailwind CSS v4 e os ícones Lucide. Não instale de novo.",
  },
] as const;

export const INSTALL_COMMANDS = [
  { id: "pnpm", label: "pnpm", code: `pnpm add ${INSTALL_PACKAGE}\n` },
  { id: "npm", label: "npm", code: `npm install ${INSTALL_PACKAGE}\n` },
  { id: "yarn", label: "yarn", code: `yarn add ${INSTALL_PACKAGE}\n` },
] as const;

export const INSTALL_CONFIG_CODE = `// nuxt.config.ts
export default defineNuxtConfig({
  extends: ["${INSTALL_PACKAGE}"],
});
`;

export const INSTALL_REGISTERED = [
  "Os módulos @nuxt/ui, @nuxt/fonts, @nuxt/icon e @vueuse/nuxt.",
  "O CSS global: Tailwind, Nuxt UI, cores e tokens de componente.",
  "A fonte Inter, nos pesos 300, 400, 500, 700 e 800.",
  "A coleção de ícones lucide (use i-lucide-*).",
  "O app.config.ts com o tema ADS para o Nuxt UI.",
  "O plugin de toast e o locale pt-BR.",
] as const;

export const INSTALL_APP_CODE = `<!-- app/app.vue -->
<template>
  <UApp :locale="uiLocale" :tooltip="{ delayDuration: 400 }" :toaster="adsToaster">
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
import { uiLocale } from "${INSTALL_PACKAGE}/app/locale/pt-br";
import { adsToaster } from "${INSTALL_PACKAGE}/app/theme/ads-theme";
</script>
`;

export const INSTALL_USAGE_CODE = `<!-- app/pages/index.vue -->
<template>
  <AdsCard title="Cadastro">
    <div class="flex flex-col gap-4">
      <AdsInput v-model="nome" label="Nome" placeholder="Digite seu nome" />
      <AdsButton type="filled" label="Salvar" leading icon="i-lucide-save" />
    </div>
  </AdsCard>
</template>

<script setup lang="ts">
const nome = ref("");
</script>
`;

export const INSTALL_TOKENS_CODE = `/* app/assets/css/main.css, carregado depois do CSS da layer */
:root {
  --ads-button-radius: 4px;
  --ads-button-primary: #0050b3;
}
`;

export const INSTALL_THEME_CODE = `// app/app.config.ts
export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: "rounded-md",
      },
    },
  },
});
`;

export const INSTALL_SKILL_NAME = "ads-nuxt";
export const INSTALL_SKILL_REPO = "jbfarmarcas/alquimia-design-system";

export const INSTALL_SKILL_COMMANDS = [
  {
    id: "add",
    label: "instalar",
    code: `npx skills add ${INSTALL_SKILL_REPO} --skill ${INSTALL_SKILL_NAME}\n`,
  },
  { id: "update", label: "atualizar", code: `npx skills update ${INSTALL_SKILL_NAME}\n` },
  { id: "remove", label: "remover", code: `npx skills remove ${INSTALL_SKILL_NAME}\n` },
] as const;

export const INSTALL_SKILL_CONTENT = [
  "Como estender a layer e envolver o app com UApp.",
  "Regras de uso: componente Ads* primeiro, token em vez de valor fixo, ícones Lucide, tema claro.",
  "Armadilhas conhecidas de componentes, como AdsButton, AdsCard e AdsModal.",
  "Tabela de tokens (superfície, texto, borda, status, raio, espaço, fonte, sombra).",
  "Utilitários pt-BR e composables.",
  "Referência com props, eventos e slots de todos os componentes, gerada do código.",
] as const;

export const INSTALL_SKILL_NOTES = [
  "Rode o comando na raiz do projeto que usa o ads-nuxt. O CLI pergunta em quais agentes instalar. Para só o Cursor, acrescente -a cursor.",
  "A skill entra em .agents/skills/ads-nuxt, e o projeto ganha um skills-lock.json para registrar a versão. Faça commit dos dois.",
  "Rode npx skills update depois de atualizar o ads-nuxt, para a referência de componentes acompanhar a versão instalada.",
] as const;

export const INSTALL_CHECKLIST = [
  "Rodar o projeto (pnpm dev) abre a página sem erro no terminal.",
  "O texto aparece na fonte Inter.",
  "O AdsButton filled aparece em azul (#006ff7), com o ícone Lucide.",
  "Um toast aparece no canto superior direito, sem barra de progresso.",
] as const;

export const INSTALL_PITFALLS = [
  {
    problem: "Toast, tooltip ou modal não aparecem",
    fix: "O app não está dentro do UApp. Veja Envolver o app.",
  },
  {
    problem: "Componente Ads* não é encontrado",
    fix: "A layer não foi estendida. Confira extends: [\"ads-nuxt\"] no nuxt.config.ts e reinicie o servidor.",
  },
  {
    problem: "Sem estilos ou sem a fonte",
    fix: "Não registre @nuxt/ui, @nuxt/fonts ou @nuxt/icon de novo, nem importe outro CSS do Nuxt UI. A layer já faz isso.",
  },
  {
    problem: "Tema escuro não funciona",
    fix: "É esperado. O ADS é um sistema de tema claro e a layer define ui.colorMode: false. Para mudar, redefina no seu nuxt.config.ts.",
  },
  {
    problem: "pnpm avisa de scripts de build ignorados",
    fix: "É o comportamento padrão do pnpm 10 para esbuild e vue-demi. Rode pnpm approve-builds e aprove os dois.",
  },
] as const;
