# ADS: referência de componentes

> Gerado por `pnpm skill:reference` a partir de `app/components`. Não edite à mão.
> Para o comportamento exato, leia o `.vue` em `node_modules/ads-nuxt/app/components/`.

55 componentes. Todos são auto-importados pelo Nuxt.

## AdsBadge

Props:
```ts
{
  /** Cor do contador. Sem valor: primary no badge e new (#05b4d8) no mini, como no Figma (Context=Secondary). */
  color?: AdsBadgeColor;
  /** Ponto de 8px, sem número. */
  mini?: boolean;
  value?: string | number;
}
```

Tipos:
```ts
type AdsBadgeColor = "primary" | "success" | "attention" | "warning" | "new" | "blocked";
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

type AdsButtonColor = "primary" | "success" | "attention" | "warning" | "new" | "blocked" | "neutral";
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
  /**
   * container: título, período e conteúdo livre no slot padrão.
   * details: título maior e lista de informações (rows).
   */
  type?: AdsCardType;
  /** O slot header substitui. */
  title?: string;
  /** Texto do ícone de informação ao lado do título. */
  hint?: string;
  /** Datas do período, como "01/12/2023 - 20/12/2023". */
  period?: string;
  periodLabel?: string;
  /** Linhas do card Detalhes. */
  rows?: AdsCardRow[];
  /** Texto de apoio abaixo do cabeçalho. Só no código: o Figma não tem. */
  description?: string;
  /** Linha curta no rodapé. O slot footer substitui. Só no código: o Figma não tem. */
  footerText?: string;
  /**
   * `button` quando o cartão é a própria ação. Também aceita um componente de link
   * (como NuxtLink, com `to` passado direto no card): fica clicável como o botão.
   */
  as?: "div" | "button" | Component;
  disabled?: boolean;
  /** Hover padrão dos cards clicáveis: borda cinza mais escura e sombra leve. false desliga. */
  hoverable?: boolean;
  /** Estado Selecionado: fundo azul claro, borda azul e sombra. */
  selected?: boolean;
  /** `md` (12px) é o do Figma; `sm` (8px) é só no código. */
  radius?: "sm" | "md";
  /** Estado Carregando: no container, o loader do Radar; no details, skeleton nas linhas. */
  loading?: boolean;
  /** Estado Vazio: mantém o cabeçalho e mostra o empty state. */
  empty?: boolean;
  emptyMessage?: string;
  emptyDescription?: string;
}
```

Tipos:
```ts
type AdsCardType = "container" | "details";

interface AdsCardRow {
  /** Ícone Lucide de 16px. */
  icon?: string;
  /** Rótulo em negrito, como "Criado em:". */
  label: string;
  value: string;
}
```

Slots: `header`, `actions`, `empty`, `empty-actions`, `default`, `footer`

## AdsCardHint

Props:
```ts
{
  text: string;
}
```

## AdsCardPeriod

Props:
```ts
{
  label: string;
  value?: string;
  tone?: "brand" | "neutral";
  loading?: boolean;
  /** Largura do skeleton do selo, em px. */
  skeletonWidth?: number;
}
```

## AdsCardVariation

Props:
```ts
{
  value: string;
  direction?: AdsCardVariationDirection;
  tone?: AdsCardVariationTone;
}
```

Tipos:
```ts
type AdsCardVariationDirection = "up" | "down";

type AdsCardVariationTone = "positive" | "negative";
```

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
  /** Ações do menu. Grupos em arrays aninhados ganham separador. */
  items?: DropdownMenuItem[] | DropdownMenuItem[][];
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

## AdsFeatureCard

