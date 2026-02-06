---
title: ProList Advanced List
order: 12
atomId: ProList
group: List
---

# ProList - Advanced List

## When to use

Based on ProTable implementation, it can be considered as a special case of ProTable, which can be used when completing a standard list.

## Code demo

### Basic usage

<code src="../../../demos/list/base.tsx" background="var(--main-bg-color)" old></code>

### Edit list

<code src="../../../demos/list/editable.tsx" background="var(--main-bg-color)" old></code>

### Support for expanded lists

<code src="../../../demos/list/expand.tsx"  background="var(--main-bg-color)" oldtitle="Expandable list"></code>

### Supports checked list

<code src="../../../demos/list/selectedRow.tsx"  background="var(--main-bg-color)" oldtitle="Support selected list"></code>

### Query list

<code src="../../../demos/list/search.tsx"  background="var(--main-bg-color)" oldtitle="Search list"></code>

### List with filters and asynchronous requests

<code src="../../../demos/list/filter.tsx"  background="var(--main-bg-color)" oldtitle="List with filtering and asynchronous requests"></code>

### Size and dividing line

<code src="../../../demos/list/size.tsx"  background="var(--main-bg-color)" oldtitle="Size and divider"></code>

### Vertical style

<code src="../../../demos/list/layout.tsx"  background="var(--main-bg-color)" oldtitle="vertical style"></code>

### Some preset modes

<code src="../../../demos/list/special.tsx" background="var(--main-bg-color)" old></code>

### Page turn

<code src="../../../demos/list/pagination.tsx"  background="var(--main-bg-color)" oldtitle="Pagination"></code>

### Card List

<code src="../../../demos/list/card-list.tsx"  background="var(--main-bg-color)" oldtitle="Card list"></code>

### Custom list item (itemRender)

Use `itemRender` to customize each item's rendering. The third argument `defaultDom` is the default list item element (`React.ReactElement`); you can wrap it or replace it.

<code src="../../../demos/list/render-item.tsx" background="var(--main-bg-color)" old></code>

## API

### ProList API

Compared with antd's [List](https://ant.design/components/list-cn/), ProList's API design is more like Table, so that the presentation form of data items can be quickly defined by configuration. It also makes it easier to switch between Table and List. **In addition, ProList is implemented based on ProTable. Except for Table-related APIs, ProList supports most of ProTable's APIs**.

