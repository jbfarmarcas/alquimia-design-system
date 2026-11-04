---
name: ads-nuxt
description: Usa o Alquimia Design System (pacote npm ads-nuxt) em projetos Nuxt 4. Cobre instalação da layer, componentes Ads*, tokens --ads-*, tema do Nuxt UI e utilitários pt-BR. Use ao criar ou alterar telas Nuxt que usam ads-nuxt, ao escolher um componente Ads*, ao aplicar cor, espaço, raio ou fonte do ADS, ou ao instalar e configurar o design system.
---

# ADS (ads-nuxt) nos projetos

O ADS é uma **Nuxt Layer** sobre o Nuxt UI v4 e o Tailwind CSS v4. Ao estendê-la, o projeto recebe os componentes `Ads*`, os tokens, o tema do Nuxt UI, os utilitários pt-BR, a fonte Inter e os ícones Lucide.

## Antes de começar

Confirme no projeto, e corrija se faltar:

1. `ads-nuxt` está em `package.json` e `nuxt.config.ts` tem `extends: ["ads-nuxt"]`.
2. `app/app.vue` envolve tudo em `UApp`, com `uiLocale` e `adsToaster`:
   ```vue
   <UApp :locale="uiLocale" :tooltip="{ delayDuration: 400 }" :toaster="adsToaster"><NuxtPage /></UApp>
   <script setup lang="ts">
   import { uiLocale } from "ads-nuxt/app/locale/pt-br";
   import { adsToaster } from "ads-nuxt/app/theme/ads-theme";
   </script>
   ```
3. Nuxt `^4` e Vue `^3.5.18`.
4. As peers estão no `package.json` do projeto: `@nuxt/ui ^4.3.0`, `tailwindcss ^4.0.15`, `@nuxt/icon ^2.2.0`, `@nuxt/fonts ^0.12.1 || ^0.14.0`, `@vueuse/core` e `@vueuse/nuxt ^14.0.0`, `@internationalized/date ^3.12.4`. Elas são do projeto, não do ADS: `pnpm add` delas, sem instalar versão diferente. `pnpm why @nuxt/ui` deve mostrar uma única versão.

A layer já registra `@nuxt/ui`, `@nuxt/fonts`, `@nuxt/icon` e `@vueuse/nuxt`, o CSS global, a fonte Inter e a coleção `lucide`. **Não** registre esses módulos de novo nem importe outro CSS do Nuxt UI.

## Regras de uso

