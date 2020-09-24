---
title: ProList - 高级列表
order: 12
group:
  path: /
nav:
  title: 组件
  path: /components
---

# ProList

## 何时使用

基于 ProTable 实现，可以认为是 ProTable 的一个特例，在完成一个标准的列表时即可使用。

## 代码演示

### 基本使用

<code src="./demos/base.tsx" />

### 支持展开的列表

<code src="./demos/expand.tsx" />

### 支持选中的列表

<code src="./demos/selectedRow.tsx" />

### 复杂的列表

<code src="./demos/complex.tsx" />

### 竖排样式

<code src="./demos/layout.tsx" />

### 文段式场景

<code src="./demos/group.tsx" />

### 一些预设的模式

<code src="./demos/special.tsx" />

### 自定义表头

<code src="./demos/headerRender.tsx" />

### 小菜单

<code src="./demos/minMenu.tsx" />

## API

### ProList API

ProList 与 antd 的 [List](https://ant.design/components/list-cn/) 相比，API 设计上更像 Table，使得可以通过配置化的方式快速定义数据项的展现形式。也使得 Table 和 List 的切换变得更加容易。

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| dataSource | 与 antd 相同的[配置](https://ant.design/components/list-cn/#API) | `any[]` | `false` |
| metas | 列表项配置，类似 Table 中的 columns | `Metas` | - |
| rowSelection | 与 antd 相同的[配置](https://ant.design/components/table-cn/#rowSelection) | `object` \|`boolean` | false |
| expandable | 与 antd 相同的[配置](https://ant.design/components/table-cn/#expandable) | `object` \| `false` | - |
| showActions | 何时展示 actions | `'hover'` \| `'always'` | `'always'` |
| rowKey | 行的 key，一般是行 id | `string` \| `(row,index)=>string` | `'id'` |
| title | 列表头部主标题 | `React.ReactNode` | - |
| actions | 列表头部操作项 | `React.ReactNode[]` | - |
| headerRender | 自定义列表头的 render 方法，替代 `<List />` 的 header 属性 | `(props: {title, actions}, defaultDom: React.ReactNode) => ReactNode` | - |
| loading | 是否加载中 | `boolean` \| `(item: any) => boolean` | `false` |
| expandedRowClassName | 多余展开的 css | string | - |
| expand | 列表项是否展开 | boolean | - |
| onExpand | 列表项展开收起的回调 | (expand: boolean) => void | - |
| expandable | 列表项展开配置 | [object](https://ant.design/components/table-cn/#expandable) | - |

### Metas.[Meta] 通用 API

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| dataIndex | 数据在数据项中对应的路径，支持通过数组查询嵌套路径 | `string` \| `string[]` | - |
| valueType | 值的类型，和 ProTable 一致 | `'text'` \| `'date'` ... | `'text'` |
| render | 自定义渲染函数 | `(text: React.ReactNode,record: T,index: number) => React.ReactNode \| React.ReactNode[]` | - |

### Metas.type

| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :----- |
|      |      |      |        |

### Metas.title

| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :----- |
|      |      |      |        |

### Metas.subTitle

| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :----- |
|      |      |      |        |

### Metas.description

| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :----- |
|      |      |      |        |

### Metas.avatar

| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :----- |
|      |      |      |        |

### Metas.actions

| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :----- |
|      |      |      |        |
