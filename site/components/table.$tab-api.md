---
group: Table
title: Demos
order: 0
legacy: /table
---

## 代码演示

### 基础用法

<code src="../../demos/table/single.tsx" background="var(--main-bg-color)" title="查询表格"></code>

<code src="../../demos/table/normal.tsx" background="var(--main-bg-color)" title="无查询表单"></code>

`cardBordered` 控制表格卡片边框。

<code src="../../demos/table/card-bordered.tsx" background="var(--main-bg-color)" title="卡片边框"></code>

<code src="../../demos/table/data-source.tsx" background="var(--main-bg-color)" title="使用 dataSource"></code>

<code src="../../demos/table/no-title.tsx" id="no-title-table" background="var(--main-bg-color)" title="无 ToolBar 的表格"></code>

### 搜索栏类型切换

通过 Segmented 切换 `search.filterType`，在查询表单（query）和轻量筛选（light）之间一键切换。

<code src="../../demos/table/enum-filter-type.tsx" background="var(--main-bg-color)" title="搜索栏类型切换"></code>

### 搜索与筛选

<code src="../../demos/table/no-option.tsx" background="var(--main-bg-color)" title="查询（无按钮）表格"></code>

<code src="../../demos/table/light-filter.tsx" background="var(--main-bg-color)" title="轻量筛选替换查询表单"></code>

`options.search=true` 显示工具栏搜索框，`request` 使用收到的 `keyWords` 过滤服务名称。

<code src="../../demos/table/search.tsx" background="var(--main-bg-color)" title="keyWords：工具栏关键词搜索"></code>

<code src="../../demos/table/search-option.tsx" background="var(--main-bg-color)" title="搜索选项自定义"></code>

`form.ignoreRules=false` 会执行查询项的必填规则。清空任务名称后查询，可看到校验提示。

<code src="../../demos/table/open-rules.tsx" background="var(--main-bg-color)" title="ignoreRules=false：校验查询项"></code>

默认查询表单忽略列上的必填规则，空值也能查询。

<code src="../../demos/table/open-rules-default.tsx" background="var(--main-bg-color)" title="ignoreRules 默认行为"></code>

尽量使用 initialValue 来解决问题，必填项挫败感比较强。

### 搜索表单自定义

当内置的表单项无法满足我们的基本需求，这时候我们就需要来自定义一下默认的组件，我们可以通过 `fieldProps` 和 `formItemRender` 配合来使用。

`fieldProps` 可以把 props 透传，可以设置 select 的样式和多选等问题。

