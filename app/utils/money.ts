export const numberToBRL = (
  price: number | undefined | null,
  withSignal = false
): string => {
  if (price == null) return "-";

  const sign = price < 0 ? "-" : withSignal && price > 0 ? "+" : "";
  const value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Math.abs(price));

  return `R$ ${sign}${value.replace("R$", "").trim()}`;
};

const MILLION = 1_000_000;
const THOUSAND = 1_000;

const COMPACT_DECIMAL_FORMATTER = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const numberToCompactBRL = (
  value: number | undefined | null,
): string => {
  if (value == null || Number.isNaN(value)) return "-";

  const sign = value < 0 ? "-" : "";
  const absolute = Math.abs(value);

  if (absolute >= MILLION) {
    return `R$ ${sign}${COMPACT_DECIMAL_FORMATTER.format(absolute / MILLION)}MM`;
  }

  if (absolute >= THOUSAND) {
    return `R$ ${sign}${COMPACT_DECIMAL_FORMATTER.format(absolute / THOUSAND)}M`;
  }

  return numberToBRL(value);
};

export const parseStringMoneyToFloat = (value: string): number | null => {
  if (!value || typeof value !== "string") return null;
  const cleanValue = value.replace(/[^\d,.-]/g, "");
  if (!cleanValue) return null;
  const normalizedValue = cleanValue.replace(",", ".");
  const parsed = parseFloat(normalizedValue);
  return Number.isNaN(parsed) ? null : parsed;
};

const BRL_INPUT_FORMATTER = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Formata valor numérico para exibição em input monetário (padrão R$).
 * pt-BR: vírgula decimal, ponto milhares, 2 decimais. Sem símbolo R$.
 * Use o valor retornado apenas para exibição; persista sempre o número.
 */
export function formatPriceInput(value?: number | null): string {
  if (value === undefined || value === null || Number.isNaN(value)) return "";
  return BRL_INPUT_FORMATTER.format(Number(value.toFixed(2)));
}

/**
 * Converte o valor digitado em máscara monetária para número em reais.
 * Sanitiza (apenas dígitos), interpreta como centavos (últimos 2 = decimais)
 * e retorna valor para persistência no backend.
 */
export function parsePriceInput(value: string | number): number {
  if (typeof value === "number" && !Number.isNaN(value))
    return Math.round(value * 100) / 100;
  const digits = String(value ?? "").replace(/\D/g, "");
  return parseInt(digits || "0", 10) / 100;
}
