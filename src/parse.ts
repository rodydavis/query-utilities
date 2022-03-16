import {
  AllQuery,
  AndQuery,
  FieldCompareQuery,
  FieldScope,
  GroupQuery,
  NotQuery,
  Operator,
  operators,
  OrQuery,
  PhraseQuery,
  Query,
  RangeQuery,
  SectionQuery,
  TextQuery,
} from "./query.js";

export function parseQuery(value: string): Query {
  // Tokenize the query
  const trimmed = value.trim();
  const chars = value.split("");
  const tokens = value.split(/\s+/);
  const symbols = ["AND", "OR", "NOT"]; // && || !
  const tokenIdx = tokens.findIndex((t) => symbols.includes(t));
  const token = tokens[tokenIdx];
  const charSymbols = ["(", '"', "'"];
  const charIdx = chars.findIndex((c) => charSymbols.includes(c));
  const char = chars[charIdx];
  // Search: <exp> AND <exp>
  if (token === "AND") {
    const left = parseQuery(tokens.slice(0, tokenIdx).join(" "));
    const right = parseQuery(tokens.slice(tokenIdx + 1).join(" "));
    return new AndQuery([left, right]);
  }
  // Search: <exp> OR <exp>
  if (token === "OR") {
    const left = parseQuery(tokens.slice(0, tokenIdx).join(" "));
    const right = parseQuery(tokens.slice(tokenIdx + 1).join(" "));
    return new OrQuery([left, right]);
  }
  // Search: NOT <exp>
  if (token === "NOT") {
    const child = parseQuery(tokens.slice(tokenIdx + 1).join(" "));
    return new NotQuery(child);
  }
  // Search: (<exp>)
  const endIdx = chars.findIndex((c) => c === ")");
  if (char === "(" && endIdx != -1) {
    const child = parseQuery(value.slice(charIdx + 1, endIdx - 1));
    return new GroupQuery(child);
  }
  // Search: <field> <op> <text>
  const symbolIdx = chars.findIndex((t) => operators.includes(t as Operator));
  if (symbolIdx != -1) {
    const field = chars.slice(0, symbolIdx).join("").trim();
    const operator = chars[symbolIdx] as Operator;
    const text = chars
      .slice(symbolIdx + 1)
      .join("")
      .trim();
    const child = new TextQuery(text);
    return new FieldCompareQuery(field, operator, child);
  }
  // Search: <field>:<text>
  const fieldIdx = chars.findIndex((t) => t === ":");
  if (fieldIdx !== -1) {
    const field = value.substring(0, fieldIdx);
    const child = parseQuery(value.substring(fieldIdx + 1));
    return new FieldScope(field, child);
  }
  // Search: @<section> <text>
  const sectionIdx = chars.findIndex((t) => t === "@");
  if (sectionIdx !== -1) {
    const spaceIdx = chars.findIndex((t) => t === " ");
    const section = chars
      .slice(1, spaceIdx === -1 ? chars.length : spaceIdx)
      .join("")
      .trim();
    const rest = spaceIdx === -1 ? "" : chars.slice(spaceIdx).join("").trim();
    const child = spaceIdx === -1 ? new AllQuery() : parseQuery(rest);
    return new SectionQuery(section, child);
  }
  // Search: "<text>" (exact match)
  const quotes = hasQuote(value, ["'", '"']);
  if (quotes.valid) {
    const children = quotes.value.split(" ").map((t) => new TextQuery(t));
    return new PhraseQuery(quotes.value, children);
  }
  // Range query: [<start> TO <end>}
  const inclusiveStart = chars.findIndex((c) => c === "[");
  const inclusiveEnd = chars.findIndex((c) => c === "]");
  const exclusiveStart = chars.findIndex((c) => c === "{");
  const exclusiveEnd = chars.findIndex((c) => c === "}");
  const toIndex = value.indexOf(" TO ");
  if (
    toIndex != -1 &&
    (inclusiveStart != -1 || exclusiveStart != -1) &&
    (inclusiveEnd != -1 || exclusiveEnd != -1)
  ) {
    const startInclusive = inclusiveStart != -1;
    const endInclusive = inclusiveEnd != -1;
    const startIdx = startInclusive ? inclusiveStart : exclusiveStart;
    const endIdx = endInclusive ? inclusiveEnd : exclusiveEnd;
    const inner = value
      .slice(startIdx + 1, endIdx - 1)
      .split(" TO ")
      .map((t) => t.trim());
    const start = new TextQuery(inner[0]);
    const end = new TextQuery(inner[1]);
    return new RangeQuery(start, end, {
      startInclusive,
      endInclusive,
    });
  }
  // Search: <text>
  return new TextQuery(trimmed, { isExactMatch: false });
}

function hasQuote(value: string, quoteChars: string[]) {
  let idx = 0;
  let startIdx = -1;
  let endIdx = -1;
  let firstCharIdx = -1;
  let lastCharIdx = -1;
  while (idx < value.length) {
    const char = value[idx];
    if (char === "" || char === " ") {
      idx++;
      continue;
    }
    if (quoteChars.includes(char)) {
      if (startIdx === -1) {
        startIdx = idx;
      } else {
        endIdx = idx;
      }
    } else {
      if (firstCharIdx === -1) {
        firstCharIdx = idx;
      } else {
        lastCharIdx = idx;
      }
    }
    idx++;
  }
  const valid = startIdx !== -1 && endIdx !== -1 && startIdx < endIdx;
  const innerValid = firstCharIdx >= startIdx + 1 && lastCharIdx <= endIdx - 1;
  return {
    valid: valid && innerValid,
    value: value.slice(firstCharIdx, lastCharIdx + 1),
  };
}