Props:
```ts
{
  title: string;
  description: string;
  icon: string;
  /** Cor da caixa do ícone. O hover é o padrão dos cards, igual para todas as cores. */
  color?: AdsFeatureCardColor;
  /** Vira link. Sem valor, continua botão. */
  to?: RouteLocationRaw;
  disabled?: boolean;
  /** Hover padrão dos cards (borda e sombra neutras; a seta escurece). false desliga. */
  hoverable?: boolean;
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
| "ai";
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
  /** Texto do problema, acima do arquivo. Só aparece no erro. */
  message?: string;
  /** Ícone Lucide. Padrão: planilha no sucesso, arquivo com X no erro. */
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

## AdsFooter

Props:
```ts
{
  developerLabel?: string;
}
```

## AdsHeavyAccountCell

Props:
```ts
{
  /** Linha do TanStack, recebida no slot da célula. */
  row: {
    depth: number;
    index: number;
    subRows: unknown[];
    getIsExpanded: () => boolean;
    toggleExpanded: () => void;
  };
  label: string;
}
```

## AdsHeavyHeaderCell

Props:
```ts
{
  label: string;
  /** Coluna do TanStack, recebida na função `header`. */
  column?: AdsTableHeaderColumn;
  /** Coluna que o título ordena, quando não é a própria (grupos). */
  sortColumn?: AdsTableHeaderColumn;
}
```

Tipos:
```ts
type AdsTableHeaderColumn = {
  getCanSort: () => boolean;
  getIsSorted: () => false | "asc" | "desc";
  toggleSorting: () => void;
  getCanPin: () => boolean;
  getIsPinned: () => false | "left" | "right";
  pin: (position: false | "left" | "right") => void;
};
```

## AdsHeavyTable

Props:
```ts
{
  data: T[];
  columns: TableColumn<T>[];
  /** md: padrão financeiro. sm: tabela compacta. */
  density?: AdsTableDensity;
  /** Borda e raio próprios. Dentro de AdsCard, false. */
  framed?: boolean;
  /** lines: só horizontal. grid: horizontal e vertical. */
  borders?: AdsTableBorders;
  loading?: boolean;
  /** Número de linhas do skeleton de carregamento (1–8). */
  skeletonRows?: number;
  /**
   * Estilo do skeleton padrão.
   * skeleton: barras de placeholder. logo: loader do Radar.
   */
  skeletonVariant?: AdsTableSkeletonVariant;
  /**
   * Cabeçalho fixo quando a tabela tem altura máxima.
   * Padrão: "header" — cabeçalho fica no topo ao rolar horizontalmente.
   */
  sticky?: boolean | "header" | "footer";
  /** Lista virtual para muitas linhas. Repassa ao AdsTable. */
  virtualize?: boolean;
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

## AdsLoading

Props:
```ts
{
  /**
   * spinner: área ainda vazia.
   * skeleton: o formato da tela já é conhecido.
   * shimmer: bloco cinza com brilho; com `overlay`, brilho sobre o conteúdo.
   * logo: símbolo do Radar, para a página ou uma seção inteira.
   */
  variant?: AdsLoadingVariant;
  /** sm na tabela, md na seção, lg no modal. */
  size?: AdsLoadingSize;
  /** primary no dado principal, muted em áreas secundárias. */
  tone?: AdsLoadingTone;
  /** Centraliza o spinner ou o logo numa seção vazia. Só no código: o Figma não tem esse eixo. */
  region?: boolean;
  /** Rótulo: à direita do spinner, acima do logo. */
  label?: string;
  /**
   * Linhas do skeleton. Zero desenha um bloco só; altura e largura vêm da class.
   * Só no código: o Figma define 3 linhas fixas.
   */
  lines?: number;
  /** Shimmer só com o brilho, por cima do conteúdo do pai. Só no código. */
  overlay?: boolean;
}
```

Tipos:
```ts
type AdsLoadingVariant = "spinner" | "skeleton" | "shimmer" | "logo";

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
  /** Linha depois do item. O Figma fecha a lista com uma linha após Campanhas. */
  dividerAfter?: boolean;
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
  /**
   * kpi: ícone grande, título e valor.
   * pending: número em destaque com unidade, bom para cards selecionáveis.
   * metric: período, valor com variação e comparativo.
   */
  type?: AdsMetricCardType;
  title: string;
  /** Valor principal. */
  value?: string;
  /** Texto do ícone de informação ao lado do título. */
  hint?: string;
  /** Ícone Lucide: 24px no KPI, 16px na Pendência. */
  icon?: string;
  /** Unidade ao lado do número na Pendência, como "pendências". */
  unit?: string;
  /** Ícone de 24px antes do valor na Métrica. */
  valueIcon?: string;
  /** Variação ao lado do valor (KPI e Métrica), como "1,15%". */
  delta?: string;
  deltaDirection?: AdsCardVariationDirection;
  /** positive quando a variação é boa; negative quando é ruim. */
  deltaTone?: AdsCardVariationTone;
  /** Datas do período (Métrica), como "01/12/2023 - 20/12/2023". */
  period?: string;
  periodLabel?: string;
  /** Rótulo do comparativo (Métrica). Sem ele, o comparativo some. */
  comparisonLabel?: string;
  comparisonValue?: string;
  /** Selo cinza ao lado do rótulo do comparativo, como "Set, Out e Nov". */
  comparisonBadge?: string;
  /** Rótulo e valor do comparativo na mesma linha, sem divisória. */
  comparisonInline?: boolean;
  /** Linha entre o valor e o comparativo empilhado. */
  divider?: boolean;
  /** Estado Selecionado: fundo azul claro, borda azul e sombra. */
  selected?: boolean;
  /** Estado Carregando: título e rótulos ficam; valores viram skeleton. */
  loading?: boolean;
  /** Estado Vazio. KPI e Pendência mostram "—" com a mensagem; Métrica mostra o empty state. */
  empty?: boolean;
  emptyMessage?: string;
  /** Texto de apoio do empty state da Métrica. */
  emptyDescription?: string;
  /** `button` quando o cartão é a própria ação. */
  as?: "div" | "button";
  disabled?: boolean;
  /** Hover padrão dos cards clicáveis: borda cinza mais escura e sombra leve. false desliga. */
  hoverable?: boolean;
}
```

Tipos:
```ts
type AdsMetricCardType = "kpi" | "pending" | "metric";
```

Slots: `actions`, `empty`, `empty-actions`

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
  /** Texto da pílula de broadcast (ex.: "LIVE"). Sem valor, a pílula não aparece. */
  broadcastLabel?: string;
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

## AdsPanelCard

Props:
```ts
{
  /** O slot header substitui título e subtítulo. */
  title?: string;
  /** Texto do ícone de informação ao lado do título. */
  hint?: string;
  subtitle?: string;
  /** Mostra os botões Gráfico e Tabela. Use com v-model:view. */
  viewToggle?: boolean;
  /** Estado Carregando: shimmer sobre o painel. Só no código: o Figma não tem. */
  loading?: boolean;
  /** `sm` (8px) é o do Figma; `md` (12px) é só no código. */
  radius?: "sm" | "md";
}
```

Models: `v-model:view: AdsPanelCardView`

Slots: `header`, `actions`, `default`

## AdsPill

Props:
```ts
{
  /**
   * broadcast: a pílula de transmissão (LIVE), com borda e ponto. Só tem as cores
   * warning e success; os outros status usam warning. Ignora tone e size.
   */
  variant?: AdsPillVariant;
  status?: AdsPillStatus;
  tone?: AdsPillTone;
  /** `md` = Pill normal (24px). `sm` = Small Pill (18px). Default `md`. */
  size?: AdsPillSize;
  label?: string;
  /** Ícone à esquerda (Lucide). */
  icon?: string;
  /** Classes do ícone à esquerda, como o giro do carregamento. */
  iconClass?: string;
  /** Ícone opcional à direita (Lucide). */
  trailingIcon?: string;
  /**
   * Override avançado de fundo e texto (classes Tailwind).
   * Uso interno do atalho de domínio AdsNotabilityPill.
   * Em produção, prefira esses atalhos em vez desta prop.
   */
  customSurface?: string;
}
```

Tipos:
```ts
type AdsPillStatus = "default" | "success" | "attention" | "warning" | "new" | "blocked";

type AdsPillTone = "primary" | "secondary";

type AdsPillSize = "md" | "sm";

type AdsPillVariant = "default" | "broadcast";
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
  items: AdsSegmentedTabsItem[];
  ariaLabel?: string;
}
```

Tipos:
```ts
interface AdsSegmentedTabsItem extends Omit<TabsItem, "slot"> {
  /** Linha secundária abaixo do rótulo, em 12px regular. */
  subtitle?: string;
}
```

Models: `v-model: T`

## AdsSelect

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
  /** Mostra só a lista, sem gatilho nem popover. */
  inline?: boolean;
  /** Largura da lista. Padrão: --ads-select-panel-width (320px). */
  panelWidthClass?: string;
  /**
   * Ação de cadastrar no rodapé da lista, com ícone de adicionar. `{query}` vira a busca atual,
   * ex.: "Cadastrar {query}". Sem valor, a ação não aparece.
   */
  addLabel?: string;
}
```

Tipos:
```ts
interface AdsFilterOption {
  value: string;
  label: string;
  /** Linha de apoio abaixo do título. Também entra na busca. */
  subtitle?: string;
  badge?: AdsFilterOptionBadge;
  disabled?: boolean;
}