`formItemRender` 可以完成重写渲染逻辑，传入 item 和 props 来进行渲染，需要注意的是我们必须要将 props 中的 `value` 和 `onChange` 必须要被赋值，否则 form 无法拿到参数。如果你需要自定义需要先了解 antd 表单的[工作原理](https://ant.design/components/form-cn/#Form.Item)。

```tsx | pure
formItemRender: (
  _,
  { type, defaultRender, formItemProps, fieldProps, ...rest },
  form,
) => {
  if (type === 'form') {
    return null;
  }
  const status = form.getFieldValue('state');
  if (status !== 'open') {
    return (
      // value 和 onchange 会通过 form 自动注入。
      <Input
        // 组件的配置
        {...fieldProps}
        // 自定义配置
        placeholder="请输入test"
      />
    );
  }
  return defaultRender(_);
};
```

`formItemRender` 的定义，具体的值可以打开控制台查看。

```tsx | pure
 formItemRender?: (
    item: ProColumns<T>,
    config: {
      value?: any;
      onSelect?: (value: any) => void;
      type: ProTableTypes;
      defaultRender: (newItem: ProColumns<any>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => JSX.Element | false | null;
```

> 实际类型定义见 `ProSchema['formItemRender']`：第三个参数为 `FormInstance`，还支持第四个参数 `action`（编辑工具方法集合，可编辑表格场景使用）。

`columns.formItemRender` 根据“查询周期”生成月、周或自定义输入；提交后显示查询参数。

<code src="../../demos/table/linkage-form.tsx" background="var(--main-bg-color)" title="搜索字段联动"></code>

`formRef.current.setFieldsValue` 给搜索框赋值；点击表格自带的“查询”后可看到筛选结果。

<code src="../../demos/table/form.tsx" background="var(--main-bg-color)" title="formRef：设置搜索值"></code>

`formRef.current.submit()` 从表格外的按钮提交搜索表单。

<code src="../../demos/table/form-ref-submit.tsx" background="var(--main-bg-color)" title="formRef：外部提交查询"></code>

#### 为什么不能自己设置 value 和 onchange

被 ProTable 包装的控件，表单控件会自动添加 value（或 valuePropName 指定的其他属性） onChange（或 trigger 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

- 你不再需要也不应该用 onChange 来做数据收集同步（你可以使用 Form 的 onValuesChange），但还是可以继续监听 onChange 事件。

- 你不能用控件的 value 或 defaultValue 等属性来设置表单域的值，默认值可以用 Form 里的 initialValues 来设置。注意 initialValues 不能被 setState 动态更新，你需要用 setFieldsValue 来更新。

- 你不应该用 setState，可以使用 form.setFieldsValue 来动态改变表单值。

#### 为什么设置 defaultValue 不生效？

因为 ProTable 子组件会转为受控模式。因而 defaultValue 不会生效。你需要在 Form 上通过 initialValues 设置默认值。

### 表格功能

<code src="../../demos/table/cursor-pagination.tsx" background="var(--main-bg-color)" title="游标分页"></code>

<code src="../../demos/table/batch-option.tsx" background="var(--main-bg-color)" title="表格批量操作"></code>

`virtual` 配合 `scroll.y` 只渲染可视区域的行，适合大量本地数据。

<code src="../../demos/table/virtual.tsx" background="var(--main-bg-color)" title="虚拟滚动：virtual"></code>

<code src="../../demos/table/table-nested.tsx" background="var(--main-bg-color)" title="嵌套表格"></code>

`rowSelection.fixed="start"` 将选择列固定在左侧；横向滚动时，勾选表头或单行并查看已选 ID。

<code src="../../demos/table/fixed-selection-column.tsx" background="var(--main-bg-color)" title="rowSelection.fixed：固定选择列"></code>

`onRow` 选择服务器，右侧表格随当前服务器更新；窄屏下两块内容上下排列。

<code src="../../demos/table/split.tsx" background="var(--main-bg-color)" title="左右结构"></code>

`polling={2000}` 每两秒重新请求一次；观察请求次数，再点击按钮停止或恢复轮询。

<code src="../../demos/table/polling.tsx" background="var(--main-bg-color)" title="polling：启动和停止轮询"></code>

`dateFormatter` 控制日期筛选值传给 `request` 时的格式。每个示例下方显示实际收到的值，修改部署日期后点击查询即可对比。

<code src="../../demos/table/date-formatter.tsx" background="var(--main-bg-color)" title="dateFormatter：字符串"></code>

<code src="../../demos/table/date-formatter-number.tsx" background="var(--main-bg-color)" title="dateFormatter：毫秒时间戳"></code>

<code src="../../demos/table/date-formatter-custom.tsx" background="var(--main-bg-color)" title="dateFormatter：自定义函数"></code>

### Toolbar 自定义

使用 `toolbar` 属性扩展配置工具栏渲染。

<code src="../../demos/table/list-toolbar.tsx" background="var(--main-bg-color)" title="工具栏筛选：toolbar.filter"></code>

`tableRender` 在表格主体左侧加入菜单；切换菜单会筛选当前服务。

<code src="../../demos/table/render-table.tsx" background="var(--main-bg-color)" title="表格主体自定义"></code>

`tableExtraRender` 在表格上方显示当前数据的摘要。

<code src="../../demos/table/table-extra-render.tsx" background="var(--main-bg-color)" title="表格数据摘要"></code>

### 卡片表格

有些业务有自己的定制逻辑，可以不完全遵循 ProTable 的设计规则，但可以利用 ProTable 的 API 实现：例如通过 `cardProps.title`（或 `cardProps` 其他字段）配置卡片标题区域，通过 `headerTitle` 在左上角放置主按钮等操作区（见示例）。

<code src="../../demos/table/card-title.tsx" background="var(--main-bg-color)" desc="使用卡片标题，行动点在左侧。"></code>

### 无搜索表格

关闭搜索栏时，只要存在 `options`（刷新、列设置等），表格仍会使用卡片包裹。

<code src="../../demos/table/no-search.tsx" background="var(--main-bg-color)" desc="search={false} 时保留 options 工具栏。"></code>

### 值类型示例

#### valueType - 日期类

<code src="../../demos/table/value-types/date.tsx" title="valueType: date — 日期"></code>
<code src="../../demos/table/value-types/date-time.tsx" title="valueType: dateTime — 日期时间"></code>
<code src="../../demos/table/value-types/time.tsx" title="valueType: time — 时间"></code>
<code src="../../demos/table/value-types/from-now.tsx" title="valueType: fromNow — 相对时间"></code>
<code src="../../demos/table/value-types/date-range.tsx" title="valueType: dateRange — 日期区间"></code>
<code src="../../demos/table/value-types/date-time-range.tsx" title="valueType: dateTimeRange — 日期时间区间"></code>

#### valueType - 数字类

<code src="../../demos/table/value-types/money.tsx" title="valueType: money — 金额"></code>
<code src="../../demos/table/value-types/digit.tsx" title="valueType: digit — 请求数"></code>
<code src="../../demos/table/value-types/second.tsx" title="valueType: second — 响应时间"></code>
<code src="../../demos/table/value-types/percent.tsx" title="valueType: percent — 完成率"></code>
<code src="../../demos/table/value-types/progress.tsx" title="valueType: progress — 部署进度"></code>
<code src="../../demos/table/value-types/progress-status.tsx" title="动态状态：valueType(row).status"></code>

#### valueType - 样式类

<code src="../../demos/table/value-types/index.tsx" title="valueType: index — index"></code>
<code src="../../demos/table/value-types/index-border.tsx" title="valueType: indexBorder — index-border"></code>
<code src="../../demos/table/value-types/code.tsx" title="valueType: code — 代码"></code>
<code src="../../demos/table/value-types/avatar.tsx" title="valueType: avatar — avatar"></code>
<code src="../../demos/table/value-types/image.tsx" title="valueType: image — image"></code>
<code src="../../demos/table/value-types/option.tsx" title="操作列：valueType option"></code>

#### valueType - 选择类

<code src="../../demos/table/value-types/select.tsx" title="valueType: select — 状态"></code>
<code src="../../demos/table/value-types/radio.tsx" title="valueType: radio — 状态"></code>
<code src="../../demos/table/value-types/radio-button.tsx" title="valueType: radioButton — 状态"></code>
<code src="../../demos/table/value-types/checkbox.tsx" title="valueType: checkbox — 服务标签"></code>
<code src="../../demos/table/value-types/cascader.tsx" title="valueType: cascader — 技术栈"></code>
<code src="../../demos/table/value-types/tree-select.tsx" title="valueType: treeSelect — 所属部门"></code>

#### 自定义 valueType

`ProProvider.valueTypeMap.priority` 用 `render` 显示优先级标签，用 `formItemRender` 提供行编辑时的下拉框。点击“编辑”修改并保存，表格会显示新值。

<code src="../../demos/table/customization-value-type.tsx" title="自定义可编辑优先级" background="var(--main-bg-color)"></code>

### 国际化相关的配置

ProTable 内置国际化相关文案。下面是 **可被 `createIntl` 合并覆盖** 的文案结构示意；下方示例通过 antd `ConfigProvider.locale` 切换中文、英文和日文，观察搜索按钮文案的变化。

```typescript | pure
/** ProTable / 工具栏等区域会用到的文案 key，仅供结构参考 */
export const proTableIntlShape = {
  tableForm: {
    search: 'Query',
    reset: 'Reset',
    submit: 'Submit',
    collapsed: 'Expand',
    expand: 'Collapse',
    inputPlaceholder: 'Please enter',
    selectPlaceholder: 'Please select',
  },
  alert: { clear: 'Clear' },
  tableToolBar: {
    leftPin: 'Pin to left',
    rightPin: 'Pin to right',
    noPin: 'Unpinned',
    leftFixedTitle: 'Fixed the left',
    rightFixedTitle: 'Fixed the right',
    noFixedTitle: 'Not Fixed',
    reset: 'Reset',
    columnDisplay: 'Column Display',
    columnSetting: 'Settings',
    fullScreen: 'Full Screen',
    exitFullScreen: 'Exit Full Screen',
    reload: 'Refresh',
    density: 'Density',
    densityDefault: 'Default',
    densityLarger: 'Larger',
    densityMiddle: 'Middle',
    densitySmall: 'Compact',
  },
};
```

<code src="../../demos/table/intl.tsx" background="var(--main-bg-color)" title="ConfigProvider.locale：切换表格语言"></code>

### RTL (النسخة العربية)

RTL means right-to-left.

<code src="../../demos/table/rtl-table.tsx" background="var(--main-bg-color)"></code>

### 主题

`ConfigProvider.theme.algorithm` 可以分别应用暗色和紧凑算法。

<code src="../../demos/table/theme.tsx" iframe="400" title="暗色主题"></code>

<code src="../../demos/table/theme-compact.tsx" iframe="400" title="紧凑主题"></code>

### 自定义错误边界

点击“触发渲染错误”查看 `ErrorBoundary={CustomBoundary}` 提供的兜底界面，再点击“重置表格”恢复。

<code src="../../demos/table/error-boundaries.tsx" title="ErrorBoundary：自定义错误提示" background="var(--main-bg-color)" iframe="572"></code>

<code src="../../demos/table/error-boundaries-false.tsx" title="取消自定义错误边界" iframe="462"></code>

### ConfigProvider 前缀

`ConfigProvider.prefixCls` 为 ProTable 及其内部 antd 组件设置类名前缀。

<code src="../../demos/table/config-provider.tsx" title="自定义类名前缀"></code>

<code src="../../demos/table/_single-test.tsx" debug background="var(--main-bg-color)"></code>

### 其它示例

列状态受控与动态列、自定义列设置图标、基于 `search` 配置的内容类搜索项（contentWords）等。

<code src="../../demos/table/dynamic-columns-state.tsx" background="var(--main-bg-color)" title="列状态 columnsState"></code>

<code src="../../demos/table/columns-setting-custom-icon.tsx" background="var(--main-bg-color)" title="自定义列设置图标"></code>

<code src="../../demos/table/content-words-item.tsx" background="var(--main-bg-color)" title="内容类查询项"></code>

## 列表工具栏

用于自定义表格的工具栏部分。

### 代码演示

<code src="../../demos/table/list-toolbar/basic.tsx" background="var(--main-bg-color)" title="工具栏标题：toolbar.title / subTitle"></code>

<code src="../../demos/table/list-toolbar/no-title.tsx" id="listToolBar-no-title" background="var(--main-bg-color)" title="无标题搜索：toolbar.search" desc="没有标题时，搜索框放在工具栏前方。"></code>

<code src="../../demos/table/list-toolbar/multiple-line.tsx" background="var(--main-bg-color)" title="双行布局：toolbar.multipleLine"></code>

<code src="../../demos/table/list-toolbar/tabs.tsx" background="var(--main-bg-color)" title="标签：toolbar.tabs" desc="标签配合 `multipleLine: true` 使用。"></code>

<code src="../../demos/table/list-toolbar/menu.tsx" background="var(--main-bg-color)" title="菜单：toolbar.menu"></code>

#### ProForm 内 EditableProTable（列校验）

<code src="../../demos/table/edit-table-rules.tsx" background="var(--main-bg-color)" title="ProForm 内可编辑表格与列校验" debug></code>
