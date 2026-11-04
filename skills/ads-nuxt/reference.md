# ADS: referência de componentes

> Gerado por `pnpm skill:reference` a partir de `app/components`. Não edite à mão.
> Para o comportamento exato, leia o `.vue` em `node_modules/ads-nuxt/app/components/`.

48 componentes. Todos são auto-importados pelo Nuxt.

## AdsBadge

Props:
```ts
{
  /** Cor do contador. Innovation usa o rosa do handoff (#fde3ff / data-1 800). */
  color?: AdsBadgeColor;
  /** Ponto de 8px, sem número. */
  mini?: boolean;
  value?: string | number;
}
```

Tipos:
```ts
type AdsBadgeColor = "primary" | "success" | "attention" | "warning" | "new" | "innovation" | "blocked";
```

## AdsBroadcast

Props:
```ts
{
  label?: string;
  status?: AdsBroadcastStatus;
}
```

Tipos:
```ts
type AdsBroadcastStatus = "warning" | "success";
```

## AdsButton

Props:
```ts
{
  type?: AdsButtonType;
  /** Mesmas cores do badge, mais neutral para ação sem status. */
  color?: AdsButtonColor;
  size?: AdsButtonSize;
  label?: string;
  /** Ícone à esquerda. No Figma, o exemplo é sparkles. Sem rótulo, o ícone ocupa o botão sozinho. */
  leading?: boolean;
  /** Ícone à direita. Sem `trailingIcon`, usa `icon`. */
  trailing?: boolean;
  icon?: string;
  trailingIcon?: string;
  /** Vira link. Sem valor, continua `<button>`. */
  to?: RouteLocationRaw;
  disabled?: boolean;
  /** Troca o ícone por spinner e bloqueia o clique. */
  loading?: boolean;
  /** `type` do `<button>`. A prop `type` já é o visual do ADS. */
  nativeType?: "button" | "submit" | "reset";
  /**
   * Congela um estado para a documentação.
   * Sem valor, hover e pressed vêm do ponteiro.
   */
  state?: AdsButtonState | null;
}
```

Tipos:
```ts
type AdsButtonType = "filled" | "outline" | "unfilled" | "secondary" | "ia";

type AdsButtonSize = "md" | "sm";

type AdsButtonState = "active" | "hover" | "pressed" | "disabled";

type AdsButtonColor = "primary" | "success" | "attention" | "warning" | "new" | "innovation" | "blocked" | "neutral";
```

Slots: `default`

## AdsButtonGroup

Props:
```ts
{
  options: AdsButtonGroupOption[];
  ariaLabel?: string;
}
```

Tipos:
```ts
type AdsButtonGroupOption = {
  value: string;
  label: string;
};
```

Models: `v-model: string`

## AdsButtonMenu

Props:
```ts
{
  options: AdsButtonMenuOption[];
  showSubtitles?: boolean;
  showIcons?: boolean;
}
```

Tipos:
```ts
type AdsButtonMenuOption = {
  value: string;
  title: string;
  subtitle?: string;
  icon?: string;
};
```

Eventos:
```ts
{
  select: [value: string];
}
```

## AdsCard

Props:
```ts
{
  /** Título em negrito. O slot header substitui. */
  title?: string;
  /** Texto de apoio. O slot padrão substitui. */
  description?: string;
  /** Linha curta no rodapé. O slot footer substitui. */
  footerText?: string;
  /** `button` quando o cartão é a própria ação. */
  as?: "div" | "button";
  disabled?: boolean;
  /** Realce de item escolhido, como um filtro ativo. */
  selected?: boolean;
  /** `sm` (8px) em cartões grandes; `md` (12px) é o padrão. */
  radius?: "sm" | "md";
}
```

Slots: `header`, `hint`, `actions`, `default`, `footer`

## AdsCharttip

