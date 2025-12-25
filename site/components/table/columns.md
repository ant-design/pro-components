---
title: Columns 列定义
order: 10
group:
  title: Table
  order: 0
nav:
  title: Components
  path: /components
---

# Columns 列定义

> 请求远程数据比较复杂，详细可以看[这里](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params)。

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 与 antd 中基本相同，但是支持通过传入一个方法 | `ReactNode \| ((config: ProColumnType<T>, type: ProTableTypes) => ReactNode)` | - |
| tooltip | 会在 title 之后展示一个 icon，hover 之后提示一些信息 | `string` | - |
| ellipsis | 是否自动缩略 | `boolean` \| `{showTitle?: boolean}` | - |
| copyable | 是否支持复制 | `boolean` | - |
| valueEnum | 值的枚举，会自动转化把值当成 key 来取出要显示的内容 | [valueEnum](/components/schema#valueenum) | - |
| valueType | 值的类型，会生成不同的渲染器 | [`valueType`](/components/schema#valuetype) | `text` |
| order | 查询表单中的权重，权重大排序靠前 | `number` | - |
| fieldProps | 查询表单的 props，会透传给表单项，如果渲染出来是 Input，就支持 Input 的所有 props，同理如果是 select，也支持 select 的所有 props。也支持方法传入 | `(form,config)=>Record \| Record` | - |
| `formItemProps` | 传递给 Form.Item 的配置，可以配置 rules，但是默认的查询表单 rules 是不生效的。需要配置 `ignoreRules` | `(form,config)=>formItemProps` \| `formItemProps` | - |
| renderText | 类似 table 的 render，但是必须返回 string，如果只是希望转化枚举，可以使用 [valueEnum](/components/schema#valueenum) | `(text: any,record: T,index: number,action: UseFetchDataAction<T>) => string` | - |
| render | 类似 table 的 render，第一个参数变成了 dom，增加了第四个参数 action | `(text: ReactNode,record: T,index: number,action: UseFetchDataAction<T>) => ReactNode \| ReactNode[]` | - |
| formItemRender | 渲染查询表单的输入组件 | `(item,{ type, defaultRender, formItemProps, fieldProps, ...rest },form) => ReactNode` | - |
| search | 配置列的搜索相关，false 为隐藏 | `false` \| `{ transform: (value: any) => any }` | true |
| sorter | 与 antd 中基本相同，新增支持字串覆盖该栏位请求时字段 | `function \| boolean \| string \| { compare: function, multiple: number }` | - |
| search.transform | 转化值的 key, 一般用于时间区间的转化 | `(value: any) => any` | - |
| [editable](/components/editable-table) | 在编辑表格中是否可编辑的，函数的参数和 table 的 render 一样 | `false` \| `(text: any, record: T,index: number) => boolean` | true |
| colSize | 一个表单项占用的格子数量，`占比= colSize*span`，`colSize` 默认为 1 ，`span` 为 8，`span`是`form={{span:8}}` 全局设置的 | `number` | - |
| hideInTable | 在 Table 中不展示此列 | `boolean` | - |
| hideInForm | 在 Form 中不展示此列 | `boolean` | - |
| hideInDescriptions | 在 Descriptions 中不展示此列 | `boolean` | - |
| hideInSetting | 不在配置工具中显示 | `boolean` | - |
| filters | 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成 | `boolean` \| `object[]` | false |
| onFilter | 筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选 | `(value, record) => boolean` \| `false` | false |
| request | 从服务器请求枚举 | [request](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) | - |
| initialValue | 查询表单项初始值 | `any` | - |
| disable | 列设置中`disabled`的状态 | `boolean` \| `{ checkbox: boolean; }` | - |
| ignoreRules | 忽略rules，LightFilter 应该不支持rules，默认是 false。 | `boolean` | false |
| readonly | 只读 | `boolean` | - |
| listKey | 列表键，私有属性 | `string` | - |
