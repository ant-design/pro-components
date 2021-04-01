---
title: Schema Form - JSON 表单
order: 1
group:
  path: /
nav:
  title: 组件
  path: /components
---

# JSON 表单

SchemaForm 是根据 JSON Schema 来生成表单的工具。SchemaForm 会根据 valueType 来映射成不同的表单项。以下是支持的常见表单项：

| valueType       | 说明                         |
| --------------- | ---------------------------- |
| `password`      | 密码输入框                   |
| `money`         | 金额输入框                   |
| `textarea`      | 文本域                       |
| `date`          | 日期                         |
| `dateTime`      | 日期时间                     |
| `dateWeek`      | 周                           |
| `dateMonth`     | 月                           |
| `dateQuarter`   | 季度输入                     |
| `dateYear`      | 年份输入                     |
| `dateRange`     | 日期区间                     |
| `dateTimeRange` | 日期时间区间                 |
| `time`          | 时间                         |
| `timeRange`     | 时间区间                     |
| `text`          | 文本框                       |
| `select`        | 下拉框                       |
| `checkbox`      | 多选框                       |
| `rate`          | 星级组件                     |
| `radio`         | 单选框                       |
| `radioButton`   | 按钮单选框                   |
| `progress`      | 进度条                       |
| `percent`       | 百分比组件                   |
| `digit`         | 数字输入框                   |
| `second`        | 秒格式化                     |
| `avatar`        | 头像                         |
| `code`          | 代码框                       |
| `switch`        | 单选多选                     |
| `fromNow`       | 相对于当前时间               |
| `image`         | 图片                         |
| `jsonCode`      | 代码框，但是带了 json 格式化 |
| `color`         | 时间选择器                   |

这里 demo 可以来了解一下各个 valueType 的展示效果

<code src="./demos/valueType.tsx" height="154px" title="schema 表单" />

如果我们带的 valueType 不能满足需求，我们可以用自定义 valueType 来做我适应我们业务的问题。

<code src="./demos/customization-value-type.tsx" height="154px" title="schema 表单" />

## 代码示例

### JSON 来生成表单

<code src="./demos/schema.tsx" height="764px" title="schema 表单" />