Props:
```ts
{
  title?: string;
  rows?: AdsCharttipRow[];
  /** Figma `Property 1`. Com slot, escolhe o lado em que o painel abre, como no AdsTooltip. A seta não é desenhada. */
  wing?: "up" | "down" | "left" | "right";
  delayDuration?: number;
}
```

Tipos:
```ts
type AdsCharttipRow = {
  label: string;
  value: string;
  /** Classe de fundo, como `bg-ads-grafico-c1-400`. */
  colorClass?: string;
  /** Cor sem token. Preferir `colorClass`. */
  color?: string;
};
```

Slots: `default`

## AdsCheckbox

Props:
```ts
{
  label?: string;
  disabled?: boolean;
}
```

Models: `v-model: boolean`, `v-model:indeterminate: boolean`

Slots: `default`

## AdsDatePicker

Props:
```ts
{
  range?: boolean;
  min?: string;
  max?: string;
  disabled?: boolean;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  maximumDays?: number;
  class?: string;
  /** O valor veio de uma sugestão de IA. Quem usa limpa a marca quando a pessoa edita. */
  aiSuggestion?: boolean;
}
```

Models: `v-model: string`, `v-model:start: string`, `v-model:end: string`

## AdsDropdownMenu

Props:
```ts
{
  items: DropdownMenuItem[] | DropdownMenuItem[][];
  content?: {
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
  };
}
```

Slots: `default`

## AdsEmptyState

Props:
```ts
{
  title?: string;
  subtitle?: string;
  /** Figma `Small=Yes`. */
  small?: boolean;
  showActions?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
}
```

Slots: `default`

## AdsFarmarcasPill

Props:
```ts
{
  department?: AdsFarmarcasDepartment;
  label?: string;
}
```

Tipos:
```ts
type AdsFarmarcasDepartment =
| "expansao"
| "eventos"
| "adm-digital"
| "sucesso"
| "trade"
| "dev"
| "ti"
| "padronizacao"
| "diretoria"
| "comercial"
| "inovacao"
| "patrimonio"
| "presidencia"
| "marketing"
| "gg"
| "bi"
| "financeiro"
| "juridico"
| "capacitacao"
| "produto";
```

## AdsFeatureCard

Props:
```ts
{
  title: string;
  description: string;
  icon: string;
  /** Cor do ícone, da seta e da borda. Sem valor, fica na cor da marca. */
  color?: AdsFeatureCardColor;
  /** Vira link. Sem valor, continua botão. */
  to?: RouteLocationRaw;
  disabled?: boolean;
  badges?: AdsFeatureCardBadge[];
  footerIcon?: string;
  footerText?: string;
}
```

Tipos:
```ts
interface AdsFeatureCardBadge {
  label: string;
  tone?: AdsPillTone;
  status?: AdsPillStatus;
}

type AdsFeatureCardColor =
| "primary"
| "success"
| "attention"
| "warning"
| "new"
| "blocked"
| "innovation";
```

Eventos:
```ts
{
  click: [event: MouseEvent];
}
```

## AdsFileCard

Props:
```ts
{
  /** Nome do arquivo. */
  name: string;
  /** Linha de apoio, como o tamanho. */
  detail?: string;
  status?: AdsFileCardStatus;
  /** Texto do problema, acima do arquivo. */
  message?: string;
  icon?: string;
  removable?: boolean;
  removeLabel?: string;
}
```

Tipos:
```ts
type AdsFileCardStatus = "success" | "error";
```

Eventos:
```ts
{
  remove: [];
}
```

## AdsFilterDropdown

Props:
```ts
{
  type: "checkbox" | "radio";
  options: FilterOption[];
  searchable?: boolean;
  selectAll?: boolean;
  selectAllLabel?: string;
  emptyLabel?: string;
  searchPlaceholder?: string;
  listLabel?: string;
  widthClass?: string;
}
```

Models: `v-model: string | string[]`, `v-model:query: string`

Eventos:
```ts
{ pick: [] }
```