type AdsFilterType = "checkbox" | "radio" | "month";

interface AdsFilterOptionBadge {
  label: string;
  /** brand (azul, padrão) ou ai (roxo, com sparkles se não houver ícone). */
  tone?: "brand" | "ai";
  /** Ícone Lucide de 12px antes do texto. */
  icon?: string;
}
```

Models: `v-model: string | string[]`

Eventos:
```ts
{
  /** Escolha feita: no radio e no month o popover fecha. */
  pick: [value: string | string[]];
  /** Ação de cadastrar. Recebe a busca atual. No popover, a lista fecha antes do evento. */
  add: [query: string];
}
```

Slots: `trigger`

## AdsSelectItem

Props:
```ts
{
  label: string;
  /** radio: seleção simples. checkbox: seleção múltipla. */
  mode: "checkbox" | "radio";
  selected?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  /** Linha de apoio abaixo do título. */
  subtitle?: string;
  /** Texto curto acima do título, como "Novo!" (brand) ou "Sugestão Inteligente" (ai). */
  badge?: AdsFilterOptionBadge;
  /** Linha de 1px embaixo. O painel desliga no último item. */
  divider?: boolean;
}
```

Tipos:
```ts
interface AdsFilterOptionBadge {
  label: string;
  /** brand (azul, padrão) ou ai (roxo, com sparkles se não houver ícone). */
  tone?: "brand" | "ai";
  /** Ícone Lucide de 12px antes do texto. */
  icon?: string;
}
```

Eventos:
```ts
{ select: [] }
```

## AdsSelectPanel

Props:
```ts
{
  /** radio: seleção simples (Figma Simples). checkbox: seleção múltipla. */
  type: "checkbox" | "radio";
  options: FilterOption[];
  /** Campo de busca no topo, com divisória. */
  searchable?: boolean;
  /** "Selecionar todos" no começo da lista. Só no checkbox, e some durante a busca. */
  selectAll?: boolean;
  selectAllLabel?: string;
  emptyLabel?: string;
  searchPlaceholder?: string;
  listLabel?: string;
  /** Largura do painel. Padrão: --ads-select-panel-width (320px). */
  widthClass?: string;
  /**
   * Ação de cadastrar no rodapé, com ícone de adicionar. `{query}` vira a busca atual.
   * Sem valor, a ação não aparece.
   */
  addLabel?: string;
}
```

Models: `v-model: string | string[]`, `v-model:query: string`

Eventos:
```ts
{
  pick: [];
  /** Ação de cadastrar. Recebe a busca atual, sem espaços nas pontas. */
  add: [query: string];
}
```

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

## AdsStepper

Props:
```ts
{
  /** Lista de passos. Mínimo 2, máximo 6. */
  steps: AdsStepperStep[];
  /** Estilo visual do stepper. */
  variant?: "simple" | "visual";
  /** Direção do Stepper Visual. O Stepper Simples é sempre horizontal. */
  orientation?: "horizontal" | "vertical";
  /** O que aparece no círculo do Stepper Visual (passos pendentes). Concluídos sempre mostram check. */
  indicator?: "icon" | "number";
  /** Exibe os rótulos dos passos. */
  showLabels?: boolean;
  /** Permite navegar clicando nos passos. */
  clickable?: boolean;
  /** Permite avançar clicando em passos futuros (só válido quando clickable=true). */
  allowForward?: boolean;
  /** Rótulo acessível da navegação. */
  ariaLabel?: string;
}
```

Tipos:
```ts
interface AdsStepperStep {
  /** Rótulo exibido abaixo da barra (Stepper Simples) ou do círculo (Stepper Visual). */
  label?: string;
  /** Texto abaixo do título. Só aparece no Stepper Visual. */
  description?: string;
  /** Ícone Lucide. Só usado quando indicator="icon" e passo não está concluído. */
  icon?: string;
}
```

Models: `v-model: number`

Eventos:
```ts
{
  "update:modelValue": [step: number];
}
```

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
  /**
   * Número de linhas do skeleton de carregamento (1–8).
   * Passado para o AdsTableSkeleton no slot #loading padrão.
   */
  skeletonRows?: number;
  /**
   * Estilo do skeleton padrão.
   * skeleton: barras de placeholder. logo: loader do Radar.
   * Passado para AdsTableSkeleton; ignorado quando #loading é passado via slot.
   */
  skeletonVariant?: AdsTableSkeletonVariant;
  /** Altura e respiro da linha do skeleton, quando a tabela foge do padrão da densidade. */
  skeletonCellSize?: string;
  /** Cabeçalho (e rodapé) fixos. A tabela ganha altura máxima de 70vh; max-h na classe sobrescreve. */
  sticky?: boolean | "header" | "footer";
  /**
   * Lista virtual: só as linhas visíveis são montadas. Use com muitas linhas (centenas ou mais).
   * Precisa de rolagem própria (sticky ou max-h), senão a tabela inteira é montada.
   */
  virtualize?: boolean;
  /** Linha de 1px na borda da coluna fixa. */
  pinnedEdge?: boolean;
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

## AdsTableHeaderCell

Props:
```ts
{
  label: string;
  /** Coluna do TanStack, recebida na função `header`. */
  column?: AdsTableHeaderColumn;
  /** Acompanha o conteúdo: pills ao centro, ações à direita. */
  align?: keyof typeof JUSTIFY;
  sortable?: boolean;
  pinnable?: boolean;
  /** Lado em que o botão fixa a coluna: left no início, right no final da tabela. */
  pinSide?: "left" | "right";
  /** Mantém o título só para leitor de tela, como na coluna de ações. */
  hideLabel?: boolean;
}
```

Tipos:
```ts
type AdsTableHeaderColumn = {
  getCanSort: () => boolean;
  getIsSorted: () => false | "asc" | "desc";
  toggleSorting: () => void;
  getCanPin: () => boolean;
  getIsPinned: () => false | "left" | "right";
  pin: (position: false | "left" | "right") => void;
};
```

## AdsTableSkeleton

Props:
```ts
{
  /**
   * Número de linhas do skeleton. Mínimo 1, máximo 8.
   * Corresponde a Linha 1 a Linha 8 do Figma.
   */
  rows?: number;
  /**
   * skeleton: barras de placeholder na grade da tabela.
   * logo: loader do Radar centralizado na área da tabela.
   */
  variant?: AdsTableSkeletonVariant;
  /** Alinhamento de cada coluna da tabela real. Sem cabeçalho próprio quando informado. */
  columns?: AdsTableSkeletonAlign[];
  /** Altura e respiro das células, iguais aos da linha de dados. Só com `columns`. */
  cellClass?: string;
}
```

Tipos:
```ts
type AdsTableSkeletonVariant = "skeleton" | "logo";

