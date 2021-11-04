---
title: Schema Form
order: 1
group:
  path: /
nav:
  title: component
  path: /components
---

# JSON form

SchemaForm is a tool for generating forms based on JSON Schema. SchemaForm will be mapped into different [form items](/components/schema) according to valueType.

## API

SchemaForm provides the same API as [ProForm](/components/form#proform), and adds some APIs, the following SchemaForm new APIs.

| Field name | Type | Description |
| --- | --- | --- |
| `layoutType` | [`ProFormLayoutType`](/components/schema-form#proformlayouttype) | Form layout mode used |
| `steps` | `StepFormProps[]` | The distributed form configuration in `layoutType=steps` needs to configure columns to be used as an array |
| `columns` | [`ProFormColumnsType` \| `ProFormColumnsType[]`](/components/schema-form#schema-definition) | The definition of the form is generally a json object. If it is a distributed form, it needs to be generated using a json array Multiple forms |

## ProFormLayoutType

| Field name | Description |
| --- | --- |
| `Form` | [ProForm](/components/form) is the basic form type |
| `ModalForm` | Pop-up form, after configuration, it supports all configurations of [ModalForm](/components/modal-form) |
| `DrawerForm` | Drawer form, after configuration, it supports all configurations of [DrawerForm](/components/modal-form) |
| `StepsForm`\|`StepForm` | After configuration, it is a step-by-step form. There are two modes: one is to use `steps` and `columns` to generate, the other is to use `layoutType=StepsForm` to nest `layoutType=StepForm` To achieve |
| `LightFilter` | Lightweight filtering, after configuration, it supports all configurations of [`LightFilter`](/components/query-filter) |
| `QueryFilter` | Query form, after configuration, all configurations of [`QueryFilter`](/components/query-filter) are supported |
| `Embed` | Embedded mode, only generates form items, does not generate Form, can be mixed with other forms |

## Schema definition

The most important thing about the SchemaForm form is the type definition of the Schema. We use the same form definition as the table, while extending some fields.

| Field name | Type | Description |
| --- | --- | --- |
| `key` | `React.key` | Determine the unique value of this column, generally used in the case of repeated dataIndex |
| `dataIndex` | `React.key` \| `React.key[]` | The key mapped to the entity, the array will be converted `[a,b] => Entity.a.b` |
| `valueType` | `ProFieldValueType` | The rendering method of data, we have part of it, you can customize the valueType |
| `title` | `ReactNode` \|`(props,type,dom)=> ReactNode` | The content of the title, which is label in the form |
| `tooltip` | `string` | An icon will be displayed next to the title, and it will be displayed after the mouse is floating |
| `valueEnum` | `(Entity)=> ValueEnum` \| `ValueEnum` | Support object and Map, Map supports other basic types as keys |
| `fieldProps` | `(form,config)=>fieldProps`\| `fieldProps` | The props passed to the rendered component, and also passed when customizing |
| `formItemProps` | `(form,config)=>formItemProps` \| `formItemProps` | Configuration passed to Form.Item |
| `renderText` | `(text: any, record: Entity, index: number, action: ProCoreActionType) => any` | The modified data will be consumed by the rendering component defined by valueType |
| `render` | `(dom,entity,index, action, schema) => React.ReactNode` | custom read-only mode dom, read-only mode managed by `render` method only, edit mode needs to use `renderFormItem` |
| `renderFormItem` | `(schema,config,form) => React.ReactNode` | Custom edit mode, return a ReactNode, will automatically wrap value and onChange |
| `request` | `(params,props) => Promise<{label,value}[]>` | Request network data remotely, generally used to select class components |
| `params` | `Record<string, any>` | The additional parameters passed to `request` will not be processed by the component, but changes will cause `request` to request data again |
| `hideInDescriptions` | `boolean` | Hide in descriptions |
| `hideInForm` | `boolean` | Hide in Form |
| `hideInTable` | `boolean` | Hide in Table |
| `hideInSearch` | `boolean` | Hide in the query form of Table |

## Code example

### JSON to generate the form

<code src="./demos/schema.tsx" height="764px" title="schema form" />

### JSON to generate distributed forms

<code src="./demos/steps-form.tsx" height="464px" title="schema form" />

### Embed in ProForm

<code src="./demos/embed.tsx" height="464px" title="schema form" />

### Use ProFormDependency

<code src="./demos/dependency.tsx" height="300px" title="schema 表单" />
