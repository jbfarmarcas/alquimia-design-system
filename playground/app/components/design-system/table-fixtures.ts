type NotabilityType = "image" | "traffic" | "profit";

/** Valores de exemplo do catálogo de tabelas. Não vêm da API. */

export type DemoStoreRow = {
  id: string;
  name: string;
  address: string;
  status: "pending" | "done";
  competitors: number;
  origin: "imported" | "manual" | null;
  updated: string;
};

export const demoStores: DemoStoreRow[] = [
  { id: "1", name: "Loja Centro", address: "Rua XV de Novembro, 1200, Curitiba", status: "done", competitors: 6, origin: "imported", updated: "Atualizado hoje" },
  { id: "2", name: "Loja Batel", address: "Av. do Batel, 1868, Curitiba", status: "done", competitors: 4, origin: "manual", updated: "Atualizado ontem" },
  { id: "3", name: "Loja Água Verde", address: "Av. República Argentina, 2403, Curitiba", status: "pending", competitors: 0, origin: null, updated: "" },
  { id: "4", name: "Loja Portão", address: "Av. Presidente Kennedy, 4121, Curitiba", status: "done", competitors: 5, origin: "imported", updated: "Há 12 dias" },
];

export type DemoProductRow = {
  id: number;
  description: string;
  notability: NotabilityType;
  status: "pending" | "resolved";
  currentPrice: number;
  finalPrice: number;
  margin: number;
};

export const demoProducts: DemoProductRow[] = [
  { id: 1001, description: "Dipirona 500mg 10 comprimidos", notability: "traffic", status: "pending", currentPrice: 8.9, finalPrice: 9.49, margin: 0.31 },
  { id: 1002, description: "Protetor solar FPS 50 200ml", notability: "image", status: "pending", currentPrice: 64.9, finalPrice: 59.9, margin: 0.38 },
  { id: 1003, description: "Vitamina C 1g efervescente 10 unidades", notability: "profit", status: "resolved", currentPrice: 21.5, finalPrice: 21.5, margin: 0.44 },
  { id: 1004, description: "Fralda infantil G 36 unidades", notability: "traffic", status: "pending", currentPrice: 72.9, finalPrice: 69.9, margin: 0.22 },
  { id: 1005, description: "Shampoo anticaspa 200ml", notability: "profit", status: "pending", currentPrice: 32.9, finalPrice: 34.9, margin: 0.41 },
];

export type DemoResearchRow = {
  id: number;
  description: string;
  notability: NotabilityType;
  myPrice: number;
  average: number;
  ic: number;
  drogasil: number | null;
  raia: number | null;
  pagueMenos: number | null;
  iqvia: number | null;
  closeUp: number | null;
};

export const demoResearch: DemoResearchRow[] = [
  { id: 1, description: "Dipirona 500mg 10 comprimidos", notability: "traffic", myPrice: 8.9, average: 9.12, ic: 102.5, drogasil: 9.5, raia: 8.4, pagueMenos: 9.45, iqvia: 8.7, closeUp: 9.1 },
  { id: 2, description: "Protetor solar FPS 50 200ml", notability: "image", myPrice: 64.9, average: 61.3, ic: 94.5, drogasil: 59.9, raia: 62.9, pagueMenos: null, iqvia: 63.2, closeUp: 60.1 },
  { id: 3, description: "Vitamina C 1g efervescente 10 unidades", notability: "profit", myPrice: 21.5, average: 22.8, ic: 106, drogasil: 23.9, raia: 21.9, pagueMenos: 22.6, iqvia: 22.1, closeUp: null },
  { id: 4, description: "Fralda infantil G 36 unidades", notability: "traffic", myPrice: 72.9, average: 70.4, ic: 96.6, drogasil: 69.9, raia: 71.5, pagueMenos: 69.8, iqvia: 71, closeUp: 70.2 },
];

export type DemoCompetitivenessRow = {
  id: string;
  store: string;
  uf: string;
  drogasil: number | null;
  raia: number | null;
  pagueMenos: number | null;
  nissei: number | null;
  total: number;
  cluster: string;
};

export const demoCompetitiveness: DemoCompetitivenessRow[] = [
  { id: "1", store: "Loja Centro", uf: "PR", drogasil: 104, raia: 97, pagueMenos: 101, nissei: 99, total: 100.3, cluster: "Cluster A" },
  { id: "2", store: "Loja Batel", uf: "PR", drogasil: 108, raia: 102, pagueMenos: null, nissei: 105, total: 105, cluster: "Cluster A" },
  { id: "3", store: "Loja Joinville", uf: "SC", drogasil: 95, raia: 92, pagueMenos: 98, nissei: null, total: 95, cluster: "Cluster B" },
];

