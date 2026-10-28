<template>
  <div>
    <div
      ref="stage"
      class="relative mx-auto flex max-w-6xl flex-col px-4 py-10 sm:px-8 lg:px-12 lg:py-14"
      :class="stageClass"
      @pointerdown.capture="onPointerDown"
      @pointerup.capture="blockAnnotating"
      @click.capture="onClick"
    >
      <slot />

      <div class="pointer-events-none absolute inset-0 z-20">
        <button
          v-for="note in visibleNotes"
          :key="note.id"
          type="button"
          data-review-ui
          :data-note-id="note.id"
          class="pointer-events-auto absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[var(--ads-radius-pill)] text-xs font-bold shadow-[var(--ads-shadow-level-1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          :class="pinClass(note)"
          :style="pinStyle(note.id)"
          v-show="hasPin(note.id)"
          :aria-label="pinLabel(note)"
          :title="note.body"
          @click="selectNote(note.id)"
        >
          {{ noteNumber(note.id) }}
        </button>
        <button
          v-if="draft"
          type="button"
          data-review-ui
          class="pointer-events-auto absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[var(--ads-radius-pill)] bg-[var(--ads-status-attention-500)] text-[var(--ads-text-primary)] shadow-[var(--ads-shadow-level-1)]"
          :style="pinStyle('draft')"
          v-show="hasPin('draft')"
          aria-label="Nova anotação, ainda não salva"
          @click="focusDraft"
        >
          <UIcon name="i-lucide-plus" class="size-4" />
        </button>
      </div>

      <div
        v-if="draft && hasPin('draft')"
        data-review-ui
        class="absolute z-30 flex w-80 max-w-[calc(100%-1rem)] select-text flex-col gap-3 rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] p-3 shadow-[var(--ads-shadow-level-2)]"
        :style="cardStyle"
        role="dialog"
        aria-labelledby="review-draft-title"
      >
        <p id="review-draft-title" class="text-sm font-bold text-[var(--ads-text-primary)]">
          Nova anotação · {{ draft.sectionLabel }}
        </p>
        <p v-if="draft.target" class="text-xs leading-relaxed text-[var(--ads-text-secondary)]">
          {{ draft.target }}
        </p>
        <div class="flex flex-col gap-1">
          <label :for="nameId" class="text-xs leading-[1.2] text-[var(--ads-text-secondary)]">Seu nome</label>
          <input
            :id="nameId"
            ref="nameInput"
            v-model="author"
            class="h-10 px-3"
            :class="fieldClass"
            maxlength="80"
            autocomplete="name"
            placeholder="Seu nome"
          >
        </div>
        <div class="flex flex-col gap-1">
          <label :for="bodyId" class="text-xs leading-[1.2] text-[var(--ads-text-secondary)]">Comentário</label>
          <textarea
            :id="bodyId"
            ref="bodyInput"
            v-model="draft.body"
            class="min-h-24 resize-y px-3 py-2"
            :class="fieldClass"
            rows="4"
            maxlength="4000"
            placeholder="O que precisa mudar aqui?"
            @keydown.ctrl.enter.prevent="commitDraft"
            @keydown.meta.enter.prevent="commitDraft"
          />
        </div>
        <p v-if="draftError" class="text-xs leading-relaxed text-[var(--ads-status-warning-800)]">
          {{ draftError }}
        </p>
        <div class="flex flex-wrap items-center gap-2">
          <AdsButton size="sm" label="Salvar" :loading="busy" @click="commitDraft" />
          <AdsButton size="sm" type="outline" label="Cancelar" :disabled="busy" @click="cancelDraft" />
          <span class="text-xs text-[var(--ads-text-tertiary)]">Ctrl+Enter salva</span>
        </div>
      </div>
    </div>

    <div
      data-review-ui
      data-review-launcher
      class="fixed bottom-5 z-40 flex flex-col items-end gap-2"
      :class="panelOpen ? 'right-[21.5rem] max-sm:hidden' : 'right-5'"
    >
      <p
        v-if="loadError || statusMessage"
        class="max-w-56 rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] px-3 py-2 text-xs leading-relaxed shadow-[var(--ads-shadow-level-2)]"
        :class="loadError ? 'text-[var(--ads-status-warning-800)]' : 'text-[var(--ads-text-secondary)]'"
        role="status"
      >
        {{ loadError || statusMessage }}
      </p>
      <p
        v-if="annotating"
        class="max-w-56 rounded-[var(--ads-radius-md)] bg-[var(--ads-status-attention-100)] px-3 py-2 text-xs leading-relaxed text-[var(--ads-text-primary)] shadow-[var(--ads-shadow-level-1)]"
      >
        Clique no exemplo para comentar. Os parâmetros continuam clicáveis. Alt+clique marca sem acionar. Esc sai.
      </p>
      <div v-if="menuOpen" id="review-launcher-menu" class="flex flex-col items-end gap-2" role="group" aria-label="Ações da revisão">
        <AdsButton
          size="sm"
          :type="annotating ? 'filled' : 'secondary'"
          :label="annotating ? 'Anotando' : 'Anotar'"
          icon="i-lucide-message-square-plus"
          leading
          :aria-pressed="annotating"
          @click="toggleAnnotating"
        />
        <AdsButton
          size="sm"
          color="neutral"
          :type="panelOpen ? 'filled' : 'outline'"
          icon="i-lucide-messages-square"
          leading
          :label="openTotal ? `Anotações (${openTotal})` : 'Anotações'"
          aria-controls="review-notes-panel"
          :aria-expanded="panelOpen"
          @click="togglePanel"
        />
      </div>
      <button
        type="button"
        class="relative grid size-12 place-items-center rounded-[var(--ads-radius-pill)] shadow-[var(--ads-shadow-level-2)] transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        :class="annotating ? 'bg-[var(--ads-status-attention-500)] text-[var(--ads-text-primary)]' : 'bg-[var(--ads-button-primary)] text-[var(--ads-text-contrast)]'"
        :aria-label="launcherLabel"
        aria-controls="review-launcher-menu"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <UIcon :name="menuOpen ? 'i-lucide-x' : 'i-lucide-message-square-plus'" class="size-5" />
        <span
          v-if="openTotal"
          aria-hidden="true"
          class="absolute -top-1 -end-1 grid h-5 min-w-5 place-items-center rounded-[var(--ads-radius-pill)] px-1 text-[10px] font-bold leading-none"
          :class="annotating ? 'bg-[var(--ads-button-primary)] text-[var(--ads-text-contrast)]' : 'bg-[var(--ads-status-attention-500)] text-[var(--ads-text-primary)]'"
        >
          {{ openTotal }}
        </span>
      </button>
    </div>

    <Teleport to="body">
      <button
        v-if="panelOpen"
        type="button"
        data-review-ui
        class="fixed inset-0 z-40 bg-[var(--ads-text-primary)]/40 sm:hidden"
        aria-label="Fechar anotações"
        @click="panelOpen = false"
      />
      <section
        v-if="panelOpen"
        id="review-notes-panel"
        ref="panelRoot"
        data-review-ui
        class="fixed top-0 right-0 z-50 flex h-dvh w-full max-w-full flex-col border-l border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] shadow-[var(--ads-shadow-level-2)] sm:w-80"
        role="dialog"
        aria-label="Anotações da página"
      >
        <header class="flex items-start justify-between gap-3 border-b border-[var(--ads-border-subtle)] px-4 py-3">
          <div class="min-w-0">
            <h2 class="text-base font-bold text-[var(--ads-text-primary)]">Anotações</h2>
            <p class="mt-1 text-xs leading-relaxed text-[var(--ads-text-secondary)]">
              Gravadas no banco SQLite desta aplicação. Quem abrir este site vê as mesmas notas.
            </p>
          </div>
          <span ref="closeWrap">
            <AdsButton
              size="sm"
              type="unfilled"
              color="neutral"
              icon="i-lucide-x"
              aria-label="Fechar anotações"
              @click="panelOpen = false"
            />
          </span>
        </header>

        <div class="flex gap-1 px-4 py-3" role="group" aria-label="Filtrar anotações">
          <button
            v-for="item in filters"
            :key="item.id"
            type="button"
            class="rounded-[var(--ads-radius-sm)] px-2.5 py-1 text-xs font-bold transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            :class="noteFilter === item.id ? 'bg-[var(--ads-button-secondary)] text-[var(--ads-text-primary)]' : 'text-[var(--ads-text-secondary)] hover:bg-neutral-100'"
            :aria-pressed="noteFilter === item.id"
            @click="noteFilter = item.id"
          >
            {{ item.label }}
          </button>
        </div>

        <div class="min-h-0 flex-1 overflow-auto px-4 pb-4">
          <p v-if="!panelNotes.length" class="text-sm leading-relaxed text-[var(--ads-text-secondary)]">
            {{ emptyLabel }}
          </p>
          <ul v-else class="flex flex-col gap-3">
            <li
              v-for="note in panelNotes"
              :key="note.id"
              class="rounded-[var(--ads-radius-md)] border border-[var(--ads-border-subtle)] p-3"
              :class="selectedId === note.id ? 'bg-[var(--ads-button-secondary)]' : 'bg-[var(--ads-surface-card)]'"
            >
              <button type="button" class="flex w-full flex-col gap-2 text-left" @click="selectNote(note.id)">
                <span class="flex items-center gap-2">
                  <span
                    class="grid size-6 shrink-0 place-items-center rounded-[var(--ads-radius-pill)] text-xs font-bold"
                    :class="note.status === 'open' ? 'bg-[var(--ads-button-primary)] text-[var(--ads-text-contrast)]' : 'bg-[var(--ads-surface-card)] text-[var(--ads-text-secondary)] ring-1 ring-[var(--ads-border-subtle)]'"
                  >
                    {{ noteNumber(note.id) }}
                  </span>
                  <span class="min-w-0 flex-1 font-bold text-[var(--ads-text-primary)]">{{ sectionTitle(note) }}</span>
                  <span class="text-xs text-[var(--ads-text-secondary)]">
                    {{ note.status === "open" ? "Aberta" : "Resolvida" }}
                  </span>
                </span>
                <span v-if="note.target" class="text-xs leading-relaxed text-[var(--ads-text-secondary)]">
                  {{ note.target }}
                </span>
                <span v-if="selectedId !== note.id" class="text-sm leading-relaxed break-words whitespace-pre-wrap text-[var(--ads-text-primary)]">
                  {{ note.body }}
                </span>
                <span class="text-xs text-[var(--ads-text-tertiary)]">
                  {{ note.author }} · {{ formatWhen(note.createdAt) }}
                </span>
              </button>
              <div v-if="selectedId === note.id" class="mt-3 flex flex-col gap-2">
                <label :for="editId" class="text-xs leading-[1.2] text-[var(--ads-text-secondary)]">Comentário</label>
                <textarea
                  :id="editId"
                  v-model="editBody"
                  class="min-h-24 resize-y px-3 py-2"
                  :class="fieldClass"
                  rows="4"
                  maxlength="4000"
                />
                <div class="flex flex-wrap gap-2">
                  <AdsButton size="sm" label="Salvar" :disabled="!editDirty" :loading="busy" @click="saveEdit" />
                  <AdsButton
                    size="sm"
                    type="outline"
                    :label="note.status === 'open' ? 'Resolver' : 'Reabrir'"
                    :disabled="busy"
                    @click="toggleStatus"
                  />
                  <AdsButton
                    size="sm"
                    type="unfilled"
                    color="warning"
                    :label="confirmDelete === note.id ? 'Confirmar exclusão' : 'Excluir'"
                    :disabled="busy"
                    @click="removeSelected"
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>

        <footer class="flex flex-col gap-3 border-t border-[var(--ads-border-subtle)] px-4 py-3">
          <div class="flex flex-col gap-1">
            <label :for="panelNameId" class="text-xs leading-[1.2] text-[var(--ads-text-secondary)]">Seu nome</label>
            <input
              :id="panelNameId"
              v-model="author"
              class="h-10 px-3"
              :class="fieldClass"
              maxlength="80"
              autocomplete="name"
              placeholder="Seu nome"
            >
            <p class="text-xs leading-relaxed text-[var(--ads-text-tertiary)]">O nome entra nas anotações novas.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <AdsButton size="sm" type="outline" label="Baixar" :disabled="busy" @click="downloadNotes" />
            <AdsButton size="sm" type="outline" label="Importar" :disabled="busy" @click="fileInput?.click()" />
            <AdsButton
              v-if="pageNotes.length"
              size="sm"
              type="unfilled"
              color="warning"
              :label="confirmClear ? 'Confirmar exclusão' : 'Apagar desta página'"
              :disabled="busy"
              @click="clearPageNotes"
            />
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="application/json,.json"
            class="sr-only"
            @change="onImportFile"
          >
        </footer>
      </section>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import { reviewErrorText, useDesignReview, type ReviewNote } from "../composables/useDesignReview";

