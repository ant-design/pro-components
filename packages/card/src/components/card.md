---
title: ProCard - 高级卡片
atomId: ProCard
---

# ProCard - 高级卡片

页内容器卡片，提供标准卡片样式，卡片切分以及栅格布局能力。ProCard 创造性地将 `Col`, `Row`, `Card`, `Tabs` 等组件实现结合在一起，让你仅用一个组件就能够完成卡片相关的各种布局。

- 如果你还需要结合图表一起使用，可以参考 `StatisticCard` 指标卡组件，他是 ProCard 的进一步封装。
- 若您也需要封装 `ProCard`，注意需要透出 `isProCard=true` 的静态属性让 ProCard 可以识别为同一个元素。

## 何时使用

- 需要一个标准卡片容纳内容时。
- 需要多个卡片栅格，gutter 布局时。
- 需要进行卡片内切分布局时。
- 需要卡片可折叠时。

## 代码演示

<code src="../demos/basic.tsx" background="var(--main-bg-color)" title="基础卡片" description="当单独使用时 `ProCard` 就是一个普通的卡片。"></code>

<code src="../demos/colspan.tsx" background="var(--main-bg-color)" title="栅格布局" description="当嵌套子卡片时, 组件会自动切换为 `flex` 弹性盒布局，你可以将 `direction`设置为`column`来指定 Flex 方向，你还可以通过配置 `ghost` 属性为 `true` 来去掉背景色和 padding 方便页内布局。"></code>

<code src="../demos/responsive.tsx" background="var(--main-bg-color)" title="响应式" description="`colSpan` 支持 antd 定义的[栅格式响应布局](https://ant.design/components/grid-cn/#components-grid-demo-responsive)。预设六个响应尺寸：`xs` `sm` `md` `lg` `xl` `xxl`。如果要支持响应式，可以写成 `{ xs: 4, sm: 8, md: 10, lg: 12 }`。"></code>

### 卡片切分

布局模式下通过配置 `split` 可以方便地切分卡片，可以进行任意的分栏，不管是横切还是竖切都非常便利，切分出来的分栏仍然保有卡片的特性，高度自动撑满。注意：

- 切分时父卡片的内容 `padding` 会被设置为 0。
- 切分时子卡片的 `border-radius`会被设置为 0。

<code src="../demos/split2.tsx" background="var(--main-bg-color)" ></code>

### 左右分栏

通过卡片切分能力我们很容易实现左右分栏的效果，很适合左侧是列表，右侧是详情的结构。

<code src="../demos/split23.tsx" background="var(--main-bg-color)"  ></code>

### 复杂切分

通过卡片切分能力我们可以实现更加复杂的数据展现形式。

<code src="../demos/split.tsx" background="var(--main-bg-color)"  ></code>

### 栅格间隔

栅格常常需要和间隔进行配合，你可以使用 `gutter` 属性，我们推荐使用 `(16+8n)px` 作为栅格间隔(n 是自然数)，如果要支持响应式，可以写成 `{ xs: 8, sm: 16, md: 24, lg: 32 }`。如果需要垂直间距，可以写成数组形式 `[水平间距, 垂直间距][16, { xs: 8, sm: 16, md: 24, lg: 32 }]`。

<code src="../demos/gutter.tsx" background="var(--main-bg-color)"  ></code>

### 多行卡片

默认卡片布局不可换行，你可以配置 `wrap` 为 `true` 来让多个卡片之间可以换行，适用于多个卡片排版的情况。

<code src="../demos/multipleLine.tsx" background="var(--main-bg-color)"  ></code>

### 分组展示

你可以嵌套卡片组件来将内容分组, 以及 `Divider` 子组件来分隔这些内容。

<code src="../demos/divider.tsx" background="var(--main-bg-color)" ></code>

### 标题带分割线

当添加分隔线时会自动增加标题的高度与内容区域分开。

<code src="../demos/headerBordered.tsx" background="var(--main-bg-color)"  ></code>

### 可折叠

- 你可以使用 `collapsible` 来配置卡片是否可折叠，通过 `defaultCollapsed` 属性配置是否默认折叠。
- 或者你可以通过 `collapsed` 属性受控进行自定义。

<code src="../demos/collapsible.tsx" background="var(--main-bg-color)" ></code>

### 卡片组展开

配合 `ghost`幽灵模式和可折叠能力可以实现卡片组展开。

<code src="../demos/group.tsx" background="var(--main-bg-color)"  ></code>

### 内容居中

配置 `layout` 属性为 `center` 控制内容垂直居中，设置居中时内容部分转为 `flex` 布局，可以使用 `direction` 控制 `flex` 方向。

<code src="../demos/layout.tsx" background="var(--main-bg-color)"  ></code>

### 加载中

配置 `loading`属性为`true`控制卡片加载中，也可以传入 DOM 给`loading`来自定义 loading 展示。

<code src="../demos/loading.tsx" background="var(--main-bg-color)"  ></code>

### 操作项

配置 `actions` 属性来配置卡片操作项。

<code src="../demos/actions.tsx" background="var(--main-bg-color)"  ></code>

