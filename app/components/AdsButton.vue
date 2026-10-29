<template>
  <component
    :is="to ? NuxtLink : 'button'"
    ref="root"
    v-bind="rootAttrs"
    class="inline-flex items-center justify-center [font-weight:var(--ads-button-weight)] whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed"
    :class="[
      'rounded-[var(--ads-button-radius)]',
      type !== 'ia' && 'overflow-hidden',
      sizeClass,
      faceClass,
      focusClass,
      type === 'ia' && 'ads-button-ia-face',
      type === 'ia' && visualState() === 'disabled' && 'is-ia-muted',
      iaMotion,
      iaPaused && 'is-ia-paused',
      to && isDisabled ? 'pointer-events-none' : '',
    ]"
    @click="onRootClick"
  >
    <UIcon
      v-if="loading"
      name="i-lucide-loader-circle"
      :class="[iconClass, 'animate-spin']"
      data-loading
    />
    <UIcon v-else-if="iconOnly || leading" :name="icon" :class="iconClass" />
    <span v-if="hasLabel"><slot>{{ label }}</slot></span>
    <UIcon v-if="hasLabel && trailing && !loading" :name="trailingIcon || icon" :class="iconClass" />
  </component>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useSlots, watch } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { NuxtLink } from "#components";

export type AdsButtonType = "filled" | "outline" | "unfilled" | "secondary" | "ia";
export type AdsButtonSize = "md" | "sm";
export type AdsButtonState = "active" | "hover" | "pressed" | "disabled";
export type AdsButtonColor = "primary" | "success" | "attention" | "warning" | "new" | "innovation" | "blocked" | "neutral";

const props = withDefaults(
  defineProps<{
    type?: AdsButtonType;
    /** Mesmas cores do badge, mais neutral para ação sem status. */
    color?: AdsButtonColor;
    size?: AdsButtonSize;
    label?: string;
    /** Ícone à esquerda. No Figma, o exemplo é sparkles. Sem rótulo, o ícone ocupa o botão sozinho. */
    leading?: boolean;
    /** Ícone à direita. Sem `trailingIcon`, usa `icon`. */
    trailing?: boolean;
    icon?: string;
    trailingIcon?: string;
    /** Vira link. Sem valor, continua `<button>`. */
    to?: RouteLocationRaw;
    disabled?: boolean;
    /** Troca o ícone por spinner e bloqueia o clique. */
    loading?: boolean;
    /** `type` do `<button>`. A prop `type` já é o visual do ADS. */
    nativeType?: "button" | "submit" | "reset";
    /**
     * Congela um estado para a documentação.
     * Sem valor, hover e pressed vêm do ponteiro.
     */
    state?: AdsButtonState | null;
  }>(),
  {
    type: "filled",
    color: "primary",
    size: "md",
    label: "",
    leading: false,
    trailing: false,
    icon: "i-lucide-sparkles",
    trailingIcon: "",
    to: undefined,
    disabled: false,
    loading: false,
    nativeType: "button",
    state: null,
  },
);

const slots = useSlots();
const hasLabel = computed(() => props.label.length > 0 || Boolean(slots.default));
/** Sem rótulo o botão é quadrado: 40px no desktop, 32px no mobile. */
const iconOnly = computed(() => !hasLabel.value);
const isDisabled = computed(() => props.disabled || props.loading || props.state === "disabled");

const rootAttrs = computed(() =>
  props.to
    ? {
        to: props.to,
        tabindex: isDisabled.value ? -1 : undefined,
        "aria-disabled": isDisabled.value || undefined,
        "aria-busy": props.loading || undefined,
      }
    : {
        type: props.nativeType,
        disabled: isDisabled.value,
        "aria-busy": props.loading || undefined,
      },
);

const onRootClick = (event: MouseEvent) => {
  if (props.to && isDisabled.value) event.preventDefault();
};

