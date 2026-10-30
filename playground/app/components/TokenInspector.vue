<template>
  <div
    ref="root"
    class="relative"
    data-token-inspector
    @pointermove="onPointerMove"
    @pointerleave="hide"
    @focusin="onFocusIn"
    @focusout="hide"
  >
    <slot />

    <div
      v-if="spacing"
      class="pointer-events-none absolute inset-0 z-[5] overflow-visible"
      aria-hidden="true"
      data-spacing-overlay
    >
      <div
        v-for="box in boxes"
        :key="box.key"
        class="absolute"
        :class="box.kind === 'padding' ? 'bg-[rgb(242_78_30/0.22)]' : 'bg-[rgb(236_72_153/0.26)]'"
        :style="{ left: `${box.x}px`, top: `${box.y}px`, width: `${box.w}px`, height: `${box.h}px` }"
        :data-spacing="box.kind"
      />
      <span
        v-for="label in labels"
        :key="label.key"
        class="absolute -translate-x-1/2 -translate-y-1/2 rounded-[3px] px-1 font-mono text-[10px] leading-[14px] font-medium text-white tabular-nums"
        :class="label.kind === 'padding' ? 'bg-[#e0461b]' : 'bg-[#db2777]'"
        :style="{ left: `${label.x}px`, top: `${label.y}px` }"
      >
        {{ label.text }}
      </span>
    </div>

    <Teleport to="body">
      <div
        v-if="inspected"
        class="pointer-events-none fixed z-[90] rounded-[2px] outline-1 outline-[#0d99ff]"
        :style="{
          left: `${inspected.rect.left}px`,
          top: `${inspected.rect.top}px`,
          width: `${inspected.rect.width}px`,
          height: `${inspected.rect.height}px`,
        }"
        aria-hidden="true"
      />
      <div
        v-if="inspected"
        ref="tip"
        role="tooltip"
        data-token-tooltip
        class="pointer-events-none fixed z-[91] flex max-w-[22rem] flex-col gap-1.5 rounded-[6px] bg-[#1e1e1e] px-3 py-2.5 text-[11px] leading-[1.4] text-white shadow-[0_6px_24px_rgb(0_0_0/0.28)]"
        :style="{ left: `${tipPos.x}px`, top: `${tipPos.y}px` }"
      >
        <p class="font-mono text-[10px] text-white/55">
          {{ inspected.tag }} · {{ Math.round(inspected.rect.width) }}×{{ Math.round(inspected.rect.height) }}
        </p>
        <ul class="flex flex-col gap-1">
          <li v-for="item in inspected.items" :key="`${item.name}-${item.utility}`" class="flex flex-col">
            <span class="flex items-center gap-1.5 font-mono">
              <span
                v-if="item.color"
                class="size-2.5 shrink-0 rounded-[2px] ring-1 ring-white/30"
                :style="{ background: item.value }"
              />
              <span class="text-[#7cc4ff]">{{ item.name }}</span><span class="text-white/55">:</span>
              <span class="text-white">{{ item.value }}</span>
            </span>
            <span class="pl-4 text-[10px] text-white/55">
              {{ item.property }}<template v-if="item.state"> · {{ item.state }}</template><template v-if="item.label"> · {{ item.label }}</template>
            </span>
          </li>
        </ul>
        <p v-if="inspected.more" class="text-[10px] text-white/55">e mais {{ inspected.more }}</p>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { TokenComponent, TokenField } from "../../../app/theme/component-tokens";

/**
 * Inspeção estilo Dev Mode do preview de tokens.
 * Lê os `var(--ads-…)` das classes e do style de cada elemento, então serve para qualquer componente do catálogo
 * sem mapa manual. O valor vem do rascunho do JSON; um token fora do catálogo mostra o valor calculado.
 */
const props = withDefaults(
  defineProps<{
    component: TokenComponent;
    fields: readonly TokenField[];
    tokens: Record<string, string>;
    /** Pinta padding e gap dos tokens de espaço do componente. */
    spacing?: boolean;
  }>(),
  { spacing: true },
);

type Usage = { name: string; utility: string; state: string };
type Item = { name: string; value: string; color: boolean; property: string; state: string; label: string; utility: string };
type Box = { key: string; kind: "padding" | "gap"; x: number; y: number; w: number; h: number };
type Label = { key: string; kind: "padding" | "gap"; x: number; y: number; text: string };

