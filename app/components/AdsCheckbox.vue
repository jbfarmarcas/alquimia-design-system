<template>
  <label
    class="inline-flex items-center gap-2"
    :class="isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <span class="relative grid size-[16px] shrink-0 place-items-center">
      <input
        v-bind="attrs"
        type="checkbox"
        class="peer col-start-1 row-start-1 size-[16px] appearance-none rounded-[var(--ads-radius-xsm)] border-2 bg-[var(--ads-surface-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)] disabled:cursor-not-allowed"
        :class="isDisabled
          ? 'border-[var(--ads-button-primary-disabled)] checked:bg-[var(--ads-button-primary-disabled)] indeterminate:border-[var(--ads-button-primary-disabled)] indeterminate:bg-[var(--ads-button-primary-disabled)]'
          : 'border-[var(--ads-text-brand)] checked:border-[var(--ads-text-brand)] checked:bg-[var(--ads-text-brand)] indeterminate:border-[var(--ads-text-brand)] indeterminate:bg-[var(--ads-text-brand)]'"
        :checked="model"
        :indeterminate="showIndeterminate"
        :disabled="isDisabled"
        @change="onChange"
      >
      <img
        :src="checkUrl"
        width="12"
        height="12"
        alt=""
        class="pointer-events-none col-start-1 row-start-1 opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-0"
      >
      <img
        :src="minusUrl"
        width="12"
        height="12"
        alt=""
        class="pointer-events-none col-start-1 row-start-1 opacity-0 peer-indeterminate:opacity-100"
      >
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
import checkUrl from "../assets/ads/checkbox-check.svg";
import minusUrl from "../assets/ads/checkbox-minus.svg";

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
const indeterminate = defineModel<boolean>("indeterminate", { default: false });
const attrs = useAttrs();
const slots = useSlots();

const hasLabel = computed(() => props.label.length > 0 || Boolean(slots.default));
const isDisabled = computed(() => props.disabled);
const showIndeterminate = computed(() => indeterminate.value && !model.value);

const onChange = (event: Event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || isDisabled.value) return;
  model.value = input.checked;
  indeterminate.value = false;
};
</script>