const sizeClass = computed(() => {
  if (iconOnly.value) {
    return props.size === "sm"
      ? "size-[var(--ads-button-sm-icon-box)] shrink-0"
      : "size-[var(--ads-button-md-icon-box)] shrink-0";
  }
  return props.size === "sm"
    ? "h-[var(--ads-button-sm-height)] gap-[var(--ads-button-sm-gap)] px-[var(--ads-button-sm-padding-x)] text-[length:var(--ads-button-sm-font-size)] leading-[var(--ads-button-sm-line-height)]"
    : "gap-[var(--ads-button-md-gap)] px-[var(--ads-button-md-padding-x)] py-[var(--ads-button-md-padding-y)] text-[length:var(--ads-button-md-font-size)] leading-[var(--ads-button-md-line-height)]";
});

const iconClass = computed(() =>
  props.size === "sm"
    ? "size-[var(--ads-button-sm-icon)] shrink-0 text-[length:var(--ads-button-sm-icon)]"
    : "size-[var(--ads-button-md-icon)] shrink-0 text-[length:var(--ads-button-md-icon)]",
);

const faceClass = computed(() => faceFor(props.type, props.color, visualState()));
const focusClass = computed(() =>
  props.type === "ia" ? "focus-visible:outline-[var(--ads-button-ia-border)]" : focusFor[props.color],
);
/** Um brilho de gradiente gira em volta da borda do tipo IA. Hover, pressed e disabled seguram a borda fechada. */
const iaMotion = computed(() => {
  if (props.type !== "ia" || isDisabled.value) return "";
  if (props.state === "hover" || props.state === "pressed") return "";
  return "ads-button-ia";
});

const root = ref<Element | { $el: Element } | null>(null);
const iaPaused = ref(false);
let iaFrameObserver: IntersectionObserver | null = null;

const watchIaRing = () => {
  iaFrameObserver?.disconnect();
  iaFrameObserver = null;
  iaPaused.value = false;
  if (!iaMotion.value) return;
  nextTick(() => {
    const node = root.value instanceof Element ? root.value : root.value?.$el;
    if (!node || typeof IntersectionObserver === "undefined") return;
    iaFrameObserver = new IntersectionObserver(([entry]) => {
      iaPaused.value = !entry?.isIntersecting;
    });
    iaFrameObserver.observe(node);
  });
};

watch(iaMotion, watchIaRing, { immediate: true });
onBeforeUnmount(() => {
  iaFrameObserver?.disconnect();
});

const visualState = (): AdsButtonState => {
  if (props.disabled || props.state === "disabled") return "disabled";
  if (props.state === "hover" || props.state === "pressed") return props.state;
  return "active";
};

const contrast = "text-[var(--ads-text-contrast)]";
const ink = "text-[var(--ads-text-primary)]";
const filledPrimaryText = "text-[var(--ads-button-primary-text)]";
const secondaryText = "text-[var(--ads-button-secondary-text)]";

const focusFor: Record<AdsButtonColor, string> = {
  primary: "focus-visible:outline-[var(--ads-text-brand)]",
  success: "focus-visible:outline-[var(--ads-status-success-700)]",
  attention: "focus-visible:outline-[var(--ads-status-attention-800)]",
  warning: "focus-visible:outline-[var(--ads-status-warning-600)]",
  new: "focus-visible:outline-[var(--ads-status-new-700)]",
  innovation: "focus-visible:outline-[var(--ads-status-innovation-700)]",
  blocked: "focus-visible:outline-[var(--ads-status-void-800)]",
  neutral: "focus-visible:outline-[var(--ads-text-primary)]",
};

/** Fundo e cor da borda ficam em `.ads-button-ia-face`: a borda é pintada pelo fundo, na mesma espessura em todos os estados. */
const iaFace = (state: AdsButtonState) => {
  const base =
    "border-(length:--ads-border-width-slim) border-solid text-[var(--ads-status-innovation-300)]";
  if (state === "disabled") {
    return `${base} text-[color-mix(in_srgb,var(--ads-status-innovation-300)_45%,transparent)]`;
  }
  if (state === "hover" || state === "pressed" || props.loading) {
    return `${base} shadow-[0_0_16px_2px_var(--ads-button-ia-glow)]`;
  }
  return base;
};

