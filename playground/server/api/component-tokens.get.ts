import { readComponentTokens } from "../utils/component-tokens-store";

export default defineEventHandler(async () => ({
  tokens: await readComponentTokens(),
}));
