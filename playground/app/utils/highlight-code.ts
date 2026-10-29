const KEYWORDS = new Set([
  "as",
  "async",
  "await",
  "const",
  "else",
  "export",
  "false",
  "from",
  "function",
  "if",
  "import",
  "in",
  "interface",
  "let",
  "new",
  "null",
  "of",
  "return",
  "true",
  "type",
  "undefined",
]);

const TOKEN =
  /<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`|<\/?|\/?>|@[A-Za-z_][\w.-]*|v-[A-Za-z][\w:.-]*|:[A-Za-z_][\w.-]*|#[A-Za-z_][\w.-]*|--[A-Za-z_][\w-]*|#[0-9A-Fa-f]{3,8}\b|[A-Za-z_][\w$-]*|\d+(?:\.\d+)?|[{}()[\],.;:=]|\s+|./g;

type TokenKind =
  | "comment"
  | "tag"
  | "attr"
  | "string"
  | "keyword"
  | "number"
  | "variable"
  | "punct"
  | "text";

const escapeHtml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const highlightSource = (source: string) => {
  let html = "";
  let inTag = false;
  let expectTagName = false;

  for (const part of source.match(TOKEN) ?? []) {
    if (part === "\n" || /^\s+$/.test(part)) {
      html += part;
      continue;
    }

    let kind: TokenKind = "text";

    if (part.startsWith("<!--") || part.startsWith("/*") || part.startsWith("//")) {
      kind = "comment";
    } else if (part === "<" || part === "</") {
      kind = "punct";
      inTag = true;
      expectTagName = true;
    } else if (part === ">" || part === "/>") {
      kind = "punct";
      inTag = false;
      expectTagName = false;
    } else if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) {
      kind = "string";
    } else if (part.startsWith("--")) {
      kind = "variable";
    } else if (part.startsWith("#") && /^#[0-9A-Fa-f]{3,8}$/.test(part)) {
      kind = "number";
    } else if (inTag && expectTagName && /^[A-Za-z_]/.test(part)) {
      kind = "tag";
      expectTagName = false;
    } else if (inTag && /^(?:@|:|v-|#|[A-Za-z_])/.test(part)) {
      kind = "attr";
    } else if (!inTag && KEYWORDS.has(part)) {
      kind = "keyword";
    } else if (!inTag && /^\d/.test(part)) {
      kind = "number";
    } else if ("{}()[],.;:=/".includes(part)) {
      kind = "punct";
    }

    html += `<span class="tok-${kind}">${escapeHtml(part)}</span>`;
  }

  return html;
};

export const highlightCodeLines = (source: string) => {
  const normalized = source.replace(/\n$/, "");
  return highlightSource(normalized).split("\n");
};

const JSON_TOKEN =
  /"(?:\\.|[^"\\\n])*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|true|false|null|[{}\]\[,:]|[^\s"{}[\]:,]+|\s+/g;

const hexString = (part: string) => /^"#[0-9A-Fa-f]{3,8}"$/.test(part);

/** Destaca um JSON: chave, string, cor hexadecimal, número e pontuação. */
export const highlightJson = (source: string) => {
  const parts = source.match(JSON_TOKEN) ?? [];
  let html = "";

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index] ?? "";
    if (/^\s+$/.test(part)) {
      html += part;
      continue;
    }

    let kind: TokenKind = "text";
    if (part.startsWith('"')) {
      let next = index + 1;
      while (next < parts.length && /^\s+$/.test(parts[next] ?? "")) next += 1;
      if (parts[next] === ":") kind = "attr";
      else if (hexString(part)) kind = "number";
      else kind = "string";
    } else if (part === "true" || part === "false" || part === "null") {
      kind = "keyword";
    } else if (/^-?\d/.test(part)) {
      kind = "number";
    } else if ("{}[],:".includes(part)) {
      kind = "punct";
    }

    html += `<span class="tok-${kind}">${escapeHtml(part)}</span>`;
  }

  return html;
};