const faceFor = (type: AdsButtonType, color: AdsButtonColor, state: AdsButtonState) => {
  if (type === "ia") return iaFace(state);
  if (color === "primary") return primaryFace(type, state);
  if (type === "filled") return filledStatus(color, state);
  if (type === "outline") return outlineStatus(color, state);
  if (type === "unfilled") return unfilledStatus(color, state);
  return secondaryStatus(color, state);
};

const primaryFace = (type: AdsButtonType, state: AdsButtonState) => {
  if (type === "filled") return filledPrimary(state);
  if (type === "outline") return outlinePrimary(state);
  if (type === "unfilled") return unfilledPrimary(state);
  return secondaryPrimary(state);
};

const filledPrimary = (state: AdsButtonState) => {
  if (state === "hover") return `bg-[var(--ads-button-primary-hover)] ${filledPrimaryText}`;
  if (state === "pressed") return `bg-[var(--ads-button-primary-pressed)] ${filledPrimaryText}`;
  if (state === "disabled") return `bg-[var(--ads-button-primary-disabled)] ${filledPrimaryText}`;
  return `bg-[var(--ads-button-primary)] ${filledPrimaryText} hover:bg-[var(--ads-button-primary-hover)] active:bg-[var(--ads-button-primary-pressed)]`;
};

const outlinePrimaryHover =
  "border border-[var(--ads-text-brand)] bg-[var(--ads-button-secondary-hover)] text-[var(--ads-text-brand)] shadow-[inset_0_0_0_1px_var(--ads-text-brand)]";

const outlinePrimary = (state: AdsButtonState) => {
  if (state === "hover" || state === "pressed") return outlinePrimaryHover;
  if (state === "disabled") {
    return "border border-[var(--ads-button-primary-disabled)] bg-[color-mix(in_srgb,var(--ads-button-secondary)_50%,transparent)] text-[var(--ads-button-primary-disabled)]";
  }
  return "border border-[var(--ads-text-brand)] text-[var(--ads-text-brand)] hover:bg-[var(--ads-button-secondary-hover)] hover:shadow-[inset_0_0_0_1px_var(--ads-text-brand)]";
};

const unfilledPrimary = (state: AdsButtonState) => {
  if (state === "hover" || state === "pressed") return "text-[var(--ads-button-primary-hover)]";
  if (state === "disabled") return "text-[var(--ads-button-primary-disabled)]";
  return "text-[var(--ads-text-brand)] hover:text-[var(--ads-button-primary-hover)]";
};

const secondaryDisabled = "bg-[var(--ads-button-secondary-disabled)] text-[var(--ads-button-secondary-disabled-text)]";

const secondaryPrimary = (state: AdsButtonState) => {
  if (state === "hover") return `bg-[var(--ads-button-secondary-hover)] ${secondaryText}`;
  if (state === "pressed") return `bg-[var(--ads-button-secondary-pressed)] ${secondaryText}`;
  if (state === "disabled") return secondaryDisabled;
  return `bg-[var(--ads-button-secondary)] ${secondaryText} hover:bg-[var(--ads-button-secondary-hover)] active:bg-[var(--ads-button-secondary-pressed)]`;
};

/**
 * Sucesso, atenção e new usam texto primary no sólido 500: branco não chega no AA.
 * Warning e blocked seguram branco. Pressed escuro volta para o texto de contraste.
 */
