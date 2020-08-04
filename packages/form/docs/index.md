---
title: 简介
order: 0
sidemenu: false
group:
  path: /form
nav:
  title: 表单
  path: /form
  order: 1
---

> 开发中，请勿用于生产环境。

高级表单，提供一个更加快速的方案来构建表单。

## 示例

### 基本使用

<code src="../demos/base.tsx" />

### 查询筛选

<code src="../demos/query-filter.tsx" />

### 查询筛选-默认收起

<code src="../demos/query-filter-collapsed.tsx" />

### 查询筛选-垂直布局

<code src="../demos/query-filter-vertical.tsx" />

### 查询筛选-搜索

<code src="../demos/search-filter.tsx" background="#f0f2f5"/>

### 轻量筛选

<code src="../demos/light-filter.tsx" />

## API

### ProForm

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onFinish | 提交表单且数据验证成功后回调事件，同 antd 4 `Form` 组件 API | `Function(e)` | - |
| onReset | 点击重置按钮的回调，设置后重置按钮才会被渲染 | `Function(e)` | - |
| submitter | 提交按钮相关配置 | `boolean` \| `SubmitterProps` | `true` |
| (...) | 支持除 `wrapperCol` \| `labelCol` \| `layout` 外的其他 antd `Form` 组件参数 | - | - |

### ProForm.Group

| 参数     | 说明                 | 类型              | 默认值 |
| -------- | -------------------- | ----------------- | ------ |
| title    | 标题                 | `string`          | -      |
| children | 表单控件或者其他元素 | `React.ReactNode` | -      |

### QueryFilter

QueryFilter 除了继承 ProForm 的 API 以外还支持下面的属性。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| collapsed | 是否折叠超出的表单项，用于受控模式 | `boolean` | - |
| defaultCollapsed | 默认状态下是否折叠超出的表单项 | `boolean` | true |
| onCollapse | 切换表单折叠状态时的回调 | `Function(collapsed)` | - |
| hideRequiredMark | 隐藏所有表单项的必选标记，**默认隐藏** | `boolean` | true |
| defaultColsNumber | 自定义折叠状态下默认显示的表单控件数量，没有设置或小于 0，则显示一行控件; 数量大于等于控件数量则隐藏展开按钮 | `number` | - |
| labelWidth | label 宽度 | `number` | - |
| span | 表单项宽度 | `number[0 - 24]` | - |
| split | 每一行是否有分割线 | `boolean` | - |

#### 响应式断点规则

注意，断点的值均指表单容器的大小而非视口大小。

| 容器宽度断点          | 单行展示表单列数（包含操作区域）     |
| --------------------- | ------------------------------------ |
| `≧ 1057px`            | 4                                    |
| `≧ 785px && < 1057px` | 3                                    |
| `≧ 513px && < 785px`  | 2                                    |
| `< 513px`             | 1（此时 label 与控件会强制上下布局） |
