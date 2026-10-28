<template>
  <div class="flex flex-col gap-12">
    <article
      v-for="item in TABLE_INVENTORY"
      :key="item.name"
      class="flex min-w-0 flex-col gap-3"
    >
      <header class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 class="font-mono text-sm font-bold text-[var(--ads-text-primary)]">
          {{ item.name }}
        </h3>
        <span class="text-sm text-[var(--ads-text-secondary)]">{{ item.screen }}</span>
      </header>
      <div class="min-w-0 rounded-[var(--ads-radius-md)] bg-neutral-100 p-4 sm:p-6">
        <TableStandardPane :name="item.name" />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import TableStandardPane from "./TableStandardPane.vue";
import { TABLE_INVENTORY } from "./table-catalog";
</script>
