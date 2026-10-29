export type AdsColorSwatch = {
  step: string;
  hex: string;
  /** bg-ads-<grupo>-<passo> */
  surface: string;
  /** text-ads-<grupo>-<passo> */
  text: string;
  /** border-ads-<grupo>-<passo> */
  border: string;
};

export type AdsColorGroup = {
  name: string;
  slug: string;
  swatches: AdsColorSwatch[];
};

/** Classes completas (bg, text, border) para o Tailwind enxergar cada amostra. */
export const adsColorGroups: AdsColorGroup[] = [
  {
    name: "Radar Pricing",
    slug: "radar-pricing",
    swatches: [
      { step: "25", hex: "#e4f2ff", surface: "bg-ads-radar-pricing-25", text: "text-ads-radar-pricing-25", border: "border-ads-radar-pricing-25" },
      { step: "50", hex: "#c7e4ff", surface: "bg-ads-radar-pricing-50", text: "text-ads-radar-pricing-50", border: "border-ads-radar-pricing-50" },
      { step: "100", hex: "#89c9ff", surface: "bg-ads-radar-pricing-100", text: "text-ads-radar-pricing-100", border: "border-ads-radar-pricing-100" },
      { step: "200", hex: "#50b3ff", surface: "bg-ads-radar-pricing-200", text: "text-ads-radar-pricing-200", border: "border-ads-radar-pricing-200" },
      { step: "400", hex: "#0091ff", surface: "bg-ads-radar-pricing-400", text: "text-ads-radar-pricing-400", border: "border-ads-radar-pricing-400" },
      { step: "500", hex: "#006ff7", surface: "bg-ads-radar-pricing-500", text: "text-ads-radar-pricing-500", border: "border-ads-radar-pricing-500" },
      { step: "600", hex: "#074ac6", surface: "bg-ads-radar-pricing-600", text: "text-ads-radar-pricing-600", border: "border-ads-radar-pricing-600" },
      { step: "800", hex: "#00389e", surface: "bg-ads-radar-pricing-800", text: "text-ads-radar-pricing-800", border: "border-ads-radar-pricing-800" },
    ],
  },
  {
    name: "Radar Base",
    slug: "radar-base",
    swatches: [
      { step: "100", hex: "#3f4457", surface: "bg-ads-radar-base-100", text: "text-ads-radar-base-100", border: "border-ads-radar-base-100" },
      { step: "200", hex: "#2e3342", surface: "bg-ads-radar-base-200", text: "text-ads-radar-base-200", border: "border-ads-radar-base-200" },
      { step: "500", hex: "#212631", surface: "bg-ads-radar-base-500", text: "text-ads-radar-base-500", border: "border-ads-radar-base-500" },
      { step: "600", hex: "#1b2029", surface: "bg-ads-radar-base-600", text: "text-ads-radar-base-600", border: "border-ads-radar-base-600" },
      { step: "900", hex: "#161b22", surface: "bg-ads-radar-base-900", text: "text-ads-radar-base-900", border: "border-ads-radar-base-900" },
    ],
  },
  {
    name: "Neutro claro",
    slug: "neutro-claro",
    swatches: [
      { step: "0", hex: "#ffffff", surface: "bg-ads-neutro-claro-0", text: "text-ads-neutro-claro-0", border: "border-ads-neutro-claro-0" },
      { step: "10", hex: "#fafbfc", surface: "bg-ads-neutro-claro-10", text: "text-ads-neutro-claro-10", border: "border-ads-neutro-claro-10" },
      { step: "20", hex: "#f0f3f6", surface: "bg-ads-neutro-claro-20", text: "text-ads-neutro-claro-20", border: "border-ads-neutro-claro-20" },
      { step: "30", hex: "#e5e8eb", surface: "bg-ads-neutro-claro-30", text: "text-ads-neutro-claro-30", border: "border-ads-neutro-claro-30" },
      { step: "40", hex: "#d3d8dd", surface: "bg-ads-neutro-claro-40", text: "text-ads-neutro-claro-40", border: "border-ads-neutro-claro-40" },
      { step: "50", hex: "#c1c7d0", surface: "bg-ads-neutro-claro-50", text: "text-ads-neutro-claro-50", border: "border-ads-neutro-claro-50" },
    ],
  },
  {
    name: "Neutro médio",
    slug: "neutro-medio",
    swatches: [
      { step: "60", hex: "#b3bac5", surface: "bg-ads-neutro-medio-60", text: "text-ads-neutro-medio-60", border: "border-ads-neutro-medio-60" },
      { step: "70", hex: "#a5adba", surface: "bg-ads-neutro-medio-70", text: "text-ads-neutro-medio-70", border: "border-ads-neutro-medio-70" },
      { step: "80", hex: "#97a0af", surface: "bg-ads-neutro-medio-80", text: "text-ads-neutro-medio-80", border: "border-ads-neutro-medio-80" },
      { step: "90", hex: "#8993a4", surface: "bg-ads-neutro-medio-90", text: "text-ads-neutro-medio-90", border: "border-ads-neutro-medio-90" },
      { step: "100", hex: "#7a869a", surface: "bg-ads-neutro-medio-100", text: "text-ads-neutro-medio-100", border: "border-ads-neutro-medio-100" },
      { step: "200", hex: "#6b778c", surface: "bg-ads-neutro-medio-200", text: "text-ads-neutro-medio-200", border: "border-ads-neutro-medio-200" },
      { step: "300", hex: "#5e6c84", surface: "bg-ads-neutro-medio-300", text: "text-ads-neutro-medio-300", border: "border-ads-neutro-medio-300" },
      { step: "400", hex: "#505f79", surface: "bg-ads-neutro-medio-400", text: "text-ads-neutro-medio-400", border: "border-ads-neutro-medio-400" },
    ],
  },
  {
    name: "Neutro escuro",
    slug: "neutro-escuro",
    swatches: [
      { step: "500", hex: "#42526e", surface: "bg-ads-neutro-escuro-500", text: "text-ads-neutro-escuro-500", border: "border-ads-neutro-escuro-500" },
      { step: "600", hex: "#344563", surface: "bg-ads-neutro-escuro-600", text: "text-ads-neutro-escuro-600", border: "border-ads-neutro-escuro-600" },
      { step: "700", hex: "#253858", surface: "bg-ads-neutro-escuro-700", text: "text-ads-neutro-escuro-700", border: "border-ads-neutro-escuro-700" },
      { step: "800", hex: "#172b4d", surface: "bg-ads-neutro-escuro-800", text: "text-ads-neutro-escuro-800", border: "border-ads-neutro-escuro-800" },
      { step: "900", hex: "#061938", surface: "bg-ads-neutro-escuro-900", text: "text-ads-neutro-escuro-900", border: "border-ads-neutro-escuro-900" },
    ],
  },
  {
    name: "Sucesso",
    slug: "sucesso",
    swatches: [
      { step: "100", hex: "#c3ffe6", surface: "bg-ads-sucesso-100", text: "text-ads-sucesso-100", border: "border-ads-sucesso-100" },
      { step: "200", hex: "#7fffcb", surface: "bg-ads-sucesso-200", text: "text-ads-sucesso-200", border: "border-ads-sucesso-200" },
      { step: "300", hex: "#32feaa", surface: "bg-ads-sucesso-300", text: "text-ads-sucesso-300", border: "border-ads-sucesso-300" },
      { step: "400", hex: "#06eb8f", surface: "bg-ads-sucesso-400", text: "text-ads-sucesso-400", border: "border-ads-sucesso-400" },
      { step: "500", hex: "#15c57e", surface: "bg-ads-sucesso-500", text: "text-ads-sucesso-500", border: "border-ads-sucesso-500" },
      { step: "600", hex: "#1c9f6a", surface: "bg-ads-sucesso-600", text: "text-ads-sucesso-600", border: "border-ads-sucesso-600" },
      { step: "700", hex: "#157850", surface: "bg-ads-sucesso-700", text: "text-ads-sucesso-700", border: "border-ads-sucesso-700" },
      { step: "800", hex: "#0e5a3b", surface: "bg-ads-sucesso-800", text: "text-ads-sucesso-800", border: "border-ads-sucesso-800" },
    ],
  },
  {
    name: "Warning",
    slug: "warning",
    swatches: [
      { step: "100", hex: "#ffbdcd", surface: "bg-ads-warning-100", text: "text-ads-warning-100", border: "border-ads-warning-100" },
      { step: "200", hex: "#ff87a4", surface: "bg-ads-warning-200", text: "text-ads-warning-200", border: "border-ads-warning-200" },
      { step: "300", hex: "#ff507a", surface: "bg-ads-warning-300", text: "text-ads-warning-300", border: "border-ads-warning-300" },
      { step: "400", hex: "#ef164a", surface: "bg-ads-warning-400", text: "text-ads-warning-400", border: "border-ads-warning-400" },
      { step: "500", hex: "#dc0034", surface: "bg-ads-warning-500", text: "text-ads-warning-500", border: "border-ads-warning-500" },
      { step: "600", hex: "#c0012e", surface: "bg-ads-warning-600", text: "text-ads-warning-600", border: "border-ads-warning-600" },
      { step: "700", hex: "#9e062a", surface: "bg-ads-warning-700", text: "text-ads-warning-700", border: "border-ads-warning-700" },
      { step: "800", hex: "#840221", surface: "bg-ads-warning-800", text: "text-ads-warning-800", border: "border-ads-warning-800" },
    ],
  },
  {
    name: "Atenção",
    slug: "atencao",
    swatches: [
      { step: "100", hex: "#ffe7b9", surface: "bg-ads-atencao-100", text: "text-ads-atencao-100", border: "border-ads-atencao-100" },
      { step: "200", hex: "#ffdc82", surface: "bg-ads-atencao-200", text: "text-ads-atencao-200", border: "border-ads-atencao-200" },
      { step: "300", hex: "#ffca43", surface: "bg-ads-atencao-300", text: "text-ads-atencao-300", border: "border-ads-atencao-300" },
      { step: "400", hex: "#ffb905", surface: "bg-ads-atencao-400", text: "text-ads-atencao-400", border: "border-ads-atencao-400" },
      { step: "500", hex: "#e9a700", surface: "bg-ads-atencao-500", text: "text-ads-atencao-500", border: "border-ads-atencao-500" },
      { step: "600", hex: "#ce9300", surface: "bg-ads-atencao-600", text: "text-ads-atencao-600", border: "border-ads-atencao-600" },
      { step: "700", hex: "#ad7b00", surface: "bg-ads-atencao-700", text: "text-ads-atencao-700", border: "border-ads-atencao-700" },
      { step: "800", hex: "#8f6600", surface: "bg-ads-atencao-800", text: "text-ads-atencao-800", border: "border-ads-atencao-800" },
    ],
  },
  {
    name: "Innovation",
    slug: "innovation",
    swatches: [
      { step: "100", hex: "#cabaff", surface: "bg-ads-innovation-100", text: "text-ads-innovation-100", border: "border-ads-innovation-100" },
      { step: "200", hex: "#b19aff", surface: "bg-ads-innovation-200", text: "text-ads-innovation-200", border: "border-ads-innovation-200" },
      { step: "300", hex: "#9e80ff", surface: "bg-ads-innovation-300", text: "text-ads-innovation-300", border: "border-ads-innovation-300" },
      { step: "400", hex: "#825cff", surface: "bg-ads-innovation-400", text: "text-ads-innovation-400", border: "border-ads-innovation-400" },
      { step: "500", hex: "#7349ff", surface: "bg-ads-innovation-500", text: "text-ads-innovation-500", border: "border-ads-innovation-500" },
      { step: "600", hex: "#613dda", surface: "bg-ads-innovation-600", text: "text-ads-innovation-600", border: "border-ads-innovation-600" },
      { step: "700", hex: "#4c30a8", surface: "bg-ads-innovation-700", text: "text-ads-innovation-700", border: "border-ads-innovation-700" },
      { step: "800", hex: "#3c287c", surface: "bg-ads-innovation-800", text: "text-ads-innovation-800", border: "border-ads-innovation-800" },
    ],
  },
  {
    name: "Oportunidade",
    slug: "oportunidade",
    swatches: [
      { step: "100", hex: "#c4f5ff", surface: "bg-ads-oportunidade-100", text: "text-ads-oportunidade-100", border: "border-ads-oportunidade-100" },
      { step: "200", hex: "#79e9ff", surface: "bg-ads-oportunidade-200", text: "text-ads-oportunidade-200", border: "border-ads-oportunidade-200" },
      { step: "300", hex: "#49d8f4", surface: "bg-ads-oportunidade-300", text: "text-ads-oportunidade-300", border: "border-ads-oportunidade-300" },
      { step: "400", hex: "#04c8ef", surface: "bg-ads-oportunidade-400", text: "text-ads-oportunidade-400", border: "border-ads-oportunidade-400" },
      { step: "500", hex: "#05b4d8", surface: "bg-ads-oportunidade-500", text: "text-ads-oportunidade-500", border: "border-ads-oportunidade-500" },
      { step: "600", hex: "#01a0bf", surface: "bg-ads-oportunidade-600", text: "text-ads-oportunidade-600", border: "border-ads-oportunidade-600" },
      { step: "700", hex: "#007a93", surface: "bg-ads-oportunidade-700", text: "text-ads-oportunidade-700", border: "border-ads-oportunidade-700" },
      { step: "800", hex: "#006478", surface: "bg-ads-oportunidade-800", text: "text-ads-oportunidade-800", border: "border-ads-oportunidade-800" },
    ],
  },
  {
    name: "Void",
    slug: "void",
    swatches: [
      { step: "100", hex: "#cfdef3", surface: "bg-ads-void-100", text: "text-ads-void-100", border: "border-ads-void-100" },
      { step: "200", hex: "#b4c5df", surface: "bg-ads-void-200", text: "text-ads-void-200", border: "border-ads-void-200" },
      { step: "300", hex: "#91a2bb", surface: "bg-ads-void-300", text: "text-ads-void-300", border: "border-ads-void-300" },
      { step: "400", hex: "#738298", surface: "bg-ads-void-400", text: "text-ads-void-400", border: "border-ads-void-400" },
      { step: "500", hex: "#556171", surface: "bg-ads-void-500", text: "text-ads-void-500", border: "border-ads-void-500" },
      { step: "600", hex: "#3c434e", surface: "bg-ads-void-600", text: "text-ads-void-600", border: "border-ads-void-600" },
      { step: "700", hex: "#282c34", surface: "bg-ads-void-700", text: "text-ads-void-700", border: "border-ads-void-700" },
      { step: "800", hex: "#0e1013", surface: "bg-ads-void-800", text: "text-ads-void-800", border: "border-ads-void-800" },
    ],
  },
  {
    name: "Gráfico C1",
    slug: "grafico-c1",
    swatches: [
      { step: "100", hex: "#f8b4ff", surface: "bg-ads-grafico-c1-100", text: "text-ads-grafico-c1-100", border: "border-ads-grafico-c1-100" },
      { step: "200", hex: "#f58eff", surface: "bg-ads-grafico-c1-200", text: "text-ads-grafico-c1-200", border: "border-ads-grafico-c1-200" },
      { step: "300", hex: "#ee60fb", surface: "bg-ads-grafico-c1-300", text: "text-ads-grafico-c1-300", border: "border-ads-grafico-c1-300" },
      { step: "400", hex: "#e837f9", surface: "bg-ads-grafico-c1-400", text: "text-ads-grafico-c1-400", border: "border-ads-grafico-c1-400" },
      { step: "500", hex: "#cc1fdd", surface: "bg-ads-grafico-c1-500", text: "text-ads-grafico-c1-500", border: "border-ads-grafico-c1-500" },
      { step: "600", hex: "#b121be", surface: "bg-ads-grafico-c1-600", text: "text-ads-grafico-c1-600", border: "border-ads-grafico-c1-600" },
      { step: "700", hex: "#951fa0", surface: "bg-ads-grafico-c1-700", text: "text-ads-grafico-c1-700", border: "border-ads-grafico-c1-700" },
      { step: "800", hex: "#76197e", surface: "bg-ads-grafico-c1-800", text: "text-ads-grafico-c1-800", border: "border-ads-grafico-c1-800" },
    ],
  },
  {
    name: "Gráfico C3",
    slug: "grafico-c3",
    swatches: [
      { step: "100", hex: "#ffb0b0", surface: "bg-ads-grafico-c3-100", text: "text-ads-grafico-c3-100", border: "border-ads-grafico-c3-100" },
      { step: "200", hex: "#ff8e8e", surface: "bg-ads-grafico-c3-200", text: "text-ads-grafico-c3-200", border: "border-ads-grafico-c3-200" },
      { step: "300", hex: "#ff7272", surface: "bg-ads-grafico-c3-300", text: "text-ads-grafico-c3-300", border: "border-ads-grafico-c3-300" },
      { step: "400", hex: "#f76565", surface: "bg-ads-grafico-c3-400", text: "text-ads-grafico-c3-400", border: "border-ads-grafico-c3-400" },
      { step: "500", hex: "#e46161", surface: "bg-ads-grafico-c3-500", text: "text-ads-grafico-c3-500", border: "border-ads-grafico-c3-500" },
      { step: "600", hex: "#cc5252", surface: "bg-ads-grafico-c3-600", text: "text-ads-grafico-c3-600", border: "border-ads-grafico-c3-600" },
      { step: "700", hex: "#b54444", surface: "bg-ads-grafico-c3-700", text: "text-ads-grafico-c3-700", border: "border-ads-grafico-c3-700" },
      { step: "800", hex: "#983a3a", surface: "bg-ads-grafico-c3-800", text: "text-ads-grafico-c3-800", border: "border-ads-grafico-c3-800" },
    ],
  },
  {
    name: "Gráfico C4",
    slug: "grafico-c4",
    swatches: [
      { step: "100", hex: "#b6ffca", surface: "bg-ads-grafico-c4-100", text: "text-ads-grafico-c4-100", border: "border-ads-grafico-c4-100" },
      { step: "200", hex: "#86e7a2", surface: "bg-ads-grafico-c4-200", text: "text-ads-grafico-c4-200", border: "border-ads-grafico-c4-200" },
      { step: "300", hex: "#4bd973", surface: "bg-ads-grafico-c4-300", text: "text-ads-grafico-c4-300", border: "border-ads-grafico-c4-300" },
      { step: "400", hex: "#1ac44a", surface: "bg-ads-grafico-c4-400", text: "text-ads-grafico-c4-400", border: "border-ads-grafico-c4-400" },
      { step: "500", hex: "#24ab4a", surface: "bg-ads-grafico-c4-500", text: "text-ads-grafico-c4-500", border: "border-ads-grafico-c4-500" },
      { step: "600", hex: "#1c8f3d", surface: "bg-ads-grafico-c4-600", text: "text-ads-grafico-c4-600", border: "border-ads-grafico-c4-600" },
      { step: "700", hex: "#167130", surface: "bg-ads-grafico-c4-700", text: "text-ads-grafico-c4-700", border: "border-ads-grafico-c4-700" },
      { step: "800", hex: "#115825", surface: "bg-ads-grafico-c4-800", text: "text-ads-grafico-c4-800", border: "border-ads-grafico-c4-800" },
    ],
  },
  {
    name: "Gráfico C5",
    slug: "grafico-c5",
    swatches: [
      { step: "100", hex: "#a2baff", surface: "bg-ads-grafico-c5-100", text: "text-ads-grafico-c5-100", border: "border-ads-grafico-c5-100" },
      { step: "200", hex: "#8ca5ee", surface: "bg-ads-grafico-c5-200", text: "text-ads-grafico-c5-200", border: "border-ads-grafico-c5-200" },
      { step: "300", hex: "#768dd0", surface: "bg-ads-grafico-c5-300", text: "text-ads-grafico-c5-300", border: "border-ads-grafico-c5-300" },
      { step: "400", hex: "#677bb6", surface: "bg-ads-grafico-c5-400", text: "text-ads-grafico-c5-400", border: "border-ads-grafico-c5-400" },
      { step: "500", hex: "#546596", surface: "bg-ads-grafico-c5-500", text: "text-ads-grafico-c5-500", border: "border-ads-grafico-c5-500" },
      { step: "600", hex: "#445279", surface: "bg-ads-grafico-c5-600", text: "text-ads-grafico-c5-600", border: "border-ads-grafico-c5-600" },
      { step: "700", hex: "#374261", surface: "bg-ads-grafico-c5-700", text: "text-ads-grafico-c5-700", border: "border-ads-grafico-c5-700" },
      { step: "800", hex: "#252c41", surface: "bg-ads-grafico-c5-800", text: "text-ads-grafico-c5-800", border: "border-ads-grafico-c5-800" },
    ],
  },
  {
    name: "Produtos Radar",
    slug: "produtos-radar",
    swatches: [
      { step: "1", hex: "#ef7d18", surface: "bg-ads-produtos-radar-1", text: "text-ads-produtos-radar-1", border: "border-ads-produtos-radar-1" },
      { step: "2", hex: "#07509f", surface: "bg-ads-produtos-radar-2", text: "text-ads-produtos-radar-2", border: "border-ads-produtos-radar-2" },
      { step: "3", hex: "#009159", surface: "bg-ads-produtos-radar-3", text: "text-ads-produtos-radar-3", border: "border-ads-produtos-radar-3" },
      { step: "4", hex: "#5a2d87", surface: "bg-ads-produtos-radar-4", text: "text-ads-produtos-radar-4", border: "border-ads-produtos-radar-4" },
      { step: "5", hex: "#ff5410", surface: "bg-ads-produtos-radar-5", text: "text-ads-produtos-radar-5", border: "border-ads-produtos-radar-5" },
      { step: "6", hex: "#050505", surface: "bg-ads-produtos-radar-6", text: "text-ads-produtos-radar-6", border: "border-ads-produtos-radar-6" },
      { step: "7", hex: "#c2113b", surface: "bg-ads-produtos-radar-7", text: "text-ads-produtos-radar-7", border: "border-ads-produtos-radar-7" },
      { step: "8", hex: "#8c6bfa", surface: "bg-ads-produtos-radar-8", text: "text-ads-produtos-radar-8", border: "border-ads-produtos-radar-8" },
      { step: "9", hex: "#0091ff", surface: "bg-ads-produtos-radar-9", text: "text-ads-produtos-radar-9", border: "border-ads-produtos-radar-9" },
      { step: "10", hex: "#8b89c9", surface: "bg-ads-produtos-radar-10", text: "text-ads-produtos-radar-10", border: "border-ads-produtos-radar-10" },
      { step: "11", hex: "#007a93", surface: "bg-ads-produtos-radar-11", text: "text-ads-produtos-radar-11", border: "border-ads-produtos-radar-11" },
    ],
  },
];
