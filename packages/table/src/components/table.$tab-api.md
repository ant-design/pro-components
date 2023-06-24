---
title: Demos
order: 0
legacy: /table
---

## 代码演示

## 查询表格

<code src="../demos/single.tsx"  background="var(--main-bg-color)" title="查询表格"></code>

<code src="../demos/theme.tsx" background="var(--main-bg-color)" iframe="550" title="黑色主紧凑主题"></code>

<code src="../demos/single-test.tsx" debug background="var(--main-bg-color)" ></code>

<code src="../demos/no-option.tsx"  background="var(--main-bg-color)" title="查询（无按钮）表格"></code>

<code src="../demos/dataSource.tsx"  background="var(--main-bg-color)" title="使用 DataSource" ></code>

<code src="../demos/normal.tsx"  background="var(--main-bg-color)" title="无查询表单"></code>

<code src="../demos/lightfilter.tsx"  background="var(--main-bg-color)" title="轻量筛选替换查询表单"></code>

<code src="../demos/no-title.tsx"  background="var(--main-bg-color)" title="无 ToolBar 的表格"></code>

## 必填的查询表单

尽量使用 initialValue 来解决问题，必填项挫败感比较强

<code src="../demos/open-rules.tsx"  background="var(--main-bg-color)" ></code>

<code src="../demos/table-nested.tsx"  background="var(--main-bg-color)" title="嵌套表格"></code>

<code src="../demos/split.tsx"  background="var(--main-bg-color)" title="左右结构"></code>

<code src="../demos/batchOption.tsx"  background="var(--main-bg-color)" title="表格批量操作"></code>

<code src="../demos/form.tsx"  background="var(--main-bg-color)" title="通过 formRef 来操作查询表单"></code>

## RTL (النسخة العربية)

RTL means right-to-left.

<code src="../demos/rtl_table.tsx"  background="var(--main-bg-color)" ></code>

## 受控的表格设置栏

可以默认隐藏某些栏，但是在操作栏中可以选择

<code src="../demos/columnsStateMap.tsx"  background="var(--main-bg-color)" ></code>

<code src="../demos/pollinga.tsx"  background="var(--main-bg-color)" title="表格轮询"></code>

<code src="../demos/dateFormatter.tsx"  background="var(--main-bg-color)" title="dateFormatter-日期格式化"></code>

## 搜索表单自定义

当内置的表单项无法满足我们的基本需求，这时候我们就需要来自定义一下默认的组件，我们可以通过 `fieldProps` 和 `renderFormItem` 配合来使用。

`fieldProps` 可以把 props 透传，可以设置 select 的样式和多选等问题。

