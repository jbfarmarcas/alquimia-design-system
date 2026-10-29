import { readBody } from "h3";
import { saveComponentTokens } from "../utils/component-tokens-store";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const tokens = body && typeof body === "object" && "tokens" in body ? body.tokens : body;
  return { tokens: await saveComponentTokens(tokens) };
});
