<template>
  <div class="overflow-hidden rounded-[var(--ads-radius-md)] bg-[var(--ads-status-void-800)]">
    <div class="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
      <span class="font-mono text-xs text-[var(--ads-status-void-300)]">json</span>
    </div>
    <div class="relative min-h-80">
      <pre
        ref="backdrop"
        aria-hidden="true"
        class="token-json-layer pointer-events-none absolute inset-0 m-0 overflow-hidden p-4"
      />
      <textarea
        ref="input"
        :value="modelValue"
        class="token-json-layer token-json-input relative z-10 h-[min(36rem,calc(100dvh-12rem))] min-h-80 w-full resize-none overflow-auto border-0 bg-transparent p-4 text-transparent caret-white outline-none"
        spellcheck="false"
        autocomplete="off"
        autocapitalize="off"
        wrap="off"
        aria-label="Tokens em JSON"
        :aria-invalid="Boolean(error) || undefined"
        :aria-describedby="error ? errorId : undefined"
        @input="onInput"
        @scroll="syncScroll"
        @keydown="onKeydown"
      />
    </div>
    <p
      v-if="error"
      :id="errorId"
      class="border-t border-white/10 px-4 py-2 text-xs leading-relaxed text-[var(--ads-status-warning-300)]"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useId, watch } from "vue";
import { highlightJson } from "../utils/highlight-code";

const props = defineProps<{
  modelValue: string;
  error?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const backdrop = ref<HTMLElement | null>(null);
const input = ref<HTMLTextAreaElement | null>(null);
const errorId = useId();
const highlighted = computed(() => highlightJson(props.modelValue || ""));

watch(highlighted, (html) => {
  if (backdrop.value) backdrop.value.innerHTML = html;
}, { flush: "post" });

onMounted(() => {
  if (backdrop.value) backdrop.value.innerHTML = highlighted.value;
});

const onInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLTextAreaElement).value);
};

const syncScroll = () => {
  const code = backdrop.value;
  const area = input.value;
  if (!code || !area) return;
  code.scrollTop = area.scrollTop;
  code.scrollLeft = area.scrollLeft;
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key !== "Tab" || event.altKey || event.ctrlKey || event.metaKey) return;
  event.preventDefault();
  const area = event.target as HTMLTextAreaElement;
  const start = area.selectionStart;
  const end = area.selectionEnd;
  const next = `${area.value.slice(0, start)}  ${area.value.slice(end)}`;
  emit("update:modelValue", next);
  const caret = start + 2;
  void nextTick(() => {
    area.selectionStart = caret;
    area.selectionEnd = caret;
  });
};
</script>

<style scoped>
.token-json-layer {
  box-sizing: border-box;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 24px;
  tab-size: 2;
  white-space: pre;
}

.token-json-input {
  caret-color: white;
}

.token-json-input::selection {
  background: rgb(255 255 255 / 22%);
}

.token-json-layer :deep(.tok-string) {
  color: var(--ads-status-success-300);
}

.token-json-layer :deep(.tok-attr) {
  color: var(--ads-status-attention-300);
}

.token-json-layer :deep(.tok-keyword) {
  color: var(--ads-status-innovation-300);
}

.token-json-layer :deep(.tok-number) {
  color: var(--ads-chart-data-3-400);
}

.token-json-layer :deep(.tok-punct) {
  color: var(--ads-status-void-300);
}

.token-json-layer :deep(.tok-text) {
  color: var(--ads-text-contrast);
}
</style>
