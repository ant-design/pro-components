---
title: DragSortTable - Drag Sort Table
group:
  path: /
nav:
  title: component
  path: /components
---

# DragSortTable - Drag Sort Table

`DragSortTable` uses [react-sortable-hoc](https://www.npmjs.com/package/react-sortable-hoc) for sorting, you need to provide `rowKey` to determine the unique value of the data, otherwise it will not work properly. Currently, sorting of data requested by `request` is not supported. The data requested by `request` can be stored and passed in through `dataSource`.

## Demo

### Drag to sort

<code src="./demos/drag.tsx" background="#f5f5f5" height="360px" title="Drag sort" />

### Drag and drop to sort and edit the table

<code src="./demos/drag-sort-table.tsx" background="#f5f5f5" height="360px" title="Editable table" />

## API

| property | description | type | default value |
| --- | --- | --- | --- |
| dragSortKey | If this parameter is configured, the drag sorting handle will be displayed in the row corresponding to the key, allowing drag sorting | `any` | - |
| dragSortHandlerRender | The function for rendering custom drag sorting handles. If dragSortKey is configured but this parameter is not configured, the default handle icon is used | `(rowData: T, idx: number) => React.ReactNode` | `<MenuOutlined className= "dragSortDefaultHandle" style={{ cursor: 'grab', color: '#999' }} />` |
| onDragSortEnd | Drag sort completion callback | `(newDataSource: T[]) => Promise<void> \| void` | - |
