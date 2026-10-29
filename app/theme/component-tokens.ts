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
      color("--ads-input-border", "Borda", "Cores", "#e5e8eb"),
      color("--ads-input-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-input-text", "Texto", "Cores", "#505f79"),
      color("--ads-input-focus-border", "Borda em foco", "Cores", "#0091ff"),
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
      color("--ads-search-border", "Borda", "Cores", "#e5e8eb"),
      color("--ads-search-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-search-text", "Texto", "Cores", "#505f79"),
      color("--ads-search-placeholder", "Placeholder", "Cores", "#a5adba"),
      color("--ads-search-focus-border", "Borda em foco", "Cores", "#006ff7"),
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
      length("--ads-textarea-font-size", "Fonte", "Medida", "14px"),
      length("--ads-textarea-label-size", "Fonte do rótulo", "Medida", "12px"),
      color("--ads-textarea-border", "Borda", "Cores", "#e5e8eb"),
      color("--ads-textarea-background", "Fundo", "Cores", "#ffffff"),
      color("--ads-textarea-text", "Texto", "Cores", "#505f79"),
      color("--ads-textarea-placeholder", "Placeholder", "Cores", "#a5adba"),
      color("--ads-textarea-focus-border", "Borda em foco", "Cores", "#0091ff"),
      color("--ads-textarea-error-border", "Borda de erro", "Cores", "#ff507a"),
      color("--ads-textarea-disabled-border", "Borda desabilitada", "Cores", "#e5e8eb"),
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
      color("--ads-filter-error-border", "Borda de erro", "Cores", "#ff507a"),
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
      length("--ads-tabs-height", "Altura", "Medida", "38px"),
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
      length("--ads-segmented-item-height", "Altura do item", "Medida", "29px"),
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
      color("--ads-toast-neutral-bg", "Fundo neutro", "Cores", "#f0f3f6"),
      color("--ads-toast-primary-icon", "Ícone primário", "Cores", "#006ff7"),
      color("--ads-toast-success-icon", "Ícone de sucesso", "Cores", "#0e5a3b"),
      color("--ads-toast-error-icon", "Ícone de erro", "Cores", "#840221"),
      color("--ads-toast-warning-icon", "Ícone de alerta", "Cores", "#8f6600"),
      color("--ads-toast-neutral-icon", "Ícone neutro", "Cores", "#505f79"),
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
      color("--ads-switch-off", "Desligado", "Cores", "#e5e8eb"),
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
      length("--ads-modal-title-size", "Fonte do título", "Medida", "16px"),
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
