<!--
  AdsFeatureCard — atalho de módulo sobre o AdsCard. A casca (borda, raio, fundo, foco)
  é a do AdsCard. O hover é próprio: título e seta vão para a cor da variação e o fundo
  da pílula escurece. O conteúdo é pílula, título, descrição, seta e ações.
-->
<template>
  <AdsCard
    :as="shellIsButton ? (to ? NuxtLink : 'button') : 'div'"
    v-bind="shellIsButton ? interactiveAttrs : {}"
    :disabled="shellIsButton ? disabled : undefined"
    :hoverable="false"
    class="group w-[var(--ads-feature-width)] max-w-full"
    :style="cardStyle"
    @click="onShellClick"
  >
    <span class="flex h-full w-full flex-col gap-[var(--ads-feature-gap)]">
      <component
        :is="mainTag"
        v-bind="hasActions ? interactiveAttrs : {}"
        :type="mainTag === 'button' ? 'button' : undefined"
        :disabled="mainTag === 'button' ? disabled : undefined"
        class="flex w-full min-w-0 items-start gap-3 text-left"
        :class="hasActions ? mainControlClass : undefined"
        @click="onMainClick"
      >
        <span
          class="grid size-[var(--ads-feature-icon-box)] shrink-0 place-items-center rounded-[var(--ads-radius-sm)]"
          :class="iconBoxClass"
        >
          <UIcon :name="icon" class="size-5" />
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
          :class="accentHoverClass"
        />
      </component>

      <AdsPill
        v-if="disabled"
        class="mt-auto self-start"
        tone="secondary"
        status="blocked"
        label="Em breve"
      />
      <span v-else-if="hasActions" class="mt-auto flex flex-wrap items-center gap-x-[var(--ads-space-xs)] gap-y-2">
        <component
          :is="action.to ? NuxtLink : 'button'"
          v-for="(action, index) in actions"
          :key="`${action.label}-${index}`"
          :to="action.to"
          :type="action.to ? undefined : 'button'"
          class="inline-flex items-center gap-1 rounded-[var(--ads-radius-xsm)] bg-[var(--ads-surface-main)] px-[var(--ads-space-nano)] py-[var(--ads-space-quark)] text-[length:var(--ads-font-size-xxxs)] font-medium leading-[1.2] text-[var(--ads-text-secondary)] transition-colors hover:text-[var(--ads-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-border-focused)]"
          @click="onActionClick($event, action)"
        >
          <UIcon v-if="action.icon" :name="action.icon" class="size-3.5 shrink-0" />
          {{ action.label }}
        </component>
      </span>
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

/** Ação do rodapé. Com `to`, vira link; sem ele, continua botão. */
export interface AdsFeatureCardAction {
  label: string;
  icon?: string;
  to?: RouteLocationRaw;
}

/**
 * Cor da pílula do ícone.
 * primary: fundo `--ads-feature-accent-blue`, ícone da marca.
 * success: fundo `--ads-feature-accent-green`, ícone `--ads-feature-accent-green-icon`.
 */
export type AdsFeatureCardColor =
  | "primary"
  | "success"
  | "attention"
  | "warning"
  | "new"
  | "blocked"
  | "ai";

/** Fundo e cor da variação. O hover do título e da seta usa `fg`; o fundo da pílula mistura os dois. */
const iconTone: Record<AdsFeatureCardColor, { bg: string; fg: string }> = {
  primary: { bg: "var(--ads-feature-accent-blue)", fg: "var(--ads-text-brand)" },
  success: { bg: "var(--ads-feature-accent-green)", fg: "var(--ads-feature-accent-green-icon)" },
  attention: { bg: "var(--ads-status-attention-100)", fg: "var(--ads-status-attention-800)" },
  warning: { bg: "var(--ads-status-warning-100)", fg: "var(--ads-status-warning-800)" },
  new: { bg: "var(--ads-status-new-100)", fg: "var(--ads-status-new-800)" },
  blocked: { bg: "var(--ads-status-void-100)", fg: "var(--ads-status-void-800)" },
  ai: { bg: "var(--ads-surface-ai)", fg: "var(--ads-text-ai)" },
};


