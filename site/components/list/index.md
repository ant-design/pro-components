---
group: List
title: ProList 高级列表
order: 12
atomId: ProList
---

# ProList - 高级列表

ProList 基于 ProTable 实现，可以认为是 ProTable 的一个特例，将数据以列表的形式展现。API 设计上更像 Table，使得 Table 和 List 的切换变得更加容易。

## 何时使用

当你需要一个标准的列表展现，或需要在列表和表格之间灵活切换时，ProList 是不二选择。

## 代码演示

### 基本使用

<code src="../../../demos/pro-list/base.tsx" background="var(--main-bg-color)"></code>

### 编辑列表

<code src="../../../demos/pro-list/editable.tsx" background="var(--main-bg-color)"></code>

### 带工具栏的列表

<code src="../../../demos/pro-list/ToolBar.tsx" background="var(--main-bg-color)"></code>

### 支持展开的列表

<code src="../../../demos/pro-list/expand.tsx" background="var(--main-bg-color)"></code>

### 支持选中的列表

<code src="../../../demos/pro-list/selectedRow.tsx" background="var(--main-bg-color)"></code>

### 查询列表

<code src="../../../demos/pro-list/search.tsx" background="var(--main-bg-color)"></code>

### 带筛选和异步请求的列表

<code src="../../../demos/pro-list/filter.tsx" background="var(--main-bg-color)"></code>

### 大小和分割线

<code src="../../../demos/pro-list/size.tsx" background="var(--main-bg-color)"></code>

### 竖排样式

<code src="../../../demos/pro-list/layout.tsx" background="var(--main-bg-color)"></code>

### 一些预设的模式

<code src="../../../demos/pro-list/special.tsx" background="var(--main-bg-color)"></code>

### 翻页

<code src="../../../demos/pro-list/pagination.tsx" background="var(--main-bg-color)"></code>

### 卡片列表

<code src="../../../demos/pro-list/card-list.tsx" background="var(--main-bg-color)"></code>

### 自定义列表项（itemRender）

通过 `itemRender` 自定义每一项的渲染，可基于默认内容 `defaultDom`（`React.ReactElement`）进行包装或完全自定义。

<code src="../../../demos/pro-list/render-item.tsx" background="var(--main-bg-color)"></code>

## API

ProList 在 ProTable 上进行了一层封装，使用 `metas` 代替 `columns` 来配置列表项的展现形式。这里只列出与 ProTable 不同的 API，其余 API 与 [ProTable](/components/table) 相同。

### request

`request` 是 ProList 最重要的 API，与 ProTable 用法一致。`request` 会接收一个对象，对象中必须要有 `data` 和 `success`，如果需要手动分页 `total` 也是必需的。`request` 会接管 `loading` 的设置，同时在查询表单查询时和 `params` 参数发生修改时重新执行。

```tsx | pure
<ProList<DataType, Params>
  params={params}
  request={async (params, sort, filter) => {
    const msg = await myQuery({
      page: params.current,
      pageSize: params.pageSize,
    });
    return {
      data: msg.result,
      success: true,
      total: msg.total,
    };
  }}
/>
```