- **Componente Ads\* primeiro.** Só use `UButton`, `UInput` etc. do Nuxt UI, ou HTML cru, quando nenhum `Ads*` cobrir o caso. Eles são auto-importados, sem `import`.
- **Antes de usar um componente, leia as props dele** em [reference.md](reference.md) (busque `## AdsNome`). Para o comportamento exato, leia `node_modules/ads-nuxt/app/components/<AdsNome>.vue`. Não invente props.
- **Nunca fixe cor, espaço, raio ou fonte.** Use token: `var(--ads-surface-card)`, `bg-ads-surface-card`, `text-ads-text-primary`, `border-ads-border-subtle`. Veja [tokens](#tokens).
- **Ícones** são Lucide: `i-lucide-<nome>`.
- **Tema claro apenas.** A layer define `ui.colorMode: false`. Não crie variantes `dark:`.
- **Formatação pt-BR** vem dos utilitários, não de `toLocaleString` solto. Veja [utilitários](#utilitários-e-composables).
- Para ajustar o visual, sobrescreva o token ou o `app.config.ts` do projeto. Não edite arquivos em `node_modules`.

## Armadilhas conhecidas

- `AdsButton`: a prop `type` é o **visual** (`filled`, `outline`, `unfilled`, `secondary`, `ia`). O `type` do `<button>` é `nativeType`. Com `to`, vira link.
- `AdsCard`: o slot padrão **substitui** `description`. Use um ou outro.
- `AdsModal`: abre com `v-model:open`. Eventos `confirm`, `cancel` e `dismiss`.
- `AdsDatePicker` e `AdsMonthPicker` trafegam datas como string `YYYY-MM-DD`. Intervalo: `range` com `v-model:start` e `v-model:end`.
- `state` nos componentes congela hover, focus etc. para documentação. Não use em telas reais.
- Toast flutuante: `useToast()` do Nuxt UI. O plugin da layer aplica cores e ícones do ADS.

## Componentes

| Grupo | Componentes |
| ----- | ----------- |
| Ações | `AdsButton`, `AdsButtonGroup`, `AdsButtonMenu` |
| Formulário | `AdsInput`, `AdsNumberInput`, `AdsTextarea`, `AdsSearchInput`, `AdsCheckbox`, `AdsRadio`, `AdsSwitch`, `AdsDatePicker`, `AdsMonthPicker`, `AdsFilterSelect`, `AdsFilterDropdown`, `AdsFilterOption` |
| Navegação | `AdsNavbarDesk`, `AdsNavbarApp`, `AdsSideMenu`, `AdsMenuBar`, `AdsTabs`, `AdsSegmentedTabs`, `AdsPagination`, `AdsDropdownMenu`, `AdsListDropdown`, `AdsFooter` |
| Dados | `AdsTable`, `AdsTableToolbar`, `AdsCard`, `AdsMetricCard`, `AdsFeatureCard`, `AdsFileCard`, `AdsEmptyState` |
| Status | `AdsBadge`, `AdsPill`, `AdsMiniPill`, `AdsNotabilityPill`, `AdsFarmarcasPill`, `AdsProductTag` |
| Feedback | `AdsModal`, `AdsToast`, `AdsBroadcast`, `AdsTooltip`, `AdsSmalltip`, `AdsSteptip`, `AdsCharttip`, `AdsLoading`, `ProgressBarLoading`, `OverlayLoading` |

A lista completa e atual, com props, eventos e slots, está em [reference.md](reference.md).

## Tokens

Três camadas: primitivos (escalas) → semânticos (intenção) → de componente (`--ads-button-*`, `--ads-modal-*`…).

| Uso | Variável CSS | Classe Tailwind |
| --- | ------------ | --------------- |
| Fundo | `--ads-surface-main`, `--ads-surface-card`, `--ads-surface-brand` | `bg-ads-surface-*` |
| Texto | `--ads-text-primary`, `-secondary`, `-tertiary`, `-brand`, `-disabled`, `-contrast` | `text-ads-text-*` |
| Borda | `--ads-border-subtle`, `--ads-border-focused`, `--ads-border-width-*` | `border-ads-border-*` |
| Status | `--ads-status-{success,warning,attention,new,innovation,void}-<100..800>` | `bg-ads-status-*` |
| Raio | `--ads-radius-{xsm,sm,md,lg,xlg,pill}` | usar `rounded-[var(--ads-radius-md)]` |
| Espaço | `--ads-space-{quark,nano,xxxs,xxs,xs,sm,rg,md,lg,xl,xxl}` | usar `p-[var(--ads-space-xs)]` |
| Fonte | `--ads-font-size-{xxxs,xxs,xs,sm,rg,md,lg}`, `--ads-line-height-*` | `text-[length:var(--ads-font-size-xxs)]` |
| Sombra | `--ads-shadow-level-1` a `-4` | `shadow-[var(--ads-shadow-level-2)]` |

Cores primárias do Nuxt UI (`primary`, `success`, `warning`, `error`, `neutral`) já seguem o ADS: `bg-primary`, `text-neutral-600`.

Para conferir um nome, leia `node_modules/ads-nuxt/app/assets/css/main.css` e `component-tokens.css`. Em TypeScript: `ads-nuxt/app/theme/ads-tokens`.

**Personalizar** no projeto, depois do CSS da layer:

```css
:root { --ads-button-radius: 4px; }
```

Tema do Nuxt UI (`button`, `input`, `inputDate`, `calendar`, `select`, `selectMenu`, `toast`, `toaster`, `tooltip`): sobrescreva em `app/app.config.ts` do projeto.

## Utilitários e composables

Auto-importados, de `app/utils`:

| Arquivo | Funções |
| ------- | ------- |
| `money.ts` | `numberToBRL`, `numberToCompactBRL`, `parseStringMoneyToFloat`, `formatPriceInput`, `parsePriceInput` |
| `percentage.ts` | `formatPercentage`, `formatPercentageWithDecimals`, `formatPercentagePtBr` |
| `parser.ts` | datas e percentuais: `formatDateOnlyToPtBr`, `formatDateToPtBr`, `daysBetweenDateOnly`, `parseToPercentage`… |
| `calendar-date.ts` | conversão `string` ↔ `CalendarDate` e dos valores emitidos pelo Nuxt UI (`toCalendarModel`, `toCalendarDateRange`) |
| `ads-table.ts` | helpers de coluna do `AdsTable` (`adsTableColumn`, `adsTablePinned`, `adsTableGroup`…) |
| `ads-filter-select.ts` | helpers do `AdsFilterSelect` |

`useOverlayLoading()`: overlay de tela cheia com `show`, `update`, `close`, `isOpen`, `getCurrentId`.

`numberToBRL(1234.5)` → `"R$ 1.234,50"`.

## Fluxo para criar ou alterar uma tela

1. Liste o que a tela precisa e mapeie cada parte para um componente `Ads*`.
2. Leia as props de cada um em [reference.md](reference.md).
3. Monte com tokens, sem valores fixos.
4. Rode o projeto e confira: fonte Inter, azul `#006ff7` no botão `filled`, toasts no canto superior direito.
5. Se faltar um componente, diga isso ao usuário em vez de improvisar com CSS solto.

## Se algo não funciona

| Sintoma | Causa provável |
| ------- | -------------- |
| Toast, tooltip ou modal não aparecem | Falta o `UApp` |
| `Ads*` não é encontrado | Falta `extends: ["ads-nuxt"]`; reinicie o servidor |
| Sem estilo ou sem fonte | Módulos do Nuxt UI registrados em duplicidade |
| `pnpm why @nuxt/ui` mostra duas versões, ou `~` aponta para `app/` que não existe | Versão do ADS anterior à `0.1.2` (herdava `srcDir`) ou peer fora do range; atualize o `ads-nuxt` e rode `pnpm dedupe` |
| pnpm avisa de scripts de build ignorados | Comportamento do pnpm 10; `pnpm approve-builds` |
