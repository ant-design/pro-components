---
title: QueryFilter
group:
  path: /form
nav:
  title: 表单
  path: /form
---

# QueryFilter

## 示例

<code src="../demos/query-filter.tsx" />

## API

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
