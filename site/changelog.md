# Changelog

## [3.1.15-8] - 2026-09-28

### 🐛 问题修复

- ProForm
  - 🐞 修复 `omitNil={false}` 时字段 `transform` 返回对象会连带丢弃其他 `null` 字段的问题：`transformKeySubmitValue` 现在尊重 `omitNil`，清空后的非必填字段（如 `ProFormDigit`）以 `null` 完整保留，与 antd Form `getFieldsValue` 语义对齐 [#8044](https://github.com/ant-design/pro-components/issues/8044)
  - 🐞 修复 `ProFormSelect` 受控 `searchValue` 编程式变化不触发 `request` 重新请求的问题：现在受控搜索词变化会同步以新 `keyWords` 发起请求 [#8801](https://github.com/ant-design/pro-components/issues/8801)
  - 🐞 修复 `ProFormSelect`（含可编辑表格单元格）未输入搜索词直接选中选项后触发一次多余 `request` 的问题 [#8780](https://github.com/ant-design/pro-components/issues/8780) [#8928](https://github.com/ant-design/pro-components/issues/8928)
- ProFormList
  - 🐞 修复通过 `actionRef` 调用 `add` / `remove` 时不经过 `actionGuard`（`beforeAddRow` / `beforeRemoveRow`）且不触发 `onAfterAdd` / `onAfterRemove` 的问题：`actionRef` 暴露的操作现在与内置新增/复制/删除按钮走同一套守卫与回调 [#8939](https://github.com/ant-design/pro-components/issues/8939)
  - ✅ 回归锁定条件渲染（`ProFormDependency`）下 `preserve={false}` 子字段在复制/中间插入行时数据完整保留 [#8208](https://github.com/ant-design/pro-components/issues/8208)
  - ✅ 回归锁定条件卸载重挂载（如开关控制显隐）后子项正常重新渲染、`actionRef` 增删正常 [#8896](https://github.com/ant-design/pro-components/issues/8896)
- BetaSchemaForm
  - 🐞 修复 QueryFilter 布局下 columns 的 `hidden` 字段仍占用栅格位置的问题：`hidden` 现在透传到字段级，隐藏项不再渲染占位 Col [#8397](https://github.com/ant-design/pro-components/issues/8397)
- QueryFilter
  - 🐞 修复响应式 `span` 对象（`{xs:1, sm:2, ...}`）时 `layout="vertical"` 被强制改写为 horizontal 的问题 [#8836](https://github.com/ant-design/pro-components/issues/8836)
- EditableProTable
  - ✅ 回归锁定单元格校验错误出现/消失时行高稳定：负 margin 与 `ant-form-item-margin-offset` 补偿层净占位为 0 [#8859](https://github.com/ant-design/pro-components/issues/8859)

## [3.1.15-7] - 2026-09-28

### 🐛 问题修复

- ProTable / ProForm 日期字段
  - 🐞 修复 `syncToUrl` 回填秒级（10 位）/毫秒级（13 位）时间戳字符串时 date 相关 `valueType`（如 `dateTimeRange`）无法显示时间的问题：`parseValueToDay` 现在在 format 解析失败后按位数识别时间戳 [#8810](https://github.com/ant-design/pro-components/issues/8810)
- ProTable
  - 🐞 修复 `ellipsis` 开启后，`valueType` 为 `select` / `cascader` / `treeSelect` / `money` / `digit` 等值与文本不一致的字段，tooltip 显示原始值（如 id）而非渲染后文本的问题 [#8542](https://github.com/ant-design/pro-components/issues/8542)
  - ✅ 回归锁定 `valueType: 'money'` 在 EditableProTable 行编辑中正常渲染、保存值为数字 [#9618](https://github.com/ant-design/pro-components/issues/9618)

## [3.1.15-6] - 2026-09-28

### 🐛 问题修复

- ProFormDatePicker / ProFormDateRangePicker
  - 🐞 修复自定义 `format`（如 `DD/MM/YYYY`）下字符串值（如 `23/3/2024`）无法解析回显的问题：编辑态解析现在会把 `format` 传入 `parseValueToDay`，且严格位数解析失败时降级为单位数宽容形式重试 [#8863](https://github.com/ant-design/pro-components/issues/8863)
- EditableProTable
  - ✅ 回归锁定 `valueType: 'date'` 编辑后按 `YYYY-MM-DD` 输出（含 dayjs 对象值场景）[#8875](https://github.com/ant-design/pro-components/issues/8875)

## [3.1.15-5] - 2026-09-28

### 🐛 问题修复

- StepsForm
  - 🐞 修复把 `StepsForm.StepForm` 包一层自定义组件时，内部显式声明的 children/渲染逻辑被外层包装组件 props（经 context）覆盖的问题：元素自身书写的 props 现在优先 [#9021](https://github.com/ant-design/pro-components/issues/9021)

## [3.1.15-4] - 2026-09-28

### 🐛 问题修复

- ProForm / ModalForm / DrawerForm
  - 🐞 修复多次打开弹窗时 `initialValues` 更新不生效、表单仍显示上一次值的问题：BaseForm 现在会深比较 `initialValues` 变化并同步到表单 store，同步前清空旧字段避免上一记录遗留 [#8834](https://github.com/ant-design/pro-components/issues/8834) [#9165](https://github.com/ant-design/pro-components/issues/9165)
- StepsForm
  - 🐞 修复 `StepForm` 使用 `request` 异步加载数据后外层 `formRef` 为空对象的问题：实例初始化完成时同步刷新 StepsForm 对外暴露的 formRef [#8108](https://github.com/ant-design/pro-components/issues/8108)

### ✅ 测试

- ✅ 新增 ModalForm initialValues 跨打开、request + `Form.useWatch` 收敛、StepsForm request 后 formRef、BetaSchemaForm ModalForm 首次打开渲染回归测试（#8834 / #8624 / #8108 / #8753）

## [3.1.15-3] - 2026-09-28

### 🐛 问题修复

- ProForm / QueryFilter
  - 🐞 修复 `grid: true` 时 QueryFilter/LightFilter 崩溃（`items.flatMap is not a function`）的问题：`contentRender` 现在始终接收数组形态的 items，栅格由字段自身的 ColWrapper 完成 [#8253](https://github.com/ant-design/pro-components/issues/8253)
- ModalForm / DrawerForm
  - 🐞 修复受控 `open` + `trigger` 组合下弹窗永远无法打开的死锁问题：受控模式不再缓冲 `onOpenChange`，`#8920` 的缓冲语义仅保留在非受控模式 [#9624](https://github.com/ant-design/pro-components/issues/9624)

### ✅ 测试

- ✅ 新增 `grid: true` QueryFilter 渲染、受控 open + trigger、默认展开、trigger `stopPropagation` 回归测试

## [3.1.15-2] - 2026-09-27

### 🆕 新特性

- EditableProTable
  - 🔥 `editable.editableKeys` 支持 cell 粒度复合键 `` `${rowKey}:${dataIndex}` ``（如 `['1:name']` 仅激活该单元格编辑），与行级 key 完全向后兼容、可混用 [#9643](https://github.com/ant-design/pro-components/issues/9643) [b6826ece5](https://github.com/ant-design/pro-components/commit/b6826ece5)
  - 🆕 `onCell` 返回的 td props 注入 `data-editing` / `data-cell-editing` 编辑状态，便于自定义单元格交互（#9043 方案 C） [b6826ece5](https://github.com/ant-design/pro-components/commit/b6826ece5)
- ProTable
  - ⚡️ 纯 `ellipsis: true` 改用 antd Table 原生 CSS 省略，大数据量渲染显著提速；配置 `tooltip`/`showTitle` 或 `copyable` 时仍走 Typography 渲染，行为不变 [#9664](https://github.com/ant-design/pro-components/issues/9664) [#8868](https://github.com/ant-design/pro-components/issues/8868) [01fda391d](https://github.com/ant-design/pro-components/commit/01fda391d)
  - ⚡️ 单元格渲染热路径重构：`editableKeys` 改为变更时一次性构建索引（Set/Map），查询 O(1)，编辑态判断耗时降低约 5 倍；未开启 `editable` 的表格不再包装 `onCell`，树形数据无子行时跳过索引注册 [84a36700a](https://github.com/ant-design/pro-components/commit/84a36700a)
- ProForm
  - 🔥 新增 `loadingRender` 属性，支持自定义 `request` 加载期间的渲染（如 `Skeleton`），对齐 antd 5.18+ 加载风格 [#9679](https://github.com/ant-design/pro-components/issues/9679) [803017665](https://github.com/ant-design/pro-components/commit/803017665)
- ProFormSelect
  - 🆕 顶层新增 `fetchDataOnSearch` 属性，设为 `false` 时 `request` 仅初始化拉取一次，搜索走本地过滤 [#9682](https://github.com/ant-design/pro-components/issues/9682) [803017665](https://github.com/ant-design/pro-components/commit/803017665)

### 🐛 问题修复

- ProForm
  - 🐞 修复显式 `valueType` 被 `valueEnum`/`request` 推断覆盖的问题 [#9002](https://github.com/ant-design/pro-components/issues/9002) [399a1da0b](https://github.com/ant-design/pro-components/commit/399a1da0b)
  - 🐞 修复用户传入的 `noStyle` 在非 light 模式下被覆盖的问题 [a96050e33](https://github.com/ant-design/pro-components/commit/a96050e33)
  - 🐞 修复固定宽度 `ProFormDigit` 与 `addonAfter` 被顶开的问题 [#9211](https://github.com/ant-design/pro-components/issues/9211) [aa266935f](https://github.com/ant-design/pro-components/commit/aa266935f)
  - 🐞 修复 `ProFormCheckbox` 的 `readonly` 未透传到 antd Checkbox `disabled` 的问题 [#9107](https://github.com/ant-design/pro-components/issues/9107) [4c8d0f257](https://github.com/ant-design/pro-components/commit/4c8d0f257)
  - 🐞 修复同名字段生成重复 input id 的问题 [#9144](https://github.com/ant-design/pro-components/issues/9144) [4c8d0f257](https://github.com/ant-design/pro-components/commit/4c8d0f257)
  - 🐞 修复 ProForm 字段 `help` 属性未透传的问题 [#9066](https://github.com/ant-design/pro-components/issues/9066) [4c8d0f257](https://github.com/ant-design/pro-components/commit/4c8d0f257)
  - 🐞 修复 `ProFormMoney` 在 `ru-RU` 下货币符号位置、分隔符与 `numberFormatOptions` 合并错误的问题 [#9090](https://github.com/ant-design/pro-components/issues/9090) [4c8d0f257](https://github.com/ant-design/pro-components/commit/4c8d0f257)
  - 🐞 修复 `ProFormList` 嵌套 `name` 路径下 `transform` 未触发，以及 list render 传 `[index, key]` 时行索引重复的问题 [#9129](https://github.com/ant-design/pro-components/issues/9129) [#9238](https://github.com/ant-design/pro-components/issues/9238) [4c8d0f257](https://github.com/ant-design/pro-components/commit/4c8d0f257)
  - 🐞 修复 `ProFormList` `onAfterAdd` 回调参数与文档不一致的问题 [#9102](https://github.com/ant-design/pro-components/issues/9102) [4c8d0f257](https://github.com/ant-design/pro-components/commit/4c8d0f257)
  - 🐞 修复编辑行时 `rules` 相关 props 被错误展开到 Fragment 的问题 [#9153](https://github.com/ant-design/pro-components/issues/9153) [4c8d0f257](https://github.com/ant-design/pro-components/commit/4c8d0f257)
  - 🐞 修复 `onFinish` 错误被静默吞掉的问题，现通过 `console.error` 暴露 [#9019](https://github.com/ant-design/pro-components/issues/9019) [399a1da0b](https://github.com/ant-design/pro-components/commit/399a1da0b)
- ProField / ProTable
  - 🐞 修复 select 只读态枚举输出无法配合 `ellipsis` + `copyable` 省略的问题 [#8978](https://github.com/ant-design/pro-components/issues/8978) [399a1da0b](https://github.com/ant-design/pro-components/commit/399a1da0b)
- ProTable
  - 🐞 修复 `request` 在加载/分页/重置时收到 `sorter`/`filter` 为 `null` 默认值的问题 [#9161](https://github.com/ant-design/pro-components/pull/9161) [ddbbb1425](https://github.com/ant-design/pro-components/commit/ddbbb1425)
- ProDescriptions
  - 🐞 修复 `request` 的 `params` 未注入 dependency 值的问题 [#9170](https://github.com/ant-design/pro-components/issues/9170) [4c8d0f257](https://github.com/ant-design/pro-components/commit/4c8d0f257)
- Provider
  - 🇺🇸🇨🇳 修复空字符串 locale 文案（如 vi-VN 分页 range）被错误回退到 zh-CN 的问题 [#9016](https://github.com/ant-design/pro-components/issues/9016) [399a1da0b](https://github.com/ant-design/pro-components/commit/399a1da0b)

### 🛠 其他

- 🛠 覆盖存在漏洞的传递依赖至已修补版本（开发依赖范围） [1e84af860](https://github.com/ant-design/pro-components/commit/1e84af860)
- 🛠 统一 esbuild 至 0.28+，消除开发服务器告警 [301644384](https://github.com/ant-design/pro-components/commit/301644384)

### ✅ 测试

- ✅ 新增 `loadingRender`、`fetchDataOnSearch`、原生 ellipsis、cell 级 `editableKeys` 回归测试
- ✅ 为 #8973、#9033、#9104、#9118、#9119、#9121、#9133、#9142 等已验证场景补充回归锁定
- ✅ 稳定可编辑表格与 layout mix 快照相关 flaky 用例 [943d09a83](https://github.com/ant-design/pro-components/commit/943d09a83)

## [3.1.15-1] - 2026-09-26

### 🐛 问题修复

- ProForm
  - 🐞 修复 LightFilter 折叠部分表单值未正确重置的问题 [2dc5c9a67](https://github.com/ant-design/pro-components/commit/2dc5c9a67)
  - 🐞 修复 LightFilter 输入过程中面板意外收起的问题 [#9649](https://github.com/ant-design/pro-components/pull/9649)
  - 🐞 修复 LightFilter 标签重复显示的问题 [#9695](https://github.com/ant-design/pro-components/pull/9695)
  - 🐞 修复 LightFilter 未生效 `ignoreRules` 的问题 [#9166](https://github.com/ant-design/pro-components/pull/9166)
  - 🐞 修复 hash 路由下查询参数同步错误的问题 [#8649](https://github.com/ant-design/pro-components/pull/8649)
  - 🐞 修复 QueryFilter 默认收起数量未生效的问题 [e42cc49d3](https://github.com/ant-design/pro-components/commit/e42cc49d3)
  - 🐞 修复 `onValuesChange` 中空值丢失的问题 [cbd1dff33](https://github.com/ant-design/pro-components/commit/cbd1dff33)
  - 🐞 修复 SchemaForm 嵌套日期字段元数据丢失的问题 [#9663](https://github.com/ant-design/pro-components/pull/9663)
  - 🐞 修复 SchemaForm 自定义字段绑定的类型错误 [#8615](https://github.com/ant-design/pro-components/pull/8615) [#8617](https://github.com/ant-design/pro-components/pull/8617)
  - 🐞 修复自定义字段递归渲染的问题 [#9676](https://github.com/ant-design/pro-components/pull/9676)
  - 🐞 修复 `formItemRender` 配置类型被丢失的问题 [#9676](https://github.com/ant-design/pro-components/pull/9676)
  - 🐞 修复初始值在 transform 前未转换的问题 [#8452](https://github.com/ant-design/pro-components/pull/8452)
  - 🐞 修复表单值被重复转换的问题 [#9285](https://github.com/ant-design/pro-components/pull/9285)
  - 🐞 修复 DrawerForm 支持原生 drawer 缩放 [#9675](https://github.com/ant-design/pro-components/pull/9675)
  - 🐞 修复隐藏提交按钮时提交流程错误的问题 [#8648](https://github.com/ant-design/pro-components/pull/8648)
  - 🐞 修复外部 `form` 实例请求值未刷新的问题 [#8352](https://github.com/ant-design/pro-components/pull/8352)
  - 🐞 修复组件重挂载后使用过期 form 实例的问题 [#9703](https://github.com/ant-design/pro-components/pull/9703)
  - 🐞 修复字段级 readonly 未覆盖表单 mode 的问题 [a8be297a1](https://github.com/ant-design/pro-components/commit/a8be297a1)
  - 🐞 修复字段级 layout 配置未生效的问题 [66356980c](https://github.com/ant-design/pro-components/commit/66356980c)
  - 🐞 修复 addon 字段灵活性受限的问题 [d1f385a2a](https://github.com/ant-design/pro-components/commit/d1f385a2a)
  - 🐞 修复默认 render 字段 props 被意外覆盖的问题 [4abf70ef6](https://github.com/ant-design/pro-components/commit/4abf70ef6)
  - 🐞 导出 ProForm group props 类型 [8e34e54c5](https://github.com/ant-design/pro-components/commit/8e34e54c5)
- ProTable
  - 🐞 修复「固定选择列 + 固定列」场景下表头勾选框被相邻固定列遮挡的问题 [23cd4b86e](https://github.com/ant-design/pro-components/commit/23cd4b86e)
  - 🐞 修复拖拽排序时滚动失控的问题 [d14d3814a](https://github.com/ant-design/pro-components/commit/d14d3814a)
  - 🐞 修复行内校验错误信息不可见的问题 [59c966cc8](https://github.com/ant-design/pro-components/commit/59c966cc8)
  - 🐞 修复离屏虚拟可编辑行未校验的问题 [#9553](https://github.com/ant-design/pro-components/pull/9553)
  - 🐞 修复已删除的可编辑行值残留的问题 [#9051](https://github.com/ant-design/pro-components/pull/9051)
  - 🐞 修复 ColumnSetting 拖拽后固定列丢失的问题 [#9687](https://github.com/ant-design/pro-components/pull/9687)
  - 🐞 修复 filterType 切换时搜索表单未替换的问题 [#9613](https://github.com/ant-design/pro-components/pull/9613)
  - 🐞 修复数据清空后缓存行未重置的问题 [#9203](https://github.com/ant-design/pro-components/pull/9203)
  - 🐞 修复表单更新后提交值不完整的问题 [#9236](https://github.com/ant-design/pro-components/pull/9236)
  - 🐞 修复单元格编辑器改动丢失的问题 [#8472](https://github.com/ant-design/pro-components/pull/8472)
  - 🐞 修复取消编辑时 form 行未移除的问题 [#8664](https://github.com/ant-design/pro-components/pull/8664)
  - 🐞 修复可编辑行按 rowKey 校验失败的问题 [#9280](https://github.com/ant-design/pro-components/pull/9280)
  - 🐞 修复操作列对齐方式未生效的问题 [#9701](https://github.com/ant-design/pro-components/pull/9701)
  - 🐞 修复密度切换触发器 ref 转发的问题 [#9699](https://github.com/ant-design/pro-components/pull/9699)
  - ⚡️ 优化可编辑表格全量重渲染的问题 [3ba9b4a3f](https://github.com/ant-design/pro-components/commit/3ba9b4a3f)
- Provider
  - 🛠 样式体系注入 `iconCls` token，并迁移全部写死的 `.anticon` 选择器，自定义 `ConfigProvider.iconPrefixCls` 时 ProComponents 样式可正确跟随 [308fe7a2e](https://github.com/ant-design/pro-components/commit/308fe7a2e)
- ProLayout
  - 🐞 修复侧边栏滚动条颜色未应用主题的问题 [bd097660f](https://github.com/ant-design/pro-components/commit/bd097660f)
  - 🐞 修复 ConfigProvider `hashed` 设置未继承的问题 [#8473](https://github.com/ant-design/pro-components/pull/8473)
  - 🐞 修复空移动端菜单触发器误显示的问题 [#7312](https://github.com/ant-design/pro-components/pull/7312)
  - 🐞 修复折叠菜单弹层未应用 token 的问题 [#8095](https://github.com/ant-design/pro-components/pull/8095)
  - 🐞 修复水印下 sticky 内容丢失的问题 [#9698](https://github.com/ant-design/pro-components/pull/9698)
  - 🐞 修复异步加载菜单未展开的问题 [#9697](https://github.com/ant-design/pro-components/pull/9697)
- ProField
  - 🐞 修复 percent 精度处理错误的问题 [#9549](https://github.com/ant-design/pro-components/pull/9549)
  - 🐞 修复长文本 readonly 换行的问题 [#8581](https://github.com/ant-design/pro-components/pull/8581)
  - 🐞 修复 textarea read 模式透传 showCount 的问题 [#8642](https://github.com/ant-design/pro-components/pull/8642)
  - 🐞 修复对象形式 showSearch 配置未生效的问题 [#9680](https://github.com/ant-design/pro-components/pull/9680)
  - 🐞 修复 LightFilter select 清空后值未清除的问题 [#9227](https://github.com/ant-design/pro-components/pull/9227)
- ProDescriptions
  - 🐞 修复可编辑字段未填满宽度的问题 [91970093b](https://github.com/ant-design/pro-components/commit/91970093b)
  - 🐞 修复 ellipsis 前值未格式化的问题 [0de4ddefb](https://github.com/ant-design/pro-components/commit/0de4ddefb)
- ProSelect
  - 🐞 修复 request 选项按 value 匹配错误的问题 [#9222](https://github.com/ant-design/pro-components/pull/9222)
  - 🐞 修复失焦时残留搜索值未隐藏的问题 [#9292](https://github.com/ant-design/pro-components/pull/9292)
- 其他
  - 🛠 修复声明产物中 src 导入路径未重写的问题 [#9017](https://github.com/ant-design/pro-components/pull/9017)

### ✅ 测试

- ✅ 新增固定选择列 z-index 回归测试 [23cd4b86e](https://github.com/ant-design/pro-components/commit/23cd4b86e)
- ✅ 修复可编辑表格用例与 fake timers 冲突导致的偶发失败，并补齐侧边栏滚动条类名快照 [38addfdb2](https://github.com/ant-design/pro-components/commit/38addfdb2)

## [3.1.14-7] - 2026-08-28

### 🐛 问题修复

- ProCard
  - 🐞 修复 actions 区域语义化 className/styles 未应用的问题 [#9693](https://github.com/ant-design/pro-components/pull/9693)
- ProDescriptions
  - 🐞 修复用户 styles 与内部默认样式合并被覆盖的问题 [#9692](https://github.com/ant-design/pro-components/pull/9692)
- 国际化
  - 🇺🇸🇨🇳 修复 zh-TW 语言包错别字 [#9691](https://github.com/ant-design/pro-components/pull/9691)
- 其他
  - 💄 应用 `fontWeightStrong` token 到 ProList meta 标题与可编辑文本

## [3.1.14-6] - 2026-07-29

### 🐛 问题修复

- ProTable
  - 🐞 修复提交的搜索字段未同步写入 URL 的问题，现已与 `syncToUrl` 行为对齐 [#9665](https://github.com/ant-design/pro-components/issues/9665) [#9674](https://github.com/ant-design/pro-components/pull/9674) [@pingfan](https://github.com/pingfan)

### ✅ 测试

- ✅ 新增 `syncToUrl` 搜索字段同步的回归测试，校验表单提交后 URL 参数正确更新

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
