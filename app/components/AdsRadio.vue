<template>
  <label
    class="inline-flex items-center gap-[var(--ads-radio-gap)]"
    :class="isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <span class="relative grid size-[var(--ads-radio-size)] shrink-0 place-items-center">
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
        class="pointer-events-none col-start-1 row-start-1 size-[var(--ads-radio-size)] rounded-full border-[length:var(--ads-radio-border-width)] bg-[var(--ads-radio-background)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--ads-text-brand)]"
        :class="isDisabled
          ? 'border-[var(--ads-radio-disabled)] peer-checked:border-[var(--ads-radio-disabled)] peer-checked:bg-[var(--ads-radio-disabled)]'
          : 'border-[var(--ads-radio-border)] peer-checked:border-[var(--ads-radio-border)] peer-checked:bg-[var(--ads-radio-border)]'"
      />
      <span class="pointer-events-none col-start-1 row-start-1 size-[var(--ads-radio-dot)] rounded-full bg-[var(--ads-radio-dot-color)] opacity-0 peer-checked:opacity-100" />
    </span>
    <span
      v-if="hasLabel"
      class="text-[length:var(--ads-radio-label-size)] font-normal leading-[1.3]"
      :class="isDisabled ? 'text-[var(--ads-text-tertiary)]' : 'text-[var(--ads-radio-label)]'"
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