const props = defineProps<{
  sections: readonly { id: string; label: string }[];
}>();

const {
  notes,
  author,
  pageKey,
  pageNotes,
  openTotal,
  loadError,
  load,
  createNote,
  updateNote,
  removeNote,
  clearPage,
  importReviewNotes,
} = useDesignReview();

const annotating = useState("design-review-annotating", () => false);
const panelOpen = useState("design-review-panel", () => false);
const menuOpen = ref(false);
const noteFilter = ref<"open" | "resolved" | "all">("open");
const selectedId = ref("");
const editBody = ref("");
const confirmDelete = ref("");
const confirmClear = ref(false);
const busy = ref(false);
const statusMessage = ref("");
const draftError = ref("");
const nameId = useId();
const bodyId = useId();
const editId = useId();
const panelNameId = useId();

type Draft = {
  sectionId: string;
  sectionLabel: string;
  target: string;
  x: number;
  y: number;
  body: string;
};

type PinPos = { left: number; top: number };

const draft = ref<Draft | null>(null);
const stage = ref<HTMLElement | null>(null);
const panelRoot = ref<HTMLElement | null>(null);
const closeWrap = ref<HTMLElement | null>(null);
const nameInput = ref<HTMLInputElement | null>(null);
const bodyInput = ref<HTMLTextAreaElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const pinPositions = ref<Record<string, PinPos>>({});
const cardStyle = ref({ left: "0px", top: "0px" });

