<template>
  <div
    ref="shellEl"
    class="ads-table-shell relative w-full min-w-0"
    :class="[
      stickyScrollbar ? 'ads-table-shell--sticky-scroll' : undefined,
      attrs.class,
    ]"
  >
    <!--
      sticky-scrollbar: overflow-x-auto + overflow-y-clip no viewport — o Y da
      página continua no main (thead sticky) e o X fica só aqui (barra fake).
    -->
    <div
      ref="tableScroller"
      class="w-full min-w-0"
      :class="tableScrollerClass"
    >
      <UTable
        v-bind="utableAttrs"
        :key="virtualize ? 'virtual' : 'static'"
        :data="data"
        :columns="columns"
        :loading="loading"
        :sticky="uTableSticky"
        :virtualize="virtualizeOptions"
        :ui="tableUi"
      >
        <template v-if="!$slots.loading" #loading>
          <AdsTableSkeleton
            :rows="skeletonRows"
            :variant="skeletonVariant"
            :columns="skeletonColumns"
            :cell-class="skeletonCellSize ?? adsTableCellSize(density)"
          />
        </template>

        <template v-if="!$slots.empty" #empty>
          <div class="flex flex-col items-center gap-2">
            <UIcon
              :name="emptyIcon"
              class="size-6 text-[var(--ads-border-icon-support)]"
              aria-hidden="true"
            />
            <p class="text-sm text-[var(--ads-text-secondary)]">{{ emptyLabel }}</p>
          </div>
        </template>

        <template v-for="(_, name) in $slots" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps ?? {}" />
        </template>
      </UTable>
    </div>

    <div
      v-if="stickyScrollbar"
      ref="fakeScroller"
      class="sticky bottom-0 z-20 w-full overflow-x-auto overscroll-x-contain border-t border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] [scrollbar-color:var(--ads-border-subtle)_transparent] [scrollbar-width:thin]"
      :class="needsFakeScroll ? undefined : 'invisible pointer-events-none'"
      aria-hidden="true"
    >
      <div
        class="h-3 min-w-full"
        :style="{ width: `${scrollContentWidth}px` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends TableData">
import { computed, nextTick, onMounted, ref, useAttrs, useSlots, watch } from "vue";
import type { TableColumn, TableData } from "@nuxt/ui";
import { useEventListener, useResizeObserver } from "@vueuse/core";
import AdsTableSkeleton, {
  type AdsTableSkeletonAlign,
  type AdsTableSkeletonVariant,
} from "./AdsTableSkeleton.vue";
import { twMerge } from "tailwind-merge";
import {
  adsTableCellSize,
  buildAdsTableUi,
  mergeAdsTableUi,
  type AdsTableBorders,
  type AdsTableDensity,
  type AdsTableSticky,
  type AdsTableUi,
} from "../utils/ads-table";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    data: T[];
    columns: TableColumn<T>[];
    /** md: lista e gestão. sm: grade de dados larga ou prévia. */
    density?: AdsTableDensity;
    /** Zebra só em grade numérica larga. */
    striped?: boolean;
    /** Borda e raio próprios. Dentro de AdsCard, false. */
    framed?: boolean;
    /** lines: só horizontal. grid: horizontal e vertical. */
    borders?: AdsTableBorders;
    /** Degradê por nível. A célula marca `data-depth` de 0 a 2. */
    depth?: boolean;
    loading?: boolean;
    /**
     * Número de linhas do skeleton de carregamento (1–8).
     * Passado para o AdsTableSkeleton no slot #loading padrão.
     */
    skeletonRows?: number;
    /**
     * Estilo do skeleton padrão.
     * skeleton: barras de placeholder. logo: loader do Radar.
     * Passado para AdsTableSkeleton; ignorado quando #loading é passado via slot.
     */
    skeletonVariant?: AdsTableSkeletonVariant;
    /** Altura e respiro da linha do skeleton, quando a tabela foge do padrão da densidade. */
    skeletonCellSize?: string;
    /**
     * Cabeçalho (e rodapé) fixos. A tabela ganha altura máxima de 70vh; max-h na classe sobrescreve.
     * `all` = mesmo efeito de `header` (colunas fixas vêm de `v-model:column-pinning`).
     */
    sticky?: AdsTableSticky;
    /**
     * Barra de rolagem horizontal sticky no rodapé da viewport.
     * Um único scroller (viewport) + trilho sticky; barra nativa escondida.
     * Padrão: desligado.
     */
    stickyScrollbar?: boolean;
    /**
     * Lista virtual: só as linhas visíveis são montadas. Use com muitas linhas (centenas ou mais).
     * Precisa de rolagem própria (sticky ou max-h), senão a tabela inteira é montada.
     */
    virtualize?: boolean;
    /** Linha de 1px na borda da coluna fixa. */
    pinnedEdge?: boolean;
    emptyLabel?: string;
    emptyIcon?: string;
    loadingLabel?: string;
    /** Ajuste pontual de um slot; soma ao padrão. */
    ui?: Partial<AdsTableUi>;
  }>(),
  {
    density: "md",
    striped: false,
    framed: true,
    borders: "lines",
    depth: false,
    loading: false,
    skeletonRows: 5,
    skeletonVariant: "skeleton",
    skeletonCellSize: undefined,
    sticky: false,
    stickyScrollbar: false,
    virtualize: false,
    pinnedEdge: true,
    emptyLabel: "Nenhum registro encontrado",
    emptyIcon: "i-lucide-inbox",
    loadingLabel: undefined,
    ui: undefined,
  },
);

