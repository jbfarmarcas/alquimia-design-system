import {
  adsAttention,
  adsNeutralDark,
  adsNeutralLight,
  adsNeutralMid,
  adsOpportunity,
  adsRadarPricing,
  adsSuccess,
  adsWarningRed,
} from "./ads-tokens";

/**
 * Escalas semânticas do Nuxt UI preenchidas só com hex da página de tokens.
 * Degrau ausente repete o extremo oficial da escala (julgamento Jev).
 */
export const adsPalette = {
  /** Radar Pricing: RP-25 … RP-800. 700+ repetem RP-800. */
  primary: {
    50: adsRadarPricing[25],
    100: adsRadarPricing[50],
    200: adsRadarPricing[100],
    300: adsRadarPricing[200],
    400: adsRadarPricing[400],
    500: adsRadarPricing[500],
    600: adsRadarPricing[600],
    700: adsRadarPricing[800],
    800: adsRadarPricing[800],
    900: adsRadarPricing[800],
    950: adsRadarPricing[800],
  },
  /** LI / MI / DA. 300 permanece LI-50, a borda dos controles. */
  neutral: {
    50: adsNeutralLight[10],
    100: adsNeutralLight[20],
    200: adsNeutralLight[30],
    300: adsNeutralLight[50],
    400: adsNeutralMid[70],
    500: adsNeutralMid[90],
    600: adsNeutralMid[200],
    700: adsNeutralMid[400],
    800: adsNeutralDark[600],
    900: adsNeutralDark[800],
    950: adsNeutralDark[900],
  },
  /** WA. O 500 fica em WA-300, a borda de erro já medida nos inputs. */
  error: {
    50: adsWarningRed[100],
    100: adsWarningRed[100],
    200: adsWarningRed[200],
    300: adsWarningRed[300],
    400: adsWarningRed[300],
    500: adsWarningRed[300],
    600: adsWarningRed[400],
    700: adsWarningRed[500],
    800: adsWarningRed[600],
    900: adsWarningRed[700],
    950: adsWarningRed[800],
  },
  success: {
    50: adsSuccess[100],
    100: adsSuccess[100],
    200: adsSuccess[200],
    300: adsSuccess[300],
    400: adsSuccess[400],
    500: adsSuccess[500],
    600: adsSuccess[600],
    700: adsSuccess[700],
    800: adsSuccess[800],
    900: adsSuccess[800],
    950: adsSuccess[800],
  },
  /** AT, não o grupo WA (vermelho). */
  warning: {
    50: adsAttention[100],
    100: adsAttention[100],
    200: adsAttention[200],
    300: adsAttention[300],
    400: adsAttention[400],
    500: adsAttention[500],
    600: adsAttention[600],
    700: adsAttention[700],
    800: adsAttention[800],
    900: adsAttention[800],
    950: adsAttention[800],
  },
  /** OP. */
  info: {
    50: adsOpportunity[100],
    100: adsOpportunity[100],
    200: adsOpportunity[200],
    300: adsOpportunity[300],
    400: adsOpportunity[400],
    500: adsOpportunity[500],
    600: adsOpportunity[600],
    700: adsOpportunity[700],
    800: adsOpportunity[800],
    900: adsOpportunity[800],
    950: adsOpportunity[800],
  },
} as const;

/** Controle usa $border-radius-SM (8px). Checkbox usa $border-radius-xSM (4px). */
export const adsRadius = {
  control: "0.5rem",
  checkbox: "0.25rem",
} as const;

export const adsButtonTheme = {
  slots: {
    base: "rounded-md font-bold inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-100 aria-disabled:opacity-100 transition-colors",
  },
  variants: {
    size: {
      sm: {
        base: "h-8 px-2.5 text-xs gap-1.5",
      },
      md: {
        base: "h-10.5 px-3 text-sm gap-1.5",
      },
      lg: {
        base: "h-10.5 px-3 text-sm gap-2",
      },
    },
  },
};

export const adsInputTheme = {
  variants: {
    size: {
      sm: {
        base: "h-8 px-2.5 text-xs gap-1.5",
      },
      md: {
        base: "h-10 px-3 text-sm gap-1.5",
      },
    },
  },
};

export const adsInputDateTheme = {
  slots: {
    segment:
      "data-placeholder:![color:var(--ads-date-placeholder)] data-[segment=literal]:![color:var(--ads-date-separator)]",
  },
  variants: {
    size: {
      md: {
        base: "h-[var(--ads-date-height)] rounded-[var(--ads-date-radius)] px-[var(--ads-date-padding-x)] text-[length:var(--ads-date-font-size)] [font-weight:var(--ads-date-weight)] !leading-[var(--ads-date-line-height)] gap-1.5 w-full ![color:var(--ads-date-text)] !bg-[var(--ads-date-background)] !ring-[var(--ads-date-border)] has-focus-visible:!ring-[var(--ads-date-focus-border)]",
      },
    },
  },
};

