<template>
  <div class="flex w-full min-w-0 flex-col gap-0.5">
    <label
      v-if="label"
      :for="fieldId"
      class="text-[length:var(--ads-textarea-label-size)] leading-[1.2]"
      :class="supportClass"
    >
      {{ label }}
    </label>

    <div
      class="relative flex min-h-[var(--ads-textarea-min-height)] rounded-[var(--ads-textarea-radius)]"
      :class="fieldClass"
      :data-state="visualState"
    >
      <textarea
        :id="fieldId"
        v-model="model"
        class="min-h-[calc(var(--ads-textarea-min-height)-24px)] w-full flex-1 resize-y bg-transparent p-[var(--ads-textarea-padding)] pe-8 text-[length:var(--ads-textarea-font-size)] leading-[1.3] outline-none placeholder:text-current disabled:cursor-not-allowed"
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
      class="text-[length:var(--ads-textarea-label-size)] leading-[1.2]"
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
  const text = visualState.value === "default" || visualState.value === "disabled"
    ? "text-[var(--ads-textarea-placeholder)]"
    : "text-[var(--ads-textarea-text)]";

  if (visualState.value === "disabled") {
    return `border border-[var(--ads-textarea-disabled-border)] bg-[var(--ads-textarea-disabled-background)] ${text}`;
  }
  if (visualState.value === "error") {
    return `border-(length:--ads-border-width-slim) border-[var(--ads-textarea-error-border)] bg-[var(--ads-textarea-background)] ${text}`;
  }
  if (visualState.value === "focus") {
    return `border-(length:--ads-border-width-slim) border-[var(--ads-textarea-focus-border)] bg-[var(--ads-textarea-background)] ${text}`;
  }
  const focus = interactiveFocus
    ? "focus-within:border-(length:--ads-border-width-slim) focus-within:border-[var(--ads-textarea-focus-border)]"
    : "";
  return `border border-[var(--ads-textarea-border)] bg-[var(--ads-textarea-background)] ${text} ${focus}`;
});
</script>