const filledStatus = (color: AdsButtonColor, state: AdsButtonState) => {
  if (color === "success") {
    if (state === "hover") return `bg-[var(--ads-status-success-600)] ${ink}`;
    if (state === "pressed") return `bg-[var(--ads-status-success-800)] ${contrast}`;
    if (state === "disabled") return "bg-[var(--ads-status-success-100)] text-[var(--ads-status-success-700)]";
    return `bg-[var(--ads-status-success-500)] ${ink} hover:bg-[var(--ads-status-success-600)] active:bg-[var(--ads-status-success-800)] active:text-[var(--ads-text-contrast)]`;
  }
  if (color === "attention") {
    if (state === "hover") return `bg-[var(--ads-status-attention-600)] ${ink}`;
    if (state === "pressed") return `bg-[var(--ads-status-attention-800)] ${contrast}`;
    if (state === "disabled") return "bg-[var(--ads-status-attention-100)] text-[var(--ads-status-attention-800)]";
    return `bg-[var(--ads-status-attention-500)] ${ink} hover:bg-[var(--ads-status-attention-600)] active:bg-[var(--ads-status-attention-800)] active:text-[var(--ads-text-contrast)]`;
  }
  if (color === "warning") {
    if (state === "hover") return `bg-[var(--ads-status-warning-600)] ${contrast}`;
    if (state === "pressed") return `bg-[var(--ads-status-warning-800)] ${contrast}`;
    if (state === "disabled") return "bg-[var(--ads-status-warning-100)] text-[var(--ads-status-warning-800)]";
    return `bg-[var(--ads-status-warning-500)] ${contrast} hover:bg-[var(--ads-status-warning-600)] active:bg-[var(--ads-status-warning-800)]`;
  }
  if (color === "new") {
    if (state === "hover") return `bg-[var(--ads-status-new-600)] ${ink}`;
    if (state === "pressed") return `bg-[var(--ads-status-new-800)] ${contrast}`;
    if (state === "disabled") return "bg-[var(--ads-status-new-100)] text-[var(--ads-status-new-800)]";
    return `bg-[var(--ads-status-new-500)] ${ink} hover:bg-[var(--ads-status-new-600)] active:bg-[var(--ads-status-new-800)] active:text-[var(--ads-text-contrast)]`;
  }
  if (color === "innovation") {
    if (state === "hover") return `bg-[var(--ads-status-innovation-600)] ${contrast}`;
    if (state === "pressed") return `bg-[var(--ads-status-innovation-800)] ${contrast}`;
    if (state === "disabled") return "bg-[var(--ads-status-innovation-100)] text-[var(--ads-status-innovation-800)]";
    return `bg-[var(--ads-status-innovation-500)] ${contrast} hover:bg-[var(--ads-status-innovation-600)] active:bg-[var(--ads-status-innovation-800)]`;
  }
  if (color === "neutral") {
    if (state === "hover") return `bg-[var(--color-neutral-800)] ${contrast}`;
    if (state === "pressed") return `bg-[var(--color-neutral-900)] ${contrast}`;
    if (state === "disabled") return "bg-[var(--color-neutral-100)] text-[var(--ads-text-tertiary)]";
    return `bg-[var(--color-neutral-700)] ${contrast} hover:bg-[var(--color-neutral-800)] active:bg-[var(--color-neutral-900)]`;
  }
  if (state === "hover") return `bg-[color-mix(in_srgb,var(--ads-status-void-800)_78%,white)] ${contrast}`;
  if (state === "pressed") return `bg-[color-mix(in_srgb,var(--ads-status-void-800)_70%,black)] ${contrast}`;
  if (state === "disabled") return "bg-[var(--ads-status-void-100)] text-[var(--ads-status-void-600)]";
  return `bg-[var(--ads-status-void-800)] ${contrast} hover:bg-[color-mix(in_srgb,var(--ads-status-void-800)_78%,white)] active:bg-[color-mix(in_srgb,var(--ads-status-void-800)_70%,black)]`;
};

