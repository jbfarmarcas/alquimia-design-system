<script setup lang="ts">
import { isEqualMonth, type CalendarDate } from "@internationalized/date";
import { computed, nextTick, ref, shallowRef, watch } from "vue";
import AdsButton from "./AdsButton.vue";
import { UI_LOCALE_CODE } from "../locale/pt-br";
import { formatDateOnlyToPtBr, getTodayDateString } from "../utils/parser";
import {
  calendarDateToDateString,
  calendarMonthTitle,
  calendarRangeToDateStrings,
  calendarRangesEqual,
  dateStringToCalendarDate,
  dateStringsToCalendarRange,
  inclusiveCalendarDays,
  isCalendarDateRange,
  isOutsideMaximumWindow,
  shiftVisibleMonth,
  visibleMonthAfterPlaceholder,
  type CalendarDateRangeValue,
} from "../utils/calendar-date";

const DATE_PLACEHOLDER = "dd/mm/aaaa";
const RANGE_SEPARATOR = " – ";

const props = withDefaults(
  defineProps<{
    range?: boolean;
    min?: string;
    max?: string;
    disabled?: boolean;
    readonly?: boolean;
    size?: "sm" | "md" | "lg";
    maximumDays?: number;
    class?: string;
  }>(),
  {
    range: false,
    size: "md",
  },
);

const modelValue = defineModel<string>({ default: "" });
const start = defineModel<string>("start", { default: "" });
const end = defineModel<string>("end", { default: "" });

const inputDateRef = useTemplateRef("inputDateRef");
const syncingFromCalendar = ref(false);
const rangeOpen = ref(false);
const rangeCalendarKey = ref(0);
const ignoreDraftUpdates = ref(false);
const rangeSessionStart = ref("");
const rangeSessionEnd = ref("");

type CalendarModel = CalendarDate | CalendarDateRangeValue | undefined;

const calendarModel = shallowRef<CalendarModel>();
const draftRange = shallowRef<CalendarDateRangeValue | undefined>();
const leftPlaceholder = shallowRef<CalendarDate>(
  dateStringToCalendarDate(getTodayDateString())!.set({ day: 1 }),
);

const minCalendarDate = computed(() =>
  props.min ? dateStringToCalendarDate(props.min) : undefined,
);

const maxCalendarDate = computed(() =>
  props.max ? dateStringToCalendarDate(props.max) : undefined,
);

const leftMonth = computed(() => leftPlaceholder.value.set({ day: 1 }));
const rightMonth = computed(() => leftMonth.value.add({ months: 1 }));

const navigationMax = computed(() => {
  const hardMax = maxCalendarDate.value;
  const draft = draftRange.value;
  if (!props.maximumDays || !draft?.start || draft.end) return hardMax;

  const windowEnd = draft.start.add({ days: props.maximumDays - 1 });
  if (!hardMax || windowEnd.compare(hardMax) < 0) return windowEnd;
  return hardMax;
});

const canShiftToPreviousMonth = computed(
  () =>
    shiftVisibleMonth(
      leftPlaceholder.value,
      -1,
      minCalendarDate.value,
      navigationMax.value,
    ).compare(leftMonth.value) !== 0,
);

const canShiftToNextMonth = computed(
  () =>
    shiftVisibleMonth(
      leftPlaceholder.value,
      1,
      minCalendarDate.value,
      navigationMax.value,
    ).compare(leftMonth.value) !== 0,
);

const rangeStepLabel = computed(() => {
  const draft = draftRange.value;
  if (!draft?.start) return "Escolha o início";

  const startLabel = formatDateOnlyToPtBr(calendarDateToDateString(draft.start));
  if (!draft.end) {
    return props.maximumDays
      ? `Escolha o fim. Máximo de ${props.maximumDays} dias.`
      : "Escolha o fim";
  }

  const endLabel = formatDateOnlyToPtBr(calendarDateToDateString(draft.end));
  const days = inclusiveCalendarDays(draft.start, draft.end);
  const dayLabel = days === 1 ? "dia" : "dias";
  return `${startLabel} – ${endLabel} · ${days} ${dayLabel}`;
});

