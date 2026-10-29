<template>
  <div :class="rootClass">
    <div v-if="hasHeader" class="flex items-start gap-3">
      <span
        v-if="showIcon"
        class="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary-200 bg-primary-50"
      >
        <UIcon
          :name="icon"
          class="size-6 text-primary"
          :class="{ 'animate-spin': spinIcon }"
          aria-hidden="true"
        />
      </span>
      <div class="min-w-0 flex-1">
        <p v-if="title" class="font-semibold text-highlighted">{{ title }}</p>
        <p
          v-if="description"
          class="text-sm text-muted"
          :class="title ? 'mt-0.5' : ''"
        >
          {{ description }}
        </p>
      </div>
      <span
        v-if="reservePercentSlot"
        class="shrink-0 text-sm font-medium tabular-nums text-highlighted"
        :class="{ invisible: !isPercentVisible }"
        :aria-hidden="!isPercentVisible"
      >
        {{ percentClamped }}%
      </span>
    </div>

    <div
      class="h-[var(--ads-progress-height)] w-full overflow-hidden rounded-[var(--ads-progress-radius)] bg-[var(--ads-progress-track)]"
      role="progressbar"
      :aria-valuenow="indeterminate ? undefined : percentClamped"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-busy="indeterminate ? true : undefined"
      :aria-label="effectiveAriaLabel"
    >
      <div
        v-if="indeterminate"
        class="progress-bar-loading__indeterminate h-full rounded-full"
        :class="fillClass"
      />
      <div
        v-else
        class="h-full rounded-full transition-[width] duration-300 ease-out"
        :class="fillClass"
        :style="{ width: `${percentClamped}%` }"
      />
    </div>

    <div
      v-if="reserveElapsedTimeSlot"
      class="flex justify-end"
    >
      <span
        class="inline-flex items-center gap-1 font-mono text-xs tabular-nums text-muted"
        :class="{ invisible: !showElapsedTime }"
        role="timer"
        aria-live="off"
        :aria-hidden="!showElapsedTime"
        :aria-label="`Tempo decorrido: ${elapsedDisplay}`"
      >
        <UIcon
          name="i-lucide-timer"
          class="size-3.5 text-muted"
          aria-hidden="true"
        />
        {{ elapsedDisplay }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

type ProgressBarLoadingVariant = "primary" | "success" | "error";

interface Props {
  title?: string;
  description?: string;
  icon?: string;
  showIcon?: boolean;
  spinIcon?: boolean;
  indeterminate?: boolean;
  percent?: number;
  showPercent?: boolean;
  showElapsedTime?: boolean;
  ariaLabel?: string;
  variant?: ProgressBarLoadingVariant;
  rootClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  description: "",
  icon: "i-lucide-loader-circle",
  showIcon: true,
  spinIcon: true,
  indeterminate: false,
  percent: 0,
  showPercent: true,
  showElapsedTime: true,
  ariaLabel: "",
  variant: "primary",
  rootClass: "flex flex-col gap-3",
});

const percentClamped = computed(() =>
  Math.max(0, Math.min(100, Math.round(props.percent ?? 0))),
);

const fillClass = computed(() => {
  if (props.variant === "success") return "bg-success-500";
  if (props.variant === "error") return "bg-error-500";
  return "bg-[var(--ads-progress-fill)]";
});

const effectiveAriaLabel = computed(
  () => props.ariaLabel || props.title || "Carregando",
);

const isPercentVisible = computed(
  () => Boolean(props.showPercent) && !props.indeterminate,
);

/**
 * Slots reservados de forma "sticky-true": uma vez que o slot é necessário (header,
 * timer ou percent), mantemos o nó renderizado para sempre. Isso evita que mudanças
 * de status (ex.: pipeline `uploading` → `success`, `indeterminate` → determinado,
 * `showElapsedTime` true → false) movam outros elementos no eixo Y.
 *
 * A alternância visual é feita apenas via `invisible` (mantém o espaço reservado).
 */
const computedHasHeader = () =>
  Boolean(props.showIcon) ||
  Boolean(props.title) ||
  Boolean(props.description) ||
  (!props.indeterminate && Boolean(props.showPercent));

const hasHeader = ref(computedHasHeader());
const reserveElapsedTimeSlot = ref(Boolean(props.showElapsedTime));
const reservePercentSlot = ref(Boolean(props.showPercent));

watch(computedHasHeader, (val) => {
  if (val) hasHeader.value = true;
});

watch(
  () => Boolean(props.showElapsedTime),
  (val) => {
    if (val) reserveElapsedTimeSlot.value = true;
  },
);

watch(
  () => Boolean(props.showPercent),
  (val) => {
    if (val) reservePercentSlot.value = true;
  },
);

const startedAt = ref<number>(0);
const now = ref<number>(0);
let elapsedTimerId: ReturnType<typeof setInterval> | null = null;

const stopElapsedTimer = () => {
  if (elapsedTimerId != null) {
    clearInterval(elapsedTimerId);
    elapsedTimerId = null;
  }
};

const startElapsedTimer = () => {
  stopElapsedTimer();
  startedAt.value = Date.now();
  now.value = startedAt.value;
  if (typeof window === "undefined") {
    return;
  }
  elapsedTimerId = setInterval(() => {
    now.value = Date.now();
  }, 1000);
};

const elapsedSeconds = computed(() =>
  Math.max(0, Math.floor((now.value - startedAt.value) / 1000)),
);

const elapsedDisplay = computed(() => {
  const total = elapsedSeconds.value;
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
});

watch(
  () => props.showElapsedTime,
  (enabled) => {
    if (enabled) {
      startElapsedTimer();
    } else {
      stopElapsedTimer();
    }
  },
);

onMounted(() => {
  if (props.showElapsedTime) {
    startElapsedTimer();
  }
});

onBeforeUnmount(() => {
  stopElapsedTimer();
});
</script>

<style scoped>
.progress-bar-loading__indeterminate {
  width: 35%;
  animation: progress-bar-loading-indeterminate 1.4s ease-in-out infinite;
  transform-origin: left;
}

@keyframes progress-bar-loading-indeterminate {
  0% {
    margin-inline-start: -35%;
  }
  60% {
    margin-inline-start: 100%;
  }
  100% {
    margin-inline-start: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .progress-bar-loading__indeterminate {
    width: 100%;
    animation: none;
    opacity: 0.6;
  }
}
</style>
