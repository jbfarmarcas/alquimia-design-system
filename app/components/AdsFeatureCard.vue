<template>
  <component
    :is="to ? NuxtLink : 'button'"
    v-bind="rootAttrs"
    class="flex w-[396px] max-w-full flex-col gap-4 rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] p-4 text-left transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    :class="disabled ? 'cursor-not-allowed' : 'hover:border-[var(--ads-text-brand)]'"
    @click="onClick"
  >
    <span class="flex items-start gap-3">
      <span
        class="grid size-12 shrink-0 place-items-center rounded-[var(--ads-radius-sm)]"
        :class="iconBoxClass"
      >
        <UIcon :name="icon" class="size-6" />
      </span>
      <span class="min-w-0 flex-1">
        <span class="block font-bold leading-[1.3]" :class="titleClass">
          {{ title }}
        </span>
        <InvertedTooltip
          :text="description"
          :disabled="!isDescriptionTruncated"
        >
          <span
            ref="descriptionEl"
            class="mt-1 block line-clamp-2 text-sm leading-relaxed"
            :class="descriptionClass"
          >
            {{ description }}
          </span>
        </InvertedTooltip>
      </span>
      <UIcon
        v-if="!disabled"
        name="i-lucide-arrow-right"
        class="size-5 shrink-0 text-[var(--ads-border-icon-support)]"
      />
    </span>

    <AdsPill
      v-if="disabled"
      class="mt-auto"
      tone="secondary"
      status="neutral"
      label="Em breve"
    />
    <span v-else-if="hasFooter" class="mt-auto flex flex-wrap items-center gap-2">
      <AdsPill
        v-for="badge in badges"
        :key="badge.label"
        :tone="badge.tone ?? 'secondary'"
        :status="badge.status ?? 'default'"
        :label="badge.label"
      />
      <span
        v-if="footerText"
        class="inline-flex items-center gap-1 text-xs text-[var(--ads-text-secondary)]"
      >
        <UIcon v-if="footerIcon" :name="footerIcon" class="size-3.5" />
        {{ footerText }}
      </span>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useResizeObserver } from "@vueuse/core";
import { NuxtLink } from "#components";
import AdsPill from "./AdsPill.vue";
import type { AdsPillStatus, AdsPillTone } from "./AdsPill.vue";
import InvertedTooltip from "./InvertedTooltip.vue";

export interface AdsFeatureCardBadge {
  label: string;
  tone?: AdsPillTone;
  status?: AdsPillStatus;
}

/** Fundo e texto do AdsPill secondary. Primary segue o ícone do próprio card no catálogo. */
export type AdsFeatureCardColor =
  | "primary"
  | "success"
  | "attention"
  | "warning"
  | "new"
  | "blocked"
  | "innovation";

const iconBoxByColor: Record<AdsFeatureCardColor, string> = {
  primary: "bg-[var(--ads-button-secondary)] text-[var(--ads-text-brand)]",
  success: "bg-[var(--ads-status-success-100)] text-[var(--ads-status-success-800)]",
  attention: "bg-[var(--ads-status-attention-100)] text-[var(--ads-status-attention-800)]",
  warning: "bg-[var(--ads-status-warning-100)] text-[var(--ads-status-warning-800)]",
  new: "bg-[var(--ads-status-new-100)] text-[var(--ads-status-new-800)]",
  blocked: "bg-[var(--ads-status-void-100)] text-[var(--ads-status-void-800)]",
  innovation: "bg-[var(--ads-status-innovation-100)] text-[var(--ads-status-innovation-800)]",
};

const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    icon: string;
    /** Cor do ícone. Sem valor, fica na cor da marca. */
    color?: AdsFeatureCardColor;
    /** Vira link. Sem valor, continua botão. */
    to?: RouteLocationRaw;
    disabled?: boolean;
    badges?: AdsFeatureCardBadge[];
    footerIcon?: string;
    footerText?: string;
  }>(),
  {
    color: "primary",
    to: undefined,
    disabled: false,
    badges: undefined,
    footerIcon: undefined,
    footerText: undefined,
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const hasFooter = computed(
  () => (props.badges?.length ?? 0) > 0 || Boolean(props.footerText),
);

const descriptionEl = ref<HTMLElement | null>(null);
const isDescriptionTruncated = ref(false);

const syncDescriptionTruncation = () => {
  const element = descriptionEl.value;
  if (!element) {
    isDescriptionTruncated.value = false;
    return;
  }
  isDescriptionTruncated.value = element.scrollHeight - element.clientHeight > 1;
};

useResizeObserver(descriptionEl, syncDescriptionTruncation);

onMounted(() => {
  void nextTick(syncDescriptionTruncation);
});

watch(
  () => props.description,
  () => {
    void nextTick(syncDescriptionTruncation);
  },
);

const rootAttrs = computed(() =>
  props.to
    ? {
        to: props.to,
        tabindex: props.disabled ? -1 : undefined,
        "aria-disabled": props.disabled || undefined,
      }
    : {
        type: "button" as const,
        disabled: props.disabled,
      },
);

const iconBoxClass = computed(() =>
  props.disabled
    ? "bg-[var(--ads-button-secondary-disabled)] text-[var(--ads-text-tertiary)]"
    : iconBoxByColor[props.color],
);

const titleClass = computed(() =>
  props.disabled ? "text-[var(--ads-text-tertiary)]" : "text-[var(--ads-text-primary)]",
);

const descriptionClass = computed(() =>
  props.disabled ? "text-[var(--ads-text-tertiary)]" : "text-[var(--ads-text-secondary)]",
);

const onClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit("click", event);
    return;
  }
  event.preventDefault();
};
</script>
