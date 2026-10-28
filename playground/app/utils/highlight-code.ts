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
