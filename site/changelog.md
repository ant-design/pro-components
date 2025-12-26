# Changelog

## [3.1.0-0] - 2025-12-25

### 🚀 新特性

- 🔥 **升级到 Ant Design v6**: 全面支持 Ant Design v6，更新所有组件以兼容新版本 API。

### ⚠️ 破坏性变更

- ProCard / CheckCard / StatisticCard
  - ⚠️ 将 `bodyStyle` 属性替换为 `styles`，统一样式配置方式。
- Divider
  - ⚠️ 将 `orientation` 属性替换为 `type`，与 Ant Design v6 保持一致。
- Drawer / DrawerForm
  - ⚠️ 将 `size` 属性替换为 `width`，明确抽屉尺寸配置。
- StepsForm / Group
  - ⚠️ 将 `direction` 属性替换为 `orientation`，统一方向属性命名。
  - ⚠️ 将 `width` 属性替换为 `size`，统一尺寸属性命名。
- Tabs
  - ⚠️ 将 `tabPosition` 属性替换为 `tabPlacement`，与 Ant Design v6 保持一致。
- ProForm
  - ⚠️ 将 `Button.Group` 替换为 `Space.Compact`，优化表单布局。
- Alert
  - ⚠️ 使用 `title` 属性替代原有标题配置方式。
- ProFieldParsingText
  - ⚠️ 将 `split` 属性替换为 `separator`，提高语义清晰度。

### 🐛 问题修复

- ProTable
  - 🐞 修复嵌套结构筛选与排序重置问题，确保嵌套列的正确处理。
- SearchSelect
  - 🐞 修复搜索值为 `undefined` 时的处理逻辑，统一使用空字符串。
  - 🐞 优化标签获取逻辑，提升数据兼容性。
- Select
  - 🐞 移除未使用的 `children` 属性，清理冗余代码。

### 💄 样式 / UI 改进

- ColumnSetting / AppsLogoComponents
  - 💄 将 `overlayClassName` 替换为 `classNames`，统一样式类名配置。
- ProCard / Layout
  - 💄 优化卡片和布局的样式类使用，提升布局一致性。

### 📦 依赖更新

- 📦 升级到 Ant Design v6 最新版本。
- 📦 更新浏览器支持列表，移除 IE 11 支持。

### 📚 文档

- 📚 更新 Changelog 文档，记录 3.x 版本更新历史。

---

## [3.0.0-beta.3] - 2025-07-24

### 🚀 新特性

- 🔥 **ProComponents 3.0 重大升级**: 完全重构的组件库架构，专注于 Antd@5 支持，大幅减少包大小。
- ProTable
  - 🚀 性能大幅提升，与 Antd 看齐。
- ProForm
  - 🚀 优化 Tree Shaking，解决 ProForm 默认绑定所有组件的问题。

### 🐛 问题修复

- ProLayout
  - 🐞 修复 `useDocumentTitle` 中 `pageTitleRender` 返回非字符串值时的 `Helmet` 错误。

### 💄 样式 / UI 改进

- ProLayout
  - 💄 更新菜单背景属性名称，简化代码结构。

### 📦 依赖更新

- 📦 升级到 Antd@5 最新版本，移除所有 Antd@4 相关依赖。
- 📦 更新 Prettier 到最新版本，修复过时的配置选项。

---

## [3.0.0-beta.2] - 2025-07-24

### 🛠 破坏性变更

- ProLayout
  - 🛠 移除已废弃的 `rightContentRender` 和 `TabPane` API。
- ProTable
  - 🛠 移除已废弃的 `columnsStateMap` 属性，请使用 `columnsState` 代替。
- ProCard
  - 🛠 移除已废弃的 `StatisticsCardProps`。

### 📚 文档

- 📚 添加 2.0 到 3.0 的迁移指南文档。
- 📚 润色 `index.md`，让文档更加人性化和友好。

---

## [3.0.0-beta.1] - 2025-07-24

### 🚀 新特性

- ✨ **初始版本**: ProComponents 3.0 首个 Beta 版本。
- Core
  - ✨ 更新多个组件以支持 `ref` 转发，优化布局和渲染逻辑。

### 🛠 破坏性变更

- Core
  - 🛠 移除 Antd@4 兼容性支持。
- ProTable
  - 🛠 统一 `tooltip` 属性，移除不必要的 `tip` 属性。

---

## 迁移指南

### 从 2.x 升级到 3.0

#### 主要变更

1. **移除 Antd@4 兼容性**: 确保项目使用 Antd@5。
2. **包大小优化**: 移除兼容性代码，减少包大小。
3. **Tree Shaking**: 优化按需加载，减少不必要的代码。

#### 升级步骤

1. 升级 Antd 到 5.x 版本。
2. 检查并移除 Antd@4 相关的兼容性代码。
3. 更新组件导入方式，利用 Tree Shaking。
4. 测试所有功能，确保兼容性。

#### 破坏性变更

- 不再支持 Antd@4。
- 部分 API 可能发生变化。
- 某些兼容性配置被移除。

---

## 版本支持

| 版本  | 状态        | 支持时间 |
| ----- | ----------- | -------- |
| 3.0.x | 🟢 活跃开发 | 2025+    |

---

## 许可证

MIT License