## AdsFilterOption

Props:
```ts
{
  label: string;
  mode: "checkbox" | "radio";
  selected?: boolean;
  indeterminate?: boolean;
}
```

Eventos:
```ts
{ select: [] }
```

## AdsFilterSelect

Props:
```ts
{
  type: AdsFilterType;
  label?: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  options?: AdsFilterOption[];
  /** `null` = padrão do tipo (checkbox busca e seleciona todos). */
  searchable?: boolean | null;
  selectAll?: boolean | null;
  selectAllLabel?: string;
  allSelectedLabel?: string;
  emptyLabel?: string;
  searchPlaceholder?: string;
  /** O gatilho ocupa a largura do campo, como um select de formulário. */
  block?: boolean;
  /** O valor veio de uma sugestão de IA. Quem usa limpa a marca quando a pessoa altera a seleção. */
  aiSuggestion?: boolean;
}
```

Tipos:
```ts
interface AdsFilterOption {
  value: string;
  label: string;
}

type AdsFilterType = "checkbox" | "radio" | "month";
```

Models: `v-model: string | string[]`

## AdsFooter

Props:
```ts
{
  developerLabel?: string;
}
```

## AdsInput

Props:
```ts
{
  label?: string;
  hint?: string;
  error?: string;
  info?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: string;
  type?: "text" | "number";
  suffix?: string;
  min?: string | number;
  step?: string | number;
  /** Estado congelado para a documentação. `null` segue o campo. */
  state?: AdsInputState | null;
  /** O valor veio de uma sugestão de IA. Quem usa limpa a marca quando a pessoa edita. */
  aiSuggestion?: boolean;
}
```

Tipos:
```ts
type AdsInputState = "default" | "active" | "focus" | "error" | "disabled" | "ai";
```

Models: `v-model: string | number`

Eventos:
```ts
{
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}
```

## AdsListDropdown

Props:
```ts
{
  options: AdsFilterOption[];
  /** Figma `Search`. */
  search?: boolean;
  emptyLabel?: string;
  searchPlaceholder?: string;
  listLabel?: string;
}
```

Tipos:
```ts
interface AdsFilterOption {
  value: string;
  label: string;
}
```

Models: `v-model: string`

Eventos:
```ts
{
  pick: [value: string];
}
```

## AdsLoading

Props:
```ts
{
  /**
   * spinner: área ainda vazia.
   * skeleton: o formato da tela já é conhecido.
   * shimmer: o conteúdo continua visível, por baixo.
   */
  variant?: AdsLoadingVariant;
  /** sm na tabela, md na seção, lg no modal. */
  size?: AdsLoadingSize;
  /** primary no dado da tela, muted numa tabela secundária. */
  tone?: AdsLoadingTone;
  /** Centraliza o spinner numa seção vazia. */
  region?: boolean;
  label?: string;
  /**
   * Linhas do skeleton. Zero desenha um bloco só;
   * altura e largura vêm da class.
   */
  lines?: number;
}
```

Tipos:
```ts
type AdsLoadingVariant = "spinner" | "skeleton" | "shimmer";

type AdsLoadingSize = "sm" | "md" | "lg";

type AdsLoadingTone = "primary" | "muted";
```

## AdsMenuBar

Props:
```ts
{
  items?: AdsMenuBarItem[];
  activeId?: string;
  openId?: string;
}
```

Tipos:
```ts
type AdsMenuBarItem = {
  id: string;
  label: string;
  icon: string;
  to?: RouteLocationRaw;
  dividerBefore?: boolean;
  state?: AdsMenuBarState;
};

type AdsMenuBarState = "regular" | "selected" | "open";
```

Eventos:
```ts
{
  "update:activeId": [id: string];
  select: [id: string];
}
```

## AdsMetricCard

