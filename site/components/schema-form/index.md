---
group: Form
title: Schema Form JSON 表单
order: 1
atomId: BetaSchemaForm
---

# Schema Form - JSON 表单

SchemaForm 是根据 JSON Schema 来生成表单的工具。SchemaForm 会根据 valueType 来映射成不同的[表单项](/components/schema)。

> **Tips**： 如您遇到卡顿问题或有更高的性能要求可[参考示例](#高性能代码示例)使用

## API

SchemaForm 提供了与 [ProForm](/components/form#proform) 相同的 API，并且增加了部分 API，以下的 SchemaForm 新增的 API。

| 字段名称       | 类型                                                                                      | 说明                                                                                                                                                                                                                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `layoutType`   | [`ProFormLayoutType`](/components/schema-form#proformlayouttype)                          | 使用的表单布局模式                                                                                                                                                                                                                                                                                     |
| `steps`        | `StepFormProps[]`                                                                         | `layoutType=steps`中的分步表单配置，需要配置 columns 为数组使用                                                                                                                                                                                                                                        |
| `columns`      | [`ProFormColumnsType[]` \| `ProFormColumnsType[][]`](/components/schema-form#schema-定义) | 表单的定义，一般是 json 对象，如果是分步表单，需要使用 json 数组来生成多个表单                                                                                                                                                                                                                         |
| `shouldUpdate` | `(newValues: Record<string, any>, oldValues: Record<string, any>) => boolean \| boolean`  | 细粒化控制是否渲染。<br /> 为`true`时会自动重新渲染表单项。<br /> 为`false`时不会更新表单项但可以使用[dependencies 触发更新](#结合-shouldupdatefalse-和-dependencies-触发更新)，<br /> 为`function` 时根据返回值判断是否重新渲染表单项，等同直接赋值 `true` 或 `false` [参考示例](#动态控制是否重渲染) |
| `title`        | `ReactNode`                                                                               | 表单标题                                                                                                                                                                                                                                                                                               |
| `action`       | `React.Ref<ProCoreActionType \| undefined>`                                               | 用于操作表单的 action，支持 reload 等操作                                                                                                                                                                                                                                                              |
| `formRef`      | `React.Ref<ProFormInstance \| undefined>`                                                 | 获取 form 实例，支持 antd form 的所有方法                                                                                                                                                                                                                                                              |
| `open`         | `boolean`                                                                                 | 控制 ModalForm 和 DrawerForm 的显示隐藏                                                                                                                                                                                                                                                                |

## ProFormLayoutType

| 字段名称                | 说明                                                                                                                                    |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `Form`                  | [ProForm](/components/form) 是基本的表单类型                                                                                            |
| `ModalForm`             | 弹框表单，配置之后支持 [ModalForm](/components/modal-form) 的所有配置                                                                   |
| `DrawerForm`            | 抽屉表单，配置之后支持 [DrawerForm](/components/modal-form) 的所有配置                                                                  |
| `StepsForm`\|`StepForm` | 配置之后为分步表单，有两种模式一种使用 `steps` 和 `columns` 来生成，一种是通过 `layoutType=StepsForm` 嵌套 `layoutType=StepForm` 来实现 |
| `LightFilter`           | 轻量筛选，配置之后支持 [`LightFilter`](/components/query-filter) 的所有配置                                                             |
| `QueryFilter`           | 查询表单，配置之后支持 [`QueryFilter`](/components/query-filter) 的所有配置                                                             |
| `Embed`                 | 内嵌模式，只生成表单项，不生成 Form 可以混合使用                                                                                        |

## Schema 定义

SchemaForm 表单最重要就是 Schema 的类型定义，我们使用了与 table 的相同的表单定义，同时扩展了部分字段。

| 字段名称              | 类型                                                                           | 说明                                                                                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`                 | `React.key`                                                                    | 确定这个列的唯一值，一般用于 dataIndex 重复的情况                                                                                                                                        |
| `dataIndex`           | `React.key` \| `React.key[]`                                                   | 与实体映射的 key，数组会被转化 `[a,b] => Entity.a.b`                                                                                                                                     |
| `valueType`           | `ProFieldValueType`                                                            | 数据的渲渲染方式，我们自带了一部分，你也可以自定义 valueType                                                                                                                             |
| `title`               | `ReactNode` \|`(props,type,dom)=> ReactNode`                                   | 标题的内容，在 form 中是 label                                                                                                                                                           |
| `tooltip`             | `string`                                                                       | 会在 title 旁边展示一个 icon，鼠标浮动之后展示                                                                                                                                           |
| `width`               | `number` \| `string`                                                           | 宽度。<br />`xs`: 104px - 短数字、短文本<br />`sm`: 216px - 短字段(姓名、电话)<br />`md`: 328px - 标准宽度<br />`lg`: 440px - 长字段(网址、标签组)<br />`xl`: 552px - 长文本(描述、备注) |
| `colSize`             | `number`                                                                       | 每个表单占据的格子大小，总宽度 = span \* colSize，默认为 1                                                                                                                               |
| `readonly`            | `boolean`                                                                      | 是否只读模式                                                                                                                                                                             |
| `initialValue`        | `any`                                                                          | 表单的默认值                                                                                                                                                                             |
| `valueEnum`           | `(Entity)=> ValueEnum` \| `ValueEnum`                                          | 支持 object 和 Map，Map 是支持其他基础类型作为 key                                                                                                                                       |
| `fieldProps`          | `(form,config)=>fieldProps`\| `fieldProps`                                     | 传给渲染的组件的 props，自定义的时候也会传递                                                                                                                                             |
| `formItemProps`       | `(form,config)=>formItemProps` \| `formItemProps`                              | 传递给 Form.Item 的配置                                                                                                                                                                  |
| `formItemProps.rules` | `Rule[]`                                                                       | 表单项的校验规则。需要注意的是，如果当前表单项为`formList`时，此规则仅校验列表是否为空，且仅接受元组`[{required: boolean, message: string}]`，用于开启和关闭非空校验及指定空列表提示消息 |
| `proFieldProps`       | `proFieldProps`                                                                | 设置到 `ProField` 上面的 `props`，内部属性                                                                                                                                               |
| `renderText`          | `(text: any, record: Entity, index: number, action: ProCoreActionType) => any` | 修改的数据是会被 valueType 定义的渲染组件消费                                                                                                                                            |
| `render`              | `(dom,entity,index, action, schema) => React.ReactNode`                        | 自定义只读模式的 dom,`render` 方法只管理的只读模式，编辑模式需要使用 `formItemRender`                                                                                                    |
| `formItemRender`      | `(schema,config,form) => React.ReactNode`                                      | 自定义编辑模式，返回一个 ReactNode，会自动包裹 value 和 onChange。~~如返回 false,null,undefined 将不展示表单项~~ 请使用 dependency 组件控制是否渲染列                                    |
| `request`             | `(params,props) => Promise<{label,value}[]>`                                   | 从远程请求网络数据，一般用于选择类组件                                                                                                                                                   |
| `params`              | `Record<string, any>`                                                          | 额外传递给 `request` 的参数，组件不做处理，但是变化会引起`request` 重新请求数据                                                                                                          |
| `dependencies`        | `string \| number \| (string \| number)[]`                                     | 所依赖的 values 变化后，触发 formItemRender，fieldProps，formItemProps 重新执行，并把 values 注入到 params 里 [示例](#使用-dependencies-触发-fieldpropsformitempropsformItemRender-更新) |
| `hideInDescriptions`  | `boolean`                                                                      | 在 descriptions 中隐藏                                                                                                                                                                   |
| `hideInForm`          | `boolean`                                                                      | 在 Form 中隐藏                                                                                                                                                                           |
| `hideInTable`         | `boolean`                                                                      | 在 Table 中隐藏                                                                                                                                                                          |
| `hideInSearch`        | `boolean`                                                                      | 在 Table 的查询表格中隐藏                                                                                                                                                                |
| `columns`             | `ProFormColumnsType[] \| (values) => ProFormColumnsType[]`                     | 嵌套子项，valueType 为 dependency 时，请使用`(values) => ProFormColumnsType[]`其他情况使用 `ProFormColumnsType[]`                                                                        |
| `colProps`            | [ColProps](https://ant.design/components/grid/#Col)                            | 在开启 grid 模式时传递给 Col                                                                                                                                                             |
| `rowProps`            | [RowProps](https://ant.design/components/grid/#Row)                            | 开启栅格化模式时传递给 Row                                                                                                                                                               |
| `convertValue`        | `(value, namePath)=> any`                                                      | 获取时转化值，一般用于将数据格式化为组件接收的格式，如 `[a,b] => a,b`                                                                                                                    |
| `transform`           | `(value, namePath, allValues)=> any`                                           | 提交时转化值，一般用于将值转化为提交的数据，如 `string => { newName: string }`                                                                                                           |
| `order`               | `number`                                                                       | Form 的排序，默认是 index，order 越大越靠前                                                                                                                                              |
| `debounceTime`        | `number`                                                                       | request 防抖时间                                                                                                                                                                         |
| `defaultKeyWords`     | `string`                                                                       | 搜索时的默认关键字                                                                                                                                                                       |
| `ignoreFormItem`      | `boolean`                                                                      | 不包裹 Form.Item，直接渲染组件                                                                                                                                                           |

### 常见 ValueType

| 值类型       | 描述           |
| ------------ | -------------- |
| `text`       | 文本输入框     |
| `textarea`   | 多行文本域     |
| `password`   | 密码输入框     |
| `digit`      | 数字输入框     |
| `money`      | 金额输入框     |
| `select`     | 下拉选择器     |
| `checkbox`   | 多选框         |
| `radio`      | 单选框         |
| `date`       | 日期选择器     |
| `dateRange`  | 日期范围选择器 |
| `time`       | 时间选择器     |
| `switch`     | 开关           |
| `group`      | 表单分组       |
| `dependency` | 依赖联动       |
| `formList`   | 列表表单       |

### fieldProps 与 formItemProps 的区别

- **fieldProps**: 传递给具体输入组件（如 Input, Select, DatePicker）的属性。例如 `placeholder`, `allowClear`, `style` 等。
- **formItemProps**: 传递给 Ant Design 的 `Form.Item` 的属性。例如 `label`, `name`, `rules`, `extra`, `help` 等。

```javascript
{
  title: '标题',
  dataIndex: 'title',
  formItemProps: {
    rules: [{ required: true, message: '此项必填' }],
    extra: '这是一段辅助说明',
  },
  fieldProps: {
    placeholder: '请输入标题',
    allowClear: true,
  },
}
```

## 代码示例 - 布局类型

### 基础表单 (Form)

SchemaForm 最基础的用法，通过 JSON 配置生成标准的表单页面。支持通过 `columns` 定义表单项，通过 `layoutType` 切换布局。

<code src="../../../demos/form/SchemaForm/schema.tsx" title="基础 Schema 表单"></code>

### 浮层表单 (ModalForm & DrawerForm)

通过设置 `layoutType` 为 `ModalForm` 或 `DrawerForm`，可以快速将表单转换为弹窗或抽屉模式，无需手动管理 visible 状态。

<code src="../../../demos/form/SchemaForm/ModalAndDrawerForm.tsx" title="ModalForm 和 DrawerForm"></code>

### 分步表单 (StepsForm)

通过设置 `layoutType` 为 `StepsForm` 或 `StepForm`，可以生成分步表单。此时 `columns` 应该是一个二维数组，每个数组元素代表一步的表单项配置。

<code src="../../../demos/form/SchemaForm/steps-form.tsx" title="JSON 生成分步表单"></code>

### 嵌入模式 (Embed)

通过设置 `layoutType` 为 `Embed`，可以只生成表单项而不生成 Form 容器。这在需要将 SchemaForm 嵌入到已有的 ProForm 或其他容器中时非常有用。

<code src="../../../demos/form/SchemaForm/embed.tsx" title="嵌入到 ProForm 中"></code>

## 高级用法

### 表单联动

使用 `valueType: 'dependency'` 可以实现复杂的表单联动。当依赖的字段发生变化时，会自动触发当前项的更新。

<code src="../../../demos/form/SchemaForm/dependency.tsx" title="使用 ProFormDependency"></code>

### 高性能模式

对于大型表单，可以使用 `shouldUpdate` 和 `dependencies` 来进行细粒度的渲染控制，避免整个表单的重复渲染。

- **dependencies**: 指定依赖字段，仅当依赖字段变化时更新。
- **shouldUpdate**: 自定义更新逻辑，返回 false 阻止更新。

<code src="../../../demos/form/SchemaForm/dependencies.tsx" title="结合 shouldUpdate=false 和 dependencies 触发更新"></code>

<code src="../../../demos/form/SchemaForm/dynamic-rerender.tsx" title="动态控制是否重渲染"></code>

### 列表配置 (FormList)

支持 `valueType: 'formList'` 来生成动态增减的列表表单。

<code src="../../../demos/form/SchemaForm/form-list-required.tsx" title="FormList Required 校验" debug></code>
