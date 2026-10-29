/**
 * Tokens extraídos da página ※ Tokens do Figma ADS — Tokens
 * (file HdKW6k5bVFtUJkhZLafCpb, node 132:65).
 * Hex e pixels vêm do texto ao lado de cada amostra, não de cor inventada.
 */

export const adsSpacing = {
  quark: 4,
  nano: 8,
  xxxs: 12,
  xxs: 16,
  xs: 24,
  sm: 32,
  rg: 40,
  md: 48,
  lg: 56,
  xl: 64,
  xxl: 80,
  xxxl: 120,
  huge: 160,
  giant: 200,
} as const;

/** Escala azul do Radar Pricing. Não inclui RP-1..RP-11, que são cores de outros produtos. */
export const adsRadarPricing = {
  25: "#e4f2ff",
  50: "#c7e4ff",
  100: "#89c9ff",
  200: "#50b3ff",
  400: "#0091ff",
  500: "#006ff7",
  600: "#074ac6",
  800: "#00389e",
} as const;

export const adsRadarBase = {
  100: "#3f4457",
  200: "#2e3342",
  500: "#212631",
  600: "#1b2029",
  900: "#161b22",
} as const;

export const adsNeutralLight = {
  0: "#ffffff",
  10: "#fafbfc",
  20: "#f0f3f6",
  30: "#e5e8eb",
  40: "#d3d8dd",
  50: "#c1c7d0",
} as const;

export const adsNeutralMid = {
  60: "#b3bac5",
  70: "#a5adba",
  80: "#97a0af",
  90: "#8993a4",
  100: "#7a869a",
  200: "#6b778c",
  300: "#5e6c84",
  400: "#505f79",
} as const;

export const adsNeutralDark = {
  500: "#42526e",
  600: "#344563",
  700: "#253858",
  800: "#172b4d",
  900: "#061938",
} as const;

export const adsSuccess = {
  100: "#c3ffe6",
  200: "#7fffcb",
  300: "#32feaa",
  400: "#06eb8f",
  500: "#15c57e",
  600: "#1c9f6a",
  700: "#157850",
  800: "#0e5a3b",
} as const;

/** Grupo Warning do Figma: matiz vermelho/rosa. */
export const adsWarningRed = {
  100: "#ffbdcd",
  200: "#ff87a4",
  300: "#ff507a",
  400: "#ef164a",
  500: "#dc0034",
  600: "#c0012e",
  700: "#9e062a",
  800: "#840221",
} as const;

/** Grupo Attention do Figma: âmbar. */
export const adsAttention = {
  100: "#ffe7b9",
  200: "#ffdc82",
  300: "#ffca43",
  400: "#ffb905",
  500: "#e9a700",
  600: "#ce9300",
  700: "#ad7b00",
  800: "#8f6600",
} as const;

/** Escala que era Gráfico C2. Cor principal Innovation. */
export const adsInnovation = {
  100: "#cabaff",
  200: "#b19aff",
  300: "#9e80ff",
  400: "#825cff",
  500: "#7349ff",
  600: "#613dda",
  700: "#4c30a8",
  800: "#3c287c",
} as const;

/** Grupo Opportunity do Figma: ciano. */
export const adsOpportunity = {
  100: "#c4f5ff",
  200: "#79e9ff",
  300: "#49d8f4",
  400: "#04c8ef",
  500: "#05b4d8",
  600: "#01a0bf",
  700: "#007a93",
  800: "#006478",
} as const;

export const adsVoid = {
  100: "#cfdef3",
  200: "#b4c5df",
  300: "#91a2bb",
  400: "#738298",
  500: "#556171",
  600: "#3c434e",
  700: "#282c34",
  800: "#0e1013",
} as const;

export const adsChart = {
  c1: {
    100: "#f8b4ff",
    200: "#f58eff",
    300: "#ee60fb",
    400: "#e837f9",
    500: "#cc1fdd",
    600: "#b121be",
    700: "#951fa0",
    800: "#76197e",
  },
  c2: adsInnovation,
  c3: {
    100: "#ffb0b0",
    200: "#ff8e8e",
    300: "#ff7272",
    400: "#f76565",
    500: "#e46161",
    600: "#cc5252",
    700: "#b54444",
    800: "#983a3a",
  },
  c4: {
    100: "#b6ffca",
    200: "#86e7a2",
    300: "#4bd973",
    400: "#1ac44a",
    500: "#24ab4a",
    600: "#1c8f3d",
    700: "#167130",
    800: "#115825",
  },
  c5: {
    100: "#a2baff",
    200: "#8ca5ee",
    300: "#768dd0",
    400: "#677bb6",
    500: "#546596",
    600: "#445279",
    700: "#374261",
    800: "#252c41",
  },
} as const;

/** RP-1..RP-11: cor de cada produto Radar, não a escala do Pricing. */
export const adsProductBrands = {
  1: "#ef7d18",
  2: "#07509f",
  3: "#009159",
  4: "#5a2d87",
  5: "#ff5410",
  6: "#050505",
  7: "#c2113b",
  8: "#8c6bfa",
  9: "#0091ff",
  10: "#8b89c9",
  11: "#007a93",
} as const;

export const adsFontFamily = "Inter";

/** $font-size-* da seção Font. 40, 48 e 64 ficam só nos estilos compostos. */
export const adsFontSize = {
  minimal: 10,
  xxxs: 12,
  xxs: 14,
  xs: 16,
  sm: 18,
  rg: 20,
  md: 24,
  lg: 32,
} as const;

