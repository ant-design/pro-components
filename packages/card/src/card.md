---
title: ProCard - 高级卡片
nav:
  title: 组件
  path: /components
group:
  path: /
---

# ProCard 高级卡片

页内容器卡片，提供标准卡片样式，卡片切分以及栅格布局能力。

## 何时使用

- 需要一个标准卡片容纳内容时。
- 需要多个卡片栅格，gutter 布局时。
- 需要进行卡片内切分布局时。
- 需要卡片可折叠时。

## 代码演示

### 基础卡片

当单独使用时 `ProCard` 就是一个普通的卡片。

<code src="./demos/basic.tsx" background="#f0f2f5" />

### 栅格布局

当嵌套子卡片时, 组件会自动切换为 `flex` 弹性盒布局。你还可以通过配置 `ghost` 属性为 `true` 方便页内布局。

 <code src="./demos/colspan.tsx"  background="#f0f2f5" />

### 圣杯布局

利用栅格布局特性可以方便地做出非常常见的圣杯布局:

<code src="./demos/holygrail.tsx" background="#f0f2f5"/>

### 响应式

`colSpan` 支持 antd 定义的[栅格式响应布局](https://ant.design/components/grid-cn/#components-grid-demo-responsive)。预设六个响应尺寸：`xs` `sm` `md` `lg` `xl` `xxl`。如果要支持响应式，可以写成 `{ xs: 4, sm: 8, md: 10, lg: 12 }`

<code src="./demos/responsive.tsx"  background="#f0f2f5" />

### 卡片切分

布局模式下通过配置 `split` 可以方便地切分卡片，可以进行任意的分栏，不管是横切还是竖切都非常便利，切分出来的分栏仍然保有卡片的特性，高度自动撑满。注意：

- 切分时父卡片的内容 `padding` 会被设置为 0。
- 切分时子卡片的 `border-radius`会被设置为 0。

<code src="./demos/split2.tsx" background="#f0f2f5"/>

<code src="./demos/split23.tsx" background="#f0f2f5"/>

<code src="./demos/split.tsx" background="#f0f2f5"/>

### 栅格间隔

栅格常常需要和间隔进行配合，你可以使用 `gutter` 属性，我们推荐使用 `(16+8n)px` 作为栅格间隔(n 是自然数)，如果要支持响应式，可以写成 `{ xs: 8, sm: 16, md: 24, lg: 32 }`。如果需要垂直间距，可以写成数组形式 `[水平间距, 垂直间距][16, { xs: 8, sm: 16, md: 24, lg: 32 }]`。

<code src="./demos/gutter.tsx" background="#f0f2f5" />

### 标题带分割线

当添加分隔线时会自动增加标题的高度与内容区域分开。

<code src="./demos/headerBordered.tsx" background="#f0f2f5" />

### 可折叠

- 你可以使用 `collapsible` 来配置卡片是否可折叠，通过 `defaultCollapsed` 属性配置是否默认折叠。
- 或者你可以通过 `collapsed` 属性受控进行自定义。

<code src="./demos/collapsible.tsx" background="#f0f2f5" />

### 内容居中

配置 `layout`属性为`center`控制内容垂直居中。

<code src="./demos/layout.tsx" background="#f0f2f5" />

### 加载中

配置 `loading`属性为`true`控制卡片加载中，也可以传入 DOM 给`loading`来自定义 loading 展示。

<code src="./demos/loading.tsx" background="#f0f2f5" />

### 无标题

头部没有内容时会自动隐藏。

<code src="./demos/headless.tsx" background="#f0f2f5" />

### 带边框

配置 `bordered` 属性控制是否卡片带边框。

<code src="./demos/bordered.tsx" />

### 竖向步骤示例

`Steps` 组件结合 `ProCard` 组件完成竖向步骤示例。

<code src="./demos/steps-v.tsx" background="#f0f2f5" />

## API

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
|  title | 标题 | `React.ReactNode` | - |
|  tip | 标题右侧图标 hover 提示信息 | `string` | - |
|  extra | 右上角自定义区域 | `React.ReactNode` | - |
|  layout | 内容布局，支持垂直居中 | `default` \| `center`  | default |
|  loading | 加载中，支持自定义 loading 样式 | `boolean` \| `ReactNode` | false |
| colSpan | 栅格布局宽度，24 栅格，支持指定宽度 px 或百分比, 支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | `number` \| `string` | 24 |
|  gutter | 数字或使用数组形式同时设置 [水平间距, 垂直间距], 支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | `number` \| `array` | 0 |
|  split | 拆分卡片的方向 | `vertical` \| `horizontal`  | - |
| bordered | 是否有边框 | `boolean` | false |
| ghost | 幽灵模式，即是否取消卡片内容区域的 padding 和 卡片的背景颜色。 | `boolean` | false |
| headerBordered | 页头是否有分割线 | `boolean` | false |
| collapsed | 受控属性，是否折叠 | `boolean` | false |
| collapsible | 配置是否可折叠，受控时无效 | `boolean` | false |
| defaultCollapsed | 默认折叠, 受控时无效 | `boolean` | false |
| onCollapse | 收起卡片的事件，受控时无效 | `(collapsed: boolean) => void;` | - |