const root = ref<HTMLElement>();
const tip = ref<HTMLElement>();
const boxes = ref<Box[]>([]);
const labels = ref<Label[]>([]);
const inspected = ref<{ rect: DOMRect; tag: string; items: Item[]; more: number } | null>(null);
const tipPos = ref({ x: 0, y: 0 });
const pointer = { x: 0, y: 0 };

const fieldByName = computed(() => new Map(props.fields.map((field) => [field.name, field])));
const ownNames = computed(() => new Set(props.component.fields.map((field) => field.name)));

/** Separa variantes e utilitário respeitando colchetes: `hover:text-[length:var(--x)]`. */
const splitVariants = (cls: string) => {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < cls.length; index += 1) {
    const char = cls[index];
    if (char === "[" || char === "(") depth += 1;
    else if (char === "]" || char === ")") depth -= 1;
    else if (char === ":" && depth === 0) {
      parts.push(cls.slice(start, index));
      start = index + 1;
    }
  }
  return { variants: parts, utility: cls.slice(start) };
};

const RESPONSIVE = new Set(["sm", "md", "lg", "xl", "2xl"]);
const VAR_PATTERN = /var\((--ads-[a-z0-9-]+)/g;

const classUsages = (el: Element): Usage[] => {
  const raw = el.getAttribute("class") ?? "";
  if (!raw.includes("var(--")) return [];
  const usages: Usage[] = [];
  for (const cls of raw.split(/\s+/)) {
    if (!cls.includes("var(--")) continue;
    const { variants, utility } = splitVariants(cls);
    /* Propriedade arbitrária do Tailwind: `[font-weight:var(--x)]`. */
    const arbitrary = /^!?\[([a-z-]+):/.exec(utility)?.[1];
    const prefix = utility.replace(/^!/, "").replace(/^-/, "").split("-[")[0] ?? utility;
    const hint = /\[(length|color):/.exec(utility)?.[1] ?? "";
    const state = variants.filter((variant) => !RESPONSIVE.has(variant)).join(":");
    for (const match of utility.matchAll(VAR_PATTERN)) {
      usages.push({ name: match[1]!, utility: arbitrary ? `style:${arbitrary}` : hint ? `${prefix}:${hint}` : prefix, state });
    }
  }
  return usages;
};

const styleUsages = (el: Element): Usage[] => {
  const raw = el.getAttribute("style") ?? "";
  if (!raw.includes("var(--")) return [];
  const usages: Usage[] = [];
  for (const declaration of raw.split(";")) {
    const [property, ...rest] = declaration.split(":");
    const value = rest.join(":");
    for (const match of value.matchAll(VAR_PATTERN)) {
      usages.push({ name: match[1]!, utility: `style:${property?.trim() ?? ""}`, state: "" });
    }
  }
  return usages;
};

const PROPERTY: Record<string, string> = {
  p: "padding",
  px: "padding-inline",
  py: "padding-block",
  pt: "padding-top",
  pr: "padding-right",
  pb: "padding-bottom",
  pl: "padding-left",
  ps: "padding-inline-start",
  pe: "padding-inline-end",
  m: "margin",
  mx: "margin-inline",
  my: "margin-block",
  mt: "margin-top",
  mb: "margin-bottom",
  ml: "margin-left",
  mr: "margin-right",
  gap: "gap",
  "gap-x": "column-gap",
  "gap-y": "row-gap",
  "space-x": "espaço horizontal",
  "space-y": "espaço vertical",
  h: "height",
  "min-h": "min-height",
  "max-h": "max-height",
  w: "width",
  "min-w": "min-width",
  "max-w": "max-width",
  size: "width / height",
  bg: "background",
  font: "font-weight",
  leading: "line-height",
  tracking: "letter-spacing",
  ring: "ring",
  outline: "outline-color",
  fill: "fill",
  stroke: "stroke",
  shadow: "box-shadow",
  top: "top",
  left: "left",
  right: "right",
  bottom: "bottom",
  inset: "inset",
  "border-b": "border-bottom",
  "border-t": "border-top",
  "border-l": "border-left",
  "border-r": "border-right",
  caret: "caret-color",
  accent: "accent-color",
  from: "gradient from",
  to: "gradient to",
  via: "gradient via",
  "translate-x": "translate-x",
  "translate-y": "translate-y",
};

const propertyOf = (utility: string, field: TokenField | undefined, value: string) => {
  if (utility.startsWith("style:")) return utility.slice(6);
  const [prefix, hint] = utility.split(":");
  const isColor = field ? field.kind === "color" : /^(#|rgb|hsl|oklch)/.test(value);
  if (prefix === "text") return hint === "length" || (!hint && !isColor) ? "font-size" : "color";
  if (prefix === "border") return isColor ? "border-color" : "border-width";
  if (prefix?.startsWith("rounded")) return prefix === "rounded" ? "border-radius" : `border-radius (${prefix.slice(8)})`;
  return PROPERTY[prefix ?? ""] ?? prefix ?? "";
};

const valueOf = (name: string, el: Element) => {
  if (fieldByName.value.has(name)) return props.tokens[name] ?? fieldByName.value.get(name)!.fallback;
  return getComputedStyle(el).getPropertyValue(name).trim() || "—";
};

const itemsFor = (el: Element): Item[] => {
  const seen = new Set<string>();
  const items: Item[] = [];
  for (const usage of [...classUsages(el), ...styleUsages(el)]) {
    const key = `${usage.name}|${usage.utility}|${usage.state}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const field = fieldByName.value.get(usage.name);
    const value = valueOf(usage.name, el);
    items.push({
      name: usage.name,
      value,
      color: field ? field.kind === "color" : /^(#|rgb|hsl|oklch)/.test(value),
      property: propertyOf(usage.utility, field, value),
      state: usage.state,
      label: field ? `${field.group} · ${field.label}` : "token semântico",
      utility: `${usage.utility}|${usage.state}`,
    });
  }
  const own = ownNames.value;
  return items.sort((a, b) => Number(own.has(b.name)) - Number(own.has(a.name)));
};

/** Sobe do alvo até achar um elemento com token do componente atual, depois com qualquer token ADS. */
const OUTSIDE_ROOTS = '[role="dialog"], [role="tooltip"]:not([data-token-tooltip]), [role="menu"], [role="listbox"], [data-reka-popper-content-wrapper]';

const inspectable = (target: EventTarget | null) => {
  if (!(target instanceof Element) || !root.value) return null;
  const inRoot = root.value.contains(target);
  const portal = inRoot ? null : target.closest(OUTSIDE_ROOTS);
  if (!inRoot && !portal) return null;
  const stop = inRoot ? root.value : portal!.parentElement;
  let fallback: { el: Element; items: Item[] } | null = null;
  for (let el: Element | null = target; el && el !== stop; el = el.parentElement) {
    const items = itemsFor(el);
    if (!items.length) continue;
    if (items.some((item) => ownNames.value.has(item.name))) return { el, items };
    fallback ??= { el, items };
  }
  return fallback;
};

const MAX_ITEMS = 8;

const show = (target: EventTarget | null) => {
  const found = inspectable(target);
  if (!found) {
    inspected.value = null;
    return;
  }
  inspected.value = {
    rect: found.el.getBoundingClientRect(),
    tag: describe(found.el),
    items: found.items.slice(0, MAX_ITEMS),
    more: Math.max(0, found.items.length - MAX_ITEMS),
  };
  void nextTick(placeTip);
};

const describe = (el: Element) => {
  const slot = el.getAttribute("data-slot");
  const tag = el.tagName.toLowerCase();
  return slot ? `${tag} [${slot}]` : tag;
};

const placeTip = () => {
  const box = tip.value?.getBoundingClientRect();
  const rect = inspected.value?.rect;
  if (!box || !rect) return;
  const anchorX = pointer.x || rect.left;
  const anchorY = pointer.y || rect.bottom;
  let x = anchorX + 14;
  let y = anchorY + 18;
  if (x + box.width > window.innerWidth - 8) x = Math.max(8, anchorX - box.width - 14);
  if (y + box.height > window.innerHeight - 8) y = Math.max(8, anchorY - box.height - 14);
  tipPos.value = { x, y };
};

let lastTarget: EventTarget | null = null;
const onPointerMove = (event: PointerEvent) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  if (event.target !== lastTarget) {
    lastTarget = event.target;
    show(event.target);
  } else if (inspected.value) {
    placeTip();
  }
};

const onDocumentPointerMove = (event: PointerEvent) => {
  if (!root.value || root.value.contains(event.target as Node)) return;
  if (!(event.target instanceof Element) || !event.target.closest(OUTSIDE_ROOTS)) {
    if (inspected.value && lastTarget && !(lastTarget instanceof Node && root.value.contains(lastTarget))) hide();
    return;
  }
  onPointerMove(event);
};

const onFocusIn = (event: FocusEvent) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  const rect = target.getBoundingClientRect();
  pointer.x = rect.left;
  pointer.y = rect.bottom;
  lastTarget = target;
  show(target);
};

const hide = () => {
  inspected.value = null;
  lastTarget = null;
};

/* Espaçamentos
 * Lê padding, column-gap, row-gap e o space-x/space-y do estilo calculado de cada elemento do preview.
 * Não depende de token: o componente pode ter espaço fixo no código e mesmo assim aparece.
 */

const MAX_BOXES = 400;
const px = (value: string) => {
  const number = Number.parseFloat(value);
  return Number.isFinite(number) ? number : 0;
};

type Child = { rect: DOMRect };

/**
 * Filhos que ocupam lugar no fluxo: some com display none, tamanho zero e absolute/fixed.
 * Texto solto dentro de flex ou grid vira item anônimo (ícone + rótulo de um botão), então entra pelo retângulo do Range.
 */
const flowChildren = (el: Element, layout: boolean): Child[] => {
  const items: Child[] = [];
  for (const node of el.childNodes) {
    if (node instanceof Element) {
      const style = getComputedStyle(node);
      if (style.display === "none" || style.position === "absolute" || style.position === "fixed" || style.visibility === "hidden") continue;
      items.push({ rect: node.getBoundingClientRect() });
    } else if (layout && node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      const range = document.createRange();
      range.selectNodeContents(node);
      items.push({ rect: range.getBoundingClientRect() });
    }
  }
  return items.filter(({ rect }) => rect.width > 0.5 && rect.height > 0.5);
};

/** Espaço entre itens: gap de flex e grid, ou a margem do space-x/space-y em qualquer display. */
const gapsOf = (el: Element, style: CSSStyleDeclaration, children: Child[]) => {
  const display = style.display;
  const layout = display.includes("flex") || display.includes("grid");
  let column = layout ? px(style.columnGap) : 0;
  let row = layout ? px(style.rowGap) : 0;
  const cls = el.getAttribute("class") ?? "";
  if (children.length > 1 && /(^|[\s:])-?space-x-/.test(cls)) {
    const margins = [...el.children].slice(1).map((child) => {
      const childStyle = getComputedStyle(child);
      return Math.max(px(childStyle.marginLeft), px(childStyle.marginRight));
    });
    column = Math.max(column, ...margins);
  }
  if (children.length > 1 && /(^|[\s:])-?space-y-/.test(cls)) {
    const margins = [...el.children].slice(1).map((child) => {
      const childStyle = getComputedStyle(child);
      return Math.max(px(childStyle.marginTop), px(childStyle.marginBottom));
    });
    row = Math.max(row, ...margins);
  }
  return { column, row };
};

const overlap = (a0: number, a1: number, b0: number, b1: number) => Math.min(a1, b1) - Math.max(a0, b0);

const measure = () => {
  frame = 0;
  if (!props.spacing || !root.value) {
    boxes.value = [];
    labels.value = [];
    return;
  }
  const base = root.value.getBoundingClientRect();
  const nextBoxes: Box[] = [];
  const nextLabels: Label[] = [];
  const add = (kind: Box["kind"], key: string, x: number, y: number, w: number, h: number, value: number) => {
    if (w <= 0.5 || h <= 0.5 || nextBoxes.length >= MAX_BOXES) return;
    nextBoxes.push({ key, kind, x: x - base.left, y: y - base.top, w, h });
    nextLabels.push({ key, kind, x: x - base.left + w / 2, y: y - base.top + h / 2, text: String(Math.round(value * 10) / 10) });
  };

  /* O wrapper do TokenPreview só empilha exemplos: o espaço dele não é do componente. */
  const wrappers = new Set([...root.value.children]);
  const elements = root.value.querySelectorAll("*");
  elements.forEach((el, index) => {
    if (el.closest("[data-spacing-overlay]") || el instanceof SVGElement) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden" || style.display === "contents") return;

    if (!wrappers.has(el)) {
      const top = px(style.paddingTop);
      const right = px(style.paddingRight);
      const bottom = px(style.paddingBottom);
      const left = px(style.paddingLeft);
      add("padding", `${index}-pt`, rect.left, rect.top, rect.width, top, top);
      add("padding", `${index}-pb`, rect.left, rect.bottom - bottom, rect.width, bottom, bottom);
      add("padding", `${index}-pl`, rect.left, rect.top + top, left, rect.height - top - bottom, left);
      add("padding", `${index}-pr`, rect.right - right, rect.top + top, right, rect.height - top - bottom, right);
    }

    if (wrappers.has(el) || el.childNodes.length < 2) return;
    const display = style.display;
    const children = flowChildren(el, display.includes("flex") || display.includes("grid"));
    if (children.length < 2) return;
    const { column, row } = gapsOf(el, style, children);
    if (column <= 0.5 && row <= 0.5) return;

    const inner = {
      left: rect.left + px(style.paddingLeft) + px(style.borderLeftWidth),
      right: rect.right - px(style.paddingRight) - px(style.borderRightWidth),
      top: rect.top + px(style.paddingTop) + px(style.borderTopWidth),
      bottom: rect.bottom - px(style.paddingBottom) - px(style.borderBottomWidth),
    };

    /*
     * Para cada filho, o vizinho mais próximo à direita na mesma linha e logo abaixo na mesma coluna.
     * Comparar retângulos, e não a ordem do DOM, cobre row/column-reverse, wrap e grid.
     */
    children.forEach((a, i) => {
      if (column > 0.5) {
        let best: Child | undefined;
        for (const b of children) {
          if (b === a || b.rect.left < a.rect.right - 0.5) continue;
          if (overlap(a.rect.top, a.rect.bottom, b.rect.top, b.rect.bottom) <= 0.5) continue;
          if (!best || b.rect.left < best.rect.left) best = b;
        }
        if (best) {
          const distance = best.rect.left - a.rect.right;
          const width = Math.min(distance, column);
          const top = Math.max(Math.min(a.rect.top, best.rect.top), inner.top);
          const bottom = Math.min(Math.max(a.rect.bottom, best.rect.bottom), inner.bottom);
          if (distance > 0.5) add("gap", `${index}-c${i}`, a.rect.right, top, width, bottom - top, width);
        }
      }
      if (row > 0.5) {
        let best: Child | undefined;
        for (const b of children) {
          if (b === a || b.rect.top < a.rect.bottom - 0.5) continue;
          if (overlap(a.rect.left, a.rect.right, b.rect.left, b.rect.right) <= 0.5) continue;
          if (!best || b.rect.top < best.rect.top) best = b;
        }
        if (best) {
          const distance = best.rect.top - a.rect.bottom;
          const height = Math.min(distance, row);
          /* Numa coluna, a faixa ocupa a largura útil do container, como no Figma. */
          const single = style.display.includes("flex") && style.flexDirection.startsWith("column");
          const left = single ? inner.left : Math.max(Math.min(a.rect.left, best.rect.left), inner.left);
          const right = single ? inner.right : Math.min(Math.max(a.rect.right, best.rect.right), inner.right);
          if (distance > 0.5) add("gap", `${index}-r${i}`, left, a.rect.bottom, right - left, height, height);
        }
      }
    });
  });
  boxes.value = nextBoxes;
  labels.value = nextLabels;
};

let frame = 0;
const schedule = () => {
  if (frame || typeof window === "undefined") return;
  frame = window.requestAnimationFrame(measure);
};

/** Rolagem dentro do preview mexe nos filhos: esconde a dica e mede de novo. */
const onScroll = () => {
  hide();
  schedule();
};

let resizeObserver: ResizeObserver | undefined;
let mutationObserver: MutationObserver | undefined;

onMounted(() => {
  resizeObserver = new ResizeObserver(schedule);
  if (root.value) resizeObserver.observe(root.value);
  /* Mudança no próprio overlay não pede nova medida: evita laço. */
  mutationObserver = new MutationObserver((records) => {
    if (records.some((record) => !(record.target instanceof Element && record.target.closest("[data-spacing-overlay]")) && !(record.target as Element).hasAttribute?.("data-spacing-overlay"))) schedule();
  });
  if (root.value) mutationObserver.observe(root.value, { subtree: true, childList: true, attributes: true, attributeFilter: ["class", "style", "data-state"] });
  window.addEventListener("resize", schedule);
  window.addEventListener("scroll", onScroll, true);
  document.addEventListener("pointermove", onDocumentPointerMove);
  schedule();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  mutationObserver?.disconnect();
  window.removeEventListener("resize", schedule);
  window.removeEventListener("scroll", onScroll, true);
  document.removeEventListener("pointermove", onDocumentPointerMove);
  if (frame) window.cancelAnimationFrame(frame);
});

/* O CSS do rascunho entra num <style> no head: mede de novo depois dele. */
watch(
  () => [props.tokens, props.spacing, props.component.id] as const,
  () => {
    void nextTick(() => {
      schedule();
      if (lastTarget) show(lastTarget);
    });
  },
  { deep: true },
);
</script>
