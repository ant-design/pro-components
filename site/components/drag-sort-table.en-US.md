---
title: DragSortTable
atomId: DragSortTable
group: Table
---

# DragSortTable - Drag Sort Table

`DragSortTable` uses [dnd-kit](https://dndkit.com/) for sorting, you need to provide `rowKey` to determine the unique value of the data, otherwise it will not work properly.

## Demo

### Drag to sort

`dragSortKey` displays the default handle in the sort column. `onDragSortEnd` stores the new row order.

<code src="../../demos/table/drag-sort-table/drag.tsx" background="var(--main-bg-color)" title="dragSortKey: default handle"></code>

### Custom drag handle

`dragSortHandlerRender` replaces the default icon with a numbered handle.

<code src="../../demos/table/drag-sort-table/drag-sort-table.tsx" background="var(--main-bg-color)" title="dragSortHandlerRender: custom handle"></code>

### Request data source

After sorting, save the new order and call `actionRef.reload()` to request it again.

<code src="../../demos/table/drag-sort-table/drag-request.tsx" background="var(--main-bg-color)" title="request: reload the saved order"></code>

## DragSortTable

| property              | description                                                                                                                                                | type                                                                                     | default value                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| dragSortKey           | If this parameter is configured, the drag sorting handle will be displayed in the row corresponding to the key, allowing drag sorting                      | `string`                                                                                 | -                                                                                               |
| dragSortHandlerRender | The function for rendering custom drag sorting handles. If dragSortKey is configured but this parameter is not configured, the default handle icon is used | `(rowData: T, idx: number) => React.ReactNode`                                           | `<MenuOutlined className= "dragSortDefaultHandle" style={{ cursor: 'grab', color: '#999' }} />` |
| onDragSortEnd         | Drag sort completion callback                                                                                                                              | `(beforeIndex: number, afterIndex: number, newDataSource: T[]) => Promise<void> \| void` | -                                                                                               |
