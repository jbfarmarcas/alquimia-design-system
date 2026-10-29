<template>
  <label
    class="inline-flex items-center"
    :class="[hasLabel ? 'gap-[var(--ads-switch-gap)]' : '', isDisabled ? 'cursor-not-allowed' : 'cursor-pointer']"
  >
    <span class="relative h-[var(--ads-switch-height)] w-[var(--ads-switch-width)] shrink-0">
      <input
        v-bind="attrs"
        type="checkbox"
        role="switch"
        class="peer absolute inset-0 appearance-none rounded-[var(--ads-switch-radius)] bg-[var(--ads-switch-off)] transition-colors duration-150 ease-out checked:bg-[var(--ads-switch-on)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)] disabled:cursor-not-allowed disabled:bg-[var(--ads-switch-disabled)] disabled:checked:bg-[var(--ads-switch-disabled-on)]"
        :checked="model"
        :disabled="isDisabled"
        :aria-checked="model"
        @change="onChange"
      >
      <span
        class="pointer-events-none absolute top-[var(--ads-switch-inset)] left-0 size-[var(--ads-switch-thumb)] translate-x-[var(--ads-switch-inset)] rounded-full bg-[var(--ads-switch-thumb-color)] transition-transform duration-150 ease-out peer-checked:translate-x-[calc(var(--ads-switch-width)-var(--ads-switch-thumb)-var(--ads-switch-inset))]"
      />
    </span>
    <span
      v-if="hasLabel"
      class="text-[length:var(--ads-switch-label-size)] font-normal leading-[1.3]"
      :class="isDisabled ? 'text-[var(--ads-text-tertiary)]' : 'text-[var(--ads-switch-label)]'"
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
