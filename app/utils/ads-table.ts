/**
 * Padrão visual das tabelas ADS sobre o UTable.
 *
 * Figma: cabeçalho com fundo neutrals/light/20 (#F0F3F6), borda neutrals/light/40 (#D3D8DD),
 * texto Body 14 Bold em text/secondary. Linhas de 64px.
 * Borda das células: borders/subtle (#E5E8EB, via --ads-border-subtle).
 * Raio: radius-md (12px). Dentro de AdsCard, framed false.
 *
 * Variantes documentadas no Figma:
 *   - **Table** (operacional): cabeçalho fixo × colunas fixas, 9 tipos de célula.
 *   - **Heavy Table** (financeira): cabeçalho em dois níveis, grupos em accordion.
 *
 * Variantes Lista/Grade continuam funcionar mas não são o foco da documentação.
 */

import { twMerge } from "tailwind-merge";

/** 14px, entrelinha de leitura. Igual no cabeçalho e na célula. */
export const ADS_TABLE_CELL_TEXT =
  "text-[length:var(--ads-font-size-xxs)] leading-[var(--ads-line-height-md)]";

/**
 * Cabeçalho: mesmo 14px em negrito — Figma: Body 14 Bold.
 */
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
  /** Cabeçalho fixo ganha a sombra que o separa das linhas que rolam por baixo. */
  stickyHeader?: boolean;
  /** Linha de 1px na borda da coluna fixa. A Heavy Table desenha a sua por divisória de período. */
  pinnedEdge?: boolean;
}

/**
 * Junta o ajuste do consumidor ao padrão. A classe do consumidor vence quando as duas
 * definem a mesma propriedade: sem isso, `max-h` e `overflow` do padrão anulam os dele.
 */
export const mergeAdsTableUi = (
  base: AdsTableUi,
  override?: Partial<AdsTableUi>,
): AdsTableUi => {
  if (!override) return base;
  const merged = { ...base };
  for (const key of Object.keys(override) as (keyof AdsTableUi)[]) {
    merged[key] = twMerge(base[key], override[key] ?? "");
  }
  return merged;
};

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

/** md segue o Figma: cabeçalho de 48px e linha de 64px. sm é a grade compacta. */
const CELL_SIZE: Record<AdsTableDensity, { th: string; td: string }> = {
  md: { th: "h-12 px-4 py-2", td: "h-16 px-4 py-2" },
  sm: { th: "px-3 py-2", td: "px-3 py-2" },
};

/** Altura e respiro da célula, para o skeleton ocupar o mesmo espaço da linha de dados. */
export const adsTableCellSize = (density: AdsTableDensity) => CELL_SIZE[density].td;

const GRID_BORDER = "border-r border-[var(--ads-border-subtle)] last:border-r-0";

/** No thead inteiro: em cada th a sombra vazaria para os lados e riscaria as colunas. */
const STICKY_HEADER_SHADOW = "drop-shadow-[0_2px_3px_rgb(6_25_56/8%)]";

/** Faixa de 8px ao lado da coluna fixa, por cima da coluna que rola. */
const PIN_FADE = [
  "data-[pinned=left]:after:pointer-events-none data-[pinned=left]:after:absolute data-[pinned=left]:after:top-0 data-[pinned=left]:after:-bottom-px data-[pinned=left]:after:left-full data-[pinned=left]:after:w-2 data-[pinned=left]:after:bg-linear-to-r data-[pinned=left]:after:from-[rgb(6_25_56/10%)] data-[pinned=left]:after:to-[rgb(6_25_56/0%)]",
  "data-[pinned=right]:after:pointer-events-none data-[pinned=right]:after:absolute data-[pinned=right]:after:top-0 data-[pinned=right]:after:-bottom-px data-[pinned=right]:after:right-full data-[pinned=right]:after:w-2 data-[pinned=right]:after:bg-linear-to-r data-[pinned=right]:after:from-[rgb(6_25_56/0%)] data-[pinned=right]:after:to-[rgb(6_25_56/10%)]",
].join(" ");

