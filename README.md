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

### `TextQuery`

Basic text query that can optionally be an exact match if the source starts and ends with a quote character. The returned string is trimmed.

```
"test" --> test
hello world --> hello world
test "inner" quotes --> test "inner" quotes
"trimmed  " --> trimmed
```
