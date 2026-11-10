<template>
  <!-- Modo herança: apenas wrapper de DropdownMenuItem (API original) -->
  <UDropdownMenu v-if="!mode" :items="items" :content="content" :ui="adsDropdownMenuUi">
    <slot />
  </UDropdownMenu>

  <!-- Modo seleção: simple ou checkbox com busca opcional, badge e subtítulo -->
  <UPopover
    v-else
    v-model:open="isOpen"
    :portal="true"
    :content="resolvedContent"
    :ui="popoverUi"
  >
    <slot />

    <template #content>
      <div
        class="overflow-hidden rounded-[var(--ads-radius-sm)] border border-ads-neutro-claro-50 bg-[var(--ads-surface-card)] shadow-[var(--ads-shadow-level-1)]"
        :style="{ minWidth: minWidth }"
        role="listbox"
        :aria-multiselectable="mode === 'checkbox' ? 'true' : 'false'"
        :aria-label="listLabel"
      >
        <!-- Campo de busca -->
        <div v-if="searchable" class="px-3 pt-3 pb-2">
          <UInput
            v-model="query"
            :placeholder="searchPlaceholder"
            aria-label="Pesquisar opções"
            icon="i-lucide-search"
            color="neutral"
            variant="outline"
            size="md"
            class="w-full"
            :ui="searchFieldUi"
          >
            <template v-if="query" #trailing>
              <button
                type="button"
                class="text-[var(--ads-text-secondary)]"
                aria-label="Limpar busca"
                @click="query = ''"
              >
                <UIcon name="i-lucide-x" class="size-4" />
              </button>
            </template>
          </UInput>
        </div>

        <!-- Lista vazia -->
        <p
          v-if="filteredOptions.length === 0"
          class="flex h-16 items-center px-6 text-sm leading-[1.3] text-[var(--ads-text-secondary)]"
        >
          {{ emptyLabel }}
        </p>

        <!-- Opções -->
        <div
          v-else
          class="overflow-y-auto overscroll-contain [scrollbar-color:var(--color-ads-neutro-claro-50)_transparent] [scrollbar-width:thin]"
          :class="searchable ? 'max-h-[244px]' : 'max-h-[294px]'"
        >
          <template v-for="(option, index) in filteredOptions" :key="option.value">
            <button
              type="button"
              role="option"
              :aria-selected="isSelected(option.value)"
              :disabled="option.disabled"
              class="flex w-full items-center gap-3 border-b border-[var(--ads-border-subtle)] px-4 py-3 text-left text-sm text-[var(--ads-text-secondary)] transition-colors last:border-b-0 hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              :class="isSelected(option.value) ? 'font-bold text-[var(--ads-text-primary)]' : 'font-normal'"
              @click="onSelect(option.value)"
            >
              <!-- Checkbox visual (modo checkbox) -->
              <span
                v-if="mode === 'checkbox'"
                class="flex size-4 shrink-0 items-center justify-center rounded-[var(--ads-checkbox-radius)] border-2 transition-colors"
                :class="
                  isSelected(option.value)
                    ? 'border-[var(--ads-checkbox-checked)] bg-[var(--ads-checkbox-checked)]'
                    : 'border-[var(--ads-checkbox-border)] bg-[var(--ads-checkbox-background)]'
                "
                aria-hidden="true"
              >
                <UIcon
                  v-if="isSelected(option.value)"
                  name="i-lucide-check"
                  class="size-3 text-white"
                />
              </span>

              <!-- Conteúdo da opção -->
              <span class="flex min-w-0 flex-1 flex-col gap-0.5">
                <span class="truncate leading-[1.3]">{{ option.label }}</span>
                <span
                  v-if="option.subtitle"
                  class="truncate text-xs font-normal leading-[1.2] text-[var(--ads-text-tertiary)]"
                >
                  {{ option.subtitle }}
                </span>
              </span>

              <!-- Badge -->
              <span
                v-if="option.badge"
                class="shrink-0 rounded-[var(--ads-radius-pill)] px-2 py-0.5 text-[10px] font-bold leading-[1.2]"
                :style="option.badge.style"
              >
                {{ option.badge.label }}
              </span>
            </button>
          </template>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { DropdownMenuItem } from "@nuxt/ui";
