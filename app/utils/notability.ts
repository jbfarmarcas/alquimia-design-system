const NOTABILITY_LABELS: Record<string, string> = {
  traffic: "Gerador de Tráfego",
  image: "Formador de Imagem",
  profit: "Gerador de Lucro",
};

export const formatNotability = (notability: string): string =>
  NOTABILITY_LABELS[notability] ?? notability;
