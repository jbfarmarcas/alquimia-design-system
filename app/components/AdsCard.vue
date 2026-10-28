<template>
  <component
    :is="as"
    :type="as === 'button' ? 'button' : undefined"
    :disabled="as === 'button' ? disabled : undefined"
    class="h-full border p-4 text-left"
    :class="[radiusClass, surfaceClass]"
  >
    <div
      v-if="showHeader"
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="min-w-0 flex-1">
        <slot name="header">
          <p class="flex items-center justify-between gap-2 font-bold text-[var(--ads-text-primary)]">
            <span class="min-w-0">{{ title }}</span>
            <slot name="hint" />
          </p>
        </slot>
      </div>
      <div v-if="$slots.actions" class="flex shrink-0 flex-wrap items-center gap-2">
        <slot name="actions" />
      </div>
    </div>

    <div
      v-if="description || $slots.default"
      :class="showHeader ? 'mt-2' : undefined"
    >
      <slot>
        <p class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
          {{ description }}
        </p>
      </slot>
    </div>

    <div
      v-if="footerText || $slots.footer"
      class="flex flex-wrap items-start justify-between gap-3"
      :class="hasContentAboveFooter ? 'mt-4' : undefined"
    >
      <slot name="footer">
        <p class="text-xs text-[var(--ads-text-secondary)]">
          {{ footerText }}
        </p>
      </slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    /** Título em negrito. O slot header substitui. */
    title?: string;
    /** Texto de apoio. O slot padrão substitui. */
    description?: string;
    /** Linha curta no rodapé. O slot footer substitui. */
    footerText?: string;
    /** `button` quando o cartão é a própria ação. */
    as?: "div" | "button";
    disabled?: boolean;
    /** Realce de item escolhido, como um filtro ativo. */
    selected?: boolean;
    /** `sm` (8px) em cartões grandes; `md` (12px) é o padrão. */
    radius?: "sm" | "md";
  }>(),
  {
    as: "div",
    disabled: false,
    selected: false,
    radius: "md",
  },
);

const radiusClass = computed(() =>
  props.radius === "sm"
    ? "rounded-[var(--ads-radius-sm)]"
    : "rounded-[var(--ads-radius-md)]",
);

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

const slots = useSlots();

const showHeader = computed(
  () =>
    Boolean(props.title) ||
    Boolean(slots.header || slots.actions),
);

const hasContentAboveFooter = computed(
  () =>
    showHeader.value ||
    Boolean(props.description) ||
    Boolean(slots.default),
);
</script>
