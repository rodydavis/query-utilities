import { parseQuery } from "./parse";
import {
  AllQuery,
  AndQuery,
  FieldCompareQuery,
  FieldScope,
  GroupQuery,
  NotQuery,
  OrQuery,
  Query,
  RangeQuery,
  SectionQuery,
  TextQuery,
} from "./query.js";

export interface Json {
  [key: string]: any;
}

export class SearchQuery<T, R extends Json = Json> {
  constructor(readonly max?: number) {}
  private sources = new Map<string, R[]>();
  private resultBuilders = new Map<string, (item: R, search: string) => T>();

  get sections(): string[] {
    return Array.from(this.sources.keys());
  }

  reset() {
    this.sources.clear();
    this.resultBuilders.clear();
  }

  addSource(
    source: string,
    items: R[],
    resultBuilder: (item: R, search: string) => T
  ) {
    this.sources.set(source, items);
    this.resultBuilders.set(source, resultBuilder as any);
  }

  getQuery(raw: string): Query {
    const query = (raw || "").trim();
    const result = parseQuery(query);
    return result;
  }

  getResults(raw: string): T[] {
    const results: T[] = [];
    const query = this.getQuery(raw);
    for (const key of this.sources.keys()) {
      if (query instanceof SectionQuery && query.child instanceof AllQuery) {
        if (query.section === key) {
          return this.getSection(key);
        }
      }
      if (this.max && results.length >= this.max) {
        return results;
      }
      this.searchSource(query, key, results, (item) => {
        const builder = this.resultBuilders.get(key)!;
        results.push(builder(item, raw));
      });
    }
    return results;
  }

  getSection(key: string): T[] {
    const results: T[] = [];
    const source = this.sources.get(key)!;
    for (const item of source) {
      const builder = this.resultBuilders.get(key)!;
      results.push(builder(item, ""));
    }
    return results;
  }

  searchSource(
    query: Query,
    key: string,
    results: T[],
    match: (item: R) => void
  ) {
    const values = this.sources.get(key);
    if (!values) return;
    for (const item of values) {
      if (this.max && results.length >= this.max) {
        return;
      }
      const hasMatch = this.matchItem(query, item, { section: key });
      if (hasMatch) match(item);
    }
  }

  matchItem(
    query: Query,
    item: R,
    options?: {
      field?: string;
      section?: string;
    }
  ): boolean {
    const itemJson = JSON.stringify(item);
    const field = options?.field;
    const section = options?.section;
    const targetValue = field ? item[field] : itemJson;
    if (query instanceof GroupQuery) {
      return this.matchItem(query.child, item, { section });
    }
    if (query instanceof FieldScope) {
      const field = query.field;
      return this.matchItem(query.child, item, { field, section });
    }
    if (query instanceof AndQuery) {
      return query.children.every((child) =>
        this.matchItem(child, item, { section })
      );
    }
    if (query instanceof OrQuery) {
      return query.children.some((child) =>
        this.matchItem(child, item, { section })
      );
    }
    if (query instanceof NotQuery) {
      return !this.matchItem(query.child, item, { section });
    }
    if (query instanceof SectionQuery) {
      return (
        query.section === section &&
        this.matchItem(query.child, item, { section: query.section })
      );
    }
    if (query instanceof FieldCompareQuery) {
      const field = query.field;
      const value = item[field];
      if (value === undefined) return false;
      const qv = query.text.text;
      const qo = query.operator;
      if (qo === "=") {
        if (value === qv) return true;
      } else if (qo === "!=") {
        if (value !== qv) return true;
      } else if (qo === "<") {
        if (value < qv) return true;
      } else if (qo === "<=") {
        if (value <= qv) return true;
      } else if (qo === ">") {
        if (value > qv) return true;
      } else if (qo === ">=") {
        if (value >= qv) return true;
      }
      return false;
    }
    if (query instanceof RangeQuery) {
      const startInclusive = query.options.startInclusive;
      const endInclusive = query.options.endInclusive;
      const start = query.start.text;
      const end = query.end.text;
      if (startInclusive && endInclusive) {
        if (targetValue >= start && targetValue <= end) return true;
      }
      if (startInclusive && !endInclusive) {
        if (targetValue >= start && targetValue < end) return true;
      }
      if (!startInclusive && endInclusive) {
        if (targetValue > start && targetValue <= end) return true;
      }
      if (!startInclusive && !endInclusive) {
        if (targetValue > start && targetValue < end) return true;
      }
      return false;
    }
    if (query instanceof TextQuery) {
      if (query.options.isExactMatch) {
        return query.text === targetValue;
      } else if (
        typeof targetValue === "string" &&
        Number.isNaN(+targetValue)
      ) {
        return targetValue.toLowerCase().includes(query.text.toLowerCase());
      } else {
        return targetValue == query.text;
      }
    }
    if (query instanceof AllQuery) {
      return true;
    }
    return false;
  }
}