export const adsFontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  extrabold: 800,
} as const;

/**
 * Peso por papel nas páginas do layout dashboard.
 * Só usa pesos publicados. Semibold (600) não existe no ADS.
 */
export const adsDashboardFontWeight = {
  pageTitle: adsFontWeight.bold,
  sectionTitle: adsFontWeight.bold,
  cardTitle: adsFontWeight.medium,
  label: adsFontWeight.medium,
  body: adsFontWeight.regular,
  subtle: adsFontWeight.light,
} as const;

/** $line-height-default, SM, md e lg. */
export const adsLineHeight = {
  default: "100%",
  sm: "120%",
  md: "140%",
  lg: "160%",
} as const;

/**
 * Estilos de texto publicados (Inter/{papel} {size}/{size} {peso}).
 * A altura de linha no nome é igual ao tamanho, então usam line-height default.
 * 40, 48 e 64 não têm $font-size na seção Font.
 */
export const adsTypography = {
  label: [10, 12],
  body: [14, 16],
  subtitle: [18, 20],
  title: [24],
  largeTitle: [32],
  xLargeTitle: [40],
  xxLargeTitle: [48],
  display: [64],
} as const;

/** $border-radius-*. Pill está escrito como ≥ 500px. */
export const adsBorderRadius = {
  none: "0px",
  xsm: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  pill: "500px",
  xlg: "24px",
  circular: "50%",
} as const;

export const adsBorderWidth = {
  none: "0px",
  hairline: "1px",
  slim: "1.5px",
  thin: "2px",
  thick: "4px",
  heavy: "8px",
} as const;

/** $shadow-level-*. B é o blur. Cor #000 nas opacidades escritas. */
export const adsShadow = {
  none: "none",
  level1: "0 2px 8px rgb(0 0 0 / 16%)",
  level2: "0 4px 24px rgb(0 0 0 / 16%)",
  level3: "0 8px 32px rgb(0 0 0 / 16%)",
  level4: "0 12px 48px rgb(0 0 0 / 24%)",
} as const;

export const adsOpacity = {
  intense: "75%",
  medium: "50%",
  light: "25%",
} as const;

/** $blur-level-default: backdrop blur 4px sobre preto a 50%. */
export const adsBlur = {
  default: "4px",
  color: "#000000",
  opacity: "50%",
} as const;

/**
 * Camada semântica (Default.tokens.json).
 * Cada valor aponta para um primitivo já publicado, com o mesmo hex do arquivo.
 */
export const adsSemantic = {
  surface: {
    main: adsNeutralLight[10],
    card: adsNeutralLight[0],
    brand: adsRadarPricing[500],
  },
  text: {
    primary: adsNeutralDark[900],
    secondary: adsNeutralMid[400],
    tertiary: adsNeutralMid[70],
    brand: adsRadarPricing[500],
    disabled: adsRadarPricing[100],
    contrast: adsNeutralLight[0],
  },
  border: {
    subtle: adsNeutralLight[50],
    focused: adsNeutralMid[200],
    icon: adsNeutralDark[500],
    iconSupport: adsNeutralMid[100],
  },
  button: {
    primary: {
      default: adsRadarPricing[500],
      hover: adsRadarPricing[600],
      pressed: adsRadarPricing[800],
      disabled: adsRadarPricing[100],
    },
    secondary: {
      default: adsRadarPricing[25],
      hover: adsRadarPricing[50],
      pressed: adsRadarPricing[100],
      disabled: adsNeutralLight[40],
    },
  },
  status: {
    success: { 800: adsSuccess[800], 500: adsSuccess[500], 100: adsSuccess[100] },
    warning: { 800: adsWarningRed[800], 500: adsWarningRed[500], 100: adsWarningRed[100] },
    attention: { 800: adsAttention[800], 500: adsAttention[500], 100: adsAttention[100] },
    new: { 800: adsOpportunity[800], 500: adsOpportunity[500], 100: adsOpportunity[100] },
    innovation: { 800: adsInnovation[800], 500: adsInnovation[500], 100: adsInnovation[100] },
    void: { 800: adsVoid[800], 500: adsVoid[500], 100: adsVoid[100] },
  },
  chart: {
    data1: { 800: adsChart.c1[800], 400: adsChart.c1[400], 100: adsChart.c1[100] },
    data2: { 800: adsChart.c2[800], 500: adsChart.c2[500], 100: adsChart.c2[100] },
    data3: { 800: adsChart.c3[800], 400: adsChart.c3[400], 100: adsChart.c3[100] },
    data4: { 800: adsChart.c4[800], 500: adsChart.c4[500], 100: adsChart.c4[100] },
    data5: { 800: adsChart.c5[800], 400: adsChart.c5[400], 100: adsChart.c5[100] },
  },
} as const;

export const adsColorTokenValues = () => {
  const values = new Set<string>();
  const collect = (scale: Record<string, string>) => {
    for (const hex of Object.values(scale)) values.add(hex);
  };

  collect(adsRadarPricing);
  collect(adsRadarBase);
  collect(adsNeutralLight);
  collect(adsNeutralMid);
  collect(adsNeutralDark);
  collect(adsSuccess);
  collect(adsWarningRed);
  collect(adsAttention);
  collect(adsOpportunity);
  collect(adsInnovation);
  collect(adsVoid);
  collect(adsProductBrands);
  for (const scale of Object.values(adsChart)) collect(scale);

  return values;
};
