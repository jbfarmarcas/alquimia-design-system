<template>
  <label
    class="inline-flex items-center gap-[var(--ads-checkbox-gap)]"
    :class="isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <span class="relative grid size-[var(--ads-checkbox-size)] shrink-0 place-items-center">
      <input
        v-bind="attrs"
        type="checkbox"
        class="peer col-start-1 row-start-1 size-[var(--ads-checkbox-size)] appearance-none rounded-[var(--ads-checkbox-radius)] border-[length:var(--ads-checkbox-border-width)] bg-[var(--ads-checkbox-background)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)] disabled:cursor-not-allowed"
        :class="isDisabled
          ? 'border-[var(--ads-checkbox-disabled)] checked:bg-[var(--ads-checkbox-disabled)] indeterminate:border-[var(--ads-checkbox-disabled)] indeterminate:bg-[var(--ads-checkbox-disabled)]'
          : 'border-[var(--ads-checkbox-border)] checked:border-[var(--ads-checkbox-checked)] checked:bg-[var(--ads-checkbox-checked)] indeterminate:border-[var(--ads-checkbox-checked)] indeterminate:bg-[var(--ads-checkbox-checked)]'"
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
      class="text-[length:var(--ads-checkbox-label-size)] font-normal leading-[1.3]"
      :class="isDisabled ? 'text-[var(--ads-text-tertiary)]' : 'text-[var(--ads-checkbox-label)]'"
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
