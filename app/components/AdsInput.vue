<template>
  <div class="flex w-full min-w-0 flex-col gap-0.5">
    <div
      v-if="label"
      class="flex items-center gap-0.5 text-[length:var(--ads-input-label-size)] leading-[1.2]"
      :class="supportClass"
    >
      <label :for="fieldId">{{ label }}</label>
      <InvertedTooltip v-if="info" :text="info">
        <span class="inline-flex">
          <UIcon name="i-lucide-info" class="size-3 text-xs" />
        </span>
      </InvertedTooltip>
    </div>

    <div
      class="flex h-[var(--ads-input-height)] items-center transition-colors gap-[var(--ads-input-gap)] rounded-[var(--ads-input-radius)] px-[var(--ads-input-padding-x)]"
      :class="fieldClass"
      :data-state="visualState"
    >
      <input
        :id="fieldId"
        :value="displayValue"
        :type="type"
        class="min-w-0 flex-1 bg-transparent text-[length:var(--ads-input-font-size)] leading-[1.3] outline-none placeholder:text-current disabled:cursor-not-allowed"
        :class="type === 'number' ? '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' : undefined"
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
      <span v-if="suffix" class="shrink-0 text-[length:var(--ads-input-font-size)] leading-[1.3]">{{ suffix }}</span>
      <UIcon v-if="icon" :name="icon" class="size-4 shrink-0 text-base" />
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
import { computed, useId } from "vue";
import InvertedTooltip from "./InvertedTooltip.vue";

export type AdsInputState = "default" | "active" | "focus" | "error" | "disabled" | "ai";

const props = withDefaults(
  defineProps<{
    label?: string;
    hint?: string;
    error?: string;
    info?: string;
    placeholder?: string;
    disabled?: boolean;
    icon?: string;
    type?: "text" | "number";
    suffix?: string;
    min?: string | number;
    step?: string | number;
    /** Estado congelado para a documentação. `null` segue o campo. */
    state?: AdsInputState | null;
  }>(),
  {
    label: "",
    hint: "",
    error: "",
    info: "",
    placeholder: "",
    disabled: false,
    icon: "",
    type: "text",
    suffix: "",
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

const displayValue = computed(() =>
  model.value === undefined || model.value === null ? "" : String(model.value),
);

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  model.value = value;
};

const isDisabled = computed(() => props.disabled || props.state === "disabled");

const visualState = computed<AdsInputState>(() => {
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
    ? "hover:not-focus-within:border-[var(--ads-input-hover-border)] focus-within:border-(length:--ads-border-width-slim) focus-within:border-[var(--ads-input-focus-border)]"
    : "";

  if (visualState.value === "disabled") {
    return "border border-[var(--ads-input-disabled-border)] bg-[var(--ads-input-disabled-background)] text-[var(--ads-input-disabled-text)]";
  }
  if (visualState.value === "error") {
    return `border-(length:--ads-border-width-slim) border-[var(--ads-input-error-border)] bg-[var(--ads-input-background)] text-[var(--ads-input-text)] ${focus}`;
  }
  if (visualState.value === "focus") {
    return "border-(length:--ads-border-width-slim) border-[var(--ads-input-focus-border)] bg-[var(--ads-input-background)] text-[var(--ads-input-text)]";
  }
  if (visualState.value === "ai") {
    return "border border-[#7358cc] bg-[#f3f0ff] text-[var(--ads-text-secondary)]";
  }
  return `border border-[var(--ads-input-border)] bg-[var(--ads-input-background)] text-[var(--ads-input-text)] ${focus}`;
});
</script>
