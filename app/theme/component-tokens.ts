export type TokenKind = "color" | "length" | "weight" | "line";

export type TokenField = {
  name: string;
  label: string;
  kind: TokenKind;
  group: string;
  fallback: string;
};

export type TokenComponent = {
  id: string;
  /** Id da seção na página de tokens e no menu. */
  section: string;
  label: string;
  note?: string;
  fields: readonly TokenField[];
};

const length = (name: string, label: string, group: string, fallback: string): TokenField => ({
  name,
  label,
  kind: "length",
  group,
  fallback,
});

const color = (name: string, label: string, group: string, fallback: string): TokenField => ({
  name,
  label,
  kind: "color",
  group,
  fallback,
});

const weight = (name: string, label: string, group: string, fallback: string): TokenField => ({
  name,
  label,
  kind: "weight",
  group,
  fallback,
});

const line = (name: string, label: string, group: string, fallback: string): TokenField => ({
  name,
  label,
  kind: "line",
  group,
  fallback,
});

export const componentTokenCatalog: readonly TokenComponent[] = [
  {
    id: "button",
    section: "botao",
    label: "Botão",
    note: "Outline, unfilled e as cores de status continuam nos tokens semânticos. O tipo IA usa fundo, borda e brilho próprios; o texto é innovation 300.",
    fields: [
      length("--ads-button-radius", "Raio", "Forma", "8px"),
      weight("--ads-button-weight", "Peso", "Forma", "700"),
      length("--ads-button-sm-height", "Altura", "Tamanho SM", "32px"),
      length("--ads-button-sm-padding-x", "Padding horizontal", "Tamanho SM", "12px"),
      length("--ads-button-sm-gap", "Espaço do ícone", "Tamanho SM", "8px"),
      length("--ads-button-sm-font-size", "Fonte", "Tamanho SM", "12px"),
      line("--ads-button-sm-line-height", "Altura de linha", "Tamanho SM", "1.2"),
      length("--ads-button-sm-icon", "Ícone", "Tamanho SM", "16px"),
      length("--ads-button-sm-icon-box", "Caixa do ícone", "Tamanho SM", "32px"),
      length("--ads-button-md-padding-x", "Padding horizontal", "Tamanho MD", "16px"),
      length("--ads-button-md-padding-y", "Padding vertical", "Tamanho MD", "12px"),
      length("--ads-button-md-gap", "Espaço do ícone", "Tamanho MD", "8px"),
      length("--ads-button-md-font-size", "Fonte", "Tamanho MD", "14px"),
      line("--ads-button-md-line-height", "Altura de linha", "Tamanho MD", "1.3"),
      length("--ads-button-md-icon", "Ícone", "Tamanho MD", "18px"),
      length("--ads-button-md-icon-box", "Caixa do ícone", "Tamanho MD", "40px"),
      color("--ads-button-primary", "Fundo", "Primário preenchido", "#006ff7"),
      color("--ads-button-primary-hover", "Fundo no hover", "Primário preenchido", "#074ac6"),
      color("--ads-button-primary-pressed", "Fundo no pressed", "Primário preenchido", "#00389e"),
      color("--ads-button-primary-disabled", "Fundo desabilitado", "Primário preenchido", "#89c9ff"),
      color("--ads-button-primary-text", "Texto", "Primário preenchido", "#ffffff"),
      color("--ads-button-secondary", "Fundo", "Secundário", "#e4f2ff"),
      color("--ads-button-secondary-hover", "Fundo no hover", "Secundário", "#c7e4ff"),
      color("--ads-button-secondary-pressed", "Fundo no pressed", "Secundário", "#89c9ff"),
      color("--ads-button-secondary-disabled", "Fundo desabilitado", "Secundário", "#d3d8dd"),
      color("--ads-button-secondary-text", "Texto", "Secundário", "#006ff7"),
      color("--ads-button-secondary-disabled-text", "Texto desabilitado", "Secundário", "#ffffff"),
      color("--ads-button-ia-background", "Fundo", "IA", "#f3f0ff"),
      color("--ads-button-ia-border", "Borda", "IA", "#7358cc"),
      color("--ads-button-ia-glow", "Brilho", "IA", "#ae96ff"),
      length("--ads-button-ia-radius", "Raio", "IA", "4px"),
      length("--ads-button-ia-line-height", "Altura de linha", "IA", "24px"),
    ],
  },
  {
    id: "input",
    section: "campo",
    label: "Campo",
    note: "Vale para o AdsInput. O estado de IA continua com a cor própria.",
    fields: [
      length("--ads-input-height", "Altura", "Medida", "40px"),
      length("--ads-input-padding-x", "Padding horizontal", "Medida", "12px"),
      length("--ads-input-gap", "Espaço interno", "Medida", "8px"),
      length("--ads-input-radius", "Raio", "Medida", "8px"),
      length("--ads-input-font-size", "Fonte", "Medida", "14px"),
      length("--ads-input-label-size", "Fonte do rótulo", "Medida", "12px"),
      color("--ads-input-border", "Borda", "Cores", "#c1c7d0"),
      color("--ads-input-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-input-text", "Texto", "Cores", "#505f79"),
      color("--ads-input-focus-border", "Borda em foco", "Cores", "#0091ff"),
      color("--ads-input-hover-border", "Borda no hover", "Cores", "#006ff7"),
      color("--ads-input-error-border", "Borda de erro", "Cores", "#ff507a"),
      color("--ads-input-disabled-border", "Borda desabilitada", "Cores", "#a5adba"),
      color("--ads-input-disabled-background", "Fundo desabilitado", "Cores", "#f0f3f6"),
      color("--ads-input-disabled-text", "Texto desabilitado", "Cores", "#a5adba"),
    ],
  },
  {
    id: "number",
    section: "numero",
    label: "Número",
    fields: [
      length("--ads-number-height", "Altura", "Medida", "40px"),
      length("--ads-number-padding-x", "Padding horizontal", "Medida", "12px"),
      length("--ads-number-gap", "Espaço interno", "Medida", "8px"),
      length("--ads-number-radius", "Raio", "Medida", "8px"),
      length("--ads-number-font-size", "Fonte", "Medida", "14px"),
      length("--ads-number-label-size", "Fonte do rótulo", "Medida", "12px"),
      color("--ads-number-border", "Borda", "Cores", "#e5e8eb"),
      color("--ads-number-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-number-text", "Texto", "Cores", "#505f79"),
      color("--ads-number-focus-border", "Borda em foco", "Cores", "#0091ff"),
      color("--ads-number-hover-border", "Borda no hover", "Cores", "#006ff7"),
      color("--ads-number-error-border", "Borda de erro", "Cores", "#ff507a"),
      color("--ads-number-disabled-border", "Borda desabilitada", "Cores", "#a5adba"),
      color("--ads-number-disabled-background", "Fundo desabilitado", "Cores", "#f0f3f6"),
      color("--ads-number-disabled-text", "Texto desabilitado", "Cores", "#a5adba"),
    ],
  },
  {
    id: "search",
    section: "busca",
    label: "Busca",
    fields: [
      length("--ads-search-sm-height", "Altura SM", "Medida", "40px"),
      length("--ads-search-md-height", "Altura MD", "Medida", "45px"),
      length("--ads-search-padding-x", "Padding horizontal", "Medida", "12px"),
      length("--ads-search-radius", "Raio", "Medida", "500px"),
      length("--ads-search-sm-font-size", "Fonte SM", "Medida", "14px"),
      length("--ads-search-md-font-size", "Fonte MD", "Medida", "16px"),
      color("--ads-search-border", "Borda", "Cores", "#c1c7d0"),
      color("--ads-search-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-search-text", "Texto", "Cores", "#505f79"),
      color("--ads-search-placeholder", "Placeholder", "Cores", "#a5adba"),
      color("--ads-search-focus-border", "Borda em foco", "Cores", "#006ff7"),
      color("--ads-search-hover-border", "Borda no hover", "Cores", "#006ff7"),
      color("--ads-search-disabled-border", "Borda desabilitada", "Cores", "#a5adba"),
      color("--ads-search-disabled-background", "Fundo desabilitado", "Cores", "#f0f3f6"),
    ],
  },
  {
    id: "textarea",
    section: "texto",
    label: "Texto longo",
    fields: [
      length("--ads-textarea-min-height", "Altura mínima", "Medida", "153px"),
      length("--ads-textarea-padding", "Padding", "Medida", "12px"),
      length("--ads-textarea-radius", "Raio", "Medida", "8px"),
      length("--ads-textarea-font-size", "Fonte", "Medida", "16px"),
      length("--ads-textarea-label-size", "Fonte do rótulo", "Medida", "12px"),
      color("--ads-textarea-border", "Borda", "Cores", "#c1c7d0"),
      color("--ads-textarea-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-textarea-text", "Texto", "Cores", "#505f79"),
      color("--ads-textarea-placeholder", "Placeholder", "Cores", "#a5adba"),
      color("--ads-textarea-focus-border", "Borda em foco", "Cores", "#0091ff"),
      color("--ads-textarea-hover-border", "Borda no hover", "Cores", "#006ff7"),
      color("--ads-textarea-error-border", "Borda de erro", "Cores", "#ff507a"),
      color("--ads-textarea-disabled-border", "Borda desabilitada", "Cores", "#c1c7d0"),
      color("--ads-textarea-disabled-background", "Fundo desabilitado", "Cores", "#f0f3f6"),
    ],
  },
  {
    id: "date",
    section: "data",
    label: "Data",
    fields: [
      length("--ads-date-height", "Altura", "Medida", "40px"),
      length("--ads-date-padding-x", "Padding horizontal", "Medida", "12px"),
      length("--ads-date-radius", "Raio", "Medida", "8px"),
      length("--ads-date-font-size", "Fonte", "Fonte", "14px"),
      weight("--ads-date-weight", "Peso", "Fonte", "400"),
      line("--ads-date-line-height", "Altura de linha", "Fonte", "1.429"),
      color("--ads-date-border", "Borda", "Cores", "#cad5e2"),
      color("--ads-date-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-date-text", "Texto", "Cores", "#0f172b"),
      color("--ads-date-placeholder", "Placeholder", "Cores", "#90a1b9"),
      color("--ads-date-separator", "Separador", "Cores", "#62748e"),
      color("--ads-date-focus-border", "Borda em foco", "Cores", "#006ff7"),
      color("--ads-date-hover-border", "Borda no hover", "Cores", "#006ff7"),
      /* Mesmo azul do hover do dia no calendário (--color-ads-radar-pricing-25). O editor só aceita #rrggbb, então vai o hex. */
      color("--ads-month-hover-bg", "Fundo no hover", "Mês", "#e4f2ff"),
    ],
  },
  {
    id: "filter",
    section: "filtro",
    label: "Filtro",
    fields: [
      length("--ads-filter-height", "Altura", "Medida", "40px"),
      length("--ads-filter-padding-x", "Padding horizontal", "Medida", "12px"),
      length("--ads-filter-radius", "Raio", "Medida", "8px"),
      length("--ads-filter-font-size", "Fonte", "Medida", "14px"),
      length("--ads-filter-label-size", "Fonte do rótulo", "Medida", "12px"),
      color("--ads-filter-border", "Borda", "Cores", "#505f79"),
      color("--ads-filter-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-filter-text", "Texto", "Cores", "#505f79"),
      color("--ads-filter-focus-border", "Borda em foco", "Cores", "#006ff7"),
      color("--ads-filter-hover-border", "Borda no hover", "Cores", "#006ff7"),
      color("--ads-filter-error-border", "Borda de erro", "Cores", "#ff6783"),
      color("--ads-filter-disabled-border", "Borda desabilitada", "Cores", "#b3bac5"),
      color("--ads-filter-disabled-background", "Fundo desabilitado", "Cores", "#f0f3f6"),
      color("--ads-filter-disabled-text", "Texto desabilitado", "Cores", "#a5adba"),
    ],
  },
  {
    id: "tabs",
    section: "abas",
    label: "Abas",
    fields: [
      length("--ads-tabs-height", "Altura", "Medida", "39px"),
      length("--ads-tabs-padding-x", "Padding horizontal", "Medida", "12px"),
      length("--ads-tabs-font-size", "Fonte", "Medida", "14px"),
      length("--ads-tabs-indicator", "Indicador", "Medida", "4px"),
      weight("--ads-tabs-weight", "Peso inativo", "Medida", "500"),
      color("--ads-tabs-inactive", "Texto inativo", "Cores", "#505f79"),
      color("--ads-tabs-active", "Texto ativo", "Cores", "#061938"),
      color("--ads-tabs-indicator-color", "Indicador", "Cores", "#006ff7"),
      color("--ads-tabs-border", "Linha", "Cores", "#c1c7d0"),
    ],
  },
  {
    id: "segmented",
    section: "segmentadas",
    label: "Abas segmentadas",
    fields: [
      length("--ads-segmented-height", "Altura da trilha", "Medida", "37px"),
      length("--ads-segmented-item-height", "Altura do item", "Medida", "30px"),
      length("--ads-segmented-padding-x", "Padding horizontal", "Medida", "16px"),
      length("--ads-segmented-radius", "Raio", "Medida", "4px"),
      length("--ads-segmented-font-size", "Fonte", "Medida", "12px"),
      color("--ads-segmented-track", "Fundo da trilha", "Cores", "#f0f3f6"),
      color("--ads-segmented-active-bg", "Fundo ativo", "Cores", "#ffffff"),
      color("--ads-segmented-text", "Texto", "Cores", "#061938"),
      color("--ads-segmented-active-text", "Texto ativo", "Cores", "#000000"),
    ],
  },
  {
    id: "toast",
    section: "aviso",
    label: "Aviso",
    fields: [
      length("--ads-toast-radius", "Raio", "Medida", "8px"),
      length("--ads-toast-padding", "Padding", "Medida", "12px"),
      length("--ads-toast-gap", "Espaço", "Medida", "12px"),
      length("--ads-toast-icon", "Ícone", "Medida", "18px"),
      length("--ads-toast-font-size", "Fonte", "Medida", "14px"),
      weight("--ads-toast-weight", "Peso", "Medida", "500"),
      color("--ads-toast-text", "Texto", "Cores", "#061938"),
      color("--ads-toast-primary-bg", "Fundo primário", "Cores", "#e4f2ff"),
      color("--ads-toast-error-bg", "Fundo de erro", "Cores", "#ffbdcd"),
      color("--ads-toast-warning-bg", "Fundo de alerta", "Cores", "#ffe7b9"),
      color("--ads-toast-neutral-bg", "Fundo neutro", "Cores", "#e4f2ff"),
      color("--ads-toast-primary-icon", "Ícone primário", "Cores", "#006ff7"),
      color("--ads-toast-success-icon", "Ícone de sucesso", "Cores", "#0e5a3b"),
      color("--ads-toast-error-icon", "Ícone de erro", "Cores", "#840221"),
      color("--ads-toast-warning-icon", "Ícone de alerta", "Cores", "#8f6600"),
      color("--ads-toast-neutral-icon", "Ícone neutro", "Cores", "#505f79"),
      length("--ads-toast-status-width", "Largura", "Reporte", "331px"),
      length("--ads-toast-status-icon", "Ícone", "Reporte", "24px"),
      length("--ads-toast-status-title-size", "Fonte do título", "Reporte", "14px"),
      length("--ads-toast-status-subtitle-size", "Fonte do subtítulo", "Reporte", "10px"),
      color("--ads-toast-status-bg", "Fundo", "Reporte", "#061938"),
      color("--ads-toast-status-text", "Texto", "Reporte", "#ffffff"),
      color("--ads-toast-status-success", "Ícone de sucesso", "Reporte", "#06eb8f"),
      color("--ads-toast-status-error", "Ícone de erro", "Reporte", "#ef164a"),
      color("--ads-toast-status-warning", "Ícone de atenção", "Reporte", "#ffb905"),
      color("--ads-toast-status-loading", "Ícone de carga", "Reporte", "#49d8f4"),
    ],
  },
  {
    id: "file",
    section: "arquivo",
    label: "Arquivo",
    fields: [
      length("--ads-file-min-height", "Altura mínima", "Medida", "64px"),
      length("--ads-file-radius", "Raio", "Medida", "8px"),
      length("--ads-file-padding-x", "Padding horizontal", "Medida", "16px"),
      length("--ads-file-padding-y", "Padding vertical", "Medida", "12px"),
      length("--ads-file-title-size", "Fonte do nome", "Medida", "14px"),
      length("--ads-file-detail-size", "Fonte do detalhe", "Medida", "12px"),
      length("--ads-file-icon-box", "Caixa do ícone", "Medida", "32px"),
    ],
  },
  {
    id: "tooltip",
    section: "tooltip",
    label: "Tooltip",
    fields: [
      length("--ads-tooltip-radius", "Raio", "Medida", "12px"),
      length("--ads-tooltip-padding-x", "Padding horizontal", "Medida", "16px"),
      length("--ads-tooltip-padding-y", "Padding vertical", "Medida", "12px"),
      length("--ads-tooltip-font-size", "Fonte", "Medida", "14px"),
      color("--ads-tooltip-bg", "Fundo", "Cores", "#061938"),
      color("--ads-tooltip-text", "Texto", "Cores", "#c1c7d0"),
      color("--ads-tooltip-title", "Título", "Cores", "#ffffff"),
      length("--ads-tooltip-title-size", "Fonte do título", "Medida", "16px"),
      length("--ads-tooltip-small-font-size", "Fonte do smalltip", "Smalltip", "10px"),
      length("--ads-tooltip-small-padding", "Padding do smalltip", "Smalltip", "8px"),
      length("--ads-steptip-width", "Largura do steptip", "Steptip", "328px"),
      color("--ads-steptip-skip", "Texto pular", "Steptip", "#b3bac5"),
      length("--ads-charttip-min-width", "Largura mínima", "Charttip", "180px"),
      length("--ads-charttip-swatch", "Amostra", "Charttip", "16px"),
    ],
  },
  {
    id: "loading",
    section: "carregando",
    label: "Carregando",
    fields: [
      length("--ads-loading-radius", "Raio do skeleton", "Medida", "4px"),
      length("--ads-loading-bar", "Altura da linha", "Medida", "16px"),
      length("--ads-loading-spinner", "Spinner", "Medida", "32px"),
      length("--ads-loading-label-size", "Fonte do rótulo", "Medida", "14px"),
      color("--ads-loading-skeleton", "Skeleton", "Cores", "#e5e8eb"),
      color("--ads-loading-spinner-color", "Spinner", "Cores", "#006ff7"),
    ],
  },
  {
    id: "progress",
    section: "progresso",
    label: "Progresso",
    fields: [
      length("--ads-progress-height", "Altura", "Medida", "8px"),
      length("--ads-progress-radius", "Raio", "Medida", "500px"),
      color("--ads-progress-track", "Trilha", "Cores", "#e5e8eb"),
      color("--ads-progress-fill", "Preenchimento", "Cores", "#006ff7"),
    ],
  },
  {
    id: "badge",
    section: "badge",
    label: "Badge",
    note: "O fundo de cada cor continua na escala de status. Aqui ficam a medida e o texto.",
    fields: [
      length("--ads-badge-size", "Tamanho", "Medida", "24px"),
      length("--ads-badge-dot", "Ponto", "Medida", "8px"),
      length("--ads-badge-font-size", "Fonte", "Medida", "12px"),
      weight("--ads-badge-weight", "Peso", "Medida", "700"),
      color("--ads-badge-text", "Texto", "Cores", "#ffffff"),
    ],
  },
  {
    id: "broadcast",
    section: "broadcast",
    label: "Broadcast",
    fields: [
      length("--ads-broadcast-height", "Altura", "Medida", "24px"),
      length("--ads-broadcast-padding-x", "Padding horizontal", "Medida", "8px"),
      length("--ads-broadcast-font-size", "Fonte", "Medida", "12px"),
      length("--ads-broadcast-mark", "Marca", "Medida", "8px"),
      color("--ads-broadcast-warning-bg", "Fundo de alerta", "Cores", "#ffbdcd"),
      color("--ads-broadcast-warning", "Alerta", "Cores", "#dc0034"),
      color("--ads-broadcast-success-bg", "Fundo de sucesso", "Cores", "#c3ffe6"),
      color("--ads-broadcast-success", "Sucesso", "Cores", "#15c57e"),
    ],
  },
  {
    id: "pill",
    section: "pill",
    label: "Pill",
    note: "Os outros status continuam no mapa de cor da pill. O editor muda a medida e o primário.",
    fields: [
      length("--ads-pill-height", "Altura", "Medida", "24px"),
      length("--ads-pill-min-width", "Largura mínima", "Medida", "100px"),
      length("--ads-pill-padding-x", "Padding horizontal", "Medida", "8px"),
      length("--ads-pill-font-size", "Fonte", "Medida", "12px"),
      weight("--ads-pill-weight", "Peso", "Medida", "700"),
      color("--ads-pill-primary-bg", "Fundo primário", "Cores", "#006ff7"),
      color("--ads-pill-primary-text", "Texto primário", "Cores", "#ffffff"),
    ],
  },
  {
    id: "notability",
    section: "notabilidade",
    label: "Notabilidade",
    note: "As cores seguem o status. Aqui ficam a medida e o tipo.",
    fields: [
      length("--ads-notability-height", "Altura", "Medida", "24px"),
      length("--ads-notability-min-width", "Largura mínima", "Medida", "100px"),
      length("--ads-notability-padding-x", "Padding horizontal", "Medida", "8px"),
      length("--ads-notability-font-size", "Fonte", "Medida", "12px"),
      weight("--ads-notability-weight", "Peso", "Medida", "700"),
    ],
  },
  {
    id: "mini",
    section: "mini",
    label: "Mini pill",
    fields: [
      length("--ads-mini-height", "Altura", "Medida", "18px"),
      length("--ads-mini-padding-x", "Padding horizontal", "Medida", "8px"),
      length("--ads-mini-font-size", "Fonte", "Medida", "10px"),
      weight("--ads-mini-weight", "Peso", "Medida", "700"),
      color("--ads-mini-idle-bg", "Fundo não iniciado", "Cores", "#d1d9ed"),
      color("--ads-mini-idle-text", "Texto não iniciado", "Cores", "#18224b"),
      color("--ads-mini-paused-bg", "Fundo pausado", "Cores", "#ffe7b9"),
      color("--ads-mini-paused-text", "Texto pausado", "Cores", "#8f6600"),
      color("--ads-mini-new-bg", "Fundo novo", "Cores", "#79e9ff"),
      color("--ads-mini-new-text", "Texto novo", "Cores", "#006478"),
    ],
  },
  {
    id: "switch",
    section: "switch",
    label: "Switch",
    fields: [
      length("--ads-switch-width", "Largura", "Medida", "32px"),
      length("--ads-switch-height", "Altura", "Medida", "18px"),
      length("--ads-switch-thumb", "Botão", "Medida", "12px"),
      length("--ads-switch-inset", "Respiro", "Medida", "3px"),
      length("--ads-switch-radius", "Raio", "Medida", "9px"),
      length("--ads-switch-label-size", "Fonte do rótulo", "Medida", "14px"),
      length("--ads-switch-gap", "Espaço", "Medida", "8px"),
      color("--ads-switch-off", "Desligado", "Cores", "#c1c7d0"),
      color("--ads-switch-on", "Ligado", "Cores", "#006ff7"),
      color("--ads-switch-disabled", "Desabilitado", "Cores", "#e5e8eb"),
      color("--ads-switch-disabled-on", "Ligado desabilitado", "Cores", "#89c9ff"),
      color("--ads-switch-thumb-color", "Botão", "Cores", "#ffffff"),
      color("--ads-switch-label", "Rótulo", "Cores", "#505f79"),
    ],
  },
  {
    id: "checkbox",
    section: "checkbox",
    label: "Checkbox",
    fields: [
      length("--ads-checkbox-size", "Tamanho", "Medida", "16px"),
      length("--ads-checkbox-radius", "Raio", "Medida", "4px"),
      length("--ads-checkbox-border-width", "Borda", "Medida", "2px"),
      length("--ads-checkbox-label-size", "Fonte do rótulo", "Medida", "14px"),
      length("--ads-checkbox-gap", "Espaço", "Medida", "8px"),
      color("--ads-checkbox-border", "Borda", "Cores", "#006ff7"),
      color("--ads-checkbox-checked", "Marcado", "Cores", "#006ff7"),
      color("--ads-checkbox-disabled", "Desabilitado", "Cores", "#89c9ff"),
      color("--ads-checkbox-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-checkbox-label", "Rótulo", "Cores", "#505f79"),
    ],
  },
  {
    id: "radio",
    section: "radio",
    label: "Radio",
    fields: [
      length("--ads-radio-size", "Tamanho", "Medida", "16px"),
      length("--ads-radio-dot", "Miolo", "Medida", "8px"),
      length("--ads-radio-border-width", "Borda", "Medida", "2px"),
      length("--ads-radio-label-size", "Fonte do rótulo", "Medida", "14px"),
      length("--ads-radio-gap", "Espaço", "Medida", "8px"),
      color("--ads-radio-border", "Borda", "Cores", "#006ff7"),
      color("--ads-radio-disabled", "Desabilitado", "Cores", "#89c9ff"),
      color("--ads-radio-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-radio-dot-color", "Miolo", "Cores", "#ffffff"),
      color("--ads-radio-label", "Rótulo", "Cores", "#505f79"),
    ],
  },
  {
    id: "modal",
    section: "modal",
    label: "Modal",
    fields: [
      length("--ads-modal-radius", "Raio", "Medida", "8px"),
      length("--ads-modal-padding", "Padding", "Medida", "24px"),
      length("--ads-modal-title-size", "Fonte do título", "Medida", "20px"),
      length("--ads-modal-body-size", "Fonte do texto", "Medida", "14px"),
      color("--ads-modal-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-modal-border", "Borda", "Cores", "#c1c7d0"),
      color("--ads-modal-title", "Título", "Cores", "#061938"),
      color("--ads-modal-body", "Texto", "Cores", "#505f79"),
    ],
  },
  {
    id: "feature",
    section: "feature",
    label: "Feature card",
    fields: [
      length("--ads-feature-width", "Largura", "Medida", "396px"),
      length("--ads-feature-radius", "Raio", "Medida", "12px"),
      length("--ads-feature-padding", "Padding", "Medida", "16px"),
      length("--ads-feature-gap", "Espaço", "Medida", "16px"),
      length("--ads-feature-icon-box", "Caixa do ícone", "Medida", "48px"),
      length("--ads-feature-title-size", "Fonte do título", "Medida", "16px"),
      length("--ads-feature-body-size", "Fonte do texto", "Medida", "14px"),
      color("--ads-feature-border", "Borda", "Cores", "#e5e8eb"),
      color("--ads-feature-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-feature-hover-border", "Borda no hover", "Cores", "#006ff7"),
      color("--ads-feature-title", "Título", "Cores", "#061938"),
      color("--ads-feature-body", "Texto", "Cores", "#505f79"),
    ],
  },
  {
    id: "card",
    section: "card",
    label: "Card",
    fields: [
      length("--ads-card-padding", "Padding", "Medida", "16px"),
      length("--ads-card-radius", "Raio", "Medida", "12px"),
      length("--ads-card-radius-sm", "Raio pequeno", "Medida", "8px"),
      length("--ads-card-body-size", "Fonte do texto", "Medida", "14px"),
      color("--ads-card-border", "Borda", "Cores", "#e5e8eb"),
      color("--ads-card-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-card-selected-border", "Borda selecionada", "Cores", "#c1c7d0"),
      color("--ads-card-selected-background", "Fundo selecionado", "Cores", "#f0f3f6"),
      color("--ads-card-title", "Título", "Cores", "#061938"),
      color("--ads-card-body", "Texto", "Cores", "#505f79"),
    ],
  },
  {
    id: "metric",
    section: "metric",
    label: "Métrica",
    fields: [
      length("--ads-metric-padding", "Padding", "Medida", "16px"),
      length("--ads-metric-radius", "Raio", "Medida", "12px"),
      length("--ads-metric-gap", "Espaço", "Medida", "8px"),
      length("--ads-metric-label-size", "Fonte do rótulo", "Medida", "14px"),
      length("--ads-metric-value-size", "Fonte do valor", "Medida", "20px"),
      length("--ads-metric-caption-size", "Fonte da legenda", "Medida", "12px"),
      color("--ads-metric-border", "Borda", "Cores", "#e5e8eb"),
      color("--ads-metric-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-metric-label", "Rótulo", "Cores", "#505f79"),
      color("--ads-metric-value", "Valor", "Cores", "#061938"),
    ],
  },
  {
    id: "menu",
    section: "menu",
    label: "Menu bar",
    fields: [
      length("--ads-menu-width", "Largura", "Medida", "100px"),
      length("--ads-menu-padding-y", "Padding vertical", "Medida", "16px"),
      length("--ads-menu-gap", "Espaço", "Medida", "16px"),
      length("--ads-menu-icon", "Ícone", "Medida", "18px"),
      length("--ads-menu-icon-box", "Caixa do ícone", "Medida", "40px"),
      length("--ads-menu-label-size", "Fonte", "Medida", "12px"),
      color("--ads-menu-divider", "Divisor", "Cores", "#e5e8eb"),
    ],
  },
  {
    id: "navbar-app",
    section: "navbar-app",
    label: "Navbar app",
    fields: [
      length("--ads-navbar-app-height", "Altura", "Medida", "88px"),
      length("--ads-navbar-app-gap", "Espaço", "Medida", "33px"),
      length("--ads-navbar-app-item-width", "Largura do item", "Medida", "39px"),
      length("--ads-navbar-app-well", "Caixa do ícone", "Medida", "28px"),
      length("--ads-navbar-app-font-size", "Fonte", "Medida", "10px"),
      color("--ads-navbar-app-active", "Ativo", "Cores", "#344563"),
    ],
  },
  {
    id: "navbar-desk",
    section: "navbar-desk",
    label: "Navbar desk",
    fields: [
      length("--ads-navbar-desk-height", "Altura", "Medida", "64px"),
      length("--ads-navbar-desk-padding-x", "Padding horizontal", "Medida", "44px"),
      length("--ads-navbar-desk-action", "Botão", "Medida", "40px"),
      length("--ads-navbar-desk-avatar", "Avatar", "Medida", "32px"),
      color("--ads-navbar-desk-border", "Borda", "Cores", "#d3d8dd"),
    ],
  },
  {
    id: "side",
    section: "menu-lateral",
    label: "Menu lateral",
    fields: [
      length("--ads-side-width", "Largura", "Medida", "224px"),
      length("--ads-side-row-height", "Altura da linha", "Medida", "48px"),
      length("--ads-side-badge", "Badge", "Medida", "8px"),
      color("--ads-side-border", "Borda", "Cores", "#c1c7d0"),
      color("--ads-side-open-bg", "Mãe aberta", "Cores", "#e5e8eb"),
      color("--ads-side-child-bg", "Filho", "Cores", "#f0f3f6"),
    ],
  },
  {
    id: "footer",
    section: "footer",
    label: "Footer",
    fields: [
      length("--ads-footer-min-height", "Altura mínima", "Medida", "32px"),
      length("--ads-footer-logo-height", "Logo", "Medida", "12px"),
      color("--ads-footer-text", "Texto", "Cores", "#7a869a"),
    ],
  },
  {
    id: "product-tag",
    section: "product-tag",
    label: "Tag de produto",
    fields: [
      length("--ads-product-tag-height", "Altura", "Medida", "16px"),
      length("--ads-product-tag-font-size", "Fonte", "Medida", "11px"),
    ],
  },
  {
    id: "button-group",
    section: "grupo",
    label: "Grupo de botões",
    fields: [
      length("--ads-button-group-height", "Altura", "Medida", "30px"),
      length("--ads-button-group-font-size", "Fonte", "Medida", "12px"),
      color("--ads-button-group-border", "Borda", "Cores", "#c1c7d0"),
      color("--ads-button-group-selected", "Selecionado", "Cores", "#e5e8eb"),
    ],
  },
  {
    id: "button-menu",
    section: "menu-botao",
    label: "Menu do botão",
    fields: [
      length("--ads-button-menu-width", "Largura", "Medida", "264px"),
      length("--ads-button-menu-title-size", "Fonte do título", "Medida", "16px"),
      length("--ads-button-menu-subtitle-size", "Fonte do subtítulo", "Medida", "12px"),
      color("--ads-button-menu-title", "Título", "Cores", "#42526e"),
      color("--ads-button-menu-subtitle", "Subtítulo", "Cores", "#5e6c84"),
      color("--ads-button-menu-border", "Borda", "Cores", "#c1c7d0"),
    ],
  },
  {
    id: "list",
    section: "lista",
    label: "Lista",
    fields: [length("--ads-list-min-width", "Largura mínima", "Medida", "260px")],
  },
  {
    id: "pagination",
    section: "paginacao",
    label: "Paginação",
    fields: [
      length("--ads-pagination-cell", "Célula", "Medida", "24px"),
      length("--ads-pagination-gap", "Espaço", "Medida", "12px"),
      length("--ads-pagination-number-gap", "Espaço dos números", "Medida", "4px"),
      color("--ads-pagination-selected", "Selecionada", "Cores", "#006ff7"),
      color("--ads-pagination-number", "Número", "Cores", "#344563"),
    ],
  },
  {
    id: "empty",
    section: "vazio",
    label: "Empty state",
    fields: [
      length("--ads-empty-icon", "Ícone", "Medida", "90px"),
      length("--ads-empty-icon-sm", "Ícone pequeno", "Medida", "60px"),
      length("--ads-empty-title-size", "Fonte do título", "Medida", "18px"),
      length("--ads-empty-title-size-sm", "Fonte do título pequeno", "Medida", "16px"),
      length("--ads-empty-subtitle-size", "Fonte do apoio", "Medida", "12px"),
      length("--ads-empty-gap", "Espaço", "Medida", "24px"),
      length("--ads-empty-gap-sm", "Espaço pequeno", "Medida", "32px"),
      length("--ads-empty-text-gap", "Espaço do texto", "Medida", "32px"),
      color("--ads-empty-icon-color", "Ícone", "Cores", "#c1c7d0"),
    ],
  },
  {
    id: "funcional",
    section: "funcional",
    label: "Funcional",
    note: "Cores do arquivo de componentes sem degrau na escala publicada. O badge do menu lateral usa opportunity 200. A borda de erro do filtro repete warning 200.",
    fields: [
      color("--ads-funcional-warning-200", "Warning 200", "Cores", "#ff6783"),
      color("--ads-funcional-opportunity-200", "Opportunity 200", "Cores", "#0ebbda"),
    ],
  },
  {
    id: "farmarcas",
    section: "farmarcas",
    label: "Farmarcas",
    note: "Cada departamento tem fundo e texto. Não há token semântico equivalente.",
    fields: [
      length("--ads-farmarcas-height", "Altura", "Medida", "24px"),
      length("--ads-farmarcas-min-width", "Largura mínima", "Medida", "100px"),
      length("--ads-farmarcas-font-size", "Fonte", "Medida", "12px"),
      color("--ads-farmarcas-expansao-bg", "Fundo", "Expansão", "#d8bbd8"),
      color("--ads-farmarcas-expansao-text", "Texto", "Expansão", "#700e84"),
      color("--ads-farmarcas-eventos-bg", "Fundo", "Eventos", "#fce083"),
      color("--ads-farmarcas-eventos-text", "Texto", "Eventos", "#bb6a00"),
      color("--ads-farmarcas-adm-digital-bg", "Fundo", "ADM digital", "#eef2c1"),
      color("--ads-farmarcas-adm-digital-text", "Texto", "ADM digital", "#555931"),
      color("--ads-farmarcas-sucesso-bg", "Fundo", "Sucesso", "#e4f3c1"),
      color("--ads-farmarcas-sucesso-text", "Texto", "Sucesso", "#6b7300"),
      color("--ads-farmarcas-trade-bg", "Fundo", "Trade", "#b3cfe4"),
      color("--ads-farmarcas-trade-text", "Texto", "Trade", "#194464"),
      color("--ads-farmarcas-dev-bg", "Fundo", "Dev", "#ffbbe4"),
      color("--ads-farmarcas-dev-text", "Texto", "Dev", "#8b2d65"),
      color("--ads-farmarcas-ti-bg", "Fundo", "TI", "#d2c5ee"),
      color("--ads-farmarcas-ti-text", "Texto", "TI", "#2b209c"),
      color("--ads-farmarcas-padronizacao-bg", "Fundo", "Padronização", "#c4cdea"),
      color("--ads-farmarcas-padronizacao-text", "Texto", "Padronização", "#062c80"),
      color("--ads-farmarcas-diretoria-bg", "Fundo", "Diretoria", "#c9c9c9"),
      color("--ads-farmarcas-diretoria-text", "Texto", "Diretoria", "#000000"),
      color("--ads-farmarcas-comercial-bg", "Fundo", "Comercial", "#c0c7d9"),
      color("--ads-farmarcas-comercial-text", "Texto", "Comercial", "#18224b"),
      color("--ads-farmarcas-inovacao-bg", "Fundo", "Inovação", "#b6bdff"),
      color("--ads-farmarcas-inovacao-text", "Texto", "Inovação", "#393f73"),
      color("--ads-farmarcas-patrimonio-bg", "Fundo", "Patrimônio", "#d9b6c5"),
      color("--ads-farmarcas-patrimonio-text", "Texto", "Patrimônio", "#7f3454"),
      color("--ads-farmarcas-presidencia-bg", "Fundo", "Presidência", "#c9c9c9"),
      color("--ads-farmarcas-presidencia-text", "Texto", "Presidência", "#000000"),
      color("--ads-farmarcas-marketing-bg", "Fundo", "Marketing", "#b2e9e8"),
      color("--ads-farmarcas-marketing-text", "Texto", "Marketing", "#1b5955"),
      color("--ads-farmarcas-gg-bg", "Fundo", "G&G", "#ffdfb5"),
      color("--ads-farmarcas-gg-text", "Texto", "G&G", "#e0521f"),
      color("--ads-farmarcas-bi-bg", "Fundo", "BI", "#f8c09f"),
      color("--ads-farmarcas-bi-text", "Texto", "BI", "#4e1400"),
      color("--ads-farmarcas-financeiro-bg", "Fundo", "Financeiro", "#c5ddc3"),
      color("--ads-farmarcas-financeiro-text", "Texto", "Financeiro", "#05750a"),
      color("--ads-farmarcas-juridico-bg", "Fundo", "Jurídico", "#d9d8c0"),
      color("--ads-farmarcas-juridico-text", "Texto", "Jurídico", "#464535"),
      color("--ads-farmarcas-capacitacao-bg", "Fundo", "Capacitação", "#e5c1fe"),
      color("--ads-farmarcas-capacitacao-text", "Texto", "Capacitação", "#360ea7"),
      color("--ads-farmarcas-produto-bg", "Fundo", "produto", "#f0ed9a"),
      color("--ads-farmarcas-produto-text", "Texto", "produto", "#655200"),
    ],
  },
];

