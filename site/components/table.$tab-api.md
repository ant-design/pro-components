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

<code src="../../demos/table/card-bordered.tsx" background="var(--main-bg-color)" title="卡片边框"></code>

<code src="../../demos/table/data-source.tsx" background="var(--main-bg-color)" title="使用 DataSource" debug></code>

<code src="../../demos/table/no-title.tsx" id="no-title-table" background="var(--main-bg-color)" title="无 ToolBar 的表格"></code>

### 搜索栏类型切换

通过 Segmented 切换 `search.filterType`，在查询表单（query）和轻量筛选（light）之间一键切换。

<code src="../../demos/table/enum-filter-type.tsx" background="var(--main-bg-color)" title="搜索栏类型切换"></code>

### 搜索与筛选

<code src="../../demos/table/no-option.tsx" background="var(--main-bg-color)" title="查询（无按钮）表格"></code>

<code src="../../demos/table/light-filter.tsx" background="var(--main-bg-color)" title="轻量筛选替换查询表单"></code>

<code src="../../demos/table/search.tsx" background="var(--main-bg-color)" title="使用自带 keyWords 搜索的 table"></code>

<code src="../../demos/table/search-option.tsx" background="var(--main-bg-color)" title="搜索选项自定义"></code>

<code src="../../demos/table/open-rules.tsx" background="var(--main-bg-color)" title="必填的查询表单"></code>

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

<code src="../../demos/table/linkage-form.tsx" background="var(--main-bg-color)" title="动态联动搜索栏"></code>

<code src="../../demos/table/form.tsx" background="var(--main-bg-color)" title="通过 formRef 来操作查询表单"></code>

#### 为什么不能自己设置 value 和 onchange

被 ProTable 包装的控件，表单控件会自动添加 value（或 valuePropName 指定的其他属性） onChange（或 trigger 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

- 你不再需要也不应该用 onChange 来做数据收集同步（你可以使用 Form 的 onValuesChange），但还是可以继续监听 onChange 事件。

- 你不能用控件的 value 或 defaultValue 等属性来设置表单域的值，默认值可以用 Form 里的 initialValues 来设置。注意 initialValues 不能被 setState 动态更新，你需要用 setFieldsValue 来更新。

- 你不应该用 setState，可以使用 form.setFieldsValue 来动态改变表单值。

#### 为什么设置 defaultValue 不生效？

因为 ProTable 子组件会转为受控模式。因而 defaultValue 不会生效。你需要在 Form 上通过 initialValues 设置默认值。

### 表格功能

<code src="../../demos/table/batch-option.tsx" background="var(--main-bg-color)" title="表格批量操作"></code>

<code src="../../demos/table/table-nested.tsx" background="var(--main-bg-color)" title="嵌套表格"></code>

<code src="../../demos/table/split.tsx" background="var(--main-bg-color)" title="左右结构"></code>

<code src="../../demos/table/polling.tsx" background="var(--main-bg-color)" title="表格轮询"></code>

<code src="../../demos/table/date-formatter.tsx" background="var(--main-bg-color)" title="dateFormatter - 日期格式化"></code>

### Toolbar 自定义

使用 `toolbar` 属性扩展配置工具栏渲染。

<code src="../../demos/table/list-toolbar.tsx" background="var(--main-bg-color)" title="Toolbar 自定义"></code>

<code src="../../demos/table/render-table.tsx" background="var(--main-bg-color)" title="表格主体自定义"></code>

### 卡片表格

有些业务有自己的定制逻辑，可以不完全遵循 ProTable 的设计规则，但可以利用 ProTable 的 API 实现：例如通过 `cardProps.title`（或 `cardProps` 其他字段）配置卡片标题区域，通过 `headerTitle` 在左上角放置主按钮等操作区（见示例）。

<code src="../../demos/table/card-title.tsx" background="var(--main-bg-color)" desc="使用卡片标题，行动点在左侧。"></code>

### 无搜索表格

关闭搜索栏时，只要存在 `options`（刷新、列设置等），表格仍会使用卡片包裹。

<code src="../../demos/table/no-search.tsx" background="var(--main-bg-color)" desc="search={false} 时保留 options 工具栏。"></code>

### 值类型示例

#### valueType - 日期类

<code src="../../demos/table/value-type-date.tsx" background="var(--main-bg-color)"></code>

#### valueType - 数字类

<code src="../../demos/table/value-type-number.tsx" background="var(--main-bg-color)"></code>

#### valueType - 样式类

<code src="../../demos/table/value-type.tsx" background="var(--main-bg-color)"></code>

#### valueType - 选择类

<code src="../../demos/table/value-type-select.tsx" background="var(--main-bg-color)"></code>

#### 自定义 valueType

<code src="../../demos/table/customization-value-type.tsx" background="var(--main-bg-color)"></code>

### 国际化相关的配置

ProTable 内置国际化相关文案。下面是 **可被 `createIntl` 合并覆盖** 的文案结构示意；与 antd `ConfigProvider` 的 `locale` 配合的完整切换方式，请直接参考下方 `intl.tsx` 示例。

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

<code src="../../demos/table/intl.tsx" background="var(--main-bg-color)" title="国际化相关的配置"></code>

### RTL (النسخة العربية)

RTL means right-to-left.

<code src="../../demos/table/rtl-table.tsx" background="var(--main-bg-color)"></code>

### 主题

<code src="../../demos/table/theme.tsx" background="var(--main-bg-color)" iframe="550" title="黑色主题 / 紧凑主题"></code>

### 自定义错误边界

<code src="../../demos/table/error-boundaries.tsx" background="var(--main-bg-color)" iframe="572"></code>

<code src="../../demos/table/error-boundaries-false.tsx" title="取消自定义错误边界" iframe="462"></code>

<code src="../../demos/table/config-provider.tsx" debug background="var(--main-bg-color)"></code>

<code src="../../demos/table/_single-test.tsx" debug background="var(--main-bg-color)"></code>

### 其它示例

列状态受控与动态列、自定义列设置图标、基于 `hideInSearch` 的内容类搜索项（contentWords）等。

<code src="../../demos/table/dynamic-columns-state.tsx" background="var(--main-bg-color)" title="列状态 columnsState"></code>

<code src="../../demos/table/columns-setting-custom-icon.tsx" background="var(--main-bg-color)" title="自定义列设置图标"></code>

<code src="../../demos/table/content-words-item.tsx" background="var(--main-bg-color)" title="内容类查询项"></code>

## 列表工具栏

用于自定义表格的工具栏部分。

### 代码演示

<code src="../../demos/table/list-toolbar/basic.tsx" background="var(--main-bg-color)" title="列表工具栏-基本使用"></code>

<code src="../../demos/table/list-toolbar/no-title.tsx" id="listToolBar-no-title" background="var(--main-bg-color)" title="无标题" desc="列表工具栏-没有标题的情况下搜索框会前置。"></code>

<code src="../../demos/table/list-toolbar/multiple-line.tsx" background="var(--main-bg-color)" title="双行布局" desc="列表工具栏-双行的情况下会有双行的布局形式。"></code>

<code src="../../demos/table/list-toolbar/tabs.tsx" background="var(--main-bg-color)" title="带标签" desc="列表工具栏-标签需配合 `multipleLine` 为 `true` 时使用。"></code>

<code src="../../demos/table/list-toolbar/menu.tsx" background="var(--main-bg-color)" title="列表工具栏-标题下拉菜单"></code>

#### ProForm 内 EditableProTable（列校验）

<code src="../../demos/table/edit-table-rules.tsx" background="var(--main-bg-color)" title="ProForm 内可编辑表格与列校验" debug></code>
