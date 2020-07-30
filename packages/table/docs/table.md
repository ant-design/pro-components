---
title: 简介
order: 0
group:
  path: /table
nav:
  title: 表格
  path: /table
  order: 2
---

## 示例

<code src="../demos/single.tsx" />

# API

ProTable 在 antd 的 Table 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 antd Table 不同的 api。

## Table

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| request | 获取 `dataSource` 的方法 | `(params?: {pageSize: number;current: number;[key: string]: any;},sort,filter) => Promise<RequestData<T>>` | - |
| postData | 对通过 `request` 获取的数据进行处理 | `(data: T[]) => T[]` | - |
| defaultData | 默认的数据 | `T[]` | - |
| actionRef | Table action 的引用，便于自定义触发 | `React.MutableRefObject<ActionType>` \| `((actionRef: ActionType) => void)` | - |
| toolBarRender | 渲染工具栏，支持返回一个 dom 数组，会自动增加 margin-right | `(action: UseFetchDataAction<RequestData<T>>) => React.ReactNode[]` | - |
| onLoad | 数据加载完成后触发,会多次触发 | `(dataSource: T[]) => void` | - |
| onRequestError | 数据加载失败时触发 | `(e: Error) => void` | - |
| tableClassName | 封装的 table 的 className | string | - |
| tableStyle | 封装的 table 的 style | CSSProperties | - |
| options | table 工具栏，设为 false 时不显示 | `{{ fullScreen: boolean \| function, reload: boolean \| function,setting: true }}` | `{ fullScreen: true, reload:true, setting: true}` |
| search | 是否显示搜索表单，传入对象时为搜索表单的配置 | [search config](#search) | true |
| dateFormatter | 转化 moment 格式数据为特定类型，false 不做转化 | `"string"` \| `"number"` \| `false` | `"string"` |
| beforeSearchSubmit | 搜索之前进行一些修改 | `(params:T)=>T` | - |
| onSizeChange | table 尺寸发生改变 | `(size: 'default' \| 'middle' \| 'small' \| undefined) => void` | - |
| columnsStateMap | columns 的状态枚举 | `{[key: string]: { show:boolean, fixed: "right" \| "left"} }` | - |
| onColumnsStateChange | columns 状态发生改变 | `(props: {[key: string]: { show:boolean, fixed: "right" \| "left"} }) => void` | - |
| type | pro-table 类型 | `"form"` | - |
| form | antd form 的配置 | `FormProps` | - |
| onSubmit | 提交表单时触发 | `(params: U) => void` | - |
| onReset | 重置表单时触发 | `() => void` | - |
| columnEmptyText | 空值时的显示，不设置 则默认显示 `-` | `string \| false` | false |
| tableRender | 自定义渲染表格函数 | `(props: ProTableProps<T, U>, defaultDom: JSX.Element, domList: { toolbar: JSX.Element \| undefined; alert: JSX.Element \| undefined; table: JSX.Element \| undefined;}) => React.ReactNode` | - |
| tableExtraRender | 自定义表格的主体函数 | `(props: ProTableProps<T, U>, dataSource: T[]) => React.ReactNode;` | - |
| manualRequest | 是否需要手动触发首次请求, 配置为 `true` 时不可隐藏搜索表单 | `boolean` | false |

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

### actionRef

有时我们要手动触发 table 的 reload 等操作，可以使用 actionRef。

```tsx | pure
interface ActionType {
  reload: () => void;
  fetchMore: () => void;
  reset: () => void;
}

const ref = useRef<ActionType>();

<ProTable actionRef={ref} />;

// 刷新
ref.current.reload();

// 加载更多
ref.current.fetchMore();

// 重置到默认值
ref.current.reset();

// 清空选中项
ref.current.clearSelected();
```

## Columns

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 与 antd 中基本相同，但是支持通过传入一个方法 | `ReactNode \| ((config: ProColumnType<T>, type: ProTableTypes) => ReactNode)` | - |
| renderText | 类似 table 的 render，但是必须返回 string，如果只是希望转化枚举，可以使用 [valueEnum](#valueEnum) | `(text: any,record: T,index: number,action: UseFetchDataAction<RequestData<T>>) => string` | - |
| render | 类似 table 的 render，第一个参数变成了 dom,增加了第四个参数 action | `(text: React.ReactNode,record: T,index: number,action: UseFetchDataAction<RequestData<T>>) => React.ReactNode \| React.ReactNode[]` | - |
| ellipsis | 是否自动缩略 | boolean | - |
| copyable | 是否支持复制 | boolean | - |
| valueEnum | 值的枚举，会自动转化把值当成 key 来取出要显示的内容 | [valueEnum](#valueenum) | - |
| valueType | 值的类型 | `'money' \| 'option' \| 'date' \| 'dateTime' \| 'time' \| 'text'\| 'index' \| 'indexBorder'` | 'text' |
| hideInSearch | 在查询表单中不展示此项 | boolean | - |
| hideInTable | 在 Table 中不展示此列 | boolean | - |
| hideInForm | 在 Form 模式下 中不展示此列 | boolean | - |
| filters | 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成 | `boolean \| object[]` | false |
| order | 查询表单中的权重，权重大排序靠前 | number | - |
| renderFormItem | 渲染查询表单的输入组件 | `(item,props:{value,onChange}) => React.ReactNode` | - |
| formItemProps | 查询表单的 props，会透传给表单项 | `{ [prop: string]: any }` | - |

### valueType

现在支持的值如下

| 类型 | 描述 | 示例 |
| --- | --- | --- |
| money | 转化值为金额 | ¥10,000.26 |
| date | 日期 | 2019-11-16 |
| dateRange | 日期区间 | 2019-11-16 2019-11-18 |
| dateTime | 日期和时间 | 2019-11-16 12:50:00 |
| dateTimeRange | 日期和时间区间 | 2019-11-16 12:50:00 2019-11-18 12:50:00 |
| time | 时间 | 12:50:00 |
| option | 操作项，会自动增加 marginRight，只支持一个数组,表单中会自动忽略 | `[<a>操作a</a>,<a>操作b</a>]` |
| text | 默认值，不做任何处理 | - |
| textarea | 与 text 相同， form 转化时会转为 textarea 组件 | - |
| index | 序号列 | - |
| indexBorder | 带 border 的序号列 | - |
| progress | 进度条 | - |
| digit | [格式化](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)数字展示，form 转化时会转为 inputNumber | - |

### valueEnum

当前列值的枚举

```typescript | pure
interface IValueEnum {
  [key: string]:
    | React.ReactNode
    | {
        text: React.ReactNode;
        status: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
      };
}
```

## 批量操作

与 antd 相同，批量操作需要设置 `rowSelection` 来开启，与 antd 不同的是，pro-table 提供了一个 alert 用于承载一些信息。你可以通过 `tableAlertRender` 来对它进行自定义。设置或者返回 false 即可关闭。

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tableAlertRender | 渲染 alert，当配置 `rowSelection`打开。 | `(keys:string[],rows:T[]) => React.ReactNode[]` | `已选择 ${selectedRowKeys.length} 项` |
| rowSelection | 表格行是否可选择，[配置项](https://ant.design/components/table-cn/#rowSelection) | object | false |
| tableAlertOptionRender | 自定义渲染 alert 操作区，设为 false 则不显示 |  `(props: { intl: IntlType; onCleanSelected: () => void }) => React.ReactNode`| false |