| Parameter        | Description                                                                                                                                                                                                                            | Type                                      | Default Value |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------- | :------------ |
| dataSource       | Same [configuration](https://ant.design/components/list-cn/#API) as antd                                                                                                                                                               | `any[]`                                   | `false`       |
| actionRef        | Table action reference for custom triggering                                                                                                                                                                                           | `MutableRefObject<ActionType>`            | -             |
| metas            | List item configuration, similar to columns in Table                                                                                                                                                                                   | `Metas`                                   | -             |
| rowKey           | Row key, usually row id                                                                                                                                                                                                                | `string` \| `(row,index)=>string`         | `'id'`        |
| headerTitle      | List header main title                                                                                                                                                                                                                 | `React.ReactNode`                         | -             |
| loading          | Is loading                                                                                                                                                                                                                             | `boolean` \| `(item: any) => boolean`     | `false`       |
| split            | Whether to have a split line                                                                                                                                                                                                           | `boolean`                                 | `false`       |
| rowSelection     | Same [configuration](https://ant.design/components/table-cn/#rowSelection) as antd                                                                                                                                                     | `object` \|`boolean`                      | false         |
| expandable       | Same [configuration](https://ant.design/components/table-cn/#expandable) as antd                                                                                                                                                       | `object` \| `false`                       | -             |
| showActions      | When to show actions, no support CardList                                                                                                                                                                                              | `'hover'` \| `'always'`                   | `'always'`    |
| showExtra        | When to show extra                                                                                                                                                                                                                     | `'hover'` \| `'always'`                   | `'always'`    |
| onRow            | The same [configuration](https://ant.design/components/table-cn/#onRow-%E7%94%A8%E6%B3%95) as antd. When the user passes in the `grid` property, the list will be rendered in card mode, this event will not fire, please use `onItem` | `function(record, index)`                 | -             |
| onItem           | The same [configuration](https://ant.design/components/table-cn/#onRow-%E7%94%A8%E6%B3%95) as antd. Clicking on an item in all types will trigger this event.                                                                          | `function(record, index)`                 | -             |
| itemRender       | Custom list item render. Signature `(item, index, defaultDom)`. `defaultDom` is the default list item element (`React.ReactElement`). Wrap or replace it                                                                              | `ProListItemRender<T>`                    | -             |
| rowClassName     | Custom list row class name                                                                                                                                                                                                             | `string`\| `(row, index) => string`       | -             |
| itemHeaderRender | Customize the header of each column. Different from itemRender, it will keep multi-select and expand and collapse                                                                                                                      | `(item: any, index: number) => ReactNode` | -             |
| itemCardProps    | Custom card list proCard props, only valid under card list                                                                                                                                                                             | `ProCardProps`                            | -             |
| request          | Method to obtain data                                                                                                                                                                                                                  | `(params: U) => Promise<RequestData<T>>`  | -             |
| params           | Extra parameters for request query                                                                                                                                                                                                     | `U`                                       | -             |
| postData         | Process the data obtained through request                                                                                                                                                                                              | `(data: T[]) => T[]`                      | -             |
| onLoad           | Triggered after data loading is complete                                                                                                                                                                                               | `(dataSource: T[]) => void`               | -             |
| onRequestError   | Triggered when data loading fails                                                                                                                                                                                                      | `(error: Error) => void`                  | -             |

### Batch operations

Same [configuration](https://procomponents.ant.design/components/table/#%E6%89%B9%E9%87%8F%E6%93%8D%E4%BD%9C) as ProTable.

### Metas.\[Meta] Generic API

| Parameter | Description                                                                                          | Type                                                                                      | Default Value |
| :-------- | :--------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | :------------ |
| dataIndex | The path corresponding to the data in the data item, supports querying nested paths through an array | `string` \| `string[]`                                                                    | -             |
| valueType | Value type, same as ProTable                                                                         | `'text'` \| `'date'` ...                                                                  | `'text'`      |
| render    | Custom render function                                                                               | `(text: React.ReactNode,record: T,index: number) => React.ReactNode \| React.ReactNode[]` | -             |

### Metas.type

The field type corresponding to dataSource is `'new'` | `'top'` | `'inline'`.

| Parameter | Description | Type | Default Value |
| :-------- | :---------- | :--- | :------------ |
| dataIndex | -           | -    | `'type'`      |

### Metas.title

| Parameter | Description | Type | Default Value |
| :-------- | :---------- | :--- | :------------ |
| dataIndex | -           | -    | `'title'`     |

### Metas.subTitle

| Parameter | Description | Type | Default Value |
| :-------- | :---------- | :--- | :------------ |
| dataIndex | -           | -    | `'subTitle'`  |

### Metas.description

| Parameter | Description | Type | Default Value   |
| :-------- | :---------- | :--- | :-------------- |
| dataIndex | -           | -    | `'description'` |

### Metas.avatar

| Parameter | Description | Type | Default Value |
| :-------- | :---------- | :--- | :------------ |
| dataIndex | -           | -    | `'avatar'`    |

### Metas.actions

| Parameter       | Description                             | Type    | Default Value          |
| :-------------- | :-------------------------------------- | :------ | :--------------------- |
| dataIndex       | -                                       | -       | `'actions'`            |
| cardActionProps | Set where the card list renders actions | `extra` | `'actions' \| 'extra'` |

### Metas.content

| Parameter | Description | Type | Default Value |
| :-------- | :---------- | :--- | :------------ |
| dataIndex | -           | -    | `'content'`   |

### Metas.extra

| Parameter | Description | Type | Default Value |
| :-------- | :---------- | :--- | :------------ |
| dataIndex | -           | -    | `'extra'`     |
