import { assert, describe, it } from "vitest";
import {
  AllQuery,
  AndQuery,
  FieldCompareQuery,
  FieldScope,
  GroupQuery,
  NotQuery,
  OrQuery,
  PhraseQuery,
  Query,
  RangeQuery,
  SectionQuery,
  TextQuery,
} from "./query.js";

describe("Class implementations", () => {
  it("AllQuery", () => {
    const item = new AllQuery();

    assert.equal(item instanceof Query, true);
    assert.equal(item.type, "ALL");
  });

  it("TextQuery", () => {
    const item = new TextQuery("text");

    assert.equal(item instanceof Query, true);
    assert.equal(item.text, "text");
    assert.equal(item.type, "TEXT");
  });

  it("PhraseQuery", () => {
    const item = new PhraseQuery("phrase", []);

    assert.equal(item instanceof TextQuery, true);
    assert.equal(item.phrase, "phrase");
    assert.equal(item.type, "PHRASE");
  });

  it("FieldScope", () => {
    const child = new TextQuery("");
    const item = new FieldScope("field", child);

    assert.equal(item instanceof Query, true);
    assert.equal(item.field, "field");
    assert.equal(item.type, "FIELD_SCOPE");
  });

  it("FieldCompareQuery", () => {
    const child = new TextQuery("");
    const item = new FieldCompareQuery("field", "=", child);

    assert.equal(item instanceof Query, true);
    assert.equal(item.field, "field");
    assert.equal(item.operator, "=");
    assert.equal(item.type, "FIELD_COMPARE");
  });

  it("RangeQuery", () => {
    const start = new TextQuery("");
    const end = new TextQuery("");
    const item = new RangeQuery(start, end);

    assert.equal(item instanceof Query, true);
    assert.equal(item.type, "RANGE");
  });

  it("GroupQuery", () => {
    const child = new TextQuery("");
    const item = new GroupQuery(child);

    assert.equal(item instanceof Query, true);
    assert.equal(item.type, "GROUP");
  });

  it("NotQuery", () => {
    const child = new TextQuery("");
    const item = new NotQuery(child);

    assert.equal(item instanceof Query, true);
    assert.equal(item.type, "NOT");
  });

  it("AndQuery", () => {
    const item = new AndQuery([]);

    assert.equal(item instanceof Query, true);
    assert.equal(item.type, "AND");
  });

  it("OrQuery", () => {
    const item = new OrQuery([]);

    assert.equal(item instanceof Query, true);
    assert.equal(item.type, "OR");
  });

  it("SectionQuery", () => {
    const child = new TextQuery("");
    const item = new SectionQuery("section", child);

    assert.equal(item instanceof Query, true);
    assert.equal(item.section, "section");
    assert.equal(item.child instanceof AllQuery, false);
    assert.equal(item.type, "SECTION");
  });
});