const filters = [
  { id: "open", label: "Abertas" },
  { id: "resolved", label: "Resolvidas" },
  { id: "all", label: "Todas" },
] as const;

const fieldClass = "w-full rounded-[var(--ads-radius-sm)] border border-[var(--ads-border-subtle)] bg-[var(--ads-surface-card)] text-sm leading-relaxed text-[var(--ads-text-primary)] outline-none placeholder:text-[var(--ads-text-tertiary)] focus:border-(length:--ads-border-width-slim) focus:border-[var(--color-primary-400)]";

const stageClass = computed(() =>
  annotating.value
    ? "cursor-crosshair select-none [&_*]:cursor-crosshair [&_[data-review-ui]]:cursor-auto [&_[data-review-ui]]:select-text [&_[data-review-ui]_*]:cursor-auto"
    : "",
);

const visibleNotes = computed(() =>
  pageNotes.value.filter((note) => {
    if (note.status === "open") return true;
    if (note.id === selectedId.value) return true;
    return panelOpen.value && noteFilter.value !== "open";
  }),
);

const panelNotes = computed(() => {
  const list = [...pageNotes.value].reverse();
  return list.filter((note) => {
    if (note.id === selectedId.value) return true;
    if (noteFilter.value === "all") return true;
    return note.status === noteFilter.value;
  });
});