export const allTokenFields = () => componentTokenCatalog.flatMap((component) => component.fields);

export const componentTokenDefaults = (): Record<string, string> =>
  Object.fromEntries(allTokenFields().map((field) => [field.name, field.fallback]));

export const tokenGroups = (component: TokenComponent) => {
  const groups: { label: string; fields: TokenField[] }[] = [];
  for (const field of component.fields) {
    const current = groups.find((group) => group.label === field.group);
    if (current) current.fields.push(field);
    else groups.push({ label: field.group, fields: [field] });
  }
  return groups;
};

const lengthPattern = /^(?:\d{1,4})(?:\.\d+)?(?:px|rem)$/;
const colorPattern = /^#[0-9a-f]{6}$/;
const weightPattern = /^(?:300|400|500|700|800)$/;

export const tokenValueValid = (kind: TokenKind, value: string) => {
  if (kind === "color") return colorPattern.test(value);
  if (kind === "length") return lengthPattern.test(value);
  if (kind === "weight") return weightPattern.test(value);
  if (!/^\d(?:\.\d{1,3})?$/.test(value)) return false;
  const line = Number(value);
  return line >= 1 && line <= 2;
};

const normalizeValue = (field: TokenField, value: string) =>
  field.kind === "color" ? value.toLowerCase() : value;

