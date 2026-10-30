<template>
  <span
    class="inline-flex h-[var(--ads-product-tag-height)] items-center rounded-[var(--ads-radius-xsm)] px-1.5 text-[length:var(--ads-product-tag-font-size)] leading-none font-medium text-[var(--ads-text-contrast)]"
    :class="surface"
  >
    {{ label || product }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

/** Mapeia `_Tags` do Figma. O fundo usa a cor de vertical/produto já publicada. */
export type AdsProductTagName =
  | "marketing"
  | "promocoes"
  | "vendas"
  | "captador"
  | "estoque"
  | "pricing"
  | "crm"
  | "compras"
  | "gestao"
  | "trade"
  | "capacitacao"
  | "ecommerce"
  | "financas"
  | "performance"
  | "encontro";

const props = withDefaults(
  defineProps<{
    product?: AdsProductTagName;
    label?: string;
  }>(),
  {
    product: "performance",
    label: "",
  },
);

const surfaces: Record<AdsProductTagName, string> = {
  marketing: "bg-ads-produtos-radar-3",
  promocoes: "bg-ads-produtos-radar-3",
  vendas: "bg-ads-produtos-radar-7",
  captador: "bg-ads-produtos-radar-10",
  estoque: "bg-ads-produtos-radar-11",
  pricing: "bg-ads-produtos-radar-7",
  crm: "bg-ads-innovation-300",
  compras: "bg-ads-produtos-radar-2",
  gestao: "bg-ads-produtos-radar-1",
  trade: "bg-ads-produtos-radar-2",
  capacitacao: "bg-ads-produtos-radar-4",
  ecommerce: "bg-ads-produtos-radar-9",
  financas: "bg-ads-produtos-radar-6",
  performance: "bg-ads-produtos-radar-6",
  encontro: "bg-ads-produtos-radar-5",
};

const surface = computed(() => surfaces[props.product]);
</script>