/**
 * Tabs link ADS.
 * Lista 38px, itens no tamanho do texto, faixa inferior 1px #C1C7D0.
 * Inativo: Inter 14 medium, #505F79. Ativo: bold, #061938, risco 4px #006FF7.
 */
export const adsLinkTabsUi = {
  root: "items-start",
  list: "h-[var(--ads-tabs-height)] w-full items-start self-stretch border-b border-[var(--ads-tabs-border)] py-0 px-0",
  trigger:
    "h-[var(--ads-tabs-height)] grow-0 px-[var(--ads-tabs-padding-x)] py-0 text-[length:var(--ads-tabs-font-size)] [font-weight:var(--ads-tabs-weight)] leading-[1.3] text-[var(--ads-tabs-inactive)] data-[state=inactive]:text-[var(--ads-tabs-inactive)] data-[state=active]:font-bold data-[state=active]:text-[var(--ads-tabs-active)]",
  indicator: "-bottom-px h-[var(--ads-tabs-indicator)] rounded-none bg-[var(--ads-tabs-indicator-color)]",
} as const;

/**
 * Tabs segmentadas ADS (Figma Switch Tabs).
 * Trilha 37px em neutral-100 (Neutral Light 20, #F0F3F6), raio 4px, respiro 4px.
 * Inativo: Inter 12 regular, #061938. Ativo: bold, preto, pill branca com sombra nível 1.
 */
export const adsSegmentedTabsUi = {
  root: "!w-auto shrink-0",
  list: "!h-[var(--ads-segmented-height)] !w-auto !self-start !items-center !gap-1 !rounded-[var(--ads-segmented-radius)] !border-0 !bg-[var(--ads-segmented-track)] !p-1",
  trigger:
    "!h-[var(--ads-segmented-item-height)] !grow-0 !gap-3 !rounded-[var(--ads-segmented-radius)] !px-[var(--ads-segmented-padding-x)] !py-0 !text-[length:var(--ads-segmented-font-size)] !font-normal !leading-[var(--ads-line-height-sm)] !text-[var(--ads-segmented-text)] data-[state=inactive]:!text-[var(--ads-segmented-text)] data-[state=active]:!font-bold data-[state=active]:!text-[var(--ads-segmented-active-text)]",
  indicator:
    "!rounded-[var(--ads-segmented-radius)] !bg-[var(--ads-segmented-active-bg)] !shadow-[var(--ads-shadow-level-1)]",
} as const;

/**
 * Dropdown ADS: controle 40px / 14px / medium.
 * Opção: 16px vertical, 24px à esquerda, 14px regular #505F79.
 * Selecionada em bold. Linha Neutral/Light/40 (#d3d8dd) entre as opções.
 */
const adsSelectSizeMd = {
  base: "h-10 px-3 text-sm gap-1.5 font-medium",
  item: "ps-6 pe-3 py-4 text-sm gap-2 font-normal text-muted border-b border-[#d3d8dd] last:border-b-0 data-[state=checked]:font-bold data-[state=checked]:text-neutral-700 data-highlighted:before:bg-transparent",
};

const adsSelectSlots = {
  placeholder: "truncate text-dimmed font-normal",
  group: "!p-0",
};

export const adsSelectTheme = {
  slots: adsSelectSlots,
  variants: {
    size: {
      md: adsSelectSizeMd,
    },
  },
};

export const adsSelectMenuTheme = {
  slots: adsSelectSlots,
  variants: {
    size: {
      md: adsSelectSizeMd,
    },
  },
};

/**
 * Menu de ações ADS. Mesma opção do select: 16px vertical, 24px à esquerda,
 * 14px regular e linha #d3d8dd entre os itens.
 */
export const adsDropdownMenuUi = {
  content:
    "!min-w-56 !bg-[var(--ads-surface-card)] !shadow-[var(--ads-shadow-level-1)] !ring-0 !rounded-[var(--ads-radius-sm)] border border-[var(--ads-border-subtle)]",
  viewport: "!divide-y-0",
  group: "!p-0",
  item: "!items-center !gap-2 !rounded-none !p-0 !ps-6 !pe-3 !py-4 !text-sm !font-normal !text-[var(--ads-text-secondary)] border-b border-[#d3d8dd] last:border-b-0 before:!hidden data-highlighted:!bg-neutral-100",
  itemLeadingIcon: "!size-4 !text-[var(--ads-text-secondary)]",
  itemLabel: "!truncate !text-sm !font-normal !text-[var(--ads-text-secondary)]",
} as const;

/** Rótulo do dropdown ADS: $font-size-xxxs (12px), peso medium. */
export const adsSelectFieldUi = {
  label: "text-xs font-medium text-neutral-500",
} as const;

/**
 * Intervalo do date picker ADS.
 * Cap (início/fim): primary 500. Meio: primary 100 — mais próximo do cluster
 * #c0e0f8 da referência visual (Figma API 429; JEV escolheu primary_100).
 */
