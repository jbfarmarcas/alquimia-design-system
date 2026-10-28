import { CalendarDate, isEqualMonth, parseDate } from "@internationalized/date";

const DATE_ONLY_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export type CalendarDateRangeValue = {
  start: CalendarDate;
  end?: CalendarDate;
};

export function dateStringToCalendarDate(
  value: string,
): CalendarDate | undefined {
  if (!DATE_ONLY_REGEX.test(value)) return undefined;
  return parseDate(value);
}

export function calendarDateToDateString(value: CalendarDate): string {
  return value.toString();
}

export function dateStringsToCalendarRange(
  start: string,
  end: string,
): CalendarDateRangeValue | undefined {
  const startDate = dateStringToCalendarDate(start);
  if (!startDate) return undefined;

  const endDate = dateStringToCalendarDate(end);
  if (!endDate) return { start: startDate };

  return { start: startDate, end: endDate };
}

export function calendarRangeToDateStrings(
  range: CalendarDateRangeValue,
): { start: string; end: string } {
  return {
    start: calendarDateToDateString(range.start),
    end: range.end ? calendarDateToDateString(range.end) : "",
  };
}

export function isCalendarDateRange(
  value: CalendarDate | CalendarDateRangeValue | undefined,
): value is CalendarDateRangeValue {
  return Boolean(value && typeof value === "object" && "start" in value);
}

/**
 * A seleção emite a data clicada como placeholder. Se ela já está
 * num dos dois meses visíveis, o par permanece. Só troca a janela
 * quando a data cai fora dela.
 */
export function visibleMonthAfterPlaceholder(
  currentLeft: CalendarDate,
  incoming: CalendarDate,
): CalendarDate {
  const left = currentLeft.set({ day: 1 });
  const right = left.add({ months: 1 });
  if (isEqualMonth(incoming, left) || isEqualMonth(incoming, right)) return left;
  return incoming.set({ day: 1 });
}

export function shiftVisibleMonth(
  currentLeft: CalendarDate,
  delta: -1 | 1,
  min?: CalendarDate,
  max?: CalendarDate,
): CalendarDate {
  const left = currentLeft.set({ day: 1 });
  const next = left.add({ months: delta });
  if (delta < 0 && min) {
    const lastOfTarget = next.add({ months: 1 }).subtract({ days: 1 });
    if (lastOfTarget.compare(min) < 0) return left;
  }
  if (delta > 0 && max && next.add({ months: 1 }).compare(max) > 0) return left;
  return next;
}

export function isOutsideMaximumWindow(
  date: CalendarDate,
  anchor: CalendarDate,
  maximumDays: number,
): boolean {
  const earliest = anchor.subtract({ days: maximumDays - 1 });
  const latest = anchor.add({ days: maximumDays - 1 });
  return date.compare(earliest) < 0 || date.compare(latest) > 0;
}

export function inclusiveCalendarDays(
  start: CalendarDate,
  end: CalendarDate,
): number {
  const [from, to] = start.compare(end) <= 0 ? [start, end] : [end, start];
  const milliseconds = to.toDate("UTC").getTime() - from.toDate("UTC").getTime();
  return Math.round(milliseconds / 86_400_000) + 1;
}

export function calendarMonthTitle(
  date: CalendarDate,
  locale = "pt-BR",
): string {
  const label = new Intl.DateTimeFormat(locale, {
    month: "long",
    timeZone: "UTC",
  }).format(date.toDate("UTC"));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function calendarRangesEqual(
  left: CalendarDate | CalendarDateRangeValue | undefined,
  right: CalendarDate | CalendarDateRangeValue | undefined,
): boolean {
  if (left === right) return true;
  if (!left || !right) return !left && !right;

  if (isCalendarDateRange(left) && isCalendarDateRange(right)) {
    const leftEnd = left.end?.toString() ?? "";
    const rightEnd = right.end?.toString() ?? "";
    return left.start.toString() === right.start.toString() && leftEnd === rightEnd;
  }

  if (!isCalendarDateRange(left) && !isCalendarDateRange(right)) {
    return left.toString() === right.toString();
  }

  return false;
}
