---
title: ProForm
nav:
  title: ProForm
  path: /form
---

# ProForm

高级表单，提供一个更加快速的方案来构建表单。

## ProForm 基础使用

<code src="../demos/base.tsx" />

## QueryFilter 查询过滤

<code src="../demos/query-filter.tsx" />

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| collapsed | 是否折叠超出的表单项，用于受控模式 | `boolean` | - |
| defaultCollapsed | 默认状态下是否折叠超出的表单项 | `boolean` | true |
| onCollapse | 切换表单折叠状态时的回调 | `Function(collapsed)` | - |
| onSubmit | 提交表单的回调，同 antd 3 `Form` 组件 API | `Function(e)` | - |
| onFinish | 提交表单且数据验证成功后回调事件，同 antd 4 `Form` 组件 API | `Function(e)` | - |
| onReset | 点击重置按钮的回调，设置后重置按钮才会被渲染 | `Function(e)` | - |
| labelLayout | 设置表单标签布局模式。标签与控件的宽度比例默认为 1:2；设置为 `growth` 时为 1:1；设置为 `vertical` 时为各自独占一行 | `'default' | 'growth' | 'vertical'` | default |
| locale | 国际化文案配置 | object | [默认配置](http://gitlab.alipay-inc.com/tech-ui/tech-ui/tree/master/packages/tech-ui/src/AdvancedQuery/locale/zh-CN) |
| hideRequiredMark | 隐藏所有表单项的必选标记，**默认隐藏** | `boolean` | true |
| defaultColsNumber | 自定义折叠状态下默认显示的表单控件数量，没有设置或小于 0，则显示一行控件; 数量大于等于控件数量则隐藏展开按钮 | `number` | - |
| (...) | 支持除 `wrapperCol` \| `labelCol` \| `layout` 外的其他 antd `Form` 组件参数 | - | - |

### 响应式断点规则

注意，断点的值均指表单容器的大小而非视口大小。

| 容器宽度断点          | 单行展示表单列数（包含操作区域）     |
| --------------------- | ------------------------------------ |
| `≧ 1057px`            | 4                                    |
| `≧ 785px && < 1057px` | 3                                    |
| `≧ 513px && < 785px`  | 2                                    |
| `< 513px`             | 1（此时 label 与控件会强制上下布局） |