export const buildAdsTableUi = ({
  density = "md",
  striped = false,
  framed = true,
  borders = "lines",
  depth = false,
  stickyHeader = false,
  pinnedEdge: showPinnedEdge = true,
}: AdsTableLook = {}): AdsTableUi => {
  const size = CELL_SIZE[density];
  const grid = borders === "grid" ? GRID_BORDER : "";
  // Na grade a borda da direita já fecha a coluna fixa da esquerda; a da direita desenha a sua
  // por fora, em cima da borda da vizinha, para não somar 2px.
  const gridPinnedEdge = "data-[pinned=right]:shadow-[-1px_0_0_var(--ads-border-subtle)]";
  const linesPinnedEdge = "data-[pinned=left]:border-r data-[pinned=right]:border-l";
  const pinnedEdge = !showPinnedEdge ? "" : borders === "grid" ? gridPinnedEdge : linesPinnedEdge;

  return {
    root: [
      "relative overflow-auto bg-[var(--ads-surface-card)]",
      // O cabeçalho gruda na rolagem da própria tabela: sem altura máxima ela não rola e o
      // cabeçalho sai junto com a página. Uma classe max-h do consumidor sobrescreve esta.
      stickyHeader ? "max-h-[70vh]" : "",
      "[scrollbar-color:var(--ads-border-subtle)_transparent] [scrollbar-width:thin]",
      framed ? "rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)]" : "",
    ].join(" "),
    base: "min-w-full border-separate border-spacing-0",
    thead: `z-[2] bg-neutral-100 backdrop-blur-none ${stickyHeader ? STICKY_HEADER_SHADOW : ""}`.trim(),
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
      "z-[2] bg-[var(--ads-surface-main)] backdrop-blur-none [&>tr[data-slot=tr]~tr[data-slot=tr]]:hidden",
      "[&_th]:border-t [&_th]:border-b-0 [&_th]:border-[var(--ads-border-subtle)] [&_th]:text-[var(--ads-text-primary)]",
      "[&_td]:border-t [&_td]:border-b-0 [&_td]:border-[var(--ads-border-subtle)]",
    ].join(" "),
    tr: "",
    th: [
      size.th,
      "border-b bg-neutral-100 text-left align-middle whitespace-normal text-[var(--ads-text-secondary)] has-data-cell-fill:!h-px has-data-cell-fill:!p-0",
      grid,
      // Depois da grade: o cabeçalho tem borda mais forte que a das células.
      "border-[var(--color-ads-neutro-claro-40)]",
      ADS_TABLE_HEADER_TEXT,
      "[&[colspan]]:text-center [&[colspan]]:text-[var(--ads-text-primary)]",
      "data-[pinned=left]:z-[3] data-[pinned=right]:z-[3]",
      pinnedEdge,
      PIN_FADE,
    ].join(" "),
    td: [
      size.td,
      "border-b border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] align-middle whitespace-normal text-[var(--ads-text-primary)] transition-colors duration-150 ease-out has-data-cell-fill:!h-px has-data-cell-fill:!p-0",
      grid,
      ADS_TABLE_CELL_TEXT,
      pinnedEdge,
      PIN_FADE,
    ].join(" "),
    separator: "hidden",
    empty: `py-10 text-center text-[var(--ads-text-secondary)] ${ADS_TABLE_CELL_TEXT}`,
    // Sem respiro: o conteúdo de carregamento encosta no cabeçalho, como as linhas de dados.
    loading: "p-0 text-center",
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
  /** Texto longo que trunca com AdsTooltip. */
  truncate: { class: { td: "max-w-72 truncate" } },
} as const;

type AdsTableColumnMeta = { class?: { th?: string; td?: string } };

