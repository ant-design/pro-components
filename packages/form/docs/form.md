---
title: ProForm - 高级表单
order: 0
group:
  path: /
nav:
  title: 组件
  path: /components
---

> 开发中，请勿用于生产环境。

# ProForm

ProForm 在原来的 Form 的基础上增加一些语法糖和更多的布局设置，帮助我们快速的开发 From 表单。使用方法与 From 大致相同，但是 ProForm 会自动格式化 date 的 moment 数据，你可以通过 dateFormatter 来关闭这个预设。

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

### 混合使用

<code src="../demos/components-other.tsx" />

## API

### ProForm

> antd 的 From api 查看[这里](https://ant.design/components/form-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onFinish | 提交表单且数据验证成功后回调事件，同 antd 4 `Form` 组件 API | `Function(e)` | - |
| onReset | 点击重置按钮的回调，设置后重置按钮才会被渲染 | `Function(e)` | - |
| submitter | 提交按钮相关配置 | `boolean` \| `SubmitterProps` | `true` |
| dateFormatter | 自动格式数据，例如 moment 的表单,支持 string 和 number 两种模式 | `string\| number \|false` | string |
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
| labelWidth | label 宽度 | `number` \| `'auto'` | `98` |
| span | 表单项宽度 | `number[0 - 24]` | - |
| split | 每一行是否有分割线 | `boolean` | - |

#### 响应式断点规则

注意，断点的值均指表单容器的大小而非视口大小。

##### 默认布局时的规则

| 容器宽度断点          | 单行展示表单列数（包含操作区域） | 默认布局     |
| --------------------- | -------------------------------- | ------------ |
| `≧ 1352px`            | 4                                | `horizontal` |
| `≧ 1062px`            | 3                                | `horizontal` |
| `≧ 701px && < 1063px` | 2                                | `horizontal` |
| `≧ 513px && < 701px`  | 2                                | `vertical`   |
| `< 513px`             | 1                                | `vertical`   |

##### 强制上下布局时的规则

| 容器宽度断点          | 单行展示表单列数（包含操作区域） |
| --------------------- | -------------------------------- |
| `≧ 1057px`            | 4                                |
| `≧ 785px && < 1057px` | 3                                |
| `≧ 513px && < 785px`  | 2                                |
| `< 513px`             | 1                                |
