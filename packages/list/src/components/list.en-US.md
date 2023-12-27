---
title: ProList
order: 12
atomId: ProList
nav:
  title: Components
---

# ProList - Advanced List

## When to use

Based on ProTable implementation, it can be considered as a special case of ProTable, which can be used when completing a standard list.

## Code demo

### Basic usage

<code src="../demos/base.tsx"  background="var(--main-bg-color)" oldtitle="Basic usage"></code>

### Edit list

<code src="../demos/editable.tsx"  background="var(--main-bg-color)" oldtitle="Edit list"></code>

### Support for expanded lists

<code src="../demos/expand.tsx"  background="var(--main-bg-color)" oldtitle="Expandable list"></code>

### Supports checked list

<code src="../demos/selectedRow.tsx"  background="var(--main-bg-color)" oldtitle="Support selected list"></code>

### Query list

<code src="../demos/search.tsx"  background="var(--main-bg-color)" oldtitle="Search list"></code>

### List with filters and asynchronous requests

<code src="../demos/filter.tsx"  background="var(--main-bg-color)" oldtitle="List with filtering and asynchronous requests"></code>

### Size and dividing line

<code src="../demos/size.tsx"  background="var(--main-bg-color)" oldtitle="Size and divider"></code>

### Vertical style

<code src="../demos/layout.tsx"  background="var(--main-bg-color)" oldtitle="vertical style"></code>

### some preset modes

<code src="../demos/special.tsx"  background="var(--main-bg-color)" oldtitle="Some preset modes"></code>

### page turn

<code src="../demos/pagination.tsx"  background="var(--main-bg-color)" oldtitle="Pagination"></code>

### Card List

<code src="../demos/card-list.tsx"  background="var(--main-bg-color)" oldtitle="Card list"></code>

\##API

### ProList API

Compared with antd's [List](https://ant.design/components/list-cn/), ProList's API design is more like Table, so that the presentation form of data items can be quickly defined by configuration. It also makes it easier to switch between Table and List. **In addition, ProList is implemented based on ProTable. Except for Table-related APIs, ProList supports most of ProTable's APIs**.

| parameter        | description                                                                                                                                                                                                                              | type                                  | default value |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------ | :------------ |
| dataSource       | same [configuration](https://ant.design/components/list-cn/#API) as antd                                                                                                                                                                 | `any[]`                               | `false`       |
| actionRef        | Table action reference for custom triggering                                                                                                                                                                                             | `MutableRefObject<ActionType>`        | -             |
| metas            | List item configuration, similar to columns in Table                                                                                                                                                                                     | `Metas`                               | -             |
| rowKey           | row key, usually row id                                                                                                                                                                                                                  | `string` \| `(row,index)=>string`     | `'id'`        |
| headerTitle      | List header main title                                                                                                                                                                                                                   | `React.ReactNode`                     | -             |
| loading          | is loading                                                                                                                                                                                                                               | `boolean` \| `(item: any) => boolean` | `false`       |
| split            | whether to have a split line                                                                                                                                                                                                             | `boolean`                             | `false`       |
| rowSelection     | same [configuration](https://ant.design/components/table-cn/#rowSelection) as antd                                                                                                                                                       | `object` \|`boolean`                  | false         |
| expandable       | same [configuration](https://ant.design/components/table-cn/#expandable) as antd                                                                                                                                                         | `object` \| `false`                   | -             |
| showActions      | When to show actions, no support CardList                                                                                                                                                                                                | `'hover'` \| `'always'`               | `'always'`    |
| showExtra        | When to show extra                                                                                                                                                                                                                       | `'hover'` \| `'always'`               | `'always'`    |
| onRow            | The same [configuration](https://ant.design/components/table-cn/#onRow-%E7%94%A8%E6%B3%95) as antd , when the user passes in the `grid` property , the list will be rendered in card mode, this event will not fire, please use `onItem` | `function(record, index)`             | -             |
| onItem           | The same [configuration](https://ant.design/components/table-cn/#onRow-%E7%94%A8%E6%B3%95) as antd , clicking on an item in all types will trigger this event.                                                                           | `function(record, index)`             | -             |
| rowClassName     | Custom list row class name                                                                                                                                                                                                               | `string`\| `(row, index) => string`   | -             |
| itemHeaderRender | Customize the header of each column, when it is different from itemRender, it will keep multi-select and expand and collapse                                                                                                             | -                                     | -             |
| itemCardProps    | custom card list proCard props, only valid under card list                                                                                                                                                                               | -                                     | -             |

### Batch operations

Same \[configuration] as ProTable (<https://procomponents.ant.design/components/table/#%E6%89%B9%E9%87%8F%E6%93%8D%E4%BD%9C>).

### Metas.\[Meta] Generic API

| parameter | description                                                                                          | type                                                                                      | default value |
| :-------- | :--------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | :------------ |
| dataIndex | The path corresponding to the data in the data item, supports querying nested paths through an array | `string` \| `string[]`                                                                    | -             |
| valueType | value type, same as ProTable                                                                         | `'text'` \| `'date'` ...                                                                  | `'text'`      |
| render    | Custom render function                                                                               | `(text: React.ReactNode,record: T,index: number) => React.ReactNode \| React.ReactNode[]` | -             |

### Metas.type

The field type corresponding to dataSource is `'new'` | `'top'` | `'inline'`.

| parameter | description | type | default value |
| :-------- | :---------- | :--- | :------------ |
| dataIndex | -           | -    | `'type'`      |

### Metas.title

| parameter | description | type | default value |
| :-------- | :---------- | :--- | :------------ |
| dataIndex | -           | -    | `'title'`     |

### Metas.subTitle

| parameter | description | type | default value |
| :-------- | :---------- | :--- | :------------ |
| dataIndex | -           | -    | `'subTitle'`  |

### Metas.description

| parameter | description | type | default value   |
| :-------- | :---------- | :--- | :-------------- |
| dataIndex | -           | -    | `'description'` |

### Metas.avatar

| parameter | description | type | default value |
| :-------- | :---------- | :--- | :------------ |
| dataIndex | -           | -    | `'avatar'`    |

### Metas.actions

| parameter       | description                             | type    | default value          |
| :-------------- | :-------------------------------------- | :------ | :--------------------- |
| dataIndex       | -                                       | -       | `'actions'`            |
| cardActionProps | Set where the card list renders actions | `extra` | `'actions' \| 'extra'` |

### Metas.content

| parameter | description | type | default value |
| :-------- | :---------- | :--- | :------------ |
| dataIndex | -           | -    | `'content'`   |

### Metas.extra

| parameter | description | type | default value |
| :-------- | :---------- | :--- | :------------ |
| dataIndex | -           | -    | `'extra'`     |
