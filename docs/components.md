---
title: 组件总览
order: 0
group:
  path: /
nav:
  title: 组件
  path: /components
---

# 架构设计

ProComponents 是基于 Ant Design 而开发的模板组件，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作 CRUD 页面的效率，更加专注于页面。

- [ProLayout](/components/layout) 解决布局的问题，提供开箱即用的菜单和面包屑功能
- [ProTable](/components/table) 表格模板组件，抽象网络请求和表格格式化
- [ProForm](/components/form) 表单模板组件，预设常见布局和行为
- [ProCard](/components/card) 提供卡片切分以及栅格布局能力
- [ProDescriptions](/components/descriptions) 定义列表模板组件，ProTable 的配套组件
- [ProSkeleton](/components/skeleton) 页面级别的骨架屏

> 如果您是阿里内网用户，欢迎尝试使用 [TechUI](https://techui.alipay.com)。TechUI 在封装 ProComponents 的基础上还提供了丰富的 Ant Design 扩展组件。

## CRUD

ProTable，ProDescriptions，ProForm 都是基于 ProField 来进行封装。ProTable 和 ProDescriptions 根据 valueType 来渲染不同的 ProField，Form 则是通过不同的 FormField 来实现封装。

使用同样的底层实现为 ProTable，ProDescriptions，ProForm 打通带来了便利。ProForm 可以很方便的实现只读模式，ProTable 可以快速实现查询表单和可编辑表格。ProDescriptions 可以实现节点编辑，以下有个例子可以切换三个组件。

<code src="../packages/table/src/demos/crud.tsx">

## Form 的 layout 切换

ProForm 的主要功能是预设了很多 layout，如果需要切换只需要改变外面包裹的 Layout 即可，以下是个 demo。

<code src="../packages/form/src/demos/layout-change.tsx">

## 与网络请求库配置使用

ProTable，ProList 使用了新的数据结构，如果你使用了我们约定的参数使用起来会非常简单。

```tsx | pure
const msg: {
  data: T[];
  page: number;
  success: boolean;
  total: number;
} = {
  data: [],
  page: 1,
  success: true,
  total: 0,
};
```

如果你的后端数据使用了自己熟悉的 url，虽然我们可以用的 request 来转化，但是每个 table 都需要配置就比较麻烦。如果你使用 umi 的 request，我们可以定义一个全局的转化器。我们需要在 app.tsx 中配置

```tsx | pure
import { RequestConfig } from 'umi';

export const request: RequestConfig = {
  errorConfig: {
    adaptor: (resData) => {
      // resData 是我们自己的数据
      return {
        ...resData,
        total: resData.sum,
        success: resData.ok,
        errorMessage: resData.message,
      };
    },
  },
};

// 使用时
import { request } from 'umi';

<ProTable request={request('/list')} />;
```

如果使用了 fetch ，可以对 fetch 进行自定义。

```tsx | pure
const request = (url, options) => {
  return fetch(url, options)
    .then((res) => res.json())
    .then((resData) => {
      return Promise.resolve({
        ...resData,
        total: resData.sum,
        success: resData.ok,
        errorMessage: resData.message,
      });
    });
};

// 使用时
<ProTable request={request('/list')} />;
```

## 通用配置

ProTable，ProDescriptions 公用一套配置，可以使用同样的 columns 和 request 来生成数据，唯一的不同是 Table 需要数组，而 ProDescriptions 只需要一个对象。以下是具体的配置：

```tsx | pure
export type ProSchema<T = unknown, U = string, Extra = unknown> = {
  /** @name 确定这个列的唯一值 */
  key?: React.ReactText;
  /**
   * 支持一个数组，[a,b] 会转化为 obj.a.b
   *
   * @name 与实体映射的key
   */
  dataIndex?: string | number | (string | number)[];
  /** 选择如何渲染相应的模式 */
  valueType?: ((entity: T, type: ProSchemaComponentTypes) => U) | U;

  /**
   * 支持 ReactNode 和 方法
   *
   * @name 标题
   */
  title?:
    | ((
        schema: ProSchema<T, U, Extra>,
        type: ProSchemaComponentTypes,
        dom: React.ReactNode,
      ) => React.ReactNode)
    | React.ReactNode;

  /** @name 展示一个 icon，hover 是展示一些提示信息 */
  tooltip?: string | LabelTooltipType;

  /** @deprecated 你可以使用 tooltip，这个更改是为了与 antd 统一 */
  tip?: string;

  render?: (
    dom: React.ReactNode,
    entity: T,
    index: number,
    action: ProCoreActionType,
    schema: ProSchema<T, U, Extra>,
  ) => React.ReactNode;

  /**
   * 返回一个node，会自动包裹 value 和 onChange
   *
   * @name 自定义编辑模式
   */
  renderFormItem?: (
    item: ProSchema<T, U, Extra>,
    config: {
      index?: number;
      value?: any;
      onSelect?: (value: any) => void;
      type: ProSchemaComponentTypes;
      defaultRender: (newItem: ProSchema<T, U, Extra>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => React.ReactNode;

  /**
   * 必须要返回 string
   *
   * @name 自定义 render
   */
  renderText?: (text: any, record: T, index: number, action: ProCoreActionType) => any;

  fieldProps?: any;
  /** @name 映射值的类型 */
  valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;

  /** @name 从服务器请求枚举 */
  request?: ProFieldRequestData<ProSchema>;

  /** @name 从服务器请求的参数，改变了会触发 reload */
  params?: {
    [key: string]: any;
  };
  /** @name 隐藏在 descriptions */
  hideInDescriptions?: boolean;
} & Extra;
```
