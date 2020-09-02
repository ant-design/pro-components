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

## ListToolBar 列表工具栏

### 基本使用

<code src="./demos/basic.tsx" />

### 无标题的情况

没有标题的情况下搜索框会前置。

<code src="./demos/no-title.tsx" />

### 双行

<code src="./demos/multipleLine.tsx" />

### 标签

<code src="./demos/tabs.tsx" />

### 菜单

<code src="./demos/menu.tsx" />

### 和 Table 一起使用

<code src="./demos/table.tsx" />

### 和 List 一起使用

<code src="./demos/list.tsx" />

### 自定义 title

<code src="./demos/custom-title.tsx" />

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

### ListToolBar

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | ReactNode \| string | - |
| subTitle | 子标题 | ReactNode \| string | - |
| description | 描述 | ReactNode \| string | - |
| descriptionIcon | 描述图标 | string | 'question-circle' |
| search | 查询区 | ReactNode \| SearchProps | - |
| actions | 操作区 | ReactNode[] | - |
| settings | 设置区 | (ReactNode \| Setting)[] | - |
| filter | 过滤区，通常配合 [LightFilter](light-filter) 使用 | ReactNode | - |
| multipleLine | 是否多行展示 | boolean | false |
| menu | 菜单配置 | ListToolBarMenu | - |
| tabs | 标签页配置，仅当 `multipleLine` 为 true 时有效 | ListToolBarTabs | - |

SearchProps 为 antd 的 [Input.Search](https://ant.design/components/input-cn/#Input.Search) 的属性。

### ListToolBar[Setting]

| 参数    | 说明         | 类型                  | 默认值 |
| ------- | ------------ | --------------------- | ------ |
| icon    | 图标         | string                | -      |
| tooltip | tooltip 描述 | string                | -      |
| key     | 操作唯一标识 | string                | -      |
| onClick | 设置被触发   | function(key: string) | -      |

### ListToolBar[ListToolBarMenu]

| 参数      | 说明           | 类型                                | 默认值     |
| --------- | -------------- | ----------------------------------- | ---------- |
| type      | 类型           | 'inline' \| 'dropdown'              | 'dropdown' |
| activeKey | 当前值         | string                              | -          |
| items     | 菜单项         | { key: string; label: ReactNode }[] | -          |
| onChange  | 切换菜单的回调 | Function(activeKey) {}              | -          |

### ListToolBar[ListToolBarTabs]

| 参数      | 说明       | 类型                              | 默认值     |
| --------- | ---------- | --------------------------------- | ---------- |
| activeKey | 当前选中项 | string                            | -          |
| items     | 菜单项     | { key: string; tab: ReactNode }[] | -          |
| onChange  | 类型       | 'inline' \| 'dropdown'            | 'dropdown' |
