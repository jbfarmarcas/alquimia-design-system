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
