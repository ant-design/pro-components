---
title: 预设样式
order: 7
group:
  path: /table
nav:
  title: 表格
  path: /table
---

# 值类型

ProTable 封装了一些常用的值类型来减少重复的 `render` 操作，配置一个`valueType` 即可展示格式化响应的数据。

## valueType

现在支持的值如下

| 类型 | 描述 | 示例 |
| --- | --- | --- |
| money | 转化值为金额 | ¥10,000.26 |
| date | 日期 | 2019-11-16 |
| dateRange | 日期区间 | 2019-11-16 2019-11-18 |
| dateTime | 日期和时间 | 2019-11-16 12:50:00 |
| dateTimeRange | 日期和时间区间 | 2019-11-16 12:50:00 2019-11-18 12:50:00 |
| time | 时间 | 12:50:00 |
| option | 操作项，会自动增加 marginRight，只支持一个数组,表单中会自动忽略 | `[<a>操作a</a>,<a>操作b</a>]` |
| text | 默认值，不做任何处理 | - |
| textarea | 与 text 相同， form 转化时会转为 textarea 组件 | - |
| index | 序号列 | - |
| indexBorder | 带 border 的序号列 | - |
| progress | 进度条 | - |
| digit | [格式化](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)数字展示，form 转化时会转为 inputNumber | - |
| percent | 百分比 | +1.12 |
| code | 代码块 | `const a = b` |
| avatar | 头像 | 展示一个头像 |

## 传入 function

只有一个值并不能表现很多类型，`progress` 就是一个很好的例子。所以我们支持传入一个 function。你可以这样使用：

```tsx |pure
const columns = {
  title: '进度',
  key: 'progress',
  dataIndex: 'progress',
  valueType: (item: T) => ({
    type: 'progress',
    status: item.status !== 'error' ? 'active' : 'exception',
  }),
};
```

### 支持的返回值

### progress

#### progress

```js
return {
  type: 'progress',
  status: 'success' | 'exception' | 'normal' | 'active',
};
```

### money

```js
return { type: 'money', locale: 'en-Us' };
```

### percent

```js
return { type: 'percent', showSymbol: true | false, precision: 2 };
```

## valueEnum

valueEnum 需要传入一个枚举，ProTable 会自动根据值获取响应的枚举，并且在 from 中生成一个下拉框。看起来是这样的：

```ts | pure
const valueEnum = {
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
  },
};

// 也可以设置为一个function
const valueEnum = (row) =>
  row.isMe
    ? {
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      }
    : {
        open: {
          text: '等待解决',
          status: 'Error',
        },
        closed: {
          text: '已回应',
          status: 'Success',
        },
      };
```

> 这里值得注意的是在 from 中并没有 row，所以传入了一个 null，你可以根据这个来判断要在 from 中显示什么选项。

## 示例

### 日期类

<code src="../demos/valueTypeDate.tsx" />

### 数字类

<code src="../demos/valueTypeNumber.tsx" />

### 样式类

<code src="../demos/valueType.tsx" />