const outlineStatus = (color: AdsButtonColor, state: AdsButtonState) => {
  const faces: Record<Exclude<AdsButtonColor, "primary">, Record<AdsButtonState, string>> = {
    success: {
      active:
        "border border-[var(--ads-status-success-700)] text-[var(--ads-status-success-700)] hover:bg-[var(--ads-status-success-100)] hover:shadow-[inset_0_0_0_1px_var(--ads-status-success-700)]",
      hover:
        "border border-[var(--ads-status-success-700)] bg-[var(--ads-status-success-100)] text-[var(--ads-status-success-700)] shadow-[inset_0_0_0_1px_var(--ads-status-success-700)]",
      pressed:
        "border border-[var(--ads-status-success-700)] bg-[var(--ads-status-success-100)] text-[var(--ads-status-success-700)] shadow-[inset_0_0_0_1px_var(--ads-status-success-700)]",
      disabled:
        "border border-[var(--ads-status-success-300)] bg-[color-mix(in_srgb,var(--ads-status-success-100)_50%,transparent)] text-[var(--ads-status-success-300)]",
    },
    attention: {
      active:
        "border border-[var(--ads-status-attention-800)] text-[var(--ads-status-attention-800)] hover:bg-[var(--ads-status-attention-100)] hover:shadow-[inset_0_0_0_1px_var(--ads-status-attention-800)]",
      hover:
        "border border-[var(--ads-status-attention-800)] bg-[var(--ads-status-attention-100)] text-[var(--ads-status-attention-800)] shadow-[inset_0_0_0_1px_var(--ads-status-attention-800)]",
      pressed:
        "border border-[var(--ads-status-attention-800)] bg-[var(--ads-status-attention-100)] text-[var(--ads-status-attention-800)] shadow-[inset_0_0_0_1px_var(--ads-status-attention-800)]",
      disabled:
        "border border-[var(--ads-status-attention-300)] bg-[color-mix(in_srgb,var(--ads-status-attention-100)_50%,transparent)] text-[var(--ads-status-attention-300)]",
    },
    warning: {
      active:
        "border border-[var(--ads-status-warning-600)] text-[var(--ads-status-warning-600)] hover:bg-[var(--ads-status-warning-100)] hover:shadow-[inset_0_0_0_1px_var(--ads-status-warning-600)]",
      hover:
        "border border-[var(--ads-status-warning-600)] bg-[var(--ads-status-warning-100)] text-[var(--ads-status-warning-600)] shadow-[inset_0_0_0_1px_var(--ads-status-warning-600)]",
      pressed:
        "border border-[var(--ads-status-warning-600)] bg-[var(--ads-status-warning-100)] text-[var(--ads-status-warning-600)] shadow-[inset_0_0_0_1px_var(--ads-status-warning-600)]",
      disabled:
        "border border-[var(--ads-status-warning-300)] bg-[color-mix(in_srgb,var(--ads-status-warning-100)_50%,transparent)] text-[var(--ads-status-warning-300)]",
    },
    new: {
      active:
        "border border-[var(--ads-status-new-700)] text-[var(--ads-status-new-700)] hover:bg-[var(--ads-status-new-100)] hover:shadow-[inset_0_0_0_1px_var(--ads-status-new-700)]",
      hover:
        "border border-[var(--ads-status-new-700)] bg-[var(--ads-status-new-100)] text-[var(--ads-status-new-700)] shadow-[inset_0_0_0_1px_var(--ads-status-new-700)]",
      pressed:
        "border border-[var(--ads-status-new-700)] bg-[var(--ads-status-new-100)] text-[var(--ads-status-new-700)] shadow-[inset_0_0_0_1px_var(--ads-status-new-700)]",
      disabled:
        "border border-[var(--ads-status-new-300)] bg-[color-mix(in_srgb,var(--ads-status-new-100)_50%,transparent)] text-[var(--ads-status-new-300)]",
    },
    innovation: {
      active:
        "border border-[var(--ads-status-innovation-700)] text-[var(--ads-status-innovation-700)] hover:bg-[var(--ads-status-innovation-100)] hover:shadow-[inset_0_0_0_1px_var(--ads-status-innovation-700)]",
      hover:
        "border border-[var(--ads-status-innovation-700)] bg-[var(--ads-status-innovation-100)] text-[var(--ads-status-innovation-700)] shadow-[inset_0_0_0_1px_var(--ads-status-innovation-700)]",
      pressed:
        "border border-[var(--ads-status-innovation-700)] bg-[var(--ads-status-innovation-100)] text-[var(--ads-status-innovation-700)] shadow-[inset_0_0_0_1px_var(--ads-status-innovation-700)]",
      disabled:
        "border border-[var(--ads-status-innovation-300)] bg-[color-mix(in_srgb,var(--ads-status-innovation-100)_50%,transparent)] text-[var(--ads-status-innovation-300)]",
    },
    blocked: {
      active:
        "border border-[var(--ads-status-void-800)] text-[var(--ads-status-void-800)] hover:bg-[var(--ads-status-void-100)] hover:shadow-[inset_0_0_0_1px_var(--ads-status-void-800)]",
      hover:
        "border border-[var(--ads-status-void-800)] bg-[var(--ads-status-void-100)] text-[var(--ads-status-void-800)] shadow-[inset_0_0_0_1px_var(--ads-status-void-800)]",
      pressed:
        "border border-[var(--ads-status-void-800)] bg-[var(--ads-status-void-100)] text-[var(--ads-status-void-800)] shadow-[inset_0_0_0_1px_var(--ads-status-void-800)]",
      disabled:
        "border border-[var(--ads-status-void-300)] bg-[color-mix(in_srgb,var(--ads-status-void-100)_50%,transparent)] text-[var(--ads-status-void-300)]",
    },
    neutral: {
      active:
        "border border-[var(--color-neutral-300)] text-[var(--ads-text-primary)] hover:bg-[var(--color-neutral-100)] hover:shadow-[inset_0_0_0_1px_var(--color-neutral-300)]",
      hover:
        "border border-[var(--color-neutral-300)] bg-[var(--color-neutral-100)] text-[var(--ads-text-primary)] shadow-[inset_0_0_0_1px_var(--color-neutral-300)]",
      pressed:
        "border border-[var(--color-neutral-300)] bg-[var(--color-neutral-100)] text-[var(--ads-text-primary)] shadow-[inset_0_0_0_1px_var(--color-neutral-300)]",
      disabled:
        "border border-[var(--color-neutral-300)] bg-[color-mix(in_srgb,var(--color-neutral-100)_50%,transparent)] text-[var(--ads-text-tertiary)]",
    },
  };
  return faces[color === "primary" ? "success" : color][state];
};

