const NOTABILITY_LABELS: Record<string, string> = {
  traffic: "Geradores de Tráfego",
  image: "Formadores de Imagem",
  profit: "Geradores de Lucro",
};

export const formatNotability = (notability: string): string =>
  NOTABILITY_LABELS[notability] ?? notability;