const canApplyRange = computed(
  () => Boolean(draftRange.value?.start && draftRange.value?.end),
);

const rangeDisplayText = computed(() => {
  const startLabel = start.value
    ? formatDateOnlyToPtBr(start.value)
    : DATE_PLACEHOLDER;
  const endLabel = end.value
    ? formatDateOnlyToPtBr(end.value)
    : DATE_PLACEHOLDER;

  if (!start.value && !end.value) {
    return `${DATE_PLACEHOLDER}${RANGE_SEPARATOR}${DATE_PLACEHOLDER}`;
  }

  return `${startLabel}${RANGE_SEPARATOR}${endLabel}`;
});

const popoverReference = computed(() => {
  const input = inputDateRef.value;
  const segments = input?.inputsRef;
  if (!segments?.length) return undefined;
  return segments[segments.length - 1]?.$el;
});

const rangeFieldClass = computed(() => [
  "group relative inline-flex w-full cursor-pointer items-center text-left transition-colors",
  "h-[var(--ads-date-height)] rounded-[var(--ads-date-radius)] px-[var(--ads-date-padding-x)] text-[length:var(--ads-date-font-size)] [font-weight:var(--ads-date-weight)] leading-[var(--ads-date-line-height)] text-[var(--ads-date-text)] bg-[var(--ads-date-background)] ring ring-inset ring-[var(--ads-date-border)]",
  "enabled:hover:ring-[var(--ads-date-hover-border)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ads-date-focus-border)]",
  "disabled:cursor-not-allowed disabled:opacity-75",
  props.class,
]);

const popoverUi = { content: "w-auto max-w-none p-0" };

/**
 * Grade do range no Figma (5712:6691): mês com 258px, 7 colunas de 35,14px e 2px entre elas,
 * linhas de 36px (semana + 5 semanas = 216px) e dia de 32px de altura.
 */
const rangeCalendarUi = {
  body: "flex-row gap-14 space-x-0 space-y-0 pt-0 sm:space-x-0",
  grid: "w-[258px] space-y-0",
  gridWeekDaysRow: "mb-0 h-9 grid-cols-7 items-center gap-x-0.5",
  gridBody: "grid",
  gridRow: "h-9 grid-cols-7 items-center gap-x-0.5",
  cell: "flex h-9 w-full items-center justify-self-stretch",
  cellTrigger: "m-0 h-8 w-full",
};

/** Intl em pt-BR devolve o mês em minúscula ("outubro de 2026"). Só a primeira letra muda; o ano fica igual. */
function capitalizeFirst(value: string) {
  return value ? value.charAt(0).toLocaleUpperCase(UI_LOCALE_CODE) + value.slice(1) : value;
}

/** Cabeçalho do mês no Figma (_Date Picker Header, 5709:19265): Inter Bold 14, linha 130%, text/primary. */
const singleCalendarUi = {
  heading: "text-sm font-bold leading-[1.3] text-[var(--ads-text-primary)]",
};

function monthTitle(date: CalendarDate) {
  return calendarMonthTitle(date, UI_LOCALE_CODE);
}

function onRangePlaceholderUpdate(value: CalendarDate) {
  const next = visibleMonthAfterPlaceholder(leftPlaceholder.value, value);
  if (next.compare(leftPlaceholder.value) !== 0) {
    leftPlaceholder.value = next;
    return;
  }
  if (isEqualMonth(value, leftPlaceholder.value) && value.day === 1) return;
  leftPlaceholder.value = leftPlaceholder.value.copy();
}

function moveVisibleMonth(delta: -1 | 1) {
  const next = shiftVisibleMonth(
    leftPlaceholder.value,
    delta,
    minCalendarDate.value,
    navigationMax.value,
  );
  if (next.compare(leftPlaceholder.value) === 0) return;
  leftPlaceholder.value = next;
}

function weekdayLetter(day: string) {
  return day.replace(".", "").charAt(0).toUpperCase();
}

function applyExternalModels() {
  if (syncingFromCalendar.value || props.range) return;

  const next = dateStringToCalendarDate(modelValue.value);
  if (!calendarRangesEqual(calendarModel.value, next)) {
    calendarModel.value = next;
  }
}

