import { assert, describe, it } from "vitest";
import { parseQuery } from "./parse.js";
import {
    AllQuery,
  AndQuery,
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
    assert.equal(query.type, "TEXT");
    assert.equal(query.options.isExactMatch, true);
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
    assert.equal(query.options.all, true);
    assert.equal(query.child instanceof AllQuery, true);
  });

  it("section all check", () => {
    const query = parseQuery(`@section hello`) as SectionQuery;

    assert.isDefined(query);
    assert.equal(query.type, "SECTION");
    assert.equal(query.section, "section");
    assert.equal(query.options.all, false);
    assert.equal(query.child instanceof TextQuery, true);
  });
});