const unfilledStatus = (color: AdsButtonColor, state: AdsButtonState) => {
  const faces: Record<Exclude<AdsButtonColor, "primary">, Record<AdsButtonState, string>> = {
    success: {
      active: "text-[var(--ads-status-success-700)] hover:bg-[var(--ads-status-success-100)]",
      hover: "bg-[var(--ads-status-success-100)] text-[var(--ads-status-success-700)]",
      pressed: "bg-[var(--ads-status-success-100)] text-[var(--ads-status-success-700)]",
      disabled: "text-[var(--ads-status-success-300)]",
    },
    attention: {
      active: "text-[var(--ads-status-attention-800)] hover:bg-[var(--ads-status-attention-100)]",
      hover: "bg-[var(--ads-status-attention-100)] text-[var(--ads-status-attention-800)]",
      pressed: "bg-[var(--ads-status-attention-100)] text-[var(--ads-status-attention-800)]",
      disabled: "text-[var(--ads-status-attention-300)]",
    },
    warning: {
      active: "text-[var(--ads-status-warning-600)] hover:bg-[var(--ads-status-warning-100)]",
      hover: "bg-[var(--ads-status-warning-100)] text-[var(--ads-status-warning-600)]",
      pressed: "bg-[var(--ads-status-warning-100)] text-[var(--ads-status-warning-600)]",
      disabled: "text-[var(--ads-status-warning-300)]",
    },
    new: {
      active: "text-[var(--ads-status-new-700)] hover:bg-[var(--ads-status-new-100)]",
      hover: "bg-[var(--ads-status-new-100)] text-[var(--ads-status-new-700)]",
      pressed: "bg-[var(--ads-status-new-100)] text-[var(--ads-status-new-700)]",
      disabled: "text-[var(--ads-status-new-300)]",
    },
    innovation: {
      active: "text-[var(--ads-status-innovation-700)] hover:bg-[var(--ads-status-innovation-100)]",
      hover: "bg-[var(--ads-status-innovation-100)] text-[var(--ads-status-innovation-700)]",
      pressed: "bg-[var(--ads-status-innovation-100)] text-[var(--ads-status-innovation-700)]",
      disabled: "text-[var(--ads-status-innovation-300)]",
    },
    blocked: {
      active: "text-[var(--ads-status-void-800)] hover:bg-[var(--ads-status-void-100)]",
      hover: "bg-[var(--ads-status-void-100)] text-[var(--ads-status-void-800)]",
      pressed: "bg-[var(--ads-status-void-100)] text-[var(--ads-status-void-800)]",
      disabled: "text-[var(--ads-status-void-300)]",
    },
    neutral: {
      active: "text-[var(--ads-text-primary)] hover:bg-[var(--color-neutral-100)]",
      hover: "bg-[var(--color-neutral-100)] text-[var(--ads-text-primary)]",
      pressed: "bg-[var(--color-neutral-100)] text-[var(--ads-text-primary)]",
      disabled: "text-[var(--ads-text-tertiary)]",
    },
  };
  return faces[color === "primary" ? "success" : color][state];
};

