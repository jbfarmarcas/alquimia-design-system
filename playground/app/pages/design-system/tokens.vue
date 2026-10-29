<template>
  <DesignSystemFrame
    v-model:active-id="activeId"
    title="Tokens"
    lede="Um componente por vez: a peça à esquerda, o JSON dos tokens à direita. O preview muda na hora. Salvar grava app/theme/component-tokens.json e o CSS que o projeto importa."
    :sections="sections"
  >
    <p v-if="loadError" class="mt-8 text-sm text-[var(--ads-status-warning-600)]" role="alert">
      Não foi possível ler os tokens do projeto.
    </p>

    <section
      v-if="current"
      :id="current.section"
      class="mt-10 scroll-mt-24"
    >
      <div class="max-w-[65ch]">
        <h2 class="text-xl font-bold tracking-[-0.02em] text-[var(--ads-text-primary)]">
          {{ current.label }}
        </h2>
        <p v-if="current.note" class="mt-3 text-sm leading-relaxed text-[var(--ads-text-secondary)]">
          {{ current.note }}
        </p>
      </div>

      <div class="mt-6 grid items-start gap-6 md:grid-cols-2 md:gap-8">
        <div
          data-review-preview
          class="flex min-h-80 flex-col gap-4 rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] p-5 md:sticky md:top-4 md:max-h-[calc(100dvh-7rem)] md:overflow-auto"
        >
          <p class="text-[length:var(--ads-font-size-xxxs)] font-bold tracking-[0.14em] text-[var(--ads-text-brand)] uppercase">
            Componente
          </p>
          <div class="flex flex-1 items-center justify-center py-6">
            <TokenPreview :id="current.id" />
          </div>
        </div>

        <div class="flex min-w-0 flex-col gap-3">
          <p class="text-[length:var(--ads-font-size-xxxs)] font-bold tracking-[0.14em] text-[var(--ads-text-brand)] uppercase">
            Tokens
          </p>
          <TokenJsonEditor :model-value="editorText" :error="jsonError" @update:model-value="onJson" />
          <p class="text-xs leading-relaxed text-[var(--ads-text-secondary)]">
            Valores entre aspas. Cor <span class="font-mono">#rrggbb</span>, medida <span class="font-mono">Npx</span> ou <span class="font-mono">Nrem</span>, peso <span class="font-mono">300</span> a <span class="font-mono">800</span>, linha <span class="font-mono">1</span> a <span class="font-mono">2</span>.
          </p>
        </div>
      </div>
    </section>

    <div
      class="sticky bottom-4 z-10 mt-10 flex flex-wrap items-center justify-between gap-3 rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] px-4 py-3 shadow-[var(--ads-shadow-level-2)]"
    >
      <p class="min-w-0 text-sm text-[var(--ads-text-secondary)]" role="status">
        {{ statusText }}
      </p>
      <div class="flex flex-wrap items-center gap-2">
        <AdsButton
          type="unfilled"
          color="neutral"
          label="Descartar"
          :disabled="!pending || saving"
          @click="discard"
        />
        <AdsButton
          type="outline"
          color="neutral"
          label="Restaurar padrão"
          :disabled="saving"
          @click="restore"
        />
        <AdsButton
          label="Salvar no projeto"
          :disabled="!dirty || saving || issues.length > 0 || Boolean(jsonError)"
          :loading="saving"
          @click="save"
        />
      </div>
    </div>
  </DesignSystemFrame>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import DesignSystemFrame from "../../components/DesignSystemFrame.vue";
import {
  PREVIEW_STYLE_ID,
  allTokenFields,
  componentTokenCatalog,
  componentTokenDefaults,
  componentTokensCss,
  tokenValueValid,
  type TokenComponent,
} from "../../../../app/theme/component-tokens";

definePageMeta({
  name: "design-system-tokens",
  layout: "design-system",
});

const sections = componentTokenCatalog.map((component) => ({
  id: component.section,
  label: component.label,
}));

