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

- `AdsButton`: a prop `type` é o **visual** (`filled`, `outline`, `unfilled`, `secondary`, `ia`). O `type` do `<button>` é `nativeType`. Com `to`, vira link. Prop `color` **só no código** (o Figma não tem eixo de cor). Status `innovation` foi **removido** — use `primary` ou os tokens de IA.
- `AdsCard`: prop `type` (`container` | `details`). No `details`, as linhas vêm de `rows` (`{ icon?, label, value }`). `loading` agora mostra o loader do Radar (container) ou skeleton (details), não shimmer. `empty` mantém o cabeçalho e mostra o `AdsEmptyState` pequeno (`emptyMessage`, `emptyDescription`). Slot `hint` foi **removido** — use a prop `hint` (ícone de info) ou o slot `actions`. `description` e `footerText` são **só no código**. `as` aceita `"div"`, `"button"` ou um componente de link (como `NuxtLink`, com `to` no card); o hover é padrão nos cards clicáveis (`AdsCard`, `AdsMetricCard`): neutro, borda `--ads-card-hover-border` (#c1c7d0) e sombra nível 1; `:hoverable="false"` desliga. `AdsFeatureCard` não usa esse hover.
- `AdsModal`: abre com `v-model:open`. Eventos `confirm`, `cancel` e `dismiss`. Prop `size` **só no código**.
- `AdsDatePicker` e `AdsMonthPicker` trafegam datas como string `YYYY-MM-DD`. Intervalo: `range` com `v-model:start` e `v-model:end`.
- `AdsSelect` é o **único** componente de seleção (antigos `AdsFilterSelect`, `AdsListDropdown`, `AdsFilterDropdown`, `AdsFilterOption` e o `mode` do `AdsDropdownMenu`). `type`: `checkbox` (múltipla), `radio` (simples) ou `month`. Gatilho: campo do Figma por padrão, slot `#trigger` (`{ open, label, hasValue }`) para um gatilho próprio, ou `inline` para só a lista. Opções: `{ value, label, subtitle?, badge?: { label, tone?: "brand" | "ai", icon? }, disabled? }`; selo `ai` usa sparkles. Ação de cadastro no rodapé com `add-label="Cadastrar {query}"` (ícone de adicionar em cor da marca; `{query}` vira a busca) e evento `@add` com a busca. No popover, a lista fecha antes do evento. Lista de 320px com rolagem virtualizada (só as linhas visíveis são montadas), então milhares de opções não travam a tela. `AdsSelectPanel` e `AdsSelectItem` são peças internas. `AdsDropdownMenu` agora é só menu de ações (`items`).
- Valor preenchido por IA: `AdsInput`, `AdsNumberInput`, `AdsTextarea`, `AdsSearchInput`, `AdsDatePicker` e `AdsSelect` têm a prop `ai-suggestion`. Para `AdsSearchInput` e `AdsTextarea`, `ai-suggestion` e o estado `ai` são **só no código** (o Figma não os tem). Ela não se desliga sozinha: ponha `false` quando a pessoa editar. Erro e desabilitado têm prioridade.
- `state` nos componentes congela hover, focus etc. para documentação. Não use em telas reais.
- `AdsToast`: `appearance="banner"` = Toast Header; `appearance="status"` = Toast Alert. Status `primary` foi **removido** — use `neutral`. Na faixa banner, `loading` também foi removido. `status="loading"` é válido só no reporte escuro (`appearance="status"`).
- `AdsPill`: status `innovation` e `neutral` foram **removidos**. 6 status válidos: `default`, `success`, `attention`, `warning`, `new`, `blocked`. Nova prop `size`: `"md"` (Pill, 24px, padrão) ou `"sm"` (Small Pill, 18px). **`AdsSmallPill` foi removido** — use `<AdsPill size="sm">`. **`AdsMiniPill` foi removido** — use `<AdsPill size="sm" tone="secondary">`.
- `AdsBadge`: prop `color` **só no código**.
- Broadcast agora é `<AdsPill variant="broadcast" status="warning|success">` (sem texto padrão: passe `label`, ex. `label="LIVE"`; ignora `tone` e `size`). No `AdsNavbarDesk`, use `broadcast-label`. `AdsBroadcast` continua como atalho de compatibilidade; prefira a Pill. O `status` é **só no código** (o Figma tem só uma variante).
- `AdsSegmentedTabs`: `items[n].icon` (24px, à esquerda) e `items[n].subtitle` (12px regular secundário, abaixo do rótulo) seguem o Switch Tabs do Figma; com eles a aba cresce além dos 30px. Antes, o `subtitle` não aparecia.
- `AdsNotabilityPill`: renderiza `AdsPill` internamente via `customSurface`. A API pública não mudou.
- `AdsFarmarcasPill` foi **removido**, junto com os tokens `--ads-farmarcas-*`.
- `AdsFeatureCard`: o `color="innovation"` foi renomeado para `color="ai"`, que usa `--ads-text-ai` e `--ads-surface-ai`. Agora renderiza o `AdsCard` (mesma casca e foco) e só define o conteúdo. `color` pinta a pílula. No hover, título e seta passam para a cor dessa variação e o fundo da pílula escurece (mistura 82% do fundo com a cor do ícone). Borda e sombra não mudam. `:hoverable="false"` desliga. `primary` usa `--ads-feature-accent-blue` (#d9eaff) com o ícone da marca; `success` usa `--ads-feature-accent-green` (#e8f8ef) e `--ads-feature-accent-green-icon` (#16a34a). `actions` (`{ label, icon?, to? }`) são os atalhos do rodapé e emitem `action`; com elas, a casca deixa de ser o botão. Os tokens `--ads-feature-border`, `-background`, `-radius` e `-hover-border` foram **removidos**: use os `--ads-card-*`. O padding do atalho é `--ads-feature-padding`.
- `AdsLoading`: `lines` default mudou de 0 para 3. `region`, `lines` e `overlay` são **só no código**. Spinner virou o anel do Figma (16/24/40 px) com o rótulo **à direita**; no logo, o rótulo fica **acima**. `size` e `tone` valem para todas as variantes. **`variant="shimmer"` agora é um bloco cinza** (40/80/120 px); para o brilho por cima do conteúdo, passe `overlay` (o pai precisa de `relative` e `overflow-hidden`).
- `AdsMetricCard`: prop `type` (`kpi` | `pending` | `metric`, padrão `metric`). A variação é a prop `delta` com `deltaDirection` e `deltaTone`. **Removidos:** prop `caption` (use `comparisonLabel` + `comparisonValue` com `comparisonInline`) e os slots `delta`, `status`, `footer` e `default`. `value` deixou de ser obrigatório. `selected` agora é azul com sombra. O balão do `hint` aceita `hintIcon` (Lucide, padrão `i-lucide-info`), `hintColor` e `hintAlign="end"` para encostar o ícone no fim do card.
- `AdsPanelCard`: raio padrão passou a ser `sm` (8px) e o padding é 24px, sem linha sob o cabeçalho. Botões Gráfico/Tabela com `view-toggle` e `v-model:view`.
- `AdsFileCard`: no erro, a `message` fica **acima** do card, com ícone de alerta.
- `AdsTableSkeleton`: prop de estilo é `variant` (não `style`). Dois valores: `skeleton` e `logo`.
- `ProgressBarLoading`: prop `variant="error"` foi **removida** — não existe no Figma. Use `"primary"` durante o andamento e `"success"` ao concluir. Visual do Figma: ícone de 18px sem caixa (check verde no sucesso), "—" no indeterminado e "Tempo decorrido: 00:42" abaixo da barra.
- `--ads-text-tertiary`: agora é `#5e6c84` (placeholder e texto terciário), não mais o "desabilitado". Para texto desabilitado, use `--ads-text-disabled`.
- `AdsTable`/`AdsHeavyTable`: `sticky` fixa o cabeçalho e limita a tabela a 70vh. A altura muda pelo `ui`: `:ui="{ root: 'max-h-96' }"` (a classe do consumidor vence a do padrão, via `mergeAdsTableUi`). Para muitas linhas, `virtualize` monta só as visíveis; precisa dessa rolagem própria. Padrão: desligado.
- `AdsTable`/`AdsHeavyTable`: o slot `#loading` padrão usa `AdsTableSkeleton`. Para trocar o estilo, passe `:skeleton-variant="'logo'"`. Para conteúdo personalizado, use o slot `#loading`.
- Classes `bg-ads-radar-pricing-*` foram **removidas**. Use `bg-ads-radar-*`.

## Componentes

| Grupo | Componentes |
| ----- | ----------- |
| Ações | `AdsButton`, `AdsButtonGroup`, `AdsButtonMenu` |
| Formulário | `AdsInput`, `AdsNumberInput`, `AdsTextarea`, `AdsSearchInput`, `AdsCheckbox`, `AdsRadio`, `AdsSwitch`, `AdsDatePicker`, `AdsMonthPicker`, `AdsSelect` |
| Navegação | `AdsNavbarDesk`, `AdsNavbarApp`, `AdsSideMenu`, `AdsMenuBar`, `AdsTabs`, `AdsSegmentedTabs`, `AdsPagination`, `AdsDropdownMenu` (só ações), `AdsFooter`, `AdsStepper` |
| Dados | `AdsTable`, `AdsTableHeaderCell`, `AdsHeavyTable`, `AdsHeavyAccountCell`, `AdsHeavyHeaderCell`, `AdsTableSkeleton`, `AdsTableToolbar`, `AdsCard`, `AdsMetricCard`, `AdsPanelCard`, `AdsFeatureCard`, `AdsFileCard`, `AdsEmptyState`, `AdsCardVariation`, `AdsCardPeriod`, `AdsCardHint` |
| Status | `AdsBadge`, `AdsPill` (size `md`/`sm`, variant `broadcast`), `AdsBroadcast` (atalho), `AdsNotabilityPill`, `AdsProductTag` |
| Feedback | `AdsModal`, `AdsToast`, `AdsTooltip`, `AdsSmalltip`, `AdsSteptip`, `AdsCharttip`, `AdsLoading`, `ProgressBarLoading`, `OverlayLoading` |

A lista completa e atual, com props, eventos e slots, está em [reference.md](reference.md).

## Tokens

Três camadas: primitivos (escalas) → semânticos (intenção) → de componente (`--ads-button-*`, `--ads-modal-*`…).

| Uso | Variável CSS | Classe Tailwind |
| --- | ------------ | --------------- |
| Fundo | `--ads-surface-main`, `--ads-surface-card`, `--ads-surface-brand` | `bg-ads-surface-*` |
| Texto | `--ads-text-primary`, `-secondary`, `-tertiary`, `-brand`, `-disabled`, `-contrast` | `text-ads-text-*` |
| Borda | `--ads-border-subtle`, `--ads-border-focused`, `--ads-border-width-*` | `border-ads-border-*` |
| Status | `--ads-status-{success,warning,attention,new,void}-<100..800>` | `bg-ads-status-*` |
| IA | `--ads-text-ai` (#613dda), `--ads-surface-ai` (#f3f0ff) | `text-ads-text-ai`, `bg-ads-surface-ai` |
| Marca forte | `--ads-text-brand-strong` (#074ac6), `--ads-border-input` (#7a869a) | `text-ads-text-brand-strong` |
| Radar | `--color-ads-radar-<passo>` | `bg-ads-radar-*` |
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
| `ads-table.ts` | helpers de coluna do `AdsTable` e `AdsHeavyTable`: `adsTableGroup`, `adsTableCellFill`, `adsTableTreeIndent`, `adsHeavyGroupTdAttrs`, `adsHeavyGroupContentClass`, `adsHeavyVariationClass`, `adsHeavyColumn`, `adsHeavyAccountColumn`, `buildAdsTableUi`, `buildAdsHeavyTableUi`; tipos: `AdsTableCellType`, `AdsTableGroupTone` (inclui `"ai"`) |
| `ads-filter-select.ts` | helpers do `AdsSelect` |

`useOverlayLoading()`: overlay de tela cheia com `show`, `update`, `close`, `isOpen`, `getCurrentId`. Não tem botão de fechar: quem fecha é a ação (`actionLabel` ou `secondaryActionLabel`) ou `close()`.

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
