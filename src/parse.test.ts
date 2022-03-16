import { assert, describe, it } from "vitest";
import { parseQuery } from "./parse.js";
import {
  AllQuery,
  AndQuery,
  FieldCompareQuery,
  FieldScope,
  GroupQuery,
  NotQuery,
  OrQuery,
  RangeQuery,
  SectionQuery,
  TextQuery,
} from "./query.js";

describe("text tests", () => {
  it("text basic", () => {
    const query = parseQuery("hello") as TextQuery;

    assert.isDefined(query);
    assert.equal(query.type, "TEXT");
    assert.equal(query.options.isExactMatch, false);
  });

  it("text exact match", () => {
    const query = parseQuery(`"hello"`) as TextQuery;

    assert.isDefined(query);
    assert.equal(query.type, "PHRASE");
    assert.equal(query.options.isExactMatch, true);
  });

  it("extra white space", () => {
    const query = parseQuery(`  hello test  `) as TextQuery;

    assert.isDefined(query);
    assert.equal(query.type, "TEXT");
    assert.equal(query.text, "hello test");
    assert.equal(query.options.isExactMatch, false);
  });

  it("extra white space in quotes", () => {
    const query = parseQuery(`"hello test  "`) as TextQuery;

    assert.isDefined(query);
    assert.equal(query.type, "PHRASE");
    assert.equal(query.text, "hello test");
    assert.equal(query.options.isExactMatch, true);
  });

  it("inner quotes", () => {
    const query = parseQuery(`test "hello test" world`) as TextQuery;

    assert.isDefined(query);
    assert.equal(query.type, "TEXT");
    assert.equal(query.text, `test "hello test" world`);
    assert.equal(query.options.isExactMatch, false);
  });
});

describe("group tests", () => {
  it("group check", () => {
    const query = parseQuery(`("hello")`) as GroupQuery;

    assert.isDefined(query);
    assert.equal(query.type, "GROUP");
    assert.equal(query.child instanceof TextQuery, true);
  });

  it("and check", () => {
    const query = parseQuery(`left AND right`) as AndQuery;

    assert.isDefined(query);
    assert.equal(query.type, "AND");
    assert.equal(query.children.length, 2);
    assert.equal(query.children[0] instanceof TextQuery, true);
    assert.equal(query.children[1] instanceof TextQuery, true);
  });

  it("or check", () => {
    const query = parseQuery(`left OR right`) as OrQuery;

    assert.isDefined(query);
    assert.equal(query.type, "OR");
    assert.equal(query.children.length, 2);
    assert.equal(query.children[0] instanceof TextQuery, true);
    assert.equal(query.children[1] instanceof TextQuery, true);
  });

  it("not check", () => {
    const query = parseQuery(`NOT active`) as NotQuery;

    assert.isDefined(query);
    assert.equal(query.type, "NOT");
    assert.equal(query.child instanceof TextQuery, true);
  });
});

describe("range tests", () => {
  it("[start TO end}", () => {
    const query = parseQuery(`[0 TO 20}`) as RangeQuery;

    assert.isDefined(query);
    assert.equal(query.type, "RANGE");
    assert.equal(query.start instanceof TextQuery, true);
    assert.equal(query.options.startInclusive, true);
    assert.equal(query.end instanceof TextQuery, true);
    assert.equal(query.options.endInclusive, false);
  });

  it("{start TO end]", () => {
    const query = parseQuery(`{0 TO 20]`) as RangeQuery;

    assert.isDefined(query);
    assert.equal(query.type, "RANGE");
    assert.equal(query.start instanceof TextQuery, true);
    assert.equal(query.options.startInclusive, false);
    assert.equal(query.end instanceof TextQuery, true);
    assert.equal(query.options.endInclusive, true);
  });
});

describe("section tests", () => {
  it("section check", () => {
    const query = parseQuery(`@section`) as SectionQuery;

    assert.isDefined(query);
    assert.equal(query.type, "SECTION");
    assert.equal(query.section, "section");
    assert.equal(query.child instanceof AllQuery, true);
  });

  it("section all check", () => {
    const query = parseQuery(`@section hello`) as SectionQuery;

    assert.isDefined(query);
    assert.equal(query.type, "SECTION");
    assert.equal(query.section, "section");
    assert.equal(query.child instanceof TextQuery, true);
  });
});

describe("field operation checks", () => {
  it("value = true", () => {
    const query = parseQuery(`value = true`) as FieldCompareQuery;

    assert.isDefined(query);
    assert.equal(query.type, "FIELD_COMPARE");
    assert.equal(query.field, "value");
    assert.equal(query.operator, "=");
    assert.equal(query.text.text, "true");
  });
});

describe("complex tests", () => {
  it("text and field", () => {
    const query = parseQuery(`test AND field:true`) as AndQuery;
    const left = query.children[0] as TextQuery;
    const right = query.children[1] as FieldScope;
    const rightChild = right.child as TextQuery;

    assert.isDefined(query);
    assert.equal(query.type, "AND");
    assert.equal(query.children.length, 2);
    assert.equal(left.text, "test");
    assert.equal(left.type, "TEXT");
    assert.equal(right.field, "field");
    assert.equal(right.type, "FIELD_SCOPE");
    assert.equal(rightChild.type, "TEXT");
    assert.equal(rightChild.text, "true");
  });

  it("(text) and field:test", () => {
    const query = parseQuery(`(test) AND field:true`) as AndQuery;
    const left = query.children[0] as GroupQuery;
    const right = query.children[1] as FieldScope;

    assert.isDefined(query);
    assert.equal(query.type, "AND");
    assert.equal(query.children.length, 2);
    assert.equal(left.type, "GROUP");
    assert.equal(right.type, "FIELD_SCOPE");
  });

  it('"text" and field', () => {
    const query = parseQuery(`"text" AND field`) as AndQuery;
    const left = query.children[0] as TextQuery;
    const right = query.children[1] as TextQuery;

    assert.isDefined(query);
    assert.equal(query.type, "AND");
    assert.equal(query.children.length, 2);
    assert.equal(left.type, "PHRASE");
    assert.equal(right.type, "TEXT");
  });
});
