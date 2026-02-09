---
title: ProList Advanced List
order: 12
atomId: ProList
group: List
---

# ProList - Advanced List

ProList is built on top of ProTable and can be considered a special variant, presenting data in list form. Its API design is similar to Table, making it easy to switch between Table and List.

## When to use

When you need a standard list presentation, or need to flexibly switch between list and table forms, ProList is the right choice.

## Code demo

### Basic usage

<code src="../../../demos/pro-list/base.tsx" background="var(--main-bg-color)"></code>

### Edit list

<code src="../../../demos/pro-list/editable.tsx" background="var(--main-bg-color)"></code>

### List with toolbar

<code src="../../../demos/pro-list/ToolBar.tsx" background="var(--main-bg-color)"></code>

### Expandable list

<code src="../../../demos/pro-list/expand.tsx" background="var(--main-bg-color)"></code>

### List with row selection

<code src="../../../demos/pro-list/selectedRow.tsx" background="var(--main-bg-color)"></code>

### Search list

<code src="../../../demos/pro-list/search.tsx" background="var(--main-bg-color)"></code>

### List with filtering and asynchronous requests

<code src="../../../demos/pro-list/filter.tsx" background="var(--main-bg-color)"></code>

### Size and divider

<code src="../../../demos/pro-list/size.tsx" background="var(--main-bg-color)"></code>

### Vertical style

<code src="../../../demos/pro-list/layout.tsx" background="var(--main-bg-color)"></code>

### Some preset modes

<code src="../../../demos/pro-list/special.tsx" background="var(--main-bg-color)"></code>

### Pagination

<code src="../../../demos/pro-list/pagination.tsx" background="var(--main-bg-color)"></code>

### Card list

<code src="../../../demos/pro-list/card-list.tsx" background="var(--main-bg-color)"></code>

### Custom list item (itemRender)

Use `itemRender` to customize each item's rendering. The third argument `defaultDom` is the default list item element (`React.ReactElement`); you can wrap it or replace it.

<code src="../../../demos/pro-list/render-item.tsx" background="var(--main-bg-color)"></code>

## API

ProList is a layer of encapsulation on top of ProTable, using `metas` instead of `columns` to configure the presentation of list items. Only the APIs that differ from ProTable are listed here; for the rest, refer to [ProTable](/en-US/components/table).

### request

