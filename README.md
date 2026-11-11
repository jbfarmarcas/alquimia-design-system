# ads-nuxt

**Alquimia Design System (ADS)** para Nuxt, construído sobre o [Nuxt UI](https://ui.nuxt.com) v4 e o Tailwind CSS v4.

O pacote é uma **Nuxt Layer**: ao estendê-lo, seu projeto recebe de uma vez os componentes `Ads*`, os tokens de design (cores, espaçamento, raios, sombras, tipografia), o tema do Nuxt UI customizado, os utilitários de formatação em pt-BR e a fonte Inter.

[![npm](https://img.shields.io/npm/v/ads-nuxt.svg)](https://www.npmjs.com/package/ads-nuxt)
[![license](https://img.shields.io/npm/l/ads-nuxt.svg)](./LICENSE)

---

## Sumário

- [Recursos](#recursos)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso rápido](#uso-rápido)
- [Componentes](#componentes)
- [Exemplos](#exemplos)
- [Tokens de design](#tokens-de-design)
- [Tema do Nuxt UI](#tema-do-nuxt-ui)
- [Composables](#composables)
- [Utilitários](#utilitários)
- [Localização (pt-BR)](#localização-pt-br)
- [Desenvolvimento](#desenvolvimento)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Licença](#licença)

---

## Recursos

- **Mais de 50 componentes** prontos para produção, com prefixo `Ads` (auto-importados pelo Nuxt).
- **Tokens em três camadas** (primitivos → semânticos → de componente), expostos como variáveis CSS `--ads-*` e como cores do Tailwind (`ads-*`).
- **Tema do Nuxt UI** pré-configurado: botão, input, calendário, select, toast e tooltip já seguem o visual ADS.
- **Fonte Inter** configurada via `@nuxt/fonts`.
- **Ícones Lucide** via `@nuxt/icon` (use `i-lucide-*`).
- **Utilitários pt-BR**: moeda (BRL), porcentagem, datas, notabilidade e filtros.
- **Playground** com documentação viva de todos os componentes e tokens.
- Estados “congeláveis” (`state`) nos componentes, pensados para documentação e testes visuais.

## Requisitos

| Dependência | Versão    |
| ----------- | --------- |
| Node.js     | 20+ (recomendado 22) |
| Nuxt        | `^4.0.0`  |
| Vue         | `^3.5.18` |
| `@nuxt/ui`  | `^4.3.0`  |
| `tailwindcss` | `^4.0.15` |
| `@nuxt/icon` | `^2.2.0` |
| `@nuxt/fonts` | `^0.12.1` ou `^0.14.0` |
| `@vueuse/nuxt` e `@vueuse/core` | `^14.0.0` |
| `@internationalized/date` | `^3.12.4` |

Todas são *peer dependencies*: ficam a cargo do seu projeto, que escolhe a versão. Assim o app não ganha uma segunda cópia do Nuxt UI nem do Tailwind. Se o projeto já usa o Nuxt UI v4, normalmente já tem quase tudo. Os ícones Lucide (`@iconify-json/lucide`) vêm como dependência do pacote.

## Instalação

```bash
# pnpm
pnpm add ads-nuxt @nuxt/ui @nuxt/fonts @nuxt/icon @vueuse/core @vueuse/nuxt @internationalized/date tailwindcss

# npm
npm install ads-nuxt @nuxt/ui @nuxt/fonts @nuxt/icon @vueuse/core @vueuse/nuxt @internationalized/date tailwindcss

# yarn
yarn add ads-nuxt @nuxt/ui @nuxt/fonts @nuxt/icon @vueuse/core @vueuse/nuxt @internationalized/date tailwindcss
```

Se algum desses pacotes já estiver no `package.json`, o comando só mantém a versão existente. Para conferir que não há cópia duplicada: `pnpm why @nuxt/ui` deve mostrar uma única versão.

### Skill para o agente de IA (opcional)

O repositório traz a skill `ads-nuxt`, que ensina o agente do seu projeto (Cursor, Claude Code e outros) a usar o ADS: componentes, tokens, utilitários e armadilhas conhecidas.

```bash
npx skills add jbfarmarcas/alquimia-design-system --skill ads-nuxt   # instalar
npx skills update ads-nuxt                                          # atualizar
npx skills remove ads-nuxt                                          # remover
```

Rode na raiz do projeto que usa o `ads-nuxt`. A skill entra em `.agents/skills/ads-nuxt` e o projeto ganha um `skills-lock.json`. Faça commit dos dois e rode `update` depois de atualizar o pacote.

## Configuração

Estenda a layer no `nuxt.config.ts` do seu projeto:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ["ads-nuxt"],
});
```

Isso já registra automaticamente:

- os módulos `@nuxt/ui`, `@nuxt/fonts`, `@nuxt/icon` e `@vueuse/nuxt`;
- o CSS global (Tailwind, Nuxt UI, cores e tokens de componente);
- a fonte **Inter** (pesos 300, 400, 500, 700 e 800);
- a coleção de ícones **lucide**;
- o `app.config.ts` com o tema ADS para o Nuxt UI;
- o plugin de toast e o locale pt-BR.

> **Modo de cor:** a layer define `ui.colorMode: false` — o ADS é um sistema de tema claro. Se precisar sobrescrever, redefina no `nuxt.config.ts` do seu projeto.

### Envolva o app com `UApp`

O Nuxt UI exige o componente `UApp` para toasts, tooltips e overlays funcionarem:

```vue
<!-- app/app.vue -->
<template>
  <UApp :locale="uiLocale" :tooltip="{ delayDuration: 400 }" :toaster="adsToaster">
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
import { uiLocale } from "ads-nuxt/app/locale/pt-br";
import { adsToaster } from "ads-nuxt/app/theme/ads-theme";
</script>
```

`adsToaster` posiciona os toasts no canto superior direito, sem barra de progresso, no padrão ADS.

## Uso rápido

Os componentes são auto-importados, sem `import` manual:

```vue
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
```

## Componentes

### Ações

| Componente       | Descrição |
| ---------------- | --------- |
| `AdsButton`      | Botão (`filled`, `outline`, `unfilled`, `secondary`, `ia`) em 2 tamanhos e 8 cores. Suporta ícones, `loading` e `to` (vira link). |
| `AdsButtonGroup` | Agrupa botões. |
| `AdsButtonMenu`  | Botão com menu de ações. |

### Formulários

| Componente        | Descrição |
| ----------------- | --------- |
| `AdsInput`        | Campo de texto/número com label, hint, erro, info, ícone e sufixo. |
| `AdsNumberInput`  | Campo numérico dedicado. |
| `AdsTextarea`     | Área de texto. |
| `AdsSearchInput`  | Campo de busca. |
| `AdsCheckbox`     | Checkbox com estado indeterminado. |
| `AdsRadio`        | Botão de rádio. |
| `AdsSwitch`       | Alternador (toggle). |
| `AdsDatePicker`   | Seletor de data ou intervalo, com `min`, `max` e `maximumDays`. |
| `AdsMonthPicker`  | Seletor de mês. |
| `AdsSelect` | Único componente de seleção: simples, múltipla ou mês. Gatilho em campo, próprio (`#trigger`) ou só a lista (`inline`). Opções com subtítulo, selo e busca. |

### Navegação

| Componente        | Descrição |
| ----------------- | --------- |
| `AdsNavbarDesk` / `AdsNavbarApp` | Barra de navegação desktop e mobile. |
| `AdsSideMenu`     | Menu lateral. |
| `AdsMenuBar`      | Barra de menu. |
| `AdsTabs`         | Abas em formato de link. |
| `AdsSegmentedTabs`| Abas segmentadas. |
| `AdsPagination`   | Paginação com reticências automáticas (`v-model:page`). |
| `AdsDropdownMenu` | Menu de ações. |
| `AdsFooter`       | Rodapé. |

### Exibição de dados

| Componente        | Descrição |
| ----------------- | --------- |
| `AdsTable`        | Tabela baseada no `UTable`, com densidade, zebra, bordas, degradê por nível, `sticky` (cabeçalho fixo), `virtualize` (lista virtual para muitas linhas), loading e estado vazio. |
| `AdsTableToolbar` | Barra de ferramentas da tabela. |
| `AdsCard`         | Cartão genérico. |
| `AdsMetricCard`   | Cartão de métrica/indicador. |
| `AdsFeatureCard`  | Cartão de funcionalidade. |
| `AdsFileCard`     | Cartão de arquivo. |
| `AdsEmptyState`   | Estado vazio. |

### Indicadores e status

| Componente           | Descrição |
| -------------------- | --------- |
| `AdsBadge`           | Contador ou ponto (`mini`) em 7 cores. |
| `AdsPill`            | Pílula de status em tom `primary` ou `secondary` e tamanho `md` (Pill) ou `sm` (Small Pill). |
| `AdsNotabilityPill`  | Pílula de notabilidade. |
| `AdsProductTag`      | Tag de produto. |

### Feedback e overlays

| Componente        | Descrição |
| ----------------- | --------- |
| `AdsModal`        | Modal (`dialog` ou `sheet`) com 5 tamanhos, ações padrão e slots. |
| `AdsToast`        | Aviso em faixa (`banner`) ou reporte escuro (`status`). |
| `AdsBroadcast`    | Comunicado em destaque. |
| `AdsTooltip`      | Tooltip. |
| `AdsSmalltip` / `AdsSteptip` / `AdsCharttip` | Variações de tooltip (compacta, em passos e para gráficos). |
| `AdsLoading`      | Indicador de carregamento. |
| `ProgressBarLoading` | Barra de progresso. |
| `OverlayLoading`  | Overlay de carregamento/sucesso/erro (usado por `useOverlayLoading`). |

## Exemplos

### Botões

```vue
<AdsButton type="filled" label="Salvar" />
<AdsButton type="outline" color="success" label="Aprovar" />
<AdsButton type="unfilled" size="sm" label="Cancelar" />
<AdsButton type="ia" label="Gerar com IA" leading icon="i-lucide-sparkles" />
<AdsButton type="filled" label="Enviando" loading />
<AdsButton type="filled" label="Ir para o painel" to="/painel" />
```

| Prop         | Valores |
| ------------ | ------- |
| `type`       | `filled` \| `outline` \| `unfilled` \| `secondary` \| `ia` |
| `color`      | `primary` \| `success` \| `attention` \| `warning` \| `new` \| `innovation` \| `blocked` \| `neutral` |
| `size`       | `md` \| `sm` |
| `nativeType` | `button` \| `submit` \| `reset` (a prop `type` é o visual do ADS) |

### Campos de formulário

```vue
<AdsInput
  v-model="preco"
  label="Preço"
  hint="Valor unitário"
  suffix="R$"
  type="number"
  :error="erro"
/>
```

Estados disponíveis via `state` (útil para documentação): `default`, `active`, `focus`, `error`, `disabled` e `ai`.

### Modal

```vue
<template>
  <AdsButton label="Excluir" color="warning" @click="aberto = true" />

  <AdsModal
    v-model:open="aberto"
    title="Excluir item"
    description="Essa ação não pode ser desfeita."
    cancel-label="Cancelar"
    confirm-label="Excluir"
    @confirm="excluir"
    @cancel="aberto = false"
  />
</template>

<script setup lang="ts">
const aberto = ref(false);
const excluir = () => {
  /* ... */
  aberto.value = false;
};
</script>
```

Eventos: `confirm`, `cancel` e `dismiss` (com o motivo `"esc"` ou `"outside"`). Slots: `default`, `title` e `footer`.

### Toast

Como componente em linha:

```vue
<AdsToast status="success" title="Tudo certo" message="Alterações salvas." />
<AdsToast status="error" message="Falha ao salvar." action-label="Tentar novamente" />
<AdsToast appearance="status" status="neutral" title="Relatório" subtitle="Explicação opcional" />
```

Como toast flutuante, usando o `useToast` do Nuxt UI (as cores de status e os ícones do ADS são aplicados automaticamente pelo plugin da layer):

```ts
const toast = useToast();

toast.add({
  title: "Salvo",
  description: "Suas alterações foram salvas.",
  color: "success",
});
```

### Pílulas e badges

```vue
<AdsPill status="success" label="Ativo" />
<AdsPill status="warning" tone="secondary" label="Atrasado" icon="i-lucide-alert-triangle" />
<AdsBadge color="primary" :value="5" />
<AdsBadge color="warning" mini />
```

### Paginação e abas

```vue
<AdsPagination v-model:page="pagina" :total-pages="20" />

<AdsTabs v-model="aba" :items="itens" />
```

### Tabela

```vue
<AdsTable
  :data="linhas"
  :columns="colunas"
  density="md"
  striped
  :loading="carregando"
  empty-label="Nenhum resultado encontrado"
/>
```

Para montar colunas, a layer exporta helpers em `app/utils/ads-table.ts`, como `adsTableColumn`, `adsTablePinned`, `adsTableGroup`, `adsTableVariationClass` e `adsTableTreeIndent`.

### Seletor de datas

```vue
<!-- Data única -->
<AdsDatePicker v-model="data" min="2026-01-01" />

<!-- Intervalo (máximo de 31 dias) -->
<AdsDatePicker range v-model:start="inicio" v-model:end="fim" :maximum-days="31" />
```

As datas trafegam como string `YYYY-MM-DD`.

## Tokens de design

Os tokens vêm do Figma do ADS e estão organizados em três camadas:

1. **Primitivos** — valores brutos (escalas de cor, espaçamentos).
2. **Semânticos** — intenção de uso (`--ads-surface-*`, `--ads-text-*`, `--ads-border-*`, `--ads-status-*`).
3. **De componente** — ajustes finos por componente (`--ads-button-*`, `--ads-modal-*`, `--ads-tooltip-*`…).

### Variáveis CSS

```css
.meu-card {
  background: var(--ads-surface-main);
  color: var(--ads-text-secondary);
  border-radius: var(--ads-button-radius);
  box-shadow: var(--ads-shadow-level-3);
}
```

### Classes Tailwind

As variáveis semânticas também estão mapeadas como cores do Tailwind (`--color-ads-*`):

```html
<div class="bg-ads-surface-main border-ads-border-width-thin"></div>
```

### Escalas de cor

| Escala             | Uso |
| ------------------ | --- |
| `primary` / `secondary` | Azul do Radar Pricing, de 50 a 950 (base `#006ff7`). |
| `success`          | Verde de sucesso (base `#15c57e`). |
| Neutros            | `neutralLight`, `neutralMid` e `neutralDark`. |
| Status             | `success`, `attention`, `warning`, `new`, `innovation`, `blocked`. |

### Espaçamento

| Token  | px  | Token  | px  | Token  | px  |
| ------ | --- | ------ | --- | ------ | --- |
| quark  | 4   | sm     | 32  | xxxl   | 120 |
| nano   | 8   | rg     | 40  | huge   | 160 |
| xxxs   | 12  | md     | 48  | giant  | 200 |
| xxs    | 16  | lg     | 56  |        |     |
| xs     | 24  | xl / xxl | 64 / 80 |    |     |

Os mesmos valores estão disponíveis em TypeScript, em `app/theme/ads-tokens.ts` (`adsSpacing`, `adsRadarPricing`, `adsRadarBase`, `adsNeutralLight`, `adsNeutralMid`, `adsNeutralDark`, `adsSuccess`…).

### Personalizando tokens de componente

Os tokens de componente são gerados a partir de `app/theme/component-tokens.json` para `component-tokens.css`. Para ajustar no seu projeto sem editar o pacote, sobrescreva a variável CSS depois do CSS da layer:

```css
:root {
  --ads-button-radius: 4px;
  --ads-button-primary: #0050b3;
}
```

## Tema do Nuxt UI

O `app.config.ts` da layer customiza os seguintes componentes do Nuxt UI para seguir o ADS:

`button`, `input`, `inputDate`, `calendar`, `select`, `selectMenu`, `toast`, `toaster` e `tooltip`.

Por ser uma layer, você pode estender ou sobrescrever no `app.config.ts` do seu projeto:

```ts
// app/app.config.ts
export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: "rounded-md",
      },
    },
  },
});
```

## Composables

### `useOverlayLoading`

Exibe um overlay de tela cheia para carregamento, sucesso, erro, busca ou informação, com barra de progresso opcional.

```ts
const overlay = useOverlayLoading();

overlay.show({
  variant: "loading",
  title: "Processando",
  description: "Isso pode levar alguns segundos.",
  showProgress: true,
  progress: 10,
});

overlay.update({ progress: 60 });

overlay.update({ variant: "success", title: "Concluído!" });

overlay.close();
```

| Método            | Descrição |
| ----------------- | --------- |
| `show(options)`   | Abre o overlay (fecha o anterior, se houver) e retorna o id. |
| `update(options)` | Mescla novas props no overlay aberto. |
| `close()`         | Fecha o overlay. |
| `isOpen()`        | Indica se há overlay aberto. |
| `getCurrentId()`  | Retorna o id do overlay atual. |

Opções (`OverlayLoadingOptions`):

| Opção             | Tipo |
| ----------------- | ---- |
| `variant`         | `"loading"` \| `"search"` \| `"info"` \| `"success"` \| `"error"` \| `"warning"` (ícone Lucide animado) |
| `title`, `description`, `hint` | `string` |
| `showProgress`, `progress` | `boolean`, `number` |
| `iconSrc`         | `string` |
| `actionLabel`, `onAction` | rótulo e callback de ação |
| `actionIcon`      | ícone Lucide da ação (padrão: `i-lucide-refresh-cw` só no erro) |
| `secondaryActionLabel`, `secondaryActionIcon`, `onSecondaryAction` | segunda ação (unfilled); sem callback, fecha o overlay |
| `onUserClose`     | callback quando uma ação de fechar é acionada |

## Utilitários

Todos ficam em `app/utils` e são auto-importados pelo Nuxt.

| Arquivo               | Funções principais |
| --------------------- | ------------------ |
| `money.ts`            | `numberToBRL`, `numberToCompactBRL`, `parseStringMoneyToFloat`, `formatPriceInput`, `parsePriceInput` |
| `percentage.ts`       | `formatPercentage`, `formatPercentageWithDecimals`, `formatPercentagePtBr` |
| `parser.ts`           | `parseToPercentage`, `parsePercentageToFloat`, `getTodayDateString`, `formatDateOnlyToPtBr`, `formatDateToPtBr`, `daysBetweenDateOnly`, `daysFromTodayToDateOnly`, `normalizePercentage` |
| `calendar-date.ts`    | Conversão entre `string` e `CalendarDate` (`@internationalized/date`) e helpers de intervalo |
| `notability.ts`       | `formatNotability` |
| `category-role.ts`    | `CATEGORY_ROLES`, `formatCategoryRole`, `parseCategoryRole` |
| `ads-filter-select.ts`| Helpers para `AdsSelect` (agrupamento, seleção, rótulos, meses) |
| `ads-table.ts`        | Helpers e tipos para `AdsTable` |

```ts
numberToBRL(1234.5);            // "R$ 1.234,50"
numberToBRL(-10);               // "R$ -10,00"
numberToBRL(null);              // "-"
numberToCompactBRL(2_500_000);  // valor compacto em milhões
```

## Localização (pt-BR)

A layer inclui `app/locale/pt-br.ts`, que exporta o locale do Nuxt UI para português do Brasil (calendário, meses e rótulos):

```ts
import { uiLocale, UI_LOCALE_CODE } from "ads-nuxt/app/locale/pt-br";
// UI_LOCALE_CODE === "pt-BR"
```

Passe-o ao `UApp` como mostrado em [Configuração](#configuração).

## Desenvolvimento

Este repositório usa **pnpm** e contém um **playground** Nuxt com a documentação interativa dos componentes e dos tokens.

```bash
git clone https://github.com/jbfarmarcas/alquimia-design-system.git
cd alquimia-design-system
pnpm install

pnpm dev       # playground em http://localhost:3010
pnpm build     # build do playground
pnpm preview   # preview do build

pnpm skill:reference   # regenera skills/ads-nuxt/reference.md a partir de app/
pnpm skill:check       # falha se o reference.md estiver desatualizado
```

Páginas do playground:

| Rota                      | Conteúdo |
| ------------------------- | -------- |
| `/design-system/instalacao` | Manual de instalação da biblioteca |
| `/design-system`          | Catálogo de componentes com demos e código |
| `/design-system/tokens`   | Editor visual dos tokens de componente |

### Docker

```bash
docker compose up --build
```

A imagem executa o build de produção do playground (`pnpm build`) e serve o resultado em `http://localhost:3010`. Não há hot reload no container: para desenvolver, use `pnpm dev`.

### Publicação

O pacote publica apenas `app/` e `nuxt.config.ts` (campo `files`), com acesso público:

A publicação é feita pelo GitHub Actions (`.github/workflows/publish.yml`), com Trusted Publishing (sem token). Para lançar uma versão:

```bash
npm version patch --ignore-scripts   # ou minor / major: cria o commit e a tag vX.Y.Z
git push --follow-tags
```

## Estrutura do projeto

```
.
├── app/                    # Conteúdo publicado no npm (a layer)
│   ├── app.config.ts       # Tema do Nuxt UI
│   ├── assets/             # CSS e SVGs de marca
│   ├── components/         # Componentes Ads*
│   ├── composables/        # useOverlayLoading
│   ├── constants/          # Constantes (swatches de cor)
│   ├── locale/             # Locale pt-BR
│   ├── plugins/            # Plugin de toast
│   ├── theme/              # Tokens e temas (TS/JSON)
│   ├── types/              # Tipos compartilhados
│   └── utils/              # Utilitários de formatação e helpers
├── playground/             # App de documentação (não publicado)
├── skills/ads-nuxt/        # Skill para agentes de IA (SKILL.md + reference.md gerado)
├── scripts/                # generate-skill-reference.mjs (pnpm skill:reference)
├── nuxt.config.ts          # Entrada da layer
└── package.json
```

## Licença

[MIT](./LICENSE) © 2026 Farmarcas
