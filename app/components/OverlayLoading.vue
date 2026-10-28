<template>
  <UModal
    :model-value="true"
    :dismissible="false"
    :close="isClosable ? { onClick: handleClose } : false"
    :ui="{
      overlay: 'backdrop-blur-lg',
      content: 'bg-transparent shadow-none ring-0',
    }"
  >
    <template #description>
      <div class="sr-only">
        {{ description }}
      </div>
    </template>

    <template #title>
      <div class="sr-only">
        {{ title }}
      </div>
    </template>

    <template #content>
      <div class="text-center">
        <div class="mb-4 flex justify-center">
          <div
            class="flex aspect-square h-20 items-center justify-center rounded-full"
            :class="iconWrapperClass"
          >
            <img :src="animationSrc" :alt="variant" class="w-full">
          </div>
        </div>

        <h3 class="mb-2 text-lg font-semibold" :class="titleColorClass">
          {{ title }}
        </h3>

        <p
          class="mb-4 text-sm tabular-nums"
          :class="descriptionColorClass"
          role="status"
          aria-live="polite"
        >
          {{ description }}
        </p>

        <UProgress
          v-if="showProgress"
          :model-value="progress"
          :max="100"
          size="sm"
          class="mx-auto mb-4 max-w-xs"
        />

        <p
          v-if="hint"
          class="mb-4 text-xs tabular-nums text-neutral-500"
          aria-live="polite"
        >
          {{ hint }}
        </p>

        <AdsButton
          v-if="actionLabel"
          leading
          icon="i-lucide-refresh-cw"
          :label="actionLabel"
          @click="onAction?.()"
        />

        <slot />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { OverlayLoadingProps } from "../types/overlay-loading.types";
import ErrorGif from "../assets/animations/Error.gif";
import LoadingGif from "../assets/animations/Loading.gif";
import SearchGif from "../assets/animations/Search.gif";
import SuccessGif from "../assets/animations/Success.gif";
import AdsButton from "./AdsButton.vue";

const emit = defineEmits<{
  close: [];
}>();

const props = withDefaults(defineProps<OverlayLoadingProps>(), {
  title: "Carregando...",
  description: "Aguarde enquanto processamos as informações.",
  hint: "",
  showProgress: false,
  progress: 0,
  variant: "loading",
  iconSrc: "",
  actionLabel: "",
  onAction: undefined,
  onUserClose: undefined,
  closableVariants: () => ["success", "error"],
});

const isClosable = computed(() =>
  props.closableVariants.includes(
    props.variant as "success" | "error"
  )
);

const iconWrapperClass = computed(() => {
  switch (props.variant) {
    case "success":
      return "bg-success-100";
    case "error":
      return "bg-error-100";
    case "info":
      return "bg-primary-100";
    default:
      return "bg-neutral-100";
  }
});

const titleColorClass = computed(() => {
  switch (props.variant) {
    case "success":
      return "text-emerald-800";
    case "error":
      return "text-red-800";
    case "info":
      return "text-blue-800";
    default:
      return "text-gray-900";
  }
});

const descriptionColorClass = computed(() => {
  switch (props.variant) {
    case "success":
      return "text-success-700";
    case "error":
      return "text-error-700";
    case "info":
      return "text-primary-700";
    default:
      return "text-neutral-600";
  }
});

const animationSrc = computed(() => {
  if (props.iconSrc) {
    return props.iconSrc;
  }

  switch (props.variant) {
    case "success":
      return SuccessGif;
    case "error":
      return ErrorGif;
    case "search":
      return SearchGif;
    case "loading":
    case "info":
    default:
      return LoadingGif;
  }
});

const handleClose = () => {
  props.onUserClose?.();
  emit("close");
};
</script>

