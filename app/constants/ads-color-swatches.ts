export type AdsColorSwatch = {
  step: string;
  hex: string;
  surface: string;
};

export type AdsColorGroup = {
  name: string;
  swatches: AdsColorSwatch[];
};

/** Classes completas para o Tailwind enxergar cada amostra. */
export const adsColorGroups: AdsColorGroup[] = [
  {
    name: "Radar Pricing",
    swatches: [
      { step: "25", hex: "#e4f2ff", surface: "bg-[#e4f2ff]" },
      { step: "50", hex: "#c7e4ff", surface: "bg-[#c7e4ff]" },
      { step: "100", hex: "#89c9ff", surface: "bg-[#89c9ff]" },
      { step: "200", hex: "#50b3ff", surface: "bg-[#50b3ff]" },
      { step: "400", hex: "#0091ff", surface: "bg-[#0091ff]" },
      { step: "500", hex: "#006ff7", surface: "bg-[#006ff7]" },
      { step: "600", hex: "#074ac6", surface: "bg-[#074ac6]" },
      { step: "800", hex: "#00389e", surface: "bg-[#00389e]" },
    ],
  },
  {
    name: "Radar Base",
    swatches: [
      { step: "100", hex: "#3f4457", surface: "bg-[#3f4457]" },
      { step: "200", hex: "#2e3342", surface: "bg-[#2e3342]" },
      { step: "500", hex: "#212631", surface: "bg-[#212631]" },
      { step: "600", hex: "#1b2029", surface: "bg-[#1b2029]" },
      { step: "900", hex: "#161b22", surface: "bg-[#161b22]" },
    ],
  },
  {
    name: "Neutro claro",
    swatches: [
      { step: "0", hex: "#ffffff", surface: "bg-[#ffffff]" },
      { step: "10", hex: "#fafbfc", surface: "bg-[#fafbfc]" },
      { step: "20", hex: "#f0f3f6", surface: "bg-[#f0f3f6]" },
      { step: "30", hex: "#e5e8eb", surface: "bg-[#e5e8eb]" },
      { step: "40", hex: "#d3d8dd", surface: "bg-[#d3d8dd]" },
      { step: "50", hex: "#c1c7d0", surface: "bg-[#c1c7d0]" },
    ],
  },
  {
    name: "Neutro médio",
    swatches: [
      { step: "60", hex: "#b3bac5", surface: "bg-[#b3bac5]" },
      { step: "70", hex: "#a5adba", surface: "bg-[#a5adba]" },
      { step: "80", hex: "#97a0af", surface: "bg-[#97a0af]" },
      { step: "90", hex: "#8993a4", surface: "bg-[#8993a4]" },
      { step: "100", hex: "#7a869a", surface: "bg-[#7a869a]" },
      { step: "200", hex: "#6b778c", surface: "bg-[#6b778c]" },
      { step: "300", hex: "#5e6c84", surface: "bg-[#5e6c84]" },
      { step: "400", hex: "#505f79", surface: "bg-[#505f79]" },
    ],
  },
  {
    name: "Neutro escuro",
    swatches: [
      { step: "500", hex: "#42526e", surface: "bg-[#42526e]" },
      { step: "600", hex: "#344563", surface: "bg-[#344563]" },
      { step: "700", hex: "#253858", surface: "bg-[#253858]" },
      { step: "800", hex: "#172b4d", surface: "bg-[#172b4d]" },
      { step: "900", hex: "#061938", surface: "bg-[#061938]" },
    ],
  },
  {
    name: "Sucesso",
    swatches: [
      { step: "100", hex: "#c3ffe6", surface: "bg-[#c3ffe6]" },
      { step: "200", hex: "#7fffcb", surface: "bg-[#7fffcb]" },
      { step: "300", hex: "#32feaa", surface: "bg-[#32feaa]" },
      { step: "400", hex: "#06eb8f", surface: "bg-[#06eb8f]" },
      { step: "500", hex: "#15c57e", surface: "bg-[#15c57e]" },
      { step: "600", hex: "#1c9f6a", surface: "bg-[#1c9f6a]" },
      { step: "700", hex: "#157850", surface: "bg-[#157850]" },
      { step: "800", hex: "#0e5a3b", surface: "bg-[#0e5a3b]" },
    ],
  },
  {
    name: "Warning",
    swatches: [
      { step: "100", hex: "#ffbdcd", surface: "bg-[#ffbdcd]" },
      { step: "200", hex: "#ff87a4", surface: "bg-[#ff87a4]" },
      { step: "300", hex: "#ff507a", surface: "bg-[#ff507a]" },
      { step: "400", hex: "#ef164a", surface: "bg-[#ef164a]" },
      { step: "500", hex: "#dc0034", surface: "bg-[#dc0034]" },
      { step: "600", hex: "#c0012e", surface: "bg-[#c0012e]" },
      { step: "700", hex: "#9e062a", surface: "bg-[#9e062a]" },
      { step: "800", hex: "#840221", surface: "bg-[#840221]" },
    ],
  },
  {
    name: "Atenção",
    swatches: [
      { step: "100", hex: "#ffe7b9", surface: "bg-[#ffe7b9]" },
      { step: "200", hex: "#ffdc82", surface: "bg-[#ffdc82]" },
      { step: "300", hex: "#ffca43", surface: "bg-[#ffca43]" },
      { step: "400", hex: "#ffb905", surface: "bg-[#ffb905]" },
      { step: "500", hex: "#e9a700", surface: "bg-[#e9a700]" },
      { step: "600", hex: "#ce9300", surface: "bg-[#ce9300]" },
      { step: "700", hex: "#ad7b00", surface: "bg-[#ad7b00]" },
      { step: "800", hex: "#8f6600", surface: "bg-[#8f6600]" },
    ],
  },
  {
    name: "Inovação",
    swatches: [
      { step: "100", hex: "#cabaff", surface: "bg-[#cabaff]" },
      { step: "200", hex: "#b19aff", surface: "bg-[#b19aff]" },
      { step: "300", hex: "#9e80ff", surface: "bg-[#9e80ff]" },
      { step: "400", hex: "#825cff", surface: "bg-[#825cff]" },
      { step: "500", hex: "#7349ff", surface: "bg-[#7349ff]" },
      { step: "600", hex: "#613dda", surface: "bg-[#613dda]" },
      { step: "700", hex: "#4c30a8", surface: "bg-[#4c30a8]" },
      { step: "800", hex: "#3c287c", surface: "bg-[#3c287c]" },
    ],
  },
  {
    name: "Oportunidade",
    swatches: [
      { step: "100", hex: "#c4f5ff", surface: "bg-[#c4f5ff]" },
      { step: "200", hex: "#79e9ff", surface: "bg-[#79e9ff]" },
      { step: "300", hex: "#49d8f4", surface: "bg-[#49d8f4]" },
      { step: "400", hex: "#04c8ef", surface: "bg-[#04c8ef]" },
      { step: "500", hex: "#05b4d8", surface: "bg-[#05b4d8]" },
      { step: "600", hex: "#01a0bf", surface: "bg-[#01a0bf]" },
      { step: "700", hex: "#007a93", surface: "bg-[#007a93]" },
      { step: "800", hex: "#006478", surface: "bg-[#006478]" },
    ],
  },
  {
    name: "Void",
    swatches: [
      { step: "100", hex: "#cfdef3", surface: "bg-[#cfdef3]" },
      { step: "200", hex: "#b4c5df", surface: "bg-[#b4c5df]" },
      { step: "300", hex: "#91a2bb", surface: "bg-[#91a2bb]" },
      { step: "400", hex: "#738298", surface: "bg-[#738298]" },
      { step: "500", hex: "#556171", surface: "bg-[#556171]" },
      { step: "600", hex: "#3c434e", surface: "bg-[#3c434e]" },
      { step: "700", hex: "#282c34", surface: "bg-[#282c34]" },
      { step: "800", hex: "#0e1013", surface: "bg-[#0e1013]" },
    ],
  },
  {
    name: "Gráfico C1",
    swatches: [
      { step: "100", hex: "#f8b4ff", surface: "bg-[#f8b4ff]" },
      { step: "200", hex: "#f58eff", surface: "bg-[#f58eff]" },
      { step: "300", hex: "#ee60fb", surface: "bg-[#ee60fb]" },
      { step: "400", hex: "#e837f9", surface: "bg-[#e837f9]" },
      { step: "500", hex: "#cc1fdd", surface: "bg-[#cc1fdd]" },
      { step: "600", hex: "#b121be", surface: "bg-[#b121be]" },
      { step: "700", hex: "#951fa0", surface: "bg-[#951fa0]" },
      { step: "800", hex: "#76197e", surface: "bg-[#76197e]" },
    ],
  },
  {
    name: "Gráfico C3",
    swatches: [
      { step: "100", hex: "#ffb0b0", surface: "bg-[#ffb0b0]" },
      { step: "200", hex: "#ff8e8e", surface: "bg-[#ff8e8e]" },
      { step: "300", hex: "#ff7272", surface: "bg-[#ff7272]" },
      { step: "400", hex: "#f76565", surface: "bg-[#f76565]" },
      { step: "500", hex: "#e46161", surface: "bg-[#e46161]" },
      { step: "600", hex: "#cc5252", surface: "bg-[#cc5252]" },
      { step: "700", hex: "#b54444", surface: "bg-[#b54444]" },
      { step: "800", hex: "#983a3a", surface: "bg-[#983a3a]" },
    ],
  },
  {
    name: "Gráfico C4",
    swatches: [
      { step: "100", hex: "#b6ffca", surface: "bg-[#b6ffca]" },
      { step: "200", hex: "#86e7a2", surface: "bg-[#86e7a2]" },
      { step: "300", hex: "#4bd973", surface: "bg-[#4bd973]" },
      { step: "400", hex: "#1ac44a", surface: "bg-[#1ac44a]" },
      { step: "500", hex: "#24ab4a", surface: "bg-[#24ab4a]" },
      { step: "600", hex: "#1c8f3d", surface: "bg-[#1c8f3d]" },
      { step: "700", hex: "#167130", surface: "bg-[#167130]" },
      { step: "800", hex: "#115825", surface: "bg-[#115825]" },
    ],
  },
  {
    name: "Gráfico C5",
    swatches: [
      { step: "100", hex: "#a2baff", surface: "bg-[#a2baff]" },
      { step: "200", hex: "#8ca5ee", surface: "bg-[#8ca5ee]" },
      { step: "300", hex: "#768dd0", surface: "bg-[#768dd0]" },
      { step: "400", hex: "#677bb6", surface: "bg-[#677bb6]" },
      { step: "500", hex: "#546596", surface: "bg-[#546596]" },
      { step: "600", hex: "#445279", surface: "bg-[#445279]" },
      { step: "700", hex: "#374261", surface: "bg-[#374261]" },
      { step: "800", hex: "#252c41", surface: "bg-[#252c41]" },
    ],
  },
  {
    name: "Produtos Radar",
    swatches: [
      { step: "1", hex: "#ef7d18", surface: "bg-[#ef7d18]" },
      { step: "2", hex: "#07509f", surface: "bg-[#07509f]" },
      { step: "3", hex: "#009159", surface: "bg-[#009159]" },
      { step: "4", hex: "#5a2d87", surface: "bg-[#5a2d87]" },
      { step: "5", hex: "#ff5410", surface: "bg-[#ff5410]" },
      { step: "6", hex: "#050505", surface: "bg-[#050505]" },
      { step: "7", hex: "#c2113b", surface: "bg-[#c2113b]" },
      { step: "8", hex: "#8c6bfa", surface: "bg-[#8c6bfa]" },
      { step: "9", hex: "#0091ff", surface: "bg-[#0091ff]" },
      { step: "10", hex: "#8b89c9", surface: "bg-[#8b89c9]" },
      { step: "11", hex: "#007a93", surface: "bg-[#007a93]" },
    ],
  },
];
