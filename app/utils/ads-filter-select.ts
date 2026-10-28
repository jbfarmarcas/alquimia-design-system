/** Reticências a partir deste tamanho. A tooltip só entra quando o rótulo passa daqui. */
export const ADS_FILTER_LABEL_LIMIT = 22;

export const ADS_FILTER_MONTHS = [
  { short: "Jan", full: "Janeiro" },
  { short: "Fev", full: "Fevereiro" },
  { short: "Mar", full: "Março" },
  { short: "Abr", full: "Abril" },
  { short: "Mai", full: "Maio" },
  { short: "Jun", full: "Junho" },
  { short: "Jul", full: "Julho" },
  { short: "Ago", full: "Agosto" },
  { short: "Set", full: "Setembro" },
  { short: "Out", full: "Outubro" },
  { short: "Nov", full: "Novembro" },
  { short: "Dez", full: "Dezembro" },
] as const;

export interface AdsFilterOption {
  value: string;
  label: string;
}

export const toAdsFilterOptions = (
  items: readonly {
    id?: string;
    value?: string;
    name?: string;
    label?: string;
  }[],
): AdsFilterOption[] =>
  items.map((item) => ({
    value: item.value ?? item.id ?? "",
    label: item.label ?? item.name ?? "",
  }));

export type AdsFilterType = "checkbox" | "radio" | "month";
export type AdsFilterCheckState = "all" | "none" | "partial";

const MONTH_VALUE = /^(\d{4})-(\d{2})$/;

export const truncateFilterLabel = (
  label: string,
  limit = ADS_FILTER_LABEL_LIMIT,
): string => {
  if (label.length <= limit) return label;
  return `${label.slice(0, limit)}...`;
};

export const filterLabelNeedsTooltip = (
  label: string,
  limit = ADS_FILTER_LABEL_LIMIT,
): boolean => label.length > limit;

export const normalizeFilterQuery = (query: string): string =>
  query.trim().toLocaleLowerCase("pt-BR");

export const groupFilterOptions = (
  options: readonly AdsFilterOption[],
  query: string,
): { exact: AdsFilterOption[]; matches: AdsFilterOption[]; empty: boolean } => {
  const normalized = normalizeFilterQuery(query);
  if (!normalized) {
    return { exact: [], matches: [...options], empty: false };
  }

  const exact: AdsFilterOption[] = [];
  const matches: AdsFilterOption[] = [];
  for (const option of options) {
    const label = option.label.toLocaleLowerCase("pt-BR");
    if (label === normalized) exact.push(option);
    else if (label.includes(normalized)) matches.push(option);
  }

  return {
    exact,
    matches,
    empty: exact.length === 0 && matches.length === 0,
  };
};

export const selectionCheckState = (
  selected: readonly string[],
  options: readonly AdsFilterOption[],
): AdsFilterCheckState => {
  if (options.length === 0) return "none";

  const selectedSet = new Set(selected);
  let count = 0;
  for (const option of options) {
    if (selectedSet.has(option.value)) count += 1;
  }

  if (count === 0) return "none";
  if (count === options.length) return "all";
  return "partial";
};

export const toggleFilterValue = (
  selected: readonly string[],
  value: string,
): string[] =>
  selected.includes(value)
    ? selected.filter((item) => item !== value)
    : [...selected, value];

export const toggleSelectAll = (
  selected: readonly string[],
  options: readonly AdsFilterOption[],
): string[] => {
  if (selectionCheckState(selected, options) === "all") return [];
  return options.map((option) => option.value);
};

export const parseMonthValue = (
  value: string,
): { year: number; monthIndex: number } | null => {
  const match = MONTH_VALUE.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  if (month < 1 || month > 12) return null;
  return { year, monthIndex: month - 1 };
};

export const formatMonthValue = (year: number, monthIndex: number): string =>
  `${year}-${String(monthIndex + 1).padStart(2, "0")}`;

export const monthTriggerLabel = (value: string, placeholder: string): string => {
  const parsed = parseMonthValue(value);
  if (!parsed) return placeholder;
  return ADS_FILTER_MONTHS[parsed.monthIndex]?.full ?? placeholder;
};

const selectedCountLabel = (count: number): string =>
  count === 1 ? "1 selecionado" : `${count} selecionados`;

export const filterTriggerLabel = (params: {
  type: AdsFilterType;
  value: string | readonly string[];
  options: readonly AdsFilterOption[];
  placeholder: string;
  allSelectedLabel: string;
}): string => {
  if (params.type === "month") {
    const current = typeof params.value === "string" ? params.value : "";
    return monthTriggerLabel(current, params.placeholder);
  }

  if (params.type === "radio") {
    const current = typeof params.value === "string" ? params.value : "";
    if (!current) return params.placeholder;
    return (
      params.options.find((option) => option.value === current)?.label ??
      params.placeholder
    );
  }

  const selected = Array.isArray(params.value) ? [...params.value] : [];
  if (selectionCheckState(selected, params.options) === "all") {
    return params.allSelectedLabel;
  }
  if (selected.length === 0) return params.placeholder;
  if (selected.length === 1) {
    return (
      params.options.find((option) => option.value === selected[0])?.label ??
      selectedCountLabel(1)
    );
  }
  return selectedCountLabel(selected.length);
};