const selectedNote = computed(() => pageNotes.value.find((note) => note.id === selectedId.value) ?? null);

const editDirty = computed(() => {
  const note = selectedNote.value;
  if (!note) return false;
  const body = editBody.value.trim();
  return body.length > 0 && body !== note.body;
});

const launcherLabel = computed(() => {
  if (!openTotal.value) return "Revisão do design";
  const noun = openTotal.value === 1 ? "anotação aberta" : "anotações abertas";
  return `Revisão do design, ${openTotal.value} ${noun}`;
});

const emptyLabel = computed(() => {
  if (!pageNotes.value.length) return "Nenhuma anotação nesta página. Ative Anotar e clique no componente.";
  if (noteFilter.value === "resolved") return "Nenhuma anotação resolvida nesta página.";
  if (noteFilter.value === "open") return "Nenhuma anotação aberta nesta página.";
  return "Nenhuma anotação nesta página.";
});

function sectionTitle(note: Pick<ReviewNote, "sectionId" | "sectionLabel">) {
  if (note.sectionId === "introducao") return "Introdução";
  return props.sections.find((section) => section.id === note.sectionId)?.label || note.sectionLabel;
}

function noteNumber(id: string) {
  const index = pageNotes.value.findIndex((note) => note.id === id);
  return index === -1 ? 0 : index + 1;
}

