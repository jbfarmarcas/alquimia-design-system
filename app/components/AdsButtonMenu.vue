<template>
  <div
    class="flex w-[var(--ads-button-menu-width)] flex-col overflow-hidden rounded-[var(--ads-radius-xsm)] bg-[var(--ads-surface-card)] shadow-[var(--ads-shadow-level-1)]"
    role="menu"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      role="menuitem"
      class="flex flex-col border-b-[0.5px] border-[var(--ads-button-menu-border)] px-4 pt-2 pb-4 text-left last:border-b-0 hover:bg-ads-neutro-claro-20 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--ads-text-brand)]"
      @click="emit('select', option.value)"
    >
      <span class="flex h-10 items-center gap-2 text-[length:var(--ads-button-menu-title-size)] leading-[1.3] font-medium text-[var(--ads-button-menu-title)]">
        <UIcon v-if="showIcons" :name="option.icon || 'i-lucide-sparkles'" class="size-4 shrink-0" />
        {{ option.title }}
      </span>
      <span v-if="showSubtitles && option.subtitle" class="line-clamp-2 text-[length:var(--ads-button-menu-subtitle-size)] leading-[1.2] text-[var(--ads-button-menu-subtitle)]">
        {{ option.subtitle }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
export type AdsButtonMenuOption = {
  value: string;
  title: string;
  subtitle?: string;
  icon?: string;
};

withDefaults(
  defineProps<{
    options: AdsButtonMenuOption[];
    showSubtitles?: boolean;
    showIcons?: boolean;
  }>(),
  {
    showSubtitles: true,
    showIcons: true,
  },
);

const emit = defineEmits<{
  select: [value: string];
}>();
</script>
