import { createError, getQuery } from "h3";
import { deletePage } from "../../utils/review-db";
import { parsePage } from "../../utils/review-parse";

export default defineEventHandler((event) => {
  const page = parsePage(getQuery(event).page);
  if (!page) {
    throw createError({ statusCode: 400, statusMessage: "Informe a página." });
  }
  return { deleted: deletePage(page) };
});
