<!--
  AdsSelectItem — item da lista (Figma: _Dropdown Item). Peça interna do AdsSelect.
  Seleção simples: selecionado ganha fundo azul claro e título em negrito.
  Checkbox: caixa azul à esquerda; selecionado deixa o título em negrito.
-->
<template>
  <button
    type="button"
    class="relative flex min-h-12 w-full items-center gap-3 p-4 text-left transition-colors focus-visible:outline-none"
    :class="[surfaceClass, divider ? dividerClass : '']"
    :disabled="disabled"
    :role="mode === 'checkbox' ? 'checkbox' : 'option'"
    :aria-checked="checkedState"
    :aria-selected="mode === 'radio' ? selected : undefined"
    @click="emit('select')"
  >
    <span
      v-if="mode === 'checkbox'"
      class="flex size-4 shrink-0 items-center justify-center rounded-[var(--ads-radius-xsm)] border-2 border-[var(--ads-text-brand)]"
      :class="[
        selected || indeterminate ? 'bg-[var(--ads-surface-brand)]' : 'bg-[var(--ads-surface-card)]',
        { 'opacity-40': disabled },
      ]"
      aria-hidden="true"
    >
      <UIcon v-if="indeterminate" name="i-lucide-minus" class="size-3 text-[var(--ads-text-contrast)]" />
      <UIcon v-else-if="selected" name="i-lucide-check" class="size-3 text-[var(--ads-text-contrast)]" />
    </span>

    <span class="flex min-w-0 flex-1 flex-col gap-0.5">
      <span
        v-if="badge"
        class="flex items-center gap-1 text-[length:var(--ads-font-size-xxxs)] font-bold leading-[1.2]"
        :class="badgeClass"
      >
        <UIcon v-if="badgeIcon" :name="badgeIcon" class="size-3 shrink-0" aria-hidden="true" />
        {{ badge.label }}
      </span>
      <AdsTooltip
        :description="label"
        :show-title="false"
        :disabled="!needsTooltip"
        wing="down"
        align="start"
      >
        <span class="block min-w-0 truncate text-sm leading-[1.3]" :class="titleClass">
          {{ displayLabel }}
        </span>
      </AdsTooltip>
      <span
        v-if="subtitle"
        class="block min-w-0 truncate text-sm font-normal leading-[1.3]"
        :class="disabled ? 'text-[var(--ads-text-tertiary)]' : 'text-[var(--ads-text-secondary)]'"
      >
        {{ subtitle }}
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AdsTooltip from "./AdsTooltip.vue";
import {
  filterLabelNeedsTooltip,
  truncateFilterLabel,
  type AdsFilterOptionBadge,
} from "../utils/ads-filter-select";

const props = withDefaults(
  defineProps<{
    label: string;
    /** radio: seleção simples. checkbox: seleção múltipla. */
    mode: "checkbox" | "radio";
    selected?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    /** Linha de apoio abaixo do título. */
    subtitle?: string;
    /** Texto curto acima do título, como "Novo!" (brand) ou "Sugestão Inteligente" (ai). */
    badge?: AdsFilterOptionBadge;
    /** Linha de 1px embaixo. O painel desliga no último item. */
    divider?: boolean;
  }>(),
  {
    selected: false,
    indeterminate: false,
    disabled: false,
    subtitle: undefined,
    badge: undefined,
    divider: true,
  },
);

const emit = defineEmits<{ select: [] }>();

const displayLabel = computed(() => truncateFilterLabel(props.label));
const needsTooltip = computed(() => filterLabelNeedsTooltip(props.label));

const checkedState = computed(() => {
  if (props.mode !== "checkbox") return undefined;
  if (props.indeterminate) return "mixed";
  return props.selected;
});

const dividerClass =
  "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[var(--ads-border-subtle)]";

const surfaceClass = computed(() => {
  if (props.disabled) return "cursor-not-allowed bg-[var(--ads-surface-card)]";
  if (props.mode === "radio" && props.selected) return "bg-[var(--ads-button-secondary)]";
  return "bg-[var(--ads-surface-card)] hover:bg-ads-neutro-claro-20 focus-visible:bg-ads-neutro-claro-20";
});

const titleClass = computed(() => {
  if (props.disabled) return "font-medium text-[var(--ads-text-tertiary)]";
  if (props.selected) return "font-bold text-[var(--ads-text-primary)]";
  return "font-medium text-[var(--ads-text-secondary)]";
});

const badgeClass = computed(() => {
  if (props.disabled) return "text-[var(--ads-text-tertiary)]";
  return props.badge?.tone === "ai" ? "text-[var(--ads-text-ai)]" : "text-[var(--ads-text-brand)]";
});

/** Selo de IA usa sparkles quando não vem ícone. */
const badgeIcon = computed(() => props.badge?.icon ?? (props.badge?.tone === "ai" ? "i-lucide-sparkles" : undefined));
</script>