const secondaryStatus = (color: AdsButtonColor, state: AdsButtonState) => {
  const faces: Record<Exclude<AdsButtonColor, "primary">, Record<AdsButtonState, string>> = {
    success: {
      active:
        "bg-[var(--ads-status-success-100)] text-[var(--ads-status-success-800)] hover:bg-[var(--ads-status-success-200)] active:bg-[var(--ads-status-success-300)]",
      hover: "bg-[var(--ads-status-success-200)] text-[var(--ads-status-success-800)]",
      pressed: "bg-[var(--ads-status-success-300)] text-[var(--ads-status-success-800)]",
      disabled: secondaryDisabled,
    },
    attention: {
      active:
        "bg-[var(--ads-status-attention-100)] text-[var(--ads-text-primary)] hover:bg-[var(--ads-status-attention-200)] active:bg-[var(--ads-status-attention-300)]",
      hover: "bg-[var(--ads-status-attention-200)] text-[var(--ads-text-primary)]",
      pressed: "bg-[var(--ads-status-attention-300)] text-[var(--ads-text-primary)]",
      disabled: secondaryDisabled,
    },
    warning: {
      active:
        "bg-[var(--ads-status-warning-100)] text-[var(--ads-status-warning-800)] hover:bg-[var(--ads-status-warning-200)] active:bg-[var(--ads-status-warning-300)]",
      hover: "bg-[var(--ads-status-warning-200)] text-[var(--ads-status-warning-800)]",
      pressed: "bg-[var(--ads-status-warning-300)] text-[var(--ads-status-warning-800)]",
      disabled: secondaryDisabled,
    },
    new: {
      active:
        "bg-[var(--ads-status-new-100)] text-[var(--ads-status-new-800)] hover:bg-[var(--ads-status-new-200)] active:bg-[var(--ads-status-new-300)]",
      hover: "bg-[var(--ads-status-new-200)] text-[var(--ads-status-new-800)]",
      pressed: "bg-[var(--ads-status-new-300)] text-[var(--ads-status-new-800)]",
      disabled: secondaryDisabled,
    },
    innovation: {
      active:
        "bg-[var(--ads-status-innovation-100)] text-[var(--ads-status-innovation-800)] hover:bg-[var(--ads-status-innovation-200)] active:bg-[var(--ads-status-innovation-300)]",
      hover: "bg-[var(--ads-status-innovation-200)] text-[var(--ads-status-innovation-800)]",
      pressed: "bg-[var(--ads-status-innovation-300)] text-[var(--ads-status-innovation-800)]",
      disabled: secondaryDisabled,
    },
    blocked: {
      active:
        "bg-[var(--ads-status-void-100)] text-[var(--ads-status-void-800)] hover:bg-[var(--ads-status-void-200)] active:bg-[var(--ads-status-void-300)]",
      hover: "bg-[var(--ads-status-void-200)] text-[var(--ads-status-void-800)]",
      pressed: "bg-[var(--ads-status-void-300)] text-[var(--ads-status-void-800)]",
      disabled: secondaryDisabled,
    },
    neutral: {
      active:
        "bg-[var(--color-neutral-100)] text-[var(--ads-text-primary)] hover:bg-[var(--color-neutral-200)] active:bg-[var(--color-neutral-300)]",
      hover: "bg-[var(--color-neutral-200)] text-[var(--ads-text-primary)]",
      pressed: "bg-[var(--color-neutral-300)] text-[var(--ads-text-primary)]",
      disabled: secondaryDisabled,
    },
  };
  return faces[color === "primary" ? "success" : color][state];
};
</script>

