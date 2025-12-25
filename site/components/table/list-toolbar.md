---
title: ListToolBar 列表工具栏
order: 11
group:
  title: Table
  order: 0
nav:
  title: Components
  path: /components
---

# ListToolBar 列表工具栏

用于自定义表格的工具栏部分。

#### ListToolBarProps

列表和表格的工具栏配置属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `ReactNode` | - |
| subTitle | 子标题 | `ReactNode` | - |
| tooltip | tooltip 描述 | `string` | - |
| search | 查询区 | `ReactNode` \| `SearchProps` | - |
| actions | 操作区 | `ReactNode[]` | - |
| settings | 设置区 | `(ReactNode \| Setting)[]` | - |
| filter | 过滤区，通常配合 `LightFilter` 使用 | `ReactNode` | - |
| multipleLine | 是否多行展示 | `boolean` | `false` |
| menu | 菜单配置 | `ListToolBarMenu` | - |
| tabs | 标签页配置，仅当 `multipleLine` 为 true 时有效 | `ListToolBarTabs` | - |

SearchProps 为 antd 的 [Input.Search](https://ant.design/components/input-cn/#Input.Search) 的属性。

#### Setting

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标 | `ReactNode` | - |
| tooltip | tooltip 描述 | `string` | - |
| key | 操作唯一标识 | `string` | - |
| onClick | 设置被触发 | `(key: string)=>void` | - |

#### ListToolBarMenu

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型 | `inline` \| `dropdown` \| `tab` | `inline` |
| activeKey | 当前值 | `string` | - |
| items | 菜单项 | `{ key: string; label: ReactNode }[]` | - |
| onChange | 切换菜单的回调 | `(activeKey)=>void` | - |

#### ListToolBarTabs

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 当前选中项 | `string` | - |
| items | 菜单项 | `{ key: string; tab: ReactNode }[]` | - |
| onChange | 切换菜单的回调 | `(activeKey)=>void` | - |

#### TableDropdown

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 唯一标志 | `string` | - |
| name | 内容 | `ReactNode` | - |
| (...Menu.Item) | antd 的 [Menu.Item](https://ant.design/components/menu-cn/#Menu.Item) | `Menu.Item` | - |
