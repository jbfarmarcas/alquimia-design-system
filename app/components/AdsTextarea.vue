<template>
  <div class="flex w-full min-w-0 flex-col gap-0.5">
    <label
      v-if="label"
      :for="fieldId"
      class="text-xs leading-[1.2]"
      :class="supportClass"
    >
      {{ label }}
    </label>

    <div
      class="relative flex min-h-[153px] rounded-[var(--ads-radius-sm)]"
      :class="fieldClass"
      :data-state="visualState"
    >
      <textarea
        :id="fieldId"
        v-model="model"
        class="min-h-[129px] w-full flex-1 resize-y bg-transparent p-3 pe-8 text-sm leading-[1.3] outline-none placeholder:text-current disabled:cursor-not-allowed"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :aria-invalid="error ? true : undefined"
        :aria-describedby="supportText ? supportId : undefined"
      />
      <UIcon
        name="i-lucide-move-diagonal-2"
        class="pointer-events-none absolute end-3 bottom-3 size-4 text-base text-[var(--ads-text-tertiary)]"
      />
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

export type AdsTextareaState = "default" | "active" | "focus" | "error" | "disabled";

const props = withDefaults(
  defineProps<{
    label?: string;
    hint?: string;
    error?: string;
    placeholder?: string;
    disabled?: boolean;
    /** Estado congelado para a documentação. `null` segue o campo. */
    state?: AdsTextareaState | null;
  }>(),
  {
    label: "",
    hint: "",
    error: "",
    placeholder: "",
    disabled: false,
    state: null,
  },
);

const model = defineModel<string>({ default: "" });

const fieldId = useId();
const supportId = useId();

const isDisabled = computed(() => props.disabled || props.state === "disabled");

const visualState = computed<AdsTextareaState>(() => {
  if (isDisabled.value) return "disabled";
  if (props.state) return props.state;
  if (props.error) return "error";
  return model.value ? "active" : "default";
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
    ? "focus-within:border-(length:--ads-border-width-slim) focus-within:border-[var(--color-primary-400)]"
    : "";
  const text = visualState.value === "default" || visualState.value === "disabled"
    ? "text-[var(--ads-text-tertiary)]"
    : "text-[var(--ads-text-secondary)]";

  if (visualState.value === "disabled") {
    return `border border-[var(--ads-border-subtle)] bg-neutral-100 ${text}`;
  }
  if (visualState.value === "error") {
    return `border-(length:--ads-border-width-slim) border-[var(--color-error-300)] bg-[var(--ads-surface-card)] ${text}`;
  }
  if (visualState.value === "focus") {
    return `border-(length:--ads-border-width-slim) border-[var(--color-primary-400)] bg-[var(--ads-surface-card)] ${text}`;
  }
  return `border border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] ${text} ${focus}`;
});
</script>
