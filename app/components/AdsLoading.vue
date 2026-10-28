<template>
  <div
    v-if="variant === 'shimmer'"
    class="ads-loading-shimmer pointer-events-none absolute inset-0 z-10 overflow-hidden"
    aria-hidden="true"
  />

  <span
    v-else-if="variant === 'skeleton' && lines < 1"
    class="block animate-pulse rounded-[var(--ads-radius-xsm)] bg-[var(--ads-border-subtle)] motion-reduce:animate-none"
    role="status"
    aria-label="Carregando"
  />

  <div
    v-else-if="variant === 'skeleton'"
    class="flex flex-col gap-2"
    role="status"
    aria-label="Carregando"
  >
    <span
      v-for="(width, index) in skeletonLines"
      :key="index"
      class="block h-4 animate-pulse rounded-[var(--ads-radius-xsm)] bg-[var(--ads-border-subtle)] motion-reduce:animate-none"
      :class="width"
      aria-hidden="true"
    />
  </div>

  <div
    v-else
    role="status"
    :aria-label="label ? undefined : 'Carregando'"
    :class="spinnerRootClass"
  >
    <UIcon
      name="i-lucide-loader-circle"
      class="animate-spin motion-reduce:animate-none"
      :class="[sizeClass, toneClass]"
      aria-hidden="true"
    />
    <p v-if="label" class="text-sm text-[var(--ads-text-secondary)]">
      {{ label }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type AdsLoadingVariant = "spinner" | "skeleton" | "shimmer";
export type AdsLoadingSize = "sm" | "md" | "lg";
export type AdsLoadingTone = "primary" | "muted";

const props = withDefaults(
  defineProps<{
    /**
     * spinner: área ainda vazia.
     * skeleton: o formato da tela já é conhecido.
     * shimmer: o conteúdo continua visível, por baixo.
     */
    variant?: AdsLoadingVariant;
    /** sm na tabela, md na seção, lg no modal. */
    size?: AdsLoadingSize;
    /** primary no dado da tela, muted numa tabela secundária. */
    tone?: AdsLoadingTone;
    /** Centraliza o spinner numa seção vazia. */
    region?: boolean;
    label?: string;
    /**
     * Linhas do skeleton. Zero desenha um bloco só;
     * altura e largura vêm da class.
     */
    lines?: number;
  }>(),
  {
    variant: "spinner",
    size: "md",
    tone: "primary",
    region: false,
    label: "",
    lines: 0,
  },
);

const skeletonWidths = ["w-2/3", "w-full", "w-1/2"] as const;

const skeletonLines = computed(() =>
  Array.from({ length: props.lines }, (_, index) => skeletonWidths[index % skeletonWidths.length]),
);

const sizeClass = computed(() => {
  if (props.size === "sm") return "size-6 shrink-0 text-[1.5rem]";
  if (props.size === "lg") return "size-12 shrink-0 text-[3rem]";
  return "size-8 shrink-0 text-[2rem]";
});

const toneClass = computed(() => (props.tone === "muted" ? "text-muted" : "text-primary"));

const spinnerRootClass = computed(() => {
  if (props.region) {
    return "flex min-h-48 flex-col items-center justify-center gap-3 py-10 text-center sm:py-12";
  }
  if (props.label) return "inline-flex flex-col items-center gap-3 text-center";
  return "inline-flex";
});
</script>
