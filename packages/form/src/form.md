---
title: ProForm
nav:
  title: ProForm
  path: /form
---

# ProForm

高级表单，提供一个更加快速的方案来构建表单。

## 通用 API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onFinish | 提交表单且数据验证成功后回调事件，同 antd 4 `Form` 组件 API | `Function(e)` | - |
| onReset | 点击重置按钮的回调，设置后重置按钮才会被渲染 | `Function(e)` | - |
| submiterProps | TODO | TODO | - |
| (...) | 支持除 `wrapperCol` \| `labelCol` \| `layout` 外的其他 antd `Form` 组件参数 | - | - |

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
| hideRequiredMark | 隐藏所有表单项的必选标记，**默认隐藏** | `boolean` | true |
| defaultColsNumber | 自定义折叠状态下默认显示的表单控件数量，没有设置或小于 0，则显示一行控件; 数量大于等于控件数量则隐藏展开按钮 | `number` | - |
| labelWidth | label 宽度 | `number` | - |

### 响应式断点规则

注意，断点的值均指表单容器的大小而非视口大小。

| 容器宽度断点          | 单行展示表单列数（包含操作区域）     |
| --------------------- | ------------------------------------ |
| `≧ 1057px`            | 4                                    |
| `≧ 785px && < 1057px` | 3                                    |
| `≧ 513px && < 785px`  | 2                                    |
| `< 513px`             | 1（此时 label 与控件会强制上下布局） |

## SearchFilter 搜索过滤

<code src="../demos/search-filter.tsx" />

## LightFilter 轻量筛选

<code src="../demos/light-filter.tsx" />