const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    icon: string;
    /** Cor da pílula. No hover, título e seta usam essa cor e o fundo da pílula escurece. */
    color?: AdsFeatureCardColor;
    /** Vira link. Sem valor, continua botão. */
    to?: RouteLocationRaw;
    disabled?: boolean;
    /** Hover colore título e seta e escurece a pílula. false desliga. */
    hoverable?: boolean;
    /** Ações do rodapé, cada uma com o próprio clique. A casca deixa de ser o botão. */
    actions?: AdsFeatureCardAction[];
    badges?: AdsFeatureCardBadge[];
    footerIcon?: string;
    footerText?: string;
  }>(),
  {
    color: "primary",
    to: undefined,
    disabled: false,
    hoverable: true,
    actions: undefined,
    badges: undefined,
    footerIcon: undefined,
    footerText: undefined,
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
  action: [action: AdsFeatureCardAction, event: MouseEvent];
}>();

const hasActions = computed(() => (props.actions?.length ?? 0) > 0);
/** Sem ações, o cartão inteiro é o botão. Com ações, só o miolo é, para o rodapé ter cliques próprios. */
const shellIsButton = computed(() => !hasActions.value);

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
const interactiveAttrs = computed(() =>
  props.to
    ? { to: props.to, tabindex: props.disabled ? -1 : undefined, "aria-disabled": props.disabled || undefined }
    : {},
);

const mainTag = computed(() => (hasActions.value ? (props.to ? NuxtLink : "button") : "span"));

const mainControlClass =
  "cursor-pointer rounded-[var(--ads-radius-xsm)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-border-focused)] disabled:cursor-not-allowed aria-disabled:cursor-not-allowed";

/** Título e seta. O foco do cartão e o do miolo disparam o mesmo estado. */
const accentHoverClass = computed(() =>
  props.hoverable && !props.disabled
    ? "group-hover:text-[var(--ads-feature-icon-fg)] group-focus-visible:text-[var(--ads-feature-icon-fg)] group-has-[:focus-visible]:text-[var(--ads-feature-icon-fg)]"
    : "",
);

/**
 * O AdsCard não aplica o hover de borda. Aqui ficam o padding, as cores da variação
 * e o desabilitado sem opacidade, porque o conteúdo já troca para as cores terciárias.
 */
const cardStyle = computed(() => ({
  "--ads-card-disabled-opacity": "1",
  "--ads-feature-icon-bg": iconTone[props.color].bg,
  "--ads-feature-icon-fg": iconTone[props.color].fg,
  padding: "var(--ads-feature-padding)",
}));

const iconBoxClass = computed(() =>
  props.disabled
    ? "bg-[var(--ads-button-secondary-disabled)] text-[var(--ads-text-tertiary)]"
    : [
        "bg-[var(--ads-feature-icon-bg)] text-[var(--ads-feature-icon-fg)] transition-colors duration-150 ease-out",
        props.hoverable
          ? "group-hover:bg-[color-mix(in_srgb,var(--ads-feature-icon-bg)_82%,var(--ads-feature-icon-fg))] group-focus-visible:bg-[color-mix(in_srgb,var(--ads-feature-icon-bg)_82%,var(--ads-feature-icon-fg))] group-has-[:focus-visible]:bg-[color-mix(in_srgb,var(--ads-feature-icon-bg)_82%,var(--ads-feature-icon-fg))]"
          : "",
      ],
);

const titleClass = computed(() =>
  props.disabled
    ? "text-[var(--ads-text-tertiary)]"
    : ["text-[var(--ads-feature-title)] transition-colors duration-150 ease-out", accentHoverClass.value],
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

const onShellClick = (event: MouseEvent) => {
  if (shellIsButton.value) onClick(event);
};

const onMainClick = (event: MouseEvent) => {
  if (hasActions.value) onClick(event);
};

const onActionClick = (event: MouseEvent, action: AdsFeatureCardAction) => {
  event.stopPropagation();
  if (props.disabled) {
    event.preventDefault();
    return;
  }
  emit("action", action, event);
};
</script>
