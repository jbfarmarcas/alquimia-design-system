import { createError, getRouterParam, readBody } from "h3";
import { updateNote } from "../../utils/review-db";
import { parseNoteId, parsePatch } from "../../utils/review-parse";

export default defineEventHandler(async (event) => {
  const id = parseNoteId(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, statusMessage: "Anotação inválida." });
  const note = updateNote(id, parsePatch(await readBody(event)));
  if (!note) throw createError({ statusCode: 404, statusMessage: "Anotação não encontrada." });
  return note;
});
