<template>
  <div class="flex w-full min-w-0 flex-col gap-0.5">
    <div
      class="flex items-center gap-2 rounded-[var(--ads-search-radius)] transition-colors px-[var(--ads-search-padding-x)]"
      :class="[fieldClass, size === 'sm' ? 'h-[var(--ads-search-sm-height)]' : 'h-[var(--ads-search-md-height)]']"
      :data-state="visualState"
    >
      <UIcon :name="icon" :class="iconClass" />
      <input
        v-model="model"
        type="search"
        autocomplete="off"
        class="min-w-0 flex-1 bg-transparent leading-[1.3] outline-none placeholder:text-current disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:hidden"
        :class="size === 'sm' ? 'text-[length:var(--ads-search-sm-font-size)]' : 'text-[length:var(--ads-search-md-font-size)]'"
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
    ? "text-[var(--ads-search-placeholder)]"
    : "text-[var(--ads-search-text)]";
  const interactiveFocus = props.state === null && !isDisabled.value;
  const focus = interactiveFocus
    ? "hover:not-focus-within:border-[var(--ads-search-hover-border)] focus-within:border-(length:--ads-border-width-slim) focus-within:border-[var(--ads-search-focus-border)]"
    : "";

  if (visualState.value === "disabled") {
    return `border border-[var(--ads-search-disabled-border)] bg-[var(--ads-search-disabled-background)] ${tone}`;
  }
  if (visualState.value === "focus") {
    return `border-(length:--ads-border-width-slim) border-[var(--ads-search-focus-border)] bg-[var(--ads-search-background)] ${tone}`;
  }
  return `border border-[var(--ads-search-border)] bg-[var(--ads-search-background)] ${tone} ${focus}`;
});
</script>
