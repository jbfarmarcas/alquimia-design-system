<template>
  <span
    class="inline-flex h-[var(--ads-broadcast-height)] shrink-0 items-center gap-1 overflow-hidden rounded-full border px-[var(--ads-broadcast-padding-x)] py-1"
    :class="surface.shell"
  >
    <span class="flex size-3.5 shrink-0 items-center justify-center" aria-hidden="true">
      <span class="size-[var(--ads-broadcast-mark)] rounded-full" :class="surface.mark" />
    </span>
    <span class="text-[length:var(--ads-broadcast-font-size)] font-bold leading-[1.2] whitespace-nowrap" :class="surface.label">
      {{ label }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

export type AdsBroadcastStatus = "warning" | "success";

const props = withDefaults(
  defineProps<{
    label?: string;
    status?: AdsBroadcastStatus;
  }>(),
  {
    label: "LIVE",
    status: "warning",
  },
);

const surfaces: Record<AdsBroadcastStatus, { shell: string; mark: string; label: string }> = {
  warning: {
    shell: "border-[var(--ads-broadcast-warning)] bg-[var(--ads-broadcast-warning-bg)]",
    mark: "bg-[var(--ads-broadcast-warning)]",
    label: "text-[var(--ads-broadcast-warning)]",
  },
  success: {
    shell: "border-[var(--ads-broadcast-success)] bg-[var(--ads-broadcast-success-bg)]",
    mark: "bg-[var(--ads-broadcast-success)]",
    label: "text-[var(--ads-broadcast-success)]",
  },
};

const surface = computed(() => surfaces[props.status]);
</script>
