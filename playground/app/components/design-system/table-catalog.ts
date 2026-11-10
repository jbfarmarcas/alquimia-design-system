/**
 * Catálogo da página Tabelas.
 *
 * Figma: duas variantes documentadas (Table e Heavy Table).
 * As cascas Lista/Grade continuam funcionando mas não são o foco.
 */

// ─── Legacy (mantido para backward compat do inventário) ───────────────────

/** Lista e Grade: cascas antigas, continuam no código (só no código, sem seção no catálogo). */
export type TableVariantId = "lista" | "grade";

export type TableInventoryRow = {
  name: string;
  path: string;
  screen: string;
  base: "UTable" | "<table>" | "Grid virtual" | "2 <table>";
  header: string;
  rows: string;
  features: string;
  variant: TableVariantId;
  /** Renderizado ao vivo (só props) ou réplica do markup (depende de store ou do wizard). */
  render: "vivo" | "réplica";
};

export const TABLE_VARIANT_LABEL: Record<TableVariantId, string> = {
  lista: "Lista",
  grade: "Grade",
};

// ─── Chrome / especificação visual ─────────────────────────────────────────

/**
 * Especificação visual das tabelas ADS conforme o Figma (nov/2026).
 */
export const TABLE_CHROME = [
  {
    part: "Cabeçalho",
    value: "Fundo surface/main (#FAFBFC). Texto text-secondary, Body 14 Medium (--ads-font-size-xxs, --ads-font-weight-medium).",
  },
  {
    part: "Célula",
    value: "Fundo surface-card. Texto text-secondary, 14px regular. O nome da linha é bold em text-primary, no mesmo tamanho.",
  },
  {
    part: "Coluna fixa",
    value: "column-pinning do UTable, com a largura igual ao size. Primeira coluna à esquerda e ação ou total à direita.",
  },
  {
    part: "Célula preenchida",
    value: "O fundo ocupa o td inteiro (data-cell-fill), com os tokens de faixa: button-secondary ou warning-100. Não é um chip dentro da célula.",
  },
  {
    part: "Borda",
    value: "1px em borders/subtle (#E5E8EB, via --ads-border-subtle) em todo lugar. borders: lines (só horizontal) ou grid (horizontal e vertical).",
  },
  {
    part: "Raio",
    value: "radius-md (12px). Dentro de AdsCard, framed false: o card já é a moldura.",
  },
  {
    part: "Busca",
    value: "AdsTableToolbar: título à esquerda, AdsSearchInput e o slot de AdsSelect à direita.",
  },
  {
    part: "Carregamento",
    value: "AdsTableSkeleton (estilos Skeleton e Logo) quando disponível; fallback para AdsLoading. Passe :skeleton-rows para controlar as linhas.",
  },
] as const;

// ─── Inventário de tabelas em produção ─────────────────────────────────────

