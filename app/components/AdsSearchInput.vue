<template>
  <div class="flex w-full min-w-0 flex-col gap-0.5">
    <div
      class="flex items-center gap-2 rounded-[var(--ads-radius-pill)] px-3"
      :class="[fieldClass, size === 'sm' ? 'h-10' : 'h-[45px]']"
      :data-state="visualState"
    >
      <UIcon :name="icon" :class="iconClass" />
      <input
        v-model="model"
        type="search"
        autocomplete="off"
        class="min-w-0 flex-1 bg-transparent leading-[1.3] outline-none placeholder:text-current disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:hidden"
        :class="size === 'sm' ? 'text-sm' : 'text-base'"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :aria-label="ariaLabel || placeholder"
        :aria-describedby="hint ? hintId : undefined"
      >
      <button
        v-if="showClear"
        type="button"
        class="inline-flex shrink-0"
        aria-label="Limpar busca"
        @click="model = ''"
      >
        <UIcon name="i-lucide-x" :class="iconClass" />
      </button>
    </div>
    <p
      v-if="hint"
      :id="hintId"
      :class="hintClass"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from "vue";

export type AdsSearchInputState = "default" | "active" | "focus" | "disabled";
export type AdsSearchInputSize = "md" | "sm";

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    ariaLabel?: string;
    hint?: string;
    disabled?: boolean;
    icon?: string;
    size?: AdsSearchInputSize;
    /** Estado congelado para a documentação. `null` segue o campo. */
    state?: AdsSearchInputState | null;
  }>(),
  {
    placeholder: "Pesquisar",
    ariaLabel: "",
    hint: "",
    disabled: false,
    icon: "i-lucide-search",
    size: "md",
    state: null,
  },
);

const model = defineModel<string>({ default: "" });

const hintId = useId();

const isDisabled = computed(() => props.disabled || props.state === "disabled");

const visualState = computed<AdsSearchInputState>(() => {
  if (isDisabled.value) return "disabled";
  if (props.state) return props.state;
  return model.value ? "active" : "default";
});

const showClear = computed(() => visualState.value === "active" || visualState.value === "focus");

const iconClass = computed(() =>
  props.size === "sm"
    ? "size-4 shrink-0 text-base"
    : "size-[18px] shrink-0 text-[18px]",
);

const hintClass = computed(() => {
  const tone = visualState.value === "disabled"
    ? "text-[var(--ads-text-tertiary)]"
    : "text-[var(--ads-text-secondary)]";
  const type = props.size === "sm" ? "text-[10px] leading-[1.1]" : "text-xs leading-[1.2]";
  return `${type} ${tone}`;
});

const fieldClass = computed(() => {
  const tone = visualState.value === "default" || visualState.value === "disabled"
    ? "text-[var(--ads-text-tertiary)]"
    : "text-[var(--ads-text-secondary)]";
  const interactiveFocus = props.state === null && !isDisabled.value;
  const focus = interactiveFocus
    ? "focus-within:border-(length:--ads-border-width-slim) focus-within:border-[var(--ads-text-brand)]"
    : "";

  if (visualState.value === "disabled") {
    return `border border-[var(--ads-text-tertiary)] bg-neutral-100 ${tone}`;
  }
  if (visualState.value === "focus") {
    return `border-(length:--ads-border-width-slim) border-[var(--ads-text-brand)] bg-[var(--ads-surface-card)] ${tone}`;
  }
  return `border border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] ${tone} ${focus}`;
});
</script>