Props:
```ts
{
  /** Rótulo acima do número. */
  title: string;
  /** Número ou frase principal. */
  value: string;
  /** Texto do ícone de ajuda ao lado do rótulo. */
  hint?: string;
  /** Linha curta abaixo do número, como o valor atual. */
  caption?: string;
  /** Valor ausente: 16px medium, cor tertiary. */
  empty?: boolean;
  /** `button` quando o cartão é a própria ação. */
  as?: "div" | "button";
  disabled?: boolean;
  /** Realce de item escolhido, como um filtro ativo. */
  selected?: boolean;
}
```

Slots: `status`, `delta`, `footer`, `default`

## AdsMiniPill

Props:
```ts
{
  type?: AdsMiniPillType;
  label?: string;
}
```

Tipos:
```ts
type AdsMiniPillType = "nao-iniciado" | "pausado" | "novo";
```

## AdsModal

Props:
```ts
{
  title: string;
  description?: string;
  /** Nome Lucide, como `i-lucide-align-center`. Sem valor, o título fica só com o texto. */
  icon?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  variant?: AdsModalVariant;
  /** Largura do cartão. `md` é o diálogo de confirmação (532px). */
  size?: AdsModalSize;
  scrollable?: boolean;
  dismissible?: boolean;
  /** Sem o X. Overlay e Esc continuam no `dismissible`. */
  closable?: boolean;
}
```

Tipos:
```ts
type AdsModalDismissReason = "esc" | "outside";

type AdsModalVariant = "dialog" | "sheet";

type AdsModalSize = "md" | "lg" | "xl" | "2xl" | "3xl";
```

Models: `v-model:open: boolean`

Eventos:
```ts
{
  confirm: [];
  cancel: [];
  dismiss: [reason: AdsModalDismissReason];
}
```

Slots: `title`, `default`, `footer`

## AdsMonthPicker

Sem props.

Models: `v-model: string`

Eventos:
```ts
{ pick: [] }
```

## AdsNavbarApp

Props:
```ts
{
  items?: AdsNavbarAppItem[];
  activeId?: string;
}
```

Tipos:
```ts
type AdsNavbarAppItem = {
  id: string;
  label: string;
  icon: string;
  to?: RouteLocationRaw;
};
```

Eventos:
```ts
{
  "update:activeId": [id: string];
}
```

## AdsNavbarDesk

Props:
```ts
{
  product?: AdsProductTagName | null;
  productLabel?: string;
  showBroadcast?: boolean;
  avatarUrl?: string;
  actions?: AdsNavbarDeskAction[];
}
```

Tipos:
```ts
type AdsNavbarDeskAction = {
  id: string;
  label: string;
  icon: string;
};
```

Eventos:
```ts
{
  action: [id: string];
}
```

## AdsNotabilityPill

Props:
```ts
{
  notability: string;
  label?: string;
}
```

## AdsNumberInput

Props:
```ts
{
  label?: string;
  hint?: string;
  info?: string;
  error?: string;
  placeholder?: string;
  suffix?: string;
  disabled?: boolean;
  min?: string | number;
  step?: string | number;
  /** Estado congelado para a documentação. `null` segue o campo. */
  state?: AdsNumberInputState | null;
  /** O valor veio de uma sugestão de IA. Quem usa limpa a marca quando a pessoa edita. */
  aiSuggestion?: boolean;
}
```

Tipos:
```ts
type AdsNumberInputState = "default" | "active" | "focus" | "error" | "disabled" | "ai";
```

Models: `v-model: string | number`

Eventos:
```ts
{
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}
```

## AdsPagination

Props:
```ts
{
  page?: number;
  totalPages?: number;
  prevLabel?: string;
  nextLabel?: string;
  ariaLabel?: string;
}
```

Eventos:
```ts
{
  "update:page": [page: number];
}
```

## AdsPill

Props:
```ts
{
  status?: AdsPillStatus;
  tone?: AdsPillTone;
  label?: string;
  icon?: string;
  /** Classes do ícone, como o giro do carregamento. */
  iconClass?: string;
}
```