export const TABLE_INVENTORY: TableInventoryRow[] = [
  {
    name: "CompetitorsTab",
    path: "strategy/components/competitors",
    screen: "Estratégia › Concorrentes",
    base: "UTable",
    header: "#F0F3F6, bold, #505F79",
    rows: "Zebra neutral-50/80 e divisória",
    features: "Ícone, nome e endereço, pills, ação por linha",
    variant: "lista",
    render: "vivo",
  },
  {
    name: "sessions.vue",
    path: "research/pages/research/import",
    screen: "Pesquisa › Importações",
    base: "UTable",
    header: "neutral-50/90, semibold, neutral-800",
    rows: "Divisória neutral-100",
    features: "Paginação, status, remover",
    variant: "lista",
    render: "réplica",
  },
  {
    name: "token/index.vue",
    path: "auth/pages/token",
    screen: "Auth › Tokens",
    base: "<table>",
    header: "neutral-100/80, semibold, neutral-700",
    rows: "Hover neutral-50/80",
    features: "Mono, truncamento por title, ação Usar",
    variant: "lista",
    render: "réplica",
  },
  {
    name: "StepProductResultTable",
    path: "simulation/components/steps/step-product-result",
    screen: "Simulação › Produtos",
    base: "UTable",
    header: "zinc-100, text-muted-foreground",
    rows: "Bordered, zebra zinc-100/30, hover zinc-200/50",
    features: "Seleção em lote, colunas configuráveis, scroll infinito, 700px fixos",
    variant: "grade",
    render: "réplica",
  },
  {
    name: "StepImportLinks",
    path: "research/components/import-wizard",
    screen: "Importação › Vínculos",
    base: "UTable",
    header: "bg-elevated/95 com blur, tokens do Nuxt",
    rows: "Zebra elevated/40, divisória default/10",
    features: "Virtualizada, seleção, ordenação, UBadge, popover",
    variant: "grade",
    render: "réplica",
  },
  {
    name: "ResearchResultTable",
    path: "research/components",
    screen: "Pesquisa › Resultado",
    base: "<table>",
    header: "Grupos azul, verde e roxo em caixa alta; rótulo em pílula",
    rows: "Zebra zinc-50, hover zinc-100",
    features: "Duas colunas fixas, cabeçalho fixo, altura via :style, modal por célula",
    variant: "grade",
    render: "vivo",
  },
  {
    name: "StoreCompetitivenessTable",
    path: "strategy/components",
    screen: "Estratégia › Competitividade",
    base: "2 <table>",
    header: "neutral-50, semibold, neutral-800",
    rows: "Célula cheia: branco sobre #5484FC ou #EF164A",
    features: "Fixas à esquerda e à direita, total, arrastar, largura medida no JS",
    variant: "grade",
    render: "vivo",
  },
  {
    name: "ConsolidatedResultTable",
    path: "simulation/components/steps/step-consolidated-result",
    screen: "Simulação › Consolidado",
    base: "<table>",
    header: "gray-50 e gray-100 em duas linhas",
    rows: "Zebra gray-50, bordas verticais, total com borda 2px",
    features: "Árvore, grupos por cluster, min-width via style",
    variant: "grade",
    render: "vivo",
  },
  {
    name: "StepTargetMargin",
    path: "simulation/components/steps",
    screen: "Simulação › Margem objetivo",
    base: "<table>",
    header: "Sem fundo, text-muted-foreground, medium",
    rows: "slate-200 e slate-100 por nível",
    features: "Árvore de 3 níveis, campo por categoria",
    variant: "grade",
    render: "réplica",
  },
  {
    name: "NotabilityCategoriesCard",
    path: "strategy/components/notability",
    screen: "Estratégia › Notabilidade",
    base: "UTable",
    header: "#FAFBFC, caixa alta, borda #C1C7D0",
    rows: "Divisória neutral-100",
    features: "Papel por linha no AdsSelect, popover de histórico",
    variant: "lista",
    render: "vivo",
  },
  {
    name: "StepImportValidation",
    path: "research/components/import-wizard",
    screen: "Importação › Validação (3 tabelas)",
    base: "Grid virtual",
    header: "<table> só no cabeçalho, neutral-50/95, medium",
    rows: "Grid absoluto, divisória neutral-100",
    features: "Virtualização manual, correção por linha, UBadge",
    variant: "grade",
    render: "réplica",
  },
  {
    name: "NotabilityProductsCard",
    path: "strategy/components/notability",
    screen: "Estratégia › Notabilidade",
    base: "UTable",
    header: "#FAFBFC, caixa alta, #7A869A",
    rows: "Zebra #F0F3F6/#FAFBFC e divisória #C1C7D0",
    features: "Resumo por classe",
    variant: "lista",
    render: "vivo",
  },
  {
    name: "ImportFilePreview",
    path: "research/components/import-wizard",
    screen: "Importação › Upload",
    base: "UTable",
    header: "neutral-100 com sombra 1px",
    rows: "Divisória neutral-100/25 (quase invisível)",
    features: "4 linhas, coluna de 12rem, truncamento por title",
    variant: "lista",
    render: "vivo",
  },
];

// ─── Seções da página ───────────────────────────────────────────────────────

export type TableSectionId =
  | "table"
  | "heavy-table"
  | "cell-types"
  | "loading"
  | "inventario"
  | "comparacao";

export type TableSection = {
  id: TableSectionId;
  label: string;
  purpose: string;
  components: readonly string[];
};

export const TABLE_SECTIONS: readonly TableSection[] = [
  {
    id: "table",
    label: "Table",
    purpose: "Tabela operacional com cabeçalho fixo e colunas fixas configuráveis. Usa AdsTable sobre UTable.",
    components: ["AdsTable", "AdsTableToolbar"],
  },
  {
    id: "cell-types",
    label: "Tipos de célula",
    purpose: "Os 9 tipos de célula do _Table Cell do Figma: Texto, Ícone + Texto, Pill, Botão, Link, Meta, Ações, Combinado e Progresso.",
    components: ["AdsTable"],
  },
  {
    id: "heavy-table",
    label: "Heavy Table",
    purpose: "Tabela financeira com cabeçalho em dois níveis (grupos de colunas), grupos de linhas em accordion e tons de variação.",
    components: ["AdsHeavyTable"],
  },
  {
    id: "loading",
    label: "Carregamento",
    purpose: "Integração com AdsTableSkeleton (estilos Skeleton e Logo). Enquanto não estiver disponível, cai para AdsLoading.",
    components: ["AdsTableSkeleton", "AdsLoading"],
  },
  {
    id: "inventario",
    label: "Inventário",
    purpose: "As treze tabelas em produção e a variante que cada uma passa a usar. O AdsTable implementa as duas cascas anteriores (Lista e Grade).",
    components: ["AdsTable"],
  },
  {
    id: "comparacao",
    label: "Padrão",
    purpose: "A informação de cada tabela na variante AdsTable, com linhas de exemplo.",
    components: [],
  },
] as const;