function onCalendarModelUpdate(value: CalendarModel) {
  if (calendarRangesEqual(calendarModel.value, value)) return;

  syncingFromCalendar.value = true;
  calendarModel.value = value;

  if (!props.range && value && !isCalendarDateRange(value)) {
    modelValue.value = calendarDateToDateString(value);
  }

  nextTick(() => {
    syncingFromCalendar.value = false;
  });
}

function resetDraftFromCommitted() {
  draftRange.value = dateStringsToCalendarRange(start.value, end.value);
  const anchor =
    draftRange.value?.start ?? dateStringToCalendarDate(getTodayDateString())!;
  leftPlaceholder.value = anchor.set({ day: 1 });
}

function onDraftUpdate(value: CalendarDateRangeValue | undefined) {
  if (ignoreDraftUpdates.value) return;
  draftRange.value = value;
}

function clearDraft() {
  // Os dois calendários guardam o intervalo por conta própria. Remontar
  // descarta o destaque; o flag ignora o eco desse estado ao desmontar.
  ignoreDraftUpdates.value = true;
  draftRange.value = undefined;
  start.value = "";
  end.value = "";
  rangeCalendarKey.value += 1;
  nextTick(() => {
    draftRange.value = undefined;
    nextTick(() => {
      ignoreDraftUpdates.value = false;
    });
  });
}

function applyDraft(close: () => void) {
  if (!draftRange.value?.start || !draftRange.value.end) return;
  const next = calendarRangeToDateStrings({
    start: draftRange.value.start,
    end: draftRange.value.end,
  });
  start.value = next.start;
  end.value = next.end;
  close();
}

function cancelDraft(close: () => void) {
  start.value = rangeSessionStart.value;
  end.value = rangeSessionEnd.value;
  resetDraftFromCommitted();
  close();
}

watch(rangeOpen, (isOpen) => {
  if (!isOpen) return;
  rangeSessionStart.value = start.value;
  rangeSessionEnd.value = end.value;
  resetDraftFromCommitted();
});

watch([modelValue, start, end, () => props.range], applyExternalModels, {
  immediate: true,
});

function isDateUnavailable(date: CalendarDate) {
  if (minCalendarDate.value && date.compare(minCalendarDate.value) < 0) {
    return true;
  }
  if (maxCalendarDate.value && date.compare(maxCalendarDate.value) > 0) {
    return true;
  }
  if (!props.range || !props.maximumDays) return false;
  const draft = draftRange.value;
  if (!draft?.start || draft.end) return false;
  return isOutsideMaximumWindow(date, draft.start, props.maximumDays);
}
</script>

