---
nav:
  title: Card
group: Card
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

<code src="../../../demos/card/StatisticCard/basic.tsx" background="var(--main-bg-color)"  oldtitle="基本使用"></code>

### 只有图表

当图表单独展示在卡片中时。

<code src="../../../demos/card/StatisticCard/chart.tsx" background="var(--main-bg-color)" oldtitle="只有图表" ></code>

### 额外指标

- `footer` 用于设置额外的指标展示区域。
- 你可以设置 `Statistic` 组件的布局方式`layout` 为 `horizontal` 来展示横向指标。

### 总分 / 主次关系

<code src="../../../demos/card/StatisticCard/total.tsx" background="var(--main-bg-color)" oldtitle="总分/主次关系" ></code>

### 总分 / 业绩目标

<code src="../../../demos/card/StatisticCard/total-layout.tsx" background="var(--main-bg-color)" oldtitle="总分/业绩目标" ></code>

### 分组指标

你可以嵌套指标卡组件来将指标分组，以及 `Divider` 子组件来分隔这些指标。

### 分组指标带图表

<code src="../../../demos/card/StatisticCard/group-chart.tsx" background="var(--main-bg-color)"  oldtitle="分组指标带图表"></code>

### 公式计算指标

`Operation` 可以接受子元素，借此可以实现各种各样的公式计算指标。

<code src="../../../demos/card/StatisticCard/fomula.tsx" background="var(--main-bg-color)" oldtitle="公式计算指标" ></code>

### 状态展示

你可以给每个数值统计配置 `status` 展示其状态。

<code src="../../../demos/card/StatisticCard/status.tsx" background="var(--main-bg-color)" oldtitle="状态展示" ></code>

### 图标展示

你可以给每个数值统计配置 `icon` 展示其图标。

<code src="../../../demos/card/StatisticCard/icon.tsx" background="var(--main-bg-color)" oldtitle="图标展示" ></code>

### 卡片布局

配合 `ProCard` 的卡片切分能力可以实现复杂的卡片布局。

<code src="../../../demos/card/StatisticCard/layout.tsx" background="var(--main-bg-color)" oldtitle="卡片布局" ></code>

### 图表在右

配置 `chartPlacement` 为 `right` 可以指定图表在数值统计的右边。默认为上下结构。

<code src="../../../demos/card/StatisticCard/horizontal.tsx" background="var(--main-bg-color)" oldtitle="图表在右" ></code>

### 图表在左

配置 `chartPlacement` 为 `left` 可以指定图表在数值统计的左边。

<code src="../../../demos/card/StatisticCard/horizontal-left.tsx" background="var(--main-bg-color)" oldtitle="图表在左" ></code>

### 指标页签联动

结合 `Statistic` 可以实现带指标统计的页签。

<code src="../../../demos/card/StatisticCard/tabs-statistic.tsx" background="var(--main-bg-color)" oldtitle="带指标页签" ></code>

### 环比趋势

<code src="../../../demos/card/StatisticCard/trend.tsx" background="var(--main-bg-color)" oldtitle="环比趋势" ></code>

## API

### StatisticCard

| 参数           | 说明         | 类型                                     | 默认值  |
| -------------- | ------------ | ---------------------------------------- | ------- |
| statistic      | 统计数值配置 | `StatisticProps`                         | -       |
| chart          | 图表配置     | `ReactNode`                              | -       |
| chartPlacement | 图表位置     | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| footer         | 底部内容     | `ReactNode`                              | -       |
| children       | 子元素       | `ReactNode`                              | -       |

### StatisticProps

继承 antd Statistic 组件的所有属性，额外支持：

| 参数   | 说明     | 类型                         | 默认值       |
| ------ | -------- | ---------------------------- | ------------ |
| status | 状态     | `'up' \| 'down'`             | -            |
| icon   | 图标     | `ReactNode`                  | -            |
| layout | 布局方式 | `'horizontal' \| 'vertical'` | `'vertical'` |
