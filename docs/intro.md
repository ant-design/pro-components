---
title: 简介
order: 1
group:
  path: /
nav:
  title: 文档
  order: 1
  path: /docs
---

## ProComponents 的理念

Ant Design 定义了基础的设计规范，对应也提供了大量的基础组件。但是对于大量的中后台类应用，我们希望提供更高程度的抽象，提供更上层的设计规范，并且对应提供相应的组件使得开发者可以快速搭建出高质量的页面。

在 ProComponents 中我们内置了一系列的设计规范，预设了常用的逻辑。在这个基础上我们同样提供了灵活性的支持，比如对于 ProTable 来说你也可以把它完全当做 antd 的 Table 来用，对于 ProForm 来说你也可以直接使用 antd 的基础组件或者你的自定义组件。我们希望通过 Pro 系列组件提供快速高效大家高质量中后台应用的能力，进一步扩展 Ant Design 的能力，欢迎使用并提出宝贵的意见。

## Pro 系列组件具体做了什么？

这里以 ProTable 为例。

在 React 的中写一个 table 免不了需要定义一些 state，比如 page，pageNumber，pageSize。如果使用 dva 等数据流方案可能还需要写很多样板代码来请求数据。但是很多时候这些行为是高度雷同的，所以 ProTable 默认封装了请求网络，翻页，搜索和筛选的逻辑。

另外 ProTable 的 request 中封装了请求网络的行为，ProTable 会将 props.params 中的数据默认带入到请求中，如果接口恰好与我们的定义相同，实现一个查询会非常简单。

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