<template>
  <UPopover
    v-if="range"
    v-model:open="rangeOpen"
    :content="{ align: 'start', side: 'bottom' }"
    :ui="popoverUi"
  >
    <button
      type="button"
      :disabled="disabled || readonly"
      :aria-label="`Selecionar período. ${rangeDisplayText}`"
      :class="rangeFieldClass"
    >
      <span
        class="min-w-0 flex-1 truncate tabular-nums"
        :class="start || end ? 'text-[var(--ads-date-text)]' : 'text-[var(--ads-date-placeholder)]'"
      >
        {{ rangeDisplayText }}
      </span>
      <UIcon name="i-lucide-calendar" class="size-5 shrink-0 text-[var(--ads-date-placeholder)]" />
    </button>

    <template #content="{ close }">
      <div class="ads-date-range-panel max-w-[calc(100vw-2rem)] overflow-x-auto bg-white">
        <p class="px-4 pt-4 text-sm font-medium text-neutral-900" aria-live="polite">
          {{ rangeStepLabel }}
        </p>
        <!-- Figma Range Date Picker (5712:6691): dois painéis de 290×284, 24px entre eles. -->
        <div class="relative w-[604px]">
          <div class="pointer-events-none absolute inset-0 grid grid-cols-[290px_290px] gap-6" aria-hidden="true">
            <div class="rounded-s-[var(--ads-radius-xsm)] bg-[var(--ads-surface-card)]" />
            <div class="rounded-e-[var(--ads-radius-xsm)] bg-[var(--ads-surface-card)]" />
          </div>
          <div class="relative flex flex-col gap-3 p-4">
            <div class="grid grid-cols-[258px_258px] gap-x-14">
              <div class="flex h-6 items-center justify-between">
                <button
                  type="button"
                  class="ads-date-range-nav"
                  aria-label="Mês anterior"
                  :disabled="!canShiftToPreviousMonth"
                  @click="moveVisibleMonth(-1)"
                >
                  <UIcon name="i-lucide-chevron-left" class="size-6" />
                </button>
                <span class="ads-date-range-title">{{ monthTitle(leftMonth) }}</span>
                <span class="size-6 shrink-0" aria-hidden="true" />
              </div>
              <div class="flex h-6 items-center justify-between">
                <span class="size-6 shrink-0" aria-hidden="true" />
                <span class="ads-date-range-title">{{ monthTitle(rightMonth) }}</span>
                <button
                  type="button"
                  class="ads-date-range-nav"
                  aria-label="Próximo mês"
                  :disabled="!canShiftToNextMonth"
                  @click="moveVisibleMonth(1)"
                >
                  <UIcon name="i-lucide-chevron-right" class="size-6" />
                </button>
              </div>
            </div>
            <UCalendar
              :key="`range-${rangeCalendarKey}`"
              :model-value="draftRange"
              :placeholder="leftMonth"
              :locale="UI_LOCALE_CODE"
              range
              :number-of-months="2"
              :month-controls="false"
              :year-controls="false"
              weekday-format="narrow"
              :week-starts-on="0"
              :min-value="minCalendarDate"
              :max-value="maxCalendarDate"
              disable-days-outside-current-view
              :is-date-unavailable="isDateUnavailable"
              color="neutral"
              variant="outline"
              class="ads-date-picker"
              :ui="rangeCalendarUi"
              @update:model-value="onDraftUpdate"
              @update:placeholder="onRangePlaceholderUpdate"
            >
              <template #week-day="{ day }">
                {{ weekdayLetter(day) }}
              </template>
            </UCalendar>
          </div>
        </div>

        <div class="flex items-center justify-between gap-3 px-4 pb-4">
          <AdsButton
            type="unfilled"
            size="sm"
            leading
            icon="i-lucide-x"
            label="Limpar seleção"
            @click="clearDraft"
          />
          <div class="flex items-center gap-2">
            <AdsButton
              type="unfilled"
              label="Cancelar"
              @click="cancelDraft(close)"
            />
            <AdsButton
              label="Aplicar"
              :disabled="!canApplyRange"
              @click="applyDraft(close)"
            />
          </div>
        </div>
      </div>
    </template>
  </UPopover>

  <UInputDate
    v-else
    ref="inputDateRef"
    :model-value="calendarModel"
    :locale="UI_LOCALE_CODE"
    :size="size"
    :disabled="disabled"
    :readonly="readonly"
    :min-value="minCalendarDate"
    :max-value="maxCalendarDate"
    :is-date-unavailable="isDateUnavailable"
    trailing
    :class="props.class"
    @update:model-value="onCalendarModelUpdate"
  >
    <template #trailing>
      <UPopover
        :reference="popoverReference"
        :content="{ align: 'end', side: 'bottom' }"
        :ui="popoverUi"
      >
        <AdsButton
          type="unfilled"
          size="sm"
          leading
          icon="i-lucide-calendar"
          aria-label="Selecionar data"
          class="px-0"
          :disabled="disabled || readonly"
        />

        <template #content>
          <UCalendar
            :model-value="calendarModel"
            :locale="UI_LOCALE_CODE"
            :min-value="minCalendarDate"
            :max-value="maxCalendarDate"
            :is-date-unavailable="isDateUnavailable"
            color="primary"
            variant="solid"
            class="ads-date-picker p-2"
            :ui="singleCalendarUi"
            @update:model-value="onCalendarModelUpdate"
          >
            <template #heading="{ value }">
              {{ capitalizeFirst(value) }}
            </template>
          </UCalendar>
        </template>
      </UPopover>
    </template>
  </UInputDate>
</template>
