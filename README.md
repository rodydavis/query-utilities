# Query Utilities

[![Demo](https://github.com/rodydavis/query-utilities/actions/workflows/ci.yml/badge.svg)](https://github.com/rodydavis/query-utilities/actions/workflows/ci.yml)
[![Published on npm](https://img.shields.io/npm/v/query-utilities.svg)](https://www.npmjs.com/package/query-utilities)

Query utilities for javascript with zero dependencies.

```
Search "Anything" AND (Get better >= results) OR build TO extend
```

- ✅ No Dependencies
- ✅ ES Modules
- ✅ Full Browser Support
- ✅ 100% Typescript

## Classes

This package includes all the classes used in parsing and for building results.

### `Query`

Base class that all extend from and implement.

### `TextQuery` and `PhraseQuery`

Basic text query that can optionally be an exact match if the source starts and ends with a quote character. The returned string is trimmed.

```
"test" --> test
hello world --> hello world
test "inner" quotes --> test "inner" quotes
"trimmed  " --> trimmed
```

### `AndQuery`

Joins two statements with the `AND` token and each side can extend `Query`.

```
this AND that
```

### `OrQuery`

Joins two statements with the `OR` token and each side can extend `Query`.

```
this OR that
```

### `NotQuery`

Negates the targeted query.

```
NOT this
```

### `SectionQuery`

Specifies a query on a given section or return the section if not specified.

```
@users userId:1 -> user with id = 1
@todos -> all todos
```

### `GroupQuery`

Group a query with `()`.

```
active todos AND NOT (completed:true OR stale)
```

### `FieldScope`

Target a query on a specified field.

```
active:true -> fields where active field === true
```

### `FieldCompareQuery`

Target a query on a specified field with a operator and text query.

```
id >= 2 -> ids where value is greater or equal to 2
```

### `RangeQuery`

Search a range (inclusive or exclusive) with a start and end query.

```
[200 TO 2000} -> range from inclusive 200 to exclusive 2000
```
