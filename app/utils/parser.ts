export const parseToPercentage = (value: number) =>
  Number((value * 100).toFixed(2));

export const parsePercentageToFloat = (value: string | number) => {
  if (typeof value === "string") {
    value = value.replace(",", ".");
    return Number(value) / 100;
  }
  return value / 100;
};

export const parseFloatToDecimal = (value: number) => {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const DATE_ONLY_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const BUSINESS_CALENDAR_TIMEZONE = "America/Sao_Paulo";

const getCalendarPart = (
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes,
): string | undefined => parts.find((part) => part.type === type)?.value;

export function getTodayDateString(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_CALENDAR_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const year = getCalendarPart(parts, "year");
  const month = getCalendarPart(parts, "month");
  const day = getCalendarPart(parts, "day");

  if (!year || !month || !day) {
    throw new Error(
      "Não foi possível obter a data civil em America/Sao_Paulo",
    );
  }

  return `${year}-${month}-${day}`;
}

export function toDateOnlyString(dateStr: string): string {
  return dateStr.includes("T") ? dateStr.slice(0, 10) : dateStr;
}

export const extractDateOnly = (value: string | Date): string => {
  if (typeof value === "string") {
    if (DATE_ONLY_REGEX.test(value)) return value;
    const iso = value.trim();
    if (iso.length >= 10) return iso.slice(0, 10);
    return "";
  }
  const iso = value.toISOString();
  return iso.slice(0, 10);
};


export const formatDateOnlyToPtBr = (value: string | Date): string => {
  const yyyyMmDd = extractDateOnly(value);
  if (!yyyyMmDd || !DATE_ONLY_REGEX.test(yyyyMmDd)) return "";

  const [y, m, d] = yyyyMmDd.split("-").map(Number);
  const day = String(d).padStart(2, "0");
  const month = String(m).padStart(2, "0");
  const year = String(y);

  return `${day}/${month}/${year}`;
};

export const daysBetweenDateOnly = (start: string, end: string): number => {
  const startStr = extractDateOnly(start);
  const endStr = extractDateOnly(end);
  if (!startStr || !endStr) return 0;

  const startDate = new Date(startStr + "T12:00:00");
  const endDate = new Date(endStr + "T12:00:00");
  const diffMs = endDate.getTime() - startDate.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
};

export const daysFromTodayToDateOnly = (isoOrDateStr: string): number => {
  const endStr = extractDateOnly(isoOrDateStr);
  if (!endStr) return 0;

  const todayStr = getTodayDateString();
  const todayNoon = new Date(todayStr + "T12:00:00");
  const endNoon = new Date(endStr + "T12:00:00");
  const diffMs = endNoon.getTime() - todayNoon.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
};

export const formatDateToPtBr = (date: Date | string, onlyDate = false): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  if (onlyDate) {
    return d.toLocaleDateString("pt-BR");
  }

  return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
};

export const normalizePercentage = (
  value: string | number | undefined,
  fallback?: number
): number => {
  if (value === undefined || value === null || value === "") {
    return fallback ?? 0;
  }

  if (typeof value === "string") {
    const numericValue = Number(value.replace(",", "."));
    if (Number.isNaN(numericValue)) {
      return fallback ?? 0;
    }
    return parsePercentageToFloat(numericValue);
  }

  if (typeof value === "number") {
    return parsePercentageToFloat(value);
  }

  return fallback ?? 0;
};
