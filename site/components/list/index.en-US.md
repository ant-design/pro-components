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

### Using columns + listSlot (Recommended)

Use `columns` with the `listSlot` property to share the same column configuration with ProTable. `listSlot` specifies which slot of the list item the column maps to (e.g. `title`, `avatar`, `description`).

<code src="../../../demos/pro-list/columns.tsx" background="var(--main-bg-color)"></code>

### Card list (columns + listSlot)

<code src="../../../demos/pro-list/columns-card.tsx" background="var(--main-bg-color)"></code>

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

### Card list (metas)

<code src="../../../demos/pro-list/card-list.tsx" background="var(--main-bg-color)"></code>

### Custom list item (itemRender)

Use `itemRender` to customize each item's rendering. The third argument `defaultDom` is the default list item element (`React.ReactElement`); you can wrap it or replace it.

<code src="../../../demos/pro-list/render-item.tsx" background="var(--main-bg-color)"></code>

## API

ProList is built on top of ProTable and supports two column configuration approaches:

- **`columns` + `listSlot` (Recommended)**: Shares the same `columns` array with ProTable. Use `listSlot` to specify which slot of the list item each column maps to. The same `columns` can be used for both ProTable and ProList, making it easy to switch between table and list views.
- **`metas` (Deprecated)**: The legacy configuration using object keys to map list item parts. Still functional but migration to `columns` + `listSlot` is recommended.

