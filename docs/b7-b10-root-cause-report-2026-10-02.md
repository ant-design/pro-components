# B7–B10 common-root-cause remediation report

Date: 2026-10-02

## Group 1: nested list and editable-row identity

Issues: #8893, #6508.

Root cause: EditableProTable used a function `rowKey` result as though it were a record field name when building nested form paths. The data-source insertion path also treated parent key `0` as missing and could expose internal `map_row_*` bookkeeping fields.

Resolution:

- Resolve function `rowKey` values directly when registering nested child paths.
- Preserve `0` as a valid parent key and remove internal row-map keys before returning form data.
- Lock the supported ProFormList integration: use the list render prop and `name={[field.name, 'rows']}` around EditableProTable.

Regression: `tests/table/nestedListPaths.test.tsx`.

## Group 2: bidirectional value conversion

Issues: #8907, #8480, #9120, #9032.

Root cause: conversion metadata was registered at different levels for ordinary fields, list containers, table columns, and submit formatting. `convertValue` also lacked access to the complete entity in some paths.

Resolution:

- Pass the complete form entity as the third `convertValue` argument in both display and submit paths.
- Keep list containers from replacing child transform metadata.
- Expose and forward top-level ProTable column `convertValue` / `transform` into editable and form fields.
- Preserve the existing one-time source-to-component conversion guard for FieldSet editing.

Regression: `tests/form/conversionPipeline.test.tsx`.

## Group 3: read/edit display normalization

Issues: #8848, #8844, #8710, #8517.

Root cause: display boundaries handled empty arrays, numeric enum keys, affixes, and hierarchical option paths inconsistently.

Resolution:

- Treat an empty array as empty read-mode content.
- Render Digit `prefix` and `suffix` in read mode.
- Keep Cascader label lookup path-aware when values repeat across levels.
- Normalize object valueEnum option keys to the active numeric value type at the Select rendering boundary.

Regression: `tests/field/readonlyRootCauses.test.tsx`.

## Group 4: Select and TreeSelect interaction/data flow

Issues: #9138, #8876, #8869, #6766.

Root cause: a user `onOpenChange` handler could replace TreeSelect's internal controlled-open handler. The other reports combine old remote-filter behavior with upstream virtual-list and half-check semantics.

Resolution:

- Compose the user open callback with TreeSelect's internal state update.
- Lock remote Select search so a throttled request result is rendered without stale local filtering.
- Document `virtual: false` / `listHeight` for old virtual-list versions and the upgrade path for #9138.
- Document that associated checking omits half-checked parents from value and that `extra.allCheckedNodes` or `treeCheckStrictly` is required for #8869.

Regression: `tests/field/selectDataFlow.test.tsx`.

## Verification contract

Each group has a focused executable regression file. The final gate also runs TypeScript, the existing editable-table and form suites affected by these shared paths, the production build, and documentation checks.
