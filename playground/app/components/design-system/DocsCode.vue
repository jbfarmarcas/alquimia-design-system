<template>
  <figure class="overflow-hidden rounded-[var(--ads-radius-md)] bg-[var(--ads-status-void-800)]">
    <figcaption class="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
      <span class="font-mono text-xs text-[var(--ads-status-void-300)]">{{ language }}</span>
      <button
        type="button"
        class="rounded-[var(--ads-radius-xsm)] px-2 py-1 text-xs font-bold text-[var(--ads-text-contrast)] transition-colors duration-150 ease-out hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        :aria-label="copied ? 'Código copiado' : 'Copiar código'"
        @click="copy"
      >
        {{ copied ? "Copiado" : "Copiar" }}
      </button>
    </figcaption>
    <div class="overflow-x-auto">
      <ol class="docs-code m-0 list-none py-4 font-mono text-[13px] leading-6">
        <li v-for="(line, index) in lines" :key="index" class="grid grid-cols-[2.5rem_minmax(0,1fr)]">
          <span class="select-none px-2 text-right text-[var(--ads-status-void-500)]" aria-hidden="true">
            {{ index + 1 }}
          </span>
          <code class="pe-4 whitespace-pre" v-html="line || '&nbsp;'" />
        </li>
      </ol>
    </div>
  </figure>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { highlightCodeLines } from "../../utils/highlight-code";

const props = defineProps<{
  code: string;
  language: string;
}>();

const lines = computed(() => highlightCodeLines(props.code));
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

const copy = async () => {
  let copiedText = false;
  try {
    await navigator.clipboard.writeText(props.code);
    copiedText = true;
  } catch {
    const area = document.createElement("textarea");
    area.value = props.code;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.append(area);
    area.select();
    copiedText = document.execCommand("copy");
    area.remove();
  }
  if (!copiedText) return;
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => {
    copied.value = false;
  }, 1600);
};

onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<style scoped>
.docs-code :deep(.tok-comment) {
  color: var(--ads-status-void-400);
}

.docs-code :deep(.tok-tag) {
  color: var(--ads-status-new-200);
}

.docs-code :deep(.tok-attr) {
  color: var(--ads-status-attention-300);
}

.docs-code :deep(.tok-string) {
  color: var(--ads-status-success-300);
}

.docs-code :deep(.tok-keyword) {
  color: var(--ads-status-innovation-300);
}

.docs-code :deep(.tok-number) {
  color: var(--ads-chart-data-3-400);
}

.docs-code :deep(.tok-variable) {
  color: var(--ads-status-new-300);
}

.docs-code :deep(.tok-punct) {
  color: var(--ads-status-void-300);
}

.docs-code :deep(.tok-text) {
  color: var(--ads-text-contrast);
}
</style>