import { adsDropdownMenuUi } from "../theme/ads-theme";

export interface AdsDropdownMenuBadge {
  label: string;
  /** Estilo inline para a badge (ex.: { background: 'var(--ads-status-success-100)', color: 'var(--ads-status-success-800)' }). */
  style?: Record<string, string>;
}

export interface AdsDropdownMenuOption {
  value: string;
  label: string;
  /** Texto de apoio abaixo do rótulo. */
  subtitle?: string;
  /** Badge à direita da opção. */
  badge?: AdsDropdownMenuBadge;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    /**
     * Modo de operação.
     * - `undefined` (padrão): wrapper de UDropdownMenu com DropdownMenuItems (API original).
     * - `'simple'`: seleção única (radio).
     * - `'checkbox'`: seleção múltipla.
     */
    mode?: "simple" | "checkbox";
    /** Opções. Obrigatório quando mode está definido. */
    options?: AdsDropdownMenuOption[];
    /** Items do menu (API original). Obrigatório quando mode é undefined. */
    items?: DropdownMenuItem[] | DropdownMenuItem[][];
    /** Configuração do popover. */
    content?: {
      side?: "top" | "right" | "bottom" | "left";
      align?: "start" | "center" | "end";
      sideOffset?: number;
    };
    /** Exibe campo de busca. */
    searchable?: boolean;
    /** Placeholder do campo de busca. */
    searchPlaceholder?: string;
    /** Mensagem quando nenhum resultado é encontrado. */
    emptyLabel?: string;
    /** Rótulo acessível da lista (aria-label). */
    listLabel?: string;
    /** Largura mínima do painel. */
    minWidth?: string;
  }>(),
  {
    mode: undefined,
    options: () => [],
    items: () => [],
    content: undefined,
    searchable: false,
    searchPlaceholder: "Pesquisar",
    emptyLabel: "Nenhum resultado",
    listLabel: "Opções",
    minWidth: "224px",
  },
);

/** v-model: string (simple) ou string[] (checkbox). */
const model = defineModel<string | string[]>();

const emit = defineEmits<{
  /** Emitido quando o usuário confirma uma seleção (modo simple fecha o popover). */
  pick: [value: string | string[]];
}>();

const isOpen = ref(false);
const query = ref("");

watch(isOpen, (open) => {
  if (!open) query.value = "";
});

const resolvedContent = computed(() => ({
  side: props.content?.side ?? "bottom",
  align: props.content?.align ?? "start",
  sideOffset: props.content?.sideOffset ?? 4,
}));

const filteredOptions = computed(() => {
  if (!query.value.trim()) return props.options;
  const q = query.value.toLowerCase();
  return props.options.filter(
    (o) =>
      o.label.toLowerCase().includes(q) ||
      (o.subtitle?.toLowerCase().includes(q) ?? false),
  );
});

const selectedList = computed<string[]>(() => {
  if (Array.isArray(model.value)) return model.value;
  if (typeof model.value === "string" && model.value) return [model.value];
  return [];
});

const isSelected = (value: string) => selectedList.value.includes(value);

const onSelect = (value: string) => {
  if (props.mode === "simple") {
    model.value = value;
    isOpen.value = false;
    emit("pick", value);
    return;
  }
  // checkbox
  const list = selectedList.value;
  const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
  model.value = next;
  emit("pick", next);
};

const popoverUi = {
  content: "z-50 w-auto overflow-visible bg-transparent p-0 shadow-none ring-0",
};

const searchFieldUi = {
  base: "h-10 rounded-[var(--ads-radius-pill)] bg-[var(--ads-surface-card)] text-sm text-[var(--ads-text-secondary)] !outline-none ring-1 ring-inset ring-ads-neutro-claro-50 enabled:hover:ring-[var(--ads-filter-hover-border)] placeholder:text-[var(--ads-text-tertiary)] focus-visible:!outline-none focus-visible:ring-(length:--ads-border-width-slim) focus-visible:ring-[var(--ads-text-brand)]",
  leadingIcon: "text-[var(--ads-text-tertiary)]",
};
</script>