For other APIs, refer to [ProTable](/en-US/components/table).

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
| columns | Column configuration, same as ProTable. Use `listSlot` to specify list item slots. See [columns Configuration](#columns-configuration-recommended) | `ProColumns<T>[]` | - |
| metas | ~~Deprecated~~ List item configuration, see [Metas Configuration](#metas-configuration-deprecated). Please migrate to `columns` + `listSlot` | `Metas` | - |
| dataSource | Same [configuration](https://ant.design/components/list-cn/#API) as antd. ProList recommends using `request` to load data | `T[]` | - |
| request | Method to get `dataSource` | `(params: U & { pageSize?: number; current?: number; keyword?: string }, sort: Record<string, SortOrder>, filter: Record<string, FilterValue>) => Promise<{ data: T[]; success?: boolean; total?: number }>` | - |
| params | Extra parameters for `request` query, triggers reload on change | `U` | - |
| postData | Process data obtained through `request` | `(data: T[]) => T[]` | - |
| defaultData | Default data | `T[]` | - |
| onDataSourceChange | Triggered when data changes | `(dataSource: T[]) => void` | - |
| actionRef | Table action reference for custom triggering | `React.Ref<ActionType \| undefined>` | - |
| formRef | Get the form instance of the search form | `TableFormItem<T>['formRef']` | - |
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

### columns Configuration (Recommended)

ProList's `columns` is fully compatible with ProTable. It additionally supports `listSlot` and `cardActionProps` properties to control list item rendering.

The same `columns` can be used for both ProTable (table view) and ProList (list view). ProTable ignores the `listSlot` property, while ProList uses it to map data to list item slots. Columns without `listSlot` are not rendered in list items but still participate in search form generation.

#### ProList Extended Column Properties

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| listSlot | Specifies which slot of the list item this column maps to | `'title'` \| `'subTitle'` \| `'avatar'` \| `'description'` \| `'content'` \| `'actions'` \| `'type'` | - |
| cardActionProps | When `listSlot` is `'actions'`, sets where actions render in card mode | `'actions'` \| `'extra'` | `'extra'` |

All other column properties are identical to ProTable's `ProColumns` (`dataIndex`, `valueType`, `render`, `search`, `valueEnum`, etc.). See [ProTable columns](/en-US/components/table).

#### listSlot Slot Reference

| Slot Value | Description | Default valueType |
| --- | --- | --- |
| `title` | List item title | `text` |
| `subTitle` | List item subtitle | `text` |
| `avatar` | List item avatar | `avatar` |
| `description` | List item description | `textarea` |
| `content` | List item content area | `text` |
| `actions` | List item action area | `option` |
| `type` | List item type (`'new'` \| `'top'` \| `'inline'`) | `text` |

#### Usage Example

```tsx | pure
import type { ProColumns } from '@ant-design/pro-components';

// Same columns for both ProTable and ProList
const columns: ProColumns<DataItem>[] = [
  { title: 'Name', dataIndex: 'name', listSlot: 'title' },
  { dataIndex: 'avatar', listSlot: 'avatar', search: false },
  { dataIndex: 'desc', listSlot: 'description', search: false },
  {
    title: 'Labels',
    dataIndex: 'labels',
    listSlot: 'subTitle',
    search: false,
    render: (_, row) => <Tag>{row.label}</Tag>,
  },
  {
    title: 'Actions',
    listSlot: 'actions',
    search: false,
    render: (_, row) => [<a key="edit">Edit</a>],
  },
  {
    title: 'Status',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: { open: { text: 'Open' }, closed: { text: 'Closed' } },
    // No listSlot — not rendered in list items, search only
  },
];

<ProList columns={columns} />  // List view
<ProTable columns={columns} /> // Table view
```

### Metas Configuration (Deprecated)

> **Deprecated**: `metas` still works but migration to `columns` + `listSlot` is recommended. See the [Migration Guide](#migrating-from-metas-to-columns) below.

Metas uses object keys to map list item parts (title, avatar, description, etc.) to data fields.

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

ProList generates a search form based on fields with `search` configured in columns or metas. Usage is identical to [ProTable Search Form](/en-US/components/table#search-form).

### Migrating from metas to columns

`metas` is deprecated. Migration to `columns` + `listSlot` is straightforward: convert each key-value pair in the metas object to an element in the columns array, where the key becomes the `listSlot` and the value's properties are spread into the column configuration.

#### Migration Reference

| metas syntax | columns syntax |
| --- | --- |
| `title: { dataIndex: 'name' }` | `{ dataIndex: 'name', listSlot: 'title' }` |
| `avatar: { dataIndex: 'img' }` | `{ dataIndex: 'img', listSlot: 'avatar' }` |
| `description: { dataIndex: 'desc' }` | `{ dataIndex: 'desc', listSlot: 'description' }` |
| `actions: { cardActionProps: 'actions', render: ... }` | `{ listSlot: 'actions', cardActionProps: 'actions', render: ... }` |
| `status: { title: 'Status', valueType: 'select', ... }` | `{ title: 'Status', dataIndex: 'status', valueType: 'select', ... }` |

#### Full Example

**Before (metas):**

```tsx | pure
<ProList
  metas={{
    title: { dataIndex: 'name', title: 'Name' },
    avatar: { dataIndex: 'avatar', search: false },
    description: { dataIndex: 'desc', search: false },
    subTitle: {
      dataIndex: 'labels',
      render: (_, row) => <Tag>{row.label}</Tag>,
      search: false,
    },
    actions: {
      cardActionProps: 'actions',
      render: (_, row) => [<a key="edit">Edit</a>],
      search: false,
    },
    status: {
      title: 'Status',
      valueType: 'select',
      valueEnum: { open: { text: 'Open' }, closed: { text: 'Closed' } },
    },
  }}
/>
```

**After (columns + listSlot):**

```tsx | pure
<ProList
  columns={[
    { title: 'Name', dataIndex: 'name', listSlot: 'title' },
    { dataIndex: 'avatar', listSlot: 'avatar', search: false },
    { dataIndex: 'desc', listSlot: 'description', search: false },
    {
      dataIndex: 'labels',
      listSlot: 'subTitle',
      render: (_, row) => <Tag>{row.label}</Tag>,
      search: false,
    },
    {
      listSlot: 'actions',
      cardActionProps: 'actions',
      render: (_, row) => [<a key="edit">Edit</a>],
      search: false,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: { open: { text: 'Open' }, closed: { text: 'Closed' } },
    },
  ]}
/>
```

> **Tip**: After migration, the same `columns` can be passed directly to `ProTable` for a one-click switch between list and table views.
