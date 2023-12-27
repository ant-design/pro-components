---
title: StatisticCard - 指标卡
order: 1
atomId: StatisticCard
---

# StatisticCard 指标卡

指标卡结合统计数值用于展示某主题的核心指标，结合 [Ant Design Charts](https://charts.ant.design/) 图表库丰富数值内容，满足大多数数值展示的场景。

> 注意 demo 中的所有图表示例可以到 charts 的官网中找到，这里不再给出实际代码示例，仅以图片进行代替，所以相关交互是没有的。

> 若有内容撑开卡片的情况请设置内容宽度为 100% 或设置定宽。

## 何时使用

- 1）在页面内的重要位置，展示重要信息；
- 2）在概览页面展示系统功能。

## 代码演示

### 基本使用

使用数值统计配置 `statistic` 和 `chart` 完成基本的指标卡。

<code src="./demos/basic.tsx" background="var(--main-bg-color)"  oldtitle="基本使用"></code>

### 只有图表

当图表单独展示在卡片中时。

<code src="./demos/chart.tsx" background="var(--main-bg-color)" oldtitle="只有图表" ></code>

### 额外指标

- `footer` 用于设置额外的指标展示区域。
- 你可以设置 `Statistic` 组件的布局方式`layout` 为 `horizontal` 来展示横向指标。

### 总分 / 主次关系

<code src="./demos/total.tsx" background="var(--main-bg-color)" oldtitle="总分/主次关系" ></code>

### 总分 / 业绩目标

<code src="./demos/total-layout.tsx" background="var(--main-bg-color)" oldtitle="总分/业绩目标" ></code>

### 分组指标

你可以嵌套指标卡组件来将指标分组，以及 `Divider` 子组件来分隔这些指标。

### 分组指标带图表

<code src="./demos/group-chart.tsx" background="var(--main-bg-color)"  oldtitle="分组指标带图表"></code>

### 公式计算指标

`Operation` 可以接受子元素，借此可以实现各种各样的公式计算指标。

<code src="./demos/fomula.tsx" background="var(--main-bg-color)" oldtitle="公式计算指标" ></code>

### 状态展示

你可以给每个数值统计配置 `status` 展示其状态。

<code src="./demos/status.tsx" background="var(--main-bg-color)" oldtitle="状态展示" ></code>

### 图标展示

你可以给每个数值统计配置 `icon` 展示其图标。

<code src="./demos/icon.tsx" background="var(--main-bg-color)" oldtitle="图标展示" ></code>

### 卡片布局

配合 `ProCard` 的卡片切分能力可以实现复杂的卡片布局。

<code src="./demos/layout.tsx" background="var(--main-bg-color)" oldtitle="卡片布局" ></code>

### 图表在右

配置 `chartPlacement` 为 `right` 可以指定图表在数值统计的右边。默认为上下结构。

<code src="./demos/horizontal.tsx" background="var(--main-bg-color)" oldtitle="图表在右" ></code>

### 图表在左

配置 `chartPlacement` 为 `left` 可以指定图表在数值统计的左边。

<code src="./demos/horizontal-left.tsx" background="var(--main-bg-color)" oldtitle="图表在左" ></code>

### 指标页签联动

结合 `Statistic` 可以实现带指标统计的页签。

<code src="./demos/tabs-statistic.tsx" background="var(--main-bg-color)" oldtitle="带指标页签" ></code>

### 环比趋势

你可以使用 `Statistic` 组件配置布局 `layout` 为 `inline` 以及 `trend` 来展示环比趋势。

<code src="./demos/trend.tsx" background="var(--main-bg-color)" oldtitle="环比趋势" ></code>

## API

### StatisticCard

| 参数             | 说明                             | 类型                        | 默认值   |
| -------------- | ------------------------------ | ------------------------- | ----- |
| title          | 卡片标题                           | `string\|ReactNode`       | -     |
| extra          | 卡片右上角的操作区域                     | `string\|ReactNode`       | -     |
| loading        | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | boolean                   | false |
| bordered       | 是否有边框                          | boolean                   | true  |
| chart          | 图表卡片                           | ReactNode                 | -     |
| statistic      | 数值统计配置，布局默认为 `vertical`        | 参数见下 Statistic            | -     |
| chartPlacement | 图表位置，相对于 statistic 的位置         | `left \| right \| bottom` | -     |
| footer         | 额外指标展示                         | `ReactNode`               | -     |

更多参考 `ProCard`，支持 `ProCard` 的所有 API。

### Statistic

| 参数          | 说明               | 类型                                                              | 默认值      |
| ----------- | ---------------- | --------------------------------------------------------------- | -------- |
| prefix      | 设置数值的前缀          | string \| ReactNode                                             | -        |
| suffix      | 设置数值的后缀          | string \| ReactNode                                             | -        |
| title       | 数值的标题            | string \| ReactNode                                             | -        |
| tip         | 标题提示             | string\| ReactNode                                              | -        |
| value       | 数值内容             | string \| number                                                | -        |
| icon        | 图标               | ReactNode                                                       | -        |
| status      | 设置状态点，同 Badge 组件 | `Enum{ 'success', 'processing, 'default', 'error', 'warning' }` | -        |
| valueStyle  | 设置数值的样式          | style                                                           | -        |
| description | 描述性标签            | React.ReactNode \| () => React.ReactNode                        | -        |
| layout      | 布局               | `horizontal \| vertical \| inline`                              | `inline` |
| trend       | 趋势               | `up \| down \|`                                                 | -        |

更多 API 参考 [Statistic](https://ant.design/components/statistic-cn/)，支持 `Statistic` 的所有 API。

### Divider

用于在将数值统计进行分组时进行分隔。

| 参数   | 说明   | 类型                       | 默认值 |
| ---- | ---- | ------------------------ | --- |
| type | 分隔类型 | `horizontal \| vertical` | -   |

### Operation

用于操作符渲染。

### Group

属性同 `StatisticCard`，会取消卡片内容边距，用于将多个卡片进行分组。