### ProList

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 与 antd 相同的[配置](https://ant.design/components/list-cn/#API)，ProList 推荐使用 `request` 来加载 | `T[]` | - |
| request | 获取 `dataSource` 的方法 | `(params: U & { pageSize?: number; current?: number; keyword?: string }, sort: Record<string, SortOrder>, filter: Record<string, FilterValue>) => Promise<{ data: T[]; success?: boolean; total?: number }>` | - |
| params | 用于 `request` 查询的额外参数，一旦变化会触发重新加载 | `U` | - |
| postData | 对通过 `request` 获取的数据进行处理 | `(data: T[]) => T[]` | - |
| defaultData | 默认的数据 | `T[]` | - |
| onDataSourceChange | 数据发生改变时触发 | `(dataSource: T[]) => void` | - |
| actionRef | Table action 的引用，便于自定义触发 | `React.Ref<ActionType \| undefined>` | - |
| formRef | 可以获取到查询表单的 form 实例，用于一些灵活的配置 | `TableFormItem<T>['formRef']` | - |
| metas | 列表项配置，类似 Table 中的 columns，详见 [Metas 配置](#metas-配置) | `Metas` | - |
| rowKey | 行的 key，一般是行 id | `string` \| `(row: T, index: number) => string` | `'id'` |
| headerTitle | 左上角的 title | `ReactNode` | - |
| tooltip | 标题旁边的 tooltip | `string \| LabelTooltipType` | - |
| loading | 是否加载中 | `boolean \| (item: any) => boolean` | `false` |
| split | 是否有分割线 | `boolean` | `false` |
| footer | 列表底部 | `ReactNode` | - |
| grid | 栅格配置，开启后以卡片模式渲染 | `ListGridType` | - |
| itemLayout | 列表项布局方向 | `'horizontal'` \| `'vertical'` | `'horizontal'` |
| locale | 国际化配置 | `{ emptyText?: ReactNode }` | - |
| pagination | 分页器的配置，`current` 和 `pageSize` 会被 `request` 接管 | `PaginationConfig` \| `false` | `false` |
| rowSelection | 选择项配置 | `TableProps<T>['rowSelection'] & { alwaysShowAlert?: boolean }` \| `false` | `false` |
| expandable | 与 antd 相同的[配置](https://ant.design/components/table-cn/#expandable) | `object` \| `false` | - |
| showActions | 何时展示 actions，CardList 模式下不生效 | `'hover'` \| `'always'` | `'always'` |
| showExtra | 何时展示 extra | `'hover'` \| `'always'` | `'always'` |
| onRow | 与 antd 相同的[配置](https://ant.design/components/table-cn/#onRow-%E7%94%A8%E6%B3%95)，用户传入 `grid` 属性时列表以卡片模式渲染，此事件不触发，请使用 `onItem` | `function(record, index)` | - |
| onItem | 与 antd 相同的[配置](https://ant.design/components/table-cn/#onRow-%E7%94%A8%E6%B3%95)，在所有类型点击某个项目都会触发该事件 | `function(record, index)` | - |
| itemRender | 自定义列表项渲染，`defaultDom` 为默认列表项元素，可基于其包装或完全自定义 | `(item: T, index: number, defaultDom: React.ReactElement) => ReactNode` | - |
| rowClassName | 自定义列表行的类名 | `string` \| `(item: T, index: number) => string` | - |
| itemHeaderRender | 自定义每一列的 header，与 `itemRender` 不同的是，它会保留多选和展开收起 | `((item: T, index: number, defaultDom: JSX.Element \| null) => ReactNode)` \| `false` | - |
| itemTitleRender | 自定义每一列的 title 渲染 | `((item: T, index: number, defaultDom: JSX.Element \| null) => ReactNode)` \| `false` | - |
| itemCardProps | 自定义卡片列表的 props，只在卡片列表下生效 | `CheckCardProps` | - |
| toolBarRender | 渲染工具栏，支持返回一个 dom 数组，会自动增加 margin-right | `ToolBarProps<T>['toolBarRender']` \| `false` | - |
| search | 是否显示搜索表单，传入对象时为搜索表单的配置 | `false` \| [SearchConfig](/components/table#search-搜索表单) | `false` |
| onLoad | 数据加载完成后触发，会多次触发 | `(dataSource: T[]) => void` | - |
| onLoadingChange | loading 被修改时触发，一般是网络请求导致的 | `(loading: boolean \| SpinProps \| undefined) => void` | - |
| onRequestError | 数据加载失败时触发 | `(error: Error) => void` | - |
| onSubmit | 提交表单时触发 | `(params: U) => void` | - |
| onReset | 重置表单时触发 | `() => void` | - |
| cardProps | 外面卡片的设置 | `ProCardProps` \| `false` | - |
| editable | 可编辑列表的相关配置，详见 [可编辑表格](/components/editable-table) | `RowEditableConfig<T>` | - |
| manualRequest | 是否需要手动触发首次请求 | `boolean` | `false` |
| ghost | 幽灵模式，即是否取消区域的 padding | `boolean` | `false` |
| dateFormatter | 转化 dayjs 格式数据为特定类型，false 不做转化 | `"string"` \| `"number"` \| `((value: dayjs.Dayjs, valueType: string) => string \| number)` \| `false` | `"string"` |
| ErrorBoundary | 自带了错误处理功能，防止白屏，`ErrorBoundary=false` 关闭默认错误边界 | `React.ComponentClass<any, any>` \| `false` | 内置 ErrorBoundary |

### ActionRef 手动触发

有时我们要手动触发 ProList 的 reload 等操作，可以使用 actionRef，用法与 [ProTable ActionRef](/components/table#actionref-手动触发) 完全一致。

| 方法 | 描述 | 类型 |
| --- | --- | --- |
| reload | 刷新列表，如果传入 true 则重置页码 | `(resetPageIndex?: boolean) => void` |
| reloadAndRest | 刷新并清空，页码也会重置，不包括表单 | `() => void` |
| reset | 重置到默认值，包括表单 | `() => void` |
| clearSelected | 清空选中项 | `() => void` |
| startEditable | 开始编辑行 | `(rowKey: Key) => boolean` |
| cancelEditable | 取消编辑行 | `(rowKey: Key) => boolean` |

```tsx | pure
const ref = useRef<ActionType>();

<ProList actionRef={ref} />;

// 刷新
ref.current?.reload();

// 刷新并清空,页码也会重置，不包括表单
ref.current?.reloadAndRest();

// 重置到默认值，包括表单
ref.current?.reset();

// 清空选中项
ref.current?.clearSelected();
```

### Metas 配置

Metas 是 ProList 的核心配置，使用 `metas` 定义列表项各个部分（标题、头像、描述等）对应的数据字段，类似于 ProTable 的 `columns`。

#### Metas.[Meta] 通用 API

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataIndex | 数据在数据项中对应的路径，支持通过数组查询嵌套路径 | `string` \| `string[]` | - |
| valueType | 值的类型，和 ProTable 一致，会生成不同的渲染器 | [`valueType`](/components/schema#valuetype) | `'text'` |
| render | 自定义渲染函数 | `(text: ReactNode, record: T, index: number) => ReactNode \| ReactNode[]` | - |
| valueEnum | 值的枚举，会自动转化把值当成 key 来取出要显示的内容 | [valueEnum](/components/schema#valueenum) | - |
| search | 配置列的搜索相关，false 为隐藏 | `false` \| `{ transform: (value: any) => any }` | - |
| editable | 在编辑列表中是否可编辑 | `false` \| `(text: any, record: T, index: number) => boolean` | - |
| fieldProps | 查询表单的 props，会透传给表单项 | `(form, config) => Record \| Record` | - |
| formItemProps | 传递给 Form.Item 的配置 | `(form, config) => formItemProps` \| `formItemProps` | - |
| formItemRender | 渲染查询表单的输入组件 | `(item, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => ReactNode` | - |
| key | React 的 key | `React.Key` | - |

#### Metas.type

对应 dataSource 的字段类型为 `'new'` | `'top'` | `'inline'`。

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataIndex | - | - | `'type'` |

#### Metas.title

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataIndex | - | - | `'title'` |

#### Metas.subTitle

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataIndex | - | - | `'subTitle'` |

#### Metas.description

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataIndex | - | - | `'description'` |

#### Metas.avatar

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataIndex | - | - | `'avatar'` |

#### Metas.actions

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataIndex | - | - | `'actions'` |
| cardActionProps | 设置卡片列表把 action 渲染到哪里 | `'actions'` \| `'extra'` | `'extra'` |

#### Metas.content

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataIndex | - | - | `'content'` |

#### Metas.extra

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataIndex | - | - | `'extra'` |

### 批量操作

与 ProTable 相同，批量操作需要设置 `rowSelection` 来开启。详见 [ProTable 批量操作](/components/table#批量操作)。

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| alwaysShowAlert | 总是展示 alert，默认无选择不展示（`rowSelection` 内置属性） | `boolean` | - |
| tableAlertRender | 自定义批量操作工具栏左侧信息区域，false 时不显示 | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: () => void }) => ReactNode)` \| `false` | - |
| tableAlertOptionRender | 自定义批量操作工具栏右侧选项区域，false 时不显示 | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: () => void }) => ReactNode)` \| `false` | - |

### 搜索表单

ProList 会根据 metas 中配置了 `search` 的字段来生成搜索表单，用法与 [ProTable 搜索表单](/components/table#搜索表单) 一致。
