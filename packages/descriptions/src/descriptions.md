---
title: ProDescriptions - 定义列表
group:
  path: /
nav:
  title: 组件
  path: /components
  order: 1
---

# ProDescriptions - 高级定义列表

高级描述列表组件，提供一个更加方便快速的方案来构建描述列表。

## Demo

### 基础定义列表

基本使用。

<code src="./demos/base.tsx" />

### 远程请求数据

通过请求接口数据来展示定义列表

<code src="./demos/request.tsx" />

### columns

通过请求接口数据和 columns 来展示定义列表

<code src="./demos/columns.tsx" />

## API

### ProDescriptions

> 更多功能查看 antd 的 [Descriptions](https://ant.design/components/descriptions-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 描述列表的标题，显示在最顶部 | ReactNode | - |
| tip | 内容的补充描述，hover 后显示 | string | - |
| loading | 展示一个加载的骨架屏，骨架屏和 dom 不会一一对应 | boolean | - |
| extra | 描述列表的操作区域，显示在右上方 | string \| ReactNode | - |
| bordered | 是否展示边框 | boolean | false |
| column | 一行的 `ProDescriptionsItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number | 3 |
| size | 设置列表的大小。可以设置为 `middle` 、`small`, 或不填（只有设置 `bordered={true}` 生效） | `default` \| `middle` \| `small` | - |
| layout | 描述布局 | `horizontal` \| `vertical` | `horizontal` | - |
| colon | 配置 `ProDescriptions.Item` 的 `colon` 的默认值 | boolean | true |
| request | 请求数据，不设置 columns 时 ProDescriptions.Item 需设置对应的 dataIndex | - | - |
| columns | 列定义，与 request 配合使用 [columns](/components/table#columns) | - | - |

### ProDescriptions.Item

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 内容的描述 | ReactNode | - |
| tip | 内容的补充描述，hover 后显示 | string | - |
| span | 包含列的数量 | number | 1 | - |
| valueType | 格式化的类型 | ValueType | - |
| valueEnum | 当前列值的枚举 [valueEnum](/components/table#valueenum) | `{[key:string`\|`number]:any}` | - |
| request | 从网络请求枚举数据 | `()=>Promise<{[key:string`\|`number]:any}>` | - |
| dataIndex | 返回数据的 key 与 ProDescriptions 的 request 配合使用，用于配置式的定义列表 | `React.Text` \| `React.Text[]` | - |

> span 是 Description.Item 的数量。 span={2} 会占用两个 DescriptionItem 的宽度。