`renderFormItem` 可以完成重写渲染逻辑，传入 item 和 props 来进行渲染，需要注意的是我们必须要将 props 中的 `value` 和 `onChange` 必须要被赋值，否则 form 无法拿到参数。如果你需要自定义需要先了解 antd 表单的[工作原理](https://ant.design/components/form-cn/#Form.Item)。

```tsx | pure
renderFormItem: (
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

`renderFormItem` 的定义, 具体的值可以打开控制台查看。

```tsx | pure
 renderFormItem?: (
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

<code src="../demos/linkage_form.tsx"  background="var(--main-bg-color)" ></code>

### FAQ

### 为什么不能自己设置 value 和 onchange

被 ProTable 包装的控件，表单控件会自动添加 value（或 valuePropName 指定的其他属性） onChange（或 trigger 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

- 你不再需要也不应该用 onChange 来做数据收集同步（你可以使用 Form 的 onValuesChange），但还是可以继续监听 onChange 事件。

- 你不能用控件的 value 或 defaultValue 等属性来设置表单域的值，默认值可以用 Form 里的 initialValues 来设置。注意 initialValues 不能被 setState 动态更新，你需要用 setFieldsValue 来更新。

- 你不应该用 setState，可以使用 form.setFieldsValue 来动态改变表单值。

#### 为什么设置 defaultValue 不生效？#

因为 ProTable 子组件会转为受控模式。因而 defaultValue 不会生效。你需要在 Form 上通过 initialValues 设置默认值。

<code src="../demos/search_option.tsx"  background="var(--main-bg-color)" ></code>

## Toolbar 自定义

使用 `toolbar`属性扩展配置工具栏渲染。

<code src="../demos/listToolBar.tsx"  background="var(--main-bg-color)" ></code>

<code src="../demos/renderTable.tsx"  background="var(--main-bg-color)" title="表格主体自定义"></code>

## 卡片表格

有些业务有自己的定制逻辑，可以不完全遵循 ProTable 的设计规则，但可以利用 ProTable 的 API 实现。如通过 `cardProps` 配置卡片属性，通过 `headTitle` 配置行动点在左侧。

<code src="../demos/card-title.tsx" background="var(--main-bg-color)" title="卡片表格" desc="使用卡片标题，行动点在左侧。"></code>

## 国际化相关的配置

ProTable 内置了国际化的支持，作为一个文本量比较少的组件，我们可以自行实现国际化，成本也很低。

这里是全量的文本

```typescript | pure
const enLocale = {
  tableForm: {
    search: 'Query',
    reset: 'Reset',
    submit: 'Submit',
    collapsed: 'Expand',
    expand: 'Collapse',
    inputPlaceholder: 'Please enter',
    selectPlaceholder: 'Please select',
  },
  alert: {
    clear: 'Clear',
  },
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

// 生成 intl 对象
const enUSIntl = createIntl('en_US', enUS);
import { ConfigProvider } from '@ant-design/pro-provide';

// 使用
<ConfigProvider
  value={{
    intl: enUSIntl,
  }}
>
  <ProTable />
</ConfigProvider>;
```

<code src="../demos/intl.tsx"  background="var(--main-bg-color)" title="国际化相关的配置"></code>

<code src="../demos/search.tsx"  background="var(--main-bg-color)" title="使用自带 keyWords 搜索的 table"></code>

## 值类型示例

### valueType - 日期类

<code src="../demos/valueTypeDate.tsx"  background="var(--main-bg-color)" ></code>

### valueType - 数字类

<code src="../demos/valueTypeNumber.tsx"  background="var(--main-bg-color)" ></code>

### valueType - 样式类

<code src="../demos/valueType.tsx"  background="var(--main-bg-color)" ></code>

### valueType - 选择类

<code src="../demos/valueType_select.tsx"  background="var(--main-bg-color)" ></code>

### 自定义 valueType

<code src="../demos/customization-value-type.tsx"  background="var(--main-bg-color)" ></code>

## 自定义错误边界

<code src="../demos/error-boundaries.tsx"  background="var(--main-bg-color)" iframe="572"></code>

<code src="../demos/error-boundaries-false.tsx" title="取消自定义错误边界" iframe="462"></code>

<code src="../demos/config-provider.tsx" debug  background="var(--main-bg-color)" ></code>

## 列表工具栏

用于自定义表格的工具栏部分。

### 代码演示

<code src="../demos/ListToolBar/basic.tsx" background="var(--main-bg-color)" title="列表工具栏-基本使用"></code>

<code src="../demos/ListToolBar/no-title.tsx" background="var(--main-bg-color)" title="无标题" desc="列表工具栏-没有标题的情况下搜索框会前置。"></code>

<code src="../demos/ListToolBar/multipleLine.tsx" background="var(--main-bg-color)" title="双行布局" desc="列表工具栏-双行的情况下会有双行的布局形式。"></code>

<code src="../demos/ListToolBar/tabs.tsx" background="var(--main-bg-color)" title="带标签" desc="列表工具栏-标签需配合 `multipleLine` 为 `true` 时使用。"></code>

<code src="../demos/ListToolBar/menu.tsx" background="var(--main-bg-color)" title="列表工具栏-标题下拉菜单"></code>

#### TableDropdown

<code src="../demos/edittable-rules.tsx" background="var(--main-bg-color)" title="列表工具栏-标题下拉菜单" debug></code>
