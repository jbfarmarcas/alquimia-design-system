<template>
  <div class="flex min-w-0 flex-col gap-0.5">
    <div
      v-if="label || info"
      class="flex items-center gap-0.5 text-[length:var(--ads-number-label-size)] leading-[1.2]"
      :class="supportClass"
    >
      <label v-if="label" :for="fieldId">{{ label }}</label>
      <InvertedTooltip v-if="info" :text="info">
        <span class="inline-flex">
          <UIcon name="i-lucide-info" class="size-3 text-xs" />
        </span>
      </InvertedTooltip>
    </div>

    <div
      class="flex h-[var(--ads-number-height)] w-full transition-colors min-w-0 items-center gap-[var(--ads-number-gap)] rounded-[var(--ads-number-radius)] px-[var(--ads-number-padding-x)]"
      :class="fieldClass"
      :data-state="visualState"
    >
      <input
        :id="fieldId"
        ref="inputEl"
        :value="displayValue"
        type="number"
        inputmode="decimal"
        size="4"
        class="w-0 min-w-0 flex-1 bg-transparent text-[length:var(--ads-number-font-size)] leading-[1.3] outline-none placeholder:text-current disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :min="min"
        :step="step"
        :aria-invalid="error ? true : undefined"
        :aria-describedby="supportText ? supportId : undefined"
        @input="onInput"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      >
      <div class="flex shrink-0 flex-col">
        <button
          type="button"
          class="inline-flex size-4 items-center justify-center rounded-sm text-current hover:bg-[var(--ads-button-secondary-hover)] disabled:cursor-not-allowed"
          aria-label="Aumentar valor"
          :disabled="isDisabled"
          @mousedown.prevent="stepBy(1)"
        >
          <UIcon name="i-lucide-chevron-up" class="size-3.5" />
        </button>
        <button
          type="button"
          class="inline-flex size-4 items-center justify-center rounded-sm text-current hover:bg-[var(--ads-button-secondary-hover)] disabled:cursor-not-allowed"
          aria-label="Diminuir valor"
          :disabled="isDisabled"
          @mousedown.prevent="stepBy(-1)"
        >
          <UIcon name="i-lucide-chevron-down" class="size-3.5" />
        </button>
      </div>
      <span v-if="suffix" class="shrink-0 text-[length:var(--ads-number-font-size)] leading-[1.3]">{{ suffix }}</span>
    </div>

    <p
      v-if="supportText"
      :id="supportId"
      class="text-xs leading-[1.2]"
      :class="supportClass"
    >
      {{ supportText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId, useTemplateRef } from "vue";
import InvertedTooltip from "./InvertedTooltip.vue";

export type AdsNumberInputState = "default" | "active" | "focus" | "error" | "disabled";

const props = withDefaults(
  defineProps<{
    label?: string;
    hint?: string;
    info?: string;
    error?: string;
    placeholder?: string;
    suffix?: string;
    disabled?: boolean;
    min?: string | number;
    step?: string | number;
    /** Estado congelado para a documentação. `null` segue o campo. */
    state?: AdsNumberInputState | null;
  }>(),
  {
    label: "",
    hint: "",
    info: "",
    error: "",
    placeholder: "",
    suffix: "",
    disabled: false,
    state: null,
  },
);

const model = defineModel<string | number>({ default: "" });

const emit = defineEmits<{
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const fieldId = useId();
const supportId = useId();
const inputEl = useTemplateRef<HTMLInputElement>("inputEl");

const displayValue = computed(() =>
  model.value === undefined || model.value === null ? "" : String(model.value),
);

const onInput = (event: Event) => {
  model.value = (event.target as HTMLInputElement).value;
};

const isDisabled = computed(() => props.disabled || props.state === "disabled");

const stepBy = (direction: 1 | -1) => {
  const input = inputEl.value;
  if (!input || isDisabled.value) return;
  if (input.value === "") input.value = String(props.min ?? 0);
  if (direction > 0) input.stepUp();
  else input.stepDown();
  model.value = input.value;
};

const visualState = computed<AdsNumberInputState>(() => {
  if (isDisabled.value) return "disabled";
  if (props.state) return props.state;
  if (props.error) return "error";
  return displayValue.value ? "active" : "default";
});

const supportText = computed(() => props.error || props.hint);
const supportClass = computed(() =>
  visualState.value === "disabled"
    ? "text-[var(--ads-text-tertiary)]"
    : "text-[var(--ads-text-secondary)]",
);

const fieldClass = computed(() => {
  const interactiveFocus = props.state === null && !isDisabled.value && !props.error;
  const focus = interactiveFocus
    ? "hover:not-focus-within:border-[var(--ads-number-hover-border)] focus-within:border-(length:--ads-border-width-slim) focus-within:border-[var(--ads-number-focus-border)]"
    : "";

  if (visualState.value === "disabled") {
    return "border border-[var(--ads-number-disabled-border)] bg-[var(--ads-number-disabled-background)] text-[var(--ads-number-disabled-text)]";
  }
  if (visualState.value === "error") {
    return `border-(length:--ads-border-width-slim) border-[var(--ads-number-error-border)] bg-[var(--ads-number-background)] text-[var(--ads-number-text)] ${focus}`;
  }
  if (visualState.value === "focus") {
    return "border-(length:--ads-border-width-slim) border-[var(--ads-number-focus-border)] bg-[var(--ads-number-background)] text-[var(--ads-number-text)]";
  }
  return `border border-[var(--ads-number-border)] bg-[var(--ads-number-background)] text-[var(--ads-number-text)] ${focus}`;
});
</script>
