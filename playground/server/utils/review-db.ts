import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync, type SqlValue } from "node:sqlite";
import { createError } from "h3";
import type { ReviewNote, ReviewNoteDraft, ReviewNoteStatus } from "../../shared/review-note";

const globalForReview = globalThis as typeof globalThis & {
  __adsReviewDb?: DatabaseSync;
};

const COLUMNS = `id, page, section_id, section_label, target, x, y, body, author, status, created_at, updated_at`;

function databasePath() {
  const configured = useRuntimeConfig().reviewDatabasePath;
  if (typeof configured !== "string" || !configured.trim()) {
    throw createError({ statusCode: 500, statusMessage: "O banco de anotações não está configurado." });
  }
  return configured;
}

function useReviewDatabase() {
  let db = globalForReview.__adsReviewDb;
  if (!db) {
    const path = databasePath();
    mkdirSync(dirname(path), { recursive: true });
    db = new DatabaseSync(path);
    db.exec("PRAGMA busy_timeout = 5000");
    db.exec(`
      CREATE TABLE IF NOT EXISTS review_notes (
        id TEXT PRIMARY KEY,
        page TEXT NOT NULL,
        section_id TEXT NOT NULL,
        section_label TEXT NOT NULL,
        target TEXT NOT NULL DEFAULT '',
        x REAL NOT NULL,
        y REAL NOT NULL,
        body TEXT NOT NULL,
        author TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('open', 'resolved')),
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      ) STRICT
    `);
    db.exec("CREATE INDEX IF NOT EXISTS review_notes_page ON review_notes (page, created_at)");
    globalForReview.__adsReviewDb = db;
  }
  db.exec("PRAGMA journal_mode = DELETE");
  return db;
}

function asNote(row: Record<string, SqlValue>): ReviewNote | null {
  const { id, page, section_id, section_label, target, x, y, body, author, status, created_at, updated_at } = row;
  if (
    typeof id !== "string"
    || typeof page !== "string"
    || typeof section_id !== "string"
    || typeof section_label !== "string"
    || typeof body !== "string"
    || typeof author !== "string"
    || (status !== "open" && status !== "resolved")
    || typeof created_at !== "string"
    || typeof updated_at !== "string"
    || typeof x !== "number"
    || typeof y !== "number"
  ) {
    return null;
  }
  return {
    id,
    page,
    sectionId: section_id,
    sectionLabel: section_label,
    target: typeof target === "string" ? target : "",
    x,
    y,
    body,
    author,
    status,
    createdAt: created_at,
    updatedAt: updated_at,
  };
}

export function listNotes() {
  const rows = useReviewDatabase()
    .prepare(`SELECT ${COLUMNS} FROM review_notes ORDER BY created_at ASC`)
    .all();
  const notes: ReviewNote[] = [];
  for (const row of rows) {
    const note = asNote(row);
    if (note) notes.push(note);
  }
  return notes;
}

function findNote(id: string) {
  const row = useReviewDatabase()
    .prepare(`SELECT ${COLUMNS} FROM review_notes WHERE id = ?`)
    .get(id);
  return row ? asNote(row) : null;
}

export function createNote(draft: ReviewNoteDraft) {
  const now = new Date().toISOString();
  const note: ReviewNote = {
    ...draft,
    id: crypto.randomUUID(),
    status: "open",
    createdAt: now,
    updatedAt: now,
  };
  useReviewDatabase()
    .prepare(`
      INSERT INTO review_notes (${COLUMNS})
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      note.id,
      note.page,
      note.sectionId,
      note.sectionLabel,
      note.target,
      note.x,
      note.y,
      note.body,
      note.author,
      note.status,
      note.createdAt,
      note.updatedAt,
    );
  return note;
}

export function updateNote(id: string, patch: { body?: string; status?: ReviewNoteStatus }) {
  const current = findNote(id);
  if (!current) return null;
  const next: ReviewNote = {
    ...current,
    body: patch.body ?? current.body,
    status: patch.status ?? current.status,
    updatedAt: new Date().toISOString(),
  };
  useReviewDatabase()
    .prepare("UPDATE review_notes SET body = ?, status = ?, updated_at = ? WHERE id = ?")
    .run(next.body, next.status, next.updatedAt, next.id);
  return next;
}

export function deleteNote(id: string) {
  const result = useReviewDatabase().prepare("DELETE FROM review_notes WHERE id = ?").run(id);
  return Number(result.changes) > 0;
}

export function deletePage(page: string) {
  const result = useReviewDatabase().prepare("DELETE FROM review_notes WHERE page = ?").run(page);
  return Number(result.changes);
}

export function importNotes(incoming: ReviewNote[]) {
  const db = useReviewDatabase();
  const currentUpdated = db.prepare("SELECT updated_at FROM review_notes WHERE id = ?");
  const insert = db.prepare(`
    INSERT INTO review_notes (${COLUMNS})
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const update = db.prepare(`
    UPDATE review_notes
    SET page = ?, section_id = ?, section_label = ?, target = ?, x = ?, y = ?, body = ?, author = ?, status = ?, updated_at = ?
    WHERE id = ?
  `);
  db.exec("BEGIN");
  try {
    let changed = 0;
    for (const note of incoming) {
      const row = currentUpdated.get(note.id);
      const updatedAt = row && typeof row.updated_at === "string" ? row.updated_at : null;
      if (!updatedAt) {
        insert.run(
          note.id,
          note.page,
          note.sectionId,
          note.sectionLabel,
          note.target,
          note.x,
          note.y,
          note.body,
          note.author,
          note.status,
          note.createdAt,
          note.updatedAt,
        );
        changed += 1;
      } else if (note.updatedAt > updatedAt) {
        update.run(
          note.page,
          note.sectionId,
          note.sectionLabel,
          note.target,
          note.x,
          note.y,
          note.body,
          note.author,
          note.status,
          note.updatedAt,
          note.id,
        );
        changed += 1;
      }
    }
    db.exec("COMMIT");
    return { notes: listNotes(), changed };
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}
