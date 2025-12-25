---
nav:
  title: Table
group: Table
title: ProTable - 高级表格
order: 0
legacy: /table
atomId: ProTable
---

# ProTable - 高级表格

ProTable 的诞生是为了解决项目中需要写很多 table 的样板代码的问题，所以在其中封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑。

依托于 ProForm 的能力，ProForm 拥有多种形态，可以切换查询表单类型，设置变形成为一个简单的 Form 表单，执行新建等功能。

![layout
](https://gw.alipayobjects.com/zos/antfincdn/Hw%26ryTueTW/bianzu%2525204.png)

若您是内网用户，欢迎使用我们的 [TechUI Studio](https://techui-studio.antfin-inc.com/) 可视化配置生成初始代码。

## 何时使用

当你的表格需要与服务端进行交互或者需要多种单元格样式时，ProTable 是不二选择。

## API

ProTable 在 antd 的 Table 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 antd Table 不同的 API。

### request

`request` 是 ProTable 最重要的 API，`request` 会接收一个对象。对象中必须要有 `data` 和 `success`，如果需要手动分页 `total` 也是必需的。`request` 会接管 `loading` 的设置，同时在查询表单查询时和 `params` 参数发生修改时重新执行。同时查询表单的值和 `params` 参数也会带入。以下是一个例子：

```tsx | pure
<ProTable<DataType, Params>
  // params 是需要自带的参数
  // 这个参数优先级更高，会覆盖查询表单的参数
  params={params}
  request={async (
    // 第一个参数 params 查询表单和 params 参数的结合
    // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
    params: T & {
      pageSize: number;
      current: number;
    },
    sort,
    filter,
  ) => {
    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
    // 如果需要转化参数可以在这里进行修改
    const msg = await myQuery({
      page: params.current,
      pageSize: params.pageSize,
    });
    return {
      data: msg.result,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: boolean,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: number,
    };
  }}
/>
```

列配置中也支持 `request`，但是只有几种 [valueType](/components/schema#valuetype) 支持。

### ProTable

| 属性               | 描述                                                                                               | 类型                                                                                                                                                                                                                     | 默认值                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| columns            | 列配置能力，支持一个数组                                                                           | `ProColumns<T, ValueType>[]`                                                                                                                                                                                             | -                                                                   |
| request            | 获取 `dataSource` 的方法                                                                           | `(params: U & {pageSize?: number, current?: number, keyword?: string}, sort: Record<string, SortOrder>, filter: Record<string, FilterValue>) => Promise<{data: T[], success?: boolean, total?: number}>`                 | -                                                                   |
| params             | 用于 `request` 查询的额外参数，一旦变化会触发重新加载                                              | `U`                                                                                                                                                                                                                      | -                                                                   |
| polling            | 是否轮询，polling 表示轮询的时间间隔，0 表示关闭轮询，大于 0 表示开启轮询，最小的轮询时间为 2000ms | `number \| ((dataSource: T[]) => number) \| undefined`                                                                                                                                                                   | -                                                                   |
| postData           | 对通过 `request` 获取的数据进行处理                                                                | `(data: T[]) => T[]`                                                                                                                                                                                                     | -                                                                   |
| defaultData        | 默认的数据                                                                                         | `T[]`                                                                                                                                                                                                                    | -                                                                   |
| dataSource         | Table 的数据，ProTable 推荐使用 `request` 来加载                                                   | `T[]`                                                                                                                                                                                                                    | -                                                                   |
| onDataSourceChange | Table 的数据发生改变时触发                                                                         | `(dataSource: T[]) => void`                                                                                                                                                                                              | -                                                                   |
| actionRef          | Table action 的引用，便于自定义触发                                                                | `React.Ref<ActionType \| undefined>`                                                                                                                                                                                     | -                                                                   |
| formRef            | 可以获取到查询表单的 form 实例，用于一些灵活的配置                                                 | `TableFormItem<T>['formRef']`                                                                                                                                                                                            | -                                                                   |
| toolBarRender      | 渲染工具栏，支持返回一个 dom 数组，会自动增加 margin-right                                         | `ToolBarProps<T>['toolBarRender'] \| false`                                                                                                                                                                              | -                                                                   |
| optionsRender      | 自定义渲染工具栏选项                                                                               | `ToolBarProps<T>['optionsRender']`                                                                                                                                                                                       | -                                                                   |
| onLoad             | 数据加载完成后触发，会多次触发                                                                     | `(dataSource: T[]) => void`                                                                                                                                                                                              | -                                                                   |
| onLoadingChange    | loading 被修改时触发，一般是网络请求导致的                                                         | `(loading: boolean \| SpinProps \| undefined) => void`                                                                                                                                                                   | -                                                                   |
| onRequestError     | 数据加载失败时触发                                                                                 | `(error: Error) => void`                                                                                                                                                                                                 | -                                                                   |
| tableClassName     | 封装的 table 的 className                                                                          | `string`                                                                                                                                                                                                                 | -                                                                   |
| tableStyle         | 封装的 table 的 style                                                                              | [CSSProperties](https://www.htmlhelp.com/reference/css/properties.html)                                                                                                                                                  | -                                                                   |
| headerTitle        | 左上角的 title                                                                                     | `ReactNode`                                                                                                                                                                                                              | -                                                                   |
| tooltip            | 标题旁边的 tooltip                                                                                 | `string \| LabelTooltipType`                                                                                                                                                                                             | -                                                                   |
| options            | table 工具栏，设为 false 时不显示，传入 function 会点击时触发                                      | `{{ density?: boolean, fullScreen?: boolean \| function, reload?: boolean \| function, reloadIcon?: React.ReactNode, densityIcon?: React.ReactNode, setting?: boolean \|` [SettingOptionType](#菜单栏-options-配置) `}}` | `{ fullScreen: false, reload: true, density: true, setting: true }` |
| search             | 是否显示搜索表单，传入对象时为搜索表单的配置                                                       | `false` \| [SearchConfig](#search-搜索表单)                                                                                                                                                                              | -                                                                   |
| defaultSize        | 默认的 size                                                                                        | SizeType                                                                                                                                                                                                                 | -                                                                   |
| dateFormatter      | 转化 dayjs 格式数据为特定类型，false 不做转化                                                      | `"string"` \| `"number"` \| ((value: dayjs.Dayjs, valueType: string) => string \| number) \| `false`                                                                                                                     | `"string"`                                                          |
| beforeSearchSubmit | 搜索之前进行一些修改                                                                               | `(params: Partial<U>) => any`                                                                                                                                                                                            | -                                                                   |
| onSizeChange       | table 尺寸发生改变                                                                                 | `(size: DensitySize) => void`                                                                                                                                                                                            | -                                                                   |
| type               | pro-table 类型                                                                                     | `ProSchemaComponentTypes`                                                                                                                                                                                                | -                                                                   |
| form               | type="form" 和搜索表单的 Form 配置                                                                 | `Omit<ProFormProps & QueryFilterProps, 'form'>`                                                                                                                                                                          | -                                                                   |
| onSubmit           | 提交表单时触发                                                                                     | `(params: U) => void`                                                                                                                                                                                                    | -                                                                   |
| onReset            | 重置表单时触发                                                                                     | `() => void`                                                                                                                                                                                                             | -                                                                   |
| columnEmptyText    | 空值时的显示，不设置时显示 `-`， false 可以关闭此功能                                              | `ProFieldEmptyText`                                                                                                                                                                                                      | `-`                                                                 |
| tableRender        | 自定义渲染表格函数                                                                                 | `(props: ProTableProps<T, U, ValueType>, defaultDom: ReactNode, domList: {toolbar: ReactNode, alert: ReactNode, table: ReactNode}) => ReactNode`                                                                         | -                                                                   |
| tableViewRender    | 渲染 table 视图，用于定制 ProList，不推荐直接使用                                                  | `(props: TableProps<DataSource>, defaultDom: JSX.Element) => JSX.Element \| undefined`                                                                                                                                   | -                                                                   |
| searchFormRender   | 渲染搜索表单                                                                                       | `(props: ProTableProps<T, U, ValueType>, defaultDom: JSX.Element) => ReactNode`                                                                                                                                          | -                                                                   |
| toolbar            | 透传 `ListToolBar` 配置项                                                                          | [ListToolBarProps](#listtoolbarprops)                                                                                                                                                                                    | -                                                                   |
| tableExtraRender   | table 和搜索表单之间的 dom 渲染                                                                    | `(props: ProTableProps<T, U, ValueType>, dataSource: T[]) => ReactNode`                                                                                                                                                  | -                                                                   |
| manualRequest      | 是否需要手动触发首次请求，配置为 `true` 时不可隐藏搜索表单                                         | `boolean`                                                                                                                                                                                                                | false                                                               |
| editable           | 可编辑表格的相关配置                                                                               | `RowEditableConfig<T>`                                                                                                                                                                                                   | -                                                                   |
| cardProps          | table 外面卡片的设置                                                                               | `ProCardProps \| false`                                                                                                                                                                                                  | -                                                                   |
| cardBordered       | Table 和 Search 外围 Card 组件的边框                                                               | `boolean \| {search?: boolean, table?: boolean}`                                                                                                                                                                         | false                                                               |
| ghost              | 幽灵模式，即是否取消表格区域的 padding                                                             | `boolean`                                                                                                                                                                                                                | false                                                               |
| debounceTime       | 防抖时间                                                                                           | `number`                                                                                                                                                                                                                 | 10                                                                  |
| revalidateOnFocus  | 窗口聚焦时自动重新请求                                                                             | `boolean`                                                                                                                                                                                                                | `false`                                                             |
| columnsState       | 受控的列状态，可以操作显示隐藏                                                                     | `ColumnStateType`                                                                                                                                                                                                        | -                                                                   |
| name               | 可编辑表格的name,通过这个name 可以直接与 form通信，无需嵌套                                        | `NamePath`                                                                                                                                                                                                               | -                                                                   |
| ErrorBoundary      | 自带了错误处理功能，防止白屏，`ErrorBoundary=false` 关闭默认错误边界                               | `React.ComponentClass<any, any> \| false`                                                                                                                                                                                | 内置 ErrorBoundary                                                  |
| style              | 外层容器的样式                                                                                     | `React.CSSProperties`                                                                                                                                                                                                    | -                                                                   |
| rowSelection       | 选择项配置                                                                                         | `TableProps<T>['rowSelection'] & {alwaysShowAlert?: boolean} \| false`                                                                                                                                                   | -                                                                   |

#### RecordCreator

| 属性             | 描述                                                                | 类型              | 默认值   |
| ---------------- | ------------------------------------------------------------------- | ----------------- | -------- |
| record           | 需要新增的行数据，一般来说包含唯一 key                              | `T`               | `{}`     |
| position         | 行增加在哪里，开始或者末尾                                          | `top` \| `bottom` | `bottom` |
| (...buttonProps) | antd 的 [ButtonProps](https://ant.design/components/button-cn/#API) | ButtonProps       | —        |

#### ColumnStateType

| 属性            | 描述                                                                                         | 类型                                         | 默认值 |
| --------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------- | ------ |
| defaultValue    | 列状态的默认值，只有初次生效，并用于重置使用                                                 | `Record<string, ColumnsState>;`              | -      |
| value           | 列状态的值，支持受控模式                                                                     | `Record<string, ColumnsState>;`              | -      |
| onChange        | 列状态的值发生改变之后触发                                                                   | `(value:Record<string, ColumnsState>)=>void` | -      |
| persistenceKey  | 持久化列的 key，用于判断是否是同一个 table                                                   | `string \| number`                           | -      |
| persistenceType | 持久化列的类型，localStorage 设置在关闭浏览器后也是存在的，sessionStorage 关闭浏览器后会丢失 | `localStorage \| sessionStorage`             | -      |

#### Search 搜索表单

| 属性             | 描述                         | 类型                                                                        | 默认值           |
| ---------------- | ---------------------------- | --------------------------------------------------------------------------- | ---------------- |
| filterType       | 过滤表单类型                 | `'query'` \| `'light'`                                                      | `'query'`        |
| searchText       | 查询按钮的文本               | `string`                                                                    | 查询             |
| resetText        | 重置按钮的文本               | `string`                                                                    | 重置             |
| submitText       | 提交按钮的文本               | `string`                                                                    | 提交             |
| labelWidth       | 标签的宽度                   | `'number'` \| `'auto'`                                                      | 80               |
| span             | 配置查询表单的列数           | `'number'` \| [`'ColConfig'`](#ColConfig)                                   | defaultColConfig |
| className        | 封装的搜索 Form 的 className | `string`                                                                    | -                |
| collapseRender   | 收起按钮的 render            | `((collapsed: boolean,showCollapseButton?: boolean) => ReactNode)`\|`false` | -                |
| defaultCollapsed | 默认是否收起                 | `boolean`                                                                   | `true`           |
| collapsed        | 是否收起                     | `boolean`                                                                   | -                |
| onCollapse       | 收起按钮的事件               | `(collapsed: boolean) => void;`                                             | -                |
| optionRender     | 自定义操作栏                 | `((searchConfig,formProps,dom) => ReactNode[])`\|`false`                    | -                |
| showHiddenNum    | 是否显示收起之后显示隐藏个数 | `boolean`                                                                   | `false`          |

#### ColConfig

```tsx | pure
const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};
```

#### 菜单栏 options 配置

```tsx | pure
export type OptionsType =
  | ((e: React.MouseEvent<HTMLSpanElement>, action?: ActionType) => void)
  | boolean;

export type OptionConfig = {
  density?: boolean;
  fullScreen?: OptionsType;
  reload?: OptionsType;
  setting?: boolean | SettingOptionType;
  search?: (OptionSearchProps & { name?: string }) | boolean;
  reloadIcon?: React.ReactNode;
  densityIcon?: React.ReactNode;
};

export type SettingOptionType = {
  draggable?: boolean;
  checkable?: boolean;
  showListItemOption?: boolean;
  checkedReset?: boolean;
  listsHeight?: number;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  settingIcon?: React.ReactNode;
};
```

#### ActionRef 手动触发

有时我们要手动触发 table 的 reload 等操作，可以使用 actionRef，可编辑表格也提供了一些操作来帮助我们更快地实现需求。

```tsx | pure
interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: Key) => boolean;
  cancelEditable: (rowKey: Key) => boolean;
}

const ref = useRef<ActionType>();

<ProTable actionRef={ref} />;

// 刷新
ref.current.reload();

// 刷新并清空,页码也会重置，不包括表单
ref.current.reloadAndRest();

// 重置到默认值，包括表单
ref.current.reset();

// 清空选中项
ref.current.clearSelected();

// 开始编辑
ref.current.startEditable(rowKey);

// 结束编辑
ref.current.cancelEditable(rowKey);
```

### Columns 列定义

> 请求远程数据比较复杂，详细可以看[这里](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params)。

详细的 Columns 配置请查看 [Columns 列定义](./columns)。

### valueType 值类型

ProTable 封装了一些常用的值类型来减少重复的 `render` 操作，配置一个 [`valueType`](/components/schema#valuetype) 即可展示格式化响应的数据。

### 批量操作

与 antd 相同，批量操作需要设置 `rowSelection` 来开启，与 antd 不同的是，pro-table 提供了一个 alert 用于承载一些信息。你可以通过 `tableAlertRender`和 `tableAlertOptionRender` 来对它进行自定义。设置或者返回 false 即可关闭。

| 属性                   | 描述                                                       | 类型                                                                                                | 默认值 |
| ---------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------ |
| alwaysShowAlert        | 总是展示 alert，默认无选择不展示（`rowSelection`内置属性） | `boolean`                                                                                           | -      |
| tableAlertRender       | 自定义批量操作工具栏左侧信息区域，false 时不显示           | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => ReactNode)`\|`false` | -      |
| tableAlertOptionRender | 自定义批量操作工具栏右侧选项区域，false 时不显示           | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => ReactNode)`\|`false` | -      |

### 搜索表单

ProTable 会根据列来生成一个 Form，用于筛选列表数据，最后的值会根据通过 `request` 的第一个参数返回，看起来就像。

```jsx | pure
<ProTable request={(params,sort,filter)=>{all params}}>
```

按照规范，table 的表单不需要任何的必选参数，所有点击搜索和重置都会触发 `request` 来发起一次查询。

Form 的列是根据 `valueType` 来生成不同的类型，详细的值类型请查看[通用配置](/components/schema#valuetype)。

> valueType 为 index, indexBorder, option 或者没有 dataIndex 和 key 的列将会被忽略。

### 列表工具栏

用于自定义表格的工具栏部分。

详细的列表工具栏配置请查看 [ListToolBar 列表工具栏](./list-toolbar)。