export const normalizeStoredTokens = (input: unknown): Record<string, string> => {
  const tokens = componentTokenDefaults();
  if (!input || typeof input !== "object" || Array.isArray(input)) return tokens;
  const record = input as Record<string, unknown>;
  for (const field of allTokenFields()) {
    const value = record[field.name];
    if (typeof value !== "string") continue;
    const normalized = normalizeValue(field, value.trim());
    if (tokenValueValid(field.kind, normalized)) tokens[field.name] = normalized;
  }
  return tokens;
};

export const assertComponentTokens = (input: unknown): Record<string, string> => {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("O corpo precisa ser o mapa de tokens.");
  }
  const record = input as Record<string, unknown>;
  const tokens: Record<string, string> = {};
  const invalid: string[] = [];
  for (const field of allTokenFields()) {
    const value = record[field.name];
    if (typeof value !== "string") {
      invalid.push(field.label);
      continue;
    }
    const normalized = normalizeValue(field, value.trim());
    if (!tokenValueValid(field.kind, normalized)) {
      invalid.push(field.label);
      continue;
    }
    tokens[field.name] = normalized;
  }
  if (invalid.length) {
    throw new Error(`Valores inválidos: ${invalid.join(", ")}.`);
  }
  return tokens;
};

export const componentTokensCss = (tokens: Record<string, string>) => {
  const lines = allTokenFields().map((field) => `  ${field.name}: ${tokens[field.name]};`);
  return [
    "/* Gerado pela tela /design-system/tokens. Fonte: app/theme/component-tokens.json */",
    ":root {",
    ...lines,
    "}",
    "",
  ].join("\n");
};

export const PREVIEW_STYLE_ID = "ads-component-token-preview";