const route = useRoute();
const sectionFromHash = () => {
  const id = route.hash.replace(/^#/, "");
  return sections.some((section) => section.id === id) ? id : "botao";
};

const activeId = ref(sectionFromHash());
const shownId = ref(activeId.value);
const current = computed(() =>
  componentTokenCatalog.find((component) => component.section === shownId.value)
  ?? componentTokenCatalog[0],
);

watch(activeId, (value, previous) => {
  if (value && sections.some((section) => section.id === value)) {
    shownId.value = value;
    return;
  }
  if (!value && previous) activeId.value = previous;
});

watch(
  () => route.hash,
  () => {
    activeId.value = sectionFromHash();
  },
);
const saving = ref(false);
const loaded = ref(false);
const message = ref("");
const saved = ref(componentTokenDefaults());
const draft = ref(componentTokenDefaults());

const { data, error: loadError } = await useFetch<{ tokens: Record<string, string> }>("/api/component-tokens");

const dirty = computed(() => JSON.stringify(draft.value) !== JSON.stringify(saved.value));

const issues = computed(() =>
  allTokenFields()
    .filter((field) => !tokenValueValid(field.kind, draft.value[field.name] ?? ""))
    .map((field) => `${field.group}: ${field.label}`),
);

const editorText = ref("");
const jsonError = ref("");

const componentJson = (component: TokenComponent, tokens: Record<string, string>) => {
  const entries = component.fields.map((field) => [field.name, tokens[field.name] ?? field.fallback]);
  return `${JSON.stringify(Object.fromEntries(entries), null, 2)}\n`;
};

const syncEditor = () => {
  const component = current.value;
  if (!component) return;
  editorText.value = componentJson(component, draft.value);
  jsonError.value = "";
};

const readComponentJson = (text: string) => {
  const component = current.value;
  if (!component) return { error: "" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { error: "O JSON está incompleto ou com erro de sintaxe." };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { error: "O JSON precisa ser um objeto." };
  }
  const record = parsed as Record<string, unknown>;
  const known = new Map(component.fields.map((field) => [field.name, field]));
  const invalid: string[] = [];
  const next = { ...draft.value };
  for (const key of Object.keys(record)) {
    if (!known.has(key)) invalid.push(key);
  }
  for (const field of component.fields) {
    const value = record[field.name];
    if (typeof value !== "string") {
      invalid.push(field.name);
      continue;
    }
    const normalized = field.kind === "color" ? value.trim().toLowerCase() : value.trim();
    if (!tokenValueValid(field.kind, normalized)) {
      invalid.push(field.name);
      continue;
    }
    next[field.name] = normalized;
  }
  if (invalid.length) {
    const shown = invalid.slice(0, 3).join(", ");
    const more = invalid.length > 3 ? ` e mais ${invalid.length - 3}` : "";
    return { error: `Valor inválido: ${shown}${more}.` };
  }
  return { tokens: next, error: "" };
};

const onJson = (text: string) => {
  editorText.value = text;
  message.value = "";
  const result = readComponentJson(text);
  jsonError.value = result.error;
  if (result.tokens) draft.value = result.tokens;
};

const pending = computed(() => dirty.value || jsonError.value.length > 0);

const statusText = computed(() => {
  if (message.value) return message.value;
  if (jsonError.value) return jsonError.value;
  if (issues.value.length) return `Ajuste ${issues.value[0]}.`;
  if (dirty.value) return "Alterações ainda não salvas no projeto.";
  return "Os tokens salvos estão em app/theme/component-tokens.json.";
});

watch(
  data,
  (value) => {
    if (!value?.tokens) return;
    const tokens = { ...value.tokens };
    const editing = loaded.value && JSON.stringify(draft.value) !== JSON.stringify(saved.value);
    saved.value = tokens;
    if (!editing) {
      draft.value = { ...tokens };
      syncEditor();
    }
    loaded.value = true;
  },
  { immediate: true },
);

watch(
  draft,
  (value) => {
    if (!import.meta.client || !loaded.value) return;
    applyPreview(value);
  },
  { deep: true },
);

const applyPreview = (tokens: Record<string, string>) => {
  const safe = componentTokenDefaults();
  for (const field of allTokenFields()) {
    const value = tokens[field.name];
    if (value && tokenValueValid(field.kind, value)) safe[field.name] = value;
  }
  let style = document.getElementById(PREVIEW_STYLE_ID);
  if (!(style instanceof HTMLStyleElement)) {
    style = document.createElement("style");
    style.id = PREVIEW_STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = componentTokensCss(safe);
};

const discard = () => {
  draft.value = { ...saved.value };
  message.value = "";
  syncEditor();
};

const restore = () => {
  draft.value = componentTokenDefaults();
  message.value = "";
  syncEditor();
};

const messageFrom = (error: unknown) => {
  if (error && typeof error === "object") {
    const record = error as { statusMessage?: string; data?: { statusMessage?: string } };
    if (record.data?.statusMessage) return record.data.statusMessage;
    if (record.statusMessage) return record.statusMessage;
  }
  return "Não foi possível salvar os tokens.";
};

const save = async () => {
  if (!dirty.value || issues.value.length || jsonError.value) return;
  saving.value = true;
  message.value = "";
  try {
    const result = await $fetch<{ tokens: Record<string, string> }>("/api/component-tokens", {
      method: "PUT",
      body: { tokens: draft.value },
    });
    saved.value = { ...result.tokens };
    draft.value = { ...result.tokens };
    message.value = "Salvo em app/theme/component-tokens.json.";
    syncEditor();
  } catch (error) {
    message.value = messageFrom(error);
  } finally {
    saving.value = false;
  }
};

const onLeave = (event: BeforeUnloadEvent) => {
  if (!pending.value) return;
  event.preventDefault();
  event.returnValue = "";
};

onMounted(() => {
  window.addEventListener("beforeunload", onLeave);
  if (loaded.value) applyPreview(draft.value);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", onLeave);
  document.getElementById(PREVIEW_STYLE_ID)?.remove();
});

onBeforeRouteLeave(() => {
  if (!pending.value) return true;
  return window.confirm("Há alterações sem salvar. Sair e descartar?");
});

watch(() => shownId.value, () => syncEditor());
syncEditor();
</script>
