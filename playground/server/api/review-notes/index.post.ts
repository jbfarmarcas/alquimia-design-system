import { readBody } from "h3";
import { createNote } from "../../utils/review-db";
import { parseDraft } from "../../utils/review-parse";

export default defineEventHandler(async (event) => {
  const draft = parseDraft(await readBody(event));
  return createNote(draft);
});