export const demoCompetitivenessTotals = { drogasil: 102.3, raia: 97, pagueMenos: 99.5, nissei: 102, total: 100.1 };

export type DemoTreeRow = {
  name: string;
  revenue: number;
  revenueSimulated: number;
  profit: number;
  profitSimulated: number;
  ic: number;
  icSimulated: number;
  raise: number;
  reduce: number;
  keep: number;
  children?: DemoTreeRow[];
};

export const demoTree: DemoTreeRow[] = [
  {
    name: "Medicamentos",
    revenue: 120000, revenueSimulated: 128000, profit: 40000, profitSimulated: 44000, ic: 98, icSimulated: 101, raise: 23, reduce: 9, keep: 16,
    children: [
      {
        name: "Analgésicos",
        revenue: 48000, revenueSimulated: 50500, profit: 15800, profitSimulated: 17100, ic: 97, icSimulated: 100, raise: 19, reduce: 7, keep: 13,
        children: [
          { name: "Dor e febre", revenue: 30000, revenueSimulated: 31800, profit: 9900, profitSimulated: 10800, ic: 96, icSimulated: 99, raise: 12, reduce: 4, keep: 8 },
          { name: "Anti-inflamatórios", revenue: 18000, revenueSimulated: 18700, profit: 5900, profitSimulated: 6300, ic: 99, icSimulated: 102, raise: 7, reduce: 3, keep: 5 },
        ],
      },
      { name: "Vitaminas", revenue: 72000, revenueSimulated: 77500, profit: 24200, profitSimulated: 26900, ic: 99, icSimulated: 102, raise: 4, reduce: 2, keep: 3 },
    ],
  },
  {
    name: "Perfumaria",
    revenue: 64000, revenueSimulated: 62900, profit: 25600, profitSimulated: 24800, ic: 103, icSimulated: 101, raise: 8, reduce: 2, keep: 5,
    children: [
      { name: "Proteção solar", revenue: 40000, revenueSimulated: 39100, profit: 16400, profitSimulated: 15700, ic: 104, icSimulated: 101, raise: 3, reduce: 1, keep: 2 },
      { name: "Cabelo", revenue: 24000, revenueSimulated: 23800, profit: 9200, profitSimulated: 9100, ic: 101, icSimulated: 100, raise: 5, reduce: 1, keep: 3 },
    ],
  },
];

export type DemoEditableRow = {
  key: string;
  category: string;
  department: string;
  revenue: number;
  currentMargin: number;
  targetMargin: string;
  role: string | undefined;
};

export const demoEditable: DemoEditableRow[] = [
  { key: "a", category: "Dor e febre", department: "Medicamentos", revenue: 30000, currentMargin: 0.33, targetMargin: "35", role: "routine" },
  { key: "b", category: "Proteção solar", department: "Perfumaria", revenue: 40000, currentMargin: 0.41, targetMargin: "40", role: "seasonal" },
  { key: "c", category: "Fraldas", department: "Infantil", revenue: 52000, currentMargin: 0.19, targetMargin: "22", role: "destination" },
];

export type DemoSummaryRow = {
  notability: NotabilityType;
  label: string;
  products: number;
  productShare: number;
  revenue: number;
  revenueShare: number;
};

export const demoSummary: DemoSummaryRow[] = [
  { notability: "traffic", label: "Tráfego", products: 320, productShare: 0.16, revenue: 1840000, revenueShare: 0.46 },
  { notability: "image", label: "Imagem", products: 180, productShare: 0.09, revenue: 760000, revenueShare: 0.19 },
  { notability: "profit", label: "Lucro", products: 1500, productShare: 0.75, revenue: 1400000, revenueShare: 0.35 },
];

export const demoPreviewHeaders = ["EAN", "Descrição", "Concorrente", "Preço", "Data da coleta", "Observação"];

export const demoPreviewRows: Record<string, string>[] = [
  { c0: "7891058017392", c1: "Dipirona 500mg 10 comprimidos", c2: "Drogasil Batel", c3: "9,50", c4: "21/10/2026", c5: "Preço de gôndola" },
  { c0: "7896004703398", c1: "Protetor solar FPS 50 200ml", c2: "Raia Centro", c3: "62,90", c4: "21/10/2026", c5: "" },
  { c0: "7891721201035", c1: "Vitamina C 1g efervescente 10 unidades", c2: "Pague Menos Portão", c3: "22,60", c4: "22/10/2026", c5: "Promoção leve 3 pague 2" },
];