type AdsTableSkeletonAlign = "left" | "center" | "right";
```

## AdsTableToolbar

Props:
```ts
{
  /** Título à esquerda. Sem título, a busca e os filtros ocupam a faixa. */
  title?: string;
  description?: string;
  /** Mostra o AdsSearchInput. O filtro entra no slot padrão, com AdsSelect. */
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
  /** `banner` é a faixa clara (Toast Header). `status` é o reporte escuro (Toast Alert). */
  appearance?: AdsToastAppearance;
  /** Faixa estreita de 331px, a variação `App` do ADS. */
  app?: boolean;
  message?: string;
  /** Descrição complementar exibida abaixo da mensagem na faixa (banner). */
  description?: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  /** Quando falso, o aviso permanece sem a ação de fechar. */
  closable?: boolean;
  /** Rótulo da ação em link. Sem valor, esconde o link. */
  actionLabel?: string;
}
```

Tipos:
```ts
type AdsToastStatus = "success" | "error" | "warning" | "attention" | "neutral" | "loading";

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
  /** Ícone do andamento. No sucesso vira o check verde. */
  icon?: string;
  showIcon?: boolean;
  spinIcon?: boolean;
  /** Sem percentual conhecido: mostra "—" e um trecho da barra que atravessa a trilha. */
  indeterminate?: boolean;
  percent?: number;
  showPercent?: boolean;
  /** "Tempo decorrido: 00:42", abaixo da barra. */
  showElapsedTime?: boolean;
  ariaLabel?: string;
  variant?: ProgressBarLoadingVariant;
  rootClass?: string;
}
```

Tipos:
```ts
type ProgressBarLoadingVariant = "primary" | "success";
```