### 无标题

头部没有内容时会自动隐藏。

<code src="../demos/headless.tsx" background="var(--main-bg-color)"  ></code>

### 带边框

配置 `bordered` 属性控制是否卡片带边框。

<code src="../demos/bordered.tsx" background="var(--main-bg-color)"></code>

<code src="../demos/hoverable.tsx" title="浮出效果" desc="通过 hoverable 配置浮出效果" background="var(--main-bg-color)" ></code>

### 页签

配置 `tabs` 属性配合 `ProCard.TabPane` 子组件可以配置卡片的标签栏。

<code src="../demos/tabs.tsx" background="var(--main-bg-color)" ></code>

### 卡片式页签

配置 `tab` 的 `type` 为 `card` 来配置卡片式页签。

<code src="../demos/tabs-card.tsx" background="var(--main-bg-color)" ></code>

### 内部卡片

可以放在卡片内部，展示多层级结构的信息。

<code src="../demos/inner.tsx" background="var(--main-bg-color)"></code>

### 竖向步骤示例

`Steps` 组件结合 `ProCard` 组件完成竖向步骤示例。

<code src="../demos/steps-v.tsx" background="var(--main-bg-color)"  ></code>

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| title | 标题 | `React.ReactNode` | - |
| subTitle | 副标题 | `React.ReactNode` | - |
| tooltip | 标题右侧图标 hover 提示信息 | `string` | - |
| headStyle | 标题的 style 样式 | `CSSProperties` | - |
| bodyStyle | 内容区的 style 样式 | `CSSProperties` | - |
| extra | 右上角自定义区域 | `React.ReactNode` | - |
| layout | 内容布局，支持垂直居中 | `default` \| `center`  | default |
| loading | 加载中，支持自定义 loading 样式 | `boolean` \| `ReactNode` | false |
| colSpan | 栅格布局宽度，24 栅格，支持指定宽度 px 或百分比, 支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}`, 仅在嵌套的子卡片上设置有效。 | `number` \| `string` | 24 |
| gutter | 数字或使用数组形式同时设置 [水平间距, 垂直间距], 支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | `number` \| `array` | 0 |
| split | 拆分卡片的方向 | `vertical` \| `horizontal`  | - |
| type | 卡片类型 | `inner` \| `default` | - |
| size | 卡片尺寸 | `default` \| `small` | - |
| actions | 卡片操作组，位置在卡片底部 | `Array&lt;ReactNode>` | - |
| direction | 指定 Flex 方向，仅在嵌套子卡片时有效，默认方向为 row 横向 | `column` | - |
| wrap | 是否支持换行，仅在嵌套子卡片时有效 | false | - | 1.12.0 |
| bordered | 是否有边框 | `boolean` | false |
| ghost | 幽灵模式，即是否取消卡片内容区域的 padding 和 卡片的背景颜色。 | `boolean` | false |
| headerBordered | 页头是否有分割线 | `boolean` | false |
| collapsed | 受控属性，是否折叠 | `boolean` | false |
| collapsible | 配置是否可折叠，受控时无效 | `boolean` | false |
| collapsibleIconRender | 替换默认折叠图标 | `({ collapsed }: { collapsed: boolean }) => React.ReactNode` | - |
| defaultCollapsed | 默认折叠, 受控时无效 | `boolean` | false |
| onCollapse | 收起卡片的事件，受控时无效 | `(collapsed: boolean) => void` | - |
| tabs | 标签页配置 | 见下面 ProCardTabs | - |

### ProCardTabs

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| activeKey | 当前选中项 | string | - |
| type | 页签的基本样式，可选 `line`、`card`、`editable-card` 类型 | string | inline |
| onChange | 回调 | `(activeKey: string) => void;` | - |
| items | 基于 antd 拓展的页签的基本配置，必填 | `ItemsProps` | - |

- 更多属性见 antd [Tab](https://ant.design/components/tabs-cn/#Tabs) API 描述。

### ItemsProps

支持 [Tabs](https://ant.design/components/tabs-cn/#Tabs.TabPane) 下页签的所有属性。

| 参数      | 说明                 | 类型      | 默认值 |
| :-------- | :------------------- | :-------- | :----- |
| cardProps | ProCard 卡片属性透传 | `ProCard` | -      |

### ProCard.TabPane

> 该参数即将被 Items 所平替，请及时更新使用 ItemsProps 配置新的内容

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| key | 对应 activeKey，用于标定是否选中和 dom 更新，一定不要重复，不然会造成表现异常 | `string` | - |
| tab | 选项卡头显示文字 | `ReactNode` | - |
| disabled | 不可用 | `boolean` | false |
| cardProps | ProCard 卡片属性透传 | `ProCard` | - |

### ProCard.Divider

用于在将内容进行分组时进行分隔。

| 参数 | 说明     | 类型                     | 默认值 |
| ---- | -------- | ------------------------ | ------ |
| type | 分隔类型 | `horizontal \| vertical` | -      |

### ProCard.Group

属性同 ProCard，会取消卡片内容边距，用于将多个卡片进行分组。
