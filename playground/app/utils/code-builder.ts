export type CodeAttr = [name: string, value?: string | true];

/** Atributo que só entra no código quando `when` é verdadeiro. */
export const attr = (when: boolean, name: string, value?: string | true): CodeAttr | false =>
  when ? [name, value] : false;

/** Monta a tag Vue com um atributo por linha. */
export const buildTag = (tag: string, attrs: (CodeAttr | false)[], children?: string): string => {
  const lines = attrs
    .filter((item): item is CodeAttr => item !== false)
    .map(([name, value]) => (value === undefined || value === true ? name : `${name}="${value}"`))
    .map((line) => `  ${line}`);

  if (children) {
    const open = lines.length ? `<${tag}\n${lines.join("\n")}\n>` : `<${tag}>`;
    return `${open}\n${children}\n</${tag}>`;
  }

  if (!lines.length) return `<${tag} />`;
  return `<${tag}\n${lines.join("\n")}\n/>`;
};

/** Recua um bloco inteiro, para aninhar tags dentro de outra. */
export const indent = (code: string) =>
  code
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");

/** Junta blocos de código separados por linha em branco. */
export const joinBlocks = (...blocks: string[]) => blocks.join("\n\n");

/** Serializa um valor como literal TS legível, com aspas duplas e recuo de 2 espaços. */
export const toLiteral = (value: unknown, depth = 0): string => {
  const pad = "  ".repeat(depth + 1);
  const end = "  ".repeat(depth);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return `[\n${value.map((item) => `${pad}${toLiteral(item, depth + 1)},`).join("\n")}\n${end}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    return `{ ${entries.map(([k, v]) => `${/^[a-z_$][\w$]*$/i.test(k) ? k : JSON.stringify(k)}: ${toLiteral(v, depth)}`).join(", ")} }`;
  }
  return JSON.stringify(value);
};

/** Monta um SFC com os dados do exemplo no script, para o código bater com o que a demo mostra. */
export const buildSfc = (script: string, template: string) =>
  `<script setup lang="ts">\n${script}\n</script>\n\n<template>\n${indent(template)}\n</template>`;
