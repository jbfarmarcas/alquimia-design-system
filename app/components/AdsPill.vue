<template>
  <span
    class="inline-flex items-center whitespace-nowrap"
    :class="isText
      ? textClass
      : isBroadcast
        ? [broadcastSizeClass, broadcastSurface.shell, 'shrink-0 justify-center gap-1 overflow-hidden rounded-full text-center leading-[1.2]']
        : [sizeClass, surfaceClass, 'shrink-0 justify-center gap-1 overflow-hidden rounded-full text-center leading-[1.2]']"
  >
    <!-- Broadcast: ponto na cor da pill antes do texto -->
    <span v-if="isBroadcast" class="flex size-3.5 shrink-0 items-center justify-center" aria-hidden="true">
      <span class="size-[var(--ads-broadcast-mark)] rounded-full" :class="broadcastSurface.mark" />
    </span>
    <UIcon
      v-if="icon"
      :name="icon"
      class="shrink-0"
      :class="[iconSizeClass, isText ? 'ads-icon-xxs' : '', iconClass]"
      aria-hidden="true"
    />
    {{ resolvedLabel }}
    <UIcon
      v-if="trailingIcon"
      :name="trailingIcon"
      class="shrink-0"
      :class="[iconSizeClass, isText ? 'ads-icon-xxs' : '']"
      aria-hidden="true"
    />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type AdsPillColor = "default" | "success" | "attention" | "warning" | "new" | "blocked";
export type AdsPillSize = "md" | "sm";
/** default: pill sólida. soft: pill clara. text: texto 14 regular, sem fundo. */
export type AdsPillVariant = "default" | "soft" | "text";

const props = withDefaults(
  defineProps<{
    /**
     * default é a pill sólida. soft é a variação clara.
     * text: sem fundo, sem largura mínima, 14px regular.
     * A cor é a do texto da `color`. Ignora size. O ícone, se houver, tem 16px.
     */
    variant?: AdsPillVariant;
    /**
     * Pílula de transmissão (LIVE): borda, ponto e texto na cor da `color`.
     * Só warning e success; as outras cores usam warning. Ignora variant e size.
     */
    broadcast?: boolean;
    /** Cor do estado: default, success, attention, warning, new ou blocked. */
    color?: AdsPillColor;
    /** `md` = Pill normal (24px). `sm` = Small Pill (18px). Default `md`. */
    size?: AdsPillSize;
    label?: string;
    /** Ícone à esquerda (Lucide). */
    icon?: string;
    /** Classes do ícone à esquerda, como o giro do carregamento. */
    iconClass?: string;
    /** Ícone opcional à direita (Lucide). */
    trailingIcon?: string;
    /**
     * Override avançado de fundo e texto (classes Tailwind).
     * Uso interno do atalho de domínio AdsNotabilityPill.
     * Em produção, prefira esses atalhos em vez desta prop.
     */
    customSurface?: string;
  }>(),
  {
    variant: "default",
    broadcast: false,
    color: "default",
    size: "md",
    label: undefined,
    icon: undefined,
    iconClass: undefined,
    trailingIcon: undefined,
    customSurface: undefined,
  },
);

const surfaces: Record<Exclude<AdsPillVariant, "text">, Record<AdsPillColor, string>> = {
  default: {
    default: "bg-[var(--ads-pill-primary-bg)] text-[var(--ads-pill-primary-text)]",
    success: "bg-[#15c57e] text-white",
    attention: "bg-[#e9a700] text-white",
    warning: "bg-[#dc0034] text-white",
    new: "bg-[#05b4d8] text-white",
    blocked: "bg-[#0e1013] text-white",
  },
  soft: {
    default: "bg-[#e4f2ff] text-[#00389e]",
    success: "bg-[#c3ffe6] text-[#0e5a3b]",
    attention: "bg-[#ffe7b9] text-[#8f6600]",
    warning: "bg-[#ffbdcd] text-[#840221]",
    new: "bg-[#c4f5ff] text-[#006478]",
    blocked: "bg-[#cfdef3] text-[#0e1013]",
  },
};

const labels: Record<Exclude<AdsPillVariant, "text">, Record<AdsPillColor, string>> = {
  default: {
    default: "Default",
    success: "Success",
    attention: "Attention",
    warning: "Warning",
    new: "New!",
    blocked: "Blocked",
  },
  soft: {
    default: "Soft",
    success: "Success",
    attention: "Attention",
    warning: "Warning",
    new: "New!",
    blocked: "Blocked",
  },
};

/** Classes de tamanho para `size="md"` (padrão) e `size="sm"` (Small Pill). */
const sizeClass = computed(() =>
  props.size === "sm"
    ? "h-[var(--ads-mini-height)] px-[var(--ads-mini-padding-x)] py-1 text-[length:var(--ads-mini-font-size)] [font-weight:var(--ads-mini-weight)]"
    : "h-[var(--ads-pill-height)] px-[var(--ads-pill-padding-x)] py-1 text-[length:var(--ads-pill-font-size)] [font-weight:var(--ads-pill-weight)]",
);

/** Tinta de cada cor: a cor do texto da pill clara, sem o fundo. */
const textColors: Record<AdsPillColor, string> = {
  default: "text-[var(--color-ads-radar-800)]",
  success: "text-[var(--ads-status-success-800)]",
  attention: "text-[var(--ads-status-attention-800)]",
  warning: "text-[var(--ads-status-warning-800)]",
  new: "text-[var(--ads-status-new-800)]",
  blocked: "text-[var(--ads-status-void-800)]",
};

const textClass = computed(() => [
  "gap-1 text-[length:var(--ads-font-size-xxs)] font-normal leading-[1.3]",
  textColors[props.color],
]);

const iconSizeClass = computed(() => {
  if (props.variant === "text") return "size-[var(--ads-space-xxs)]";
  return props.size === "sm" ? "size-3" : "size-3.5";
});

const isBroadcast = computed(() => props.broadcast);
const isText = computed(() => !isBroadcast.value && props.variant === "text");
const filledVariant = computed(() => (props.variant === "soft" ? "soft" : "default"));

const broadcastSurfaces = {
  warning: {
    shell: "border border-[var(--ads-broadcast-warning)] bg-[var(--ads-broadcast-warning-bg)] text-[var(--ads-broadcast-warning)]",
    mark: "bg-[var(--ads-broadcast-warning)]",
  },
  success: {
    shell: "border border-[var(--ads-broadcast-success)] bg-[var(--ads-broadcast-success-bg)] text-[var(--ads-broadcast-success)]",
    mark: "bg-[var(--ads-broadcast-success)]",
  },
} as const;

const broadcastSurface = computed(() => broadcastSurfaces[props.color === "success" ? "success" : "warning"]);

const broadcastSizeClass =
  "h-[var(--ads-broadcast-height)] px-[var(--ads-broadcast-padding-x)] py-1 text-[length:var(--ads-broadcast-font-size)] font-bold";

const surfaceClass = computed(() => props.customSurface ?? surfaces[filledVariant.value][props.color]);
const resolvedLabel = computed(
  () => props.label ?? (isBroadcast.value ? "" : labels[filledVariant.value][props.color]),
);
</script>