const slots = useSlots();
const attrs = useAttrs();

/** Repassa attrs do consumidor ao UTable (ex.: v-model:column-pinning). class/style ficam no shell. */
const utableAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs as Record<string, unknown>;
  return rest;
});

const shellEl = ref<HTMLElement | null>(null);
const tableScroller = ref<HTMLElement | null>(null);
const fakeScroller = ref<HTMLElement | null>(null);
const scrollContentWidth = ref(0);
const needsFakeScroll = ref(false);

let syncSource: "table" | "fake" | null = null;
let syncRaf = 0;

/** UTable não conhece `all`; mapeia para cabeçalho fixo. */
const uTableSticky = computed(() => {
  if (props.sticky === "all" || props.sticky === true) return "header" as const;
  return props.sticky;
});

const stickyHeaderEnabled = computed(
  () =>
    props.sticky === true ||
    props.sticky === "header" ||
    props.sticky === "all",
);

/**
 * overflow-y-clip (não visible): o CSS não promove Y a auto, então o thead
 * sticky continua grudado no main da página — sem max-h / scroll interno.
 * overflow-x-auto: só o scroll horizontal fica neste viewport.
 */
const tableScrollerClass = computed(() => {
  if (!props.stickyScrollbar) return undefined;
  const hideNative = needsFakeScroll.value
    ? "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    : "[scrollbar-width:thin] [scrollbar-color:var(--ads-border-subtle)_transparent]";
  return [
    "overflow-x-auto overflow-y-clip overscroll-x-contain",
    hideNative,
  ];
});

const leafColumns = (columns: TableColumn<T>[]): TableColumn<T>[] =>
  columns.flatMap((column) =>
    "columns" in column && column.columns?.length ? leafColumns(column.columns) : [column],
  );

const columnKey = (column: TableColumn<T>) =>
  column.id ?? ("accessorKey" in column ? String(column.accessorKey) : "");

/** Alinhamento das colunas visíveis, lido da mesma classe que alinha o dado. */
const skeletonColumns = computed((): AdsTableSkeletonAlign[] => {
  const hidden = (attrs.columnVisibility ?? attrs["column-visibility"] ?? {}) as Record<string, boolean>;
  return leafColumns(props.columns)
    .filter((column) => hidden[columnKey(column)] !== false)
    .map((column) => {
      const td = column.meta?.class?.td;
      if (typeof td !== "string") return "left";
      if (/\btext-right\b/.test(td)) return "right";
      return /\btext-center\b/.test(td) ? "center" : "left";
    });
});

/** Altura estimada da linha pela densidade; a medida real corrige linhas com conteúdo maior. */
const virtualizeOptions = computed(() =>
  props.virtualize
    ? { estimateSize: props.density === "md" ? 64 : 40, overscan: 12 }
    : false,
);

const tableUi = computed(() => {
  const base = buildAdsTableUi({
    density: props.density,
    striped: props.striped,
    framed: props.framed,
    borders: props.borders,
    depth: props.depth,
    stickyHeader: stickyHeaderEnabled.value,
    pinnedEdge: props.pinnedEdge,
  });
  // Marca para o CSS do AdsCard alinhar a primeira coluna. Fora do card, não faz nada.
  base.root = `${base.root} ads-table`.trim();
  if (props.stickyScrollbar) {
    // Sem max-h: a página rola no Y; o viewport externo só rola no X.
    // sticky do UTable (thead) gruda no main graças ao overflow-y-clip.
    base.root = twMerge(
      base.root.replace(/\boverflow-auto\b/g, "").replace(/\bmax-h-\S+/g, ""),
      "w-full min-w-max max-w-none! overflow-visible max-h-none!",
    );
    base.base = twMerge(base.base, "w-full");
    // Tira o bg-default/75 + blur do tema Nuxt no sticky; o th define o fundo.
    if (stickyHeaderEnabled.value) {
      base.thead = twMerge(base.thead, "bg-transparent! backdrop-blur-none!");
    }
  }
  if (!slots.expanded) {
    // Árvore via getSubRows: o UTable sempre desenha a linha de detalhe da linha aberta.
    base.tbody = `${base.tbody} [&>tr[data-slot=tr]:not([data-selectable])]:hidden`;
  }
  if (props.loading && !props.data.length) {
    // O skeleton já indica a carga; a barra do UTable é para recarga com dados na tela.
    base.thead = `${base.thead} after:hidden`;
    if (!slots.loading && props.skeletonVariant === "skeleton") {
      // Tira a linha e a célula do caminho para as linhas do skeleton entrarem na grade.
      base.tbody = `${base.tbody} [&>tr:has(>[data-slot=loading])]:contents`;
      base.loading = "contents";
    }
  }
  return mergeAdsTableUi(base, props.ui);
});

