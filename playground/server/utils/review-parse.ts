import { createError } from "h3";
import type { ReviewNote, ReviewNoteDraft, ReviewNoteStatus } from "../../shared/review-note";

const SECTION_ID = /^[a-z0-9-]{1,80}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function fail(message: string): never {
  throw createError({ statusCode: 400, statusMessage: message });
}

export function parsePage(value: unknown) {
  if (typeof value !== "string") return null;
  const page = value.trim().replace(/\/+$/, "") || "/";
  if (page !== "/" && !page.startsWith("/")) return null;
  if (page.includes("..") || page.includes("\\") || page.includes("?") || page.includes("#") || page.includes("\0")) {
    return null;
  }
  if (page.length > 200) return null;
  return page;
}

function parseRatio(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.min(1, Math.max(0, value));
}

function parseBody(value: unknown) {
  if (typeof value !== "string") return null;
  const body = value.replace(/\r\n/g, "\n").trim();
  if (!body || body.length > 4000) return null;
  return body;
}

function parseAuthor(value: unknown) {
  if (typeof value !== "string") return null;
  const author = value.replace(/\s+/g, " ").trim();
  if (!author || author.length > 80) return null;
  return author;
}

function parseTarget(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, 200);
}

function parseSection(value: unknown) {
  if (typeof value !== "string" || !SECTION_ID.test(value)) return null;
  return value;
}

function parseLabel(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const label = value.replace(/\s+/g, " ").trim();
  if (!label) return fallback;
  return label.slice(0, 120);
}

function parseStatus(value: unknown): ReviewNoteStatus | null {
  if (value === "open" || value === "resolved") return value;
  return null;
}

function parseDate(value: unknown) {
  if (typeof value !== "string") return null;
  const time = Date.parse(value);
  if (Number.isNaN(time)) return null;
  return new Date(time).toISOString();
}

export function parseDraft(payload: unknown): ReviewNoteDraft {
  if (!payload || typeof payload !== "object") fail("Anotação inválida.");
  const raw = payload as Record<string, unknown>;
  const page = parsePage(raw.page);
  const sectionId = parseSection(raw.sectionId);
  const body = parseBody(raw.body);
  const author = parseAuthor(raw.author);
  const x = parseRatio(raw.x);
  const y = parseRatio(raw.y);
  if (!page) fail("Página inválida.");
  if (!sectionId) fail("Seção inválida.");
  if (!body) fail("Escreva o comentário.");
  if (!author) fail("Escreva o seu nome.");
  if (x === null || y === null) fail("Posição inválida.");
  return {
    page,
    sectionId,
    sectionLabel: parseLabel(raw.sectionLabel, sectionId),
    target: parseTarget(raw.target),
    x,
    y,
    body,
    author,
  };
}

export function parsePatch(payload: unknown) {
  if (!payload || typeof payload !== "object") fail("Anotação inválida.");
  const raw = payload as Record<string, unknown>;
  const patch: { body?: string; status?: ReviewNoteStatus } = {};
  if ("body" in raw) {
    const body = parseBody(raw.body);
    if (!body) fail("Escreva o comentário.");
    patch.body = body;
  }
  if ("status" in raw) {
    const status = parseStatus(raw.status);
    if (!status) fail("Situação inválida.");
    patch.status = status;
  }
  if (!patch.body && !patch.status) fail("Nada para atualizar.");
  return patch;
}

export function parseNoteId(value: unknown) {
  if (typeof value !== "string" || !UUID.test(value)) return null;
  return value;
}

function parseImportedNote(payload: unknown): ReviewNote | null {
  if (!payload || typeof payload !== "object") return null;
  const raw = payload as Record<string, unknown>;
  const id = parseNoteId(raw.id);
  const page = parsePage(raw.page);
  const sectionId = parseSection(raw.sectionId);
  const body = parseBody(raw.body);
  const author = parseAuthor(raw.author);
  const status = parseStatus(raw.status);
  const x = parseRatio(raw.x);
  const y = parseRatio(raw.y);
  const createdAt = parseDate(raw.createdAt);
  const updatedAt = parseDate(raw.updatedAt);
  if (!id || !page || !sectionId || !body || !author || !status || x === null || y === null || !createdAt || !updatedAt) {
    return null;
  }
  return {
    id,
    page,
    sectionId,
    sectionLabel: parseLabel(raw.sectionLabel, sectionId),
    target: parseTarget(raw.target),
    x,
    y,
    body,
    author,
    status,
    createdAt,
    updatedAt,
  };
}

export function parseImport(payload: unknown) {
  const list = Array.isArray(payload)
    ? payload
    : payload && typeof payload === "object" && "notes" in payload && Array.isArray(payload.notes)
      ? payload.notes
      : null;
  if (!list) fail("O arquivo não é uma exportação de anotações.");
  if (list.length > 500) fail("O arquivo passa de 500 anotações.");
  const byId = new Map<string, ReviewNote>();
  for (const item of list) {
    const note = parseImportedNote(item);
    if (note) byId.set(note.id, note);
  }
  if (!byId.size) fail("O arquivo não tem anotações válidas.");
  return [...byId.values()];
}