`request` is the most important API of ProList, identical to ProTable's usage. `request` receives an object that must contain `data` and `success`; `total` is also required for manual pagination. `request` takes over `loading` management and re-executes when the search form is submitted or `params` change.

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

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| dataSource | Same [configuration](https://ant.design/components/list-cn/#API) as antd. ProList recommends using `request` to load data | `T[]` | - |
| request | Method to get `dataSource` | `(params: U & { pageSize?: number; current?: number; keyword?: string }, sort: Record<string, SortOrder>, filter: Record<string, FilterValue>) => Promise<{ data: T[]; success?: boolean; total?: number }>` | - |
| params | Extra parameters for `request` query, triggers reload on change | `U` | - |
| postData | Process data obtained through `request` | `(data: T[]) => T[]` | - |
| defaultData | Default data | `T[]` | - |
| onDataSourceChange | Triggered when data changes | `(dataSource: T[]) => void` | - |
| actionRef | Table action reference for custom triggering | `React.Ref<ActionType \| undefined>` | - |
| formRef | Get the form instance of the search form | `TableFormItem<T>['formRef']` | - |
| metas | List item configuration, similar to columns in Table, see [Metas Configuration](#metas-configuration) | `Metas` | - |
| rowKey | Row key, usually row id | `string` \| `(row: T, index: number) => string` | `'id'` |
| headerTitle | Title on the top left | `ReactNode` | - |
| tooltip | Tooltip next to the title | `string \| LabelTooltipType` | - |
| loading | Whether loading | `boolean \| (item: any) => boolean` | `false` |
| split | Whether to show a split line | `boolean` | `false` |
| footer | List footer | `ReactNode` | - |
| grid | Grid configuration, enables card mode when set | `ListGridType` | - |
| itemLayout | List item layout direction | `'horizontal'` \| `'vertical'` | `'horizontal'` |
| locale | Internationalization configuration | `{ emptyText?: ReactNode }` | - |
| pagination | Pagination configuration, `current` and `pageSize` are managed by `request` | `PaginationConfig` \| `false` | `false` |
| rowSelection | Row selection configuration | `TableProps<T>['rowSelection'] & { alwaysShowAlert?: boolean }` \| `false` | `false` |
| expandable | Same [configuration](https://ant.design/components/table-cn/#expandable) as antd | `object` \| `false` | - |
| showActions | When to show actions, not supported in CardList mode | `'hover'` \| `'always'` | `'always'` |
| showExtra | When to show extra | `'hover'` \| `'always'` | `'always'` |
| onRow | Same [configuration](https://ant.design/components/table-cn/#onRow-%E7%94%A8%E6%B3%95) as antd. When `grid` is set, the list renders in card mode and this event will not fire. Use `onItem` instead | `function(record, index)` | - |
| onItem | Same [configuration](https://ant.design/components/table-cn/#onRow-%E7%94%A8%E6%B3%95) as antd. Clicking on an item in all types will trigger this event | `function(record, index)` | - |
| itemRender | Custom list item render. `defaultDom` is the default list item element. Wrap or replace it | `(item: T, index: number, defaultDom: React.ReactElement) => ReactNode` | - |
| rowClassName | Custom list row class name | `string` \| `(item: T, index: number) => string` | - |
| itemHeaderRender | Customize the header of each item. Different from `itemRender`, it preserves multi-select and expand/collapse | `((item: T, index: number, defaultDom: JSX.Element \| null) => ReactNode)` \| `false` | - |
| itemTitleRender | Customize the title rendering of each item | `((item: T, index: number, defaultDom: JSX.Element \| null) => ReactNode)` \| `false` | - |
| itemCardProps | Custom card list props, only valid in card mode | `CheckCardProps` | - |
| toolBarRender | Render toolbar, supports returning an array of dom, automatically adds margin-right | `ToolBarProps<T>['toolBarRender']` \| `false` | - |
| search | Whether to show the search form, pass an object for search form configuration | `false` \| [SearchConfig](/en-US/components/table#search-search-form) | `false` |
| onLoad | Triggered after data loading is complete, may fire multiple times | `(dataSource: T[]) => void` | - |
| onLoadingChange | Triggered when loading changes, usually caused by network requests | `(loading: boolean \| SpinProps \| undefined) => void` | - |
| onRequestError | Triggered when data loading fails | `(error: Error) => void` | - |
| onSubmit | Triggered when the form is submitted | `(params: U) => void` | - |
| onReset | Triggered when the form is reset | `() => void` | - |
| cardProps | Card settings for the outer wrapper | `ProCardProps` \| `false` | - |
| editable | Editable list configuration, see [Editable Table](/en-US/components/editable-table) | `RowEditableConfig<T>` | - |
| manualRequest | Whether to manually trigger the first request | `boolean` | `false` |
| ghost | Ghost mode, removes padding from the area | `boolean` | `false` |
| dateFormatter | Convert dayjs format data to a specific type, false to skip conversion | `"string"` \| `"number"` \| `((value: dayjs.Dayjs, valueType: string) => string \| number)` \| `false` | `"string"` |
| ErrorBoundary | Built-in error handling to prevent blank screens, `ErrorBoundary=false` disables it | `React.ComponentClass<any, any>` \| `false` | Built-in ErrorBoundary |

### ActionRef

Sometimes you need to manually trigger ProList's reload and other operations. Use actionRef, which works identically to [ProTable ActionRef](/en-US/components/table#actionref).

| Method | Description | Type |
| --- | --- | --- |
| reload | Reload the list, pass true to reset page index | `(resetPageIndex?: boolean) => void` |
| reloadAndRest | Reload and clear, page index is also reset, excluding the form | `() => void` |
| reset | Reset to default values, including the form | `() => void` |
| clearSelected | Clear selected items | `() => void` |
| startEditable | Start editing a row | `(rowKey: Key) => boolean` |
| cancelEditable | Cancel editing a row | `(rowKey: Key) => boolean` |

```tsx | pure
const ref = useRef<ActionType>();

<ProList actionRef={ref} />;

// Reload
ref.current?.reload();

// Reload and clear, page index is also reset, excluding the form
ref.current?.reloadAndRest();

// Reset to default values, including the form
ref.current?.reset();

// Clear selected items
ref.current?.clearSelected();
```

### Metas Configuration

Metas is the core configuration of ProList. Use `metas` to define which data fields map to each part of the list item (title, avatar, description, etc.), similar to ProTable's `columns`.

#### Metas.[Meta] Generic API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| dataIndex | The path corresponding to the data in the data item, supports querying nested paths through an array | `string` \| `string[]` | - |
| valueType | Value type, same as ProTable, generates different renderers | [`valueType`](/en-US/components/schema#valuetype) | `'text'` |
| render | Custom render function | `(text: ReactNode, record: T, index: number) => ReactNode \| ReactNode[]` | - |
| valueEnum | Enum of values, automatically converts the value as a key to display the corresponding content | [valueEnum](/en-US/components/schema#valueenum) | - |
| search | Configure search for the column, false to hide | `false` \| `{ transform: (value: any) => any }` | - |
| editable | Whether editable in editable list | `false` \| `(text: any, record: T, index: number) => boolean` | - |
| fieldProps | Props for the search form, passed to the form item | `(form, config) => Record \| Record` | - |
| formItemProps | Configuration passed to Form.Item | `(form, config) => formItemProps` \| `formItemProps` | - |
| formItemRender | Render the input component of the search form | `(item, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => ReactNode` | - |
| key | React key | `React.Key` | - |

#### Metas.type

The field type corresponding to dataSource is `'new'` | `'top'` | `'inline'`.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| dataIndex | - | - | `'type'` |

#### Metas.title

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| dataIndex | - | - | `'title'` |

#### Metas.subTitle

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| dataIndex | - | - | `'subTitle'` |

#### Metas.description

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| dataIndex | - | - | `'description'` |

#### Metas.avatar

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| dataIndex | - | - | `'avatar'` |

#### Metas.actions

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| dataIndex | - | - | `'actions'` |
| cardActionProps | Set where the card list renders actions | `'actions'` \| `'extra'` | `'extra'` |

#### Metas.content

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| dataIndex | - | - | `'content'` |

#### Metas.extra

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| dataIndex | - | - | `'extra'` |

### Batch operations

Same as ProTable, batch operations require setting `rowSelection`. See [ProTable Batch Operations](/en-US/components/table#batch-operations) for details.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| alwaysShowAlert | Always show alert, hidden by default when nothing is selected (built-in property of `rowSelection`) | `boolean` | - |
| tableAlertRender | Custom left info area of the batch operation toolbar, false to hide | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: () => void }) => ReactNode)` \| `false` | - |
| tableAlertOptionRender | Custom right options area of the batch operation toolbar, false to hide | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: () => void }) => ReactNode)` \| `false` | - |

### Search Form

ProList generates a search form based on fields with `search` configured in metas. Usage is identical to [ProTable Search Form](/en-US/components/table#search-form).