Tipos:
```ts
type AdsPillStatus = "default" | "success" | "attention" | "warning" | "new" | "blocked" | "innovation" | "neutral";

type AdsPillTone = "primary" | "secondary";
```

## AdsProductTag

Props:
```ts
{
  product?: AdsProductTagName;
  label?: string;
}
```

Tipos:
```ts
type AdsProductTagName =
| "marketing"
| "promocoes"
| "vendas"
| "captador"
| "estoque"
| "pricing"
| "crm"
| "compras"
| "gestao"
| "trade"
| "capacitacao"
| "ecommerce"
| "financas"
| "performance"
| "encontro";
```

## AdsRadio

Props:
```ts
{
  label?: string;
  value?: string | number | boolean;
  name?: string;
  disabled?: boolean;
}
```

Models: `v-model: string | number | boolean`

Slots: `default`

## AdsSearchInput

Props:
```ts
{
  placeholder?: string;
  ariaLabel?: string;
  hint?: string;
  disabled?: boolean;
  icon?: string;
  size?: AdsSearchInputSize;
  /** Estado congelado para a documentação. `null` segue o campo. */
  state?: AdsSearchInputState | null;
  /** O texto veio de uma sugestão de IA. Quem usa limpa a marca quando a pessoa edita. */
  aiSuggestion?: boolean;
}
```

Tipos:
```ts
type AdsSearchInputState = "default" | "active" | "focus" | "disabled" | "ai";

type AdsSearchInputSize = "md" | "sm";
```

Models: `v-model: string`

## AdsSegmentedTabs

Props:
```ts
{
  items: TabsItem[];
  ariaLabel?: string;
}
```

Models: `v-model: T`

## AdsSideMenu

Props:
```ts
{
  items: AdsSideMenuItem[];
  /** Pais abertos no primeiro render. O Figma não desenha o clique. */
  defaultOpen?: string[];
}
```

Tipos:
```ts
type AdsSideMenuItem = {
  id: string;
  label: string;
  icon?: string;
  to?: RouteLocationRaw;
  children?: AdsSideMenuItem[];
  /** Texto da mini pill. Vazio esconde. */
  pill?: string;
  /** Ponto de 8px (Figma Show Badge no item mãe). */
  badge?: boolean;
};
```

Eventos:
```ts
{
  select: [id: string];
}
```

## AdsSmalltip

Props:
```ts
{
  text?: string;
  delayDuration?: number;
}
```

Slots: `default`

## AdsSteptip

Props:
```ts
{
  title?: string;
  description?: string;
  step?: number;
  totalSteps?: number;
  skipLabel?: string;
  backLabel?: string;
  nextLabel?: string;
  finishLabel?: string;
  /** Lado do gatilho onde o passo abre. Só vale com slot. */
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
}
```

Eventos:
```ts
{
  skip: [];
  back: [];
  next: [];
  finish: [];
}
```

Slots: `default`

## AdsSwitch

Props:
```ts
{
  label?: string;
  disabled?: boolean;
}
```

Models: `v-model: boolean`

Slots: `default`

## AdsTable

Props:
```ts
{
  data: T[];
  columns: TableColumn<T>[];
  /** md: lista e gestão. sm: grade de dados larga ou prévia. */
  density?: AdsTableDensity;
  /** Zebra só em grade numérica larga. */
  striped?: boolean;
  /** Borda e raio próprios. Dentro de AdsCard, false. */
  framed?: boolean;
  /** lines: só horizontal. grid: horizontal e vertical. */
  borders?: AdsTableBorders;
  /** Degradê por nível. A célula marca `data-depth` de 0 a 2. */
  depth?: boolean;
  loading?: boolean;
  /** Cabeçalho (e rodapé) fixos quando a tabela tem altura máxima. */
  sticky?: boolean | "header" | "footer";
  emptyLabel?: string;
  emptyIcon?: string;
  loadingLabel?: string;
  /** Ajuste pontual de um slot; soma ao padrão. */
  ui?: Partial<AdsTableUi>;
}
```

