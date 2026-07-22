# Changelog

## [3.1.14-4] - 2026-07-22

### 🐛 Bug Fixes

- ProTable
  - 🐞 Fix ColumnSetting fixed column sort order and refine the sync between fixed columns and column order [#9556](https://github.com/ant-design/pro-components/pull/9556)
  - 🐞 Fix ListToolBar padding not adapting dynamically in cardBordered mode
- Provider
  - 🐞 Fix CommonJS compatibility by importing from `antd/lib` instead of `antd/es` in CJS output

### 🛠 Misc

- 🛠 Bump dependencies to latest minor versions [#9670](https://github.com/ant-design/pro-components/pull/9670)

## [3.1.14-3] - 2026-07-22

### 🐛 Bug Fixes

- ProTable
  - 🐞 Fix TS2322 type error when passing ReactNode to `options.search`
  - 🐞 Fix syncToUrl not writing search fields to URL [#9665](https://github.com/ant-design/pro-components/issues/9665)
  - 🐞 Fix syncToUrl not triggering when request lacks macrotask [#9096](https://github.com/ant-design/pro-components/issues/9096)
  - 🐞 Fix ColumnSetting reset not restoring drag order
  - 🐞 Fix pagination change not triggering syncToUrl [#6967](https://github.com/ant-design/pro-components/issues/6967)
  - 🐞 Fix EditableTable cancel edit error when form is undefined [#9640](https://github.com/ant-design/pro-components/issues/9640)
- ProField
  - 🐞 Fix ColorPicker default preset label hardcoded in English, now uses i18n [#9668](https://github.com/ant-design/pro-components/issues/9668)
- Utils
  - 🐞 Fix `isDeepEqualReact` stack overflow on circular refs [#9666](https://github.com/ant-design/pro-components/issues/9666) [#9667](https://github.com/ant-design/pro-components/pull/9667) [@lblblong](https://github.com/lblblong)
- Provider
  - 🐞 Add Urdu (ur-PK) locale support [#9218](https://github.com/ant-design/pro-components/issues/9218)

## [3.1.14-0] - 2026-07-05

### 🐛 Bug Fixes

- ProCard
  - 🐞 Align ProCard styles with antd v6 native Card: borders use `colorBorderSecondary`, shadows use `boxShadowTertiary`, border-radius unified to `borderRadiusLG`, header / body get matching corner radii
  - 🐞 `variant="borderless"` now defaults to `boxShadowTertiary` light shadow to match antd v6 Card (note: this is an API behavior change; code relying on "borderless = no shadow" must override explicitly)
  - 🐞 Fix `ghost` mode UI: the ghost card's own padding is now zeroed, `-border` and default shadow are overridden, and the selector is broadened from `> ${componentCls}` to `> *` so custom child nodes inherit the reset too

## [3.1.13-0] - 2026-07-05

### 🐛 Bug Fixes

- ProLayout
  - 🐞 Fix TS2322 build error in PageHeader `fontSizeHeading4` type cast
- ProTable
  - 🐞 Fix card wrapper not rendering when search is disabled but toolbar options exist
  - 🐞 Fix EditableTable `onChange` firing repeatedly and `useImperativeHandle` deps issue
  - 🐞 Fix ColumnSetting nested column parent-child sync and stale cache on reset
  - 🐞 Fix column type definition collapse caused by `&` operator precedence
  - 🐞 Fix abort signal binding error causing requests to be incorrectly cancelled on rapid reload
  - 🐞 Fix `visibilitychange` event closure trap and `pageInfo` snapshot overwrite in `useFetchData`
- ProForm
  - 🐞 Fix FormItem label and tooltip being incorrectly overridden in light mode
  - 🐞 Fix DrawerForm redundant `onOpenChange` callback
  - 🐞 Fix date picker alignment with `valueType` picker and default format
  - 🐞 Fix FormList date type not properly converting to string on submit [#9631](https://github.com/ant-design/pro-components/pull/9631)
  - 🐞 Fix week format and submission semantics, unify date range readonly display
- ProField
  - 🐞 Fix read-mode date formatting and week/quarter range default format
  - 🐞 Fix ColorPicker to use antd `ColorPickerProps` type [#9566](https://github.com/ant-design/pro-components/pull/9566)
  - 🐞 Fix `proFieldParsingText` crashing when rendering `labelInValue` objects in read mode
  - 🛠 Replace `Input` separator with semantic `span` in DigitRange for better style consistency
- Provider
  - 🐞 Fix `dark=false` not properly resetting `darkAlgorithm`
  - 🐞 Align locale keys and fix i18n strings [#9595](https://github.com/ant-design/pro-components/pull/9595)
- Utils
  - 🐞 Fix serialized dayjs parsing, submission conversion, and range text formatting
  - 🐞 Fix `transformKeySubmitValue` breaking array shape when transforming objects under array parents
  - 🐞 Fix `useEditableArray` saveRefs leak and missing default values for new rows in `tableName` mode
  - 🐞 Fix `nanoid` window access crash in SSR/Workers [#9596](https://github.com/ant-design/pro-components/pull/9596)
- ProList
  - 🐞 Fix LightWrapper child props merge order causing light filter input to not take effect

### ⚡️ Performance

- ProDescriptions
  - ⚡️ Stabilize fetch action and memoize schema
- ProTable
  - ⚡️ Optimize table rendering with `useMemo` and `useRefFunction`
- ProList
  - ⚡️ Extract `renderItem` and add memo for list rendering optimization

### 🛠 Refactoring

- ProCard
  - 🛠 Refactor component, fix ref forwarding and loading state
- ProList
  - 🛠 Replace `useCallback` with `useRefFunction` and fix SSR compatibility
- ProTable
  - 🛠 Rename Container to `TableProvider` and optimize persistence logic
  - 🛠 Clean unused exports and rename `TableStatus` to `FieldStatus`
- ProForm
  - 🛠 Extract URL sync logic into standalone hook `useUrlSync`
  - 🛠 Extract common formatting methods to eliminate duplication
  - 🛠 LightFilter with explicit field helpers [#9604](https://github.com/ant-design/pro-components/pull/9604)
  - 🛠 Split ProField light edit into dedicated components [#9598](https://github.com/ant-design/pro-components/pull/9598)
- ProField
  - 🛠 Remove `SelectHighlight` from Select [#9633](https://github.com/ant-design/pro-components/pull/9633)
  - 🛠 Remove `proxyChange` from Digit [#9610](https://github.com/ant-design/pro-components/pull/9610)
- Provider
  - 🛠 Refactor i18n and Provider logic, optimize dayjs locale loading

### 🐛 Packaging Fix

- 🐞 Remove `"type": "module"` from `package.json` to fix Node-native ESM loaders (e.g. Vitest) failing to load the CJS `lib/` build [#9656](https://github.com/ant-design/pro-components/issues/9656)

### 📦 Dependencies

- 🔒 Replace `mockjs` with `@faker-js/faker` (fixes CVE-2023-26158)
- ⬆️ Upgrade `@ant-design/icons`, `@babel/runtime`, `@rc-component/form`, `@rc-component/table`, `@rc-component/util`, `dayjs`

### 📖 Documentation

- 📖 Unify demo filenames to kebab-case naming convention
- 📖 Fix multiple demo path references in site documentation

---

## [3.1.3-0] - 2026-04-06

### 🗑 Breaking Changes

- ProDescriptions
  - 🗑 Remove `ProDescriptionsItem` export; use `columns` instead
  - 🛠 Rename column type to `ProDescriptionsColumn` (`ProDescriptionsItemProps` remains an alias)
  - 🛠 Tighten `request` return type to `ProDescriptionsRequestResult<T>`; `params` is `Record<string, unknown>`; `onDataSourceChange` may receive `undefined`
  - 🛠 `ProDescriptionsProps` no longer accepts `items` (generated internally)

### 🐛 Bug Fixes

- Site docs
  - 🐞 Fix several `<code src>` paths that did not match files under `demos/` (e.g. `single-test` → `_single-test`, `debug-demo` → `_debug-demo`, `base_test` → `_base-test`) and correct a `Group//` double-slash path in `group.md`

### 🛠 Refactor / Documentation

- ProForm
  - ✅ Added schema vs imperative alignment tests (`schemaImperativeAlignment`)
  - 📖 Internal docs: `docs/internal/form-architecture.md`, `docs/rfc/2026-04-pro-form-architecture-refactor.md` (aligned with current `master` source layout)

---

## [3.1.2-0] - 2026-01-27

### 🐛 Bug Fixes

- useEditableArray
  - 🐞 Fix type error in `onChange` callback by using type guard to ensure correct array type after filtering

---

## [3.1.1-1] - 2026-01-27

### 📚 Documentation

- 📚 Add Guidelines documentation, including component usage guides, design tokens, and best practices
  - 📚 Add component usage guides: ProTable, ProForm, ProLayout, ProCard, ModalForm, DrawerForm, StepsForm, EditableProTable
  - 📚 Add design token documentation: colors, layout, typography
  - 📚 Add component overview and icon usage guides

---

## [3.1.1-0] - 2026-01-27

### 🐛 Bug Fixes

- ProTable
  - 🐞 Fix using `getFieldsFormatValue` in `resetAll` to support value transformation [#9403]
  - 🐞 Fix table component infinite loop issue [#9406]

### 🛠 Refactoring

- Core
  - 🛠 Replace `useMergedState` with `useControlledState` for improved state management
- ProTable
  - 🛠 Enhance column configuration and context management
- Dependencies
  - 🛠 Replace `classnames` with `clsx` for improved performance [#9405]
  - 🛠 Remove unused dependencies [#9402]

---

## [3.1.0-0] - 2025-12-25

### 🚀 New Features

- 🔥 **Upgrade to Ant Design v6**: Full support for Ant Design v6, updating all components to be compatible with the new version API.

### ⚠️ Breaking Changes

- ProCard / CheckCard / StatisticCard
  - ⚠️ Replace `bodyStyle` prop with `styles` for unified styling configuration.
- Divider
  - ⚠️ Replace `orientation` prop with `type` to align with Ant Design v6.
- Drawer / DrawerForm
  - ⚠️ Replace `size` prop with `width` for clearer drawer dimension configuration.
- StepsForm / Group
  - ⚠️ Replace `direction` prop with `orientation` for unified direction property naming.
  - ⚠️ Replace `width` prop with `size` for unified size property naming.
- Tabs
  - ⚠️ Replace `tabPosition` prop with `tabPlacement` to align with Ant Design v6.
- ProForm
  - ⚠️ Replace `Button.Group` with `Space.Compact` for improved form layout.
- Alert
  - ⚠️ Use `title` prop instead of the original title configuration method.
- ProFieldParsingText
  - ⚠️ Replace `split` prop with `separator` for better semantic clarity.

### 🐛 Bug Fixes

- ProTable
  - 🐞 Fix nested structure filtering and sorting reset issues, ensuring correct handling of nested columns.
- SearchSelect
  - 🐞 Fix handling logic when search value is `undefined`, consistently using empty string.
  - 🐞 Optimize label retrieval logic to improve data compatibility.
- Select
  - 🐞 Remove unused `children` prop to clean up redundant code.

### 💄 Style / UI Improvements

- ColumnSetting / AppsLogoComponents
  - 💄 Replace `overlayClassName` with `classNames` for unified style class name configuration.
- ProCard / Layout
  - 💄 Optimize style class usage for cards and layouts to improve layout consistency.

### 📦 Dependency Updates

- 📦 Upgrade to latest Ant Design v6 version.
- 📦 Update browser support list, remove IE 11 support.

### 📚 Documentation

- 📚 Update Changelog documentation to record 3.x version update history.

---

## [3.0.0-beta.3] - 2025-07-24

### 🚀 New Features

- 🔥 **ProComponents 3.0 Major Upgrade**: Completely restructured architecture, focusing on Antd@5 support and significantly reducing bundle size.
- ProTable
  - 🚀 Performance significantly improved to be on par with Antd.
- ProForm
  - 🚀 Optimize Tree Shaking to solve the issue of default binding all components.

### 🐛 Bug Fixes

- ProLayout
  - 🐞 Fix `Helmet` error when `pageTitleRender` returns non-string values in `useDocumentTitle`.

### 💄 Style / UI Improvements

- ProLayout
  - 💄 Update menu background property name to simplify code structure.

### 📦 Dependency Updates

- 📦 Upgrade to latest Antd@5 version and remove Antd@4 related dependencies.
- 📦 Update Prettier to latest version and fix deprecated configuration.

---

## [3.0.0-beta.2] - 2025-07-24

### 🛠 Breaking Changes

- ProLayout
  - 🛠 Remove deprecated `rightContentRender` and `TabPane` APIs.
- ProTable
  - 🛠 Remove deprecated `columnsStateMap` property, use `columnsState` instead.
- ProCard
  - 🛠 Remove deprecated `StatisticsCardProps`.

### 📚 Documentation

- 📚 Add migration guide from 2.0 to 3.0.
- 📚 Polish `index.md` to be more user-friendly.

---

## [3.0.0-beta.1] - 2025-07-24

### 🚀 New Features

- ✨ **Initial Release**: First Beta version of ProComponents 3.0.
- Core
  - ✨ Support `ref` forwarding for multiple components to optimize layout and rendering.

### 🛠 Breaking Changes

- Core
  - 🛠 Remove Antd@4 compatibility support.
- ProTable
  - 🛠 Unify `tooltip` props and remove deprecated `tip` prop.

---

## Migration Guide

### Upgrading from 2.x to 3.0

#### Major Changes

1. **Remove Antd@4 Compatibility**: Ensure project uses Antd@5.
2. **Bundle Size Optimization**: Remove compatibility code, reduce bundle size.
3. **Tree Shaking**: Optimize on-demand loading, reduce unnecessary code.

#### Upgrade Steps

1. Upgrade Antd to 5.x version.
2. Check and remove Antd@4 related compatibility code.
3. Update component import methods to leverage Tree Shaking.
4. Test all functionality to ensure compatibility.

#### Breaking Changes

- No longer supports Antd@4.
- Some APIs may have changed.
- Certain compatibility configurations have been removed.

---

## Version Support

| Version | Status                | Support Period |
| ------- | --------------------- | -------------- |
| 3.0.x   | 🟢 Active Development | 2025+          |

---

## License

MIT License
