---
title: ProUtils - 通用组件
group:
  path: /
nav:
  title: 组件
  path: /components
---

# ProUtils

收录供多个组件通用的原子组件。

## ListToolBar 列表工具栏

## 何时使用

列表和表格的工具栏。

## 代码演示

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
