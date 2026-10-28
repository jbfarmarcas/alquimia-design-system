<template>
  <DocsDemo language="vue" :code="code" :apis="docsApis.pills">
    <template #preview>
      <AdsBadge v-if="component === 'badge'" :color="badgeColor" :mini="badgeMini" />
      <AdsBroadcast v-else-if="component === 'broadcast'" :status="broadcastStatus" />
      <AdsPill
        v-else-if="component === 'pill'"
        :status="pillStatus"
        :tone="pillTone"
        :icon="pillIcon ? 'i-lucide-info' : undefined"
      />
      <AdsNotabilityPill v-else-if="component === 'notabilidade'" :notability="notability" />
      <AdsMiniPill v-else :type="miniType" />
    </template>

    <template #params>
      <DocsParam label="Componente">
        <AdsSegmentedTabs v-model="component" :items="componentItems" aria-label="Componente de pill" />
      </DocsParam>

      <template v-if="component === 'badge'">
        <AdsFilterSelect
          v-model="badgeColor"
          type="radio"
          label="Cor"
          block
          :searchable="false"
          :options="badgeColorOptions"
        />
        <AdsSwitch v-model="badgeMini" label="Mini (ponto)" />
      </template>

      <template v-else-if="component === 'broadcast'">
        <DocsParam label="Status">
          <AdsSegmentedTabs v-model="broadcastStatus" :items="broadcastItems" aria-label="Status da transmissão" />
        </DocsParam>
      </template>

      <template v-else-if="component === 'pill'">
        <div class="grid items-end gap-6 sm:grid-cols-2">
          <AdsFilterSelect
            v-model="pillStatus"
            type="radio"
            label="Status"
            block
            :searchable="false"
            :options="pillStatusOptions"
          />
          <DocsParam label="Tom">
            <AdsSegmentedTabs v-model="pillTone" :items="pillToneItems" aria-label="Tom da pill" />
          </DocsParam>
        </div>
        <AdsSwitch v-model="pillIcon" label="Ícone" />
      </template>

      <template v-else-if="component === 'notabilidade'">
        <DocsParam label="Notabilidade">
          <AdsSegmentedTabs v-model="notability" :items="notabilityItems" aria-label="Notabilidade" />
        </DocsParam>
      </template>

      <template v-else>
        <DocsParam label="Estado">
          <AdsSegmentedTabs v-model="miniType" :items="miniItems" aria-label="Estado mini" />
        </DocsParam>
      </template>
    </template>
  </DocsDemo>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import DocsDemo from "../DocsDemo.vue";
import DocsParam from "../DocsParam.vue";
import { docsApis } from "../catalog-docs";
import { attr, buildTag } from "../../../utils/code-builder";
import AdsBadge, { type AdsBadgeColor } from "../../../../../app/components/AdsBadge.vue";
import AdsBroadcast, { type AdsBroadcastStatus } from "../../../../../app/components/AdsBroadcast.vue";
import AdsFilterSelect from "../../../../../app/components/AdsFilterSelect.vue";
import AdsMiniPill from "../../../../../app/components/AdsMiniPill.vue";
import AdsNotabilityPill from "../../../../../app/components/AdsNotabilityPill.vue";
import AdsPill, { type AdsPillStatus, type AdsPillTone } from "../../../../../app/components/AdsPill.vue";
import AdsSegmentedTabs from "../../../../../app/components/AdsSegmentedTabs.vue";
import AdsSwitch from "../../../../../app/components/AdsSwitch.vue";

type PillComponent = "badge" | "broadcast" | "pill" | "notabilidade" | "mini";
type MiniType = "nao-iniciado" | "pausado" | "novo";

const component = ref<PillComponent>("badge");
const badgeColor = ref<AdsBadgeColor>("primary");
const badgeMini = ref(false);
const broadcastStatus = ref<AdsBroadcastStatus>("warning");
const pillStatus = ref<AdsPillStatus>("success");
const pillTone = ref<AdsPillTone>("primary");
const pillIcon = ref(false);
const notability = ref("traffic");
const miniType = ref<MiniType>("pausado");

const componentItems = [
  { label: "Badge", value: "badge" },
  { label: "Broadcast", value: "broadcast" },
  { label: "Pill", value: "pill" },
  { label: "Notabilidade", value: "notabilidade" },
  { label: "Mini", value: "mini" },
];

const badgeColorOptions = [
  { value: "primary", label: "Primary" },
  { value: "success", label: "Success" },
  { value: "attention", label: "Attention" },
  { value: "warning", label: "Warning" },
  { value: "new", label: "New" },
  { value: "innovation", label: "Inovação" },
  { value: "blocked", label: "Blocked" },
];

const broadcastItems = [
  { label: "Atenção", value: "warning" },
  { label: "Sucesso", value: "success" },
];

const pillStatusOptions = [
  { value: "default", label: "Default" },
  { value: "success", label: "Success" },
  { value: "attention", label: "Attention" },
  { value: "warning", label: "Warning" },
  { value: "new", label: "New" },
  { value: "blocked", label: "Blocked" },
  { value: "innovation", label: "Inovação" },
  { value: "neutral", label: "Neutral" },
];

const pillToneItems = [
  { label: "Primary", value: "primary" },
  { label: "Secondary", value: "secondary" },
];

const notabilityItems = [
  { label: "Imagem", value: "image" },
  { label: "Tráfego", value: "traffic" },
  { label: "Lucro", value: "profit" },
];

const miniItems = [
  { label: "Não iniciado", value: "nao-iniciado" },
  { label: "Pausado", value: "pausado" },
  { label: "Novo", value: "novo" },
];

const code = computed(() => {
  if (component.value === "badge") {
    return buildTag("AdsBadge", [
      attr(badgeColor.value !== "primary", "color", badgeColor.value),
      attr(badgeMini.value, "mini"),
    ]);
  }
  if (component.value === "broadcast") {
    return buildTag("AdsBroadcast", [attr(broadcastStatus.value !== "warning", "status", broadcastStatus.value)]);
  }
  if (component.value === "pill") {
    return buildTag("AdsPill", [
      attr(pillStatus.value !== "default", "status", pillStatus.value),
      attr(pillTone.value !== "primary", "tone", pillTone.value),
      attr(pillIcon.value, "icon", "i-lucide-info"),
    ]);
  }
  if (component.value === "notabilidade") {
    return buildTag("AdsNotabilityPill", [attr(true, "notability", notability.value)]);
  }
  return buildTag("AdsMiniPill", [attr(true, "type", miniType.value)]);
});
</script>