<style>
/* Sem o registro, o navegador não interpola o ângulo e o tamanho: o brilho e a sombra saltariam. */
@property --ads-button-ia-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0deg;
}

@property --ads-button-ia-glow-size {
  syntax: "<length>";
  inherits: false;
  initial-value: 2px;
}

/*
 * A sombra puxa para o lado do brilho: o centro do brilho fica 72deg (20% da volta) à frente do ângulo.
 * O ângulo do conic-gradient conta a partir do topo, no sentido horário.
 */
.ads-button-ia {
  --ads-button-ia-glow-offset: calc(var(--ads-button-ia-glow-size) / 4);
  box-shadow: calc(sin(var(--ads-button-ia-angle) + 72deg) * var(--ads-button-ia-glow-offset))
    calc(cos(var(--ads-button-ia-angle) + 72deg) * -1 * var(--ads-button-ia-glow-offset))
    var(--ads-button-ia-glow-size) calc(var(--ads-button-ia-glow-size) / 8) var(--ads-button-ia-glow);
  animation:
    ads-button-ia-spin 3s linear infinite,
    ads-button-ia-glow 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.ads-button-ia.is-ia-paused {
  animation-play-state: paused;
}

/*
 * A borda é transparente e o fundo pinta por baixo dela: o miolo fica no padding-box e a cor da borda no border-box.
 * Assim a espessura e o raio são os da borda nativa, sem camada extra desalinhada no subpixel.
 */
.ads-button-ia-face {
  --ads-button-ia-edge: linear-gradient(var(--ads-button-ia-border) 0 0);
  border-color: transparent;
  background:
    linear-gradient(var(--ads-button-ia-background) 0 0) padding-box,
    var(--ads-button-ia-edge) border-box;
}

.ads-button-ia-face.is-ia-muted {
  --ads-button-ia-edge: linear-gradient(
    color-mix(in srgb, var(--ads-button-ia-border) 40%, var(--ads-button-ia-background)) 0 0
  );
}

.ads-button-ia {
  --ads-button-ia-track: color-mix(in srgb, var(--ads-button-ia-border) 20%, var(--ads-button-ia-background));
  --ads-button-ia-edge: conic-gradient(
    from var(--ads-button-ia-angle),
    var(--ads-button-ia-track) 0%,
    var(--ads-button-ia-glow) 12%,
    var(--ads-status-innovation-500) 20%,
    var(--ads-button-ia-border) 24%,
    var(--ads-button-ia-track) 28%
  );
}

@keyframes ads-button-ia-spin {
  to {
    --ads-button-ia-angle: 360deg;
  }
}

/* Cresce durante a volta e recolhe no fim, para o loop não saltar. */
@keyframes ads-button-ia-glow {
  0% {
    --ads-button-ia-glow-size: 2px;
  }
  80% {
    --ads-button-ia-glow-size: 16px;
  }
  100% {
    --ads-button-ia-glow-size: 2px;
  }
}

.ads-button-ia:hover,
.ads-button-ia:active {
  --ads-button-ia-edge: linear-gradient(var(--ads-button-ia-border) 0 0);
  box-shadow: 0 0 16px 2px var(--ads-button-ia-glow);
}

@media (prefers-reduced-motion: reduce) {
  .ads-button-ia {
    --ads-button-ia-edge: linear-gradient(var(--ads-button-ia-border) 0 0);
    box-shadow: 0 0 8px 0 var(--ads-button-ia-glow);
    animation: none;
  }
}
</style>
