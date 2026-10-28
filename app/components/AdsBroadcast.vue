<template>
  <span
    class="inline-flex h-6 shrink-0 items-center gap-1 overflow-hidden rounded-full border px-2 py-1"
    :class="surface.shell"
  >
    <span class="flex size-3.5 shrink-0 items-center justify-center" aria-hidden="true">
      <span class="size-2 rounded-full" :class="surface.mark" />
    </span>
    <span class="text-xs font-bold leading-[1.2] whitespace-nowrap" :class="surface.label">
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
    shell: "border-[#dc0034] bg-[#ffbdcd]",
    mark: "bg-[#dc0034]",
    label: "text-[#dc0034]",
  },
  success: {
    shell: "border-[#15c57e] bg-[#c3ffe6]",
    mark: "bg-[#15c57e]",
    label: "text-[#15c57e]",
  },
};

const surface = computed(() => surfaces[props.status]);
</script>