const PIN_WIDTH_CLASS = {
  48: "min-w-12",
  96: "min-w-24",
  120: "min-w-30",
  160: "min-w-40",
  256: "min-w-64",
  360: "min-w-90",
  380: "min-w-95",
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

/**
 * Tom do risco de 2px nos grupos de colunas.
 * - brand: azul primário
 * - success: verde
 * - ai: roxo (tokens de IA: --ads-text-ai, adicionado pelo agente de tokens)
 * - neutral: sem decoração
 */
export type AdsTableGroupTone = "brand" | "success" | "ai" | "neutral";

const GROUP_UNDERLINE: Record<AdsTableGroupTone, string> = {
  brand: "border-b-2 border-b-[var(--ads-button-primary)]",
  success: "border-b-2 border-b-[var(--ads-status-success-500)]",
  // ai usa o token de texto de IA (--ads-text-ai).
  ai: "border-b-2 border-b-[var(--ads-text-ai)]",
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

// ─── Heavy Table ────────────────────────────────────────────────────────────

/**
 * 9 tipos de célula do `_Table Cell` do Figma.
 * Usados para documentação e para tipar a prop `type` em definições de coluna.
 */
export type AdsTableCellType =
  | "text"
  | "icon-text"
  | "pill"
  | "button"
  | "link"
  | "meta"
  | "actions"
  | "combined"
  | "progress";

/** O que AdsTableHeaderCell e AdsHeavyHeaderCell usam da coluna do TanStack. */
export type AdsTableHeaderColumn = {
  getCanSort: () => boolean;
  getIsSorted: () => false | "asc" | "desc";
  toggleSorting: () => void;
  getCanPin: () => boolean;
  getIsPinned: () => false | "left" | "right";
  pin: (position: false | "left" | "right") => void;
};

/**
 * Atributos para marcar uma linha de grupo na Heavy Table, em qualquer elemento da linha.
 * Permite o CSS `[&>tr:has([data-heavy-group])>td]` estilizar a linha inteira.
 * O AdsHeavyAccountCell já aplica esta marca.
 *
 * @example
 * ```vue
 * <template #name-cell="{ row }">
 *   <span v-bind="row.subRows.length ? adsHeavyGroupTdAttrs() : {}">
 *     {{ row.original.name }}
 *   </span>
 * </template>
 * ```
 */
export const adsHeavyGroupTdAttrs = () => ({ "data-heavy-group": "" } as const);

/** Classe do conteúdo textual de uma linha de grupo (name-cell). */
export const adsHeavyGroupContentClass =
  "font-bold text-[var(--ads-text-primary)] flex items-center gap-3";

/**
 * Tom do `_Fin Value Cell`: favorável (success-800), desfavorável (warning-500) ou projeção
 * de mês futuro (success-800). Zero e nulo ficam no tom neutro.
 * `inverted` é para despesas e impostos, onde alta é desfavorável.
 * O peso vem da linha: negrito no grupo, regular nos itens.
 */
export const adsHeavyVariationClass = (
  value: number | null | undefined,
  options?: { projected?: boolean; inverted?: boolean },
): string => {
  if (options?.projected) return "tabular-nums text-[var(--ads-status-success-800)]";
  if (value == null || value === 0) return "tabular-nums text-[var(--ads-text-primary)]";
  const favorable = options?.inverted ? value < 0 : value > 0;
  return favorable
    ? "tabular-nums text-[var(--ads-status-success-800)]"
    : "tabular-nums text-[var(--ads-status-warning-500)]";
};

/**
 * Colunas da Heavy Table, com as larguras do Figma. O `size` acompanha a largura para a
 * coluna fixa deslocar certo. A divisória só fecha período, não separa toda célula.
 */
export const adsHeavyColumn = {
  /** Grupo do cabeçalho (o período). */
  period: { meta: { class: { th: GRID_BORDER } } },
  /** Previsto e Realizado. */
  value: { size: 120, meta: { class: { th: "min-w-30", td: "min-w-30 text-right tabular-nums" } } },
  /** Última subcoluna do período (Var.). */
  valueEnd: {
    size: 96,
    meta: {
      class: {
        th: `min-w-24 ${GRID_BORDER}`,
        td: `min-w-24 text-right tabular-nums ${GRID_BORDER}`,
      },
    },
  },
  /** Período de mês futuro, só com Previsto. */
  projected: {
    size: 136,
    meta: {
      class: {
        th: `min-w-34 ${GRID_BORDER}`,
        td: `min-w-34 text-right tabular-nums ${GRID_BORDER}`,
      },
    },
  },
} as const;

/**
 * Primeira coluna (Descrição de Contas). No Figma o título ocupa as duas linhas do cabeçalho:
 * o TanStack não dá rowspan para coluna sem grupo, então a célula vazia de cima perde a borda
 * e o título sobe meia linha. Use com AdsHeavyAccountCell e AdsHeavyHeaderCell.
 */
export const adsHeavyAccountColumn = (width: AdsTablePinWidth = 360) => ({
  size: width,
  meta: {
    class: {
      th: (header: { isPlaceholder: boolean }) =>
        `${PIN_WIDTH_CLASS[width]} ${GRID_BORDER} ${header.isPlaceholder ? "border-b-0" : "[&>*]:-translate-y-6"}`,
      td: `${PIN_WIDTH_CLASS[width]} ${GRID_BORDER} p-0`,
    },
  },
});

/** md segue o Figma: cabeçalho 48px por nível e linha 56px + 1px de borda. */
const HEAVY_CELL: Record<AdsTableDensity, { th: string; td: string }> = {
  md: { th: "h-12 py-0", td: "h-[57px] py-0 ps-3 pe-4" },
  sm: { th: "", td: "" },
};

/** Altura e respiro da célula da Heavy Table, para o skeleton. */
export const adsHeavyCellSize = (density: AdsTableDensity) =>
  HEAVY_CELL[density].td || adsTableCellSize(density);

/**
 * UI da Heavy Table sobre a casca da AdsTable. Cabeçalho branco e centralizado, sombra level 1
 * na moldura, grupo em azul e negrito, itens alternando branco e surface-main.
 * As marcas `data-heavy-group` e `data-heavy-zebra` vêm do AdsHeavyAccountCell.
 */
export const buildAdsHeavyTableUi = (look: AdsTableLook = {}): AdsTableUi => {
  const { density = "md", framed = true } = look;
  const base = buildAdsTableUi({ ...look, striped: false, depth: false, pinnedEdge: false });
  const rows = [
    "[&>tr:has([data-heavy-zebra])>td]:bg-[var(--ads-surface-main)]",
    "[&>tr:has([data-heavy-group])>td]:bg-[var(--ads-button-secondary)]",
    "[&>tr:has([data-heavy-group])>td]:font-bold",
  ].join(" ");
  return {
    ...base,
    root: `${base.root} ${framed ? "shadow-[var(--ads-shadow-level-1)]" : ""}`.trim(),
    thead: `${base.thead} bg-[var(--ads-surface-card)]`,
    tbody: `${base.tbody} ${rows}`,
    th: [
      base.th,
      HEAVY_CELL[density].th,
      "border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] text-center font-medium",
    ].join(" "),
    td: [base.td, HEAVY_CELL[density].td].join(" "),
  };
};
