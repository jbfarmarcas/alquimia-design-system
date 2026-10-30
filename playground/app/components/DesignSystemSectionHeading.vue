<template>
  <div class="max-w-[65ch]">
    <h2 class="text-xl font-bold tracking-[-0.02em] text-[var(--ads-text-primary)]">
      {{ section.label }}
    </h2>
    <p class="mt-3 text-base leading-relaxed text-[var(--ads-text-secondary)]">
      {{ section.purpose }}
    </p>
    <div v-if="section.components.length || figma?.length" class="mt-4 flex flex-wrap items-center gap-2">
      <button
        v-for="name in section.components"
        :key="name"
        type="button"
        class="rounded-[var(--ads-radius-xsm)] bg-neutral-100 px-2 py-1 font-mono text-xs text-[var(--ads-text-primary)] transition-colors duration-150 ease-out hover:bg-[var(--ads-button-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        :aria-label="copiedName === name ? `${name} copiado` : `Copiar ${name}`"
        @click="emit('copy', name)"
      >
        {{ copiedName === name ? "Copiado" : name }}
      </button>

      <template v-for="link in figma" :key="`figma-${link.component}`">
        <template v-if="link.figma">
          <a
            :href="link.figma.url"
            target="_blank"
            rel="noopener noreferrer"
            data-figma-status="linked"
            :data-figma-node="link.figma.nodeId"
            :title="figmaTitle(link, link.figma)"
            class="inline-flex items-center gap-1 rounded-[var(--ads-radius-xsm)] px-2 py-1 text-xs font-medium text-[var(--ads-text-brand)] transition-colors duration-150 ease-out hover:bg-[var(--ads-button-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <UIcon name="i-lucide-figma" class="size-3.5 shrink-0" aria-hidden="true" />
            {{ multi ? `Ver ${link.component} no Figma` : "Ver no Figma" }}
            <UIcon name="i-lucide-arrow-up-right" class="size-3 shrink-0" aria-hidden="true" />
            <span class="sr-only">(abre em nova aba)</span>
          </a>
          <a
            v-for="extra in link.related ?? []"
            :key="extra.nodeId"
            :href="extra.url"
            target="_blank"
            rel="noopener noreferrer"
            data-figma-status="related"
            :data-figma-node="extra.nodeId"
            :title="figmaTitle(link, extra)"
            class="inline-flex items-center gap-1 rounded-[var(--ads-radius-xsm)] px-2 py-1 text-xs text-[var(--ads-text-secondary)] transition-colors duration-150 ease-out hover:bg-[var(--ads-button-secondary)] hover:text-[var(--ads-text-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {{ extra.name }}
            <UIcon name="i-lucide-arrow-up-right" class="size-3 shrink-0" aria-hidden="true" />
            <span class="sr-only">no Figma (abre em nova aba)</span>
          </a>
        </template>
        <span
          v-else
          data-figma-status="absent"
          :title="link.note"
          class="inline-flex items-center gap-1 rounded-[var(--ads-radius-xsm)] border border-dashed border-[var(--ads-border-subtle)] px-2 py-1 text-xs text-[var(--ads-text-tertiary)]"
        >
          <UIcon name="i-lucide-figma" class="size-3.5 shrink-0 opacity-60" aria-hidden="true" />
          {{ multi ? `${link.component}: não existe no Figma` : "Não existe no Figma" }}
        </span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { FigmaComponentLink, FigmaNode } from "./design-system/figma-links";

const props = defineProps<{
  section: {
    label: string;
    purpose: string;
    components: readonly string[];
  };
  copiedName: string;
  /** Status no Figma de cada componente da seção. Sem valor, a linha não aparece. */
  figma?: readonly FigmaComponentLink[];
}>();

const emit = defineEmits<{ copy: [name: string] }>();

/** Com mais de um componente, o rótulo diz qual. */
const multi = computed(() => (props.figma?.length ?? 0) > 1);

const figmaTitle = (link: FigmaComponentLink, target: FigmaNode) =>
  [`${target.name} · ${target.nodeId}`, link.uncertain ? "Correspondência aproximada." : "", link.note ?? ""]
    .filter(Boolean)
    .join(" ");
</script>
