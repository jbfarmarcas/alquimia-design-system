/**
 * Padrão visual das tabelas ADS sobre o UTable.
 * Duas variantes (lista e grade) com a mesma casca: cabeçalho neutral-100,
 * célula surface-card, borda subtle, raio md. A grade só acrescenta a zebra.
 * Cabeçalho e célula usam o mesmo tamanho: --ads-font-size-xxs. O cabeçalho é bold.
 * As células têm fundo próprio para a coluna fixa e a zebra não vazarem no scroll.
 */

/** 14px, entrelinha de leitura. Igual no cabeçalho e na célula; o negrito não muda o tamanho. */
export const ADS_TABLE_CELL_TEXT =
  "text-[length:var(--ads-font-size-xxs)] leading-[var(--ads-line-height-md)]";

/** O mesmo 14px da célula. O bold separa o cabeçalho. */
export const ADS_TABLE_HEADER_TEXT = `${ADS_TABLE_CELL_TEXT} font-bold`;

export type AdsTableDensity = "md" | "sm";

/** lines: só a divisória horizontal. grid: divisória horizontal e vertical. */
export type AdsTableBorders = "lines" | "grid";

export interface AdsTableLook {
  /** Só o respiro da célula. A fonte não muda. */
  density?: AdsTableDensity;
  /** Zebra só em grade numérica larga, para seguir a linha. */
  striped?: boolean;
  /** Borda e raio próprios. Dentro de AdsCard, false. */
  framed?: boolean;
  /** lines é o padrão. grid desenha a borda entre as células. */
  borders?: AdsTableBorders;
  /** Fundo por nível: neutral-200, neutral-100 e surface-main. Desligado, a linha fica surface-card. */
  depth?: boolean;
}

