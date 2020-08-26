---
title: ProTable - 快速开始
order: 0
group:
  path: /
nav:
  title: 快速开始
  path: /docs
---

# ProTable - 快速开始

ProTable 的诞生是为了解决项目中需要写很多 table 的样板代码的问题，所以在其中做了封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑。

在 react 的中写一个 table 免不了需要定义一些 state，比如 page，pageNumber，pageSize。如果使用 dva 等数据流方案可能还需要写很多样板代码来请求数据。但是很多时候这些行为是高度雷同的，所以 ProTable 默认封装了请求网络，翻页，搜索和筛选的逻辑。

## 请求数据

request 中封装了请求网络的行为，ProTable 会将 props.params 中的数据默认带入到请求中，如果接口恰好与我们的定义相同，实现一个查询会非常简单。

```tsx | pure
import request from 'umi-request';

const fetchData = (params, sort, filter) =>
  request<{
    data: T[];
  }>('https://proapi.azurewebsites.net/github/issues', {
    params,
    sort,
    filter,
  });

const keyWords = "Ant Design"

<ProTable<T,U> params={{ keyWords }} request={fetchData} />;
```

我们约定 request 拥有三个参数，第一个 `params` 会自带 `pageSize` 和 `current`,并且将 props 中的 `params` 也会带入其中，第二个参数 `sort` 用与排序，第三个参数 `filter` 用于多选。他们的类型分别如下:

```tsx | pure
(
  params: U & {
    pageSize?: number;
    current?: number;
  },
  sort: {
    [key: string]: 'ascend' | 'descend';
  },
  filter: { [key: string]: React.ReactText[] },
) => RequestData;
```

> ProTable 会将第二个泛型认为是 `params` 的类型，保证各个环节都要完善的类型支持。

对与请求回来的结果的 ProTable 也有一些约定，类型如下：

```tsx | pure
interface RequestData {
  data: Datum[];
  success: boolean;
  total: number;
}
```

如果我们恰巧属性不同，也是可以做自定义的。request 只要是一个 `Promise<RequestData>` 接口，同样是上面的代码,我们可以自定义参数和返回值。看起来就像这样：

```tsx | pure
const fetchData =async (params, sort, filter) =>{
  const msg =await  request<{
    data: T[];
  }>('https://proapi.azurewebsites.net/github/issues', {
    params:{
      pageNum:params.current,
      size:params.pageSize
    },
    sort,
    filter,
  });
  return {
    data:msg.list,
    total:msg.sum,
    success:!msg.errorCode
  }
}

const keyWords = "Ant Design"

<ProTable<T,U> params={{ keyWords }} request={fetchData} />;
```

## 列配置

列配置复杂把数据映射成为具体的 dom, ProTable 在 antd 的基础上进行了一些封装，支持了一些默认的行为作为 render 的语法糖，我们可以在列中配置 valueType 配置一个字符串。现在支持的值如下：

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

在进行了操作，或者 tab 切换等时候我们需要手动触发一下表单的更新，纯粹的 props 很难解决这个问题，所以我们提供一个 ref 来支持一些默认的操作。

```tsx | pure
const ref = useRef<ActionType>();

// 两秒刷新一次表格
useEffect(() => {
  setInterval(() => {
    ref.current.reload();
  }, 2000);
}, []);

// hooks 绑定
<ProTable actionRef={ref} />;

// class
<ProTable actionRef={(ref) => (this.ref = ref)} />;
```

`ActionRef` 还支持了一些别的行为,某些时候会减少的你的编码成本，但是 ref 会脱离 react 的生命周期，所以这些 action 都是不受控的。

```tsx | pure
// 刷新
ref.current.reload();

// 重置所有项并刷新
ref.current.reloadAndRest();

// 重置到默认值
ref.current.reset();

// 清空选中项
ref.current.clearSelected();
```

## 查询表单

查询表单是 ProTable 的默认行为中最为复杂的一个，我们为其提供了部分配置和预设。如果你的查询表单非常复杂，或者其中使用了一些业务逻辑，建议使用 antd 的进行排版，并把数据通过 params 交给 ProTable，默认的查询表单是高度标准化的。

![tableDemo](https://gw.alipayobjects.com/zos/antfincdn/P7jDHJ323a/4febb542-739c-49b7-8bb9-6a5fc2ca631c.png)

### 控制展示

很多时候查询表单是有一些配置的，默认的逻辑不能满足需求，我们支持通过 `fieldProps` 来进行一些简单的配置。比如 `placeholder` 或者增加一个 `addonAfter` 的。

```tsx | pure
{
  fieldProps: {
    placeholder:"请输入表格名",
    addonAfter: <SettingOutlined />;
  }
}
```

> value 和 onChange 有特殊的含义,用于表单绑定，所以不能覆盖。

有些时候表单中和 table 中的 title 也是不同的，我们支持配置 title 为 `function` 来支持根据情况显示不同 title。

```tsx | pure
 title: (_, type) => (type === 'table' ? '状态' : '列表状态'),
```

我们可以在 props 中设置 form 配置来自定义表单的操作，比如说默认值。

```tsx | pure
form={{ initialValues: {...data}, labelCol: { span: 6 }, }}
```

### 自定义表单项

很多时候内置的表单项无法满足我们的需求，这时候我们就需要来自定义一下默认的组件，`renderFormItem` 可以完成重写渲染逻辑，它会传入 item 和 props 来进行渲染，需要注意的是我们必须要将 props 中的 `value` 和 `onChange` 必须要被赋值，否则 form 无法绑定数据。

为了做表单的联动 `renderFormItem` 增加了第三个参数，可以用 name 获得别的表单项数据并且做一些定制。

```tsx | pure
renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
  if (type === 'form') {
    return null;
  }
  const status = form.getFieldValue('state');
  if (status !== 'open') {
    return <Input {...rest} placeholder="请输入" />;
  }
  return defaultRender(_);
};
```

> renderFormItem 的性能不是很好，使用时要注意不要再其中做耗费时间较长的事情。

## 操作栏

操作栏可以承载一些常用的操作或者表格的标题，为了不与 antd 的 Table 的属性冲突，我们使用了 `headerTitle` 来定义了操作栏的标题,操作栏的标题是一个 ReactNode 你可以自定义它，如果需要可以放入一个 Tabs。

`toolBarRender` 支持返回一个 ReactNode 的数组，我们会自动加入间距，toolBarRender 类型定义如下：

```tsx |pure
toolBarRender: (action, { selectedRowKeys, selectedRows }) => ReactNode[];
```

默认会返回当前选中的所有行和他们的 keys，用于批量操作。

操作栏还自定义了一些默认的行为，默认支持了 `density` 密度调整, `fullScreen` 全屏，`reload` 刷新，`setting` table 设置。

```tsx | pure
export interface OptionConfig<T> {
  density: boolean;
  fullScreen: OptionsType<T>;
  reload: OptionsType<T>;
  setting: boolean;
}
```

我们可以在 props 中配置 options={false} 来关掉操作栏。也可以分别设置，只保留你想要的。

```tsx | pure
options = {
  fullScreen: false,
  reload: false,
  setting: false,
  density: true,
};
```

更多的功能查看查看具体的说明:

- [API](/table/api)
- [国际化](/table/intl)
- [查询表单](/table/search)
- [预设样式](/table/value-type)
- [例子](/table/example)