Tipos:
```ts
type AdsTableDensity = "md" | "sm";

type AdsTableBorders = "lines" | "grid";

type AdsTableUi = {
  root: string;
  base: string;
  thead: string;
  tbody: string;
  tfoot: string;
  tr: string;
  th: string;
  td: string;
  separator: string;
  empty: string;
  loading: string;
};
```

Slots: `default`

## AdsTableToolbar

Props:
```ts
{
  /** Título à esquerda. Sem título, a busca e os filtros ocupam a faixa. */
  title?: string;
  description?: string;
  /** Mostra o AdsSearchInput. O filtro entra no slot padrão, com AdsFilterSelect. */
  searchable?: boolean;
  searchPlaceholder?: string;
}
```

Models: `v-model:search: string`

Slots: `title`, `default`

## AdsTabs

Props:
```ts
{
  items: TabsItem[];
  /** `false` deixa só a faixa de abas, sem painel. */
  content?: boolean;
  defaultItem?: TabsItem;
  /** Classes extras na lista, como um recuo lateral. */
  listClass?: string;
}
```

Models: `v-model: T`

Slots: `trailing`, `content`

## AdsTextarea

Props:
```ts
{
  label?: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  /** Estado congelado para a documentação. `null` segue o campo. */
  state?: AdsTextareaState | null;
  /** O texto veio de uma sugestão de IA. Quem usa limpa a marca quando a pessoa edita. */
  aiSuggestion?: boolean;
}
```

Tipos:
```ts
type AdsTextareaState = "default" | "active" | "focus" | "error" | "disabled" | "ai";
```

Models: `v-model: string`

## AdsToast

Props:
```ts
{
  status?: AdsToastStatus;
  /** `banner` é a faixa clara. `status` é o reporte escuro (Figma Status Toast). */
  appearance?: AdsToastAppearance;
  /** Faixa estreita de 331px, a variação `App` do ADS. */
  app?: boolean;
  message?: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  /** Quando falso, o aviso permanece sem a ação de fechar. */
  closable?: boolean;
  /** Recuperação na própria faixa, como tentar de novo. */
  actionLabel?: string;
  /** Ícone da ação. Vazio esconde o ícone. */
  actionIcon?: string;
}
```

Tipos:
```ts
type AdsToastStatus = "primary" | "success" | "error" | "warning" | "neutral" | "loading";

type AdsToastAppearance = "banner" | "status";
```

Eventos:
```ts
{
  close: [];
  action: [];
}
```

Slots: `default`

## AdsTooltip

Props:
```ts
{
  title?: string;
  description?: string;
  showTitle?: boolean;
  showDescription?: boolean;
  /** Figma `Wing Position`. */
  wing?: Wing;
  delayDuration?: number;
  /** Alinhamento do balão em relação ao gatilho. */
  align?: "start" | "center" | "end";
  /** Não abre o balão. Útil para texto que só aparece quando é cortado. */
  disabled?: boolean;
}
```

Tipos:
```ts
type Wing = "up" | "down" | "left" | "right";
```

Slots: `default`

## OverlayLoading

Sem props.

Eventos:
```ts
{
  close: [];
}
```

Slots: `default`

## ProgressBarLoading

Props:
```ts
{
  title?: string;
  description?: string;
  icon?: string;
  showIcon?: boolean;
  spinIcon?: boolean;
  indeterminate?: boolean;
  percent?: number;
  showPercent?: boolean;
  showElapsedTime?: boolean;
  ariaLabel?: string;
  variant?: ProgressBarLoadingVariant;
  rootClass?: string;
}
```

Tipos:
```ts
type ProgressBarLoadingVariant = "primary" | "success" | "error";
```
