---
title: Schema Form - JSON 表单
order: 1
group:
  path: /
nav:
  title: 组件
  path: /components
---

# Schema Form - JSON 表单

SchemaForm 是根据 JSON Schema 来生成表单的工具。SchemaForm 会根据 valueType 来映射成不同的[表单项](/components/schema)。

## API

SchemaForm 提供了与 [ProForm](/components/form#proform) 相同的 API，并且增加了部分 API，以下的 SchemaForm 新增的 API。

| 字段名称 | 类型 | 说明 |
| --- | --- | --- |
| `layoutType` | [`ProFormLayoutType`](/components/schema-form#proformlayouttype) | 使用的表单布局模式 |
| `steps` | `StepFormProps[]` | `layoutType=steps`中的分步表单配置，需要配置 columns 为数组使用 |
| `columns` | [`ProFormColumnsType` \| `ProFormColumnsType[]`](/components/schema-form#schema-定义) | 表单的定义，一般是 json 对象，如果是分步表单，需要使用 json 数组来生成多个表单 |

## ProFormLayoutType

| 字段名称 | 说明 |
| --- | --- |
| `Form` | [ProForm](/components/form) 是基本的表单类型 |
| `ModalForm` | 弹框表单，配置之后支持 [ModalForm](/components/modal-form) 的所有配置 |
| `DrawerForm` | 抽屉表单，配置之后支持 [DrawerForm](/components/modal-form) 的所有配置 |
| `StepsForm`\|`StepForm` | 配置之后为分步表单，有两种模式一种使用 `steps` 和 `columns` 来生成，一种是通过 `layoutType=StepsForm` 嵌套 `layoutType=StepForm` 来实现 |
| `LightFilter` | 轻量筛选，配置之后支持 [`LightFilter`](/components/query-filter) 的所有配置 |
| `QueryFilter` | 查询表单，配置之后支持 [`QueryFilter`](/components/query-filter) 的所有配置 |
| `Embed` | 内嵌模式，只生成表单项，不生成 Form 可以混合使用 |

## Schema 定义

SchemaForm 表单最重要就是 Schema 的类型定义，我们使用了与 table 的相同的表单定义，同时扩展了部分字段。

| 字段名称 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `React.key` | 确定这个列的唯一值,一般用于 dataIndex 重复的情况 |
| `dataIndex` | `React.key` \| `React.key[]` | 与实体映射的 key，数组会被转化 `[a,b] => Entity.a.b` |
| `valueType` | `ProFieldValueType` | 数据的渲渲染方式，我们自带了一部分，你可以可以自定义 valueType |
| `title` | `ReactNode` \|`(props,type,dom)=> ReactNode` | 标题的内容，在 form 中是 label |
| `tooltip` | `string` | 会在 title 旁边展示一个 icon，鼠标浮动之后展示 |
| `valueEnum` | `(Entity)=> ValueEnum` \| `ValueEnum` | 支持 object 和 Map，Map 是支持其他基础类型作为 key |
| `fieldProps` | `(form,config)=>fieldProps`\| `fieldProps` | 传给渲染的组件的 props，自定义的时候也会传递 |
| `formItemProps` | `(form,config)=>formItemProps` \| `formItemProps` | 传递给 Form.Item 的配置 |
| `proFieldProps` | `proFieldProps` | 设置到 `ProField` 上面的 `props`，内部属性 |
| `renderText` | `(text: any, record: Entity, index: number, action: ProCoreActionType) => any` | 修改的数据是会被 valueType 定义的渲染组件消费 |
| `render` | `(dom,entity,index, action, schema) => React.ReactNode` | 自定义只读模式的 dom,`render` 方法只管理的只读模式，编辑模式需要使用 `renderFormItem` |
| `renderFormItem` | `(schema,config,form) => React.ReactNode` | 自定义编辑模式,返回一个 ReactNode，会自动包裹 value 和 onChange |
| `request` | `(params,props) => Promise<{label,value}[]>` | 从远程请求网络数据，一般用于选择类组件 |
| `params` | `Record<string, any>` | 额外传递给 `request` 的参数，组件不做处理,但是变化会引起`request` 重新请求数据 |
| `hideInDescriptions` | `boolean` | 在 descriptions 中隐藏 |
| `hideInForm` | `boolean` | 在 Form 中隐藏 |
| `hideInTable` | `boolean` | 在 Table 中隐藏 |
| `hideInSearch` | `boolean` | 在 Table 的查询表格中隐藏 |
| `columns` | `ProFormColumnsType[] \| (values) => ProFormColumnsType[]` | 嵌套子项，valueType 为 dependency 时，请使用`(values) => ProFormColumnsType[]`其他情况使用 `ProFormColumnsType[]` |

## 代码示例

### JSON 来生成表单

<code src="./demos/schema.tsx" height="764px" title="schema 表单" />

### JSON 来生成分步表单

<code src="./demos/steps-form.tsx" height="464px" title="schema 表单" />

### 嵌入到 ProForm 中

<code src="./demos/embed.tsx" height="464px" title="schema 表单" />

### 使用 ProFormDependency

<code src="./demos/dependency.tsx" height="300px" title="schema 表单" />
