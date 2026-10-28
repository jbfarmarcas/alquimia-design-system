import { computed, ref } from "vue";
import { reviewPagePath, type ReviewNote, type ReviewNoteDraft, type ReviewNoteStatus } from "../../shared/review-note";

export type { ReviewNote, ReviewNoteDraft, ReviewNoteStatus };

function upsert(list: ReviewNote[], note: ReviewNote) {
  const index = list.findIndex((item) => item.id === note.id);
  if (index === -1) return [...list, note];
  const next = [...list];
  next[index] = note;
  return next;
}

export function reviewErrorText(error: unknown, fallback: string) {
  if (!error || typeof error !== "object") return fallback;
  const record = error as {
    statusMessage?: string;
    data?: { statusMessage?: string; message?: string };
  };
  return record.data?.statusMessage || record.statusMessage || record.data?.message || fallback;
}

export function useDesignReview() {
  const notes = useState<ReviewNote[]>("design-review-notes", () => []);
  const loadError = useState("design-review-load-error", () => "");
  const author = useLocalStorage("ads-design-review-author", "", { writeDefaults: false });
  const route = useRoute();
  const pageKey = computed(() => reviewPagePath(route.path));
  const revision = ref(0);
  let loadSeq = 0;

  const pageNotes = computed(() =>
    notes.value
      .filter((note) => note.page === pageKey.value)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
  );

  const openTotal = computed(
    () => pageNotes.value.filter((note) => note.status === "open").length,
  );

  function openNoteCount(sectionId: string, page = pageKey.value) {
    return notes.value.filter(
      (note) => note.page === page && note.sectionId === sectionId && note.status === "open",
    ).length;
  }

  async function load() {
    const seq = ++loadSeq;
    const seen = revision.value;
    try {
      const data = await $fetch<ReviewNote[]>("/api/review-notes");
      if (seq !== loadSeq || seen !== revision.value) return;
      notes.value = data;
      loadError.value = "";
    } catch (error) {
      if (seq !== loadSeq || seen !== revision.value) return;
      loadError.value = reviewErrorText(error, "Não foi possível carregar as anotações.");
    }
  }

  async function createNote(draft: ReviewNoteDraft) {
    revision.value += 1;
    try {
      const note = await $fetch<ReviewNote>("/api/review-notes", { method: "POST", body: draft });
      notes.value = upsert(notes.value, note);
      loadError.value = "";
      return note;
    } catch (error) {
      await load();
      throw error;
    }
  }

  async function updateNote(id: string, patch: { body?: string; status?: ReviewNoteStatus }) {
    revision.value += 1;
    try {
      const note = await $fetch<ReviewNote>(`/api/review-notes/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: patch,
      });
      notes.value = upsert(notes.value, note);
      loadError.value = "";
      return note;
    } catch (error) {
      await load();
      throw error;
    }
  }

  async function removeNote(id: string) {
    revision.value += 1;
    try {
      await $fetch(`/api/review-notes/${encodeURIComponent(id)}`, { method: "DELETE" });
      notes.value = notes.value.filter((note) => note.id !== id);
      loadError.value = "";
    } catch (error) {
      await load();
      throw error;
    }
  }

  async function clearPage(page: string) {
    revision.value += 1;
    try {
      await $fetch("/api/review-notes", { method: "DELETE", query: { page } });
      notes.value = notes.value.filter((note) => note.page !== page);
      loadError.value = "";
    } catch (error) {
      await load();
      throw error;
    }
  }

  async function importReviewNotes(payload: unknown) {
    revision.value += 1;
    try {
      const result = await $fetch<{ notes: ReviewNote[]; changed: number }>("/api/review-notes/import", {
        method: "POST",
        body: payload,
      });
      notes.value = result.notes;
      loadError.value = "";
      return result;
    } catch (error) {
      await load();
      throw error;
    }
  }

  return {
    notes,
    author,
    pageKey,
    pageNotes,
    openTotal,
    loadError,
    openNoteCount,
    load,
    createNote,
    updateNote,
    removeNote,
    clearPage,
    importReviewNotes,
  };
}