export type AdsTableUi = {
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

const CELL_PADDING: Record<AdsTableDensity, string> = {
  md: "px-4 py-3",
  sm: "px-3 py-2",
};

const GRID_BORDER = "border-r border-[var(--ads-border-subtle)] last:border-r-0";

export const buildAdsTableUi = ({
  density = "md",
  striped = false,
  framed = true,
  borders = "lines",
  depth = false,
}: AdsTableLook = {}): AdsTableUi => {
  const padding = CELL_PADDING[density];
  const grid = borders === "grid" ? GRID_BORDER : "";
  // Na grade a borda da direita já fecha a coluna fixa da esquerda; a da direita desenha a sua
  // por fora, em cima da borda da vizinha, para não somar 2px.
  const pinnedEdge =
    borders === "grid"
      ? "data-[pinned=right]:shadow-[-1px_0_0_var(--ads-border-subtle)]"
      : "data-[pinned=left]:shadow-[inset_-1px_0_0_var(--ads-border-subtle)] data-[pinned=right]:shadow-[inset_1px_0_0_var(--ads-border-subtle)]";

  return {
    root: [
      "relative overflow-auto bg-[var(--ads-surface-card)]",
      "[scrollbar-color:var(--ads-border-subtle)_transparent] [scrollbar-width:thin]",
      framed ? "rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)]" : "",
    ].join(" "),
    base: "min-w-full border-separate border-spacing-0",
    thead: "z-[2] bg-neutral-100 backdrop-blur-none",
    tbody: [
      "divide-y-0 [&>tr:last-child>td]:border-b-0",
      striped ? "[&>tr:nth-child(even)>td:not(:has([data-cell-fill]))]:bg-[var(--ads-surface-main)]" : "",
      "[&>tr[data-selectable=true]]:cursor-pointer [&>tr[data-selectable=true]:hover>td]:bg-neutral-100",
      "[&>tr[data-selected=true]>td]:bg-[var(--ads-button-secondary)]",
      depth
        ? "[&>tr:has([data-depth='0'])>td:not(:has([data-cell-fill]))]:!bg-neutral-200 [&>tr:has([data-depth='1'])>td:not(:has([data-cell-fill]))]:!bg-neutral-100 [&>tr:has([data-depth='2'])>td:not(:has([data-cell-fill]))]:!bg-[var(--ads-surface-main)]"
        : "",
    ].join(" "),
    tfoot: [
      "z-[2] bg-neutral-100 backdrop-blur-none [&>tr[data-slot=tr]~tr[data-slot=tr]]:hidden",
      "[&_th]:border-t [&_th]:border-b-0 [&_th]:border-[var(--ads-border-subtle)] [&_th]:text-[var(--ads-text-primary)]",
      "[&_td]:border-t [&_td]:border-b-0 [&_td]:border-[var(--ads-border-subtle)]",
    ].join(" "),
    tr: "",
    th: [
      padding,
      "border-b border-[var(--ads-border-subtle)] bg-neutral-100 text-left align-middle whitespace-normal text-[var(--ads-text-secondary)] has-data-cell-fill:!h-px has-data-cell-fill:!p-0",
      grid,
      ADS_TABLE_HEADER_TEXT,
      "[&[colspan]]:text-center [&[colspan]]:text-[var(--ads-text-primary)]",
      "data-[pinned=left]:z-[3] data-[pinned=right]:z-[3]",
      pinnedEdge,
    ].join(" "),
    td: [
      padding,
      "border-b border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] align-middle whitespace-normal text-[var(--ads-text-secondary)] transition-colors duration-150 ease-out has-data-cell-fill:!h-px has-data-cell-fill:!p-0",
      grid,
      ADS_TABLE_CELL_TEXT,
      pinnedEdge,
    ].join(" "),
    separator: "hidden",
    empty: `py-10 text-center text-[var(--ads-text-secondary)] ${ADS_TABLE_CELL_TEXT}`,
    loading: "py-10 text-center",
  };
};

/** `meta` pronto para cada papel de coluna. */
export const adsTableColumn = {
  /** Nome da linha: texto primário em negrito. */
  identity: { class: { td: "font-bold text-[var(--ads-text-primary)]" } },
  /** Valor, preço, percentual e índice. */
  numeric: { class: { th: "text-right", td: "text-right tabular-nums" } },
  center: { class: { th: "text-center", td: "text-center" } },
  /** Checkbox de seleção. */
  select: { class: { th: "w-px pe-0", td: "w-px pe-0" } },
  /** Ação da linha, sempre à direita. */
  action: { class: { th: "w-px", td: "w-px text-right" } },
  /** Texto longo que trunca com InvertedTooltip. */
  truncate: { class: { td: "max-w-72 truncate" } },
} as const;

type AdsTableColumnMeta = { class?: { th?: string; td?: string } };

const PIN_WIDTH_CLASS = {
  48: "min-w-12",
  96: "min-w-24",
  120: "min-w-30",
  160: "min-w-40",
  256: "min-w-64",
} as const;

export type AdsTablePinWidth = keyof typeof PIN_WIDTH_CLASS;

/**
 * Coluna fixa (column-pinning). O UTable desloca a coluna pelo `size` do TanStack,
 * então a largura da célula precisa ser a mesma do `size`.
 */
export const adsTablePinned = (width: AdsTablePinWidth, meta: AdsTableColumnMeta = {}) => ({
  size: width,
  meta: {
    class: {
      th: `${PIN_WIDTH_CLASS[width]} ${meta.class?.th ?? ""}`.trim(),
      td: `${PIN_WIDTH_CLASS[width]} ${meta.class?.td ?? ""}`.trim(),
    },
  },
});

export type AdsTableGroupTone = "brand" | "success" | "innovation" | "neutral";

const GROUP_UNDERLINE: Record<AdsTableGroupTone, string> = {
  brand: "border-b-2 border-b-[var(--ads-button-primary)]",
  success: "border-b-2 border-b-[var(--ads-status-success-500)]",
  innovation: "border-b-2 border-b-[var(--ads-status-innovation-500)]",
  neutral: "",
};

/** Grupo de colunas (Meus dados, Concorrentes, Mercado): risco de 2px no tom da fonte. */
export const adsTableGroup = (tone: AdsTableGroupTone = "neutral") => ({
  class: { th: GROUP_UNDERLINE[tone] },
});

/** Variação: sinal e cor no tom 500, o mesmo do badge. Zero fica neutro. */
export const adsTableVariationClass = (value: number | null | undefined) => {
  if (value == null || value === 0) return "text-[var(--ads-text-secondary)]";
  return value > 0
    ? "font-bold text-[var(--ads-status-success-500)]"
    : "font-bold text-[var(--ads-status-warning-500)]";
};

/** Marca o nível da linha para o degradê. Acima de 2 fica no tom mais claro. */
export const adsTableDepthAttr = (depth: number) => Math.min(Math.max(depth, 0), 2);

export type AdsTableHeat = "high" | "low" | "muted" | "empty";

/**
 * Preenche a célula inteira. O td zera o respiro quando encontra `data-cell-fill` e mantém
 * o fundo opaco, para a coluna fixa não deixar ver o que rola por baixo.
 * Fundo 100 e texto 800 para passar de 4.5:1.
 */
export const adsTableCellFill = (tone: AdsTableHeat) =>
  `flex h-full min-h-11 w-full items-center justify-center px-4 py-3 text-center ${ADS_TABLE_HEAT_CLASS[tone]}`;

/** Faixa de IC. Fundo 100 e texto 800 para passar de 4.5:1. */
export const ADS_TABLE_HEAT_CLASS: Record<AdsTableHeat, string> = {
  high: "bg-[var(--ads-button-secondary)] text-[var(--ads-button-primary-pressed)]",
  low: "bg-[var(--ads-status-warning-100)] text-[var(--ads-status-warning-800)]",
  muted: "bg-neutral-100 text-[var(--ads-text-tertiary)]",
  empty: "text-[var(--ads-text-tertiary)]",
};

/** Recuo da árvore, por profundidade. */
export const ADS_TABLE_TREE_INDENT = ["ps-0", "ps-5", "ps-10", "ps-15", "ps-20"] as const;

export const adsTableTreeIndent = (depth: number) =>
  ADS_TABLE_TREE_INDENT[Math.min(depth, ADS_TABLE_TREE_INDENT.length - 1)];