const maxScrollLeft = (el: HTMLElement) =>
  Math.max(0, el.scrollWidth - el.clientWidth);

const setScrollLeft = (el: HTMLElement, value: number) => {
  const max = maxScrollLeft(el);
  const next = Math.min(max, Math.max(0, value));
  if (el.scrollLeft !== next) el.scrollLeft = next;
};

const mirrorScroll = (from: HTMLElement, to: HTMLElement) => {
  const maxFrom = maxScrollLeft(from);
  const maxTo = maxScrollLeft(to);
  if (maxFrom <= 0 || maxTo <= 0) {
    setScrollLeft(to, 0);
    return;
  }
  // Mantém a mesma proporção — evita “travar” no início/fim por diferença de largura.
  const ratio = from.scrollLeft / maxFrom;
  setScrollLeft(to, ratio * maxTo);
};

const onTableScroll = () => {
  if (!props.stickyScrollbar || syncSource === "fake") return;
  const table = tableScroller.value;
  const fake = fakeScroller.value;
  if (!table || !fake) return;
  syncSource = "table";
  cancelAnimationFrame(syncRaf);
  syncRaf = requestAnimationFrame(() => {
    mirrorScroll(table, fake);
    syncSource = null;
  });
};

const onFakeScroll = () => {
  if (!props.stickyScrollbar || syncSource === "table") return;
  const table = tableScroller.value;
  const fake = fakeScroller.value;
  if (!table || !fake) return;
  syncSource = "fake";
  cancelAnimationFrame(syncRaf);
  syncRaf = requestAnimationFrame(() => {
    mirrorScroll(fake, table);
    syncSource = null;
  });
};

/** Shift+wheel / trackpad X: só a tabela, sem o main do layout. */
const onShellWheel = (event: WheelEvent) => {
  if (!props.stickyScrollbar || !needsFakeScroll.value) return;
  const table = tableScroller.value;
  if (!table) return;

  const horizontal =
    event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY);
  if (!horizontal) return;

  const delta = event.shiftKey && event.deltaX === 0 ? event.deltaY : event.deltaX;
  if (delta === 0) return;

  event.preventDefault();
  syncSource = "table";
  setScrollLeft(table, table.scrollLeft + delta);
  if (fakeScroller.value) mirrorScroll(table, fakeScroller.value);
  syncSource = null;
};

const measureFakeScroll = () => {
  if (!props.stickyScrollbar) {
    scrollContentWidth.value = 0;
    needsFakeScroll.value = false;
    return;
  }
  const table = tableScroller.value;
  if (!table) {
    scrollContentWidth.value = 0;
    needsFakeScroll.value = false;
    return;
  }
  // Mede pelo conteúdo interno quando o scroller ainda reporta scrollWidth=client.
  const content = table.firstElementChild as HTMLElement | null;
  const contentOverflow = content
    ? Math.max(0, content.scrollWidth - table.clientWidth)
    : 0;
  const max = Math.max(maxScrollLeft(table), contentOverflow);
  needsFakeScroll.value = max > 1;
  const fakeWidth = fakeScroller.value?.clientWidth || table.clientWidth;
  scrollContentWidth.value = Math.max(fakeWidth + max, fakeWidth);
  if (fakeScroller.value && needsFakeScroll.value) {
    mirrorScroll(table, fakeScroller.value);
  }
};

/** Conteúdo interno: ResizeObserver no scroller não vê mudança de scrollWidth. */
const scrollerContentEl = computed(
  () => (tableScroller.value?.firstElementChild as HTMLElement | null) ?? null,
);

const scheduleMeasure = () => {
  void nextTick(() => {
    measureFakeScroll();
    requestAnimationFrame(() => {
      measureFakeScroll();
      window.setTimeout(measureFakeScroll, 50);
      window.setTimeout(measureFakeScroll, 200);
    });
  });
};

useEventListener(tableScroller, "scroll", onTableScroll, { passive: true });
useEventListener(fakeScroller, "scroll", onFakeScroll, { passive: true });
useEventListener(shellEl, "wheel", onShellWheel, { passive: false });

useResizeObserver(shellEl, scheduleMeasure);
useResizeObserver(tableScroller, scheduleMeasure);
useResizeObserver(scrollerContentEl, scheduleMeasure);

onMounted(scheduleMeasure);

watch(
  () => [props.data, props.columns, props.stickyScrollbar, props.sticky, props.ui] as const,
  scheduleMeasure,
);
</script>
