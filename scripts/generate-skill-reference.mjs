#!/usr/bin/env node
/**
 * Gera skills/ads-nuxt/reference.md a partir do código de app/.
 * Props, eventos, v-model e slots saem direto dos componentes, então não envelhecem à mão.
 *
 *   node scripts/generate-skill-reference.mjs           grava o arquivo
 *   node scripts/generate-skill-reference.mjs --check   falha se o arquivo estiver desatualizado
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** Lê o arquivo com quebras de linha LF, para a saída ser igual no Windows e no Linux. */
const read = (file) => readFileSync(file, "utf8").replaceAll("\r\n", "\n");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const componentsDir = join(root, "app/components");
const typesDir = join(root, "app/types");
const outFile = join(root, "skills/ads-nuxt/reference.md");

/** Texto entre o `{` em `start` e o `}` correspondente (inclui as chaves). */
function braceBlock(source, start) {
  let depth = 0;
  for (let i = start; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    else if (source[i] === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  return "";
}

/** Remove o recuo comum das linhas, para o bloco ficar à esquerda. */
function dedent(text) {
  const [first, ...rest] = text.split("\n");
  const indents = rest.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
  const cut = indents.length ? Math.min(...indents) : 0;
  // Se o bloco começa na coluna 0 (`{`), a última linha (`}`) é a referência do recuo.
  const closing = rest.length ? rest[rest.length - 1].match(/^ */)[0].length : 0;
  const base = /^\s*[}\]]/.test(rest[rest.length - 1] ?? "") ? Math.min(cut, closing) : cut;
  return [first, ...rest.map((l) => l.slice(base))].join("\n");
}

function namedType(source, name) {
  const re = new RegExp(`(?:interface\\s+${name}\\s*|type\\s+${name}\\s*=\\s*)\\{`);
  const match = re.exec(source);
  if (match) return braceBlock(source, match.index + match[0].length - 1);
  if (existsSync(typesDir)) {
    for (const file of readdirSync(typesDir)) {
      const other = read(join(typesDir, file));
      const found = re.exec(other);
      if (found) return braceBlock(other, found.index + found[0].length - 1);
    }
  }
  return "";
}

function propsOf(source) {
  const at = source.indexOf("defineProps<");
  if (at === -1) return "";
  const after = at + "defineProps<".length;
  if (source[after] === "{") return braceBlock(source, after);
  const name = /^[A-Za-z0-9_]+/.exec(source.slice(after))?.[0];
  return name ? namedType(source, name) : "";
}

function emitsOf(source) {
  const at = source.indexOf("defineEmits<");
  if (at === -1) return "";
  const after = at + "defineEmits<".length;
  return source[after] === "{" ? braceBlock(source, after) : "";
}

function modelsOf(source) {
  return [...source.matchAll(/defineModel<([^>]+)>\(\s*(?:"([^"]+)")?/g)].map(
    (m) => `${m[2] ? `v-model:${m[2]}` : "v-model"}: ${m[1].trim()}`,
  );
}

function slotsOf(source) {
  const template = source.slice(0, source.indexOf("<script"));
  const names = new Set();
  for (const m of template.matchAll(/<slot\b([^>]*)>/g)) {
    names.add(/\sname="([^"]+)"/.exec(m[1])?.[1] ?? "default");
  }
  return [...names];
}

/** Declarações `type` e `interface` do arquivo, por nome. */
function declarationsOf(source) {
  const found = new Map();
  for (const m of source.matchAll(/^(?:export\s+)?(type|interface)\s+(\w+)/gm)) {
    const [, kind, name] = m;
    const from = m.index;
    let end = -1;
    if (kind === "interface") {
      const open = source.indexOf("{", from);
      end = open === -1 ? -1 : open + braceBlock(source, open).length;
    } else {
      let depth = 0;
      for (let i = source.indexOf("=", from); i < source.length; i += 1) {
        const c = source[i];
        if (c === "{" || c === "(" || c === "[") depth += 1;
        else if (c === "}" || c === ")" || c === "]") depth -= 1;
        else if (c === ";" && depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    if (end > from) found.set(name, source.slice(from, end).replace(/^export\s+/, ""));
  }
  return found;
}

/** Tipos de app/utils e app/types, que os componentes importam. */
const sharedDeclarations = new Map();
for (const dir of ["utils", "types"]) {
  const full = join(root, "app", dir);
  if (!existsSync(full)) continue;
  for (const file of readdirSync(full).filter((f) => f.endsWith(".ts"))) {
    for (const [k, v] of declarationsOf(read(join(full, file)))) sharedDeclarations.set(k, v);
  }
}

/** Tipos locais citados em `seeds`, seguindo as referências entre eles. */
function usedTypes(source, seeds) {
  const declared = new Map([...sharedDeclarations, ...declarationsOf(source)]);
  const out = new Map();
  const queue = [...seeds];
  while (queue.length) {
    const text = queue.pop();
    for (const [name, body] of declared) {
      if (out.has(name) || !new RegExp(`\\b${name}\\b`).test(text)) continue;
      out.set(name, body);
      queue.push(body);
    }
  }
  return [...out.values()];
}

const files = readdirSync(componentsDir)
  .filter((f) => f.endsWith(".vue"))
  .sort();

const sections = files.map((file) => {
  const source = read(join(componentsDir, file));
  const name = file.replace(/\.vue$/, "");
  const props = propsOf(source);
  const emits = emitsOf(source);
  const models = modelsOf(source);
  const slots = slotsOf(source);
  const types = usedTypes(source, [props, emits]);

  const parts = [`## ${name}`];
  parts.push(props ? `Props:\n\`\`\`ts\n${dedent(props)}\n\`\`\`` : "Sem props.");
  if (types.length) parts.push(`Tipos:\n\`\`\`ts\n${types.map(dedent).join("\n\n")}\n\`\`\``);
  if (models.length) parts.push(`Models: ${models.map((m) => `\`${m}\``).join(", ")}`);
  if (emits) parts.push(`Eventos:\n\`\`\`ts\n${dedent(emits)}\n\`\`\``);
  if (slots.length) parts.push(`Slots: ${slots.map((s) => `\`${s}\``).join(", ")}`);
  return parts.join("\n\n");
});

const header = `# ADS: referência de componentes

> Gerado por \`pnpm skill:reference\` a partir de \`app/components\`. Não edite à mão.
> Para o comportamento exato, leia o \`.vue\` em \`node_modules/ads-nuxt/app/components/\`.

${files.length} componentes. Todos são auto-importados pelo Nuxt.

`;

const output = `${header}${sections.join("\n\n")}\n`;

if (process.argv.includes("--check")) {
  const current = existsSync(outFile) ? read(outFile) : "";
  if (current !== output) {
    console.error("skills/ads-nuxt/reference.md está desatualizado. Rode: pnpm skill:reference");
    process.exit(1);
  }
  console.log("skills/ads-nuxt/reference.md está atualizado.");
} else {
  writeFileSync(outFile, output);
  console.log(`skills/ads-nuxt/reference.md gerado (${files.length} componentes).`);
}
