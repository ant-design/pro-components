---
title: ProDescriptions - 快速开始
order: 0
group:
  path: /
nav:
  title: 快速开始
  path: /docs
  order: 0
---

# ProDescriptions - 快速开始

ProDescriptions 的诞生是为了解决项目中需要写很多 Descriptions 的样板代码的问题，所以在其中做了封装了很多常用的逻辑。

在 react 中写一个 Descriptions 免不了需要定义一些雷同的属性。所以 ProDescriptions 默认封装了请求网络，columns 列展示的逻辑。

## 请求数据

request 中封装了请求网络的行为，ProDescriptions 会将 props.params 中的数据默认带入到请求中，如果接口恰好与我们的定义相同，实现一个查询会非常简单。

```tsx | pure
import request from 'umi-request';

const fetchData = (params) =>
  request<{
    data: T{};
  }>('https://proapi.azurewebsites.net/github/issues', {
    params,
  });

const keyWords = "Ant Design"

<ProDescriptions<T,U> request={fetchData} />;
```

我们约定 request 拥有一个参数， `params` 会自带 props 中的 `params` 。类型如下:

```tsx | pure
(params: U) => RequestData;
```

对与请求回来的结果的 ProDescriptions 也有一些约定，类型如下：

```tsx | pure
interface RequestData {
  data: Datum{};
  success: boolean;
}
```

## 列配置

列配置复杂把数据映射成为具体的 dom, ProDescriptions 在 antd 的基础上进行了一些封装，支持了一些默认的行为作为 render 的语法糖，我们可以在列中配置 valueType 配置一个字符串。现在支持的值如下：

> 如果你的值的不是下面的类型，可以用 renderText 来进行修改，render 会覆盖掉 valueType。

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

valueType 还会影响查询表单的生成,不同的 valueType 对应不同的 antd 组件，对应关系如下：

| 类型 | 对应的组件 |
| --- | --- |
| text | [Input](https://ant.design/components/input-cn/) |
| textarea | [Input.TextArea](https://ant.design/components/input-cn/#components-input-demo-textarea) |
| date | [DatePicker](https://ant.design/components/date-picker-cn/) |
| dateTime | [DatePicker](https://ant.design/components/date-picker-cn/#components-date-picker-demo-time) |
| time | [TimePicker](https://ant.design/components/time-picker-cn/) |
| dateTimeRange | [RangePicker](https://ant.design/components/time-picker-cn/#components-time-picker-demo-range-picker) |
| dateRange | [RangePicker](https://ant.design/components/time-picker-cn/#components-time-picker-demo-range-picker) |
| money | [InputNumber](https://ant.design/components/input-number-cn/) |
| digit | [InputNumber](https://ant.design/components/input-number-cn/) |
| option | 不展示 |
| index | 不展示 |
| progress | 不展示 |

`valueType` 虽然解决了部分问题，但是枚举的情况他无法满足，所以 ProTable 还支持了 `valueEnum` 来支持枚举类型的数据。`valueEnum`是一个`Object`或者`Map`，如果你用数字当 key，或者对顺序有要求建议使用的`Map`。数据结构如下：

```tsx | pure
const valueEnum = {
  open: '未解决',
  closed: {
    text: '已解决',
    status: 'Success',
  },
};
```

配合为 `valueEnum` 的字段会被展示为下拉框。

## ActionRef

在进行了操作，或者 tab 切换等时候我们需要手动触发一下描述列表的更新，纯粹的 props 很难解决这个问题，所以我们提供一个 ref 来支持一些默认的操作。

```tsx | pure
const ref = useRef<ActionType>();

// 两秒刷新一次
useEffect(() => {
  setInterval(() => {
    ref.current.reload();
  }, 2000);
}, []);

// hooks 绑定
<ProDescriptions actionRef={ref} />;

// class
<ProDescriptions actionRef={(ref) => (this.ref = ref)} />;
```

`ActionRef` 还支持了一些别的行为,某些时候会减少的你的编码成本，但是 ref 会脱离 react 的生命周期，所以这些 action 都是不受控的。

```tsx | pure
// 刷新
ref.current.reload();
```
