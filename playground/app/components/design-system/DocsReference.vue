<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-3">
      <h3 class="text-sm font-bold text-[var(--ads-text-primary)]">Código</h3>
      <DocsCode :code="block.code" :language="block.language" />
    </div>

    <div v-if="block.apis.length" class="flex flex-col gap-6">
      <h3 class="text-sm font-bold text-[var(--ads-text-primary)]">Propriedades</h3>
      <article v-for="api in block.apis" :key="api.name" class="flex flex-col gap-4">
        <div class="max-w-[70ch]">
          <h4 class="font-mono text-sm font-bold text-[var(--ads-text-primary)]">{{ api.name }}</h4>
          <p v-if="api.summary" class="mt-1 text-sm leading-relaxed text-[var(--ads-text-secondary)]">
            {{ api.summary }}
          </p>
        </div>

        <div v-if="api.props.length" class="overflow-x-auto rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)]">
          <table class="w-full border-collapse text-left text-sm">
            <caption class="sr-only">Propriedades de {{ api.name }}</caption>
            <thead class="bg-neutral-100 text-[var(--ads-text-primary)]">
              <tr>
                <th scope="col" class="px-4 py-3 font-bold">{{ api.propColumns?.name ?? "Propriedade" }}</th>
                <th scope="col" class="px-4 py-3 font-bold">{{ api.propColumns?.type ?? "Tipo" }}</th>
                <th scope="col" class="px-4 py-3 font-bold">{{ api.propColumns?.defaultValue ?? "Padrão" }}</th>
                <th scope="col" class="min-w-64 px-4 py-3 font-bold">{{ api.propColumns?.description ?? "Descrição" }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in api.props"
                :key="row.name"
                class="border-t border-[var(--ads-border-subtle)] align-top"
              >
                <th scope="row" class="px-4 py-3 font-mono text-xs font-bold text-[var(--ads-text-primary)]">
                  {{ row.name }}
                </th>
                <td class="px-4 py-3 font-mono text-xs text-[var(--ads-text-secondary)]">{{ row.type }}</td>
                <td class="px-4 py-3 font-mono text-xs whitespace-nowrap text-[var(--ads-text-primary)]">
                  {{ row.defaultValue }}
                </td>
                <td class="px-4 py-3 leading-relaxed text-[var(--ads-text-secondary)]">{{ row.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="api.events?.length" class="flex flex-col gap-2">
          <h5 class="text-xs font-bold tracking-normal text-[var(--ads-text-primary)]">Eventos</h5>
          <div class="overflow-x-auto rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)]">
            <table class="w-full border-collapse text-left text-sm">
              <caption class="sr-only">Eventos de {{ api.name }}</caption>
              <thead class="bg-neutral-100 text-[var(--ads-text-primary)]">
                <tr>
                  <th scope="col" class="px-4 py-3 font-bold">Evento</th>
                  <th scope="col" class="px-4 py-3 font-bold">Payload</th>
                  <th scope="col" class="min-w-64 px-4 py-3 font-bold">Quando</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in api.events"
                  :key="row.name"
                  class="border-t border-[var(--ads-border-subtle)] align-top"
                >
                  <th scope="row" class="px-4 py-3 font-mono text-xs font-bold text-[var(--ads-text-primary)]">
                    {{ row.name }}
                  </th>
                  <td class="px-4 py-3 font-mono text-xs text-[var(--ads-text-secondary)]">{{ row.payload }}</td>
                  <td class="px-4 py-3 leading-relaxed text-[var(--ads-text-secondary)]">{{ row.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="api.slots?.length" class="flex flex-col gap-2">
          <h5 class="text-xs font-bold tracking-normal text-[var(--ads-text-primary)]">Slots</h5>
          <div class="overflow-x-auto rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)]">
            <table class="w-full border-collapse text-left text-sm">
              <caption class="sr-only">Slots de {{ api.name }}</caption>
              <thead class="bg-neutral-100 text-[var(--ads-text-primary)]">
                <tr>
                  <th scope="col" class="px-4 py-3 font-bold">Slot</th>
                  <th scope="col" class="px-4 py-3 font-bold">Uso</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in api.slots"
                  :key="row.name"
                  class="border-t border-[var(--ads-border-subtle)] align-top"
                >
                  <th scope="row" class="px-4 py-3 font-mono text-xs font-bold text-[var(--ads-text-primary)]">
                    {{ row.name }}
                  </th>
                  <td class="px-4 py-3 leading-relaxed text-[var(--ads-text-secondary)]">{{ row.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="api.methods?.length" class="flex flex-col gap-2">
          <h5 class="text-xs font-bold tracking-normal text-[var(--ads-text-primary)]">Métodos</h5>
          <div class="overflow-x-auto rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)]">
            <table class="w-full border-collapse text-left text-sm">
              <caption class="sr-only">Métodos de {{ api.name }}</caption>
              <thead class="bg-neutral-100 text-[var(--ads-text-primary)]">
                <tr>
                  <th scope="col" class="px-4 py-3 font-bold">Método</th>
                  <th scope="col" class="px-4 py-3 font-bold">Assinatura</th>
                  <th scope="col" class="min-w-64 px-4 py-3 font-bold">Uso</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in api.methods"
                  :key="row.name"
                  class="border-t border-[var(--ads-border-subtle)] align-top"
                >
                  <th scope="row" class="px-4 py-3 font-mono text-xs font-bold text-[var(--ads-text-primary)]">
                    {{ row.name }}
                  </th>
                  <td class="px-4 py-3 font-mono text-xs text-[var(--ads-text-secondary)]">{{ row.signature }}</td>
                  <td class="px-4 py-3 leading-relaxed text-[var(--ads-text-secondary)]">{{ row.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DocsBlock } from "./catalog-docs";
import DocsCode from "./DocsCode.vue";

defineProps<{
  block: DocsBlock;
}>();
</script>
