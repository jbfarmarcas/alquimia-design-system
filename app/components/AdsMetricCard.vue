<template>
  <component
    :is="as"
    :type="as === 'button' ? 'button' : undefined"
    :disabled="as === 'button' ? disabled : undefined"
    class="flex h-full min-w-0 flex-col gap-2 border p-4 text-left font-normal"
    :class="[radiusClass, surfaceClass]"
  >
    <div class="flex flex-col items-start gap-1">
      <div class="flex min-w-0 items-center gap-2">
        <p :class="labelClass">{{ title }}</p>
        <InvertedTooltip v-if="hint" :text="hint" class="shrink-0">
          <UIcon
            name="i-lucide-help-circle"
            size="xs"
            class="align-middle text-[var(--ads-border-icon-support)]"
          />
        </InvertedTooltip>
      </div>
      <slot name="status" />
    </div>

    <div class="flex min-w-0 items-center gap-2">
      <p class="min-w-0" :class="empty ? emptyValueClass : valueClass">
        {{ value }}
      </p>
      <span
        v-if="!empty && slots.delta"
        class="inline-flex shrink-0 items-center gap-1"
        :class="deltaClass"
      >
        <slot name="delta" />
      </span>
    </div>

    <div
      v-if="caption || slots.footer"
      class="mt-auto flex items-end justify-between gap-2"
    >
      <p v-if="caption" :class="captionClass">{{ caption }}</p>
      <slot name="footer" />
    </div>

    <div v-if="slots.default" class="min-h-0 flex-1">
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import InvertedTooltip from "./InvertedTooltip.vue";

/**
 * Número em destaque.
 * Rótulo: 14px, medium. Valor: 20px, bold. Variação: 14px, bold. Legenda: 12px, regular.
 */
const labelClass =
  "text-[length:var(--ads-font-size-xxs)] font-medium leading-[var(--ads-line-height-sm)] text-[var(--ads-text-secondary)]";
const valueClass =
  "text-[length:var(--ads-font-size-rg)] font-bold leading-[var(--ads-line-height-sm)] text-[var(--ads-text-primary)] tabular-nums";
const emptyValueClass =
  "text-[length:var(--ads-font-size-xs)] font-medium leading-[var(--ads-line-height-sm)] text-[var(--ads-text-tertiary)]";
const deltaClass =
  "text-[length:var(--ads-font-size-xxs)] font-bold leading-[var(--ads-line-height-sm)] tabular-nums";
const captionClass =
  "text-[length:var(--ads-font-size-xxxs)] font-normal leading-[var(--ads-line-height-md)] text-[var(--ads-text-secondary)]";

const props = withDefaults(
  defineProps<{
    /** Rótulo acima do número. */
    title: string;
    /** Número ou frase principal. */
    value: string;
    /** Texto do ícone de ajuda ao lado do rótulo. */
    hint?: string;
    /** Linha curta abaixo do número, como o valor atual. */
    caption?: string;
    /** Valor ausente: 16px medium, cor tertiary. */
    empty?: boolean;
    /** `button` quando o cartão é a própria ação. */
    as?: "div" | "button";
    disabled?: boolean;
    /** Realce de item escolhido, como um filtro ativo. */
    selected?: boolean;
  }>(),
  {
    hint: undefined,
    caption: undefined,
    empty: false,
    as: "div",
    disabled: false,
    selected: false,
  },
);

const slots = useSlots();

const radiusClass = "rounded-[var(--ads-radius-md)]";

const surfaceClass = computed(() => {
  const classes = [
    props.selected
      ? "border-[var(--color-neutral-300)] bg-[var(--color-neutral-100)]"
      : "border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)]",
  ];

  if (props.as === "button") {
    classes.push(
      "cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-primary)] disabled:cursor-not-allowed disabled:opacity-50",
    );
    if (!props.selected && !props.disabled) {
      classes.push("hover:bg-[var(--color-neutral-100)]");
    }
  }

  return classes;
});
</script>
