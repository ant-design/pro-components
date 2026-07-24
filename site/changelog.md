# Changelog

## [3.1.14-5] - 2026-07-24

### 🐛 问题修复

- ProForm
  - 🐞 修复 ProFormField 组件无法通过 `form.getFieldInstance` 获取实例的问题，ProFormText、ProFormText.Password、ProFormTextArea、ProFormDigit 等组件现在均可正确返回实例 [#9673](https://github.com/ant-design/pro-components/issues/9673)
- ProField
  - 🐞 修复 ProField forwardRef 类型声明，返回 `ForwardRefExoticComponent` 以兼容 React 19 + TypeScript 6 [#9671](https://github.com/ant-design/pro-components/issues/9671) [#9672](https://github.com/ant-design/pro-components/pull/9672) [@Phecda](https://github.com/Phecda)

### ✅ 测试

- ✅ 新增 `getFieldInstance` 回归测试，覆盖 text、password、textarea、digit、数组 name 路径、dependencies 及 fieldRef 共存场景

## [3.1.14-4] - 2026-07-22

### 🐛 问题修复

- ProTable
  - 🐞 修复 ColumnSetting 固定列排序顺序错误的问题，并完善固定列与列顺序的同步逻辑 [#9556](https://github.com/ant-design/pro-components/pull/9556)
  - 🐞 修复卡片边框（cardBordered）模式下 ListToolBar 内边距未动态适配的问题
- Provider
  - 🐞 修复 CJS 产物引用 `antd/es` 导致的 CommonJS 兼容性问题，改用 `antd/lib`

### 🛠 其他

- 🛠 依赖例行升级到最新 minor 版本 [#9670](https://github.com/ant-design/pro-components/pull/9670)

## [3.1.14-3] - 2026-07-22

### 🐛 问题修复

- ProTable
  - 🐞 修复 `options.search` 传入 ReactNode 时 TS2322 类型错误
  - 🐞 修复 syncToUrl 搜索字段不写入 URL 的问题 [#9665](https://github.com/ant-design/pro-components/issues/9665)
  - 🐞 修复 syncToUrl 在 request 不含宏任务时不触发的问题 [#9096](https://github.com/ant-design/pro-components/issues/9096)
  - 🐞 修复 ColumnSetting 重置后未恢复拖拽顺序的问题
  - 🐞 修复分页变化未触发 syncToUrl 的问题 [#6967](https://github.com/ant-design/pro-components/issues/6967)
  - 🐞 修复 EditableTable 取消编辑时 form 为 undefined 报错的问题 [#9640](https://github.com/ant-design/pro-components/issues/9640)
- ProField
  - 🐞 修复 ColorPicker 默认预设 label 硬编码英文的问题，改为国际化读取 [#9668](https://github.com/ant-design/pro-components/issues/9668)
- Utils
  - 🐞 修复 `isDeepEqualReact` 循环引用导致栈溢出的问题 [#9666](https://github.com/ant-design/pro-components/issues/9666) [#9667](https://github.com/ant-design/pro-components/pull/9667) [@lblblong](https://github.com/lblblong)
- Provider
  - 🐞 新增乌尔都语（ur-PK）locale 支持 [#9218](https://github.com/ant-design/pro-components/issues/9218)

## [3.1.13-0] - 2026-07-05

### 🐛 问题修复

- ProLayout
  - 🐞 修复 PageHeader 中 `fontSizeHeading4` 类型转换导致的 TS2322 编译错误
- ProTable
  - 🐞 修复 search 禁用但 toolbar options 存在时 card wrapper 未渲染的问题
  - 🐞 修复 EditableTable 中 `onChange` 重复触发及 `useImperativeHandle` 依赖问题
  - 🐞 修复 ColumnSetting 嵌套列父子联动失效及重置时读取 stale 缓存的问题
  - 🐞 修复列类型定义中 `&` 优先级导致的类型坍塌问题
  - 🐞 修复高频 reload 时 abort 信号绑定错误导致请求被误取消的问题
  - 🐞 修复 `visibilitychange` 事件闭包陷阱及 `useFetchData` 中 `pageInfo` 快照覆盖问题
- ProForm
  - 🐞 修复 FormItem label 和 tooltip 在轻量模式下被错误覆盖的问题
  - 🐞 修复 DrawerForm 冗余 `onOpenChange` 回调
  - 🐞 修复日期选择器按 `valueType` 对齐 picker 与默认 format
  - 🐞 修复 FormList 中时间类型提交时未正确转换成 string 格式的 bug [#9631](https://github.com/ant-design/pro-components/pull/9631)
  - 🐞 修正周格式与提交语义，并统一日期范围只读展示
- ProField
  - 🐞 读模式日期格式化与周/季范围默认格式修正
  - 🐞 修复 ColorPicker 使用 antd `ColorPickerProps` 类型 [#9566](https://github.com/ant-design/pro-components/pull/9566)
  - 🐞 修复 `proFieldParsingText` 中 `labelInValue` 对象在只读模式下导致 React 渲染崩溃的问题
  - 🛠 DigitRange 分隔符由 `Input` 组件替换为语义化 `span`，优化样式一致性
- Provider
  - 🐞 修复 `dark=false` 时未正确重置 `darkAlgorithm` 的问题
  - 🐞 对齐 locale keys 并修正 i18n 字符串 [#9595](https://github.com/ant-design/pro-components/pull/9595)
- Utils
  - 🐞 修复序列化 dayjs 的解析与提交转换、范围文案格式化
  - 🐞 修复 `transformKeySubmitValue` 中数组父节点下对象转换导致数组形状破坏的问题
  - 🐞 修复 `useEditableArray` 中 `tableName` 模式下 saveRefs 泄漏及新增行默认值丢失
  - 🐞 修复 `nanoid` 在 SSR/Workers 环境下 window 访问崩溃的问题 [#9596](https://github.com/ant-design/pro-components/pull/9596)
- ProList
  - 🐞 修复 LightWrapper 子节点 props 合并顺序导致轻量筛选输入不生效的问题

### ⚡️ 性能提升

- ProDescriptions
  - ⚡️ 稳定化 fetch action 并 memoize schema
- ProTable
  - ⚡️ 使用 `useMemo` 和 `useRefFunction` 优化表格组件渲染性能
- ProList
  - ⚡️ 提取 `renderItem` 并添加 memo 优化列表渲染

### 🛠 重构

- ProCard
  - 🛠 重构组件并修复 ref 透传与 loading 状态问题
- ProList
  - 🛠 使用 `useRefFunction` 替代 `useCallback` 并修复 SSR 兼容性
- ProTable
  - 🛠 重命名 Container 为 `TableProvider` 并优化持久化逻辑
  - 🛠 清理未使用的导出并重命名 `TableStatus` 为 `FieldStatus`
- ProForm
  - 🛠 提取 URL 同步逻辑到独立 hook `useUrlSync`
  - 🛠 抽取公共格式化方法消除重复实现
  - 🛠 LightFilter 使用显式 field helpers [#9604](https://github.com/ant-design/pro-components/pull/9604)
  - 🛠 拆分 ProField 轻量编辑为独立组件 [#9598](https://github.com/ant-design/pro-components/pull/9598)
- ProField
  - 🛠 移除 Select 中的 `SelectHighlight` [#9633](https://github.com/ant-design/pro-components/pull/9633)
  - 🛠 移除 Digit 中的 `proxyChange` [#9610](https://github.com/ant-design/pro-components/pull/9610)
- Provider
  - 🛠 重构国际化与 Provider 逻辑，优化 dayjs 语言包加载

### 🐛 打包修复

- 🐞 移除 `package.json` 中的 `"type": "module"` 声明，修复 Node 原生 ESM loader（如 Vitest）下 `lib/` CJS 构建产物无法加载的问题 [#9656](https://github.com/ant-design/pro-components/issues/9656)

### 📦 依赖升级

- 🔒 替换 `mockjs` 为 `@faker-js/faker`（修复 CVE-2023-26158）
- ⬆️ 升级 `@ant-design/icons`、`@babel/runtime`、`@rc-component/form`、`@rc-component/table`、`@rc-component/util`、`dayjs`

### 📖 文档

- 📖 统一 demo 文件名为 kebab-case 命名
- 📖 修正多处站点文档中 demo 路径引用

---

## [3.1.3-0] - 2026-04-06

### 🗑 破坏性变更

- ProDescriptions
  - 🗑 移除 `ProDescriptionsItem` 导出；请使用 `columns` 配置列
  - 🛠 列类型更名为 `ProDescriptionsColumn`（`ProDescriptionsItemProps` 保留为别名）
  - 🛠 `request` 返回类型收紧为 `ProDescriptionsRequestResult<T>`；`params` 为 `Record<string, unknown>`；`onDataSourceChange` 可收到 `undefined`
  - 🛠 `ProDescriptionsProps` 不再接受 `items`（由组件内部生成）

### 🐛 问题修复

- 站点文档
  - 🐞 修正多处 `<code src>` 与 `demos/` 实际文件名不一致（如 `single-test` → `_single-test`、`debug-demo` → `_debug-demo`、`base_test` → `_base-test` 等），并修复 `group.md` 中 `Group//` 双斜杠路径

### 🛠 重构 / 文档

- ProForm
  - ✅ 新增 Schema 与命令式路径对齐单测（`schemaImperativeAlignment`）
  - 📖 内部文档：`docs/internal/form-architecture.md`、`docs/rfc/2026-04-pro-form-architecture-refactor.md`（与当前 `master` 源码路径对齐）

---

## [3.1.2-0] - 2026-01-27

### 🐛 问题修复

- useEditableArray
  - 🐞 修复 `onChange` 回调中类型错误，使用类型守卫确保过滤后的数组类型正确

---

## [3.1.1-1] - 2026-01-27

### 📚 文档

- 📚 新增 Guidelines 设计指南文档，包含组件使用指南、设计令牌和最佳实践
  - 📚 新增组件使用指南：ProTable、ProForm、ProLayout、ProCard、ModalForm、DrawerForm、StepsForm、EditableProTable
  - 📚 新增设计令牌文档：颜色、布局、字体排版
  - 📚 新增组件概览和图标使用指南

---

## [3.1.1-0] - 2026-01-27

### 🐛 问题修复

- ProTable
  - 🐞 修复 `resetAll` 中使用 `getFieldsFormatValue` 以支持值转换 [#9403]
  - 🐞 修复表格组件无限循环问题 [#9406]

### 🛠 重构

- Core
  - 🛠 使用 `useControlledState` 替换 `useMergedState` 以改进状态管理
- ProTable
  - 🛠 增强列配置和上下文管理
- Dependencies
  - 🛠 使用 `clsx` 替换 `classnames` 以提升性能 [#9405]
  - 🛠 移除未使用的依赖项 [#9402]

---

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
