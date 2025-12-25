# Changelog

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

### ⚠️ Breaking Changes

- ProLayout
  - ⚠️ Remove deprecated `rightContentRender` and `TabPane` APIs.
- ProTable
  - ⚠️ Remove deprecated `columnsStateMap` property, use `columnsState` instead.
- ProCard
  - ⚠️ Remove deprecated `StatisticsCardProps`.

### 📚 Documentation

- 📚 Add migration guide from 2.0 to 3.0.
- 📚 Polish `index.md` to be more user-friendly.

---

## [3.0.0-beta.1] - 2025-07-24

### 🚀 New Features

- ✨ **Initial Release**: First Beta version of ProComponents 3.0.
- Core
  - ✨ Support `ref` forwarding for multiple components to optimize layout and rendering.

### ⚠️ Breaking Changes

- Core
  - ⚠️ Remove Antd@4 compatibility support.
- ProTable
  - ⚠️ Unify `tooltip` props and remove deprecated `tip` prop.

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