function hasPin(id: string) {
  return pinPositions.value[id] !== undefined;
}

function pinStyle(id: string) {
  const pos = pinPositions.value[id];
  if (!pos) return undefined;
  return { left: `${pos.left}px`, top: `${pos.top}px` };
}

function pinClass(note: ReviewNote) {
  const ring = note.id === selectedId.value ? "ring-2 ring-offset-2 ring-[var(--ads-button-primary-pressed)]" : "";
  if (note.status === "resolved") {
    return `bg-[var(--ads-surface-card)] text-[var(--ads-text-secondary)] ring-1 ring-[var(--ads-border-subtle)] ${ring}`;
  }
  return `bg-[var(--ads-button-primary)] text-[var(--ads-text-contrast)] ${ring}`;
}

function pinLabel(note: ReviewNote) {
  const state = note.status === "open" ? "aberta" : "resolvida";
  return `Anotação ${noteNumber(note.id)} em ${sectionTitle(note)}, ${state}. ${note.body}`;
}

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function clamp01(value: number) {
  if (Number.isNaN(value)) return 0.5;
  return Math.min(1, Math.max(0, value));
}

function anchorAt(root: HTMLElement, target: Element, clientY: number) {
  const direct = target.closest<HTMLElement>("section[id], #introducao");
  if (direct && root.contains(direct)) return direct;
  const anchors = [...root.querySelectorAll<HTMLElement>("section[id], #introducao")];
  let best: HTMLElement | null = null;
  let bestDist = Number.POSITIVE_INFINITY;
  for (const el of anchors) {
    const rect = el.getBoundingClientRect();
    const dist = clientY < rect.top ? rect.top - clientY : clientY > rect.bottom ? clientY - rect.bottom : 0;
    if (dist < bestDist) {
      best = el;
      bestDist = dist;
    }
  }
  return best;
}

function describeTarget(target: Element, anchor: HTMLElement) {
  const named = target.closest<HTMLElement>("button, a, label, h1, h2, h3, h4, [aria-label]");
  const source = named ?? anchor.querySelector<HTMLElement>("h1, h2, h3");
  const raw = source?.getAttribute("aria-label") || source?.innerText || "";
  const clean = raw.replace(/\s+/g, " ").trim();
  return clean.length > 80 ? `${clean.slice(0, 77)}...` : clean;
}

function demoState(target: Element) {
  const demo = target.closest("[data-review-demo]");
  if (!demo) return "";
  const group = [...demo.querySelectorAll<HTMLElement>("[aria-label]")].find((element) =>
    /estado/i.test(element.getAttribute("aria-label") || ""),
  );
  const selected = group?.querySelector<HTMLElement>("[aria-selected='true'], [aria-pressed='true']");
  const label = selected?.innerText.replace(/\s+/g, " ").trim() ?? "";
  if (!label || /^ativo$/i.test(label)) return "";
  return label;
}

function placeCard(root: HTMLElement, stageRect: DOMRect, pinLeft: number, pinTop: number) {
  const width = 320;
  const height = 300;
  const gap = 12;
  let left = pinLeft + 22;
  if (stageRect.left + left + width > window.innerWidth - 16) left = pinLeft - width - gap;
  left = Math.max(8, Math.min(left, Math.max(8, root.clientWidth - width - 8)));
  let top = pinTop - 8;
  if (stageRect.top + top + height > window.innerHeight - 16) top = pinTop - height - 8;
  if (stageRect.top + top < 8) top = 8 - stageRect.top;
  return { left: `${left}px`, top: `${top}px` };
}

function measure() {
  const root = stage.value;
  if (!root) return;
  const stageRect = root.getBoundingClientRect();
  const next: Record<string, PinPos> = {};
  const place = (id: string, sectionId: string, x: number, y: number) => {
    const anchor = root.querySelector<HTMLElement>(`#${CSS.escape(sectionId)}`);
    if (!anchor) return null;
    const rect = anchor.getBoundingClientRect();
    const pos = {
      left: rect.left - stageRect.left + rect.width * x,
      top: rect.top - stageRect.top + rect.height * y,
    };
    next[id] = pos;
    return pos;
  };
  for (const note of pageNotes.value) place(note.id, note.sectionId, note.x, note.y);
  if (draft.value) {
    const pos = place("draft", draft.value.sectionId, draft.value.x, draft.value.y);
    if (pos) cardStyle.value = placeCard(root, stageRect, pos.left, pos.top);
  }
  pinPositions.value = next;
}

function isReviewTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("[data-review-ui]"));
}

function pinsOnClick(target: EventTarget | null) {
  if (!annotating.value || !(target instanceof Element) || isReviewTarget(target)) return false;
  const root = stage.value;
  if (!root?.contains(target)) return false;
  if (target.closest("[data-review-preview]")) return true;
  return !root.querySelector("[data-review-preview]");
}

function blockAnnotating(event: Event) {
  if (!pinsOnClick(event.target)) return;
  event.preventDefault();
  event.stopPropagation();
}

function placeDraft(event: MouseEvent) {
  const root = stage.value;
  const target = event.target;
  if (!root || !(target instanceof Element)) return;
  const anchor = anchorAt(root, target, event.clientY);
  if (!anchor?.id) return;
  const rect = anchor.getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1) return;
  const sectionId = anchor.id;
  const state = demoState(target);
  const name = describeTarget(target, anchor);
  const label = state && !name.includes(state) ? `${name} · ${state}`.replace(/^ · /, "") : name;
  draft.value = {
    sectionId,
    sectionLabel: sectionId === "introducao"
      ? "Introdução"
      : props.sections.find((section) => section.id === sectionId)?.label || sectionId,
    target: label.length > 200 ? `${label.slice(0, 197)}...` : label,
    x: clamp01((event.clientX - rect.left) / rect.width),
    y: clamp01((event.clientY - rect.top) / rect.height),
    body: "",
  };
  draftError.value = "";
  measure();
}

let placedOnPointer = false;

