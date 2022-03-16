export abstract class Query {
  abstract readonly type: string;
}

export class AllQuery extends Query {
  readonly type = "ALL";
}

export class TextQuery extends Query {
  constructor(
    readonly text: string,
    readonly options: {
      isExactMatch: boolean;
    } = { isExactMatch: false }
  ) {
    super();
  }
  type = "TEXT";
}

export class PhraseQuery extends TextQuery {
  constructor(readonly phrase: string, readonly children: TextQuery[]) {
    super(phrase, { isExactMatch: true });
  }
  type = "PHRASE";
}

export class FieldScope extends Query {
  constructor(readonly field: string, readonly child: Query) {
    super();
  }
  type = "FIELD_SCOPE";
}

export const operators = <const>["=", "!=", "<", "<=", ">", ">="];
export type Operator = typeof operators[number];

export class FieldCompareQuery extends Query {
  constructor(
    readonly field: string,
    readonly operator: Operator,
    readonly text: TextQuery
  ) {
    super();
  }
  type = "FIELD_COMPARE";
}

export class RangeQuery extends Query {
  constructor(
    readonly start: TextQuery,
    readonly end: TextQuery,
    readonly options: {
      startInclusive: boolean;
      endInclusive: boolean;
    } = {
      startInclusive: true,
      endInclusive: true,
    }
  ) {
    super();
  }
  type = "RANGE";
}

export class GroupQuery extends Query {
  constructor(readonly child: Query) {
    super();
  }
  type = "GROUP";
}

export class NotQuery extends Query {
  constructor(readonly child: Query) {
    super();
  }
  type = "NOT";
}

export class AndQuery extends Query {
  constructor(readonly children: Query[]) {
    super();
  }
  type = "AND";
}

export class OrQuery extends Query {
  constructor(readonly children: Query[]) {
    super();
  }
  type = "OR";
}

export class SectionQuery extends Query {
  constructor(
    readonly section: string,
    readonly child: Query,
    readonly all: boolean
  ) {
    super();
  }
  type = "SECTION";
}
