import { createError, getRouterParam } from "h3";
import { deleteNote } from "../../utils/review-db";
import { parseNoteId } from "../../utils/review-parse";

export default defineEventHandler((event) => {
  const id = parseNoteId(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, statusMessage: "Anotação inválida." });
  if (!deleteNote(id)) throw createError({ statusCode: 404, statusMessage: "Anotação não encontrada." });
  return { ok: true };
});
