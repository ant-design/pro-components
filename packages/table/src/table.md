---
title: ProTable - 高级表格
order: 0
legacy: /table
group:
  path: /
nav:
  title: 组件
  path: /components
---

# ProTable - 高级表格

ProTable 的诞生是为了解决项目中需要写很多 table 的样板代码的问题，所以在其中做了封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑。

依托于 ProForm 的能力，ProForm 拥有多种形态，可以切换查询表单类型，设置变形成为一个简单的 Form 表单，执行新建等功能。

![layout
](https://gw.alipayobjects.com/zos/antfincdn/Hw%26ryTueTW/bianzu%2525204.png)

## 何时使用

当你的表格需要与服务端进行交互或者需要多种单元格样式时，ProTable 是不二选择。

## 代码演示

### 属性展示

<code src="./demos/dynamic-settings.tsx"  background="#f5f5f5" iframe="500px" title="属性展示" />

### 查询表格

<code src="./demos/single.tsx" background="#f5f5f5" height="500px" title="查询表格" />

### 查询表格

<code src="./demos/single-test.tsx" debug background="#f5f5f5" height="500px" title="查询表格" />

### 查询（无按钮）表格

<code src="./demos/no-option.tsx" background="#f5f5f5" height="400px" title="查询（无按钮）表格" />

### DataSource

<code src="./demos/dataSource.tsx" background="#f5f5f5" height="500px" title="DataSource" />

### 无查询表单

<code src="./demos/normal.tsx" background="#f5f5f5" height="400px" title="无查询表单" />

### 轻量筛选替换查询表单

<code src="./demos/lightfilter.tsx" background="#f5f5f5"  height="400px" title="轻量筛选替换查询表单" />

### 无 ToolBar 的表格

<code src="./demos/no-title.tsx"  height="350px" title="无 ToolBar 的表格" />

### 必填的查询表单

尽量使用 initialValue 来解决问题，必填项挫败感比较强

<code src="./demos/open-rules.tsx"  height="350px" title="必填的查询表单" />

### 嵌套表格

<code src="./demos/table-nested.tsx" background="#f5f5f5"  height="400px" title="嵌套表格" />

### 左右结构

<code src="./demos/split.tsx" background="#f5f5f5" height="500px" title="左右结构" />

### 表格批量操作

<code src="./demos/batchOption.tsx" background="#f5f5f5" height="420px" title="表格批量操作" />

### 通过 formRef 来操作查询表单

<code src="./demos/form.tsx" background="#f5f5f5"  height="320px" title="通过 formRef 来操作查询表单" />

### RTL (النسخة العربية)

RTL means right-to-left.

<code src="./demos/rtl_table.tsx" background="#f5f5f5" height="500px" title="RTL (النسخة العربية)" />

### 受控的表格设置栏

可以默认隐藏某些栏，但是在操作栏中可以选择

<code src="./demos/columnsStateMap.tsx" background="#f5f5f5" height="300px" title="受控的表格设置栏" />

### 表格轮询

<code src="./demos/pollinga.tsx" background="#f5f5f5" height="360px" title="表格轮询" />

### 拖拽排序

<code src="./demos/drag.tsx" background="#f5f5f5" height="360px" title="拖拽排序" />

### 内部集成拖拽排序的可编辑表格`DragSortTable`

<code src="./demos/drag-sort-table.tsx" background="#f5f5f5" height="360px" title="可编辑表格" />

`DragSortTable`排序采用的[react-sortable-hoc](https://www.npmjs.com/package/react-sortable-hoc)，需要提供`rowKey`来确定数据的唯一值，否则不能正常工作。暂不支持`request`请求的数据进行排序，可将`request`请求的数据存起来通过`dataSource`传入。

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dragSortKey | 如配置此参数，则会在该 key 对应的行显示拖拽排序把手，允许拖拽排序 | `any` | - |
| dragSortHandlerRender | 渲染自定义拖动排序把手的函数 如配置了 dragSortKey 但未配置此参数，则使用默认把手图标 | `(rowData: T, idx: number) => React.ReactNode` | `<MenuOutlined className="dragSortDefaultHandle" style={{ cursor: 'grab', color: '#999' }} />` |
| onDragSortEnd | 拖动排序完成回调 | `(newDataSource: T[]) => Promise<void> \| void` | - |

### 搜索表单自定义

当内置的表单项无法满足我们的基本需求，这时候我们就需要来自定义一下默认的组件，我们可以通过 `fieldProps` 和 `renderFormItem` 配合来使用。

`fieldProps` 可以把 props 透传，可以设置 select 的样式和多选等问题。

`renderFormItem` 可以完成重写渲染逻辑，传入 item 和 props 来进行渲染，需要注意的是我们必须要将 props 中的 `value` 和 `onChange` 必须要被赋值，否则 form 无法拿到参数。如果你需要自定义需要先了解 antd 表单的[工作原理](https://ant.design/components/form-cn/#Form.Item)。

```tsx | pure
renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => {
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

#### FAQ

#### 为什么不能自己设置 value 和 onchange

被 ProTable 包装的控件，表单控件会自动添加 value（或 valuePropName 指定的其他属性） onChange（或 trigger 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

- 你不再需要也不应该用 onChange 来做数据收集同步（你可以使用 Form 的 onValuesChange），但还是可以继续监听 onChange 事件。

- 你不能用控件的 value 或 defaultValue 等属性来设置表单域的值，默认值可以用 Form 里的 initialValues 来设置。注意 initialValues 不能被 setState 动态更新，你需要用 setFieldsValue 来更新。

- 你不应该用 setState，可以使用 form.setFieldsValue 来动态改变表单值。

##### 为什么设置 defaultValue 不生效？#

因为 ProTable 子组件会转为受控模式。因而 defaultValue 不会生效。你需要在 Form 上通过 initialValues 设置默认值。

<code src="./demos/linkage_form.tsx" background="#f5f5f5" height="310px" title="搜索表单自定义" />

### 表单操作自定义

<code src="./demos/search_option.tsx" background="#f5f5f5" height="310px" title="表单操作自定义" />

### Toolbar 自定义

使用 `toolbar`属性扩展配置工具栏渲染。

<code src="./demos/listToolBar.tsx" background="#f5f5f5" height="450px" title="Toolbar 自定义" />

### 表格主体自定义

<code src="./demos/renderTable.tsx" background="#f5f5f5" height="500px" title="表格主体自定义" />

### 国际化相关的配置

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

// 使用
<IntlProvider value={enUSIntl}>
  <ProTable />
</IntlProvider>;
```

<code src="./demos/intl.tsx" background="#f5f5f5" height="320px" title="国际化相关的配置" />

### 使用自带 keyWords 搜索的 table

<code src="./demos/search.tsx" background="#f5f5f5" height="200px" title="使用自带 keyWords 搜索的 table" />

### 值类型示例

#### valueType - 日期类

<code src="./demos/valueTypeDate.tsx" background="#f5f5f5" height="350px" title="valueType - 日期类"/>

#### valueType - 数字类

<code src="./demos/valueTypeNumber.tsx" background="#f5f5f5" height="350px" title="valueType - 数字类"/>

#### valueType - 样式类

<code src="./demos/valueType.tsx" background="#f5f5f5" height="680px" title="valueType - 样式类" />

#### valueType - 选择类

<code src="./demos/valueType_select.tsx" background="#f5f5f5" heigh="462px" title="valueType - 选择类"/>

<code src="./demos/customization-value-type.tsx" debug background="#f5f5f5" heigh="462px" title="自定义 valueType"/>

<code src="./demos/config-provider.tsx" debug background="#f5f5f5" heigh="462px"/>

## API

ProTable 在 antd 的 Table 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 antd Table 不同的 api。

### request

`request` 是 ProTable 最重要的 API，`request` 会接收一个对象。对象中必须要有 `data` 和 `success`，如果需要手动分页 `total` 也是必需的。`request` 会接管 `loading` 的设置，同时在查询表单查询和 `params` 参数发生修改时重新执行。同时 查询表单的值和 `params` 参数也会带入。以下是一个例子：

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

列配置中也支持 request，但是只有几种 [valueType](/components/schema#valuetype) 支持。

### ProTable

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| request | 获取 `dataSource` 的方法 | `(params?: {pageSize,current},sort,filter) => {data,success,total}` | - |
| params | 用于 `request` 查询的额外参数，一旦变化会触发重新加载 | `object` | - |
| postData | 对通过 `request` 获取的数据进行处理 | `(data: T[]) => T[]` | - |
| defaultData | 默认的数据 | `T[]` | - |
| actionRef | Table action 的引用，便于自定义触发 | `MutableRefObject<ActionType>` | - |
| formRef | 可以获取到查询表单的 form 实例，用于一些灵活的配置 | `MutableRefObject<FormInstance>` | - |
| toolBarRender | 渲染工具栏，支持返回一个 dom 数组，会自动增加 margin-right | `(action) => ReactNode[]` | - |
| onLoad | 数据加载完成后触发,会多次触发 | `(dataSource: T[]) => void` | - |
| onLoadingChange | loading 被修改时触发，一般是网络请求导致的 | `(loading:boolean)=>void` | - |
| onRequestError | 数据加载失败时触发 | `(error) => void` | - |
| tableClassName | 封装的 table 的 className | string | - |
| tableStyle | 封装的 table 的 style | [CSSProperties](https://www.htmlhelp.com/reference/css/properties.html) | - |
| options | table 工具栏，设为 false 时不显示 | `{{ fullScreen: boolean \| function, reload: boolean \| function,setting: true, density?: boolean }}` | `{ fullScreen: false, reload:true, setting: true}` |
| search | 是否显示搜索表单，传入对象时为搜索表单的配置 | `false` \| [SearchConfig](#search-搜索表单) | - |
| defaultSize | 默认的 size | SizeType | - |
| dateFormatter | 转化 moment 格式数据为特定类型，false 不做转化 | `"string"` \| `"number"` \| `false` | `"string"` |
| beforeSearchSubmit | 搜索之前进行一些修改 | `(params:T)=>T` | - |
| onSizeChange | table 尺寸发生改变 | `(size: 'default' \| 'middle' \| 'small') => void` | - |
| type | pro-table 类型 | `"form"` | - |
| form | antd form 的配置 | [FormProps](https://ant.design/components/form-cn/#API) | - |
| onSubmit | 提交表单时触发 | `(params: U) => void` | - |
| onReset | 重置表单时触发 | `() => void` | - |
| columnEmptyText | 空值时的显示，不设置时显示 `-`， false 可以关闭此功能 | `string` \| `false` | false |
| tableRender | 自定义渲染表格函数 | `(props,dom,domList:{ toolbar,alert,table}) => ReactNode` | - |
| toolbar | 透传 `ListToolBar` 配置项 | [ListToolBarProps](#listtoolbarprops) | - |
| tableExtraRender | 自定义表格的主体函数 | `(props: ProTableProps<T, U>, dataSource: T[]) => ReactNode;` | - |
| manualRequest | 是否需要手动触发首次请求, 配置为 `true` 时不可隐藏搜索表单 | `boolean` | false |
| editable | 可编辑表格的相关配置 | [TableRowEditable<T>](/components/editable-table#editable-编辑行配置) | - |
| cardBordered | Table 和 Search 外围 Card 组件的边框 | `boolean \| {search?: boolean, table?: boolean}` | false |
| debounceTime | 防抖时间 | `number` | 10 |
| ColumnState | Column Status Control, you can operate the display hide | `columnSstateType` | - |

#### RecordCreator

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| record | 需要新增的行数据，一般来说包含唯一 key | `T` | `{}` |
| position | 行增加在哪里，开始或者末尾 | `top` \| `bottom` | `bottom` |
| (...buttonProps) | antd 的 [ButtonProps](https://ant.design/components/button-cn/#API) | ButtonProps | — |

#### ColumnsStateType

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 列状态的默认值，只有初次生效 | `Record<string, ColumnsState>;` | - |
| value | 列状态的值，支持受控模式 | `Record<string, ColumnsState>;` | - |
| onChange | 列状态的值发生改变之后触发 | `(value:Record<string, ColumnsState>)=>viod` | - |
| persistenceKey | 持久化列的 key，用于判断是否是同一个 table | `string \| number` | - |
| persistenceType | 持久化列的类类型， localStorage 设置在关闭浏览器后也是存在的，sessionStorage 关闭浏览器后会丢失 | `localStorage \| sessionStorage` | - |

#### Search 搜索表单

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| filterType | 过滤表单类型 | `'query'` \| `'light'` | `'query'` |
| searchText | 查询按钮的文本 | `string` | 查询 |
| resetText | 重置按钮的文本 | `string` | 重置 |
| submitText | 提交按钮的文本 | `string` | 提交 |
| labelWidth | 标签的宽度 | `'number'` \| `'auto'` | 80 |
| span | 配置查询表单的列数 | `'number'` \| [`'ColConfig'`](#ColConfig) | defaultColConfig |
| className | 封装的搜索 Form 的 className | `string` | - |
| collapseRender | 收起按钮的 render | `(collapsed: boolean,showCollapseButton?: boolean,) => ReactNode` | - |
| defaultCollapsed | 默认是否收起 | `boolean` | true |
| collapsed | 是否收起 | `boolean` | - |
| onCollapse | 收起按钮的事件 | `(collapsed: boolean) => void;` | - |
| optionRender | 自定义操作栏 | `((searchConfig,formProps,dom) => ReactNode[])`\|`false` | - |

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
  setting?: boolean;
  search?: (SearchProps & { name?: string }) | boolean;
};
```

#### ActionRef 手动触发

有时我们要手动触发 table 的 reload 等操作，可以使用 actionRef，可编辑表格也提供了一些操作来帮助我们更快的实现需求。

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

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 与 antd 中基本相同，但是支持通过传入一个方法 | `ReactNode \| ((config: ProColumnType<T>, type: ProTableTypes) => ReactNode)` | - |
| tooltip | 会在 title 之后展示一个 icon，hover 之后提示一些信息 | string | - |
| ellipsis | 是否自动缩略 | `boolean` | - |
| copyable | 是否支持复制 | `boolean` | - |
| valueEnum | 值的枚举，会自动转化把值当成 key 来取出要显示的内容 | [valueEnum](/components/schema#valueenum) | - |
| valueType | 值的类型,会生成不同的渲染器 | [`valueType`](/components/schema#valuetype) | `text` |
| order | 查询表单中的权重，权重大排序靠前 | `number` | - |
| fieldProps | 查询表单的 props，会透传给表单项,如果渲染出来是 Input,就支持 input 的所有 props，同理如果是 select，也支持 select 的所有 props。也支持方法传入 | `` (form,config)=>Record`\| `Record `` | - |
| `formItemProps` | 传递给 Form.Item 的配置,可以配置 rules，但是默认的查询表单 rules 是不生效的。需要配置 `ignoreRules` | `(form,config)=>formItemProps` \| `formItemProps` | - |
| renderText | 类似 table 的 render，但是必须返回 string，如果只是希望转化枚举，可以使用 [valueEnum](/components/schema#valueenum) | `(text: any,record: T,index: number,action: UseFetchDataAction<T>) => string` | - |
| render | 类似 table 的 render，第一个参数变成了 dom,增加了第四个参数 action | `(text: ReactNode,record: T,index: number,action: UseFetchDataAction<T>) => ReactNode \| ReactNode[]` | - |
| renderFormItem | 渲染查询表单的输入组件 | `(item,{ type, defaultRender, formItemProps, fieldProps, ...rest },form) => ReactNode` | - |
| search | 配置列的搜索相关，false 为隐藏 | `false` \| `{ transform: (value: any) => any }` | true |
| search.transform | 转化值的 key, 一般用于时间区间的转化 | `(value: any) => any` | - |
| [editable](/components/editable-table) | 在编辑表格中是否可编辑的，函数的参数和 table 的 render 一样 | `false` \| `(text: any, record: T,index: number) => boolean` | true |
| colSize | 一个表单项占用的格子数量, `占比= colSize*span`，`colSize` 默认为 1 ，`span` 为 8，`span`是`form={{span:8}}` 全局设置的 | `number` | - |
| hideInSearch | 在查询表单中不展示此项 | `boolean` | - |
| hideInTable | 在 Table 中不展示此列 | `boolean` | - |
| hideInForm | 在 Form 中不展示此列 | `boolean` | - |
| hideInDescriptions | 在 Descriptions 中不展示此列 | `boolean` | - |
| filters | 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成 | `boolean` \| `object[]` | false |
| onFilter | 筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选 | `(value, record) => boolean` \| 'false' | false |
| request | 从服务器请求枚举 | [request](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) | - |
| initialValue | 查询表单项初始值 | `any` | - |

### valueType 值类型

ProTable 封装了一些常用的值类型来减少重复的 `render` 操作，配置一个 [`valueType`](/components/schema#valuetype) 即可展示格式化响应的数据。

### 批量操作

与 antd 相同，批量操作需要设置 `rowSelection` 来开启，与 antd 不同的是，pro-table 提供了一个 alert 用于承载一些信息。你可以通过 `tableAlertRender`和 `tableAlertOptionRender` 来对它进行自定义。设置或者返回 false 即可关闭。

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| alwaysShowAlert | 总是展示 alert，默认无选择不展示（`rowSelection`内置属性） | `boolean` | - |
| tableAlertRender | 自定义批量操作工具栏左侧信息区域, false 时不显示 | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => ReactNode)`\|`false` | - |
| tableAlertOptionRender | 自定义批量操作工具栏右侧选项区域, false 时不显示 | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => ReactNode)`\|`false` | - |

### 搜索表单

ProTable 会根据列来生成一个 Form，用于筛选列表数据，最后的值会根据通过 `request` 的第一个参数返回，看起来就像。

```jsx | pure
<ProTable request={(params,sort,filter)=>{ all params}}>
```

按照规范，table 的表单不需要任何的必选参数，所有点击搜索和重置都会触发 `request`来发起一次查询。

Form 的列是根据 `valueType` 来生成不同的类型,详细的值类型请查看[通用配置](/components/schema#valuetype)。

> valueType 为 index indexBorder option 和没有 dataIndex 和 key 的列将会忽略。

### 列表工具栏

用于自定义表格的工具栏部分。

#### 代码演示

<code src="./demos/ListToolBar/basic.tsx" background="#f0f2f5" title="列表工具栏-基本使用" />

<code src="./demos/ListToolBar/no-title.tsx" background="#f0f2f5" title="无标题" desc="列表工具栏-没有标题的情况下搜索框会前置。" />

<code src="./demos/ListToolBar/multipleLine.tsx" background="#f0f2f5" title="双行布局" desc="列表工具栏-双行的情况下会有双行的布局形式。" />

<code src="./demos/ListToolBar/tabs.tsx" background="#f0f2f5"  title="带标签" desc="列表工具栏-标签需配合 `multipleLine` 为 `true` 时使用。" />

<code src="./demos/ListToolBar/menu.tsx" background="#f0f2f5" title="列表工具栏-标题下拉菜单"/>

#### ListToolBarProps

列表和表格的工具栏配置属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `ReactNode` | - |
| subTitle | 子标题 | `ReactNode` | - |
| description | 描述 | `ReactNode` | - |
| search | 查询区 | `ReactNode` \| `SearchProps` | - |
| actions | 操作区 | `ReactNode[]` | - |
| settings | 设置区 | `(ReactNode \| Setting)[]` | - |
| filter | 过滤区，通常配合 `LightFilter` 使用 | `ReactNode` | - |
| multipleLine | 是否多行展示 | `boolean` | `false` |
| menu | 菜单配置 | `ListToolBarMenu` | - |
| tabs | 标签页配置，仅当 `multipleLine` 为 true 时有效 | `ListToolBarTabs` | - |

SearchProps 为 antd 的 [Input.Search](https://ant.design/components/input-cn/#Input.Search) 的属性。

#### Setting

| 参数    | 说明         | 类型                  | 默认值 |
| ------- | ------------ | --------------------- | ------ |
| icon    | 图标         | `ReactNode`           | -      |
| tooltip | tooltip 描述 | `string`              | -      |
| key     | 操作唯一标识 | `string`              | -      |
| onClick | 设置被触发   | `(key: string)=>void` | -      |

#### ListToolBarMenu

| 参数      | 说明           | 类型                                  | 默认值     |
| --------- | -------------- | ------------------------------------- | ---------- |
| type      | 类型           | `inline` \| `dropdown` \| `tab`       | `dropdown` |
| activeKey | 当前值         | string                                | -          |
| items     | 菜单项         | `{ key: string; label: ReactNode }[]` | -          |
| onChange  | 切换菜单的回调 | `(activeKey)=>void`                   | -          |

#### ListToolBarTabs

| 参数      | 说明           | 类型                                | 默认值 |
| --------- | -------------- | ----------------------------------- | ------ |
| activeKey | 当前选中项     | `string`                            | -      |
| items     | 菜单项         | `{ key: string; tab: ReactNode }[]` | -      |
| onChange  | 切换菜单的回调 | `(activeKey)=>void`                 | -      |

#### TableDropdown

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 唯一标志 | `string` | - |
| name | 内容 | `ReactNode` | - |
| (...Menu.Item) | antd 的 [Menu.Item](https://ant.design/components/menu-cn/#Menu.Item) | Menu.Item | - |
