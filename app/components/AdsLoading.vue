<template>
  <!-- Shimmer sobre conteúdo existente (só no código): o pai precisa de relative e overflow-hidden -->
  <div
    v-if="variant === 'shimmer' && overlay"
    class="ads-loading-shimmer pointer-events-none absolute inset-0 z-10 overflow-hidden"
    aria-hidden="true"
  />

  <!-- Shimmer do Figma: bloco cinza com brilho que atravessa -->
  <div
    v-else-if="variant === 'shimmer'"
    class="relative w-full overflow-hidden rounded-[var(--ads-radius-sm)]"
    :class="[shimmerHeightClass, skeletonColorClass]"
    role="status"
    aria-label="Carregando"
  >
    <div class="ads-loading-shimmer absolute inset-0" aria-hidden="true" />
  </div>

  <span
    v-else-if="variant === 'skeleton' && lines < 1"
    class="block animate-pulse rounded-[var(--ads-loading-radius)] motion-reduce:animate-none"
    :class="skeletonColorClass"
    role="status"
    aria-label="Carregando"
  />

  <div
    v-else-if="variant === 'skeleton'"
    class="flex w-full flex-col items-start gap-2"
    role="status"
    aria-label="Carregando"
  >
    <span
      v-for="(width, index) in skeletonLines"
      :key="index"
      class="block animate-pulse rounded-[var(--ads-loading-radius)] motion-reduce:animate-none"
      :class="[width, skeletonLineClass, skeletonColorClass]"
      aria-hidden="true"
    />
  </div>

  <div
    v-else-if="variant === 'logo'"
    role="status"
    :aria-label="label || 'Carregando'"
    :class="logoRootClass"
  >
    <p v-if="label" :class="labelClass">{{ label }}</p>
    <img
      :src="radarLogoUrl"
      alt=""
      class="ads-loading-logo"
      :class="[logoSizeClass, logoToneClass]"
      aria-hidden="true"
    />
  </div>

  <div
    v-else
    role="status"
    :aria-label="label ? undefined : 'Carregando'"
    :class="spinnerRootClass"
  >
    <svg
      class="shrink-0 animate-spin motion-reduce:animate-none"
      :width="spinner.px"
      :height="spinner.px"
      :viewBox="`0 0 ${spinner.px} ${spinner.px}`"
      fill="none"
      aria-hidden="true"
    >
      <circle
        :cx="spinner.px / 2"
        :cy="spinner.px / 2"
        :r="spinner.radius"
        :stroke-width="spinner.stroke"
        :class="tone === 'muted' ? 'stroke-[var(--ads-loading-skeleton)]' : 'stroke-[var(--ads-loading-spinner-track)]'"
      />
      <!-- Arco de 3/8 da volta, começando no topo -->
      <circle
        :cx="spinner.px / 2"
        :cy="spinner.px / 2"
        :r="spinner.radius"
        :stroke-width="spinner.stroke"
        :stroke-dasharray="`${spinner.arc} ${spinner.circumference}`"
        :transform="`rotate(-90 ${spinner.px / 2} ${spinner.px / 2})`"
        :class="tone === 'muted' ? 'stroke-[var(--ads-border-icon-support)]' : 'stroke-[var(--ads-loading-spinner-color)]'"
      />
    </svg>
    <p v-if="label" :class="labelClass">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import radarLogoUrl from "../assets/brand/radar-symbol.svg?url";

export type AdsLoadingVariant = "spinner" | "skeleton" | "shimmer" | "logo";
export type AdsLoadingSize = "sm" | "md" | "lg";
export type AdsLoadingTone = "primary" | "muted";

const props = withDefaults(
  defineProps<{
    /**
     * spinner: área ainda vazia.
     * skeleton: o formato da tela já é conhecido.
     * shimmer: bloco cinza com brilho; com `overlay`, brilho sobre o conteúdo.
     * logo: símbolo do Radar, para a página ou uma seção inteira.
     */
    variant?: AdsLoadingVariant;
    /** sm na tabela, md na seção, lg no modal. */
    size?: AdsLoadingSize;
    /** primary no dado principal, muted em áreas secundárias. */
    tone?: AdsLoadingTone;
    /** Centraliza o spinner ou o logo numa seção vazia. Só no código: o Figma não tem esse eixo. */
    region?: boolean;
    /** Rótulo: à direita do spinner, acima do logo. */
    label?: string;
    /**
     * Linhas do skeleton. Zero desenha um bloco só; altura e largura vêm da class.
     * Só no código: o Figma define 3 linhas fixas.
     */
    lines?: number;
    /** Shimmer só com o brilho, por cima do conteúdo do pai. Só no código. */
    overlay?: boolean;
  }>(),
  {
    variant: "spinner",
    size: "md",
    tone: "primary",
    region: false,
    label: "",
    lines: 3,
    overlay: false,
  },
);

/** Anel do Figma: 16, 24 e 40 px, com trilha de 2, 3 e 4 px. */
const SPINNER = {
  sm: { px: 16, stroke: 2 },
  md: { px: 24, stroke: 3 },
  lg: { px: 40, stroke: 4 },
} as const;

const spinner = computed(() => {
  const { px, stroke } = SPINNER[props.size];
  const radius = (px - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  return { px, stroke, radius, circumference, arc: circumference * 0.375 };
});

/** Larguras do Figma: 240, 192 e 144 px num bloco de 240. */
const skeletonWidths = ["w-full", "w-4/5", "w-3/5"] as const;

const skeletonLines = computed(() =>
  Array.from({ length: props.lines }, (_, index) => skeletonWidths[index % skeletonWidths.length]),
);

const skeletonLineClass = computed(() => {
  if (props.size === "sm") return "h-2";
  if (props.size === "lg") return "h-4";
  return "h-[var(--ads-loading-bar)]";
});

const skeletonColorClass = computed(() =>
  props.tone === "muted" ? "bg-[var(--ads-loading-skeleton-muted)]" : "bg-[var(--ads-loading-skeleton)]",
);

const shimmerHeightClass = computed(() => {
  if (props.size === "sm") return "h-10";
  if (props.size === "lg") return "h-30";
  return "h-20";
});

const logoSizeClass = computed(() => {
  // Tamanhos do Figma: 66×41, 156×98 e 216×136.
  if (props.size === "sm") return "h-[41px] w-auto";
  if (props.size === "lg") return "h-[136px] w-auto";
  return "h-[98px] w-auto";
});

const logoToneClass = computed(() =>
  props.tone === "muted" ? "opacity-40" : "opacity-100",
);

const labelClass =
  "text-[length:var(--ads-loading-label-size)] leading-[1.3] whitespace-nowrap text-[var(--ads-text-secondary)]";

const regionClass = "flex min-h-48 w-full items-center justify-center gap-2 py-10 text-center sm:py-12";

const logoRootClass = computed(() =>
  props.region ? `${regionClass} flex-col` : "inline-flex flex-col items-center gap-2 text-center",
);

const spinnerRootClass = computed(() =>
  props.region ? regionClass : "inline-flex items-center gap-2",
);
</script>

<style scoped>
.ads-loading-logo {
  animation: ads-loading-logo-pulse 1.6s ease-in-out infinite;
}

@keyframes ads-loading-logo-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}

@media (prefers-reduced-motion: reduce) {
  .ads-loading-logo {
    animation: none;
    opacity: 0.5;
  }
}
</style>
