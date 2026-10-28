<template>
  <div
    class="flex min-h-16 flex-col justify-center gap-2 rounded-[var(--ads-radius-sm)] border px-4 py-3"
    :class="surface.card"
    :role="status === 'error' ? 'alert' : 'status'"
  >
    <p
      v-if="message"
      class="text-sm font-semibold leading-5"
      :class="surface.message"
    >
      {{ message }}
    </p>
    <div class="flex items-center justify-between gap-3">
      <div class="flex min-w-0 items-center gap-2">
        <span
          class="inline-flex size-8 shrink-0 items-center justify-center rounded-[var(--ads-radius-sm)]"
          :class="surface.icon"
          aria-hidden="true"
        >
          <UIcon :name="resolvedIcon" class="size-4" />
        </span>
        <div class="min-w-0">
          <InvertedTooltip :text="name">
            <p class="truncate text-sm font-semibold leading-5 text-[var(--ads-text-primary)]">
              {{ name }}
            </p>
          </InvertedTooltip>
          <p
            v-if="detail"
            class="text-xs font-normal leading-4 text-[var(--ads-text-secondary)]"
          >
            {{ detail }}
          </p>
        </div>
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
import InvertedTooltip from "./InvertedTooltip.vue";

export type AdsFileCardStatus = "success" | "error";

const props = withDefaults(
  defineProps<{
    /** Nome do arquivo. */
    name: string;
    /** Linha de apoio, como o tamanho. */
    detail?: string;
    status?: AdsFileCardStatus;
    /** Texto do problema, acima do arquivo. */
    message?: string;
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

const surfaces: Record<AdsFileCardStatus, { card: string; icon: string; message: string; glyph: string }> = {
  success: {
    card: "border-[var(--ads-status-success-500)] bg-[color-mix(in_srgb,var(--ads-status-success-100)_var(--ads-opacity-light),transparent)]",
    icon: "bg-[var(--ads-status-success-100)] text-[var(--ads-status-success-800)]",
    message: "text-[var(--ads-status-success-800)]",
    glyph: "i-lucide-cloud-check",
  },
  error: {
    card: "border-[var(--ads-status-warning-500)] bg-[color-mix(in_srgb,var(--ads-status-warning-100)_var(--ads-opacity-light),transparent)]",
    icon: "bg-[var(--ads-status-warning-100)] text-[var(--ads-status-warning-500)]",
    message: "text-[var(--ads-status-warning-500)]",
    glyph: "i-lucide-ban",
  },
};

const surface = computed(() => surfaces[props.status]);
const resolvedIcon = computed(() => props.icon || surface.value.glyph);
</script>