function onPointerDown(event: PointerEvent) {
  if (menuOpen.value && !isReviewTarget(event.target)) {
    menuOpen.value = false;
    placedOnPointer = true;
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  if (!pinsOnClick(event.target) || event.button !== 0) return;
  event.preventDefault();
  event.stopPropagation();
  placedOnPointer = true;
  if (draft.value?.body.trim()) {
    statusMessage.value = "Salve ou cancele a anotação aberta antes de marcar outro ponto.";
    return;
  }
  placeDraft(event);
}

function isQuietPin(event: MouseEvent) {
  return event.altKey && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey;
}

function isQuietTarget(target: EventTarget | null) {
  if (!(target instanceof Element) || isReviewTarget(target)) return false;
  const root = stage.value;
  if (!root) return false;
  if (root.contains(target)) return true;
  return Boolean(target.closest("[role='dialog'], [role='menu'], [role='listbox']"));
}

function onQuietPointerDown(event: PointerEvent) {
  if (!isQuietPin(event) || !isQuietTarget(event.target)) return;
  event.preventDefault();
  event.stopPropagation();
  placedOnPointer = true;
  if (draft.value?.body.trim()) {
    statusMessage.value = "Salve ou cancele a anotação aberta antes de marcar outro ponto.";
    return;
  }
  placeDraft(event);
}

function onQuietPointerUp(event: PointerEvent) {
  if (!isQuietPin(event) || !isQuietTarget(event.target)) return;
  event.preventDefault();
  event.stopPropagation();
}

function onQuietClick(event: MouseEvent) {
  if (!isQuietPin(event) || !isQuietTarget(event.target)) return;
  event.preventDefault();
  event.stopPropagation();
  placedOnPointer = false;
}

function onClick(event: MouseEvent) {
  if (!pinsOnClick(event.target)) return;
  event.preventDefault();
  event.stopPropagation();
  if (placedOnPointer) {
    placedOnPointer = false;
    return;
  }
  if (draft.value?.body.trim()) {
    statusMessage.value = "Salve ou cancele a anotação aberta antes de marcar outro ponto.";
    return;
  }
  placeDraft(event);
}

function focusDraft() {
  if (!author.value.trim()) nameInput.value?.focus();
  else bodyInput.value?.focus();
}

function cancelDraft() {
  draft.value = null;
  draftError.value = "";
}

function toggleAnnotating() {
  annotating.value = !annotating.value;
  menuOpen.value = false;
  if (!annotating.value && !draft.value?.body.trim()) cancelDraft();
}

function togglePanel() {
  panelOpen.value = !panelOpen.value;
  menuOpen.value = false;
  if (!panelOpen.value) return;
  load();
  nextTick(() => closeWrap.value?.querySelector("button")?.focus());
}

async function commitDraft() {
  if (!draft.value || busy.value) return;
  const body = draft.value.body.trim();
  const name = author.value.trim();
  if (!body || !name) {
    draftError.value = name ? "Escreva o comentário." : "Escreva o comentário e o seu nome.";
    if (!name) nameInput.value?.focus();
    else bodyInput.value?.focus();
    return;
  }
  author.value = name;
  busy.value = true;
  draftError.value = "";
  try {
    const note = await createNote({
      page: pageKey.value,
      sectionId: draft.value.sectionId,
      sectionLabel: draft.value.sectionLabel,
      target: draft.value.target,
      x: draft.value.x,
      y: draft.value.y,
      body,
      author: name,
    });
    draft.value = null;
    selectedId.value = note.id;
    panelOpen.value = true;
    statusMessage.value = `Anotação salva em ${sectionTitle(note)}.`;
    await nextTick();
    panelRoot.value?.querySelector("textarea")?.focus();
  } catch (error) {
    draftError.value = reviewErrorText(error, "Não foi possível salvar a anotação.");
  } finally {
    busy.value = false;
  }
}

async function selectNote(id: string) {
  const already = selectedId.value === id;
  selectedId.value = id;
  panelOpen.value = true;
  await nextTick();
  measure();
  await nextTick();
  const note = pageNotes.value.find((item) => item.id === id);
  const pin = stage.value?.querySelector<HTMLElement>(`[data-note-id="${CSS.escape(id)}"]`);
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  if (pin) pin.scrollIntoView({ behavior, block: "center", inline: "nearest" });
  else if (note?.sectionId) document.getElementById(note.sectionId)?.scrollIntoView({ behavior, block: "start" });
  if (!already) panelRoot.value?.querySelector("textarea")?.focus();
}

async function saveEdit() {
  const note = selectedNote.value;
  const body = editBody.value.trim();
  if (!note || !body || body === note.body || busy.value) return;
  busy.value = true;
  try {
    await updateNote(note.id, { body });
    statusMessage.value = "Anotação atualizada.";
  } catch (error) {
    statusMessage.value = reviewErrorText(error, "Não foi possível atualizar a anotação.");
  } finally {
    busy.value = false;
  }
}

async function toggleStatus() {
  const note = selectedNote.value;
  if (!note || busy.value) return;
  const status = note.status === "open" ? "resolved" : "open";
  busy.value = true;
  try {
    await updateNote(note.id, { status });
    statusMessage.value = status === "resolved" ? "Anotação resolvida." : "Anotação reaberta.";
  } catch (error) {
    statusMessage.value = reviewErrorText(error, "Não foi possível atualizar a anotação.");
  } finally {
    busy.value = false;
  }
}

async function removeSelected() {
  const note = selectedNote.value;
  if (!note || busy.value) return;
  if (confirmDelete.value !== note.id) {
    confirmDelete.value = note.id;
    return;
  }
  busy.value = true;
  try {
    await removeNote(note.id);
    selectedId.value = "";
    confirmDelete.value = "";
    statusMessage.value = "Anotação excluída.";
  } catch (error) {
    statusMessage.value = reviewErrorText(error, "Não foi possível excluir a anotação.");
  } finally {
    busy.value = false;
  }
}

async function clearPageNotes() {
  if (!confirmClear.value) {
    confirmClear.value = true;
    return;
  }
  if (busy.value) return;
  busy.value = true;
  try {
    await clearPage(pageKey.value);
    selectedId.value = "";
    draft.value = null;
    confirmClear.value = false;
    statusMessage.value = "Anotações desta página foram apagadas.";
  } catch (error) {
    statusMessage.value = reviewErrorText(error, "Não foi possível apagar as anotações.");
  } finally {
    busy.value = false;
  }
}

async function downloadNotes() {
  if (busy.value) return;
  busy.value = true;
  try {
    await load();
    if (!notes.value.length) {
      statusMessage.value = "Não há anotações para baixar.";
      return;
    }
    const payload = {
      kind: "ads-design-review",
      exportedAt: new Date().toISOString(),
      notes: notes.value,
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "anotacoes-design-system.json";
    link.click();
    URL.revokeObjectURL(url);
    statusMessage.value = "Arquivo de anotações baixado.";
  } finally {
    busy.value = false;
  }
}

async function onImportFile(event: Event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  const file = input.files?.[0];
  input.value = "";
  if (!file || busy.value) return;
  let payload: unknown;
  try {
    payload = JSON.parse(await file.text());
  } catch {
    statusMessage.value = "O arquivo não é um JSON válido.";
    return;
  }
  busy.value = true;
  try {
    const result = await importReviewNotes(payload);
    panelOpen.value = true;
    statusMessage.value = result.changed
      ? `${result.changed} ${result.changed === 1 ? "anotação gravada" : "anotações gravadas"} no banco.`
      : "Nenhuma anotação nova no arquivo.";
  } catch (error) {
    statusMessage.value = reviewErrorText(error, "Não foi possível importar o arquivo.");
  } finally {
    busy.value = false;
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== "Escape") return;
  const target = event.target;
  if (target instanceof Element) {
    const foreign = target.closest("[role='dialog'], [role='menu'], [role='listbox']");
    if (foreign && !foreign.hasAttribute("data-review-ui") && !foreign.closest("[data-review-ui]")) return;
  }
  if (draft.value) {
    event.preventDefault();
    event.stopPropagation();
    cancelDraft();
    return;
  }
  if (menuOpen.value) {
    event.preventDefault();
    event.stopPropagation();
    menuOpen.value = false;
    return;
  }
  if (panelOpen.value) {
    event.preventDefault();
    event.stopPropagation();
    panelOpen.value = false;
    return;
  }
  if (annotating.value) {
    event.preventDefault();
    event.stopPropagation();
    annotating.value = false;
  }
}

function onWindowFocus() {
  if (!busy.value) load();
}

function onDocumentPointerDown(event: PointerEvent) {
  if (!menuOpen.value) return;
  const target = event.target;
  if (target instanceof Element && target.closest("[data-review-launcher]")) return;
  menuOpen.value = false;
}

let observer: ResizeObserver | undefined;
let timer: ReturnType<typeof setInterval> | undefined;

watch(selectedId, (id) => {
  editBody.value = pageNotes.value.find((note) => note.id === id)?.body ?? "";
  confirmDelete.value = "";
});

watch(pageNotes, (list) => {
  if (selectedId.value && !list.some((note) => note.id === selectedId.value)) selectedId.value = "";
});

watch(pageKey, () => {
  cancelDraft();
  selectedId.value = "";
  confirmClear.value = false;
});

watch(draft, async (value) => {
  if (!value) return;
  await nextTick();
  focusDraft();
});

watch(
  () => pageNotes.value.map((note) => `${note.id}:${note.sectionId}:${note.x}:${note.y}`).join("|"),
  async () => {
    await nextTick();
    measure();
  },
);

onMounted(async () => {
  observer = new ResizeObserver(() => measure());
  if (stage.value) observer.observe(stage.value);
  window.addEventListener("keydown", onKeydown, true);
  window.addEventListener("pointerdown", onQuietPointerDown, true);
  window.addEventListener("pointerup", onQuietPointerUp, true);
  window.addEventListener("click", onQuietClick, true);
  window.addEventListener("pointerdown", onDocumentPointerDown);
  window.addEventListener("focus", onWindowFocus);
  timer = setInterval(() => {
    if (document.visibilityState === "visible" && !busy.value) load();
  }, 15000);
  await load();
  await nextTick();
  measure();
});

onBeforeUnmount(() => {
  observer?.disconnect();
  window.removeEventListener("keydown", onKeydown, true);
  window.removeEventListener("pointerdown", onQuietPointerDown, true);
  window.removeEventListener("pointerup", onQuietPointerUp, true);
  window.removeEventListener("click", onQuietClick, true);
  window.removeEventListener("pointerdown", onDocumentPointerDown);
  window.removeEventListener("focus", onWindowFocus);
  clearInterval(timer);
});
</script>
