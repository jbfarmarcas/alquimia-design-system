<template>
  <label
    class="inline-flex items-center gap-2"
    :class="isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <span class="relative grid size-[16px] shrink-0 place-items-center">
      <input
        v-bind="attrs"
        type="radio"
        class="peer absolute inset-0 m-0 size-full appearance-none opacity-0 disabled:cursor-not-allowed"
        :class="isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'"
        :name="fieldName"
        :value="value"
        :checked="checked"
        :disabled="isDisabled"
        @change="onChange"
      >
      <span
        class="pointer-events-none col-start-1 row-start-1 size-[16px] rounded-full border-2 bg-[var(--ads-surface-card)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--ads-text-brand)]"
        :class="isDisabled
          ? 'border-[var(--ads-button-primary-disabled)] peer-checked:border-[var(--ads-button-primary-disabled)] peer-checked:bg-[var(--ads-button-primary-disabled)]'
          : 'border-[var(--ads-text-brand)] peer-checked:border-[var(--ads-text-brand)] peer-checked:bg-[var(--ads-text-brand)]'"
      />
      <span class="pointer-events-none col-start-1 row-start-1 size-[8px] rounded-full bg-white opacity-0 peer-checked:opacity-100" />
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
import { computed, useAttrs, useId, useSlots } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label?: string;
    value?: string | number | boolean;
    name?: string;
    disabled?: boolean;
  }>(),
  {
    label: "",
    value: "on",
    name: "",
    disabled: false,
  },
);

const model = defineModel<string | number | boolean>({ default: "" });
const attrs = useAttrs();
const slots = useSlots();
const autoName = useId();

const hasLabel = computed(() => props.label.length > 0 || Boolean(slots.default));
const isDisabled = computed(() => props.disabled);
const fieldName = computed(() => props.name || autoName);
const checked = computed(() => model.value === props.value);

const onChange = () => {
  if (isDisabled.value) return;
  model.value = props.value;
};
</script>
