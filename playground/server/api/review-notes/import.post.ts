import { readBody } from "h3";
import { importNotes } from "../../utils/review-db";
import { parseImport } from "../../utils/review-parse";

export default defineEventHandler(async (event) => importNotes(parseImport(await readBody(event))));
