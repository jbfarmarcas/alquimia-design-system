<template>
  <div class="flex w-full flex-col items-start gap-2" :role="status === 'error' ? 'alert' : 'status'">
    <!-- Erro: o problema fica acima do arquivo -->
    <p
      v-if="status === 'error' && message"
      class="flex items-center gap-1 text-[length:var(--ads-font-size-xxxs)] leading-[1.2] text-[var(--ads-status-warning-800)]"
    >
      <UIcon name="i-lucide-circle-alert" class="size-4 shrink-0" aria-hidden="true" />
      {{ message }}
    </p>

    <div
      class="flex min-h-[var(--ads-file-min-height)] w-full items-center gap-3 rounded-[var(--ads-file-radius)] px-[var(--ads-file-padding-x)] py-[var(--ads-file-padding-y)]"
      :class="surface.card"
    >
      <span
        class="inline-flex size-[var(--ads-file-icon-box)] shrink-0 items-center justify-center rounded-[var(--ads-file-radius)]"
        :class="surface.icon"
        aria-hidden="true"
      >
        <UIcon :name="resolvedIcon" class="size-6" />
      </span>

      <div class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
        <AdsTooltip :description="name" :show-title="false" align="start" class="max-w-full">
          <p class="max-w-full truncate text-[length:var(--ads-file-title-size)] font-medium leading-[1.3] text-[var(--ads-text-primary)]">
            {{ name }}
          </p>
        </AdsTooltip>
        <p v-if="detail" class="text-[length:var(--ads-file-detail-size)] leading-[1.2] text-[var(--ads-text-secondary)]">
          {{ detail }}
        </p>
      </div>

      <AdsButton
        v-if="removable"
        type="unfilled"
        color="neutral"
        size="sm"
        icon="i-lucide-trash-2"
        :aria-label="removeLabel"
        @click="emit('remove')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AdsButton from "./AdsButton.vue";
import AdsTooltip from "./AdsTooltip.vue";

export type AdsFileCardStatus = "success" | "error";

const props = withDefaults(
  defineProps<{
    /** Nome do arquivo. */
    name: string;
    /** Linha de apoio, como o tamanho. */
    detail?: string;
    status?: AdsFileCardStatus;
    /** Texto do problema, acima do arquivo. Só aparece no erro. */
    message?: string;
    /** Ícone Lucide. Padrão: planilha no sucesso, arquivo com X no erro. */
    icon?: string;
    removable?: boolean;
    removeLabel?: string;
  }>(),
  {
    detail: undefined,
    status: "success",
    message: undefined,
    icon: undefined,
    removable: false,
    removeLabel: "Remover arquivo",
  },
);

const emit = defineEmits<{
  remove: [];
}>();

const surfaces: Record<AdsFileCardStatus, { card: string; icon: string; glyph: string }> = {
  success: {
    card: "border border-[var(--ads-status-success-600)] bg-[color-mix(in_srgb,var(--ads-status-success-100)_var(--ads-opacity-medium),transparent)]",
    icon: "bg-[var(--ads-status-success-100)] text-[var(--ads-status-success-800)]",
    glyph: "i-lucide-file-spreadsheet",
  },
  error: {
    card: "border-[1.5px] border-[var(--ads-status-warning-300)] bg-[color-mix(in_srgb,var(--ads-status-warning-100)_30%,transparent)]",
    icon: "bg-[color-mix(in_srgb,var(--ads-status-warning-100)_var(--ads-opacity-medium),transparent)] text-[var(--ads-status-warning-800)]",
    glyph: "i-lucide-file-x",
  },
};

const surface = computed(() => surfaces[props.status]);
const resolvedIcon = computed(() => props.icon || surface.value.glyph);
</script>
