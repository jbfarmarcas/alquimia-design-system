<template>
  <div :class="rootClass">
    <div v-if="hasHeader" class="flex items-start gap-2">
      <UIcon
        v-if="showIcon"
        :name="resolvedIcon"
        class="mt-px size-[18px] shrink-0"
        :class="[
          isSuccess ? 'text-[var(--ads-progress-success)]' : 'text-[var(--ads-progress-fill)]',
          { 'animate-spin motion-reduce:animate-none': spinIcon && !isSuccess },
        ]"
        aria-hidden="true"
      />
      <div class="flex min-w-0 flex-1 flex-col gap-0.5 text-sm leading-[1.3]">
        <p v-if="title" class="font-bold text-[var(--ads-text-primary)]">{{ title }}</p>
        <p v-if="description" class="text-[var(--ads-text-secondary)]">{{ description }}</p>
      </div>
      <span
        v-if="reservePercentSlot"
        class="shrink-0 text-sm leading-[1.3] font-medium tabular-nums text-[var(--ads-text-primary)]"
        :class="{ invisible: !showPercent }"
        :aria-hidden="!showPercent"
      >
        {{ indeterminate ? "—" : `${percentClamped}%` }}
      </span>
    </div>

    <div
      class="relative h-[var(--ads-progress-height)] w-full overflow-hidden rounded-[var(--ads-progress-radius)] bg-[var(--ads-progress-track)]"
      role="progressbar"
      :aria-valuenow="indeterminate ? undefined : percentClamped"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-busy="indeterminate ? true : undefined"
      :aria-label="effectiveAriaLabel"
    >
      <div
        v-if="indeterminate"
        class="progress-bar-loading__indeterminate absolute inset-y-0 rounded-[var(--ads-progress-radius)]"
        :class="fillClass"
      />
      <div
        v-else
        class="h-full rounded-[var(--ads-progress-radius)] transition-[width] duration-300 ease-out"
        :class="fillClass"
        :style="{ width: `${percentClamped}%` }"
      />
    </div>

    <p
      v-if="reserveElapsedTimeSlot"
      class="text-xs leading-[1.2] tabular-nums text-[var(--ads-text-secondary)]"
      :class="{ invisible: !showElapsedTime }"
      role="timer"
      aria-live="off"
      :aria-hidden="!showElapsedTime"
    >
      Tempo decorrido: {{ elapsedDisplay }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

type ProgressBarLoadingVariant = "primary" | "success";

interface Props {
  title?: string;
  description?: string;
  /** Ícone do andamento. No sucesso vira o check verde. */
  icon?: string;
  showIcon?: boolean;
  spinIcon?: boolean;
  /** Sem percentual conhecido: mostra "—" e um trecho da barra que atravessa a trilha. */
  indeterminate?: boolean;
  percent?: number;
  showPercent?: boolean;
  /** "Tempo decorrido: 00:42", abaixo da barra. */
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
  rootClass: "flex w-full flex-col gap-3",
});

const percentClamped = computed(() =>
  Math.max(0, Math.min(100, Math.round(props.percent ?? 0))),
);

const isSuccess = computed(() => props.variant === "success");

/** Em andamento: ícone de carregamento azul. Sucesso: check verde, como no Figma. */
const resolvedIcon = computed(() => (isSuccess.value ? "i-lucide-circle-check" : props.icon));

const fillClass = computed(() =>
  isSuccess.value ? "bg-[var(--ads-progress-success)]" : "bg-[var(--ads-progress-fill)]",
);

const effectiveAriaLabel = computed(
  () => props.ariaLabel || props.title || "Carregando",
);

/**
 * Slots reservados de forma "sticky-true": uma vez necessário (cabeçalho, tempo ou
 * percentual), o nó fica renderizado. Assim a troca de estado não move nada no eixo Y;
 * a alternância visual usa só `invisible`.
 */
const computedHasHeader = () =>
  Boolean(props.showIcon) ||
  Boolean(props.title) ||
  Boolean(props.description) ||
  Boolean(props.showPercent);

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
/* Indeterminado: trecho de 30% da trilha (no Figma, parado no meio) que atravessa a barra. */
.progress-bar-loading__indeterminate {
  width: 30%;
  animation: progress-bar-loading-indeterminate 1.4s ease-in-out infinite;
}

@keyframes progress-bar-loading-indeterminate {
  0% {
    left: -30%;
  }

  100% {
    left: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .progress-bar-loading__indeterminate {
    left: 35%;
    animation: none;
  }
}
</style>
