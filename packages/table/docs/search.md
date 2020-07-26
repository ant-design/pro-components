---
title: 表单
order: 8
group:
  path: /table
nav:
  title: ProTable
  path: /table
---

# Table 搜索

ProTable 会根据列来生成一个 Form，用于筛选列表数据，最后的值会根据通过 `request` 的第一个参数返回，看起来就像。

```jsx | pure
<ProTable request={(params,sort,filter)=>{ all params}}>
```

按照规范，table 的表单不需要任何的必选参数，所有点击搜索和重置都会触发 `request`来发起一次查询。

Form 的列是根据 `valueType` 来生成不同的类型。

> valueType 为 index indexBorder option 和没有 dataIndex 和 key 的列将会忽略。

| 类型 | 对应的组件 |
| --- | --- |
| text | [Input](https://ant.design/components/input-cn/) |
| textarea | [Input.TextArea](https://ant.design/components/input-cn/#components-input-demo-textarea) |
| date | [DatePicker](https://ant.design/components/date-picker-cn/) |
| dateTime | [DatePicker](https://ant.design/components/date-picker-cn/#components-date-picker-demo-time) |
| time | [TimePicker](https://ant.design/components/time-picker-cn/) |
| dateTimeRange | [RangePicker](https://ant.design/components/time-picker-cn/#components-time-picker-demo-range-picker) |
| dateRange | [RangePicker](https://ant.design/components/time-picker-cn/#components-time-picker-demo-range-picker) |
| money | [InputNumber](https://ant.design/components/input-number-cn/) |
| digit | [InputNumber](https://ant.design/components/input-number-cn/) |
| option | 不展示 |
| index | 不展示 |
| progress | 不展示 |

设置了 `valueEnum` 的列将会生成 Select,Select 会自动插入一个全部选项，并且默认选中，但是值为 `all` 在查询时会被丢弃。

## 相关 API

### ProTable

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onLoad | 数据加载完成后触发,会多次触发 | `(dataSource: T[]) => void` | - |
| onRequestError | 数据加载失败时触发 | `(e: Error) => void` | - |
| beforeSearchSubmit | 搜索之前进行一些修改 | `(params:T)=>T` | - |
| search | 是否显示搜索表单，传入对象时为搜索表单的配置 | `boolean \| { span?: number \| DefaultColConfig,searchText?: string, resetText?: string, collapseRender?: (collapsed: boolean) => React.ReactNode, collapsed:boolean, onCollapse: (collapsed:boolean)=> void }` | true |
| dateFormatter | moment 的格式化方式,默认会转化成 string | `"string" \| "number" \| false` | string |

### search

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| searchText | 查询按钮的文本 | string | 查询 |
| resetText | 重置按钮的文本 | string | 重置 |
| submitText | 提交按钮的文本 | string | 提交 |
| collapseRender | 收起按钮的 render | `(collapsed: boolean,showCollapseButton?: boolean,) => React.ReactNode` | - |
| collapsed | 是否收起 | boolean | - |
| onCollapse | 收起按钮的事件 | `(collapsed: boolean) => void;` | - |
| optionRender | 操作栏的 render | `(( searchConfig: Omit<SearchConfig, 'optionRender'>, props: Omit<FormOptionProps, 'searchConfig'>, ) => React.ReactNode) \| false;` | - |

### Columns

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| valueEnum | 值的枚举，会自动转化把值当成 key 来取出要显示的内容 | [valueEnum](#valueEnum) | - |
| valueType | 值的类型 | `'money' \| 'option' \| 'date' \| 'dateTime' \| 'time' \| 'text'\| 'index' \| 'indexBorder'` | 'text' |
| hideInSearch | 在查询表单中不展示此项 | boolean | - |
| hideInTable | 在 Table 中不展示此列 | boolean | - |
| showFilters | 开启该列的表头的筛选菜单项，配合 valueEnum 使用 | boolean | false |
| formItemProps | 查询表单的 props，会透传给表单项 | `{ [prop: string]: any }` | - |
| renderFormItem | 渲染查询表单的输入组件 | `(item,props:{value,onChange}) => React.ReactNode` | - |

## 自定义表单项

很多时候内置的表单项无法满足我们的基本需求，这时候我们就需要来自定义一下默认的组件，我们可以通过 `formItemProps` 和 `renderFormItem` 配合来使用。

`formItemProps` 可以把 props 透传，可以设置 select 的样式和多选等问题。

`renderFormItem` 可以完成重写渲染逻辑，传入 item 和 props 来进行渲染，需要注意的是我们必须要将 props 中的 `value` 和 `onChange` 必须要被赋值，否则 form 无法拿到参数。

```tsx | pure
renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
  if (type === 'form') {
    return null;
  }
  const status = form.getFieldValue('state');
  if (status !== 'open') {
    return <Input {...rest} placeholder="请输入" />;
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
      onChange?: (value: any) => void;
      onSelect?: (value: any) => void;
      type: ProTableTypes;
      defaultRender: (newItem: ProColumns<any>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => JSX.Element | false | null;
```

<code src="../demos/linkage_form.tsx" />

## 基本使用

<code src="../demos/search.tsx" />

## 操作栏

<code src="../demos/search_option.tsx" />
