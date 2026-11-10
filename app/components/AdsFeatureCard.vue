<!--
  AdsFeatureCard — atalho de módulo sobre o AdsCard. A casca (borda, raio, fundo, hover, foco)
  é a do AdsCard; aqui só muda o conteúdo: ícone, título, descrição, seta e rodapé.
-->
<template>
  <AdsCard
    :as="to ? NuxtLink : 'button'"
    v-bind="rootAttrs"
    :disabled="disabled"
    :hoverable="hoverable"
    class="group w-[var(--ads-feature-width)] max-w-full"
    :style="cardStyle"
    @click="onClick"
  >
    <span class="flex h-full w-full flex-col gap-[var(--ads-feature-gap)]">
      <span class="flex items-start gap-3">
        <span
          class="grid size-[var(--ads-feature-icon-box)] shrink-0 place-items-center rounded-[var(--ads-radius-sm)]"
          :class="iconBoxClass"
        >
          <UIcon :name="icon" class="size-6" />
        </span>
        <span class="min-w-0 flex-1">
          <span class="block text-[length:var(--ads-feature-title-size)] font-bold leading-[1.3]" :class="titleClass">
            {{ title }}
          </span>
          <AdsTooltip
            :description="description"
            :show-title="false"
            :disabled="!isDescriptionTruncated"
            align="start"
          >
            <span
              ref="descriptionEl"
              class="mt-1 block line-clamp-2 text-[length:var(--ads-feature-body-size)] leading-relaxed"
              :class="descriptionClass"
            >
              {{ description }}
            </span>
          </AdsTooltip>
        </span>
        <UIcon
          v-if="!disabled"
          name="i-lucide-arrow-right"
          class="size-5 shrink-0 text-[var(--ads-border-icon-support)] transition-colors duration-150 ease-out"
          :class="{ 'group-hover:text-[var(--ads-text-secondary)] group-focus-visible:text-[var(--ads-text-secondary)]': hoverable }"
        />
      </span>

      <AdsPill
        v-if="disabled"
        class="mt-auto self-start"
        tone="secondary"
        status="blocked"
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
    </span>
  </AdsCard>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useResizeObserver } from "@vueuse/core";
import { NuxtLink } from "#components";
import AdsCard from "./AdsCard.vue";
import AdsPill from "./AdsPill.vue";
import type { AdsPillStatus, AdsPillTone } from "./AdsPill.vue";
import AdsTooltip from "./AdsTooltip.vue";

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
  | "ai";

const iconBoxByColor: Record<AdsFeatureCardColor, string> = {
  primary: "bg-[var(--ads-button-secondary)] text-[var(--ads-text-brand)]",
  success: "bg-[var(--ads-status-success-100)] text-[var(--ads-status-success-800)]",
  attention: "bg-[var(--ads-status-attention-100)] text-[var(--ads-status-attention-800)]",
  warning: "bg-[var(--ads-status-warning-100)] text-[var(--ads-status-warning-800)]",
  new: "bg-[var(--ads-status-new-100)] text-[var(--ads-status-new-800)]",
  blocked: "bg-[var(--ads-status-void-100)] text-[var(--ads-status-void-800)]",
  ai: "bg-[var(--ads-surface-ai)] text-[var(--ads-text-ai)]",
};


const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    icon: string;
    /** Cor da caixa do ícone. O hover é o padrão dos cards, igual para todas as cores. */
    color?: AdsFeatureCardColor;
    /** Vira link. Sem valor, continua botão. */
    to?: RouteLocationRaw;
    disabled?: boolean;
    /** Hover padrão dos cards (borda e sombra neutras; a seta escurece). false desliga. */
    hoverable?: boolean;
    badges?: AdsFeatureCardBadge[];
    footerIcon?: string;
    footerText?: string;
  }>(),
  {
    color: "primary",
    to: undefined,
    disabled: false,
    hoverable: true,
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

/** O link não tem disabled nativo: sai da ordem do Tab e avisa por aria-disabled. */
const rootAttrs = computed(() =>
  props.to
    ? { to: props.to, tabindex: props.disabled ? -1 : undefined, "aria-disabled": props.disabled || undefined }
    : {},
);

/**
 * A casca e o hover são os do AdsCard. Aqui só entra o desabilitado sem opacidade,
 * porque o conteúdo já troca para as cores terciárias.
 */
const cardStyle = computed(() => ({
  "--ads-card-disabled-opacity": "1",
}));

const iconBoxClass = computed(() =>
  props.disabled
    ? "bg-[var(--ads-button-secondary-disabled)] text-[var(--ads-text-tertiary)]"
    : iconBoxByColor[props.color],
);

const titleClass = computed(() =>
  props.disabled ? "text-[var(--ads-text-tertiary)]" : "text-[var(--ads-feature-title)]",
);

const descriptionClass = computed(() =>
  props.disabled ? "text-[var(--ads-text-tertiary)]" : "text-[var(--ads-feature-body)]",
);

const onClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit("click", event);
    return;
  }
  event.preventDefault();
};
</script>
