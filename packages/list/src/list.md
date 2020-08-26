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

在完成一个标准的 表格列表时即可使用。

## 代码演示

### 基本使用

<code src="./demos/base.tsx" />

### 支持展开的列表

<code src="./demos/expand.tsx" />

### 支持选中的列表

<code src="./demos/selectedRow.tsx" />

### 复杂的列表

<code src="./demos/complex.tsx" />

### 各种 size

<code src="./demos/size.tsx" />

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

### ProList

ProList 与 antd 的 [List](https://ant.design/components/list-cn/) 相比，主要增加了 rowSelection 和 expandable 来支持选中与筛选

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| rowSelection | 与 antd 相同的[配置](https://ant.design/components/table-cn/#rowSelection) | object \|boolean | false |
| expandable | 与 antd 相同的[配置](https://ant.design/components/table-cn/#expandable) | object \| false | - |
| showActions | 何时展示 actions | 'hover' \| 'always' | always |
| rowKey | 行的 key，一般是行 id | string \| (row,index)=>string | "id" |
| renderItem | 现在的 renderItem 需要返回 ProList.Item 的 props，而不是 dom | ItemProps | - |
| title | 列表头部主标题 | ReactNode | - |
| actions | 列表头部操作项 | React.ReactNode[] | - |
| headerRender | 自定义列表头的 render 方法，替代 `<List />` 的 header 属性 | (props: {title, actions}, defaultDom: React.ReactNode) => ReactNode | - |
| listRenderItem | 这是 antd 的 renderItem 的别名 | (row,index)=> Node | - |

### ProList.Item

如果你的 dataSource 包含 children，我们会将其打平传入到 renderItem 中，但是包含 children 的项会转化了 group 的样式，只支持 title 和 actions 的属性。

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| type | 列表项的预设样式 | new \| top | - |
| title | 列表项的主标题 | ReactNode | - |
| subTitle | 列表项的副标题 | ReactNode | - |
| checkbox | 列表的选择框 | React.ReactNode | - |
| loading | 列表项是否在加载中 | React.ReactNode | - |
| avatar | 列表项的头像 | AvatarProps \| string | - |
| actions | 操作列表项 | React.ReactNode[] | - |
| description | 列表项的描述，与 title 不在一行 | React.ReactNode[] | - |
| expandedRowClassName | 多余展开的 css | string | - |
| expand | 列表项是否展开 | boolean | - |
| onExpand | 列表项展开收起的回调 | (expand: boolean) => void | - |
| expandable | 列表项展开配置 | [object](https://ant.design/components/table-cn/#expandable) | - |