export const adsCalendarRangeTokens = {
  capBackground: adsPalette.primary[500],
  capText: "#ffffff",
  middleBackground: adsPalette.primary[100],
  middleText: adsPalette.primary[500],
} as const;

export const adsCalendarTheme = {
  slots: {
    cellTrigger: "rounded-md",
  },
};

/**
 * Tooltip ADS (Figma node 5720:10263).
 * Fundo DA-900, título branco em negrito, corpo LI-50, raio MD (12px).
 */
export const adsTooltipTitleClass = "font-bold text-[var(--ads-tooltip-title)]";

export const adsTooltipTheme = {
  slots: {
    content:
      "flex items-start gap-1 h-auto max-w-xs rounded-[var(--ads-tooltip-radius)] bg-[var(--ads-tooltip-bg)] px-[var(--ads-tooltip-padding-x)] py-[var(--ads-tooltip-padding-y)] text-[length:var(--ads-tooltip-font-size)] leading-[1.4] text-[var(--ads-tooltip-text)] shadow-none ring-0 select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto",
    arrow: "fill-[var(--ads-tooltip-bg)]",
    text: "whitespace-normal",
  },
};

/** Mesmo visual para tooltips feitas com UPopover em hover. */
export const adsTooltipPopoverUi = {
  content:
    "h-auto max-w-xs rounded-[var(--ads-tooltip-radius)] bg-[var(--ads-tooltip-bg)] px-[var(--ads-tooltip-padding-x)] py-[var(--ads-tooltip-padding-y)] text-[length:var(--ads-tooltip-font-size)] leading-[1.4] text-[var(--ads-tooltip-text)] shadow-none ring-0 data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-popover-content-transform-origin)",
  arrow: "fill-[var(--ads-tooltip-bg)]",
};

/**
 * Status Toast do Figma ADS (frame 371×340).
 * Fundo DA-900, raio sm (8px), título 16 bold, apoio 14 a 75%.
 * Ícones: SU-400, WA, AT-400 e OP-400. Sem barra de progresso.
 */
export const adsToastWidth = "371px";

export const adsToastIcons = {
  success: "i-lucide-circle-check",
  error: "i-lucide-circle-x",
  warning: "i-lucide-triangle-alert",
  info: "i-lucide-info",
  primary: "i-lucide-info",
  secondary: "i-lucide-info",
  neutral: "i-lucide-info",
} as const;

const adsLegacyToastIcons = new Set([
  "i-lucide-check-circle",
  "i-lucide-x-circle",
  "i-lucide-alert-circle",
  "i-lucide-alert-triangle",
]);

export const resolveAdsToastIcon = (
  color: string | undefined,
  icon: unknown,
): string => {
  const fallback =
    adsToastIcons[color as keyof typeof adsToastIcons] ?? adsToastIcons.primary;

  if (typeof icon !== "string" || icon.length === 0) {
    return fallback;
  }

  if (adsLegacyToastIcons.has(icon)) {
    return fallback;
  }

  return icon;
};

const adsToastFocus =
  "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/40";

export const adsToastTheme = {
  slots: {
    root: `relative group overflow-hidden bg-neutral-950 !shadow-[var(--ads-shadow-level-2)] !ring-0 rounded-[var(--ads-radius-sm)] p-4 flex !gap-3 items-center focus:outline-none ${adsToastFocus}`,
    wrapper: "w-0 flex-1 flex flex-col",
    title: "text-base font-bold leading-[1.2] text-white min-w-0 break-words",
    description: "text-sm font-normal leading-[1.2] text-white/75 min-w-0 break-words",
    icon: "shrink-0 !size-6",
    close:
      "!size-6 !min-h-0 !p-0 shrink-0 !text-white hover:!bg-transparent hover:!text-white focus-visible:!ring-white/40",
    progress: "!hidden",
  },
  variants: {
    color: {
      success: { root: adsToastFocus, icon: "text-success-400" },
      error: { root: adsToastFocus, icon: "text-error" },
      warning: { root: adsToastFocus, icon: "text-warning-400" },
      info: { root: adsToastFocus, icon: "text-info-400" },
      primary: { root: adsToastFocus, icon: "text-primary-400" },
      secondary: { root: adsToastFocus, icon: "text-secondary-400" },
      neutral: { root: adsToastFocus, icon: "text-white" },
    },
    orientation: {
      horizontal: { root: "items-center" },
      vertical: { root: "items-center" },
    },
  },
};

export const adsToasterTheme = {
  slots: {
    viewport:
      "fixed flex flex-col w-[calc(100%-2rem)] sm:w-[371px] z-[100] data-[expanded=true]:h-(--height) focus:outline-none",
  },
};

export const adsToaster = {
  position: "top-right" as const,
  progress: false,
};

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export const adsThemeColorVariables = () => {
  const lines: string[] = [];
  for (const [name, scale] of Object.entries(adsPalette)) {
    lines.push(`--color-${name}: ${scale[500]};`);
    for (const shade of shades) {
      lines.push(`--color-${name}-${shade}: ${scale[shade]};`);
    }
  }
  return lines;
};
