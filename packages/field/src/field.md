---
title: ProField - 原子组件
group:
  path: /
nav:
  title: 组件
  path: /components
---

# ProField

> 该组件为内部组件，请勿直接使用。

原子信息组件，统一 ProForm、ProTable、ProList、Filter 等组件里面的字段定义。

## DEMO

<code src="./demos/base.tsx" />

<code src="./demos/base_test.tsx" debug/>

## API

```typescript | pure
import Field from '@ant-design/pro-field';

return <Field text="100" valueType="money" mode={state} />;
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 需要格式化的值 | any | - |
| valueType | 格式化的类型 | ValueType | - |
| mode | 组件的模式 | - | - |
| plain | 精简模式 | - | - |
| renderFormItem | 自定义 `mode=update \| edit` 下的 dom 表现，一般用于渲染编辑框 | - | - |
| render | 自定义 `mode=read` 下的 dom 表现，只是单纯的表现形式 | - | - |

## 远程数据

对于 `select`, `checkbox`, `radio`, `radioButton` 这四个 valueType,我们统一支持了 `request`,`params`,`fieldProps.options`，`valueEnum` 来支持远程数据，这几个属性分别有不同的用法。

### `valueEnum`

valueEnum 是最基础的用法， 它支持传入一个 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 或者是 [`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)，相比于 options 支持更加丰富的定义，比如在表格中常见的各种 [badge](https://ant.design/components/badge-cn/#Badge)。

```tsx | pure
const valueEnum = {
  all: { text: '全部', status: 'Default' },
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
  },
};
```

### `fieldProps.options`

options 是 antd 定义的标准，但是只有部分组件支持， ProComponents 扩展了组件，使得 `select`, `checkbox`, `radio`, `radioButton` 都支持了 `options`, 他们的用法是相同的。

```tsx | pure
const options = [
  {
    label: 'item 1',
    value: 'a',
  },
  {
    label: 'item 2',
    value: 'b',
  },
  {
    label: 'item 3',
    value: 'c',
  },
];

// 或者不需要 label
const options = ['chapter', 'chapter2'];

// 列中定义
const columns = [
  {
    title: '创建者',
    width: 120,
    dataIndex: 'creator',
    valueType: 'select',
    fieldProps: {
      options: [
        {
          label: 'item 1',
          value: 'a',
        },
        {
          label: 'item 2',
          value: 'b',
        },
        {
          label: 'item 3',
          value: 'c',
        },
      ],
    },
  },
];
```

### `request` 和 `params`

大部分时候我们是从网络中获取数据，但是获取写一个 hooks 访问还是比较繁琐的，同时要定义一系列状态，所以我们提供了 `request` 和 `params` 来获取数据。

- `request` 是一个 promise,需要返回一个 options 相同的数据
- `params` 一般而言 `request` 是惰性的，params 修改会触发一次 `request`

```tsx | pure
const request = async () => [
  { label: '全部', value: 'all' },
  { label: '未解决', value: 'open' },
  { label: '已解决', value: 'closed' },
  { label: '解决中', value: 'processing' },
];

<ProFormSelect
  name="select2"
  label="Select"
  params={{}}
  valueType="select"
  request={request}
  placeholder="Please select a country"
/>;

// 列中定义
const columns = [
  {
    title: '创建者',
    width: 120,
    dataIndex: 'creator',
    valueType: 'select',
    request,
    params: {},
  },
];
```

在实际的使用中 `request` 增加了一个 5s 缓存，可能会导致数据更新不及时，如果需要频繁更新，建议使用 `state`+`fieldProps.options`。
