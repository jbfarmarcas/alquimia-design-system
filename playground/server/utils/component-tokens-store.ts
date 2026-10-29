import { readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createError } from "h3";
import {
  assertComponentTokens,
  componentTokenDefaults,
  componentTokensCss,
  normalizeStoredTokens,
} from "../../../app/theme/component-tokens";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const jsonPath = join(projectRoot, "app", "theme", "component-tokens.json");
const cssPath = join(projectRoot, "app", "assets", "css", "component-tokens.css");

async function writeAtomic(path: string, contents: string) {
  const temp = `${path}.${process.pid}.tmp`;
  await writeFile(temp, contents, "utf8");
  try {
    await rename(temp, path);
  } catch {
    await writeFile(path, contents, "utf8");
    await rm(temp, { force: true });
  }
}

export async function readComponentTokens() {
  try {
    const raw = await readFile(jsonPath, "utf8");
    return normalizeStoredTokens(JSON.parse(raw) as unknown);
  } catch (error) {
    const missing = error && typeof error === "object" && "code" in error && error.code === "ENOENT";
    if (missing) return componentTokenDefaults();
    if (error instanceof SyntaxError) return componentTokenDefaults();
    throw createError({ statusCode: 500, statusMessage: "Não foi possível ler os tokens do projeto." });
  }
}

export async function saveComponentTokens(input: unknown) {
  let tokens: Record<string, string>;
  try {
    tokens = assertComponentTokens(input);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Valores inválidos.";
    throw createError({ statusCode: 400, statusMessage: message });
  }

  const json = `${JSON.stringify(tokens, null, 2)}\n`;
  try {
    await writeAtomic(jsonPath, json);
    await writeAtomic(cssPath, componentTokensCss(tokens));
  } catch {
    throw createError({ statusCode: 500, statusMessage: "Não foi possível gravar os tokens no projeto." });
  }
  return tokens;
}
