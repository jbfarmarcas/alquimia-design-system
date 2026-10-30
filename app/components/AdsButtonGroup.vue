<template>
  <div class="inline-flex" role="radiogroup" :aria-label="ariaLabel">
    <button
      v-for="(option, index) in options"
      :key="option.value"
      type="button"
      role="radio"
      class="-ml-px h-[var(--ads-button-group-height)] border border-[var(--ads-button-group-border)] px-4 text-[length:var(--ads-button-group-font-size)] text-[var(--ads-text-primary)] first:ml-0 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]"
      :class="[
        index === 0 ? 'rounded-l-[var(--ads-radius-xsm)]' : '',
        index === options.length - 1 ? 'rounded-r-[var(--ads-radius-xsm)]' : '',
        model === option.value ? 'z-[1] bg-[var(--ads-button-group-selected)] font-bold' : 'bg-[var(--ads-surface-card)] font-normal',
      ]"
      :aria-checked="model === option.value"
      @click="model = option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
export type AdsButtonGroupOption = {
  value: string;
  label: string;
};

withDefaults(
  defineProps<{
    options: AdsButtonGroupOption[];
    ariaLabel?: string;
  }>(),
  {
    ariaLabel: "Grupo de botões",
  },
);

const model = defineModel<string>({ required: true });
</script>
