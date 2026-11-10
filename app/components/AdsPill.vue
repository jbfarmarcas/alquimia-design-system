<template>
  <span
    class="inline-flex shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full text-center leading-[1.2] whitespace-nowrap"
    :class="isBroadcast ? [broadcastSizeClass, broadcastSurface.shell] : [sizeClass, surfaceClass]"
  >
    <!-- Broadcast: ponto na cor do status antes do texto -->
    <span v-if="isBroadcast" class="flex size-3.5 shrink-0 items-center justify-center" aria-hidden="true">
      <span class="size-[var(--ads-broadcast-mark)] rounded-full" :class="broadcastSurface.mark" />
    </span>
    <UIcon
      v-if="icon"
      :name="icon"
      class="shrink-0"
      :class="[iconSizeClass, iconClass]"
      aria-hidden="true"
    />
    {{ resolvedLabel }}
    <UIcon
      v-if="trailingIcon"
      :name="trailingIcon"
      class="shrink-0"
      :class="iconSizeClass"
      aria-hidden="true"
    />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type AdsPillStatus = "default" | "success" | "attention" | "warning" | "new" | "blocked";
export type AdsPillTone = "primary" | "secondary";
export type AdsPillSize = "md" | "sm";
/** default: pill sólida ou clara. broadcast: borda, ponto e texto na cor do status (warning ou success). */
export type AdsPillVariant = "default" | "broadcast";

const props = withDefaults(
  defineProps<{
    /**
     * broadcast: a pílula de transmissão (LIVE), com borda e ponto. Só tem as cores
     * warning e success; os outros status usam warning. Ignora tone e size.
     */
    variant?: AdsPillVariant;
    status?: AdsPillStatus;
    tone?: AdsPillTone;
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
    status: "default",
    tone: "primary",
    size: "md",
    label: undefined,
    icon: undefined,
    iconClass: undefined,
    trailingIcon: undefined,
    customSurface: undefined,
  },
);

const surfaces: Record<AdsPillTone, Record<AdsPillStatus, string>> = {
  primary: {
    default: "bg-[var(--ads-pill-primary-bg)] text-[var(--ads-pill-primary-text)]",
    success: "bg-[#15c57e] text-white",
    attention: "bg-[#e9a700] text-white",
    warning: "bg-[#dc0034] text-white",
    new: "bg-[#05b4d8] text-white",
    blocked: "bg-[#0e1013] text-white",
  },
  secondary: {
    default: "bg-[#e4f2ff] text-[#00389e]",
    success: "bg-[#c3ffe6] text-[#0e5a3b]",
    attention: "bg-[#ffe7b9] text-[#8f6600]",
    warning: "bg-[#ffbdcd] text-[#840221]",
    new: "bg-[#c4f5ff] text-[#006478]",
    blocked: "bg-[#cfdef3] text-[#0e1013]",
  },
};

const labels: Record<AdsPillTone, Record<AdsPillStatus, string>> = {
  primary: {
    default: "Primary",
    success: "Success",
    attention: "Attention",
    warning: "Warning",
    new: "New!",
    blocked: "Blocked",
  },
  secondary: {
    default: "Secondary",
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

const iconSizeClass = computed(() => (props.size === "sm" ? "size-3" : "size-3.5"));

const isBroadcast = computed(() => props.variant === "broadcast");

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

const broadcastSurface = computed(() => broadcastSurfaces[props.status === "success" ? "success" : "warning"]);

const broadcastSizeClass =
  "h-[var(--ads-broadcast-height)] px-[var(--ads-broadcast-padding-x)] py-1 text-[length:var(--ads-broadcast-font-size)] font-bold";

const surfaceClass = computed(() => props.customSurface ?? surfaces[props.tone][props.status]);
const resolvedLabel = computed(
  () => props.label ?? (isBroadcast.value ? "LIVE" : labels[props.tone][props.status]),
);
</script>
