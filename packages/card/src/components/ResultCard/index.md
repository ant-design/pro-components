---
title: ResultCard - 结果卡片
order: 1
atomId: ResultCard
---

# ResultCard 结果卡片

集合信息流和结果的卡片，特点：

- ① 快速结果卡片展示
- ② 可添加自定义 Pipeline 信息流

## 何时使用

- 需要弹出展示提示内容时
- 需要快速方便展示 Result 的内容时

> 因为该组件基于 ProCard 进行改造，你除了使用特定 api 外，也可以使用 ProCard 所支持的所有 api

## 代码演示

### 基础使用

普通的 ResultCard 使用

<code src="./demos/basic.tsx" background="var(--main-bg-color)" title="基础使用" description="默认使用 `ResultCard`" iframe='500'></code>

### 流水线

带 pipline 流水线能力的结果卡片

<code src="./demos/pipline.tsx" background="var(--main-bg-color)" title="流水线" description="添加 `Pipline` 展示流水线能力" iframe='500'></code>

### 自定义 Action

<code src="./demos/actions.tsx" background="var(--main-bg-color)" title="自定义Action" description="自定义 Action 能力" iframe='700'></code>

### 页面级

修改 mode 属性为 pages 可以将卡片变成页面层级的结果页面，这种情况下，宽度将不再收到卡片的限制，并去掉了卡片的边框展示

<code src="./demos/pages.tsx" background="var(--main-bg-color)" title="页面级" description="在页面层级展示" iframe='700'></code>
