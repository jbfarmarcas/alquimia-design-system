<template>
  <label
    class="inline-flex items-center"
    :class="[hasLabel ? 'gap-2' : '', isDisabled ? 'cursor-not-allowed' : 'cursor-pointer']"
  >
    <span class="relative h-[18px] w-[32px] shrink-0">
      <input
        v-bind="attrs"
        type="checkbox"
        role="switch"
        class="peer absolute inset-0 appearance-none rounded-[9px] bg-[var(--ads-border-subtle)] transition-colors duration-150 ease-out checked:bg-[var(--ads-button-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)] disabled:cursor-not-allowed disabled:bg-[var(--color-neutral-200)] disabled:checked:bg-[var(--ads-button-primary-disabled)]"
        :checked="model"
        :disabled="isDisabled"
        :aria-checked="model"
        @change="onChange"
      >
      <span
        class="pointer-events-none absolute top-[3px] left-0 size-[12px] translate-x-[3.207px] rounded-full bg-white transition-transform duration-150 ease-out peer-checked:translate-x-[17px]"
      />
    </span>
    <span
      v-if="hasLabel"
      class="text-[14px] font-normal leading-[1.3]"
      :class="isDisabled ? 'text-[var(--ads-text-tertiary)]' : 'text-[var(--ads-text-secondary)]'"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label?: string;
    disabled?: boolean;
  }>(),
  {
    label: "",
    disabled: false,
  },
);

const model = defineModel<boolean>({ default: false });
const attrs = useAttrs();
const slots = useSlots();

const hasLabel = computed(() => props.label.length > 0 || Boolean(slots.default));
const isDisabled = computed(() => props.disabled);

const onChange = (event: Event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || isDisabled.value) return;
  model.value = input.checked;
};
</script>
