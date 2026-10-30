<template>
  <span
    class="inline-flex h-[var(--ads-farmarcas-height)] min-w-[var(--ads-farmarcas-min-width)] items-center justify-center rounded-full px-2 text-[length:var(--ads-farmarcas-font-size)] leading-[1.2] font-bold whitespace-nowrap"
    :style="{
      background: `var(--ads-farmarcas-${token}-bg)`,
      color: `var(--ads-farmarcas-${token}-text)`,
    }"
  >
    {{ label || labels[department] }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

/** Departamentos do Farmarcas Pill. As cores não existem na escala semântica do ADS. */
export type AdsFarmarcasDepartment =
  | "expansao"
  | "eventos"
  | "adm-digital"
  | "sucesso"
  | "trade"
  | "dev"
  | "ti"
  | "padronizacao"
  | "diretoria"
  | "comercial"
  | "inovacao"
  | "patrimonio"
  | "presidencia"
  | "marketing"
  | "gg"
  | "bi"
  | "financeiro"
  | "juridico"
  | "capacitacao"
  | "produto";

const props = withDefaults(
  defineProps<{
    department?: AdsFarmarcasDepartment;
    label?: string;
  }>(),
  {
    department: "expansao",
    label: "",
  },
);

const labels: Record<AdsFarmarcasDepartment, string> = {
  expansao: "Expansão",
  eventos: "Eventos",
  "adm-digital": "ADM digital",
  sucesso: "Sucesso",
  trade: "Trade",
  dev: "Dev",
  ti: "TI",
  padronizacao: "Padronização",
  diretoria: "Diretoria",
  comercial: "Comercial",
  inovacao: "Inovação",
  patrimonio: "Patrimônio",
  presidencia: "Presidência",
  marketing: "Marketing",
  gg: "G&G",
  bi: "BI",
  financeiro: "Financeiro",
  juridico: "Jurídico",
  capacitacao: "Capacitação",
  produto: "produto",
};

const token = computed(() => props.department);
</script>
